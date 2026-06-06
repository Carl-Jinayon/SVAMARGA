import { useEffect, useState, useMemo, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { useTrackerStore } from '../store/useTrackerStore';
import { Send, User as UserIcon, Shield, MessageSquare, Search, X } from 'lucide-react';

export default function Inbox() {
  const { user, messages = [], fetchMessages } = useTrackerStore();
  const [replyText, setReplyText] = useState('');
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [newType, setNewType] = useState('Message');
  const [newEmail, setNewEmail] = useState('');
  const [newContent, setNewContent] = useState('');
  const [bugType, setBugType] = useState('General Bug');
  const scrollRef = useRef<HTMLDivElement>(null);

  const ADMIN_ID = '06391879-d280-472e-b253-7e0685bf1014';
  const isAdmin = user?.id === ADMIN_ID;

  const getMyEmail = (u: any) => u?.email || u?.user_metadata?.email || u?.user_metadata?.full_name || u?.user_metadata?.user_name || 'Unknown';

  const safeMsgs = useMemo(() => Array.isArray(messages) ? messages : [], [messages]);

  const currentReplies = useMemo(() => {
    if (!selectedThreadId) return [];
    return safeMsgs.filter(r => r.reply_to === selectedThreadId).reverse();
  }, [safeMsgs, selectedThreadId]);

  useEffect(() => {
    if (user) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const lastMsgCount = useRef(0);
  useEffect(() => {
    if (scrollRef.current) {
      const isNewThread = selectedThreadId;
      const hasNewMessages = currentReplies.length > lastMsgCount.current;
      
      if (isNewThread || hasNewMessages) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }
    lastMsgCount.current = currentReplies.length;
  }, [selectedThreadId, currentReplies.length]);

  const extractRecipientEmail = (content: string) => {
    if (!content) return 'Admin';
    const match = content.match(/\[Recipient:\s*([^\]\n]+)\]/i);
    return match ? match[1].trim() : 'Admin';
  };

  const extractSenderEmail = (content: string) => {
    if (!content) return 'Unknown';
    const match = content.match(/\[Sender:\s*([^\]\n]+)\]/i);
    return match ? match[1].trim() : 'Unknown';
  };

  const getOtherParty = (msg: any) => {
    const sender = extractSenderEmail(msg.content);
    const recipient = extractRecipientEmail(msg.content);
    
    if (isAdmin) {
      return sender.toLowerCase().includes('admin') ? recipient : sender;
    }
    return recipient.toLowerCase().includes('admin') ? 'Admin' : recipient;
  };

  const getCleanContent = (content: string) => {
    if (!content) return '';
    return content
      .replace(/\[Recipient:\s*[^\]\n]+\]/gi, '')
      .replace(/\[Sender:\s*[^\]\n]+\]/gi, '')
      .replace(/\[To:\s*[^\]\n]+\]/gi, '')
      .trim();
  };

  const threadParents = useMemo(() => {
    return safeMsgs.filter(m => !m.reply_to && (isAdmin || m.user_id === user?.id));
  }, [safeMsgs, isAdmin, user?.id]);

  const filteredThreads = useMemo(() => {
    return threadParents.filter(m => {
      const otherParty = getOtherParty(m);
      return otherParty.toLowerCase().includes(searchTerm.toLowerCase()) || 
             getCleanContent(m.content).toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [threadParents, searchTerm, isAdmin]);

  const displayedThreads = useMemo(() => {
    const withLatest = filteredThreads.map(parent => {
      const latest = safeMsgs.find(m => m.id === parent.id || m.reply_to === parent.id) || parent;
      return { parent, latest };
    });
    
    return withLatest.sort((a, b) => 
      new Date(b.latest.created_at).getTime() - new Date(a.latest.created_at).getTime()
    );
  }, [filteredThreads, safeMsgs]);

  const handleStart = async () => {
    if (!newContent.trim() || !user?.id) return;
    setSending(true);

    const myEmail = getMyEmail(user);
    const targetRecipient = (newType === 'Bug' ? 'Admin' : newEmail || 'Admin').trim();
    const isTargetAdmin = targetRecipient.toLowerCase() === 'admin';
    
    const existing = threadParents.find(m => {
      return getOtherParty(m).toLowerCase() === targetRecipient.toLowerCase();
    });

    if (existing) {
      const messagesToInsert = [];
      
      messagesToInsert.push({
        user_id: user.id,
        sender_role: isAdmin ? 'admin' : 'user',
        content: newContent,
        reply_to: existing.id,
        is_read: true 
      });

      if (!isAdmin && !isTargetAdmin) {
        let targetUserId = null;
        const previousMsg = safeMsgs.find(m => getOtherParty(m).toLowerCase() === targetRecipient.toLowerCase());
        if (previousMsg) targetUserId = previousMsg.user_id;

        if (targetUserId && targetUserId !== user.id) {
          messagesToInsert.push({
            user_id: targetUserId,
            sender_role: 'user',
            content: newContent,
            reply_to: existing.id,
            is_read: false
          });
        }
      } 
      else if (existing.user_id !== user.id) {
        messagesToInsert.push({
          user_id: existing.user_id,
          sender_role: isAdmin ? 'admin' : 'user',
          content: newContent,
          reply_to: existing.id,
          is_read: false
        });
      }

      const { error } = await supabase.from('inbox').insert(messagesToInsert);
      if (!error) {
        setNewContent(''); setShowModal(false); fetchMessages(); setSelectedThreadId(existing.id);
      }
    } else {
      const finalContent = `[Recipient: ${targetRecipient}]\n[Sender: ${myEmail}]\n\n${newContent}`;
      
      let targetUserId = user.id;
      if (isAdmin || (!isAdmin && !isTargetAdmin)) {
        const previousMsg = safeMsgs.find(m => getOtherParty(m).toLowerCase() === targetRecipient.toLowerCase());
        if (previousMsg) targetUserId = previousMsg.user_id;
      }

      const messagesToInsert = [];

      messagesToInsert.push({
        user_id: user.id,
        sender_role: isAdmin ? 'admin' : 'user',
        content: finalContent,
        issue_type: newType === 'Bug' ? `Bug: ${bugType}` : 'Message',
        is_read: true
      });

      if (targetUserId && targetUserId !== user.id) {
        messagesToInsert.push({
          user_id: targetUserId,
          sender_role: isAdmin ? 'admin' : 'user',
          content: finalContent,
          issue_type: newType === 'Bug' ? `Bug: ${bugType}` : 'Message',
          is_read: false
        });
      }

      const { error } = await supabase.from('inbox').insert(messagesToInsert);
      
      if (!error) {
        setNewContent(''); setNewEmail(''); setShowModal(false); fetchMessages();
      }
    }
    setSending(false);
  };

  const handleReply = async () => {
    const thread = threadParents.find(m => m.id === selectedThreadId);
    if (!replyText.trim() || !thread || !user?.id) return;
    setSending(true);

    const targetRecipient = getOtherParty(thread);
    const isTargetAdmin = targetRecipient.toLowerCase() === 'admin';
    const messagesToInsert = [];

    messagesToInsert.push({
      user_id: user.id,
      sender_role: isAdmin ? 'admin' : 'user',
      content: replyText,
      reply_to: thread.id,
      is_read: true
    });

    if (!isAdmin && !isTargetAdmin) {
       let targetUserId = null;
       const previousMsg = safeMsgs.find(m => getOtherParty(m).toLowerCase() === targetRecipient.toLowerCase());
       if (previousMsg) targetUserId = previousMsg.user_id;

       if (targetUserId && targetUserId !== user.id) {
         messagesToInsert.push({
           user_id: targetUserId,
           sender_role: 'user',
           content: replyText,
           reply_to: thread.id,
           is_read: false
         });
       }
    } else if (thread.user_id !== user.id) {
      messagesToInsert.push({
        user_id: thread.user_id,
        sender_role: isAdmin ? 'admin' : 'user',
        content: replyText,
        reply_to: thread.id,
        is_read: false
      });
    }

    const { error } = await supabase.from('inbox').insert(messagesToInsert);
    if (!error) { setReplyText(''); fetchMessages(); }
    setSending(false);
  };

  const activeThread = threadParents.find(m => m.id === selectedThreadId);

  useEffect(() => {
    const markAsRead = async () => {
      if (!selectedThreadId || !user) return;
      
      const unreadIds = [
        activeThread?.is_read === false ? activeThread.id : null,
        ...currentReplies.filter(r => r.is_read === false).map(r => r.id)
      ].filter(Boolean);

      if (unreadIds.length > 0) {
        await supabase
          .from('inbox')
          .update({ is_read: true })
          .in('id', unreadIds);
        fetchMessages();
      }
    };
    markAsRead();
  }, [selectedThreadId, currentReplies.length]);

  if (!user) return null;

  return (
    <div className="space-y-6 pb-20 animate-slide-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
            {isAdmin ? <Shield style={{ color: 'var(--accent-cyan)' }} /> : <MessageSquare style={{ color: 'var(--accent-cyan)' }} />}
            {isAdmin ? 'Admin Console' : 'Communication'}
          </h2>
          <p className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{ color: 'var(--text-muted)' }}>
            {isAdmin ? 'Monitoring all user activity' : `Logged in as ${getMyEmail(user)}`}
          </p>
        </div>
        <div className="flex gap-3">
          {!isAdmin && (
            <button 
              onClick={() => { setNewType('Bug'); setShowModal(true); }} 
              className="px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white transition-all shadow-lg"
              style={{ background: '#EF4444' }}
            >
              Report Bug
            </button>
          )}
          <button 
            onClick={() => { setNewType('Message'); setShowModal(true); }} 
            className="px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest text-white transition-all shadow-lg"
            style={{ background: 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-violet) 100%)' }}
          >
            New Message
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
        {/* Threads List */}
        <div className="glass rounded-3xl flex flex-col overflow-hidden relative border-none shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
          <div className="p-5 border-b relative z-10" style={{ borderColor: 'var(--border-subtle)', background: 'rgba(0,0,0,0.02)' }}>
            <p className="text-[10px] font-black uppercase tracking-widest mb-3" style={{ color: 'var(--text-muted)' }}>Conversations</p>
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
          <div className="flex-1 overflow-y-auto p-3 space-y-2 relative z-10">
            {displayedThreads.map(({ parent, latest }) => {
              const isActive = selectedThreadId === parent.id;
              const otherParty = getOtherParty(parent);
              return (
                <button 
                  key={parent.id} 
                  onClick={() => setSelectedThreadId(parent.id)} 
                  className="w-full text-left p-4 rounded-2xl transition-all border group"
                  style={{ 
                    background: isActive ? 'var(--accent-cyan)' : 'transparent',
                    borderColor: isActive ? 'var(--accent-cyan)' : 'transparent',
                    boxShadow: isActive ? '0 8px 24px rgba(0,229,255,0.2)' : 'none'
                  }}
                >
                  <div className="flex justify-between items-start mb-1.5">
                    <span 
                      className="text-[7px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest"
                      style={{ 
                        background: isActive ? 'rgba(0,0,0,0.1)' : 'rgba(0,229,255,0.1)', 
                        color: isActive ? '#fff' : 'var(--accent-cyan)' 
                      }}
                    >
                      {parent.issue_type || 'Message'}
                    </span>
                    <span className="text-[7px] font-bold uppercase tracking-widest" style={{ color: isActive ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)' }}>
                      {new Date(latest.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-[10px] font-black truncate mb-0.5" style={{ color: isActive ? '#fff' : 'var(--text-primary)' }}>
                    {isAdmin ? `User: ${otherParty}` : `To: ${otherParty}`}
                  </p>
                  <p className="text-[10px] font-medium truncate" style={{ color: isActive ? 'rgba(255,255,255,0.8)' : 'var(--text-secondary)' }}>
                    {latest.sender_role === (isAdmin ? 'admin' : 'user') ? 'You: ' : ''}
                    "{getCleanContent(latest.content)}"
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
              <div className="p-6 border-b flex justify-between items-center relative z-10" style={{ borderColor: 'var(--border-subtle)', background: 'rgba(0,0,0,0.02)' }}>
                <div>
                  <h4 className="text-lg font-black uppercase tracking-tight" style={{ color: 'var(--text-primary)' }}>{activeThread.issue_type} Report</h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{ color: 'var(--accent-cyan)' }}>
                    {isAdmin ? `User: ${getOtherParty(activeThread)}` : `Recipient: ${getOtherParty(activeThread)}`}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest" style={{ background: 'rgba(29,158,117,0.1)', color: 'var(--accent-teal)' }}>Active</span>
              </div>
              
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 relative z-10">
                {[activeThread, ...currentReplies].map((msg) => {
                  const isMe = isAdmin ? msg.sender_role === 'admin' : msg.sender_role === 'user';
                  return (
                    <div key={msg.id} className={`flex gap-4 ${isMe ? 'flex-row-reverse' : ''}`}>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-md"
                        style={{ 
                          background: isMe ? 'var(--accent-cyan)' : 'var(--bg-glass)',
                          border: `1px solid ${isMe ? 'var(--accent-cyan)' : 'var(--border-subtle)'}`,
                          color: isMe ? '#fff' : 'var(--text-muted)'
                        }}>
                        {msg.sender_role === 'admin' ? <Shield className="w-5 h-5" /> : <UserIcon className="w-5 h-5" />}
                      </div>
                      <div className={`max-w-[75%] ${isMe ? 'text-right' : ''}`}>
                        <div className="p-4 rounded-2xl shadow-sm"
                          style={{ 
                            background: isMe ? 'var(--accent-cyan)' : 'var(--bg-glass)',
                            color: isMe ? '#fff' : 'var(--text-primary)',
                            border: `1px solid ${isMe ? 'var(--accent-cyan)' : 'var(--border-subtle)'}`,
                            borderTopRightRadius: isMe ? '4px' : '16px',
                            borderTopLeftRadius: !isMe ? '4px' : '16px',
                          }}>
                          <p className="text-sm font-medium leading-relaxed" style={{ textTransform: 'none' }}>{getCleanContent(msg.content)}</p>
                        </div>
                        <p className="text-[8px] font-black uppercase tracking-widest mt-2 px-1" style={{ color: 'var(--text-muted)' }}>
                          {new Date(msg.created_at).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-6 border-t relative z-10" style={{ borderColor: 'var(--border-subtle)', background: 'rgba(0,0,0,0.02)' }}>
                <div className="flex gap-4 items-end input-glass p-2">
                  <textarea 
                    value={replyText} 
                    onChange={e => setReplyText(e.target.value)} 
                    placeholder="Type a response..." 
                    className="flex-1 bg-transparent border-none p-3 text-sm focus:ring-0 outline-none resize-none min-h-[50px] max-h-[150px]" 
                    style={{ color: 'var(--text-primary)', textTransform: 'none' }}
                  />
                  <button 
                    onClick={handleReply} 
                    disabled={sending || !replyText.trim()} 
                    className="w-12 h-12 rounded-xl flex items-center justify-center transition-all shadow-lg active:scale-95 disabled:opacity-50 shrink-0"
                    style={{ background: 'var(--accent-cyan)', color: '#fff' }}
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center opacity-40 text-center p-20 space-y-4">
              <div className="w-20 h-20 rounded-3xl flex items-center justify-center" style={{ border: '2px dashed var(--text-muted)', color: 'var(--text-muted)' }}>
                <MessageSquare className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight" style={{ color: 'var(--text-primary)' }}>Select a Conversation</h3>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setShowModal(false)} />
          <div className="glass rounded-3xl p-8 w-full max-w-md relative z-10 border-none shadow-2xl">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 p-2 transition-colors" style={{ color: 'var(--text-muted)' }}>
              <X className="w-5 h-5" />
            </button>
            
            <h3 className="text-2xl font-black uppercase tracking-tight mb-6" style={{ color: 'var(--text-primary)' }}>
              {newType === 'Bug' ? 'Report a Bug' : 'New Message'}
            </h3>
            
            <div className="space-y-5">
              {newType === 'Message' && (
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest mb-1.5 block" style={{ color: 'var(--text-muted)' }}>To (Recipient Email)</label>
                  <input 
                    type="email" 
                    value={newEmail} 
                    onChange={e => setNewEmail(e.target.value)} 
                    className="input-glass w-full p-4 text-sm" 
                    placeholder="user@example.com" 
                    style={{ textTransform: 'none' }}
                  />
                </div>
              )}
              {newType === 'Bug' && (
                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest mb-1.5 block" style={{ color: 'var(--text-muted)' }}>Bug Type</label>
                  <select 
                    value={bugType} 
                    onChange={e => setBugType(e.target.value)} 
                    className="input-glass w-full p-4 text-sm"
                    style={{ textTransform: 'none' }}
                  >
                    <option value="General Bug">General Bug</option>
                    <option value="UI Glitch">UI Glitch</option>
                    <option value="Performance">Performance Issue</option>
                  </select>
                </div>
              )}
              <div>
                <label className="text-[9px] font-black uppercase tracking-widest mb-1.5 block" style={{ color: 'var(--text-muted)' }}>Message</label>
                <textarea 
                  value={newContent} 
                  onChange={e => setNewContent(e.target.value)} 
                  className="input-glass w-full p-4 text-sm min-h-[150px] resize-none" 
                  placeholder="Details..." 
                  style={{ textTransform: 'none' }}
                />
              </div>
              <button 
                onClick={handleStart} 
                disabled={sending || !newContent.trim() || (newType === 'Message' && !newEmail.trim())} 
                className="w-full py-4 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all text-white"
                style={{ background: newType === 'Bug' ? '#EF4444' : 'var(--accent-cyan)', opacity: sending ? 0.5 : 1 }}
              >
                {sending ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
