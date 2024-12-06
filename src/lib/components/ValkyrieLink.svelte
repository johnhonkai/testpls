<script lang="ts">
  import { isLoading2 } from '$lib/stores/loading'; // Shared loading store
  import { goto } from '$app/navigation';

  export let valkyrie: {
    url: string;
    image: string;
    name: string;
    badge?: string;
    id: number;
  };

  async function handleClick(event) {
    event.preventDefault(); // Prevent default navigation

    // Set loading state globally
    isLoading2.set(true);

    // Preload images for the target Valkyrie page
    const imageUrls = getImageUrls(valkyrie.id);

    await preloadImages(imageUrls);

    // Navigate to the Valkyrie page
    goto(valkyrie.url);
  }

  // Get image URLs dynamically based on Valkyrie ID
  function getImageUrls(valkyrieId: number): string[] {
    const imageMapping = {
      9: [
        '/images/bg/wave_thelema.svg',
        '/images/bg/ava_thelema.webp',
        '/images/valkfull/thelema.webp',
      ],
      // Add more mappings for other Valkyries
    };

    return imageMapping[valkyrieId] || [];
  }

  // Preload image URLs
  async function preloadImages(imageUrls: string[]) {
  const promises = imageUrls.map((url) => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.src = url;

      img.onload = () => resolve(); // Properly typed event handler
      img.onerror = () => resolve(); // Also properly typed event handler
    });
  });

  await Promise.all(promises);
}
</script>

<a
  href={valkyrie.url}
  class="flex flex-col items-center text-center rounded"
  on:click={handleClick}
>
  <!-- Valkyrie Image with Badge -->
  <div class="relative w-24 h-24 sm:w-32 sm:h-32 overflow-hidden rounded-md group">
    {#if valkyrie.badge}
      <span
        class="absolute top-1 left-1 badge text-white text-xs font-bold px-1.5 py-0.5 z-10"
        class:badge-ghost={valkyrie.badge === 'Beta'}
        class:badge-primary={valkyrie.badge === 'New'}
        class:badge-accent={valkyrie.badge === 'Updated'}
      >
        {valkyrie.badge}
      </span>
    {/if}
    <img
      src={valkyrie.image}
      alt={valkyrie.name}
      class="w-24 h-24 sm:w-32 sm:h-32 object-cover mb-2 rounded-md transition-transform duration-300 transform group-hover:scale-110"
      style="view-transition-name: valkyrie-image-{valkyrie.id};"
    />
  </div>

  <!-- Valkyrie Name -->
  <div class="text-xs sm:text-sm md:text-base font-medium mb-2 sm:leading-5 mt-1">
    {valkyrie.name}
  </div>
</a>
