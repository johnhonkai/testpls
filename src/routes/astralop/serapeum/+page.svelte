<svelte:head>
  <title>Serapeum Astral Op</title> 

    <meta property="og:title" content="Serapeum Astral Op" />
    <meta property="og:description" content="Serapeum Astral Op Guides, Builds and Gameplay" />
    <meta property="og:image" content="https://i.imgur.com/Fqc4ebn.png" />
    <meta property="og:url" content="https://marisaimpact.com/astralop/serapeum" />
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
	import Swdlcdps from "$lib/components/lineup/swdlcdps.svelte";

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
    background: radial-gradient(rgb(var(--light-blue-rgb)), rgb(var(--dark-blue-rgb)));
    height: 100%;  
    overflow: hidden;
    position: relative;
  }

  #star-gradient-overlay {
    background: radial-gradient(circle, transparent 75%, rgb(var(--dark-blue-rgb)));
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
  initialLikes={likesData["sera"] || 0}
  accent="bg-blue-800"
  image="/images/valkfull/asop_sera.png"
  alt="Serapeum"
  valk="false"

  titleEN="Serapeum"
  titleCN="瑟拉珮姆"

  nameEN="Serapeum"
  nameCN="瑟拉珮姆"

  releaseEN="v7.6 (25 July 2024)"
  releaseCN="v7.6 (27 June 2024)"  
>
  <CharBio mode="support" ar={[ 'wod' ]} bg="bg-blue-800" />
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
              <strong class="text-amber-400">Wheel of Destiny Support</strong>
            </p>   
          <ul class="list-disc ml-6 text-sm sm:text-base">
                <li>The best astral op for WoD characters that do not utilize Stellar Surplus mechanic.</li>
                <li>For WoD characters that utilize Stellar Surplus mechanic, <a class="link" href="/astralop/youyun">Youyun</a> is better.</li>
                <li>For Physical DPS, Sera provides Crit Rate and Crit DMG conversion. </li>
                <li>Provides initial ar, bonus sp during SO, SO cd reduction, and recover ar during SO.</li>
          </ul> 

          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">World Star Support </strong> 
              <br/>
              Before Youyun was introduced, Herrsher of Rebirth benefits more from Serapeum than Songque and Dreamseeker since they lack Phy and Crit buffs.
          </p>

 

          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">Other AR </strong> 
              <br/>
          </p>
          <ul class="list-disc ml-6 text-sm sm:text-base">
                <li>Serapeum has unrestricted Crit DMG buff and unrestricted Phy+Ele debuff during Stellar Outburst.</li>
                <li>Certain buffs only require you to have a team member with Harmonized Shadow Star tag.</li>
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
                <li>SS-rank is the optimal rank. Provides initial AR and stronger debuff.</li>
                <li>SSS-rank increases enemies' dmg taken from Shadow Star attacks.</li>
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
  

      <Agentritadps></Agentritadps>

      <div class="divider"></div>

      <Hohdps></Hohdps>
      
      <div class="divider"></div>

      <Jddps></Jddps>

      <div class="divider"></div>

      <Lanterndps></Lanterndps>


      <div class="divider"></div>

      <Thelemadps></Thelemadps>


</section>

  {/if}


      {#if selectedTab === 'Skills'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-4 text-center">SKILLS</h2>

      <div>
          <!-- Roles Section -->
          <h2 class="text-xl  font-semibold mb-2 text-left cooltext text-slate-100">ASSIST SKILL</h2>
          
     
          <ul class="list-disc ml-6 text-sm sm:text-base">
                <li class="mb-2">Casts Synergy Attack and generates a book that pulls in nearby enemies and deals 1,500% ATK of Physical DMG to them. If Jovial Deception: Shadowdimmer is in Stellar Outburst state, Synergy Attack deals an additional 2,500% ATK of Physical DMG.</li>
                <li class="mb-2">Serapeum deals 100% more Physical DMG. Synergy Attack inflicts 3 Stun Trauma to enemies hit. </li>
                <li class="mb-2"><strong class="text-amber-400">[SS]</strong> [Team-triggered] Serapeum deals 33% more Total DMG and gains 16% Physical Breach for every team member with the Harmonized Shadow Star trait.</li>
                <li class="mb-2"><strong class="text-amber-400">[SSS]</strong> While Wheel of Destiny is activated, increases Serapeum's ATK by 100% and Crit DMG by 150%, and Synergy Attack's Crit Rate by 100%.</li>
          </ul> 

          <div class="divider  "></div>
          <!-- Pull Recommendation Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">RECHARGE SKILL</h2>

          <ul class="list-disc ml-6 text-sm sm:text-base">
                <li class="mb-2">In Astral Ring Charging state, landing an attack sends all team members into Intensity Recovery state for 1s, which restores 1 Astral Ring Intensity per 0.5s. Start a battle with 50 more Astral Ring Intensity, which applies once every 10 min in Part 2's Open World and shares a CD with other AstralOps. Enemies take 18% more Physical DMG and 12% more Elemental DMG in Stellar Outburst state.</li>
                <li class="mb-2">While Wheel of Destiny is activated, Phantoms recover 14 Astral Ring Intensity by performing support attacks. This can be triggered up to 2 times per Stellar Outburst state. While World Star is activated, the character recovers 4.5 Astral Ring Intensity by releasing Resonance attacks. This can be triggered up to 5 times per Stellar Outburst state. </li>
                <li class="mb-2"><strong class="text-amber-400">[SS]</strong> [Team-triggered] Increases initial Astral Ring Intensity by 8 for every team member with the Harmonized Shadow Star trait.</li>
                <li class="mb-2"><strong class="text-amber-400">[SSS]</strong> While Wheel of Destiny is activated, characters on the field recover 1 SP per second in Rondo in the Shadows state.</li>
          </ul> 

          <div class="divider  "></div>
          <!-- Pull Recommendation Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">PASSIVE SKILL</h2>

          <ul class="list-disc ml-6 text-sm sm:text-base">
                <li class="mb-2">All team members deal 18% more Crit DMG. With Wheel of Destiny activated:</li>

                <ul class="list-disc ml-6 text-sm sm:text-base">

                    <li class="mb-2">All team members deal 8% more Total DMG and Crit DMG.</li>
                    <li class="mb-2">When entering battle or Stellar Outburst state, all team members gain Crit Conversation state. When the character attacks with less than 100% Crit Rate, converts 2.5% of Crit DMG to 1% Crit Rate until Crit Rate reaches 100% or 75% of Crit DMG has been converted.</li>
                    <li class="mb-2">In Astral Ring Charging state, whenever Astral Ring Intensity becomes full, reduces the current CD of Stellar Outburst by 2.5s. This effect can only be triggered once per Astral Ring Charging state.</li>
                
                </ul>

                <li class="mb-2">Restores 1,600 HP when the on-field character's HP is below 50%. CD: 15s.</li>
                <li class="mb-2"><strong class="text-amber-400">[SS]</strong> [Team-triggered] Enemies take 5.5% more Elemental DMG and 2.5% more Physical DMG for every team member with the Harmonized Shadow Star trait.</li>
                <li class="mb-2"><strong class="text-amber-400">[SSS]</strong> While Wheel of Destiny is activated, enemies on the field take 24% more Total DMG from Shadow Star Attack.</li>
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

