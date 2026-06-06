import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Github, Mail, Lock, Eye, EyeOff, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

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
    const { error } = await supabase.auth.signInWithOAuth({ 
      provider: 'github',
      options: {
        redirectTo: window.location.origin
      }
    });
    if (error) setError(error.message);
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
        queryParams: {
          access_type: 'offline',
          prompt: 'select_account',
        },
      },
    });
    if (error) setError(error.message);
  };

  const cardVariants = {
    initial: { opacity: 0, y: 24, scale: 0.97 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.45, ease: 'easeOut' as const } },
    exit:    { opacity: 0, y: -16, scale: 0.97, transition: { duration: 0.2 } },
  };

  if (emailSent || resetSent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <motion.div
          variants={cardVariants}
          initial="initial"
          animate="animate"
          className="glass-heavy rounded-3xl p-10 max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', damping: 14, mass: 0.8, delay: 0.2 }}
            className="w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.15) 0%, rgba(127,119,221,0.15) 100%)', border: '1px solid rgba(0,229,255,0.2)' }}
          >
            <CheckCircle2 className="w-8 h-8" style={{ color: 'var(--accent-teal)' }} />
          </motion.div>
          <h2 className="text-2xl font-black tracking-tight mb-3" style={{ color: 'var(--text-primary)' }}>
            {emailSent ? 'Check your email' : 'Check your inbox'}
          </h2>
          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
            {emailSent
              ? <>We've sent a confirmation link to <strong style={{ color: 'var(--accent-cyan)' }}>{email}</strong>. Click it to activate your account.</>
              : <>If an account exists for <strong style={{ color: 'var(--accent-cyan)' }}>{email}</strong>, you'll receive a recovery link shortly.</>
            }
          </p>
          <motion.button
            onClick={() => { setEmailSent(false); setResetSent(false); setIsReset(false); }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="btn-primary w-full mt-8 py-3.5 text-sm font-semibold rounded-xl flex items-center justify-center gap-2"
          >
            Back to Sign In <ArrowRight className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      {/* Background decoration */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full opacity-20 dark:opacity-10 blur-3xl animate-float-slow"
          style={{ background: 'radial-gradient(circle, rgba(0,229,255,0.4) 0%, transparent 70%)' }} />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full opacity-15 dark:opacity-10 blur-3xl animate-float"
          style={{ background: 'radial-gradient(circle, rgba(127,119,221,0.5) 0%, transparent 70%)' }} />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={isSignUp ? 'signup' : isReset ? 'reset' : 'signin'}
          variants={cardVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="glass-heavy rounded-3xl p-8 sm:p-10 max-w-md w-full relative z-10"
        >
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 mb-5">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(0,229,255,0.2), rgba(127,119,221,0.2))', border: '1px solid rgba(0,229,255,0.2)' }}>
                <Zap className="w-4 h-4" style={{ color: 'var(--accent-cyan)' }} />
              </div>
              <span className="text-xs font-bold tracking-widest uppercase" style={{ color: 'var(--text-muted)' }}>
                SVAMARGA
              </span>
            </div>
            <h2 className="text-3xl font-black tracking-tight mb-2" style={{ color: 'var(--text-primary)' }}>
              {isReset ? 'Reset Password' : isSignUp ? 'Create Account' : 'Welcome Back'}
            </h2>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
              {isReset
                ? 'Enter your email to recover your account.'
                : isSignUp
                  ? 'Start your engineering journey today.'
                  : 'Continue your mission.'}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleAuth} className="space-y-4">
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-4 py-3 rounded-xl text-xs font-medium text-red-500"
                  style={{ background: 'rgba(239,68,68,0.08)', border: '1px solid rgba(239,68,68,0.2)' }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email Input — FIX: no text-transform on input */}
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(null); }}
                placeholder="Email address"
                className="input-glass w-full pl-11 pr-4 py-3.5"
                style={{ textTransform: 'none' }}
                autoComplete="email"
                required
              />
            </div>

            {/* Password Input — FIX: no text-transform */}
            {!isReset && (
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--text-muted)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(null); }}
                  placeholder="Password"
                  className="input-glass w-full pl-11 pr-12 py-3.5"
                  style={{ textTransform: 'none' }}
                  autoComplete={isSignUp ? 'new-password' : 'current-password'}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4 hover:text-cyan-accent" /> : <Eye className="w-4 h-4 hover:text-cyan-accent" />}
                </button>
              </div>
            )}

            {/* Forgot password */}
            {!isReset && !isSignUp && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsReset(true)}
                  className="text-xs font-medium transition-colors"
                  style={{ color: 'var(--accent-cyan)' }}
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.97 } : {}}
              className="btn-primary w-full py-3.5 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              style={isSignUp ? {
                background: 'linear-gradient(135deg, #16896B 0%, #1D9E75 100%)',
                boxShadow: '0 4px 16px rgba(29,158,117,0.3)',
              } : undefined}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing…
                </span>
              ) : (
                <>
                  {isReset ? 'Send Reset Link' : isSignUp ? 'Create Account' : 'Sign In'}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>

            {isReset && (
              <button
                type="button"
                onClick={() => setIsReset(false)}
                className="w-full text-center text-xs font-medium transition-colors"
                style={{ color: 'var(--text-muted)' }}
              >
                ← Back to Sign In
              </button>
            )}
          </form>

          {/* OAuth Divider + Buttons */}
          {!isReset && (
            <>
              <div className="relative my-6">
                <div className="divider" />
                <span className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs font-medium px-3"
                  style={{ color: 'var(--text-muted)', background: 'transparent' }}>
                  or continue with
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  onClick={handleGoogleLogin}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-ghost py-3 flex items-center justify-center gap-2.5 text-xs font-semibold"
                >
                  <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.16H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.84l3.66-2.75z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.16l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  Google
                </motion.button>

                <motion.button
                  onClick={handleGitHubLogin}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="py-3 flex items-center justify-center gap-2.5 text-xs font-semibold rounded-xl text-white transition-all"
                  style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #2d2d44 100%)', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <Github className="w-4 h-4 flex-shrink-0" />
                  GitHub
                </motion.button>
              </div>

              <button
                onClick={toggleMode}
                className="w-full mt-6 text-center text-xs font-medium transition-colors"
                style={{ color: 'var(--text-muted)' }}
              >
                {isSignUp ? (
                  <>Already have an account?{' '}<span style={{ color: 'var(--accent-cyan)' }}>Sign In</span></>
                ) : (
                  <>Need an account?{' '}<span style={{ color: 'var(--accent-cyan)' }}>Sign Up</span></>
                )}
              </button>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
