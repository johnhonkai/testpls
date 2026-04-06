<svelte:head>
  <title>Rita - Miss Espionage</title> 

    <meta property="og:title" content="Rita - Miss Espionage" />
    <meta property="og:description" content="Miss Espionage Guides, Builds and Gameplay" />
    <meta property="og:image" content="https://i.imgur.com/HsA50Ch.png" />
    <meta property="og:url" content="https://marisaimpact.com/valk/miss-espionage" />
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
  { name: 'Equipment', short: 'equipment', icon: faBolt  },
  { name: 'Support Buffs', short: 'support', icon: faCircleUser },
//  { name: 'How to Play', short: 'howtoplay', icon: faBook },
  { name: 'Gameplay', short: 'example', icon: faVideo },
  { name: 'Elysian Realm', short: 'er', icon: faFire },
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
  height: 36rem;
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
  alt="Miss Espionage"

  titleEN="Miss Espionage"
  titleCN="窈窕谍影"

  nameEN="Rita Rossweisse"
  nameCN="丽塔·洛丝薇瑟"

  releaseEN="v8.6 (31 Dec 2025)"
  releaseCN="v8.6 (4 Dec 2025)"

>
  <CharBio mode="dps" rank="s" type="img" element="lightning" ar="wod" bg="bg-violet-800" />
  <CharBio mode="support" ar={['wod' , 'loa']} bg="bg-violet-800" />
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
              <strong class="text-amber-400">Lightning IMG DPS</strong> 
          </p>
          <ul class="list-disc ml-6 text-sm sm:text-base">
                <li>Miss Espionage counters IMG enemies with her seed-transfer attacks and low-hp instakill.</li>
                <li>Introduces a new mechanic: Stellar Surplus. Basically, Rita can activate a mini Stellar Outburst state during AR Charging.</li>
                <li>Rita is great in her optimal match-ups, but just decent everywhere else.</li>
      
          </ul> 

            <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">Utilities</strong>
              <br/>              
            </p>  

          <ul class="list-disc ml-6 text-sm sm:text-base">
                <li>Paralyze trauma.</li>
                <li>IMG counter.</li>
                <li>WoD: Stellar Surplus.</li>
          </ul>            
            <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">Wheel of Destiny Support</strong>
              <br/>
              
            </p>   
          <ul class="list-disc ml-6 text-sm sm:text-base">
                <li>Buff-wise, Miss Espionage is best secondary support for all WoD teams. However, optimal team still depends on the boss.</li>
                <li>Enables Stellar Surplus state for WoD teams - valks can gain Stellar Outburst-like state during AR Charging. Additionally, if you reach a certain amount of Surplus AR, Rita also grants dmg buff during Stellar Outburst.</li>
          </ul>  
            
            <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">Law of Ascension Support</strong>
              <br/>
              New best support for Reign Solaris. Great support for Peregrine Sword.
            </p>   

          <div class="divider  "></div>
          <!-- Pull Recommendation Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">PULL RECOMMENDATION</h2>

            <p class="mt-4 text-sm sm:text-base">
                <strong class="text-amber-400">New / F2P Players</strong>
                <br/>Not recommended. Due to how Part 2 meta works (all valks are kinda balanced on release and have their own niche) and how patches are longer (Monthly players can afford S-rank fullgear every patch, f2p can get S-rank fullgear every one or two patches), it’s better to 
                <br/> - Save until you can guarantee valk + fullgear,
                <br/> - Then get the latest valk early in the patch.
            </p>

          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">Whales / Competitive</strong><br/> 
              Miss Espionage is still relevant in the recent meta as support and DPS, so I would say she's still good to pull IF YOU'RE A HEAVY SPENDER. You should pull the more recent valks first, save for next patch valk, and then only consider getting Miss Espionage if your wallet is still loaded.
          </p>


          <div class="divider  "></div>
          <!-- How to Get Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">HOW TO GET</h2>
          <ul class="list-disc ml-6 text-sm sm:text-base ">
              <li ><strong>Battlesuit:</strong> Battlesuit Supply</li>
              <li><strong>Weapon:</strong> Equipment Supply</li>
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
                  src="https://www.youtube.com/embed/MtQC7b2M8Hk"
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
  
