import { useState, useEffect, useRef } from 'react';
import { useTrackerStore } from '../store/useTrackerStore';
import { Play, Pause, RotateCcw, CheckCircle2, Clock, Zap, Bell, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DailyFocus() {
  const { dailyPlans, toggleDailyItem } = useTrackerStore();
  const today = new Date().toISOString().split('T')[0];
  const plan = dailyPlans[today];

  // Timer set to 1 hour (as an example for 'Time Left to Complete Plan')
  // In a real app, this could be based on estimated hours from curriculum
  const [timeLeft, setTimeLeft] = useState(60 * 60); 
  const [isRunning, setIsRunning] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let interval: any;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft(t => t - 1), 1000);
    } else if (timeLeft === 0 && isRunning) {
      setIsRunning(false);
      playAlarm();
    }
    return () => clearInterval(interval);
  }, [isRunning, timeLeft]);

  const playAlarm = () => {
    // Standard professional beep
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(880, audioContext.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.1, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 1);
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h > 0 ? h + ':' : ''}${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  if (!plan || plan.items.length === 0) return null;

  const completedCount = plan.items.filter((i: any) => i.completed).length;
  const progressPercent = Math.round((completedCount / plan.items.length) * 100);
  const timerPercent = (timeLeft / (60 * 60)) * 100;

  return (
    <div className="glass p-10 rounded-[3.5rem] shadow-2xl mb-12 border-none relative overflow-hidden bg-gradient-to-br from-indigo-600/5 to-purple-600/5">
      <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 dark:bg-white/5 overflow-hidden">
        <motion.div 
          initial={{ width: '100%' }}
          animate={{ width: `${timerPercent}%` }}
          className={`h-full ${timeLeft < 300 ? 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.5)]' : 'bg-blue-600'}`}
        />
      </div>

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

        {/* Mission Timer */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center text-center space-y-8 border-x border-black/5 dark:border-white/5 px-12">
          <div className="space-y-2">
            <p className="text-[10px] font-black uppercase text-gray-400 tracking-[0.3em] flex items-center justify-center gap-2">
              <Clock className="w-3 h-3" /> Mission Time Remaining
            </p>
            <h2 className={`text-7xl font-black font-mono tracking-tighter ${timeLeft < 300 ? 'text-red-500' : 'text-gray-900 dark:text-white'}`}>
              {formatTime(timeLeft)}
            </h2>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={() => setIsRunning(!isRunning)}
              className={`px-10 py-5 rounded-3xl font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-2xl transition-all hover:scale-105 active:scale-95 ${
                isRunning ? 'bg-orange-500 text-white shadow-orange-500/20' : 'bg-indigo-600 text-white shadow-indigo-600/20'
              }`}
            >
              {isRunning ? <><Pause className="w-5 h-5" /> Holding</> : <><Play className="w-5 h-5 ml-1" /> Execute</>}
            </button>
            <button 
              onClick={() => { setIsRunning(false); setTimeLeft(60 * 60); }}
              className="w-16 h-16 rounded-3xl bg-white dark:bg-white/5 border-2 border-black/5 dark:border-white/5 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:bg-gray-50 transition-all"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
          </div>

          {timeLeft < 300 && (
            <motion.div 
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="flex items-center gap-2 text-red-500 text-[10px] font-black uppercase"
            >
              <AlertTriangle className="w-4 h-4" /> Final Countdown Initiated
            </motion.div>
          )}
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
