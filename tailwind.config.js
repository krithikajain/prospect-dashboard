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
                background: '#4F6CA0', // Default to Smart Blue for safety, though mesh covers it
                foreground: '#FFFFFF', // White text by default
                card: {
                    DEFAULT: 'rgba(255, 255, 255, 0.05)', // Glass effect base
                    foreground: '#FFFFFF'
                },
                popover: {
                    DEFAULT: '#111827',
                    foreground: '#FFFFFF'
                },
                primary: {
                    DEFAULT: '#E5BE5B', // Metallic Gold
                    foreground: '#111827'
                },
                secondary: {
                    DEFAULT: 'rgba(255, 255, 255, 0.1)',
                    foreground: '#FFFFFF'
                },
                muted: {
                    DEFAULT: 'rgba(255, 255, 255, 0.1)',
                    foreground: 'rgba(255, 255, 255, 0.7)'
                },
                accent: {
                    lavender: '#A78BFA',
                    sky: '#60A5FA',
                    mint: '#34D399',
                    foreground: '#111827',
                    'smart-blue': '#4F6CA0',
                    'wisteria-blue-2': '#81A1EC',
                    'wisteria-blue': '#90A0C9',
                    'metallic-gold': '#E5BE5B',
                    'khaki-beige': '#A79E8A',
                },
                destructive: {
                    DEFAULT: '#EF4444',
                    foreground: '#FFFFFF'
                },
                border: 'rgba(255, 255, 255, 0.1)',
                input: 'rgba(255, 255, 255, 0.1)',
                ring: '#E5BE5B',
            }
        }
    },
    plugins: [require("tailwindcss-animate")],
}

