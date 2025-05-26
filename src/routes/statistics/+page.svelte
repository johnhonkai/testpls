<svelte:head>
  <title>Version Statistics</title> 

    <meta property="og:title" content="Version Statistics"/>
    <meta property="og:description" content="Character usage stats in a version." />
    <meta property="og:image" content="https://i.imgur.com/VhbgV38.png" />
    <meta property="og:url" content="https://marisaimpact.com/statistics" />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary_large_image">

    <link rel="canonical" href="https://marisaimpact.com/statistics" />
</svelte:head>

<script lang="ts">
  import { versionDates , usageByVersion } from '$lib/data/version-stats';
  import { valkyries } from '$lib/data/characterdata';
  import { onMount , onDestroy , tick } from 'svelte';
	import Fa from 'svelte-fa';
  import { faCamera } from '@fortawesome/free-solid-svg-icons';

  let selectedVersion = '8.2';
  const versions = Object.keys(usageByVersion);

  $: versionDate = versionDates[selectedVersion] ?? 'Unknown';

$: withImages = (usageByVersion[selectedVersion] ?? []).map(entry => {
  const match = valkyries.find(v => v.name === entry.name);
  return {
    ...entry,
    image: match?.image ?? '',
    url: match?.url ?? '',
    verdebut: match?.verdebut ?? 0,
    verdlc: match?.verdlc ?? 0
  };
});



function sortWithTiebreaker(type: 'DPS' | 'SUP') {
  return withImages
    .filter(v => v[type] > 0)
    .sort((a, b) => {
      const primaryDiff = b[type] - a[type];
      if (primaryDiff !== 0) return primaryDiff;

      // Use verdlc if available, otherwise fallback to verdebut.
      const aDate = a.verdlc || a.verdebut || 99;
      const bDate = b.verdlc || b.verdebut || 99;
      return bDate - aDate;
    });
}


$: dpsList = sortWithTiebreaker('DPS');
$: supList = sortWithTiebreaker('SUP');

$: if (withImages && selectedVersion) {
  dpsList = sortWithTiebreaker('DPS');
  supList = sortWithTiebreaker('SUP');
}


  let dropdownOpen = false;

  function toggleDropdown() {
    dropdownOpen = !dropdownOpen;
  }

  function selectVersion(v) {
    selectedVersion = v;
    dropdownOpen = false;
  }

import html2canvas from 'html2canvas-pro';

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
  link.download = `version-${selectedVersion}-stats.png`;
  link.href = canvas.toDataURL();
  link.click();
}
</script>

<!-- Banner -->
<div class="relative w-full h-40 md:h-70 overflow-hidden " id="bannerpic">
  <img src="/images/bridge.webp" alt="Header" class="w-full h-full object-cover opacity-45" />
  <div class="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 pb-3 md:pb-0 md:pt-4 z-10 ">
    <h1 class="flex items-center gap-2 text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-md font-russoone italic tracking-wider text-shadow-lg/30 ">
      Version Statistics

    </h1>
    <p class="text-sm sm:text-lg text-slate-200 drop-shadow-sm">Characters usage in a version</p>
  </div>
  <div class="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-base-100 to-transparent z-0"></div>
</div>

