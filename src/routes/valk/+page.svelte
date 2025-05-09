<svelte:head>
  <title>Valkyrie Guide</title> 
    <meta property="og:title" content="Valkyrie Guide" />
    <meta property="og:description" content="Honkai Impact Character Guides" />
    <meta property="og:image" content="https://i.imgur.com/aXbdNbK.png" />
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
  import { types, elements, astralRings, valkyries } from '$lib/data/characterdata.js';

  let isLoading = true; // Track if the page is still loading

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
  let selectedType = 'All';
  let selectedElement = 'All';
  let selectedAstralRing = 'All';

  // Filter the valkyries based on the selected filters
  $: filteredValkyries = valkyries.filter(valk => {
    const typeMatch = selectedType === 'All' || valk.type === selectedType;
    const elementMatch = selectedElement === 'All' || valk.element.includes(selectedElement);
    const astralRingMatch = selectedAstralRing === 'All' || valk.astralRing.includes(selectedAstralRing);
    return typeMatch && elementMatch && astralRingMatch;
  });

  function selectFilter(type: 'type' | 'element' | 'astralRing', value: string) {
    if (type === 'type') selectedType = value;
    if (type === 'element') selectedElement = value;
    if (type === 'astralRing') selectedAstralRing = value;
  }

  
   // Wait for all images in the ValkyrieLink components to load
   onMount(() => {
    const imagePromises = valkyries.map((valkyrie) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = valkyrie.image;
        img.onload = () => resolve();
        img.onerror = () => resolve(); // Resolve even if the image fails to load
      });
    });

    Promise.all(imagePromises).then(() => {
      isLoading = false; // Hide the loading screen
    });
  });

  let sortByDLC = true;

  $: sortedValkyries = [...filteredValkyries].sort((a, b) => {
  const aVal = sortByDLC ? Math.max(a.verdebut ?? 0, a.verdlc ?? 0) : a.verdebut ?? 0;
  const bVal = sortByDLC ? Math.max(b.verdebut ?? 0, b.verdlc ?? 0) : b.verdebut ?? 0;
  return bVal - aVal; // descending
});


</script>

