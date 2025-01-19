import daisyui from 'daisyui'

/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', 'node_modules/daisyui/dist/**/*.js', 'node_modules/react-daisyui/dist/**/*.js'],
    theme: {
        extend: {
            backgroundImage: {
                'wood-light': "url('/images/wood-light.jpg') ",
                'wood-dark': "url('/images/wood-dark.jpg')",
                'wood-compliment': "url('/images/wood-compliment.jpg')",
            },
        },
    },
    plugins: [daisyui],
}
