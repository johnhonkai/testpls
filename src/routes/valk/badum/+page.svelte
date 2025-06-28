
<svelte:head>
  <title>Ba-dum! Fiery Wishing Star</title> 

    <meta property="og:title" content="Kiana - Ba-dum! Fiery Wishing Star" />
    <meta property="og:description" content="Ba-dum! Fiery Wishing Star Guides, Builds and Gameplay" />
    <meta property="og:image" content="https://i.imgur.com/vh5MDfJ.png" />
    <meta property="og:url" content="https://marisaimpact.com/valk/badum" />
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

import Lightbox from '$lib/components/lightbox.svelte';



    import likesData from '$lib/data/likes.json'; // Import local JSON data

  import { goto } from '$app/navigation';

	import Dududps from '$lib/components/lineup/dududps.svelte';
	import Lanterndps from "$lib/components/lineup/lanterndps.svelte";
	import Jddps from "$lib/components/lineup/jddps.svelte";
	import Thelemadps from "$lib/components/lineup/thelemadps.svelte";
	import Badumdps from "$lib/components/lineup/badumdps.svelte";
	import Senadps from "$lib/components/lineup/senadps.svelte";
	import Simpdps from "$lib/components/lineup/simpdps.svelte";
	import Sparkledps from "$lib/components/lineup/sparkledps.svelte";
	import CharBio from "$lib/components/CharBio.svelte";
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
 // { name: 'How to Play', short: 'howtoplay', icon: faBook },
  { name: 'Gameplay', short: 'example', icon: faVideo },
  { name: 'Elysian Realm', short: 'er', icon: faFire },
  { name: 'Rank Up', short: 'rank', icon: faStar },
  { name: 'Question', short: 'qna' , icon: faComments  },
 // { name: 'Overview Card', short: 'card' },
 // { name: 'TL Error', short: 'translation', icon: faTriangleExclamation  },
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
  let durandallikes = likesData["badum"] || 0; // Get initial likes from JSON
  const charName = "badum"; // Route name for this character
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


