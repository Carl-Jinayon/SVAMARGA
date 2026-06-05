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

  // Auto-scroll to bottom only on selection or new local message
  const lastMsgCount = useRef(0);
  useEffect(() => {
    if (scrollRef.current) {
      const isNewThread = selectedThreadId;
      const hasNewMessages = currentReplies.length > lastMsgCount.current;
      
      // If we just switched threads or WE sent a message (or just received one while at bottom)
      if (isNewThread || hasNewMessages) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    }
    lastMsgCount.current = currentReplies.length;
  }, [selectedThreadId, currentReplies.length]);

  // Helper: Extract Recipient Email from content tags
  const extractRecipientEmail = (content: string) => {
    if (!content) return 'Admin';
    const match = content.match(/\[Recipient:\s*([^\]\n]+)\]/i);
    return match ? match[1].trim() : 'Admin';
  };

  // Helper: Extract Sender Email from content tags
  const extractSenderEmail = (content: string) => {
    if (!content) return 'Unknown';
    const match = content.match(/\[Sender:\s*([^\]\n]+)\]/i);
    return match ? match[1].trim() : 'Unknown';
  };

  const getOtherParty = (msg: any) => {
    const sender = extractSenderEmail(msg.content);
    const recipient = extractRecipientEmail(msg.content);
    
    if (isAdmin) {
      // If I'm admin, the other party is whoever is NOT me (Admin)
      return sender.toLowerCase().includes('admin') ? recipient : sender;
    }
    // If I'm a user, the other party is the recipient (usually Admin) or the sender (if Admin replied)
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

  // Logic: Identify thread parents (top-level messages)
  const threadParents = useMemo(() => {
    return safeMsgs.filter(m => !m.reply_to && (isAdmin || m.user_id === user?.id));
  }, [safeMsgs, isAdmin, user?.id]);

  // Logic: Group messages by the "Other Party"
  const filteredThreads = useMemo(() => {
    return threadParents.filter(m => {
      const otherParty = getOtherParty(m);
      return otherParty.toLowerCase().includes(searchTerm.toLowerCase()) || 
             getCleanContent(m.content).toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [threadParents, searchTerm, isAdmin]);

  // Logic: Sort by latest message in thread
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
    
    // 1. Try to find an existing thread with this email
    const existing = threadParents.find(m => {
      return getOtherParty(m).toLowerCase() === targetRecipient.toLowerCase();
    });

    if (existing) {
      // Reply to existing thread
      const { error } = await supabase.from('inbox').insert([{
        user_id: existing.user_id, // Keep the thread owner's ID
        sender_role: isAdmin ? 'admin' : 'user',
        content: newContent,
        reply_to: existing.id,
        is_read: false
      }]);
      if (!error) {
        setNewContent(''); setShowModal(false); fetchMessages(); setSelectedThreadId(existing.id);
      }
    } else {
      // Start a brand new thread
      const finalContent = `[Recipient: ${targetRecipient}]\n[Sender: ${myEmail}]\n\n${newContent}`;
      
      // If admin starts it, we don't have the user's UUID yet. 
      // We search ALL messages to see if we ever saw this email before to find their ID.
      let targetUserId = user.id;
      if (isAdmin) {
        const previousMsg = safeMsgs.find(m => getOtherParty(m).toLowerCase() === targetRecipient.toLowerCase());
        if (previousMsg) targetUserId = previousMsg.user_id;
      }

      const { error } = await supabase.from('inbox').insert([{
        user_id: targetUserId,
        sender_role: isAdmin ? 'admin' : 'user',
        content: finalContent,
        issue_type: newType === 'Bug' ? `Bug: ${bugType}` : 'Message',
        is_read: false
      }]);
      
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
    const { error } = await supabase.from('inbox').insert([{
      user_id: thread.user_id, // Always use the thread owner's ID
      sender_role: isAdmin ? 'admin' : 'user',
      content: replyText,
      reply_to: thread.id,
      is_read: false
    }]);
    if (!error) { setReplyText(''); fetchMessages(); }
    setSending(false);
  };

  const activeThread = threadParents.find(m => m.id === selectedThreadId);

  // Logic: Mark as Read
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
    <div className="max-w-7xl mx-auto space-y-6 pb-20 px-4 animate-slide-in-up">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3 text-gray-900 dark:text-white">
            {isAdmin ? <Shield className="text-blue-600" /> : <MessageSquare className="text-blue-600" />}
            {isAdmin ? 'Admin Console' : 'Communication'}
          </h2>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">
            {isAdmin ? 'Monitoring all user activity' : `Logged in as ${getMyEmail(user)}`}
          </p>
        </div>
        <div className="flex gap-2">
          {!isAdmin && (
            <button onClick={() => { setNewType('Bug'); setShowModal(true); }} className="px-6 py-2.5 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all">Report Bug</button>
          )}
          <button onClick={() => { setNewType('Message'); setShowModal(true); }} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all">New Message</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
        <div className="glass rounded-[2.5rem] flex flex-col overflow-hidden shadow-2xl">
          <div className="p-5 border-b border-black/5 dark:border-white/5 bg-white/20 dark:bg-black/20 space-y-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Conversations</p>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
              <input type="text" placeholder="Search email or content..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full bg-white/40 dark:bg-black/40 border-none rounded-xl py-2 pl-9 pr-4 text-xs font-bold text-gray-900 dark:text-white placeholder:text-gray-500" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
            {displayedThreads.map(({ parent, latest }) => {
              const isActive = selectedThreadId === parent.id;
              const otherParty = getOtherParty(parent);
              return (
                <button key={parent.id} onClick={() => setSelectedThreadId(parent.id)} className={`w-full text-left p-4 rounded-[1.5rem] transition-all border-2 ${isActive ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-white/40 dark:bg-black/20 border-transparent hover:border-blue-500/30 text-gray-900 dark:text-white'}`}>
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase ${isActive ? 'bg-white/20' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'}`}>{parent.issue_type || 'Message'}</span>
                    <span className="text-[7px] opacity-60 font-bold">{new Date(latest.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className={`text-[10px] font-black truncate ${isActive ? 'text-white' : 'text-blue-600'}`}>{isAdmin ? `User: ${otherParty}` : `To: ${otherParty}`}</p>
                  <p className="text-[11px] font-medium truncate opacity-70 italic">
                    {latest.sender_role === (isAdmin ? 'admin' : 'user') ? 'You: ' : ''}
                    "{getCleanContent(latest.content)}"
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-3 glass rounded-[2.5rem] flex flex-col shadow-2xl overflow-hidden relative">
          {activeThread ? (
            <>
              <div className="p-6 border-b border-black/5 dark:border-white/5 bg-white/20 dark:bg-black/20 flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tighter">{activeThread.issue_type} Report</h4>
                  <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">{isAdmin ? `User: ${getOtherParty(activeThread)}` : `Recipient: ${getOtherParty(activeThread)}`}</p>
                </div>
                <span className="px-3 py-1 bg-green-500 text-white rounded-full text-[10px] font-black uppercase">Active</span>
              </div>
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
                {[activeThread, ...currentReplies].map((msg) => {
                  const isMe = isAdmin ? msg.sender_role === 'admin' : msg.sender_role === 'user';
                  return (
                    <div key={msg.id} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 border ${isMe ? 'bg-blue-600 border-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                        {msg.sender_role === 'admin' ? <Shield className="w-5 h-5" /> : <UserIcon className="w-5 h-5" />}
                      </div>
                      <div className={`max-w-[75%] ${isMe ? 'text-right' : ''}`}>
                        <div className={`p-3.5 rounded-[1.5rem] border shadow-sm ${isMe ? 'bg-blue-600 text-white border-blue-500 rounded-tr-none' : 'bg-white/60 dark:bg-white/5 text-gray-800 dark:text-gray-200 border-white/40 dark:border-white/5 rounded-tl-none'}`}>
                          <p className="text-sm font-medium leading-relaxed">{getCleanContent(msg.content)}</p>
                        </div>
                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-1.5 mx-1">{new Date(msg.created_at).toLocaleString()}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="p-6 border-t border-black/5 dark:border-white/5 bg-white/20 dark:bg-black/20">
                <div className="flex gap-4 items-end bg-white/40 dark:bg-black/40 p-2 rounded-[1.5rem] border border-black/5 dark:border-white/5 shadow-inner focus-within:ring-0 focus-within:border-black/10 dark:focus-within:border-white/10 transition-all">
                  <textarea value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Type a response..." className="flex-1 bg-transparent border-none p-3 text-sm font-medium focus:ring-0 outline-none resize-none min-h-[50px] max-h-[150px] text-gray-900 dark:text-white" />
                  <button onClick={handleReply} disabled={sending || !replyText.trim()} className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center hover:bg-blue-700 transition-all shadow-lg active:scale-95 disabled:opacity-50 shrink-0"><Send className="w-5 h-5" /></button>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center opacity-40 text-center p-20 space-y-6">
              <div className="w-24 h-24 rounded-[2.5rem] bg-gray-100 dark:bg-white/5 flex items-center justify-center border-4 border-dashed border-gray-300 dark:border-white/10"><MessageSquare className="w-10 h-10" /></div>
              <h3 className="text-xl font-black uppercase tracking-tighter">Select a Conversation</h3>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/70 backdrop-blur-md">
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 w-full max-w-md shadow-2xl relative">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-red-500 transition-colors"><X className="w-5 h-5" /></button>
            <h3 className="text-2xl font-black uppercase tracking-tighter text-gray-900 dark:text-white mb-6">{newType === 'Bug' ? 'Report a Bug' : 'New Message'}</h3>
            <div className="space-y-4">
              {newType === 'Message' && (
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">To (Recipient Email)</label>
                  <input type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} className="w-full bg-gray-100 dark:bg-white/5 border-none rounded-xl p-4 text-sm font-bold text-gray-900 dark:text-white" placeholder="user@example.com" />
                </div>
              )}
              {newType === 'Bug' && (
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">Bug Type</label>
                  <select value={bugType} onChange={e => setBugType(e.target.value)} className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-xl p-4 text-sm font-bold text-gray-900 dark:text-white">
                    <option value="General Bug">General Bug</option><option value="UI Glitch">UI Glitch</option><option value="Performance">Performance Issue</option>
                  </select>
                </div>
              )}
              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">Message</label>
                <textarea value={newContent} onChange={e => setNewContent(e.target.value)} className="w-full bg-gray-100 dark:bg-white/5 border-none rounded-xl p-4 text-sm font-bold min-h-[150px] resize-none text-gray-900 dark:text-white" placeholder="Details..." />
              </div>
              <button onClick={handleStart} disabled={sending || !newContent.trim() || (newType === 'Message' && !newEmail.trim())} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl hover:scale-105 active:scale-95 transition-all">Send Message</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
