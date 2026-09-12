/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0E2A2A',
        'ink-soft': '#43605D',
        pearl: '#f7f1f5',
        'pearl-soft': '#afcfc9',
        coral: '#FF8B6B',
        'coral-deep': '#FFA98D',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
      },
      boxShadow: {
        soft: '0 16px 30px rgba(73, 59, 46, 0.08)',
      },
    },
  },
  plugins: [],
}

