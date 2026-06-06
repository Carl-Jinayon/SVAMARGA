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
import { BookOpen, BarChart3, Calendar, Briefcase, MessageSquare, Info, LayoutDashboard } from 'lucide-react';
import { supabase } from './lib/supabase';
import { motion, AnimatePresence } from 'framer-motion';

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

    return messages.some(m => {
      if (m.is_read) return false;
      return m.user_id !== user.id;
    });
  }, [messages, user]);

  // Clear notifications when entering the Inbox tab
  useEffect(() => {
    if (activeTab === 'inbox' && user && hasUnread) {
      const markAllAsRead = async () => {

        const unreadIds = messages
          .filter(m => {
            if (m.is_read) return false;
            return m.user_id !== user.id;
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
        <div className="min-h-screen bg-transparent relative">
          <Auth />
        </div>
      </div>
    );
  }

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'dashboard',  label: 'Dashboard',  icon: <LayoutDashboard className="w-3.5 h-3.5" /> },
    { id: 'curriculum', label: 'Curriculum',  icon: <BookOpen className="w-3.5 h-3.5" /> },
    { id: 'analytics',  label: 'Analytics',  icon: <BarChart3 className="w-3.5 h-3.5" /> },
    { id: 'planner',    label: 'Planner',    icon: <Calendar className="w-3.5 h-3.5" /> },
    { id: 'career',     label: 'Career',     icon: <Briefcase className="w-3.5 h-3.5" /> },
    { id: 'inbox',      label: 'Inbox',      icon: <MessageSquare className="w-3.5 h-3.5" /> },
    { id: 'about',      label: 'About',      icon: <Info className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-transparent relative">
        <Header onToggleDarkMode={toggleDarkMode} />

        {/* Tab Navigation */}
        <div className="sticky top-16 z-40 glass-heavy border-b" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14 relative">
            <div 
              className="flex gap-1 overflow-x-auto no-scrollbar py-2"
              style={{ maskImage: 'linear-gradient(to right, black 85%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to right, black 85%, transparent 100%)' }}
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <motion.button
                    key={tab.id}
                    id={`tab-${tab.id}`}
                    onClick={() => setActiveTab(tab.id)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className={`relative flex items-center gap-2 px-4 py-2 text-xs font-semibold whitespace-nowrap rounded-xl transition-all duration-200 ${
                      isActive
                        ? 'text-white tab-active-glow'
                        : 'hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                    style={isActive ? {
                      background: 'linear-gradient(135deg, #007AA0 0%, #00E5FF 100%)',
                      color: '#fff',
                    } : {
                      color: 'var(--text-secondary)',
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {tab.icon}
                    <span className="tracking-wide">{tab.label}</span>
                    {tab.id === 'inbox' && hasUnread && (
                      <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-navy-900 shadow-sm animate-pulse" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14 py-8 relative z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0, transitionEnd: { transform: "none" } }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeTab === 'dashboard'  && <Dashboard onNavigate={(tab) => setActiveTab(tab as TabType)} />}
              {activeTab === 'curriculum' && <CurriculumViewer />}
              {activeTab === 'about'      && <About />}
              {activeTab === 'analytics'  && <Analytics />}
              {activeTab === 'planner'    && <Planner />}
              {activeTab === 'career'     && <CareerTools />}
              {activeTab === 'inbox'      && <Inbox />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Floating Session Timer */}
        <div className="fixed bottom-8 right-8 z-50">
          <SessionTimer />
        </div>

        {/* Footer */}
        <footer className="glass-heavy border-t mt-16 py-10" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14 text-center">
            <p className="text-[9px] font-bold uppercase tracking-[0.5em]" style={{ color: 'var(--text-muted)' }}>
              SVAMARGA OS v1.0
            </p>
            <div className="mt-5 mb-6 max-w-sm mx-auto p-5 rounded-2xl"
              style={{
                background: 'rgba(239, 68, 68, 0.04)',
                border: '1px solid rgba(239, 68, 68, 0.12)'
              }}
            >
              <h4 className="text-sm font-black tracking-tight text-red-500 mb-1.5">Your University Sucks?</h4>
              <p className="text-[10px] font-medium leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                Don't wait for a degree to validate your{' '}
                <span style={{ color: 'var(--accent-cyan)' }}>genius</span>. Build the future of{' '}
                <span style={{ color: 'var(--accent-violet)' }}>Intelligence</span> here.
              </p>
            </div>
            <p className="text-[9px] font-semibold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
              Forging the next generation of{' '}
              <span style={{ color: 'var(--accent-cyan)' }}>Master Engineers</span>
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
