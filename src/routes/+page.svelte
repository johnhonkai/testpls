
<slot /> <!-- This will render the content of each page -->

<svelte:head>
  <title>Honkai Impact Guide Website</title> 
    <meta property="og:title" content="Honkai Impact Guide Website - Marisa Impact" />
    <meta property="og:description" content="Honkai Impact 3rd Guides, Character Builds, Beta News and More." />
    <meta property="og:image" content="https://i.imgur.com/MJiD6X5.png" />
    <meta property="og:url" content="https://marisaimpact.com" />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary_large_image">

    <link rel="canonical" href="https://marisaimpact.com" />
</svelte:head>

<script lang="ts">
  import { onMount } from 'svelte';
  import { faCopy } from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa';
  import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

  function copyToClipboard(code: string) {
    navigator.clipboard.writeText(code);
  }
  // IDs of images to wait for
  const imageIds = ['bannerpic', 'news1', 'news2', 'news3', 'content1' , 'content2'];

  let isLoading = true;

  onMount(() => {
    const promises = imageIds.map((id) => {
      return new Promise<void>((resolve) => {
        const container = document.getElementById(id);
        if (!container) {
          console.warn(`Element with ID ${id} not found`);
          resolve(); // Resolve immediately if the element is missing
          return;
        }

        const img = container.querySelector('img');
        if (img?.complete) {
          resolve(); // Image already loaded
        } else if (img) {
          img.addEventListener('load', () => resolve(), { once: true });
          img.addEventListener('error', () => {
            console.error(`Error loading image for ID ${id}`);
            resolve(); // Resolve even if the image fails to load
          }, { once: true });
        } else {
          console.warn(`No image found inside element with ID ${id}`);
          resolve(); // Resolve immediately if no <img> is found
        }
      });
    });

    // Add a fallback timeout
    const timeout = new Promise<void>((resolve) => {
      setTimeout(() => {
        console.warn('Timeout reached, proceeding to show page');
        resolve();
      }, 10000); // Adjust timeout as needed (10 seconds here)
    });

    // Wait for all images to load or timeout
    Promise.race([Promise.all(promises), timeout]).then(() => {
      isLoading = false; // Hide the loading state
    });
  });

  
  let isClicked = false;
  let imageSrc = '/images/durandal.webp';

  // Function to handle image click
  function handleClick() {
    isClicked = true;
    imageSrc = '/images/durandal2.webp';

    // Revert to the original image after a few seconds
    setTimeout(() => {
      imageSrc = '/images/durandal.webp';
      isClicked = false;
    }, 3000); // Adjust time as needed
  }


  let regionalServerInfo = '';
  let cnServerInfo = '';
  
  onMount(() => {
      updatePatchTime();
  });

  function updatePatchTime() {
      const regionalStartDate = new Date('2025-4-27'); // Start date Regional Servers
      const cnStartDate = new Date('2025-5-30');       // Start date CN Servers

      const currentWeekRegional = calculateWeek(regionalStartDate);
      const currentWeekCN = calculateWeek(cnStartDate);

      regionalServerInfo = `Current: v8.2 Week ${currentWeekRegional}`;
      cnServerInfo = `Current: v8.3 Week ${currentWeekCN}`;
  }

  function calculateWeek(startDate: Date): number {
    const now = new Date();
    const msInWeek = 1000 * 60 * 60 * 24 * 7;

    // Convert current time to UTC+8 by adding 8 hours (8 * 60 * 60 * 1000 ms)
    const nowUTC8 = new Date(now.getTime() + 8 * 60 * 60 * 1000);
    
    const diffInWeeks = Math.floor((Date.UTC(nowUTC8.getUTCFullYear(), nowUTC8.getUTCMonth(), nowUTC8.getUTCDate())
        - Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate())) / msInWeek);

    return diffInWeeks + 1;
}

  // Abyss difficulty selection
  let difficulty = 'Agony 3';

  // Base values (Agony 3)
  const baseF2P = 20145;
  const baseMonthly = 25305;
  const baseBP = 27305;

  // Adjusted values
  $: bonus = difficulty === 'Red Lotus' ? 1280 : difficulty === 'Nirvana' ? 1600 : 0;
  $: f2p = baseF2P + bonus;
  $: monthly = baseMonthly + bonus;
  $: bp = baseBP + bonus;
