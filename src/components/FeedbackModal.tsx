import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { X, Send, Bug, Sparkles, Layout } from 'lucide-react';
import { useTrackerStore } from '../store/useTrackerStore';
import Toast from './Toast';
import { motion, AnimatePresence } from 'framer-motion';

const issueTypes = [
  { value: 'Bug',     label: 'Bug Report',        icon: <Bug className="w-4 h-4" /> },
  { value: 'Feature', label: 'Feature Request',   icon: <Sparkles className="w-4 h-4" /> },
  { value: 'UI',      label: 'UI/UX Issue',       icon: <Layout className="w-4 h-4" /> },
];

export default function FeedbackModal({ onClose }: { onClose: () => void }) {
  const [issueType, setIssueType] = useState('Bug');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const { user } = useTrackerStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    const myEmail = user?.email || user?.user_metadata?.email || user?.user_metadata?.full_name || user?.user_metadata?.user_name || 'Unknown';
    const finalContent = `[Recipient: Admin]\n[Sender: ${myEmail}]\n\n${message}`;

    const { error } = await supabase.from('inbox').insert([
      {
        user_id: user?.id,
        sender_role: 'user',
        issue_type: issueType,
        content: finalContent,
        created_at: new Date().toISOString(),
        is_read: false,
      },
    ]);

    setSending(false);
    if (error) {
      console.error(error);
      setToast({ message: 'Failed to send feedback. Please try again.', type: 'error' });
    } else {
      setToast({ message: 'Thank you for your feedback!', type: 'success' });
      setTimeout(onClose, 1000);
    }
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-5"
          style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 16 }}
            transition={{ type: 'spring', damping: 20, mass: 0.9 }}
            className="glass-heavy rounded-2xl max-w-md w-full overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b" style={{ borderColor: 'var(--border-subtle)' }}>
              <h3 className="text-base font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Report a Bug
              </h3>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-7 h-7 rounded-lg flex items-center justify-center transition-colors"
                style={{ background: 'var(--border-subtle)', color: 'var(--text-muted)' }}
                aria-label="Close modal"
              >
                <X className="w-3.5 h-3.5" />
              </motion.button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Issue Type Selector */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest mb-2.5" style={{ color: 'var(--text-muted)' }}>
                  Issue Type
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {issueTypes.map(({ value, label, icon }) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setIssueType(value)}
                      className="flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl text-xs font-semibold transition-all"
                      style={issueType === value ? {
                        background: 'rgba(0,229,255,0.1)',
                        border: '1px solid rgba(0,229,255,0.3)',
                        color: 'var(--accent-cyan)',
                      } : {
                        background: 'var(--border-subtle)',
                        border: '1px solid transparent',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {icon}
                      <span className="text-[9px] text-center leading-tight">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
                  Description
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What went wrong? Tell us the details…"
                  className="input-glass w-full h-28 px-4 py-3 text-sm resize-none"
                  style={{ textTransform: 'none' }}
                  required
                />
              </div>

              {/* Submit */}
              <motion.button
                type="submit"
                disabled={sending}
                whileHover={!sending ? { scale: 1.02 } : {}}
                whileTap={!sending ? { scale: 0.97 } : {}}
                className="btn-primary w-full py-3 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending…
                  </span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Report
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </>
  );
}
