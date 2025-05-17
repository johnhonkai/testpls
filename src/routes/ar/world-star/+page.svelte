<svelte:head>
  <title>World Star</title> 

    <meta property="og:title" content="World Star"/>
    <meta property="og:description" content="Info for characters in World Star teams." />
    <meta property="og:image" content="https://i.imgur.com/J2Jd0hl.png" />
    <meta property="og:url" content="https://marisaimpact.com/ar/world-star" />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary_large_image">

    <link rel="canonical" href="https://marisaimpact.com/ar/world-star" />
</svelte:head>

<script lang="ts">
    import type { PageData } from '../world-star/$types';

    let { data }: { data: PageData } = $props();

  const dps = [
    { name: "Sparkle", image: "/images/valkportrait/sparkle.png" , type: "Qua" , element: "Fire" },
    { name: "Schicksal's Imperative", image: "/images/valkportrait/Theresa Schicksal's Imperative.png" , type: "Qua" , element: "Lightning" },
    { name: "Deepspace Anchor", image: "/images/valkportrait/Senadina Deepspace Anchor.png", type: "Sd" , element: "Lightning" },

  ];

  const support = [
    { name: "Ba-dum!", image: "/images/valkportrait/kiana badum.png" , type: "Sd" , element: "Fire" },
    { name: "Sparkle", image: "/images/valkportrait/sparkle.png" , type: "Qua" , element: "Fire" },
    { name: "Lone Planetfarer", image: "/images/valkportrait/Vita Lone Planetfarer.png", type: "Mech" , element: "Lightning" },
    { name: "HoFi", image: "/images/valkportrait/Kiana Herrscher of Finality.png" , type: "Img" , element: "Fire" },
    { name: "Schicksal's Imperative", image: "/images/valkportrait/Theresa Schicksal's Imperative.png" , type: "Qua" , element: "Lightning" },
    { name: "Lone Destruction", image: "/images/valkportrait/Lantern Lone Destruction.png" , type: "Psy" , element: "Fire" },
    { name: "Mad Pleasure", image: "/images/valkportrait/Thelema Mad Pleasure.png" , type: "Mech" , element: "Ice" },
    { name: "Deepspace Anchor", image: "/images/valkportrait/Senadina Deepspace Anchor.png", type: "Sd" , element: "Lightning" },
    { name: "Helia", image: "/images/valkportrait/Helia Valkyrie Boltstorm.png", type: "Mech" , element: "Lightning" },
    { name: "Coralie", image: "/images/valkportrait/Coralie Valkyrie Blastmetal.png", type: "Psy" , element: "Fire" },

  ];

  const utilities = {
        "Fast Reso Trigger": [
        { name: "Ba-dum!", image: "/images/valkportrait/kiana badum.png" },
        { name: "HoFi", image: "/images/valkportrait/Kiana Herrscher of Finality.png" },
    ],

  //      "Reso Mark Placer": [
  //      { name: "Deepspace Anchor", image: "/images/valkportrait/Senadina Deepspace Anchor.png" },
  //      { name: "Helia", image: "/images/valkportrait/Helia Valkyrie Boltstorm.png"},
  //  ],

        "Breach State": [
        { name: "Lone Planetfarer", image: "/images/valkportrait/Vita Lone Planetfarer.png" },
        { name: "Deepspace Anchor", image: "/images/valkportrait/Senadina Deepspace Anchor.png" },
    ],

        "AR Regen": [
        { name: "Lone Planetfarer", image: "/images/valkportrait/Vita Lone Planetfarer.png" },
    //    { name: "Mad Pleasure", image: "/images/valkportrait/Thelema Mad Pleasure.png" , details: "Has a unique aerial evasion spam tech. With signature weapon (gain 2 AR after evasion) and against the right attack, Thelema can provide the team a lot of AR regen in a short time." },

    ],

        Shieldbreak: [
    ],

    Hitcount: [
        { name: "Lone Destruction", image: "/images/valkportrait/Lantern Lone Destruction.png" },
        { name: "Lone Planetfarer", image: "/images/valkportrait/Vita Lone Planetfarer.png" },
        { name: "Helia", image: "/images/valkportrait/Helia Valkyrie Boltstorm.png" },
    ],

    Freeze: [
        {  name: "Mad Pleasure", image: "/images/valkportrait/Thelema Mad Pleasure.png" },
    ],

    Paralyze: [
        { name:  "Helia", image: "/images/valkportrait/Helia Valkyrie Boltstorm.png" },

    ],

    Ignite: [],

    Bleed: [

    ],


    "Multi-Target DMG Share": [
      { name: "Ba-dum!", image: "/images/valkportrait/kiana badum.png" }
    ],

    Stardust: [
            { name: "Ba-dum!", 
            image: "/images/valkportrait/kiana badum.png",
            details: "Badum can immediately reduce 8% of SD enemy's Max HP." },
           

    ],

    "Ult CD Reduction": [
      { name: "Sparkle", image: "/images/valkportrait/sparkle.png", }
    ],

    Bow: [
    ],

  };

  const state = $state({
    selectedChar: null
  });

   import html2canvas from 'html2canvas-pro';
  import { onMount , onDestroy , tick } from 'svelte';
	import Fa from 'svelte-fa';
  import { faCamera } from '@fortawesome/free-solid-svg-icons';
  
