import type { Config } from 'tailwindcss';

export default {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'popup-show': 'popupShow 0.5s ease-out', // ポップアップ表示アニメーション
        'popup-hide': 'popupHide 0.5s ease-in', // ポップアップ非表示アニメーション
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        customGreen: '#2E8B57',
        'customGreen-dark': '#276749', // ホバー時の色
        customOrange: '#FF4500',
      },
    },
    keyframes: {
      bounce: {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-5px)' },
      },
      popupShow: {
        '0%': { opacity: '0', transform: 'scale(0.8)' }, // 初期状態
        '100%': { opacity: '1', transform: 'scale(1)' }, // 最終状態
      },
      popupHide: {
        '0%': { opacity: '1', transform: 'scale(1)' }, // 初期状態
        '100%': { opacity: '0', transform: 'scale(0.8)' }, // 最終状態
      },
    },
  },
  plugins: [],
} satisfies Config;
