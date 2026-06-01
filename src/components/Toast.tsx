import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';

export default function Toast({ message, type, onClose }: { message: string, type: 'success' | 'error', onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.9 }}
        className="fixed top-24 right-10 z-[9999] glass px-8 py-6 rounded-[2rem] flex items-center gap-4 shadow-2xl border border-white/20"
      >
        <motion.div
          initial={{ rotate: -45, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ type: 'spring', delay: 0.2 }}
        >
          {type === 'success' ? (
            <CheckCircle className="text-green-500 w-8 h-8" />
          ) : (
            <AlertCircle className="text-red-500 w-8 h-8" />
          )}
        </motion.div>
        
        <div className="flex flex-col">
          <span className="font-black text-gray-900 dark:text-white text-lg tracking-tight">
            {type === 'success' ? 'Success!' : 'Oops!'}
          </span>
          <span className="font-medium text-gray-600 dark:text-gray-300 text-sm">
            {message}
          </span>
        </div>
        
        <button onClick={onClose} className="ml-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          ✕
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
