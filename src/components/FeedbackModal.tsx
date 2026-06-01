import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { X } from 'lucide-react';
import { useTrackerStore } from '../store/useTrackerStore';
import Toast from './Toast';

export default function FeedbackModal({ onClose }: { onClose: () => void }) {
  const [issueType, setIssueType] = useState('Bug');
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
        issue_type: issueType,
        message, 
        created_at: new Date().toISOString() 
      }
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
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
        <div className="glass p-8 rounded-[2rem] shadow-2xl max-w-md w-full border-none">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Report a Bug</h3>
            <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full"><X className="w-5 h-5" /></button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase text-gray-500 mb-1">Issue Type</label>
              <select
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full p-3 bg-white/40 dark:bg-gray-800 border border-white/20 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 text-gray-900 dark:text-white"
              >
                <option value="Bug" className="bg-white dark:bg-gray-800">Bug</option>
                <option value="Feature" className="bg-white dark:bg-gray-800">Feature Request</option>
                <option value="UI" className="bg-white dark:bg-gray-800">UI/UX Issue</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-black uppercase text-gray-500 mb-1">Description</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="What went wrong? Tell us the details..."
                className="w-full h-32 p-4 bg-white/40 dark:bg-black/20 border border-white/20 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                required
              />
            </div>
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
