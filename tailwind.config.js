/** @type {import('tailwindcss').Config} */

const config = {
    darkMode: ['class'],
    content: ['./app/**/*.{js,ts,jsx,tsx}'],
    plugins: [],
    theme: {
        extend: {
            colors: {
                brand: {
                    navy: '#1A2A3A',
                    cream: '#F5F2EA',
                    gold: '#C3A343',
                    gray: '#8C8C8C',
                },
            },
            fontFamily: {
                spartan: ['League Spartan', 'serif'],
                // Silvana: ['Silvana', 'sans-serif'],
            },
        },
    },
};

export default config
