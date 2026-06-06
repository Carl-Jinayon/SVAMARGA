import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useTrackerStore } from '../store/useTrackerStore';
import { User as UserIcon, Shield, Sliders, LogOut, Camera, AlertTriangle, Moon, Sun, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type SettingsTab = 'profile' | 'account' | 'preferences';

export default function AccountSettings() {
  const { user, darkMode, toggleDarkMode, dailyStudyHours, setDailyStudyHours, signOut } = useTrackerStore();
  const [activeTab, setActiveTab] = useState<SettingsTab>('profile');
  
  // Profile State
  const [fullName, setFullName] = useState(user?.user_metadata?.full_name || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.user_metadata?.avatar_url || '');
  const [profileSaving, setProfileSaving] = useState(false);
  const [profileMessage, setProfileMessage] = useState('');

  // Account State
  const [newEmail, setNewEmail] = useState(user?.email || '');
  const [newPassword, setNewPassword] = useState('');
  const [accountSaving, setAccountSaving] = useState(false);
  const [accountMessage, setAccountMessage] = useState('');

  const isEmailAuth = user?.app_metadata?.provider === 'email';

  const handleUpdateProfile = async () => {
    setProfileSaving(true);
    setProfileMessage('');
    const { error } = await supabase.auth.updateUser({
      data: { full_name: fullName, avatar_url: avatarUrl }
    });
    setProfileSaving(false);
    if (error) {
      setProfileMessage(`Error: ${error.message}`);
    } else {
      setProfileMessage('Profile updated successfully.');
    }
  };

  const handleUpdateAccount = async () => {
    setAccountSaving(true);
    setAccountMessage('');
    
    let updates: { email?: string; password?: string } = {};
    if (newEmail !== user?.email) updates.email = newEmail;
    if (newPassword.trim().length > 0) updates.password = newPassword;

    if (Object.keys(updates).length > 0) {
      const { error } = await supabase.auth.updateUser(updates);
      if (error) {
        setAccountMessage(`Error: ${error.message}`);
      } else {
        setAccountMessage('Account updated. Check your email for confirmation if you changed your email address.');
        setNewPassword('');
      }
    } else {
      setAccountMessage('No changes made.');
    }
    setAccountSaving(false);
  };

  if (!user) return null;

  return (
    <div className="space-y-6 pb-20 animate-slide-in-up">
      {/* Header */}
      <div>
        <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight flex items-center gap-3" style={{ color: 'var(--text-primary)' }}>
          <Sliders className="w-5 h-5 sm:w-6 sm:h-6" style={{ color: 'var(--accent-cyan)' }} />
          Account Settings
        </h2>
        <p className="text-[10px] font-bold uppercase tracking-widest mt-1" style={{ color: 'var(--text-muted)' }}>
          Manage your profile, preferences, and security
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Sidebar Nav */}
        <div className="glass rounded-3xl p-4 lg:p-6 border-none shadow-2xl flex flex-col gap-2 h-fit">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left p-3 sm:p-4 rounded-2xl transition-all border flex items-center gap-3 ${activeTab === 'profile' ? 'bg-black/5 dark:bg-white/5 border-cyan-500/30' : 'border-transparent hover:bg-black/5 dark:hover:bg-white/5'}`}
            style={{ color: activeTab === 'profile' ? 'var(--accent-cyan)' : 'var(--text-secondary)' }}
          >
            <UserIcon className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-widest">Public Profile</span>
          </button>
          <button
            onClick={() => setActiveTab('account')}
            className={`w-full text-left p-3 sm:p-4 rounded-2xl transition-all border flex items-center gap-3 ${activeTab === 'account' ? 'bg-black/5 dark:bg-white/5 border-cyan-500/30' : 'border-transparent hover:bg-black/5 dark:hover:bg-white/5'}`}
            style={{ color: activeTab === 'account' ? 'var(--accent-cyan)' : 'var(--text-secondary)' }}
          >
            <Shield className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-widest">Account & Security</span>
          </button>
          <button
            onClick={() => setActiveTab('preferences')}
            className={`w-full text-left p-3 sm:p-4 rounded-2xl transition-all border flex items-center gap-3 ${activeTab === 'preferences' ? 'bg-black/5 dark:bg-white/5 border-cyan-500/30' : 'border-transparent hover:bg-black/5 dark:hover:bg-white/5'}`}
            style={{ color: activeTab === 'preferences' ? 'var(--accent-cyan)' : 'var(--text-secondary)' }}
          >
            <Sliders className="w-4 h-4" />
            <span className="text-[11px] font-bold uppercase tracking-widest">Preferences</span>
          </button>
          
          <div className="mt-8 border-t pt-4" style={{ borderColor: 'var(--border-subtle)' }}>
            <button
              onClick={signOut}
              className="w-full text-left p-3 sm:p-4 rounded-2xl transition-all border border-transparent flex items-center gap-3 hover:bg-red-500/10 text-red-500"
            >
              <LogOut className="w-4 h-4" />
              <span className="text-[11px] font-bold uppercase tracking-widest">Sign Out</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="lg:col-span-3 glass rounded-3xl p-6 lg:p-10 border-none shadow-2xl relative overflow-hidden min-h-[500px]">
          <AnimatePresence mode="wait">
            
            {/* PROFILE TAB */}
            {activeTab === 'profile' && (
              <motion.div
                key="profile"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-8 max-w-xl"
              >
                <div>
                  <h3 className="text-xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Public Profile</h3>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>This information will be displayed publicly on your portfolio.</p>
                </div>

                <div className="flex items-center gap-6">
                  <div className="relative">
                    {avatarUrl ? (
                      <img src={avatarUrl} alt="Avatar" className="w-24 h-24 rounded-full object-cover shadow-lg border-2 border-cyan-500/30" />
                    ) : (
                      <div className="w-24 h-24 rounded-full shadow-lg border-2 border-cyan-500/30 flex items-center justify-center bg-black/5 dark:bg-white/5">
                        <UserIcon className="w-8 h-8 text-cyan-500 opacity-50" />
                      </div>
                    )}
                    <div className="absolute bottom-0 right-0 bg-cyan-500 text-white p-2 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform">
                      <Camera className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="text-[9px] font-black uppercase tracking-widest mb-1.5 block" style={{ color: 'var(--text-muted)' }}>Avatar URL</label>
                    <input
                      type="url"
                      value={avatarUrl}
                      onChange={e => setAvatarUrl(e.target.value)}
                      placeholder="https://example.com/avatar.jpg"
                      className="input-glass w-full p-3 text-sm"
                      style={{ textTransform: 'none' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest mb-1.5 block" style={{ color: 'var(--text-muted)' }}>Display Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={e => setFullName(e.target.value)}
                    placeholder="Your Full Name"
                    className="input-glass w-full p-4 text-sm"
                    style={{ textTransform: 'none' }}
                  />
                </div>

                {profileMessage && (
                  <p className={`text-xs font-bold px-4 py-2 rounded-xl ${profileMessage.includes('Error') ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                    {profileMessage}
                  </p>
                )}

                <button
                  onClick={handleUpdateProfile}
                  disabled={profileSaving}
                  className="px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all text-white disabled:opacity-40"
                  style={{ background: 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-violet) 100%)' }}
                >
                  {profileSaving ? 'Saving...' : 'Save Profile'}
                </button>
              </motion.div>
            )}

            {/* ACCOUNT TAB */}
            {activeTab === 'account' && (
              <motion.div
                key="account"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-8 max-w-xl"
              >
                <div>
                  <h3 className="text-xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Account & Security</h3>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Manage your login credentials and account status.</p>
                </div>

                {!isEmailAuth && (
                  <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20">
                    <p className="text-xs font-bold text-cyan-500">
                      You are logged in via a third-party provider ({user.app_metadata.provider}). Password changes are managed by your provider.
                    </p>
                  </div>
                )}

                <div>
                  <label className="text-[9px] font-black uppercase tracking-widest mb-1.5 block" style={{ color: 'var(--text-muted)' }}>Email Address</label>
                  <input
                    type="email"
                    value={newEmail}
                    onChange={e => setNewEmail(e.target.value)}
                    className="input-glass w-full p-4 text-sm"
                    style={{ textTransform: 'none' }}
                  />
                </div>

                {isEmailAuth && (
                  <div>
                    <label className="text-[9px] font-black uppercase tracking-widest mb-1.5 block" style={{ color: 'var(--text-muted)' }}>New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={e => setNewPassword(e.target.value)}
                      placeholder="Leave blank to keep current password"
                      className="input-glass w-full p-4 text-sm"
                      style={{ textTransform: 'none' }}
                    />
                  </div>
                )}

                {accountMessage && (
                  <p className={`text-xs font-bold px-4 py-2 rounded-xl ${accountMessage.includes('Error') ? 'bg-red-500/10 text-red-500' : 'bg-green-500/10 text-green-500'}`}>
                    {accountMessage}
                  </p>
                )}

                <button
                  onClick={handleUpdateAccount}
                  disabled={accountSaving || (!isEmailAuth && newEmail === user?.email)}
                  className="px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs shadow-xl active:scale-95 transition-all text-white disabled:opacity-40"
                  style={{ background: 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-violet) 100%)' }}
                >
                  {accountSaving ? 'Saving...' : 'Update Account'}
                </button>

                <div className="mt-12 pt-8 border-t border-red-500/20">
                  <h4 className="text-red-500 font-black uppercase tracking-widest text-xs mb-2 flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4" /> Danger Zone
                  </h4>
                  <p className="text-xs text-red-500/70 mb-4">Once you delete your account, there is no going back. Please be certain.</p>
                  <button
                    className="px-6 py-3 rounded-xl font-black uppercase tracking-widest text-xs border border-red-500/50 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
                  >
                    Delete Account
                  </button>
                </div>
              </motion.div>
            )}

            {/* PREFERENCES TAB */}
            {activeTab === 'preferences' && (
              <motion.div
                key="preferences"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-8 max-w-xl"
              >
                <div>
                  <h3 className="text-xl font-black tracking-tight" style={{ color: 'var(--text-primary)' }}>Preferences</h3>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>Customize your application experience.</p>
                </div>

                <div className="p-6 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                        <Moon className="w-4 h-4 text-indigo-400" /> Dark Mode
                      </h4>
                      <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>Switch between light and dark themes.</p>
                    </div>
                    <button
                      onClick={toggleDarkMode}
                      className="relative w-14 h-8 rounded-full transition-colors flex items-center px-1"
                      style={{ background: darkMode ? 'var(--accent-violet)' : 'rgba(0,0,0,0.2)' }}
                    >
                      <motion.div
                        className="w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md"
                        animate={{ x: darkMode ? 24 : 0 }}
                        transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      >
                        {darkMode ? <Moon className="w-3 h-3 text-violet-500" /> : <Sun className="w-3 h-3 text-orange-500" />}
                      </motion.div>
                    </button>
                  </div>
                </div>

                <div className="p-6 rounded-3xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 space-y-4">
                  <h4 className="text-sm font-bold flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                    <Clock className="w-4 h-4 text-cyan-500" /> Daily Study Goal
                  </h4>
                  <p className="text-xs mt-1 mb-4" style={{ color: 'var(--text-secondary)' }}>Set your target study hours per day. This helps you track consistency.</p>
                  
                  <div className="flex items-center gap-4">
                    <input
                      type="range"
                      min="1"
                      max="12"
                      value={dailyStudyHours}
                      onChange={(e) => setDailyStudyHours(Number(e.target.value))}
                      className="flex-1 accent-cyan-500"
                    />
                    <div className="w-16 h-12 rounded-xl bg-black/10 dark:bg-white/10 flex items-center justify-center text-sm font-black text-cyan-500">
                      {dailyStudyHours}h
                    </div>
                  </div>
                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
