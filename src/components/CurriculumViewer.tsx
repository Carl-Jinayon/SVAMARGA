import { useState } from 'react';
import { useTrackerStore } from '../store/useTrackerStore';
import { curriculum } from '../data/curriculum';
import { ChevronDown, ExternalLink, Star } from 'lucide-react';

export default function CurriculumViewer() {
  const { toggleSubjectCompletion, markTopicCompleted, markProjectCompleted, progress } = useTrackerStore();
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
      case 'Beginner':
        return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'Intermediate':
        return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      case 'Hard':
        return 'bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200';
      case 'Very Hard':
        return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      default:
        return 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200';
    }
  };

  return (
    <div className="animate-slide-in-up space-y-8">
      {curriculum.map((phase) => (
        <div key={phase.id} className="glass rounded-[2rem] shadow-2xl overflow-hidden border-none">
          {/* Phase Header */}
          <div
            className="p-8 text-white relative overflow-hidden"
            style={{
              background: `linear-gradient(135deg, ${phase.color}, ${phase.color}cc)`,
            }}
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-20 -mt-20 blur-3xl" />
            <div className="relative z-10 flex items-start justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.2em] mb-2 opacity-80">Phase {phase.id}</p>
                <h2 className="text-3xl font-black">{phase.name}</h2>
                <div className="flex gap-4 mt-3">
                  <span className="text-xs font-bold bg-black/20 px-3 py-1 rounded-full">{phase.duration}</span>
                  <span className="text-xs font-bold bg-black/20 px-3 py-1 rounded-full">{phase.hours} hours</span>
                </div>
              </div>
            </div>
            {phase.description && (
              <p className="text-sm font-medium mt-6 max-w-2xl leading-relaxed opacity-90">{phase.description}</p>
            )}
          </div>

          {/* Subjects Grid */}
          <div className="p-8 grid gap-6">
            {phase.subjects.map((subject) => {
              const expanded = isExpanded(subject.id);
              const completed = isCompleted(subject.id);
              const subjectProgress = progress[subject.id];
              const topicsCompleted = subjectProgress?.topicsCompleted.length || 0;
              const projectsCompleted = subjectProgress?.projectsCompleted.length || 0;

              return (
                <div
                  key={subject.id}
                  className={`group rounded-2xl transition-all duration-300 border ${
                    completed
                      ? 'bg-green-500/5 border-green-500/20'
                      : 'bg-white/40 dark:bg-gray-800/40 border-white/20 dark:border-gray-700/30'
                  }`}
                >
                  {/* Subject Header */}
                  <div className="flex items-center w-full p-5 transition-all">
                    <div className="flex items-center gap-5 flex-1">
                      <div className="relative" onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={completed}
                          onChange={() => toggleSubjectCompletion(subject.id)}
                          className="w-6 h-6 rounded-lg cursor-pointer accent-green-500 transition-transform hover:scale-110 relative z-20"
                        />
                        {completed && (
                          <div className="absolute inset-0 bg-green-500 rounded-lg blur-md opacity-20 animate-pulse" />
                        )}
                      </div>
                      <button 
                        onClick={() => toggleExpand(subject.id)}
                        className="flex-1 text-left"
                      >
                        <h3 className={`font-bold text-lg transition-all ${completed ? 'text-gray-400 dark:text-gray-500 line-through' : 'text-gray-900 dark:text-white'}`}>
                          <span className="text-sm opacity-50 mr-2 font-mono">{subject.id}</span>
                          {subject.name}
                        </h3>
                        <div className="flex gap-3 mt-1">
                          <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">{subject.duration}</span>
                          <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">•</span>
                          <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">{subject.hours}h</span>
                        </div>
                      </button>
                    </div>
                    <button 
                      onClick={() => toggleExpand(subject.id)}
                      className="flex items-center gap-4 ml-4"
                    >
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${getDifficultyColor(subject.difficulty)}`}>
                        {subject.difficulty}
                      </span>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${expanded ? 'bg-gray-100 dark:bg-gray-700 rotate-180' : 'bg-transparent'}`}>
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </button>
                  </div>

                  {/* Expanded Content */}
                  {expanded && (
                    <div className="px-5 pb-6 space-y-8 animate-slide-in-up">
                      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" />
                      
                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Topics */}
                        {subject.topics.length > 0 && (
                          <div className="space-y-4">
                            <h4 className="text-xs font-black uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400 flex justify-between">
                              Topics <span>{topicsCompleted}/{subject.topics.length}</span>
                            </h4>
                            <div className="grid gap-2">
                              {subject.topics.map((topic) => {
                                const topicCompleted = subjectProgress?.topicsCompleted.includes(topic) || false;
                                return (
                                  <label
                                    key={topic}
                                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${
                                      topicCompleted 
                                        ? 'bg-blue-500/5 border-blue-500/10' 
                                        : 'bg-white/20 dark:bg-black/10 border-transparent hover:border-white/40 dark:hover:border-white/5'
                                    }`}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={topicCompleted}
                                      onChange={(e) => {
                                        e.stopPropagation();
                                        markTopicCompleted(subject.id, topic);
                                      }}
                                      onClick={(e) => e.stopPropagation()}
                                      className="w-4 h-4 rounded cursor-pointer accent-blue-500"
                                    />
                                    <span className={`text-sm font-medium ${topicCompleted ? 'text-gray-400 dark:text-gray-500 line-through' : 'text-gray-700 dark:text-gray-300'}`}>
                                      {topic}
                                    </span>
                                  </label>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Projects & Resources */}
                        <div className="space-y-8">
                          {subject.projects.length > 0 && (
                            <div className="space-y-4">
                              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-purple-600 dark:text-purple-400 flex justify-between">
                                Projects <span>{projectsCompleted}/{subject.projects.length}</span>
                              </h4>
                              <div className="grid gap-2">
                                {subject.projects.map((project) => {
                                  const projectCompleted = subjectProgress?.projectsCompleted.includes(project) || false;
                                  return (
                                    <label
                                      key={project}
                                      className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${
                                        projectCompleted 
                                          ? 'bg-purple-500/5 border-purple-500/10' 
                                          : 'bg-white/20 dark:bg-black/10 border-transparent hover:border-white/40 dark:hover:border-white/5'
                                      }`}
                                    >
                                      <input
                                        type="checkbox"
                                        checked={projectCompleted}
                                        onChange={(e) => {
                                          e.stopPropagation();
                                          markProjectCompleted(subject.id, project);
                                        }}
                                        onClick={(e) => e.stopPropagation()}
                                        className="w-4 h-4 rounded cursor-pointer accent-purple-500"
                                      />
                                      <span className={`text-sm font-medium ${projectCompleted ? 'text-gray-400 dark:text-gray-500 line-through' : 'text-gray-700 dark:text-gray-300'}`}>
                                        {project}
                                      </span>
                                    </label>
                                  );
                                })}
                              </div>
                            </div>
                          )}

                          {subject.resources.length > 0 && (
                            <div className="space-y-4">
                              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-orange-600 dark:text-orange-400">Resources</h4>
                              <div className="grid gap-2">
                                {subject.resources.map((resource, idx) => (
                                  <a
                                    key={idx}
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-3 rounded-xl bg-white/40 dark:bg-white/5 border border-white/20 dark:border-white/5 hover:bg-white/60 dark:hover:bg-white/10 transition-all"
                                  >
                                    <div className="flex-1">
                                      <p className="text-sm font-bold text-gray-900 dark:text-white leading-tight">
                                        {resource.name}
                                      </p>
                                      <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 mt-1">
                                        {resource.type} • {resource.cost}
                                      </p>
                                    </div>
                                    <div className="flex items-center gap-3 ml-4">
                                      <div className="flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                          <Star
                                            key={i}
                                            className={`w-3 h-3 ${i < resource.stars ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-700'}`}
                                          />
                                        ))}
                                      </div>
                                      {resource.url && <ExternalLink className="w-4 h-4 text-gray-400" />}
                                    </div>
                                  </a>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
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