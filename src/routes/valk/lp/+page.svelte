<svelte:head>
  <title>Vita - Lone Planetfarer</title> 

    <meta property="og:title" content="Vita - Lone Planetfarer" />
    <meta property="og:description" content="Lone Planetfarer Guides, Builds and Gameplay" />
    <meta property="og:image" content="https://i.imgur.com/ajDMeVg.png" />
    <meta property="og:url" content="https://marisaimpact.com/valk/lp" />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary_large_image">


    <link rel="canonical"  />
</svelte:head>


<script lang="ts">
    import { goto } from '$app/navigation';
    import likesData from '$lib/data/likes.json'; // Import local JSON data

    import { onMount } from "svelte";
import { hasUserLiked, likeWithVoterId } from "$lib/firebaseLikes"; // Import helper functions
import { getFirestore } from "firebase/firestore";
import { app } from "$lib/firebaseConfig";

const db = getFirestore(app); // Ensure this is used for Firebase operations
    import Charred from '$lib/components/charpctred.svelte';
    import SimpDPS from '$lib/components/lineup/simpdps.svelte';
    import SenaDPS from '$lib/components/lineup/senadps.svelte';
    import JDDPS from '$lib/components/lineup/jddps.svelte';
    import LanternDPS from '$lib/components/lineup/lanterndps.svelte';
	import ThelDPS from '$lib/components/lineup/thelemadps.svelte';
  import VitaDPS from '$lib/components/lineup/vitadps.svelte';

  import Lightbox from '$lib/components/lightbox.svelte';
	import Dududps from '$lib/components/lineup/dududps.svelte';
  let showLightbox = false;
  let selectedImage = '';

  function openLightbox(image) {
    selectedImage = image;
    showLightbox = true;
  }

  function closeLightbox() {
    showLightbox = false;
  }
 
    let selectedTab = 'Overview'; // Default tab
    const tabs = [
    { name: 'Overview', short: 'overview' },
    { name: 'Lineup', short: 'lineup' },
    { name: 'Equipment', short: 'equipment' },
    { name: 'Support Buffs', short: 'support' },
    { name: 'Rank Up', short: 'rank' },
    { name: 'How to Play', short: 'howtoplay' },
    { name: 'Gameplay Examples', short: 'example' },
    { name: 'Elysian Realm', short: 'er' },
    { name: 'Popular Question', short: 'qna' },
    { name: 'Overview Card', short: 'card' },
    { name: 'Translation Error', short: 'translation' },
  ];  

// Function to select a tab and update the URL
function selectTab(tab) {
  selectedTab = tab;

  // Get the short form for the selected tab
  const shortTab = tabs.find(t => t.name === tab)?.short;

  // Update the URL query parameter (or remove it for 'Overview')
  if (shortTab && shortTab !== 'overview') {
    const newUrl = `${window.location.pathname}?${shortTab}`;
    goto(newUrl, { replaceState: true });
  } else {
    // Remove the query parameter for the 'Overview' tab
    goto(window.location.pathname, { replaceState: true });
  }
}

// onMount to check for URL parameters
onMount(() => {
  // Get the current URL query parameters
  const currentPath = window.location.search.substring(1); // Removes '?'

  // Match the current path with the short tab names
  const matchingTab = tabs.find(tab => tab.short === currentPath);
  if (matchingTab) {
    selectedTab = matchingTab.name;
  }
});

    // Track pagination
  let itemsPerPage = 1; // Set the number of items you want to show per page
  let currentPage = 1;

  // Calculate total pages based on the number of items
  $: totalItems = 3; // Total categories or groups in the lineup section
  $: totalPages = Math.ceil(totalItems / itemsPerPage);

  // Function to change pages
  function goToPage(page) {
    currentPage = page;
  }

  function nextPage() {
    if (currentPage < totalPages) currentPage++;
  }

  function prevPage() {
    if (currentPage > 1) currentPage--;
  }

    // Track the active playstyle tab
    let activePlaystyle = '1';

// Function to switch tabs
function setPlaystyle(playstyle) {
  activePlaystyle = playstyle;
}

let isMobile = false;

// Check screen size to determine if the view is mobile
onMount(() => {
  const checkMobile = () => (isMobile = window.innerWidth < 600);
  checkMobile();
  window.addEventListener('resize', checkMobile);
  return () => window.removeEventListener('resize', checkMobile);
});

  // Track which item is open
  let openItem = null;

  function toggleItem(index) {
    openItem = openItem === index ? null : index;
  }
  let isMenuOpen = false; // State to control mobile menu visibility

  function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        document.body.style.overflow = isMenuOpen ? 'hidden' : ''; // Toggle background scrolling
    }

    let showTabs = false;

function toggleTabs() {
    showTabs = !showTabs;
}

function selectTabMobile(event) {
        selectedTab = event.target.value;
    }
    let lplikes = likesData["lp"] || 0; // Get initial likes from JSON
  const charName = "lp"; // Route name for this character
  let hasLiked = false; // Track if the user has liked
  let voterId = ""; // User's unique voter ID

  // Generate or fetch the voterId on component mount
  onMount(async () => {
  voterId = localStorage.getItem("voterId") || crypto.randomUUID(); // Generate a voter ID if not present
  localStorage.setItem("voterId", voterId); // Store voter ID locally

  // Check Firebase if the user has already liked this character
  const userHasLiked = await hasUserLiked(charName, voterId);


  if (userHasLiked) {
    hasLiked = true; // Update state to disable the button
    localStorage.setItem(`liked_${charName}`, "true"); // Persist locally
  }
});
  async function increaseLike() {
  try {
    if (hasLiked) {
      console.log("User has already liked this character.");
      return;
    }

    lplikes++;

    // Call likeWithVoterId to send the like to Firebase
    await likeWithVoterId(charName, voterId);

    // Update local state to prevent multiple likes
    hasLiked = true;
    localStorage.setItem(`liked_${charName}`, "true"); // Persist locally

    console.log(`Successfully liked "${charName}".`);
  } catch (error) {
    console.error("Error liking the character:", error);
  }
}
</script>



<style>
  .like-container {
      display: flex;
      align-items: center;
      gap: 8px;
  }
</style>

