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
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [newContent, setNewContent] = useState('');
  const [bugType, setBugType] = useState('General Bug');
  const scrollRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const isAdmin = user?.id === ADMIN_ID;

  const getDisplayName = useCallback((u: any) => {
    if (!u) return 'Unknown';
    return u.email || u.user_metadata?.email || u.user_metadata?.full_name || u.user_metadata?.user_name || 'Unknown';
  }, []);

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

  // Fetch messages on mount and on a 5s interval
  useEffect(() => {
    if (user) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [user?.id]);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [currentReplies.length, selectedThreadId]);

  // Extract clean content (strip metadata tags)
  const getCleanContent = useCallback((content: string) => {
    if (!content) return '';
    return content
      .replace(/\[Recipient:\s*[^\]\n]+\]/gi, '')
      .replace(/\[Sender:\s*[^\]\n]+\]/gi, '')
      .replace(/\[AdminTo:\s*[^\]\n]+\]/gi, '')
      .trim();
  }, []);

  // Get sender label for thread list
  const getThreadLabel = useCallback((parent: any) => {
    if (isAdmin) {
      // Admin sees who sent it
      const senderTag = parent.content?.match(/\[Sender:\s*([^\]\n]+)\]/i);
      return senderTag ? senderTag[1].trim() : (parent.sender_role === 'admin' ? 'Admin (You)' : `User (${parent.user_id?.slice(0, 8)}...)`);
    } else {
      // User sees who they're talking to
      return 'Admin Support';
    }
  }, [isAdmin]);

  // Sorted threads with latest message time
  const sortedThreads = useMemo(() => {
    const withLatest = threadParents.map(parent => {
      const replies = safeMsgs.filter(m => m.reply_to === parent.id);
      const allMsgs = [parent, ...replies];
      const latest = allMsgs.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];
      const hasUnread = allMsgs.some(m => !m.is_read);
      return { parent, latest, hasUnread };
    });
    return withLatest.sort((a, b) => new Date(b.latest.created_at).getTime() - new Date(a.latest.created_at).getTime());
  }, [threadParents, safeMsgs]);

  const filteredThreads = useMemo(() => {
    if (!searchTerm.trim()) return sortedThreads;
    const q = searchTerm.toLowerCase();
    return sortedThreads.filter(({ parent }) => {
      const label = getThreadLabel(parent).toLowerCase();
      const content = getCleanContent(parent.content).toLowerCase();
      return label.includes(q) || content.includes(q);
    });
  }, [sortedThreads, searchTerm, getThreadLabel, getCleanContent]);

  // Mark messages as read when thread is selected
  useEffect(() => {
    const markAsRead = async () => {
      if (!selectedThreadId || !user) return;
      const activeThread = threadParents.find(m => m.id === selectedThreadId);
      const unreadIds = [
        ...(activeThread && !activeThread.is_read ? [activeThread.id] : []),
        ...currentReplies.filter(r => !r.is_read).map(r => r.id)
      ];
      if (unreadIds.length > 0) {
        await supabase.from('inbox').update({ is_read: true }).in('id', unreadIds);
        fetchMessages();
      }
    };
    markAsRead();
  }, [selectedThreadId, currentReplies.length]);

  // Start a new conversation
  const handleStart = async () => {
    if (!newContent.trim() || !user?.id) return;
    setSending(true);

    try {
      if (isAdmin) {
        // Admin sending to a user by email
        if (!newAdminEmail.trim()) { setSending(false); return; }
        
        // Look up user by email from existing messages
        const targetMsg = safeMsgs.find(m => {
          const senderTag = m.content?.match(/\[Sender:\s*([^\]\n]+)\]/i);
          return senderTag && senderTag[1].trim().toLowerCase() === newAdminEmail.trim().toLowerCase();
        });
        
        const targetUserId = targetMsg?.user_id || null;
        
        if (!targetUserId) {
          // Can't find the user, create message with note
          const finalContent = `[AdminTo: ${newAdminEmail}]\n[Sender: Admin]\n\n${newContent}`;
          await supabase.from('inbox').insert([{
            user_id: ADMIN_ID,
            sender_role: 'admin',
            content: finalContent,
            issue_type: 'Message',
            is_read: true
          }]);
        } else {
          const finalContent = `[AdminTo: ${newAdminEmail}]\n[Sender: Admin]\n\n${newContent}`;
          // Insert for admin's own view
          await supabase.from('inbox').insert([{
            user_id: ADMIN_ID,
            sender_role: 'admin',
            content: finalContent,
            issue_type: 'Message',
            is_read: true
          }]);
          // Insert for user's view (stored under their user_id)
          await supabase.from('inbox').insert([{
            user_id: targetUserId,
            sender_role: 'admin',
            content: finalContent,
            issue_type: 'Message',
            is_read: false
          }]);
        }
      } else {
        // Regular user sending to admin
        const finalContent = `[Sender: ${myDisplayName}]\n\n${newType === 'Bug' ? `[Bug Type: ${bugType}]\n` : ''}${newContent}`;
        const issueType = newType === 'Bug' ? `Bug: ${bugType}` : 'Message';
        
        // Store under user's ID so they can see their own message
        await supabase.from('inbox').insert([{
          user_id: user.id,
          sender_role: 'user',
          content: finalContent,
          issue_type: issueType,
          is_read: true  // user's own copy is read
        }]);
        // Admin sees ALL messages without user_id filter, so admin will see this automatically
      }
      
      setNewContent('');
      setNewAdminEmail('');
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
      if (isAdmin) {
        // Admin replying to a user's thread
        // Store under the thread owner's user_id so the user sees the reply
        await supabase.from('inbox').insert([{
          user_id: thread.user_id,  // Store under user's ID!
          sender_role: 'admin',
          content: replyText,
          reply_to: thread.id,
          is_read: false  // unread for the user
        }]);
        // Also store for admin's own view under admin's ID
        await supabase.from('inbox').insert([{
          user_id: ADMIN_ID,
          sender_role: 'admin',
          content: replyText,
          reply_to: thread.id,
          is_read: true
        }]);
      } else {
        // User replying to their thread
        // Store under user's own ID
        await supabase.from('inbox').insert([{
          user_id: user.id,
          sender_role: 'user',
          content: replyText,
          reply_to: thread.id,
          is_read: true  // user's own copy
        }]);
        // Admin will see it automatically (no filter on admin side)
        // But we also want admin to get an unread notification
        // Store a copy under admin's ID so admin's unread count works
        await supabase.from('inbox').insert([{
          user_id: ADMIN_ID,
          sender_role: 'user',
          content: replyText,
          reply_to: thread.id,
          is_read: false  // unread for admin
        }]);
      }
      
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
    <div className="space-y-6 pb-20 animate-slide-in-up">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
            {isAdmin
              ? <Shield className="w-6 h-6" style={{ color: '#F59E0B' }} />
              : <MessageSquare className="w-6 h-6" style={{ color: 'var(--accent-cyan)' }} />}
            {isAdmin ? 'Admin Console' : 'Inbox'}
          </h2>
          <p className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{ color: 'var(--text-muted)' }}>
            {isAdmin ? 'All user conversations' : `Logged in as ${myDisplayName}`}
          </p>
        </div>
        <div className="flex gap-3">
          {!isAdmin && (
            <button
              onClick={() => { setNewType('Bug'); setShowModal(true); }}
              className="px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white transition-all shadow-lg flex items-center gap-2"
              style={{ background: '#EF4444' }}
            >
              <Bug className="w-3.5 h-3.5" /> Report Bug
            </button>
          )}
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
              const label = getThreadLabel(parent);
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
                  <p className="text-[10px] font-black truncate mb-0.5" style={{ color: isActive ? '#fff' : 'var(--text-primary)' }}>
                    {isAdmin ? label : 'Admin Support'}
                  </p>
                  <p className="text-[10px] truncate" style={{ color: isActive ? 'rgba(255,255,255,0.75)' : 'var(--text-secondary)' }}>
                    {latest.sender_role === 'admin' ? '🛡 Admin: ' : '👤 '}
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
                    {isAdmin ? `From: ${getThreadLabel(activeThread)}` : 'Admin Support Channel'}
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
                  const isMe = isAdmin ? msg.sender_role === 'admin' : msg.sender_role === 'user';
                  const isAdminMsg = msg.sender_role === 'admin';
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
                          background: isAdminMsg ? '#F59E0B' : 'var(--accent-cyan)',
                          color: '#fff'
                        }}
                        title={isAdminMsg ? 'Admin' : 'User'}
                      >
                        {isAdminMsg
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
                          {isAdminMsg ? '🛡 Admin' : '👤 User'} · {new Date(msg.created_at).toLocaleString()}
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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)' }}
            onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
          >
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
                {isAdmin && newType === 'Message' && (
                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest mb-1.5 block" style={{ color: 'var(--text-muted)' }}>To (User Email)</label>
                    <input
                      type="email"
                      value={newAdminEmail}
                      onChange={e => setNewAdminEmail(e.target.value)}
                      className="input-glass w-full p-4 text-sm"
                      placeholder="user@example.com"
                      style={{ textTransform: 'none' }}
                    />
                  </div>
                )}

                {!isAdmin && (
                  <div className="p-4 rounded-2xl" style={{ background: 'rgba(0,229,255,0.08)', border: '1px solid rgba(0,229,255,0.2)' }}>
                    <p className="text-[10px] font-black uppercase tracking-widest" style={{ color: 'var(--accent-cyan)' }}>Sending to: Admin Support</p>
                    <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Your message will be reviewed by our team</p>
                  </div>
                )}

                {newType === 'Bug' && (
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
                  disabled={sending || !newContent.trim() || (isAdmin && newType === 'Message' && !newAdminEmail.trim())}
                  className="w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all text-white disabled:opacity-40"
                  style={{ background: newType === 'Bug' ? '#EF4444' : 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-violet) 100%)' }}
                >
                  {sending
                    ? <span className="flex items-center justify-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Sending...</span>
                    : (newType === 'Bug' ? 'Submit Bug Report' : 'Send Message')}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
