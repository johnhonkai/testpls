<script lang="ts">
  import { onMount } from "svelte";
  import { hasUserLiked, likeWithVoterId } from "$lib/firebaseLikes";

let currentLang: 'EN' | 'CN' = 'EN';

function setLang(lang: 'EN' | 'CN') {
  currentLang = lang;
}


  export let charName: string;
  export let initialLikes: number;
  export let accent: string;
  export let image: string;
  export let alt: string;

  export let titleEN: string;
  export let titleCN: string;

export let nameEN: string;
export let nameCN: string;

export let releaseEN: string;
export let releaseCN: string;

export let dlcEN: string | null = null;
export let dlcCN: string | null = null;

  export let valk: boolean = true; // ✅ optional DLC date

$: displayTitle = currentLang === 'EN' ? titleEN : titleCN;
$: displayName = currentLang === 'EN' ? nameEN : nameCN;
$: displayRelease = currentLang === 'EN' ? releaseEN : releaseCN;
$: displayDLC = currentLang === 'EN' ? dlcEN : dlcCN;



  let likes = initialLikes || 0;
  let hasLiked = false;
  let voterId = "";

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

<div class="flex flex-col sm:flex-row items-stretch sm:space-x-6" >
  <!-- Left: Character Image -->
  <div class="relative w-40 sm:w-66 flex justify-center mx-auto items-center mt-4 sm:mt-13 overflow-hidden sm:mr-4" id="valkpicbox">
    <img
      src={image}
      alt={alt}
      class="h-full w-auto object-cover"
    />

    <!-- Like Button -->
    <div class="absolute inset-x-0 bottom-0.5 flex justify-center">
      <div class="tooltip tooltip-top" data-tip={hasLiked ? "You already liked this!" : "Click to like"}>
        <button
          on:click={increaseLike}
          disabled={hasLiked}
          class={`${accent} hover:${accent.replace("800", "700")} transition-colors
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
  <div class="flex flex-col items-center text-center justify-start mt-2 sm:mt-10 flex-1 ">


    {#if valk == true}

    <h1 class="text-lg md:text-xl text-white sm:mt-4 mb-2 italic font-russoone">{displayTitle}</h1>

    {:else}
    <h1 class="text-lg md:text-xl text-white sm:mt-10 mb-2 italic font-russoone">{displayTitle}</h1>

    {/if}
    <!-- Info Cards -->
<div class="relative rounded-lg  shadow-md w-[260px] md:w-[300px]">    
    <div class="rounded-lg overflow-hidden shadow-md w-[260px] md:w-[300px]">
      {#if dlcEN || dlcCN}
        <!-- Compact layout when DLC is present -->
        <div class="flex flex-col">
          <!-- Name -->
          <div class="flex">
            <div class={`${accent} text-white px-3 py-1 w-28 flex items-center justify-center font-semibold text-xs`}>
              Name
            </div>
            <div class="bg-slate-200 text-black px-3 py-1 flex-1 text-xs font-medium flex items-center">
              {displayName}
            </div>
          </div>

          <!-- Release -->
          <div class="flex">
            <div class={`${accent} text-white px-3 py-1 w-28 flex items-center justify-center font-semibold text-xs`}>
              Release
            </div>
            <div class="bg-slate-200 text-black px-3 py-1 flex-1 text-xs font-medium flex items-center">
              {displayRelease}
            </div>
          </div>

          <!-- DLC -->
          <div class="flex">
            <div class={`${accent} text-white px-3 py-1 w-28 flex items-center justify-center font-semibold text-xs`}>
              DLC
            </div>
            <div class="bg-slate-200 text-black px-3 py-1 flex-1 text-xs font-medium flex items-center">
              {displayDLC}
            </div>
          </div>
        </div>
      {:else}
        <!-- Normal separate layout when no DLC -->
        <div class="flex rounded-lg overflow-hidden shadow-md">
          <div class={`${accent} text-white px-4 py-1 w-28 flex items-center justify-center font-semibold text-xs`}>
            Name
          </div>
          <div class="bg-slate-200 text-black px-3 py-1 flex-1 flex items-center text-xs font-medium">
            {displayName}
          </div>
        </div>
        <div class="flex rounded-lg overflow-hidden shadow-md mt-2">
          <div class={`${accent} text-white px-4 py-1 w-28 flex items-center justify-center font-semibold text-xs`}>
            Release
          </div>
          <div class="bg-slate-200 text-black px-3 py-1 flex-1 flex items-center text-xs font-medium">
            {displayRelease}
          </div>
        </div>
      {/if}
    </div>

<div class="absolute right-[-12px] top-1/2 -translate-y-1/2">
  <button
    on:click={() => currentLang = currentLang === 'EN' ? 'CN' : 'EN'}
    class="w-8 h-8 rounded-full bg-slate-800 border border-white/10 
           flex items-center justify-center text-xs font-bold text-white
           shadow-md backdrop-blur-md
           hover:scale-110 active:scale-95 transition-all"
  >
    {currentLang}
  </button>
</div>

</div> 
    <slot /> <!-- Extra (CharBio etc.) -->
  </div>
</div>
