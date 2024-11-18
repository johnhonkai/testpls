<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { weatherList, bossData, teamData } from '$lib/bossData.js';
  import WeatherList from '$lib/components/WeatherList.svelte';
  import BossList from '$lib/components/BossList.svelte';
  import BossDetails from '$lib/components/BossDetails.svelte';
  import TeamDisplay from '$lib/components/TeamDisplay.svelte';

  let selectedWeather = "resonance"; // Default weather
  let selectedBoss = "resovita"; // Default boss

  $: currentPage = $page.url.searchParams;

  // Function to find the weather for a given boss ID
  function findWeatherByBossId(bossId) {
    for (const weather in weatherList) {
      if (weatherList[weather].some(boss => boss.id === bossId)) {
        return weather;
      }
    }
    return null; // Return null if the boss ID is not found
  }

  // Set the weather and boss based on the URL query parameter
  onMount(() => {
    const queryParams = [...currentPage.keys()]; // Get all query keys
    const bossParam = queryParams[0]; // Assume the first key is the boss ID

    if (bossParam && bossData[bossParam]) {
      selectedBoss = bossParam;
      const detectedWeather = findWeatherByBossId(bossParam);
      if (detectedWeather) {
        selectedWeather = detectedWeather;
      }
    }
  });

  function handleSelectWeather(event) {
    selectedWeather = event.detail.weather;
    // selectedBoss = null; Reset the selected boss when the weather changes
    updateURL();
  }

  function handleSelectBoss(event) {
    selectedBoss = event.detail.boss.id;
    updateURL();
  }

  // Update the URL to include only the boss ID
  function updateURL() {
    const url = new URL(window.location.href);
    url.search = selectedBoss ? `?${selectedBoss}` : '';
    history.replaceState({}, '', url);
  }
</script>

<div class="relative mx-auto pt-3 pb-0 rounded-lg text-center">
  <h2 class="text-2xl font-semibold mb-2 text-amber-400">Abyss Boss Database</h2>
  <p class="text-xs sm:text-sm">
    This page contains Abyss boss info, top teams, and gameplay showcase.
  </p>
</div>

<div class="page-container mx-auto p-2">
  <!-- Weather List Component -->
  <WeatherList 
    weathers={weatherList} 
    selectedWeather={selectedWeather} 
    on:selectWeather={handleSelectWeather} 
  />

  <!-- Boss List Component for the selected weather -->
  {#if selectedWeather}
    <BossList 
      bosses={weatherList[selectedWeather]} 
      selectedBoss={selectedBoss} 
      on:selectBoss={handleSelectBoss} 
    />
  {/if}

  <!-- Boss Details and Team Display for selected boss -->
  {#if selectedBoss}
    <BossDetails boss={bossData[selectedBoss]} />
    <TeamDisplay bossData={teamData[selectedBoss]} />
  {/if}
</div>

<style>
  .page-container {
    max-width: 1200px;
    margin: 0 auto;
    color: #333;
  }
</style>
