import { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
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
    dailyStudyHours,
    setDailyStudyHours,
    dailyPlans, 
    updateDailyPlan, 
    toggleDailyItem, 
    suggestedPlans, 
    setSuggestedPlans,
    sessionTimer,
    setSessionTimer,
    toggleSessionTimer,
    resetSessionTimer,
    tickSessionTimer,
    progress
  } = useTrackerStore();

  const [showGenerator, setShowGenerator] = useState(false);
  const [goalTopics, setGoalTopics] = useState<DailyPlan['items']>([]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (sessionTimer.isRunning) {
      interval = setInterval(() => {
        tickSessionTimer();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionTimer.isRunning]);

  useEffect(() => {
    if (sessionTimer.totalSeconds === 0 && dailyStudyHours > 0) {
      setSessionTimer(dailyStudyHours * 3600);
    }
  }, [dailyStudyHours]);

  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [isEditingTimer, setIsEditingTimer] = useState(false);
  const [timerInputs, setTimerInputs] = useState({ h: 0, m: 0, s: 0 });

  const handleEditTimer = () => {
    const h = Math.floor(sessionTimer.remainingSeconds / 3600);
    const m = Math.floor((sessionTimer.remainingSeconds % 3600) / 60);
    const s = sessionTimer.remainingSeconds % 60;
    setTimerInputs({ h, m, s });
    setIsEditingTimer(true);
  };

  const saveTimer = () => {
    const total = (timerInputs.h * 3600) + (timerInputs.m * 60) + timerInputs.s;
    setSessionTimer(total);
    setIsEditingTimer(false);
    setToast({ message: 'Timer updated!', type: 'success' });
  };

  const toggleItemExpansion = (id: string) => {
    setExpandedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const getItemChildren = (item: any) => {
    if (item.type === 'phase') {
      const phaseId = parseInt(item.id.split('::')[1]);
      return curriculum.find(p => p.id === phaseId)?.subjects.map(s => ({ id: s.id, type: 'subject', name: s.name })) || [];
    }
    if (item.type === 'subject') {
      const subject = curriculum.flatMap(p => p.subjects).find(s => s.id === item.id);
      return subject?.topics.map(t => ({ id: `${subject.id}::${t}`, type: 'topic', name: t })) || [];
    }
    if (item.type === 'topic') {
      const parts = item.id.split('::');
      const subjectId = parts[0];
      const topicName = parts[1];
      const subject = curriculum.flatMap(p => p.subjects).find(s => s.id === subjectId);
      return subject?.subtopics[topicName]?.map(s => ({ id: `${subjectId}::${topicName}::${s}`, type: 'subtopic', name: s })) || [];
    }
    return [];
  };

  const renderHierarchicalItem = (item: any, depth = 0, isParentCompleted = false) => {
    const children = getItemChildren(item);
    const isExpanded = expandedItems.includes(item.id);
    const inPlan = dailyPlans[selectedDate]?.items.find((i: any) => i.id === item.id);
    const isCompleted = inPlan?.completed || isParentCompleted;

    return (
      <div key={item.id} className={`space-y-2 ${depth > 0 ? 'ml-6 border-l pl-4 mt-2' : 'glass p-6 rounded-3xl transition-all'}`} style={depth > 0 ? { borderColor: 'var(--border-subtle)' } : {}}>
        <div className="flex items-center justify-between group">
          <div className="flex items-center gap-4">
            <button 
              disabled={isParentCompleted}
              onClick={() => toggleDailyItem(selectedDate, item.id)}
              className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                isCompleted ? 'text-white' : ''
              } ${isParentCompleted ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
              style={{
                background: isCompleted ? 'var(--accent-teal)' : 'transparent',
                borderColor: isCompleted ? 'var(--accent-teal)' : 'var(--border-subtle)'
              }}
            >
              {isCompleted && <Check className="w-4 h-4" />}
            </button>
            <div>
              <div className="flex items-center gap-2">
                <p className="text-[8px] font-black uppercase mb-0.5" style={{ color: isCompleted ? 'var(--accent-teal)' : 'var(--accent-cyan)' }}>{item.type}</p>
                {children.length > 0 && (
                  <button 
                    onClick={() => toggleItemExpansion(item.id)}
                    className="text-[7px] font-black uppercase px-1.5 py-0.5 rounded-md transition-all"
                    style={{ background: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                  >
                    {isExpanded ? 'Collapse' : 'Expand'}
                  </button>
                )}
              </div>
              <p className="text-sm font-bold" style={{ color: isCompleted ? 'var(--text-muted)' : 'var(--text-primary)', textDecoration: isCompleted ? 'line-through' : 'none' }}>{item.name}</p>
            </div>
          </div>
          {depth === 0 && (
            <button 
              onClick={() => {
                const newItems = dailyPlans[selectedDate].items.filter((i: any) => i.id !== item.id && !i.id.startsWith(item.id + '::'));
                updateDailyPlan(selectedDate, newItems);
              }}
              className="opacity-0 group-hover:opacity-100 p-2 rounded-xl transition-all"
              style={{ color: '#EF4444' }}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
        </div>

        <AnimatePresence>
          {isExpanded && children.length > 0 && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden"
            >
              {children.map(child => renderHierarchicalItem(child, depth + 1, isCompleted))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const [selectedDate, setSelectedDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [showSelector, setShowSelector] = useState(false);
  const [tempSelection, setTempSelection] = useState<DailyPlan['items']>([]);
  const [expandedPhases, setExpandedPhases] = useState<number[]>([]);
  const [expandedSubjects, setExpandedSubjects] = useState<string[]>([]);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarView, setCalendarView] = useState(new Date());
  const [viewMode, setViewMode] = useState<'days' | 'years'>('days');

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

  const toggleGoalItem = (item: DailyPlan['items'][0]) => {
    setGoalTopics(prev => {
      const exists = prev.find(i => i.id === item.id);
      let newSelection = [...prev];

      if (exists) {
        newSelection = newSelection.filter(i => i.id !== item.id && !i.id.startsWith(item.id + '::'));
      } else {
        newSelection.push(item);
        
        if (item.type === 'phase') {
          const phaseId = parseInt(item.id.split('::')[1]);
          const phase = curriculum.find(p => p.id === phaseId);
          phase?.subjects.forEach(s => {
            if (!newSelection.find(i => i.id === s.id)) {
              newSelection.push({ id: s.id, type: 'subject', name: s.name, completed: false });
            }
          });
        }
        if (item.type === 'subject') {
          const subject = curriculum.flatMap(p => p.subjects).find(s => s.id === item.id);
          subject?.topics.forEach(t => {
            const topicId = `${subject.id}::${t}`;
            if (!newSelection.find(i => i.id === topicId)) {
               newSelection.push({ id: topicId, type: 'topic', name: t, completed: false });
            }
            subject.subtopics[t]?.forEach(sub => {
              const subId = `${topicId}::${sub}`;
              if (!newSelection.find(i => i.id === subId)) {
                newSelection.push({ id: subId, type: 'subtopic', name: sub, completed: false });
              }
            });
          });
        }
        if (item.type === 'topic') {
          const [sid, tname] = item.id.split('::');
          const subject = curriculum.flatMap(p => p.subjects).find(s => s.id === sid);
          subject?.subtopics[tname]?.forEach(sub => {
            const subId = `${item.id}::${sub}`;
            if (!newSelection.find(i => i.id === subId)) {
              newSelection.push({ id: subId, type: 'subtopic', name: sub, completed: false });
            }
          });
        }
      }
      return newSelection;
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
    start.setHours(0,0,0,0);
    const end = new Date(missionEndDate);
    end.setHours(0,0,0,0);
    const totalDays = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
    
    const newSuggestedPlans: Record<string, DailyPlan> = {};
    
    let allItems: DailyPlan['items'] = [];
    goalTopics.forEach(item => {
      allItems.push(item);
      if (item.type === 'subject') {
        const subject = curriculum.flatMap(p => p.subjects).find(s => s.id === item.id);
        subject?.topics.forEach(t => {
          const topicId = `${subject.id}::${t}`;
          allItems.push({ id: topicId, type: 'topic', name: t, completed: false });
          subject.subtopics[t]?.forEach(sub => {
            allItems.push({ id: `${topicId}::${sub}`, type: 'subtopic', name: sub, completed: false });
          });
        });
      } else if (item.type === 'topic') {
        const [sid, tname] = item.id.split('::');
        const subject = curriculum.flatMap(p => p.subjects).find(s => s.id === sid);
        subject?.subtopics[tname]?.forEach(sub => {
          allItems.push({ id: `${item.id}::${sub}`, type: 'subtopic', name: sub, completed: false });
        });
      }
    });

    allItems = allItems.filter((v, i, a) => a.findIndex(t => t.id === v.id) === i);

    const itemsPerDay = Math.ceil(allItems.length / totalDays);
    
    for (let i = 0; i < totalDays; i++) {
      const d = new Date(start);
      d.setDate(d.getDate() + i);
      const dateStr = d.toISOString().split('T')[0];
      
      const dayItems = allItems.slice(i * itemsPerDay, (i + 1) * itemsPerDay).map(item => ({
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
    setToast({ message: `Strategic roadmap deployed across ${totalDays} days!`, type: 'success' });
    
    if (sessionTimer.totalSeconds === 0) {
      setSessionTimer(dailyStudyHours * 3600);
    }
  };

  const calendarDays = useMemo(() => {
    const year = calendarView.getFullYear();
    const month = calendarView.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    const days = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let i = 1; i <= daysInMonth; i++) days.push(new Date(year, month, i));
    return days;
  }, [calendarView]);

  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const arr = [];
    for (let i = currentYear; i <= currentYear + 10; i++) arr.push(i);
    return arr;
  }, []);

  const handleDateSelect = (date: Date) => {
    const dateStr = date.toISOString().split('T')[0];
    setMissionEndDate(dateStr);
    setShowCalendar(false);
    setToast({ message: 'Target deadline updated!', type: 'success' });
  };

  return (
    <>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      {/* Custom Premium Calendar Modal */}
      {createPortal(
        <AnimatePresence>
          {showCalendar && (
          <div className="fixed inset-0 z-[300] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowCalendar(false)}
              className="fixed inset-0 bg-black/20 dark:bg-black/75 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ scale: 0.9, rotateX: 15, opacity: 0 }}
              animate={{ scale: 1, rotateX: 0, opacity: 1 }}
              exit={{ scale: 0.9, rotateX: -15, opacity: 0 }}
              className="relative w-full max-w-md glass p-8 rounded-[3rem] shadow-[0_50px_100px_rgba(0,0,0,0.5)] overflow-hidden"
              style={{ background: 'var(--bg-glass)', border: '1px solid var(--border-subtle)' }}
            >
              <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full blur-[80px] animate-pulse pointer-events-none" style={{ background: 'rgba(0,229,255,0.2)' }} />
              
              <div className="relative z-10 space-y-8">
                <div className="flex justify-between items-center">
                  <div onClick={() => setViewMode(viewMode === 'days' ? 'years' : 'days')} className="cursor-pointer group">
                    <h3 className="text-2xl font-black uppercase tracking-tighter transition-colors" style={{ color: 'var(--text-primary)' }}>
                      {viewMode === 'days' ? 'Select ' : 'Target '}
                      <span style={{ color: 'var(--accent-cyan)' }}>{viewMode === 'days' ? 'Deadline' : 'Year'}</span>
                    </h3>
                    <p className="text-[10px] font-bold uppercase tracking-widest mt-1 flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                      {calendarView.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                      <ChevronDown className={`w-3 h-3 transition-transform ${viewMode === 'years' ? 'rotate-180' : ''}`} />
                    </p>
                  </div>
                  {viewMode === 'days' && (
                    <div className="flex gap-2">
                      <button onClick={() => setCalendarView(new Date(calendarView.setMonth(calendarView.getMonth() - 1)))} className="p-2 rounded-xl transition-all" style={{ background: 'var(--border-subtle)', color: 'var(--text-primary)' }}><ChevronRight className="w-4 h-4 rotate-180" /></button>
                      <button onClick={() => setCalendarView(new Date(calendarView.setMonth(calendarView.getMonth() + 1)))} className="p-2 rounded-xl transition-all" style={{ background: 'var(--border-subtle)', color: 'var(--text-primary)' }}><ChevronRight className="w-4 h-4" /></button>
                    </div>
                  )}
                </div>

                <AnimatePresence mode="wait">
                  {viewMode === 'days' ? (
                    <motion.div 
                      key="days"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="grid grid-cols-7 gap-1"
                    >
                      {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
                        <div key={d} className="text-center text-[9px] font-black uppercase py-2" style={{ color: 'var(--text-muted)' }}>{d}</div>
                      ))}
                      {calendarDays.map((date, i) => {
                        if (!date) return <div key={`empty-${i}`} />;
                        const isSelected = missionEndDate === date.toISOString().split('T')[0];
                        const isToday = date.toDateString() === new Date().toDateString();
                        const isPast = date < new Date(new Date().setHours(0,0,0,0));

                        return (
                          <button
                            key={i}
                            disabled={isPast}
                            onClick={() => handleDateSelect(date)}
                            className={`aspect-square rounded-2xl flex items-center justify-center text-xs font-bold transition-all relative group ${
                              isSelected 
                                ? 'scale-110 z-10 text-white' 
                                : isPast 
                                  ? 'opacity-20 cursor-not-allowed' 
                                  : 'hover:bg-white/10'
                            }`}
                            style={{ 
                              background: isSelected ? 'var(--accent-cyan)' : 'transparent',
                              color: isSelected ? '#fff' : (isPast ? 'var(--text-muted)' : 'var(--text-secondary)'),
                              boxShadow: isSelected ? '0 8px 16px rgba(0,229,255,0.3)' : 'none'
                            }}
                          >
                            {date.getDate()}
                            {isToday && !isSelected && <div className="absolute bottom-1.5 w-1 h-1 rounded-full" style={{ background: 'var(--accent-cyan)' }} />}
                          </button>
                        );
                      })}
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="years"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="grid grid-cols-3 gap-3"
                    >
                      {years.map(year => (
                        <button
                          key={year}
                          onClick={() => {
                            setCalendarView(new Date(year, calendarView.getMonth(), 1));
                            setViewMode('days');
                          }}
                          className="py-4 rounded-2xl text-sm font-black transition-all text-white"
                          style={{
                            background: calendarView.getFullYear() === year ? 'var(--accent-cyan)' : 'var(--border-subtle)',
                            color: calendarView.getFullYear() === year ? '#fff' : 'var(--text-primary)'
                          }}
                        >
                          {year}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>

                <button 
                  onClick={() => setShowCalendar(false)}
                  className="w-full py-4 rounded-2xl font-black uppercase tracking-widest text-[9px] transition-all"
                  style={{ background: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                >
                  Close Navigator
                </button>
              </div>
            </motion.div>
          </div>
        )}
        </AnimatePresence>,
        document.body
      )}

      <div className="animate-slide-in-up max-w-6xl mx-auto space-y-12 pb-32">
        {/* Mission Setup Header */}
        <div className="glass p-10 rounded-[3rem] shadow-2xl relative overflow-visible border-none">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="space-y-2">
            <h2 className="text-4xl font-black uppercase tracking-tighter italic" style={{ color: 'var(--text-primary)' }}>
              The Mission <span style={{ color: 'var(--accent-cyan)' }}>Timeline</span>
            </h2>
            <p className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: 'var(--text-muted)' }}>
              Set your destination, and we'll map the path.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="glass p-4 rounded-3xl flex items-center gap-4 group transition-all" style={{ borderColor: 'var(--border-subtle)' }}>
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform"
                style={{ background: '#F59E0B' }}>
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-[10px] font-black uppercase" style={{ color: 'var(--text-muted)' }}>Session Timer</p>
                <div className="flex items-center gap-3">
                  <p onClick={handleEditTimer} className="text-xl font-black font-mono cursor-pointer transition-colors" title="Click to edit" style={{ color: 'var(--text-primary)' }}>
                    {formatSeconds(sessionTimer.remainingSeconds)}
                  </p>
                  <div className="flex gap-1">
                    <button onClick={toggleSessionTimer} className="p-2 text-white rounded-xl hover:scale-105 active:scale-95 transition-all" style={{ background: 'var(--accent-cyan)' }}>
                      {sessionTimer.isRunning ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                    </button>
                    <button onClick={resetSessionTimer} className="p-2 rounded-xl transition-all" style={{ background: 'var(--border-subtle)', color: 'var(--text-muted)' }}>
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div 
              onClick={() => setShowCalendar(true)}
              className="glass p-6 rounded-[2.5rem] flex items-center gap-6 group transition-all relative overflow-hidden cursor-pointer"
              style={{ borderColor: 'var(--border-subtle)' }}
            >
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 blur-2xl transition-colors pointer-events-none" style={{ background: 'rgba(0,229,255,0.05)' }} />
              
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform relative z-10"
                style={{ background: 'var(--accent-cyan)' }}>
                <CalendarIcon className="w-7 h-7 text-white" />
              </div>

              <div className="flex-1 relative z-10">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 transition-colors" style={{ color: 'var(--text-muted)' }}>Target End Date</p>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-black leading-none" style={{ color: 'var(--text-primary)' }}>
                      {missionEndDate ? new Date(missionEndDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric' }) : 'Set Deadline'}
                    </h4>
                    <p className="text-[10px] font-bold uppercase mt-1" style={{ color: 'var(--text-secondary)' }}>
                      {missionEndDate ? new Date(missionEndDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric' }) : 'Phase 5 completion'}
                    </p>
                  </div>
                  <div className="ml-4 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all"
                    style={{ background: 'rgba(0,229,255,0.1)', color: 'var(--accent-cyan)' }}>
                    Open Calendar
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-0 right-0 w-96 h-96 rounded-full -mr-48 -mt-48 blur-3xl pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%)' }} />
      </div>

      {createPortal(
        <AnimatePresence>
          {isEditingTimer && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsEditingTimer(false)}
              className="fixed inset-0 bg-black/20 dark:bg-black/75 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative w-full max-w-lg glass p-10 rounded-[3rem] shadow-2xl overflow-hidden border-none"
            >
              <div className="text-center space-y-8 relative z-10">
                <div className="space-y-2">
                  <h3 className="text-2xl font-black uppercase tracking-tighter" style={{ color: 'var(--text-primary)' }}>Configure <span style={{ color: 'var(--accent-cyan)' }}>Session</span></h3>
                  <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Adjust your focus duration</p>
                </div>

                <div className="grid grid-cols-2 gap-8">
                  {[
                    { label: 'Hours', key: 'h', max: 24 },
                    { label: 'Minutes', key: 'm', max: 59 }
                  ].map(({ label, key, max }) => (
                    <div key={key} className="space-y-4">
                      <div className="flex justify-between items-end px-1">
                        <p className="text-[9px] font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{label}</p>
                        <p className="text-3xl font-black font-mono" style={{ color: 'var(--accent-cyan)' }}>
                          {(timerInputs as any)[key]}<span className="text-[10px] ml-1 opacity-50">{key.toUpperCase()}</span>
                        </p>
                      </div>
                      
                      <div className="relative h-1.5">
                        <div className="absolute inset-0 rounded-full overflow-hidden" style={{ background: 'var(--border-subtle)' }}>
                          <motion.div 
                            className="h-full"
                            style={{ background: 'var(--accent-cyan)' }}
                            animate={{ width: `${((timerInputs as any)[key] / max) * 100}%` }}
                          />
                        </div>
                        <input 
                          type="range" 
                          min="0" 
                          max={max} 
                          value={(timerInputs as any)[key]} 
                          onChange={e => setTimerInputs({ ...timerInputs, [key]: parseInt(e.target.value) || 0 })}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4 pt-6">
                  <button 
                    onClick={() => setIsEditingTimer(false)}
                    className="flex-1 py-4 rounded-2xl font-black uppercase tracking-widest text-[9px] transition-all"
                    style={{ background: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={saveTimer}
                    className="flex-[2] py-4 rounded-2xl text-white font-black uppercase tracking-widest text-[9px] shadow-xl hover:scale-105 active:scale-95 transition-all"
                    style={{ background: 'var(--accent-cyan)' }}
                  >
                    Save Configuration
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
        </AnimatePresence>,
        document.body
      )}

      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-4">
          <h3 className="text-xl font-black uppercase tracking-tighter" style={{ color: 'var(--text-primary)' }}>Daily Execution</h3>
          <button 
            onClick={() => handleOpenSelector(true)}
            className="flex items-center gap-2 px-6 py-3 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
            style={{ background: 'linear-gradient(135deg, var(--accent-violet) 0%, var(--accent-cyan) 100%)' }}
          >
            <Sparkles className="w-4 h-4" /> Generate Suggested Plan
          </button>
        </div>

        <div className="relative group/timeline py-4">
          <div className="flex gap-4 overflow-x-auto py-8 px-4 no-scrollbar scroll-smooth snap-x snap-mandatory">
            {dates.map((date) => {
              const d = new Date(date);
              const isToday = date === new Date().toISOString().split('T')[0];
              const isActive = selectedDate === date;
              const hasPlan = dailyPlans[date]?.items.length > 0;
              const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });
              const dayNum = d.getDate();
              const monthName = d.toLocaleDateString('en-US', { month: 'short' });

              return (
                <button
                  key={date}
                  onClick={() => setSelectedDate(date)}
                  className={`flex-shrink-0 w-24 h-32 rounded-3xl flex flex-col items-center justify-center transition-all duration-500 snap-center relative group/date ${
                    isActive ? 'scale-105 z-10' : ''
                  }`}
                  style={{
                    background: isActive ? 'var(--accent-cyan)' : 'var(--bg-glass)',
                    border: `1px solid ${isActive ? 'var(--accent-cyan)' : 'var(--border-subtle)'}`,
                    color: isActive ? '#fff' : 'var(--text-secondary)',
                    boxShadow: isActive ? '0 8px 24px rgba(0,229,255,0.3)' : 'none'
                  }}
                >
                  {isToday && (
                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-[7px] font-black px-2 py-0.5 rounded-full uppercase tracking-widest shadow-sm"
                      style={{ background: isActive ? '#fff' : 'var(--accent-cyan)', color: isActive ? 'var(--accent-cyan)' : '#fff' }}>
                      Today
                    </div>
                  )}
                  {hasPlan && !isActive && (
                    <div className="absolute top-3 right-3 w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent-cyan)' }} />
                  )}
                  <p className="text-[9px] font-black uppercase tracking-widest mb-1" style={{ color: isActive ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)' }}>{monthName}</p>
                  <p className="text-2xl font-black" style={{ color: isActive ? '#fff' : 'var(--text-primary)' }}>{dayNum}</p>
                  <p className="text-[9px] font-bold uppercase tracking-wider" style={{ color: isActive ? 'rgba(255,255,255,0.8)' : 'var(--text-muted)' }}>{dayName}</p>
                  
                  {isActive && (
                    <motion.div 
                      layoutId="active-pill"
                      className="absolute -bottom-1 w-8 h-1 bg-white rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="glass p-10 rounded-[3rem] shadow-2xl min-h-[400px] relative overflow-hidden border-none">
          <div className="flex justify-between items-start mb-10 relative z-10">
            <div>
              <p className="text-[10px] font-black uppercase mb-1" style={{ color: 'var(--accent-cyan)' }}>Focus for</p>
              <h4 className="text-3xl font-black uppercase tracking-tighter" style={{ color: 'var(--text-primary)' }}>
                {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
              </h4>
            </div>
            <button 
              onClick={() => handleOpenSelector(false)}
              className="w-14 h-14 rounded-2xl text-white flex items-center justify-center transition-all shadow-xl active:scale-95"
              style={{ background: 'var(--accent-cyan)' }}
            >
              <Plus className="w-6 h-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
            {dailyPlans[selectedDate]?.items
              .filter((item: any) => {
                if (item.type === 'subtopic') {
                  const [sid, tname] = item.id.split('::');
                  const topicId = `${sid}::${tname}`;
                  return !dailyPlans[selectedDate].items.some((i: any) => i.id === topicId);
                }
                if (item.type === 'topic') {
                  const subjectId = item.id.split('::')[0];
                  return !dailyPlans[selectedDate].items.some((i: any) => i.id === subjectId);
                }
                return true;
              })
              .map((item: any) => renderHierarchicalItem(item))}

            {suggestedPlans[selectedDate]?.items
              .filter((sugg: any) => !dailyPlans[selectedDate]?.items.some((real: any) => real.id === sugg.id))
              .map((item: any) => (
              <div 
                key={`sugg-${item.id}`} 
                className="p-6 rounded-3xl border-2 border-dashed flex items-center justify-between group"
                style={{ borderColor: 'rgba(0,229,255,0.3)', background: 'rgba(0,229,255,0.05)' }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-lg border-2 flex items-center justify-center" style={{ borderColor: 'rgba(0,229,255,0.3)', color: 'var(--accent-cyan)' }}>
                    <Sparkles className="w-3 h-3" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-[8px] font-black uppercase" style={{ color: 'var(--accent-cyan)' }}>Suggested {item.type}</p>
                      <span className="text-[7px] text-white px-1.5 py-0.5 rounded-full font-black uppercase tracking-tighter" style={{ background: 'var(--accent-cyan)' }}>AI</span>
                    </div>
                    <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{item.name}</p>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    const currentItems = dailyPlans[selectedDate]?.items || [];
                    updateDailyPlan(selectedDate, [...currentItems, { ...item, isSuggested: false }]);
                  }}
                  className="p-2 text-white rounded-xl text-[8px] font-black uppercase tracking-widest hover:scale-105 active:scale-95 transition-all"
                  style={{ background: 'var(--accent-cyan)' }}
                >
                  Accept
                </button>
              </div>
            ))}

            {(!dailyPlans[selectedDate] || (dailyPlans[selectedDate].items.length === 0 && (!suggestedPlans[selectedDate] || suggestedPlans[selectedDate].items.length === 0))) && (
              <div className="col-span-full py-16 flex flex-col items-center justify-center text-center space-y-6">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mb-2" style={{ background: 'rgba(0,229,255,0.05)', color: 'var(--accent-cyan)' }}>
                  <CalendarIcon className="w-10 h-10 opacity-50" />
                </div>
                <p className="text-sm font-black uppercase tracking-tight opacity-50" style={{ color: 'var(--text-primary)' }}>Nothing scheduled for this day</p>
                <button 
                  onClick={() => handleOpenSelector(true)}
                  className="flex items-center gap-2 px-6 py-3 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all"
                  style={{ background: 'linear-gradient(135deg, var(--accent-violet) 0%, var(--accent-cyan) 100%)' }}
                >
                  <Sparkles className="w-4 h-4" /> Generate Plan with AI
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {createPortal(
        <AnimatePresence>
          {showSelector && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSelector(false)}
              className="fixed inset-0 bg-black/20 dark:bg-black/75 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative w-full max-w-4xl max-h-[75vh] glass rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border-none"
            >
              <div className="p-6 sm:p-8 border-b flex justify-between items-center relative z-10" style={{ borderColor: 'var(--border-subtle)', background: 'rgba(0,0,0,0.02)' }}>
                <div>
                  <h4 className="text-xl sm:text-2xl font-black uppercase tracking-tighter flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
                    <BookOpen className="w-6 h-6" style={{ color: 'var(--accent-cyan)' }} /> Curriculum Selection
                  </h4>
                  <p className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{ color: 'var(--text-muted)' }}>Current selection: {tempSelection.length} items</p>
                </div>
                <button onClick={() => setShowSelector(false)} className="p-3 rounded-2xl transition-all" style={{ background: 'var(--border-subtle)', color: 'var(--text-primary)' }}>
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-4 custom-scrollbar relative z-10">
                {curriculum.map((phase) => (
                  <div key={phase.id} className="border-b pb-6 last:border-0" style={{ borderColor: 'var(--border-subtle)' }}>
                    <div 
                      className="flex items-center gap-4 py-4 cursor-pointer group"
                      onClick={() => togglePhase(phase.id)}
                    >
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center transition-all"
                        style={{ background: 'rgba(0,229,255,0.1)', color: 'var(--accent-cyan)' }}>
                        {expandedPhases.includes(phase.id) ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                      </div>
                      <h5 className="flex-1 text-lg font-black uppercase tracking-tight" style={{ color: 'var(--text-primary)' }}>Phase {phase.id}: {phase.name}</h5>
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
                              <div key={subject.id} className="rounded-2xl overflow-hidden border" style={{ borderColor: 'var(--border-subtle)' }}>
                                <div 
                                  className="flex items-center gap-4 p-4 cursor-pointer transition-all"
                                  style={{ background: subjectCompleted ? 'rgba(0,0,0,0.02)' : 'var(--bg-glass)', opacity: subjectCompleted ? 0.5 : 1 }}
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
                                    className={`w-5 h-5 rounded-lg ${subjectCompleted ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                                  />
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <p className="text-[10px] font-black uppercase mb-0.5" style={{ color: 'var(--accent-cyan)' }}>{subject.id}</p>
                                      {subjectCompleted && <span className="text-[8px] text-white px-1.5 py-0.5 rounded-full font-black uppercase" style={{ background: 'var(--accent-teal)' }}>Completed</span>}
                                    </div>
                                    <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{subject.name}</p>
                                  </div>
                                  {!subjectCompleted && <ChevronDown className={`w-4 h-4 transition-transform ${expandedSubjects.includes(subject.id) ? '' : '-rotate-90'}`} style={{ color: 'var(--text-muted)' }} />}
                                </div>

                                <AnimatePresence>
                                  {!subjectCompleted && expandedSubjects.includes(subject.id) && (
                                    <motion.div 
                                      initial={{ height: 0 }}
                                      animate={{ height: 'auto' }}
                                      className="overflow-hidden p-4 space-y-4"
                                      style={{ background: 'rgba(0,0,0,0.02)' }}
                                    >
                                      {subject.topics.map(topic => {
                                        const topicInTemp = subjectInTemp || tempSelection.some(i => i.id === `${subject.id}::${topic}`);
                                        const topicCompleted = subjectCompleted || progress[subject.id]?.topicsCompleted.includes(topic);
                                        return (
                                          <div key={topic} className="ml-4 pl-4 border-l-2" style={{ borderColor: 'rgba(0,229,255,0.2)' }}>
                                            <div className="flex items-center gap-3 py-1 group/topic">
                                              <input 
                                                type="checkbox"
                                                checked={topicInTemp || topicCompleted}
                                                disabled={subjectInTemp || topicCompleted}
                                                onChange={() => toggleTempItem({ id: `${subject.id}::${topic}`, type: 'topic', name: topic, completed: false })}
                                                className={`w-4 h-4 rounded-md ${ (subjectInTemp || topicCompleted) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                              />
                                              <p className="text-xs font-black uppercase tracking-tight transition-colors" style={{ color: topicCompleted ? 'var(--accent-teal)' : 'var(--text-secondary)' }}>{topic}</p>
                                            </div>
                                            {subject.subtopics[topic] && (
                                              <div className="space-y-2 mt-2 ml-7">
                                                {subject.subtopics[topic].map(sub => {
                                                  const subInTemp = topicInTemp || tempSelection.some(i => i.id === `${subject.id}::${topic}::${sub}`);
                                                  const subCompleted = topicCompleted || progress[subject.id]?.subtopicsCompleted.includes(sub);
                                                  return (
                                                    <div key={sub} className="flex items-center gap-3 group/sub">
                                                      <input 
                                                        type="checkbox"
                                                        checked={subInTemp || subCompleted}
                                                        disabled={topicInTemp || subCompleted}
                                                        onChange={() => toggleTempItem({ id: `${subject.id}::${topic}::${sub}`, type: 'subtopic', name: sub, completed: false })}
                                                        className={`w-3.5 h-3.5 rounded ${ (topicInTemp || subCompleted) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                                                      />
                                                      <p className="text-[10px] font-bold transition-colors" style={{ color: subCompleted ? 'var(--accent-teal)' : 'var(--text-muted)' }}>{sub}</p>
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

              <div className="p-6 sm:p-8 border-t flex flex-col sm:flex-row justify-between items-center gap-4 relative z-10" style={{ borderColor: 'var(--border-subtle)', background: 'rgba(0,0,0,0.02)' }}>
                <p className="text-[10px] font-bold italic uppercase" style={{ color: 'var(--text-muted)' }}>Changes are temporary until confirmed.</p>
                <div className="flex gap-3 w-full sm:w-auto">
                  <button 
                    onClick={() => setShowSelector(false)}
                    className="flex-1 sm:flex-none px-6 py-3 rounded-2xl text-[9px] font-black uppercase tracking-widest transition-all"
                    style={{ background: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmSelection}
                    className="flex-1 sm:flex-none px-8 py-3 text-white rounded-2xl text-[9px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all"
                    style={{ background: 'var(--accent-cyan)' }}
                  >
                    Confirm Selection
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
        </AnimatePresence>,
        document.body
      )}

      {createPortal(
        <AnimatePresence>
          {showGenerator && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowGenerator(false)}
              className="fixed inset-0 bg-black/20 dark:bg-black/75 backdrop-blur-xl"
            />
            <motion.div 
              initial={{ scale: 0.9, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 20, opacity: 0 }}
              className="relative w-full max-w-4xl max-h-[75vh] glass rounded-[3rem] shadow-2xl overflow-hidden flex flex-col border-none"
            >
              <div className="p-8 border-b text-white" style={{ borderColor: 'var(--border-subtle)', background: 'linear-gradient(135deg, var(--accent-violet), var(--accent-cyan))' }}>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-2xl font-black uppercase tracking-tighter flex items-center gap-3">
                      <Sparkles className="w-8 h-8" /> Strategy Generator
                    </h4>
                    <p className="text-[10px] font-bold opacity-80 uppercase tracking-widest mt-1">AI-Powered Roadmap Optimization</p>
                  </div>
                  <button onClick={() => setShowGenerator(false)} className="p-3 rounded-2xl transition-all" style={{ background: 'rgba(255,255,255,0.1)' }}>
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Daily Study Time</p>
                    <div className="flex items-center gap-6 p-6 rounded-[2rem] border" style={{ background: 'var(--bg-glass)', borderColor: 'var(--border-subtle)' }}>
                      <div className="flex-1 space-y-6">
                        {/* Hours Slider */}
                        <div className="space-y-3">
                          <div className="flex justify-between px-0.5">
                            <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: 'var(--text-primary)' }}>Hours</span>
                            <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: 'var(--accent-cyan)' }}>{Math.floor(dailyStudyHours)} hr</span>
                          </div>
                          <input 
                            type="range" 
                            min="0" 
                            max="16" 
                            value={Math.floor(dailyStudyHours)}
                            onChange={(e) => {
                               const h = parseInt(e.target.value);
                               const m = Math.round((dailyStudyHours % 1) * 60);
                               if (h === 0 && m === 0) setDailyStudyHours(15 / 60); // 15 mins min
                               else setDailyStudyHours(h + (m / 60));
                            }}
                            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                            style={{ background: 'var(--border-subtle)' }}
                          />
                        </div>
                        
                        {/* Minutes Slider */}
                        <div className="space-y-3">
                          <div className="flex justify-between px-0.5">
                            <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: 'var(--text-primary)' }}>Minutes</span>
                            <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: 'var(--accent-cyan)' }}>{Math.round((dailyStudyHours % 1) * 60)} min</span>
                          </div>
                          <input 
                            type="range" 
                            min="0" 
                            max="59" 
                            step="5"
                            value={Math.round((dailyStudyHours % 1) * 60)}
                            onChange={(e) => {
                               const h = Math.floor(dailyStudyHours);
                               const m = parseInt(e.target.value);
                               if (h === 0 && m === 0) setDailyStudyHours(15 / 60);
                               else setDailyStudyHours(h + (m / 60));
                            }}
                            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
                            style={{ background: 'var(--border-subtle)' }}
                          />
                        </div>
                      </div>
                      <div className="w-24 h-20 rounded-2xl flex flex-col items-center justify-center text-white shadow-xl shrink-0 space-y-1.5" style={{ background: 'var(--accent-cyan)' }}>
                        <p className="text-[14px] font-black leading-none text-center px-2">
                          {Math.floor(dailyStudyHours)}h {Math.round((dailyStudyHours % 1) * 60)}m
                        </p>
                        <div className="w-12 h-[1px] bg-white/30" />
                        <p className="text-[8px] font-black uppercase opacity-90">{Math.round(dailyStudyHours * 60)} min</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Target End Date</p>
                    <div 
                      onClick={() => { setViewMode('days'); setShowCalendar(true); }}
                      className="flex items-center gap-4 p-6 rounded-[2rem] border h-[88px] cursor-pointer transition-all group/gen-date"
                      style={{ background: 'var(--bg-glass)', borderColor: 'var(--border-subtle)' }}
                    >
                      <CalendarIcon className="w-6 h-6 group-hover/gen-date:scale-110 transition-transform" style={{ color: 'var(--accent-cyan)' }} />
                      <div>
                        <p className="text-sm font-bold" style={{ color: 'var(--text-primary)' }}>
                          {missionEndDate ? new Date(missionEndDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Set Deadline'}
                        </p>
                        <p className="text-[9px] font-black uppercase tracking-widest mt-0.5" style={{ color: 'var(--accent-cyan)' }}>Click to Change</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-black uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Select your Goal Topics</p>
                    <button 
                      onClick={() => setGoalTopics([])}
                      className="text-[10px] font-black uppercase hover:underline"
                      style={{ color: '#EF4444' }}
                    >
                      Clear Selection
                    </button>
                  </div>

                  <div className="space-y-4 p-6 rounded-[2.5rem] border" style={{ background: 'var(--bg-glass)', borderColor: 'var(--border-subtle)' }}>
                    {curriculum.map((phase) => (
                      <div key={phase.id} className="rounded-3xl border overflow-hidden" style={{ borderColor: 'var(--border-subtle)', background: 'rgba(0,0,0,0.02)' }}>
                        <div 
                          className="p-4 flex items-center justify-between cursor-pointer"
                          onClick={() => togglePhase(phase.id)}
                        >
                          <div className="flex items-center gap-4">
                            <input 
                              type="checkbox"
                              checked={goalTopics.some(i => i.id === `phase::${phase.id}`)}
                              onChange={(e) => {
                                e.stopPropagation();
                                toggleGoalItem({ id: `phase::${phase.id}`, type: 'phase', name: phase.name, completed: false });
                              }}
                              className="w-5 h-5 rounded-lg cursor-pointer"
                            />
                            <p className="text-sm font-black uppercase tracking-tight" style={{ color: 'var(--text-primary)' }}>Phase {phase.id}: {phase.name}</p>
                          </div>
                          <ChevronDown className={`w-4 h-4 transition-transform ${expandedPhases.includes(phase.id) ? '' : '-rotate-90'}`} style={{ color: 'var(--text-muted)' }} />
                        </div>

                        <AnimatePresence>
                          {expandedPhases.includes(phase.id) && (
                            <motion.div 
                              initial={{ height: 0 }}
                              animate={{ height: 'auto' }}
                              className="px-4 pb-4 space-y-3"
                            >
                              {phase.subjects.map(subject => {
                                const subjectInGoal = goalTopics.some(i => i.id === subject.id);
                                const isCompleted = progress[subject.id]?.completed;
                                return (
                                  <div key={subject.id} className={`ml-4 space-y-2 border-l-2 pl-4 ${isCompleted ? 'opacity-40 grayscale pointer-events-none' : ''}`} style={{ borderColor: 'rgba(0,229,255,0.1)' }}>
                                    <div className="flex items-center justify-between group/goal">
                                      <div className="flex items-center gap-3">
                                        <input 
                                          type="checkbox"
                                          checked={subjectInGoal || isCompleted}
                                          disabled={isCompleted}
                                          onChange={() => toggleGoalItem({ id: subject.id, type: 'subject', name: subject.name, completed: false })}
                                          className="w-4 h-4 rounded cursor-pointer"
                                        />
                                        <p className="text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{subject.name} {isCompleted && '✓'}</p>
                                      </div>
                                      <button onClick={() => toggleSubject(subject.id)} className="p-1 rounded-md transition-all" style={{ color: 'var(--text-muted)' }}>
                                        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedSubjects.includes(subject.id) ? '' : '-rotate-90'}`} />
                                      </button>
                                    </div>

                                    <AnimatePresence>
                                      {expandedSubjects.includes(subject.id) && (
                                        <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} className="ml-6 space-y-3 pt-2">
                                          {subject.topics.map(topic => {
                                            const topicId = `${subject.id}::${topic}`;
                                            const topicInGoal = subjectInGoal || goalTopics.some(i => i.id === topicId);
                                            const topicCompleted = isCompleted || progress[subject.id]?.topicsCompleted.includes(topic);
                                            return (
                                              <div key={topic} className={`space-y-2 ${topicCompleted ? 'opacity-60' : ''}`}>
                                                <div className="flex items-center gap-3">
                                                  <input 
                                                    type="checkbox"
                                                    checked={topicInGoal || topicCompleted}
                                                    disabled={subjectInGoal || topicCompleted}
                                                    onChange={() => toggleGoalItem({ id: topicId, type: 'topic', name: topic, completed: false })}
                                                    className="w-3.5 h-3.5 rounded cursor-pointer"
                                                  />
                                                  <p className="text-[11px] font-black uppercase" style={{ color: 'var(--text-secondary)' }}>{topic} {topicCompleted && '✓'}</p>
                                                </div>
                                                {subject.subtopics[topic] && (
                                                  <div className="ml-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                    {subject.subtopics[topic].map(sub => {
                                                      const subId = `${topicId}::${sub}`;
                                                      const subInGoal = topicInGoal || goalTopics.some(i => i.id === subId);
                                                      const subCompleted = topicCompleted || progress[subject.id]?.subtopicsCompleted.includes(sub);
                                                      return (
                                                        <div key={sub} className={`flex items-center gap-2 ${subCompleted ? 'opacity-60' : ''}`}>
                                                          <input 
                                                            type="checkbox"
                                                            checked={subInGoal || subCompleted}
                                                            disabled={topicInGoal || subCompleted}
                                                            onChange={() => toggleGoalItem({ id: subId, type: 'subtopic', name: sub, completed: false })}
                                                            className="w-3 h-3 rounded cursor-pointer"
                                                          />
                                                          <p className="text-[10px] font-medium" style={{ color: 'var(--text-muted)' }}>{sub} {subCompleted && '✓'}</p>
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
                </div>

              </div>

              <div className="p-8 border-t flex gap-4 relative z-10" style={{ borderColor: 'var(--border-subtle)', background: 'rgba(0,0,0,0.02)' }}>
                <button 
                  onClick={() => setShowGenerator(false)}
                  className="flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"
                  style={{ background: 'var(--border-subtle)', color: 'var(--text-primary)' }}
                >
                  Cancel
                </button>
                <button 
                  onClick={generateIntelligentPlan}
                  className="flex-[2] py-4 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl active:scale-95 transition-all"
                  style={{ background: 'var(--accent-cyan)' }}
                >
                  Deploy Strategic Roadmap
                </button>
              </div>
            </motion.div>
          </div>
        )}
        </AnimatePresence>,
        document.body
      )}
      </div>
    </>
  );
}
