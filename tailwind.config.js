
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(240 86% 50%)',
        accent: 'hsl(171 76% 43%)',
        bg: 'hsl(240 7% 95%)',
        surface: 'hsl(0 0% 100%)',
        'text-primary': 'hsl(240 11% 20%)',
        'text-secondary': 'hsl(240 11% 40%)',
      },
      spacing: {
        sm: '8px',
        md: '12px',
        lg: '20px',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
      },
      boxShadow: {
        card: '0 4px 12px hsla(240, 11%, 20%, 0.10)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-in-out',
        'slide-up': 'slideUp 200ms ease-in-out',
      },
      fontSize: {
        display: ['2.25rem', { fontWeight: '700' }],
        heading: ['1.5rem', { fontWeight: '600' }],
        body: ['1rem', { fontWeight: '400', lineHeight: '1.75' }],
        caption: ['0.875rem', { fontWeight: '300', lineHeight: '1' }],
      },
    },
  },
  plugins: [],
}
