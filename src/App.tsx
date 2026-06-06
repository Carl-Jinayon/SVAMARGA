import { useEffect, useState, useMemo, useRef } from 'react';
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
import AccountSettings from './components/AccountSettings';
import Toast, { ToastData } from './components/Toast';
import { BookOpen, BarChart3, Calendar, Briefcase, MessageSquare, Info, LayoutDashboard, Settings } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type TabType = 'dashboard' | 'curriculum' | 'about' | 'analytics' | 'planner' | 'career' | 'inbox' | 'settings';

function MainApp() {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const { darkMode, toggleDarkMode, loadFromStorage, user, messages = [], fetchMessages } = useTrackerStore();
  // Track whether the user has visited the inbox tab this session
  // (used to hide the nav dot — DB marking happens per-conversation in Inbox.tsx)
  const [inboxVisited, setInboxVisited] = useState(false);
  const [toast, setToast] = useState<ToastData | null>(null);

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

  const hasUnreadInDB = useMemo(() => {
    if (!user) return false;
    return messages.some(m => {
      if (m.is_read) return false;
      return m.user_id !== user.id;
    });
  }, [messages, user]);

  // The nav dot shows if there are unread messages AND the user hasn't visited the inbox yet
  const hasUnread = hasUnreadInDB && !inboxVisited;

  // When user visits the inbox tab, hide the nav dot (but don't mark all as read in DB)
  // Per-conversation read marking happens inside Inbox.tsx via textarea focus
  useEffect(() => {
    if (activeTab === 'inbox' && hasUnreadInDB) {
      setInboxVisited(true);
    }
  }, [activeTab, hasUnreadInDB]);

  // Reset inboxVisited when new messages arrive after the user last visited
  const prevUnreadCount = useRef(0);
  useEffect(() => {
    const unreadMessages = messages.filter(m => !m.is_read && m.user_id !== user?.id);
    const unreadCount = unreadMessages.length;
    
    if (unreadCount > prevUnreadCount.current && activeTab !== 'inbox') {
      setInboxVisited(false);
      
      // Trigger toast for the newest message
      const latestMsg = unreadMessages[unreadMessages.length - 1];
      if (latestMsg) {
        const senderMatch = latestMsg.content.match(/\[Sender:\s*([^\]]+)\]/i);
        const senderName = senderMatch ? senderMatch[1].trim() : 'Someone';
        
        let cleanContent = latestMsg.content
          .replace(/\[Recipient:\s*[^\]\n]+\]/gi, '')
          .replace(/\[Sender:\s*[^\]\n]+\]/gi, '')
          .replace(/\[AdminTo:\s*[^\]\n]+\]/gi, '')
          .replace(/\[Bug Type:\s*[^\]\n]+\]/gi, '')
          .trim();
          
        setToast({
          id: latestMsg.id,
          type: 'inbox',
          message: cleanContent,
          senderName,
          onNavigate: () => setActiveTab('inbox')
        });
      }
    }
    prevUnreadCount.current = unreadCount;
  }, [messages, activeTab, user]);

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
    { id: 'settings',   label: 'Settings',   icon: <Settings className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-transparent relative">
        <Header onToggleDarkMode={toggleDarkMode} />

        {/* Top Tab Navigation (Desktop/Tablet) */}
        <div className="hidden sm:block sticky top-16 z-40 glass-heavy border-b" style={{ borderColor: 'var(--border-subtle)' }}>
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
        <main className="max-w-screen-2xl mx-auto px-5 sm:px-8 lg:px-14 py-8 relative z-10 pb-24 sm:pb-8">
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
              {activeTab === 'settings'   && <AccountSettings />}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Floating Session Timer (Adjusted for bottom nav on mobile) */}
        <div className="fixed bottom-24 sm:bottom-8 right-5 sm:right-8 z-50">
          <SessionTimer />
        </div>

        {/* Bottom Navigation (Mobile Only) */}
        <div className="sm:hidden fixed bottom-0 left-0 right-0 z-50 glass-heavy border-t" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center justify-between px-2 py-2 safe-area-bottom">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={`mobile-tab-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex flex-col items-center justify-center w-full py-1.5 transition-all relative"
                  style={{ color: isActive ? 'var(--accent-cyan)' : 'var(--text-muted)' }}
                >
                  <div className={`mb-1 transition-transform ${isActive ? 'scale-110' : 'scale-100'}`}>
                    {tab.icon}
                  </div>
                  <span className="text-[8px] font-bold uppercase tracking-wider">
                    {tab.label}
                  </span>
                  {tab.id === 'inbox' && hasUnread && (
                    <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-navy-900 animate-pulse" />
                  )}
                </button>
              );
            })}
          </div>
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

        {/* Global Toast */}
        {toast && (
          <Toast
            {...toast}
            onClose={() => setToast(null)}
          />
        )}
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
