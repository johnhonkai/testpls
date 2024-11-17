<script>
  import { createEventDispatcher } from 'svelte';
  export let weathers;
  export let selectedWeather;
  const dispatch = createEventDispatcher();

  function selectWeather(event) {
    const weather = event.target.value;
    dispatch('selectWeather', { weather });
  }
</script>

<div class="form-control w-full max-w-xs text-white mx-auto">
    <span class="label-text">Select Weather</span>
  <select 
    class="select select-bordered max-h-10 overflow-y-auto"
    on:change={selectWeather}
    bind:value={selectedWeather}
  >
    <option disabled selected>Select a weather</option>
    {#each Object.keys(weathers).sort() as weather}
      <option value={weather}>
        {weather}
      </option>
    {/each}
  </select>
</div>

