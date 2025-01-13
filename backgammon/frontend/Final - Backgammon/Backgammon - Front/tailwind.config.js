/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			backgroundImage: {
				"wood-light": "url('/images/wood-light.jpg')",
				"wood-dark": "url('/images/wood-dark.jpg')",
				"wood-compliment": "url('/images/wood-compliment.jpg')",
			},
		},
	},
	plugins: [],
}
