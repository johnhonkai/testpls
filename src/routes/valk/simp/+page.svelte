<svelte:head>
  <title>Theresa - Schicksal's Imperative</title> 

    <meta property="og:title" content="Theresa - Schicksal's Imperative" />
    <meta property="og:description" content="SIMP Guides, Builds and Gameplay" />
    <meta property="og:image" content="https://i.imgur.com/jlNgHbU.png" />
    <meta property="og:url" content="https://marisaimpact.com/valk/simp" />
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
	import Sparkledps from '$lib/components/lineup/sparkledps.svelte';
	import Lvdpsdual from '$lib/components/lineup/lvdpsdual.svelte';
	import P1lightningdps from '$lib/components/lineup/p1lightningdps.svelte';
	import Lvdpsnormal from '$lib/components/lineup/lvdpsnormal.svelte';
	import Hohdps from '$lib/components/lineup/hohdps.svelte';
	import CharBio from '$lib/components/CharBio.svelte';
let showLightbox = false;
let selectedImage = '';

function openLightbox(image) {
  selectedImage = image;
  showLightbox = true;
}

function closeLightbox() {
  showLightbox = false;
}

import Fa from 'svelte-fa';
import { faCircleUser , faUsers , faBook , faVideo , faHome , faBolt ,faComments  ,faStar , faFire , faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';

  let selectedTab = 'Overview'; // Default tab
  const tabs = [
    { name: 'Overview', short: 'overview', icon: faHome },
  { name: 'Lineup', short: 'lineup', icon: faUsers },
  { name: 'Equipment', short: 'equipment', icon: faBolt  },
  { name: 'Support Buffs', short: 'support', icon: faCircleUser },
  { name: 'How to Play', short: 'howtoplay', icon: faBook },
  { name: 'Gameplay', short: 'example', icon: faVideo },
  { name: 'Elysian Realm', short: 'er', icon: faFire },
  { name: 'Rank Up', short: 'rank', icon: faStar },
  { name: 'Question', short: 'qna' , icon: faComments  },
  //{ name: 'Overview Card', short: 'card' },
  { name: 'TL Error', short: 'translation', icon: faTriangleExclamation  },
];  

function handleClick(tabName) {
    selectTab(tabName);
    animateIcon(tabName);
  }

  let activeIcon = null;

  function animateIcon(tabName) {
    activeIcon = tabName;
    setTimeout(() => (activeIcon = null), 300); // reset after animation
  }

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
  let simplikes = likesData["simp"] || 0; // Get initial likes from JSON
  const charName = "simp"; // Route name for this character
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

    simplikes++;

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
  #star-container {
    background: radial-gradient(rgb(var(--light-purple-rgb)), rgb(var(--dark-purple-rgb)));
  }

  #star-gradient-overlay {
    background: radial-gradient(circle, transparent 75%, rgb(var(--dark-purple-rgb)));
  }

  #app {
  height: 37rem;
  overflow: hidden;
  position: relative;
}
</style>


<section class="relative mx-auto flex flex-row items-center justify-center px-4 md:p-2 gap-3 md:pb-0 sm:mb-10 md:mt-0  pt-2	sm:pt-0">

  <div class="absolute   top-0 w-full h-[90vh] z-[-10]  " id="bgwavebox">    
    <div id="app">
      <div id="star-container">
        <div id="star-pattern"></div>
        <div id="star-gradient-overlay"></div>
      </div>
      <div id="stripe-container">
        <div id="stripe-pattern"></div>
      </div>
    </div>
  
    
    </div>


<div class="fixed  h-1/2 w-1/2 top-[-5vh] right-[-20vw]  z-[-8] hidden sm:block " id="avabox">    
  <img src="/images/bg/ava_simp.webp" alt="Lone Planetfarer" class=" object-contain slide-in-pls" /> 
</div>

<!-- Left: Character Image -->
<div class="relative w-auto h-48 sm:h-66 flex justify-center mt-4 sm:mt-15" id="valkpicbox">
  <!-- Image for Larger Screens -->
  <img src="/images/valkfull/teri_simp.webp" alt="Sparkle" class="h-full w-auto object-cover md:object-contain  " style ="view-transition-name: valkyrie-image-12;"/> 

  <!-- Like Button: Bottom-right overlay -->
   <div class="absolute bottom-2 right-2 z-10">
    <div
      class="tooltip tooltip-left"
      data-tip={hasLiked ? "You already liked this!" : "Click to like"}
    >
      <button
        on:click={increaseLike}
        disabled={hasLiked}
        class="bg-purple-800/70 hover:bg-teal-700 transition-colors rounded-full px-3 py-1 flex items-center gap-1 text-white text-sm shadow-md"
      >
        <!-- Heart Icon -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="w-4 h-4" viewBox="0 0 24 24">
          <path
            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5
               2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09
               3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4
               6.86-8.55 11.54L12 21.35z"
          />
        </svg>
  
        <!-- Like Count -->
        <span class="font-semibold">{simplikes}</span>
      </button>
    </div>
  </div>

</div>



