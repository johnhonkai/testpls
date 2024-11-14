import { mdsvex } from 'mdsvex';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import adapter from '@sveltejs/adapter-static';


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
    paths: {
      base: process.env.NODE_ENV === 'production' ? '/testpls' : ''
    }
  }
};

export default config;
