<svelte:head>
  <title>Wheel of Destiny</title> 

    <meta property="og:title" content="Wheel of Destiny characters"/>
    <meta property="og:description" content="Info for characters in Wheel of Destiny teams." />
    <meta property="og:image" content="https://i.imgur.com/lIaiuzJ.png" />
    <meta property="og:url" content="https://marisaimpact.com/ar/wheel-of-destiny" />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary_large_image">

    <link rel="canonical" href="https://marisaimpact.com/ar/wheel-of-destiny" />
</svelte:head>

<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

  const dps = [
    { name: "Mad Pleasure", image: "/images/valkportrait/Thelema Mad Pleasure.png" , type: "Mech" , element: "Ice"},
    { name: "Lone Destruction", image: "/images/valkportrait/Lantern Lone Destruction.png" , type: "Psy" , element: "Fire" },
    { name: "Jovial Deception", image: "/images/valkportrait/Songque Jovial Deception.png" , type: "Bio" , element: "Physical" },

  ];

  const support = [
    { name: "Deepspace Anchor", image: "/images/valkportrait/Senadina Deepspace Anchor.png" , type: "Sd" , element: "Lightning" },
    { name: "Mad Pleasure", image: "/images/valkportrait/Thelema Mad Pleasure.png" , type: "Mech" , element: "Ice"},
    { name: "Lone Destruction", image: "/images/valkportrait/Lantern Lone Destruction.png" , type: "Psy" , element: "Fire" },
    { name: "Jovial Deception", image: "/images/valkportrait/Songque Jovial Deception.png" , type: "Bio" , element: "Physical" },
    { name: "Lone Planetfarer", image: "/images/valkportrait/Vita Lone Planetfarer.png", type: "Mech" , element: "Lightning" },
    { name: "Reign Solaris", image: "/images/valkportrait/dudu.png", type: "Img" , element: "Physical" },
    { name: "Herrscher of Human", image: "/images/valkportrait/Elysia Herrscher of Human Ego.png" , type: "Psy" , element: "Ice"},

  ];

  const utilities = {
    "Breach State": [
        { name: "Deepspace Anchor", image: "/images/valkportrait/Senadina Deepspace Anchor.png" , details: "Sena has zero on-field time." },
        { name: "Lone Planetfarer", image: "/images/valkportrait/Vita Lone Planetfarer.png" },
    ],

    "AR Regen": [
        { name: "Lone Planetfarer", image: "/images/valkportrait/Vita Lone Planetfarer.png" },
        { name: "Mad Pleasure", image: "/images/valkportrait/Thelema Mad Pleasure.png" , details: "Has a unique aerial evasion spam tech. With signature weapon (gain 2 AR after evasion) and against the right attack, Thelema can provide the team a lot of AR regen in a short time." },

    ],

        Shieldbreak: [
            { name: "Mad Pleasure", image: "/images/valkportrait/Thelema Mad Pleasure.png" },
    ],

    Hitcount: [
        { name: "Lone Destruction", image: "/images/valkportrait/Lantern Lone Destruction.png" },
    ],

    Freeze: [
            { name: "Mad Pleasure", image: "/images/valkportrait/Thelema Mad Pleasure.png" },
    ],

    Paralyze: [],

    Ignite: [],

    Bleed: [],


    Mobs: [],

    Stardust: [
            { name: "Jovial Deception", 
            image: "/images/valkportrait/Songque Jovial Deception.png" ,  
            details: "JD Combo ATK can immediately trigger critical point of SD enemy." },
    ],

    Cooldown: [],

    Bow: [
            { name: "Herrscher of Human", 
            image: "/images/valkportrait/Elysia Herrscher of Human Ego.png",
           details: "As a bow user, HoH can hit an enemy's weak spot. This is only used for Tank boss. When its weak spot is hit, Tank gets a huge debuff." },
    ],

  };

  const state = $state({
    selectedChar: null
  });
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
      Wheel of Destiny
    </h1>
    <p class="text-sm sm:text-lg text-slate-200 drop-shadow-sm">
      Info for characters in WoD teams.


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

<div class="max-w-7xl min-h-screen px-4 sm:px-6 pb-10 text-white mx-auto">