<section class="relative mx-auto flex flex-row items-center justify-center px-4 md:p-2 gap-3 md:pb-0  md:mt-0  pt-4	sm:pt-0	">
  <div class="absolute   top-0 w-full h-[90vh] z-[-10] opacity-85 " id="bgwavebox">    
    <img src="/images/bg/wave_lp.svg" alt="Lone Planetfarer" class="w-full h-full object-cover overflow-hidden" /> 
  </div>


  <div class="fixed  h-1/2 w-1/2 top-[-5vh] right-[-20vw]  z-[-8] hidden sm:block " id="avabox">    
    <img src="/images/test.png" alt="Lone Planetfarer" class=" object-contain slide-in-pls" /> 
  </div>

  <!-- Left: Character Image -->
  <div class="relative  w-auto h-48 sm:h-60 md:h-72 flex justify-center " id="valkpicbox">
    <!-- Image for Larger Screens -->
    <img src="/images/valkfull/vita.webp" alt="Lone Planetfarer" class="h-full w-auto object-cover md:object-contain  " style ="view-transition-name: valkyrie-image-13;"/> 
  
    <div class="absolute bottom-0 left-0 like-container flex items-center gap-2 mt-4">
      <button
        on:click={increaseLike}
        class="bg-gray-800 text-white px-4 py-2 rounded transition-all flex items-center gap-2
               {hasLiked ? '' : 'hover:bg-blue-700'}">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-5 h-5"
        >
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          />
        </svg>
        <span class="text-white font-semibold">{lplikes}</span>
      </button>
    </div>
  
  </div>



  <!-- Right: Character Info (Centered) -->
  <div class="flex flex-col items-center text-center justify-start">
    <!-- Battlesuit Name -->
    <h1 class="text-xl md:text-2xl text-slate-100 font-bold text-center mb-2 sm:mb-0">Lone Planetfarer</h1>

    <!-- Character Name and Release Date -->
    <p class="text-base md:text-md custom-font mb-2 text-center tracking-wider md:block hidden text-slate-100">Vita | Release Date: v7.8 (17 Oct 2024)</p>

    <!-- Common wrapper to ensure same width -->
    <div class="w-full max-w-sm mb-2">
      <!-- Container with 4 pictures (Centered) -->
      <div class="flex flex-col items-center">
        <div class="flex w-[260px] md:w-[300px] gap-2 flex-wrap justify-center outline outline-teal-500 outline-1 bg-sky-950/75 rounded-lg p-2 backdrop-blur-sm">
          <img src="/images/ranks/Valkyrie_S.webp" alt="S-rank" class="w-auto h-8 md:h-10" />
          <img src="/images/type/IconMECH.png" alt="Mech" class="w-auto h-8 md:h-10" />
          <img src="/images/element/Core_Lightning_DMG.png" alt="Icon 3" class="w-auto h-8 md:h-10" />
          <img src="/images/artype/ar roo.png" alt="ar" class="w-auto h-8 md:h-10" />
        </div>
      </div>


      <div class="flex flex-col mt-4 items-center">

        <div class="flex flex-col  w-[260px] md:w-[300px] flex-wrap justify-center outline outline-teal-500 outline-1 bg-sky-950/75 rounded-lg p-2 backdrop-blur-sm">
          <div class="flex flex-wrap justify-center">
            <h2 class="text-base md:text-md custom-font tracking-wider text-slate-100">SUPPORT FOR:</h2>
          </div >
          <div class="flex flex-row gap-2 flex-wrap justify-center">
            <img src="/images/artype/ar world star.png" alt="Support 1" class="w-auto h-8 md:h-10" />
            <img src="/images/artype/ar wheel of destiny.png" alt="Support 2" class="w-auto h-8 md:h-10" />
            <img src="/images/artype/ar future.png" alt="Support 3" class="w-auto h-8 md:h-10" />
            <img src="/images/artype/AR All.png" alt="Support 4" class="w-auto h-8 md:h-10" />
          </div>
        </div>
      </div>
    </div> <!-- End common wrapper -->
  </div>
</section>