async function captureStats() {
  const target = document.getElementById('statsSection');
  const watermark = document.getElementById('watermark' );
  const toppart = document.getElementById('toppart' );

  if (!target || !watermark || !toppart) return;

  // Temporarily show the watermark
  watermark.style.display = 'block';
  toppart.style.display = 'block';

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
  toppart.style.display = 'none';
  
  // Trigger download
  const link = document.createElement('a');
  link.download = `world-star.png`;
  link.href = canvas.toDataURL();
  link.click();
}
</script>

<div class="relative w-full h-40 md:h-70 overflow-hidden "  id="bannerpic">

  <img
    src="/images/bg_ws.webp"
    alt="Header"
    class="w-full h-full object-cover [object-position:50%_70%] opacity-45"
  />


 
  <!-- Text overlay -->
  <div class="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 pb-3 md:pb-0 md:pt-4 z-10">
<h1 class="flex items-center gap-2 text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-md font-russoone italic tracking-wider text-shadow-lg/30">
  World Star
  <span class="text-xs md:text-lg font-normal bg-white/10 border border-white/20 px-2 ml-1 sm:ml-2 py-0.5 rounded-full text-slate-200">
    v8.2
  </span>
</h1>
    <p class="text-sm sm:text-lg text-slate-200 drop-shadow-sm">
      Overview for World Star teams


    </p>
  </div>
  

  <!-- Blur overlay at bottom -->
  <div class="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-base-100 to-transparent z-0"></div>

</div>

    <div class="flex justify-center mb-6 mt-20 " style="display:none">
    <button
      onclick={captureStats}
      class="px-4 py-2 rounded-md  font-medium transition cursor-pointer  text-xs sm:text-sm h-10 w-auto
            text-white hover:bg-gray-700">
        <span 
        class="relative z-10 flex items-center gap-2 cursor-pointer text-center">
          <Fa icon={faCamera} size="1.3x" />
        </span>  
    </button>
  </div>

<div class="relative max-w-7xl min-h-screen pb-10 text-white mx-auto bg-base-100" id="statsSection">

    <div class="relative w-full h-40 md:h-70 overflow-hidden "  id="toppart" style="display:none">

  <img
    src="/images/bg_ws.webp"
    alt="Header"
    class="w-full h-full object-cover [object-position:50%_70%] opacity-45"
  />


 
  <!-- Text overlay -->
  <div class="absolute inset-0 flex flex-col items-center justify-center text-white text-center  pb-3 md:pb-0 md:pt-4 z-10">
<h1 class="flex items-center gap-2 text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-md font-russoone italic tracking-wider text-shadow-lg/30">
  World Star
  <span class="text-xs md:text-lg font-normal bg-white/10 border border-white/20 px-2 ml-1 sm:ml-2 py-0.5 rounded-full text-slate-200">
    v8.2
  </span>
</h1>
    <p class="text-sm sm:text-lg text-slate-200 drop-shadow-sm">
      Overview for World Star teams


    </p>
  </div>
  

  <!-- Blur overlay at bottom -->
  <div class="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-base-100 to-transparent z-0"></div>

</div>
<div class="px-4 sm:px-6">

<section>
  <h2 class="text-xl sm:text-2xl font-semibold pt-2 cooltext">Overview</h2>
  <p class="text-sm sm:text-base text-gray-300 leading-relaxed sm:leading-loose mt-2">
    <span class="block ">
      <strong class="text-white">World Star</strong> characters can generate <span class="text-teal-400 font-medium">Domain Resonance Mark</span>.
      <br/>
      Teammates with <span class="text-teal-400 font-medium">Domain Resonance</span> tag can trigger the marks.
    </span>
  </p>
</section>


  <div class=" mx-auto space-y-12">

      <div class="divider"></div>

    <!-- DPS + Support Section Side-by-Side on Wide Screens -->
