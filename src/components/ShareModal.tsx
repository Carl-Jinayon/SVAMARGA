import { motion } from 'framer-motion';
import { X, Download } from 'lucide-react';

export default function ShareModal({ onClose, screenshotUrl }: { onClose: () => void, screenshotUrl: string }) {
  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = screenshotUrl;
    link.download = 'progress-report.png';
    link.click();
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="glass p-8 rounded-[2rem] shadow-2xl max-w-4xl w-full relative z-10 border border-white/20"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Your Progress Report</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/20 rounded-full"><X className="w-5 h-5" /></button>
        </div>
        
        <div className="rounded-2xl overflow-hidden shadow-lg mb-6 border border-white/10">
          <img src={screenshotUrl} alt="Progress Report" className="w-full h-auto" />
        </div>

        <button
          onClick={downloadImage}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-sm rounded-2xl transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3"
        >
          <Download className="w-5 h-5" />
          Download Report
        </button>
      </motion.div>
    </div>
  );
}
