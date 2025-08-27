<svelte:head>
  <title>Version Statistics</title> 

    <meta property="og:title" content="Version Statistics"/>
    <meta property="og:description" content="Character usage stats in a version." />
    <meta property="og:image" content="https://i.imgur.com/3UCd2G7.png" />
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
  import { faCamera , faChevronLeft , faChevronRight } from '@fortawesome/free-solid-svg-icons';

  let viewMode: 'list' | 'tier' = 'list'; // default list view

  let selectedVersion = '8.3';
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


function convertRelativeTier(value: number, maxValue: number): 'S' | 'A' | 'B' {
  if (!maxValue) return 'B';
  const percent = (value / maxValue) * 100;
  if (percent >= 50) return 'S';
  if (percent >= 19) return 'A';
  return 'B';
}

$: dpsMax = Math.max(...(usageByVersion[selectedVersion] ?? []).map(e => Number(e.DPS) || 0));
$: supMax = Math.max(...(usageByVersion[selectedVersion] ?? []).map(e => Number(e.SUP) || 0));

$: tieredDPS = (usageByVersion[selectedVersion] ?? [])
  .filter(entry => Number(entry.DPS) > 0)
  .map(entry => {
    const match = valkyries.find(v => v.name === entry.name);
    const dpsValue = Number(entry.DPS);
    return {
      ...entry,
      dpsCount: dpsValue,
      dpsTier: convertRelativeTier(dpsValue, dpsMax),
      image: match?.image ?? '',
      url: match?.url ?? '',
      verdebut: match?.verdebut ?? 0,
      verdlc: match?.verdlc ?? 0
    };
  })
  .sort((a, b) => {
    const diff = b.dpsCount - a.dpsCount;
    if (diff !== 0) return diff;
    const aDate = a.verdlc || a.verdebut || 99;
    const bDate = b.verdlc || b.verdebut || 99;
    return bDate - aDate;
  });

