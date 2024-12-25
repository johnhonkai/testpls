
<svelte:head>
  <title>Palatinus Equinox</title> 

    <meta property="og:title" content="Durandal - Palatinus Equinox" />
    <meta property="og:description" content="Palatinus Equinox Guide, Builds and Gameplay" />
    <meta property="og:image" content="" />
    <meta property="og:url" content="https://marisaimpact.com/valk/pe" />
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
	import Sirindps from "$lib/components/lineup/sirindps.svelte";
	import P1physical from "$lib/components/lineup/p1physical.svelte";
	import P1ice from "$lib/components/lineup/p1ice.svelte";
	import Ice3support from "$lib/components/lineup/ice3support.svelte";
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
  //{ name: 'How to Play', short: 'howtoplay' },
  // { name: 'Gameplay Examples', short: 'example' },
  { name: 'Elysian Realm', short: 'er' },
  { name: 'Rank Up', short: 'rank' },
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
$: totalItems = 2; // Total categories or groups in the lineup section
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
  let fovlikes = likesData["pe"] || 0; // Get initial likes from JSON
  const charName = "pe"; // Route name for this character
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

    fovlikes++;

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


<section class="relative mx-auto flex flex-row items-center justify-center px-4 md:p-2 gap-3 md:pb-0  md:mt-0  pt-2	sm:pt-0	">
  <div class="absolute   top-0 w-full h-[90vh] z-[-10] opacity-85 " id="bgwavebox">    
    <img src="/images/bg/wave_prom.svg" alt="Lone Planetfarer" class="w-full h-full object-cover overflow-hidden" /> 
  </div>
  
  
  
  <!-- Left: Character Image -->
  <div class="relative  w-auto h-48 sm:h-60 md:h-72 flex justify-center " id="valkpicbox">
    <!-- Image for Larger Screens -->
    <img src="/images/valkfull/pe.webp" alt="Sirin" class="h-full w-auto object-cover md:object-contain  " style ="view-transition-name: valkyrie-image-31;"/> 
  
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
        <span class="text-white font-semibold">{fovlikes}</span>
      </button>
    </div>
  
  </div>
  
  
  
  <!-- Right: Character Info (Centered) -->
  <div class="flex flex-col items-center text-center justify-start">
    <!-- Battlesuit Name -->
  
    <div>
    <h1 class="text-xl md:text-2xl text-slate-100 font-bold text-center leading-4 mb-4 sm:mb-0">Palatinus Equinox</h1>
  </div>
    <!-- Character Name and Release Date -->
    <p class="text-base md:text-md custom-font mb-2 text-center tracking-wider md:block hidden text-slate-100">Durandal | Release Date: v5.5 (24 Feb 2022)  </p>
  
    <!-- Common wrapper to ensure same width -->
    <div class="w-full max-w-sm mb-2">
      <!-- Container with 4 pictures (Centered) -->
      <div class="flex flex-col items-center">
        <div class="flex w-[260px] md:w-[300px] gap-2 flex-wrap justify-center outline outline-zinc-500 outline-1 bg-zinc-950/75 rounded-lg p-2 backdrop-blur-sm">
          <img src="/images/ranks/Valkyrie_S.webp" alt="S-rank" class="w-auto h-8 md:h-10" />
          <img src="/images/type/IconIMG.png" alt="Mech" class="w-auto h-8 md:h-10" />
          <img src="/images/element/Core_Physical.png" alt="Icon 3" class="w-auto h-8 md:h-10" />
  
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
    <h2 class="text-2xl sm:text-3xl font-semibold bg-gradient-to-r  from-blue-700 to-blue-500 text-white rounded px-2 mb-4  text-center">OVERVIEW</h2>

    <div>
        <!-- Roles Section -->
        <h2 class="text-xl  font-semibold mb-2 text-left cooltext text-slate-100">ROLES</h2>
        
        <p class="mt-2 text-sm sm:text-base">
            <strong class="text-amber-400">Dual Form Part 1 DPS</strong> <br/>
            Palatinus Equinox (PE) is a Part 1 Physical DPS that specializes against certain IMG enemies. Her Ult transfers 150% DMG from Nihilius Shell to its Seed.
        </p>

        <div class="divider divider-neutral"></div>
        <!-- Pull Recommendation Section -->
        <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext ">PULL RECOMMENDATION</h2>

        <p class="text-sm sm:text-base mt-4 mb-4">
          <strong class="text-amber-400">F2P Players</strong> <br/> Only use your crystal to pull Part 2 valkyries, since they use a new Astral Ring system. If PE and her weapon are available through other means, such as spending event or Battle Pass, you can consider getting them that way.
      </p>

        <p class="text-sm sm:text-base mt-4">
            <strong class="text-amber-400">Competitive</strong> <br/> No top score.
        </p>

        <div class="divider divider-neutral"></div>
        <!-- How to Get Section -->
        <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">HOW TO GET</h2>
        <ul class="list-disc ml-6 text-sm sm:text-base ">
            <li ><strong>PE:</strong> Battlesuit Supply.</li>
            <li ><strong>Midnight Eclipse:</strong> Focused Supply.</li>
            <li ><strong>G4 Bianka Theater:</strong> Foundry.</li>
            <li>Very old valkyrie, so expect her to only be available from events or ADV Supply.</li>

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
              src="https://www.youtube.com/embed/qjXM6P-FJjc"
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

    <P1physical></P1physical>

