import { useEffect, useState } from 'react';
import { Briefcase, Copy, Check, Star, DollarSign, PenTool, Layout, ExternalLink, Info } from 'lucide-react';
import { useTrackerStore } from '../store/useTrackerStore';
import { curriculum } from '../data/curriculum';
import { motion, AnimatePresence } from 'framer-motion';
import type { Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

export default function CareerTools() {
  const { user, progress, getOverallProgress, getCompletedSubjectsCount, getTotalSubjectsCount } = useTrackerStore();
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<'none' | 'negotiation' | 'proof' | 'blog'>('none');

  const [editableScript, setEditableScript] = useState('');
  const [editableOutline, setEditableOutline] = useState('');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const completedSubjects = curriculum.flatMap(p => p.subjects).filter(s => progress[s.id]?.completed);

  const generateNegotiationScript = () => {
    const topSubject = completedSubjects[0]?.name || '[Mastered Subject]';
    const secondSubject = completedSubjects[1]?.name || '[Technical Skill]';
    const projectCount = completedSubjects.length * 2;

    return `Hi [Recruiter Name],

Thank you for the offer! I'm really excited about the possibility of joining [Company] as a [Role].

Based on my specialized training in the CS Ultimate Curriculum—specifically my mastery of ${topSubject} and ${secondSubject}—and my research into the current market rate for ML-adjacent roles in the Philippines, I was looking for something closer to [Target Salary, e.g., ₱60,000 - ₱80,000].

Given my portfolio of ${projectCount} production-quality projects and my ability to contribute to technical implementations from Day 1, can we bridge the gap to this range?

I'm very interested in the role and would love to find a way to make this work!

Best regards,
[Your Name]`;
  };

  const getProofData = () => {
    const overall = getOverallProgress();
    const mastered = getCompletedSubjectsCount();
    const total = getTotalSubjectsCount();
    
    return {
      mastery: overall,
      subjects: mastered,
      total,
      topSkills: completedSubjects.slice(0, 8)
    };
  };

  const [selectedSubject, setSelectedSubject] = useState(curriculum[0].subjects[0].id);
  const generateBlogOutline = (subjectId: string) => {
    const sub = curriculum.flatMap(p => p.subjects).find(s => s.id === subjectId);
    if (!sub) return '';

    return `## Technical Guide: Mastering ${sub.name}\n\n` +
      `### 1. Introduction\nBriefly explain why ${sub.name} is critical for modern software engineering.\n\n` +
      `### 2. Core Concepts\n- ${sub.topics.slice(0, 3).join('\n- ')}\n\n` +
      `### 3. Practical Implementation\nWalkthrough of the [Project Name] built during this module.\n\n` +
      `### 4. Common Pitfalls\n${sub.commonMistakes.slice(0, 2).map(m => `- ${m}`).join('\n')}\n\n` +
      `### 5. Conclusion & Key Takeaways\nHow this knowledge fits into the broader Full-Stack to ML path.`;
  };

  useEffect(() => {
    if (activeTool === 'negotiation') {
      setEditableScript(generateNegotiationScript());
    }
  }, [activeTool, progress]);

  useEffect(() => {
    if (activeTool === 'blog') {
      setEditableOutline(generateBlogOutline(selectedSubject));
    }
  }, [activeTool, selectedSubject]);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="glass rounded-3xl p-10 relative overflow-hidden text-center">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)' }} />
        <div className="relative z-10 space-y-4">
          <div className="w-16 h-16 mx-auto rounded-2xl flex items-center justify-center shadow-lg"
            style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.2) 0%, rgba(127,119,221,0.2) 100%)', border: '1px solid rgba(0,229,255,0.2)' }}>
            <Briefcase className="w-8 h-8" style={{ color: 'var(--accent-cyan)' }} />
          </div>
          <h2 className="text-3xl font-black tracking-tight uppercase" style={{ color: 'var(--text-primary)' }}>
            Career <span style={{ color: 'var(--accent-cyan)' }}>Accelerator</span>
          </h2>
          <p className="text-xs font-bold uppercase tracking-widest max-w-lg mx-auto" style={{ color: 'var(--text-muted)' }}>
            Professional tools designed to help you land, negotiate, and master your dream role.
          </p>
        </div>
      </motion.div>

      {/* Tool Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <motion.button 
          variants={itemVariants}
          onClick={() => setActiveTool('negotiation')}
          className="glass glass-hover rounded-2xl p-6 text-left transition-all"
          style={{
            border: activeTool === 'negotiation' ? '2px solid rgba(0,229,255,0.4)' : '2px solid transparent',
            background: activeTool === 'negotiation' ? 'rgba(0,229,255,0.03)' : undefined,
          }}
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(0,229,255,0.1)' }}>
            <DollarSign className="w-6 h-6" style={{ color: 'var(--accent-cyan)' }} />
          </div>
          <h3 className="font-black text-lg tracking-tight mb-2" style={{ color: 'var(--text-primary)' }}>Salary Negotiator</h3>
          <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
            AI-ready scripts tailored to your specific mastery.
          </p>
        </motion.button>

        <motion.button 
          variants={itemVariants}
          onClick={() => setActiveTool('proof')}
          className="glass glass-hover rounded-2xl p-6 text-left transition-all"
          style={{
            border: activeTool === 'proof' ? '2px solid rgba(29,158,117,0.4)' : '2px solid transparent',
            background: activeTool === 'proof' ? 'rgba(29,158,117,0.03)' : undefined,
          }}
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(29,158,117,0.1)' }}>
            <Layout className="w-6 h-6" style={{ color: 'var(--accent-teal)' }} />
          </div>
          <h3 className="font-black text-lg tracking-tight mb-2" style={{ color: 'var(--text-primary)' }}>Proof of Competence</h3>
          <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
            Shareable profile that proves you're an engineer.
          </p>
        </motion.button>

        <motion.button 
          variants={itemVariants}
          onClick={() => setActiveTool('blog')}
          className="glass glass-hover rounded-2xl p-6 text-left transition-all"
          style={{
            border: activeTool === 'blog' ? '2px solid rgba(127,119,221,0.4)' : '2px solid transparent',
            background: activeTool === 'blog' ? 'rgba(127,119,221,0.03)' : undefined,
          }}
        >
          <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'rgba(127,119,221,0.1)' }}>
            <PenTool className="w-6 h-6" style={{ color: 'var(--accent-violet)' }} />
          </div>
          <h3 className="font-black text-lg tracking-tight mb-2" style={{ color: 'var(--text-primary)' }}>Blog Outliner</h3>
          <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
            Generate structured guides to demonstrate expertise.
          </p>
        </motion.button>
      </div>

      {/* Active Workspace */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeTool}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="glass rounded-3xl p-8 min-h-[400px]"
        >
          {activeTool === 'none' && (
            <div className="h-full flex flex-col items-center justify-center text-center py-20 opacity-40">
              <Star className="w-16 h-16 mb-4" style={{ color: 'var(--text-muted)' }} />
              <h2 className="text-xl font-black uppercase tracking-tight" style={{ color: 'var(--text-primary)' }}>Select a Career Tool Above</h2>
            </div>
          )}

          {activeTool === 'negotiation' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Negotiation Script</h2>
                  <p className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{ color: 'var(--accent-cyan)' }}>
                    Based on {completedSubjects.length} mastered subjects
                  </p>
                </div>
                <button 
                  onClick={() => copyToClipboard(editableScript, 'neg')}
                  className="btn-primary flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold"
                >
                  {copied === 'neg' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied === 'neg' ? 'Copied!' : 'Copy Script'}
                </button>
              </div>

              <div className="relative group">
                <textarea
                  value={editableScript}
                  onChange={(e) => setEditableScript(e.target.value)}
                  className="input-glass w-full h-80 rounded-2xl p-6 text-sm leading-relaxed resize-none"
                  style={{ textTransform: 'none' }}
                />
                <div className="absolute bottom-4 right-6 flex items-center gap-1.5 opacity-40 pointer-events-none">
                  <DollarSign className="w-3.5 h-3.5" style={{ color: 'var(--text-primary)' }} />
                  <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-primary)' }}>Drafting</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.1)' }}>
                <div className="flex items-center gap-3">
                  <Info className="w-4 h-4" style={{ color: 'var(--accent-cyan)' }} />
                  <p className="text-[10px] font-semibold" style={{ color: 'var(--text-secondary)' }}>
                    Changes are temporary. Save your draft externally.
                  </p>
                </div>
                <button 
                  onClick={() => setEditableScript(generateNegotiationScript())} 
                  className="text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg transition-colors"
                  style={{ background: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                >
                  Reset
                </button>
              </div>
            </div>
          )}

          {activeTool === 'proof' && (
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Proof of Competence</h2>
                  <p className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{ color: 'var(--accent-teal)' }}>
                    Verified Technical Milestone Export
                  </p>
                </div>
                <button 
                  onClick={() => copyToClipboard(`${window.location.origin}/profile/${user?.id}`, 'public-link')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition-all text-white"
                  style={{ background: 'linear-gradient(135deg, #16896B 0%, #1D9E75 100%)', boxShadow: '0 4px 16px rgba(29,158,117,0.3)' }}
                >
                  {copied === 'public-link' ? <Check className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                  {copied === 'public-link' ? 'Copied!' : 'Public Link'}
                </button>
              </div>
              
              {/* Preview Card */}
              <div className="relative p-[1px] rounded-[2rem] overflow-hidden group" style={{ background: 'linear-gradient(135deg, var(--accent-cyan), var(--accent-teal), var(--accent-violet))' }}>
                <div className="relative rounded-[2rem] p-8 sm:p-10" style={{ background: 'var(--bg-glass)', backdropFilter: 'blur(30px)' }}>
                  <div className="flex flex-col md:flex-row justify-between gap-8 relative z-10">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg"
                          style={{ background: 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-violet) 100%)' }}>
                          {user?.email?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="text-xl font-black" style={{ color: 'var(--text-primary)' }}>{user?.user_metadata?.full_name || 'CS Engineer'}</h3>
                          <p className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>Full-Stack → ML</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl" style={{ background: 'rgba(0,229,255,0.05)', border: '1px solid rgba(0,229,255,0.1)' }}>
                          <p className="text-[8px] font-black uppercase mb-1" style={{ color: 'var(--text-muted)' }}>Modules Mastered</p>
                          <p className="text-2xl font-black" style={{ color: 'var(--accent-cyan)' }}>{getProofData().subjects}</p>
                        </div>
                        <div className="p-4 rounded-xl" style={{ background: 'rgba(127,119,221,0.05)', border: '1px solid rgba(127,119,221,0.1)' }}>
                          <p className="text-[8px] font-black uppercase mb-1" style={{ color: 'var(--text-muted)' }}>Overall Rank</p>
                          <p className="text-2xl font-black" style={{ color: 'var(--accent-violet)' }}>Top 5%</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="flex justify-between items-end">
                        <p className="text-[9px] font-black uppercase" style={{ color: 'var(--text-muted)' }}>Curriculum Mastery</p>
                        <p className="text-lg font-black" style={{ color: 'var(--text-primary)' }}>{getProofData().mastery}%</p>
                      </div>
                      <div className="progress-track h-2">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${getProofData().mastery}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full rounded-full relative overflow-hidden"
                          style={{ background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-violet))', boxShadow: '0 0 12px rgba(0,229,255,0.4)' }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                        </motion.div>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-2">
                        {getProofData().topSkills.map(skill => (
                          <span key={skill.id} className="px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase border"
                            style={{ background: 'rgba(0,229,255,0.05)', color: 'var(--accent-cyan)', borderColor: 'rgba(0,229,255,0.15)' }}>
                            {skill.id}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl" style={{ background: 'rgba(29,158,117,0.05)', border: '1px solid rgba(29,158,117,0.15)' }}>
                <h4 className="text-[10px] font-black uppercase mb-2 flex items-center gap-2" style={{ color: 'var(--accent-teal)' }}>
                  <Star className="w-3.5 h-3.5" /> Employer Perspective
                </h4>
                <p className="text-xs font-medium leading-relaxed italic" style={{ color: 'var(--text-secondary)' }}>
                  "Most candidates just list 'Python' or 'React'. This dashboard proves you have followed a world-class curriculum with verified milestones, separating you from the masses of self-taught developers."
                </p>
              </div>
            </div>
          )}

          {activeTool === 'blog' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Content Generator</h2>
                  <div className="flex items-center gap-3 mt-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Target:</p>
                    <select 
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="input-glass py-1.5 px-3 text-xs max-w-[140px] sm:max-w-xs truncate"
                      style={{ textTransform: 'none' }}
                    >
                      {curriculum.flatMap(p => p.subjects).map(s => (
                        <option key={s.id} value={s.id}>
                          {s.id}: {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button 
                  onClick={() => copyToClipboard(editableOutline, 'blog')}
                  className="flex items-center gap-2 px-5 py-2.5 text-white rounded-xl text-xs font-bold transition-all"
                  style={{ background: 'linear-gradient(135deg, #5C52B5 0%, #7F77DD 100%)', boxShadow: '0 4px 16px rgba(127,119,221,0.3)' }}
                >
                  {copied === 'blog' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied === 'blog' ? 'Copied' : 'Copy Outline'}
                </button>
              </div>

              <div className="relative">
                <textarea
                  value={editableOutline}
                  onChange={(e) => setEditableOutline(e.target.value)}
                  className="input-glass w-full h-96 rounded-2xl p-6 text-xs font-mono leading-relaxed resize-none"
                  style={{ textTransform: 'none' }}
                />
                <div className="absolute top-4 right-6 text-[8px] font-black uppercase tracking-widest opacity-40" style={{ color: 'var(--accent-violet)' }}>
                  Draft v1.0
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: 'rgba(127,119,221,0.05)', border: '1px solid rgba(127,119,221,0.1)' }}>
                <div className="flex items-center gap-3">
                  <PenTool className="w-4 h-4" style={{ color: 'var(--accent-violet)' }} />
                  <p className="text-[10px] font-semibold" style={{ color: 'var(--text-secondary)' }}>
                    Copy it to your blogging platform before leaving.
                  </p>
                </div>
                <button 
                  onClick={() => setEditableOutline(generateBlogOutline(selectedSubject))} 
                  className="text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-lg transition-colors"
                  style={{ background: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                >
                  Regenerate
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}
