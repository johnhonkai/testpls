

<svelte:head>
    <title>v7.7 Calendar and Boss Schedule</title> 
    <meta property="og:title" content="HI3 Calendar and Boss Schedule"/>
    <meta property="og:description" content="Version 7.7" />
    <meta property="og:image" content={data.ogImage} />
    <meta property="og:url" content="https://marisaimpact.com/valk/calendar77" />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary_large_image">

    <link rel="canonical" href="https://marisaimpact.com/valk/calendar77" />
</svelte:head>

<script>
    export let data; // This will include `ogImage` from the load function

    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import BossCard from '$lib/components/calendarbosspic.svelte'
	import VersionSelect from '$lib/components/VersionSelect.svelte';
  import { weatherList , bossData , mabossData} from '$lib/bossData.js';
  import { scheduler } from '$lib/schedule.js';

  // 🔥 Arena image pool (EDIT THIS LIST)
  const arenaImages = [
    "/images/BossesMA/Sampo.webp",
    "/images/BossesMA/Kalpas.webp",
    "/images/BossesMA/Alien Guard.webp"
  ];

  // SETTINGS
  let weeksCount = 8;
  let startDate = "2024-09-06";
  let selectedWeek = 0;

  // Flatten weather list
  const weatherOptions = Object.values(weatherList).flat();

  // Generate schedule (reactive)
  $: schedule = Array.from({ length: weeksCount }, (_, i) => ({
    week: i + 1,
    ex: [{ weatherId: "" }, { weatherId: "" }],
    ma: [{ image: "" }, { image: "" }, { image: "" }]
  }));

  // Generate dates
  function generateDates(startDate, weeks) {
    const result = [];
    let current = new Date(startDate);

    for (let i = 0; i < weeks; i++) {
      const abyss1 = new Date(current);

      current.setDate(current.getDate() + 3);
      const abyss2 = new Date(current);

      current.setDate(current.getDate() + 1);
      const arena = new Date(current);

      current.setDate(current.getDate() + 3);

      result.push({ abyss1, abyss2, arena });
    }

    return result;
  }

  $: dates = generateDates(startDate, weeksCount);

  // Format date nicely
  function formatDate(d) {
    return d.toLocaleDateString('en-US', {
      month: 'short',      
        day: 'numeric',
    });
  }

  // Save (copy JSON)
  function exportSchedule() {
    const data = JSON.stringify(schedule, null, 2);
    navigator.clipboard.writeText(data);
    alert("Copied schedule to clipboard!");
  }

  // Select arena image
  function selectArenaImage(index, img) {
    schedule[selectedWeek].ma[index].image = img;
  }

    // Tabs
    let activeTab = "Supply"; // Default tab

        // Detect URL query parameters
        onMount(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.has('boss')) {
            activeTab = "Boss";
        }
    });

    // Variables for modal
    let selectedSupply = null;
    let showModal = false;


    // Function to close modal
    function closeModal() {
        showModal = false;
    }

    // Switch tab function
    function switchTab(tabName) {
        activeTab = tabName;
        updateURL(tabName);
    }

    // Function to update the URL based on active tab
    function updateURL(tabName) {
    const url = new URL(window.location.href);

    if (tabName === "Boss") {
        // Set 'boss' without an '='
        url.search = '?boss';
    } else {
        // Remove 'boss' query parameter
        url.searchParams.delete('boss');
    }

    // Use `goto` to change the URL without reloading
    goto(url.pathname + url.search, { replaceState: true });
}

let selectedVersion = "7.7";
$: activeSchedule = scheduler[selectedVersion] || [];

</script>



<div class="relative w-full h-40 md:h-70 overflow-hidden "  id="bannerpic">

    <img
      src="https://i.imgur.com/0jPW5D8.jpeg"
      alt="Header"
      class="w-full h-full object-cover  opacity-35"
      />
  
  
   
    <!-- Text overlay -->
    <div class="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 pb-3 md:pb-0 md:pt-6 z-10">
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-md font-russoone italic tracking-wider text-shadow-lg/30 ">
        Supply and Boss Timeline
      </h1>
      <p class="text-sm sm:text-lg text-slate-200 drop-shadow-sm">
        Based on CN server. Schedule might be different for Regional servers.

      </p>
    </div>
    
  
    <!-- Blur overlay at bottom -->
    <div class="absolute bottom-0 left-0 w-full h-15 bg-gradient-to-t from-base-100 to-transparent z-0"></div>
  
  </div>
  

