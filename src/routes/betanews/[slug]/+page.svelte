<!-- src/routes/blog/[slug]/+page.svelte -->

<svelte:head>
	<title>{data.title}</title> 
    <meta property="og:title" content={data.title} />
    <meta property="og:description" content="Honkai Impact Beta News" />
    <meta property="og:image" content="https://i.imgur.com/APjjbN5.png" />
    <meta property="og:url" content={`https://marisaimpact.com/betanews/${data.slug}`} />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary_large_image">

    <link rel="canonical" href="https://marisaimpact.com/classroom" />
</svelte:head>


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





	<!-- Main Content centered on larger screens -->
	<div class="flex justify-center mt-5 sm:my-20 px-4">
		<article
	class="prose prose-invert w-full max-w-[960px] px-6 py-8 rounded-2xl
		   prose-h1:mb-2 prose-h1:font-plusjakarta prose-h1:text-2xl  sm:prose-h1:text-3xl 
		   prose-h2:mt-8 prose-h2:mb-3 prose-h2:bg-gradient-to-r prose-h2:from-teal-600 prose-h2:to-teal-400  prose-h2:font-plusjakarta
		   prose-h2:text-black prose-h2:px-3 prose-h2:py-1 prose-h2:rounded-md prose-h2:font-semibold prose-h2:w-fit
		   prose-h3:text-azure-400 prose-h3:font-semibold prose-h3:text-lg sm:prose-h3:text-xl 


		   prose-h4:mt-8 sm:prose-h4:text-lg 

		     prose-a:text-sky-400 hover:prose-a:underline 
		   prose-li:text-sm sm:prose-li:text-base 

		   prose-p:text-sm sm:prose-p:text-base

		   "
		
  >

  <style>
	.prose h3::before {
    content: '';
    display: inline-block;
    height: 1.25rem;        /* h-5 */
    width: 0.25rem;         /* w-1 */
    background-color: #3b82f6; /* Tailwind bg-blue-500 */
    margin-right: 0.5rem;   /* mr-2 */
    position: relative;
    top: 0.2rem;           /* adjusts vertical alignment */
  }
  
  </style>
		<h1>{data.title}</h1>

		<!-- Render the blog content -->
		<svelte:component this={data.content} />

		
	</article>

</div>
