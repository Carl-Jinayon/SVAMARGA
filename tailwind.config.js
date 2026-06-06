/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Navy scale – dark mode backgrounds
        navy: {
          50:  '#F8FAFC',
          100: '#EEF2F8',
          200: '#DAE2F0',
          300: '#B8C8E0',
          400: '#8AAAC8',
          500: '#5C7EA8',
          600: '#3A5F88',
          700: '#1E3D5E',
          800: '#0D1F38',
          900: '#060A14',
          950: '#030609',
        },
        // Accent colors
        'cyan-accent':    '#00E5FF',
        'cyan-soft':      '#4FC3F7',
        'violet-soft':    '#7F77DD',
        'violet-bright':  '#9D77FF',
        'teal-success':   '#1D9E75',
        'teal-soft':      '#26C48F',
        // Semantic
        primary:   '#00E5FF',
        secondary: '#7F77DD',
        success:   '#1D9E75',
        warning:   '#F59E0B',
        danger:    '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      backdropBlur: {
        glass:        '20px',
        'glass-heavy': '32px',
        'glass-ultra': '48px',
      },
      boxShadow: {
        'glass':           '0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255,255,255,0.1)',
        'glass-dark':      '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
        'glass-glow-cyan': '0 0 20px rgba(0, 229, 255, 0.25), 0 8px 32px rgba(0,0,0,0.15)',
        'glass-glow-violet':'0 0 20px rgba(127, 119, 221, 0.25), 0 8px 32px rgba(0,0,0,0.15)',
        'glow-cyan':       '0 0 30px rgba(0, 229, 255, 0.4)',
        'glow-violet':     '0 0 30px rgba(127, 119, 221, 0.4)',
        'card':            '0 4px 24px rgba(0, 0, 0, 0.08)',
        'card-hover':      '0 12px 40px rgba(0, 0, 0, 0.15)',
        'card-dark':       '0 4px 24px rgba(0, 0, 0, 0.35)',
        'card-dark-hover': '0 12px 40px rgba(0, 0, 0, 0.5)',
        'nav':             '4px 0 32px rgba(0, 0, 0, 0.1)',
        'nav-dark':        '4px 0 32px rgba(0, 0, 0, 0.4)',
        'float':           '0 20px 60px rgba(0, 229, 255, 0.2), 0 8px 24px rgba(0,0,0,0.3)',
      },
      animation: {
        'aurora-shift':   'aurora 18s ease-in-out infinite',
        'float':          'float 4s ease-in-out infinite',
        'float-slow':     'float 7s ease-in-out infinite',
        'shimmer':        'shimmer 2s ease-in-out infinite',
        'pulse-glow':     'pulseGlow 2.5s ease-in-out infinite',
        'slide-in-up':    'slideInUp 0.4s cubic-bezier(0.16,1,0.3,1)',
        'slide-in-right': 'slideInRight 0.4s cubic-bezier(0.16,1,0.3,1)',
        'fade-in':        'fadeIn 0.3s ease-out',
        'spin-slow':      'spin 4s linear infinite',
        'count-up':       'countUp 0.8s cubic-bezier(0.16,1,0.3,1) forwards',
      },
      keyframes: {
        aurora: {
          '0%':   { backgroundPosition: '0% 50%' },
          '50%':  { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 10px rgba(0,229,255,0.2)' },
          '50%':      { boxShadow: '0 0 30px rgba(0,229,255,0.5)' },
        },
        slideInUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(-16px)' },
          to:   { opacity: '1', transform: 'translateX(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        countUp: {
          from: { opacity: '0', transform: 'translateY(8px) scale(0.95)' },
          to:   { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'bounce-in': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}