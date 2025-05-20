<script lang="ts">
    import type { PageData } from '../tier-list/$types';
    import {  valkyries } from '$lib/data/characterdata.js';


    let { data }: { data: PageData } = $props();

      const relevant = [
  {
    ...valkyries.find(v => v.name === 'Peregrine Sword'),
    role: ['DPS', 'SUP']
  },
  {
    ...valkyries.find(v => v.name === 'Ba-dum! Fiery Wishing Star'),
    role: ['DPS', 'SUP']
  },
    {
    ...valkyries.find(v => v.name === 'Reign Solaris'),
    role: [ 'DPS']
  },
    {
    ...valkyries.find(v => v.name === 'Lone Planetfarer'),
    role: ['SUP']
  },
      {
    ...valkyries.find(v => v.name === 'Jovial Deception: Shadowdimmer'),
    role: ['SUP']
  },
  ];



  const usedOccasionally = [
  {
    ...valkyries.find(v => v.name === 'Herrscher of Human: Ego'),
    role: ['DPS']
  },
    {
    ...valkyries.find(v => v.name === 'Reign Solaris'),
    role: [ 'SUP']
  },
      {
    ...valkyries.find(v => v.name === 'Thousand-Faced Maestro: Cameo!'),
    role: ['DPS', 'SUP']
  },

          {
    ...valkyries.find(v => v.name === 'Mad Pleasure: Shadowbringer'),
    role: [ 'SUP']
  },
        {
    ...valkyries.find(v => v.name === 'Deepspace Anchor: First Light'),
    role: [ 'SUP']
  },
  ];

  const rarelyUsed = [
  {
    ...valkyries.find(v => v.name === 'Herrscher of Human: Ego'),
    role: ['SUP']
  },

        {
    ...valkyries.find(v => v.name === 'Lone Planetfarer'),
    role: ['DPS']
  },
      {
    ...valkyries.find(v => v.name === 'Herrscher of Finality'),
    role: ['DPS', 'SUP']
  },
    {
    ...valkyries.find(v => v.name === "Schicksal's Imperative"),
    role: ['DPS', 'SUP']
  },
  

        {
    ...valkyries.find(v => v.name === 'Jovial Deception: Shadowdimmer'),
    role: ['DPS']
  },
      {
    ...valkyries.find(v => v.name === 'Lone Destruction: Shadowchaser'),
    role: ['DPS', 'SUP']
  },
          {
    ...valkyries.find(v => v.name === 'Mad Pleasure: Shadowbringer'),
    role: ['DPS']
  },
          {
    ...valkyries.find(v => v.name === 'Deepspace Anchor: First Light'),
    role: ['DPS']
  },
          {
    ...valkyries.find(v => v.name === 'Fenghuang of Vicissitude'),
    role: ['DPS']
  },

            {
    ...valkyries.find(v => v.name === 'Lunar Vow: Crimson Love'),
    role: ['DPS']
  },
          {
    ...valkyries.find(v => v.name === 'Herrscher of Sentience'),
    role: ['DPS', 'SUP']
  },
            {
    ...valkyries.find(v => v.name === 'Miracle ☆ Magical Girl'),
    role: ['DPS']
  },
          {
    ...valkyries.find(v => v.name === 'Herrscher of Rebirth'),
    role: ['DPS', 'SUP']
  },
            {
    ...valkyries.find(v => v.name === 'Dreamweaver'),
    role: ['DPS']
  },
            {
    ...valkyries.find(v => v.name === 'Herrscher of Origin'),
    role: ['DPS', 'SUP']
  },
             {
    ...valkyries.find(v => v.name === 'Herrscher of Truth'),
    role: ['SUP']
  },   
  ];

  const categories = [
    {
      title: 'Relevant',
      color: 'bg-red-800',
      data: relevant
    },
    {
      title: 'Used Occasionally',
      color: 'bg-teal-800',
      data: usedOccasionally
    },
    {
      title: 'Rarely Used / Still Used in Memorial Arena',
      color: 'bg-amber-800',
      data: rarelyUsed
    }
  ];

  import html2canvas from 'html2canvas-pro';
  import { onMount , onDestroy , tick } from 'svelte';
	import Fa from 'svelte-fa';
  import { faCamera } from '@fortawesome/free-solid-svg-icons';
  
async function captureStats() {
  const target = document.getElementById('statsSection');
  const watermark = document.getElementById('watermark');

  if (!target || !watermark) return;

  // Temporarily show the watermark
  watermark.style.display = 'block';

  // Wait for the DOM to update
  await tick();

  // Capture screenshot
  const canvas = await html2canvas(target, {
    useCORS: true,
    allowTaint: true,
    scale: 2
  });

  // Hide watermark after capture
  watermark.style.display = 'none';

  // Trigger download
  const link = document.createElement('a');
  link.download = `best-characters-v8.2.png`;
  link.href = canvas.toDataURL();
  link.click();
}
</script>




