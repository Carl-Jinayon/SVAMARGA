import { Moon, Sun, CloudOff, Github } from 'lucide-react';
import { useTrackerStore } from '../store/useTrackerStore';

interface HeaderProps {
  onToggleDarkMode: () => void;
}

export default function Header({ onToggleDarkMode }: HeaderProps) {
  const { user, signIn, signInWithGoogle, signOut } = useTrackerStore();

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-blue-700 flex items-center justify-center text-xl shadow-lg shadow-indigo-500/20 text-white font-black italic">
                SV
              </div>
              <div>
                <h1 className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-blue-400 dark:from-indigo-400 dark:to-blue-200 uppercase">
                  SVAMARGA
                </h1>
                <p className="text-[10px] text-gray-500 dark:text-gray-400 font-black uppercase tracking-[0.2em]">
                  Full-Stack Architect × ML Engineer
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {user ? (
                <div className="flex items-center gap-3 bg-white/50 dark:bg-black/20 p-1.5 pr-4 rounded-xl border border-white/20">
                  {user.user_metadata.avatar_url ? (
                    <img 
                      src={user.user_metadata.avatar_url} 
                      alt={user.email} 
                      className="w-8 h-8 rounded-lg shadow-sm"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center text-white font-black text-xs">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div className="hidden md:block">
                    <p className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 leading-none mb-0.5">Logged In</p>
                    <p className="text-xs font-bold text-gray-700 dark:text-gray-300 leading-none">{user.user_metadata.full_name || user.email}</p>
                  </div>
                  <button 
                    onClick={signOut}
                    className="ml-2 text-gray-400 hover:text-red-500 transition-colors"
                    title="Sign Out"
                  >
                    <CloudOff className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={signInWithGoogle}
                    className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-md active:scale-95"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.16H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.84l3.66-2.75z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.16l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    <span>Google</span>
                  </button>
                  <button
                    onClick={signIn}
                    className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-xl text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all shadow-md active:scale-95"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                  </button>
                </div>
              )}
              <button
                onClick={onToggleDarkMode}
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-700"
                title="Toggle dark mode"
              >
                <Sun className="w-5 h-5 text-gray-600 dark:hidden" />
                <Moon className="w-5 h-5 hidden dark:block text-gray-400" />
              </button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
