import { useTrackerStore } from '../store/useTrackerStore';
import { curriculum } from '../data/curriculum';
import { TrendingUp, Target, Flame, Clock } from 'lucide-react';
import DailyFocus from './DailyFocus';

export default function Dashboard() {
  const {
    getTotalMinutes,
    currentStreak,
    getOverallProgress,
    getCompletedSubjectsCount,
    getTotalSubjectsCount,
    progress,
  } = useTrackerStore();

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

  return (
    <div className="animate-slide-in-up">
      <DailyFocus />
      
      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="glass p-8 rounded-[2.5rem] border-l-8 border-blue-500 shadow-2xl transition-transform hover:scale-105 duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-2">Overall Progress</p>
              <p className="text-4xl font-black text-gray-900 dark:text-white">{overallProgress}%</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center">
              <TrendingUp className="w-8 h-8 text-blue-500" />
            </div>
          </div>
          <div className="mt-6 bg-gray-200/30 dark:bg-gray-700/30 rounded-full h-2.5 overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-600 to-blue-400 h-full rounded-full transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(37,99,235,0.4)]"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
        </div>

        <div className="glass p-8 rounded-[2.5rem] border-l-8 border-green-500 shadow-2xl transition-transform hover:scale-105 duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-2">Subjects Done</p>
              <p className="text-4xl font-black text-gray-900 dark:text-white">
                {completedSubjects}<span className="text-xl text-gray-400 ml-1">/{totalSubjects}</span>
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-green-500/10 flex items-center justify-center">
              <Target className="w-8 h-8 text-green-500" />
            </div>
          </div>
          <p className="text-[10px] text-green-600 dark:text-green-400 mt-4 font-black uppercase tracking-wider bg-green-500/5 inline-block px-3 py-1 rounded-full">
            Keep crushing it
          </p>
        </div>

        <div className="glass p-8 rounded-[2.5rem] border-l-8 border-orange-500 shadow-2xl transition-transform hover:scale-105 duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-2">Daily Streak</p>
              <p className="text-4xl font-black text-gray-900 dark:text-white">{currentStreak}</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-orange-500/10 flex items-center justify-center">
              <Flame className="w-8 h-8 text-orange-500" />
            </div>
          </div>
          <p className="text-[10px] text-orange-600 dark:text-orange-400 mt-4 font-black uppercase tracking-wider bg-orange-500/5 inline-block px-3 py-1 rounded-full">
            Day Streak
          </p>
        </div>

        <div className="glass p-8 rounded-[2.5rem] border-l-8 border-purple-500 shadow-2xl transition-transform hover:scale-105 duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-2">Study Hours</p>
              <p className="text-4xl font-black text-gray-900 dark:text-white">{totalHours}</p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-purple-500/10 flex items-center justify-center">
              <Clock className="w-8 h-8 text-purple-500" />
            </div>
          </div>
          <p className="text-[10px] text-purple-600 dark:text-purple-400 mt-4 font-black uppercase tracking-wider bg-purple-500/5 inline-block px-3 py-1 rounded-full">
            Total {totalPotentialHours}h
          </p>
        </div>
      </div>

      {/* Phase Progress */}
      <div className="glass p-10 rounded-[3rem] shadow-2xl mb-10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-12 flex items-center justify-between uppercase tracking-tighter">
          <div className="flex items-center gap-4">
            <div className="w-2.5 h-10 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)]"></div>
            Phase Progress
          </div>
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-10">
          {phaseStats.map((stat) => (
            <div key={stat.phaseId} className="group">
              <div className="flex items-center justify-between mb-4">
                <span className="font-black text-gray-800 dark:text-gray-200 uppercase tracking-widest text-xs">
                  {stat.phaseName}
                </span>
                <span className="text-[10px] font-black text-blue-600 dark:text-blue-400 bg-blue-600/10 px-4 py-1.5 rounded-full uppercase">
                  {stat.completed}/{stat.total} Subjects
                </span>
              </div>
              <div className="relative h-4 bg-gray-200/30 dark:bg-gray-700/30 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full transition-all duration-1000 ease-out group-hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]"
                  style={{ width: `${stat.percentage}%` }}
                />
              </div>
              <div className="flex justify-between mt-3">
                <p className="text-[9px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em]">Phase 0{stat.phaseId}</p>
                <p className="text-[9px] font-black text-blue-600 dark:text-blue-400 uppercase tracking-[0.2em]">{stat.percentage}% Mastery</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass p-10 rounded-[3rem] border-l-8 border-blue-500 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/5 rounded-full -mr-20 -mt-20 blur-3xl transition-all group-hover:bg-blue-500/10" />
          <h3 className="text-xl font-black text-blue-900 dark:text-blue-100 mb-6 flex items-center gap-4 uppercase tracking-tighter">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-xl">💡</div> 
            Pro Tip
          </h3>
          <p className="text-sm font-medium text-blue-800/80 dark:text-blue-200/80 leading-relaxed italic">
            "Study 4-6 hours daily with high intensity. Use the Pomodoro timer in the bottom-right to maintain your flow state. Consistency is the only multiplier for success."
          </p>
        </div>

        <div className="glass p-10 rounded-[3rem] border-l-8 border-green-500 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/5 rounded-full -mr-20 -mt-20 blur-3xl transition-all group-hover:bg-green-500/10" />
          <h3 className="text-xl font-black text-green-900 dark:text-green-100 mb-6 flex items-center gap-4 uppercase tracking-tighter">
            <div className="w-10 h-10 rounded-2xl bg-green-500/10 flex items-center justify-center text-xl">🎯</div> 
            Next Mission
          </h3>
          <p className="text-sm font-medium text-green-800/80 dark:text-green-200/80 leading-relaxed italic">
            "Pick one subject from Phase 0{phaseStats.find(p => p.percentage < 100)?.phaseId || 1}. Master its fundamental topics first, then build the projects. Don't just learn—execute."
          </p>
        </div>
      </div>
    </div>
  );
}