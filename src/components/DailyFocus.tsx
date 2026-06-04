import { useEffect } from 'react';
import { useTrackerStore } from '../store/useTrackerStore';
import { CheckCircle2, Clock, Zap, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DailyFocus() {
  const { dailyPlans, toggleDailyItem, sessionTimer, toggleSessionTimer, tickSessionTimer } = useTrackerStore();
  const today = new Date().toISOString().split('T')[0];
  const plan = dailyPlans[today];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (sessionTimer.isRunning) {
      interval = setInterval(() => {
        tickSessionTimer();
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [sessionTimer.isRunning]);

  const formatSeconds = (sec: number) => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (!plan || plan.items.length === 0) return null;

  // Granular Progress Calculation: Focus on subtopics, then topics, then subjects
  const subtopics = plan.items.filter((i: any) => i.type === 'subtopic');
  const topics = plan.items.filter((i: any) => i.type === 'topic');
  const subjects = plan.items.filter((i: any) => i.type === 'subject');

  let completedCount = 0;
  let totalCount = 0;

  if (subtopics.length > 0) {
    totalCount = subtopics.length;
    completedCount = subtopics.filter((i: any) => i.completed).length;
  } else if (topics.length > 0) {
    totalCount = topics.length;
    completedCount = topics.filter((i: any) => i.completed).length;
  } else {
    totalCount = subjects.length;
    completedCount = subjects.filter((i: any) => i.completed).length;
  }

  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  
  // Group only items that are actually in the plan, following hierarchy
  const topLevelItems = plan.items.filter((item: any) => {
    if (item.type === 'subtopic') {
      const topicId = item.id.split('::').slice(0, 2).join('::');
      return !plan.items.some((i: any) => i.id === topicId);
    }
    if (item.type === 'topic') {
      const subjectId = item.id.split('::')[0];
      return !plan.items.some((i: any) => i.id === subjectId);
    }
    return true;
  });

  const getChildren = (parentId: string) => {
    return plan.items.filter((i: any) => i.id.startsWith(parentId + '::') && i.id.split('::').length === parentId.split('::').length + 1);
  };

  const renderTask = (item: any, depth = 0) => {
    const children = getChildren(item.id);
    return (
      <div key={item.id} className={`${depth > 0 ? 'ml-6 border-l-2 border-indigo-500/10 pl-6 mt-3' : 'glass bg-white/40 dark:bg-white/5 p-6 rounded-[2.5rem] border border-black/5 dark:border-white/5 space-y-4 mb-4'}`}>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => toggleDailyItem(today, item.id)}
            className={`${item.type === 'subject' ? 'w-7 h-7 rounded-xl' : item.type === 'topic' ? 'w-5 h-5 rounded-lg' : 'w-4 h-4 rounded'} border-2 flex items-center justify-center transition-all ${
              item.completed ? 'bg-green-500 border-green-500 text-white' : 'border-indigo-200 dark:border-white/10'
            }`}
          >
            {item.completed && <CheckCircle2 className={`${item.type === 'subject' ? 'w-4 h-4' : item.type === 'topic' ? 'w-3 h-3' : 'w-2.5 h-2.5'}`} />}
          </button>
          <div>
            <p className={`text-[8px] font-black uppercase mb-0.5 ${item.completed ? 'text-green-600' : 'text-indigo-600'}`}>{item.type}</p>
            <p className={`${item.type === 'subject' ? 'text-sm' : 'text-[11px]'} font-black leading-tight ${item.completed ? 'line-through text-gray-400' : 'text-gray-700 dark:text-gray-200'}`}>
              {item.name}
            </p>
          </div>
        </div>
        {children.length > 0 && children.map(child => renderTask(child, depth + 1))}
      </div>
    );
  };

  // Calculate percentage of timer passed
  const timerProgress = sessionTimer.totalSeconds > 0 
    ? ((sessionTimer.totalSeconds - sessionTimer.remainingSeconds) / sessionTimer.totalSeconds) * 100 
    : 0;

  return (
    <div className="glass p-10 rounded-[3.5rem] shadow-2xl mb-12 border-none relative overflow-hidden bg-gradient-to-br from-indigo-600/5 to-purple-600/5">
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Today's Goals */}
        <div className="lg:col-span-4 space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-indigo-600 flex items-center justify-center text-white shadow-xl">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter italic">Today's Mission</h3>
                <p className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">{completedCount}/{plan.items.length} Tasks Locked In</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-6 max-h-[500px] overflow-y-auto pr-4 custom-scrollbar">
            {topLevelItems.map(item => renderTask(item))}
          </div>
        </div>

        {/* Mission Timer */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center text-center space-y-8 border-x border-black/5 dark:border-white/5 px-12">
          <div className="space-y-4 w-full">
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em] flex items-center justify-center gap-2">
              <Clock className="w-3 h-3" /> Mission Timer
            </p>
            <div className="relative inline-block group cursor-pointer" onClick={toggleSessionTimer}>
              <h2 className={`text-7xl font-black font-mono tracking-tighter transition-colors ${sessionTimer.isRunning ? 'text-blue-600' : 'text-gray-900 dark:text-white opacity-40'}`}>
                {formatSeconds(sessionTimer.remainingSeconds)}
              </h2>
              {/* Visual Timer Progress Bar */}
              <div className="absolute -bottom-4 left-0 w-full h-1.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${timerProgress}%` }}
                  className="h-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                />
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="bg-white/90 dark:bg-black/90 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl">
                  {sessionTimer.isRunning ? 'Pause Mission' : 'Resume Mission'}
                </div>
              </div>
            </div>
            <div className="pt-12">
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-500/10 inline-block px-4 py-1.5 rounded-full">
                Goal: {Math.floor(sessionTimer.totalSeconds / 3600)} Hours Study Session
              </p>
            </div>
          </div>
        </div>

        {/* Global Progress */}
        <div className="lg:col-span-4 flex flex-col justify-center space-y-10">
          <div className="text-center lg:text-left">
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest mb-2">Daily Objectives Cleared</p>
            <div className="flex items-baseline gap-2 justify-center lg:justify-start">
              <span className="text-7xl font-black text-gray-900 dark:text-white">{progressPercent}%</span>
              <span className="text-xl font-bold text-green-600">Complete</span>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="h-6 w-full bg-gray-100 dark:bg-white/5 rounded-2xl overflow-hidden border-2 border-black/5 p-1">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                className="h-full bg-gradient-to-r from-indigo-600 via-purple-500 to-green-500 rounded-xl relative shadow-[0_0_15px_rgba(79,70,229,0.4)]"
              >
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px] animate-shimmer" />
              </motion.div>
            </div>
            <div className="flex justify-between items-center px-2">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-indigo-600" />
                <span className="text-[10px] font-black text-gray-500 uppercase tracking-tighter">Status: {progressPercent === 100 ? 'System Operational 🏆' : 'Active Deployment'}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-600/5 rounded-full -mr-32 -mb-32 blur-3xl" />
    </div>
  );
}