<section>
  <h2 class="text-xl sm:text-2xl font-semibold pt-2 cooltext">Overview</h2>
  <p class="text-sm sm:text-base text-gray-300 leading-relaxed sm:leading-loose mt-2">
    <span class="block ">
      <strong class="text-white">Wheel of Destiny</strong> team focuses on solo DPS. This playstyle is almost similar to Burst Mode in Part 1.
    </span>
    <span class="block">
      Teammates with the <span class="text-indigo-400 font-medium">Harmonized Shadow Star</span> tag become shadow attacks during Stellar Outburst.
    </span>
  </p>
</section>


  <div class=" mx-auto space-y-12">

      <div class="divider"></div>

    <!-- DPS + Support Section Side-by-Side on Wide Screens -->
<div class="flex flex-col xl:flex-row gap-12 ">

  
  <!-- DPS Section -->
  <section class="flex-1">
    <h2 class="text-xl sm:text-2xl font-semibold  pb-2 cooltext">DPS</h2>
    <div class="flex flex-wrap gap-3">
      {#each dps as char}
        <div class="relative group p-1 hover:bg-gray-800 rounded transition w-fit">
          {#if char.type}
            <div class="absolute top-1 left-1 sm:left-0 sm:mx-1 w-7 z-10">
              <img src={`/images/type/icon_${char.type.toLowerCase()}.webp`} alt={char.type} class="w-6 sm:w-full h-full object-cover" />
            </div>
          {/if}

          {#if char.element}
            {#each (Array.isArray(char.element) ? char.element : [char.element]) as el, i}
              <div class="absolute left-1 sm:left-0 sm:mx-1 w-7 z-10" style={`top: ${2.0 + i * 2}rem`}>
                <img src={`/images/element/icon_${el.toLowerCase()}.webp`} alt={el} class="w-6 sm:w-full h-full object-cover" />
              </div>
            {/each}
          {/if}

          <img
            src={char.image}
            alt={char.name}
            class="rounded w-20 sm:w-24 h-auto aspect-square object-cover"
          />
        </div>
      {/each}
    </div>
  </section>



  <!-- Support Section -->
  <section class="flex-1">
    <h2 class="text-xl sm:text-2xl font-semibold pb-2 cooltext">Support</h2>
    <div class="flex flex-wrap gap-3">
      {#each support as char}


        <div class="relative group p-1 hover:bg-gray-800 rounded transition w-fit">

                            {#if char.type}
            <div class="absolute top-1 left-1 sm:left-0 sm:mx-1 w-7 z-10">
              <img src={`/images/type/icon_${char.type.toLowerCase()}.webp`} alt={char.type} class="w-6 sm:w-full h-full object-cover" />
            </div>
          {/if}

          {#if char.element}
            {#each (Array.isArray(char.element) ? char.element : [char.element]) as el, i}
              <div class="absolute left-1 sm:left-0 sm:mx-1 w-7 z-10" style={`top: ${2.0 + i * 2}rem`}>
                <img src={`/images/element/icon_${el.toLowerCase()}.webp`} alt={el} class="w-6 sm:w-full h-full object-cover" />
              </div>
            {/each}
          {/if}

          <img
            src={char.image}
            alt={char.name}
            class="rounded w-20 sm:w-24 h-auto aspect-square object-cover"
          />
        </div>
      {/each}
    </div>
  </section>
</div>

  <div class="divider"></div>


    <!-- Utilities Section -->
    <section>
      <h2 class="text-xl sm:text-2xl font-semibold  py-2 mb-2 cooltext">Utilities</h2>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-6 ">
        {#each Object.entries(utilities) as [label, chars]}
        {#if chars.length > 0}

          <div class="bg-zinc-900 rounded-lg p-4 space-y-2 justify-items-center">
            <h3 class="text-sm sm:text-base font-medium text-gray-300 text-center">{label}</h3>
              <div class={`grid gap-2 justify-items-center ${chars.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                {#each chars as char}
<div class="relative group p-1 hover:bg-gray-800 rounded transition cursor-pointer">
  <img
    src={char.image}
    alt={char.name}
    class="rounded w-12 sm:w-20 h-auto aspect-square object-cover"
  />



  <!-- Tooltip -->
  {#if char.details}
    <div class="absolute z-50 bottom-full  mb-2 w-48 sm:w-60 text-sm text-white bg-teal-800 p-2 rounded shadow-md opacity-0 group-hover:opacity-100 transition pointer-events-none">
      {char.details}
    </div>
  {/if}
</div>
                {/each}
              </div>

          </div>
         {/if}
        {/each}
      </div>


    </section>

  </div>


</div>