$: tieredSUP = (usageByVersion[selectedVersion] ?? [])
  .filter(entry => Number(entry.SUP) > 0)
  .map(entry => {
    const match = valkyries.find(v => v.name === entry.name);
    const supValue = Number(entry.SUP);
    return {
      ...entry,
      supCount: supValue,
      supTier: convertRelativeTier(supValue, supMax),
      image: match?.image ?? '',
      url: match?.url ?? '',
      verdebut: match?.verdebut ?? 0,
      verdlc: match?.verdlc ?? 0
    };
  })
  .sort((a, b) => {
    const diff = b.supCount - a.supCount;
    if (diff !== 0) return diff;
    const aDate = a.verdlc || a.verdebut || 99;
    const bDate = b.verdlc || b.verdebut || 99;
    return bDate - aDate;
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

onMount(() => {
  const saved = localStorage.getItem('viewMode');
  if (saved === 'list' || saved === 'tier') {
    viewMode = saved as 'list' | 'tier';
  }
});

function toggleView() {
  viewMode = viewMode === 'list' ? 'tier' : 'list';
  localStorage.setItem('viewMode', viewMode);
}

  // helper: go to previous/next version
  function changeVersion(step) {
    let idx = versions.indexOf(selectedVersion);
    let newIdx = idx + step;
    if (newIdx >= 0 && newIdx < versions.length) {
      selectVersion(versions[newIdx]);
    }
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

<!-- Control Bar -->
<div class="flex justify-center gap-3 mt-5 mb-6">

  <!-- Version Control with Arrows -->
  <div class="flex items-center gap-2">
    <!-- Left Arrow -->
    <button
      on:click={() => changeVersion(+1)}
      class="cursor-pointer flex items-center justify-center h-10 w-10 rounded-md bg-zinc-800 text-white hover:bg-gray-700 transition border border-gray-700 disabled:opacity-40"
      disabled={versions.indexOf(selectedVersion) === versions.length - 1}

    >
      <Fa icon={faChevronLeft} />
    </button>

    <!-- Version Dropdown -->
    <div class="relative" id="versionDropdown">
      <button
        on:click={toggleDropdown}
        class="cursor-pointer inline-flex items-center justify-between w-44 bg-zinc-800 text-white px-4 py-2 rounded-md border border-gray-700 hover:bg-gray-700 transition h-10">
        Ver {selectedVersion}
        <svg
          class="ml-2 w-4 h-4 transition-transform duration-200 transform {dropdownOpen ? 'rotate-180' : ''}"
          fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"
          stroke-linecap="round" stroke-linejoin="round">
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {#if dropdownOpen}
        <ul
          class="cursor-pointer absolute z-50 mt-2 w-full bg-zinc-800 border border-gray-700 rounded-md shadow-lg max-h-60 overflow-auto transition-all duration-200 animate-in fade-in slide-in-from-top-1"
        >
          {#each versions as version}
            <li
              on:click={() => selectVersion(version)}
              class="px-4 py-2 cursor-pointer hover:bg-slate-700 text-white text-sm transition-colors"
            >
              {version}
            </li>
          {/each}
        </ul>
      {/if}
    </div>

    <!-- Right Arrow -->
    <button
      on:click={() => changeVersion(-1)}
      class="cursor-pointer flex items-center justify-center h-10 w-10 rounded-md bg-zinc-800 text-white hover:bg-gray-700 transition border border-gray-700 disabled:opacity-40"
      disabled={versions.indexOf(selectedVersion) === 0}
    >
      <Fa icon={faChevronRight} />
    </button>
  </div>

  <!-- Capture Button -->
  <button
    on:click={captureStats}
    class="cursor-pointer flex items-center justify-center h-10 w-10 rounded-md bg-zinc-800 text-white hover:bg-gray-700 transition border border-gray-700"
    title="Capture Stats"
  >
    <Fa icon={faCamera} size="1.2x" />
  </button>

  <!-- View Toggle -->
  <button
    on:click={toggleView}
    class="px-4 py-2 rounded-md bg-zinc-800 text-white hover:bg-gray-700 transition border border-gray-700 h-10 cursor-pointer"
  >
    {viewMode === 'list' ? 'Tier View' : 'List View'}
  </button>
</div>


<div id="statsSection" class="max-w-7xl mx-auto px-4 pt-5 pb-10 mb-20 space-y-6 relative bg-base-100">

  <div class="flex flex-col justify-center">
        <h1 class="flex items-center gap-2 text-md sm:text-xl font-bold drop-shadow-md text-white  m-auto text-shadow-lg/30 text-center">
      Character Usage in Top 100 Myriad Abyss (CN PC Server) - Version {selectedVersion}


    </h1>
    <p class="text-xs sm:text-sm italic text-center mt-1">
      Date: {versionDate}
    </p>
  </div>
  
  {#if viewMode === 'list'}
  <!-- Responsive Grid for DPS and SUP side by side on large screens -->
  <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-15">
    
    <!-- DPS Table -->
    <div>
      <h2 class="text-xl font-bold text-blue-400 mb-3">DPS Usage </h2>
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
      <h2 class="text-xl font-bold text-rose-400 mb-3  ">Support Usage </h2>
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
{/if}

{#if viewMode === 'tier'}

<div class="mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
  
<!-- DPS Tier List -->
<div>
  <h2 class="text-xl font-bold text-blue-400 mb-3">DPS Usage V{selectedVersion}</h2>
  {#each ['S','A','B'] as tier}
    <div class="flex rounded-lg overflow-hidden bg-blue-900/40 mb-6">
      
      <!-- Left: Tier Letter -->
      <div class="flex items-center justify-center w-20 bg-blue-800 text-white text-2xl font-bold py-12.5">
        {tier}
      </div>

      <!-- Right: Characters -->
      <div class="flex flex-wrap gap-4 p-4 flex-1">
        {#each tieredDPS.filter(c => c.dpsTier === tier) as char}
          <a href={char.url} class="flex flex-col items-center w-24">
            <img src={char.image} alt={char.name} class="w-20 h-20 rounded-lg object-cover border-2 border-blue-400" />
            <span class="text-xs text-center mt-1">{char.dpsCount}</span>
          </a>
        {/each}
      </div>
    </div>
  {/each}
</div>

<!-- SUP Tier List -->
<div>
  <h2 class="text-xl font-bold text-rose-400 mb-3">Support Usage V{selectedVersion}</h2>
  {#each ['S','A','B'] as tier}
    <div class="flex rounded-lg overflow-hidden bg-rose-900/40 mb-6">
      
      <!-- Left: Tier Letter -->
      <div class="flex items-center justify-center w-20 bg-rose-800 text-white text-2xl font-bold">
        {tier}
      </div>

      <!-- Right: Characters -->
      <div class="flex flex-wrap gap-4 p-4 flex-1">
        {#each tieredSUP.filter(c => c.supTier === tier) as char}
          <a href={char.url} class="flex flex-col items-center w-24">
            <img src={char.image} alt={char.name} class="w-20 h-20 rounded-lg object-cover border-2 border-rose-400" />
            <span class="text-xs text-center mt-1">{char.supCount}</span>
          </a>
        {/each}
      </div>
    </div>
  {/each}
</div>


</div>


{/if}
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



