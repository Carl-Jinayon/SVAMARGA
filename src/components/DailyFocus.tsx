import { useEffect, useState, useRef } from 'react';
import { useTrackerStore } from '../store/useTrackerStore';
import { curriculum } from '../data/curriculum';
import { CheckCircle2, Clock, Zap, Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DailyFocus() {
  const { dailyPlans, toggleDailyItem, sessionTimer, toggleSessionTimer, tickSessionTimer } = useTrackerStore();
  const [expandedTasks, setExpandedTasks] = useState<string[]>([]);
  const alarmRef = useRef<AudioContext | null>(null);
  const today = new Date().toISOString().split('T')[0];
  const plan = dailyPlans[today];

  const startAlarm = () => {
    if (alarmRef.current) return;
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    gain.gain.setValueAtTime(0.1, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 1);

    alarmRef.current = ctx;

    const interval = setInterval(() => {
      const newOsc = ctx.createOscillator();
      const newGain = ctx.createGain();
      newOsc.type = 'sine';
      newOsc.frequency.setValueAtTime(880, ctx.currentTime);
      newGain.gain.setValueAtTime(0.1, ctx.currentTime);
      newGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
      newOsc.connect(newGain);
      newGain.connect(ctx.destination);
      newOsc.start();
      newOsc.stop(ctx.currentTime + 0.5);
    }, 2000);

    (alarmRef.current as any)._interval = interval;
  };

  const stopAlarm = () => {
    if (alarmRef.current) {
      clearInterval((alarmRef.current as any)._interval);
      alarmRef.current.close();
      alarmRef.current = null;
    }
  };

  useEffect(() => {
    if (sessionTimer.remainingSeconds === 0 && sessionTimer.totalSeconds > 0 && !sessionTimer.isRunning) {
      startAlarm();
    } else {
      stopAlarm();
    }
    return () => stopAlarm();
  }, [sessionTimer.remainingSeconds, sessionTimer.isRunning]);

  const toggleTaskExpansion = (id: string) => {
    setExpandedTasks((prev: string[]) => prev.includes(id) ? prev.filter((i: string) => i !== id) : [...prev, id]);
  };

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
    const parts = parentId.split('::');
    let curriculumChildren: any[] = [];

    if (parts.length === 1) {
      const s = curriculum.flatMap((p: any) => p.subjects).find((s: any) => s.id === parts[0]);
      curriculumChildren = s?.topics.map((t: any) => ({ id: `${parts[0]}::${t}`, type: 'topic', name: t, completed: false })) || [];
    } else if (parts.length === 2) {
      const s = curriculum.flatMap((p: any) => p.subjects).find((s: any) => s.id === parts[0]);
      curriculumChildren = s?.subtopics[parts[1]]?.map((sub: any) => ({ id: `${parentId}::${sub}`, type: 'subtopic', name: sub, completed: false })) || [];
    }

    return curriculumChildren.map(cc => {
      const inPlan = plan.items.find((i: any) => i.id === cc.id);
      return inPlan || cc;
    });
  };

  let completedCount = 0;
  let totalCount = 0;

  const processItemForProgress = (item: any, isParentCompleted = false) => {
    const isCompleted = item.completed || isParentCompleted;
    const children = getChildren(item.id);
    if (children.length === 0) {
      totalCount++;
      if (isCompleted) completedCount++;
    } else {
      children.forEach(child => processItemForProgress(child, isCompleted));
    }
  };

  topLevelItems.forEach((item: any) => processItemForProgress(item));

  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const renderTask = (item: any, depth = 0, isParentCompleted = false) => {
    const children = getChildren(item.id);
    const isExpanded = expandedTasks.includes(item.id);
    const inPlan = plan.items.find((i: any) => i.id === item.id);
    const isCompleted = inPlan?.completed || isParentCompleted;

    const checkSize = item.type === 'subject' ? 'w-6 h-6 rounded-xl' : item.type === 'topic' ? 'w-5 h-5 rounded-lg' : 'w-4 h-4 rounded-md';
    const textSize = item.type === 'subject' ? 'text-sm font-bold' : item.type === 'topic' ? 'text-xs font-semibold' : 'text-xs font-medium';

    const typeColor = {
      subject: 'var(--accent-cyan)',
      topic: 'var(--accent-violet)',
      subtopic: 'var(--accent-teal)',
    }[item.type as 'subject' | 'topic' | 'subtopic'] || 'var(--text-muted)';

    return (
      <div
        key={item.id}
        className={depth > 0 ? 'ml-5 pl-4 mt-2.5' : 'rounded-xl p-4 mb-3'}
        style={depth > 0 ? {
          borderLeft: `1px solid ${typeColor}25`,
        } : {
          background: 'rgba(0,0,0,0.03)',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <button
              disabled={isParentCompleted}
              onClick={() => toggleDailyItem(today, item.id)}
              className={`${checkSize} border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                isCompleted
                  ? 'border-transparent'
                  : 'border-current'
              } ${isParentCompleted ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer hover:scale-110'}`}
              style={{
                background: isCompleted ? 'var(--accent-teal)' : 'transparent',
                borderColor: isCompleted ? 'var(--accent-teal)' : `${typeColor}50`,
                color: isCompleted ? '#fff' : typeColor,
              }}
              aria-label={isCompleted ? 'Mark incomplete' : 'Mark complete'}
            >
              {isCompleted && <CheckCircle2 className="w-3 h-3" />}
            </button>
            <div className="min-w-0">
              <p className="text-[8px] font-bold uppercase tracking-widest mb-0.5" style={{ color: typeColor }}>
                {item.type}
              </p>
              <p
                className={`${textSize} leading-snug truncate`}
                style={{ color: isCompleted ? 'var(--text-muted)' : 'var(--text-primary)', textDecoration: isCompleted ? 'line-through' : 'none' }}
              >
                {item.name}
              </p>
            </div>
          </div>
          {children.length > 0 && (
            <button
              onClick={() => toggleTaskExpansion(item.id)}
              className="flex-shrink-0 text-[8px] font-bold uppercase tracking-widest px-2 py-1 rounded-lg transition-all"
              style={{
                background: isExpanded ? `${typeColor}18` : 'transparent',
                color: typeColor,
                border: `1px solid ${typeColor}30`,
              }}
            >
              {isExpanded ? '−' : '+'}
            </button>
          )}
        </div>

        <AnimatePresence>
          {isExpanded && children.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              {children.map((child: any) => renderTask(child, depth + 1, isCompleted))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  // Timer progress
  const timerProgress = sessionTimer.totalSeconds > 0
    ? ((sessionTimer.totalSeconds - sessionTimer.remainingSeconds) / sessionTimer.totalSeconds) * 100
    : 0;

  return (
    <div className="glass rounded-2xl p-6 relative overflow-hidden mb-6"
      style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.04) 0%, rgba(127,119,221,0.04) 100%)' }}>
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8">

        {/* Tasks Column */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(0,229,255,0.12)', color: 'var(--accent-cyan)', border: '1px solid rgba(0,229,255,0.2)' }}>
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
                Today's Mission
              </h3>
              <p className="text-[10px] font-semibold mt-0.5" style={{ color: 'var(--accent-cyan)' }}>
                {completedCount}/{totalCount} Tasks Complete
              </p>
            </div>
          </div>

          <div className="space-y-0 max-h-[380px] overflow-y-auto pr-1 no-scrollbar">
            {topLevelItems.map(item => renderTask(item))}
          </div>
        </div>

        {/* Timer Column */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center text-center space-y-6 border-x"
          style={{ borderColor: 'var(--border-subtle)', paddingInline: '2rem' }}>
          <p className="text-[9px] font-bold uppercase tracking-widest flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
            <Clock className="w-3 h-3" /> Mission Timer
          </p>

          <div
            className="relative cursor-pointer group select-none"
            onClick={toggleSessionTimer}
          >
            <h2 className="text-5xl font-black font-mono tracking-tight transition-all"
              style={{
                color: sessionTimer.isRunning ? 'var(--accent-cyan)' : 'var(--text-primary)',
                opacity: sessionTimer.isRunning ? 1 : 0.45,
                textShadow: sessionTimer.isRunning ? '0 0 24px rgba(0,229,255,0.3)' : 'none',
              }}>
              {formatSeconds(sessionTimer.remainingSeconds)}
            </h2>

            {/* Progress line */}
            <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: 'var(--border-subtle)' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${timerProgress}%` }}
                className="h-full rounded-full"
                style={{ background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-violet))', boxShadow: '0 0 8px rgba(0,229,255,0.4)' }}
              />
            </div>

            {/* Hover hint */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="glass px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-widest"
                style={{ color: 'var(--text-secondary)' }}>
                {sessionTimer.isRunning ? 'Pause' : 'Resume'}
              </span>
            </div>
          </div>

          <span className="text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full"
            style={{ color: 'var(--accent-violet)', background: 'rgba(127,119,221,0.1)', border: '1px solid rgba(127,119,221,0.2)' }}>
            Goal: {Math.floor(sessionTimer.totalSeconds / 3600)}h Session
          </span>
        </div>

        {/* Progress Column */}
        <div className="lg:col-span-4 flex flex-col justify-center space-y-6">
          <div>
            <p className="text-[9px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
              Daily Objectives Cleared
            </p>
            <div className="flex items-baseline gap-2">
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-6xl font-black"
                style={{ color: 'var(--text-primary)' }}
              >
                {progressPercent}%
              </motion.span>
              <span className="text-sm font-semibold" style={{ color: 'var(--accent-teal)' }}>
                Complete
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="h-4 rounded-full overflow-hidden p-0.5"
              style={{ background: 'var(--border-subtle)' }}>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progressPercent}%` }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="h-full rounded-full relative overflow-hidden"
                style={{
                  background: 'linear-gradient(90deg, #007AA0, #00E5FF, #7F77DD)',
                  boxShadow: '0 0 12px rgba(0,229,255,0.4)',
                }}
              >
                {/* Shimmer overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </motion.div>
            </div>

            <div className="flex items-center gap-2">
              <Bell className="w-3.5 h-3.5" style={{ color: 'var(--accent-violet)' }} />
              <span className="text-[9px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                Status: {progressPercent === 100 ? '✨ Mission Complete' : '⚡ Active Deployment'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Background glow */}
      <div className="absolute bottom-0 right-0 w-48 h-48 rounded-full -mr-24 -mb-24 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(127,119,221,0.06) 0%, transparent 70%)' }} />
    </div>
  );
}
