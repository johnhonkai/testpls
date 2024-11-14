import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import daisyui from 'daisyui'; // Import DaisyUI
import type { Config } from 'tailwindcss';

export default {
	content: ['./src/**/*.{html,js,svelte,ts,svx,md}'],

	theme: {
		extend: {}
	},

	plugins: [typography, containerQueries, aspectRatio, daisyui],

	daisyui: {
		themes: [
			"light", 
			{
				dark: {
					...require("daisyui/src/theming/themes")["dark"], // Use the full dark theme as base
					primary: "#2563eb", // Customize primary color (blue)
					secondary: "#f59e0b", // Customize secondary color (orange)
                              color: "#cbd5e1",
				}
			}
		]
	},
	
} as Config;
