import { useState } from 'react';
import { useTrackerStore } from '../store/useTrackerStore';
import { curriculum } from '../data/curriculum';
import { ChevronDown, ChevronRight, BookOpen, Target, AlertCircle, CheckCircle, Star, Trophy, Info, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CurriculumViewer() {
  const { toggleSubjectCompletion, markTopicCompleted, markSubtopicCompleted, progress } = useTrackerStore();
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);
  const [activePhaseId, setActivePhaseId] = useState<number>(1);

  const activePhase = curriculum.find(p => p.id === activePhaseId) || curriculum[0];

  const toggleExpand = (subjectId: string) => {
    setExpandedSubjects((prev) =>
      prev.includes(subjectId)
        ? prev.filter((id) => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const isExpanded = (subjectId: string) => expandedSubjects.includes(subjectId);
  const isSubjectCompleted = (subjectId: string) => progress[subjectId]?.completed || false;
  const isTopicCompleted = (subjectId: string, topic: string) => isSubjectCompleted(subjectId) || progress[subjectId]?.topicsCompleted.includes(topic) || false;
  const isSubtopicCompleted = (subjectId: string, subtopic: string, topic: string) => isTopicCompleted(subjectId, topic) || progress[subjectId]?.subtopicsCompleted.includes(subtopic) || false;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return { bg: 'rgba(29,158,117,0.1)', color: 'var(--accent-teal)' };
      case 'Intermediate': return { bg: 'rgba(0,229,255,0.1)', color: 'var(--accent-cyan)' };
      case 'Hard': return { bg: 'rgba(245,158,11,0.1)', color: '#F59E0B' };
      case 'Very Hard': return { bg: 'rgba(239,68,68,0.1)', color: '#EF4444' };
      default: return { bg: 'var(--border-subtle)', color: 'var(--text-muted)' };
    }
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Phase Navigation */}
      <div className="relative px-4 mb-16">
        <div className="flex flex-wrap gap-4 justify-center items-center max-w-5xl mx-auto relative z-10">
          {curriculum.map((phase) => {
            const isActive = activePhaseId === phase.id;
            const phaseTotal = phase.subjects.length;
            const phaseCompleted = phase.subjects.filter((s) => progress[s.id]?.completed).length;
            const progressPercentage = Math.round((phaseCompleted / phaseTotal) * 100);

            return (
              <button
                key={phase.id}
                onClick={() => setActivePhaseId(phase.id)}
                className="relative group px-6 py-4 sm:px-8 sm:py-5 rounded-[2rem] transition-all flex flex-col items-center"
                style={{
                  opacity: isActive ? 1 : 0.6,
                  transform: isActive ? 'scale(1.05)' : 'scale(1)',
                }}
              >
                {isActive && (
                  <motion.div 
                    layoutId="phase-bg"
                    className="absolute inset-0 rounded-[2rem] shadow-xl"
                    style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)' }}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <div className="relative z-10 text-center w-full">
                  <p className="text-[8px] font-bold uppercase tracking-widest mb-1" style={{ color: isActive ? 'var(--accent-cyan)' : 'var(--text-muted)' }}>
                    Phase
                  </p>
                  <h4 className="text-xl font-black tracking-tight mb-3" style={{ color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                    0{phase.id}
                  </h4>
                  
                  {/* Progress Bar */}
                  <div className="w-16 h-1 rounded-full overflow-hidden mx-auto" style={{ background: 'var(--border-subtle)' }}>
                    <div 
                      className="h-full rounded-full transition-all duration-1000" 
                      style={{ 
                        width: `${progressPercentage}%`, 
                        background: isActive ? 'var(--accent-cyan)' : 'var(--text-muted)' 
                      }} 
                    />
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activePhaseId}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className="glass rounded-[3rem] overflow-hidden">
            {/* Phase Header */}
            <div className="p-10 sm:p-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.05) 0%, rgba(127,119,221,0.05) 100%)' }}>
              <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.1) 0%, transparent 70%)' }} />
              
              <div className="relative z-10">
                <p className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--accent-cyan)' }}>Strategic Deployment</p>
                <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4" style={{ color: 'var(--text-primary)' }}>{activePhase.name}</h2>
                <p className="text-sm leading-relaxed max-w-2xl" style={{ color: 'var(--text-secondary)' }}>{activePhase.description}</p>
                
                <div className="mt-8 flex flex-wrap gap-4">
                  <div className="glass px-5 py-3 rounded-2xl flex items-center gap-3">
                    <Trophy className="w-4 h-4" style={{ color: '#F59E0B' }} /> 
                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Mission Time</p>
                      <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{activePhase.hours} Focused Hours</p>
                    </div>
                  </div>
                  <div className="glass px-5 py-3 rounded-2xl flex items-center gap-3">
                    <BookOpen className="w-4 h-4" style={{ color: 'var(--accent-violet)' }} /> 
                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Modules</p>
                      <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{activePhase.subjects.length} Core Subjects</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-12 space-y-12">
              {/* Phase Metadata Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="glass rounded-3xl p-6 relative overflow-hidden group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(0,229,255,0.1)', color: 'var(--accent-cyan)' }}>
                    <CheckCircle className="w-5 h-5" />
                  </div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--accent-cyan)' }}>MVP Requirements</h4>
                  <ul className="text-xs space-y-2.5" style={{ color: 'var(--text-secondary)' }}>
                    {activePhase.mustComplete?.map((item, i) => (
                      <li key={i} className="flex gap-2.5 items-start">
                        <span style={{ color: 'var(--accent-cyan)' }}>•</span>
                        <span className="font-medium">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="glass rounded-3xl p-6 relative overflow-hidden group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(127,119,221,0.1)', color: 'var(--accent-violet)' }}>
                    <Zap className="w-5 h-5" />
                  </div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--accent-violet)' }}>Interview Habit</h4>
                  <p className="text-sm leading-relaxed italic font-medium" style={{ color: 'var(--text-primary)' }}>"{activePhase.interviewHabit}"</p>
                </div>

                <div className="glass rounded-3xl p-6 relative overflow-hidden group">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-5" style={{ background: 'rgba(29,158,117,0.1)', color: 'var(--accent-teal)' }}>
                    <Target className="w-5 h-5" />
                  </div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--accent-teal)' }}>Sector Capstone</h4>
                  <p className="text-sm font-black mb-1.5" style={{ color: 'var(--text-primary)' }}>{activePhase.capstone?.name}</p>
                  <p className="text-[11px] leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{activePhase.capstone?.description}</p>
                </div>
              </div>

              {/* Subjects List */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-6">
                  <h3 className="text-lg font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Curriculum Path</h3>
                  <div className="h-px flex-1" style={{ background: 'var(--border-subtle)' }} />
                </div>
                
                {activePhase.subjects.map((subject) => {
                  const expanded = isExpanded(subject.id);
                  const completed = isSubjectCompleted(subject.id);
                  const diffColors = getDifficultyColor(subject.difficulty);

                  return (
                    <div 
                      key={subject.id} 
                      className="glass rounded-[2rem] overflow-hidden transition-all"
                      style={{
                        background: completed ? 'rgba(29,158,117,0.03)' : 'var(--bg-glass)',
                        border: completed ? '1px solid rgba(29,158,117,0.2)' : '1px solid var(--border-subtle)',
                      }}
                    >
                      <div className="flex items-center w-full p-6 cursor-pointer" onClick={() => toggleExpand(subject.id)}>
                        <div className="relative mr-6 shrink-0" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => toggleSubjectCompletion(subject.id)}
                            className="w-8 h-8 rounded-xl border-2 flex items-center justify-center transition-all hover:scale-110"
                            style={{
                              background: completed ? 'var(--accent-teal)' : 'transparent',
                              borderColor: completed ? 'var(--accent-teal)' : 'rgba(29,158,117,0.3)',
                              color: completed ? '#fff' : 'transparent',
                            }}
                            aria-label={completed ? 'Mark incomplete' : 'Mark complete'}
                          >
                            {completed && <CheckCircle className="w-4 h-4" />}
                          </button>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-1.5">
                            <span className="text-[9px] font-bold tracking-widest" style={{ color: 'var(--accent-cyan)' }}>{subject.id}</span>
                            <span className="px-2 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-widest" style={{ background: diffColors.bg, color: diffColors.color }}>
                              {subject.difficulty}
                            </span>
                          </div>
                          <h3 className="font-black text-xl tracking-tight truncate" style={{ color: completed ? 'var(--text-muted)' : 'var(--text-primary)', textDecoration: completed ? 'line-through' : 'none' }}>
                            {subject.name}
                          </h3>
                        </div>
                        
                        <div className="flex items-center gap-6 shrink-0 ml-4">
                          <div className="text-right hidden sm:block">
                            <p className="text-[8px] font-bold uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)' }}>{subject.duration}</p>
                            <p className="text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-md" style={{ background: 'rgba(0,229,255,0.1)', color: 'var(--accent-cyan)' }}>
                              {subject.hours} HRS
                            </p>
                          </div>
                          <div className="p-2 rounded-xl transition-transform" style={{ background: expanded ? 'var(--accent-cyan)' : 'var(--border-subtle)', color: expanded ? '#fff' : 'var(--text-primary)', transform: expanded ? 'rotate(180deg)' : 'none' }}>
                            <ChevronDown className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                      
                      <AnimatePresence>
                        {expanded && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 sm:px-10 pb-10 pt-4 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                              <div className="text-sm p-6 rounded-2xl leading-relaxed italic mb-10" style={{ background: 'rgba(0,0,0,0.02)', color: 'var(--text-secondary)' }}>
                                "{subject.description}"
                              </div>

                              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                                {/* Left Column: Curriculum Breakdown */}
                                <section>
                                  <div className="flex items-center gap-3 mb-6">
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(0,229,255,0.1)', color: 'var(--accent-cyan)' }}>
                                      <BookOpen className="w-4 h-4" />
                                    </div>
                                    <h4 className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-primary)' }}>Knowledge Tree</h4>
                                  </div>
                                  <div className="space-y-6">
                                    {subject.topics.map((topic) => {
                                      const topicDone = isTopicCompleted(subject.id, topic);
                                      return (
                                        <div key={topic} className="relative pl-6">
                                          <div className="absolute left-0 top-2 bottom-0 w-0.5 rounded-full" style={{ background: 'var(--border-subtle)' }} />
                                          
                                          <div className="flex items-center gap-3 mb-3">
                                            <button
                                              disabled={completed}
                                              onClick={() => markTopicCompleted(subject.id, topic)}
                                              className="w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 transition-all hover:scale-110"
                                              style={{
                                                background: topicDone ? 'var(--accent-cyan)' : 'transparent',
                                                borderColor: topicDone ? 'var(--accent-cyan)' : 'var(--border-subtle)',
                                                color: topicDone ? '#fff' : 'transparent',
                                                opacity: completed ? 0.5 : 1,
                                                cursor: completed ? 'not-allowed' : 'pointer'
                                              }}
                                            >
                                              {topicDone && <CheckCircle className="w-3 h-3" />}
                                            </button>
                                            <p className="text-sm font-bold tracking-tight leading-snug" style={{ color: topicDone ? 'var(--text-muted)' : 'var(--text-primary)', textDecoration: topicDone ? 'line-through' : 'none' }}>
                                              {topic}
                                            </p>
                                          </div>

                                          {subject.subtopics[topic] && (
                                            <ul className="ml-8 space-y-2">
                                              {subject.subtopics[topic].map((sub) => {
                                                const subDone = isSubtopicCompleted(subject.id, sub, topic);
                                                return (
                                                  <li key={sub} className="flex items-start gap-2.5">
                                                    <button
                                                      disabled={topicDone}
                                                      onClick={() => markSubtopicCompleted(subject.id, sub)}
                                                      className="w-4 h-4 rounded mt-0.5 border flex items-center justify-center shrink-0 transition-all hover:scale-110"
                                                      style={{
                                                        background: subDone ? 'var(--accent-violet)' : 'transparent',
                                                        borderColor: subDone ? 'var(--accent-violet)' : 'var(--border-subtle)',
                                                        color: subDone ? '#fff' : 'transparent',
                                                        opacity: topicDone ? 0.5 : 1,
                                                        cursor: topicDone ? 'not-allowed' : 'pointer'
                                                      }}
                                                    >
                                                      {subDone && <CheckCircle className="w-2.5 h-2.5" />}
                                                    </button>
                                                    <p className="text-xs leading-snug" style={{ color: subDone ? 'var(--text-muted)' : 'var(--text-secondary)', textDecoration: subDone ? 'line-through' : 'none' }}>
                                                      {sub}
                                                    </p>
                                                  </li>
                                                );
                                              })}
                                            </ul>
                                          )}
                                        </div>
                                      );
                                    })}
                                  </div>
                                </section>
                                
                                {/* Right Column: Mastery Projects */}
                                <section className="space-y-8">
                                  <div>
                                    <div className="flex items-center gap-3 mb-6">
                                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(127,119,221,0.1)', color: 'var(--accent-violet)' }}>
                                        <Target className="w-4 h-4" />
                                      </div>
                                      <h4 className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-primary)' }}>Mastery Forge</h4>
                                    </div>
                                    <div className="grid gap-4">
                                      {subject.projects.map((p, i) => (
                                        <div key={i} className="p-5 rounded-2xl transition-all" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid var(--border-subtle)' }}>
                                          <div className="flex justify-between items-start mb-2">
                                            <p className="font-black text-sm tracking-tight" style={{ color: 'var(--text-primary)' }}>{p.name}</p>
                                            <span className="text-[8px] font-bold px-2 py-0.5 rounded-md uppercase tracking-widest" style={{ background: 'var(--accent-violet)', color: '#fff' }}>
                                              {p.level}
                                            </span>
                                          </div>
                                          <p className="text-[11px] leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>{p.description}</p>
                                          <div className="pt-3 flex items-start gap-2" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                                            <Trophy className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: '#F59E0B' }} />
                                            <p className="text-[10px] font-semibold" style={{ color: 'var(--text-muted)' }}>
                                              <span className="uppercase tracking-widest mr-1.5" style={{ color: 'var(--accent-violet)' }}>Goal:</span> 
                                              {p.outcome}
                                            </p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  <div>
                                    <div className="flex items-center gap-3 mb-6">
                                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(29,158,117,0.1)', color: 'var(--accent-teal)' }}>
                                        <Star className="w-4 h-4" />
                                      </div>
                                      <h4 className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-primary)' }}>Neural Inputs</h4>
                                    </div>
                                    <div className="grid gap-3">
                                      {subject.resources.map((res, i) => (
                                        <a 
                                          key={i} 
                                          href={res.url} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="flex items-center justify-between p-4 rounded-xl transition-all group"
                                          style={{ background: 'rgba(29,158,117,0.04)', border: '1px solid rgba(29,158,117,0.1)' }}
                                        >
                                          <div className="flex-1 min-w-0 pr-4">
                                            <div className="flex items-center gap-2 mb-1">
                                              <p className="font-bold text-xs tracking-tight truncate" style={{ color: 'var(--text-primary)' }}>{res.name}</p>
                                              <span className="text-[8px] font-bold uppercase px-1.5 py-0.5 rounded" style={{ background: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                                                {res.type}
                                              </span>
                                            </div>
                                            <p className="text-[9px] truncate" style={{ color: 'var(--text-secondary)' }}>{res.notes}</p>
                                          </div>
                                          <div className="flex items-center gap-3 shrink-0">
                                            <div className="flex items-center gap-0.5">
                                              {[...Array(5)].map((_, idx) => (
                                                <Star key={idx} className={`w-2.5 h-2.5 ${idx < res.stars ? 'fill-current' : 'opacity-20'}`} style={{ color: idx < res.stars ? '#F59E0B' : 'var(--text-muted)' }} />
                                              ))}
                                            </div>
                                            <ChevronRight className="w-4 h-4 opacity-40 group-hover:translate-x-1 transition-transform" style={{ color: 'var(--text-primary)' }} />
                                          </div>
                                        </a>
                                      ))}
                                    </div>
                                  </div>
                                </section>
                              </div>

                              {/* Strategy Section */}
                              <section className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 mt-10 border-t" style={{ borderColor: 'var(--border-subtle)' }}>
                                <div className="p-6 rounded-2xl" style={{ background: 'rgba(239,68,68,0.05)', border: '1px solid rgba(239,68,68,0.1)' }}>
                                  <h4 className="font-bold text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: '#EF4444' }}>
                                    <AlertCircle className="w-4 h-4" /> Threat Detection
                                  </h4>
                                  <ul className="space-y-3">
                                    {subject.commonMistakes.map((m, i) => (
                                      <li key={i} className="flex gap-3 items-start">
                                        <div className="w-5 h-5 rounded flex items-center justify-center text-[9px] font-black shrink-0" style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444' }}>!</div>
                                        <p className="text-xs font-medium leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{m}</p>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="space-y-6">
                                  <div className="p-6 rounded-2xl" style={{ background: 'rgba(29,158,117,0.05)', border: '1px solid rgba(29,158,117,0.1)' }}>
                                    <h4 className="font-bold text-[10px] uppercase tracking-widest mb-4 flex items-center gap-2" style={{ color: 'var(--accent-teal)' }}>
                                      <CheckCircle className="w-4 h-4" /> Validation Probe
                                    </h4>
                                    <ul className="space-y-3">
                                      {subject.selfCheck.map((item, i) => (
                                        <li key={i} className="flex gap-3 items-start">
                                          <div className="w-5 h-5 rounded flex items-center justify-center text-[9px] font-black shrink-0" style={{ background: 'rgba(29,158,117,0.1)', color: 'var(--accent-teal)' }}>?</div>
                                          <p className="text-xs font-medium leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{item}</p>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="p-6 rounded-2xl" style={{ background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.1)' }}>
                                    <h4 className="font-bold text-[10px] uppercase tracking-widest mb-3 flex items-center gap-2" style={{ color: '#F59E0B' }}>
                                      <Info className="w-4 h-4" /> Tactical Recovery
                                    </h4>
                                    <p className="text-xs font-medium leading-relaxed italic" style={{ color: 'var(--text-secondary)' }}>
                                      {subject.whenStuck}
                                    </p>
                                  </div>
                                </div>
                              </section>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