</script>


<!-- Loading Screen -->
{#if isLoading}
<div class="loading-screen fixed inset-0  flex items-center justify-center z-50">
  <span class="loading loading-spinner loading-lg text-secondary"></span>
    <p class="text-white mt-4">Loading...</p>
  </div>
{/if}




<div class="relative w-full h-60 md:h-80 overflow-hidden cursor-pointer" on:click={handleClick}  id="bannerpic">

  <img
    src="/images/bridge.webp"
    alt="Header"
    class="w-full h-full object-cover opacity-45"
  />


 
  <!-- Text overlay -->
  <div class="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 pb-3 md:pb-0 md:pt-4 z-10">
    <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold font-russoone italic tracking-wider text-shadow-lg/30 w">
      Honkai Impact Guide
    </h1>
    <p class="text-sm sm:text-lg text-slate-200 drop-shadow-sm">
      Powered by Mars Super Computer, written in Ajita++
    </p>
  </div>
  

    <div class="absolute bottom-0  right-1/2 translate-x-[135%] md:translate-x-[170%] z-0 cursor-pointer" on:click={handleClick}>
      <img 
        src={imageSrc} 
        alt="Banner" 
        class="h-55 md:h-72 w-auto object-cover {isClicked ? 'stretch' : ''}"
      >
    </div>
  <!-- Blur overlay at bottom -->
  <div class="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-base-100 to-transparent z-0"></div>

</div>


<div class="page-content {isLoading ? 'hidden' : 'visible'}">

<section class="z-10">
  <div class="max-w-screen-2xl mx-auto px-4 py-6">
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
  
      <!-- Card -->
      <div class="rounded-2xl border border-white/20 bg-gradient-to-b from-cyan-950 to-cyan-900 shadow-sm p-4">
        <div class="flex items-center gap-2 border-b border-white/10 pb-2 mb-3">
          <img src="/images/crystal.png" alt="Patch Time Icon" class="w-6 h-6" />
          <h2 class="text-lg font-semibold text-white tracking-tight">PATCH TIME</h2>
        </div>
        <div class="text-sm text-slate-300 space-y-4">
          <div>
            <div class="text-amber-400 font-semibold">REGIONAL SERVERS</div>

            <ul class="list-disc pl-5 text-sm text-slate-300 ">
              <li>{regionalServerInfo}</li>
              <li>v8.3 update is on 26 June </li>
            </ul>
          </div>
          <div>
            <div class="text-teal-400 font-semibold">CN SERVER</div>

            <ul class="list-disc pl-5 text-sm text-slate-300 ">
              <li>{cnServerInfo}</li>
              <li>v8.4 update is on 25 July</li>
            </ul>            
          </div>
        </div>
      </div>
  
      <!-- Info Date -->
      <div class="rounded-2xl border border-white/20 bg-gradient-to-b from-cyan-950 to-cyan-900 shadow-sm p-4">
        <div class="flex items-center gap-2 border-b border-white/10 pb-2 mb-3">
          <img src="/images/crystal.png" alt="Info Date Icon" class="w-6 h-6" />
          <h2 class="text-lg font-semibold text-white tracking-tight">8.4 INFO DATE</h2>
        </div>
        <ul class="list-disc pl-5 text-sm text-slate-300 space-y-1">
          <li>Valk Teaser & Reveal: 26-27 Jun </li>
          <li>Beta v1 (Private): 27 Jun </li>
          <li>Dev Video: 3 July </li>
          <li>Beta v2: 4 July </li>
          <li>Beta v3: 11 July </li>
          <li>Dev Livestream: 19 July </li>
        </ul>
        <p class="text-xs text-slate-400 mt-3">Note: Estimated Date</p>
      </div>
  
      <!-- Crystal Income -->
<div class="rounded-2xl border border-white/20 bg-gradient-to-b from-cyan-950 to-cyan-900 shadow-sm p-4">
  <div class="flex items-center gap-2 border-b border-white/10 pb-2 mb-3">
    <img src="/images/crystal.png" alt="Crystal Icon" class="w-6 h-6" />
    <h2 class="text-lg font-semibold text-white tracking-tight">8.3 CRYSTAL INCOME</h2>
  </div>


  <ul class="list-disc pl-5 text-sm text-slate-300 space-y-1">
    <li>F2P: {f2p.toLocaleString()}</li>
    <li>Monthly: {monthly.toLocaleString()}</li>
    <li>Monthly+BP: {bp.toLocaleString()}</li>
    <li>5 Equipment Card + 50% off the first 10 pull of PAWS</li>
    <li>Plus 1 Battlesuit Card + 1 Equipment Card from top-up event</li>
  </ul>

  

  <!-- Difficulty Switcher -->
<div class="flex gap-2 mt-4 mb-2 justify-center items-center flex-wrap">
  <button
    class="px-3 py-1 text-xs sm:text-sm rounded-md border font-medium transition cursor-pointer
           border-gray-600 text-white hover:bg-gray-700
           data-[active=true]:bg-white data-[active=true]:text-black"
    data-active={difficulty === 'Agony 3'}
    on:click={() => difficulty = 'Agony 3'}
  >
    Agony 3
  </button>

  <button
    class="px-3 py-1 text-xs sm:text-sm rounded-md border font-medium transition cursor-pointer
           border-gray-600 text-white hover:bg-gray-700
           data-[active=true]:bg-white data-[active=true]:text-black"
    data-active={difficulty === 'Red Lotus'}
    on:click={() => difficulty = 'Red Lotus'}
  >
    Red Lotus
  </button>

  <div class="flex items-center gap-1">
    <button
      class="px-3 py-1 text-xs sm:text-sm rounded-md border font-medium transition cursor-pointer
             border-gray-600 text-white hover:bg-gray-700
             data-[active=true]:bg-white data-[active=true]:text-black"
      data-active={difficulty === 'Nirvana'}
      on:click={() => difficulty = 'Nirvana'}
    >
      Nirvana
    </button>

    <!-- Always-visible info icon -->
    <a 
      href="https://www.miyoushe.com/bh3/article/64685650"
      target="_blank"
      class="text-white text-xs hover:text-blue-300 transition pl-1 tooltip"
      data-tip="Go to source"
      aria-label="Source"
    >
       <Fa icon={faCircleInfo} size="lg" />
    </a>
  </div>
</div>


</div>

<!-- Active Codes -->
<div class="rounded-2xl border border-white/20 bg-gradient-to-b from-cyan-950 to-cyan-900 shadow-sm p-4">
  <div class="flex items-center gap-2 border-b border-white/10 pb-2 mb-3">
    <img src="/images/crystal.png" alt="Codes Icon" class="w-6 h-6" />
    <h2 class="text-lg font-semibold text-white tracking-tight">ACTIVE CODES</h2>
  </div>

  <div class="text-sm text-slate-300 space-y-4">
    {#each [
      { code: 'CCQWLK02', reward: '30 crystals' },

    ] as entry}
      <div class="flex items-center justify-between gap-2">
        <div>
        <button
          class="font-bold text-white hover:underline focus:outline-none cursor-pointer tooltip tooltip-right"
          on:click={() => copyToClipboard(entry.code)}
          data-tip="Copy Code"
        >
          {entry.code}
        </button>          
                  <button
          class="tooltip tooltip-right ml-2 top-0.5  text-slate-300 hover:text-white transition cursor-pointer"
          data-tip="Copy Code"
          on:click={() => copyToClipboard(entry.code)}
        >
          <Fa icon={faCopy}  />
        </button>

          <br />
          {entry.reward}
        </div>

      </div>
    {/each}
  </div>
