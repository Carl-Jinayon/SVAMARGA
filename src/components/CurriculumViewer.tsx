import { useState } from 'react';
import { useTrackerStore } from '../store/useTrackerStore';
import { curriculum } from '../data/curriculum';
import { ChevronDown, BookOpen, Target, AlertCircle, CheckCircle, Star, Trophy, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CurriculumViewer() {
  const { toggleSubjectCompletion, markTopicCompleted, markSubtopicCompleted, progress } = useTrackerStore();
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);

  const toggleExpand = (subjectId: string) => {
    setExpandedSubjects((prev) =>
      prev.includes(subjectId)
        ? prev.filter((id) => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const isExpanded = (subjectId: string) => expandedSubjects.includes(subjectId);
  const isSubjectCompleted = (subjectId: string) => progress[subjectId]?.completed || false;
  const isTopicCompleted = (subjectId: string, topic: string) => progress[subjectId]?.topicsCompleted.includes(topic) || false;
  const isSubtopicCompleted = (subjectId: string, subtopic: string) => progress[subjectId]?.subtopicsCompleted.includes(subtopic) || false;

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
      {curriculum.map((phase) => (
        <div key={phase.id} className="glass rounded-[2rem] shadow-2xl overflow-hidden border-none">
          <div className="p-8 text-white relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${phase.color}, ${phase.color}cc)` }}>
            <div className="relative z-10">
              <p className="text-xs font-black uppercase tracking-[0.2em] mb-2 opacity-80">Phase {phase.id}</p>
              <h2 className="text-4xl font-black mb-4">{phase.name}</h2>
              <p className="text-sm opacity-90 max-w-2xl">{phase.description}</p>
              
              <div className="mt-6 flex flex-wrap gap-4">
                <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-yellow-300" /> {phase.hours} Total Hours
                </div>
                <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-blue-300" /> {phase.subjects.length} Subjects
                </div>
              </div>
            </div>
            {/* Abstract Background Element */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          </div>

          <div className="p-8 space-y-8">
            {/* Phase Metadata */}
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-blue-50 dark:bg-blue-900/10 p-5 rounded-2xl border border-blue-100 dark:border-blue-800">
                <h4 className="text-[10px] font-black uppercase text-blue-600 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5" /> Must Complete
                </h4>
                <ul className="text-xs space-y-2 text-gray-700 dark:text-gray-300">
                  {phase.mustComplete?.map((item, i) => <li key={i} className="flex gap-2"><span>•</span>{item}</li>)}
                </ul>
              </div>
              <div className="bg-purple-50 dark:bg-purple-900/10 p-5 rounded-2xl border border-purple-100 dark:border-purple-800">
                <h4 className="text-[10px] font-black uppercase text-purple-600 mb-3 flex items-center gap-2">
                  <Info className="w-3.5 h-3.5" /> Interview Habit
                </h4>
                <p className="text-xs leading-relaxed text-gray-700 dark:text-gray-300 italic">"{phase.interviewHabit}"</p>
              </div>
              <div className="bg-green-50 dark:bg-green-900/10 p-5 rounded-2xl border border-green-100 dark:border-green-800">
                <h4 className="text-[10px] font-black uppercase text-green-600 mb-3 flex items-center gap-2">
                  <Target className="w-3.5 h-3.5" /> Phase Capstone
                </h4>
                <p className="text-xs font-bold text-gray-900 dark:text-white mb-1">{phase.capstone?.name}</p>
                <p className="text-[10px] text-gray-600 dark:text-gray-400 leading-tight">{phase.capstone?.description}</p>
              </div>
            </div>

            {/* Subjects List */}
            <div className="grid gap-6">
              {phase.subjects.map((subject) => {
                const expanded = isExpanded(subject.id);
                const completed = isSubjectCompleted(subject.id);

                return (
                  <div 
                    key={subject.id} 
                    className={`group rounded-[2rem] transition-all duration-500 border-2 ${
                      completed 
                        ? 'bg-green-500/5 border-green-500/30' 
                        : 'bg-white/40 dark:bg-gray-800/40 border-white/40 dark:border-gray-700/40 shadow-xl'
                    }`}
                  >
                    <div className="flex items-center w-full p-6 cursor-pointer" onClick={() => toggleExpand(subject.id)}>
                      <div className="relative mr-6" onClick={(e) => e.stopPropagation()}>
                        <input 
                          type="checkbox" 
                          checked={completed} 
                          onChange={() => toggleSubjectCompletion(subject.id)} 
                          className="w-8 h-8 rounded-xl cursor-pointer accent-green-500 border-2 border-green-500/50" 
                        />
                        {completed && (
                          <motion.div 
                            initial={{ scale: 0 }} 
                            animate={{ scale: 1 }} 
                            className="absolute -top-2 -right-2 bg-green-500 text-white rounded-full p-1"
                          >
                            <CheckCircle className="w-3 h-3" />
                          </motion.div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-[10px] font-black text-blue-600 opacity-60">{subject.id}</span>
                          <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase ${getDifficultyColor(subject.difficulty)}`}>
                            {subject.difficulty}
                          </span>
                        </div>
                        <h3 className={`font-black text-xl ${completed ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-white'}`}>
                          {subject.name}
                        </h3>
                      </div>
                      
                      <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{subject.duration}</p>
                          <p className="text-[10px] font-black text-blue-500 uppercase">{subject.hours} hrs</p>
                        </div>
                        <ChevronDown className={`w-6 h-6 transition-transform duration-500 ${expanded ? 'rotate-180' : ''}`} />
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
                          <div className="px-8 pb-10 space-y-10 border-t border-black/5 dark:border-white/5 pt-8">
                            <div className="text-base text-gray-700 dark:text-gray-300 bg-black/5 dark:bg-white/5 p-6 rounded-2xl italic leading-relaxed">
                              "{subject.description}"
                            </div>

                            <div className="grid lg:grid-cols-2 gap-12">
                              {/* Left Column: Topics & Subtopics */}
                              <section>
                                <h4 className="text-xs font-black uppercase mb-6 text-blue-600 flex items-center gap-2 tracking-[0.2em]">
                                  <BookOpen className="w-4 h-4" /> Curriculum Breakdown
                                </h4>
                                <div className="space-y-6">
                                  {subject.topics.map((topic) => {
                                    const topicDone = isTopicCompleted(subject.id, topic);
                                    return (
                                      <div key={topic} className="relative pl-6">
                                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500/20 rounded-full" />
                                        
                                        <div className="flex items-center gap-3 mb-3">
                                          <input 
                                            type="checkbox" 
                                            checked={topicDone}
                                            onChange={() => markTopicCompleted(subject.id, topic)}
                                            className="w-5 h-5 rounded-lg cursor-pointer accent-blue-500" 
                                          />
                                          <p className={`text-sm font-black ${topicDone ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-gray-100'}`}>
                                            {topic}
                                          </p>
                                        </div>

                                        {subject.subtopics[topic] && (
                                          <ul className="ml-8 space-y-2">
                                            {subject.subtopics[topic].map((sub) => {
                                              const subDone = isSubtopicCompleted(subject.id, sub);
                                              return (
                                                <li key={sub} className="flex items-start gap-3">
                                                  <input 
                                                    type="checkbox" 
                                                    checked={subDone}
                                                    onChange={() => markSubtopicCompleted(subject.id, sub)}
                                                    className="w-4 h-4 mt-0.5 rounded-md cursor-pointer accent-indigo-500" 
                                                  />
                                                  <p className={`text-xs leading-relaxed ${subDone ? 'text-gray-400 line-through' : 'text-gray-600 dark:text-gray-400 font-medium'}`}>
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
                              
                              {/* Right Column: Projects & Resources */}
                              <section className="space-y-10">
                                <div>
                                  <h4 className="text-xs font-black uppercase mb-6 text-purple-600 flex items-center gap-2 tracking-[0.2em]">
                                    <Target className="w-4 h-4" /> Build to Master
                                  </h4>
                                  <div className="grid gap-4">
                                    {subject.projects.map((p, i) => (
                                      <div key={i} className="group/project p-5 bg-white/60 dark:bg-black/40 rounded-2xl border border-white/20 dark:border-white/5 hover:border-purple-500/30 transition-all shadow-sm">
                                        <div className="flex justify-between items-start mb-2">
                                          <p className="font-black text-gray-900 dark:text-white text-sm">{p.name}</p>
                                          <span className="text-[9px] font-black px-2 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-full uppercase tracking-tighter">
                                            {p.level}
                                          </span>
                                        </div>
                                        <p className="text-[11px] text-gray-600 dark:text-gray-400 mb-3 leading-snug">{p.description}</p>
                                        <div className="pt-3 border-t border-black/5 dark:border-white/5 flex items-start gap-2">
                                          <Trophy className="w-3 h-3 text-yellow-500 mt-0.5 shrink-0" />
                                          <p className="text-[10px] text-gray-500 italic font-medium">
                                            <span className="text-purple-600 dark:text-purple-400 font-black not-italic uppercase tracking-tighter mr-1">Hireable Version:</span> 
                                            {p.outcome}
                                          </p>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <h4 className="text-xs font-black uppercase mb-6 text-green-600 flex items-center gap-2 tracking-[0.2em]">
                                    <Star className="w-4 h-4" /> Recommended Resources
                                  </h4>
                                  <div className="grid gap-3">
                                    {subject.resources.map((res, i) => (
                                      <a 
                                        key={i} 
                                        href={res.url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between p-4 bg-green-500/5 dark:bg-green-500/10 rounded-2xl border border-green-500/10 hover:border-green-500/40 transition-all group/res"
                                      >
                                        <div className="flex-1">
                                          <div className="flex items-center gap-2 mb-0.5">
                                            <p className="font-bold text-xs text-gray-900 dark:text-white">{res.name}</p>
                                            <span className="text-[8px] font-black uppercase px-1.5 py-0.5 bg-white/50 dark:bg-black/50 rounded-md text-gray-500">
                                              {res.type}
                                            </span>
                                          </div>
                                          <p className="text-[10px] text-gray-500 line-clamp-1 italic">{res.notes}</p>
                                        </div>
                                        <div className="flex items-center gap-4 ml-4">
                                          <div className="flex items-center gap-0.5">
                                            {[...Array(5)].map((_, idx) => (
                                              <Star key={idx} className={`w-2.5 h-2.5 ${idx < res.stars ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />
                                            ))}
                                          </div>
                                          <span className={`text-[9px] font-black uppercase ${res.cost === 'Free' ? 'text-green-600' : 'text-orange-600'}`}>
                                            {res.cost}
                                          </span>
                                        </div>
                                      </a>
                                    ))}
                                  </div>
                                </div>
                              </section>
                            </div>

                            {/* Self Check & Stuck Section */}
                            <section className="grid md:grid-cols-2 gap-8 pt-10 border-t border-black/5 dark:border-white/5">
                              <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-100 dark:border-red-900/30">
                                <h4 className="font-black text-[10px] uppercase text-red-600 dark:text-red-400 mb-4 flex items-center gap-2 tracking-[0.2em]">
                                  <AlertCircle className="w-4 h-4" /> Common Mistakes
                                </h4>
                                <ul className="text-xs space-y-3 text-gray-700 dark:text-gray-300">
                                  {subject.commonMistakes.map((m, i) => (
                                    <li key={i} className="flex gap-3">
                                      <span className="text-red-400 shrink-0">✕</span>
                                      <span className="font-medium">{m}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>

                              <div className="space-y-6">
                                <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-2xl border border-green-100 dark:border-green-900/30">
                                  <h4 className="font-black text-[10px] uppercase text-green-700 dark:text-green-400 mb-4 flex items-center gap-2 tracking-[0.2em]">
                                    <CheckCircle className="w-4 h-4" /> Knowledge Self-Check
                                  </h4>
                                  <ul className="text-xs space-y-3 text-gray-700 dark:text-gray-300">
                                    {subject.selfCheck.map((item, i) => (
                                      <li key={i} className="flex gap-3">
                                        <span className="text-green-500 shrink-0">?</span>
                                        <span className="font-medium">{item}</span>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div className="bg-orange-50 dark:bg-orange-900/10 p-6 rounded-2xl border border-orange-100 dark:border-orange-900/30">
                                  <h4 className="font-black text-[10px] uppercase text-orange-700 dark:text-orange-400 mb-3 flex items-center gap-2 tracking-[0.2em]">
                                    <Info className="w-4 h-4" /> Strategy: When Stuck
                                  </h4>
                                  <p className="text-xs text-gray-700 dark:text-gray-300 italic leading-relaxed">
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
      ))}
    </div>
  );
}
