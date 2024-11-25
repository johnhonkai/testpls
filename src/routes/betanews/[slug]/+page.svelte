<!-- src/routes/blog/[slug]/+page.svelte -->

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
</script>



<!-- Layout container with three-column setup on large screens -->
<div class="container mx-auto py-10 flex flex-row justify-center">


	<!-- Left Column (empty space to center the main content on larger screens) -->
	<div class="block xl:w-1/6"></div>

	<!-- Main Content centered on larger screens -->
	 <div class="flex flex-col">
	<article class="prose grow  mx-auto max-w-[960px] p-6 bg-base-200 rounded-lg shadow-md space-y-5 prose-ul:leading-6 prose-h3:bg-gradient-to-r from-cyan-700 to-cyan-500 prose-h3:text-black prose-h3:pl-2 prose-h3:rounded prose-h1:custom-font ">
		<h1>{data.title}</h1>

		<!-- Render the blog content -->
		<svelte:component this={data.content} />

		
	</article>

	<!-- Metadata Section -->
	<div class=" p-4 text-slate-400">
		<p>
		 Views: {data.views}
		</p>
		<p>
		  Created:
		  {new Intl.DateTimeFormat('en-GB', {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			timeZoneName: 'short' // Include the timezone
		  }).format(new Date(data.creationDate))}
		</p>
		<p>
		  Last Modified:
		  {new Intl.DateTimeFormat('en-GB', {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			timeZoneName: 'short' // Include the timezone
		  }).format(new Date(data.lastModifiedDate))}
		</p>
	  </div>
</div>

	<!-- Table of Contents on the right (conditionally rendered) -->
	{#if tocActive}
		<aside class="xl:mx-auto xl:w-1/6 sticky top-16 h-[calc(100vh-4rem)]" class:hidden={!showToc && !tocActive}>
			<Toc 
			class="toc p-4 rounded-lg shadow-lg" 
			breakpoint={1280}
			reactToKeys={ [`ArrowDown`, `ArrowUp`, ` `, `Enter`]}
			/>
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

  :global(aside.toc.mobile > nav ){
	background: var(--toc-mobile-bg, rgb(33, 48, 75))
  }

  :global(aside.toc > button  ){
	font-size: var(--toc-font-size, 30px);
	background: var(--toc-mobile-bg, rgb(10, 79, 206))


}
</style>