import { useState } from 'react';
import { useTrackerStore } from '../store/useTrackerStore';
import { curriculum } from '../data/curriculum';
import { ChevronDown, BookOpen, Target, AlertCircle, CheckCircle } from 'lucide-react';

export default function CurriculumViewer() {
  const { toggleSubjectCompletion, progress } = useTrackerStore();
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);

  const toggleExpand = (subjectId: string) => {
    setExpandedSubjects((prev) =>
      prev.includes(subjectId)
        ? prev.filter((id) => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  const isExpanded = (subjectId: string) => expandedSubjects.includes(subjectId);
  const isCompleted = (subjectId: string) => progress[subjectId]?.completed || false;

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
    <div className="animate-slide-in-up space-y-8">
      {curriculum.map((phase) => (
        <div key={phase.id} className="glass rounded-[2rem] shadow-2xl overflow-hidden border-none">
          <div className="p-8 text-white relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${phase.color}, ${phase.color}cc)` }}>
            <p className="text-xs font-black uppercase tracking-[0.2em] mb-2 opacity-80">Phase {phase.id}</p>
            <h2 className="text-3xl font-black">{phase.name}</h2>
          </div>
          <div className="p-8 grid gap-6">
            {phase.subjects.map((subject) => {
              const expanded = isExpanded(subject.id);
              const completed = isCompleted(subject.id);

              return (
                <div 
                  key={subject.id} 
                  className={`group rounded-2xl transition-all border ${completed ? 'bg-green-500/5 border-green-500/20' : 'bg-white/40 dark:bg-gray-800/40 border-white/20'}`}
                >
                  <div className="flex items-center w-full p-5 cursor-pointer" onClick={() => toggleExpand(subject.id)}>
                    <input type="checkbox" checked={completed} onChange={() => toggleSubjectCompletion(subject.id)} className="w-6 h-6 mr-5 cursor-pointer accent-green-500" />
                    <h3 className={`flex-1 font-bold text-lg ${completed ? 'text-gray-400 line-through' : 'text-gray-900 dark:text-white'}`}>{subject.name}</h3>
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase ${getDifficultyColor(subject.difficulty)}`}>{subject.difficulty}</span>
                    <ChevronDown className={`w-6 h-6 ml-4 transition-transform ${expanded ? 'rotate-180' : ''}`} />
                  </div>
                  
                  {expanded && (
                    <div className="px-5 pb-6 space-y-8">
                      <div className="text-sm text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700/30 p-4 rounded-xl">
                        {subject.description}
                      </div>

                      <div className="grid md:grid-cols-2 gap-8">
                        <section>
                          <h4 className="text-xs font-black uppercase mb-4 text-blue-600 flex items-center gap-2">
                            <BookOpen className="w-4 h-4" /> Topics & Subtopics
                          </h4>
                          {subject.topics.map((topic) => (
                            <div key={topic} className="mb-4 p-3 bg-white/20 dark:bg-black/10 rounded-xl">
                              <label className="flex items-center gap-3 cursor-pointer">
                                {phase.id === 1 && <input type="checkbox" className="w-4 h-4 rounded cursor-pointer accent-blue-500" />}
                                <p className="text-sm font-bold text-gray-900 dark:text-gray-100">{topic}</p>
                              </label>
                              {subject.subtopics[topic] && (
                                <ul className="ml-7 mt-2 space-y-1">
                                  {subject.subtopics[topic].map((sub) => (
                                    <li key={sub} className="text-xs text-gray-500 dark:text-gray-400">
                                      <label className="flex items-center gap-2 cursor-pointer">
                                        {phase.id === 1 && <input type="checkbox" className="w-3 h-3 rounded cursor-pointer accent-blue-500" />}
                                        {sub}
                                      </label>
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </div>
                          ))}
                        </section>
                        
                        <section className="space-y-6">
                          <div>
                            <h4 className="text-xs font-black uppercase mb-4 text-purple-600 flex items-center gap-2">
                              <Target className="w-4 h-4" /> Projects
                            </h4>
                            {subject.projects.map((p, i) => (
                              <div key={i} className="mb-3 p-3 bg-white/40 dark:bg-black/20 rounded-xl border border-white/10">
                                <p className="text-sm font-bold text-gray-900 dark:text-white">{p.name}</p>
                                <p className="text-xs text-gray-600 dark:text-gray-400">{p.description}</p>
                                <p className="text-[10px] text-blue-600 font-bold mt-1">Level: {p.level}</p>
                                <p className="text-[10px] text-gray-500 italic mt-0.5">{p.outcome}</p>
                              </div>
                            ))}
                          </div>
                          <div>
                            <h4 className="text-xs font-black uppercase mb-4 text-red-600 flex items-center gap-2">
                              <AlertCircle className="w-4 h-4" /> Common Mistakes
                            </h4>
                            <ul className="text-xs list-disc ml-5 text-gray-600 dark:text-gray-400 space-y-1">
                              {subject.commonMistakes.map((m, i) => <li key={i}>{m}</li>)}
                            </ul>
                          </div>
                        </section>
                      </div>

                      <section className="grid md:grid-cols-2 gap-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <div className="bg-green-50 dark:bg-green-900/10 p-4 rounded-xl text-xs border border-green-200 dark:border-green-800">
                          <h4 className="font-black text-green-700 dark:text-green-400 mb-2 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" /> Self-Check
                          </h4>
                          <ul className="list-disc ml-5 space-y-1 text-gray-700 dark:text-gray-300">
                            {subject.selfCheck.map((item, i) => <li key={i}>{item}</li>)}
                          </ul>
                        </div>
                        <div className="bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-xl text-xs border border-yellow-200 dark:border-yellow-800 italic text-gray-700 dark:text-gray-300">
                          <h4 className="font-black text-yellow-700 dark:text-yellow-400 mb-2">When Stuck:</h4>
                          {subject.whenStuck}
                        </div>
                      </section>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
