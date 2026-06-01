import { useState, useMemo } from 'react';
import { useTrackerStore } from '../store/useTrackerStore';
import { curriculum } from '../data/curriculum';
import { ChevronDown, ChevronRight, Calendar as CalendarIcon, Sparkles, Plus, X, Check, BookOpen, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Toast from './Toast';

export default function Planner() {
  const { missionEndDate, setMissionEndDate, progress } = useTrackerStore();
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [showSelector, setShowSelector] = useState(false);
  const [suggestedPlan, setSuggestedPlan] = useState<{title: string, date: string, items: string[]}[] | null>(null);
  const [expandedPhases, setExpandedPhases] = useState<number[]>([]);
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);

  // Generate date cards dynamically based on mission end date
  const dates = useMemo(() => {
    const arr = [];
    const start = new Date();
    // Default to 14 days if no end date, otherwise show up to 30 days of the mission
    const limit = missionEndDate ? Math.min(30, Math.ceil((new Date(missionEndDate).getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1) : 14;
    
    for (let i = 0; i < Math.max(7, limit); i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      arr.push(d.toISOString().split('T')[0]);
    }
    return arr;
  }, [missionEndDate]);

  const handleSetEndDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMissionEndDate(e.target.value);
    setToast({ message: 'Mission timeline updated!', type: 'success' });
  };

  const generateFullPlan = () => {
    if (!missionEndDate) {
      setToast({ message: 'Please set a Mission End Date first!', type: 'error' });
      return;
    }

    const start = new Date();
    const end = new Date(missionEndDate);
    const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    if (totalDays < 30) {
      setToast({ message: 'Target date is too close for a full curriculum plan.', type: 'error' });
      return;
    }

    // Abstract Calculation for Full Curriculum
    const plan: {title: string, date: string, items: string[]}[] = [];
    let currentDate = new Date(start);

    // Group by Phase for abstract milestones
    curriculum.forEach(phase => {
      const phaseSubjects = phase.subjects.filter(s => !progress[s.id]?.completed);
      if (phaseSubjects.length > 0) {
        const phaseDays = Math.floor(totalDays * (phase.hours / 3000)); // Rough distribution
        const milestoneDate = new Date(currentDate);
        milestoneDate.setDate(milestoneDate.getDate() + phaseDays);
        
        plan.push({
          title: `Phase ${phase.id}: ${phase.name}`,
          date: milestoneDate.toLocaleDateString(),
          items: phaseSubjects.slice(0, 3).map(s => s.name)
        });
        currentDate = milestoneDate;
      }
    });

    setSuggestedPlan(plan);
    setToast({ message: 'Strategic Roadmap Generated!', type: 'success' });
  };

  const togglePhase = (id: number) => {
    setExpandedPhases(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const toggleSubject = (id: string) => {
    setExpandedSubjects(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  return (
    <div className="animate-slide-in-up max-w-6xl mx-auto space-y-12 pb-32">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      {/* Mission Setup Header */}
      <div className="glass p-10 rounded-[3rem] shadow-2xl relative overflow-hidden border-none">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter italic">
              The Mission <span className="text-blue-600">Timeline</span>
            </h2>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em]">
              Set your destination, and we'll map the path.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6">
            <div className="bg-white/40 dark:bg-black/20 p-4 rounded-3xl border border-white/40 dark:border-white/5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                <CalendarIcon className="w-6 h-6 text-white" /> {/* Fixed visibility */}
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400">Target End Date</p>
                <input 
                  type="date" 
                  value={missionEndDate || ''} 
                  onChange={handleSetEndDate}
                  className="bg-transparent text-sm font-bold text-gray-900 dark:text-white focus:outline-none dark:[color-scheme:dark]"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full -mr-48 -mt-48 blur-3xl" />
      </div>

      {/* Daily Planner View */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4">
          <h3 className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">Daily Execution</h3>
          <button 
            onClick={generateFullPlan}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
          >
            <Sparkles className="w-4 h-4" /> Generate Suggested Plan
          </button>
        </div>

        {/* Date Horizontal Scroll */}
        <div className="flex gap-4 overflow-x-auto pb-6 px-4 no-scrollbar">
          {dates.map((date) => {
            const d = new Date(date);
            const isToday = date === new Date().toISOString().split('T')[0];
            return (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`flex-shrink-0 w-24 h-32 rounded-[2rem] flex flex-col items-center justify-center transition-all border-2 ${
                  selectedDate === date 
                    ? 'bg-blue-600 border-blue-600 text-white shadow-2xl shadow-blue-600/30 scale-110' 
                    : isToday 
                      ? 'bg-blue-500/10 border-blue-500/30 text-blue-600'
                      : 'bg-white/40 dark:bg-black/20 border-white/40 dark:border-white/5 text-gray-900 dark:text-white hover:border-blue-500/50'
                }`}
              >
                <p className={`text-[10px] font-black uppercase mb-1 ${selectedDate === date ? 'text-white/70' : 'text-gray-400'}`}>
                  {d.toLocaleDateString('en-US', { weekday: 'short' })}
                </p>
                <p className="text-3xl font-black">{d.getDate()}</p>
              </button>
            );
          })}
        </div>

        {/* Selected Date Card */}
        <div className="glass p-10 rounded-[3rem] shadow-2xl min-h-[400px] relative overflow-hidden border-none">
          <div className="flex justify-between items-start mb-10">
            <div>
              <p className="text-[10px] font-black uppercase text-blue-600 mb-1">Focus for</p>
              <h4 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">
                {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </h4>
            </div>
            <button 
              onClick={() => setShowSelector(true)}
              className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="col-span-full py-20 flex flex-col items-center justify-center opacity-30 text-center space-y-4">
              <CalendarIcon className="w-16 h-16" />
              <p className="text-sm font-black uppercase italic max-w-xs">Nothing scheduled yet. Click the + to add to your mission plan.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Suggested Plan Results */}
      <AnimatePresence>
        {suggestedPlan && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass p-10 rounded-[3rem] border-none shadow-2xl bg-gradient-to-br from-purple-500/5 to-blue-500/5"
          >
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-purple-600 flex items-center justify-center text-white shadow-xl">
                  <Sparkles className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">AI Suggested Roadmap</h4>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Calculated completion based on your {missionEndDate} target</p>
                </div>
              </div>
              <button onClick={() => setSuggestedPlan(null)} className="p-3 hover:bg-black/5 dark:hover:bg-white/5 rounded-2xl transition-all"><X className="w-5 h-5" /></button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suggestedPlan.map((milestone, i) => (
                <div key={i} className="p-6 bg-white/40 dark:bg-black/20 rounded-[2rem] border border-white/40 dark:border-white/5 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Clock className="w-12 h-12" />
                  </div>
                  <p className="text-[10px] font-black text-purple-600 uppercase mb-2">Milestone {i + 1}</p>
                  <h5 className="font-black text-gray-900 dark:text-white uppercase tracking-tighter mb-4">{milestone.title}</h5>
                  <div className="space-y-2 mb-6">
                    {milestone.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <Check className="w-3 h-3 text-green-500" />
                        <p className="text-[10px] font-bold text-gray-500 dark:text-gray-400 line-clamp-1">{item}</p>
                      </div>
                    ))}
                  </div>
                  <div className="pt-4 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                    <p className="text-[10px] font-black uppercase text-gray-400">Target Date</p>
                    <p className="text-xs font-black text-blue-600">{milestone.date}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 p-6 bg-blue-600 rounded-[2rem] text-center text-white shadow-2xl shadow-blue-600/30">
              <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-80">Full Curriculum Mastery Estimated</p>
              <h5 className="text-2xl font-black mt-1 uppercase italic">{new Date(missionEndDate!).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</h5>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hierarchical Selection Modal */}
      <AnimatePresence>
        {showSelector && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSelector(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-4xl max-h-[85vh] bg-white dark:bg-gray-900 rounded-[3.5rem] shadow-2xl overflow-hidden flex flex-col border-none"
            >
              <div className="p-10 border-b border-black/5 dark:border-white/5 flex justify-between items-center bg-gray-50 dark:bg-black/20">
                <div>
                  <h4 className="text-3xl font-black text-gray-900 dark:text-white uppercase tracking-tighter flex items-center gap-3">
                    <BookOpen className="text-blue-600" /> Curriculum Selection
                  </h4>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Assign entire phases, subjects, or specific subtopics</p>
                </div>
                <button onClick={() => setShowSelector(false)} className="p-4 bg-black/5 dark:bg-white/10 rounded-2xl hover:bg-black/10 dark:hover:bg-white/20 transition-all">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-10 space-y-6 custom-scrollbar">
                {curriculum.map((phase) => (
                  <div key={phase.id} className="border-b border-black/5 dark:border-white/5 pb-6 last:border-0">
                    <div 
                      className="flex items-center gap-4 py-4 cursor-pointer group"
                      onClick={() => togglePhase(phase.id)}
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        {expandedPhases.includes(phase.id) ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                      </div>
                      <div className="flex-1">
                        <h5 className="text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight">Phase {phase.id}: {phase.name}</h5>
                      </div>
                      <button 
                        onClick={(e) => { e.stopPropagation(); setToast({ message: `Full Phase ${phase.id} added to plan!`, type: 'success' }); }}
                        className="p-2 bg-blue-600 text-white rounded-xl shadow-lg hover:scale-110 active:scale-95 transition-all"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <AnimatePresence>
                      {expandedPhases.includes(phase.id) && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden ml-12 space-y-3 mt-2"
                        >
                          {phase.subjects.map(subject => (
                            <div key={subject.id} className="rounded-2xl overflow-hidden border border-black/5 dark:border-white/5">
                              <div 
                                className="flex items-center gap-4 p-4 bg-gray-50/50 dark:bg-white/5 cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 transition-all"
                                onClick={() => toggleSubject(subject.id)}
                              >
                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedSubjects.includes(subject.id) ? '' : '-rotate-90'}`} />
                                <div className="flex-1">
                                  <p className="text-[10px] font-black text-blue-600 uppercase mb-0.5">{subject.id}</p>
                                  <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{subject.name}</p>
                                </div>
                                <button 
                                  onClick={(e) => { e.stopPropagation(); setToast({ message: `${subject.id} added to plan!`, type: 'success' }); }}
                                  className="p-1.5 bg-blue-500/10 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>

                              <AnimatePresence>
                                {expandedSubjects.includes(subject.id) && (
                                  <motion.div 
                                    initial={{ height: 0 }}
                                    animate={{ height: 'auto' }}
                                    className="overflow-hidden bg-white dark:bg-black/10 p-4 space-y-4"
                                  >
                                    {subject.topics.map(topic => (
                                      <div key={topic} className="ml-4 pl-4 border-l-2 border-blue-500/20">
                                        <div className="flex items-center justify-between group/topic py-1">
                                          <p className="text-xs font-black text-gray-500 uppercase tracking-tight group-hover/topic:text-blue-600 transition-colors">{topic}</p>
                                          <button className="opacity-0 group-hover/topic:opacity-100 p-1 hover:text-blue-600 transition-all">
                                            <Plus className="w-3.5 h-3.5" />
                                          </button>
                                        </div>
                                        {subject.subtopics[topic] && (
                                          <div className="space-y-2 mt-2 ml-4">
                                            {subject.subtopics[topic].map(sub => (
                                              <div key={sub} className="flex items-center justify-between group/sub">
                                                <p className="text-[10px] text-gray-400 font-bold">{sub}</p>
                                                <button className="opacity-0 group-hover/sub:opacity-100 text-blue-500"><Plus className="w-3 h-3" /></button>
                                              </div>
                                            ))}
                                          </div>
                                        )}
                                      </div>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              <div className="p-10 border-t border-black/5 dark:border-white/5 bg-gray-50 dark:bg-black/20 flex justify-center">
                <button 
                  onClick={() => setShowSelector(false)}
                  className="px-16 py-5 bg-gray-900 dark:bg-white text-white dark:text-black rounded-3xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all"
                >
                  Confirm Selections
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