<!-- Loading Screen -->
{#if isLoading}
  <div class="loading-screen fixed inset-0 bg-black flex items-center justify-center z-50">
    <span class="loading loading-spinner loading-lg text-secondary"></span>
    <p class="text-white mt-4">Loading...</p>
  </div>
{/if}



<div class="relative w-full h-40 md:h-70 overflow-hidden "  id="bannerpic">

  <img
    src="https://img.goodfon.com/original/1920x1080/3/22/igra-anime-honkai-impact-3rd-devushka-oruzhie-bronia-mekh.jpg"
    alt="Header"
    class="w-full h-full object-cover [object-position:50%_25%] opacity-45"
    />


 
  <!-- Text overlay -->
  <div class="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 pb-3 md:pb-0 md:pt-7 z-10">
    <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-md font-russoone italic tracking-wider text-shadow-lg/30 ">
      Valkyrie Guide
    </h1>
    <p class="text-sm sm:text-lg text-slate-200 drop-shadow-sm">
      Selet A Valkyrie
    </p>
  </div>
  

  <!-- Blur overlay at bottom -->
  <div class="absolute bottom-0 left-0 w-full h-15 bg-gradient-to-t from-base-100 to-transparent z-0"></div>

</div>

  <div class="relative max-w-[1600px] mx-auto mb-20">

    <div class="flex flex-col 2xl:flex-row items-center 2xl:items-start">

    <!-- Filter Containers -->
    <div class="flex flex-col gap-1 w-full 2xl:w-74 md:flex-row 2xl:flex-col mb-4 text-center max-w-6xl 2xl:h-20  2xl:sticky 2xl:top-5 ">

      <!-- Filter by Type -->
       <div class="mx-0 items-left ml-4  hidden 2xl:block">
        <p class="text-left text-slate-300 hidden 2xl:block">
          Type
        </p>
       </div>
      <div class="flex-1 p-1 rounded-lg w-full md:w-auto 2xl:mb-4">
        <div class="join  whitespace-nowrap ">
          {#each types as type}
            <button
              type="button"
              title={type.name}
              class="btn join-item btn-sm p-1  h-10 w-12 sm:h-12 2xl:w-10 2xl:h-9 border shadow-none 
                hover:bg-gray-600 active:bg-gray-500 transition-colors 
                {selectedType === type.name ? ' text-white bg-blue-600' : ' text-base'}"
              on:click={() => selectFilter('type', type.name)}
            >
              <img src={type.image} alt={type.name} class="w-6 h-6 object-cover" />
            </button>
          {/each}
        </div>
      </div>
      

      <!-- Filter by Element -->
      <div class="mx-0 items-left ml-4  hidden 2xl:block">
        <p class="text-left text-slate-300 hidden 2xl:block">
          Element
        </p>
       </div>
      <div class="flex-1 p-1 rounded-lg w-full md:w-auto 2xl:mb-4">
        <div class="join  whitespace-nowrap">
          {#each elements as element}
            <button
              type="button"
              title={element.name}
              class="btn join-item btn-sm p-1  h-10 w-12 sm:h-12 2xl:w-10 2xl:h-9 border shadow-none 
               hover:bg-gray-600 active:bg-gray-500 transition-colors
                {selectedElement === element.name ? ' text-white bg-blue-600' : ' text-base'}"
              on:click={() => selectFilter('element', element.name)}
            >
            <img src={element.image} alt={element.name} class="w-6 h-6 object-cover" />

            </button>
          {/each}
        </div>
      </div>

          <!-- Astral Ring Filter -->
          <div class="mx-0 items-left ml-4  hidden 2xl:block">
            <p class="text-left text-slate-300">
              Astral Ring
            </p>
           </div>
          <div class="flex-1 p-1 rounded-lg w-full md:w-auto ">

    <div class="xl:mb-4">
      <select
        class="select select-ghost  w-full max-w-xs bg-base-200 h-10 sm:h-12 2xl:h-9  rounded-lg text-sm cursor-pointer focus:outline-none focus:bg-base-200"
        bind:value={selectedAstralRing}
        on:change={(e) => selectFilter('astralRing', e.target.value)}
      >
        <option disabled selected value="">Select Astral Ring</option>
        {#each astralRings as astralRing}
          <option value={astralRing}>{astralRing}</option>
        {/each}
      </select>
    </div>
          </div>

    
          <!-- Sort By Date and DLC -->

          <div class="mx-0 items-left ml-4  hidden 2xl:block">
            <p class="text-left text-slate-300">
              Sort By
            </p>
           </div>
           <button 
           on:click={() => sortByDLC = !sortByDLC}
           class="btn px-3 text-left text-white hover:bg-gray-700 hover:text-white transition 2xl:btn btn-sm sm:btn-md hidden 2xl:inline-block 2xl:h-9 2xl:w-auto"
           >
         {sortByDLC ? 'Release + DLC Date' : 'Release Date'}
         </button>

    </div>




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
      {#if valkyrie.badge}
        <span 
          class="absolute top-1 right-1 badge text-white text-xs font-bold px-1.5 py-0.5 z-10"
          class:badge-ghost={valkyrie.badge === 'Beta'}
          class:badge-primary={valkyrie.badge === 'New'}
          class:badge-accent={valkyrie.badge === 'Updated'}
        >
          {valkyrie.badge}
        </span>
      {/if}

      {#if valkyrie.type}
        <div class="absolute top-1 left-0 sm:mx-1 w-7 sm:w-8 z-10">
          <img src={`/images/type/icon_${valkyrie.type.toLowerCase()}.webp`} alt={valkyrie.type} class="w-full h-full object-cover" />
        </div>
      {/if}

      {#if valkyrie.element}
        {#each (Array.isArray(valkyrie.element) ? valkyrie.element : [valkyrie.element]) as el, i}
          <div class="absolute left-0 sm:mx-1 w-7 sm:w-8 z-10" style={`top: ${2.2 + (i * 2)}rem`}>
            <img src={`/images/element/icon_${el.toLowerCase()}.webp`} alt={el} class="w-full h-full object-cover" />
          </div>
        {/each}
      {/if}

      <img 
        src={valkyrie.image} 
        alt={valkyrie.name}
        class="w-24 h-24 sm:w-32 sm:h-32 object-cover mb-2 rounded-md transition-transform duration-300 transform group-hover:scale-110"
        style="view-transition-name: valkyrie-image-{valkyrie.id};"
      />
    </div>

    <!-- Name (Truncated) -->
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
  .loading-screen {
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    z-index: 9999;
  }

  .spinner {
    width: 50px;
    height: 50px;
    border: 6px solid rgba(255, 255, 255, 0.3);
    border-top: 6px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>