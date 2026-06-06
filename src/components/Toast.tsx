import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, MessageSquare, X, ArrowRight } from 'lucide-react';
import { createPortal } from 'react-dom';

export type ToastType = 'success' | 'error' | 'inbox';

export interface ToastData {
  id: string;
  message: string;
  type: ToastType;
  senderName?: string;
  onNavigate?: () => void;
}

export default function Toast({
  message,
  type,
  senderName,
  onNavigate,
  onClose,
}: ToastData & { onClose: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 6000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isInbox = type === 'inbox';

  const toastContent = (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 80, scale: 0.92 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 80, scale: 0.92 }}
        transition={{ type: 'spring', damping: 24, stiffness: 300, mass: 0.8 }}
        className="fixed bottom-28 sm:bottom-10 left-1/2 -translate-x-1/2 z-[9999] glass-heavy flex items-center gap-4 px-5 py-4 rounded-2xl shadow-2xl w-[calc(100vw-2rem)] max-w-sm"
        style={{
          border: isInbox
            ? '1px solid rgba(0,229,255,0.25)'
            : type === 'success'
            ? '1px solid rgba(29,158,117,0.25)'
            : '1px solid rgba(239,68,68,0.25)',
          boxShadow: isInbox
            ? '0 8px 32px rgba(0,229,255,0.12)'
            : '0 8px 32px rgba(0,0,0,0.2)',
        }}
        role="alert"
        aria-live="polite"
      >
        {/* Icon */}
        <motion.div
          initial={{ scale: 0, rotate: -20 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', delay: 0.08, damping: 12 }}
          className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
          style={{
            background: isInbox
              ? 'rgba(0,229,255,0.12)'
              : type === 'success'
              ? 'rgba(29,158,117,0.12)'
              : 'rgba(239,68,68,0.12)',
          }}
        >
          {isInbox ? (
            <MessageSquare className="w-4 h-4" style={{ color: 'var(--accent-cyan)' }} />
          ) : type === 'success' ? (
            <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--accent-teal)' }} />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-500" />
          )}
        </motion.div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {isInbox && senderName && (
            <p className="text-[9px] font-black uppercase tracking-widest mb-0.5" style={{ color: 'var(--accent-cyan)' }}>
              New Message from {senderName}
            </p>
          )}
          {!isInbox && (
            <p className="text-[9px] font-black uppercase tracking-widest mb-0.5" style={{ color: type === 'success' ? 'var(--accent-teal)' : '#ef4444' }}>
              {type === 'success' ? 'Success' : 'Error'}
            </p>
          )}
          <p className="text-xs font-medium leading-snug truncate" style={{ color: 'var(--text-primary)' }}>
            {message}
          </p>
        </div>

        {/* CTA for inbox notifications */}
        {isInbox && onNavigate && (
          <button
            onClick={() => { onNavigate(); onClose(); }}
            className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all hover:scale-105"
            style={{ background: 'rgba(0,229,255,0.1)', color: 'var(--accent-cyan)' }}
          >
            View <ArrowRight className="w-3 h-3" />
          </button>
        )}

        {/* Close */}
        <button
          onClick={onClose}
          className="flex-shrink-0 p-1 rounded-lg transition-colors hover:bg-black/10"
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