</div>
  
    </div>
  </div>
  
</section>
<section class="pb-10 pt-5  text-white z-10 ">
  <div class="xl:max-w-[var(--breakpoint-xl)] lg:max-w-[var(--breakpoint-lg)] mx-auto px-4">
    <h2 class="text-2xl font-bold mb-6 text-center text-white">News</h2>
  
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  
      <a href="/valk/paws" id="news1" class="group block rounded-2xl  bg-zinc-800 border border-zinc-600/50 hover:border-zinc-400 transition-colors duration-200 overflow-hidden">
        <div class="overflow-hidden h-48">
          <img src="https://i.ytimg.com/vi/QguYcI48WnY/hqdefault.jpg" alt="New Battlesuit" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
        </div>
        <div class="p-4">
          <h3 class="text-lg font-semibold text-white mb-1">New Battlesuit</h3>
          <p class="text-slate-300">Helia - PAWS</p>
        </div>
      </a>
  
      <a href="https://www.youtube.com/watch?v=-TSrqoN3b2U" id="news2" target="_blank" class="group block rounded-2xl bg-zinc-800 border border-zinc-600/50 hover:border-zinc-400 transition-colors duration-200 overflow-hidden">
        <div class="overflow-hidden h-48">
          <img src="https://i.ytimg.com/vi/-TSrqoN3b2U/hqdefault.jpg" alt="8.3 News" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
        </div>
        <div class="p-4">
          <h3 class="text-lg font-semibold text-white mb-1">8.4 News</h3>
          <p class="text-slate-300">S-rank Coralie</p>
        </div>
      </a>
  
      <a href="https://www.youtube.com/watch?v=WJAHvgl4noA" id="news3" class="group block rounded-2xl bg-zinc-800 border border-zinc-600/50 hover:border-zinc-400 transition-colors duration-200 overflow-hidden">
        <div class="overflow-hidden h-48">
          <img src="https://i.ytimg.com/vi/WJAHvgl4noA/hqdefault.jpg" alt="Astral Ring" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
        </div>
        <div class="p-4">
          <h3 class="text-lg font-semibold text-white mb-1">8.4 News</h3>
          <p class="text-slate-300 text-md">AstralOp Chenxue</p>
        </div>
      </a>
  
    </div>
  </div>
  
  
  
  
  