<div class="flex justify-center items-end gap-5 -mt-3">

    <VersionSelect currentVersion="7.7"></VersionSelect>

  <div role="tablist" class="tabs-border mt-4 space-x-2 ">
     <button
        role="tab" class="tab {activeTab === 'Supply' ? 'tab-active ' : ''}"
        on:click={() => switchTab("Supply")}
    >
        Supply
    </button>
    <button
        role="tab" class="tab  {activeTab === 'Boss' ? 'tab-active' : ''}"
        on:click={() => switchTab("Boss")}
    >
        Boss
    </button>
</div>

</div>
{#if activeTab === "Supply"}

<div class="p-4 container-screen-2xl flex justify-center items-center mt-4 mb-10 ">
        <!-- Supply and Events Calendar Layout -->
        <div class="overflow-x-auto ">

                         <div class="w-200 ">
                            <img src="https://i.imgur.com/tz77sJV.png" alt="Calendar" class="w-full h-full object-cover rounded" />
                        </div>           
        </div>

        

        

</div>



{:else if activeTab === "Boss"}



<!-- ================= TABLE ================= -->
<div class="p-4 mt-4 flex justify-center">
    <div class="overflow-x-auto overflow-y-clip">
        <div class="w-[940px] rounded-lg bg-gray-900 text-white">

      <!-- HEADER -->
    <div class="grid grid-cols-6 gap-1 text-center font-semibold bg-gray-800 text-white p-2 rounded-t-lg">
                <div class="col-span-1 px-4 py-2 mr-3 ">v7.7 WEEK</div>
                <div class="col-span-2 mr-4 px-4 py-2">EX ABYSS</div>
                <div class="col-span-3 px-4 py-2">MEMORIAL ARENA</div>
    </div>

      <!-- ROWS -->
        {#each activeSchedule as week, i}
            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2">

                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
            {week.week}
          </div>

          <!-- ABYSS -->
                <div class="flex col-span-2 justify-center gap-1 mr-2">
            {#each week.ex as boss, j}
              {#if boss.weatherId}
                <BossCard
                  image={bossData[boss.weatherId]?.bosspic}
                  date={formatDate(dates[i][j === 0 ? 'abyss1' : 'abyss2'])}
                  weather={boss.weatherText}
                  bosspage={`/boss?${boss.weatherId}`}
                />
              {/if}
            {/each}
          </div>

          <!-- ARENA -->
                <div class="flex col-span-3 justify-center gap-1 ml-2">
{#each week.ma as boss, j}
  {#if boss.bossId}
    <BossCard
      image={mabossData[boss.bossId]?.bosspic}
      date={j === 0 ? formatDate(dates[i].arena) : undefined}
    />
  {/if}
{/each}
          </div>

        </div>
      {/each}

    </div>
  </div>
</div>


{/if}

<!-- DaisyUI Modal Component -->
{#if showModal && selectedSupply}
    <div class="modal modal-open" on:click={closeModal}>
        <!-- Conditionally apply larger size when an image is present -->
        <div class="modal-box max-w-4xl max-h-[90vh]" on:click|stopPropagation>
            <h2 class="font-bold text-lg mb-4">{selectedSupply.title}</h2>
            <div class="mb-4">
                {@html selectedSupply.description}
            </div>
            {#if selectedSupply.image}
                <img src="{selectedSupply.image}" alt="{selectedSupply.title}" class=" max-h-auto object-cover rounded-md mb-4" />
            {/if}            
            <div class="modal-action">
                <button on:click={closeModal} class="btn">Close</button>
            </div>
        </div>
    </div>
{/if}

<style>
    .text-outline {
        text-shadow:  -1px 1px 1px black, 1px 1px 1px black, 1px -1px 1px black, -1px -1px 1px black}
</style>