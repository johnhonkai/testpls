<script>
	// @ts-nocheck
	import { onMount } from 'svelte';
	import Toc from 'svelte-toc'; // Import the TOC component
	export let data;

	let tocActive = false; // Control TOC rendering after mount
	let showToc = false; // Toggles TOC visibility in mobile view
	let showSearchModal = false; // Controls modal visibility
	let searchQuery = ''; // Stores the search query
	let searchResults = []; // Stores search results

	const { categorizedArticles, sortedCategories, allArticles } = data;

	// Ensure TOC is activated after the content is rendered
	onMount(() => {
		tocActive = true; // Set tocActive to true once the component mounts
	});

	// Function to toggle TOC visibility
	function toggleToc() {
		showToc = !showToc;
	}

	// Function to perform search
	function searchArticles(query) {


		searchResults = allArticles.filter(article => {
			// Search in title or keywords
			return (
				article.title.toLowerCase().includes(query.toLowerCase()) 

			);
		});
	}

	// Function to handle search query change
	function handleSearchChange(event) {
		searchQuery = event.target.value;
		searchArticles(searchQuery);
	}

	// Close the search modal
	function closeSearchModal() {
		showSearchModal = false;
		searchQuery = '';
		searchResults = [];
	}
</script>

<!-- Search Button -->
<div class=" flex justify-center mt-10">
	<button
		class="btn btn-primary"
		on:click={() => (showSearchModal = true)}
	>
		Search
	</button>
</div>

<!-- Search Modal -->
{#if showSearchModal}
	<div class="modal modal-open">
		<div class="modal-box max-w-xl">
			<h2 class="text-xl font-bold mb-4">Search Articles</h2>
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
								<h3 class="font-semibold">{result.title} </h3>
								<p class="text-sm text-gray-500">
									Keywords: {result.keywords?.join(', ') || 'None'}
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
	<article class="prose grow mx-auto max-w-[960px] p-6 bg-base-100 rounded-lg">
		<h1>{data.title}</h1>
		<svelte:component this={data.content} />
	</article>

	<!-- Table of Contents -->
	{#if tocActive}
		<aside class="xl:w-1/6 sticky top-16 h-[calc(100vh-4rem)] bg-base-100 rounded-lg shadow-md block">
			<Toc class="toc p-4 rounded-lg shadow-lg" breakpoint={1500} />
		</aside>
	{/if}
</div>
