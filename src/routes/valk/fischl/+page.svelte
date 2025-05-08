
<svelte:head>
  <title>Fischl - Prinzessin der Verurteilung!</title> 

    <meta property="og:title" content="Carole - Prinzessin der Verurteilung!"/>
    <meta property="og:description" content="Prinzessin der Verurteilung! Guide, Builds and Gameplay" />
    <meta property="og:image" content="" />
    <meta property="og:url" content="https://marisaimpact.com/valk/fischl" />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary_large_image">


    <link rel="canonical"  />
</svelte:head>

<script lang="ts">
import { onMount } from "svelte";
import { hasUserLiked, likeWithVoterId } from "$lib/firebaseLikes"; // Import helper functions
import { getFirestore } from "firebase/firestore";
import { app } from "$lib/firebaseConfig";

const db = getFirestore(app); // Ensure this is used for Firebase operations

  import { goto } from '$app/navigation';
  import likesData from '$lib/data/likes.json'; // Import local JSON data

import Lightbox from '$lib/components/lightbox.svelte';
	import P1physical from "$lib/components/lineup/p1physical.svelte";
	import P1lightningdps from "$lib/components/lineup/p1lightningdps.svelte";
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
  // { name: 'Support Buffs', short: 'support' },
 // { name: 'Gameplay Examples', short: 'example' },
  { name: 'Elysian Realm', short: 'er' },
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
  let celikes = likesData["fischl"] || 0; // Get initial likes from JSON
  const charName = "fischl"; // Route name for this character
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

    celikes++;

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

<div class="sm:mt-14"></div>
<section class="relative mx-auto flex flex-row items-center justify-center px-4 md:p-2 gap-3 md:pb-0  md:mt-0  pt-8	sm:pt-0	">
<div class="absolute   top-0 w-full h-[90vh] z-[-10] opacity-85 " id="bgwavebox">    
  <img src="/images/bg/wave_hoo.svg" alt="Lone Planetfarer" class="w-full h-full object-cover overflow-hidden" /> 
</div>

<!-- Left: Character Image -->
<div class="relative  w-auto h-48 sm:h-60 md:h-72 flex justify-center " id="valkpicbox">
  <!-- Image for Larger Screens -->
  <img src="/images/valkfull/fischl.webp" alt="Sparkle" class="h-full w-auto object-cover md:object-contain  " style ="view-transition-name: valkyrie-image-39;"/> 

  <div class="absolute bottom-0 left-0 like-container flex items-center gap-2 mt-4">
    <button
    on:click={increaseLike}
    class="bg-gray-800 text-white px-4 py-2 rounded-sm transition-all flex items-center gap-2"
    disabled={hasLiked} 
  >
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
    <span class="text-white font-semibold">{celikes}</span>
  </button>
  
  </div>

</div>



<!-- Right: Character Info (Centered) -->
<div class="flex flex-col items-center text-center justify-start">
  <!-- Battlesuit Name -->

  <div>
  <h1 class="text-xl md:text-2xl text-slate-100 font-bold text-center leading-4 mb-4 sm:mb-0">Prinzessin der Verurteilung!</h1>
</div>
  <!-- Character Name and Release Date -->
  <p class="text-base md:text-md text-center md:block hidden text-slate-300 my-2">Fischl | Release Date: v4.9 (8 Jul 2021)

  </p>

  <!-- Common wrapper to ensure same width -->
  <div class="w-full max-w-sm mb-2">
    <!-- Container with 4 pictures (Centered) -->
    <div class="flex flex-col items-center">
      <div class="flex w-[260px] md:w-[300px] gap-2 flex-wrap justify-center outline outline-purple-500 outline-1 bg-purple-950/75 rounded-lg p-2 backdrop-blur-xs">
        <img src="/images/ranks/Valkyrie_A.webp" alt="S-rank" class="w-auto h-8 md:h-10" />
        <img src="/images/type/IconBIO.png" alt="Mech" class="w-auto h-8 md:h-10" />
        <img src="/images/element/Core_Lightning_DMG.png" alt="Icon 3" class="w-auto h-8 md:h-10" />
      </div>
    </div>

    <!-- Support For Container (Centered) -->
    <div class="flex flex-col mt-4 items-center">

      <div class="flex flex-col  w-[260px] md:w-[300px] flex-wrap justify-center outline outline-purple-500 outline-1 bg-purple-950/75 rounded-lg p-2 backdrop-blur-xs">
        <div class="flex flex-wrap justify-center">
          <h2 class="text-base md:text-md custom-font tracking-wider text-slate-100">SUPPORT FOR:</h2>
        </div >
        <div class="flex flex-row gap-2 flex-wrap justify-center">
          <img src="/images/artype/p1lightning.png" alt="Support 1" class="w-auto h-8 md:h-10" />

        </div>
      </div>
    </div>
  </div> <!-- End common wrapper -->