<!-- Version Dropdown -->
<div class="flex justify-center mt-5 gap-1">
  <div class="relative" id="versionDropdown">
    <button
      on:click={toggleDropdown}
      class="btn inline-flex items-center justify-between w-48 bg-base-300 text-white px-4 py-2 rounded-md border border-gray-700 hover:bg-gray-700 transition">
      Version {selectedVersion}
      <svg
        class="ml-2 w-4 h-4 transition-transform duration-200 transform {dropdownOpen ? 'rotate-180' : ''}"
        fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
        stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    {#if dropdownOpen}
      <ul
        class="absolute z-50 mt-2 w-full bg-base-300 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto transition-all duration-200 animate-in fade-in slide-in-from-top-1
        
        "
      >
        {#each versions as version}
          <li
            on:click={() => selectVersion(version)}
            class="px-4 py-2 cursor-pointer hover:bg-gray-700 text-white text-sm transition-colors"
          >
            {version}
          </li>
        {/each}
      </ul>
    {/if}
  </div>

    <div class="flex justify-center mb-6">
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
</div>


<div id="statsSection" class="max-w-6xl mx-auto px-4 pt-5 pb-10 mb-20 space-y-6 relative bg-base-100">

  <div class="flex flex-col justify-center">
        <h1 class="flex items-center gap-2 text-md sm:text-xl font-bold drop-shadow-md text-white  m-auto text-shadow-lg/30 text-center">
      Character Usage in Top 100 Myriad Abyss (CN PC Server) - Version {selectedVersion}


    </h1>
    <p class="text-xs sm:text-sm italic text-center mt-1">
      Date: {versionDate}
    </p>
  </div>
  <!-- Responsive Grid for DPS and SUP side by side on large screens -->
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-15">
    
    <!-- DPS Table -->
    <div>
      <h2 class="text-xl font-bold text-blue-400 mb-3">DPS Usage</h2>
      <div class="overflow-x-auto border border-gray-700 rounded-lg">
        <table class="min-w-full divide-y divide-gray-700 text-sm text-left text-white">
          <thead class="bg-base-300 text-gray-300 text-sm uppercase tracking-wide">
            <tr>
              <th class="px-4 py-3">#</th>
              <th class="px-4 py-3">Character</th>
              <th class="px-4 py-3 text-right">V{selectedVersion}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700 bg-base-100">
            {#each dpsList as char, index}
              <tr class="hover:bg-gray-800  transition">
                <td class="px-4 py-2 text-gray-400">{index + 1}</td>
                <td class="px-4 py-2 flex items-center gap-3">
                  <a href={char.url} >
                    <div class="flex items-center gap-3">

                  <img src={char.image} alt={char.name} class="w-8 h-auto rounded object-cover" />
                  <span>{char.name}</span></div>
                  </a>
                </td>
                <td class="px-4 py-2 text-right font-medium text-blue-400">{char.DPS}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>

    <!-- SUP Table -->
    <div>
      <h2 class="text-xl font-bold text-rose-400 mb-3  ">Support Usage</h2>
      <div class="overflow-x-auto border border-gray-700 rounded-lg">
        <table class="min-w-full divide-y divide-gray-700 text-sm text-left text-white ">
          <thead class="bg-base-300 text-gray-300 text-sm uppercase tracking-wide ">
            <tr>
              <th class="px-4 py-3">#</th>
              <th class="px-4 py-3">Character</th>
              <th class="px-4 py-3 text-right">V{selectedVersion}</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-700 bg-base-100 ">
            {#each supList as char, index}
              <tr class="hover:bg-gray-800 transition  ">
                <td class="px-4  py-2 text-gray-400">{index + 1}</td>
                <td class="px-4 py-2 flex items-center gap-3">
                  <a href={char.url} >
                    <div class="flex items-center gap-3">

                  <img src={char.image} alt={char.name} class="w-8 h-auto rounded object-cover" />
                  <span>{char.name}</span></div>
                  </a>
                </td>
                <td class="px-4 py-2 text-right font-medium text-rose-400">{char.SUP}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>

<!--     <div>
    <p class="text-xs sm:text-sm italic text-center mt-12">
      Note: Lone Planetfarer supports are mostly S2-SS+ rank, which is a big difference compared to S0-rank.
    </p>
  </div> -->

  <div
  id="watermark"
  class="absolute top-10 right-4 opacity-70 text-xs text-white pointer-events-none select-none"
   style="display:none"
>
  <img src="/images/watermark.jpg" alt="Watermark" class="w-28 opacity-50" />
</div>

</div>


