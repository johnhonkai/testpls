
<svelte:head>
  <title>Rita - 窈窕谍影</title> 

    <meta property="og:title" content="Rita - 窈窕谍影" />
    <meta property="og:description" content="窈窕谍影 Guides, Builds and Gameplay" />
    <meta property="og:image" content="https://i.imgur.com/PcEAThD.png" />
    <meta property="og:url" content="https://marisaimpact.com/valk/agent-rita" />
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
	import Coraliedps from "$lib/components/lineup/coraliedps.svelte";
	import Vitadps from "$lib/components/lineup/vitadps.svelte";
	import Newelydps from "$lib/components/lineup/hilovedps.svelte";
	import CharacterLayout from "$lib/components/valkpage/CharacterLayout.svelte";
	import Horbdps from "$lib/components/lineup/horbdps.svelte";
	import Sparkledps from "$lib/components/lineup/sparkledps.svelte";
	import Simpdps from "$lib/components/lineup/simpdps.svelte";
	import Senadps from "$lib/components/lineup/senadps.svelte";
	import Horbdlcdps from "$lib/components/lineup/horbdlcdps.svelte";
	import Hilovedps from "$lib/components/lineup/hilovedps.svelte";
	import Hohdps from "$lib/components/lineup/hohdps.svelte";
	import Jddps from "$lib/components/lineup/jddps.svelte";
	import Lanterndps from "$lib/components/lineup/lanterndps.svelte";
	import Thelemadps from "$lib/components/lineup/thelemadps.svelte";
	import Agentritadps from "$lib/components/lineup/agentritadps.svelte";

  let selectedTab = 'Overview'; // Default tab
  const tabs = [
  { name: 'Overview', short: 'overview', icon: faHome },
  { name: 'Lineup', short: 'lineup', icon: faUsers },
//  { name: 'Equipment', short: 'equipment', icon: faBolt  },
//  { name: 'Support Buffs', short: 'support', icon: faCircleUser },
//  { name: 'How to Play', short: 'howtoplay', icon: faBook },
//  { name: 'Gameplay', short: 'example', icon: faVideo },
//  { name: 'Elysian Realm', short: 'er', icon: faFire },
//  { name: 'Rank Up', short: 'rank', icon: faStar },
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

// Track the active playstyle tab
let activeLineup = '1';

// Function to switch tabs
function setLineup(lineup) {
activeLineup = lineup;
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
  let durandallikes = likesData["agentrita"] || 0; // Get initial likes from JSON
  const charName = "agentrita"; // Route name for this character
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
    background: radial-gradient(rgb(var(--light-purple-rgb)), rgb(var(--dark-purple-rgb)));
    height: 100%;  
    overflow: hidden;
    position: relative;
  }

  #star-gradient-overlay {
    background: radial-gradient(circle, transparent 75%, rgb(var(--dark-purple-rgb)));
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


<CharacterLayout
  charName="agentrita"
  initialLikes={likesData["agentrita"] || 0}
  accent="bg-violet-800"
  image="/images/valkfull/agent_rita.png"
  alt="Messenger of Love"
  title="窈窕谍影"
  name="Rita Rossweisse "
  release="v8.6 (1 Jan 2026)"
>
  <CharBio mode="dps" rank="s" type="img" element="lightning" ar="wod" bg="bg-violet-800" />
  <CharBio mode="support" ar={['wod']} bg="bg-violet-800" />
</CharacterLayout>




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
              <strong class="text-amber-400">DPS</strong> 
              <br/>
              To Be Updated
          </p>
      
          
            <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">Utilities</strong>
              <br/>
              To Be Updated
            </p>   

            
          <div class="divider  "></div>
          <!-- Pull Recommendation Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">PULL RECOMMENDATION</h2>

          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">Everyone</strong> <br/> Recommended to get New Rita in v8.6.
            </p>


          <div class="divider  "></div>
          <!-- How to Get Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">HOW TO GET</h2>
          <ul class="list-disc ml-6 text-sm sm:text-base ">
              <li ><strong>Battlesuit:</strong> Battlesuit Supply</li>
              <li><strong>Weapon:</strong> Equipment Supply</li>
              <li><strong>Stigma:</strong> Equipment Supply, Forgeable, Free stigma box in 8.6</li>
          </ul>
          <div class="divider  "></div>
          <!-- Full Guide Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">FULL GUIDE</h2>
          <p class="mt-2 text-sm sm:text-base pb-4">
            Check out the full guide on YouTube: (SOON)
        </p>
  


      </div>

  {/if}
  

  {#if selectedTab === 'Lineup'}
  <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">LINEUP</h2>

  <section class="max-w-(--breakpoint-lg) mx-auto ">
  
<div class="grid gap-4 my-6 
            grid-cols-2 
            md:grid-cols-4 
            w-full max-w-4xl mx-auto">
  <button
    on:click={() => setLineup('1')}
    class={`btn w-full px-4 py-2 font-semibold rounded-sm 
      ${activeLineup === '1' 
        ? 'bg-blue-500 text-white' 
        : 'bg-gray-300 text-gray-700 hover:bg-gradient-to-r from-orange-600 to-amber-500 hover:text-white'}`}
  >
    DPS
  </button>



  <button
    on:click={() => setLineup('2')}
    class={`btn w-full px-4 py-2 font-semibold rounded-sm leading-3 
      ${activeLineup === '2' 
        ? 'bg-blue-500 text-white' 
        : 'bg-gray-300 text-gray-700 hover:bg-gradient-to-r from-orange-600 to-amber-500 hover:text-white'}`}
  >
    WHEEL OF DESTINY
  </button>

  <button
    on:click={() => setLineup('3')}
    class={`btn w-full px-4 py-2 font-semibold rounded-sm 
      ${activeLineup === '3' 
        ? 'bg-blue-500 text-white' 
        : 'bg-gray-300 text-gray-700 hover:bg-gradient-to-r from-orange-600 to-amber-500 hover:text-white'}`}
  >
    TBA
  </button>

    <button
    on:click={() => setLineup('4')}
    class={`btn w-full px-4 py-2 font-semibold rounded-sm 
      ${activeLineup === '4' 
        ? 'bg-blue-500 text-white' 
        : 'bg-gray-300 text-gray-700 hover:bg-gradient-to-r from-orange-600 to-amber-500 hover:text-white'}`}
  >
    TBA
  </button>
</div>

      {#if activeLineup === '1'}
      <Agentritadps></Agentritadps>

      {/if}

      {#if activeLineup === '3'}
 
      {/if}

      {#if activeLineup === '2'}
      
      <Hohdps></Hohdps>
      
      <div class="divider"></div>

      <Jddps></Jddps>

      <div class="divider"></div>

      <Lanterndps></Lanterndps>

      <div class="divider"></div>

       <Thelemadps></Thelemadps>    
      {/if}

      {#if activeLineup === '3'}
 
      {/if}

      {#if activeLineup === '4'}
 
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
            <img src="https://act-upload.mihoyo.com/bh3-wiki/2025/09/06/50494840/7084c24f9a180d4134dfdbbcedb0e519_2837778973542954242.png" alt="Rainbow" class="w-full h-full object-cover">
        </div>

        <div class="w-20 h-20 sm:w-28 sm:h-28">
          <img src="https://act-upload.mihoyo.com/bh3-wiki/2025/09/06/9809137/f69aef9d7978e0fc42e3c9dc4bbc789e_7109954917620704708.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Stigma" class="w-full h-full object-cover">
      </div>

      <div class="w-20 h-20 sm:w-28 sm:h-28">
          <img src="https://act-upload.mihoyo.com/bh3-wiki/2025/09/07/9809137/c967405c380d313b8a7e498226a24e5b_6708046003772475196.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Stigma" class="w-full h-full object-cover">
      </div>

      <div class="w-20 h-20 sm:w-28 sm:h-28">
          <img src="https://act-upload.mihoyo.com/bh3-wiki/2025/09/06/9809137/0b0aa7d5f6017abd8010a02c1728c44a_3920350585847776207.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Stigma" class="w-full h-full object-cover">
      </div>

        </div>  
        <h4 class="text-base sm:text-base text-white"> Pure Love's Whisper + Blissful Days set</h4>
        </div>



     </div>

     <div>



      <div class="p-4 mt-4 bg-linear-to-r from-pink-950/75 to-pink-900/75 rounded-sm">
        <p class="text-sm sm:text-base text-left mb-4">
          <b>Pure Love's Whisper</b><br/> - Best weapon for HLE, huge self buffs and team buffs.
          <br/>- Important utility during AR Charging: After casting weapon skill, gives enough sp to do full charge Ult.
        </p>

        <p class="text-sm sm:text-base text-left mb-4">
          <b>Blissful Days set</b><br/> - Huge buffs.
          <br/> - Forgeable in Foundry.
        </p>

        <p class="text-sm sm:text-base text-left">
          <b>Affix</b> <br/>Full ATK.
        </p>
      </div>


      </div>

      <div class="divider  "></div>

<div class="text-slate-100">
  <h2 class="text-xl font-semibold mb-4 cooltext">Weapon DMG Test - HLE DPS</h2>
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
          <td class="p-3">Pure Love's Whisper  Syn3</td>
          <td class="p-3 text-right">50,019,712</td>
          <td class="p-3 text-right text-teal-400">107.43%</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3">Pure Love's Whisper   Syn2</td>
          <td class="p-3 text-right">48,280,960</td>
          <td class="p-3 text-right text-teal-400">103.70%</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3">Pure Love's Whisper   Syn1 </td>
          <td class="p-3 text-right">46,557,184</td>
          <td class="p-3 text-right text-teal-400">100.00%</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3">Domain of Ego</td>
          <td class="p-3 text-right">34,213,056</td>
          <td class="p-3 text-right text-amber-400">73.49%</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3">Flawless Benediction Syn2</td>
          <td class="p-3 text-right">34,163,968</td>
          <td class="p-3 text-right text-amber-400">73.38%</td>
        </tr>        
        <tr class="hover:bg-gray-700/40">
          <td class="p-3">Whisper of the Past</td>
          <td class="p-3 text-right">32,684,032</td>
          <td class="p-3 text-right text-amber-400">70.20%</td>
        </tr>        
      </tbody>
    </table>
  </div>
</div>

       <div class="divider  "></div>

<div class="text-slate-100">
  <h2 class="text-xl font-semibold mb-4 cooltext">Weapon DMG Test - HoRB Support</h2>
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
          <td class="p-3">Pure Love's Whisper  Syn3</td>
          <td class="p-3 text-right">46,633,344</td>
          <td class="p-3 text-right text-teal-400">103.50%</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3">Pure Love's Whisper   Syn2</td>
          <td class="p-3 text-right">45,853,376</td>
          <td class="p-3 text-right text-teal-400">101.77%</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3">Pure Love's Whisper   Syn1 </td>
          <td class="p-3 text-right">45,055,104</td>
          <td class="p-3 text-right text-teal-400">100.00%</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3">Flawless Benediction Syn2</td>
          <td class="p-3 text-right">40,988,160</td>
          <td class="p-3 text-right text-blue-400">90.97%</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3">Domain of Ego</td>
          <td class="p-3 text-right">39,931,392</td>
          <td class="p-3 text-right text-blue-400">88.62%</td>
        </tr>        
        <tr class="hover:bg-gray-700/40">
          <td class="p-3">Whisper of the Past</td>
          <td class="p-3 text-right">39,696,832</td>
          <td class="p-3 text-right text-blue-400">88.11%</td>
        </tr>  
      </tbody>
    </table>
  </div>
</div>     
      {/if}

      {#if selectedTab === 'Support Buffs'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">SUPPORT BUFFS</h2>


      <div class="my-6  py-5 rounded-xl text-slate-100 space-y-6 text-sm sm:text-base">
        <h3 class="text-lg sm:text-xl font-bold text-center">
          How to Activate HLE Support Buffs
        </h3>
      
        <div class="space-y-2 border-l-4 border-orange-300 pl-4">
          <h4 class="font-semibold text-orange-300 text-base sm:text-lg">Stellar Drain</h4>
          <p class="leading-relaxed">
            - Ultimate consume Stellar Drain. You want to do full charged Ult to get max AR (20).<br/>
            - In WoDestiny teams, casting weapon / ult gives 2 AR.
          </p>
        </div>
      
        <div class="space-y-2 border-l-4 border-orange-300 pl-4">
          <h4 class="font-semibold text-orange-300 text-base sm:text-lg">HLE Stigma Buff</h4>
          <p class="leading-relaxed">
            Weapon or QTE triggers an important stigma buff <span class="text-sky-200 italic">[Heart's Splendor]</span> for 25s. Also activated/refreshed upon <span class="italic text-sky-200">Stellar Outburst </span> activation.
          </p>
        </div>

        <div class="space-y-2 border-l-4 border-orange-300 pl-4">
          <h4 class="font-semibold text-orange-300 text-base sm:text-lg">Wheel of Destiny Buff</h4>
          <p class="leading-relaxed">
            Ultimate triggers a buff for the leader for 30s. Grants Fire and Physical DMG +20% (S) / 42% (S1) , Melee ATK gain Ice and Lightning DMG +28% (S) / 42% (S1) and Enemies take 8% (S) / 15% (S1) more Total DMG from ranged atks from this valk. Also activated/refreshed upon <span class="italic text-sky-200">Stellar Outburst </span> activation.
          </p>
        </div>        

        <div class="space-y-2 border-l-4 border-orange-300 pl-4">
          <h4 class="font-semibold text-orange-300 text-base sm:text-lg">Passive</h4>
          <p class="leading-relaxed">
            The rest of her buffs are activated passively.
          </p>
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
        STELLAR OUTBURST
        </button>

        <button
        on:click={() => setPlaystyle('2')}
        class={ ` btn px-4 py-2 font-semibold rounded-sm ${activePlaystyle === '2' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-linear-to-r from-orange-600 to-amber-500 hover:text-white'}`}
      >
        AR CHARGING
      </button>     

      </div>
    

      {#if activePlaystyle === '1'}
      <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">Stellar Outburst Playstyle</h2> 
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
            <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Glad News + Fragrant Gardens</p>
            <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Golden Arrow </p>
          </div>
        </div>
        
      </div>
      <div class="mt-3 rounded-sm" >
      <p class="text-sm sm:text-base text-left">
          HLE starts with two Ego signets, and regular signets gain +1 level.
      </p>
        </div>
  
        <div class="divider  "></div>
        <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
        <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
          <!-- First Signet with 'Start' text -->

  
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
              <img src="/images/signets/Signets of Gold (Eden).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold ">1</p>
            </div>

            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Deliverance (Kevin).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">1</p>
            </div>

             <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Infinity (Mobius).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">1</p>
            </div>    

            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Vicissitude (Hua).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">2</p>
            </div>

            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Helix (Vill-V).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">1</p>
            </div>

            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Reverie (Pardofelis).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">1</p>
            </div>
  
        </div>

        <div class="mt-3 rounded-sm" >
          <p class="text-sm sm:text-base text-left">
            <span class="text-sky-300">Deliverance</span>: Upgrading Love's Expanse counts as casting Ultimate.
            <br/>
            <span class="text-cyan-300">Infinity</span>: V8.5 ER stage effect summons Flamechaser chibis which count as summoned unit. After v8.5, Infinity is not an optimal signet.

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
              <img src="/images/sigils/Dreamful_Gold.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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
              <img src="/images/sigils/Key_to_the_Deep.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/sigils/Dreamful_Gold.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              </div>
            <p class="text-base sm:text-lg font-semibold">FINAL</p>
        </div>
  
  
        </div>
  
        
        <div class="divider  "></div>
        <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">HOW TO PLAY</h2>
  
        <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>Activate Stellar Outburst</li>
          <li>Weapon x2</li>
          <li>Do full Basic ATK</li>
          <li>Weapon x2</li>
          <li>Activate Ult finisher</li>
          <li>ATK until Stellar Outburst is ready</li>
          <li>Repeat</li>

        </ol>
  
          <p class="mt-8 text-sm sm:text-base pb-4 text-center">
            Check out this showcase from Marisa Honkai:
        </p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/SQhxa_tFglE"
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
       Loop Weapon and Ultimate.
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
            <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Blossoms + Bright Star </p>
            <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Golden Arrow </p>
          </div>
        </div>
        
      </div>
      <div class="mt-3 rounded-sm" >
      <p class="text-sm sm:text-base text-left">
          HLE starts with two Ego signets, and regular signets gain +1 level.
      </p>


        </div>
  
        <div class="divider  "></div>
        <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
        <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
          <!-- First Signet with 'Start' text -->

  
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
              <img src="/images/signets/Signets of Gold (Eden).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold ">1</p>
            </div>

            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Deliverance (Kevin).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">1</p>
            </div>

             <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Infinity (Mobius).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">1</p>
            </div>    

             <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Stars (Griseo).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">2</p>
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
              <img src="/images/sigils/Dreamful_Gold.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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
              <img src="/images/sigils/Key_to_the_Deep.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/sigils/Dreamful_Gold.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              </div>
            <p class="text-base sm:text-lg font-semibold">FINAL</p>
        </div>
  
  
        </div>
  
        
        <div class="divider  "></div>
        <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">HOW TO PLAY</h2>
  
        <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>Weapon </li>
          <li>Use fully charged Ultimate </li>
          <li>Basic ATK x2 </li>
          <li>Repeat </li>
        </ol>
  
    
          <p class="mt-8 text-sm sm:text-base pb-4 text-center">
            Check out this showcase from Marisa Honkai:
        </p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/RxZIugMc8gM"
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
              <li>S2: Time fracture is good for Arena.</li>
              <li>SS: Evasion can connect to Basic SEQ 4, improves dps sequence.</li>   
            </ul>
          </div>
      
          <!-- Support Upgrade Box -->
          <div class="flex-1 p-2 bg-gray-800 rounded-lg shadow-md border border-yellow-400">
            <h3 class="text-lg font-semibold text-yellow-400 mb-2">Support Upgrade</h3>
            <ul class=" text-slate-100 text-sm sm:text-base">
              <li>S1: DMG buff for World Star and WoD suport. </li>
            </ul>
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
          <td class="p-3 space-y-2">
          <div>- WoD Support: Fire and Physical DMG +20% (S) ➔ 42% (S1). Melee ATK gain Ice and Lightning DMG +28% (S) ➔ 42% (S1). Enemies take 8% (S) ➔ 15% (S1) more Total DMG from ranged atks from the leader.</div>
          <div>- World Star Support: Team Total DMG +4% (S) ➔ +12% (S1)</div>
          </td>
          <td class="p-3 text-center">Support</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3 text-center font-bold text-blue-300">S2</td>
          <td class="p-3 space-y-2">
            <div>- UNLOCK: Non-ultimate evasion can trigger evasion skill</div>
            <div>- UNLOCK: When critical index is detonated, drop 2 Crystallized Wishes (SD remnant)</div>

            <div>- During SO, when team triggers 1/2/3 Facet, self Ice DMG +17.2/17.2/32.2% (S) ➔ +19.8/19.8/34.8% (S2)</div>

          </td>
          <td class="p-3 text-center">DPS, Arena</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3 text-center font-bold text-blue-300">S3</td>
          <td class="p-3 space-y-2">
            <div>Leader Skill:</div>
            <div>- Self Ice DMG +18% (S) ➔ 22% (S3).</div>
            <div>- Enemies take 20% (S) ➔ 22.5% (S3) more Ice DMG from self.</div>
          </td>
          <td class="p-3 text-center">DPS</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3 text-center font-bold text-yellow-300">SS</td>
          <td class="p-3 space-y-2">
            <div>- UNLOCK:  If Hi Love Elf is the leader, during AR Charging: The first fully charged Ult can restore additional 5 AR meter (once per battle).</div>
            <div>- UNLOCK: After triggering evasion skill, can connect to Basic SEQ 4, when SEQ 4 hits, if sp is below 150, restore sp to 150, effect ends on exit.</div>
            <div>- Enemies take 7% (S) ➔ 10% (SS) more Total DMG from Hi Love ELf. During AR Charging, additional +3.2% (S) ➔ 5% (SS).</div>
          
          </td>
          <td class="p-3 text-center">DPS</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3 text-center font-bold text-yellow-300">SS1</td>
          <td class="p-3">
            During SO, when team triggers 1/2/3 Facet, self Ice DMG +19.8/19.8/34.8% (S2) ➔ +25/25/40% (SS1)
          </td>
          <td class="p-3 text-center">DPS</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3 text-center font-bold text-yellow-300">SS2</td>
          <td class="p-3">
            Enemies take 19.2% (S) ➔ 24% (SS2) more Ice DMG from herself.
          </td>
          <td class="p-3 text-center">DPS</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3 text-center font-bold text-yellow-300">SS3</td>
          <td class="p-3 space-y-2">
            <div>Leader Skill:</div>
            <div>- Self Ice DMG +22% (S) ➔ 26% (S3).</div>
            <div>- Enemies take 22.5% (S) ➔ 25% (S3) more Ice DMG from self.</div>
          </td>
          <td class="p-3 text-center">DPS</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3 text-center font-bold text-red-400">SSS</td>
          <td class="p-3 space-y-2">
            <div>- UNLOCK: During AR Charging: After casting weapon skill, enemies take 15% more Ice DMG from self, lasts for 3s. During SO, after using Weapon Skill EX, enemies take 20% more Ice DMG from self, lasts for 3s.</div>
            <div>- During AR Charging: After casting weapon skill, for the next Ult that fires at Love Blossom, the central arrow deals additional 260% (S) ➔ 400% (SSS) ATK of Ice DMG. </div>
            <div>- During SO: After casting Weapon Skill EX, for the next Ult that fires at Love Blossom, deal additional 390% (S) ➔ 600% (SSS) ATK of Ice DMG, ends when exiting SO.</div>
          
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
              <p>	- WoD Support: Fire and Physical DMG +20% (S) ➔ 42% (S1). Melee ATK gain Ice and Lightning DMG +28% (S) ➔ 42% (S1). Enemies take 8% (S) ➔ 15% (S1) more Total DMG from ranged atks from the leader.
                <br/>
                - World Star Support: Team Total DMG +4% (S) ➔ +12% (S1)

              </p>
              <p class="mt-2"><strong>Good for:</strong> Support</p>
            </div>
          </div>

          <div class="accordion-item">
            <div class="accordion-title" on:click={() => toggleItem(2)}>
              <span>S2</span>
              <span class="text-md">{openItem === 2 ? '-' : '+'}</span>
            </div>
            <div class="accordion-content {openItem === 2 ? 'open' : ''}">
              <p>		
	
- UNLOCK: Non-ultimate evasion can trigger evasion skill <br/>
- UNLOCK: When critical index is detonated, drop 2 Crystallized Wishes (SD remnant) <br/>
- During SO, when team triggers 1/2/3 Facet, self Ice DMG +17.2/17.2/32.2% (S) ➔ +19.8/19.8/34.8% (S2)
</p>
              <p class="mt-2"><strong>Good for:</strong> DPS, Arena
</p>
            </div>
          </div>

        

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(3)}>
            <span>S3</span>
            <span class="text-md">{openItem === 3 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 3 ? 'open' : ''}">
            <p>Leader Skill:<br/>
              - Self Ice DMG +18% (S) ➔ 22% (S3).<br/>
              - Enemies take 20% (S) ➔ 22.5% (S3) more Ice DMG from self.

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
- UNLOCK: If Hi Love Elf is the leader, during AR Charging: The first fully charged Ult can restore additional 5 AR meter (once per battle). <br/>
- UNLOCK: After triggering evasion skill, can connect to Basic SEQ 4, when SEQ 4 hits, if sp is below 150, restore sp to 150, effect ends on exit. <br/>
- Enemies take 7% (S) ➔ 10% (SS) more Total DMG from Hi Love ELf. During AR Charging, additional +3.2% (S) ➔ 5% (SS).
            </p>
            <p class="mt-2"><strong>Good for:</strong> DPS
</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(5)}>
            <span>SS1</span>
            <span class="text-md">{openItem === 5 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 5 ? 'open' : ''}">
            <p>	During SO, when team triggers 1/2/3 Facet, self Ice DMG +19.8/19.8/34.8% (S2) ➔ +25/25/40% (SS1)</p>
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
            <p>	Enemies take 19.2% (S) ➔ 24% (SS2) more Ice DMG from herself.
            </p>
            <p class="mt-2"><strong>Good for:</strong> DPS
</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(7)}>
            <span>SS3</span>
            <span class="text-md">{openItem === 7 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 7 ? 'open' : ''}">
            <p>	Leader Skill: <br/>
              - Self Ice DMG +22% (S) ➔ 26% (S3).
<br/>
- Enemies take 22.5% (S) ➔ 25% (S3) more Ice DMG from self.

            <p class="mt-2"><strong>Good for:</strong> DPS</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(8)}>
            <span>SSS</span>
            <span class="text-md">{openItem === 8 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 8 ? 'open' : ''}">
            <p>	- UNLOCK: During AR Charging: After casting weapon skill, enemies take 15% more Ice DMG from self, lasts for 3s. During SO, after using Weapon Skill EX, enemies take 20% more Ice DMG from self, lasts for 3s. <br/>
- During AR Charging: After casting weapon skill, for the next Ult that fires at Love Blossom, the central arrow deals additional 260% (S) ➔ 400% (SSS) ATK of Ice DMG. <br/>
- During SO: After casting Weapon Skill EX, for the next Ult that fires at Love Blossom, deal additional 390% (S) ➔ 600% (SSS) ATK of Ice DMG, ends when exiting SO.	 </p>
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
        <div class="bg-gray-800 p-4 rounded-lg shadow-md ">
          <h2 class="text-xl  font-semibold mb-4 text-left text-slate-100 cooltext">HLE DPS and SUP Rotations</h2>

          <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/hwDgn8J1dkc"
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


  <div >
    <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">Hi Love Elf DPS</h2>

    <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">With various support combinations</p>

    <div class="relative overflow-hidden" style="padding-top: 56.25%;">
      <iframe
      loading="lazy" 

          class="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/q2IOUHYp3z8"
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
      <div class="chat-bubble chat-bubble-primary text-base text-white">Why can BFD use PAWS support? I thought RoOblivion DPS needs RoOblivion supports?</div>
    </div>

    <div class="chat chat-end">
      <div class="chat-image avatar">
        <div class="w-10 sm:w-12 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="/images/ds.webp" />
        </div>
      </div>
      <div class="chat-bubble chat-bubble-neutral text-base text-zinc-300 py-5">
      1. Reminder that the main leader skill of RoOblivion characters only require characters with Astral Ring. Only Vita and BFD have subskills that require RoOblivion characters.
      <br/><br/>
      2. PAWS can be BFD support because PAWS gives HUGE buffs for BFD when they are in the same team. The buff amount is greater than BFD would get from having 3 RoO valks. Also, PAWS can consume Stellar Drain faster than other RoO valks.</div>
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

