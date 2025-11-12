/* eslint-disable @typescript-eslint/no-require-imports */
import type { Config } from 'tailwindcss'

import { backgroundImage } from './app/src/app/tokens/backgroundImage'
import { boxShadow } from './app/src/app/tokens/boxShadow'
import { colors } from './app/src/app/tokens/colors'
import { fontFamily } from './app/src/app/tokens/fontFamily'
import { fontSize } from './app/src/app/tokens/fontSize'
import { screens } from './app/src/app/tokens/screens'

const config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    'public/storybook/index.html',
    '.storybook/preview.tsx',
  ],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        md: '2rem',
      },
    },
    fontSize: {
      ...fontSize,
    },

    screens: {
      ...screens,
    },

    extend: {
      translate: {
        '0.25': '0.063rem',
      },
      spacing: {
        '0.75': '0.188rem',
        '5.5': '1.375rem',
      },
      height: {
        '6.5': '1.625rem',
        '13': '3.125rem',
      },
      width: {
        '6.5': '1.625rem',
        '13': '3.125rem',
      },
      fontFamily: {
        ...fontFamily,
      },
      backgroundImage: {
        ...backgroundImage,
      },
      boxShadow: {
        ...boxShadow,
      },
      blur: {
        '8xl': '9.375rem',
        '10xl': '12.5rem',
      },
      borderRadius: {
        '2lg': '0.625rem',
        '2.5xl': '1.25rem',
      },
      zIndex: {
        '1': '1',
      },
      colors: {
        ...colors,
      },
      size: {
        '150': '38.75rem',
      },
      minHeight: {
        '18': '4.5rem',
      },
      borderWidth: {
        '3': '3px',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },

      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },

      transitionDuration: {
        DEFAULT: '200ms',
      },

      typography: () => ({
        'open-origin': {
          css: {
            '--tw-prose-body': 'hsl(var(--text-third))',
            '--tw-prose-headings': 'hsl(var(--text-primary))',
            '--tw-prose-lead': 'hsl(var(--text-third))',
            '--tw-prose-links': 'hsl(var(--button-eighth))',
            '--tw-prose-bold': 'hsl(var(--text-primary))',
            // '--tw-prose-counters': 'red',
            // '--tw-prose-bullets': 'red',
            // '--tw-prose-hr': 'red',
            // '--tw-prose-quotes': 'red',
            // '--tw-prose-quote-borders': 'red',
            // '--tw-prose-captions': 'red',
            // '--tw-prose-kbd': 'red',
            // '--tw-prose-kbd-shadows': 'red',
            // '--tw-prose-code': 'red',
            // '--tw-prose-pre-code': 'red',
            // '--tw-prose-pre-bg': 'red',
            // '--tw-prose-th-borders': 'red',
            // '--tw-prose-td-borders': 'red',
          },
        },

        DEFAULT: {
          css: {
            a: {
              '&:hover': {
                color: 'hsl(var(--text-third))',
              },
              '&:active': {
                color: 'hsl(var(--button-eighth))',
              },
            },
          },
        },
      }),
    },
  },

  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')()],
} satisfies Config

export default config
