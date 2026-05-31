import { useEffect } from 'react';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function Toast({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-20 right-10 z-[200] glass px-6 py-4 rounded-2xl flex items-center gap-3 animate-in slide-in-from-right duration-300 shadow-2xl border-none">
      {type === 'success' ? <CheckCircle className="text-green-500 w-6 h-6" /> : <AlertCircle className="text-red-500 w-6 h-6" />}
      <span className="font-bold text-gray-900 dark:text-white">{message}</span>
    </div>
  );
}