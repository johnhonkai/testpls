<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

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
  
    // Valkyrie character data with type, element, and astral ring properties
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



</script>
  
  
<section class="relative pt-4">
  <div class="absolute   top-0 w-full h-[90vh] z-[-10] ">    
    <img src="/images/bg/wave_hotr.svg" alt="Lone Planetfarer" class="w-full h-full object-cover overflow-hidden" /> 
  </div>
    <div class="relative max-w-5xl mx-auto">
      <h1 class="text-xl md:text-3xl font-bold text-center mb-3">Select a Valkyrie</h1>
  
      <!-- Filter Containers -->
      <div class="flex flex-col md:flex-row justify-between gap-4 mb-4 "> <!-- Stack on mobile, row on larger screens -->
        <!-- Filter by Type -->
        <div class="flex-1 p-0.5 md:p-2 bg-gray-100 rounded-lg">
          <div class="flex justify-center flex-wrap gap-0.5 md:gap-1"> <!-- Adjusted flexbox and gap to align properly -->
            {#each types as type}
              <button
                type="button"
                class="btn btn-xs rounded-lg p-1 hover:bg-gray-200 active:bg-gray-300 transition-colors w-12 h-12" 
                class:bg-gray-300={selectedType === type.name}
                on:click={() => selectFilter('type', type.name)}
              >
                <img src={type.image} alt={type.name} class="w-6 h-6 object-cover mb-1" /> <!-- Smaller image size -->
              </button>
            {/each}
          </div>
        </div>
  
        <!-- Filter by Element -->
        <div class="flex-1 p-0.5 md:p-2 bg-gray-100 rounded-lg">
          <div class="flex justify-center flex-wrap gap-1"> <!-- Adjusted flexbox and gap to align properly -->
            {#each elements as element}
              <button
                type="button"
                class="btn btn-xs rounded-lg p-1 hover:bg-gray-200 active:bg-gray-300 transition-colors w-12 h-12" 
                class:bg-gray-300={selectedElement === element.name}
                on:click={() => selectFilter('element', element.name)}
              >
                <img src={element.image} alt={element.name} class="w-6 h-6 object-cover mb-1" /> <!-- Smaller image size -->
              </button>
            {/each}
          </div>
        </div>
      </div>
  
      <!-- Astral Ring Filter -->
      <div class="  rounded-lg mb-8">
        <div class="grid grid-cols-3 sm:grid-cols-5 gap-2"> <!-- 3 buttons per row on mobile -->
          {#each astralRings as astralRing}
            <button
              type="button"
              class="btn btnar text-center rounded-lg hover:bg-gray-200 active:bg-gray-300 transition-colors w-full whitespace-nowrap " 
              class:bg-gray-300={selectedAstralRing === astralRing} 
              class:text-black={selectedAstralRing === astralRing}
              on:click={() => selectFilter('astralRing', astralRing)}
            >
              <span class="text-xs sm:text-sm md:text-base font-medium ">{astralRing}</span> 
            </button>
          {/each}
        </div>
      </div>
  
 <!-- Valkyrie Grid -->

 <div class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 gap-4 sm:gap-6 ">
  {#each filteredValkyries as valkyrie}
    <a href={valkyrie.url} class=" flex flex-col items-center text-center  rounded " data-sveltekit-preload-data>
      <!-- Valkyrie Image with Relative Wrapper -->
      <div class="relative w-24 h-24 sm:w-32 sm:h-32 overflow-hidden rounded-md group ">
        <!-- Badge for New or Updated -->
        {#if valkyrie.badge}
          <span class="absolute top-1 left-1 badge text-white text-xs font-bold px-1.5 py-0.5 z-10 " 
                class:badge-ghost={valkyrie.badge === 'Beta'}
                class:badge-secondary={valkyrie.badge === 'New'}
                class:badge-accent={valkyrie.badge === 'Updated'}>
            {valkyrie.badge}
          </span>
        {/if}

        <img src={valkyrie.image} alt={valkyrie.name} 
        class="w-24 h-24 sm:w-32 sm:h-32 object-cover mb-2 rounded-md transition-transform duration-300 transform group-hover:scale-110" 
        style ="view-transition-name: valkyrie-image-{valkyrie.id};"

        />

      </div>
      <!-- Valkyrie Name -->
      <div class="text-xs sm:text-sm md:text-base font-medium mb-2 sm:leading-5 mt-1 ">{valkyrie.name}</div>

    </a>

  {/each}
</div>





  
</section>