</div>
</section>

<div class="flex max-w-(--breakpoint-xl) justify-center mx-auto "> 


  <aside class="w-full sm:max-w-[10rem] md:max-w-[12rem] hidden sm:block p-4  text-gray-200 sticky top-16 h-[calc(100vh-4rem)] " >

    <ul class="space-y-2">
      {#each tabs as tab}
        <li>
          <button
            on:click={() => selectTab(tab.name)}
            class="w-full text-left text-sm lg:text-base p-2 rounded-lg transition-colors duration-200 
                   {selectedTab === tab.name ? 'bg-linear-to-r from-blue-500 to-sky-500 shadow-lg	 shadow-cyan-500/20 text-white' : 'bg-gray-700/0 hover:bg-linear-to-r from-orange-600 to-amber-500 '}">
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
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">OVERVIEW</h2>

      <div>
          <!-- Roles Section -->
          <h2 class="text-xl  font-semibold mt-4 mb-2 text-left cooltext text-slate-100">ROLES</h2>

          <p class="text-sm sm:text-base mt-4">
              <b class="text-amber-400">Outdated P1 Lightning Support</b><br/> 
              - Fischl is a Lightning support that can summon her partner Oz to deal damage while she is off-field. 
              <br/>
              - Has high hit count. Sometimes, she can still be used to counter enemies with high hitcount like Nihilius Husk.

          </p>

          <div class="divider  "></div>
          <!-- Pull Recommendation Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">FARM RECOMMENDATION</h2>
          <p class="mt-4 text-sm sm:text-base">
              <b class="text-amber-400">New Players on Fischl</b>
              <br/>Farm <a href="/valk/coralie" class="link ">Coralie Valkyrie Blastmetal</a>               first from Asterite Shop and Open World since she can fit in any Astral Ring team. If you have extra Asterite, then you can consider getting Fischl for Elysian Ream first-clear crystal rewards.
            </p>


          <p class="mt-4 text-sm sm:text-base mb-2">
            <b class="text-amber-400">New Players on Fischl weapon Mitternachts Waltz</b><br/> 
            Only use your crystal to pull Part 2 valkyries, since they use a new Astral Ring system. If Mitternachts Waltz is available through other means, such as spending event or Battle Pass, you can consider getting it that way.
        </p>

          <p class="mt-4 text-sm sm:text-base">
              <b class="text-amber-400">Competitive</b><br/> No uses.
          </p>

          <div class="divider  "></div>
          <!-- How to Get Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">HOW TO GET</h2>
          <ul class="list-disc ml-6 text-sm sm:text-base ">
              <li ><strong>Prinzessin der Verurteilung!:</strong> Asterite Shop, Open World Task</li>
              <li><strong>G3 Zhenyi Stigma:</strong> Foundry </li>
              <li><strong>Mitternachts Waltz:</strong> Focused Supply </li>


          </ul>

      </div>
  {/if}
  

  {#if selectedTab === 'Lineup'}
  <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">LINEUP</h2>

  <section class="max-w-(--breakpoint-lg) mx-auto ">


    <P1lightningdps></P1lightningdps>

</section>

  {/if}

      {#if selectedTab === 'Equipment'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">EQUIPMENT</h2>
 
      <div>


              <h2 class="text-xl font-semibold text-center  text-yellow-400">BEST</h2>

              <div class="flex flex-col justify-center items-center">
                  
              <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">

                <div class="w-20 h-20 sm:w-28 sm:h-28">
                  <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/09/07/72350798/91e07342298b4f932d677d0d6a6ae591_4823412216083361561.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">

                </div>

                <div class="w-20 h-20 sm:w-28 sm:h-28">
                  <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/10/15/73514954/a5a42c56741ca20c0ee9cc0bdaf92b2b_2130077980729098664.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">

                </div>

                <div class="w-20 h-20 sm:w-28 sm:h-28">
                  <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/10/15/73514954/385e13c4414d1b93c1771e8fb1321807_2526369281622290011.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">

                </div>

                <div class="w-20 h-20 sm:w-28 sm:h-28">
                  <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/10/15/73514954/5a4ab375e227506ecc7d83b6bcdd197d_3134151908279986304.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">

                </div>
              </div>  
              <h4 class="text-base sm:text-base text-white">Mitternachts Waltz + Wang Zhenyi set</h4>
              </div>


              <div class="p-4 mt-4 bg-linear-to-r from-purple-950/75 to-purple-900/75 rounded-sm">
                <p class="text-sm sm:text-base text-left mb-4">
                  <b>Mitternachts Waltz</b><br/>Best weapon for Fischl, but not mandatory for her to function.

                </p>

                <p class="text-sm sm:text-base text-left mb-4">
                  <b>G3 Wang Zhenyi set</b><br/> - Best set for Fischl. Has buffs for the team and summoned units.
                  <br/> - 3PC has a big buff.
                  <br/> - Forgeable in Foundry.
                </p>
  
              
                <p class="text-sm sm:text-base text-left">
                  <b>Affix</b><br/> SP recovery, SP cost reduction.
                </p>
              </div>
  
  
                <div class="divider  "></div>

              <h2 class="text-xl font-semibold text-center  text-blue-400">OTHER EQUIPMENT OPTIONS</h2>


              <div class="flex flex-col justify-center items-center">
                  
                <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">

  
                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                    <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2022/02/25/50494840/953585a8403e3561f6f6851ae1d4acfe_3882286052677353611.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>
  
                </div>  
                <h4 class="text-base sm:text-base text-white">Cerulean Flare</h4>
                </div>

              <div class="p-4 mt-4 bg-linear-to-r from-blue-950/75 to-blue-900/75 rounded-sm">
                <p class="text-sm sm:text-base text-left">
                  Gives sp pack drops.
                </p>
              </div>
  
  
                <div class="divider  "></div>

              <div class="flex flex-col justify-center items-center">
                  
                <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">
  

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                    <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/09/24/75216984/f2e785b423273338556e66771a543a69_5615190248057583714.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Cecilia Youth T" class="w-full h-full object-cover">

                  </div>

                  <div class=" h-20  sm:h-28">
                    <img src="/images/valkportrait/Plus.png" alt="Vita" class="w-full h-full object-cover">
                </div>
                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                    <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/09/18/72350798/436635e5bb6f7fd4b37a3bcf724ce14f_8228886158374375296.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Cecilia Youth M" class="w-full h-full object-cover">

                  </div>
                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                    <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/09/17/75216984/fdc8f3fb134d8a1e5170b7ee913c9886_4767913655549675083.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Cecilia Youth M" class="w-full h-full object-cover">

                  </div>

                  <div class=" h-20  sm:h-28">
                    <img src="/images/valkportrait/Plus.png" alt="Vita" class="w-full h-full object-cover">
                </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                    <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/09/24/75216984/73531d5b12f1133e5f5f926f1cf14b0b_2678839856354413010.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Cecilia Youth B" class="w-full h-full object-cover">
                </div>
  
                </div>  
                <h4 class="text-base sm:text-base text-white">Turgenev TB + Tesla Band M / Avogadro M</h4>
                </div>

                <div class="divider  "></div>

              <div class="flex flex-col justify-center items-center">

                <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">
  
    
  
                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                    <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/01/31/282941837/e65a0afbe683a9b90c3ac5844d98a12c_580233590440738955.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                </div>

                <div class="w-20 h-20 sm:w-28 sm:h-28">
                    <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/01/31/282941837/141b8b6bf380a84dc22e4edefa5d4ffc_2283739336785483035.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                </div>

                <div class="w-20 h-20 sm:w-28 sm:h-28">
                    <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/01/31/282941837/bb34b0b344929564e4fff60ada174541_7013397103999569464.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                </div>
  
                </div>  
                <h4 class="text-base sm:text-base text-white">Tsiolkovsky</h4>
                </div>
  

           </div>
      {/if}

      {#if selectedTab === 'Support Buffs'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">SUPPORT BUFFS</h2>

      
      <div class="flex flex-wrap gap-4 my-8">
        <!-- Example image list for support buffs; add your own image sources -->
        <img
          src="https://i.imgur.com/gPzqeSZ.png"
          alt="Buff 1"
          class=" object-cover cursor-pointer"
          on:click={() => openLightbox('/images/valkbuff/buff_coralie.png')}
        />
        
      </div>

      <div class="my-5 text-sm sm:text-base text-slate-100 space-y-4">
        <p class="mb-4 font-semibold">How to activate CE support buffs:</p>
        
          <div>
            <p class="font-semibold text-orange-300  mt-6">Weapon Skill and Ultimate</p>
            <p>Weapon skill and Ultimate activate most of CE Support buffs</p>
          </div>


      </div>

      
      <!-- Lightbox Component -->
      <Lightbox show={showLightbox} image={selectedImage} onClose={closeLightbox} />
      {/if}

      {#if selectedTab === 'Elysian Realm'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">ELYSIAN REALM</h2>


      <div class="flex justify-center gap-4 my-6">
        <button
          on:click={() => setPlaystyle('1')}
          class={`px-4 py-2 font-semibold rounded-sm ${activePlaystyle === '1' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-linear-to-r from-orange-600 to-amber-500 hover:text-white'}`}
        >
          BUILD
        </button>
      
        <button
          on:click={() => setPlaystyle('2')}
          class={`px-4 py-2 font-semibold rounded-sm ${activePlaystyle === '2' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-linear-to-r from-orange-600 to-amber-500 hover:text-white'}`}
        >
          EQUIPMENT
        </button>
      </div>
    
      {#if activePlaystyle === '1'}

        <h2 class="text-xl font-semibold mb-4 mt-8 text-left text-white cooltext">EGO SIGNETS</h2>

        <div class="flex flex-col justify-center items-start ">

        <div class="flex shadow-md relative space-x-4 p-2 rounded-sm items-center w-fit  bg-linear-to-r from-purple-500/75 to-cyan-500/0 overflow-hidden">

          <div class="absolute z-0 w-auto h-full top-0 left-0 opacity-50 mix-blend-overlay ">
            <img src="/images/signets/egogrid.svg" class="w-full h-auto" alt="egogrid">
          </div>
            <!-- Left side image -->
            <div class="w-16 h-16 sm:w-20 sm:h-20 shrink-0 z-10">
              <img src="/images/signets/Exclusive.png" alt="Ego" class="w-full h-full object-cover rounded-md">
            </div>
            
            <!-- Right side text sections -->
            <div class="flex flex-col space-y-2 pr-2 z-10">
              <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Midnight + Retribution </p>
              <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Fate </p>

            </div>
          </div>
          
        </div>
        <div class="mt-3 rounded-sm" >
          <p class="text-sm sm:text-base text-left">
            <li class="text-sm sm:text-base"> ER Lite mode: Equip Because of You sigil and get all three Ego signets on Floor 7.</li>
            <li class="text-sm sm:text-base"> Normal mode: You want to get as many signets as you can. [Fate] reduces weapon cooldown. You can get both Ego signets at the start by using Thorny Crown sigil, OR by resetting Floor 1 until you get another Ego portal, OR use Because of You support sigil and get the other two Ego signets on Floor 7.</li>
        </p>
          </div>

          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            <!-- First Signet with 'Start' text -->
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
                <img src="/images/signets/Signets of Decimation (Kalpas).png" alt="Signet 4" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Vicissitude (Hua).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">2</p>
              </div>
            
              <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Infinity (Mobius).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold">1</p>
              </div>

              

              <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Gold (Eden).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold">2</p>
              </div>

              
              <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Reverie (Pardofelis).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold">1</p>
              </div>



          </div>
          <div class="mt-3 rounded-sm" >
            <p class="text-sm sm:text-base text-left">
                  <b> - Decimation 1:</b> Your HP will be very low. If you are a new player, start with Gold instead, and build Vicissitude 2 for survivability.
                  <br/>
                  - Get initial sp Gold signet so you can cast Ult immediately when battle starts.

              </p>
            </div>
            <div class="divider  "></div>
            <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SUPPORTS</h2>

          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            
            <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
              <div class="flex flex-row rounded-sm">
              <img src="/images/valkportrait/Fu Hua Azure Empyrea.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              </div>
              <p class="text-base sm:text-lg font-semibold">START</p>
          </div>

          <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
              <div class="flex flex-row rounded-sm">
              <img src="/images/valkportrait/Fu Hua Azure Empyrea.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              </div>
              <p class="text-base sm:text-lg font-semibold">MID</p>
          </div>

          <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
              <div class="flex flex-row rounded-sm">
              <img src="/images/valkportrait/Pardofelis Reverist Calico.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              </div>
              <p class="text-base sm:text-lg font-semibold">FINAL</p>
          </div>
            
          </div>
          <div class="divider  "></div>
          
          <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SIGIL</h2>

          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">


            <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
                <div class="flex flex-row rounded-sm">
                  <img src="/images/sigils/Mad_Kings_Mask.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  <img src="/images/sigils/Because_of_You.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">START (ER Lite)</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
              <div class="flex flex-row rounded-sm">
                <img src="/images/sigils/Mad_Kings_Mask.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/sigils/An_Old_Pals_Legacy.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
              <p class="text-base sm:text-lg font-semibold">START (Normal)</p>
          </div>

            <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
                <div class="flex flex-row rounded-sm">
                  <img src="/images/sigils/Tin_Flask.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                    <img src="/images/sigils/An_Old_Pals_Legacy.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  </div>
                <p class="text-base sm:text-lg font-semibold">FINAL</p>
            </div>

          </div>

          
          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">HOW TO PLAY</h2>

        <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>Press weapon ➔ ATK. Use Charged ATK. Repeat until you have enough sp for Ult.</li>
          <li>Use Ultimate.</li>
          <li>Press weapon ➔ ATK. Use Charged ATK. Repeat.</li>
          <li>If weapon skill is on cd, then ATK a few times.</li>
        </ol>

        <p class="mt-8 text-sm sm:text-base pb-4 text-center">
            Check out this showcase from Marisa Honkai:
        </p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/3VvVnfUY0kE"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                loading="lazy">
            </iframe>
        </div>
        {/if}
      
        {#if activePlaystyle === '2'}

        <div class="flex flex-col justify-center items-center">
                  
          <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">

            <div class="w-20 h-20 sm:w-28 sm:h-28">
              <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/10/30/6100274/7a1ffb843365ee479c4087a0db318ee0_7727582075965634590.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">

            </div>

            <div class="w-20 h-20 sm:w-28 sm:h-28">
              <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/10/15/73514954/a5a42c56741ca20c0ee9cc0bdaf92b2b_2130077980729098664.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">

            </div>

            <div class="w-20 h-20 sm:w-28 sm:h-28">
              <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/10/15/73514954/385e13c4414d1b93c1771e8fb1321807_2526369281622290011.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">

            </div>

            <div class="w-20 h-20 sm:w-28 sm:h-28">
              <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/10/15/73514954/5a4ab375e227506ecc7d83b6bcdd197d_3134151908279986304.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">

            </div>
          </div>  
          <h4 class="text-base sm:text-base text-white">Whisper of the Past + Wang Zhenyi set</h4>
          </div>


          <div class="p-4 mt-4 bg-linear-to-r from-purple-950/75 to-purple-900/75 rounded-sm">
            <p class="text-sm sm:text-base text-left">
              - Whisper of the Past provides overall more damage. <br/>
              - Has higher ATK, scales better with adaptive damage from ER signets.
            </p>
          </div>
          {/if}

        {/if}

  
      {#if selectedTab === 'Gameplay Examples'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">GAMEPLAY EXAMPLES</h2>

    <div class=" gap-6 mt-5 mb-10">
      <!-- Video 1 with title and description -->

    
      <div class="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">Carole Support</h2>

        <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">Pardo in various teams</p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
          <iframe
          loading="lazy" 

              class="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/a5o8kocAi1s"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
          </iframe>
      </div>
    </div>

    

  </div>
  {/if}
 

  {#if selectedTab === 'Overview Card'}
  <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">OVERVIEW CARD</h2>

  <div class="text-center my-4">
    <p class="text-center text-sm sm:text-base">Overview card delayed
    </p>
  </div>
  {/if}


      {#if selectedTab === 'Translation Error'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">TRANSLATION ERROR</h2>
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

