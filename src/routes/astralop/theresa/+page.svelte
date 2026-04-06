<svelte:head>
  <title>Theresa Astral Op</title> 

    <meta property="og:title" content="Theresa Astral Op" />
    <meta property="og:description" content="Theresa Astral Op Guides, Builds and Gameplay" />
    <meta property="og:image" content="https://i.imgur.com/59gnagh.png" />
    <meta property="og:url" content="https://marisaimpact.com/astralop/theresa" />
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
	import Xentineldps from "$lib/components/lineup/xentineldps.svelte";
	import Lunadlcdps from "$lib/components/lineup/lunadlcdps.svelte";
	import Hofidps from "$lib/components/lineup/hofidps.svelte";

  let selectedTab = 'Overview'; // Default tab
  const tabs = [
  { name: 'Overview', short: 'overview', icon: faHome },
  { name: 'Skills', short: 'support', icon: faCircleUser },
  { name: 'Lineup', short: 'lineup', icon: faUsers },
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
  let durandallikes = likesData["newmei"] || 0; // Get initial likes from JSON
  const charName = "newmei"; // Route name for this character
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
    background: radial-gradient(rgb(var(--light-teal-rgb)), rgb(var(--dark-teal-rgb)));
    height: 100%;  
    overflow: hidden;
    position: relative;
  }

  #star-gradient-overlay {
    background: radial-gradient(circle, transparent 75%, rgb(var(--dark-teal-rgb)));
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
  charName="newmei"
  initialLikes={likesData["theresa"] || 0}
  accent="bg-teal-800"
  image="/images/valkfull/asop_theresa.png"
  alt="Theresa"
  valk="false"

  titleEN="Schicksal's Imperative"
  titleCN="天命难逃"

  nameEN="Theresa Apocalypse"
  nameCN="德丽莎·阿波卡利斯"

  releaseEN="v8.1 (20 Feb 2025)"
  releaseCN="v8.1 (23 Jan 2024)"     
