
<svelte:head>
  <title>Elysia - Hi ♪ Love Elf ♥</title> 

    <meta property="og:title" content="Elysia - Hi ♪ Love Elf ♥" />
    <meta property="og:description" content="Hi ♪ Love Elf ♥ Guides, Builds and Gameplay" />
    <meta property="og:image" content="https://i.imgur.com/qNSWji2.png" />
    <meta property="og:url" content="https://marisaimpact.com/valk/messenger-of-love" />
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
	import Newelydps from "$lib/components/lineup/newelydps.svelte";
	import CharacterLayout from "$lib/components/valkpage/CharacterLayout.svelte";

  let selectedTab = 'Overview'; // Default tab
  const tabs = [
  { name: 'Overview', short: 'overview', icon: faHome },
  { name: 'Lineup', short: 'lineup', icon: faUsers },
//  { name: 'Equipment', short: 'equipment', icon: faBolt  },
//  { name: 'Support Buffs', short: 'support', icon: faCircleUser },
//  { name: 'How to Play', short: 'howtoplay', icon: faBook },
  { name: 'Gameplay', short: 'example', icon: faVideo },
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
  let durandallikes = likesData["mol"] || 0; // Get initial likes from JSON
  const charName = "mol"; // Route name for this character
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
    background: radial-gradient(rgb(var(--light-pink-rgb)), rgb(var(--dark-pink-rgb)));
    height: 100%;  
    overflow: hidden;
    position: relative;
  }

  #star-gradient-overlay {
    background: radial-gradient(circle, transparent 75%, rgb(var(--dark-pink-rgb)));
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
  charName="mol"
  initialLikes={likesData["mol"] || 0}
  accent="bg-pink-800"
  image="/images/valkfull/mol.png"
  alt="Messenger of Love"
  title="Hi ♪ Love Elf ♥"
  name="Elysia"
  release="v8.5 (23 Oct 2025)"
>
  <CharBio mode="dps" rank="s" type="sd" element="ice" ar="goi" bg="bg-pink-800" />
  <CharBio mode="support" ar={['goi', 'wod', 'ws']} bg="bg-pink-800" />
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
              <strong class="text-amber-400">BETA</strong> 
          </p>
          <ul class="list-disc ml-6 text-sm sm:text-base">
                <li>To Be Added</li>

          </ul>        
          
            <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">Utilities</strong>

            </p>   

          <ul class="list-disc ml-6 text-sm sm:text-base">
                <li>To Be Added</li>


          </ul> 

          <div class="divider  "></div>
          <!-- Pull Recommendation Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">PULL RECOMMENDATION</h2>
          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">Everyone</strong> <br/> Recommended to get New Elysia in v8.5.
            </p>
            

          <div class="divider  "></div>
          <!-- How to Get Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">HOW TO GET</h2>
          <ul class="list-disc ml-6 text-sm sm:text-base ">
              <li ><strong>Battlesuit:</strong> Battlesuit Supply</li>
              <li><strong>Weapon:</strong> Equipment Supply</li>
              <li><strong>Stigma:</strong> Equipment Supply, Forgeable, Free stigma box in 8.5</li>
          </ul>
          <div class="divider  "></div>
          <!-- Full Guide Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">FULL GUIDE</h2>
          <p class="mt-2 text-sm sm:text-base pb-4">
            Check out her gameplay
        </p>
  
          <div class="relative overflow-hidden" style="padding-top: 56.25%;">
              <iframe
                  class="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/eZZHr9euFbw"
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

      <Newelydps></Newelydps>
      

      <div class="divider divider-accent text-xl custom-font tracking-wider text-teal-300 mt-16"> Grail of Infinitude Support </div>

      <Heliadps></Heliadps>

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
            <img src="https://act-upload.mihoyo.com/bh3-wiki/2025/07/07/50494840/6a401c362e7461e42bab35a5f693745f_4243039532604930517.png" alt="Rainbow" class="w-full h-full object-cover">
        </div>

        <div class="w-20 h-20 sm:w-28 sm:h-28">
          <img src="https://act-upload.mihoyo.com/bh3-wiki/2025/07/08/50494840/793f95fbd6c97934615e2c0b23025b3c_4633655109733764781.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Stigma" class="w-full h-full object-cover">
      </div>

      <div class="w-20 h-20 sm:w-28 sm:h-28">
          <img src="https://act-upload.mihoyo.com/bh3-wiki/2025/07/07/9917988/115c9a864ab7a762851b8258af7ed117_2095494118300504270.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Stigma" class="w-full h-full object-cover">
      </div>

      <div class="w-20 h-20 sm:w-28 sm:h-28">
          <img src="https://act-upload.mihoyo.com/bh3-wiki/2025/07/07/9917988/bf46067e70680f45889af692b161c378_8020445528245300141.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Stigma" class="w-full h-full object-cover">
      </div>

        </div>  
        <h4 class="text-base sm:text-base text-white"> Draconic Sky-Scorching Fury: Ultra! + Coralie stigma set</h4>
        </div>



     </div>

     <div>



      <div class="p-4 mt-4 bg-linear-to-r from-orange-950/75 to-orange-900/75 rounded-sm">
        <p class="text-sm sm:text-base text-left mb-4">
          <b>Draconic Sky-Scorching Fury: Ultra!</b><br/> - Best weapon for BFD, huge self buffs and team buffs.
          <br/>- Gives 45% more ignite trauma inflict rate.
        </p>

        <p class="text-sm sm:text-base text-left mb-4">
          <b>Coralie stigma set</b><br/> - Huge buffs. Physical / Elemental Breach state is stronger when signature stigma is equipped.
          <br/> - Forgeable in Foundry.
        </p>

        <p class="text-sm sm:text-base text-left">
          <b>Affix</b> <br/>Full ATK.
        </p>
      </div>


      </div>

      <div class="divider  "></div>

