import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useTrackerStore } from '../store/useTrackerStore';
import { curriculum } from '../data/curriculum';
import { Play, Pause, RotateCcw, LogOut, Timer, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SessionTimer() {
  const { addSession, dailyStudyHours } = useTrackerStore();
  const defaultWorkMinutes = dailyStudyHours * 60;

  const [isRunning, setIsRunning] = useState(false);
  const [sessionMinutes, setSessionMinutes] = useState(defaultWorkMinutes);
  const [sessionSeconds, setSessionSeconds] = useState(0);
  const [sessionType, setSessionType] = useState<'work' | 'break'>('work');
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [showModal, setShowModal] = useState(false);

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
            setSessionMinutes(defaultWorkMinutes);
          }
          setSessionSeconds(0);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, sessionMinutes, sessionSeconds, sessionType]);

  const playNotification = () => {
    // Wake-up alarm style using Web Audio API
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const playBeepPattern = (startTime: number) => {
      // 4 quick beeps like a digital alarm clock
      for (let i = 0; i < 4; i++) {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        // Piercing alarm frequency
        oscillator.frequency.value = 880; // A5
        oscillator.type = 'square'; // Harsher sound for an alarm
        
        const beepStart = startTime + (i * 0.15);
        const beepEnd = beepStart + 0.1;
        
        // Envelope to prevent clicking and make it sound punchy
        gainNode.gain.setValueAtTime(0, beepStart);
        gainNode.gain.linearRampToValueAtTime(0.5, beepStart + 0.01);
        gainNode.gain.setValueAtTime(0.5, beepEnd - 0.01);
        gainNode.gain.linearRampToValueAtTime(0, beepEnd);
        
        oscillator.start(beepStart);
        oscillator.stop(beepEnd);
      }
    };

    const now = audioContext.currentTime;
    // Repeat the 4-beep pattern 5 times
    for (let j = 0; j < 5; j++) {
      playBeepPattern(now + (j * 1.0));
    }
  };

  const formatTime = () => {
    const mins = String(sessionMinutes).padStart(2, '0');
    const secs = String(sessionSeconds).padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const handleReset = () => {
    setIsRunning(false);
    if (sessionType === 'work') {
      setSessionMinutes(defaultWorkMinutes);
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

  // Progress for circular ring
  const totalSecs = sessionType === 'work' ? defaultWorkMinutes * 60 : 5 * 60;
  const remaining = sessionMinutes * 60 + sessionSeconds;
  const progressPct = 1 - remaining / totalSecs;
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference * (1 - progressPct);

  return (
    <>
      {/* Floating Button */}
      <motion.button
        onClick={() => setShowModal(!showModal)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        id="session-timer-toggle"
        className="timer-float rounded-2xl p-4 flex items-center gap-3 transition-all"
        title="Open session timer"
        aria-label="Open session timer"
      >
        <Timer className="w-4 h-4 text-white/80" />
        <div className="text-center">
          <div className="text-xl font-black font-mono tracking-tight text-white leading-none">
            {formatTime()}
          </div>
          <div className="text-[9px] font-bold uppercase tracking-widest text-white/60 mt-0.5">
            {sessionType}
          </div>
        </div>
        {isRunning && (
          <div className="w-2 h-2 rounded-full bg-cyan-accent animate-pulse" />
        )}
      </motion.button>

      {/* Modal */}
      {createPortal(
        <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-5"
            style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)' }}
            onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
          >
            <motion.div
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.88, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 20, mass: 0.9 }}
              className="glass-heavy rounded-3xl max-w-sm w-full overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-7 pt-7 pb-2">
                <div>
                  <h3 className="text-lg font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>
                    Deep Focus
                  </h3>
                  <p className="text-xs font-medium mt-0.5" style={{ color: 'var(--text-muted)' }}>
                    {sessionType === 'work' ? '⚡ Flow State Active' : '☕ Recovery Mode'}
                  </p>
                </div>
                <motion.button
                  onClick={() => setShowModal(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-8 h-8 rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--border-subtle)', color: 'var(--text-muted)' }}
                  aria-label="Close timer"
                >
                  <X className="w-4 h-4" />
                </motion.button>
              </div>

              {/* Timer Ring */}
              <div className="flex items-center justify-center py-8">
                <div className="relative">
                  <svg width="140" height="140" style={{ transform: 'rotate(-90deg)' }}>
                    {/* Track */}
                    <circle
                      cx="70" cy="70" r={radius}
                      fill="none"
                      stroke={sessionType === 'work' ? 'rgba(0,229,255,0.1)' : 'rgba(29,158,117,0.1)'}
                      strokeWidth="6"
                    />
                    {/* Progress */}
                    <motion.circle
                      cx="70" cy="70" r={radius}
                      fill="none"
                      stroke={sessionType === 'work' ? '#00E5FF' : '#1D9E75'}
                      strokeWidth="6"
                      strokeLinecap="round"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeOffset}
                      style={{ filter: `drop-shadow(0 0 6px ${sessionType === 'work' ? 'rgba(0,229,255,0.5)' : 'rgba(29,158,117,0.5)'})` }}
                    />
                  </svg>
                  {/* Time Display */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black font-mono tracking-tight" style={{ color: 'var(--text-primary)' }}>
                      {formatTime()}
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-widest mt-1" style={{ color: 'var(--text-muted)' }}>
                      {sessionType === 'work' ? 'Focus' : 'Break'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-7 pb-7 space-y-4">
                {/* Subject Selection */}
                {sessionType === 'work' && (
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)' }}>
                      Current Mission
                    </label>
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="input-glass w-full px-4 py-3 text-sm"
                      style={{ textTransform: 'none' }}
                    >
                      <option value="">Assign Subject…</option>
                      {allSubjects.map((subject) => (
                        <option key={subject.id} value={subject.id}>
                          {subject.id}: {subject.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Controls */}
                <div className="flex gap-3">
                  <motion.button
                    onClick={() => setIsRunning(!isRunning)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex-[2] py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white flex items-center justify-center gap-2 transition-all"
                    style={{
                      background: isRunning
                        ? 'linear-gradient(135deg, #C2410C, #EA580C)'
                        : 'linear-gradient(135deg, #007AA0, #00E5FF)',
                      boxShadow: isRunning
                        ? '0 4px 16px rgba(234,88,12,0.3)'
                        : '0 4px 16px rgba(0,229,255,0.3)',
                    }}
                  >
                    {isRunning ? (
                      <><Pause className="w-4 h-4 fill-current" /> Pause</>
                    ) : (
                      <><Play className="w-4 h-4 fill-current" /> Ignite</>
                    )}
                  </motion.button>
                  <motion.button
                    onClick={handleReset}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex-1 py-3.5 rounded-xl flex items-center justify-center transition-all"
                    style={{
                      background: 'var(--border-subtle)',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border-subtle)',
                    }}
                    aria-label="Reset timer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </motion.button>
                </div>

                {/* Harvest Session */}
                <AnimatePresence>
                  {sessionType === 'work' && selectedSubject && !isRunning && (
                    <motion.button
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      onClick={handleSessionEnd}
                      className="w-full py-3.5 rounded-xl font-bold text-xs uppercase tracking-wider text-white flex items-center justify-center gap-2 transition-all"
                      style={{
                        background: 'linear-gradient(135deg, #16896B, #1D9E75)',
                        boxShadow: '0 4px 16px rgba(29,158,117,0.3)',
                      }}
                    >
                      <LogOut className="w-4 h-4" /> Harvest Session
                    </motion.button>
                  )}
                </AnimatePresence>

                {/* Info */}
                <p className="text-[9px] font-medium text-center leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {sessionType === 'work'
                    ? 'Deep work sessions are automatically logged upon completion.'
                    : 'Time to step away and reset your neural networks.'}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>,
      document.body
    )}
    </>
  );
}