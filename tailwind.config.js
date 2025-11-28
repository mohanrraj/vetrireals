/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'gradient': 'gradient 3s ease infinite',
        'slide-in-left': 'slideInLeft 1s ease-out',
        'slide-in-right': 'slideInRight 1s ease-out',
        'slide-in-up': 'slideInUp 1s ease-out',
        'fade-in': 'fadeIn 1s ease-out',
        'border-glow': 'borderGlow 2s ease-in-out infinite',
        'scroll': 'scroll 20s linear infinite',
        'arrow-left-right': 'arrowLeftRight 2s ease-in-out infinite',
        'arrow-right-left': 'arrowRightLeft 2s ease-in-out infinite',
        'underline-glow': 'underlineGlow 2s ease-in-out infinite',
        'underline-expand': 'underlineExpand 3s ease-in-out infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        slideInLeft: {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInRight: {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideInUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        borderGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(209, 116, 210, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(209, 116, 210, 0.8)' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        arrowLeftRight: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(100%)' },
        },
        arrowRightLeft: {
          '0%, 100%': { transform: 'translateX(0)' },
          '50%': { transform: 'translateX(-100%)' },
        },
        underlineGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 10px rgba(168, 85, 247, 0.5)',
            opacity: '1'
          },
          '50%': { 
            boxShadow: '0 0 20px rgba(236, 72, 153, 0.8)',
            opacity: '0.8'
          },
        },
        underlineExpand: {
          '0%, 100%': { 
            transform: 'scaleX(1)',
            transformOrigin: 'center'
          },
          '50%': { 
            transform: 'scaleX(1.5)',
            transformOrigin: 'center'
          },
        },
      },
    },
  },
  plugins: [],
}
