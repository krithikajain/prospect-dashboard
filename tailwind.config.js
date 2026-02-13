/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ["class"],
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            },
            borderRadius: {
                lg: '24px',
                md: '20px',
                sm: '12px',
                xl: '32px',
                '2xl': '40px',
                '3xl': '48px',
            },
            boxShadow: {
                'soft': '0 8px 32px rgba(0, 0, 0, 0.05)',
                'glow': '0 0 20px rgba(167, 139, 250, 0.3)', // Lavender glow
            },
            colors: {
                background: '#F6F7FB', // Light cool gray base
                foreground: '#111827', // Gray 900
                card: {
                    DEFAULT: 'rgba(255, 255, 255, 0.65)',
                    foreground: '#111827'
                },
                popover: {
                    DEFAULT: '#FFFFFF',
                    foreground: '#111827'
                },
                primary: {
                    DEFAULT: '#6366F1', // Indigo 500
                    foreground: '#FFFFFF'
                },
                secondary: {
                    DEFAULT: '#F1F5F9', // Slate 100
                    foreground: '#475569'
                },
                muted: {
                    DEFAULT: '#F8FAFC',
                    foreground: '#64748B' // Slate 500
                },
                accent: {
                    lavender: '#A78BFA',
                    sky: '#60A5FA',
                    mint: '#34D399',
                    foreground: '#111827'
                },
                destructive: {
                    DEFAULT: '#EF4444',
                    foreground: '#FFFFFF'
                },
                border: 'rgba(255, 255, 255, 0.5)',
                input: '#E2E8F0',
                ring: '#A78BFA',
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
}

