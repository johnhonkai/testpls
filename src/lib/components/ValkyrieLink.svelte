<script lang="ts">
    import { isLoading2 } from '$lib/stores/loading'; // Import the shared loading store

    function handleClick(event) {
    isLoading2.set(true); // Show loading indicator when clicked
  }

    export let valkyrie: {
      url: string;
      image: string;
      name: string;
      badge?: string;
      id: number;
    };
  </script>
  
  <a href={valkyrie.url} 
  class="flex flex-col items-center text-center rounded" 
  data-sveltekit-preload-data="hover"   
  on:click={handleClick}
>
    <!-- Valkyrie Image with Badge -->
    <div class="relative w-24 h-24 sm:w-32 sm:h-32 overflow-hidden rounded-md group">
      {#if valkyrie.badge}
        <span class="absolute top-1 left-1 badge text-white text-xs font-bold px-1.5 py-0.5 z-10" 
              class:badge-ghost={valkyrie.badge === 'Beta'}
              class:badge-primary={valkyrie.badge === 'New'}
              class:badge-accent={valkyrie.badge === 'Updated'}>
          {valkyrie.badge}
        </span>
      {/if}
      <img src={valkyrie.image} alt={valkyrie.name}
           class="w-24 h-24 sm:w-32 sm:h-32 object-cover mb-2 rounded-md transition-transform duration-300 transform group-hover:scale-110"
           style="view-transition-name: valkyrie-image-{valkyrie.id};" />
    </div>
  
    <!-- Valkyrie Name -->
    <div class="text-xs sm:text-sm md:text-base font-medium mb-2 sm:leading-5 mt-1">{valkyrie.name}</div>
  </a>
  