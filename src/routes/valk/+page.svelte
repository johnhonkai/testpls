<script lang="ts">
  import ValkyrieLink from '$lib/components/ValkyrieLink.svelte';
  import { onMount } from 'svelte';
  import { isLoading2 } from '$lib/stores/loading'; // Shared loading state store

  let isLoading = true; // Local loading state for the Valkyrie page
  let loadingTimer: NodeJS.Timeout; // Fallback timer

  // Check if all images are loaded
  function checkElementsLoaded() {
    const images = Array.from(document.getElementsByTagName('img'));
    return images.every(img => img.complete && img.naturalWidth > 0);
  }

  // Handle page mounting
  onMount(() => {
    // Reset global loading state when returning to the Valkyrie page
    isLoading2.set(false);

    // Start a fallback to hide the local loading after 3 seconds
    loadingTimer = setTimeout(() => {
      isLoading = false; // Fallback in case images take too long to load
    }, 3000);

    let checkInterval: NodeJS.Timeout;

    // Periodically check for images to load
    checkInterval = setInterval(() => {
      if (checkElementsLoaded()) {
        clearInterval(checkInterval);
        clearTimeout(loadingTimer); // Clear fallback timer
        isLoading = false; // Hide local loading
      }
    }, 100);

    // Cleanup timers when unmounting
    return () => {
      clearInterval(checkInterval);
      clearTimeout(loadingTimer);
    };
  });

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
    'World Star',
    'Wheel of Destiny',
    'Rite of Oblivion',
    'Part 1'
  ];

  // Valkyrie data
  const valkyries = [
  { name: 'Sparkle', image: '/images/valkportrait/sparkle.png', type: 'Qua', element: 'Fire', astralRing: ['World Star'] , url: '/valk/sparkle' , badge: 'Beta', id:14},
  { name: 'Lone Planetfarer', image: '/images/valkportrait/Vita Lone Planetfarer.png', type: 'Mech', element: 'Lightning', astralRing: ['Rite of Oblivion'] , url: '/valk/lp' , badge: 'New', id:13},
  { name: "Schicksal's Imperative", image: "/images/valkportrait/Theresa Schicksal's Imperative.png", type: 'Qua', element: 'Lightning', astralRing: ['World Star'] , url: '/valk/simp', id:12 },
  { name: 'Jovial Deception: Shadowdimmer', image: '/images/valkportrait/Songque Jovial Deception.png', type: 'SD', element: 'Physical', astralRing: ['Wheel of Destiny'] , url: '/valk/jd', id:11},
  { name: 'Lone Destruction: Shadowchaser', image: '/images/valkportrait/Lantern Lone Destruction.png', type: 'Psy', element: 'Fire', astralRing: ['Wheel of Destiny'] , url: '/valk/lantern', id:10},
  { name: 'Mad Pleasure: Shadowbringer', image: '/images/valkportrait/Thelema Mad Pleasure.png', type: 'Mech', element: 'Ice', astralRing: ['Wheel of Destiny'] , url: '/valk/thelema', id:9},
  { name: 'Deepspace Anchor: First Light', image: '/images/valkportrait/Senadina Deepspace Anchor.png', type: 'SD', element: 'Lightning', astralRing: ['World Star'] , url: '/valk/sena', id:8 },
  { name: 'Valkyrie Boltstorm', image: '/images/valkportrait/Helia Valkyrie Boltstorm.png', type: 'Mech', element: 'Lightning', astralRing: ['World Star'] , url: '/valk/helia', id:7 },
  { name: 'Valkyrie Blastmetal', image: '/images/valkportrait/Coralie Valkyrie Blastmetal.png', type: 'Psy', element: 'Fire', astralRing: ['Rite of Oblivion'] , url: '/valk/coralie', id:6},
  { name: 'Fenghuang of Vicissitude', image: '/images/valkportrait/Fu Hua Fenghuang of Vicissitude.png', type: 'Bio', element: 'Fire', astralRing: ['Part 1'] , url: '/valk/fov', id:5},
  { name: 'Cosmic Expression', image: '/images/valkportrait/Griseo Cosmic Expression.png', type: 'SD', element: 'Physical', astralRing: ['Part 1'] , url: '/valk/ce', id:15},
  { name: 'Lunar Vow', image: '/images/valkportrait/Theresa Lunar Vow.png', type: 'Psy', element: 'Lightning', astralRing: ['Part 1'] , url: '/valk/lv', id:4},
  { name: 'Herrscher of Finality', image: '/images/valkportrait/Kiana Herrscher of Finality.png', type: 'Img', element: 'Fire', astralRing: ['Part 1', 'Rite of Oblivion'] , url: '/valk/hofi' ,  badge: 'Updated', id:3 },
  { name: 'Herrscher of Origin', image: '/images/valkportrait/Mei Herrscher of Origin.png', type: 'Img', element: 'Lightning', astralRing: ['Part 1'] , url: '/valk/hoo', id:2 } ,
  { name: 'Herrscher of Truth', image: '/images/valkportrait/Bronya Herrscher of Truth.png', type: 'Img', element: 'Ice', astralRing: ['Part 1'] , url: '/valk/hotr', id:1 } ,

];

  // Default filters
  let selectedType = 'All';
  let selectedElement = 'All';
  let selectedAstralRing = 'All';

  // Filter Valkyries based on the selected filters
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
</script>

<!-- Loading Screen for Local Images -->
{#if isLoading}
  <div class="loading-screen fixed inset-0 bg-black flex items-center justify-center z-50">
    <span class="loading loading-spinner loading-lg text-secondary"></span>
    <p class="text-white mt-4">Loading...</p>
  </div>
{/if}

<!-- Shared Loading Indicator -->
{#if $isLoading2}
  <div class="loading-screen fixed inset-0 bg-opacity-75 flex items-center justify-center z-50">
    <span class="loading loading-spinner loading-lg text-secondary"></span>
    <p class="text-white mt-4">Loading...</p>
  </div>
{/if}

<section class="relative pt-4">
  <!-- Valkyrie content -->
  <div class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 gap-4">
    {#each filteredValkyries as valkyrie}
      <ValkyrieLink valkyrie={valkyrie} />
    {/each}
  </div>
</section>

<style>
  .loading-screen {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    z-index: 9999;
  }
</style>
