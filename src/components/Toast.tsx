import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { createPortal } from 'react-dom';

export default function Toast({
  message,
  type,
  onClose,
}: {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}) {
  useEffect(() => {
    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const toastContent = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -16, x: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
        exit={{ opacity: 0, y: -12, scale: 0.95 }}
        transition={{ type: 'spring', damping: 22, mass: 0.8 }}
        className={`fixed top-20 right-5 z-[9999] glass-heavy flex items-center gap-3.5 px-5 py-4 rounded-2xl max-w-xs
          ${type === 'success' ? 'toast-success' : 'toast-error'}`}
        role="alert"
        aria-live="polite"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', delay: 0.1, damping: 12 }}
          className="flex-shrink-0"
        >
          {type === 'success' ? (
            <CheckCircle2 className="w-5 h-5" style={{ color: 'var(--accent-teal)' }} />
          ) : (
            <AlertCircle className="w-5 h-5 text-red-500" />
          )}
        </motion.div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold leading-tight" style={{ color: 'var(--text-primary)' }}>
            {type === 'success' ? 'Success' : 'Oops'}
          </p>
          <p className="text-xs font-medium mt-0.5 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {message}
          </p>
        </div>

        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 rounded-lg transition-colors"
          style={{ color: 'var(--text-muted)' }}
          aria-label="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </motion.div>
    </AnimatePresence>
  );

  return createPortal(toastContent, document.body);
}
