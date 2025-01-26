<script lang="ts">
  import { storyOrder } from '$lib/data/storyOrder';

  let filter = 'all'; // Default filter to show all
  $: filteredStories = storyOrder.filter((story) => {
    if (filter === 'all') return true;
    return story.type === filter;
  });

  function selectFilter(selected: 'all' | 'main' | 'event') {
    filter = selected;
  }

  // Generate a YouTube search URL based on the story title
  function generateYouTubeSearchUrl(title: string): string {
    const query = encodeURIComponent(title); // Encode the title for use in the URL
    return `https://www.youtube.com/results?search_query=${query}`;
  }
</script>

<section class="max-w-screen-xl mx-auto p-4">
  <h1 class="text-2xl font-bold text-center mb-6">Story Order</h1>

  <!-- Filter Buttons -->
  <div class="flex justify-center gap-4 mb-6">
    <button
      on:click={() => selectFilter('all')}
      class="btn"
      class:btn-active={filter === 'all'}>
      Show All
    </button>
    <button
      on:click={() => selectFilter('main')}
      class="btn"
      class:btn-active={filter === 'main'}>
      Main Chapters
    </button>
    <button
      on:click={() => selectFilter('event')}
      class="btn"
      class:btn-active={filter === 'event'}>
      Events
    </button>
  </div>

  <!-- Story Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each filteredStories as story}
      <div class="bg-gray-800 p-4 rounded-lg shadow-md relative">
        <!-- Image with Badge -->
        <div class="relative">
          <img src={story.image} alt={story.title} class="w-full h-48 object-cover rounded-md mb-4" />
          <!-- Main Chapter or Event Badge -->
          <div class="absolute top-2 left-2 space-y-1">
            <span
              class="badge badge-primary"
              class:badge-success={story.type === 'main'}
              class:badge-info={story.type === 'event'}>
              {story.type === 'main' ? 'Main Chapter' : 'Event'}
            </span>
            {#if story.type === 'event'}
              {#if story.canon}
                <!-- Canon Badge -->
                <span class="badge badge-warning">Canon</span>
              {:else}
                <!-- Not Canon Badge -->
                <span class="badge badge-warning">Not Canon</span>
              {/if}
            {/if}
          </div>
        </div>

        <!-- Title -->
        <h2 class="text-xl font-semibold mb-2">{story.title}</h2>

        <!-- In-Game Availability -->
        <p class="text-sm">
          {story.inGame ? 'Available in-game' : 'Not available in-game'}
        </p>

        <!-- Version -->
        <p class="text-sm">
          Released on version {story.version}
        </p>

        <!-- YouTube Search Link -->
        <a
          href={generateYouTubeSearchUrl(story.title)}
          target="_blank"
          class="text-blue-500 underline mb-2 block">
          Search on YouTube
        </a>
      </div>
    {/each}
  </div>
</section>

<style>
  .btn {
    padding: 0.5rem 1rem;
    background: #333;
    color: #fff;
    border: none;
    border-radius: 0.25rem;
    cursor: pointer;
    transition: background 0.3s;
  }
  .btn:hover {
    background: #555;
  }
  .btn-active {
    background: #007bff;
    color: white;
  }
</style>
