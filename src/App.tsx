import { useEffect, useState, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import PublicProfile from './components/PublicProfile';
import ResetPassword from './components/ResetPassword';
import { BookOpen, BarChart3, Calendar, Briefcase, MessageSquare, Info } from 'lucide-react';
import { supabase } from './lib/supabase';

type TabType = 'dashboard' | 'curriculum' | 'about' | 'analytics' | 'planner' | 'career' | 'inbox';

function MainApp() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const { darkMode, toggleDarkMode, loadFromStorage, user, messages = [], fetchMessages } = useTrackerStore();

  // Initialize theme synchronously before render
  useEffect(() => {
    loadFromStorage();
  }, [loadFromStorage]);

  // Sync dark mode class with state changes
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Fetch messages for notification dot
  useEffect(() => {
    if (user) {
      fetchMessages();
      const interval = setInterval(fetchMessages, 10000);
      return () => clearInterval(interval);
    }
  }, [user, fetchMessages]);

  const hasUnread = useMemo(() => {
    if (!user) return false;
    const ADMIN_ID = '06391879-d280-472e-b253-7e0685bf1014';
    const isAdmin = user.id === ADMIN_ID;

    return messages.some(m => {
      if (m.is_read) return false;
      const isFromMe = isAdmin ? m.sender_role === 'admin' : m.sender_role === 'user';
      return !isFromMe;
    });
  }, [messages, user]);

  // Clear notifications when entering the Inbox tab
  useEffect(() => {
    if (activeTab === 'inbox' && user && hasUnread) {
      const markAllAsRead = async () => {
        const ADMIN_ID = '06391879-d280-472e-b253-7e0685bf1014';
        const isAdmin = user.id === ADMIN_ID;

        const unreadIds = messages
          .filter(m => {
            if (m.is_read) return false;
            const isFromMe = isAdmin ? m.sender_role === 'admin' : m.sender_role === 'user';
            return !isFromMe;
          })
          .map(m => m.id);

        if (unreadIds.length > 0) {
          await supabase.from('inbox').update({ is_read: true }).in('id', unreadIds);
          fetchMessages();
        }
      };
      markAllAsRead();
    }
  }, [activeTab, user, hasUnread, messages, fetchMessages]);

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
                  className={`flex items-center gap-2 px-6 py-2.5 text-sm font-black uppercase tracking-widest whitespace-nowrap rounded-2xl transition-all duration-300 relative ${
                    activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-[0_10px_20px_rgba(37,99,235,0.3)] scale-105'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-white/40 dark:hover:bg-gray-800/40'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                  {tab.id === 'inbox' && hasUnread && (
                    <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-white dark:border-gray-900 shadow-sm" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12 py-10 pt-48 relative z-10">
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
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400 dark:text-gray-500">SVAMARGA OS v1.0</p>
            <div className="mt-6 mb-8 max-w-md mx-auto p-6 bg-red-600/5 dark:bg-red-600/10 rounded-3xl border border-red-600/20">
              <h4 className="text-lg font-black uppercase tracking-tighter text-red-600 dark:text-red-500 mb-2">Your University Sucks?</h4>
              <p className="text-xs font-bold text-gray-600 dark:text-gray-400 leading-relaxed uppercase tracking-widest">
                Don't wait for a degree to validate your <span className="text-blue-600 dark:text-blue-400">genius</span>. Build the future of <span className="text-indigo-600 dark:text-indigo-400">Intelligence</span> here.
              </p>
            </div>
            <p className="mt-4 text-[10px] font-black uppercase tracking-widest text-gray-600 dark:text-gray-400">
              Forging the next generation of <span className="text-blue-600 dark:text-blue-400">Master Engineers</span>
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/profile/:id" element={<PublicProfile />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/*" element={<MainApp />} />
      </Routes>
    </Router>
  );
}

export default App;
