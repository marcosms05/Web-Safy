import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Mapbox surface scale
        'void':        '#0e1012',
        'charcoal':    '#15171b',
        'gunmetal':    '#1c1f24',
        'graphite':    '#23262d',
        'steel':       '#333943',
        'pewter':      '#444d5a',
        'slate':       '#566171',
        'ash':         '#8b96aa',
        'fog':         '#a0aaba',
        'silver':      '#bbc2ce',
        'cloud':       '#d5dae2',
        // Accent — sole chromatic color in the system
        'signal':      '#04cddd',
        'deep-signal': '#02a8b5',
        'map-green':   '#228a56',
      },
      fontFamily: {
        sans: ['"DM Sans"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        caption:     ['10px',  { lineHeight: '1.6',  letterSpacing: '1px'     }],
        'body-sm':   ['14px',  { lineHeight: '1.43'                            }],
        body:        ['16px',  { lineHeight: '1.5'                             }],
        subheading:  ['18px',  { lineHeight: '1.4'                             }],
        'heading-sm':['24px',  { lineHeight: '1.33'                            }],
        heading:     ['32px',  { lineHeight: '1.25'                            }],
        'heading-lg':['44px',  { lineHeight: '1.14', letterSpacing: '-0.88px' }],
        display:     ['68px',  { lineHeight: '1',    letterSpacing: '-1.36px' }],
      },
      fontWeight: {
        regular: '400',
        medium:  '500',
        bold:    '700',
      },
      maxWidth: {
        page:       '1344px',
        'hero-sub': '560px',
      },
      borderRadius: {
        card:   '24px',
        chip:   '12px',
        badge:  '4px',
        input:  '6px',
        pill:   '100px',
      },
      boxShadow: {
        'map-fade':     'rgb(14, 16, 18) 0px -175px 175px -75px inset',
        'section-fade': 'rgb(14, 16, 18) 0px 0px 100px 50px',
      },
      animation: {
        'slide-up':   'slideUp 0.6s ease-out forwards',
        'fade-in':    'fadeIn  0.8s ease-out forwards',
        float:        'float   6s ease-in-out infinite',
        'draw-route': 'drawRoute 2.5s ease-out forwards',
        'pulse-slow': 'pulse   3s ease-in-out infinite',
      },
      keyframes: {
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)'    },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)'   },
          '50%':      { transform: 'translateY(-12px)' },
        },
        drawRoute: {
          from: { strokeDashoffset: '800' },
          to:   { strokeDashoffset: '0'   },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
