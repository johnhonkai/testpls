
<svelte:head>
  <title>逆命魔龙·降临！</title> 

    <meta property="og:title" content="逆命魔龙·降临！" />
    <meta property="og:description" content="逆命魔龙·降临！ Guides, Builds and Gameplay" />
    <meta property="og:image" content="" />
    <meta property="og:url" content="https://marisaimpact.com/valk/scoralie" />
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




    import likesData from '$lib/data/likes.json'; // Import local JSON data

  import { goto } from '$app/navigation';
  import Lightbox from "$lib/components/lightbox.svelte";
	import Heliadps from "$lib/components/lineup/heliadps.svelte";
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
import { faCircleUser , faUsers , faBook , faVideo , faHome , faBolt ,faComments  ,faStar , faFire} from '@fortawesome/free-solid-svg-icons';
	import CharBio from '$lib/components/CharBio.svelte';
	import Dududps from "$lib/components/lineup/dududps.svelte";
	import Badumdps from "$lib/components/lineup/badumdps.svelte";
	import Psdps from "$lib/components/lineup/psdps.svelte";

  let selectedTab = 'Overview'; // Default tab
  const tabs = [
    { name: 'Overview', short: 'overview', icon: faHome },
  //{ name: 'Lineup', short: 'lineup', icon: faUsers },
  //{ name: 'Equipment', short: 'equipment', icon: faBolt  },
  // { name: 'Support Buffs', short: 'support', icon: faCircleUser },
  //  { name: 'How to Play', short: 'howtoplay', icon: faBook },
  //{ name: 'Gameplay', short: 'example', icon: faVideo },
  //{ name: 'Elysian Realm', short: 'er', icon: faFire },
  //{ name: 'Rank Up', short: 'rank', icon: faStar },
  //  { name: 'Question', short: 'qna' , icon: faComments  },
 // { name: 'Overview Card', short: 'card' },
 // { name: 'Translation Error', short: 'translation' },
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
  let durandallikes = likesData["scoralie"] || 0; // Get initial likes from JSON
  const charName = "scoralie"; // Route name for this character
  let hasLiked = false; // Track if the user has liked
  let voterId = ""; // User's unique voter ID

  // Generate or fetch the voterId on component mount
  onMount(async () => {
  voterId = localStorage.getItem("voterId") || crypto.randomUUID(); // Generate a voter ID if not present
  localStorage.setItem("voterId", voterId); // Save voter ID in localStorage

  // Check Firebase if the user has already liked this character
  const userHasLiked = await hasUserLiked(charName, voterId);

  if (userHasLiked) {
    hasLiked = true; // Update state to disable the button
    localStorage.setItem(`liked_${charName}`, "true"); // Persist locally
  }
});
// Handle Like Button Click
async function increaseLike() {
  try {
    if (hasLiked) {
      console.log("User has already liked this character.");
      return;
    }

    durandallikes++; // Increment the local counter for display purposes

    // Call likeWithVoterId to send the like to Firebase
    await likeWithVoterId(charName, voterId);

    // Update local state to prevent multiple likes
    hasLiked = true;
    localStorage.setItem(`liked_${charName}`, "true"); // Persist locally
    console.log(`Successfully liked "${charName}".`);
  } catch (error) {
    
    durandallikes--; // Revert the local counter in case of an error
    console.error("Error liking the character:", error);
  }
}
</script>


<style>
  #star-container {
    background: radial-gradient(rgb(var(--light-red-rgb)), rgb(var(--dark-red-rgb)));
    height: 100%;  
    overflow: hidden;
    position: relative;
  }

  #star-gradient-overlay {
    background: radial-gradient(circle, transparent 75%, rgb(var(--dark-red-rgb)));
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    opacity: 0.9;
    z-index: 2;
  }

  #app {
  height: 35rem;
  overflow: hidden;
  position: relative;
}
</style>

<section class="relative mx-auto flex flex-row items-center justify-center px-4 md:p-2 gap-3 md:pb-0  md:mt-0  pt-2	sm:pt-0 ">

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



