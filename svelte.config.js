import { mdsvex } from 'mdsvex';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-cloudflare';


const config = {

	extensions: ['.svelte', '.svx'], // Enable .svx for markdown

	preprocess: [
		vitePreprocess(),
		mdsvex({
			extension: '.svx'
		})
	],

	kit: {
		adapter: adapter(),
	  }
};

export default config;