</section>

  {/if}

      {#if selectedTab === 'Equipment'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-gradient-to-r  from-blue-700 to-blue-500 text-white rounded px-2 mb-2 text-center">EQUIPMENT</h2>
 
      <div>


              <h2 class="text-xl font-semibold text-center  text-yellow-400">BEST</h2>

              <div class="flex flex-col justify-center items-center">
                  
              <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">

                <div class="w-20 h-20 sm:w-28 sm:h-28">
                  <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2022/01/17/6100274/2a234b1df6bcffec694ea582752af359_4060117820588070482.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
              </div>

              <div class="w-20 h-20 sm:w-28 sm:h-28">
                  <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2022/01/07/6100274/41e4d989af800e4d7fd72b6f42c6cc33_4282086594759474453.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
              </div>

              <div class="w-20 h-20 sm:w-28 sm:h-28">
                  <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2022/01/07/6100274/4b335e379a0646bdedead6f2ca9f0b7a_6484465932610883565.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
              </div>

              <div class="w-20 h-20 sm:w-28 sm:h-28">
                  <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2022/01/07/6100274/1c8667b918d8d70b8d0d812fa66cf58f_8638048929336059481.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
              </div>

              </div>  
              <h4 class="text-base sm:text-base text-white"> Midnight Ataegina + Bianka Theater set</h4>
              </div>



           </div>

           <div>



            <div class="p-4 mt-4 bg-gradient-to-r from-orange-950/75 to-orange-900/75 rounded">
              <p class="text-sm sm:text-base text-left mb-4">
                <b>Midnight Ataegina </b><br/> Big damage buffs, and enables Guardian Form to shoot.
              </p>
            
              <p class="text-sm sm:text-base text-left mb-4">
                <b>G4 Bianka Theater</b><br/> - 2PC triggers enhancement on all pieces, 3PC is a big dmg buff for Ultimate skill.
                <br/>- Forgeable in Foundry.
              </p>
            
              <p class="text-sm sm:text-base text-left">
                <b>Affix</b> <br/>Ideally, 4 ATK and 2 Crit DMG lines. Full ATK is also fine.
              </p>
            </div>


            </div>

            <div class="divider divider-neutral"></div>

  

      {/if}


      {#if selectedTab === 'Elysian Realm'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-gradient-to-r  from-blue-700 to-blue-500 text-white rounded px-2 mb-2 text-center">ELYSIAN REALM</h2>

      <div class="flex justify-center gap-4 my-6">
          <button
            on:click={() => setPlaystyle('1')}
            class={`px-4 py-2 font-semibold rounded ${activePlaystyle === '1' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gradient-to-r from-orange-600 to-amber-500 hover:text-white'}`}
          >
          KNIGHT FORM
          </button>
        
          <button
            on:click={() => setPlaystyle('2')}
            class={`px-4 py-2 font-semibold rounded ${activePlaystyle === '2' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gradient-to-r from-orange-600 to-amber-500 hover:text-white'}`}
          >
            GUARDIAN FORM
          </button>
        </div>
      
        {#if activePlaystyle === '2'}
        <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">Guardian Form Playstyle</h2> 
        <p class="text-sm sm:text-base text-center sm:text-left">
         Weaker playstyle, and more complicated than the sprint charge playstyle.
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
              <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Exodus + Abyssal Chant</p>
              <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Equinox </p>
            </div>
          </div>
          
        </div>
        <div class="mt-3 rounded" >
          <p class="text-sm sm:text-base text-left">
              <li class="text-sm sm:text-base"> ER Lite mode: Equip Because of You sigil and get all three Ego signets on Floor 7.</li>
              <li class="text-sm sm:text-base"> Normal mode: You can complete the run with just one Ego signet (Exodus), but having both Ego signets is a big improvement. You can get both Ego signets at the start by using Thorny Crown sigil, OR by resetting Floor 1 until you get another Ego portal, OR use Because of You support sigil and get the other two Ego signets on Floor 7.</li>
          </p>
          </div>

          <div class="divider divider-neutral"></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            <!-- First Signet with 'Start' text -->
              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
                <img src="/images/signets/Signets of Helix (Vill-V).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold">1</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Setsuna (Sakura).png" alt="Signet 5" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">2</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Stars (Griseo).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold">1 or 2</p>
              </div>


              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Vicissitude (Hua).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold">2</p>
              </div>


              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Reverie (Pardofelis).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold">1</p>
              </div>

          </div>
          <div class="mt-3 rounded" >
            <p class="text-sm sm:text-base text-left">
                <li class="text-sm sm:text-base"> Setsuna: You want to get [Fuji] signet as early as you can for the evasion charge +1 and evasion cd reduction to keep spamming Evade > Charged ATK</li>
            </p>
            </div>

            <div class="divider divider-neutral"></div>
            <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SUPPORTS</h2>

          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            
            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
              <div class="flex flex-row rounded">
                <img src="/images/valkportrait/Theresa Starlit Astrologos.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              </div>
              <p class="text-base sm:text-lg font-semibold">START</p>
          </div>

          <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
              <div class="flex flex-row rounded">
                <img src="/images/valkportrait/Theresa Starlit Astrologos.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              </div>
              <p class="text-base sm:text-lg font-semibold">MID</p>
          </div>

          <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
              <div class="flex flex-row rounded">
                <img src="/images/valkportrait/Bronya Snowy Sniper.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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
              <img src="/images/sigils/Pseudo_Miracle.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/sigils/Because_of_You.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            </div>
              <p class="text-base sm:text-lg font-semibold">START (ER Lite)</p>
          </div>

          <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
              <div class="flex flex-row rounded">
                <img src="/images/sigils/Pseudo_Miracle.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/sigils/Falling_in_Past_Light.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              </div>
              <p class="text-base sm:text-lg font-semibold">START (Normal)</p>
          </div>

          <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
              <div class="flex flex-row rounded">
                  <img src="/images/sigils/Faraway_Ship.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  <img src="/images/sigils/Falling_in_Past_Light.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              </div>
              <p class="text-base sm:text-lg font-semibold">FINAL</p>
          </div>


          </div>

          
          <div class="divider divider-neutral"></div>
          <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">HOW TO PLAY</h2>

          <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>If you have evasion charge: Evade forward and hit the enemy.</li>
          <li>If you don't have evasion charge: With Midnight Eclipse equipped, spam weapon until meter is full.</li>
          <li>If you don't have evasion charge: Without Midnight Eclipse equipped, spam ATK until meter is full.</li>
          <li>When meter is full, use Charged ATK, then press weapon for follow-up attack</li>
          <li>If ult is available, use Ultimate to trigger Equinox buff, and refresh evasion charges.</li>
          <li>Repeat</li>
          <li>For the first evasion, if you have enough sp, use Ultimate to trigger Equinox buff.</li>
        </ol>

        <p class="mt-8 text-sm sm:text-base pb-4 text-center">
            Check out this showcase from Marisa Honkai:
        </p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/LVC2pPUk2Wg"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                loading="lazy">
            </iframe>
        </div>
        {/if}

        {#if activePlaystyle === '1'}
        <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">Knight Form Playstyle</h2> 
        <p class="text-sm sm:text-base text-center sm:text-left">
          Charges at the enemies. Stronger and easier playstyle. Your HP will be very low, but you gain a durable shield.
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
              <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Gallop + Abyssal Chant</p>
              <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Equinox </p>
            </div>
          </div>
        </div>
        <div class="mt-3 rounded" >
          <p class="text-sm sm:text-base text-left">
              <li class="text-sm sm:text-base"> ER Lite mode: Equip Because of You sigil and get all three Ego signets on Floor 7.</li>
              <li class="text-sm sm:text-base"> Normal mode: [Gallop] enables the playstyle, and [Abyssal Chant] keeps evasion charges up. You can get both Ego signets at the start by using Thorny Crown sigil, OR by resetting Floor 1 until you get another Ego portal, OR use Because of You support sigil and get the other two Ego signets on Floor 7.</li>
          </p>
          </div>
          
          <div class="divider divider-neutral"></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            <!-- First Signet with 'Start' text -->
            <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
              <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
              <img src="/images/signets/Signets of Decimation (Kalpas).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">1</p>
            </div>

            <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
              <img src="/images/signets/Signets of Setsuna (Sakura).png" alt="Signet 5" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold ">1</p>
            </div>

            <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
              <img src="/images/signets/Signets of Stars (Griseo).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">1 or 2</p>
            </div>

            <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
              <img src="/images/signets/Signets of Vicissitude (Hua).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">2</p>
            </div>


            <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
              <img src="/images/signets/Signets of Reverie (Pardofelis).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">1</p>
            </div>

          </div>
          <div class="mt-3 rounded" >
            <p class="text-sm sm:text-base text-left">
                <li class="text-sm sm:text-base"> Setsuna: You want to get [Fuji] signet as early as you can for the evasion charge +1 and evasion cd reduction to keep spamming Evade > Charged ATK</li>
            </p>
            </div>

            <div class="divider divider-neutral"></div>
            <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SUPPORTS</h2>

          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            
            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
              <div class="flex flex-row rounded">
                <img src="/images/valkportrait/Theresa Starlit Astrologos.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              </div>
              <p class="text-base sm:text-lg font-semibold">START</p>
          </div>

          <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
              <div class="flex flex-row rounded">
                <img src="/images/valkportrait/Theresa Starlit Astrologos.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              </div>
              <p class="text-base sm:text-lg font-semibold">MID</p>
          </div>

          <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
              <div class="flex flex-row rounded">
                <img src="/images/valkportrait/Bronya Snowy Sniper.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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
              <img src="/images/sigils/Mad_Kings_Mask.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/sigils/Because_of_You.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              </div>
              <p class="text-base sm:text-lg font-semibold">START (ER Lite)</p>
          </div>

          <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
              <div class="flex flex-row rounded">
                <img src="/images/sigils/Mad_Kings_Mask.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/sigils/An_Old_Pals_Legacy.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              </div>
              <p class="text-base sm:text-lg font-semibold">START (Normal)</p>
          </div>

          <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
              <div class="flex flex-row rounded">
                  <img src="/images/sigils/Tin_Flask.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  <img src="/images/sigils/An_Old_Pals_Legacy.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              </div>
              <p class="text-base sm:text-lg font-semibold">FINAL</p>
          </div>


          </div>

          
          <div class="divider divider-neutral"></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">HOW TO PLAY</h2>

          <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
            <li>Press Ult to switch to Knight Form.</li>
            <li>Press evade, then hold ATK to charge.</li>
            <li>After charge finisher, you gain full meter. Hold ATK to charge again.</li>
            <li>Repeat step 2-3 until Ult is available. Use Ultimate to refresh evasion charges.</li>
          </ol>


          <h2 class="text-md font-semibold mb-2  text-left text-white">Technical Info</h2>

          <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
            <li>If you have extra evasion charges from Setsuna signet, then you can do [evade > charge > evade > charge] instead of [evade > charge > charge] </li>
            <li>If you have Setsuna enhanced signet Ame-Shiko, your Ult will refresh early, but you will probably be lacking in sp. This is completely optional, can consider picking up Gold signet for sp regen (or any signet that gives sp regen).</li>
          </ol>
  
  

        <p class="mt-2 text-sm sm:text-base pb-4 text-center">
            Check out this showcase from Marisa Honkai:
        </p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/ZqO6Qks0gEk"
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
                  Enemies take 20% ➔ 25% more Physical DMG from PE (independent multiplier).
                </td>
                <td class="p-3">Independent, so big dmg buff.</td>
              </tr>
              <!-- Sample Row 2 -->
              <tr>
                <td>S2</td>
                <td>
                 UNLOCK: Initial sp +40

                </td>
                <td>Memorial Arena</td>
                            </tr>
              <tr>
                <td>S3</td>
                <td>
                  Leader Skill: Team Physical DMG +24% ➔ 27%. Weapon skill Crit Rate +33% ➔ 34%.
                </td>
                <td>DPS</td>

              </tr>
              <tr>
                <td>SS</td>
                <td>
                  UNLOCK: Each sequence of Sprint deal additional 30% ATK of Physical DMG.
                </td>
                <td> DPS</td>
              </tr>
              <tr>
                <td>SS1</td>
                <td>
                  - Equinox Severance SEQ 2 deal additional 200% ➔ 400% ATK of Physical DMG.
                  <br/>
                  - Elite Thrust deal additional 200% ➔ 400% ATK of Physical DMG.
                </td>
                                  
            <td> DPS </td>

              </tr>
              <tr>
                <td>SS2</td>
                <td>
                  Ult Total DMG +26.1% ➔ 40%.
                </td>
                <td> Good against IMG enemies. </td>
              </tr>
              <tr>
                <td>SS3</td>
                <td>
                  Leader Skill: Team Physical DMG +27% ➔ 30%. Weapon skill Crit Rate +34% ➔ 35%.


                </td>
                <td>DPS</td>
              </tr>
              <tr>
                <td>SSS</td>
                <td>
                  - UNLOCK: PE Total DMG +20%.
                  <br/>
                  - Switching from resets evasion cd, can only trigger every 12s ➔ 8s.
                </td>
                <td> DPS</td>
              </tr>
            </tbody>
          </table>
        </div>


      {/if}


      {#if selectedTab === 'How to Play'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded px-2 mb-2 text-center">HOW TO PLAY</h2>
  
      <div class=" gap-6 mt-4">
          <!-- Video 1 with title and description -->
          <div class="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">FoV DPS</h2>

            <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">Around 4:27</p>

            <div class="relative overflow-hidden" style="padding-top: 56.25%;">
              <iframe
                  class="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/xBoYcLBsnZ0"
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
  
      <div class=" gap-6 mt-5 mb-10">

        <div class="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">Herrscher of Human DPS</h2>

          <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">HoH vs Hellmaru Red Lotus</p>

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
  
  {#if selectedTab === 'Popular Question'}
  <h2 class="text-2xl sm:text-3xl font-semibold bg-gradient-to-r  from-blue-700 to-blue-500 text-white rounded px-2 mb-2 text-center">POPULAR QUESTION</h2>


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

      <div class="flex flex-col justify-center items-center">
          
        <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">

            <div class="w-20 h-20 sm:w-28 sm:h-28">
                <img src="/images/valkportrait/Durandal Palatinus Equinox.png" alt="Vita" class="w-full h-full object-cover">
            </div>

        </div>  
        <p class="text-sm sm:text-base text-white">Passive Subskill 3</p>

    </div>

    <div class="text-center my-4 rounded bg-gray-700">
      <p class="text-left text-sm sm:text-base px-2 py-3">
        <b>In-Game Text:</b><br/>
        Enemies take 25% bonus Physical DMG from Palatinus Equinox (cannot stack).
      </p>
    </div>

    <div class="text-center my-4 rounded bg-cyan-800">
      <p class="text-left text-sm sm:text-base px-2 py-3 text-white">
        <b>Correct Translation:</b><br/>
        Enemies take 25% bonus Physical DMG from Palatinus Equinox (independent multiplier).
      </p>
    </div>
      {/if}


  </div>

</section>


</div>

</section>


</div>
