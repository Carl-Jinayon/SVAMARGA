import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Github, Mail, Lock } from 'lucide-react';

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset form when toggling modes
  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setIsReset(false);
    setEmail('');
    setPassword('');
    setError(null);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    if (isReset) {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });
      if (error) {
        setError(error.message);
      } else {
        setResetSent(true);
      }
    } else if (isSignUp) {
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
      } else if (data.user && data.user.identities && data.user.identities.length === 0) {
        setError('An account with this email already exists. Please sign in instead.');
      } else {
        setEmailSent(true);
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError('Invalid email or password. Please check your credentials.');
      }
    }
    setLoading(false);
  };

  const handleGitHubLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'github' });
    if (error) setError(error.message);
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ 
      provider: 'google',
      options: {
        queryParams: {
          access_type: 'offline',
          prompt: 'select_account',
        },
      }
    });
    if (error) setError(error.message);
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-transparent">
        <div className="glass p-10 rounded-[3rem] shadow-2xl max-w-md w-full text-center animate-slide-in-up border-none">
          <Mail className="w-16 h-16 text-blue-500 mx-auto mb-6" />
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tighter">Check your email</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
            We've sent a confirmation link to <strong className="text-blue-600">{email}</strong>. Please click the link to activate your account.
          </p>
          <button
            onClick={() => setEmailSent(false)}
            className="w-full mt-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-widest text-sm rounded-2xl transition-all hover:scale-105 active:scale-95"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  if (resetSent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-transparent">
        <div className="glass p-10 rounded-[3rem] shadow-2xl max-w-md w-full text-center animate-slide-in-up border-none">
          <Mail className="w-16 h-16 text-blue-500 mx-auto mb-6" />
          <h2 className="text-2xl font-black text-gray-900 dark:text-white mb-4 uppercase tracking-tighter">Check your inbox</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
            If an account exists for <strong className="text-blue-600">{email}</strong>, you will receive a recovery link shortly.
          </p>
          <button
            onClick={() => { setResetSent(false); setIsReset(false); }}
            className="w-full mt-8 py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-widest text-sm rounded-2xl transition-all hover:scale-105 active:scale-95"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-transparent">
      <div className="glass p-10 rounded-[3rem] shadow-2xl max-w-md w-full animate-slide-in-up border-none">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter italic mb-2">
            {isReset ? 'Reset' : (isSignUp ? 'Create Account' : 'Welcome Back')}
          </h2>
          <p className="text-gray-500 text-sm font-medium">
            {isReset ? 'Enter your email to recover your account.' : (isSignUp ? 'Start your engineering journey today.' : 'Log in to continue your mission.')}
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-bold text-center">
              {error}
            </div>
          )}
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(null); }}
              placeholder="Email address"
              className="w-full pl-12 pr-4 py-4 bg-white/40 dark:bg-black/20 border border-white/20 dark:border-white/5 rounded-2xl text-gray-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              required
            />
          </div>
          
          {!isReset && (
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(null); }}
                placeholder="Password"
                className="w-full pl-12 pr-4 py-4 bg-white/40 dark:bg-black/20 border border-white/20 dark:border-white/5 rounded-2xl text-gray-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                required
              />
            </div>
          )}

          {!isReset && !isSignUp && (
            <div className="flex justify-end px-2">
              <button 
                type="button"
                onClick={() => setIsReset(true)}
                className="text-[10px] font-black uppercase text-blue-600 hover:text-blue-700 tracking-widest"
              >
                Forgot Password?
              </button>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 text-white font-black uppercase tracking-widest text-sm rounded-2xl transition-all shadow-xl active:scale-95 ${
              isReset ? 'bg-blue-600 shadow-blue-600/20' : (isSignUp ? 'bg-green-600 hover:bg-green-700 shadow-green-600/20' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20')
            }`}
          >
            {loading ? 'Processing...' : (isReset ? 'Send Reset Link' : (isSignUp ? 'Sign Up' : 'Sign In'))}
          </button>

          {isReset && (
            <button 
              type="button"
              onClick={() => setIsReset(false)}
              className="w-full text-center text-[10px] font-black uppercase text-gray-400 hover:text-gray-600 tracking-widest"
            >
              Back to Sign In
            </button>
          )}
        </form>

        {!isReset && (
          <>
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white/50 dark:bg-gray-800/50 px-2 text-gray-400 font-bold tracking-widest">Or</span>
              </div>
            </div>

            <div className="space-y-4">
              <button
                onClick={handleGoogleLogin}
                className="w-full py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-lg"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.16H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.84l3.66-2.75z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.16l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>

              <button
                onClick={handleGitHubLogin}
                className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-widest text-[10px] rounded-2xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-lg"
              >
                <Github className="w-4 h-4" />
                Continue with GitHub
              </button>
            </div>

            <button
              onClick={toggleMode}
              className="w-full mt-8 text-center text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
            >
              {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}
