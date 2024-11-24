<script>
    import { onMount } from 'svelte';
    import Toc from 'svelte-toc'; // Import the TOC component
    export let data;

    let tocActive = false; // Control TOC rendering after mount
    let showToc = false; // Toggles TOC visibility in mobile view
    let showSearchModal = false; // Controls modal visibility
    let searchQuery = ''; // Stores the search query
    let searchResults = []; // Stores search results

    const { categorizedArticles, sortedCategories, allArticles } = data;

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

    function closeSearchModal() {
        showSearchModal = false;
        searchQuery = '';
        searchResults = [];
    }

	import { cn } from "$lib/utils/cn";
	import AnimatedShinyText from "$lib/components/ui/AnimatedShinyText.svelte";
</script>



<div class="z-10 sm:flex  items-center justify-center mt-10 ">
	<button on:click={() => (showSearchModal = true)}
		>
	<div
	  class={cn(
		"group rounded-full border border-black/5 bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
	  )}
	>
	  <AnimatedShinyText
		class=" inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400"

		>
		<span class="text-base sm:text-lg">✨ Search Articles</span>
  
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

<!-- Search Modal -->
{#if showSearchModal}
    <div class="modal modal-open">
        <div class="modal-box max-w-xl">
            <p class="text-xl font-bold mb-4">Search Articles</p>
            <input
                type="text"
                placeholder="Search for articles or keywords..."
                class="input input-bordered w-full mb-4"
                bind:value={searchQuery}
                on:input={handleSearchChange}
            />

            {#if searchResults.length > 0}
                <ul class="space-y-4">
                    {#each searchResults as result}
                        <li>
                            <a href={`/classroom/${result.slug}`} class="block p-4 bg-base-200 rounded-lg shadow hover:bg-base-300">
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


<div class="container mx-auto py-10 flex flex-row gap-4 mb-20">
	<!-- Left Sidebar -->
	<aside class="hidden xl:block xl:w-1/6 bg-base-200 text-base-content rounded-lg space-y-4 sticky top-16 self-start">
		<!-- Welcome Button/Image -->
		<div class="pt-4 bg-base-300 shadow-md rounded-lg mb-4 text-center">
			<a href="/classroom/welcome" class="block">
				<img src="/images/aichanread.webp" alt="welcome" class="w-12 h-12 mx-auto mb-2 hover:scale-110 transition-transform" />
			</a>
		</div>
		<!-- Categories and Articles -->
		<div class="menu bg-base-300 shadow-md rounded-lg">
			{#each sortedCategories as category}
				<div class="mb-2">
					<p class="menu-title text-slate-100 bg-emerald-700/50 rounded">{category}</p>
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

	<!-- Main Content -->
	<article class="prose grow mx-auto max-w-[960px] p-6 bg-base-100 rounded-lg  prose-h2:bg-gradient-to-r from-teal-600 to-teal-400 prose-h2:text-black  prose-h2:rounded   prose-h3:text-amber-300 prose-h2:w-fit prose-h2:px-2">		
		{#if data.title !== 'Welcome'}
		<h1>{data.title}</h1>
		{/if}
		<svelte:component this={data.content} />
	</article>

	<!-- Table of Contents -->
	{#if tocActive}
		<aside class="xl:w-1/6 sticky top-16 h-[calc(100vh-4rem)] bg-base-100 rounded-lg shadow-md block">
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

:global(aside.toc.mobile > nav ){
  background: var(--toc-mobile-bg, rgb(33, 48, 75))
}

:global(aside.toc > button  ){
  font-size: var(--toc-font-size, 30px);
  background: var(--toc-mobile-bg, rgb(10, 79, 206))


}
  </style>
