<svelte:head>
  <title>Valkyrie Select</title> 
    <meta property="og:title" content="Valkyrie Select" />
    <meta property="og:description" content="Honkai Impact Guide - Character Page" />
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
    { name: 'Physical', image: '/images/element/Core_Physical.png' },
    { name: 'Bleed', image: '/images/element/Core_Bleed_DMG.png' },
    { name: 'Ignite', image: '/images/element/ignite.png' }

  ];

  const astralRings = [
    'All',
    'Heavenly Grail',
    'Law of Ascension',
    'Wheel of Destiny',
    'Rite of Oblivion',
    'World Star',
    'Part 1'
  ];

 // Valkyrie character data with type, element, and astral ring properties
 const valkyries = [
  { name: '位面武器·失序时空', image: '/images/valkportrait/New Helia.png', type: 'Bio', element: 'Lightning', astralRing: ['Heavenly Grail'] , url: '/valk/ha',  badge: 'Beta', verdebut: 8.3, id:55},
  { name: 'Peregrine Sword', image: '/images/valkportrait/ps.png', type: 'Bio', element: ['Physical' , 'Bleed'], astralRing: ['Law of Ascension'] , url: '/valk/ps',  badge: 'New', verdebut: 8.2, id:54},
  { name: 'Ba-dum! Fiery Wishing Star', image: '/images/valkportrait/kiana badum.png', type: 'SD', element: 'Fire', astralRing: ['Law of Ascension'] , url: '/valk/badum', verdebut: 8.1, id:53},
  { name: 'Herrscher of Human: Ego', image: '/images/valkportrait/Elysia Herrscher of Human Ego.png', type: 'Psy', element: 'Ice', astralRing: ['Wheel of Destiny' , 'Part 1'],  url: '/valk/hoh', verdebut: 6.0, verdlc: 8.1, id:25},
  { name: 'Reign Solaris', image: '/images/valkportrait/dudu.png', type: 'Img', element: 'Physical', astralRing: ['Law of Ascension'] , url: '/valk/durandal' , verdebut: 8.0, id:16},
  { name: 'Thousand-Faced Maestro: Cameo!', image: '/images/valkportrait/sparkle.png', type: 'Qua', element: 'Fire', astralRing: ['World Star'] , url: '/valk/sparkle' , verdebut: 7.9, id:14},
  { name: 'Lone Planetfarer', image: '/images/valkportrait/Vita Lone Planetfarer.png', type: 'Mech', element: 'Lightning', astralRing: ['Rite of Oblivion'] , url: '/valk/lp' ,verdebut: 7.8, id:13},
  { name: "Schicksal's Imperative", image: "/images/valkportrait/Theresa Schicksal's Imperative.png", type: 'Qua', element: 'Lightning', astralRing: ['World Star'] , url: '/valk/simp', verdebut: 7.7, id:12 },
  { name: 'Jovial Deception: Shadowdimmer', image: '/images/valkportrait/Songque Jovial Deception.png', type: 'SD', element: 'Physical', astralRing: ['Wheel of Destiny'] , url: '/valk/jd', verdebut: 7.6, id:11},
  { name: 'Lone Destruction: Shadowchaser', image: '/images/valkportrait/Lantern Lone Destruction.png', type: 'Psy', element: 'Fire', astralRing: ['Wheel of Destiny'] , url: '/valk/lantern', verdebut: 7.5, id:10},
  { name: 'Mad Pleasure: Shadowbringer', image: '/images/valkportrait/Thelema Mad Pleasure.png', type: 'Mech', element: 'Ice', astralRing: ['Wheel of Destiny'] , url: '/valk/thelema', verdebut: 7.4, id:9},
  { name: 'Deepspace Anchor: First Light', image: '/images/valkportrait/Senadina Deepspace Anchor.png', type: 'SD', element: 'Lightning', astralRing: ['World Star'] , url: '/valk/sena', verdebut: 7.3, id:8 },
  { name: 'Valkyrie Boltstorm', image: '/images/valkportrait/Helia Valkyrie Boltstorm.png', type: 'Mech', element: 'Lightning', astralRing: ['World Star'] , url: '/valk/helia', verdebut: 7.3, id:7 },
  { name: 'Valkyrie Blastmetal', image: '/images/valkportrait/Coralie Valkyrie Blastmetal.png', type: 'Psy', element: 'Fire', astralRing: ['Rite of Oblivion'] , url: '/valk/coralie', verdebut: 7.3, id:6},
  { name: 'Fenghuang of Vicissitude', image: '/images/valkportrait/Fu Hua Fenghuang of Vicissitude.png', type: 'Bio', element: 'Fire', astralRing: ['Part 1'] , url: '/valk/fov', verdebut: 7.2, id:5},
  { name: 'Cosmic Expression', image: '/images/valkportrait/Griseo Cosmic Expression.png', type: 'SD', element: ['Physical' , 'Bleed'], astralRing: ['Part 1'] , url: '/valk/ce', verdebut: 7.1, id:15},
  { name: 'Lunar Vow: Crimson Love', image: '/images/valkportrait/Theresa Lunar Vow.png', type: 'Psy', element: ['Lightning' , 'Bleed'], astralRing: ['Part 1'] , url: '/valk/lv', verdebut: 7.0, id:52},
  { name: 'Miracle ☆ Magical Girl', image: '/images/valkportrait/Sirin Miracle Magical Girl.png', type: 'Mech', element: ['Fire' , 'Ignite'], astralRing: ['Part 1'] , url: '/valk/sirin', verdebut: 6.9, id:18},

  { name: 'Herrscher of Rebirth', image: '/images/valkportrait/Seele Herrscher of Rebirth.png', type: 'Psy', element: 'Physical', astralRing: ['Part 1'] , url: '/valk/horb', verdebut: 6.8, id:17},
  { name: 'Sugary Starburst', image: '/images/valkportrait/Kira Sugary Starburst.png', type: 'Mech', element: 'Ice', astralRing: ['Part 1'] , url: '/valk/kira', verdebut: 6.7, id:19},
  { name: 'Dreamweaver', image: '/images/valkportrait/Hare Dreamweaver.png', type: 'Mech', element: 'Physical', astralRing: ['Part 1'] , url: '/valk/dreamweaver', verdebut: 6.6,  id:20},
  { name: 'Terminal Aide 0017', image: '/images/valkportrait/Prometheus Terminal Aide.png', type: 'Img', element: 'Physical', astralRing: ['Part 1'] , url: '/valk/prom', verdebut: 6.6, id:24},

  { name: 'Valkyrie Quicksand', image: '/images/valkportrait/Susannah Valkyrie Quicksand.png', type: 'Qua', element: ['Physical' , 'Bleed'], astralRing: ['Part 1'] , url: '/valk/vq', verdebut: 6.5,  id:21},

  { name: 'Herrscher of Finality', image: '/images/valkportrait/Kiana Herrscher of Finality.png', type: 'Img', element: 'Fire', astralRing: ['Part 1', 'Rite of Oblivion'] , url: '/valk/hofi' , verdebut: 6.4, verdlc: 7.8, id:3 },
  { name: 'Herrscher of Origin', image: '/images/valkportrait/Mei Herrscher of Origin.png', type: 'Img', element: 'Lightning', astralRing: ['Part 1'] , url: '/valk/hoo', verdebut: 6.4, id:2 } ,
  

  { name: 'Herrscher of Truth', image: '/images/valkportrait/Bronya Herrscher of Truth.png', type: 'Img', element: 'Ice', astralRing: ['Part 1'] , url: '/valk/hotr', verdebut: 6.3, id:1 } ,

  { name: 'Chrono Navi', image: '/images/valkportrait/Chrono Navi.png', type: 'Mech', element: 'Fire', astralRing: ['Part 1'] , url: '/valk/cn', verdebut: 6.2, id:22},
  { name: 'Jade Knight', image: '/images/valkportrait/Sushang Jade Knight.png', type: 'Psy', element: 'Ice', astralRing: ['Part 1'] , url: '/valk/sushang', verdebut: 6.1, id:23},
  { name: 'Helical Contraption', image: '/images/valkportrait/VillV.png', type: 'Qua', element: 'Fire', astralRing: ['Part 1'] , url: '/valk/villv', verdebut: 5.9, id:26},
  { name: 'Starry Impression', image: '/images/valkportrait/Griseo Starry Impression.png', type: 'Psy', element: ['Physical' , 'Bleed'], astralRing: ['Part 1'] , url: '/valk/si', verdebut: 5.8, id:27},
  { name: 'Disciplinary Perdition', image: '/images/valkportrait/Aponia Disciplinary Perdition.png', type: 'Bio', element: 'Lightning', astralRing: ['Part 1'] , url: '/valk/aponia', verdebut: 5.7, id:28},
  { name: 'Golden Diva', image: '/images/valkportrait/Eden Golden Diva.png', type: 'Img', element: 'Lightning', astralRing: ['Part 1'] , url: '/valk/eden', verdebut: 5.7, id:29},
  { name: 'Reverist Calico', image: '/images/valkportrait/Pardofelis Reverist Calico.png', type: 'Img', element: 'Ice', astralRing: ['Part 1'] , url: '/valk/pardo',verdebut: 5.6, id:30},
  { name: 'Palatinus Equinox', image: '/images/valkportrait/Durandal Palatinus Equinox.png', type: 'Img', element: 'Physical', astralRing: ['Part 1'] , url: '/valk/pe', verdebut: 5.5, id:31},
  { name: 'Spina Astera', image: '/images/valkportrait/Rita Spina Astera.png', type: 'Mech', element: 'Fire', astralRing: ['Part 1'] , url: '/valk/spa', verdebut: 5.5,  id:32},
  { name: 'Silverwing N-EX', image: '/images/valkportrait/Bronya Silverwing N-EX.png', type: 'Bio', element: 'Ice', astralRing: ['Part 1'] , url: '/valk/silverwing', verdebut: 5.4,  id:33},
  { name: "Sweet 'n' Spicy", image: '/images/valkportrait/Carole.png', type: 'Mech', element: 'Physical', astralRing: ['Part 1'] , url: '/valk/carole', verdebut: 5.3,  id:34},
  { name: "Infinite Ouroboros", image: '/images/valkportrait/Mobius Infinite Ouroboros.png', type: 'Mech', element: 'Lightning', astralRing: ['Part 1'] , url: '/valk/mobius', verdebut: 5.2,  id:35},
  { name: "Midnight Absinthe", image: '/images/valkportrait/Raven Midnight Absinthe.png', type: 'Img', element: 'Fire', astralRing: ['Part 1'] , url: '/valk/raven', verdebut: 5.2,  id:36},
  { name: "Miss Pink Elf♪", image: '/images/valkportrait/Elysia Miss Pink Elf.png', type: 'Psy', element: 'Physical', astralRing: ['Part 1'] , url: '/valk/mpe', verdebut: 5.1,  id:37},
  { name: "Herrscher of Flamescion", image: '/images/valkportrait/Kiana Herrscher of Flamescion.png', type: 'Psy', element: 'Fire', astralRing: ['Part 1'] , url: '/valk/hofs', verdebut: 5.0,  id:38},
  { name: "Prinzessin der Verurteilung!", image: '/images/valkportrait/fischl.png', type: 'Bio', element: 'Lightning', astralRing: ['Part 1'] , url: '/valk/fischl', verdebut: 4.9,  id:39},
  { name: "Starchasm Nyx", image: '/images/valkportrait/Seele Starchasm Nyx.png', type: 'Qua', element: 'Ice', astralRing: ['Part 1'] , url: '/valk/nyx', verdebut: 4.8, id:40},
  { name: "Haxxor Bunny", image: '/images/valkportrait/Bronya Haxxor Bunny.png', type: 'Psy', element: 'Ice', astralRing: ['Part 1'] , url: '/valk/hb', verdebut: 4.7, id:41},
  { name: "Herrscher of Sentience", image: '/images/valkportrait/Fu Hua Herrscher of Sentience.png', type: 'Bio', element: 'Physical', astralRing: ['Part 1'] , url: '/valk/hos', verdebut: 4.6, verdlc: 7.0, id:42},
  { name: "Blazing Hope", image: '/images/valkportrait/Asuka Blazing Hope.png', type: 'Bio', element: 'Physical', astralRing: ['Part 1'] , url: '/valk/asuka', verdebut: 4.5, id:43},
  { name: "Dea Anchora", image: '/images/valkportrait/Durandal Dea Anchora.png', type: 'Bio', element: 'Fire', astralRing: ['Part 1'] , url: '/valk/da', verdebut: 4.4, id:44},
  { name: "Fervent Tempo Δ", image: '/images/valkportrait/FT.png', type: 'Psy', element: 'Physical', astralRing: ['Part 1'] , url: '/valk/ft', verdebut: 4.3, id:45},
  { name: "Fallen Rosemary", image: '/images/valkportrait/Rita Fallen Rosemary.png', type: 'Qua', element: 'Lightning', astralRing: ['Part 1'] , url: '/valk/fr', verdebut: 4.2, id:46},
  //{ name: "Danzai Spectramancer", image: '/images/valkportrait/Mei Danzai Spectramancer.png', type: 'Mech', element: 'Physical', astralRing: ['Part 1'] , url: '/valk/danzai', id:47},
  { name: "Herrscher of Thunder", image: '/images/valkportrait/Mei Herrscher of Thunder.png', type: 'Psy', element: 'Lightning', astralRing: ['Part 1'] , url: '/valk/hot', verdebut: 4.1, verdlc: 5.8, id:48},
  { name: "Starlit Astrologos", image: '/images/valkportrait/Theresa Starlit Astrologos.png', type: 'Bio', element: 'Physical', astralRing: ['Part 1'] , url: '/valk/sa', verdebut: 4.0,  id:49},
  { name: "Bright Knight: Excelsis", image: '/images/valkportrait/Durandal Bright Knight.png', type: 'Mech', element: 'Physical', astralRing: ['Part 1'] , url: '/valk/bk', verdebut: 3.9, verdlc: 4.7, id:50},
  { name: "Valkyrie Gloria", image: '/images/valkportrait/Durandal Valkyrie Gloria.png', type: 'Qua', element: 'Fire', astralRing: ['Part 1'] , url: '/valk/vg', verdebut: 3.8,  id:51},

];

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

