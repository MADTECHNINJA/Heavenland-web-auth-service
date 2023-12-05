module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        fontFamily: {
            sans: ['Montserrat', 'sans-serif'],
            courier: ['Courier', 'sans-serif'],
        },
        screens: {
            sm: '640px',
            md: '768px',
            xlg: '896px',
            lg: '1024px',
            xxl: '1152px',
            xl: '1280px',
            '2xl': '1536px',
        },
        extend: {
            colors: {
                primary: '#2e25d7',
                secondary: '#0ea0e1',
                'indigo-950': '#090917',
                'indigo-940': '#0C0B1E',
                'indigo-930': '#12112D',
                'indigo-920': '#1D1B4B',
                'indigo-910': '#282669',
            },
            keyframes: {
                open: {
                    '0%': { opacity: 0 },
                    '100%': { opacity: 100 },
                },
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
