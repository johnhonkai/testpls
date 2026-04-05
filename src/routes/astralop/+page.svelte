<svelte:head>
  <title>Valkyrie Guide</title> 
    <meta property="og:title" content="Valkyrie Guide" />
    <meta property="og:description" content="Honkai Impact Character Guides" />
    <meta property="og:image" content="https://i.imgur.com/48ghF0s.png" />
    <meta property="og:url" content="https://marisaimpact.com/valk" />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary_large_image">

    <link rel="canonical" href="https://marisaimpact.com/valk" />
</svelte:head>



<script lang="ts">
    import { fade, slide } from 'svelte/transition';

  import Fa from 'svelte-fa';
  import { faSort } from '@fortawesome/free-solid-svg-icons';
  import { faFilter } from '@fortawesome/free-solid-svg-icons';
  import { faCog } from '@fortawesome/free-solid-svg-icons';

  import { onMount } from 'svelte';
  import { elements, astralRings, astralop } from '$lib/data/astralopdata.js';


  const imageIds = ["bgwavebox", "avabox", "valkpicbox"]; // IDs of divs containing images

  // Preload images dynamically by fetching their src attributes
  async function preloadImages(valkyrieUrl: string) {
    try {
      // Fetch the Valkyrie page content (simulate or fetch required details)
      const response = await fetch(valkyrieUrl);
      const pageContent = await response.text();

      // Create a temporary DOM parser to extract the image sources
      const parser = new DOMParser();
      const doc = parser.parseFromString(pageContent, "text/html");

      // Iterate over the IDs and preload their respective images
      for (const id of imageIds) {
        const imgElement = doc.querySelector(`#${id} img`);
        if (imgElement) {
          const imgSrc = imgElement.getAttribute("src");
          if (imgSrc) {
            const preloadImg = new Image();
            preloadImg.src = imgSrc;
            console.log(`Preloading image for ${id}: ${imgSrc}`); // Debug output
          }
        }
      }
    } catch (error) {
      console.error("Failed to preload images:", error);
    }
  }


  // Default selected filters
  let selectedElement = 'All';
  let selectedAstralRing = 'All';

  // Filter the valkyries based on the selected filters
  $: filteredValkyries = astralop.filter(valk => {
    const elementMatch = selectedElement === 'All' || valk.element.includes(selectedElement);
    const astralRingMatch = selectedAstralRing === 'All' || valk.astralRing.includes(selectedAstralRing);
    return elementMatch && astralRingMatch;
  });

  function selectFilter(type:  'element' | 'astralRing', value: string) {
    if (type === 'element') selectedElement = value;
    if (type === 'astralRing') selectedAstralRing = value;
  }


  let sortByDLC = true;

  $: sortedValkyries = [...filteredValkyries].sort((a, b) => {
  const aVal = sortByDLC ? Math.max(a.verdebut ?? 0, a.verdlc ?? 0) : a.verdebut ?? 0;
  const bVal = sortByDLC ? Math.max(b.verdebut ?? 0, b.verdlc ?? 0) : b.verdebut ?? 0;
  return bVal - aVal; // descending
});

// Tracks which valkyrie images have finished loading
let loadedImages: Record<string, boolean> = {};

function markImageLoaded(name: string) {
  loadedImages[name] = true;
}

// Ensure cached images are marked as loaded too
onMount(() => {
  sortedValkyries.forEach(valk => {
    const img = new Image();
    img.src = valk.image;

    if (img.complete) {
      // Already in cache and loaded
      loadedImages[valk.name] = true;
    } else {
      // Otherwise listen for load
      img.onload = () => markImageLoaded(valk.name);
      img.onerror = () => markImageLoaded(valk.name);
    }
  });
});
  const astralAbbrev = {
    'Grail of Infinitude': 'GoI',
    'Law of Ascension': 'LoA',
    'Rite of Oblivion': 'RoO',
    'Wheel of Destiny': 'WoD',
    'World Star': 'WS'
  };
</script>




<div class="relative w-full h-40 md:h-70 overflow-hidden "  id="bannerpic">

  <img
    src="/images/banner_valk.jpg"
    alt="Header"
    class="w-full h-full object-cover [object-position:50%_25%] opacity-45"
    />


 
  <!-- Text overlay -->
  <div class="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 pb-3 md:pb-0 md:pt-7 z-10">
    <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-md font-russoone italic tracking-wider text-shadow-lg/30 ">
      AstralOp Data
    </h1>
    <p class="text-sm sm:text-lg text-slate-200 drop-shadow-sm">
      Select An AstralOp
    </p>
  </div>
  

  <!-- Blur overlay at bottom -->
  <div class="absolute bottom-0 left-0 w-full h-15 bg-gradient-to-t from-base-100 to-transparent z-0"></div>

</div>

  <div class="relative max-w-[1600px] mx-auto mb-20">

    <div class="flex flex-col 2xl:flex-row items-center 2xl:items-start">





<!-- Valkyrie Grid -->
 
<div class=" mt-5 xl:mt-1 mx-auto  grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6  gap-4 sm:gap-6 2xl:w-6xl lg:max-w-5xl 2xl:max-w-6xl">
{#each sortedValkyries as valkyrie}
  <a 
    href={valkyrie.url} 
    class="flex flex-col items-center text-center rounded-sm w-full"
    on:mouseenter={() => preloadImages(valkyrie.url)}
  >
    <div class="flex flex-col justify-start items-center w-full h-35 sm:h-45">
      <!-- Image Wrapper -->
      <div class="relative w-24 h-24 sm:w-32 sm:h-32 overflow-hidden rounded-md group">
{#if valkyrie.astralRing}
  {#each (Array.isArray(valkyrie.astralRing) 
    ? valkyrie.astralRing 
    : [valkyrie.astralRing]) as ring, i}
    
    <span 
      class="absolute left-1 badge  text-white text-xs font-bold px-1.5 py-0.5 z-10 w-10"
      style="top: {0.25 + i * 1.7}rem;"
    >
      {astralAbbrev[ring] ?? ring}
    </span>

  {/each}
{/if}

        {#if valkyrie.element}
          {#each (Array.isArray(valkyrie.element) ? valkyrie.element : [valkyrie.element]) as el, i}
            <div class="absolute left-0 top-1 sm:mx-1 w-7 sm:w-8 z-10" >
              <img src={`/images/element/icon_${el.toLowerCase()}.webp`} alt={el} class="w-full h-full object-cover" />
            </div>
          {/each}
        {/if}

{#if loadedImages[valkyrie.name]}
  <img 
    src={valkyrie.image} 
    alt={valkyrie.name}
    class="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-110"
  />
{:else}
  <div class="absolute inset-0 bg-gray-700 animate-pulse rounded-md"></div>
{/if}
      </div>

      <!-- Name is always shown, outside image -->
      <div class="text-xs sm:text-sm md:text-base font-medium mt-1 leading-snug text-center h-[2.5em]">
        {valkyrie.name}
      </div>
    </div>
  </a>
{/each}

</div>

  </div>

  </div>
  
<style>


  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

    @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .animate-pulse {
    animation: pulse 1.5s ease-in-out infinite;
  }
</style>