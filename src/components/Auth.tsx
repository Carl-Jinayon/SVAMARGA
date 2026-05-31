import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Github, Mail, Lock } from 'lucide-react';

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (isSignUp) {
      await supabase.auth.signUp({ email, password });
    } else {
      await supabase.auth.signInWithPassword({ email, password });
    }
    setLoading(false);
  };

  const handleGitHubLogin = async () => {
    await supabase.auth.signInWithOAuth({ provider: 'github' });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-transparent">
      <div className="glass p-10 rounded-[3rem] shadow-2xl max-w-md w-full animate-slide-in-up border-none">
        <h2 className="text-3xl font-black text-gray-900 dark:text-white mb-8 uppercase tracking-tighter italic text-center">
          {isSignUp ? 'Join Tracker' : 'Welcome Back'}
        </h2>

        <form onSubmit={handleAuth} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full pl-12 pr-4 py-4 bg-white/40 dark:bg-black/20 border border-white/20 dark:border-white/5 rounded-2xl text-gray-900 dark:text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-sm rounded-2xl transition-all shadow-xl shadow-blue-600/20 active:scale-95"
          >
            {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
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
          onClick={() => setIsSignUp(!isSignUp)}
          className="w-full mt-8 text-center text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
        >
          {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
        </button>
      </div>
    </div>
  );
}
