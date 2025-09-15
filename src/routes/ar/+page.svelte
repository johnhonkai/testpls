<svelte:head>
<title>Astral Ring</title> 

<meta property="og:title" content="Honkai Impact Astral Ring Guide" />
<meta property="og:description" content="Astral Ring Overview" />
<meta property="og:image" content="https://i.imgur.com/PRaNX6y.png" />
<meta property="og:url" content="https://marisaimpact.com/ar" />
<meta property="og:type" content="website" />

<meta name="twitter:card" content="summary_large_image">


<link rel="canonical"  />
</svelte:head>

<script>

	import CardWrapper from '$lib/components/ui/ThreeDCardEffect/CardWrapper.svelte';


  const astralRings = [
    { name: "World Star", slug: "world-star", image: "/images/artype/banner_ws.webp" },
    { name: "Wheel of Destiny", slug: "wheel-of-destiny", image: "/images/artype/banner_wod.webp"},
    { name: "Rite of Oblivion", slug: "rite-of-oblivion", image: "/images/artype/banner_roo.webp" },
    { name: "Law of Ascension", slug: "law-of-ascension", image: "/images/artype/banner_loa.webp" },
    { name: "Grail of Infinitude", slug: "grail-of-infinitude", image: "/images/artype/banner_goi.webp" },

  ];
</script>

<div class="relative w-full h-40 md:h-70 overflow-hidden "  id="bannerpic">

  <img
    src="/images/bg_ar.webp"
    alt="Header"
    class="w-full h-full object-cover [object-position:50%_5%] opacity-45"
  />


 
  <!-- Text overlay -->
  <div class="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 pb-3 md:pb-0 md:pt-4 z-10">
    <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-md font-russoone italic tracking-wider text-shadow-lg/30 ">
      Astral Ring
    </h1>
    <p class="text-sm sm:text-lg text-slate-200 drop-shadow-sm">
      Overview of each Astral Ring group


    </p>
  </div>
  

  <!-- Blur overlay at bottom -->
  <div class="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-base-100 to-transparent z-0"></div>

</div>


<div class="px-4 py-10 md:hidden">
  <div class="max-w-6xl mx-auto">
    <h1 class="text-lg font-semibold text-center text-white mb-10 drop-shadow">Select an Astral Ring</h1>

    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-6 ">
      {#each astralRings as ar}
        <a
          href={`/ar/${ar.slug}`}
          class="group relative flex flex-col items-center rounded-2xl bg-zinc-900/80 hover:bg-zinc-800/90 transition p-4 shadow-md hover:shadow-lg"
        >
          <div class="w-36 h-20 sm:w-24 sm:h-24 mb-3 rounded-xl overflow-hidden bg-gray-800">
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
</div>

  <div class="mx-auto hidden md:block">
    <p class="text-2xl font-semibold text-center text-white mb-6 drop-shadow">Select an Astral Ring</p>
<div class="relative w-full overflow-hidden flex justify-center items-center "  id="bannerpic">

	<div class="grid grid-cols-2 lg:grid-cols-3  gap-6 max-w-(--breakpoint-xl) w-full">
{#each astralRings as card (card.slug)}
  <CardWrapper {card} />
{/each}
	</div>

</div>
  </div>