<div class="flex max-w-screen-xl justify-center mx-auto "> 


  <aside class="w-full sm:max-w-[10rem] md:max-w-[12rem] hidden sm:block p-4  text-gray-200 sticky top-16 h-[calc(100vh-4rem)] " >

    <ul class="space-y-2">
      {#each tabs as tab}
        <li>
          <button
            on:click={() => selectTab(tab.name)}
            class="w-full text-left text-sm lg:text-base p-2 rounded-lg transition-colors duration-200 
                   {selectedTab === tab.name ? 'bg-gradient-to-r from-blue-500 to-sky-500 shadow-lg	 shadow-cyan-500/20 text-white' : 'bg-gray-700/0 hover:bg-gradient-to-r from-orange-600 to-amber-500 '}">
            {tab.name}
          </button>
        </li>
      {/each}
    </ul>
    </aside>

<style>
  .dropdown.dropdown-center.dropdown-right .dropdown-content,
.dropdown-center.dropdown-left .dropdown-content{
	@apply top-1/2 transform -translate-y-1/2;
}

.dropdown-center.dropdown-bottom .dropdown-content,
.dropdown-center.dropdown-top .dropdown-content {
	@apply left-1/2 transform -translate-x-1/2;
}
</style>


<!-- Other page content -->
<section class="flex-1 w-full mb-20 ">

  <div class="relative z-10 ">

<!-- Wrapper to limit content to 940px and center it -->

<!-- Mobile View Tab Selector -->
<div class="flex justify-center sm:hidden my-4">
  <select
    class="select select-bordered w-full max-w-xs"
    bind:value={selectedTab} 
    on:change={() => selectTab(selectedTab)} 
    >
    {#each tabs as tab}
      <option value={tab.name}>
        {tab.name}
      </option>
    {/each}
  </select>
</div>

<!-- Wrapper for the tabs and content -->
<section class="max-w-[960px] mx-auto flex flex-col gap-1 sm:p-1 mb-6 ">
    <!-- Tab Content -->

    <div class="p-4 sm:p-4 bg-base-100 rounded-lg">
        {#if selectedTab === 'Overview'}
        <h2 class="text-2xl sm:text-3xl font-semibold bg-gradient-to-r  from-blue-700 to-blue-500 text-white rounded px-2 mb-4 text-center">OVERVIEW</h2>

        <div>
            <!-- Roles Section -->
            <h2 class="text-xl  font-semibold mb-2 text-left cooltext text-slate-100">ROLES</h2>
            
            <p class="mt-4 text-sm sm:text-base">
                <strong class="text-amber-400">DPS</strong> <br/> Good DPS, but only performs exceptionally well in favorable matchups. Currently, her full potential is being held back by Coralie support.
            </p>
            <p class="mt-4 text-sm sm:text-base">
                <strong class="text-amber-400">WS, WoD, ??? Supports</strong> <br/> Vita is a powerful support for World Star, WoDestiny, and one future AR team. Vita provides Ele/Phy Breach, buffs, and higher AR regen.
            </p>
            <p class="mt-4 text-sm sm:text-base">
                <strong class="text-amber-400">The other 9 AR Supports</strong> <br/> Vita can also support the other 9 Astral Ring teams. Vita still provides Breach and buffs, but at reduced effectiveness. She also lacks the proper AR attribute that will be required to activate the AR's special mechanic and buffs.
            </p>
            <div class="divider divider-neutral"></div>
            <!-- Pull Recommendation Section -->
            <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">PULL RECOMMENDATION</h2>
            <p class="mt-4 text-sm sm:text-base">
                <strong class="text-amber-400">New Players / Have not played since 7.3</strong> <br/> Recommended to pull Vita for her flexible support capability. As DPS, her support options are very limited (until a new RoO valk is added), so new players won't be able to use her optimal DPS team.
            </p>
            <p class="mt-4 text-sm sm:text-base">
                <strong class="text-amber-400">F2P, already have Senadina</strong> <br/> Vita is not a top priority, since you already have Senadina to support World Star and WoDestiny teams. The only thing Sena cannot do is support the ??? AR team and the other 9 AR teams.
            </p>
            <p class="mt-4 text-sm sm:text-base">
                <strong class="text-amber-400">Competitive</strong> <br/> Recommended, Vita's value is insane.
            </p>
            <ul class="list-disc ml-6 text-sm sm:text-base">
                <li>For World Star team, currently Vita is undeniably the best support.</li>
                <li>For WoDestiny team, S0-Vita loses to S0-Sena, thanks to Sena having zero off-field time (small score difference). At higher ranks and synergy, Vita beats Sena.</li>
                <li>For the future ??? AR team, Vita is currently one of the three best supports for that AR.</li>
            </ul>
            <div class="divider divider-neutral"></div>
            <!-- How to Get Section -->
            <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">HOW TO GET</h2>
            <ul class="list-disc ml-6 text-sm sm:text-base ">
                <li ><strong>Vita:</strong> Battlesuit Supply</li>
                <li><strong>Vita's Weapon:</strong> Equipment Supply</li>
                <li><strong>Vita's Stigma:</strong> Equipment Supply, Forgeable</li>
            </ul>
            <div class="divider divider-neutral"></div>
            <!-- Full Guide Section -->
            <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">FULL GUIDE</h2>
            <p class="mt-2 text-sm sm:text-base pb-4">
                Check out the full guide on YouTube: 
            </p>

            <div class="relative overflow-hidden" style="padding-top: 56.25%;">
                <iframe
                    class="absolute top-0 left-0 w-full h-full"
                    loading="lazy" 
                    src="https://www.youtube.com/embed/8AwMiPw-4Hs"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                </iframe>
            </div>
        </div>
    {/if}
    

    {#if selectedTab === 'Lineup'}
    <h2 class="text-2xl sm:text-3xl font-semibold bg-gradient-to-r  from-blue-700 to-blue-500 text-white rounded px-2 mb-2 text-center">LINEUP</h2>

    <section class="max-w-screen-lg mx-auto ">




        {#if currentPage === 1}
        <!-- Category 1: Vita DPS -->

        <VitaDPS firstCharIndex={0} />

        <div class="divider divider-accent text-xl custom-font tracking-wider text-teal-300"> World Star Support </div>
        
        <SimpDPS firstCharIndex={0} />

        <div class="divider divider-neutral"></div>

        <SenaDPS  />
        {/if}

        {#if currentPage === 2}
        <div class="divider divider-accent text-xl custom-font tracking-wider text-teal-300"> Wheel of Destiny Support </div>

        <JDDPS firstCharIndex={0} />

        <div class="divider divider-neutral"></div>

        <LanternDPS firstCharIndex={0} />


        <div class="divider divider-neutral"></div>

        <ThelDPS firstCharIndex={0} />

        {/if}

        {#if currentPage === 3}
        <div class="divider divider-accent text-xl custom-font tracking-wider text-teal-300"> Future AR ??? Support </div>

        <Dududps />
        {/if}

        <div class="flex justify-center mt-8 flex-wrap gap-2 sm:static">
          {#each Array(totalPages).fill(0) as _, index}
              <button
                  on:click={() => goToPage(index + 1)}
                  class={`btn ${currentPage === index + 1 ? 'btn-active' : ''}`}
              >
                  {index + 1}
              </button>
          {/each}
      </div>
</section>

    {/if}

        {#if selectedTab === 'Equipment'}
        <h2 class="text-2xl sm:text-3xl font-semibold bg-gradient-to-r  from-blue-700 to-blue-500 text-white rounded px-2 mb-2 text-center">EQUIPMENT</h2>
   
        <div>


                <h2 class="text-xl font-semibold text-center  text-yellow-400">BEST</h2>

                <div class="flex flex-col justify-center items-center">
                    
                <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">

                    <div class="w-20 h-20 sm:w-28 sm:h-28">
                        <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/09/06/50494840/2841a5bbda40fdb327b1d584d4472561_6166052678851258594.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                    </div>

                    <div class="w-20 h-20 sm:w-28 sm:h-28">
                        <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/09/06/50494840/7b4f3543ddead5167234273daed47246_5756606972921277661.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                    </div>

                    <div class="w-20 h-20 sm:w-28 sm:h-28">
                        <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/09/06/50494840/fb29f79f5d4a6e17b738b8a131be4c94_1252788991436612357.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                    </div>

                    <div class="w-20 h-20 sm:w-28 sm:h-28">
                        <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/09/06/50494840/687f69674681fd1299338dde6c0bde2b_377103950046851071.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                    </div>

                </div>  
                <h4 class="text-base sm:text-base text-white">Skyveil Feathers + Vita: Lone Planetfarer</h4>
                </div>

                <div class="p-2 mt-2 bg-gradient-to-r from-cyan-950/75 to-cyan-900/75 rounded" >
                <p class="text-sm sm:text-base text-left">
                    <li class="text-sm sm:text-base"><b>Skyveil Feathers:</b> All buffs, with one utility - first Stellar Drain consumption grants 15 more AR.</li>
                    <li class="text-sm sm:text-base"><b>Vita: Lone Planetfarer: </b> Tons of self buffs and support buffs. </li>
                    <li class="text-sm sm:text-base"><b>Affix: </b> Full ATK.</li>
                </p>
                </div>

                <div class="divider divider-neutral"></div>

                <h2 class="text-xl font-semibold text-center">TRANSITIONAL</h2>
                <div class="flex flex-col justify-center items-center">
                    
                    <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">
    
                        <div class="w-20 h-20 sm:w-28 sm:h-28">
                            <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/01/15/73749426/7f0ca6d81d2e7ff8405e13c5a7206a83_4150025281676061990.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                        </div>
    
                    </div>  
                    <p class="text-sm sm:text-base text-white">Red Star Thunderbolt</p>
    
                    <p></p>
                    </div>
             </div>
        {/if}

        {#if selectedTab === 'Support Buffs'}
        <h2 class="text-2xl sm:text-3xl font-semibold bg-gradient-to-r  from-blue-700 to-blue-500 text-white rounded px-2 mb-2 text-center">SUPPORT BUFFS</h2>

        <div class="flex flex-wrap gap-4 mt-8">
          <!-- Example image list for support buffs; add your own image sources -->
          <img
            src="/images/valkbuff/buffs_vita1.png"
            alt="Buff 1"
            class=" object-cover cursor-pointer"
            on:click={() => openLightbox('/images/valkbuff/buffs_vita1.png')}
          />
          <img
            src="/images/valkbuff/buffs_vita2.png"
            alt="Buff 2"
            class="object-cover cursor-pointer"
            on:click={() => openLightbox('/images/valkbuff/buffs_vita2.png')}
          />
          <!-- Add more images as needed -->
        </div>


        <div class="mt-8 mb-3 text-sm sm:text-base text-slate-100 space-y-4">
          <p class="mb-4 font-semibold">How to activate Vita support buffs:</p>
          
            <div>
              <p class="font-semibold text-orange-300  mt-6">Stellar Drain</p>
              <p>Combo ATK consumes Stellar Drain. For every Enhanced Basic ATK Seq 4, Stellar Drain will recover additional 5 (S) / 10 (SS) AR meter, max 2 stacks.</p>
            </div>
  
            <div>
              <p class="font-semibold text-orange-300 mt-6">Ultimate</p>
              <p>Activates Omniscient Skyveil buffs (Breach and some dmg taken buffs). Also triggered during Stellar Outburst</p>
            </div>
  
            <div>
              <p class="font-semibold text-orange-300  mt-6">Passive</p>
              <p>The rest of her buffs are activated passively.</p>
            </div>
  
  
        </div>

        <!-- Lightbox Component -->
        <Lightbox show={showLightbox} image={selectedImage} onClose={closeLightbox} />
        {/if}

        {#if selectedTab === 'Elysian Realm'}
        <h2 class="text-2xl sm:text-3xl font-semibold bg-gradient-to-r  from-blue-700 to-blue-500 text-white rounded px-2 mb-2 text-center">ELYSIAN REALM</h2>

        <div class="flex justify-center gap-4 my-6">
            <button
              on:click={() => setPlaystyle('1')}
              class={`px-4 py-2 font-semibold rounded ${activePlaystyle === '1' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gradient-to-r from-orange-600 to-amber-500 hover:text-white'}`}
            >
              STELLAR OUTBURST
            </button>
          
            <button
              on:click={() => setPlaystyle('2')}
              class={`px-4 py-2 font-semibold rounded ${activePlaystyle === '2' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gradient-to-r from-orange-600 to-amber-500 hover:text-white'}`}
            >
              AR CHARGING
            </button>
          </div>
        
          {#if activePlaystyle === '1'}
          <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">Stellar Outburst Playstyle</h2> 
          <p class="text-sm sm:text-base text-center sm:text-left">
              Mecha smashes all
          </p>

          <div class="divider divider-neutral"></div>

          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">EGO SIGNETS</h2>

          <div class="flex flex-col justify-center items-start ">
  
          <div class="flex shadow-md relative space-x-4 p-2 rounded items-center w-fit  bg-gradient-to-r from-purple-500/75 to-cyan-500/0 overflow-hidden">

            <div class="absolute z-0 w-auto h-full top-0 left-0 opacity-50 mix-blend-overlay ">
              <img src="/images/signets/egogrid.svg" class="w-full h-auto" alt="egogrid">
            </div>
              <!-- Left side image -->
              <div class="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 z-10">
                <img src="/images/signets/Exclusive.png" alt="Ego" class="w-full h-full object-cover rounded-md">
              </div>
              
              <!-- Right side text sections -->
              <div class="flex flex-col space-y-2 pr-2 z-10">
                <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Abyssal Aid ➔ Deep Love</p>
                <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Lonesome Feathers</p>
              </div>
            </div>
            
          </div>
          <div class="p-2 mt-3 rounded" >
            <p class="text-sm sm:text-base text-left">
                <li class="text-sm sm:text-base"> ER Lite mode: Equip Because of You sigil and get all three Ego signets on Floor 7.</li>
                <li class="text-sm sm:text-base"> Normal mode: You can complete the run with just one Ego signet (Abyssal Aid), but having both Ego signets is a big improvement. You can get both Ego signets at the start by using Thorny Crown sigil, OR by resetting Floor 1 until you get another Ego portal, OR use Because of You support sigil and get the other two Ego signets on Floor 7.</li>
            </p>
            </div>

            <div class="divider divider-neutral"></div>
            <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
            <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
              <!-- First Signet with 'Start' text -->
              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                  <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
                  <img src="/images/signets/Signets of Gold (Eden).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  <p class="text-lg font-semibold ">1</p>
                </div>
            
              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                  <div class="badge badge-accent z-10 absolute top-2 font-semibold">7.8</div>
                  <img src="/images/signets/Signets of Vicissitude (Hua).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  <p class="text-lg font-semibold ">2</p>
                </div>
                
                <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                  <img src="/images/signets/Signets of Discipline (Aponia).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  <p class="text-lg font-semibold ">2</p>
                </div>
  
                <div class="flex flex-col items-center p-1 rounded relative border border-slate-500">
                  <img src="/images/signets/Signets of Decimation (Kalpas).png" alt="Signet 4" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  <p class="text-lg font-semibold ">2</p>
                </div>
  
                <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                  <img src="/images/signets/Signets of Bodhi (Su).png" alt="Signet 5" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  <p class="text-lg font-semibold ">1</p>
                </div>
  
                <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                  <img src="/images/signets/Signets of Reverie (Pardofelis).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  <p class="text-lg font-semibold">2</p>
                </div>
  
            </div>
  
            <div class="p-2 mt-3 rounded" >
              <p class="text-sm sm:text-base text-left">
                  <li class="text-sm sm:text-base"> Start with Vicissitude: 7.8 Phase 1 has Vic +2, getting Vic 2 early on gives more dmg than Gold 1.</li>
                  <li class="text-sm sm:text-base"> Discipline 2: Take the Elemental Breach enhancement </li>
              </p>
              </div>
  
              <div class="divider divider-neutral"></div>
              <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SUPPORTS</h2>
  
            <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
              
              <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                  <div class="flex flex-row rounded">
                  <img src="/images/valkportrait/Fu Hua Azure Empyrea.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  </div>
                  <p class="text-base sm:text-lg font-semibold">START</p>
              </div>
  
              <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                  <div class="flex flex-row rounded">
                  <img src="/images/valkportrait/Fu Hua Azure Empyrea.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  </div>
                  <p class="text-base sm:text-lg font-semibold">MID</p>
              </div>
  
              <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                  <div class="flex flex-row rounded">
                  <img src="/images/valkportrait/Pardofelis Reverist Calico.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  </div>
                  <p class="text-base sm:text-lg font-semibold">FINAL</p>
              </div>
              
            </div>
  
            <div class="divider divider-neutral"></div>
            <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SIGIL</h2>
  
            <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
              
              <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                  <div class="flex flex-row rounded">
                  <img src="/images/sigils/Gold_Goblet.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  <img src="/images/sigils/Because_of_You.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  </div>
                  <p class="text-base sm:text-lg font-semibold">START (ER Lite)</p>
              </div>
  
              <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                  <div class="flex flex-row rounded">
                      <img src="/images/sigils/Memory.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                      <img src="/images/sigils/Because_of_You.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  </div>
                  <p class="text-base sm:text-lg font-semibold">START (Vicissitude)</p>
              </div>
  
              <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                  <div class="flex flex-row rounded">
                      <img src="/images/sigils/Heavy_as_a_Million_Lives.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                      <img src="/images/sigils/Dreamful_Gold.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  </div>
                  <p class="text-base sm:text-lg font-semibold">FINAL</p>
              </div>
  
            </div>
  
            
            <div class="divider divider-neutral"></div>
            <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">HOW TO PLAY</h2>
  
            <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
            <li>Activate Stellar Outburst.</li>
            <li>Whenever you enter Intelligence Unleashed mode, press ATK until the mode ends.</li>
            <li>Press weapon ➔ Spam Basic ATK to fill meter.</li>
            <li>When meter is full, hold ATK to enter Intelligence Unleashed mode.</li>
            <li>Repeat.</li>
            <li>Can use weapon skill before activating Stellar Outburst to trigger buffs from Helix or Stars.</li>
            <li>Don't have to use Ult, it deals pathetic damage. Can use it to trigger buffs.</li>
          </ol>
  
          <p class="mt-2 text-sm sm:text-base pb-4 text-center">
              Check out this showcase from Marisa Honkai:
          </p>
  
          <div class="relative overflow-hidden" style="padding-top: 56.25%;">
              <iframe
                  class="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/umzF5U6uxWs"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  loading="lazy">
              </iframe>
          </div>
          {/if}

          {#if activePlaystyle === '2'}
          <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">AR Charging Playstyle</h2> 
          <p class="text-sm sm:text-base text-center sm:text-left">
            Strong playstyle with lots of suspended animation and timestop.
          </p>

          <div class="divider divider-neutral"></div>


          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">EGO SIGNETS</h2>

          <div class="flex flex-col justify-center items-start ">
  
          <div class="flex shadow-md relative space-x-4 p-2 rounded items-center w-fit  bg-gradient-to-r from-purple-500/75 to-cyan-500/0 overflow-hidden">

            <div class="absolute z-0 w-auto h-full top-0 left-0 opacity-50 mix-blend-overlay ">
              <img src="/images/signets/egogrid.svg" class="w-full h-auto" alt="egogrid">
            </div>
              <!-- Left side image -->
              <div class="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 z-10">
                <img src="/images/signets/Exclusive.png" alt="Ego" class="w-full h-full object-cover rounded-md">
              </div>
              
              <!-- Right side text sections -->
              <div class="flex flex-col space-y-2 pr-2 z-10">
                <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Cosmos + Lovely Wishes</p>
                <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Lonesome Feathers</p>
              </div>
            </div>
          </div>
          <div class="p-2 mt-3 rounded" >
            <p class="text-sm sm:text-base text-left">
                <li class="text-sm sm:text-base"> ER Lite: Equip Because of You sigil and get all three Ego signets on Floor 7.</li>
                <li class="text-sm sm:text-base"> Normal: This build feels a bit weak with just one Ego signet. Get both Ego signets at the start by using Thorny Crown sigil, OR by resetting Floor 1 until you get another Ego portal, OR use Because of You support sigil and get the other two Ego signets on Floor 7.</li>
            </p>
            </div>
            <div class="divider divider-neutral"></div>
            <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
            <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
              <!-- First Signet with 'Start' text -->
              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                  <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
                  <img src="/images/signets/Signets of Decimation (Kalpas).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  <p class="text-lg font-semibold ">1</p>
                </div>
            
              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                  <img src="/images/signets/Signets of Deliverance (Kevin).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  <p class="text-lg font-semibold ">1 or 2</p>
                </div>
                
                <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                  <img src="/images/signets/Signets of Vicissitude (Hua).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  <p class="text-lg font-semibold ">2</p>
                </div>
  
                <div class="flex flex-col items-center p-1 rounded relative border border-slate-500">
                  <img src="/images/signets/Signets of Helix (Vill-V).png" alt="Signet 4" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  <p class="text-lg font-semibold ">1</p>
                </div>
  
                <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                  <img src="/images/signets/Signets of Gold (Eden).png" alt="Signet 5" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  <p class="text-lg font-semibold ">1</p>
                </div>
  
                <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                  <img src="/images/signets/Signets of Reverie (Pardofelis).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  <p class="text-lg font-semibold">2</p>
                </div>
  
            </div>
  
            <div class="p-2 mt-3 rounded" >
              <p class="text-sm sm:text-base text-left ">

                  <li class="text-sm sm:text-base"> Decimation 1: Not recommended for new players, since you can easily die.</li>
                  <li class="text-sm sm:text-base"> Deliverance 2: The additional Lightning DMG from Cosmos and Lovely Wishes count as Ult DMG, and can increase Deliverance 2 stack. It takes around 3 Basic ATK cycles to get max stack. </li>

              </p>
              </div>
  
              <div class="divider divider-neutral"></div>
              <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SUPPORTS</h2>
  
            <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
              
              <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                  <div class="flex flex-row rounded">
                  <img src="/images/valkportrait/Fu Hua Azure Empyrea.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  </div>
                  <p class="text-lg font-semibold">START</p>
              </div>
  
              <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                  <div class="flex flex-row rounded">
                  <img src="/images/valkportrait/Fu Hua Azure Empyrea.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  </div>
                  <p class="text-lg font-semibold">MID</p>
              </div>
  
              <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                  <div class="flex flex-row rounded">
                  <img src="/images/valkportrait/Pardofelis Reverist Calico.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  </div>
                  <p class="text-lg font-semibold">FINAL</p>
              </div>
              
            </div>
  
            <div class="divider divider-neutral"></div>
            <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SIGIL</h2>
  
            <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
              
              <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                  <div class="flex flex-row rounded">
                  <img src="/images/sigils/Mad_Kings_Mask.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  <img src="/images/sigils/Because_of_You.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  </div>
                  <p class="text-lg font-semibold">START (ER Lite)</p>
              </div>
  
              <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                  <div class="flex flex-row rounded">
                      <img src="/images/sigils/Mad_Kings_Mask.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                      <img src="/images/sigils/An_Old_Pals_Legacy.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  </div>
                  <p class="text-lg font-semibold">START (Normal)</p>
              </div>
  
              <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                  <div class="flex flex-row rounded">
                      <img src="/images/sigils/Tin_Flask.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                      <img src="/images/sigils/An_Old_Pals_Legacy.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  </div>
                  <p class="text-lg font-semibold">FINAL</p>
              </div>
  
            </div>
  
            
            <div class="divider divider-neutral"></div>
            <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">HOW TO PLAY</h2>
  
            <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
            <li>Press Ult to enter Planet Quaker form.</li>
            <li>Press weapon ➔ spam Basic ATK until meter is full.</li>
            <li>When meter is full, use Combo ATK.</li>
            <li>When ult is available, use Ult.</li>
            <li>Repeat.</li>
          </ol>
  
          <p class="mt-2 text-sm sm:text-base pb-4 text-center">
              Check out this showcase from Marisa Honkai:
          </p>
  
          <div class="relative overflow-hidden" style="padding-top: 56.25%;">
              <iframe
                  class="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/umzF5U6uxWs"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  loading="lazy">
              </iframe>
          </div>
          {/if}

        {/if}

        {#if selectedTab === 'Rank Up'}
        <h2 class="text-2xl sm:text-3xl font-semibold bg-gradient-to-r  from-blue-700 to-blue-500 text-white rounded px-2 mb-2 text-center">RANK UP</h2>

        <div class="text-center my-4">
          <p class="text-center text-sm sm:text-base"><b>Reminder:</b> <span class="text-black bg-white font-semibold rounded m-2 px-2"> S0 rank is enough </span> for most players. A fully built S0-rank team is better than SSS-rank DPS without signature weapon and proper supports.
          </p>
        </div>
        <h2 class="text-xl font-semibold my-4 cooltext text-white">NOTABLE RANK-UP</h2>

          <!-- Notable Rank Ups Section -->
          <div class="flex flex-col lg:flex-row gap-4 mb-8">
            <!-- DPS Upgrade Box -->
            <div class="flex-1 p-2 bg-gray-800 rounded-lg shadow-md border border-blue-400">
              <h3 class="text-lg font-semibold text-blue-400 mb-2">DPS Upgrade</h3>
              <ul class=" text-slate-100 text-base">
                <li>S2: 37% ➔ 40% independent multiplier</li>
                <li>SS: Combo ATK Lightning DMG +14% ➔ 20%, EleBreach +5.5% ➔ 8%</li>
                <li>SS2: EleBreach +5 ➔ 6%</li>
                <li>Self DPS upgrades stop at SS3 rank</li>
              </ul>
            </div>
        
            <!-- Support Upgrade Box -->
            <div class="flex-1 p-2 bg-gray-800 rounded-lg shadow-md border border-yellow-400">
              <h3 class="text-lg font-semibold text-yellow-400 mb-2">Support Upgrade</h3>
              <ul class=" text-slate-100 text-base">
                <li>S1: Ele Breach +11.5% ➔ 14%, Phy Breach +37% ➔ 45%</li>
                <li>S3: Enemies take 12% ➔ 15% more Ele DMG and 9% ➔ 11% more Physical DMG</li>
                <li>SS: WoD team consumes two more Stellar Drain</li>
                <li>SS: Restore 5-10 more AR meter</li>
                <li>SSS: Start the battle with a stronger version of Omniscient Skyveil</li>
              </ul>
            </div>
          </div>

          <div class="divider divider-neutral"></div>

          {#if !isMobile}
          <!-- Full Rank Up List -->
          <div class="text-slate-100 text-left ">
            <h2 class="text-xl font-semibold mb-4 cooltext">FULL RANK-UP LIST</h2>
            <table class="table table-zebra w-full bg-gray-800 rounded-lg shadow-md text-base">
              <thead class="bg-gray-700">
                <tr class="text-white" >
                  <th class="p-3 font-semibold w-[10px]">RANK</th>
                  <th class="p-3 font-semibold w-[550px]">SKILL</th>
                  <th class="p-3 font-semibold w-[150px]">GOOD FOR</th>
                </tr>
              </thead>
              <tbody>
                <!-- Sample Row 1 -->
                <tr>
                  <td >S1</td>
                  <td>
                    1. When AR World Star / WoDestiny is activated, Omniscient Skyveil grants Breach for valks with World Star / WoDestiny trait:<br/>
                    - Elemental Breach +11.5% ➔ 14%<br/>
                    - Physical Breach +37% ➔ 45%<br/>
                    2. The locked AR subskill has S1 upgrade.
                  </td>
                  <td class="p-3">Recommended!<br>1. WoDestiny Support<br>2. World Star Support<br/>3. Future AR Support</td>
                </tr>
                <!-- Sample Row 2 -->
                <tr>
                  <td>S2</td>
                  <td>

                      1. Enemies take 37% ➔ 40% more Lightning DMG from LP (independent multiplier). If there are 2/3 team members with AR Rite of Oblivion, LP gain Total DMG and Lightning DMG +18.5/64.9% ➔ 20/70% <br/>
                      2. UNLOCK: Weapon skill trigger 3 second time fracture, trigger interval 2 seconds.

                  </td>
                  <td>DPS, Time Fracture</td>
                </tr>
                <tr>
                  <td>S3</td>
                  <td>
                    1. Leader Skill:<br/>
                      Team Total DMG +8% ➔ 10%<br/>
                     Team Elemental DMG +8% ➔ 10%<br/>
                      Enemies take +4% ➔ 5% more Total DMG<br/>

                  2. Enemies take 12% ➔ 15% more Elemental DMG and 9% ➔ 11% more Physical DMG from valks with Omniscient Skyveil
                  </td>
                  <td>DPS, Any AR Support</td>
                </tr>
                <tr>
                  <td>SS</td>
                  <td>
                    1. When using Celestial Rupture, consume all Abyssal Ingestion stacks when consuming Stellar Drain. Each stack restores an additional 5 ➔ 10 AR meter.<br/>
                    2. Combo ATK Lightning DMG +14% ➔ 20% , and Elemental Breach +5.5% ➔ 8%<br/>
                    3. UNLOCK: When WoD is activated, when battle starts, the first Celestial Rupture used can consume Stellar Drain two more times. This effect lasts until you enter Stellar Outburst.<br/>
                  </td>
                  <td>1. DPS<br/>
                    2. WoDestiny support<br/>
                    3. Any AR Support</td>
                </tr>
                <tr>
                  <td>SS1</td>
                  <td>
                    When Celestial Rupture hits, deal additional dmg equal to ATK x105 ➔ x140 (HP Loss DMG). Restore 300 ➔ 400 HP
                  </td>
                  <td>DPS
                </tr>
                <tr>
                  <td>SS2</td>
                  <td>
                    When LP is the leader, when there are 3 team members with AR Rite of Oblivion trait, LP's attacks gain Elemental Breach +5% ➔ 6%, and her Ult deals additional 800% ➔ 900% ATK of Lightning DMG.
                  </td>
                  <td>DPS
                </tr>
                <tr>
                  <td>SS3</td>
                  <td>
                    Leader Skill:
                    - Team Total DMG +10% ➔ 12%
                    - Team Elemental DMG +10% ➔ 12%
                    - Enemies take +5% ➔ 6% more Total DMG                  
                  </td>
                  <td>DPS
                </tr>
                <tr>
                  <td>SSS</td>
                  <td>
                    When AR is activated, at the start of battle, LP provides Sprouting Wish for the team for 25s. Sprouting Wish provides these effects:<br/>
                    - Total DMG +10%, Elemental DMG +83%, Physical DMG +64%<br/>
                    - Enemies take 15% more EleDMG and 11% more PhyDMG from valks with Sprouting Wish.<br/>
                    - When you gain Omniscient Skyveil, Sprouting Wish is disabled.
                  </td>
                  <td>Any AR Support
                </tr>
              </tbody>
            </table>
          </div>
          {/if}

          {#if isMobile}
          <!-- Full Rank Up List -->
          <div class="text-slate-100 text-left ">
            <h2 class="text-xl font-semibold mb-4 cooltext">FULL RANK-UP LIST</h2>
          </div>
          <div class="accordion space-y-2 mb-4">
            <!-- Accordion Item 1 -->

            <div class="accordion-item">
              <div class="accordion-title" on:click={() => toggleItem(1)}>
                <span>S1</span>
                <span class="text-md">{openItem === 1 ? '-' : '+'}</span>
              </div>
              <div class="accordion-content {openItem === 1 ? 'open' : ''}">
                <p>1. When AR World Star / WoDestiny is activated, Omniscient Skyveil grants Breach for valks with World Star / WoDestiny trait:<br/>
                  - Elemental Breach +11.5% ➔ 14%<br/>
                  - Physical Breach +37% ➔ 45%<br/>
                  2. The locked AR subskill has S1 upgrade.
                </p>
                <p class="mt-2"><strong>Good for:</strong> WoDestiny Support, World Star Support, Future AR Support. Recommended!</p>
              </div>
            </div>

            <div class="accordion-item">
              <div class="accordion-title" on:click={() => toggleItem(2)}>
                <span>S2</span>
                <span class="text-md">{openItem === 2 ? '-' : '+'}</span>
              </div>
              <div class="accordion-content {openItem === 2 ? 'open' : ''}">
                <p>1. Enemies take 37% ➔ 40% more Lightning DMG from LP (independent multiplier). If there are 2/3 team members with AR Rite of Oblivion, LP gain Total DMG and Lightning DMG +18.5/64.9% ➔ 20/70%<br/>
                  2. UNLOCK: Weapon skill trigger 3 second time fracture, trigger interval 2 seconds.
                </p>
                <p class="mt-2"><strong>Good for:</strong> DPS, Time Fracture. Recommended!</p>
              </div>
            </div>

          

          <div class="accordion-item">
            <div class="accordion-title" on:click={() => toggleItem(3)}>
              <span>S3</span>
              <span class="text-md">{openItem === 3 ? '-' : '+'}</span>
            </div>
            <div class="accordion-content {openItem === 3 ? 'open' : ''}">
              <p>1. Leader Skill:<br/>
                - Team Total DMG +8% ➔ 10%<br/>
                - Team Elemental DMG +8% ➔ 10%<br/>
                - Enemies take +4% ➔ 5% more Total DMG<br/>
                2. Enemies take 12% ➔ 15% more Elemental DMG and 9% ➔ 11% more Physical DMG from valks with Omniscient Skyveil
              </p>
              <p class="mt-2"><strong>Good for:</strong> DPS, Any AR Support</p>
            </div>
          </div>

          <div class="accordion-item">
            <div class="accordion-title" on:click={() => toggleItem(4)}>
              <span>SS</span>
              <span class="text-md">{openItem === 4 ? '-' : '+'}</span>
            </div>
            <div class="accordion-content {openItem === 4 ? 'open' : ''}">
              <p>1. When using Celestial Rupture, consume all Abyssal Ingestion stacks when consuming Stellar Drain. Each stack restores an additional 5 ➔ 10 AR meter.<br/>
                2. Combo ATK Lightning DMG +14% ➔ 20% , and Elemental Breach +5.5% ➔ 8%<br/>
                3. UNLOCK: When WoD is activated, when battle starts, the first Celestial Rupture used can consume Stellar Drain two more times. This effect lasts until you enter Stellar Outburst.
              </p>
              <p class="mt-2"><strong>Good for:</strong> DPS, WoDestiny support, Any AR Support</p>
            </div>
          </div>

          <div class="accordion-item">
            <div class="accordion-title" on:click={() => toggleItem(5)}>
              <span>SS1</span>
              <span class="text-md">{openItem === 5 ? '-' : '+'}</span>
            </div>
            <div class="accordion-content {openItem === 5 ? 'open' : ''}">
              <p>When Celestial Rupture hits, deal additional dmg equal to ATK x105 ➔ x140 (HP Loss DMG). Restore 300 ➔ 400 HP</p>
              <p class="mt-2"><strong>Good for:</strong> DPS</p>
            </div>
          </div>

          <div class="accordion-item">
            <div class="accordion-title" on:click={() => toggleItem(6)}>
              <span>SS2</span>
              <span class="text-md">{openItem === 6 ? '-' : '+'}</span>
            </div>
            <div class="accordion-content {openItem === 6 ? 'open' : ''}">
              <p>When LP is the leader, when there are 3 team members with AR Rite of Oblivion trait, LP's attacks gain Elemental Breach +5% ➔ 6%, and her Ult deals additional 800% ➔ 900% ATK of Lightning DMG.</p>
              <p class="mt-2"><strong>Good for:</strong> DPS</p>
            </div>
          </div>

          <div class="accordion-item">
            <div class="accordion-title" on:click={() => toggleItem(7)}>
              <span>SS3</span>
              <span class="text-md">{openItem === 7 ? '-' : '+'}</span>
            </div>
            <div class="accordion-content {openItem === 7 ? 'open' : ''}">
              <p>Leader Skill:<br/>
                - Team Total DMG +10% ➔ 12%<br/>
                - Team Elemental DMG +10% ➔ 12%<br/>
                - Enemies take +5% ➔ 6% more Total DMG</p>
              <p class="mt-2"><strong>Good for:</strong> DPS</p>
            </div>
          </div>

          <div class="accordion-item">
            <div class="accordion-title" on:click={() => toggleItem(8)}>
              <span>SSS</span>
              <span class="text-md">{openItem === 8 ? '-' : '+'}</span>
            </div>
            <div class="accordion-content {openItem === 8 ? 'open' : ''}">
              <p>	When AR is activated, at the start of battle, LP provides Sprouting Wish for the team for 25s. Sprouting Wish provides these effects:<br/>
                - Total DMG +10%, Elemental DMG +83%, Physical DMG +64%<br/>
                - Enemies take 15% more EleDMG and 11% more PhyDMG from valks with Sprouting Wish.<br/>
                - When you gain Omniscient Skyveil, Sprouting Wish is disabled.<br/>
              <p class="mt-2"><strong>Good for:</strong> Any AR Support
              </p>
            </div>
          </div>


      </div>
          {/if}
        {/if}


        {#if selectedTab === 'How to Play'}
        <h2 class="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded px-2 mb-2 text-center">HOW TO PLAY</h2>
    
        <div class=" gap-6 mt-4">
            <!-- Video 1 with title and description -->
            <div class="bg-gray-800 p-4 rounded-lg shadow-md">
              <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">Vita DPS</h2>

              <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">Vita DPS rotation with Coralie and HoFi support.</p>

              <div class="relative overflow-hidden" style="padding-top: 56.25%;">
                <iframe
                loading="lazy" 

                    class="absolute top-0 left-0 w-full h-full"
                    src="https://www.youtube.com/embed/8AwMiPw-4Hs"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen>
                </iframe>
            </div>
          </div>

          

        </div>

        <div class=" gap-6 mt-4">
          <!-- Video 1 with title and description -->
          <div class="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">Vita Support</h2>

            <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">Vita's rotation as a support in World Star and Wheel of Destiny teams.</p>

            <div class="relative overflow-hidden" style="padding-top: 56.25%;">
              <iframe
              loading="lazy" 
                  class="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/8AwMiPw-4Hs"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen>
              </iframe>
          </div>
        </div>

      </div>
    {/if}
    
    
        {#if selectedTab === 'Gameplay Examples'}
        <h2 class="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded px-2 mb-2 text-center">GAMEPLAY EXAMPLES</h2>
    
        <div class=" gap-6 mt-4 mb-10">
          <!-- Video 1 with title and description -->

        
          <div class="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">Vita DPS</h2>

            <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">Vita DPS vs Sprout of Wishing boss</p>

            <div class="relative overflow-hidden" style="padding-top: 56.25%;">
              <iframe
              loading="lazy" 

                  class="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/RMhi643_rTI"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen>
              </iframe>
          </div>
        </div>

        

      </div>

      <div class=" gap-6 my-10">
        <!-- Video 1 with title and description -->

      
        <div class="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">Vita DPS - Bleed weather</h2>

          <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">Vita DPS in Bleed weather where she can use Lunar Vow support</p>

          <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
            loading="lazy" 

                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/1SdxUh7s0kk"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        </div>
      </div>

      

    </div>

    <div class=" gap-6 my-10">
      <!-- Video 1 with title and description -->

    
      <div class="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">Vita Support</h2>

        <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">Vita supporting Senadina</p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
          <iframe
          loading="lazy" 

              class="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/tKkwXiFwRUI"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
          </iframe>
      </div>
    </div>

    

  </div>
    {/if}
    
    {#if selectedTab === 'Popular Question'}
    <h2 class="text-2xl sm:text-3xl font-semibold bg-gradient-to-r  from-blue-700 to-blue-500 text-white rounded px-2 mb-2 text-center">POPULAR QUESTION</h2>

        <div class="my-6">
          <div class="chat chat-start ">
            <div class="chat-image avatar">
              <div class="w-10 sm:w-12 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="/images/meibald.webp" />
              </div>
            </div>
            <div class="chat-bubble chat-bubble-primary text-slate-100 ">Is Vita melee or ranged?</div>
          </div>

          <div class="chat chat-end">
            <div class="chat-image avatar">
              <div class="w-10 sm:w-12 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="/images/ds.webp" />
              </div>
            </div>
            <div class="chat-bubble chat-bubble-neutral text-slate-100 py-6">Attacks in base form are melee. Mecha punch attacks are melee. Planet Quaker form attacks are ranged.</div>
          </div>
        </div>

        <div class="my-6">
          <div class="chat chat-start ">
            <div class="chat-image avatar">
              <div class="w-10 sm:w-12 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="/images/meibald.webp" />
              </div>
            </div>
            <div class="chat-bubble chat-bubble-primary text-slate-100 ">Is Vita good without HoFi with Waxing Moon?</div>
          </div>

          <div class="chat chat-end ">
            <div class="chat-image avatar">
              <div class="w-10 sm:w-12 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="/images/ds.webp" />
              </div>
            </div>
            <div class="chat-bubble chat-bubble-neutral text-slate-100 py-6">Currently, Vita DPS needs HoFi with Waxing Moon, otherwise damage is garbage.<br/> <br/> Vita's leader skill grants powerful effects such as Elemental Breach and stronger Ultimate, but requires three members from AR Rite of Oblivion (RoO). Currently, the only RoO valks beside Vita are Coralie and HoFi with Waxing Moon.
              <br/> <br/>See lineup section for other terrible options. When we get more Rite of Oblivion characters, then you will have other good options than just HoFi.</div>
          </div>
        </div>
    {/if}

    {#if selectedTab === 'Overview Card'}
    <h2 class="text-2xl sm:text-3xl font-semibold bg-gradient-to-r  from-blue-700 to-blue-500 text-white rounded px-2 mb-2 text-center">OVERVIEW CARD</h2>

    <div class="text-center my-4">
      <p class="text-center text-sm sm:text-base">Overview card delayed
      </p>
    </div>
    {/if}


        {#if selectedTab === 'Translation Error'}
        <h2 class="text-2xl sm:text-3xl font-semibold bg-gradient-to-r  from-blue-700 to-blue-500 text-white rounded px-2 mb-2 text-center">TRANSLATION ERROR</h2>

        <div class="text-center my-4">
          <p class="text-center text-sm sm:text-base">No known translation error
          </p>
        </div>
        {/if}


    </div>

</section>


</div>

</section>


</div>

