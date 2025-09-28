<svelte:head>
<title>Part 2 Story Order</title> 

<meta property="og:title" content="Honkai Impact Story Order" />
<meta property="og:description" content="Story order for Part 2 Chapters and Events" />
<meta property="og:image" content="https://i.imgur.com/VZplzDF.png" />
<meta property="og:url" content="https://marisaimpact.com/story" />
<meta property="og:type" content="website" />

<meta name="twitter:card" content="summary_large_image">


<link rel="canonical"  />
</svelte:head>

<script lang="ts">
  import { storyOrder } from '$lib/data/storyOrder';
  import { onMount } from 'svelte';
	import Fa from 'svelte-fa';
import { faEyeSlash , faEye } from '@fortawesome/free-solid-svg-icons';

  let filter = 'all'; // Default filter to show all
  
$: filteredStories = storyOrder.filter((story) => {
  if (filter === 'all') return true;
  if (filter === 'main' ) return story.type === 'main' || story.type === 'animation';
  if (filter === 'main-event') return story.type === 'event' || story.type === 'event-animation' ;
  if (filter === 'side-event') return story.type === 'side';
  if (filter === 'animation') return story.type === 'animation' || story.type === 'promo-video' || story.type === 'event-animation';

  return false;
});

function selectFilter(selected: 'all' | 'main' | 'main-event' | 'side-event') {
  filter = selected;
}

  // Generate a YouTube search URL based on the story title
  function generateYouTubeSearchUrl(title: string): string {
    const query = encodeURIComponent(title); // Encode the title for use in the URL
    return `https://www.youtube.com/results?search_query=${query}`;
  }

  let container;
  let content;
  let shouldScroll = false;

  onMount(() => {
    if (content.scrollWidth > container.offsetWidth) {
      shouldScroll = true;
    }
  });

  let showSpoilerFree = false;

function toggleView() {
  showSpoilerFree = !showSpoilerFree;

}
</script>

<div class="relative w-full h-40 md:h-70 overflow-hidden "  id="bannerpic">

  <img
    src="https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/chapter//Ch2.webp"
    alt="Header"
    class="w-full h-full object-cover object-top opacity-35"
    />


 
  <!-- Text overlay -->
  <div class="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 pb-3 md:pb-0 md:pt-6 z-10">
    <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-md font-russoone italic tracking-wider text-shadow-lg/30 ">
      Story Order
    </h1>
    <p class="text-sm sm:text-lg text-slate-200 drop-shadow-sm">
      Part 2 Chapters and Events

    </p>
  </div>
  

  <!-- Blur overlay at bottom -->
  <div class="absolute bottom-0 left-0 w-full h-15 bg-gradient-to-t from-base-100 to-transparent z-0"></div>

</div>
<section class="max-w-[1600px] mx-auto px-4 mb-40">

<!-- Filter Buttons -->
<div class="w-full overflow-x-auto pb-2 mb-5 sm:pb-0">
  <div class="flex gap-3 justify-start sm:justify-center min-w-max px-4">
    {#each [
      { id: 'all', label: 'Show All' },
      { id: 'main', label: 'Main Story' },
      { id: 'main-event', label: 'Main Event' },
      { id: 'side-event', label: 'Side Event' },
      { id: 'animation', label: 'Animation' }
    ] as btn}
      <button
        on:click={() => selectFilter(btn.id)}
        class="cursor-pointer px-4 py-2 rounded-md border font-medium transition whitespace-nowrap text-xs sm:text-sm
               bg-gray-800 text-white border-gray-700 hover:bg-gray-700
               data-[active=true]:bg-white data-[active=true]:text-black"
        data-active={filter === btn.id}>
        {btn.label}
      </button>
    {/each}
  </div>
