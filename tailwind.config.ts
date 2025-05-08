import aspectRatio from '@tailwindcss/aspect-ratio';
import containerQueries from '@tailwindcss/container-queries';
import forms from '@tailwindcss/forms';
import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';
import flattenColorPalette from 'tailwindcss/lib/util/flattenColorPalette';

export default {
	content: ['./src/**/*.{html,js,svelte,ts,svx,md}'],

	theme: {
		extend: {
			animation: {
				shimmer: "shimmer 8s infinite",
				scroll: 'scroll 10s linear infinite',

			  },
			  keyframes: {
				shimmer: {
				  "0%, 90%, 100%": {
					"background-position": "calc(-100% - var(--shimmer-width)) 0",
				  },
				  "30%, 60%": {
					"background-position": "calc(100% + var(--shimmer-width)) 0",
				  },
				},
				scroll: {
					'0%': { transform: 'translateX(0%)' },
					'100%': { transform: 'translateX(-100%)' },
				  },
			  },
			
			
		},
		
	},

	plugins: [typography, containerQueries, aspectRatio],
	
	
} as Config;