/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Soft green + sage palette for the light theme
        navy: {
          950: '#f7fcf7',
          900: '#ecf7ec',
          800: '#d8eee0',
          700: '#bbe2c5',
          600: '#96d3a0',
          500: '#6ab678',
          border: '#bee3c5',
        },
        teal: {
          50:  '#f0fbf8',
          100: '#d6f4ed',
          200: '#acede1',
          300: '#6fd9c8',
          400: '#37c5a8',
          500: '#1fa97e',
          600: '#17855f',
          700: '#125d44',
        },
        gold: {
          300: '#fde68a',
          400: '#fbbf24',
          500: '#d97706',
          600: '#b45309',
        },
        // backward compat aliases
        ink: {
          950: '#04080f',
          900: '#060d1a',
          800: '#0a1628',
          700: '#0d1e38',
          600: '#112647',
          border: '#1a3060',
        },
        moss: {
          400: '#00bdb3',
          500: '#009e96',
          600: '#007e78',
        },
        ocean: {
          50:  '#0d1e38',
          100: '#0d1e38',
          400: '#00bdb3',
          500: '#009e96',
          600: '#007e78',
          800: '#0a1628',
          900: '#060d1a',
        },
        blue: {
          400: '#00bdb3',
          500: '#009e96',
          600: '#007e78',
          700: '#005e59',
          900: '#060d1a',
        },
      },
      fontFamily: {
        display: ['"Poppins"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(180deg, rgba(55,197,168,0.18) 0%, rgba(247,252,247,0.95) 100%)',
        'card-gradient': 'linear-gradient(160deg, rgba(255,255,255,0.95) 0%, rgba(227,248,236,0.95) 100%)',
        'teal-glow': 'radial-gradient(ellipse at center, rgba(0,158,150,0.15) 0%, transparent 70%)',
        'hero-radial': 'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(0,189,179,0.14) 0%, transparent 65%)',
      },
      boxShadow: {
        'teal-sm':  '0 0 14px rgba(0,158,150,0.25)',
        'teal-md':  '0 0 28px rgba(0,158,150,0.35)',
        'teal-lg':  '0 0 56px rgba(0,158,150,0.4)',
        'gold-sm':  '0 0 14px rgba(251,191,36,0.22)',
        'card':     '0 8px 48px rgba(0,0,0,0.55)',
      },
      animation: {
        'fade-in':       'fadeIn 0.6s ease-out both',
        'slide-up':      'slideUp 0.55s ease-out both',
        'float':         'float 7s ease-in-out infinite',
        'pulse-teal':    'pulseTeal 2.5s ease-in-out infinite',
        'shimmer':       'shimmer 2.5s linear infinite',
        'spin-slow':     'spin 10s linear infinite',
        'bounce-subtle': 'bounceSub 2.2s ease-in-out infinite',
        'glow-border':   'glowBorder 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn:      { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        slideUp:     { '0%': { opacity: 0, transform: 'translateY(22px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
        float:       { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-14px)' } },
        pulseTeal:   { '0%,100%': { boxShadow: '0 0 8px rgba(0,158,150,0.4)' }, '50%': { boxShadow: '0 0 24px rgba(0,189,179,0.8)' } },
        shimmer:     { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
        bounceSub:   { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-4px)' } },
        glowBorder:  { '0%,100%': { borderColor: 'rgba(0,158,150,0.3)' }, '50%': { borderColor: 'rgba(0,189,179,0.65)' } },
      },
    },
  },
  plugins: [],
};
