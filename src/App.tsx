import { useEffect, useState } from 'react';
import { useTrackerStore } from './store/useTrackerStore';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import CurriculumViewer from './components/CurriculumViewer';
import SessionTimer from './components/SessionTimer';
import Analytics from './components/Analytics';
import Planner from './components/Planner';
import CareerTools from './components/CareerTools';
import Auth from './components/Auth';
import Inbox from './components/Inbox';
import About from './components/About';
import { BookOpen, BarChart3, Calendar, Briefcase, MessageSquare, Info } from 'lucide-react';

type TabType = 'dashboard' | 'curriculum' | 'about' | 'analytics' | 'planner' | 'career' | 'inbox';


function App() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const { darkMode, toggleDarkMode, loadFromStorage, user } = useTrackerStore();

  // Initialize theme synchronously before render
  useEffect(() => {
    loadFromStorage();
  }, []);

  // Sync dark mode class with state changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  if (!user) {
    return (
      <div className={darkMode ? 'dark' : ''}>
        <div className="min-h-screen bg-transparent transition-colors relative">
          <Auth />
        </div>
      </div>
    );
  }

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'curriculum', label: 'Curriculum', icon: <BookOpen className="w-4 h-4" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'planner', label: 'Planner', icon: <Calendar className="w-4 h-4" /> },
    { id: 'career', label: 'Career', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'inbox', label: 'Inbox', icon: <MessageSquare className="w-4 h-4" /> },
    { id: 'about', label: 'About', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-transparent transition-colors relative">
        <Header onToggleDarkMode={toggleDarkMode} />

        <div className="sticky top-20 z-40 backdrop-blur-xl bg-white/30 dark:bg-gray-900/30 border-b border-white/20 dark:border-gray-800/20 shadow-xl">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12">
            <div className="flex gap-2 justify-center overflow-x-auto py-3 no-scrollbar">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-2.5 text-sm font-black uppercase tracking-widest whitespace-nowrap rounded-2xl transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-[0_10px_20px_rgba(37,99,235,0.3)] scale-105'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-white/40 dark:hover:bg-gray-800/40'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 py-10 pt-32 relative z-10">
          <div className="animate-slide-in-up">
            {activeTab === 'dashboard' && <Dashboard />}
            {activeTab === 'curriculum' && <CurriculumViewer />}
            {activeTab === 'about' && <About />}
            {activeTab === 'analytics' && <Analytics />}
            {activeTab === 'planner' && <Planner />}
            {activeTab === 'career' && <CareerTools />}
            {activeTab === 'inbox' && <Inbox />}
          </div>
        </main>

        {/* Floating Timer Button */}
        <div className="fixed bottom-10 right-10 z-50">
          <SessionTimer />
        </div>

        <footer className="backdrop-blur-md bg-white/20 dark:bg-gray-900/20 border-t border-white/10 dark:border-gray-800/10 mt-20 py-12">
          <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400 dark:text-gray-500">CS Ultimate Tracker v1.0</p>
            <p className="mt-4 text-sm font-bold text-gray-600 dark:text-gray-400">
              Forging the next generation of <span className="text-blue-600 dark:text-blue-400">AI Engineers</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;