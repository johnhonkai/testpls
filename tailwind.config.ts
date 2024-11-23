import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import daisyui from 'daisyui'; // Import DaisyUI
import type { Config } from 'tailwindcss';
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette';

export default {
	content: ['./src/**/*.{html,js,svelte,ts,svx,md}'],

	theme: {
		extend: {
			typography: (theme) => ({
			  DEFAULT: {
				css: {
				  color: theme('colors.gray.300'), // Set the default prose text color
				  h1: { color: theme('colors.gray.100') }, // Headings brighter
				  h2: { color: theme('colors.gray.100') },
				  h3: { color: theme('colors.gray.200') },
				  a: { color: theme('colors.blue.400'), textDecoration: 'underline' },
				  strong: { color: theme('colors.gray.300') }, // Set bold text color

				},
			  },
			}),
			
		},
		
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

