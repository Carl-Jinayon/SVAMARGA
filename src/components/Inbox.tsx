import { useEffect, useState, useMemo, useRef, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { useTrackerStore } from '../store/useTrackerStore';
import { Send, User as UserIcon, Shield, MessageSquare, Search, X, Bug, Plus } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ADMIN_ID = '06391879-d280-472e-b253-7e0685bf1014';

export default function Inbox() {
  const { user, messages = [], fetchMessages } = useTrackerStore();
  const [replyText, setReplyText] = useState('');
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newType, setNewType] = useState<'Message' | 'Bug'>('Message');
  const [newRecipientEmail, setNewRecipientEmail] = useState('');
  const [newContent, setNewContent] = useState('');
  const [bugType, setBugType] = useState('General Bug');
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isAdmin = user?.id === ADMIN_ID;

  const getEmail = useCallback((u: any) => {
    if (!u) return '';
    return u.email || u.user_metadata?.email || '';
  }, []);

  const getDisplayName = useCallback((u: any) => {
    if (!u) return 'Unknown';
    return u.user_metadata?.full_name || u.user_metadata?.user_name || getEmail(u) || 'Unknown';
  }, [getEmail]);

  const myEmail = useMemo(() => getEmail(user), [user, getEmail]);
  const myDisplayName = useMemo(() => getDisplayName(user), [user, getDisplayName]);

  const safeMsgs = useMemo(() => Array.isArray(messages) ? messages : [], [messages]);

  // Thread parents: top-level messages (no reply_to)
  const threadParents = useMemo(() => {
    return safeMsgs.filter(m => !m.reply_to);
  }, [safeMsgs]);

  // Current thread replies
  const currentReplies = useMemo(() => {
    if (!selectedThreadId) return [];
    return safeMsgs
      .filter(r => r.reply_to === selectedThreadId)
      .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
  }, [safeMsgs, selectedThreadId]);

  // Extract tags
  const extractTag = (content: string, tag: string) => {
    if (!content) return '';
    const match = content.match(new RegExp(`\\[${tag}:\\s*([^\\]]+)\\]`, 'i'));
    return match ? match[1].trim() : '';
  };

  // Get conversation partner
  const getPartnerLabel = useCallback((parentMsg: any) => {
    const sender = extractTag(parentMsg.content, 'Sender');
    const recipient = extractTag(parentMsg.content, 'Recipient');
    
    // If I am the sender, the partner is the recipient
    if (sender.toLowerCase() === myEmail.toLowerCase() || (isAdmin && sender === 'Admin')) {
      return recipient;
    }
    // If I am the recipient, the partner is the sender
    return sender;
  }, [myEmail, isAdmin]);

  // Determine if a message is from an admin
  const isMsgFromAdmin = useCallback((msg: any) => {
    const sender = extractTag(msg.content, 'Sender');
    return sender.toLowerCase() === 'admin' || msg.sender_role === 'admin';
  }, []);

  // Determine if a message is from me
  const isMsgFromMe = useCallback((msg: any) => {
    const sender = extractTag(msg.content, 'Sender');
    if (isAdmin && (sender === 'Admin' || msg.sender_role === 'admin')) return true;
    return sender.toLowerCase() === myEmail.toLowerCase();
  }, [myEmail, isAdmin]);

  // Extract clean content (strip metadata tags)
  const getCleanContent = useCallback((content: string) => {
    if (!content) return '';
    return content
      .replace(/\[Recipient:\s*[^\]\n]+\]/gi, '')
      .replace(/\[Sender:\s*[^\]\n]+\]/gi, '')
      .replace(/\[AdminTo:\s*[^\]\n]+\]/gi, '')
      .trim();
  }, []);

  // Sorted threads with latest message time
  const sortedThreads = useMemo(() => {
    const withLatest = threadParents.map(parent => {
      const replies = safeMsgs.filter(m => m.reply_to === parent.id);
      const allMsgs = [parent, ...replies];
      const latest = allMsgs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];
      
      // Unread logic: Only mark unread if the latest message is NOT from me and is not read
      const hasUnread = allMsgs.some(m => !m.is_read && !isMsgFromMe(m));
      return { parent, latest, hasUnread };
    });
    return withLatest.sort((a, b) => new Date(b.latest.created_at).getTime() - new Date(a.latest.created_at).getTime());
  }, [threadParents, safeMsgs, isMsgFromMe]);

  const filteredThreads = useMemo(() => {
    if (!searchTerm.trim()) return sortedThreads;
    const q = searchTerm.toLowerCase();
    return sortedThreads.filter(({ parent }) => {
      const label = getPartnerLabel(parent).toLowerCase();
      const content = getCleanContent(parent.content).toLowerCase();
      return label.includes(q) || content.includes(q);
    });
  }, [sortedThreads, searchTerm, getPartnerLabel, getCleanContent]);

  // Mark messages as read when thread is selected
  useEffect(() => {
    const markAsRead = async () => {
      if (!selectedThreadId || !user) return;
      const activeThread = threadParents.find(m => m.id === selectedThreadId);
      
      // Find all unread messages in this thread that are NOT from me
      const unreadIds = [
        ...(activeThread && !activeThread.is_read && !isMsgFromMe(activeThread) ? [activeThread.id] : []),
        ...currentReplies.filter(r => !r.is_read && !isMsgFromMe(r)).map(r => r.id)
      ];
      
      if (unreadIds.length > 0) {
        await supabase.from('inbox').update({ is_read: true }).in('id', unreadIds);
        fetchMessages();
      }
    };
    markAsRead();
  }, [selectedThreadId, currentReplies.length, user, threadParents, isMsgFromMe, fetchMessages]);

  // Start a new conversation
  const handleStart = async () => {
    if (!newContent.trim() || !user?.id) return;
    
    const recipient = newType === 'Bug' ? 'Admin' : newRecipientEmail.trim();
    if (!recipient) return;

    setSending(true);

    try {
      const senderLabel = isAdmin ? 'Admin' : myEmail;
      const finalContent = `[Recipient: ${recipient}]\n[Sender: ${senderLabel}]\n\n${newType === 'Bug' ? `[Bug Type: ${bugType}]\n` : ''}${newContent}`;
      const issueType = newType === 'Bug' ? `Bug: ${bugType}` : 'Message';
      
      // Insert ONE row for peer-to-peer / user-to-admin
      await supabase.from('inbox').insert([{
        user_id: user.id,
        sender_role: isAdmin ? 'admin' : 'user',
        content: finalContent,
        issue_type: issueType,
        is_read: false
      }]);
      
      setNewContent('');
      if (newType !== 'Bug') setNewRecipientEmail('');
      setShowModal(false);
      await fetchMessages();
    } catch (e) {
      console.error('Error sending message:', e);
    }
    setSending(false);
  };

  // Reply to an existing thread
  const handleReply = async () => {
    const thread = threadParents.find(m => m.id === selectedThreadId);
    if (!replyText.trim() || !thread || !user?.id) return;
    setSending(true);

    try {
      const partner = getPartnerLabel(thread);
      const senderLabel = isAdmin ? 'Admin' : myEmail;
      
      const finalContent = `[Recipient: ${partner}]\n[Sender: ${senderLabel}]\n\n${replyText}`;
      
      // Insert ONE reply row
      await supabase.from('inbox').insert([{
        user_id: user.id,
        sender_role: isAdmin ? 'admin' : 'user',
        content: finalContent,
        reply_to: thread.id,
        is_read: false
      }]);
      
      setReplyText('');
      await fetchMessages();
    } catch (e) {
      console.error('Error sending reply:', e);
    }
    setSending(false);
  };

  // Handle Enter key in reply box
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleReply();
    }
  };

  const activeThread = threadParents.find(m => m.id === selectedThreadId);

  if (!user) return null;

  return (
    <>
      <div className="space-y-6 pb-20 animate-slide-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
            {isAdmin
              ? <Shield className="w-6 h-6" style={{ color: '#F59E0B' }} />
              : <MessageSquare className="w-6 h-6" style={{ color: 'var(--accent-cyan)' }} />}
            Inbox
          </h2>
          <p className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{ color: 'var(--text-muted)' }}>
            Logged in as {myDisplayName}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => { setNewType('Bug'); setShowModal(true); }}
            className="px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white transition-all shadow-lg flex items-center gap-2"
            style={{ background: '#EF4444' }}
          >
            <Bug className="w-3.5 h-3.5" /> Report Bug
          </button>
          <button
            onClick={() => { setNewType('Message'); setShowModal(true); }}
            className="px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white transition-all shadow-lg flex items-center gap-2"
            style={{ background: 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-violet) 100%)' }}
          >
            <Plus className="w-3.5 h-3.5" /> New Message
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6" style={{ height: '620px' }}>
        {/* Threads List */}
        <div className="glass rounded-3xl flex flex-col overflow-hidden relative border-none shadow-2xl">
          <div className="p-5 border-b relative z-10" style={{ borderColor: 'var(--border-subtle)', background: 'rgba(0,0,0,0.02)' }}>
            <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Conversations ({filteredThreads.length})</p>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-2.5" style={{ color: 'var(--text-muted)' }} />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="input-glass w-full py-2 pl-9 pr-4 text-xs"
                style={{ textTransform: 'none' }}
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 relative z-10 custom-scrollbar">
            {filteredThreads.length === 0 && (
              <div className="py-12 text-center opacity-40">
                <MessageSquare className="w-8 h-8 mx-auto mb-2" style={{ color: 'var(--text-muted)' }} />
                <p className="text-[10px] font-bold uppercase" style={{ color: 'var(--text-muted)' }}>No conversations</p>
              </div>
            )}
            {filteredThreads.map(({ parent, latest, hasUnread }) => {
              const isActive = selectedThreadId === parent.id;
              const partnerName = getPartnerLabel(parent);
              const partnerIsAdmin = partnerName === 'Admin';
              
              return (
                <button
                  key={parent.id}
                  onClick={() => setSelectedThreadId(parent.id)}
                  className="w-full text-left p-4 rounded-2xl transition-all border group relative"
                  style={{
                    background: isActive ? 'var(--accent-cyan)' : 'transparent',
                    borderColor: isActive ? 'var(--accent-cyan)' : 'transparent',
                    boxShadow: isActive ? '0 8px 24px rgba(0,229,255,0.2)' : 'none'
                  }}
                >
                  {hasUnread && !isActive && (
                    <span className="absolute top-3 right-3 w-2 h-2 rounded-full bg-red-500" />
                  )}
                  <div className="flex justify-between items-start mb-1.5">
                    <span
                      className="text-[7px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest"
                      style={{
                        background: isActive ? 'rgba(0,0,0,0.15)' : 'rgba(0,229,255,0.1)',
                        color: isActive ? '#fff' : 'var(--accent-cyan)'
                      }}
                    >
                      {parent.issue_type || 'Message'}
                    </span>
                    <span className="text-[7px] font-bold" style={{ color: isActive ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)' }}>
                      {new Date(latest.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    {partnerIsAdmin ? (
                       <Shield className="w-3 h-3" style={{ color: isActive ? '#fff' : '#F59E0B' }} />
                    ) : (
                       <UserIcon className="w-3 h-3" style={{ color: isActive ? '#fff' : 'var(--text-primary)' }} />
                    )}
                    <p className="text-[10px] font-black truncate" style={{ color: isActive ? '#fff' : 'var(--text-primary)', textTransform: 'none' }}>
                      {partnerName}
                    </p>
                  </div>
                  <p className="text-[10px] truncate" style={{ color: isActive ? 'rgba(255,255,255,0.75)' : 'var(--text-secondary)' }}>
                    {getCleanContent(latest.content).slice(0, 60)}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Thread */}
        <div className="lg:col-span-3 glass rounded-3xl flex flex-col relative border-none shadow-2xl overflow-hidden">
          {activeThread ? (
            <>
              <div className="p-6 border-b flex justify-between items-center relative z-10 shrink-0" style={{ borderColor: 'var(--border-subtle)', background: 'rgba(0,0,0,0.02)' }}>
                <div>
                  <h4 className="text-lg font-black uppercase tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    {activeThread.issue_type || 'Conversation'}
                  </h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{ color: 'var(--accent-cyan)' }}>
                    With: <span style={{ textTransform: 'none' }}>{getPartnerLabel(activeThread)}</span>
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest" style={{ background: 'rgba(29,158,117,0.1)', color: 'var(--accent-teal)' }}>Active</span>
                  <button onClick={() => setSelectedThreadId(null)} className="p-2 rounded-xl transition-all" style={{ background: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 relative z-10 custom-scrollbar">
                {[activeThread, ...currentReplies].map((msg) => {
                  const isMe = isMsgFromMe(msg);
                  const msgIsAdmin = isMsgFromAdmin(msg);
                  return (
                    <motion.div
                      key={msg.id}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''}`}
                    >
                      {/* Avatar */}
                      <div
                        className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 shadow-md"
                        style={{
                          background: msgIsAdmin ? '#F59E0B' : 'var(--accent-cyan)',
                          color: '#fff'
                        }}
                        title={msgIsAdmin ? 'Admin' : 'User'}
                      >
                        {msgIsAdmin
                          ? <Shield className="w-4 h-4" />
                          : <UserIcon className="w-4 h-4" />}
                      </div>

                      {/* Bubble */}
                      <div className={`max-w-[75%] space-y-1 ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                        <div
                          className="p-4 rounded-2xl shadow-sm"
                          style={{
                            background: isMe
                              ? (isAdmin ? 'linear-gradient(135deg, #F59E0B, #D97706)' : 'var(--accent-cyan)')
                              : 'var(--bg-glass)',
                            color: isMe ? '#fff' : 'var(--text-primary)',
                            border: `1px solid ${isMe ? 'transparent' : 'var(--border-subtle)'}`,
                            borderTopRightRadius: isMe ? '4px' : '16px',
                            borderTopLeftRadius: !isMe ? '4px' : '16px',
                          }}
                        >
                          <p className="text-sm font-medium leading-relaxed" style={{ textTransform: 'none' }}>
                            {getCleanContent(msg.content)}
                          </p>
                        </div>
                        <p className="text-[8px] font-bold uppercase tracking-widest px-1" style={{ color: 'var(--text-muted)' }}>
                          {msgIsAdmin ? '🛡 Admin' : (isMe ? 'You' : 'User')} · {new Date(msg.created_at).toLocaleString()}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="p-5 border-t relative z-10 shrink-0" style={{ borderColor: 'var(--border-subtle)', background: 'rgba(0,0,0,0.02)' }}>
                <div className="flex gap-3 items-end input-glass p-2 rounded-2xl">
                  <textarea
                    ref={textareaRef}
                    value={replyText}
                    onChange={e => setReplyText(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a reply... (Enter to send, Shift+Enter for new line)"
                    className="flex-1 bg-transparent border-none p-3 text-sm focus:ring-0 outline-none resize-none min-h-[48px] max-h-[150px]"
                    style={{ color: 'var(--text-primary)', textTransform: 'none' }}
                    rows={1}
                  />
                  <button
                    onClick={handleReply}
                    disabled={sending || !replyText.trim()}
                    className="w-11 h-11 rounded-xl flex items-center justify-center transition-all shadow-lg active:scale-95 disabled:opacity-40 shrink-0"
                    style={{ background: isAdmin ? '#F59E0B' : 'var(--accent-cyan)', color: '#fff' }}
                  >
                    {sending ? <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send className="w-4 h-4" />}
                  </button>
                </div>
                <p className="text-[9px] font-bold uppercase tracking-widest mt-2 text-center" style={{ color: 'var(--text-muted)' }}>Enter to send · Shift+Enter for new line</p>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center opacity-40 text-center p-20 space-y-4">
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center" style={{ border: '2px dashed var(--text-muted)', color: 'var(--text-muted)' }}>
                <MessageSquare className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight" style={{ color: 'var(--text-primary)' }}>Select a Conversation</h3>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Click a thread on the left to view messages</p>
            </div>
          )}
        </div>
      </div>

      {/* New Message Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0 bg-black/20 dark:bg-black/75 backdrop-blur-xl"
            />
            <motion.div
              initial={{ scale: 0.92, y: 16, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.92, y: 16, opacity: 0 }}
              className="glass rounded-3xl p-8 w-full max-w-md relative z-10 border-none shadow-2xl"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-black uppercase tracking-tight" style={{ color: 'var(--text-primary)' }}>
                  {newType === 'Bug' ? '🐛 Report a Bug' : '✉️ New Message'}
                </h3>
                <button onClick={() => setShowModal(false)} className="p-2 rounded-xl transition-all" style={{ background: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-5">
                {newType === 'Message' && (
                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest mb-1.5 block" style={{ color: 'var(--text-muted)' }}>To (User Email)</label>
                    <input
                      type="email"
                      value={newRecipientEmail}
                      onChange={e => setNewRecipientEmail(e.target.value)}
                      className="input-glass w-full p-4 text-sm"
                      placeholder="user@example.com"
                      style={{ textTransform: 'none' }}
                    />
                  </div>
                )}

                {newType === 'Bug' && (
                  <>
                    <div className="p-4 rounded-2xl" style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)' }}>
                      <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--accent-cyan)' }}>Sending to: Admin Support</p>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Your bug report will be reviewed by our team</p>
                    </div>
                    <div>
                      <label className="text-[9px] font-black uppercase tracking-widest mb-1.5 block" style={{ color: 'var(--text-muted)' }}>Bug Category</label>
                      <select
                        value={bugType}
                        onChange={e => setBugType(e.target.value)}
                        className="input-glass w-full p-4 text-sm"
                        style={{ textTransform: 'none' }}
                      >
                        <option value="UI Glitch">UI Glitch</option>
                        <option value="General Bug">General Bug</option>
                        <option value="Performance">Performance Issue</option>
                        <option value="Data Loss">Data / Sync Issue</option>
                        <option value="Auth">Login / Auth Issue</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </>
                )}

                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest mb-1.5 block" style={{ color: 'var(--text-muted)' }}>
                    {newType === 'Bug' ? 'Describe the Bug' : 'Message'}
                  </label>
                  <textarea
                    value={newContent}
                    onChange={e => setNewContent(e.target.value)}
                    className="input-glass w-full p-4 text-sm min-h-[140px] resize-none"
                    placeholder={newType === 'Bug' ? 'Steps to reproduce, expected vs actual behavior...' : 'Write your message...'}
                    style={{ textTransform: 'none' }}
                  />
                </div>

                <button
                  onClick={handleStart}
                  disabled={sending || !newContent.trim() || (newType === 'Message' && !newRecipientEmail.trim())}
                  className="w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all text-white disabled:opacity-40"
                  style={{ background: newType === 'Bug' ? '#EF4444' : 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-violet) 100%)' }}
                >
                  {sending
                    ? <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</span>
                    : (newType === 'Bug' ? 'Submit Bug Report' : 'Send Message')}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