<!-- Left: Character Image -->
<div class="relative w-auto h-48 sm:h-60 flex justify-center mt-4 sm:mt-15" id="valkpicbox">
  <!-- Image for Larger Screens -->
  <img src="/images/valkfull/scoralie.png" alt="S Coralie" class="h-full w-auto object-cover md:object-contain  " style ="view-transition-name: valkyrie-image-55;"/> 
  <!-- Like Button: Bottom-right overlay -->
  <div class="absolute bottom-2 right-2 z-10">
    <div
      class="tooltip tooltip-left"
      data-tip={hasLiked ? "You already liked this!" : "Click to like"}
    >
      <button
        on:click={increaseLike}
        disabled={hasLiked}
        class="bg-red-800/80 hover:bg-red-700 transition-colors rounded-full px-3 py-1 flex items-center gap-1 text-white text-sm shadow-md"
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
        <span class="font-semibold">{durandallikes}</span>
      </button>
    </div>
  </div>

</div>



<!-- Right: Character Info (Centered) -->
<div class="flex flex-col items-center text-center justify-start sm:mt-8">
 
  <!-- Battlesuit Name -->
  <h1 class="text-sm md:text-xl text-white mt-4 mb-2 italic font-russoone">逆命魔龙·降临！</h1>

  <!-- Character Info Cards -->
  <div class="space-y-2 w-[260px] md:w-[300px]">
    <!-- Name Card -->
    <div class="flex rounded-lg overflow-hidden shadow-md">
      <div class="bg-red-800 text-white px-4 py-1 w-28 flex items-center justify-center font-semibold text-xs ">
        Name
      </div>
      <div class="bg-slate-200 text-black px-3 py-1 flex-1 flex items-center text-xs font-medium">
        Coralie 6626 Planck
      </div>
    </div>

    <!-- Release Date Card -->
    <div class="flex rounded-lg overflow-hidden shadow-md">
      <div class="bg-red-800 text-white px-4 py-1 w-28 flex items-center justify-center font-semibold text-xs">
        Release
      </div>
      <div class="bg-slate-200 text-black px-3 py-1 flex-1 flex items-center text-xs font-medium">
        v8.4 (21 Aug 2025)
      </div>
    </div>
  </div>


  <!-- Tags / Type Row -->
  <CharBio mode="dps" rank="s" type="mech" element="fire" ar="roo" bg="bg-red-800" />

  <!-- Support Section -->
  <CharBio mode="support" ar={['all']}  bg="bg-red-800"/>
</div>


</section>