<div class="w-full max-w-4xl mx-auto my-6">
  <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
    
    <!-- Tab -->
    <button
        class="py-2 px-4  rounded btn
                {activeLineup === '1' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'}"
      on:click={() => setLineup('1')}
    >
      DPS
    </button>

    <!-- Tab -->
    <button
        class="py-2 px-4  rounded btn
                {activeLineup === '2' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'}"
      on:click={() => setLineup('2')}
    >
      WHEEL OF DESTINY
    </button>

    <!-- Tab -->
    <button
        class="py-2 px-4  rounded btn
                {activeLineup === '3' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'}"
      on:click={() => setLineup('3')}
    >
      LAW OF ASCENSION
    </button>

  </div>
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
 
      <Psdps></Psdps>

      <div class="divider"></div>

      <Badumdps></Badumdps>

      <div class="divider"></div>
      
      <Dududps></Dududps>

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
            <img src="https://act-upload.mihoyo.com/bh3-wiki/2025/11/18/50494840/e76997914e0a16354d11de3d92462ca4_6262773564151244243.png" alt="Rainbow" class="w-full h-full object-cover">
        </div>

        <div class="w-20 h-20 sm:w-28 sm:h-28">
          <img src="https://act-upload.mihoyo.com/bh3-wiki/2025/11/28/4976467/6c8019d8faaa94f5dd5bed439610cf55_1554753569050005231.png" alt="Stigma" class="w-full h-full object-cover">
      </div>

      <div class="w-20 h-20 sm:w-28 sm:h-28">
          <img src="https://act-upload.mihoyo.com/bh3-wiki/2025/11/28/4976467/1be610752088dfbde026b378746ed9e3_4290852365616195329.png" alt="Stigma" class="w-full h-full object-cover">
      </div>

      <div class="w-20 h-20 sm:w-28 sm:h-28">
          <img src="https://act-upload.mihoyo.com/bh3-wiki/2025/11/28/4976467/c8cd48c553588c303b3129ba83f35fb7_476918438311864761.png" alt="Stigma" class="w-full h-full object-cover">
      </div>

        </div>  
        <h4 class="text-base sm:text-base text-white"> Codename: Top Mission + Schicksal Agent set</h4>
        </div>



     </div>

     <div>



      <div class="p-4 mt-4 bg-linear-to-r from-purple-950/75 to-purple-900/75 rounded-sm">
        <p class="text-sm sm:text-base text-left mb-4">
          <b>Codename: Top Mission </b><br/> - Best weapon for Miss Espionage. Huge self buffs and team buffs.
          <br/>- Enables Shadow Star ATK to transfer 100% dmg from IMG shell to seed.
          <br/>- Utility: QTE restore 25 meter.
        </p>

        <p class="text-sm sm:text-base text-left mb-4">
          <b>Schicksal Agent set</b><br/> - Huge buffs.
          <br/> - Forgeable in Foundry.
        </p>

        <p class="text-sm sm:text-base text-left">
          <b>Affix</b> <br/>Full ATK.
        </p>
      </div>


      </div>

      <div class="divider  "></div>

   
      {/if}

      {#if selectedTab === 'Support Buffs'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">SUPPORT BUFFS</h2>


      <div class="my-6  py-5 rounded-xl text-slate-100 space-y-6 text-sm sm:text-base">
        <h3 class="text-lg sm:text-xl font-bold text-center">
          How to Activate Miss Espionage Support Buffs
        </h3>
      
        <div class="space-y-2 border-l-4 border-orange-300 pl-4">
          <h4 class="font-semibold text-orange-300 text-base sm:text-lg">Stellar Drain</h4>
          <p class="leading-relaxed">
            - QTE Replicate consumes Stellar Drain.<br/>
            - Ultimate evasion restores 2 AR.
          </p>
        </div>
      
        <div class="space-y-2 border-l-4 border-orange-300 pl-4">
          <h4 class="font-semibold text-orange-300 text-base sm:text-lg">Stigma Buff</h4>
          <p class="leading-relaxed">
            Weapon or QTE triggers an important stigma buff <span class="text-sky-200 italic">[A Lady's Dignity]</span> for 25s. Also activated/refreshed upon <span class="italic text-sky-200">Stellar Outburst / Stellar Surplus</span> activation.
          </p>
        </div>

        <div class="space-y-2 border-l-4 border-orange-300 pl-4">
          <h4 class="font-semibold text-orange-300 text-base sm:text-lg">Wheel of Destiny Buff</h4>
          <p class="leading-relaxed">
            1. Entering Stellar Surplus grants: Enemies take 10% more Total DMG, 15% more Elemental DMG, and 14% more Physical DMG from the valk.
            <br/>
            2. When entering Stellar Outburst, if Surplus Intensity is greater than or equal to 10/20 points, all team members deal 10%/25% more Total DMG until Stellar Outburst ends.
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
        class={ ` btn px-4 py-2 font-semibold rounded-sm ${activePlaystyle === '1' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-linear-to-r from-orange-600 to-amber-500 hover:text-white'}`}
      >
        STELLAR OUTBURST
      </button>    

 

      </div>
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
            <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Couture ➔ Rouge</p>
            <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Perfection </p>
          </div>
        </div>
        
      </div>
        <div class="mt-3 rounded-sm" >
          <p class="text-sm sm:text-base text-left">
          <ul class="list-disc px-4 text-sm sm:text-base">

          <li class="text-sm sm:text-base"> ER Lite mode: Equip Because of You sigil and get all three Ego signets on Floor 7.</li>
          <li class="text-sm sm:text-base"> Normal mode: You can complete the run with just one Ego signet (Couture), but having both Ego signets is a big improvement. You can get both Ego signets at the start by using Thorny Crown sigil, OR by resetting Floor 1 until you get another Ego portal, OR use Because of You support sigil and get the other two Ego signets on Floor 7.</li>
          </ul>
          </div>
  
        <div class="divider  "></div>
        <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
        <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
          <!-- First Signet with 'Start' text -->

  
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
              <img src="/images/signets/Signets of Decimation (Kalpas).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold ">1</p>
            </div>

            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Deliverance (Kevin).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">1</p>
            </div>

             <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Helix (Vill-V).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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
              <img src="/images/valkportrait/Theresa Starlit Astrologos.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            </div>
            <p class="text-base sm:text-lg font-semibold">START</p>
        </div>
  
        <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
            <div class="flex flex-row rounded-sm">
              <img src="/images/valkportrait/Theresa Starlit Astrologos.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            </div>
            <p class="text-base sm:text-lg font-semibold">MID</p>
        </div>
  
        <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
            <div class="flex flex-row rounded-sm">
              <img src="/images/valkportrait/Theresa Starlit Astrologos.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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
          <li>Weapon ➔ ATK </li>
          <li>Ult x2 </li>
          <li>Repeat </li>
        </ol>
  
    
          <p class="mt-8 text-sm sm:text-base pb-4 text-center">
            Check out this showcase from Marisa Honkai:
        </p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/rX8JSxdeIfo"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                loading="lazy">
            </iframe>
        </div>
      {/if}
    

      {#if activePlaystyle === '1'}
      <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">Stellar Outburst Playstyle</h2> 
      <p class="text-sm sm:text-base text-center sm:text-left">
       Spam weapon
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
            <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b>Sophistication ➔ Thunderstrike  </p>
            <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Perfection </p>
          </div>
        </div>
        
      </div>
        <div class="mt-3 rounded-sm" >
          <p class="text-sm sm:text-base text-left">
          <ul class="list-disc px-4 text-sm sm:text-base">

          <li class="text-sm sm:text-base"> ER Lite mode: Equip Because of You sigil and get all three Ego signets on Floor 7.</li>
          <li class="text-sm sm:text-base"> Normal mode: You can complete the run with just one Ego signet (Sophistication), but having both Ego signets is a big improvement. You can get both Ego signets at the start by using Thorny Crown sigil, OR by resetting Floor 1 until you get another Ego portal, OR use Because of You support sigil and get the other two Ego signets on Floor 7.</li>
          </ul>
          </div>
  
  
        <div class="divider  "></div>
        <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
        <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
          <!-- First Signet with 'Start' text -->

  
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
              <img src="/images/signets/Signets of Decimation (Kalpas).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">1 or 2</p>
            </div>

            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Gold (Eden).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">1</p>
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
              <img src="/images/signets/Signets of Reverie (Pardofelis).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">1</p>
            </div>
  
        </div>


          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SUPPORTS</h2>
  
        <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
          
          <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
            <div class="flex flex-row rounded-sm">
              <img src="/images/valkportrait/Thelema Mad Pleasure.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            </div>
            <p class="text-base sm:text-lg font-semibold">START</p>
        </div>
  
        <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
            <div class="flex flex-row rounded-sm">
              <img src="/images/valkportrait/Thelema Mad Pleasure.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            </div>
            <p class="text-base sm:text-lg font-semibold">MID</p>
        </div>
  
        <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
            <div class="flex flex-row rounded-sm">
              <img src="/images/valkportrait/Thelema Mad Pleasure.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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
          <li>Use both supports.</li>
          <li>Activate Stellar Outburst.</li>
          <li>Press support valk. Spam weapon until full meter and you do that finisher attack, repeat this one more time.</li>
          <li>Repeat step 2 for the other support.</li>
          <li>Use ult finisher.</li>
          <li>Repeat.</li>

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
    <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">Rita DPS</h2>

    <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">Beta showcase</p>

    <div class="relative overflow-hidden" style="padding-top: 56.25%;">
      <iframe
      loading="lazy" 

          class="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/38OEo0wCcJ4"
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

