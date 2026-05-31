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
        {/* ... (rest of the header remains the same) */}
          <div className="flex items-center gap-3">
            {/* ... (user auth stuff) */}
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
      </header>
      {showFeedback && <FeedbackModal onClose={() => setShowFeedback(false)} />}
    </>
  );
}