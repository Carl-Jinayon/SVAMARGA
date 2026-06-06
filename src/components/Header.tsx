import { Moon, Sun, CloudOff, Github, Zap } from 'lucide-react';
import { useTrackerStore } from '../store/useTrackerStore';
import { motion } from 'framer-motion';

interface HeaderProps {
  onToggleDarkMode: () => void;
}

export default function Header({ onToggleDarkMode }: HeaderProps) {
  const { user, signIn, signInWithGoogle, signOut } = useTrackerStore();

  return (
    <header className="sticky top-0 z-50 glass-heavy border-b border-white/10 dark:border-white/5">
      <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="relative w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-accent to-violet-soft opacity-90" />
              <Zap className="relative z-10 w-5 h-5 text-white fill-white" />
            </div>
            <div>
              <h1 className="text-base font-black tracking-tight gradient-hero leading-none">
                SVAMARGA
              </h1>
              <p className="text-[9px] font-semibold text-text-muted tracking-[0.18em] mt-0.5 uppercase opacity-70 dark:opacity-60" style={{ color: 'var(--text-muted)' }}>
                Full-Stack · ML · Architecture
              </p>
            </div>
          </motion.div>

          {/* Right Controls */}
          <motion.div
            className="flex items-center gap-2.5"
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            {user ? (
              <div className="flex items-center gap-2.5 glass px-3 py-1.5 rounded-xl">
                {user.user_metadata.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt={user.email}
                    className="w-7 h-7 rounded-lg object-cover ring-1 ring-white/20"
                  />
                ) : (
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-accent to-violet-soft flex items-center justify-center text-white font-bold text-xs">
                    {user.email?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="hidden md:block">
                  <p className="text-[9px] font-bold uppercase tracking-widest leading-none mb-0.5" style={{ color: 'var(--accent-cyan)' }}>
                    Active
                  </p>
                  <p className="text-xs font-semibold leading-none truncate max-w-[140px]" style={{ color: 'var(--text-primary)' }}>
                    {user.user_metadata.full_name || user.email}
                  </p>
                </div>
                <motion.button
                  onClick={signOut}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="ml-1 p-1.5 rounded-lg transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                  title="Sign Out"
                >
                  <CloudOff className="w-3.5 h-3.5 hover:text-red-400 transition-colors" />
                </motion.button>
              </div>
            ) : (
              <div className="flex gap-2">
                <motion.button
                  onClick={signInWithGoogle}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-3.5 py-2 glass rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all"
                  style={{ color: 'var(--text-primary)' }}
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.16H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.84l3.66-2.75z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.16l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </motion.button>
                <motion.button
                  onClick={signIn}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider transition-all text-white"
                  style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <Github className="w-3.5 h-3.5" />
                  GitHub
                </motion.button>
              </div>
            )}

            {/* Theme Toggle */}
            <motion.button
              onClick={onToggleDarkMode}
              whileHover={{ scale: 1.08, rotate: 15 }}
              whileTap={{ scale: 0.92 }}
              id="theme-toggle"
              className="w-9 h-9 rounded-xl glass flex items-center justify-center transition-all"
              title="Toggle dark mode"
              aria-label="Toggle dark mode"
            >
              <Sun className="w-4 h-4 dark:hidden" style={{ color: '#F59E0B' }} />
              <Moon className="w-4 h-4 hidden dark:block" style={{ color: 'var(--accent-cyan)' }} />
            </motion.button>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
