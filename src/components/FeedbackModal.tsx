import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { X } from 'lucide-react';
import { useTrackerStore } from '../store/useTrackerStore';
import Toast from './Toast';

export default function FeedbackModal({ onClose }: { onClose: () => void }) {
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const { user } = useTrackerStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    const { error } = await supabase.from('feedback').insert([
      { 
        user_id: user?.id, 
        message, 
        created_at: new Date().toISOString() 
      }
    ]);

    setSending(false);
    if (error) {
      setToast({ message: 'Failed to send feedback. Please try again.', type: 'error' });
    } else {
      setToast({ message: 'Thank you for your feedback!', type: 'success' });
      setTimeout(onClose, 1000);
    }
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
        <div className="glass p-8 rounded-[2rem] shadow-2xl max-w-md w-full border-none">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Report a Bug</h3>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full"><X className="w-5 h-5" /></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="What went wrong? Tell us the details..."
              className="w-full h-32 p-4 bg-white/40 dark:bg-black/20 border border-white/20 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              required
            />
            <button
              type="submit"
              disabled={sending}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all shadow-xl active:scale-95"
            >
              {sending ? 'Sending...' : 'Send Report'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
