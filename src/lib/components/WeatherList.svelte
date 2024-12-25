<script>
  import { createEventDispatcher } from 'svelte';
  export let weathers;
  export let selectedWeather;
  const dispatch = createEventDispatcher();

  // Map internal weather keys to display names
  const weatherDisplayNames = {
    bleed: "Bleed",
    blood: "Bloodthirsty",    
    fire: 'Fire',
    ignite: "Ignite",
    imaginary: "Imaginary",
    lightning: 'Lightning',
    typecounter: 'Type Counter',
    ice: 'Ice',
    ranged: 'Ranged',
    melee: 'Melee',
    oblivion: "Oblivion",
    quantum: "Quantum",
    resonance: "Resonance",
    stardust: "Stardust",
    starless: "Starless",
    stellar: "Stellar",
    stun: "Stun",
    physical: "Physical",
    shadow: "Shadow",
    symphony: "Symphony",
    // Add other weather mappings as needed
  };

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
        {weatherDisplayNames[weather] || weather} <!-- Display the mapped name or fallback to the key -->
      </option>
    {/each}
  </select>
</div>
