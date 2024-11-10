module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'work-sans': ['var(--font-work-sans)'],
      },
      spacing: {
        // Responsive header heights
        'header-sm': '4rem',    // 64px
        'header-md': '5rem',    // 80px
        'header-lg': '5.563rem', // 89px
        
        // Responsive section heights
        'section-sm': '25rem',   // 400px
        'section-md': '31.25rem', // 500px
        'section-lg': '37.5rem',  // 600px
        'section-xl': '48.625rem', // 778px
      },
      height: {
        // Dynamic screen-based heights
        'screen-50': '50vh',
        'screen-60': '60vh',
        'screen-70': '70vh',
        'screen-80': '80vh',
        'screen-90': '90vh',
      },
      minHeight: {
        // Minimum heights for sections
        'section': '25rem',      // 400px minimum
        'hero': '31.25rem',      // 500px minimum
      },
      maxWidth: {
        // Content width constraints
        'content': '90rem',      // 1440px
        'section': '75rem',      // 1200px
      },
      colors: {
        'citu': {
          red: '#DD4440',
          'red-light': '#FF746C',
          // Add more brand colors as needed
          'red-dark': '#B83532',
          'red-hover': '#C93C38',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};