<div class="text-slate-100">
  <h2 class="text-xl font-semibold mb-4 cooltext">Weapon DMG Test - BFD DPS</h2>
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
          <td class="p-3">Draconic Sky  Syn3</td>
          <td class="p-3 text-right">36,443,072</td>
          <td class="p-3 text-right text-teal-400">107.12%</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3">Draconic Sky  Syn2</td>
          <td class="p-3 text-right">35,137,216</td>
          <td class="p-3 text-right text-teal-400">103.28%</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3">Draconic Sky  Syn1 </td>
          <td class="p-3 text-right">34,021,952</td>
          <td class="p-3 text-right text-teal-400">100.00%</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3">Blast Hammer Syn3</td>
          <td class="p-3 text-right">21,996,416</td>
          <td class="p-3 text-right text-amber-400">64.65%</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3">Calm Baby Syn3</td>
          <td class="p-3 text-right">21,211,840</td>
          <td class="p-3 text-right text-amber-400">62.35%</td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

       <div class="divider  "></div>

<div class="text-slate-100">
  <h2 class="text-xl font-semibold mb-4 cooltext">Weapon DMG Test - PAWS Support</h2>
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
          <td class="p-3">Draconic Sky  Syn3</td>
          <td class="p-3 text-right">42,224,768</td>
          <td class="p-3 text-right text-teal-400">104.17%</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3">Draconic Sky  Syn2</td>
          <td class="p-3 text-right">41,446,784</td>
          <td class="p-3 text-right text-teal-400">102.25%</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3">Draconic Sky  Syn1 </td>
          <td class="p-3 text-right">40,536,000</td>
          <td class="p-3 text-right text-teal-400">100.00%</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3">Blast Hammer Syn3</td>
          <td class="p-3 text-right ">36,056,000</td>
          <td class="p-3 text-right text-blue-400">88.95%</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3">Calm Baby Syn3</td>
          <td class="p-3 text-right">34,257,408</td>
          <td class="p-3 text-right text-blue-400">84.51%</td>
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
          src="https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/guidepics/coralie%20buffs%201.webp"
          alt="Buff 1"
          class=" object-cover cursor-pointer"
          on:click={() => openLightbox('https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/guidepics/coralie%20buffs%201.webp')}
        />
      </div>

      <div class="flex flex-wrap gap-4 mt-8">
        <!-- Example image list for support buffs; add your own image sources -->
        <img
          src="https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/guidepics/coralie%20buffs%202.webp"
          alt="Buff 2"
          class=" object-cover cursor-pointer"
          on:click={() => openLightbox('https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/guidepics/coralie%20buffs%202.webp')}
        />
      </div>
      
      <div class="divider"></div>
      <div class="my-5 text-sm sm:text-base text-slate-100 space-y-4">
        <p class="mb-4 font-semibold">How to activate Behold! Fate Defying Dragon support buffs:</p>
        
          <div>
            <p class="font-semibold text-orange-300  mt-6">Stellar Drain</p>
            <p>Rampant Dragon Claws consumes Stellar Drain. 
            </p>
          </div>

          <div>
            <p class="font-semibold text-orange-300 mt-6">Dragon's Dominion (Breach State and Phy/Ele Taken Buff)</p>
           <p>Casting Ult grants teammates Dragon's Dominion status for 25s. This is also activated / refreshed upon Stellar Outburst activation.</p>
          </div>

          <div>
            <p class="font-semibold text-orange-300 mt-6">Trauma Inflict</p>
           <p>Rampant Dragon Claws adds 12 (S) / 36 (SS2) points to status trauma inflicted by the leader. </p>
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
       Castorice simulator. Stronger and easier playstyle.
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
            <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Eternal Fire ➔ Draconic Flame </p>
            <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Revitalized World </p>
          </div>
        </div>
        
      </div>
      <div class="mt-3 rounded-sm" >
        <p class="text-sm sm:text-base text-left">
          <li class="text-sm sm:text-base"> ER Lite mode: Equip Because of You sigil and get all three Ego signets on Floor 7.</li>
          <li class="text-sm sm:text-base"> Normal mode: You can complete the run with just one Ego signet (Eternal Fire), but having both Ego signets is a big improvement. You can get both Ego signets at the start by using Thorny Crown sigil, OR by resetting Floor 1 until you get another Ego portal, OR use Because of You support sigil and get the other two Ego signets on Floor 7.</li>
      </p>
        </div>
  
        <div class="divider  "></div>
        <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
        <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
          <!-- First Signet with 'Start' text -->

  
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
              <img src="/images/signets/Signets of Deliverance (Kevin).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold ">1</p>
            </div>
            
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Decimation (Kalpas).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold ">1</p>
            </div>      

            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Gold (Eden).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">1</p>
            </div>

            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Discipline (Aponia).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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
              <img src="/images/sigils/Burden.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/sigils/Because_of_You.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            </div>
            <p class="text-base sm:text-lg font-semibold">START (ER Lite)</p>
        </div>
  
        <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
          <div class="flex flex-row rounded-sm">
            <img src="/images/sigils/Burden.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/sigils/An_Old_Pals_Legacy.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            </div>
          <p class="text-base sm:text-lg font-semibold">START (Normal)</p>
      </div>
  
        <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
            <div class="flex flex-row rounded-sm">
              <img src="/images/sigils/Mad_Kings_Mask.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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
          <li>Activate Stellar Outburst.</li>
          <li>Hold ATK until Dragon Breath ends.</li>
          <li>Press ATK x2 ➔ Weapon.</li>
          <li>Press Ult.</li>
          <li>Repeat step 2-5.</li>
        </ol>
  
          <p class="mt-8 text-sm sm:text-base pb-4 text-center">
            Check out this showcase from Marisa Honkai:
        </p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/Z08YaRszlqE"
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
       Spam Ultimate (Dragon Torrent) and weapon skill.
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
            <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Searing Hunt ➔ Scorched Plains</p>
            <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Revitalized World </p>
          </div>
        </div>
        
      </div>
      <div class="mt-3 rounded-sm" >
        <p class="text-sm sm:text-base text-left">
          <li class="text-sm sm:text-base"> ER Lite mode: Equip Because of You sigil and get all three Ego signets on Floor 7.</li>
          <li class="text-sm sm:text-base"> Normal mode: You can complete the run with just one Ego signet (Searing Hunt), but having both Ego signets is a big improvement. You can get both Ego signets at the start by using Thorny Crown sigil, OR by resetting Floor 1 until you get another Ego portal, OR use Because of You support sigil and get the other two Ego signets on Floor 7.</li>
      </p>
        </div>
  
        <div class="divider  "></div>
        <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
        <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
          <!-- First Signet with 'Start' text -->

  
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
              <img src="/images/signets/Signets of Deliverance (Kevin).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold ">1</p>
            </div>

            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Decimation (Kalpas).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">1</p>
            </div>

            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Helix (Vill-V).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">1 or 2</p>
            </div>

            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Gold (Eden).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">1</p>
            </div>

            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Vicissitude (Hua).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">2</p>
            </div>

            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Stars (Griseo).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">1 or 2</p>
            </div>

            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Reverie (Pardofelis).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">1</p>
            </div>
  
        </div>
      <div class="mt-3 rounded-sm" >
        <p class="text-sm sm:text-base text-left">
          
          <li class="text-sm sm:text-base"> This playstyle utilizes all three skills: Ultimate, weapon and evasion (with Scorched Plains signet) - so a lot of signets can work. Just commit to 3 or 4 nexus for each run.</li>
          <li class="text-sm sm:text-base"> <b>Decimation 1:</b> Ver 8.4 has a special ER effect. When ER temperature is over 100°C, valk will quickly lose HP, down to 12% max HP. This makes Decimation 1 work on any valk. After v8.4, it's better to use Decimation 2, or other signets.</li>
           
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
              <img src="/images/sigils/Burden.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/sigils/Because_of_You.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            </div>
            <p class="text-base sm:text-lg font-semibold">START (ER Lite)</p>
        </div>
  
        <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
          <div class="flex flex-row rounded-sm">
            <img src="/images/sigils/Burden.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/sigils/An_Old_Pals_Legacy.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            </div>
          <p class="text-base sm:text-lg font-semibold">START (Normal)</p>
      </div>
  
        <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
            <div class="flex flex-row rounded-sm">
              <img src="/images/sigils/Mad_Kings_Mask.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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
          <li>Press Weapon once. This gathers enemies and activate any buffs triggered by weapon cast. </li>
          <li>Use Ultimate. Hold Ult button until Ult ends. </li>
          <li>Press Weapon ➔ Weapon follow up. Do this two more times (until full meter). </li>
          <li>Repeat step 2-4. </li>
        </ol>
  
    
          <p class="mt-8 text-sm sm:text-base pb-4 text-center">
            Check out this showcase from Marisa Honkai:
        </p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/N_cggCdd8XE"
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
              <li>S2: Time fracture might be good for Arena.</li>
              <li>SS: Switch CD reduction improves rotation.</li>              
              <li>SSS: Initial AR +25.</li>
            </ul>
          </div>
      
          <!-- Support Upgrade Box -->
          <div class="flex-1 p-2 bg-gray-800 rounded-lg shadow-md border border-yellow-400">
            <h3 class="text-lg font-semibold text-yellow-400 mb-2">Support Upgrade</h3>
            <ul class=" text-slate-100 text-sm sm:text-base">
              <li>S1: DMG buff. </li>
              <li>SS: Switch CD reduction improves rotation.</li>              
              <li>SS2: Adds 24 more points to status trauma.</li>
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
          <td class="p-3">UNLOCK: Enemies take 12% more Elemental DMG, 10% more Physical DMG from characters with Dragon's Dominion.</td>
          <td class="p-3 text-center">Support</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3 text-center font-bold text-blue-300">S2</td>
          <td class="p-3 space-y-2">
            <div>- UNLOCK: When Dragon Breath ends, trigger 2s time fracture.</div>
            <div>- As leader: When there are 2/3 Rite of Oblivion characters in the team, BFD gain Total DMG and Fire DMG +31%/54% (S) ➔ +35%/60% (S2).</div>

          </td>
          <td class="p-3 text-center">DPS, Arena</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3 text-center font-bold text-blue-300">S3</td>
          <td class="p-3 space-y-2">
            <div>Leader Skill:</div>
            <div>- Team Total DMG +8% (S) ➔ 10% (S3).</div>
            <div>- Team Physical and Elemental DMG +8% (S) ➔ 10% (S3).</div>
            <div>- Enemies take 4% (S) ➔ 5% (S3) more Total DMG.</div>
          </td>
          <td class="p-3 text-center">DPS</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3 text-center font-bold text-yellow-300">SS</td>
          <td class="p-3 space-y-2">
            <div>- UNLOCK: Self Ignite DMG +8%.</div>
            <div>- When AR is activated: When a teammate consumes Stellar Drain, your switch CD -1s (S) ➔ -8s (SS), and trigger your QTE.</div>
          </td>
          <td class="p-3 text-center">DPS, Support</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3 text-center font-bold text-yellow-300">SS1</td>
          <td class="p-3">
            BFD takes 10% (S) ➔ 30% (SS1) less Total DMG.
          </td>
          <td class="p-3 text-center">Wasting crystals</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3 text-center font-bold text-yellow-300">SS2</td>
          <td class="p-3">
            When Rampant Dragon Claw hits a target, if the target has a status trauma from the leader, and the trauma is not full, add 12 (S) ➔ 36 (SS2) points to the trauma.
          </td>
          <td class="p-3 text-center">DPS, Support</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3 text-center font-bold text-yellow-300">SS3</td>
          <td class="p-3 space-y-2">
            <div>Leader Skill:</div>
            <div>- Team Total DMG +10% (S3) ➔ 12% (SS3).</div>
            <div>- Team Physical and Elemental DMG +10% (S3) ➔ 12% (SS3).</div>
            <div>- Enemies take 5% (S3) ➔ 6% (SS3) more Total DMG.</div>
          </td>
          <td class="p-3 text-center">DPS</td>
        </tr>
        <tr class="hover:bg-gray-700/40">
          <td class="p-3 text-center font-bold text-red-400">SSS</td>
          <td class="p-3">
            As the leader: Initial AR +25.
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
              <p>	UNLOCK: Enemies take 12% more Elemental DMG, 10% more Physical DMG from characters with Dragon's Dominion.	
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
- UNLOCK: When Dragon Breath ends, trigger 2s time fracture. <br/>
- As leader: When there are 2/3 Rite of Oblivion characters in the team, BFD gain Total DMG and Fire DMG +31%/54% (S) ➔ +35%/60% (S2).
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
              - Team Total DMG +8% (S) ➔ 10% (S3).<br/>
              - Team Physical and Elemental DMG +8% (S) ➔ 10% (S3). <br/>
              - Enemies take 4% (S) ➔ 5% (S3) more Total DMG.

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
- UNLOCK: Self Ignite DMG +8%.
<br/>
- When AR is activated: When a teammate consumes Stellar Drain, your switch CD -1s (S) ➔ -8s (SS), and trigger your QTE.

            </p>
            <p class="mt-2"><strong>Good for:</strong> DPS, Support