<!-- Right: Character Info (Centered) -->
<div class="flex flex-col items-center text-center justify-start sm:mt-10">
  <!-- Battlesuit Name -->
  <h1 class="text-sm md:text-xl text-white mt-4 mb-2 italic font-russoone">Schicksal's Imperative</h1>

  <!-- Character Info Cards -->
  <div class="space-y-2 w-[260px] md:w-[300px]">
    <!-- Name Card -->
    <div class="flex rounded-lg overflow-hidden shadow-md">
      <div class="bg-purple-800 text-white px-4 py-1 w-28 flex items-center justify-center font-semibold text-xs ">
        Name
      </div>
      <div class="bg-slate-100 text-black px-3 py-1 flex-1 flex items-center text-xs font-medium">
        Theresa Apocalypse
      </div>
    </div>

    <!-- Release Date Card -->
    <div class="flex rounded-lg overflow-hidden shadow-md">
      <div class="bg-purple-800 text-white px-4 py-1 w-28 flex items-center justify-center font-semibold text-xs ">
        Release
      </div>
      <div class="bg-slate-100 text-black px-3 py-1 flex-1 flex items-center text-xs  font-medium">
      v7.7 (5 Sep 2024)
      </div>
    </div>
  </div>

  <!-- Tags / Type Row -->
  <CharBio mode="dps" rank="s" type="qua" element="lightning" ar="ws"  bg="bg-purple-800"/>

  <!-- Support Section -->
  <CharBio mode="support" ar={['wod' , 'ws' ,'p1lightning']} bg="bg-purple-800"/>
  </div>
</section>

