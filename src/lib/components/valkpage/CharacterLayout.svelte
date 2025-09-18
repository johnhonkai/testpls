<script lang="ts">
  import { onMount } from "svelte";
import { hasUserLiked, likeWithVoterId } from "$lib/firebaseLikes"; // Import helper functions


  export let charName: string;
  export let initialLikes: number;
  export let accent: string;
  export let image: string;
  export let alt: string;
  export let title: string;
  export let name: string;
  export let release: string;

  let likes = initialLikes || 0;
  let hasLiked = false;
  let voterId = "";

  // Setup voterId + check if already liked
  onMount(async () => {
    voterId = localStorage.getItem("voterId") || crypto.randomUUID();
    localStorage.setItem("voterId", voterId);

    const userHasLiked =
      localStorage.getItem(`liked_${charName}`) === "true" ||
      (await hasUserLiked(charName, voterId));

    if (userHasLiked) {
      hasLiked = true;
      localStorage.setItem(`liked_${charName}`, "true");
    }
  });

  async function increaseLike() {
    try {
      if (hasLiked) return;

      likes++;
      await likeWithVoterId(charName, voterId);

      hasLiked = true;
      localStorage.setItem(`liked_${charName}`, "true");
    } catch (error) {
      likes--; // rollback
      console.error("Error liking:", error);
    }
  }
</script>

<div class="flex flex-col sm:flex-row items-center sm:items-start sm:space-x-6">
  <!-- Left: Character Image -->
<div class="relative w-40 h-50 sm:w-60 sm:h-70 flex justify-center items-center mt-4 sm:mt-15">
  <img src={image} alt={alt} class="max-h-full max-w-full sm:object-contain" />

<!-- Like Button -->
<div class="absolute bottom-4 left-1/2 transform -translate-x-1/2">
  <div class="tooltip tooltip-top" data-tip={hasLiked ? "You already liked this!" : "Click to like"}>
    <button
      on:click={increaseLike}
      disabled={hasLiked}
      class={`${accent}/80 hover:${accent.replace("800", "700")} transition-colors
              rounded-full px-2 sm:px-3 py-1 flex items-center gap-1 text-white text-xs sm:text-sm shadow-md`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-3 h-3 sm:w-4 sm:h-4" viewBox="0 0 24 24">
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 
             2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 
             4.5 2.09C13.09 3.81 14.76 3 16.5 3 
             19.58 3 22 5.42 22 8.5c0 3.78-3.4 
             6.86-8.55 11.54L12 21.35z"
        />
      </svg>
      <span class="font-semibold">{likes}</span>
    </button>
  </div>
</div>
  </div>

  <!-- Right: Character Info -->
  <div class="flex flex-col items-center text-center justify-start sm:mt-10">
    <h1 class="text-sm md:text-xl text-white sm:mt-4 mb-2 italic font-russoone">{title}</h1>

    <!-- Info Cards -->
    <div class="space-y-2 w-[260px] md:w-[300px]">
      <div class="flex rounded-lg overflow-hidden shadow-md">
        <div class={`${accent} text-white px-4 py-1 w-28 flex items-center justify-center font-semibold text-xs`}>
          Name
        </div>
        <div class="bg-slate-200 text-black px-3 py-1 flex-1 flex items-center text-xs font-medium">
          {name}
        </div>
      </div>
      <div class="flex rounded-lg overflow-hidden shadow-md">
        <div class={`${accent} text-white px-4 py-1 w-28 flex items-center justify-center font-semibold text-xs`}>
          Release
        </div>
        <div class="bg-slate-200 text-black px-3 py-1 flex-1 flex items-center text-xs font-medium">
          {release}
        </div>
      </div>
    </div>

    <slot /> <!-- Extra (CharBio etc.) -->
  </div>
</div>
