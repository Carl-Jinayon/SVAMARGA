import { useState, useEffect } from 'react';
import { useTrackerStore } from '../store/useTrackerStore';
import { curriculum } from '../data/curriculum';
import { Play, Pause, RotateCcw, LogOut } from 'lucide-react';

export default function SessionTimer() {
  const [isRunning, setIsRunning] = useState(false);
  const [sessionMinutes, setSessionMinutes] = useState(25);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [sessionType, setSessionType] = useState<'work' | 'break'>('work');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [showModal, setShowModal] = useState(false);

  const { addSession } = useTrackerStore();

  const allSubjects = curriculum.flatMap((phase) =>
    phase.subjects.map((s) => ({ id: s.id, name: s.name, phaseName: phase.name }))
  );

  // Timer effect
  useEffect(() => {
    let interval: any;

    if (isRunning) {
      interval = setInterval(() => {
        if (sessionSeconds > 0) {
          setSessionSeconds(sessionSeconds - 1);
        } else if (sessionMinutes > 0) {
          setSessionMinutes(sessionMinutes - 1);
          setSessionSeconds(59);
        } else {
          // Timer complete
          setIsRunning(false);
          playNotification();

          if (sessionType === 'work' && selectedSubject) {
            // Auto-log session
            addSession({
              date: new Date().toISOString(),
              duration: 25,
              subjectId: selectedSubject,
              phaseName: allSubjects.find((s) => s.id === selectedSubject)?.phaseName || 'Unknown',
            });
          }

          // Switch modes
          if (sessionType === 'work') {
            setSessionType('break');
            setSessionMinutes(5);
          } else {
            setSessionType('work');
            setSessionMinutes(25);
          }
          setSessionSeconds(0);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, sessionMinutes, sessionSeconds, sessionType]);

  const playNotification = () => {
    // Simple beep using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gain = audioContext.createGain();

    oscillator.connect(gain);
    gain.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';

    gain.gain.setValueAtTime(0.3, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  };

  const formatTime = () => {
    const mins = String(sessionMinutes).padStart(2, '0');
    const secs = String(sessionSeconds).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleReset = () => {
    setIsRunning(false);
    if (sessionType === 'work') {
      setSessionMinutes(25);
    } else {
      setSessionMinutes(5);
    }
    setSessionSeconds(0);
  };

  const handleSessionEnd = () => {
    if (selectedSubject && !isRunning) {
      addSession({
        date: new Date().toISOString(),
        duration: 25,
        subjectId: selectedSubject,
        phaseName: allSubjects.find((s) => s.id === selectedSubject)?.phaseName || 'Unknown',
      });
      handleReset();
      setShowModal(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setShowModal(!showModal)}
        className="backdrop-blur-xl bg-blue-600/90 hover:bg-blue-600 text-white rounded-2xl p-5 shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:shadow-[0_20px_50px_rgba(37,99,235,0.4)] transition-all duration-300 flex items-center justify-center border border-white/20 active:scale-95 group"
        title="Open session timer"
      >
        <div className="text-center">
          <div className="text-3xl font-black font-mono tracking-tighter group-hover:scale-110 transition-transform">{formatTime()}</div>
          <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80 mt-1">{sessionType}</div>
        </div>
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="glass rounded-[3rem] shadow-2xl max-w-md w-full animate-slide-in-up border-none overflow-hidden">
            <div className="p-8">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter italic">Deep Focus</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center hover:bg-black/10 dark:hover:bg-white/10 transition-all"
                >
                  ✕
                </button>
              </div>

              {/* Timer Display */}
              <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[2.5rem] p-12 text-center mb-8 relative overflow-hidden shadow-2xl shadow-blue-500/20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                <div className="text-7xl font-black text-white font-mono tracking-tighter">
                  {formatTime()}
                </div>
                <p className="text-[10px] font-black text-blue-100 mt-6 uppercase tracking-[0.4em] bg-white/20 inline-block px-4 py-1.5 rounded-full backdrop-blur-md">
                  {sessionType === 'work' ? '⚡ Flow State' : '☕ Recharge'}
                </p>
              </div>

              {/* Subject Selection */}
              {sessionType === 'work' && (
                <div className="mb-8">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3 ml-2">
                    Current Mission
                  </label>
                  <select
                    value={selectedSubject}
                    onChange={(e) => setSelectedSubject(e.target.value)}
                    className="w-full px-5 py-4 bg-white/40 dark:bg-black/20 border border-white/20 dark:border-white/5 rounded-2xl text-gray-900 dark:text-white font-bold text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 appearance-none cursor-pointer"
                  >
                    <option value="" className="bg-white dark:bg-gray-800">Assign Subject...</option>
                    {allSubjects.map((subject) => (
                      <option key={subject.id} value={subject.id} className="bg-white dark:bg-gray-800">
                        {subject.id}: {subject.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Controls */}
              <div className="flex gap-4 mb-4">
                <button
                  onClick={() => setIsRunning(!isRunning)}
                  className={`flex-[2] py-5 px-8 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition-all shadow-xl active:scale-95 ${
                    isRunning 
                    ? 'bg-orange-500 text-white shadow-orange-500/20' 
                    : 'bg-blue-600 text-white shadow-blue-600/20'
                  }`}
                >
                  {isRunning ? (
                    <>
                      <Pause className="w-5 h-5 fill-current" /> Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-5 h-5 fill-current" /> Ignite
                    </>
                  )}
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 bg-white/40 dark:bg-white/5 hover:bg-white/60 dark:hover:bg-white/10 text-gray-900 dark:text-white py-5 px-4 rounded-2xl flex items-center justify-center transition-all border border-white/20 dark:border-white/5 active:scale-95"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>

              {sessionType === 'work' && selectedSubject && !isRunning && (
                <button
                  onClick={handleSessionEnd}
                  className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white font-black uppercase tracking-widest text-xs py-5 px-4 rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-green-500/20 active:scale-95"
                >
                  <LogOut className="w-5 h-5" /> Harvest Session
                </button>
              )}

              {/* Info */}
              <p className="text-[9px] font-black text-gray-400 text-center mt-8 uppercase tracking-widest leading-relaxed">
                {sessionType === 'work'
                  ? 'Deep work sessions are automatically logged upon completion.'
                  : 'Time to step away and reset your neural networks.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}