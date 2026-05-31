import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Github, Mail, Lock } from 'lucide-react';

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Reset form when toggling modes
  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setEmail('');
    setPassword('');
    setError(null);
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) {
        setError(error.message);
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

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-transparent">
      <div className="glass p-10 rounded-[3rem] shadow-2xl max-w-md w-full animate-slide-in-up border-none">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-gray-900 dark:text-white uppercase tracking-tighter italic mb-2">
            {isSignUp ? 'Create Account' : 'Welcome Back'}
          </h2>
          <p className="text-gray-500 text-sm font-medium">
            {isSignUp ? 'Start your engineering journey today.' : 'Log in to continue your mission.'}
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

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 text-white font-black uppercase tracking-widest text-sm rounded-2xl transition-all shadow-xl active:scale-95 ${
              isSignUp ? 'bg-green-600 hover:bg-green-700 shadow-green-600/20' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-600/20'
            }`}
          >
            {loading ? 'Processing...' : (isSignUp ? 'Sign Up' : 'Sign In')}
          </button>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200 dark:border-gray-700"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white/50 dark:bg-gray-800/50 px-2 text-gray-400 font-bold tracking-widest">Or</span>
          </div>
        </div>

        <button
          onClick={handleGitHubLogin}
          className="w-full py-4 bg-gray-900 dark:bg-white text-white dark:text-black font-black uppercase tracking-widest text-sm rounded-2xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3"
        >
          <Github className="w-5 h-5" />
          Continue with GitHub
        </button>

        <button
          onClick={toggleMode}
          className="w-full mt-8 text-center text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
        >
          {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
        </button>
      </div>
    </div>
  );
}