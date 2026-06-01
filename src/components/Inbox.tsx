import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useTrackerStore } from '../store/useTrackerStore';
import { Send, User as UserIcon, Shield, MessageSquare, Check, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Inbox() {
  const { user, messages, fetchMessages } = useTrackerStore();
  const [replyText, setReplyText] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<string | null>(null);
  const [sending, setSending] = useState(false);

  // Replace this with your actual User ID from Supabase Auth
  const ADMIN_ID = '06391879-d280-472e-b253-7e0685bf1014';
  const isAdmin = user?.id === ADMIN_ID;

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 30000); // Poll every 30s
    return () => clearInterval(interval);
  }, []);

  const handleSendReply = async (originalMessageId: string, userId: string) => {
    if (!replyText.trim()) return;
    setSending(true);

    const { error } = await supabase.from('inbox').insert([
      {
        user_id: userId,
        sender_role: isAdmin ? 'admin' : 'user',
        content: replyText,
        reply_to: originalMessageId,
        created_at: new Date().toISOString(),
        is_read: false
      }
    ]);

    if (!error) {
      setReplyText('');
      fetchMessages();
    }
    setSending(false);
  };

  const filteredMessages = isAdmin 
    ? messages.filter(m => !m.reply_to) // Admin sees original reports
    : messages.filter(m => m.user_id === user?.id && !m.reply_to); // User sees their own reports

  const getReplies = (messageId: string) => messages.filter(m => m.reply_to === messageId).reverse();

  return (
    <div className="animate-slide-in-up max-w-5xl mx-auto space-y-8 pb-20">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-3xl font-black uppercase tracking-tighter flex items-center gap-3">
            {isAdmin ? <Shield className="text-blue-600" /> : <MessageSquare className="text-blue-600" />}
            {isAdmin ? 'Admin Command Center' : 'Communication Inbox'}
          </h2>
          <p className="text-xs font-bold text-gray-500 mt-1 uppercase tracking-widest">
            {isAdmin ? 'Monitoring user reports and acknowledgments' : 'History of your reports and developer replies'}
          </p>
        </div>
        <button 
          onClick={() => fetchMessages()}
          className="p-3 bg-white/50 dark:bg-white/10 rounded-2xl hover:bg-white dark:hover:bg-white/20 transition-all border border-white/20"
        >
          <Clock className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-[700px]">
        {/* Sidebar: Message List */}
        <div className="glass rounded-[2.5rem] overflow-hidden flex flex-col border-none shadow-2xl">
          <div className="p-6 border-b border-black/5 dark:border-white/5 bg-white/20 dark:bg-black/20">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Recent Conversations</p>
          </div>
          <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3">
            {filteredMessages.map((msg) => {
              const replies = getReplies(msg.id);
              const lastActivity = replies.length > 0 ? replies[replies.length - 1].created_at : msg.created_at;
              
              return (
                <button
                  key={msg.id}
                  onClick={() => setSelectedMessage(msg.id)}
                  className={`w-full text-left p-5 rounded-3xl transition-all border-2 ${
                    selectedMessage === msg.id 
                      ? 'bg-blue-600 border-blue-600 shadow-lg shadow-blue-600/20 text-white' 
                      : 'bg-white/40 dark:bg-black/20 border-transparent hover:border-white/40 text-gray-900 dark:text-white'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase ${
                      selectedMessage === msg.id ? 'bg-white/20' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600'
                    }`}>
                      {msg.issue_type || 'Message'}
                    </span>
                    <span className={`text-[8px] font-bold opacity-60`}>
                      {new Date(lastActivity).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm font-bold line-clamp-1">{msg.content}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <div className="flex -space-x-2">
                      <div className="w-5 h-5 rounded-full bg-gray-200 dark:bg-gray-700 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                        <UserIcon className="w-2.5 h-2.5" />
                      </div>
                      {replies.length > 0 && (
                        <div className="w-5 h-5 rounded-full bg-blue-500 border-2 border-white dark:border-gray-800 flex items-center justify-center">
                          <Check className="w-2.5 h-2.5 text-white" />
                        </div>
                      )}
                    </div>
                    <p className={`text-[9px] font-black uppercase tracking-tighter ${selectedMessage === msg.id ? 'text-white/80' : 'text-gray-400'}`}>
                      {replies.length > 0 ? 'Replied' : 'Pending'}
                    </p>
                  </div>
                </button>
              );
            })}
            {filteredMessages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4 opacity-30">
                <MessageSquare className="w-12 h-12" />
                <p className="text-xs font-black uppercase italic">No messages yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Content: Conversation */}
        <div className="lg:col-span-2 glass rounded-[2.5rem] flex flex-col border-none shadow-2xl relative overflow-hidden">
          {selectedMessage ? (
            <>
              {/* Conversation Header */}
              {(() => {
                const msg = messages.find(m => m.id === selectedMessage);
                return (
                  <div className="p-8 border-b border-black/5 dark:border-white/5 bg-white/20 dark:bg-black/20 flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tighter">
                        {msg?.issue_type} Report
                      </h4>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                        Case ID: {msg?.id.slice(0, 8)} • User: {msg?.user_id.slice(0, 8)}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-[10px] font-black uppercase border border-green-500/20">Active</span>
                    </div>
                  </div>
                );
              })()}

              {/* Message Thread */}
              <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-6">
                {(() => {
                  const mainMsg = messages.find(m => m.id === selectedMessage);
                  const replies = getReplies(selectedMessage);
                  if (!mainMsg) return null;

                  return (
                    <>
                      {/* Original Message */}
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center shrink-0 border border-black/5 dark:border-white/5">
                          <UserIcon className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="space-y-2 max-w-[80%]">
                          <div className="bg-white/60 dark:bg-white/5 p-5 rounded-3xl rounded-tl-none border border-white/40 dark:border-white/5 shadow-sm">
                            <p className="text-sm font-medium text-gray-800 dark:text-gray-200 leading-relaxed">{mainMsg.content}</p>
                          </div>
                          <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">
                            {new Date(mainMsg.created_at).toLocaleString()}
                          </p>
                        </div>
                      </div>

                      {/* Replies */}
                      <AnimatePresence>
                        {replies.map((reply) => (
                          <motion.div 
                            key={reply.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex gap-4 ${reply.sender_role === 'admin' ? 'flex-row-reverse' : ''}`}
                          >
                            <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 border ${
                              reply.sender_role === 'admin' 
                                ? 'bg-blue-600 border-blue-500 text-white' 
                                : 'bg-gray-100 dark:bg-gray-800 border-black/5 dark:border-white/5'
                            }`}>
                              {reply.sender_role === 'admin' ? <Shield className="w-5 h-5" /> : <UserIcon className="w-5 h-5 text-gray-400" />}
                            </div>
                            <div className={`space-y-2 max-w-[80%] ${reply.sender_role === 'admin' ? 'text-right' : ''}`}>
                              <div className={`p-5 rounded-3xl border shadow-sm ${
                                reply.sender_role === 'admin' 
                                  ? 'bg-blue-600 text-white border-blue-500 rounded-tr-none' 
                                  : 'bg-white/60 dark:bg-white/5 text-gray-800 dark:text-gray-200 border-white/40 dark:border-white/5 rounded-tl-none'
                              }`}>
                                <p className="text-sm font-medium leading-relaxed">{reply.content}</p>
                              </div>
                              <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mx-1">
                                {new Date(reply.created_at).toLocaleString()}
                              </p>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    </>
                  );
                })()}
              </div>

              {/* Reply Input */}
              <div className="p-6 border-t border-black/5 dark:border-white/5 bg-white/20 dark:bg-black/20">
                <div className="relative group">
                  <textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={isAdmin ? "Acknowledge this report or ask for details..." : "Send a follow-up message..."}
                    className="w-full bg-white/40 dark:bg-black/40 border-2 border-transparent focus:border-blue-500/50 rounded-[2rem] p-5 pr-20 text-sm font-medium focus:outline-none transition-all min-h-[100px] resize-none shadow-inner"
                  />
                  <button
                    onClick={() => {
                      const msg = messages.find(m => m.id === selectedMessage);
                      if (msg) handleSendReply(msg.id, msg.user_id);
                    }}
                    disabled={sending || !replyText.trim()}
                    className="absolute right-4 bottom-4 w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95 disabled:opacity-50 disabled:scale-100"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-center p-20 space-y-6 opacity-40">
              <div className="w-24 h-24 rounded-[2rem] bg-gray-100 dark:bg-white/5 flex items-center justify-center border-4 border-dashed border-gray-300 dark:border-white/10">
                <MessageSquare className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-xl font-black uppercase tracking-tighter">Select a Conversation</h3>
                <p className="text-xs font-bold mt-2 max-w-xs">Pick a message from the sidebar to view the full history and reply.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
