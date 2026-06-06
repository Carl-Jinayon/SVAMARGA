import { useTrackerStore } from '../store/useTrackerStore';
import { curriculum } from '../data/curriculum';
import { TrendingUp, Target, Flame, Clock, CalendarDays, Rocket } from 'lucide-react';
import DailyFocus from './DailyFocus';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

interface StatCardProps {
  label: string;
  value: React.ReactNode;
  icon: React.ReactNode;
  iconBg: string;
  accentColor: string;
  badge?: React.ReactNode;
  progress?: number;
  progressClass?: string;
  colorClass?: string;
}

function StatCard({ label, value, icon, iconBg, accentColor, badge, progress, progressClass, colorClass }: StatCardProps) {
  return (
    <motion.div
      variants={itemVariants}
      className={`glass glass-hover rounded-2xl p-6 transition-all duration-300 ${colorClass || ''}`}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest mb-2.5" style={{ color: 'var(--text-muted)' }}>
            {label}
          </p>
          <p className="text-4xl font-black leading-none" style={{ color: 'var(--text-primary)' }}>
            {value}
          </p>
        </div>
        <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: iconBg }}>
          <span style={{ color: accentColor }}>{icon}</span>
        </div>
      </div>
      {badge && (
        <div className="mb-3">
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full"
            style={{ background: `${accentColor}15`, color: accentColor }}>
            {badge}
          </span>
        </div>
      )}
      {progress !== undefined && (
        <div className="mt-4 progress-track h-2">
          <motion.div
            className={`h-full rounded-full ${progressClass}`}
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>
      )}
    </motion.div>
  );
}

