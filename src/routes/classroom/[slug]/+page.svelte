
<svelte:head>
	<title>{data.title}</title> 
    <meta property="og:title" content={data.title} />
    <meta property="og:description" content="Learn the basics of Honkai Impact 3rd" />
    <meta property="og:image" content={data.ogimage} />
    <meta property="og:url" content={`https://marisaimpact.com/classroom/${data.slug}`} />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary_large_image">

    <link rel="canonical" href="https://marisaimpact.com/classroom" />
</svelte:head>

<script>
    import { onMount } from 'svelte';
    import Toc from 'svelte-toc'; // Import the TOC component
    import sidebar from '$lib/data/sidebar.json';

    export let data;

    let tocActive = false; // Control TOC rendering after mount
    let showToc = false; // Toggles TOC visibility in mobile view
    let showSearchModal = false; // Controls modal visibility
    let searchQuery = ''; // Stores the search query
    let searchResults = []; // Stores search results
    let searchInput; // Reference to the search input element

    const { categorizedArticles, sortedCategories } = data;

    // Reconstruct allArticles from categorizedArticles
    const allArticles = Object.values(categorizedArticles).flat();

    onMount(() => {
        tocActive = true; // Set tocActive to true once the component mounts
    });

    function toggleToc() {
        showToc = !showToc;
    }

    
    // Utility function to get a clean excerpt
    function getExcerpt(rawContent, query) {
        const lowerContent = rawContent.toLowerCase();
        const lowerQuery = query.toLowerCase();

        const queryIndex = lowerContent.indexOf(lowerQuery);
        if (queryIndex === -1) return ''; // Return empty if the query is not found

        // Get the surrounding text around the query
        const excerptStart = Math.max(0, queryIndex - 50); // Get 50 characters before the query
        const excerptEnd = Math.min(rawContent.length, queryIndex + 50); // Get 50 characters after the query
        const excerpt = rawContent.slice(excerptStart, excerptEnd);

        // Highlight the query in the excerpt
        const highlightedExcerpt = excerpt.replace(
            new RegExp(`(${query})`, 'gi'),
            '<span class="underline animate-pulse rounded-md text-fuchsia-400">$1</span>'
        );

        return highlightedExcerpt;
    }

    // Function to perform search
    function searchArticles(query) {
        const lowerQuery = query.toLowerCase(); // Normalize query for case-insensitive search
        searchResults = []; // Reset results

        for (const article of allArticles) {
            if (
                article.title.toLowerCase().includes(lowerQuery) || // Search in title
                article.rawContent.toLowerCase().includes(lowerQuery) // Search in raw content
            ) {
                searchResults.push({
                    ...article,
                    excerpt: getExcerpt(article.rawContent, query), // Add the excerpt with highlighted query
                });
            }
        }
    }


    function handleSearchChange(event) {
        searchQuery = event.target.value;
        searchArticles(searchQuery);
    }

    // Automatically focus the search input when the modal opens
    $: if (showSearchModal) {
        setTimeout(() => searchInput?.focus(), 0);
    }

    function closeSearchModal() {
        showSearchModal = false;
        searchQuery = '';
        searchResults = [];
    }

    import { cn } from "$lib/utils/cn";
    import AnimatedShinyText from "$lib/components/ui/AnimatedShinyText.svelte";

    
</script>



  <!-- Dropdown Button -->