<div class="relative w-full h-40 md:h-70 overflow-hidden "  id="bannerpic">

  <img
    src="/images/bridge.webp"
    alt="Header"
    class="w-full h-full object-cover opacity-45"
  />


 
  <!-- Text overlay -->
  <div class="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 pb-3 md:pb-0 md:pt-4 z-10">
<h1 class="flex items-center gap-2 text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-md font-russoone italic tracking-wider text-shadow-lg/30">
  Best Valkyries
  <span class="text-xs md:text-lg font-normal bg-white/10 border border-white/20 px-2 ml-1 sm:ml-2 py-0.5 rounded-full text-slate-200">
    v8.2
  </span>
</h1>
    <p class="text-sm sm:text-lg text-slate-200 drop-shadow-sm">
      Only for reference, this is not a pull priority recommendation.


    </p>
  </div>

  <!-- Blur overlay at bottom -->
  <div class="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-base-100 to-transparent z-0"></div>

</div>

    <div class="flex justify-center mb-6 hidden">
    <button
      on:click={captureStats}
      class="px-4 py-2 rounded-md  font-medium transition cursor-pointer  text-xs sm:text-sm h-10 w-auto
            text-white hover:bg-gray-700">
        <span 
        class="relative z-10 flex items-center gap-2 cursor-pointer text-center">
          <Fa icon={faCamera} size="1.3x" />
        </span>  
    </button>
  </div>

<div class="relative max-w-5xl mx-auto px-4 py-10 space-y-10 bg-base-100 " id="statsSection">

<div class="flex flex-col items-center justify-center  -mt-7">

<div>
<h1 class=" hidden flex items-center gap-2 text-3xl sm:text-4xl font-bold drop-shadow-md font-russoone italic tracking-wider text-shadow-lg/30">
  Best Valkyries
  <span class="text-xs md:text-lg font-normal bg-white/10 border border-white/20 px-2 ml-1 sm:ml-2 py-0.5 rounded-full text-slate-200">
    v8.2
  </span>
</h1>
</div>  

<div class="mt-2 -mb-5 p-2 text-sm">
  <p>
    Note: This is not a pull priority list. For F2P / Monthly players, due to how meta works (all valks are kinda balanced now and have their own niche) , and how patches are longer (Monthly players can get new S-rank fullgear every patch, and f2p can get new S-rank fullgear every one or two patches),
    it's better to: <br/>
    1. Save until you can guarantee valk + full gear. <br/>
    2. Then, get the latest valk early in the patch.
  </p>
</div>
</div>
  {#each categories as category}
    <section class="rounded-2xl shadow-lg p-3 border border-gray-800 bg-base-300 mb-8">
      <h2 class={`text-base sm:text-xl rounded py-1 ${category.color} text-white font-semibold mb-4 text-center`}>
        {category.title}
      </h2>
      <div class="flex flex-wrap gap-4 sm:gap-8 justify-center items-baseline">

{#each category.data as char}

<!-- Character card -->
<div class="relative group p-1 hover:bg-gray-800 rounded transition w-fit">
  <!-- Fixed-height badge area -->
  <div class="absolute top-2 right-2 flex flex-col justify-start items-end gap-1 z-20 min-h-[3.5rem]">
    {#if char.role && char.role.includes('DPS')}
      <span class="inline-block text-xs font-semibold bg-rose-500 outline-red-600 outline-1 text-white rounded-md px-2 py-0.5">
        DPS
      </span>
    {/if}
    {#if char.role && char.role.includes('SUP')}
      <span class="inline-block text-xs font-semibold bg-blue-500 outline-blue-600 outline-1 text-white rounded-md px-2 py-0.5">
        SUP
      </span>
    {/if}
  </div>

  <!-- Type Icon -->
  {#if char.type}
    <div class="absolute top-1 left-1 sm:left-0 sm:mx-1 w-7 z-10">
      <img src={`/images/type/icon_${char.type.toLowerCase()}.webp`} alt={char.type} class="w-6 sm:w-full h-full object-cover" />
    </div>
  {/if}

  <!-- Element Icon(s) -->
  {#if char.element}
    {#each (Array.isArray(char.element) ? char.element : [char.element]) as el, i}
      <div class="absolute left-1 sm:left-0 sm:mx-1 w-7 z-10" style={`top: ${2.2 + i * 2}rem`}>
        <img src={`/images/element/icon_${el.toLowerCase()}.webp`} alt={el} class="w-6 sm:w-full h-full object-cover" />
      </div>
    {/each}
  {/if}

  <!-- Character image and name -->
  <img src={char.image} alt={char.name} class="rounded w-24 sm:w-28 h-auto aspect-square object-cover" />
  <p class="text-xs text-foreground mt-2 w-24 sm:w-28 h-8 sm:h-10 overflow-hidden text-center">{char.name}</p>
</div>


{/each}
</div>
    </section>
  {/each}

  <div
  id="watermark"
  class="absolute top-5 right-4 opacity-70 text-xs text-white pointer-events-none select-none"
  style="display:none"
>
  <img src="/images/watermark.jpg" alt="Watermark" class="w-28 opacity-50" />
</div>  
</div>