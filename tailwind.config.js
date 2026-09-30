/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lumiere: {
          canvas: '#FAF8F5',       // Bone porcelain canvas
          card: '#FFFFFF',         // Card surface
          surface: '#F5F2EB',      // Capsule / inset fill
          border: '#ECE7DC',       // Hairline stone border
          borderLight: '#F3EFE6',  // Subdued dividers
          textPrimary: '#1A1815',  // High-contrast espresso charcoal
          textMuted: '#7A7265',    // Muted taupe metadata
          textCaption: '#8A8173',  // Micro labels
          
          // Accent Tokens
          emerald: '#1C3F30',      // Seated / Active dining
          emeraldLight: '#EEF4EC',
          emeraldBorder: '#D5E5D1',
          
          amber: '#B45309',        // Service requests / Overstay alerts
          amberLight: '#FEF3C7',
          amberBorder: '#FDE68A',
          
          brass: '#9E7B35',        // Course pacing / Ready states
          brassLight: '#F7F3E9',
          
          terracotta: '#9E3A26',   // Allergies / 86'd items
          terracottaLight: '#F9EFEB',
          terracottaBorder: '#F0D5CD',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        luxury: '0 10px 30px -10px rgba(26, 24, 21, 0.05), 0 4px 6px -2px rgba(26, 24, 21, 0.02)',
        modal: '0 25px 60px -15px rgba(26, 24, 21, 0.25)',
      }
    }
  },
  plugins: []
};