let showFilters = false; // default hidden on mobile
let isMobile = false;

onMount(() => {
  const checkMobile = () => isMobile = window.innerWidth < 768;
  checkMobile();
  window.addEventListener('resize', checkMobile);
  return () => window.removeEventListener('resize', checkMobile);
});
</script>

<!-- Loading Screen -->
{#if isLoading}
  <div class="loading-screen fixed inset-0 bg-black flex items-center justify-center z-50">
    <span class="loading loading-spinner loading-lg text-secondary"></span>
    <p class="text-white mt-4">Loading...</p>
  </div>
{/if}


<section class="relative pt-4 mb-20">
  <div class="absolute top-0 w-full h-[90vh] z-[-10]" id="bgwave">
    <img src="/images/bg/wave_lantern.svg" alt="Lone Planetfarer" class="w-full h-full object-cover overflow-hidden" />
  </div>
  <div class="relative max-w-6xl mx-auto mt-5">
    <div class="flex items-center justify-center gap-2 mb-2">
      <h1 class="text-xl md:text-3xl font-bold text-center bg-linear-to-b from-white to-neutral-300 text-transparent bg-clip-text">
        Select a Valkyrie
      </h1>
    
      <!-- Toggle Button: Only visible on mobile -->
      <button
        on:click={() => showFilters = !showFilters}
        class="md:hidden btn btn-xs ml-2 text-white hover:bg-white hover:text-black"
        aria-label="Toggle Filters"
      >
      <Fa icon={faFilter} size="1.3x"  />

      </button>
    </div>
    {#if !isMobile || showFilters}
    <div transition:slide="{{ duration: 300 }}">

    <!-- Filter Containers -->
    <div class="flex flex-col md:flex-row justify-between gap-4 mb-4 mx-4">
      <!-- Filter by Type -->
      <div class="flex-1 p-0.5 md:p-2 bg-gray-100 rounded-lg">
        <div class="flex justify-center flex-wrap gap-0.5 md:gap-1">
          {#each types as type}
            <button
              type="button"
              title={type.name}
              class="btn btn-xs rounded-lg p-1 hover:bg-gray-200 active:bg-gray-300 transition-colors w-12 h-12"
              class:bg-blue-600={selectedType === type.name}
              on:click={() => selectFilter('type', type.name)}>
              <img src={type.image} alt={type.name} class="w-6 h-6 object-cover mb-1" />
            </button>
          {/each}
        </div>
      </div>

      <!-- Filter by Element -->
      <div class="flex-1 p-0.5 md:p-2 bg-gray-100 rounded-lg">
        <div class="flex justify-center flex-wrap gap-0.5 md:gap-1">
          {#each elements as element}
            <button
              type="button"
              title={element.name}
              class="btn btn-xs rounded-lg p-1 hover:bg-gray-200 active:bg-gray-300 transition-colors w-12 h-12"
              class:bg-blue-600={selectedElement === element.name}
              on:click={() => selectFilter('element', element.name)}>
              <img src={element.image} alt={element.name} class="w-6 h-6 object-cover mb-1" />
            </button>
          {/each}
        </div>
      </div>
    </div>

    <!-- Astral Ring Filter -->
    <div class="rounded-lg mb-6">
      <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 mx-4">
        {#each astralRings as astralRing}
          <button
            type="button"
            class="btn btnar text-center rounded-lg hover:bg-gray-200 hover:text-black active:bg-gray-300 transition-colors w-full lg:whitespace-nowrap"
            class:bg-blue-600={selectedAstralRing === astralRing}
            on:click={() => selectFilter('astralRing', astralRing)}>
            <span class="text-xs sm:text-sm md:text-base font-medium">{astralRing}</span>
          </button>
        {/each}
      </div>
    </div>

    <div class="flex justify-center">
      
    <button 
  on:click={() => sortByDLC = !sortByDLC}
  class=" w-60 py-2  text-white hover:bg-white hover:text-black transition btn btn-sm sm:btn-md "
>
<Fa icon={faSort} /> {sortByDLC ? 'Release + DLC Date' : 'Release Date'}
</button>

</div>
    </div>
{/if}

<!-- Valkyrie Grid -->
<div class=" mt-5 grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 gap-4 sm:gap-6">
  {#each sortedValkyries as valkyrie}
    <a 
      href={valkyrie.url} 
      class="flex flex-col items-center text-center rounded-sm" 
      on:mouseenter={() => preloadImages(valkyrie.url)} 
    >
      <!-- Valkyrie Image with Badge -->
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
        <div class="absolute top-1 left-0 sm:mx-1 w-7 sm:w-8 h-auto  text-white   z-10">
          <img src={`/images/type/icon_${valkyrie.type.toLowerCase()}.webp`} alt={valkyrie.type} class="w-full h-full object-cover overflow-hidden" />
        </div>
      {/if}


        {#if valkyrie.element}
        {#each (Array.isArray(valkyrie.element) ? valkyrie.element : [valkyrie.element]) as el, i}
          <div class="absolute left-0  sm:mx-1 w-7 sm:w-8 h-auto  text-white  z-10" style={`top: ${2.2 + (i * 2)}rem`}>
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
  
      <!-- Valkyrie Name -->
      <div class="text-xs sm:text-sm md:text-base font-medium mb-2 sm:leading-5 mt-1">{valkyrie.name}</div>
    </a>
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