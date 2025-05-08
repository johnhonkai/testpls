<!-- src/routes/betanews/+page.svelte -->
<svelte:head>
  <title>HI3 Beta News</title> 

    <meta property="og:title" content="Honkai Impact 3rd Beta News"/>
    <meta property="og:description" content="Honkai Impact 3rd Beta News" />
    <meta property="og:image" content="https://i.imgur.com/APjjbN5.png" />
    <meta property="og:url" content="https://marisaimpact.com/betanews" />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary_large_image">

    <link rel="canonical" href="https://marisaimpact.com/betanews" />
</svelte:head>

<script>
  export let data;

  // Set the default selected version
  let selectedVersion = "8.3";

  // Filter posts by the selected version
  $: filteredPosts = selectedVersion === "All"
    ? data.posts
    : data.posts.filter(post => post.version === selectedVersion);

  // Get unique versions for the filter dropdown
  const versions = ["All", ...new Set(data.posts.map(post => post.version))];
</script>


<div class="relative w-full h-40 md:h-70 overflow-hidden "  id="bannerpic">

  <img
    src="/images/bridge.webp"
    alt="Header"
    class="w-full h-full object-cover opacity-45"
  />


 
  <!-- Text overlay -->
  <div class="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 pb-3 md:pb-0 md:pt-4 z-10">
    <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-md font-russoone italic tracking-wider text-shadow-lg/30 ">
      Beta News
    </h1>
    <p class="text-sm sm:text-lg text-slate-200 drop-shadow-sm">
      Info from CN beta test server. THESE ARE NOT LEAKS.


    </p>
  </div>
  
    <div class="absolute bottom-0  right-1/2 translate-x-[160%] md:translate-x-[190%] z-0 cursor-pointer">
      <img 
        src="/images/hoschibi.webp" 
        alt="Banner" 
        class="h-55 md:h-72 w-auto object-cover"
      >
    </div>
  <!-- Blur overlay at bottom -->
  <div class="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-base-100 to-transparent z-0"></div>

</div>


<section class="container mx-auto px-4 pb-8 pt-2">

  <!-- Version Filter Dropdown -->
  <div class="flex justify-center mb-10">
    <select
      bind:value={selectedVersion}
      class="w-full max-w-xs px-4 py-2 bg-zinc-900 border border-zinc-700 text-zinc-100 rounded-xl shadow-sm  transition focus:outline-none"
    >
      {#each versions as version}
        <option value={version}>
          {version === "All" ? "All Versions" : `Version ${version}`}
        </option>
      {/each}
    </select>
  </div>

  <!-- Cards Grid -->
  <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {#each filteredPosts as post}
      <a
        href={`/betanews/${post.slug}`}
        data-sveltekit-preload-data="off"
        class="group block bg-zinc-900 border border-zinc-800 rounded-2xl p-5 shadow-md hover:shadow-xl hover:border-secondary transition-transform transform hover:-translate-y-1 will-change-transform"
      >
        <div class="flex items-center gap-5">
          <!-- Post image -->
          <img
            src={post.image}
            alt={`Preview of ${post.title}`}
            class="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-xl border border-zinc-700"
          />

          <!-- Post content -->
          <div class="flex flex-col">
            <h2 class="text-lg sm:text-xl font-medium text-zinc-100 group-hover:text-secondary transition-colors">
              {post.title}
            </h2>
            <p class="text-sm text-zinc-400 mt-1">Version {post.version}</p>
          </div>
        </div>
      </a>
    {/each}
  </div>
</section>
