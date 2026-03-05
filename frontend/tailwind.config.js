/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
    theme: {
        extend: {
            colors: {
                "bg-neutral": "#F9FAFB",
                "primary-text": "#000000",
                "secondary-text": "#6B7280",
                "accent-up": "#E6F4EA",
                "accent-up-text": "#1E7E34",
                "accent-down": "#FEF2F2",
                "accent-down-text": "#DC2626",
                "border-light": "#F1F5F9",
            },
            fontFamily: {
                "sans": ["Inter", "sans-serif"],
            },
            borderRadius: {
                "card": "32px",
            },
        }
    },
    plugins: [require("@tailwindcss/forms"), require("@tailwindcss/container-queries")],
};
