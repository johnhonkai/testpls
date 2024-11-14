
<script>
  import { page } from '$app/stores';
  import { onMount } from 'svelte';
  import { weatherList, bossData, teamData } from '$lib/bossData.js';
  import WeatherList from '$lib/components/WeatherList.svelte';
  import BossList from '$lib/components/BossList.svelte';
  import BossDetails from '$lib/components/BossDetails.svelte';
  import TeamDisplay from '$lib/components/TeamDisplay.svelte';

  // Initialize with default selections
  let selectedWeather = "Resonance";
  let selectedBoss = "resovita";


  // Access URL query parameters using SvelteKit's `page` store
  $: currentPage = $page.url.searchParams;

  // Set the weather and boss from query parameters on component mount
  onMount(() => {
    const queryParams = [...currentPage.keys()];
    const weatherParam = queryParams[0];
    const bossParam = queryParams[1];
    
    if (weatherParam && weatherList[weatherParam]) {
      selectedWeather = weatherParam;
    }
    
    if (bossParam && bossData[bossParam]) {
      selectedBoss = bossParam;
    }
  });

  function handleSelectWeather(event) {
    selectedWeather = event.detail.weather;
   // selectedBoss = null; // Reset selected boss when weather changes

  }

  function handleSelectBoss(event) {
    selectedBoss = event.detail.boss.id;
    updateURL();
  }

// Update the URL to include only selected weather and boss
function updateURL() {
    const url = new URL(window.location.href);
    url.search = `?${selectedWeather}${selectedBoss ? `&${selectedBoss}` : ''}`;
    history.replaceState({}, '', url);
  }
</script>
<div class="relative  mx-auto pt-3  pb-0 rounded-lg  text-center ">

  <h2 class="text-2xl  font-semibold mb-2 text-amber-400 ">Abyss Boss Database</h2>
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
