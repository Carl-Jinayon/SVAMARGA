import { Moon, Sun } from 'lucide-react';

interface HeaderProps {
  onToggleDarkMode: () => void;
}

export default function Header({ onToggleDarkMode }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
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
    </header>
  );
}