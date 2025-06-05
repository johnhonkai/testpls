<svelte:head>
<title>Story Order</title> 

<meta property="og:title" content="Honkai Impact Story Order" />
<meta property="og:description" content="Story sorted by release date" />
<meta property="og:image" content="" />
<meta property="og:url" content="https://marisaimpact.com/story" />
<meta property="og:type" content="website" />

<meta name="twitter:card" content="summary_large_image">


<link rel="canonical"  />
</svelte:head>

<script>

	import CardWrapper from '$lib/components/ui/ThreeDCardEffect/CardWrapperstory.svelte';


  const astralRings = [
    { name: "Part 1 (2016)", slug: "part1", image: "https://i.imgur.com/fCVEMBO.png" },
    { name: "Part 2 (2023)", slug: "part2", image: "https://i.imgur.com/C8lb47l.png"},
  ];
</script>

<div class="relative w-full h-40 md:h-70 overflow-hidden "  id="bannerpic">

  <img
    src="https://i.imgur.com/fCVEMBO.png"
    alt="Header"
    class="w-full h-full object-cover opacity-45"
  />


 
  <!-- Text overlay -->
  <div class="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 pb-3 md:pb-0 md:pt-4 z-10">
    <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-md font-russoone italic tracking-wider text-shadow-lg/30 ">
      Story Order
    </h1>
    <p class="text-sm sm:text-lg text-slate-200 drop-shadow-sm">
      Release order of Honkai Impact story.


    </p>
  </div>
  

  <!-- Blur overlay at bottom -->
  <div class="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-base-100 to-transparent z-0"></div>

</div>


<div class="px-4  py-10 md:hidden">
  <div class="max-w-6xl mx-auto">

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6 ">
      {#each astralRings as ar}
        <a
          href={`/${ar.slug}`}
          class="group relative flex flex-col items-center rounded-2xl bg-zinc-900/80 hover:bg-zinc-800/90 transition p-4 shadow-md hover:shadow-lg"
        >
          <div class="h-20 w-auto sm:h-24 mb-3 rounded-xl overflow-hidden bg-gray-800">
            <img
              src={ar.image}
              alt={ar.name}
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
          <div class="text-sm sm:text-base text-white font-medium text-center leading-tight">
            {ar.name}
          </div>
        </a>
      {/each}
    </div>
  </div>
  <section class="mt-10 mb-20 px-4 w-full flex flex-col items-center text-center">
  <h2 class="text-lg sm:text-xl font-bold text-white mb-6">
    Official Story Timeline
  </h2>

  <div class="w-full max-w-4xl">
    <img
      src="https://i.imgur.com/H1JeKd9.png"
      alt="Official Story Timeline"
      class="w-full h-auto rounded-lg shadow-lg object-contain"
    />
  </div>
</section>
</div>

  <div class="mx-auto hidden md:block mb-60 mt-5">
<div class="relative w-full overflow-hidden flex justify-center items-center "  id="bannerpic">

	<div class="grid grid-cols-2 max-w-(--breakpoint-lg) w-full">
{#each astralRings as card (card.slug)}
  <CardWrapper {card} />
{/each}
	</div>

</div>

<section class="my-20 px-4 w-full flex flex-col items-center text-center">
  <h2 class="text-lg sm:text-xl font-bold text-white mb-6">
    Official Story Timeline
  </h2>

  <div class="w-full max-w-4xl">
    <img
      src="https://i.imgur.com/H1JeKd9.png"
      alt="Official Story Timeline"
      class="w-full h-auto rounded-lg shadow-lg object-contain"
    />
  </div>
</section>

  </div>