export default function Dashboard({ onNavigate }: { onNavigate?: (tab: string) => void }) {
  const {
    getTotalMinutes,
    currentStreak,
    getOverallProgress,
    getCompletedSubjectsCount,
    getTotalSubjectsCount,
    progress,
    dailyPlans,
  } = useTrackerStore();

  const today = new Date().toISOString().split('T')[0];
  const hasPlanToday = dailyPlans[today] && dailyPlans[today].items.length > 0;

  const totalMinutes = getTotalMinutes();
  const totalHours = Math.round(totalMinutes / 60);
  const overallProgress = getOverallProgress();
  const completedSubjects = getCompletedSubjectsCount();
  const totalSubjects = getTotalSubjectsCount() || 27;

  // Calculate per-phase progress
  const phaseStats = curriculum.map((phase) => {
    const phaseSubjects = phase.subjects.length;
    const phaseCompleted = phase.subjects.filter(
      (s) => progress[s.id]?.completed
    ).length;
    return {
      phaseId: phase.id,
      phaseName: phase.name,
      completed: phaseCompleted,
      total: phaseSubjects,
      percentage: Math.round((phaseCompleted / phaseSubjects) * 100),
    };
  });

  const totalPotentialHours = curriculum.reduce(
    (sum, phase) => sum + phase.hours,
    0
  );

  const phaseColors = [
    { fill: 'progress-fill-cyan',   accent: 'var(--accent-cyan)' },
    { fill: 'progress-fill-violet', accent: 'var(--accent-violet)' },
    { fill: 'progress-fill-teal',   accent: 'var(--accent-teal)' },
    { fill: 'progress-fill-cyan',   accent: 'var(--accent-cyan)' },
    { fill: 'progress-fill-violet', accent: 'var(--accent-violet)' },
  ];

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Daily Focus or Empty State */}
      <motion.div variants={itemVariants}>
        {hasPlanToday ? (
          <DailyFocus />
        ) : (
          <div className="glass rounded-2xl p-7 relative overflow-hidden group"
            style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.05) 0%, rgba(127,119,221,0.05) 100%)' }}>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl flex-shrink-0 group-hover:scale-110 transition-transform"
                  style={{ background: 'rgba(0,229,255,0.1)', border: '1px solid rgba(0,229,255,0.2)' }}>
                  <CalendarDays className="w-5 h-5" style={{ color: 'var(--accent-cyan)' }} />
                </div>
                <div>
                  <h3 className="text-base font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    No Mission Deployed Today
                  </h3>
                  <p className="text-xs font-medium mt-0.5" style={{ color: 'var(--text-secondary)' }}>
                    Consistency is the multiplier. Head to Planner to set your goals.
                  </p>
                </div>
              </div>
              <button
                onClick={() => onNavigate?.('planner')}
                className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest flex-shrink-0 px-5 py-2.5 rounded-xl transition-all hover:scale-105 active:scale-95"
                style={{
                  color: '#fff',
                  background: 'linear-gradient(135deg, rgba(0,180,220,0.9) 0%, rgba(0,229,255,0.9) 100%)',
                  boxShadow: '0 4px 16px rgba(0,229,255,0.3)',
                  border: '1px solid rgba(0,229,255,0.3)',
                }}
              >
                <Rocket className="w-3.5 h-3.5" /> Plan My Day
              </button>
            </div>
            {/* Glow blob */}
            <div className="absolute top-0 right-0 w-40 h-40 rounded-full -mr-20 -mt-20 blur-3xl pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)' }} />
          </div>
        )}
      </motion.div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          label="Overall Progress"
          value={`${overallProgress}%`}
          icon={<TrendingUp className="w-5 h-5" />}
          iconBg="rgba(0,229,255,0.1)"
          accentColor="var(--accent-cyan)"
          progress={overallProgress}
          progressClass="progress-fill-cyan"
          colorClass="stat-card-cyan"
        />
        <StatCard
          label="Subjects Done"
          value={
            <span>
              {completedSubjects}
              <span className="text-xl font-semibold ml-1" style={{ color: 'var(--text-muted)' }}>
                /{totalSubjects}
              </span>
            </span>
          }
          icon={<Target className="w-5 h-5" />}
          iconBg="rgba(29,158,117,0.1)"
          accentColor="var(--accent-teal)"
          badge="Keep crushing it"
          colorClass="stat-card-teal"
        />
        <StatCard
          label="Daily Streak"
          value={currentStreak}
          icon={<Flame className="w-5 h-5" />}
          iconBg="rgba(245,158,11,0.1)"
          accentColor="#F59E0B"
          badge="Day Streak"
          colorClass="stat-card-amber"
        />
        <StatCard
          label="Study Hours"
          value={totalHours}
          icon={<Clock className="w-5 h-5" />}
          iconBg="rgba(127,119,221,0.1)"
          accentColor="var(--accent-violet)"
          badge={`of ${totalPotentialHours}h target`}
          colorClass="stat-card-violet"
        />
      </div>

      {/* Phase Progress */}
      <motion.div variants={itemVariants} className="glass rounded-2xl p-7 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 rounded-full -mr-24 -mt-24 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.06) 0%, transparent 70%)' }} />
        <h2 className="text-lg font-black tracking-tight mb-7 flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
          <span className="w-1 h-5 rounded-full" style={{ background: 'var(--accent-cyan)', boxShadow: '0 0 8px rgba(0,229,255,0.4)' }} />
          Phase Progress
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-12 gap-y-7">
          {phaseStats.map((stat, i) => {
            const color = phaseColors[i % phaseColors.length];
            return (
              <div key={stat.phaseId} className="group">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold tracking-wide" style={{ color: 'var(--text-primary)' }}>
                    {stat.phaseName}
                  </span>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full"
                    style={{ color: color.accent, background: `${color.accent}15` }}>
                    {stat.completed}/{stat.total} done
                  </span>
                </div>
                <div className="progress-track h-2">
                  <motion.div
                    className={`h-full rounded-full ${color.fill}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${stat.percentage}%` }}
                    transition={{ duration: 0.9, delay: 0.1 + i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                    Phase 0{stat.phaseId}
                  </p>
                  <p className="text-[9px] font-bold uppercase tracking-widest" style={{ color: color.accent }}>
                    {stat.percentage}% Mastery
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Tip Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div
          variants={itemVariants}
          className="glass rounded-2xl p-6 relative overflow-hidden group"
          style={{ borderLeft: '2px solid rgba(0,229,255,0.4)' }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none transition-all group-hover:opacity-150"
            style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.08) 0%, transparent 70%)' }} />
          <h3 className="text-sm font-black mb-3 flex items-center gap-2.5" style={{ color: 'var(--text-primary)' }}>
            <span className="text-base">💡</span> Pro Tip
          </h3>
          <p className="text-sm leading-relaxed italic" style={{ color: 'var(--text-secondary)' }}>
            "Study 4–6 hours daily with high intensity. Use the Pomodoro timer in the bottom-right to maintain your flow state. Consistency is the only multiplier for success."
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="glass rounded-2xl p-6 relative overflow-hidden group"
          style={{ borderLeft: '2px solid rgba(29,158,117,0.4)' }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(29,158,117,0.08) 0%, transparent 70%)' }} />
          <h3 className="text-sm font-black mb-3 flex items-center gap-2.5" style={{ color: 'var(--text-primary)' }}>
            <span className="text-base">🎯</span> Next Mission
          </h3>
          <p className="text-sm leading-relaxed italic" style={{ color: 'var(--text-secondary)' }}>
            "Pick one subject from Phase 0{phaseStats.find(p => p.percentage < 100)?.phaseId || 1}. Master its fundamental topics first, then build the projects. Don't just learn—execute."
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}