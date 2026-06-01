import { Moon, Sun, CloudOff, Github, MessageSquare } from 'lucide-react';
import { useTrackerStore } from '../store/useTrackerStore';
import { useState } from 'react';
import FeedbackModal from './FeedbackModal';

interface HeaderProps {
  onToggleDarkMode: () => void;
}

export default function Header({ onToggleDarkMode }: HeaderProps) {
  const { user, signIn, signOut } = useTrackerStore();
  const [showFeedback, setShowFeedback] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
        <div className="max-w-screen-2xl mx-auto px-6 sm:px-12 lg:px-20">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-xl shadow-lg shadow-blue-500/20">
                🚀
              </div>
              <div>
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 dark:from-blue-400 dark:to-blue-200">
                  CS Ultimate Tracker
                </h1>
                <p className="text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                  Full-Stack → ML Engineering
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
                <button
                  onClick={signIn}
                  className="flex items-center gap-2 px-4 py-2 bg-black dark:bg-white text-white dark:text-black rounded-xl text-xs font-black uppercase tracking-widest hover:scale-105 transition-all shadow-lg active:scale-95"
                >
                  <Github className="w-4 h-4" />
                  <span>Sync Cloud</span>
                </button>
              )}
              <button
                onClick={() => setShowFeedback(true)}
                className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-700"
                title="Send Feedback"
              >
                <MessageSquare className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
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
      {showFeedback && <FeedbackModal onClose={() => setShowFeedback(false)} />}
    </>
  );
}