</div>


  <div class="flex justify-center mb-6">
    <button
      on:click={toggleView}
      class="px-4 py-2 rounded-md border font-medium transition cursor-pointer  text-xs sm:text-sm
             bg-gray-800 text-white border-gray-700 hover:bg-gray-700">
 

        <span 
        class="relative z-10 flex items-center gap-2 cursor-pointer">
        {#if !showSpoilerFree}
          <Fa icon={faEyeSlash} /> Show Spoiler-Free Version
        {:else}
          <Fa icon={faEye} /> Show Full Version
        {/if}
        </span>  



    </button>
  </div>

  {#if !showSpoilerFree}
  <!-- Story Grid -->
  <div class="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
    {#each filteredStories as story}
      <div class="bg-base-300 rounded-xl shadow-md p-4 transition hover:ring-2 hover:ring-white/10">
        <!-- Image with Badge -->
        <div class="relative mb-4">
          <img src={story.image} alt={story.title} class="w-full h-48 object-cover rounded-lg" />
        
          <!-- Top Left Badges -->
          <div class="absolute top-2 left-2 space-y-1 text-xs font-medium z-10">
            <span
              class="inline-block rounded-full px-2 py-0.5 bg-blue-600 text-white"
              class:bg-teal-800={story.type === 'main'}
              class:bg-blue-500={story.type === 'event' || story.type === 'event-animation'}

              >

{#if story.type === 'main'}
  Main Chapter
{:else if story.type === 'captainverse'}  
  Captainverse
{:else if story.type === 'captainverse-manga'}  
  Capverse Manga  
{:else if story.type === 'captainverse-animation'}  
  Capverse Animation 
{:else if story.type === 'alt-world'}  
  Alt World
{:else if story.type === 'event'}
  Main Event
{:else if story.type === 'side'}
  Side Event
{:else if story.type === 'manga'}
  Manga
{:else if story.type === 'chronicles'}
  Chronicles
{:else if story.type === 'openworld'}
  Open World
{:else if story.type === 'animation'}
  Animation
{:else if story.type === 'event-animation'}
  Event Animation  
{:else if story.type === 'promo-video'}
  Promo Video  
{/if}
            </span>
{#if story.type === 'event'}
  <span class="inline-block rounded-full px-2 py-0.5 bg-yellow-500 text-black">
{#if story.canon === 'computer'}
Computer
{:else if story.canon === 'dream'}
Dream
{:else if story.canon === 'main-world'}
Main World
{:else if story.canon === 'alt-world'}
Alt World
{/if}
  </span>
{/if}
          </div>
        
          <!-- Top Right Version Badge -->
        {#if story.type === 'manga' || story.type === 'captainverse-manga' }
         
        {:else}
          <div class="absolute top-1 right-2 z-10">
            <span class="inline-block text-xs font-semibold bg-gray-900 outline-gray-600 outline-1 text-white rounded-md px-2 py-0.5">
              v{story.version}
            </span>
          </div>
        {/if}  
        </div>


        <div bind:this={container} class=" overflow-hidden whitespace-nowrap">
          <div
            bind:this={content}
            class="inline-block"
            class:animate-scroll-to-end={shouldScroll}
          >
            <h2 class="text-sm xl:text-lg font-semibold text-white inline-block">
              {story.title}
            </h2>
          </div>
        </div>
                <p class="text-xs lg:text-sm text-gray-400 mb-1">
          {story.inGame ? 'Available in-game' : 'Not available in-game'}
        </p>
{#if story.link}
        <a
          href={story.link}
          target="_blank"
          class="text-xs lg:text-sm text-blue-400 hover:underline">

    {#if story.type == 'manga'  || story.type == 'captainverse-manga'}
          Read online →

    {:else}          
        Watch on YouTube →
    {/if}
        </a>
{:else}
                <a
          href={generateYouTubeSearchUrl("HI3 " + story.title)}
          target="_blank"
          class="text-sm text-blue-400 hover:underline">
          Search on YouTube →
        </a>
{/if}

      </div>
    {/each}
  </div>
  {:else}
  <!-- Spoiler-Free View -->
  <div class="overflow-x-auto rounded-lg border border-base-300 mx-auto max-w-4xl">
    <table class="min-w-full  text-sm text-left text-gray-300">
      <thead class="bg-base-200 text-xs uppercase text-gray-400">
        <tr >
          <th class="px-4 py-2 ">#</th>
          <th class="px-4 py-2">Title</th>
          <th class="px-4 py-2 text-center">Version</th>
          <th class="px-4 py-2 text-center">Type</th>
          <th class="px-4 py-2 text-center">Canon</th>
          <th class="px-4 py-2 text-center">In-Game</th>
          <th class="px-4 py-2 ">YouTube</th>
        </tr>
      </thead>
      <tbody>
        {#each filteredStories as story, index}
          <tr class="border-t border-base-300 hover:bg-base-200 text-xs sm:text-sm">
            <td class="px-4 py-2 ">{index + 1}</td>
            <td class="px-4 py-2 ">{story.title}</td>
            <td class="px-4 py-2 text-center">
              
              
        {#if story.type === 'manga'|| story.type === 'captainverse-manga' }
         
        {:else}
    v{story.version}

        {/if} 

            </td>
<td class="px-4 py-2 text-center">
{#if story.type === 'main'}
  Main Chapter
{:else if story.type === 'captainverse'}  
  Captainverse
{:else if story.type === 'captainverse-manga'}  
  Capverse Manga  
{:else if story.type === 'captainverse-animation'}  
  Capverse Animation     
{:else if story.type === 'alt-world'}  
  Alt World
{:else if story.type === 'event'}
  Event
{:else if story.type === 'event-animation'}
  Event Animation
{:else if story.type === 'side'}
  Side Event
{:else if story.type === 'manga'}
  Manga
{:else if story.type === 'chronicles'}
  Chronicles
{:else if story.type === 'openworld'}
  Open World
{:else if story.type === 'animation'}
  Animation
{:else if story.type === 'promo-video'}
  Promo Video    
{/if}
</td>

<td class="px-4 py-2 text-center">
{#if story.canon === 'computer'}
  Computer
{:else if story.canon === 'dream'}  
  Dream
{:else if story.canon === 'main-world'}  
  Main World  
{:else if story.canon === 'alt-world'}  
  Alt World
{/if}
</td>

            <td class="px-4 py-2 text-center">{story.inGame ? 'Yes' : 'No'}</td>
            <td class="px-4 py-2 ">
{#if story.link}
        <a
          href={story.link}
          target="_blank"
          class="text-sm text-blue-400 hover:underline">

    {#if story.type == 'manga' || story.type == 'captainverse-manga' }
          Read →

    {:else}          
        Watch →
    {/if}
        </a>
{:else}
                <a
          href={generateYouTubeSearchUrl("HI3 " + story.title)}
          target="_blank"
          class="text-sm text-blue-400 hover:underline">
          Search →
        </a>
{/if}
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  
{/if}

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

  @keyframes scroll {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-100%); }
}
</style>
