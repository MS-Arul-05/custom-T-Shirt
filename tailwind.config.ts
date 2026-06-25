import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: '#FF6B00',
        'accent-hover': '#E55F00',
        'accent-light': '#FFF0E6',
        'bg-primary': '#F8F8F8',
        'bg-surface': '#FFFFFF',
        'bg-dark': '#1A1A1A',
        'text-primary': '#1A1A1A',
        'text-secondary': '#6B6B6B',
        'text-tertiary': 'rgba(26,26,26,0.35)',
        success: '#00C853',
        error: '#E53935',
        warning: '#F5A623',
      },
      borderRadius: {
        btn: '8px',
        card: '12px',
        badge: '4px',
        modal: '16px',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'system-ui', 'sans-serif'],
        heading: ['Cabinet Grotesk', 'var(--font-sans)', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
