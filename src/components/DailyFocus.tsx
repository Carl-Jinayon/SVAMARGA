import { useState, useEffect } from 'react';
import { useTrackerStore } from '../store/useTrackerStore';
import { CheckCircle2, Clock, Zap, Bell } from 'lucide-react';
import { motion } from 'framer-motion';

export default function DailyFocus() {
  const { dailyPlans, toggleDailyItem } = useTrackerStore();
  const today = new Date().toISOString().split('T')[0];
  const plan = dailyPlans[today];

  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  if (!plan || plan.items.length === 0) return null;

  const completedCount = plan.items.filter((i: any) => i.completed).length;
  const progressPercent = Math.round((completedCount / plan.items.length) * 100);
  
  // Calculate percentage of day passed (for the visual bar)
  const dayProgress = ((currentTime.getHours() * 3600) + (currentTime.getMinutes() * 60) + currentTime.getSeconds()) / 86400 * 100;

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
          
          <div className="space-y-3 max-h-[300px] overflow-y-auto pr-4 custom-scrollbar">
            {plan.items.map((item: any) => (
              <motion.div 
                key={item.id}
                whileHover={{ x: 5 }}
                onClick={() => toggleDailyItem(today, item.id)}
                className={`p-5 rounded-3xl border-2 transition-all cursor-pointer flex items-center gap-4 ${
                  item.completed 
                    ? 'bg-green-500/10 border-green-500/20 opacity-60' 
                    : 'bg-white dark:bg-white/5 border-black/5 dark:border-white/5 hover:border-indigo-500/30'
                }`}
              >
                <div className={`w-6 h-6 rounded-xl border-2 flex items-center justify-center transition-all ${item.completed ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>
                  {item.completed && <CheckCircle2 className="w-4 h-4" />}
                </div>
                <div className="flex-1">
                  <p className={`text-[8px] font-black uppercase mb-0.5 ${item.completed ? 'text-green-600' : 'text-indigo-600 opacity-60'}`}>{item.type}</p>
                  <p className={`text-sm font-bold leading-tight ${item.completed ? 'line-through text-gray-400' : 'text-gray-700 dark:text-gray-300'}`}>
                    {item.name}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Real-time Clock */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center text-center space-y-8 border-x border-black/5 dark:border-white/5 px-12">
          <div className="space-y-4 w-full">
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em] flex items-center justify-center gap-2">
              <Clock className="w-3 h-3" /> System Time
            </p>
            <div className="relative inline-block">
              <h2 className="text-7xl font-black font-mono tracking-tighter text-gray-900 dark:text-white">
                {formatTime(currentTime)}
              </h2>
              {/* Visual Day Progress Bar (Bottom of Clock) */}
              <div className="absolute -bottom-4 left-0 w-full h-1.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${dayProgress}%` }}
                  className="h-full bg-blue-600 shadow-[0_0_10px_rgba(37,99,235,0.5)]"
                />
              </div>
            </div>
            <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest bg-indigo-500/10 inline-block px-4 py-1.5 rounded-full mt-6">
              {currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
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