<div class="flex flex-col xl:flex-row gap-12 ">

  
  <!-- DPS Section -->
  <section class="flex-3">
    <h2 class="text-xl sm:text-2xl font-semibold  pb-2 cooltext">DPS</h2>
    <div class="flex flex-wrap gap-3">
      {#each dps as char}
        <div class="relative group p-1 hover:bg-gray-800 rounded transition w-fit">
          {#if char.type}
            <div class="absolute top-1 left-1 sm:left-0 sm:mx-1 w-7 z-10">
              <img src={`/images/type/icon_${char.type.toLowerCase()}.webp`} alt={char.type} class="w-6 sm:w-full h-full object-cover" />
            </div>
          {/if}

          {#if char.element}
            {#each (Array.isArray(char.element) ? char.element : [char.element]) as el, i}
              <div class="absolute left-1 sm:left-0 sm:mx-1 w-7 z-10" style={`top: ${2.0 + i * 2}rem`}>
                <img src={`/images/element/icon_${el.toLowerCase()}.webp`} alt={el} class="w-6 sm:w-full h-full object-cover" />
              </div>
            {/each}
          {/if}

          <img
            src={char.image}
            alt={char.name}
            class="rounded w-20 sm:w-24 h-auto aspect-square object-cover"
          />
        </div>
      {/each}
    </div>
  </section>



  <!-- Support Section -->
  <section class="flex-5">
    <h2 class="text-xl sm:text-2xl font-semibold pb-2 cooltext">Support</h2>
    <div class="flex flex-wrap gap-3">
      {#each support as char}


        <div class="relative group p-1 hover:bg-gray-800 rounded transition w-fit">

                            {#if char.type}
            <div class="absolute top-1 left-1 sm:left-0 sm:mx-1 w-7 z-10">
              <img src={`/images/type/icon_${char.type.toLowerCase()}.webp`} alt={char.type} class="w-6 sm:w-full h-full object-cover" />
            </div>
          {/if}

          {#if char.element}
            {#each (Array.isArray(char.element) ? char.element : [char.element]) as el, i}
              <div class="absolute left-1 sm:left-0 sm:mx-1 w-7 z-10" style={`top: ${2.0 + i * 2}rem`}>
                <img src={`/images/element/icon_${el.toLowerCase()}.webp`} alt={el} class="w-6 sm:w-full h-full object-cover" />
              </div>
            {/each}
          {/if}

          <img
            src={char.image}
            alt={char.name}
            class="rounded w-20 sm:w-24 h-auto aspect-square object-cover"
          />
        </div>
      {/each}
    </div>
  </section>

      
  <!-- Support Section -->
  <section class="flex-1">
    <h2 class="text-xl sm:text-2xl font-semibold pb-2 cooltext">AstralOp</h2>
    <div class="flex flex-wrap gap-3">

        <div class="relative group p-1 hover:bg-gray-800 rounded transition w-fit">


          <img
            src="/images/valkportrait/asop_songque.png"
            class="rounded w-20 sm:w-24 h-auto aspect-square object-cover"
          />
        </div>
    </div>
  </section>


</div>

  <div class="divider"></div>


    <!-- Utilities Section -->
    <section>
      <h2 class="text-xl sm:text-2xl font-semibold  py-2 mb-2 cooltext">Utilities</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 ">
        {#each Object.entries(utilities) as [label, chars]}
        {#if chars.length > 0}

          <div class="bg-zinc-900 rounded-lg p-4 space-y-2 justify-items-center">
            <h3 class="text-sm sm:text-base font-medium text-gray-300 text-center">{label}</h3>
              <div class={`grid gap-2 justify-items-center ${chars.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                {#each chars as char}
<div class="relative group p-1 hover:bg-gray-800 rounded transition cursor-pointer">
  <img
    src={char.image}
    alt={char.name}
    class="rounded w-12 sm:w-20 h-auto aspect-square object-cover"
  />



  <!-- Tooltip -->
  {#if char.details}
    <div class="absolute z-50 bottom-full  mb-2 w-48 sm:w-60 text-sm text-white bg-teal-800 p-2 rounded shadow-md opacity-0 group-hover:opacity-100 transition pointer-events-none">
      {char.details}
    </div>
  {/if}
</div>
                {/each}
              </div>

          </div>
         {/if}
        {/each}
      </div>


    </section>
  </div>



  </div>

  <div
  id="watermark"
  class="absolute top-10 right-4 opacity-70 text-xs text-white pointer-events-none select-none"
   style="display:none"
>
  <img src="/images/watermark.jpg" alt="Watermark" class="w-28 opacity-50" />
</div>
</div>