<div class="flex justify-center xl:hidden ">
  <div class=" mt-4 pt-4 max-w-[600px]">
    <select
        class="select select-bordered w-full"
        on:change={(event) => (window.location.href = event.target.value)}
    >
        <option disabled selected>-- Select an Article --</option>
        {#each sortedCategories as category}
            <optgroup label={category}>
                {#each categorizedArticles[category] as article}
                    <option value={`/classroom/${article.slug}`}>
                        {article.title}
                    </option>
                {/each}
            </optgroup>
        {/each}
    </select>
</div>
</div>




<!-- Search Modal -->
{#if showSearchModal}
    <div
        class="modal modal-open  items-start top-10"
        on:click={(event) => {
            // Close modal if the click target is the backdrop
            if (event.target.classList.contains('modal')) {
                closeSearchModal();
            }
        }}
    >
        <div
            class="modal-box max-w-xl"
            on:click={(event) => event.stopPropagation()}
        >
            <p class="text-xl font-bold mb-4">Search Articles</p>
            <input
                type="text"
                placeholder="Search for articles or keywords..."
                class="input input-bordered w-full mb-4"
                bind:value={searchQuery}
                bind:this={searchInput} 
                on:input={handleSearchChange}
            />

            {#if searchResults.length > 0}
                <ul class="space-y-4">
                    {#each searchResults as result}
                        <li>
                            <a href={`/classroom/${result.slug}`} class="block p-4 bg-base-200 rounded-lg shadow-sm hover:bg-base-300">
                                <p class="font-semibold">{result.title}</p>
                                <p class="text-sm text-gray-500">
                                    <span>...{@html result.excerpt}...</span>
                                </p>
                            </a>
                        </li>
                    {/each}
                </ul>
            {:else if searchQuery.trim() !== ''}
                <p class="text-sm text-gray-500">No results found for "{searchQuery}"</p>
            {/if}

            <div class="modal-action">
                <button class="btn" on:click={closeSearchModal}>Close</button>
            </div>
        </div>
    </div>
{/if}


<div class="container mx-auto sm:mt-10 flex flex-row mb-20">
    <!-- Left Sidebar -->
    <aside class="z-100 hidden xl:flex flex-col w-72 bg-base-200 text-base-content p-2 space-y-4 overflow-y-auto fixed top-0 left-0 h-screen ">
      <!-- Welcome Button/Image -->
      <div class="pt-4 mb-4 text-center">
        <a href="/classroom/welcome" class="block">
          <img src="/images/aichanread.webp" alt="welcome" class="w-12 h-12 mx-auto mb-2 hover:scale-110 transition-transform" />
        </a>
      </div>
  
      <!-- Categories and Articles -->
      <div class="menu  rounded-lg">
        {#each sortedCategories as category}
          <div class="mb-2">
            <p class="menu-title text-slate-100 bg-emerald-700/50 rounded-sm">{category}</p>
            <ul>
              {#each categorizedArticles[category] as article}
                <li>
                  <a
                    href={`/classroom/${article.slug}`}
                    class={`menu-item hover:text-emerald-300 ${article.slug === data.slug ? 'text-emerald-400 ' : ''}`}
                  >
                    {article.title}
                  </a>
                </li>
              {/each}
            </ul>
          </div>
        {/each}
      </div>
    </aside>
  
    <!-- Main content area with left margin to account for sidebar -->
    <div class="flex-1 ml-0 xl:ml-64 px-4">
      <div class="container mx-auto flex flex-row gap-4 mb-20 pt-4">
        <!-- Main Content -->
<article
  class="prose prose-invert grow mx-auto md:max-w-[960px] px-6 py-8 rounded-2xl 
         prose-h1:mb-2 prose-h1:font-plusjakarta prose-h1:text-2xl  sm:prose-h1:text-3xl 
         prose-h2:mt-12 prose-h2:mb-3 prose-h2:bg-gradient-to-r prose-h2:from-teal-600 prose-h2:to-teal-400  prose-h2:font-plusjakarta
         prose-h2:text-black prose-h2:px-3 prose-h2:py-1 prose-h2:rounded-md prose-h2:font-semibold prose-h2:w-fit
         prose-h2:text-lg sm:prose-h2:text-xl  

         prose-h3:text-gray-300 prose-h3:font-semibold prose-h3:text-lg sm:prose-h3:text-xl 

         		   prose-h4:mt-8 sm:prose-h4:text-lg 



         prose-li:marker:text-teal-400 prose-a:text-sky-400 hover:prose-a:underline

         prose-li:text-sm sm:prose-li:text-base  prose-ul:pb-3

		     prose-p:text-sm sm:prose-p:text-base 

         "
>

  <style>
	.prose h3::before {
    content: '';
    display: inline-block;
    height: 1.25rem;        /* h-5 */
    width: 0.25rem;         /* w-1 */
    background-color: #14b8a6; /* Tailwind bg-blue-500 */
    margin-right: 0.5rem;   /* mr-2 */
    position: relative;
    top: 0.2rem;           /* adjusts vertical alignment */
  }
  
  </style>

  {#if data.title !== 'Welcome'}
    <h1>{data.title}</h1>
    <div class="text-sm text-slate-400 italic ml-0.5 mb-4  tracking-wide ">Updated for Version {data.update}</div>
  {/if}
  <svelte:component this={data.content} />
</article>
  
        <!-- TOC (Right Sidebar) -->
        {#if tocActive}
        
          <aside class="xl:w-1/6 sticky top-16 h-[calc(100vh-4rem)] bg-base-100 rounded-lg  hidden 2xl:block ">
            
<div class="z-10 hidden lg:flex  items-center justify-center xl:mt-10 ">
	<button on:click={() => (showSearchModal = true)}
		>
	<div
	  class={cn(
		"group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
	  )}
	>
	  <AnimatedShinyText
		class=" inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 dark:hover:text-neutral-400"

		>
		<span class="text-base lg:text-lg">✨ Search Articles</span>
  
		<svg
		  xmlns="http://www.w3.org/2000/svg"
		  width="24"
		  height="24"
		  viewBox="0 0 24 24"
		  fill="none"
		  stroke="currentColor"
		  stroke-width="2"
		  stroke-linecap="round"
		  stroke-linejoin="round"
		  class="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
		  ><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg
		>
	  </AnimatedShinyText>
	</div>
</button>
  </div>
            <Toc class="toc p-4 rounded-lg " breakpoint={1500} />
          </aside>
        {/if}
      </div>
    </div>
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