</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(5)}>
            <span>SS1</span>
            <span class="text-md">{openItem === 5 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 5 ? 'open' : ''}">
            <p>	BFD takes 10% (S) ➔ 30% (SS1) less Total DMG.</p>
            <p class="mt-2"><strong>Good for:</strong> Wasting crystals

            </p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(6)}>
            <span>SS2</span>
            <span class="text-md">{openItem === 6 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 6 ? 'open' : ''}">
            <p>When Rampant Dragon Claw hits a target, if the target has a status trauma from the leader, and the trauma is not full, add 12 (S) ➔ 36 (SS2) points to the trauma.
            </p>
            <p class="mt-2"><strong>Good for:</strong> DPS, Support
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
              - Team Total DMG +10% (S3) ➔ 12% (SS3).
<br/>
- Team Physical and Elemental DMG +10% (S3) ➔ 12% (SS3).
<br/>
- Enemies take 5% (S3) ➔ 6% (SS3) more Total DMG.

            <p class="mt-2"><strong>Good for:</strong> DPS</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(8)}>
            <span>SSS</span>
            <span class="text-md">{openItem === 8 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 8 ? 'open' : ''}">
            <p>	As the leader: Initial AR +25.	 </p>
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
          <h2 class="text-xl  font-semibold mb-4 text-left text-slate-100 cooltext">BFD DPS Rotation (Premium Team)</h2>

          <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/eHCHwBteXeo"
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
          <h2 class="text-xl  font-semibold mb-4 text-left text-slate-100 cooltext">BFD DPS Rotation (Cheaper Team)</h2>

          <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/D4RQSLIJeTc"
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
          <h2 class="text-xl  font-semibold mb-4 text-left text-slate-100 cooltext">GoInfinitude, LoAscension and Vita Support Sequence</h2>


          <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/zHBdvqyQ5bw"
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

