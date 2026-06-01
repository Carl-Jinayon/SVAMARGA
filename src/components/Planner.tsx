import { useState } from 'react';
import { useTrackerStore } from '../store/useTrackerStore';
import { curriculum } from '../data/curriculum';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Toast from './Toast';

export default function Planner() {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [toast, setToast] = useState<{message: string, type: 'success' | 'error'} | null>(null);
  const { getWeeklyPlan, addWeeklyPlan, setActiveWeekPlan } = useTrackerStore();

  const plan = getWeeklyPlan(currentWeek);
  const [plannedSubjects, setPlannedSubjects] = useState(plan?.plannedSubjects || []);
  const [goals, setGoals] = useState(plan?.goals || ['', '', '']);

  const allSubjects = curriculum.flatMap((phase) =>
    phase.subjects.map((s) => ({ id: s.id, name: s.name, phaseName: phase.name }))
  );

  const savePlan = () => {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + (currentWeek - 1) * 7);
    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + 6);

    addWeeklyPlan(currentWeek, {
      week: currentWeek,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      plannedSubjects,
      goals: goals.filter((g) => g.trim()),
    });

    setActiveWeekPlan(currentWeek);
    setToast({ message: `Week ${currentWeek} Strategy Finalized!`, type: 'success' });
  };

  const startDate = new Date();
  startDate.setDate(startDate.getDate() + (currentWeek - 1) * 7);
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 6);

  const toggleSubject = (subjectId: string) => {
    setPlannedSubjects((prev) =>
      prev.includes(subjectId)
        ? prev.filter((id) => id !== subjectId)
        : [...prev, subjectId]
    );
  };

  return (
    <div className="animate-slide-in-up max-w-4xl mx-auto space-y-8 pb-20">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      {/* Week Navigation */}
      <div className="glass p-8 rounded-[2rem] shadow-2xl">
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => setCurrentWeek(Math.max(1, currentWeek - 1))}
            disabled={currentWeek === 1}
            className="w-12 h-12 rounded-2xl bg-white/50 dark:bg-gray-700/50 flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 transition-all shadow-sm disabled:opacity-30 border border-white/20 dark:border-gray-600/30"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 dark:text-blue-400 mb-2">Academic Roadmap</p>
            <h2 className="text-2xl font-black text-gray-900 dark:text-white">
              Week {currentWeek} <span className="mx-2 text-gray-300 font-light">|</span> <span className="text-lg font-bold text-gray-500">{startDate.toLocaleDateString()}</span>
            </h2>
          </div>

          <button
            onClick={() => setCurrentWeek(currentWeek + 1)}
            className="w-12 h-12 rounded-2xl bg-white/50 dark:bg-gray-700/50 flex items-center justify-center hover:bg-white dark:hover:bg-gray-700 transition-all shadow-sm border border-white/20 dark:border-gray-600/30"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Quick Info */}
        <div className="bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-2xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full -mr-16 -mt-16 blur-2xl" />
          <p className="text-blue-900 dark:text-blue-200 text-sm font-medium relative z-10 leading-relaxed">
            <span className="inline-block w-8 h-8 rounded-lg bg-blue-500 text-white text-center leading-8 mr-3 shadow-lg shadow-blue-500/20">💡</span>
            Pick 1-2 subjects, complete at least 1 project, and study 20+ hours total to stay on track for the 80-week curriculum.
          </p>
        </div>
      </div>

      {/* Plan Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Goals */}
        <div className="glass p-8 rounded-[2rem] shadow-xl">
          <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <div className="w-1.5 h-6 bg-green-500 rounded-full" />
            Weekly Goals
          </h3>
          <div className="space-y-3 mb-6">
            {goals.map((goal, idx) => (
              <div key={idx} className="group relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 w-1 h-4 bg-gray-200 dark:bg-gray-700 rounded-full group-focus-within:bg-green-500 transition-colors" />
                <input
                  type="text"
                  value={goal}
                  onChange={(e) => {
                    const newGoals = [...goals];
                    newGoals[idx] = e.target.value;
                    setGoals(newGoals);
                  }}
                  placeholder={`Strategic goal ${idx + 1}...`}
                  className="w-full pl-8 pr-4 py-4 bg-white/40 dark:bg-black/20 border border-white/20 dark:border-white/5 rounded-2xl text-gray-900 dark:text-white text-sm font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all"
                />
              </div>
            ))}
          </div>
          <div className="p-4 bg-white/20 dark:bg-black/10 rounded-2xl border border-white/10 dark:border-white/5">
            <p className="text-[10px] font-black uppercase tracking-wider text-gray-400 mb-1">Top Recommendations</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">"Build 2 mini-projects", "Watch CS50P Week 4", "Solve 5 LeetCode problems"</p>
          </div>
        </div>

        {/* Subjects Selection */}
        <div className="glass p-8 rounded-[2rem] shadow-xl">
          <h3 className="text-lg font-black text-gray-900 dark:text-white mb-6 flex items-center gap-3">
            <div className="w-1.5 h-6 bg-purple-500 rounded-full" />
            Curriculum Focus
          </h3>
          <div className="space-y-2 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
            {allSubjects.map((subject) => (
              <label
                key={subject.id}
                className={`flex items-center gap-4 p-4 rounded-2xl cursor-pointer transition-all border ${
                  plannedSubjects.includes(subject.id)
                    ? 'bg-purple-500/10 border-purple-500/20 shadow-lg shadow-purple-500/5'
                    : 'bg-white/20 dark:bg-black/10 border-transparent hover:border-white/40'
                }`}
              >
                <input
                  type="checkbox"
                  checked={plannedSubjects.includes(subject.id)}
                  onChange={() => toggleSubject(subject.id)}
                  className="w-5 h-5 rounded-lg cursor-pointer accent-purple-500"
                />
                <div className="flex-1 min-w-0">
                  <p className={`font-bold text-sm ${plannedSubjects.includes(subject.id) ? 'text-purple-700 dark:text-purple-300' : 'text-gray-700 dark:text-gray-300'}`}>
                    {subject.id}
                  </p>
                  <p className="text-[10px] font-black uppercase tracking-wider text-gray-400">{subject.name}</p>
                </div>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Daily Schedule */}
      <div className="glass p-8 rounded-[2.5rem] shadow-2xl">
        <h3 className="text-lg font-black text-gray-900 dark:text-white mb-8 flex items-center gap-3">
          <div className="w-1.5 h-6 bg-orange-500 rounded-full" />
          Optimal Daily Rhythm
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, idx) => (
            <div key={day} className={`rounded-3xl p-4 transition-all ${idx < 5 ? 'bg-blue-500/5 dark:bg-blue-500/10 border border-blue-500/10' : 'bg-orange-500/5 dark:bg-orange-500/10 border border-orange-500/10'}`}>
              <p className="font-black text-gray-900 dark:text-white text-xs mb-4 uppercase tracking-widest">{day}</p>
              <div className="space-y-3">
                <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-500 w-[70%]" />
                </div>
                <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-indigo-500 w-[40%]" />
                </div>
                <div className="h-1.5 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 w-[60%]" />
                </div>
              </div>
              <p className="text-[9px] font-black text-gray-400 mt-4 uppercase">5.5 Hours</p>
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-lg px-6 z-50">
        <button
          onClick={savePlan}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-[0.2em] py-5 px-8 rounded-2xl transition-all shadow-2xl shadow-blue-600/40 active:scale-95"
        >
          Finalize Week {currentWeek} Strategy
        </button>
      </div>

      {/* Suggested Schedule */}
      <div className="glass p-8 rounded-[2rem] border-none relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/5 rounded-full -mr-32 -mt-32 blur-3xl" />
        <h3 className="font-black text-gray-900 dark:text-white mb-6 uppercase tracking-widest text-xs flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          80-Week Master Timeline
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-[10px]">
          <div className="p-4 bg-white/20 dark:bg-black/10 rounded-2xl border border-white/10">
            <p className="font-black text-blue-600 dark:text-blue-400 uppercase mb-1">Phase 1</p>
            <p className="font-bold text-gray-700 dark:text-gray-300">Foundations</p>
            <p className="text-gray-400 mt-2 font-medium">Weeks 1-6</p>
          </div>
          <div className="p-4 bg-white/20 dark:bg-black/10 rounded-2xl border border-white/10">
            <p className="font-black text-purple-600 dark:text-purple-400 uppercase mb-1">Phase 2</p>
            <p className="font-bold text-gray-700 dark:text-gray-300">Core CS</p>
            <p className="text-gray-400 mt-2 font-medium">Weeks 7-23</p>
          </div>
          <div className="p-4 bg-white/20 dark:bg-black/10 rounded-2xl border border-white/10">
            <p className="font-black text-pink-600 dark:text-pink-400 uppercase mb-1">Phase 3</p>
            <p className="font-bold text-gray-700 dark:text-gray-300">Full-Stack</p>
            <p className="text-gray-400 mt-2 font-medium">Weeks 24-36</p>
          </div>
          <div className="p-4 bg-white/20 dark:bg-black/10 rounded-2xl border border-white/10">
            <p className="font-black text-orange-600 dark:text-orange-400 uppercase mb-1">Phase 4</p>
            <p className="font-bold text-gray-700 dark:text-gray-300">ML & AI</p>
            <p className="text-gray-400 mt-2 font-medium">Weeks 37-68</p>
          </div>
          <div className="p-4 bg-white/20 dark:bg-black/10 rounded-2xl border border-white/10">
            <p className="font-black text-green-600 dark:text-green-400 uppercase mb-1">Phase 5</p>
            <p className="font-bold text-gray-700 dark:text-gray-300">Career</p>
            <p className="text-gray-400 mt-2 font-medium">Weeks 69-80</p>
          </div>
        </div>
      </div>
    </div>
  );
}
