/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary': '#00ADEE',
                'secondary':"#FBAD17"
            },
        },
    },
    plugins: [],
}

