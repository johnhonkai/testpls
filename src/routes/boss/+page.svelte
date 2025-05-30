
<svelte:head>
  <title>Abyss Boss Data</title> 

    <meta property="og:title" content="Honkai Impact 3rd Abyss Boss Data"/>
    <meta property="og:description" content="Comprehensive Boss Data" />
    <meta property="og:image" content="https://i.imgur.com/TW0FaIh.png" />
    <meta property="og:url" content="https://marisaimpact.com/boss" />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary_large_image">

    <link rel="canonical" href="https://marisaimpact.com/boss" />
</svelte:head>

<script>
  import { page } from '$app/stores';
  import { onMount, tick } from 'svelte';
  import { weatherList, bossData, teamData } from '$lib/bossData.js';
  import WeatherList from '$lib/components/WeatherList.svelte';
  import BossList from '$lib/components/BossList.svelte';
  import BossDetails from '$lib/components/BossDetails.svelte';
  import TeamDisplay from '$lib/components/TeamDisplay.svelte';

  let selectedWeather = "quantum"; // Default weather
  let selectedBoss = "quavalralhal"; // Default boss
  let isLoading = true;
  let isFirstLoad = true; // Flag to distinguish initial load

  $: currentPage = $page.url.searchParams;

  onMount(() => {
    const queryParams = [...currentPage.keys()];
    const bossParam = queryParams[0];
    if (bossParam && bossData[bossParam]) {
      selectedBoss = bossParam;
      selectedWeather = findWeatherByBossId(bossParam) || "quantum";
    }
    // Wait for initial images to load
    checkImagesLoaded();
  });

  async function checkImagesLoaded() {
    isLoading = true;
    await tick(); // Wait for the DOM to render updated components

    const bossDetailsImages = Array.from(
      document.querySelectorAll('#boss-details img')
    );
    const teamDetailsImages = Array.from(
      document.querySelectorAll('#team-display img')
    );

    const imagePromises = [...bossDetailsImages, ...teamDetailsImages].map((img) => {
  return new Promise((resolve) => {
    if (img instanceof HTMLImageElement) {
      if (img.complete) {
        resolve();
      } else {
        img.addEventListener('load', resolve);
        img.addEventListener('error', resolve); // Resolve even on error
      }
    } else {
      // If it's not an image element, resolve immediately
      resolve();
    }
  });
});


    await Promise.all(imagePromises);
    isLoading = false;
    isFirstLoad = false; // Mark initial load as complete
  }

  // Find the weather for a given boss ID
  function findWeatherByBossId(bossId) {
    for (const weather in weatherList) {
      if (weatherList[weather].some((boss) => boss.id === bossId)) {
        return weather;
      }
    }
    return null;
  }

  function handleSelectWeather(event) {
    selectedWeather = event.detail.weather;
    updateURL();
  }

  function handleSelectBoss(event) {
    selectedBoss = event.detail.boss.id;
    updateURL();
    checkImagesLoaded(); // Trigger image loading for new boss selection
  }

  // Update the URL to include the selected boss ID
  function updateURL() {
    const url = new URL(window.location.href);
    url.search = selectedBoss ? `?${selectedBoss}` : '';
    history.replaceState({}, '', url);
  }
</script>

<!-- Loading Screen -->
{#if isFirstLoad && isLoading}
<div class="loading-screen fixed inset-0  flex items-center justify-center z-50">
  <span class="loading loading-spinner loading-lg text-secondary"></span>
    <p class="text-white mt-4">Loading...</p>
  </div>
{/if}

<div class="relative w-full h-40 md:h-70 overflow-hidden "  id="bannerpic">

  <img
    src="https://i.imgur.com/Rk4jTN8.png"
    alt="Header"
    class="w-full h-full object-cover [object-position:50%_30%] opacity-35"
    />


 
  <!-- Text overlay -->
  <div class="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 pb-3 md:pb-0 md:pt-6 z-10">
    <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-md font-russoone italic tracking-wider text-shadow-lg/30 ">
      Abyss Boss Database
    </h1>
    <p class="text-sm sm:text-lg text-slate-200 drop-shadow-sm">
      Boss info, top teams, and gameplay showcase for Abyss mode.



    </p>
  </div>
  

  <!-- Blur overlay at bottom -->
  <div class="absolute bottom-0 left-0 w-full h-25 bg-gradient-to-t from-base-100 to-transparent z-0">
    
  </div>

</div>


<div class="page-container mx-auto p-2 max-w-2xl  min-h-[1300px]" class:invisible={isFirstLoad && isLoading}>
  <!-- Weather List Component -->
  <WeatherList 
    weathers={weatherList} 
    selectedWeather={selectedWeather} 
    on:selectWeather={handleSelectWeather} 
  />
  <!-- Boss List Component -->
  {#if selectedWeather}
    <BossList 
      bosses={weatherList[selectedWeather]} 
      selectedBoss={selectedBoss} 
      on:selectBoss={handleSelectBoss} 
    />
  {/if}
  <div class="mb-2 sm:mb-0"></div>

  <!-- Boss Details and Team Display -->
  {#if selectedBoss}
    <div id="boss-details">
      <BossDetails boss={bossData[selectedBoss]} />
    </div>
    <div id="team-display">
      <TeamDisplay bossData={teamData[selectedBoss]} />
    </div>
  {/if}
</div>

<style>
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

  .invisible {
    visibility: hidden;
  }

    .page-container {
    max-width: 1200px;
    margin: 0 auto;
    color: #333;
  }
</style>
