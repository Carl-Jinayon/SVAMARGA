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
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="glass p-10 rounded-[3rem] shadow-2xl max-w-md w-full text-center border-none">
          <Check className="w-16 h-16 mx-auto mb-6" style={{ color: 'var(--accent-teal)' }} />
          <h2 className="text-2xl font-black mb-4 uppercase tracking-tighter" style={{ color: 'var(--text-primary)' }}>Password Updated</h2>
          <p className="text-sm font-medium leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            Your password has been changed successfully. Redirecting you to login...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="glass p-10 rounded-[3rem] shadow-2xl max-w-md w-full border-none relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.1) 0%, transparent 70%)' }} />

        <div className="text-center mb-10 relative z-10">
          <h2 className="text-4xl font-black uppercase tracking-tighter italic mb-2" style={{ color: 'var(--text-primary)' }}>New Password</h2>
          <p className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>Create a secure password for your account.</p>
        </div>

        <form onSubmit={handleUpdate} className="space-y-6 relative z-10">
          {error && (
            <div className="p-4 rounded-2xl text-xs font-bold text-center" style={{ background: 'rgba(239,68,68,0.1)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.2)' }}>
              {error}
            </div>
          )}
          
          <div className="relative">
            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: 'var(--text-muted)' }} />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              className="input-glass w-full pl-12 pr-4 py-4 text-sm"
              style={{ textTransform: 'none' }}
              required
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 text-white font-black uppercase tracking-widest text-sm rounded-2xl transition-all shadow-xl active:scale-95 disabled:opacity-50"
            style={{ background: 'var(--accent-cyan)' }}
          >
            {loading ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
