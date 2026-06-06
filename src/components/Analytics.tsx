import { useTrackerStore } from '../store/useTrackerStore';
import { curriculum } from '../data/curriculum';
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer, LineChart, Line,
} from 'recharts';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { BarChart3, Clock, BookOpen } from 'lucide-react';

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};
const containerVariants: Variants = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08 } },
};

// Custom recharts tooltip with glass styling
function GlassTooltip({ active, payload, label, darkMode }: any) {
  if (!active || !payload || !payload.length) return null;
  return (
    <div style={{
      background: darkMode ? 'rgba(13,21,38,0.92)' : 'rgba(255,255,255,0.92)',
      border: `1px solid ${darkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'}`,
      borderRadius: 12,
      padding: '10px 14px',
      backdropFilter: 'blur(20px)',
      boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
    }}>
      {label !== undefined && (
        <p style={{ fontSize: 10, fontWeight: 700, color: darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.4)', marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {label}
        </p>
      )}
      {payload.map((p: any, i: number) => (
        <p key={i} style={{ fontSize: 13, fontWeight: 700, color: p.color || (darkMode ? '#E0E7FF' : '#0D1526') }}>
          {p.value} {p.name}
        </p>
      ))}
    </div>
  );
}

export default function Analytics() {
  const { getSessions, progress, darkMode } = useTrackerStore();
  const sessions = getSessions();

  // Data for phase progress pie chart
  const phaseData = curriculum.map((phase) => {
    const completed = phase.subjects.filter((s) => progress[s.id]?.completed).length;
    return {
      name: phase.name,
      value: completed,
      total: phase.subjects.length,
    };
  });

  // Data for time spent per phase
  const timePerPhase = curriculum.map((phase) => {
    const phaseMinutes = sessions
      .filter((s) => phase.subjects.some((sub) => sub.id === s.subjectId))
      .reduce((sum, s) => sum + s.duration, 0);
    return {
      phase: phase.name,
      hours: Math.round(phaseMinutes / 60),
    };
  });

  // Data for sessions over time (last 30 days)
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    const dateStr = date.toISOString().split('T')[0];
    const count = sessions.filter((s) => s.date.startsWith(dateStr)).length;
    return {
      date: date.getDate(),
      sessions: count,
    };
  });

  // Subject completion stats
  const subjectStats = Object.entries(progress)
    .map(([subjectId, prog]) => {
      const subject = curriculum
        .flatMap((p) => p.subjects)
        .find((s) => s.id === subjectId);
      return {
        subject: subject?.id || subjectId,
        topicsCompleted: prog.topicsCompleted.length,
        projectsCompleted: prog.projectsCompleted.length,
        sessions: prog.sessionsCount,
        hours: Math.round(prog.totalMinutes / 60),
      };
    })
    .sort((a, b) => b.hours - a.hours)
    .slice(0, 10);

  const hasData = sessions.length > 0 || Object.keys(progress).length > 0;

  if (!hasData) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="space-y-6 sm:space-y-8 animate-slide-in-up pb-20"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
              <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: 'var(--accent-cyan)' }} />
              Analytics & Insights
            </h2>
            <p className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{ color: 'var(--text-muted)' }}>
              Data visualization of your progress
            </p>
          </div>
        </div>
        <div className="glass rounded-[3rem] p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
          <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6" style={{ background: 'rgba(0,229,255,0.05)', color: 'var(--accent-cyan)' }}>
            <BarChart3 className="w-12 h-12 opacity-50" />
          </div>
          <h3 className="text-2xl font-black uppercase tracking-tight mb-2" style={{ color: 'var(--text-primary)' }}>No Data Yet</h3>
          <p className="text-sm font-medium mb-8 max-w-md" style={{ color: 'var(--text-secondary)' }}>
            Start studying, complete topics, or run the session timer to generate insights and track your learning patterns over time.
          </p>
        </div>
      </motion.div>
    );
  }

  const COLORS = [
    '#00E5FF', '#7F77DD', '#1D9E75', '#F59E0B',
    '#4FC3F7', '#9D77FF', '#26C48F', '#F97316',
  ];

  const axisStyle = {
    fontSize: 10,
    fontWeight: 700,
    fill: darkMode ? '#4B5E78' : '#8FA3BC',
  };

  const gridStroke = darkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.04)';

  const totalHours = Math.round((sessions.reduce((sum, s) => sum + s.duration, 0) / 60) * 10) / 10;

  if (sessions.length === 0) {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="glass rounded-3xl p-16 flex flex-col items-center justify-center text-center border-none shadow-xl min-h-[60vh]"
      >
        <div className="w-24 h-24 rounded-full flex items-center justify-center mb-6" style={{ background: 'rgba(0,229,255,0.05)', color: 'var(--accent-cyan)' }}>
          <BarChart3 className="w-12 h-12 opacity-80" />
        </div>
        <h2 className="text-2xl font-black uppercase tracking-tight mb-2" style={{ color: 'var(--text-primary)' }}>No Data Yet</h2>
        <p className="text-sm font-medium max-w-md opacity-60 leading-relaxed" style={{ color: 'var(--text-primary)' }}>
          Your analytics dashboard will populate automatically once you start studying and logging your sessions in the Curriculum or Planner.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      {/* Overview Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Total Sessions', value: sessions.length, icon: <BarChart3 className="w-5 h-5" />, color: '#00E5FF' },
          { label: 'Total Hours',    value: totalHours,       icon: <Clock className="w-5 h-5" />,    color: '#1D9E75' },
          { label: 'Subjects Active', value: Object.keys(progress).length, icon: <BookOpen className="w-5 h-5" />, color: '#7F77DD' },
        ].map((stat) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className="glass glass-hover rounded-2xl p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-widest mb-2.5" style={{ color: 'var(--text-muted)' }}>
                  {stat.label}
                </p>
                <p className="text-4xl font-black leading-none animate-count-up" style={{ color: 'var(--text-primary)' }}>
                  {stat.value}
                </p>
              </div>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                style={{ background: `${stat.color}14`, color: stat.color }}>
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 h-0.5 w-10 rounded-full" style={{ background: stat.color, boxShadow: `0 0 8px ${stat.color}60` }} />
          </motion.div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Phase Pie */}
        <motion.div variants={itemVariants} className="glass rounded-2xl p-6">
          <h3 className="text-sm font-black tracking-tight mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <span className="w-1 h-4 rounded-full" style={{ background: '#7F77DD' }} />
            Subject Completion
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={phaseData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={100}
                paddingAngle={4}
                dataKey="value"
                strokeWidth={0}
              >
                {phaseData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} opacity={0.9} />
                ))}
              </Pie>
              <Tooltip content={<GlassTooltip darkMode={darkMode} />} />
              <Legend
                verticalAlign="bottom"
                height={36}
                formatter={(value) => (
                  <span style={{ fontSize: 10, fontWeight: 600, color: darkMode ? '#8FA3C8' : '#4B5E78' }}>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Time Per Phase Bar */}
        <motion.div variants={itemVariants} className="glass rounded-2xl p-6">
          <h3 className="text-sm font-black tracking-tight mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <span className="w-1 h-4 rounded-full" style={{ background: '#00E5FF' }} />
            Study Hours per Phase
          </h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={timePerPhase} barSize={28}>
              <CartesianGrid strokeDasharray="0" vertical={false} stroke={gridStroke} />
              <XAxis dataKey="phase" axisLine={false} tickLine={false} tick={axisStyle} />
              <YAxis axisLine={false} tickLine={false} tick={axisStyle} />
              <Tooltip
                content={<GlassTooltip darkMode={darkMode} />}
                cursor={{ fill: darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.03)', radius: 8 }}
              />
              <Bar dataKey="hours" radius={[6, 6, 0, 0]}>
                {timePerPhase.map((_, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} fillOpacity={0.85} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Sessions Trend */}
      <motion.div variants={itemVariants} className="glass rounded-2xl p-6">
        <h3 className="text-sm font-black tracking-tight mb-6 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
          <span className="w-1 h-4 rounded-full" style={{ background: '#1D9E75' }} />
          Sessions Trend — Last 30 Days
        </h3>
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={last30Days}>
            <defs>
              <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#00AACC" />
                <stop offset="100%" stopColor="#1D9E75" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="0" vertical={false} stroke={gridStroke} />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={axisStyle} />
            <YAxis axisLine={false} tickLine={false} tick={axisStyle} allowDecimals={false} />
            <Tooltip content={<GlassTooltip darkMode={darkMode} />} />
            <Line
              type="monotone"
              dataKey="sessions"
              stroke="url(#lineGrad)"
              strokeWidth={3}
              dot={{ r: 3, fill: '#1D9E75', strokeWidth: 0 }}
              activeDot={{ r: 5, fill: '#00E5FF', strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Top Subjects */}
      {subjectStats.length > 0 && (
        <motion.div variants={itemVariants} className="glass rounded-2xl p-6">
          <h3 className="text-sm font-black tracking-tight mb-5 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
            <span className="w-1 h-4 rounded-full" style={{ background: '#F59E0B' }} />
            Top Most Studied
          </h3>
          <div className="space-y-2">
            {subjectStats.map((stat, idx) => (
              <motion.div
                key={stat.subject}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="flex items-center justify-between px-4 py-3 rounded-xl transition-colors"
                style={{
                  background: idx % 2 === 0
                    ? darkMode ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)'
                    : 'transparent',
                }}
              >
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black flex-shrink-0"
                    style={{
                      background: `${COLORS[idx % COLORS.length]}18`,
                      color: COLORS[idx % COLORS.length],
                    }}>
                    {idx + 1}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {stat.subject}
                    </p>
                    <p className="text-[10px] font-medium mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      {stat.topicsCompleted} topics · {stat.projectsCompleted} projects · {stat.sessions} sessions
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-black" style={{ color: '#00E5FF' }}>{stat.hours}h</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}