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
  let selectedVersion = "8.2";

  // Filter posts by the selected version
  $: filteredPosts = selectedVersion === "All"
    ? data.posts
    : data.posts.filter(post => post.version === selectedVersion);

  // Get unique versions for the filter dropdown
  const versions = ["All", ...new Set(data.posts.map(post => post.version))];
</script>


<div class="max-w-5xl mx-auto p-4 pb-0 rounded-lg  text-center">
  <h2 class="text-2xl  font-semibold mb-2 text-cyan-500 ">Beta News</h2>
  <p class="text-xs sm:text-sm">
    This page contains info from CN beta test server that are allowed to be shared. THESE ARE NOT LEAKS.
  </p>
</div>

<section class="container mx-auto px-4 py-10">

  <!-- Version Filter Dropdown -->
  <div class="flex justify-center mb-8">
    <select bind:value={selectedVersion} class="select select-bordered w-full max-w-xs">
      {#each versions as version}
        <option value={version}>{version === "All" ? "All Versions" : `Version ${version}`}</option>
      {/each}
    </select>
  </div>

  <div class="grid gap-4 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
    {#each filteredPosts as post} <!-- Use filteredPosts here -->
      <a href={`/betanews/${post.slug}`} data-sveltekit-preload-data="off" class="block p-6 bg-base-200 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl will-change-transform ">
        
        <!-- Flex container for image and post content -->
        <div class="flex items-center space-x-4">
          
          <!-- Left side image -->
          <img src={post.image} alt={`Preview of ${post.title}`} class="w-14 h-14 sm:w-20 sm:h-20 rounded-lg object-cover">
          
          <!-- Right side post details -->
          <div>
            <h2 class="text-lg sm:text-2xl font-semibold text-secondary mb-1">{post.title}</h2>
            <p class=" text-slate-300">Version {post.version}</p>

          </div>
          
        </div>

      </a>
    {/each}
  </div>
</section>
