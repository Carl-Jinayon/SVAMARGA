import { useTrackerStore } from '../store/useTrackerStore';
import { curriculum } from '../data/curriculum';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';

export default function Analytics() {
  const { getSessions, progress } = useTrackerStore();
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

  const COLORS = [
    '#3b82f6',
    '#8b5cf6',
    '#ec4899',
    '#f59e0b',
    '#10b981',
    '#06b6d4',
    '#ef4444',
    '#6366f1',
  ];

  return (
    <div className="animate-slide-in-up space-y-8">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass p-6 rounded-2xl shadow-xl">
          <p className="text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400">Total Sessions</p>
          <p className="text-4xl font-black text-gray-900 dark:text-white mt-3">{sessions.length}</p>
          <div className="mt-4 h-1 w-12 bg-blue-500 rounded-full" />
        </div>
        <div className="glass p-6 rounded-2xl shadow-xl">
          <p className="text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400">Total Hours</p>
          <p className="text-4xl font-black text-gray-900 dark:text-white mt-3">
            {Math.round((sessions.reduce((sum, s) => sum + s.duration, 0) / 60) * 10) / 10}
          </p>
          <div className="mt-4 h-1 w-12 bg-green-500 rounded-full" />
        </div>
        <div className="glass p-6 rounded-2xl shadow-xl">
          <p className="text-xs font-black uppercase tracking-wider text-gray-500 dark:text-gray-400">Subjects Touched</p>
          <p className="text-4xl font-black text-gray-900 dark:text-white mt-3">
            {Object.keys(progress).length}
          </p>
          <div className="mt-4 h-1 w-12 bg-purple-500 rounded-full" />
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Phase Progress Pie */}
        <div className="glass p-8 rounded-3xl shadow-xl overflow-hidden relative">
          <h3 className="text-lg font-black text-gray-900 dark:text-white mb-8 flex items-center gap-3">
            <div className="w-1.5 h-6 bg-indigo-500 rounded-full" />
            Subject Completion
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={phaseData}
                cx="50%"
                cy="50%"
                innerRadius={70}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {phaseData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                  borderRadius: '16px', 
                  border: 'none',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Time Per Phase */}
        <div className="glass p-8 rounded-3xl shadow-xl overflow-hidden relative">
          <h3 className="text-lg font-black text-gray-900 dark:text-white mb-8 flex items-center gap-3">
            <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
            Study Hours per Phase
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={timePerPhase}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
              <XAxis dataKey="phase" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} />
              <Tooltip 
                cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                contentStyle={{ 
                  backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                  borderRadius: '16px', 
                  border: 'none',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="hours" fill="#3b82f6" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sessions Trend */}
      <div className="glass p-8 rounded-3xl shadow-xl">
        <h3 className="text-lg font-black text-gray-900 dark:text-white mb-8 flex items-center gap-3">
          <div className="w-1.5 h-6 bg-green-500 rounded-full" />
          Sessions Trend
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={last30Days}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
            <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700 }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                borderRadius: '16px', 
                border: 'none',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Line 
              type="monotone" 
              dataKey="sessions" 
              stroke="#10b981" 
              strokeWidth={4} 
              dot={{ r: 4, fill: '#10b981', strokeWidth: 2, stroke: '#fff' }} 
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Top Subjects */}
      {subjectStats.length > 0 && (
        <div className="glass p-8 rounded-3xl shadow-xl">
          <h3 className="text-lg font-black text-gray-900 dark:text-white mb-8 flex items-center gap-3">
            <div className="w-1.5 h-6 bg-orange-500 rounded-full" />
            Top Most Studied
          </h3>
          <div className="grid gap-4">
            {subjectStats.map((stat, idx) => (
              <div key={stat.subject} className="flex items-center justify-between p-4 bg-white/40 dark:bg-black/20 rounded-2xl border border-white/20 dark:border-white/5">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-black">
                    {idx + 1}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 dark:text-white">{stat.subject}</p>
                    <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 mt-1">
                      {stat.topicsCompleted} topics • {stat.projectsCompleted} projects • {stat.sessions} sessions
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xl font-black text-blue-600 dark:text-blue-400">{stat.hours}h</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}