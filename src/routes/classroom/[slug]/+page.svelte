<!-- src/routes/classroom/[slug]/+page.svelte -->

<script>
// @ts-nocheck

	import { onMount } from 'svelte';
	import Toc from 'svelte-toc'; // Import the TOC component

	export let data;
	let tocActive = false; // Control TOC rendering after mount
	let showToc = false; // Toggles TOC visibility in mobile view

	// Ensure TOC is activated after the content is rendered
	onMount(() => {
		tocActive = true; // Set tocActive to true once the component mounts
	});

	// Function to toggle TOC visibility
	function toggleToc() {
		showToc = !showToc;
	}

	const { categorizedArticles, sortedCategories } = data;

</script>


<div class="max-w-5xl mx-auto p-4 mb-4 rounded-lg text-center">
	<p class="text-2xl font-semibold mb-2 text-emerald-400">Classroom</p>
	<p class="text-sm sm:text-base">
		Info for both new and old players
	</p>
  </div>
  
  <div class="container mx-auto py-10 flex flex-row gap-4">
	<!-- Left Sidebar with Article List by Category (Sticky Sidebar) -->
	<aside class="hidden xl:block xl:w-1/6 p-4 bg-base-100 rounded-lg space-y-4 sticky top-16 self-start">
	  <p class="text-lg font-bold mb-2">Articles by Category</p>
	  {#each sortedCategories as category}
		<div class="mb-4">
		  <p class="font-semibold text-blue-600">{category}</p>
		  <ul class="ml-2 list-disc">
			{#each categorizedArticles[category] as article}
			  <li>
				<a href={`/classroom/${article.slug}`} class="hover:text-emerald-400">
				  {article.title}
				</a>
			  </li>
			{/each}
		  </ul>
		</div>
	  {/each}
	</aside>
  
	<!-- Main Content and Table of Contents -->
	<article class="prose grow mx-auto max-w-[960px] p-6 bg-base-100 rounded-lg space-y-5 prose-ul:leading-6 prose-h2:bg-gradient-to-r from-blue-400 to-blue-600 prose-h2:text-black prose-h2:pl-2 prose-h2:rounded   prose-h3:text-amber-300 ">

	  <h1>{data.title}</h1>
	  <svelte:component this={data.content} />
	</article>
  
	{#if tocActive}
	  <aside class="xl:w-1/6 sticky top-16 h-[calc(100vh-4rem)] p-4 bg-base-100 rounded-lg shadow-md hidden 2xl:block">
		<Toc class="toc p-4 rounded-lg shadow-lg" breakpoint={1500} />
	  </aside>
	{/if}
  </div>
  

<style>
	:global(aside.toc > nav > ol > li.active) {
  color: var(--toc-active-color, rgb(32, 152, 250));
  background: var(--toc-active-bg, rgba(100, 148, 237, 0));
  font-weight: var(--toc-active-font-weight, bold);
  border: var(--toc-active-border, thin solid rgb(32, 152, 250));
  border-width: var(--toc-active-border-width, 0 0 0 3px); 
  border-radius: var(--toc-active-border-radius, 0 0 0 0); 

}

</style>