<div class="flex max-w-(--breakpoint-xl) justify-center mx-auto "> 


  <aside class="w-full sm:max-w-[10rem] md:max-w-[12rem] hidden sm:block p-4  text-gray-200 sticky top-16 h-[calc(100vh-4rem)] " >


    <ul class="space-y-2">
      {#each tabs as tab}
      <button
      on:click={() => handleClick(tab.name)}
      class="bg-zinc-800 relative w-full overflow-hidden text-left text-base px-4 py-2 rounded-3xl border-2 cursor-pointer shadow-md 
             border-zinc-700 text-gray-300 transition-all duration-300 group flex items-center gap-2
             before:absolute before:inset-0 before:z-0 before:bg-gradient-to-r
             before:from-sky-500 before:to-blue-500 before:transition-transform before:duration-300
             before:scale-x-0 before:origin-left
             hover:text-white hover:border-sky-600
             {selectedTab === tab.name 
               ? 'before:scale-x-100 text-white border-blue-400 shadow shadow-blue-500/30' 
               : ''}">
  
      <!-- Icon with rotation animation -->
      <span class="relative z-10 flex items-center gap-2 group-hover:drop-shadow-sm">
        <Fa icon={tab.icon} class="transition-transform duration-400 group-active:rotate-45" />
        {tab.name}
      </span>
  
    </button>
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
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-4 text-center">OVERVIEW</h2>
        <div class="flex max-w-(--breakpoint-xl) justify-center mx-auto ">
          <p class="text-sm sm:text-base">
            <strong>Updated For v8.2 (24 Apr 2025)
        </p>
        </div>
      <div>
          <!-- Roles Section -->
          <h2 class="text-xl  font-semibold mb-2 text-left cooltext text-slate-100">ROLES</h2>
          
          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">DPS</strong>               
            </p>
              <ul class="list-disc ml-6 text-sm sm:text-base ">
                <li>As a Quantum DPS, SIMP has multiple ways to apply quantum collapse.</li>
                <li>As a Resonance DPS, Homu's domain resonance marks can be triggered 18 times. SIMP can also consumes teammate's marks.</li> 
                <li>As a Part 1 DPS, SIMP can create a double dps team SIMP x Lunar Vow. It has been used against Paralyze Sushang and Starless Benares.</li>
              </ul>

          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">World Star Support</strong> <br/>Not the best support for any team currently.
          </p>
          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">WoDestiny Support</strong> <br/>Can just ult and stay in the back like Senadina. SIMP does not offer any improvement on existing WoDestiny teams.
          </p>

          <p class="mt-4 text-sm sm:text-base">
            <strong class="text-amber-400">Part 1 Support</strong> 
        </p>
        <ul class="list-disc ml-6 text-sm sm:text-base ">
          <li>Lunar Vow Support: Gives Elemental Breach (replaces HoTr), huge paralyze trauma (replaces Eden) and faster rotation (just ult and sleep).</li>
          <li>Other Part 1 Lightning Support: SIMP provides Total DMG buffs, Paralyze trauma and sp regen.</li> 
          <li>Other Support: Technically, since SIMP provides Total DMG, you can use her to support other elements that require Paralyze trauma or quantum collapse.</li>
        </ul>

          <div class="divider  "></div>
          <!-- Pull Recommendation Section -->
          <h2 class="text-xl font-semibold mb-4 text-left text-slate-100 cooltext">PULL RECOMMENDATION</h2>
            <p class="mt-4 text-sm sm:text-base">
                <strong class="text-amber-400">F2P Players</strong>
                <br/>Not recommended. Due to how Part 2 meta works (all valks are kinda balanced now and have their own niche) and how patches are longer (Monthly players can afford S-rank fullgear every patch, f2p can get S-rank fullgear every one or two patches), it’s better to 
                <br/> - Save until you can guarantee valk + fullgear,
                <br/> - Then get the latest valk early in the patch.
            </p>

          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">Competitive</strong> <br/> SIMP topscores quite a number of bosses qua boss Valrahal, and resonance Opaque Shadow. With Lunar Vow double dps, SIMP also topscores Paralyze Sushang, and Starless Benares. However, it has been a while since SIMP is actually used outside Arena.
          </p>

          <div class="divider  "></div>
          <!-- How to Get Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">HOW TO GET</h2>
          <ul class="list-disc ml-6 text-sm sm:text-base ">
              <li ><strong>SIMP:</strong> Battlesuit Supply</li>
              <li><strong>SIMP Weapon:</strong> Equipment Supply</li>
              <li><strong>SIMP's Stigma:</strong> Equipment Supply, Forgeable.</li>
          </ul>
          <div class="divider  "></div>
          <!-- Full Guide Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">FULL GUIDE</h2>
          <p class="mt-2 text-sm sm:text-base pb-4">
              Check out the full guide on YouTube: 
          </p>

          <div class="relative overflow-hidden" style="padding-top: 56.25%;">
              <iframe
                  class="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/F71RFZGpWu8"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen>
              </iframe>
          </div>
      </div>
  {/if}
  

  {#if selectedTab === 'Lineup'}
  <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">LINEUP</h2>

  <section class="max-w-(--breakpoint-lg) mx-auto ">

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


      {#if currentPage === 1}
      <!-- Category 1: Vita DPS -->

      <SimpDPS maindps={true}/>

      <div class="divider divider-accent text-xl custom-font tracking-wider text-teal-300 mt-16"> World Star Support </div>
      
      <SenaDPS firstCharName="Simp" />

      <div class="divider  "></div>

      <Sparkledps firstCharName="Simp"></Sparkledps>
      {/if}

      {#if currentPage === 2}
      <div class="divider divider-accent text-xl custom-font tracking-wider text-teal-300 mt-8"> Wheel of Destiny Support </div>

      <Hohdps firstCharName="Simp" ></Hohdps>

      <div class="divider  "></div>

      <JDDPS firstCharName="Simp"  />

      <div class="divider  "></div>

      <LanternDPS firstCharName="Simp"  />

      <div class="divider  "></div>

      <ThelDPS firstCharName="Simp"  />

      {/if}

      {#if currentPage === 3}
      <div class="divider divider-accent text-xl custom-font tracking-wider text-teal-300 mt-8"> Part 1 Lightning Support </div>

      <Lvdpsdual></Lvdpsdual>

      <div class="divider  "></div>

      <Lvdpsnormal></Lvdpsnormal>

      <div class="divider  "></div>

      <P1lightningdps></P1lightningdps>

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
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">EQUIPMENT</h2>
 
      <div>


              <h2 class="text-lg sm:text-xl font-semibold text-center  text-yellow-400">BEST FOR RESONANCE DPS / GOOD ENOUGH FOR OTHER ROLES</h2>

              <div class="flex flex-col justify-center items-center">
                  
              <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/07/26/50494840/db6b8de98a0f9bfe7238663dbc69c26e_1923411626236960886.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Weapon" class="w-full h-full object-cover">
                  </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/07/26/50494840/8aff6a577de7ee32b9bdd0fc752ac2d6_1483955048755413702.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/07/26/50494840/2178a98c976a86b67194dca8b36ae14e_2876160462005484178.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/07/26/50494840/515b58404224d78c57a984ddf12273aa_9218979217839153648.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

              </div>  
              <h4 class="text-base sm:text-base text-white">Vacation Notice + Day After Day Set</h4>
              </div>

              <div class="p-2 mt-2 bg-linear-to-r from-cyan-950/75 to-cyan-900/75 rounded-sm" >
              <p class="text-sm sm:text-base text-left">
                  <li class="text-sm sm:text-base"><b>Vacation Notice:</b> Gives more Stress meter and more Paralyze trauma. Team gains a shield, upon being hit by a quantum collapse attack, apply quantum collapse.</li>
                  <li class="text-sm sm:text-base"><b>Day After Day: </b> Best for SIMP Resonance DPS, and for supporting World Star teams. There are better options for other roles.  </li>
                  <li class="text-sm sm:text-base"><b>Affix: </b> Full ATK.</li>
              </p>
              </div>

              <div class="divider  "></div>

              <h2 class="text-lg sm:text-xl font-semibold text-center  text-sky-400">SITUATIONAL : THELEMA / LANTERN</h2>

              <div class="flex flex-col justify-center items-center">
                  
              <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2022/12/12/282941837/c1efca62ac9444f8e38953e4e9c95fd6_296101418603486040.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2022/12/12/282941837/f477a9f81fc9d3dfd48f2656e40f73ce_7914038771720886347.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2022/12/12/282941837/c9d2b6e080dbdf229d0723a82fb74a92_7687798446061500372.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

              </div>  
              <h4 class="text-base sm:text-base text-white">Bronya Zaychik set</h4>
              </div>

              <div class="p-2 mt-2 bg-linear-to-r from-cyan-950/75 to-cyan-900/75 rounded-sm" >
              <p class="text-sm sm:text-base text-left">
                <li class="text-sm sm:text-base">When supporting Thelema or Lantern, Bronya Zaychik stigma provides around 5% more dmg per rotation than Day After Day set.</li>
                <li class="text-sm sm:text-base">Reminder: You must cast weapon skill once to trigger stigma effects.</li>
              </p>
              </div>
              
              <div class="divider  "></div>

              <div>
              <h2 class="text-lg sm:text-xl font-semibold text-center  text-sky-400">SITUATIONAL : PART 1 DPS</h2>

              <div class="flex flex-col justify-center items-center">
                  
              <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2022/04/18/50494840/c8422093e19d3fda4eb461012353030f_3878463693516940344.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2022/04/18/50494840/2e0c1ce8f726d045657c61ee4eed8c08_5656353955789156078.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/07/26/50494840/515b58404224d78c57a984ddf12273aa_9218979217839153648.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

              </div>  
              <h4 class="text-base sm:text-base text-white">Zeno TM Day After Day B</h4>
              </div>

              <div class="p-2 mt-2 bg-linear-to-r from-cyan-950/75 to-cyan-900/75 rounded-sm" >
              <p class="text-sm sm:text-base text-left">
                <li class="text-sm sm:text-base">When SIMP is a Part 1 DPS, Zeno TM provides 18% more dmg than Day After Day set.</li>

              </p>
              </div>
            </div>
              <div class="divider  "></div>

              <div>
                <h2 class="text-lg sm:text-xl font-semibold text-center  text-sky-400">SITUATIONAL : PART 1 LIGHTNING SUPPORT</h2>
  
                <div class="flex flex-col justify-center items-center">
                    
                <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">
  
                    <div class="w-20 h-20 sm:w-28 sm:h-28">
                        <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/07/26/50494840/8aff6a577de7ee32b9bdd0fc752ac2d6_1483955048755413702.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                    </div>
  
                    <div class=" h-20  sm:h-28">
                        <img src="/images/valkportrait/Plus.png" alt="Vita" class="w-full h-full object-cover">
                    </div>

                    <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/09/18/72350798/436635e5bb6f7fd4b37a3bcf724ce14f_8228886158374375296.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>
  


                    <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/11/01/50494840/06170cbecb3347bac481adaaa3a47288_8566959529439830130.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

                  <div class=" h-20  sm:h-28">
                    <img src="/images/valkportrait/Plus.png" alt="Vita" class="w-full h-full object-cover">
                </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                    <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/07/26/50494840/515b58404224d78c57a984ddf12273aa_9218979217839153648.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                </div>
  
                </div>  
                <h4 class="text-base sm:text-base text-white">Day After Day TB + Tesla Band M / Paganini M</h4>
                </div>
  
                <div class="p-2 mt-2 bg-linear-to-r from-cyan-950/75 to-cyan-900/75 rounded-sm" >
                <p class="text-sm sm:text-base text-left">
                  <li class="text-sm sm:text-base">Tesla Band M for general lightning buff, Paganini M for shieldbreak buff.</li>
  
                </p>
                </div>
              </div>
                <div class="divider  "></div>


              <h2 class="text-lg sm:text-xl font-semibold text-center">TRANSITIONAL</h2>
              <div class="flex flex-col justify-center items-center">
                  
                  <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">
  
                      <div class="w-20 h-20 sm:w-28 sm:h-28">
                          <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/03/16/50494840/8a70f8491e52988cfc37944df3af4a27_4390304145569251175.png" alt="Vita" class="w-full h-full object-cover">
                      </div>
  
                  </div>  
                  <p class="text-sm sm:text-base text-white">Banquet Rose</p>
  
                  <p></p>
                  </div>
           </div>
      {/if}

      {#if selectedTab === 'Support Buffs'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">SUPPORT BUFFS</h2>

      <div class="flex flex-wrap gap-4 my-8">
        <!-- Example image list for support buffs; add your own image sources -->
        <img
          src="/images/valkbuff/buffs_simp.png"
          alt="Buff 1"
          class=" object-cover cursor-pointer"
          on:click={() => openLightbox('/images/valkbuff/buffs_simp.png')}
        />

        <!-- Add more images as needed -->
      </div>

 

      <div class="mt-8 mb-3 text-sm sm:text-base text-slate-100 space-y-4">
        <p class="mb-4 font-semibold">How to activate SIMP support buffs:</p>
        
          <div>
            <p class="font-semibold text-orange-300  mt-6">Stellar Drain</p>
            <p>Combo ATK consumes Stellar Drain. In WoDestiny team, teammates can consume SIMP's Stellar Drain.</p>
          </div>

          <div>
            <p class="font-semibold text-orange-300 mt-6">Ultimate (Finisher / Stellar Outburst)</p>
            <p>Applies quantum collapse and inflict huge paralyze trauma.</p>
          </div>

          <div>
            <p class="font-semibold text-orange-300 mt-6">Ultimate Finisher</p>
            <p>When AR is not activated, teammates gain Total DMG +34% (S) / 40% (S2) for 18s. If the teammate is a Theresa character, the buff changes to Elemental Breach state,  EleBreach +14% (S) / 17% (S2).</p>
          </div>

          <div>
            <p class="font-semibold text-orange-300 mt-6">Combo ATK</p>
            <p>With DayAfterDay 3PC stigma: When AR is inactive, teammate Total DMG +36% for 16s, inflict paralyze trauma, restore 12 sp for the team, extra 10 sp for yourself.</p>
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
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">ELYSIAN REALM</h2>

      <div class="flex justify-center gap-4 my-6">
          <button
            on:click={() => setPlaystyle('1')}
            class={`btn px-4 py-2 font-semibold rounded-sm ${activePlaystyle === '1' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-linear-to-r from-orange-600 to-amber-500 hover:text-white'}`}
          >
            Sleep AFK
          </button>
        
          <button
            on:click={() => setPlaystyle('2')}
            class={`btn px-4 py-2 font-semibold rounded-sm ${activePlaystyle === '2' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-linear-to-r from-orange-600 to-amber-500 hover:text-white'}`}
          >
            Spin 2 Win
          </button>


        <button
        on:click={() => setPlaystyle('3')}
        class={`btn px-4 py-2 font-semibold rounded-sm ${activePlaystyle === '3' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-linear-to-r from-orange-600 to-amber-500 hover:text-white'}`}
      >
        Smash
      </button>
    </div>
      
        {#if activePlaystyle === '1'}
        <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">Sleep AFK Playstyle
        </h2> 
        <p class="text-sm sm:text-base text-center sm:text-left">
          Just press Ult and let the Homus attack. Recommended for new players who are having trouble clearing ER.

        </p>

        <div class="divider  "></div>

        <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">EGO SIGNETS</h2>

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
              <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Saturday + Sunday</p>
              <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Work's End</p>
            </div>
          </div>
          
        </div>
        <div class="p-2 mt-3 rounded-sm" >
          <p class="text-sm sm:text-base text-left">
              <li class="text-sm sm:text-base"> ER Lite mode: Equip Because of You sigil and get all three Ego signets on Floor 7.</li>
              <li class="text-sm sm:text-base"> Normal mode: This run is very slow. Get both Ego blessings at the start by using Thorny Crown sigil or by resetting Floor 1 until you get another Ego portal.</li>
          </p>
          </div>

          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            <!-- First Signet with 'Start' text -->
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
                <img src="/images/signets/Signets of Infinity (Mobius).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">2</p>
              </div>
          
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Vicissitude (Hua).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">2</p>
              </div>

              <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Decimation (Kalpas).png" alt="Signet 4" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">2</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Discipline (Aponia).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">2</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Reverie (Pardofelis).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold">1</p>
              </div>

          </div>

          <div class="p-2 mt-3 rounded-sm" >
            <p class="text-sm sm:text-base text-left">
                <li class="text-sm sm:text-base"> Infinity: In ER, SIMP's homu puppets count as summoned entity.</li>
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
                <img src="/images/sigils/Forbidden_Seed.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/sigils/Because_of_You.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">START (ER Lite)</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
              <div class="flex flex-row rounded-sm">
                <img src="/images/sigils/Forbidden_Seed.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/sigils/Boundless_Logos.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">START (Normal)</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
                <div class="flex flex-row rounded-sm">
                    <img src="/images/sigils/The_First_Scale.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                    <img src="/images/sigils/Dreamful_Gold.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">FINAL</p>
            </div>

          </div>

          
          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">HOW TO PLAY</h2>

          <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>Use ult.</li>
          <li>Watch Youtube Shorts until the stage is cleared.</li>
        </ol>

        <p class="mt-2 text-sm sm:text-base pb-4 text-center">
            Check out this showcase from Marisa Honkai:
        </p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/5hFelCi3bgs"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                loading="lazy">
            </iframe>
        </div>
        {/if}

        {#if activePlaystyle === '2'}
        <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">Spin2Win Playstyle</h2> 
        <p class="text-sm sm:text-base text-center sm:text-left">
          This is a speedrun build where SIMP nukes enemies with resonance damage. If you don't finish the fight within the first meter, continue the fight with normal playstyle. Recommended for players with high Dorm stat and Divine Key stat. New players can try on lower difficulty if the current stage effect and enemies are beneficial for SIMP.
        </p>

        <div class="divider  "></div>


        <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">EGO SIGNETS</h2>

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
              <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Day Off Work</p>
              <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Work's End</p>
              <p class="text-sm sm:text-lg text-slate-100"> <b>Do Not Get:</b> Annual Leave</p>

            </div>
          </div>
        </div>
        <div class="p-2 mt-3 rounded-sm" >
          <p class="text-sm sm:text-base text-left">
             If you get Annual Leave, your spin will no longer trigger resonance marks.
          </p>
          </div>
          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            <!-- First Signet with 'Start' text -->
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
                <img src="/images/signets/Signets of Decimation (Kalpas).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>
          
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Infinity (Mobius).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>
              
              <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Vicissitude (Hua).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">2</p>
              </div>


              <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Gold (Eden).png" alt="Signet 5" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Reverie (Pardofelis).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold">1</p>
              </div>
              Infinity: In ER, SIMP's homu puppets count as summoned entity.

          </div>


            <div class="divider  "></div>
            <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SUPPORTS</h2>

          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            
            <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
                <div class="flex flex-row rounded-sm">
                <img src="/images/valkportrait/Senadina Deepspace Anchor.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-lg font-semibold">START</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
                <div class="flex flex-row rounded-sm">
                <img src="/images/valkportrait/Senadina Deepspace Anchor.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-lg font-semibold">MID</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
                <div class="flex flex-row rounded-sm">
                <img src="/images/valkportrait/Pardofelis Reverist Calico.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-lg font-semibold">FINAL</p>
            </div>
            
          </div>

          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SIGIL</h2>

          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            
 

            <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
                <div class="flex flex-row rounded-sm">
                    <img src="/images/sigils/Mad_Kings_Mask.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                    <img src="/images/sigils/An_Old_Pals_Legacy.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-lg font-semibold">START</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
                <div class="flex flex-row rounded-sm">
                    <img src="/images/sigils/Tin_Flask.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                    <img src="/images/sigils/An_Old_Pals_Legacy.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-lg font-semibold">FINAL</p>
            </div>

          </div>

          
          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">HOW TO PLAY</h2>

          <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>Activate Stellar Outburst. </li>
          <li>Mash Basic ATK to keep spinning until you run out of meter. Also use Ult when available.</li>
          <li>If enemies are still alive after the first meter spin, you have to revert to normal SIMP gameplay.</li>
        </ol>

        <p class="mt-2 text-sm sm:text-base pb-4 text-center">
            Check out this showcase from Marisa Honkai:
        </p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/_zf0XX1qjeo"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                loading="lazy">
            </iframe>
        </div>
        {/if}

        {#if activePlaystyle === '3'}
        <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">Alarm Clock Smash
        </h2> 
        <p class="text-sm sm:text-base text-center sm:text-left">
          Normal Stellar Outburst Playstyle

        </p>

        <div class="divider  "></div>

        <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">EGO SIGNETS</h2>

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
              <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Annual Leave + Day Off Work</p>
              <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Work's End</p>
            </div>
          </div>
          
        </div>
        <div class="p-2 mt-3 rounded-sm" >
          <p class="text-sm sm:text-base text-left">
              <li class="text-sm sm:text-base"> ER Lite mode: Equip Because of You sigil and get all three Ego signets on Floor 7.</li>
              <li class="text-sm sm:text-base"> Normal mode: Damage is underwhelming - I recommend getting both Ego blessings at the start by using Thorny Crown sigil, or by resetting Floor 1 until you get another Ego portal, or by using Because of You sigil.
              </li>
          </p>
          </div>

          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            <!-- First Signet with 'Start' text -->
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
                <img src="/images/signets/Signets of Gold (Eden).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>

              
              <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Infinity (Mobius).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>
          
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Vicissitude (Hua).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">2</p>
              </div>

              <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Decimation (Kalpas).png" alt="Signet 4" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">2</p>
              </div>


              <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Reverie (Pardofelis).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold">1</p>
              </div>

          </div>

          <div class="p-2 mt-3 rounded-sm" >
            <p class="text-sm sm:text-base text-left">
                <li class="text-sm sm:text-base"> Infinity: In ER, SIMP's homu puppets count as summoned entity.</li>
            </p>
            </div>

            <div class="divider  "></div>
            <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SUPPORTS</h2>

          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            
            <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
                <div class="flex flex-row rounded-sm">
                <img src="/images/valkportrait/Senadina Deepspace Anchor.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">START</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
                <div class="flex flex-row rounded-sm">
                <img src="/images/valkportrait/Senadina Deepspace Anchor.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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
                <img src="/images/sigils/Gold_Goblet.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/sigils/Because_of_You.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">START (ER Lite)</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
              <div class="flex flex-row rounded-sm">
                <img src="/images/sigils/Gold_Goblet.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/sigils/Dreamful_Gold.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">START (Normal)</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
                <div class="flex flex-row rounded-sm">
                    <img src="/images/sigils/Ruined_Legacy.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                    <img src="/images/sigils/Dreamful_Gold.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">FINAL</p>
            </div>

          </div>

          
          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">HOW TO PLAY</h2>

          <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>Activate Stellar Outburst. When you have enough meter, use Combo ATK.</li>
          <li>Press Basic ATK to spin and gain meter.</li>
          <li>Weapon skill recover half meter. </li>
          <li>Use Ultimate whenever it's available.</li>

        </ol>

        <p class="mt-2 text-sm sm:text-base pb-4 text-center">
            Check out this showcase from Marisa Honkai:
        </p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/3X0S1iit3lw"
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
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">RANK UP</h2>

      <div class="text-center my-4">
        <p class="text-center text-sm sm:text-base"><b>Reminder:</b> <span class="text-black bg-white font-semibold rounded-sm m-2 px-2"> S0 rank is enough </span> for most players. A fully built S0-rank team is better than SSS-rank DPS without signature weapon and proper supports.
        </p>
      </div>
      <h2 class="text-xl font-semibold my-4 cooltext text-white">NOTABLE RANK-UP</h2>

        <!-- Notable Rank Ups Section -->
        <div class="flex flex-col lg:flex-row gap-4 mb-8">
          <!-- DPS Upgrade Box -->
          <div class="flex-1 p-2 bg-gray-800 rounded-lg shadow-md border border-blue-400">
            <h3 class="text-lg font-semibold text-blue-400 mb-2">DPS Upgrade</h3>
            <ul class=" text-slate-100 text-base">
              <li>S1: Increase Resonance DMG
              </li>
              <li>S2: Weapon skill trigger time fracture</li>
              <li>SS2: EleBreach +5 ➔ 6%</li>
              <li>SS2: Elemental Breach +4.5 ➔ 6%
              </li>
            </ul>
          </div>
      
          <!-- Support Upgrade Box -->
          <div class="flex-1 p-2 bg-gray-800 rounded-lg shadow-md border border-yellow-400">
            <h3 class="text-lg font-semibold text-yellow-400 mb-2">Support Upgrade</h3>
            <ul class=" text-slate-100 text-base">
              S2: Part 1 Team

              <li>Total DMG +34% ➔ 40%
              </li>
              <li>Elemental Breach +14% ➔ 17%</li>

            </ul>
          </div>
        </div>

        <div class="divider  "></div>

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
                  When SIMP is the leader, Homu consumes teammate's resonance mark to trigger resonance 3 times, each deal 108% ➔ 120% ATK of Lightning DMG. If the max number of times resonance mark can be triggered is over 7 times, then each mark deal 620% ➔ 650% ATK of Lightning DMG.
                </td>
                <td class="p-3">DPS</td>
              </tr>
              <!-- Sample Row 2 -->
              <tr>
                <td>S2</td>
                <td>

                    1. UNLOCK: When AR World Star is active, during Stellar Outburst, Substitute Mark will launch an additional pinball.<br/>
                    2. When AR is not activated: After casting finisher, teammate gain Total DMG +34% ➔ 40% . If the teammate is a Theresa character, the effect is changed to Elemental Breach state, EleBreach +14% ➔ 17% for 18s. <br/>
                    3. In [Let Me Leave Work!] state, casting weapon skill triggers evasion skill. <br/>

                </td>
                <td>1. DPS<br/>2. P1 Support<br/>3. Evasion trigger</td>
              </tr>
              <tr>
                <td>S3</td>
                <td>
                  Leader Skill:<br/>
                  - Team Elemental DMG +17.2% ➔ 21.1%<br/>
                  - SIMP's resonance atk gain Lightning DMG +21% ➔ 25.5%<br/>
                  - Enemies take 17.5% ➔ 21.25% more Lightning DMG from SIMP's resonance skill (independent multiplier)

                </td>
                <td>DPS</td>
              </tr>
              <tr>
                <td>SS</td>
                <td>
                  1. When Substitute Mark exists, self Total DMG +15.8% ➔ 20% <br/>
                  2. UNLOCK: In [Let Me Leave Work!] state, Basic ATK seq 2 hits gain Lightning DMG +32%, increase by 8% more when you have Quantum Mech energy
                </td>
                <td>DPS</td>
              </tr>
              <tr>
                <td>SS1</td>
                <td>
                  Ult Lightning DMG +38% ➔ 42% </td>
                <td>DPS
              </tr>
              <tr>
                <td>SS2</td>
                <td>
                  When SIMP is the leader, self Elemental Breach +4.5% ➔ 6%	                </td>
                <td>DPS
              </tr>
              <tr>
                <td>SS3</td>
                <td>
                  Leader Skill:<br/>
                  - Team Elemental DMG +21.1% ➔ 25%<br/>
                  - SIMP's resonance atk gain Lightning DMG +25.5% ➔ 30%<br/>
                  - Enemies take 21.25% ➔ 25% more Lightning DMG from SIMP's resonance skill (independent multiplier)  <br/>           
                </td>
                <td>DPS
              </tr>
              <tr>
                <td>SSS</td>
                <td>
                  	
1. In [I Wanna Leave Work!] state, in time fracture, Basic ATK seq 2 hits gain Lightning DMG +32% (SS) ➔ 40% (SSS), increase by 8% (SS) ➔ 10% (SSS) more when you have Quantum Mech energy.<br/>
2. Ult Lightning DMG +42% ➔ 50%

                </td>
                <td>DPS

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
              <p>When SIMP is the leader, Homu consumes teammate's resonance mark to trigger resonance 3 times, each deal 108% ➔ 120% ATK of Lightning DMG. If the max number of times resonance mark can be triggered is over 7 times, then each mark deal 620% ➔ 650% ATK of Lightning DMG.
              </p>
              <p class="mt-2"><strong>Good for:</strong> DPS</p>
            </div>
          </div>

          <div class="accordion-item">
            <div class="accordion-title" on:click={() => toggleItem(2)}>
              <span>S2</span>
              <span class="text-md">{openItem === 2 ? '-' : '+'}</span>
            </div>
            <div class="accordion-content {openItem === 2 ? 'open' : ''}">
              <p>1. UNLOCK: When AR World Star is active, during Stellar Outburst, Substitute Mark will launch an additional pinball.<br/>
                2. When AR is not activated: After casting finisher, teammate gain Total DMG +34% ➔ 40% . If the teammate is a Theresa character, the effect is changed to Elemental Breach state, EleBreach +14% ➔ 17% for 18s.<br/>
                3. In [Let Me Leave Work!] state, casting weapon skill triggers evasion skill.

              </p>
              <p class="mt-2"><strong>Good for:</strong> DPS, P1 Support, Evasion Trigger</p>
            </div>
          </div>

        

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(3)}>
            <span>S3</span>
            <span class="text-md">{openItem === 3 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 3 ? 'open' : ''}">
            <p>Leader Skill:<br/>
              - Team Elemental DMG +17.2% ➔ 21.1%<br/>
              - SIMP's resonance atk gain Lightning DMG +21% ➔ 25.5%<br/>
              - Enemies take 17.5% ➔ 21.25% more Lightning DMG from SIMP's resonance skill (independent multiplier)
            </p>
            <p class="mt-2"><strong>Good for:</strong> DPS</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(4)}>
            <span>SS</span>
            <span class="text-md">{openItem === 4 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 4 ? 'open' : ''}">
            <p>1. When Substitute Mark exists, self Total DMG +15.8% ➔ 20% <br/>
              2. UNLOCK: In [Let Me Leave Work!] state, Basic ATK seq 2 hits gain Lightning DMG +32%, increase by 8% more when you have Quantum Mech energy
            </p>
            <p class="mt-2"><strong>Good for:</strong> DPS</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(5)}>
            <span>SS1</span>
            <span class="text-md">{openItem === 5 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 5 ? 'open' : ''}">
            <p>Ult Lightning DMG +38% ➔ 42%	</p>
            <p class="mt-2"><strong>Good for:</strong> DPS</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(6)}>
            <span>SS2</span>
            <span class="text-md">{openItem === 6 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 6 ? 'open' : ''}">
            <p>When SIMP is the leader, self Elemental Breach +4.5% ➔ 6%	</p>
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
              - Team Elemental DMG +21.1% ➔ 25%<br/>
              - SIMP's resonance atk gain Lightning DMG +25.5% ➔ 30%<br/>
              - Enemies take 21.25% ➔ 25% more Lightning DMG from SIMP's resonance skill (independent multiplier)</p>
            <p class="mt-2"><strong>Good for:</strong> DPS</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(8)}>
            <span>SSS</span>
            <span class="text-md">{openItem === 8 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 8 ? 'open' : ''}">
            <p>		1. In [I Wanna Leave Work!] state, in time fracture, Basic ATK seq 2 hits gain Lightning DMG +32% (SS) ➔ 40% (SSS), increase by 8% (SS) ➔ 10% (SSS) more when you have Quantum Mech energy.<br/>
              2. Ult Lightning DMG +42% ➔ 50%	
            <p class="mt-2"><strong>Good for:</strong> DPS
            </p>
          </div>
        </div>


    </div>
        {/if}
      {/if}


      {#if selectedTab === 'How to Play'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">HOW TO PLAY</h2>
  
      <div class=" gap-6 mt-5 mb-10">
          <!-- Video 1 with title and description -->
          <div class="bg-gray-800 p-4 rounded-lg shadow-md ">
            <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">Simp DPS and Support</h2>

            <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">Starts at around 7:13</p>

            <div class="relative overflow-hidden" style="padding-top: 56.25%;">
              <iframe
                  class="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/F71RFZGpWu8"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen>
              </iframe>
          </div>

          
        </div>

      </div>


  {/if}
  
  
      {#if selectedTab === 'Gameplay'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">GAMEPLAY EXAMPLES</h2>
  
      <div class=" gap-6 mt-5 mb-10">
        <!-- Video 1 with title and description -->

      
        <div class="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">SIMP DPS</h2>

          <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">SIMP DPS vs Quantum Valralhal</p>

          <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
            loading="lazy" 

                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/lbXFzVOJxPE"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        </div>
      </div>

      

    </div>


  {/if}
  
  {#if selectedTab === 'Question'}
  <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">POPULAR QUESTION</h2>

      <div class="my-6">
        <div class="chat chat-start ">
          <div class="chat-image avatar">
            <div class="w-10 sm:w-12 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="/images/meibald.webp" />
            </div>
          </div>
          <div class="chat-bubble chat-bubble-primary text-base ">Teri</div>
        </div>

        <div class="chat chat-end">
          <div class="chat-image avatar">
            <div class="w-10 sm:w-12 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="/images/ds.webp" />
            </div>
          </div>
          <div class="chat-bubble chat-bubble-neutral text-base">Teri</div>
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


      {#if selectedTab === 'TL Error'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">TRANSLATION ERROR</h2>

      <div class="flex flex-col justify-center items-center">
          
        <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">

            <div class="w-20 h-20 sm:w-28 sm:h-28">
                <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/07/26/50494840/2178a98c976a86b67194dca8b36ae14e_2876160462005484178.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
            </div>

        </div>  
        <p class="text-sm sm:text-base text-white">Theresa: At Work (M)</p>

    </div>

    <div class="text-center my-4 rounded-sm bg-gray-700">
      <p class="text-left text-sm sm:text-base px-2 py-3">
        <b>In-Game Text:</b><br/>
        The team deals 53% more Total DMG.
      </p>
    </div>

    <div class="text-center my-4 rounded-sm bg-cyan-700">
      <p class="text-left text-sm sm:text-base px-2 py-3 text-slate-100">
        <b>Correct Translation:</b><br/>
        Teammates deal 53% more Total DMG.
      </p>
    </div>
      {/if}


  </div>

</section>


</div>

</section>


</div>

