<script>
  import { createEventDispatcher } from 'svelte';
  export let bosses;
  export let selectedBoss;
  const dispatch = createEventDispatcher();

  function selectBoss(boss) {
    dispatch('selectBoss', { boss });
  }
</script>

<div class="boss-list">
  {#each bosses as boss}
    <button 
      type="button" 
      on:click={() => selectBoss(boss)} 
      class="boss-button btn btn-sm max-w-50  {boss.id === selectedBoss ? 'selected' : ''}"
    >
      {boss.name}
    </button>
  {/each}
</div>

<style>
  .boss-list {
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 1rem;
  }

  .boss-button {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
    color: #333;
    background-color: #e5e7eb;
    border-radius: 0.5rem;
    transition: background-color 0.3s ease, color 0.3s ease;
    cursor: pointer;
  }

  .boss-button:hover {
    background-color: #d1d5db;
  }

  .boss-button.selected {
    background-color: #1b6cd6;
    color: #ffffff;
  }
</style>

