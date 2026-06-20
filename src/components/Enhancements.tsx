import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { motion, AnimatePresence } from 'framer-motion';
import { scenariosMarkdown, implementationMarkdown } from '../data/markdownData';
import { BookOpen, FileText, CheckCircle2 } from 'lucide-react';

export default function Enhancements() {
  const [activeTab, setActiveTab] = useState<'scenarios' | 'implementation'>('scenarios');

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="space-y-8"
    >
      {/* Header matching CareerTools style */}
      <motion.div className="glass rounded-3xl p-10 relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)' }} />
        <div className="relative z-10 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center shadow-lg"
            style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.2) 0%, rgba(127,119,221,0.2) 100%)', border: '1px solid rgba(0,229,255,0.2)' }}>
            <FileText className="w-8 h-8" style={{ color: 'var(--accent-cyan)' }} />
          </div>
          <h2 className="text-3xl font-black tracking-tight uppercase" style={{ color: 'var(--text-primary)' }}>
            Field <span style={{ color: 'var(--accent-cyan)' }}>Guide</span>
          </h2>
          <p className="text-xs font-bold uppercase tracking-widest max-w-lg mx-auto" style={{ color: 'var(--text-muted)' }}>
            Your desk reference for the real world: Scenarios, scripts, and daily implementation strategies.
          </p>
        </div>
      </motion.div>

      {/* Tab Selectors matching the site's glass theme */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.button 
          onClick={() => setActiveTab('scenarios')}
          className="glass glass-hover rounded-2xl p-6 text-left transition-all"
          style={{
            border: activeTab === 'scenarios' ? '2px solid rgba(0,229,255,0.4)' : '2px solid transparent',
            background: activeTab === 'scenarios' ? 'rgba(0,229,255,0.03)' : undefined,
          }}
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(0,229,255,0.1)' }}>
            <BookOpen className="w-6 h-6" style={{ color: 'var(--accent-cyan)' }} />
          </div>
          <h3 className="font-black text-lg tracking-tight mb-2" style={{ color: 'var(--text-primary)' }}>Real World Scenarios</h3>
          <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
            15 Situations You'll Face & How To Handle Them
          </p>
        </motion.button>

        <motion.button 
          onClick={() => setActiveTab('implementation')}
          className="glass glass-hover rounded-2xl p-6 text-left transition-all"
          style={{
            border: activeTab === 'implementation' ? '2px solid rgba(127,119,221,0.4)' : '2px solid transparent',
            background: activeTab === 'implementation' ? 'rgba(127,119,221,0.03)' : undefined,
          }}
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(127,119,221,0.1)' }}>
            <CheckCircle2 className="w-6 h-6" style={{ color: 'var(--accent-violet)' }} />
          </div>
          <h3 className="font-black text-lg tracking-tight mb-2" style={{ color: 'var(--text-primary)' }}>Implementation Guide</h3>
          <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
            Daily Checklists & Integration Strategy
          </p>
        </motion.button>
      </div>

      {/* Markdown Content rendered beautifully */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="glass rounded-3xl p-8 sm:p-12"
        >
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({node, ...props}) => <h1 className="text-3xl font-black tracking-tight uppercase mb-8 pb-4 border-b border-[var(--border-subtle)]" style={{ color: 'var(--text-primary)' }} {...props} />,
              h2: ({node, ...props}) => <h2 className="text-2xl font-black tracking-tight mb-4 mt-12" style={{ color: 'var(--text-primary)' }} {...props} />,
              h3: ({node, ...props}) => <h3 className="text-lg font-black tracking-tight mb-3 mt-8" style={{ color: 'var(--accent-cyan)' }} {...props} />,
              h4: ({node, ...props}) => <h4 className="text-xs font-bold uppercase tracking-widest mb-2 mt-6" style={{ color: 'var(--text-primary)' }} {...props} />,
              p: ({node, ...props}) => <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }} {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc list-outside ml-5 space-y-2.5 mb-6 text-sm" style={{ color: 'var(--text-secondary)' }} {...props} />,
              ol: ({node, ...props}) => <ol className="list-decimal list-outside ml-5 space-y-2.5 mb-6 text-sm font-medium" style={{ color: 'var(--text-secondary)' }} {...props} />,
              li: ({node, ...props}) => <li className="leading-relaxed pl-1" {...props} />,
              strong: ({node, ...props}) => <strong className="font-black" style={{ color: 'var(--text-primary)' }} {...props} />,
              a: ({node, ...props}) => <a className="font-medium underline decoration-[var(--border-subtle)] hover:decoration-[var(--accent-cyan)] transition-colors" style={{ color: 'var(--accent-cyan)' }} {...props} />,
              code: ({node, className, children, ...props}: any) => {
                const isInline = !className;
                return isInline ? (
                  <code className="px-1.5 py-0.5 rounded-md text-[11px] font-mono mx-0.5" style={{ background: 'rgba(0,229,255,0.1)', color: 'var(--accent-cyan)' }} {...props}>
                    {children}
                  </code>
                ) : (
                  <div className="my-6 rounded-xl overflow-hidden shadow-lg border" style={{ borderColor: 'var(--border-subtle)' }}>
                    <div className="flex px-4 py-2 border-b text-[10px] font-bold tracking-widest uppercase" style={{ background: 'var(--bg-primary)', borderColor: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                      Code Snippet
                    </div>
                    <pre className="p-4 overflow-x-auto text-[12px] leading-relaxed font-mono" style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}>
                      <code {...props}>{children}</code>
                    </pre>
                  </div>
                );
              },
              blockquote: ({node, ...props}) => <blockquote className="border-l-4 pl-5 py-2 my-6 italic text-sm" style={{ borderColor: 'var(--accent-violet)', background: 'linear-gradient(90deg, rgba(127,119,221,0.05) 0%, transparent 100%)', color: 'var(--text-secondary)' }} {...props} />,
              table: ({node, ...props}) => (
                <div className="overflow-x-auto my-8 rounded-xl border" style={{ borderColor: 'var(--border-subtle)' }}>
                  <table className="w-full text-sm text-left border-collapse" {...props} />
                </div>
              ),
              thead: ({node, ...props}) => <thead className="text-[10px] uppercase font-bold tracking-widest" style={{ background: 'var(--bg-primary)', color: 'var(--text-muted)' }} {...props} />,
              th: ({node, ...props}) => <th className="px-5 py-4 border-b font-black" style={{ borderColor: 'var(--border-subtle)' }} {...props} />,
              td: ({node, ...props}) => <td className="px-5 py-4 border-b" style={{ borderColor: 'var(--border-subtle)', color: 'var(--text-secondary)' }} {...props} />,
              hr: ({node, ...props}) => <hr className="my-10 border-t-2" style={{ borderColor: 'var(--border-subtle)' }} {...props} />
            }}
          >
            {activeTab === 'scenarios' ? scenariosMarkdown : implementationMarkdown}
          </ReactMarkdown>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
