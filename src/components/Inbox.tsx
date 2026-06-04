import { useEffect, useState, useMemo } from 'react';
import { supabase } from '../lib/supabase';
import { useTrackerStore } from '../store/useTrackerStore';
import { Send, User as UserIcon, Shield, MessageSquare, Check, AlertCircle, Plus, Search, X } from 'lucide-react';

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

  const ADMIN_ID = '06391879-d280-472e-b253-7e0685bf1014';
  const isAdmin = user?.id === ADMIN_ID;

  useEffect(() => {
    if (user) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 5000);
      return () => clearInterval(interval);
    }
  }, [user]);

  // Helper: Extract Recipient
  const getRecipient = (msg: any) => {
    if (!msg || !msg.content) return 'System';
    const match = msg.content.match(/\[Recipient: (.*?)\]/);
    return match ? match[1] : 'System';
  };

  // Helper: Extract Content
  const getCleanContent = (content: string) => {
    if (!content) return '';
    return content
      .replace(/\[Recipient: .*?\]/, '')
      .replace(/\[Sender: .*?\]/, '')
      .replace(/\[To: .*?\]/, '')
      .trim();
  };

  // Logic: Group messages by recipient
  const { threadParents, allReplies } = useMemo(() => {
    const safeMsgs = Array.isArray(messages) ? messages : [];
    const parents = safeMsgs.filter(m => !m.reply_to && (isAdmin || m.user_id === user?.id));
    const replies = safeMsgs.filter(m => m.reply_to);
    return { threadParents: parents, allReplies: replies };
  }, [messages, isAdmin, user?.id]);

  // Logic: Filter threads by search
  const displayedThreads = useMemo(() => {
    return threadParents.filter(m => {
      const rec = getRecipient(m).toLowerCase();
      return rec.includes(searchTerm.toLowerCase());
    });
  }, [threadParents, searchTerm]);

  // Logic: Get current replies
  const currentReplies = useMemo(() => {
    if (!selectedThreadId) return [];
    return allReplies.filter(r => r.reply_to === selectedThreadId).reverse();
  }, [allReplies, selectedThreadId]);

  const handleStart = async () => {
    if (!newContent.trim() || !user?.id) return;
    setSending(true);

    const targetRecipient = (newType === 'Bug' ? 'System' : newEmail || 'System').trim();
    
    // Check for existing thread
    const existing = threadParents.find(m => getRecipient(m).toLowerCase() === targetRecipient.toLowerCase());

    if (existing) {
      const { error } = await supabase.from('inbox').insert([{
        user_id: isAdmin ? existing.user_id : user.id,
        sender_role: isAdmin ? 'admin' : 'user',
        content: newContent,
        reply_to: existing.id,
        is_read: false
      }]);
      if (!error) {
        setNewContent(''); setShowModal(false); fetchMessages(); setSelectedThreadId(existing.id);
      }
    } else {
      const senderEmail = user.email || user.user_metadata?.email || 'Unknown';
      const finalContent = `[Recipient: ${targetRecipient}]\n[Sender: ${senderEmail}]\n\n${newContent}`;
      const { error } = await supabase.from('inbox').insert([{
        user_id: user.id,
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
      user_id: isAdmin ? thread.user_id : user.id,
      sender_role: isAdmin ? 'admin' : 'user',
      content: replyText,
      reply_to: thread.id,
      is_read: false
    }]);
    if (!error) { setReplyText(''); fetchMessages(); }
    setSending(false);
  };

  if (!user) return null;

  const activeThread = threadParents.find(m => m.id === selectedThreadId);

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-20 px-4 animate-slide-in-up">
      {/* Header Area */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3 text-gray-900 dark:text-white">
            {isAdmin ? <Shield className="text-blue-600" /> : <MessageSquare className="text-blue-600" />}
            {isAdmin ? 'Admin Center' : 'Communication'}
          </h2>
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mt-1">
            {isAdmin ? 'System feedback & bug reports' : 'Your private developer threads'}
          </p>
        </div>
        <div className="flex gap-2">
          {!isAdmin && (
            <button 
              onClick={() => { setNewType('Bug'); setShowModal(true); }}
              className="px-6 py-2.5 bg-red-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
            >
              Report Bug
            </button>
          )}
          <button 
            onClick={() => { setNewType('Message'); setShowModal(true); }}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 transition-all"
          >
            New Message
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[600px]">
        
        {/* Sidebar: Threads */}
        <div className="glass rounded-[2.5rem] flex flex-col overflow-hidden border-none shadow-2xl">
          <div className="p-5 border-b border-black/5 dark:border-white/5 bg-white/20 dark:bg-black/20 space-y-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Past Conversations</p>
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-gray-400" />
              <input 
                type="text" placeholder="Search recipients..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                className="w-full bg-white/40 dark:bg-black/40 border-none rounded-xl py-2 pl-9 pr-4 text-xs font-bold text-gray-900 dark:text-white placeholder:text-gray-500"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2 custom-scrollbar">
            {displayedThreads.map((m) => {
              const isActive = selectedThreadId === m.id;
              const rec = getRecipient(m);
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedThreadId(m.id)}
                  className={`w-full text-left p-4 rounded-[1.5rem] transition-all border-2 ${
                    isActive 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-lg' 
                      : 'bg-white/40 dark:bg-black/20 border-transparent hover:border-blue-500/30 text-gray-900 dark:text-white'
                  }`}
                >
                  <div className="flex justify-between items-start mb-1">
                    <span className={`text-[7px] font-black px-1.5 py-0.5 rounded-full uppercase ${isActive ? 'bg-white/20' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'}`}>
                      {m.issue_type || 'Message'}
                    </span>
                    <span className="text-[7px] opacity-60 font-bold">{new Date(m.created_at).toLocaleDateString()}</span>
                  </div>
                  <p className={`text-[10px] font-black truncate ${isActive ? 'text-white' : 'text-blue-600'}`}>{rec}</p>
                  <p className="text-[11px] font-medium truncate opacity-70 italic">"{getCleanContent(m.content)}"</p>
                </button>
              );
            })}
            {displayedThreads.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center opacity-20 text-center p-4 space-y-2">
                <MessageSquare className="w-10 h-10" />
                <p className="text-[10px] font-black uppercase tracking-tighter">No threads found</p>
              </div>
            )}
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3 glass rounded-[2.5rem] flex flex-col border-none shadow-2xl overflow-hidden relative">
          {activeThread ? (
            <>
              {/* Chat Header */}
              <div className="p-6 border-b border-black/5 dark:border-white/5 bg-white/20 dark:bg-black/20 flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tighter">
                    {activeThread.issue_type} Report
                  </h4>
                  <p className="text-[10px] font-bold text-blue-600 uppercase tracking-widest">
                    Recipient: {getRecipient(activeThread)}
                  </p>
                </div>
                <span className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-[10px] font-black uppercase border border-green-500/10">Active</span>
              </div>

              {/* Message List */}
              <div className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
                {/* Initial Post */}
                {(() => {
                  const isMe = isAdmin ? activeThread.sender_role === 'admin' : activeThread.sender_role === 'user';
                  return (
                    <div className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 border ${isMe ? 'bg-blue-600 border-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                        {isAdmin && isMe ? <Shield className="w-5 h-5" /> : <UserIcon className="w-5 h-5" />}
                      </div>
                      <div className={`max-w-[75%] ${isMe ? 'text-right' : ''}`}>
                        <div className={`p-3.5 rounded-[1.5rem] border shadow-sm ${isMe ? 'bg-blue-600 text-white border-blue-500 rounded-tr-none' : 'bg-white/60 dark:bg-white/5 text-gray-800 dark:text-gray-200 border-white/40 dark:border-white/5 rounded-tl-none'}`}>
                          <p className="text-sm font-medium leading-relaxed">{getCleanContent(activeThread.content)}</p>
                        </div>
                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-1.5 mx-1">{new Date(activeThread.created_at).toLocaleString()}</p>
                      </div>
                    </div>
                  );
                })()}

                {/* Replies */}
                {currentReplies.map((r) => {
                  const isMe = isAdmin ? r.sender_role === 'admin' : r.sender_role === 'user';
                  return (
                    <div key={r.id} className={`flex gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
                      <div className={`w-9 h-9 rounded-2xl flex items-center justify-center shrink-0 border ${isMe ? 'bg-blue-600 border-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800 text-gray-400'}`}>
                        {isAdmin && isMe ? <Shield className="w-5 h-5" /> : <UserIcon className="w-5 h-5" />}
                      </div>
                      <div className={`max-w-[75%] ${isMe ? 'text-right' : ''}`}>
                        <div className={`p-3.5 rounded-[1.5rem] border shadow-sm ${isMe ? 'bg-blue-600 text-white border-blue-500 rounded-tr-none' : 'bg-white/60 dark:bg-white/5 text-gray-800 dark:text-gray-200 border-white/40 dark:border-white/5 rounded-tl-none'}`}>
                          <p className="text-sm font-medium leading-relaxed">{r.content}</p>
                        </div>
                        <p className="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-1.5 mx-1">{new Date(r.created_at).toLocaleString()}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Reply Box */}
              <div className="p-6 border-t border-black/5 dark:border-white/5 bg-white/20 dark:bg-black/20">
                <div className="flex gap-4 items-end bg-white/40 dark:bg-black/40 p-2 rounded-[1.5rem] border border-black/5 dark:border-white/5 shadow-inner">
                  <textarea
                    value={replyText} onChange={e => setReplyText(e.target.value)} placeholder="Send a follow-up..."
                    className="flex-1 bg-transparent border-none p-3 text-sm font-medium focus:ring-0 resize-none min-h-[50px] max-h-[150px] text-gray-900 dark:text-white placeholder:text-gray-500"
                  />
                  <button
                    onClick={handleReply} disabled={sending || !replyText.trim()}
                    className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center hover:bg-blue-700 transition-all shadow-lg active:scale-95 disabled:opacity-50 shrink-0"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center opacity-40 text-center p-20 space-y-6">
              <div className="w-24 h-24 rounded-[2.5rem] bg-gray-100 dark:bg-white/5 flex items-center justify-center border-4 border-dashed border-gray-300 dark:border-white/10">
                <MessageSquare className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase tracking-tighter">Select a Conversation</h3>
                <p className="text-xs font-bold mt-2 max-w-xs">Pick a thread from the sidebar to view history.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* New Message Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/70 backdrop-blur-md">
          <div className="bg-white dark:bg-gray-900 rounded-[2.5rem] p-8 w-full max-w-md shadow-2xl border border-white/10 relative overflow-hidden">
            <button onClick={() => setShowModal(false)} className="absolute top-6 right-6 p-2 text-gray-400 hover:text-red-500 transition-colors"><X className="w-5 h-5" /></button>
            
            <h3 className="text-2xl font-black uppercase tracking-tighter text-gray-900 dark:text-white mb-6">
              {newType === 'Bug' ? 'Report a Bug' : 'New Message'}
            </h3>

            <div className="space-y-4">
              {newType === 'Message' && (
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">To (Recipient Email)</label>
                  <input 
                    type="email" value={newEmail} onChange={e => setNewEmail(e.target.value)} 
                    className="w-full bg-gray-100 dark:bg-white/5 border-none rounded-xl p-4 text-sm font-bold text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20" 
                    placeholder="user@example.com"
                  />
                </div>
              )}

              {newType === 'Bug' && (
                <div>
                  <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">Bug Type</label>
                  <select 
                    value={bugType} onChange={e => setBugType(e.target.value)} 
                    className="w-full bg-gray-100 dark:bg-gray-800 border-none rounded-xl p-4 text-sm font-bold text-gray-900 dark:text-white cursor-pointer"
                  >
                    <option value="General Bug" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">General Bug</option>
                    <option value="UI Glitch" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">UI Glitch</option>
                    <option value="Performance" className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">Performance Issue</option>
                  </select>
                </div>
              )}

              <div>
                <label className="text-[10px] font-black uppercase text-gray-400 mb-1 block">Message Description</label>
                <textarea 
                  value={newContent} onChange={e => setNewContent(e.target.value)} 
                  className="w-full bg-gray-100 dark:bg-white/5 border-none rounded-xl p-4 text-sm font-bold min-h-[150px] resize-none text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500/20" 
                  placeholder="Describe your issue..."
                />
              </div>

              <button 
                onClick={handleStart} disabled={sending || !newContent.trim() || (newType === 'Message' && !newEmail.trim())}
                className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl shadow-blue-600/20 hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
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
