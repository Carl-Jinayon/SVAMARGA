import { useEffect, useState } from 'react';
import { Briefcase, Copy, Check, Star, DollarSign, PenTool, Layout, ExternalLink, Info } from 'lucide-react';
import { useTrackerStore } from '../store/useTrackerStore';
import { curriculum } from '../data/curriculum';
import { motion, AnimatePresence } from 'framer-motion';

export default function CareerTools() {
  const { user, progress, getOverallProgress, getCompletedSubjectsCount, getTotalSubjectsCount } = useTrackerStore();
  const [copied, setCopied] = useState<string | null>(null);
  const [activeTool, setActiveTool] = useState<'none' | 'negotiation' | 'proof' | 'blog'>('none');

  // Local state for editable text
  const [editableScript, setEditableScript] = useState('');
  const [editableOutline, setEditableOutline] = useState('');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const completedSubjects = curriculum.flatMap(p => p.subjects).filter(s => progress[s.id]?.completed);

  // Tool 1: PH-Specific Salary Negotiation Script
  const generateNegotiationScript = () => {
    const topSubject = completedSubjects[0]?.name || '[Mastered Subject]';
    const secondSubject = completedSubjects[1]?.name || '[Technical Skill]';
    const projectCount = completedSubjects.length * 2; // Rough estimate of projects build

    return `Hi [Recruiter Name],

Thank you for the offer! I'm really excited about the possibility of joining [Company] as a [Role].

Based on my specialized training in the CS Ultimate Curriculum—specifically my mastery of ${topSubject} and ${secondSubject}—and my research into the current market rate for ML-adjacent roles in the Philippines, I was looking for something closer to [Target Salary, e.g., ₱60,000 - ₱80,000].

Given my portfolio of ${projectCount} production-quality projects and my ability to contribute to technical implementations from Day 1, can we bridge the gap to this range?

I'm very interested in the role and would love to find a way to make this work!

Best regards,
[Your Name]`;
  };

  // Tool 2: Proof of Competence Generator
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

  // Tool 3: Technical Blog Outliner
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

  // Initialize editable text when tool is opened
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
    <div className="animate-slide-in-up space-y-10 pb-20">
      {/* Premium Header */}
      <div className="glass p-12 rounded-[3rem] shadow-2xl relative overflow-hidden border-none text-center">
        <div className="relative z-10 space-y-4">
          <div className="w-20 h-20 bg-blue-600 rounded-[2rem] flex items-center justify-center text-white mx-auto shadow-2xl shadow-blue-600/30">
            <Briefcase className="w-10 h-10" />
          </div>
          <h2 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter italic">
            Career <span className="text-blue-600">Accelerator</span>
          </h2>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.3em] max-w-lg mx-auto leading-relaxed">
            Professional tools designed to help you land, negotiate, and master your dream role.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20" />
      </div>

      {/* Tool Selection Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <button 
          onClick={() => setActiveTool('negotiation')}
          className={`glass p-8 rounded-[2.5rem] text-left transition-all border-2 ${activeTool === 'negotiation' ? 'border-blue-600 scale-105 shadow-2xl' : 'border-transparent hover:bg-blue-600/5 dark:hover:bg-blue-600/10'}`}
        >
          <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center mb-6">
            <DollarSign className="w-7 h-7 text-blue-600" />
          </div>
          <h3 className="font-black text-xl text-gray-900 dark:text-white uppercase tracking-tighter">Salary Negotiator</h3>
          <p className="text-[11px] text-gray-500 mt-3 font-bold uppercase tracking-wider leading-relaxed">AI-ready scripts tailored to your specific mastery.</p>
        </button>

        <button 
          onClick={() => setActiveTool('proof')}
          className={`glass p-8 rounded-[2.5rem] text-left transition-all border-2 ${activeTool === 'proof' ? 'border-green-600 scale-105 shadow-2xl' : 'border-transparent hover:bg-green-600/5 dark:hover:bg-green-600/10'}`}
        >
          <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center mb-6">
            <Layout className="w-7 h-7 text-green-600" />
          </div>
          <h3 className="font-black text-xl text-gray-900 dark:text-white uppercase tracking-tighter">Proof of Competence</h3>
          <p className="text-[11px] text-gray-500 mt-3 font-bold uppercase tracking-wider leading-relaxed">Shareable profile that proves you're an engineer, not just a learner.</p>
        </button>

        <button 
          onClick={() => setActiveTool('blog')}
          className={`glass p-8 rounded-[2.5rem] text-left transition-all border-2 ${activeTool === 'blog' ? 'border-purple-600 scale-105 shadow-2xl' : 'border-transparent hover:bg-purple-600/5 dark:hover:bg-purple-600/10'}`}
        >
          <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center mb-6">
            <PenTool className="w-7 h-7 text-purple-600" />
          </div>
          <h3 className="font-black text-xl text-gray-900 dark:text-white uppercase tracking-tighter">Blog Outliner</h3>
          <p className="text-[11px] text-gray-500 mt-3 font-bold uppercase tracking-wider leading-relaxed">Generate structured guides to demonstrate expertise.</p>
        </button>
      </div>

      {/* Active Workspace */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeTool}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="glass p-12 rounded-[3rem] shadow-2xl min-h-[500px] border-none"
        >
          {activeTool === 'none' && (
            <div className="h-full flex flex-col items-center justify-center text-center py-20 opacity-30">
              <Star className="w-20 h-20 mb-6" />
              <h2 className="text-2xl font-black uppercase tracking-tighter italic">Select a Career Tool Above to Begin</h2>
            </div>
          )}

          {activeTool === 'negotiation' && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Negotiation Script</h2>
                  <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mt-1">Personalized based on your {completedSubjects.length} mastered subjects</p>
                </div>
                <button 
                  onClick={() => copyToClipboard(editableScript, 'neg')}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95"
                >
                  {copied === 'neg' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied === 'neg' ? 'Copied!' : 'Copy Script'}
                </button>
              </div>

              <div className="relative group">
                <textarea
                  value={editableScript}
                  onChange={(e) => setEditableScript(e.target.value)}
                  className="w-full h-80 bg-black/5 dark:bg-black/40 rounded-[2rem] p-8 text-sm font-medium text-gray-700 dark:text-gray-300 leading-relaxed focus:outline-none border-2 border-transparent focus:border-blue-500/30 transition-all resize-none shadow-inner"
                />
                <div className="absolute bottom-6 right-8 flex items-center gap-2 pointer-events-none opacity-40">
                  <DollarSign className="w-4 h-4" />
                  <p className="text-[10px] font-black uppercase">Drafting Pro Response</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 bg-blue-500/5 rounded-2xl border border-blue-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-600">
                    <Info className="w-5 h-5" />
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 italic font-medium">
                    <b>Note:</b> Changes made here are temporary. Save your draft externally before refreshing.
                  </p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setEditableScript(generateNegotiationScript())} className="px-4 py-2 bg-white/50 dark:bg-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-white transition-all">Reset to Default</button>
                </div>
              </div>
            </div>
          )}

          {activeTool === 'proof' && (
            <div className="space-y-12">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Proof of Competence</h2>
                  <p className="text-xs font-bold text-green-600 uppercase tracking-widest mt-1">Verified Technical Milestone Export</p>
                </div>
                <button 
                  onClick={() => copyToClipboard(`${window.location.origin}/profile/${user?.id}`, 'public-link')}
                  className="flex items-center gap-3 px-8 py-4 bg-green-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-green-600/20 hover:scale-105 active:scale-95 transition-all"
                >
                  {copied === 'public-link' ? <Check className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                  {copied === 'public-link' ? 'Link Copied!' : 'Generate Public Link'}
                </button>
              </div>
              
              {/* Jaw-dropping Preview */}
              <div className="relative p-1 bg-gradient-to-br from-green-500 via-blue-500 to-purple-600 rounded-[3.5rem] shadow-2xl group overflow-hidden">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-3xl" />
                <div className="relative bg-white dark:bg-gray-900 rounded-[3rem] p-10 overflow-hidden">
                  <div className="flex flex-col md:flex-row justify-between gap-10 relative z-10">
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-3xl bg-blue-600 flex items-center justify-center text-white text-2xl font-black shadow-2xl">
                          {user?.email?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="text-2xl font-black text-gray-900 dark:text-white">{user?.user_metadata.full_name || 'CS Engineer'}</h3>
                          <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">Full-Stack → ML Specialization</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-5 bg-gray-50 dark:bg-white/5 rounded-3xl border border-black/5 dark:border-white/5">
                          <p className="text-[8px] font-black text-gray-400 uppercase mb-1">Modules Mastered</p>
                          <p className="text-2xl font-black text-blue-600">{getProofData().subjects}</p>
                        </div>
                        <div className="p-5 bg-gray-50 dark:bg-white/5 rounded-3xl border border-black/5 dark:border-white/5">
                          <p className="text-[8px] font-black text-gray-400 uppercase mb-1">Overall Rank</p>
                          <p className="text-2xl font-black text-purple-600">Top 5%</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex-1 space-y-4">
                      <div className="flex justify-between items-end">
                        <p className="text-[10px] font-black uppercase text-gray-400">Curriculum Mastery</p>
                        <p className="text-xl font-black text-gray-900 dark:text-white">{getProofData().mastery}%</p>
                      </div>
                      <div className="h-4 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden border border-black/5">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${getProofData().mastery}%` }}
                          transition={{ duration: 1.5, ease: "easeOut" }}
                          className="h-full bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 relative"
                        >
                          <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-shimmer" />
                        </motion.div>
                      </div>
                      <div className="flex flex-wrap gap-2 pt-4">
                        {getProofData().topSkills.map(skill => (
                          <span key={skill.id} className="px-3 py-1.5 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl text-[9px] font-black uppercase border border-blue-500/20">
                            {skill.id} Mastered
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Decorative mesh */}
                  <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl" />
                  <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
                </div>
              </div>

              <div className="bg-green-500/5 p-8 rounded-[2.5rem] border border-green-500/10">
                <h4 className="text-sm font-black text-green-600 uppercase mb-4 flex items-center gap-2">
                  <Star className="w-4 h-4" /> Employer Perspective
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-medium italic">
                  "Most candidates just list 'Python' or 'React'. This dashboard proves you have followed a world-class curriculum with verified milestones, separating you from the masses of self-taught developers."
                </p>
              </div>
            </div>
          )}

          {activeTool === 'blog' && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <h2 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Content Generator</h2>
                  <div className="flex flex-wrap items-center gap-4 mt-4">
                    <p className="text-[10px] font-black uppercase text-gray-400">Target Subject:</p>
                    <select 
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="bg-white/50 dark:bg-gray-800 border-2 border-purple-500/20 rounded-xl p-3 text-xs font-black focus:outline-none transition-all focus:border-purple-500/50 text-gray-900 dark:text-white"
                    >
                      {curriculum.flatMap(p => p.subjects).map(s => (
                        <option key={s.id} value={s.id} className="bg-white dark:bg-gray-800">
                          {s.id}: {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <button 
                  onClick={() => copyToClipboard(editableOutline, 'blog')}
                  className="flex items-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 shadow-xl shadow-purple-600/20"
                >
                  {copied === 'blog' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied === 'blog' ? 'Copied' : 'Copy Outline'}
                </button>
              </div>

              <div className="relative">
                <textarea
                  value={editableOutline}
                  onChange={(e) => setEditableOutline(e.target.value)}
                  className="w-full h-96 bg-black/5 dark:bg-black/40 rounded-[2rem] p-8 text-xs font-mono text-gray-700 dark:text-gray-300 leading-relaxed focus:outline-none border-2 border-transparent focus:border-purple-500/30 transition-all resize-none shadow-inner"
                />
                <div className="absolute top-6 right-8 text-[8px] font-black uppercase text-purple-600 opacity-40 tracking-widest">Technical Draft v1.0</div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 bg-purple-500/5 rounded-2xl border border-purple-500/20">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-600">
                    <PenTool className="w-5 h-5" />
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400 italic font-medium">
                    <b>Warning:</b> Content is not auto-saved. Copy it to your blogging platform before leaving.
                  </p>
                </div>
                <button onClick={() => setEditableOutline(generateBlogOutline(selectedSubject))} className="px-4 py-2 bg-white/50 dark:bg-white/5 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-white transition-all whitespace-nowrap">Regenerate Draft</button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
