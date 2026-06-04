import { useState, useMemo, useEffect } from 'react';
import { useTrackerStore } from '../store/useTrackerStore';
import { curriculum } from '../data/curriculum';
import { ChevronDown, ChevronRight, Calendar as CalendarIcon, Sparkles, Plus, X, Check, BookOpen, Trash2, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Toast from './Toast';
import { DailyPlan } from '../types';

export default function Planner() {
  const { 
    missionEndDate, 
    setMissionEndDate, 
    dailyPlans, 
    updateDailyPlan, 
    toggleDailyItem, 
    suggestedPlans, 
    setSuggestedPlans,
    sessionTimer,
    toggleSessionTimer,
    resetSessionTimer,
    tickSessionTimer,
    progress
  } = useTrackerStore();

  const [showGenerator, setShowGenerator] = useState(false);
  const [dailyHours, setDailyHours] = useState(4);
  const [goalTopics, setGoalTopics] = useState<DailyPlan['items']>([]);

  // Timer interval
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (sessionTimer.isRunning) {
      interval = setInterval(() => {
        tickSessionTimer();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionTimer.isRunning]);

  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [showSelector, setShowSelector] = useState(false);
  const [tempSelection, setTempSelection] = useState<DailyPlan['items']>([]);
  const [expandedPhases, setExpandedPhases] = useState<number[]>([]);
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);

  const togglePhase = (id: number) => {
    setExpandedPhases(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
  };

  const toggleSubject = (id: string) => {
    setExpandedSubjects(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]);
  };

  const dates = useMemo(() => {
    const arr = [];
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    let limit = 14;
    if (missionEndDate) {
      const end = new Date(missionEndDate);
      end.setHours(0, 0, 0, 0);
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      limit = Math.max(14, diffDays + 1);
    }
    for (let i = 0; i < limit; i++) {
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

  const handleOpenSelector = (isGenerator: boolean = false) => {
    if (isGenerator) {
      setTempSelection(goalTopics);
      setShowGenerator(true);
    } else {
      setTempSelection(dailyPlans[selectedDate]?.items || []);
      setShowSelector(true);
    }
  };

  const toggleTempItem = (item: DailyPlan['items'][0]) => {
    setTempSelection(prev => {
      const exists = prev.find(i => i.id === item.id);
      if (exists) return prev.filter(i => i.id !== item.id);
      return [...prev, item];
    });
  };

  const confirmSelection = () => {
    if (showGenerator) {
      setGoalTopics(tempSelection);
    } else {
      updateDailyPlan(selectedDate, tempSelection);
    }
    setShowSelector(false);
    if (!showGenerator) setToast({ message: 'Plan updated for ' + selectedDate, type: 'success' });
  };

  const formatSeconds = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const generateIntelligentPlan = () => {
    if (!missionEndDate || goalTopics.length === 0) {
      setToast({ message: 'Set Mission Date and Goal Topics first!', type: 'error' });
      return;
    }

    const start = new Date();
    const end = new Date(missionEndDate);
    const totalDays = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    
    if (totalDays <= 0) {
      setToast({ message: 'Mission date must be in the future!', type: 'error' });
      return;
    }

    // Advanced Math: Distribute goal topics based on density and hours
    const newSuggestedPlans: Record<string, DailyPlan> = {};
    const itemsPerDay = Math.ceil(goalTopics.length / totalDays);
    
    for (let i = 0; i < totalDays; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      
      const dayItems = goalTopics.slice(i * itemsPerDay, (i + 1) * itemsPerDay).map(item => ({
        ...item,
        isSuggested: true,
        completed: false
      }));

      if (dayItems.length > 0) {
        newSuggestedPlans[dateStr] = { date: dateStr, items: dayItems };
      }
    }

    setSuggestedPlans(newSuggestedPlans);
    setShowGenerator(false);
    setToast({ message: 'Strategic roadmap deployed!', type: 'success' });
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
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="bg-white/40 dark:bg-black/20 p-4 rounded-3xl border border-white/40 dark:border-white/5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-orange-600 flex items-center justify-center text-white shadow-lg shadow-orange-600/20">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase text-gray-400">Session Timer</p>
                <div className="flex items-center gap-3">
                  <p className="text-xl font-black font-mono text-gray-900 dark:text-white">{formatSeconds(sessionTimer.remainingSeconds)}</p>
                  <button onClick={toggleSessionTimer} className="p-2 bg-blue-600 text-white rounded-lg hover:scale-105 transition-all">
                    {sessionTimer.isRunning ? <X className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
                  </button>
                  <button onClick={resetSessionTimer} className="p-2 bg-gray-500 text-white rounded-lg hover:scale-105 transition-all">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
            <div className="bg-white/40 dark:bg-black/20 p-4 rounded-3xl border border-white/40 dark:border-white/5 flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                <CalendarIcon className="w-6 h-6 text-white" />
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
            onClick={() => handleOpenSelector(true)}
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
            const hasPlan = dailyPlans[date]?.items.length > 0;
            return (
              <button
                key={date}
                onClick={() => setSelectedDate(date)}
                className={`flex-shrink-0 w-28 h-36 rounded-[2rem] flex flex-col items-center justify-center transition-all border-2 relative ${
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
                <p className={`text-[8px] font-black uppercase mt-1 ${selectedDate === date ? 'text-white/50' : 'text-gray-400'}`}>
                  {d.toLocaleDateString('en-US', { month: 'short' })}
                </p>
                {hasPlan && (
                  <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_rgba(96,165,250,0.8)]" />
                )}
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
                {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </h4>
            </div>
            <button 
              onClick={() => handleOpenSelector(false)}
              className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20 active:scale-95"
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Real Plans */}
            {dailyPlans[selectedDate]?.items.map((item: any) => (
              <div 
                key={item.id} 
                className={`p-6 rounded-3xl border-2 transition-all flex items-center justify-between group ${
                  item.completed 
                    ? 'bg-green-500/10 border-green-500/20 opacity-60' 
                    : 'bg-white dark:bg-white/5 border-black/5 dark:border-white/5 hover:border-blue-500/30'
                }`}
              >
                <div className="flex items-center gap-4">
                  <button 
                    onClick={() => toggleDailyItem(selectedDate, item.id)}
                    className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                      item.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  >
                    {item.completed && <Check className="w-4 h-4" />}
                  </button>
                  <div>
                    <p className={`text-[8px] font-black uppercase mb-0.5 ${item.completed ? 'text-green-600' : 'text-blue-600'}`}>{item.type}</p>
                    <p className={`text-sm font-bold ${item.completed ? 'line-through text-gray-400' : 'text-gray-900 dark:text-white'}`}>{item.name}</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    const newItems = dailyPlans[selectedDate].items.filter((i: any) => i.id !== item.id);
                    updateDailyPlan(selectedDate, newItems);
                  }}
                  className="opacity-0 group-hover:opacity-100 p-2 text-red-500 hover:bg-red-500/10 rounded-xl transition-all"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}

            {/* Suggested Plans */}
            {suggestedPlans[selectedDate]?.items.map((item: any) => (
              <div 
                key={`sugg-${item.id}`} 
                className="p-6 rounded-3xl border-2 border-dashed border-blue-500/30 bg-blue-500/5 opacity-50 flex items-center justify-between group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-lg border-2 border-blue-500/30 flex items-center justify-center text-blue-500/50">
                    <Sparkles className="w-3 h-3" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-[8px] font-black uppercase text-blue-600">Suggested {item.type}</p>
                      <span className="text-[7px] bg-blue-600 text-white px-1.5 py-0.5 rounded-full font-black uppercase tracking-tighter">AI</span>
                    </div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white">{item.name}</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    const currentItems = dailyPlans[selectedDate]?.items || [];
                    updateDailyPlan(selectedDate, [...currentItems, { ...item, isSuggested: false }]);
                  }}
                  className="p-2 bg-blue-600 text-white rounded-xl text-[8px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
                >
                  Accept
                </button>
              </div>
            ))}

            {(!dailyPlans[selectedDate] || (dailyPlans[selectedDate].items.length === 0 && (!suggestedPlans[selectedDate] || suggestedPlans[selectedDate].items.length === 0))) && (
              <div className="col-span-full py-20 flex flex-col items-center justify-center opacity-30 text-center space-y-4">
                <CalendarIcon className="w-16 h-16" />
                <p className="text-sm font-black uppercase italic max-w-xs">Nothing scheduled yet. Click the + to add to your mission plan.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hierarchical Selection Modal */}
      <AnimatePresence>
        {showSelector && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSelector(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative w-full max-w-2xl max-h-[85vh] bg-white dark:bg-gray-900 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border-none"
            >
              <div className="p-6 sm:p-8 border-b border-black/5 dark:border-white/5 flex justify-between items-center bg-gray-50 dark:bg-black/20">
                <div>
                  <h4 className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter flex items-center gap-3">
                    <BookOpen className="text-blue-600 w-6 h-6" /> Curriculum Selection
                  </h4>
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1">Current selection: {tempSelection.length} items</p>
                </div>
                <button onClick={() => setShowSelector(false)} className="p-3 bg-black/5 dark:bg-white/10 rounded-2xl hover:bg-black/10 dark:hover:bg-white/20 transition-all">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4 custom-scrollbar">
                {curriculum.map((phase) => (
                  <div key={phase.id} className="border-b border-black/5 dark:border-white/5 pb-6 last:border-0">
                    <div 
                      className="flex items-center gap-4 py-4 cursor-pointer group"
                      onClick={() => togglePhase(phase.id)}
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        {expandedPhases.includes(phase.id) ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                      </div>
                      <h5 className="flex-1 text-lg font-black text-gray-900 dark:text-white uppercase tracking-tight">Phase {phase.id}: {phase.name}</h5>
                    </div>

                    <AnimatePresence>
                      {expandedPhases.includes(phase.id) && (
                        <motion.div 
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden ml-4 sm:ml-12 space-y-3 mt-2"
                        >
                          {phase.subjects.map(subject => {
                            const subjectInTemp = tempSelection.some(i => i.id === subject.id);
                            const subjectCompleted = progress[subject.id]?.completed;
                            return (
                              <div key={subject.id} className="rounded-2xl overflow-hidden border border-black/5 dark:border-white/5">
                                <div 
                                  className={`flex items-center gap-4 p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-white/10 transition-all ${subjectCompleted ? 'opacity-50' : 'bg-gray-50/50 dark:bg-white/5'}`}
                                  onClick={() => !subjectCompleted && toggleSubject(subject.id)}
                                >
                                  <input 
                                    type="checkbox"
                                    checked={subjectInTemp || subjectCompleted}
                                    disabled={subjectCompleted}
                                    onChange={(e) => {
                                      e.stopPropagation();
                                      toggleTempItem({ id: subject.id, type: 'subject', name: subject.name, completed: false });
                                    }}
                                    className={`w-5 h-5 rounded-lg accent-blue-600 ${subjectCompleted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                  />
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <p className="text-[10px] font-black text-blue-600 uppercase mb-0.5">{subject.id}</p>
                                      {subjectCompleted && <span className="text-[8px] bg-green-500 text-white px-1.5 py-0.5 rounded-full font-black uppercase">Completed</span>}
                                    </div>
                                    <p className="text-sm font-bold text-gray-800 dark:text-gray-200">{subject.name}</p>
                                  </div>
                                  {!subjectCompleted && <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${expandedSubjects.includes(subject.id) ? '' : '-rotate-90'}`} />}
                                </div>

                                <AnimatePresence>
                                  {!subjectCompleted && expandedSubjects.includes(subject.id) && (
                                    <motion.div 
                                      initial={{ height: 0 }}
                                      animate={{ height: 'auto' }}
                                      className="overflow-hidden bg-white dark:bg-black/10 p-4 space-y-4"
                                    >
                                      {subject.topics.map(topic => {
                                        const topicInTemp = subjectInTemp || tempSelection.some(i => i.id === `${subject.id}-${topic}`);
                                        const topicCompleted = subjectCompleted || progress[subject.id]?.topicsCompleted.includes(topic);
                                        return (
                                          <div key={topic} className="ml-4 pl-4 border-l-2 border-blue-500/20">
                                            <div className="flex items-center gap-3 py-1 group/topic">
                                              <input 
                                                type="checkbox"
                                                checked={topicInTemp || topicCompleted}
                                                disabled={subjectInTemp || topicCompleted}
                                                onChange={() => toggleTempItem({ id: `${subject.id}-${topic}`, type: 'topic', name: topic, completed: false })}
                                                className={`w-4 h-4 rounded-md accent-blue-600 ${ (subjectInTemp || topicCompleted) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                              />
                                              <p className={`text-xs font-black uppercase tracking-tight transition-colors ${topicCompleted ? 'text-green-600' : 'text-gray-500 group-hover/topic:text-blue-600'}`}>{topic}</p>
                                            </div>
                                            {subject.subtopics[topic] && (
                                              <div className="space-y-2 mt-2 ml-7">
                                                {subject.subtopics[topic].map(sub => {
                                                  const subInTemp = topicInTemp || tempSelection.some(i => i.id === `${subject.id}-${topic}-${sub}`);
                                                  const subCompleted = topicCompleted || progress[subject.id]?.subtopicsCompleted.includes(sub);
                                                  return (
                                                    <div key={sub} className="flex items-center gap-3 group/sub">
                                                      <input 
                                                        type="checkbox"
                                                        checked={subInTemp || subCompleted}
                                                        disabled={topicInTemp || subCompleted}
                                                        onChange={() => toggleTempItem({ id: `${subject.id}-${topic}-${sub}`, type: 'subtopic', name: sub, completed: false })}
                                                        className={`w-3.5 h-3.5 rounded accent-blue-600 ${ (topicInTemp || subCompleted) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                                      />
                                                      <p className={`text-[10px] font-bold transition-colors ${subCompleted ? 'text-green-600' : 'text-gray-400 group-hover/sub:text-gray-600 dark:group-hover/sub:text-gray-200'}`}>{sub}</p>
                                                    </div>
                                                  );
                                                })}
                                              </div>
                                            )}
                                          </div>
                                        );
                                      })}
                                    </motion.div>
                                  )}
                                </AnimatePresence>
                              </div>
                            );
                          })}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ))}
              </div>

              <div className="p-6 sm:p-8 border-t border-black/5 dark:border-white/5 bg-gray-50 dark:bg-black/20 flex flex-col sm:flex-row justify-between items-center gap-4">
                <p className="text-[10px] font-bold text-gray-500 italic uppercase">Changes are temporary until confirmed.</p>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button 
                    onClick={() => setShowSelector(false)}
                    className="flex-1 sm:flex-none px-6 py-3 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 rounded-2xl text-[9px] font-black uppercase tracking-widest"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmSelection}
                    className="flex-1 sm:flex-none px-8 py-3 bg-blue-600 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:scale-105 active:scale-95 transition-all"
                  >
                    Confirm Selection
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Intelligent Generator Modal */}
      <AnimatePresence>
        {showGenerator && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowGenerator(false)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative w-full max-w-2xl max-h-[85vh] bg-white dark:bg-gray-900 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border-none"
            >
              <div className="p-8 border-b border-black/5 dark:border-white/5 bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                      <Sparkles className="w-8 h-8" /> Strategy Generator
                    </h4>
                    <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest mt-1">AI-Powered Roadmap Optimization</p>
                  </div>
                  <button onClick={() => setShowGenerator(false)} className="p-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-all">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
                {/* Daily Study Time */}
                <div className="space-y-4">
                  <p className="text-xs font-black uppercase text-gray-400 tracking-widest">How many hours can you study per day?</p>
                  <div className="flex items-center gap-6">
                    <input 
                      type="range" 
                      min="1" 
                      max="16" 
                      value={dailyHours}
                      onChange={(e) => setDailyHours(parseInt(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="w-20 h-20 rounded-[2rem] bg-blue-600 flex flex-col items-center justify-center text-white shadow-xl">
                      <p className="text-2xl font-black">{dailyHours}</p>
                      <p className="text-[8px] font-black uppercase">Hours</p>
                    </div>
                  </div>
                </div>

                {/* Goal Selection */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-black uppercase text-gray-400 tracking-widest">Select your Goal Topics</p>
                    <p className="text-[10px] font-black text-blue-600 uppercase">{tempSelection.length} selected</p>
                  </div>
                  
                  <div className="space-y-4">
                    {curriculum.map((phase) => (
                      <div key={phase.id} className="rounded-3xl border border-black/5 dark:border-white/5 overflow-hidden">
                        <div 
                          className="p-4 bg-gray-50 dark:bg-white/5 flex items-center justify-between cursor-pointer"
                          onClick={() => togglePhase(phase.id)}
                        >
                          <div className="flex items-center gap-4">
                            <input 
                              type="checkbox"
                              checked={tempSelection.some(i => i.id === `phase-${phase.id}`)}
                              onChange={(e) => {
                                e.stopPropagation();
                                toggleTempItem({ id: `phase-${phase.id}`, type: 'phase', name: phase.name, completed: false });
                              }}
                              className="w-5 h-5 accent-blue-600"
                            />
                            <p className="text-sm font-black uppercase">Phase {phase.id}: {phase.name}</p>
                          </div>
                          <ChevronDown className={`w-4 h-4 transition-transform ${expandedPhases.includes(phase.id) ? '' : '-rotate-90'}`} />
                        </div>
                        
                        <AnimatePresence>
                          {expandedPhases.includes(phase.id) && (
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              className="bg-white dark:bg-black/10 p-4 space-y-3"
                            >
                              {phase.subjects.map(subject => (
                                <div key={subject.id} className="ml-4 space-y-2">
                                  <div className="flex items-center gap-3">
                                    <input 
                                      type="checkbox"
                                      checked={tempSelection.some(i => i.id === subject.id)}
                                      onChange={() => toggleTempItem({ id: subject.id, type: 'subject', name: subject.name, completed: false })}
                                      className="w-4 h-4 accent-blue-600"
                                    />
                                    <p className="text-xs font-bold text-gray-600 dark:text-gray-400">{subject.name}</p>
                                  </div>
                                </div>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-8 bg-gray-50 dark:bg-black/20 border-t border-black/5 dark:border-white/5 flex gap-4">
                <button 
                  onClick={() => setShowGenerator(false)}
                  className="flex-1 py-4 bg-white dark:bg-white/5 text-gray-500 rounded-2xl text-[10px] font-black uppercase tracking-widest"
                >
                  Cancel
                </button>
                <button 
                  onClick={generateIntelligentPlan}
                  className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:scale-105 active:scale-95 transition-all"
                >
                  Deploy Strategic Roadmap
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
