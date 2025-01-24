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
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
      {#each filteredStories as story}
        <div class="bg-gray-800 p-4 rounded-lg shadow-md">
          <img src={story.image} alt={story.title} class="w-full h-48 object-cover rounded-md mb-4" />
          <h2 class="text-xl font-semibold mb-2">{story.title}</h2>
          <a
            href={story.youtubeLink}
            target="_blank"
            class="text-blue-500 underline mb-2 block">
            Watch on YouTube
          </a>
          <p class="text-sm">
            {story.inGame ? 'Available in-game' : 'Not available in-game'}
          </p>
          <p class="text-sm">
            {story.type === 'main' ? 'Main Story' : 'Event'}
          </p>
          <p class="text-sm">
            Released on version {story.version}
          </p>

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
  