</section>

<section class="pb-10 pt-5  text-white z-10 mb-40">
  <div class="xl:max-w-[var(--breakpoint-xl)] lg:max-w-[var(--breakpoint-lg)] mx-auto px-4">
    <h2 class="text-2xl font-bold mb-6 text-center text-white">Featured</h2>
  
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  
      <a href="https://www.youtube.com/watch?v=QguYcI48WnY" id="content1" target="_blank" class="group block rounded-2xl bg-zinc-800 border border-zinc-600/50 hover:border-zinc-400 transition-colors duration-200 overflow-hidden">
        <div class="overflow-hidden h-48">
          <img src="https://i.ytimg.com/vi/QguYcI48WnY/hqdefault.jpg" alt="Latest Video" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
        </div>
        <div class="p-4">
          <h3 class="text-lg font-semibold text-white mb-1">Latest Video From Earth</h3>
          <p class="text-slate-300 text-sm">Check out Marisa Honkai's channel</p>
        </div>
      </a>
  
      <a href="https://arustats.com/" target="_blank" id="content2" class="group block rounded-2xl bg-zinc-800 border border-zinc-600/50 hover:border-zinc-400 transition-colors duration-200 overflow-hidden">
        <div class="overflow-hidden h-48">
          <img src="/images/newstab/arustat.webp" alt="Arustat Site" class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
        </div>
        <div class="p-4">
          <h3 class="text-lg font-semibold text-white mb-1">Arustat Site</h3>
          <p class="text-slate-300 text-sm">Check out Arustat site for HI3 teambuilder, Arena teams, gacha simulator, and more</p>
        </div>
      </a>
  
    </div>
  </div>
  
</section>
<footer class="footer footer-center bg-base-300 text-base-content p-4">
  <aside>
    <p>This website is not associated with miHoYo/Hoyoverse. Honkai Impact 3rd game content and materials are trademarks and copyrights of miHoYo/Hoyoverse.</p>
  </aside>
</footer>

</div>


<style>
  /* Define the wobble animation */
  @keyframes wobble {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(2deg); }
    50% { transform: rotate(-2deg); }
    75% { transform: rotate(2deg); }
  }

  /* Add the wobble class */
  .wobble {
    animation: wobble 1s ease infinite;
  }

  @keyframes stretch {
    0%, 100% { transform: scaleY(1); }
    50% { transform: scaleY(1.1); } /* Stretch slightly up and down */
  }

  .stretch {
    animation: stretch 0.5s ease-in-out infinite; /* Adjust duration and easing as needed */
    transform-origin: bottom; /* Keep the bottom fixed */
  }

  .loading-screen {
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

  /* Page content hidden state */
  .page-content.hidden {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.3s ease-in-out;
  }

  /* Page content visible state */
  .page-content.visible {
    visibility: visible;
    opacity: 1;
    transition: visibility 0s, opacity 0.3s ease-in-out;
  }
</style>