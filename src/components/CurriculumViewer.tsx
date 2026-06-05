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
      case 'Beginner': return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'Intermediate': return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      case 'Hard': return 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200';
      case 'Very Hard': return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      default: return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="animate-slide-in-up space-y-12 pb-20">
      {/* Jaw-Dropping Phase Navigation */}
      <div className="relative mb-24 px-4">
        <div className="flex flex-wrap gap-4 justify-center items-center max-w-5xl mx-auto relative z-10">
          {curriculum.map((phase) => {
            const isActive = activePhaseId === phase.id;
            return (
              <button
                key={phase.id}
                onClick={() => setActivePhaseId(phase.id)}
                className={`relative group px-10 py-6 rounded-[2.5rem] transition-all duration-700 ${
                  isActive ? 'scale-110' : 'hover:scale-105 opacity-40 hover:opacity-100'
                }`}
              >
                {/* Magnetic Background Effect */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div 
                      layoutId="phase-orb"
                      className="absolute inset-0 rounded-[2.5rem] shadow-[0_20px_50px_rgba(37,99,235,0.3)] z-0"
                      style={{ backgroundColor: phase.color }}
                      transition={{ type: "spring", bounce: 0.25, duration: 0.8 }}
                    >
                      <motion.div 
                        animate={{ 
                          scale: [1, 1.2, 1],
                          rotate: [0, 90, 180, 270, 360],
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-50 rounded-[2.5rem]"
                      />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="relative z-10 text-center">
                  <motion.p 
                    animate={{ color: isActive ? '#fff' : '#64748b' }}
                    className="text-[8px] font-black uppercase tracking-[0.4em] mb-1"
                  >
                    Phase
                  </motion.p>
                  <motion.h4 
                    animate={{ 
                      color: isActive ? '#fff' : '#1e293b',
                      scale: isActive ? 1.1 : 1 
                    }}
                    className="text-2xl font-black italic tracking-tighter"
                  >
                    0{phase.id}
                  </motion.h4>
                </div>

                {/* Floating Particles for Active State */}
                {isActive && (
                  <div className="absolute -inset-4 pointer-events-none">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          y: [-10, 10, -10],
                          x: [-10, 10, -10],
                          opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                          duration: 3 + i,
                          repeat: Infinity,
                          delay: i * 0.5,
                        }}
                        className="absolute w-2 h-2 rounded-full bg-white/30 blur-[2px]"
                        style={{
                          top: `${20 + i * 30}%`,
                          left: `${10 + i * 40}%`,
                        }}
                      />
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
        
        {/* Glow Line Connector */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-px bg-gradient-to-r from-transparent via-blue-500/10 to-transparent -z-10" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activePhaseId}
          initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="glass rounded-[3rem] shadow-2xl overflow-hidden border-none">
            <div className="p-12 text-white relative overflow-hidden" style={{ backgroundColor: activePhase.color }}>
              {/* Dynamic Aura */}
              <motion.div 
                animate={{ 
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px]"
              />
              
              <div className="relative z-10">
                <p className="text-xs font-black uppercase tracking-[0.5em] mb-4 opacity-70">Strategic Deployment</p>
                <h2 className="text-6xl font-black mb-6 tracking-tighter uppercase italic">{activePhase.name}</h2>
                <p className="text-lg opacity-80 max-w-3xl leading-relaxed font-medium">{activePhase.description}</p>
                
                <div className="mt-10 flex flex-wrap gap-6">
                  <div className="bg-black/20 backdrop-blur-xl px-6 py-4 rounded-[2rem] text-sm font-black flex items-center gap-3 border border-white/10">
                    <Trophy className="w-5 h-5 text-yellow-400" /> 
                    <div className="text-left">
                      <p className="text-[8px] uppercase opacity-50">Mission Time</p>
                      <p>{activePhase.hours} Focused Hours</p>
                    </div>
                  </div>
                  <div className="bg-black/20 backdrop-blur-xl px-6 py-4 rounded-[2rem] text-sm font-black flex items-center gap-3 border border-white/10">
                    <BookOpen className="w-5 h-5 text-blue-400" /> 
                    <div className="text-left">
                      <p className="text-[8px] uppercase opacity-50">Modules</p>
                      <p>{activePhase.subjects.length} Core Subjects</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-12 space-y-12 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
              {/* Phase Metadata Grid */}
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="bg-blue-600/5 p-8 rounded-[2.5rem] border border-blue-600/10 hover:border-blue-600/30 transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white mb-6 shadow-xl group-hover:scale-110 transition-transform">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h4 className="text-xs font-black uppercase text-blue-600 mb-4 tracking-[0.2em]">MVP Requirements</h4>
                  <ul className="text-sm space-y-3 text-gray-700 dark:text-gray-300">
                    {activePhase.mustComplete?.map((item, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="text-blue-500 font-black mt-0.5">•</span>
                        <span className="font-bold">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-purple-600/5 p-8 rounded-[2.5rem] border border-purple-600/10 hover:border-purple-600/30 transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-purple-600 flex items-center justify-center text-white mb-6 shadow-xl group-hover:scale-110 transition-transform">
                    <Zap className="w-6 h-6" />
                  </div>
                  <h4 className="text-xs font-black uppercase text-purple-600 mb-4 tracking-[0.2em]">Interview Habit</h4>
                  <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300 font-bold italic">"{activePhase.interviewHabit}"</p>
                </div>

                <div className="bg-green-600/5 p-8 rounded-[2.5rem] border border-green-600/10 hover:border-green-600/30 transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-green-600 flex items-center justify-center text-white mb-6 shadow-xl group-hover:scale-110 transition-transform">
                    <Target className="w-6 h-6" />
                  </div>
                  <h4 className="text-xs font-black uppercase text-green-600 mb-4 tracking-[0.2em]">Sector Capstone</h4>
                  <p className="text-sm font-black text-gray-900 dark:text-white mb-2">{activePhase.capstone?.name}</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-medium">{activePhase.capstone?.description}</p>
                </div>
              </div>

              {/* Subjects List - Futuristic Minimalist Design */}
              <div className="space-y-6">
                <div className="flex items-center gap-4 mb-8">
                  <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Curriculum Path</h3>
                  <div className="h-px flex-1 bg-gradient-to-r from-black/10 dark:from-white/10 to-transparent" />
                </div>
                
                {activePhase.subjects.map((subject) => {
                  const expanded = isExpanded(subject.id);
                  const completed = isSubjectCompleted(subject.id);

                  return (
                    <div 
                      key={subject.id} 
                      className={`group rounded-[2.5rem] transition-all duration-700 border-2 ${
                        completed 
                          ? 'bg-green-500/5 border-green-500/20' 
                          : 'bg-white dark:bg-gray-800/40 border-black/5 dark:border-white/5 hover:border-blue-500/30 shadow-xl'
                      }`}
                    >
                      <div className="flex items-center w-full p-8 cursor-pointer" onClick={() => toggleExpand(subject.id)}>
                        <div className="relative mr-8" onClick={(e) => e.stopPropagation()}>
                          <input 
                            type="checkbox" 
                            checked={completed} 
                            onChange={() => toggleSubjectCompletion(subject.id)} 
                            className="w-10 h-10 rounded-2xl cursor-pointer accent-green-500 border-2 border-green-500/50 transition-all group-hover:scale-110" 
                          />
                          {completed && (
                            <motion.div 
                              initial={{ scale: 0 }} 
                              animate={{ scale: 1 }} 
                              className="absolute -top-3 -right-3 bg-green-500 text-white rounded-full p-1.5 shadow-lg"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </motion.div>
                          )}
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-center gap-4 mb-2">
                            <span className="text-[10px] font-black text-blue-600 tracking-widest">{subject.id}</span>
                            <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${getDifficultyColor(subject.difficulty)}`}>
                              {subject.difficulty}
                            </span>
                          </div>
                          <h3 className={`font-black text-2xl tracking-tight ${completed ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-white'}`}>
                            {subject.name}
                          </h3>
                        </div>
                        
                        <div className="flex items-center gap-8">
                          <div className="text-right hidden sm:block">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{subject.duration}</p>
                            <p className="text-[10px] font-black text-blue-600 uppercase bg-blue-600/10 px-3 py-1 rounded-full">{subject.hours} HRS</p>
                          </div>
                          <div className={`p-3 rounded-2xl bg-black/5 dark:bg-white/5 transition-all duration-500 ${expanded ? 'rotate-180 bg-blue-600 text-white shadow-lg' : ''}`}>
                            <ChevronDown className="w-6 h-6" />
                          </div>
                        </div>
                      </div>
                      
                      <AnimatePresence>
                        {expanded && (
                          <motion.div 
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="px-12 pb-12 space-y-12 border-t border-black/5 dark:border-white/5 pt-12">
                              <div className="text-lg text-gray-700 dark:text-gray-300 bg-black/5 dark:bg-white/5 p-8 rounded-[2rem] italic leading-relaxed font-medium">
                                "{subject.description}"
                              </div>

                              <div className="grid lg:grid-cols-2 gap-16">
                                {/* Left Column: Curriculum Breakdown */}
                                <section>
                                  <div className="flex items-center gap-4 mb-8">
                                    <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-600">
                                      <BookOpen className="w-5 h-5" />
                                    </div>
                                    <h4 className="text-sm font-black uppercase text-gray-900 dark:text-white tracking-[0.3em]">Knowledge Tree</h4>
                                  </div>
                                  <div className="space-y-8">
                                    {subject.topics.map((topic) => {
                                      const topicDone = isTopicCompleted(subject.id, topic);
                                      return (
                                        <div key={topic} className="relative pl-8">
                                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-600 to-transparent rounded-full opacity-20" />
                                          
                                          <div className="flex items-center gap-4 mb-4">
                                            <input 
                                              type="checkbox" 
                                              checked={topicDone}
                                              disabled={completed}
                                              onChange={() => markTopicCompleted(subject.id, topic)}
                                              className={`w-6 h-6 rounded-xl accent-blue-600 transition-all ${completed ? 'opacity-50' : 'cursor-pointer hover:scale-110'}`} 
                                            />
                                            <p className={`text-base font-black tracking-tight ${topicDone ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-gray-100'}`}>
                                              {topic}
                                            </p>
                                          </div>

                                          {subject.subtopics[topic] && (
                                            <ul className="ml-10 space-y-3">
                                              {subject.subtopics[topic].map((sub) => {
                                                const subDone = isSubtopicCompleted(subject.id, sub, topic);
                                                return (
                                                  <li key={sub} className="flex items-center gap-4 group/sub">
                                                    <input 
                                                      type="checkbox" 
                                                      checked={subDone}
                                                      disabled={topicDone}
                                                      onChange={() => markSubtopicCompleted(subject.id, sub)}
                                                      className={`w-4 h-4 rounded-lg accent-indigo-500 transition-all ${topicDone ? 'opacity-50' : 'cursor-pointer group-hover/sub:scale-110'}`} 
                                                    />
                                                    <p className={`text-sm ${subDone ? 'text-gray-400 line-through' : 'text-gray-600 dark:text-gray-400 font-bold group-hover/sub:text-gray-900 dark:group-hover/sub:text-white transition-colors'}`}>
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
                                <section className="space-y-12">
                                  <div>
                                    <div className="flex items-center gap-4 mb-8">
                                      <div className="w-10 h-10 rounded-xl bg-purple-600/10 flex items-center justify-center text-purple-600">
                                        <Target className="w-5 h-5" />
                                      </div>
                                      <h4 className="text-sm font-black uppercase text-gray-900 dark:text-white tracking-[0.3em]">Mastery Forge</h4>
                                    </div>
                                    <div className="grid gap-6">
                                      {subject.projects.map((p, i) => (
                                        <div key={i} className="group/project p-6 bg-white dark:bg-black/20 rounded-[2rem] border border-black/5 dark:border-white/5 hover:border-purple-600/40 transition-all shadow-xl hover:shadow-purple-600/10">
                                          <div className="flex justify-between items-start mb-3">
                                            <p className="font-black text-gray-900 dark:text-white text-base tracking-tight">{p.name}</p>
                                            <span className="text-[9px] font-black px-3 py-1 bg-purple-600 text-white rounded-full uppercase tracking-widest shadow-lg shadow-purple-600/20">
                                              {p.level}
                                            </span>
                                          </div>
                                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-4 leading-relaxed font-bold">{p.description}</p>
                                          <div className="pt-4 border-t border-black/5 dark:border-white/5 flex items-start gap-3">
                                            <Trophy className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                                            <p className="text-[11px] text-gray-500 italic font-bold">
                                              <span className="text-purple-600 dark:text-purple-400 font-black not-italic uppercase tracking-widest mr-2">Market Goal:</span> 
                                              {p.outcome}
                                            </p>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>

                                  <div>
                                    <div className="flex items-center gap-4 mb-8">
                                      <div className="w-10 h-10 rounded-xl bg-green-600/10 flex items-center justify-center text-green-600">
                                        <Star className="w-5 h-5" />
                                      </div>
                                      <h4 className="text-sm font-black uppercase text-gray-900 dark:text-white tracking-[0.3em]">Neural Inputs</h4>
                                    </div>
                                    <div className="grid gap-4">
                                      {subject.resources.map((res, i) => (
                                        <a 
                                          key={i} 
                                          href={res.url} 
                                          target="_blank" 
                                          rel="noopener noreferrer"
                                          className="flex items-center justify-between p-5 bg-green-600/5 rounded-[1.5rem] border border-green-600/10 hover:bg-green-600 hover:text-white transition-all duration-500 group/res"
                                        >
                                          <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-1">
                                              <p className="font-black text-sm tracking-tight">{res.name}</p>
                                              <span className="text-[8px] font-black uppercase px-2 py-0.5 bg-black/5 dark:bg-white/10 rounded-md">
                                                {res.type}
                                              </span>
                                            </div>
                                            <p className="text-[10px] opacity-60 line-clamp-1 italic font-bold">{res.notes}</p>
                                          </div>
                                          <div className="flex items-center gap-4 ml-6">
                                            <div className="flex items-center gap-0.5">
                                              {[...Array(5)].map((_, idx) => (
                                                <Star key={idx} className={`w-3 h-3 ${idx < res.stars ? 'text-yellow-400 fill-current' : 'opacity-20'}`} />
                                              ))}
                                            </div>
                                            <ChevronRight className="w-5 h-5 opacity-40 group-hover/res:translate-x-1 transition-transform" />
                                          </div>
                                        </a>
                                      ))}
                                    </div>
                                  </div>
                                </section>
                              </div>

                              {/* Strategy Section */}
                              <section className="grid md:grid-cols-2 gap-12 pt-12 border-t-2 border-black/5 dark:border-white/5">
                                <div className="bg-red-600/5 p-10 rounded-[3rem] border-2 border-red-600/10">
                                  <h4 className="font-black text-xs uppercase text-red-600 mb-6 tracking-[0.3em] flex items-center gap-3">
                                    <AlertCircle className="w-5 h-5" /> Threat Detection
                                  </h4>
                                  <ul className="space-y-4">
                                    {subject.commonMistakes.map((m, i) => (
                                      <li key={i} className="flex gap-4 items-start">
                                        <div className="w-6 h-6 rounded-full bg-red-600/20 flex items-center justify-center text-red-600 text-[10px] font-black shrink-0">!</div>
                                        <p className="text-sm font-bold text-gray-700 dark:text-gray-300 leading-relaxed">{m}</p>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div className="space-y-8">
                                  <div className="bg-green-600/5 p-10 rounded-[3rem] border-2 border-green-600/10">
                                    <h4 className="font-black text-xs uppercase text-green-700 dark:text-green-400 mb-6 tracking-[0.3em] flex items-center gap-3">
                                      <CheckCircle className="w-5 h-5" /> Validation Probe
                                    </h4>
                                    <ul className="space-y-4">
                                      {subject.selfCheck.map((item, i) => (
                                        <li key={i} className="flex gap-4 items-start">
                                          <div className="w-6 h-6 rounded-full bg-green-600/20 flex items-center justify-center text-green-600 text-[10px] font-black shrink-0">?</div>
                                          <p className="text-sm font-bold text-gray-700 dark:text-gray-300 leading-relaxed">{item}</p>
                                        </li>
                                      ))}
                                    </ul>
                                  </div>
                                  <div className="bg-orange-600/10 p-10 rounded-[3rem] border-2 border-orange-600/20 relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-24 h-24 bg-orange-600/10 rounded-full -mr-12 -mt-12 blur-2xl" />
                                    <h4 className="font-black text-xs uppercase text-orange-800 dark:text-orange-400 mb-4 tracking-[0.3em] flex items-center gap-3">
                                      <Info className="w-5 h-5" /> Tactical Recovery
                                    </h4>
                                    <p className="text-sm text-gray-800 dark:text-gray-200 font-bold italic leading-relaxed">
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
