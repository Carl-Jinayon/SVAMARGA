import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Lock, Check } from 'lucide-react';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setTimeout(() => {
        window.location.href = '/';
      }, 3000);
    }
    setLoading(false);
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-gray-900">
        <div className="glass p-10 rounded-[3rem] shadow-2xl max-w-md w-full text-center border-none">
          <Check className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h2 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">Password Updated</h2>
          <p className="text-sm text-gray-400 font-medium leading-relaxed">
            Your password has been changed successfully. Redirecting you to login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-gray-900">
      <div className="glass p-10 rounded-[3rem] shadow-2xl max-w-md w-full border-none">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic mb-2">New Password</h2>
          <p className="text-gray-500 text-sm font-medium">Create a secure password for your account.</p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6">
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-bold text-center">
              {error}
            </div>
          )}
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              className="w-full pl-12 pr-4 py-4 bg-white/5 dark:bg-black/20 border border-white/10 rounded-2xl text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black uppercase tracking-widest text-sm rounded-2xl transition-all shadow-xl active:scale-95 disabled:opacity-50 shadow-blue-600/20"
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