<!-- Left: Character Image -->
<div class="relative w-auto h-48 sm:h-60 flex justify-center mt-4 sm:mt-15" id="valkpicbox">
  <!-- Image for Larger Screens -->
  <img src="/images/valkfull/bw.webp" alt="Durandal" class="h-full w-auto object-cover md:object-contain  " style ="view-transition-name: valkyrie-image-53;"/> 
 <!-- Like Button: Bottom-right overlay -->
 <div class="absolute bottom-2 right-2 z-10">
  <div
    class="tooltip tooltip-left"
    data-tip={hasLiked ? "You already liked this!" : "Click to like"}
  >
    <button
      on:click={increaseLike}
      disabled={hasLiked}
      class="bg-red-800/70 hover:bg-red-700 transition-colors rounded-full px-3 py-1 flex items-center gap-1 text-white text-sm shadow-md"
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
<div class="flex flex-col items-center text-center justify-start sm:mt-10">
  <h1 class="text-xl md:text-2xl text-white mt-4 mb-2 italic font-russoone">Ba-dum! Fiery Wishing Star</h1>

  <!-- Character Info Cards -->
  <div class="space-y-2 w-[260px] md:w-[300px]">
    <!-- Name Card -->
    <div class="flex rounded-lg overflow-hidden shadow-md">
      <div class="bg-red-800 text-white px-4 py-1 w-28 flex items-center justify-center font-semibold text-xs ">
        Name
      </div>
      <div class="bg-slate-100 text-black px-3 py-1 flex-1 flex items-center text-xs  font-medium">
        Kiana Kaslana
      </div>
    </div>

    <!-- Release Date Card -->
    <div class="flex rounded-lg overflow-hidden shadow-md">
      <div class="bg-red-800 text-white px-4 py-1 w-28 flex items-center justify-center font-semibold text-xs ">
        Release
      </div>
      <div class="bg-slate-100 text-black px-3 py-1 flex-1 flex items-center text-xs  font-medium">
        v8.1 (20 Feb 2025)
      </div>
    </div>
  </div>

  <!-- Tags / Type Row -->
  <CharBio mode="dps" rank="s" type="sd" element="fire" ar="loa" bg="bg-red-800" />

  <!-- Support Section -->
  <CharBio mode="support" ar={['goi' , 'loa' , 'ws']}  bg="bg-red-800"/>
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
              <br/>Badum is a Stardust Fire DPS with team-wide damage link utility.
            </p>


            <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">Team-wide Damage Link</strong> 
            </p>
              <ul class="list-disc ml-6 text-sm sm:text-base">
                <li>Against multiple enemies, Badum enables the team to share a portion of the dmg dealt between the enemies. </li>
                <li>This utility is not restricted to a specific Astral Ring specialization.</li>

            </ul>

            <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">SD Counter</strong> <br/>Against SD enemy, Badum can immediately reduce 8% of the enemy's Max HP.
    
          </p>

            <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">World Star Support</strong> <br/>Can trigger Domain Resonance very fast.
    
          </p>
          <div class="divider"></div>
          <!-- Pull Recommendation Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">PULL RECOMMENDATION</h2>
          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">New / F2P Players</strong> <br/> Not recommended. Due to how Part 2 works, it is better to pull the newest S-rank in the patch..
            </p>
            
            <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">Competitive / Spending Players</strong> <br/> 
            </p>
            <ul class="list-disc ml-6 text-sm sm:text-base">
              <li class="mt-2">As DPS, Badum top scores four bosses in 8.1: SD Guaymas, SD Sa, Flux Homu, and Flux Andrius. Just like other Part 2 valks, she might get more bosses in the future.</li>
              <li class="mt-2">For Law of Ascension teams, Badum support will be used in stages with mobs. For example, the new Physical weather HoD Minion boss.</li>
              <li class="mt-2">For World Star teams, currently, there's no live data for Badum support in resonance teams. Badum is definitely the best support to use against mobs. For bosses, Badum triggers resonance marks very quickly, so she might replace HoFi, or Badum and HoFi might even be used together.</li>
              <li class="mt-2">Badum will also be a support for a future Astral Ring.</li>

          </ul>
          <div class="divider  "></div>
          <!-- How to Get Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">HOW TO GET</h2>
          <ul class="list-disc ml-6 text-sm sm:text-base ">
              <li ><strong>Badum:</strong> Battlesuit Supply</li>
              <li><strong>Badum's Weapon:</strong> Equipment Supply</li>
              <li><strong>Badum's Stigma:</strong> Equipment Supply, Forgeable</li>
          </ul>
          <div class="divider  "></div>
          <!-- Full Guide Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">FULL GUIDE</h2>
          <p class="mt-2 text-sm sm:text-base pb-4">
              Check out the full guide on YouTube: (Coming Soon)
          </p>

      </div>
  {/if}
  

  {#if selectedTab === 'Lineup'}
  <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">LINEUP</h2>

  <section class="max-w-(--breakpoint-lg) mx-auto ">




      {#if currentPage === 1}
      <!-- Category 1: Vita DPS -->

      <Badumdps maindps={true} ></Badumdps>

      <div class="divider divider-accent text-xl custom-font tracking-wider text-teal-300 mt-16"> Law of Ascension Support </div>
      <Dududps firstCharName="BW"></Dududps>

      <div class="divider divider-accent text-xl custom-font tracking-wider text-teal-300 mt-16"> World Star Support </div>

      <Sparkledps firstCharName="Badum"></Sparkledps>

      <div class="divider  "></div>

      <Simpdps firstCharName="Badum"></Simpdps>

      <div class="divider  "></div>

      <Senadps firstCharName="Badum"></Senadps>

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
            <img src="https://act-upload.mihoyo.com/bh3-wiki/2025/01/12/50494840/a4b99262b96c85a84a800620d6e83105_330124851219025067.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
        </div>

        <div class="w-20 h-20 sm:w-28 sm:h-28">
          <img src="https://act-upload.mihoyo.com/bh3-wiki/2025/01/17/50494840/48a3cc392db80656d6b2631c6c1d9056_1797221286176213951.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
      </div>

      <div class="w-20 h-20 sm:w-28 sm:h-28">
          <img src="https://act-upload.mihoyo.com/bh3-wiki/2025/01/17/50494840/f078f402393b4aefade874bbc004fc76_5628784475137967388.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
      </div>

      <div class="w-20 h-20 sm:w-28 sm:h-28">
          <img src="https://act-upload.mihoyo.com/bh3-wiki/2025/01/17/50494840/461d39badbdcb91183a97c7d4fd4f347_5545063515496532811.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
      </div>

        </div>  
        <h4 class="text-base sm:text-base text-white"> Fortuitous Red + Happy Days Ahead set</h4>
        </div>



     </div>

     <div>



      <div class="p-4 mt-4 bg-linear-to-r from-red-950/75 to-red-900/75 rounded-sm">
        <p class="text-sm sm:text-base text-left mb-4">
          <b>Fortuitous Red </b><br/> - A powerful weapon for Badum, huge buffs.
          <br/>- Gives Stellar Shift time stop.
        </p>

        <p class="text-sm sm:text-base text-left mb-4">
          <b>Happy Days Ahead set</b><br/> - Huge buffs.
          <br/> - Forgeable in Foundry.
        </p>

        <p class="text-sm sm:text-base text-left">
          <b>Affix</b> <br/>Full ATK.
        </p>
      </div>


      </div>
      {/if}

      {#if selectedTab === 'Support Buffs'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">SUPPORT BUFFS</h2>
      <div class="flex flex-wrap gap-4 mt-8">
        <!-- Example image list for support buffs; add your own image sources -->
        <img
          src="https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/guidepics//Badum%20Buff.webp"
          alt="Buff 1"
          class=" object-cover cursor-pointer"
          on:click={() => openLightbox('https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/guidepics//Badum%20Buff.webp')}
        />
      </div>
      
      <div class="my-5 text-sm sm:text-base text-slate-100 space-y-4">
        <p class="mb-4 font-semibold">How to activate Badum support buffs:</p>
        
          <div>
            <p class="font-semibold text-orange-300  mt-6">DMG Share Link</p>
            <p>- Combo ATK, Weapon Skill and Immaculate Duet will apply the DMG share link to enemies. <br/>
              - In Law of Ascension team, during Stellar Shift, bang drum with the proper button prompt will apply the link too.
            </p>
          </div>

          <div>
            <p class="font-semibold text-orange-300 mt-6">Badum Stigma Buff</p>
           <p>Combo ATK or QTE triggers an important stigma buff [Let's Have Fun!] for 25s. This is also activated / refreshed upon Stellar Outburst activation.</p>
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
        DRUM SMASH
      </button>


        <button
          on:click={() => setPlaystyle('2')}
          class={`btn px-4 py-2 font-semibold rounded-sm ${activePlaystyle === '2' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-linear-to-r from-orange-600 to-amber-500 hover:text-white'}`}
        >
        DRUM JUMP
        </button>
      

      </div>
    
      {#if activePlaystyle === '2'}
      <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">Drum Jump Playstyle</h2> 
      <p class="text-sm sm:text-base text-center sm:text-left">
       A fun playstyle where you just jump and jump and jump! Weaker than the Drum Smash playstyle.
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
            <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Fulfilled Wishes ➔ Pleasant Dreams  </p>
            <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b>   Serendipitous Luck </p>
          </div>
        </div>
        
      </div>
      <div class="mt-3 rounded-sm" >
        <p class="text-sm sm:text-base text-left">
          <li class="text-sm sm:text-base"> ER Lite mode: Equip Because of You sigil and get all three Ego signets on Floor 7.</li>
          <li class="text-sm sm:text-base"> Normal mode: This playstyle is a little weak, so it's recommended to get both signets. You can get both Ego signets at the start by using Thorny Crown sigil, OR by resetting Floor 1 until you get another Ego portal, OR use Because of You support sigil and get the other two Ego signets on Floor 7.</li>
      </p>
        </div>
  
        <div class="divider  "></div>
        <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
        <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
          <!-- First Signet with 'Start' text -->
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
              <img src="/images/signets/Signets of Infinity (Mobius).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">

              <p class="text-lg font-semibold">1</p>
            </div>
  
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Deliverance (Kevin).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">1</p>
            </div>
  
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Helix (Vill-V).png" alt="Signet 5" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold ">2</p>
            </div>
  
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Setsuna (Sakura).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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
              <img src="/images/sigils/Forbidden_Seed.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/sigils/Because_of_You.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            </div>
            <p class="text-base sm:text-lg font-semibold">START</p>
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
              <img src="/images/sigils/The_First_Scale.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/sigils/Dreamful_Gold.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              </div>
            <p class="text-base sm:text-lg font-semibold">FINAL</p>
        </div>
  
  
        </div>
  
        
        <div class="divider  "></div>
        <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">HOW TO PLAY</h2>
  
        <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>Use Ult</li>
          <li>Spam jump button until all drums explode, then you will autocast Combo ATK</li>
          <li>Repeat</li>
          <li>Against multiple enemies or when a new wave starts, use weapon first at the start to apply damage share link</li>
        </ol>
      {/if}
  
      {#if activePlaystyle === '1'}
      <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">Drum Smash Playstyle</h2> 
      <p class="text-sm sm:text-base text-center sm:text-left">
       Stronger playstyle.
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
            <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Great Fortune ➔ Dazzling Joy</p>
            <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b>   Serendipitous Luck </p>
          </div>
        </div>
        
      </div>
      <div class="mt-3 rounded-sm" >
        <p class="text-sm sm:text-base text-left">
          <li class="text-sm sm:text-base"> ER Lite mode: Equip Because of You sigil and get all three Ego signets on Floor 7.</li>
          <li class="text-sm sm:text-base"> Normal mode: You can complete the run with just one Ego signet (Great Fortune), but having both Ego signets is a big improvement. You can get both Ego signets at the start by using Thorny Crown sigil, OR by resetting Floor 1 until you get another Ego portal, OR use Because of You support sigil and get the other two Ego signets on Floor 7.</li>
      </p>
        </div>
  
        <div class="divider  "></div>
        <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
        <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
          <!-- First Signet with 'Start' text -->
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
              <img src="/images/signets/Signets of Decimation (Kalpas).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">1</p>
            </div>
  
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Vicissitude (Hua).png" alt="Signet 5" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold ">2</p>
            </div>
  
  
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Setsuna (Sakura).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">2</p>
            </div>
  
  
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Stars (Griseo).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">2</p>
            </div>
  
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Reverie (Pardofelis).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">1</p>
            </div>
  
        </div>
        <div class="mt-3 rounded-sm" >
          <p class="text-sm sm:text-base text-left">
            <b>Decimation 1:</b> Your HP will be very low. Build Vicissitude 2 for survivability. <br/>
            <b>Decimation 1:</b> Get [Burden, Difficulty, and Calamity] enhancement signet as soon as you can to keep your HP low.
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
              <img src="/images/sigils/Memory.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/sigils/An_Old_Pals_Legacy.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            </div>
            <p class="text-base sm:text-lg font-semibold">MID</p>
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
          <li>Use Stellar Outburst (Stellar Shift).</li>
          <li>Press ATK until meter is full ➔ Press weapon. Do this one more time.</li>
          <li>Repeat.</li>
          <li>Optional: You can use Ultimate to finish off a wave.</li>
        </ol>
  
  
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
              <li>S2 and SS: Higher DMG share ratio for linked enemies. </li>
              <li>All ranks have damage upgrades.</li>
            </ul>
          </div>
      
          <!-- Support Upgrade Box -->
          <div class="flex-1 p-2 bg-gray-800 rounded-lg shadow-md border border-yellow-400">
            <h3 class="text-lg font-semibold text-yellow-400 mb-2">Support Upgrade</h3>
            <ul class=" text-slate-100 text-base">
              <li>S2 and SS: Higher DMG share ratio for linked enemies. </li>
              <li>S2: Unlocks time fracture on demand. </li>

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
                  For every Critical Value detonated, SD enemies take 4 ➔ 5% more Total DMG from Weapon Skill and Immaculate Duet. Max 20% ➔ 40%.
                </td>
                <td class="p-3">DPS </td>
              </tr>
              <!-- Sample Row 2 -->
              <tr>
                <td>S2</td>
                <td>

                  - UNLOCK: Combo ATK, Weapon Skill and Basic SEQ 4 can trigger evasion skill.
                  <br/>
                  - Linked enemies share 6% ➔ 7% of DMG. If Badum is the leader, the DMG share ratio for Badum's own damage is 15% ➔ 16%.
                  <br/>
                  - When an enemy on the field is hit by Badum’s Combo ATK or Stellar Shift, the enemy takes 11% ➔ 18% more Total DMG from Badum's Weapon Skill and Ultimate.
                  <br/>
                  - When LoA is active: During Merriment, Badum Total DMG +10%  ➔ 13%.

                </td>
                <td>DPS<br/>Support<br/>Time fracture on demand</td>
              </tr>
              <tr>
                <td>S3</td>
                <td>
                  Leader Skill:<br/>
                  - Badum's Stellar Shift Fire DMG +15% ➔ 25%.
                  <br/>
                  - Enemies take 14% ➔ 15% more Fire DMG from Badum (independent multiplier).

                </td>
                <td>DPS</td>
              </tr>
              <tr>
                <td>SS</td>
                <td>
                  - UNLOCK: Upon QTE entry, Badum gain 40 Fortune and 10 sp.
                  <br/>
                  - Self Fire DMG +20% ➔ 25%. Passion mark explosion deals additional 480% ➔ 540% ATK of Fire DMG. Ult and Immaculate Duet deal additional 500% ➔ 600% ATK of Fire DMG.
                  <br/>
                  - Linked enemies share 7% ➔ 8% of DMG. If Badum is the leader, the DMG share ratio for Badum's own damage is 16% ➔ 17%.
                </td>
                <td>DPS<br/>Support</td>

              </tr>
              <tr>
                <td>SS1</td>
                <td>
                  When LoA is active: During Merriment, Badum Total DMG +13%  ➔ 15%.
                </td>
                <td>DPS
              </tr>
              <tr>
                <td>SS2</td>
                <td>
                  When an enemy on the field is hit by Badum’s Combo ATK or Stellar Shift, the enemy takes 18% ➔ 20% more Total DMG from Badum's Weapon Skill and Ultimate.

                
                
                </td>
                <td>DPS </td>
              </tr>
              <tr>
                <td>SS3</td>
                <td>
                  Leader Skill:<br/>
                  - Badum's Stellar Shift Fire DMG +25% ➔ 35%.
                  <br/>
                  - Enemies take 15% ➔ 16% more Fire DMG from Badum (independent multiplier).
                </td>
                <td>DPS
              </tr>
              <tr>
                <td>SSS</td>
                <td>
                  - UNLOCK: Upon casting QTE or Stellar Shift, reset evasion cd.
                  <br/>
                  - Self Fire DMG +25% ➔ 30%. Passion mark explosion deal additional 540% ➔ 600% ATK of Fire DMG. Ult and Immaculate Duet deals additional 600% ➔ 700% ATK of Fire DMG
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
              <p>	For every Critical Value detonated, SD enemies take 4 ➔ 5% more Total DMG from Weapon Skill and Immaculate Duet. Max 20% ➔ 40%.
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
              <p>	- UNLOCK: Combo ATK, Weapon Skill and Basic SEQ 4 can trigger evasion skill.<br/>
                - Linked enemies share 6% ➔ 7% of DMG. If Badum is the leader, the DMG share ratio for Badum's own damage is 15% ➔ 16%.<br/>
                - When an enemy on the field is hit by Badum’s Combo ATK or Stellar Shift, the enemy takes 11% ➔ 18% more Total DMG from Badum's Weapon Skill and Ultimate.<br/>
                - When LoA is active: During Merriment, Badum Total DMG +10% ➔ 13%.
              </p>
              <p class="mt-2"><strong>Good for:</strong> DPS, Support, Time fracture on demand</p>
            </div>
          </div>

        

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(3)}>
            <span>S3</span>
            <span class="text-md">{openItem === 3 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 3 ? 'open' : ''}">
            <p>Leader Skill:<br/>
              - Badum's Stellar Shift Fire DMG +15% ➔ 25%.<br/>
              - Enemies take 14% ➔ 15% more Fire DMG from Badum (independent multiplier).	
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
            <p>- UNLOCK: Upon QTE entry, Badum gain 40 Fortune and 10 sp.<br/>
              - Self Fire DMG +20% ➔ 25%. Passion mark explosion deals additional 480% ➔ 540% ATK of Fire DMG. Ult and Immaculate Duet deal additional 500% ➔ 600% ATK of Fire DMG.<br/>
              - Linked enemies share 7% ➔ 8% of DMG. If Badum is the leader, the DMG share ratio for Badum's own damage is 16% ➔ 17%.
            </p>
            <p class="mt-2"><strong>Good for:</strong> DPS, Support</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(5)}>
            <span>SS1</span>
            <span class="text-md">{openItem === 5 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 5 ? 'open' : ''}">
            <p>When LoA is active: During Merriment, Badum Total DMG +13% ➔ 15%.</p>
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
            <p>When an enemy on the field is hit by Badum’s Combo ATK or Stellar Shift, the enemy takes 18% ➔ 20% more Total DMG from Badum's Weapon Skill and Ultimate.
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
            <p>Leader Skill:<br/>
              - Badum's Stellar Shift Fire DMG +25% ➔ 35%.<br/>
              - Enemies take 15% ➔ 16% more Fire DMG from Badum (independent multiplier).
            <p class="mt-2"><strong>Good for:</strong> DPS</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(8)}>
            <span>SSS</span>
            <span class="text-md">{openItem === 8 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 8 ? 'open' : ''}">
            <p>		- UNLOCK: Upon casting QTE or Stellar Shift, reset evasion cd. <br/>
              - Self Fire DMG +25% ➔ 30%. Passion mark explosion deal additional 540% ➔ 600% ATK of Fire DMG. Ult and Immaculate Duet deals additional 600% ➔ 700% ATK of Fire DMG.	</p>
            <p class="mt-2"><strong>Good for:</strong> DPS
            </p>
          </div>
        </div>


    </div>
        {/if}
      {/if}

      {#if selectedTab === 'How to Play'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">HOW TO PLAY</h2>
  

  {/if}
  
  
 {#if selectedTab === 'Gameplay'}
 <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">GAMEPLAY EXAMPLES</h2>

 <div class=" gap-6 mt-5 mb-10">
  <!-- Video 1 with title and description -->


  <div class="bg-gray-800 p-4 rounded-lg shadow-md">
    <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">Badum DPS and Senadina Support</h2>

    <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">VS SD Sa Boss</p>

    <div class="relative overflow-hidden" style="padding-top: 56.25%;">
      <iframe
      loading="lazy" 

          class="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/iSNZDuTlVDM"
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

  <div class="text-center my-4">
    <p class="text-center text-sm sm:text-base">No popular question
    </p>
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

