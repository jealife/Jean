/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./*.html",
        "./assets/**/*.js",
    ],
    theme: {
        extend: {
            fontFamily: {
                heading: ['Outfit', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
            },
            colors: {
                primary: {
                    DEFAULT: '#05070a',
                    secondary: '#0f1218',
                    tertiary: '#1a1f29',
                },
                accent: {
                    primary: '#6366f1',
                    secondary: '#a855f7',
                },
                text: {
                    primary: '#f8fafc',
                    secondary: '#94a3b8',
                    muted: '#64748b',
                },
            },
            borderRadius: {
                'sm': '0.5rem',
                'md': '1rem',
                'lg': '2rem',
            },
            backgroundImage: {
                'accent-gradient': 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
            },
            backdropBlur: {
                'glass': '12px',
            },
            boxShadow: {
                'glow': '0 0 15px rgba(99, 102, 241, 0.3)',
                'glow-lg': '0 4px 15px rgba(99, 102, 241, 0.4)',
                'glow-xl': '0 8px 25px rgba(99, 102, 241, 0.6)',
            },
            transitionDuration: {
                'fast': '200ms',
                'base': '300ms',
                'slow': '500ms',
            },
        },
    },
    plugins: [],
}