>
  <CharBio mode="support" ar={['loa' , 'roo' ]} bg="bg-teal-800" />
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
              <strong class="text-amber-400">Law of Ascension Support</strong>
            </p>   
          <ul class="list-disc ml-6 text-sm sm:text-base">
                <li>The best astral op for Law of Ascension teams.</li>
                <li>You can do one more Stellar Shift! </li>
                <li>Provides initial ar, bonus sp during SO, SO cd reduction, and recover ar during SO.</li>
                <li>SSS-rank increases enemies' dmg taken from QTE and Stellar Shift attacks.</li>
                <li>Increases HP Loss DMG. Badum and Reign Solaris both deal significant HP Loss DMG, and Theresa triples these damage simply by existing.</li>

          </ul> 

          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">Rite of Oblivion Support </strong> 
          </p>
          <ul class="list-disc ml-6 text-sm sm:text-base">
                <li>Second best astral op for Rite of Oblivion teams after Chenxue.</li>
                <li>Provides initial ar, SO cd reduction, and recover ar after SO ends.</li>
                <li>SSS-rank increases enemies' dmg taken from all attacks.</li>
          </ul>   
 

          <div class="divider  "></div>
          <!-- Pull Recommendation Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">PULL RECOMMENDATION</h2>

          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">F2P</strong> <br/> Dreamseeker is enough.
          </p>

          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">Spenders</strong> <br/>  
          </p>
          <ul class="list-disc ml-6 text-sm sm:text-base">
                <li>S-rank is enough for Red Lotus. </li>
                <li>SS-rank gives ar regen during SO, and reduces SO cd - useful in Nirvana where you need multiple rotations.</li>
                <li>SSS-rank increases enemies' dmg taken.</li>
          </ul> 

          <div class="divider  "></div>
          <!-- How to Get Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">HOW TO GET</h2>
          <p class="mt-4 text-sm sm:text-base">
               AstralOp Supply
          </p>


      </div>

  {/if}
  

  {#if selectedTab === 'Lineup'}
  <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">LINEUP</h2>

  <section class="max-w-(--breakpoint-lg) mx-auto ">
  
<div class="w-full max-w-4xl mx-auto my-6">
  <div class="grid grid-cols-2 gap-3">
    
    <!-- Tab -->
    <button
        class="py-2 px-4  rounded btn
                {activeLineup === '1' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'}"
      on:click={() => setLineup('1')}
    >
      LAW OF ASCENSION
    </button>

    <!-- Tab -->
    <button
        class="py-2 px-4  rounded btn
                {activeLineup === '2' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'}"
      on:click={() => setLineup('2')}
    >
      RITE OF OBLIVION
    </button>


  </div>
</div>


      {#if activeLineup === '1'}
      <Psdps></Psdps>

      <div class="divider"></div>

      <Dududps></Dududps>
      
      <div class="divider"></div>

      <Badumdps></Badumdps>
      {/if}



      {#if activeLineup === '2'}
      
      <Coraliedps></Coraliedps>

      <div class="divider"></div>

      <Vitadps></Vitadps>
      
      <div class="divider"></div>
    
      <Hofidps></Hofidps>

      {/if}


</section>

  {/if}


      {#if selectedTab === 'Skills'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-4 text-center">SKILLS</h2>

      <div>
          <!-- Roles Section -->
          <h2 class="text-xl  font-semibold mb-2 text-left cooltext text-slate-100">ASSIST SKILL</h2>
          
     
          <ul class="list-disc ml-6 text-sm sm:text-base">
                <li class="mb-2">Casts Synergy Attack and continues to pull nearby enemies to deal a total of 2,000% ATK of Lightning DMG. If Ba-Dum! Fiery Wishing Star is the leader, Synergy Attack will deal an additional 1,500% ATK of Lightning DMG.</li>
                <li class="mb-2">After Stellar Shift ends, Theresa Apocalypse summons supporting light spears to deal 800% ATK of Lightning DMG to enemies. She also deals 150% more Lightning DMG. </li>
                <li class="mb-2"><strong class="text-amber-400">[SS]</strong> For every team member who has the Heavenly Shift trait, Theresa Apocalypse deals 33% more Total DMG.</li>
                <li class="mb-2"><strong class="text-amber-400">[SSS]</strong> When Law of Ascension is activated, Theresa Apocalypse's ATK is increased by 100%. Synergy Attack and supporting light spears deal additional 1,500% ATK of Lightning DMG.</li>
          </ul> 

          <div class="divider  "></div>
          <!-- Pull Recommendation Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">RECHARGE SKILL</h2>

          <ul class="list-disc ml-6 text-sm sm:text-base">
                <li class="mb-2">In Astral Ring Charging, when a character lands a hit, the team gains Intensity Recovery for 1s, which restores 1 Astral Ring Intensity per 0.5s. Initial Astral Ring Intensity increases by 50. This effect applies once every 10 min in Part 2's Open World and shares a CD with other AstralOps.
In Stellar Outburst, enemies on the field take 12% more Elemental DMG and 5% more Total DMG.</li>

                <li class="mb-2">[Team-triggered] For every teammate with the Heavenly Shift trait, initial Astral Ring Intensity increases by 8. </li>

                <li class="mb-2"><strong class="text-amber-400">[SS]</strong> When Law of Ascension is activated:
When casting Synergy Attack, restore Astral Ring Intensity by 8. When supporting light spears are cast, restore Astral Ring Intensity by 2. CD: 4s.
Stellar Outburst CD is reduced by 3 seconds (exclusive).
When Rite of Oblivion is activated: When casting Synergy Attack, restore Astral Ring Intensity by 36.</li>

                <li class="mb-2"><strong class="text-amber-400">[SSS]</strong> When Law of Ascension is activated, enemies on the field take 12% more Total DMG from QTE and Stellar Shift. When a character casts Stellar Shift, restore 6 SP for the team. CD: 4s.</li>
          </ul> 

          <div class="divider  "></div>
          <!-- Pull Recommendation Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">PASSIVE SKILL</h2>

          <ul class="list-disc ml-6 text-sm sm:text-base">
                <li class="mb-2">When Law of Ascension is activated:</li>

                <ul class="list-disc ml-6 text-sm sm:text-base">

                    <li class="mb-2">After entering Stellar Outburst, the leader can cast Stellar Shift an additional time.</li>
                    <li class="mb-2">The team deals 10% more Elemental DMG, and Crit Rate increases by 27%.</li>
                    <li class="mb-2">HP loss effect dealt by the Leader Skill increases by 6%.</li>
                
                </ul>

                <li class="mb-2">With Rite of Oblivion activated: In Astral Ring Charging, the team deals 25% more Lightning DMG.</li>


                <li class="mb-2">Total DMG taken by the team decreases by 18%. When a character casts Stellar Shift, the character herself restores 600 HP.</li>
                <li class="mb-2"><strong class="text-amber-400">[SS]</strong> When Law of Ascension is activated: For every teammate with the Heavenly Shift trait, enemies on the field take 1.5% more Elemental DMG and 1.5% more Physical DMG.
When Rite of Oblivion is activated, for every teammate with the Omniscient Star trait, enemies on the field take 5% more Elemental DMG.</li>
                <li class="mb-2"><strong class="text-amber-400">[SSS]</strong> When Rite of Oblivion is activated, enemies on the field take 4.5% more Total DMG.</li>
          </ul> 

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