<div class="flex max-w-(--breakpoint-xl) justify-center mx-auto sm:mt-8"> 


  <aside class="w-full sm:max-w-[10rem] md:max-w-[12rem] hidden sm:block p-4  text-gray-200 sticky top-16 h-[calc(100vh-4rem)] " >

    <ul class="space-y-2">
      {#each tabs as tab}
        <li>
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
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-4 text-center">OVERVIEW</h2>

      <div>
          <!-- Roles Section -->
          <h2 class="text-xl  font-semibold mb-2 text-left cooltext text-slate-100">ROLES</h2>
          
          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">BETA</strong> 
              <br/>
                To Be Updated.            </p>
            
          
          <div class="divider  "></div>
          <!-- Pull Recommendation Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">PULL RECOMMENDATION</h2>
          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">New Players</strong> <br/> Recommended to get Dragoon Coralie in v8.4.
            </p>

          <div class="divider  "></div>
          <!-- How to Get Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">HOW TO GET</h2>
          <ul class="list-disc ml-6 text-sm sm:text-base ">
              <li ><strong>Battlesuit:</strong> Battlesuit Supply</li>
              <li><strong>Weapon:</strong> Equipment Supply</li>
              <li><strong>Stigma:</strong> Equipment Supply, Forgeable, Free stigma box in 8.4</li>
          </ul>
          <div class="divider  "></div>
          <!-- Full Guide Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">FULL GUIDE</h2>
          <p class="mt-2 text-sm sm:text-base pb-4">
            Check out the full guide on YouTube: (SOON)
        </p>
  
                <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/"
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




      {#if currentPage === 1}
      <!-- Category 1: Vita DPS -->

      <Heliadps maindps={true} ></Heliadps>


      <div class="divider divider-accent text-xl custom-font tracking-wider text-teal-300 mt-16"> Law of Ascension Support </div>
      
      <Psdps firstCharName="PAWS"></Psdps>

      <div class="divider  "></div>

      <Badumdps firstCharName="PAWS"></Badumdps>

      <div class="divider  "></div>

      <Dududps firstCharName="PAWS"></Dududps>


      {/if}


</section>

  {/if}

      {#if selectedTab === 'Equipment'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">EQUIPMENT</h2>
 
      <div>


        <h2 class="text-xl font-semibold text-center  text-yellow-400">BEST</h2>

        <div class="flex flex-col justify-center items-center">
            
        <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">

          <div class="w-20 h-20 sm:w-28 sm:h-28">
            <img src="https://act-upload.mihoyo.com/bh3-wiki/2025/05/11/50494840/da02b4b839bf81284e7f98efdf86ff41_3415222748096311262.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Rainbow" class="w-full h-full object-cover">
        </div>

        <div class="w-20 h-20 sm:w-28 sm:h-28">
          <img src="https://act-upload.mihoyo.com/bh3-wiki/2025/05/10/9809137/ddd99f080b3a2ba3efbe62aca1ea573d_2750096196681250716.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Stigma" class="w-full h-full object-cover">
      </div>

      <div class="w-20 h-20 sm:w-28 sm:h-28">
          <img src="https://act-upload.mihoyo.com/bh3-wiki/2025/05/10/9809137/5ec82754c12f45145e7e4b513c50ff30_3655955345208804206.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Stigma" class="w-full h-full object-cover">
      </div>

      <div class="w-20 h-20 sm:w-28 sm:h-28">
          <img src="https://act-upload.mihoyo.com/bh3-wiki/2025/05/10/9809137/5c57f914ce3903b288a3028929db0a74_7607993804575502614.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Stigma" class="w-full h-full object-cover">
      </div>

        </div>  
        <h4 class="text-base sm:text-base text-white"> Rainbow From Cinders + Helia stigma set</h4>
        </div>



     </div>

     <div>



      <div class="p-4 mt-4 bg-linear-to-r from-orange-950/75 to-orange-900/75 rounded-sm">
        <p class="text-sm sm:text-base text-left mb-4">
          <b>Rainbow From Cinders </b><br/> - Best weapon for PAWS, huge self buffs and team buffs.
          <br/>- Gives Ult 3 timestop for 1.5s.
          <br/>- During Stellar Outburst, initial sp +10% of max sp.
        </p>

        <p class="text-sm sm:text-base text-left mb-4">
          <b>Helia stigma set</b><br/> - Huge buffs.
          <br/> - Forgeable in Foundry.
        </p>

        <p class="text-sm sm:text-base text-left">
          <b>Affix</b> <br/>Full ATK. Some advanced runs might use sp regen / cost reduction.
        </p>
      </div>


      </div>

      <div class="divider  "></div>

<div class="text-slate-100">
  <h2 class="text-xl font-semibold mb-4 cooltext">Weapon DMG Test - PAWS DPS</h2>
  <div class="overflow-x-auto rounded-xl shadow-md border border-white/10">
    <table class="min-w-full table-auto bg-gradient-to-b from-gray-900 to-gray-800 text-sm sm:text-base text-left">
      <thead class="bg-gray-700 text-slate-200 uppercase text-xs tracking-wider">
        <tr>
          <th class="p-3 font-semibold">Weapon</th>
          <th class="p-3 font-semibold text-right">Total DMG</th>
          <th class="p-3 font-semibold text-right">Percentage</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-700">
        <tr class="hover:bg-gray-700/40">
          <td class="p-3">Rainbow From Cinders  Syn3</td>
          <td class="p-3 text-right">42,195,968</td>
          <td class="p-3 text-right">107.37%</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3">Rainbow From Cinders  Syn2</td>
          <td class="p-3 text-right">40,726,912</td>
          <td class="p-3 text-right">103.63%</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3">Rainbow From Cinders  Syn1 </td>
          <td class="p-3 text-right">39,298,688</td>
          <td class="p-3 text-right">100.00%</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3">Burn the Long Night Syn1</td>
          <td class="p-3 text-right">29,220,672</td>
          <td class="p-3 text-right">74.36%</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3">Electrifying Arc Syn3</td>
          <td class="p-3 text-right">28,751,808</td>
          <td class="p-3 text-right">73.16%</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3">Ta-Da! Syn3</td>
          <td class="p-3 text-right">26,630,528</td>
          <td class="p-3 text-right">67.76%</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

       <div class="divider  "></div>

<div class="text-slate-100">
  <h2 class="text-xl font-semibold mb-4 cooltext">Weapon DMG Test - Peregrine Sword Support</h2>
  <div class="overflow-x-auto rounded-xl shadow-md border border-white/10">
    <table class="min-w-full table-auto bg-gradient-to-b from-gray-900 to-gray-800 text-sm sm:text-base text-left">
      <thead class="bg-gray-700 text-slate-200 uppercase text-xs tracking-wider">
        <tr>
          <th class="p-3 font-semibold">Weapon</th>
          <th class="p-3 font-semibold text-right">Total DMG</th>
          <th class="p-3 font-semibold text-right">Percentage</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-700">
        <tr class="hover:bg-gray-700/40">
          <td class="p-3">Rainbow From Cinders Syn3</td>
          <td class="p-3 text-right">48,189,248</td>
          <td class="p-3 text-right">103.47%</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3">Rainbow From Cinders Syn2</td>
          <td class="p-3 text-right">47,502,528</td>
          <td class="p-3 text-right">102%</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3">Rainbow From Cinders Syn1 </td>
          <td class="p-3 text-right">46,573,440</td>
          <td class="p-3 text-right">100%</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3">Burn the Long Night Syn1</td>
          <td class="p-3 text-right">41,138,112</td>
          <td class="p-3 text-right">88.33%</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3">Electrifying Arc Syn3</td>
          <td class="p-3 text-right">40,289,728</td>
          <td class="p-3 text-right">86.51%</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3">Ta-Da! Syn3</td>
          <td class="p-3 text-right">39,536,128</td>
          <td class="p-3 text-right">84.89%</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>     
      {/if}

      {#if selectedTab === 'Support Buffs'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">SUPPORT BUFFS</h2>
      <div class="flex flex-wrap gap-4 mt-8">
        <!-- Example image list for support buffs; add your own image sources -->
        <img
          src="https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/guidepics//Peregrine%20Buffs.webp"
          alt="Buff 1"
          class=" object-cover cursor-pointer"
          on:click={() => openLightbox('https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/guidepics//Peregrine%20Buffs.webp')}
        />
      </div>
      
      <div class="my-5 text-sm sm:text-base text-slate-100 space-y-4">
        <p class="mb-4 font-semibold">How to activate Peregrine Sword support buffs:</p>
        
          <div>
            <p class="font-semibold text-orange-300  mt-6">Stellar Drain</p>
            <p>Joint Weapon skill Forest Piercer and Leaf Sweep can consume Stellar Drain. 
            </p>
          </div>

          <div>
            <p class="font-semibold text-orange-300 mt-6">PS Stigma Buff</p>
           <p>Weapon Skill or QTE triggers an important stigma buff [The World is an Oyster] for 25s. This is also activated / refreshed upon Stellar Outburst activation.</p>
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
        class={ ` btn px-4 py-2 font-semibold rounded-sm ${activePlaystyle === '1' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-linear-to-r from-orange-600 to-amber-500 hover:text-white'}`}
      >
        AR CHARGING
      </button>


        <button
          on:click={() => setPlaystyle('2')}
          class={`btn px-4 py-2 font-semibold rounded-sm ${activePlaystyle === '2' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-linear-to-r from-orange-600 to-amber-500 hover:text-white'}`}
        >
        STELLAR OUTBURST
        </button>
      

      </div>
    

  
      {#if activePlaystyle === '1'}
      <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">AR Charging Playstyle</h2> 
      <p class="text-sm sm:text-base text-center sm:text-left">
       Spam weapon and ult. Also Combo ATK once or twice (optional). 
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
            <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> White Arrow ➔ Triple Aligned Fires</p>
            <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Square Array </p>
          </div>
        </div>
        
      </div>
      <div class="mt-3 rounded-sm" >
        <p class="text-sm sm:text-base text-left">
          <li class="text-sm sm:text-base"> ER Lite mode: Equip Because of You sigil and get all three Ego signets on Floor 7.</li>
          <li class="text-sm sm:text-base"> Normal mode: You can complete the run with just one Ego signet (White Arrow), but having both Ego signets is a big improvement. You can get both Ego signets at the start by using Thorny Crown sigil, OR by resetting Floor 1 until you get another Ego portal, OR use Because of You support sigil and get the other two Ego signets on Floor 7.</li>
      </p>
        </div>
  
        <div class="divider  "></div>
        <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
        <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
          <!-- First Signet with 'Start' text -->
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
              <img src="/images/signets/Signets of Gold (Eden).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">1</p>
            </div>
  
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Deliverance (Kevin).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold ">1</p>
            </div>
  
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Helix (Vill-V).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">1 or 2</p>
            </div>

            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Vicissitude (Hua).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">2</p>
            </div>

            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Stars (Griseo).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">2</p>
            </div>

            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Setsuna (Sakura).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">1 or 2</p>
            </div>

            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Reverie (Pardofelis).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">1</p>
            </div>
  
        </div>
      <div class="mt-3 rounded-sm" >
        <p class="text-sm sm:text-base text-left">
          This playstyle utilizes all three skills: weapon skill, evasion skill, Ultimate - so a lot of signets can work. Just commit to 3 or 4 nexus for each run.
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
              <img src="/images/sigils/Burden.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/sigils/Dreamful_Gold.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            </div>
            <p class="text-base sm:text-lg font-semibold">MID</p>
        </div>
  
        <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
            <div class="flex flex-row rounded-sm">
              <img src="/images/sigils/Key_to_the_Deep.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/sigils/Dreamful_Gold.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              </div>
            <p class="text-base sm:text-lg font-semibold">FINAL</p>
        </div>
  
  
        </div>
  
        
        <div class="divider  "></div>
        <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">HOW TO PLAY</h2>
  
        <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>Spam Weapon ➔ Ult.</li>
          <li>If you have [Triple Aligned Fires] signet, you can use Combo ATK when you have 5 buff stacks. However, spamming weapon ➔ ult is still faster and deals more dmg than using Combo ATK. This is really just optional.</li>
        </ol>
  
    
          <p class="mt-8 text-sm sm:text-base pb-4 text-center">
            Check out this showcase from Marisa Honkai:
        </p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/1sY-468DJnM"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                loading="lazy">
            </iframe>
        </div>
      {/if}

      {#if activePlaystyle === '2'}
      <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">Stellar Outburst Playstyle</h2> 
      <p class="text-sm sm:text-base text-center sm:text-left">
       Spam Basic ATK.
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
            <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Lower Arrowhead ➔ Backstepped Firing </p>
            <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Square Array </p>
          </div>
        </div>
        
      </div>
      <div class="mt-3 rounded-sm" >
        <p class="text-sm sm:text-base text-left">
          <li class="text-sm sm:text-base"> ER Lite mode: Equip Because of You sigil and get all three Ego signets on Floor 7.</li>
          <li class="text-sm sm:text-base"> Normal mode: You can complete the run with just one Ego signet (Lower Arrowhead), but having both Ego signets is a big improvement. You can get both Ego signets at the start by using Thorny Crown sigil, OR by resetting Floor 1 until you get another Ego portal, OR use Because of You support sigil and get the other two Ego signets on Floor 7.</li>
      </p>
        </div>
  
        <div class="divider  "></div>
        <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
        <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
          <!-- First Signet with 'Start' text -->
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
              <img src="/images/signets/Signets of Gold (Eden).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">1</p>
            </div>
  
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Deliverance (Kevin).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold ">1</p>
            </div>
  
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Bodhi (Su).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">1</p>
            </div>

            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Vicissitude (Hua).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">2</p>
            </div>
            
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Reverie (Pardofelis).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">1</p>
            </div>
  
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
              <img src="/images/sigils/Burden.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/sigils/Dreamful_Gold.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            </div>
            <p class="text-base sm:text-lg font-semibold">MID</p>
        </div>
  
        <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
            <div class="flex flex-row rounded-sm">
              <img src="/images/sigils/Key_to_the_Deep.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/sigils/Dreamful_Gold.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              </div>
            <p class="text-base sm:text-lg font-semibold">FINAL</p>
        </div>
  
  
        </div>
  
        
        <div class="divider  "></div>
        <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">HOW TO PLAY</h2>
  
        <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>Activate Stellar Outburst.</li>
          <li>Spam Basic ATK. You will auto-cast Ult if you have enough sp.</li>
          <li>If Stellar Outburst is almost over, use Combo ATK, then Finisher Ult.</li>
          <li>Use Ult once while you wait SO to be available again.</li>
          <li>Repeat.</li>
        </ol>
  
          <p class="mt-8 text-sm sm:text-base pb-4 text-center">
            Check out this showcase from Marisa Honkai:
        </p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/wuUI7GX1Q2E"
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
            <ul class=" text-slate-100 text-sm sm:text-base">
              <li>S2: Additional weapon skill charge. Improves rotation. </li>
              <li>SS: During AR Charging, when AR is maxed, Ult wont cost sp.</li>
            </ul>
          </div>
      
          <!-- Support Upgrade Box -->
          <div class="flex-1 p-2 bg-gray-800 rounded-lg shadow-md border border-yellow-400">
            <h3 class="text-lg font-semibold text-yellow-400 mb-2">Support Upgrade</h3>

          </div>
        </div>

        <div class="divider  "></div>

        {#if !isMobile}
        <!-- Full Rank Up List -->
<div class="text-slate-100">
  <h2 class="text-xl font-semibold mb-4 cooltext">FULL RANK-UP LIST</h2>
  <div class="overflow-x-auto rounded-xl shadow-md border border-white/10">
    <table class="min-w-full bg-gradient-to-b from-gray-900 to-gray-800 text-sm sm:text-base text-left">
      <thead class="bg-gray-700 text-slate-200 uppercase text-xs tracking-wider">
        <tr>
          <th class="p-3 font-semibold text-center w-20">Rank</th>
          <th class="p-3 font-semibold">Skill</th>
          <th class="p-3 font-semibold text-center w-36">Good For</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-700">
        <tr class="hover:bg-gray-700/40">
          <td class="p-3 text-center font-bold text-blue-300">S1</td>
          <td class="p-3">Gain Total DMG +10% ➔ 15% against PSY enemies.</td>
          <td class="p-3 text-center">DPS</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3 text-center font-bold text-blue-300">S2</td>
          <td class="p-3 space-y-2">
            <div>- UNLOCK: Gain 1 extra Weapon Skill charge and Evasion Skill charge.</div>
            <div>- As leader: During SO, when team triggers Facet of Infinitude 1/2/3 times, Team Lightning DMG +26%/26%/44% ➔ +28%/28%/47%.</div>
            <div>- As leader: Enemies take 7% ➔ 8.5% more Total DMG from PAWS, additional +14% ➔ 17% during AR Charging.</div>
          </td>
          <td class="p-3 text-center">DPS</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3 text-center font-bold text-blue-300">S3</td>
          <td class="p-3 space-y-2">
            <div>Leader Skill:</div>
            <div>- PAWS Lightning DMG +10% ➔ 18%.</div>
            <div>- Enemies take 16% ➔ 18% more Lightning DMG from PAWS (independent).</div>
          </td>
          <td class="p-3 text-center">DPS</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3 text-center font-bold text-yellow-300">SS</td>
          <td class="p-3 space-y-2">
            <div>- UNLOCK: During AR Charging, if AR is full, PAWS Ultimate no longer consumes SP (until SO is activated).</div>
            <div>- Gain Total DMG +15% ➔ 25% against PSY enemies.</div>
            <div>- During AR Charging, if AR Intensity > 145, enemies take 14% ➔ 22% more Lightning DMG from PAWS.</div>
          </td>
          <td class="p-3 text-center">DPS</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3 text-center font-bold text-yellow-300">SS1</td>
          <td class="p-3">
            As leader: During SO, when team triggers Facet of Infinitude 1/2/3 times, Team Lightning DMG +28%/28%/47% ➔ +30%/30%/50%.
          </td>
          <td class="p-3 text-center">DPS</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3 text-center font-bold text-yellow-300">SS2</td>
          <td class="p-3">
            As leader: Enemies take 8.5% ➔ 10% more Total DMG from PAWS, additional +17% ➔ 20% during AR Charging.
          </td>
          <td class="p-3 text-center">DPS</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3 text-center font-bold text-yellow-300">SS3</td>
          <td class="p-3 space-y-2">
            <div>Leader Skill:</div>
            <div>- PAWS Lightning DMG +18% ➔ 26%.</div>
            <div>- Enemies take 18% ➔ 20% more Lightning DMG from PAWS (independent).</div>
          </td>
          <td class="p-3 text-center">DPS</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3 text-center font-bold text-red-400">SSS</td>
          <td class="p-3">
            During AR Charging, if AR Intensity > 145, enemies take 22% ➔ <strong>230%</strong> more Lightning DMG from PAWS.
          </td>
          <td class="p-3 text-center">DPS</td>
        </tr>
      </tbody>
    </table>
  </div>
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
              <p>	Gain Total DMG +10% ➔ 15% against PSY enemies.	
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
              <p>		- UNLOCK: Gain 1 extra Weapon Skill charge and Evasion Skill charge. <br/>
                - As leader: During SO, when team triggers Facet of Infinitude 1/2/3 times, Team Lightning DMG +26%/26%/44% ➔ +28%/28%/47%. <br/>
                - As leader: Enemies take 7% ➔ 8.5% more Total DMG from PAWS, additional +14% ➔ 17% during AR Charging.
              </p>
              <p class="mt-2"><strong>Good for:</strong> DPS</p>
            </div>
          </div>

        

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(3)}>
            <span>S3</span>
            <span class="text-md">{openItem === 3 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 3 ? 'open' : ''}">
            <p>Leader Skill:<br/>
              - PAWS Lightning DMG +10% ➔ 18%.<br/>
              - Enemies take 16% ➔ 18% more Lightning DMG from PAWS (independent).
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
            <p>	
- UNLOCK: During AR Charging, if AR is full, PAWS Ultimate no longer consumes SP (until SO is activated). <br/>
- Gain Total DMG +15% ➔ 25% against PSY enemies. <br/>
- During AR Charging, if AR Intensity > 145, enemies take 14% ➔ 22% more Lightning DMG from PAWS.

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
            <p>As leader: During SO, when team triggers Facet of Infinitude 1/2/3 times, Team Lightning DMG +28%/28%/47% ➔ +30%/30%/50%.</p>
            <p class="mt-2"><strong>Good for:</strong> DPS
            </p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(6)}>
            <span>SS2</span>
            <span class="text-md">{openItem === 6 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 6 ? 'open' : ''}">
            <p>As leader: Enemies take 8.5% ➔ 10% more Total DMG from PAWS, additional +17% ➔ 20% during AR Charging.
            </p>
            <p class="mt-2"><strong>Good for:</strong> DPS</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(7)}>
            <span>SS3</span>
            <span class="text-md">{openItem === 7 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 7 ? 'open' : ''}">
            <p>	Leader Skill: <br/>
              - PAWS Lightning DMG +18% ➔ 26%.<br/>
- Enemies take 18% ➔ 20% more Lightning DMG from PAWS (independent).
            <p class="mt-2"><strong>Good for:</strong> DPS</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(8)}>
            <span>SSS</span>
            <span class="text-md">{openItem === 8 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 8 ? 'open' : ''}">
            <p>	During AR Charging, if AR Intensity > 145, enemies take 22% ➔ 230% more Lightning DMG from PAWS. </p>
            <p class="mt-2"><strong>Good for:</strong> DPS
            </p>
          </div>
        </div>


    </div>
        {/if}
      {/if}

      {#if selectedTab === 'How to Play'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">HOW TO PLAY</h2>
      <div class=" gap-6 mt-4">
        <!-- Video 1 with title and description -->
        <div class="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">DPS Rotation - Full team (BADUM PS)</h2>

          <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">Full team rotation example</p>

          <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/CswFcEddAjc"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                loading="lazy"
                >
            </iframe>
        </div>
      </div>

    </div>

          <div class=" gap-6 mt-10">
        <!-- Video 1 with title and description -->
        <div class="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">DPS Rotation - Missing a teammate with Symbiosis tag (HOH CORALIE)</h2>

          <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">Incomplete team rotation example</p>

          <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/DD-CDUr3qls"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                loading="lazy"
                >
            </iframe>
        </div>
      </div>

    </div>

          <div class=" gap-6 mt-10">
        <!-- Video 1 with title and description -->
        <div class="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">Law of Ascension Support Sequence</h2>


          <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/O42uJ2_H5eQ"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                loading="lazy"
                >
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
    <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">Planar Armament DPS</h2>

    <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">With various support combinations</p>

    <div class="relative overflow-hidden" style="padding-top: 56.25%;">
      <iframe
      loading="lazy" 

          class="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/qtxw9khxLp4"
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
      <div class="chat-bubble chat-bubble-primary text-base text-white">I am missing a team member with Symbiosis tag. What valk should I use as support?</div>
    </div>

    <div class="chat chat-end">
      <div class="chat-image avatar">
        <div class="w-10 sm:w-12 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="/images/ds.webp" />
        </div>
      </div>
      <div class="chat-bubble chat-bubble-neutral text-base text-white py-5">
If you are missing a teammate with Symbiosis tag, you can use Rite of Oblivion characters: Lone Planetfarer, Herrscher of Finality or Valkyrie Blastmetal. During Stellar Outburst, you cannot do a full rotation since you won't have enough sp, so just do one PAWS sequence, and end Stellar Outburst early. (See How to Play section for an example).      </div>
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

