<script lang="ts">
  import ValkyrieLink from '$lib/components/ValkyrieLink.svelte';
  import { onMount } from 'svelte';

  let isLoading = true; // Track if the page is still loading

  // Filter options
  const types = [
    { name: 'All', image: '/images/type/IconNULL.png' },
    { name: 'Psy', image: '/images/type/IconPSI.png' },
    { name: 'Mech', image: '/images/type/IconMECH.png' },
    { name: 'Bio', image: '/images/type/IconBIO.png' },
    { name: 'Qua', image: '/images/type/IconQUA.png' },
    { name: 'Img', image: '/images/type/IconIMG.png' },
    { name: 'SD', image: '/images/type/IconSD.webp' }
  ];

  const elements = [
    { name: 'All', image: '/images/type/IconNULL.png' },
    { name: 'Lightning', image: '/images/element/Core_Lightning_DMG.png' },
    { name: 'Ice', image: '/images/element/Core_Ice_DMG.png' },
    { name: 'Fire', image: '/images/element/Core_Fire_DMG.png' },
    { name: 'Physical', image: '/images/element/Core_Physical.png' }
  ];

  const astralRings = [
    'All',
    'Reason of Promotion',
    'World Star',
    'Wheel of Destiny',
    'Rite of Oblivion',
    'Part 1'
  ];

 // Valkyrie character data with type, element, and astral ring properties
 const valkyries = [
  { name: 'Durandal', image: '/images/valkportrait/dudu.png', type: 'Img', element: 'Physical', astralRing: ['Reason of Promotion'] , url: '/valk/durandal' , badge: 'Beta', id:16},
  { name: 'Thousand-Faced Maestro: Cameo!', image: '/images/valkportrait/sparkle.png', type: 'Qua', element: 'Fire', astralRing: ['World Star'] , url: '/valk/sparkle' , badge: 'New', id:14},
  { name: 'Lone Planetfarer', image: '/images/valkportrait/Vita Lone Planetfarer.png', type: 'Mech', element: 'Lightning', astralRing: ['Rite of Oblivion'] , url: '/valk/lp' , id:13},
  { name: "Schicksal's Imperative", image: "/images/valkportrait/Theresa Schicksal's Imperative.png", type: 'Qua', element: 'Lightning', astralRing: ['World Star'] , url: '/valk/simp', id:12 },
  { name: 'Jovial Deception: Shadowdimmer', image: '/images/valkportrait/Songque Jovial Deception.png', type: 'SD', element: 'Physical', astralRing: ['Wheel of Destiny'] , url: '/valk/jd', id:11},
  { name: 'Lone Destruction: Shadowchaser', image: '/images/valkportrait/Lantern Lone Destruction.png', type: 'Psy', element: 'Fire', astralRing: ['Wheel of Destiny'] , url: '/valk/lantern', id:10},
  { name: 'Mad Pleasure: Shadowbringer', image: '/images/valkportrait/Thelema Mad Pleasure.png', type: 'Mech', element: 'Ice', astralRing: ['Wheel of Destiny'] , url: '/valk/thelema', id:9},
  { name: 'Deepspace Anchor: First Light', image: '/images/valkportrait/Senadina Deepspace Anchor.png', type: 'SD', element: 'Lightning', astralRing: ['World Star'] , url: '/valk/sena', id:8 },
  { name: 'Valkyrie Boltstorm', image: '/images/valkportrait/Helia Valkyrie Boltstorm.png', type: 'Mech', element: 'Lightning', astralRing: ['World Star'] , url: '/valk/helia', id:7 },
  { name: 'Valkyrie Blastmetal', image: '/images/valkportrait/Coralie Valkyrie Blastmetal.png', type: 'Psy', element: 'Fire', astralRing: ['Rite of Oblivion'] , url: '/valk/coralie', id:6},
  { name: 'Fenghuang of Vicissitude', image: '/images/valkportrait/Fu Hua Fenghuang of Vicissitude.png', type: 'Bio', element: 'Fire', astralRing: ['Part 1'] , url: '/valk/fov', id:5},
  //{ name: 'Cosmic Expression', image: '/images/valkportrait/Griseo Cosmic Expression.png', type: 'SD', element: 'Physical', astralRing: ['Part 1'] , url: '/valk/ce', id:15},
  { name: 'Lunar Vow', image: '/images/valkportrait/Theresa Lunar Vow.png', type: 'Psy', element: 'Lightning', astralRing: ['Part 1'] , url: '/valk/lv', id:4},
  { name: 'Herrscher of Finality', image: '/images/valkportrait/Kiana Herrscher of Finality.png', type: 'Img', element: 'Fire', astralRing: ['Part 1', 'Rite of Oblivion'] , url: '/valk/hofi' , id:3 },
  { name: 'Herrscher of Origin', image: '/images/valkportrait/Mei Herrscher of Origin.png', type: 'Img', element: 'Lightning', astralRing: ['Part 1'] , url: '/valk/hoo', id:2 } ,
  { name: 'Herrscher of Truth', image: '/images/valkportrait/Bronya Herrscher of Truth.png', type: 'Img', element: 'Ice', astralRing: ['Part 1'] , url: '/valk/hotr', id:1 } ,

];

  // Default selected filters
  let selectedType = 'All';
  let selectedElement = 'All';
  let selectedAstralRing = 'All';

  // Filter the valkyries based on the selected filters
  $: filteredValkyries = valkyries.filter(valk => {
    const typeMatch = selectedType === 'All' || valk.type === selectedType;
    const elementMatch = selectedElement === 'All' || valk.element === selectedElement;
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

  
</script>

<!-- Loading Screen -->
{#if isLoading}
  <div class="loading-screen fixed inset-0 bg-black flex items-center justify-center z-50">
    <span class="loading loading-spinner loading-lg text-secondary"></span>
    <p class="text-white mt-4">Loading...</p>
  </div>
{/if}
<section class="relative pt-4">
  <div class="absolute top-0 w-full h-[90vh] z-[-10]" id="bgwave">
    <img src="/images/bg/wave_lantern.svg" alt="Lone Planetfarer" class="w-full h-full object-cover overflow-hidden" />
  </div>
  <div class="relative max-w-5xl mx-auto mt-5">
    <h1
    class="text-xl md:text-3xl font-bold text-center bg-gradient-to-b from-white to-neutral-300 text-transparent bg-clip-text mb-3"
  >
  Select a Valkyrie
  </h1>
    <!-- Filter Containers -->
    <div class="flex flex-col md:flex-row justify-between gap-4 mb-4 mx-4">
      <!-- Filter by Type -->
      <div class="flex-1 p-0.5 md:p-2 bg-gray-100 rounded-lg">
        <div class="flex justify-center flex-wrap gap-0.5 md:gap-1">
          {#each types as type}
            <button
              type="button"
              class="btn btn-xs rounded-lg p-1 hover:bg-gray-200 active:bg-gray-300 transition-colors w-12 h-12"
              class:bg-gray-300={selectedType === type.name}
              on:click={() => selectFilter('type', type.name)}>
              <img src={type.image} alt={type.name} class="w-6 h-6 object-cover mb-1" />
            </button>
          {/each}
        </div>
      </div>

      <!-- Filter by Element -->
      <div class="flex-1 p-0.5 md:p-2 bg-gray-100 rounded-lg ">
        <div class="flex justify-center flex-wrap gap-1">
          {#each elements as element}
            <button
              type="button"
              class="btn btn-xs rounded-lg p-1 hover:bg-gray-200 active:bg-gray-300 transition-colors w-12 h-12"
              class:bg-gray-300={selectedElement === element.name}
              on:click={() => selectFilter('element', element.name)}>
              <img src={element.image} alt={element.name} class="w-6 h-6 object-cover mb-1" />
            </button>
          {/each}
        </div>
      </div>
    </div>

    <!-- Astral Ring Filter -->
    <div class="rounded-lg mb-8">
      <div class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 gap-2 mx-4">
        {#each astralRings as astralRing}
          <button
            type="button"
            class="btn btnar text-center rounded-lg hover:bg-gray-200 hover:text-black active:bg-gray-300 transition-colors w-full lg:whitespace-nowrap"
            class:bg-gray-300={selectedAstralRing === astralRing}
            class:text-black={selectedAstralRing === astralRing}
            on:click={() => selectFilter('astralRing', astralRing)}>
            <span class="text-xs sm:text-sm md:text-base font-medium">{astralRing}</span>
          </button>
        {/each}
      </div>
    </div>

    <!-- Valkyrie Grid -->
    <div class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 gap-4 sm:gap-6">
      {#each filteredValkyries as valkyrie}
        <ValkyrieLink valkyrie={valkyrie} />
      {/each}
    </div>
  </div>
</section>

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