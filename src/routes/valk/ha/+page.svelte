
<svelte:head>
  <title>位面武器·失序时空</title> 

    <meta property="og:title" content="位面武器·失序时空" />
    <meta property="og:description" content="位面武器·失序时空 Guides, Builds and Gameplay" />
    <meta property="og:image" content="" />
    <meta property="og:url" content="https://marisaimpact.com/valk/ha" />
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
	import Dududps from '$lib/components/lineup/dududps.svelte';
	import Lanterndps from "$lib/components/lineup/lanterndps.svelte";
	import Jddps from "$lib/components/lineup/jddps.svelte";
	import Thelemadps from "$lib/components/lineup/thelemadps.svelte";
	import Badumdps from "$lib/components/lineup/badumdps.svelte";
	import Senadps from "$lib/components/lineup/senadps.svelte";
	import Simpdps from "$lib/components/lineup/simpdps.svelte";
	import Sparkledps from "$lib/components/lineup/sparkledps.svelte";
	import Psdps from "$lib/components/lineup/psdps.svelte";
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
 // { name: 'Equipment', short: 'equipment' },
 // { name: 'Support Buffs', short: 'support' },
 // { name: 'How to Play', short: 'howtoplay' },
 // { name: 'Gameplay Examples', short: 'example' },
 //{ name: 'Elysian Realm', short: 'er' },
 // { name: 'Rank Up', short: 'rank' },
 // { name: 'Popular Question', short: 'qna' },
 // { name: 'Overview Card', short: 'card' },
 // { name: 'Translation Error', short: 'translation' },
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
  let durandallikes = likesData["ha"] || 0; // Get initial likes from JSON
  const charName = "ha"; // Route name for this character
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
.like-container {
    display: flex;
    align-items: center;
    gap: 8px;
}
</style>

<section class="relative mx-auto flex flex-row items-center justify-center px-4 md:p-2 gap-3 md:pb-0  md:mt-0  pt-2	sm:pt-0">
  <div class="absolute   top-0 w-full h-[90vh] z-[-10] opacity-85 " id="bgwavebox">    
    <img src="/images/bg/wave_fov.svg" alt="Durandal wave" class="w-full h-full object-cover overflow-hidden" /> 
  </div>



<!-- Left: Character Image -->
<div class="relative  w-auto h-48 sm:h-60 md:h-72 flex justify-center mt-4" id="valkpicbox">
  <!-- Image for Larger Screens -->
  <img src="/images/valkfull/new helia.webp" alt="Peregrine Sword" class="h-full w-auto object-cover md:object-contain  " style ="view-transition-name: valkyrie-image-55;"/> 
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
        <span class="text-white font-semibold">{durandallikes}</span>
    </button>
</div>

</div>



<!-- Right: Character Info (Centered) -->
<div class="flex flex-col items-center text-center justify-start">
  <!-- Battlesuit Name -->
  <h1 class="text-xl md:text-2xl text-slate-100 font-bold text-center leading-4 mb-4 sm:mb-0 mt-4">位面武器·失序时空 (BETA)</h1>

  <!-- Character Name and Release Date -->
  <p class="text-base md:text-md text-center md:block hidden text-slate-300 my-2">Erdős Helia | Release Date: v8.3 (26 June 2025)  </p>

  <!-- Common wrapper to ensure same width -->
  <div class="w-full max-w-sm mb-2">
    <!-- Container with 4 pictures (Centered) -->
    <div class="flex flex-col items-center" id="typebox">
      <div class="flex w-[260px] md:w-[300px] gap-2 flex-wrap justify-center outline outline-emerald-500 outline-1 bg-emerald-950/75 rounded-lg p-2 backdrop-blur-xs">
        <img src="/images/ranks/Valkyrie_S.webp" alt="S-rank" class="w-auto h-8 md:h-10" />
        <img src="/images/type/IconBIO.png" alt="IMG" class="w-auto h-8 md:h-10" />
        <img src="/images/element/Core_Lightning_DMG.png" alt="Lightning" class="w-auto h-8 md:h-10" />
        <img src="/images/artype/ar grail.png" alt="ar" class="w-auto h-8 md:h-10" />
      </div>
    </div>

    <!-- Support For Container (Centered) -->
    <div class="flex flex-col mt-4 items-center" id="arbox">

      <div class="flex flex-col  w-[260px] md:w-[300px] flex-wrap justify-center outline outline-emerald-500 outline-1 bg-emerald-950/75 rounded-lg p-2 backdrop-blur-xs">
        <div class="flex flex-wrap justify-center">
          <h2 class="text-base md:text-md custom-font tracking-wider text-slate-100">SUPPORT FOR:</h2>
        </div >
        <div class="flex flex-row gap-2 flex-wrap justify-center">
          <img src="/images/artype/ar loa.webp" alt="Support 1" class="w-auto h-8 md:h-10" />
          <img src="/images/artype/ar grail.png" alt="Support 1" class="w-auto h-8 md:h-10" />

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
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-4 text-center">OVERVIEW</h2>

      <div>
          <!-- Roles Section -->
          <h2 class="text-xl  font-semibold mb-2 text-left cooltext text-slate-100">ROLES</h2>
          
          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">DPS</strong> 
              <br/>
              To Be Updated.
            </p>


          
          <div class="divider  "></div>
          <!-- Pull Recommendation Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">PULL RECOMMENDATION</h2>
          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">New Players</strong> <br/> Recommended to get New Helia in v8.3.
            </p>

          <div class="divider  "></div>
          <!-- How to Get Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">HOW TO GET</h2>
          <ul class="list-disc ml-6 text-sm sm:text-base ">
              <li ><strong>Battlesuit:</strong> Battlesuit Supply</li>
              <li><strong>Weapon:</strong> Equipment Supply</li>
              <li><strong>Stigma:</strong> Equipment Supply, Forgeable, Free stigma box in 8.3</li>
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




      {#if currentPage === 1}
      <!-- Category 1: Vita DPS -->

      <Psdps maindps={true} ></Psdps>

      <div class="divider divider-accent text-xl custom-font tracking-wider text-teal-300 mt-16"> Law of Ascension Support </div>
      
      <Badumdps firstCharName="PS"></Badumdps >

      <div class="divider  "></div>

      <Dududps firstCharName="PS"></Dududps>

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
            <img src="https://act-upload.mihoyo.com/bh3-wiki/2025/03/07/50494840/8ec6127a6d4363462a001191b6d4cc35_1812491884462959797.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
        </div>

        <div class="w-20 h-20 sm:w-28 sm:h-28">
          <img src="https://act-upload.mihoyo.com/bh3-wiki/2025/03/12/9917988/ced58aa0b298cb83be62a620ff7cd33d_3065648174616263356.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
      </div>

      <div class="w-20 h-20 sm:w-28 sm:h-28">
          <img src="https://act-upload.mihoyo.com/bh3-wiki/2025/03/12/9917988/9235e966b346ec0806897a73e0deb58c_1611100570569610354.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
      </div>

      <div class="w-20 h-20 sm:w-28 sm:h-28">
          <img src="https://act-upload.mihoyo.com/bh3-wiki/2025/03/12/9917988/0baf38c937ac92a238b9526dbce45437_5545858369582851653.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
      </div>

        </div>  
        <h4 class="text-base sm:text-base text-white"> Jadeite Sleeves + Newfound Joys set</h4>
        </div>



     </div>

     <div>



      <div class="p-4 mt-4 bg-linear-to-r from-teal-950/75 to-teal-900/75 rounded-sm">
        <p class="text-sm sm:text-base text-left mb-4">
          <b>Jadeite Sleeves </b><br/> - Best weapon for Peregrine Sword, huge self buffs and team buffs.
          <br/>- Utility: Resets weapon skill after an enemy's HP reaches 0. This is used for Flux Lantern boss transition phase.
        </p>

        <p class="text-sm sm:text-base text-left mb-4">
          <b>Newfound Joys set</b><br/> - Huge buffs.
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
        class={`px-4 py-2 font-semibold rounded-sm ${activePlaystyle === '1' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-linear-to-r from-orange-600 to-amber-500 hover:text-white'}`}
      >
        AUGMENTED ASCENSION
      </button>


        <button
          on:click={() => setPlaystyle('2')}
          class={`px-4 py-2 font-semibold rounded-sm ${activePlaystyle === '2' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-linear-to-r from-orange-600 to-amber-500 hover:text-white'}`}
        >
        UMBRELLA THROW
        </button>
      

      </div>
    

  
      {#if activePlaystyle === '1'}
      <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">Augmented Ascension Playstyle</h2> 
      <p class="text-sm sm:text-base text-center sm:text-left">
       Enhanced Augmented Ascension playstyle.
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
            <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Emerald Edge ➔ Gallant Hero</p>
            <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b>   Five Flavors </p>
          </div>
        </div>
        
      </div>
      <div class="mt-3 rounded-sm" >
        <p class="text-sm sm:text-base text-left">
          <li class="text-sm sm:text-base"> ER Lite mode: Equip Because of You sigil and get all three Ego signets on Floor 7.</li>
          <li class="text-sm sm:text-base"> Normal mode: You can complete the run with just one Ego signet (Emerald Edge), but having both Ego signets is a big improvement. You can get both Ego signets at the start by using Thorny Crown sigil, OR by resetting Floor 1 until you get another Ego portal, OR use Because of You support sigil and get the other two Ego signets on Floor 7.</li>
      </p>
        </div>
  
        <div class="divider  "></div>
        <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
        <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
          <!-- First Signet with 'Start' text -->
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
              <img src="/images/signets/Signets of Daybreak (Kosma).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">1</p>
            </div>
  
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Bodhi (Su).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold ">1</p>
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
              <img src="/images/valkportrait/Bronya Snowy Sniper.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            </div>
            <p class="text-base sm:text-lg font-semibold">START</p>
        </div>
  
        <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
            <div class="flex flex-row rounded-sm">
              <img src="/images/valkportrait/Bronya Snowy Sniper.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            </div>
            <p class="text-base sm:text-lg font-semibold">MID</p>
        </div>
  
        <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
            <div class="flex flex-row rounded-sm">
              <img src="/images/valkportrait/Bronya Snowy Sniper.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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
              <img src="/images/sigils/Fragile_Friend.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/sigils/Because_of_You.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            </div>
            <p class="text-base sm:text-lg font-semibold">START (ER Lite)</p>
        </div>
  
        <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
          <div class="flex flex-row rounded-sm">
            <img src="/images/sigils/Fragile_Friend.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            <img src="/images/sigils/Out_of_Reach.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            </div>
          <p class="text-base sm:text-lg font-semibold">START (Normal)</p>
      </div>
  
        <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
            <div class="flex flex-row rounded-sm">
              <img src="/images/sigils/Light_as_a_Bodhi_Leaf.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/sigils/Empty_like_Shala.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            </div>
            <p class="text-base sm:text-lg font-semibold">MID</p>
        </div>
  
        <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
            <div class="flex flex-row rounded-sm">
              <img src="/images/sigils/Faraway_Ship.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/sigils/Falling_in_Past_Light.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              </div>
            <p class="text-base sm:text-lg font-semibold">FINAL</p>
        </div>
  
  
        </div>
  
        
        <div class="divider  "></div>
        <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">HOW TO PLAY</h2>
  
        <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>Use Stellar Outburst (Stellar Shift).</li>
          <li>Press ATK.</li>
          <li>Press Weapon three times.</li>
          <li>Repeat.</li>
          <li>Optional: You can use Ultimate to finish off a wave.</li>
        </ol>
  
  
      {/if}


      {#if activePlaystyle === '2'}
      <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">Umbrella Throw Playstyle</h2> 
      <p class="text-sm sm:text-base text-center sm:text-left">
       Spam evade and weapon.
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
            <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Leisurely Mood ➔ Riding Winds  </p>
            <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b>   Five Flavors </p>
          </div>
        </div>
        
      </div>
      <div class="mt-3 rounded-sm" >
        <p class="text-sm sm:text-base text-left">
          <li class="text-sm sm:text-base"> ER Lite mode: Equip Because of You sigil and get all three Ego signets on Floor 7.</li>
          <li class="text-sm sm:text-base"> Normal mode: You can complete the run with just one Ego signet (Leisurely Mood), but having both Ego signets is a big improvement. You can get both Ego signets at the start by using Thorny Crown sigil, OR by resetting Floor 1 until you get another Ego portal, OR use Because of You support sigil and get the other two Ego signets on Floor 7.</li>
      </p>
        </div>
  
        <div class="divider  "></div>
        <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
        <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
          <!-- First Signet with 'Start' text -->
          <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
            <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
            <img src="/images/signets/Signets of Daybreak (Kosma).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            <p class="text-lg font-semibold">1</p>
          </div>

          <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
            <img src="/images/signets/Signets of Bodhi (Su).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            <p class="text-lg font-semibold ">1</p>
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
              <img src="/images/valkportrait/Bronya Snowy Sniper.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            </div>
            <p class="text-base sm:text-lg font-semibold">START</p>
        </div>
  
        <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
            <div class="flex flex-row rounded-sm">
              <img src="/images/valkportrait/Bronya Snowy Sniper.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            </div>
            <p class="text-base sm:text-lg font-semibold">MID</p>
        </div>
  
        <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
            <div class="flex flex-row rounded-sm">
              <img src="/images/valkportrait/Bronya Snowy Sniper.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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
              <img src="/images/sigils/Fragile_Friend.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/sigils/Because_of_You.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            </div>
            <p class="text-base sm:text-lg font-semibold">START (ER Lite)</p>
        </div>
  
        <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
          <div class="flex flex-row rounded-sm">
            <img src="/images/sigils/Fragile_Friend.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            <img src="/images/sigils/Out_of_Reach.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            </div>
          <p class="text-base sm:text-lg font-semibold">START (Normal)</p>
      </div>
  
        <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
            <div class="flex flex-row rounded-sm">
              <img src="/images/sigils/Light_as_a_Bodhi_Leaf.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/sigils/Empty_like_Shala.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            </div>
            <p class="text-base sm:text-lg font-semibold">MID</p>
        </div>
  
        <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
            <div class="flex flex-row rounded-sm">
              <img src="/images/sigils/Faraway_Ship.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/sigils/Falling_in_Past_Light.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              </div>
            <p class="text-base sm:text-lg font-semibold">FINAL</p>
        </div>
  
  
        </div>
  
        
        <div class="divider  "></div>
        <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">HOW TO PLAY</h2>
  
        <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>Evade ➔ Weapon. Repeat three times.</li>
          <li>Press Weapon.</li>
          <li>Repeat.</li>
          <li>AOptional: You can use Ultimate to finish off a wave.</li>
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
              <li>S2: More Bleed DMG. </li>
              <li>All ranks have damage upgrades.</li>
            </ul>
          </div>
      
          <!-- Support Upgrade Box -->
          <div class="flex-1 p-2 bg-gray-800 rounded-lg shadow-md border border-yellow-400">
            <h3 class="text-lg font-semibold text-yellow-400 mb-2">Support Upgrade</h3>
            <ul class=" text-slate-100 text-base">
              <li>S2: Unlocks time fracture on demand. </li>
              <li>SSS: More hits for hitcount shields.</li>

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
                  Enemies take 30% ➔ 35% more Bleed DMG from PS, and 6% ➔ 8% more Total DMG from the team.
                </td>
                <td class="p-3">DPS <br/> Support </td>
              </tr>
              <!-- Sample Row 2 -->
              <tr>
                <td>S2</td>
                <td>

                  - UNLOCK: Casting Forest Piercer triggers evasion skill.
                  <br/>
                  - Self Bleed DMG +40% ➔ 42.5%

                </td>
                <td>DPS<br/>Time fracture on demand</td>
              </tr>
              <tr>
                <td>S3</td>
                <td>
                  Leader Skill:<br/>
                  - PS's Stellar Shift Physical DMG +18% ➔ 28%.
                  <br/>
                  - Enemies take 17% ➔ 18% more Physical DMG from PS (independent multiplier).

                </td>
                <td>DPS</td>
              </tr>
              <tr>
                <td>SS</td>
                <td>
                  - UNLOCK: Joint Weapon Skill Total DMG +20%.
                  <br/>
                  - Swaying with Wind and Rain Total DMG +50 ➔ 65% and restore 5 ➔ 6 sp for the team. When hitcount is >= 50, deal additional Physical DMG equal to hitcount x 1.5% ➔ 2% ATK
                </td>
                <td>DPS<br/>SP Regen</td>

              </tr>
              <tr>
                <td>SS1</td>
                <td>
                  Self Bleed DMG +42.5% ➔ 50%
                </td>
                <td>DPS
              </tr>
              <tr>
                <td>SS2</td>
                <td>
                  - UNLOCK: Casting QTE or Stellar Shift resets evasion skill.
                  <br/>
                  - Against bleeding enemies, gain Physical DMG +8% ➔ 12% and Total DMG +6% ➔ 8%.

                
                
                </td>
                <td>DPS </td>
              </tr>
              <tr>
                <td>SS3</td>
                <td>
                  Leader Skill:<br/>
                  - PS's Stellar Shift Physical DMG +28% ➔ 38%.
                  <br/>
                  - Enemies take 18% ➔ 19% more Physical DMG from PS (independent multiplier).

                </td>
                <td>DPS</td>
              </tr>
              <tr>
                <td>SSS</td>
                <td>
                  - Swaying with Wind and Rain Total DMG +65 ➔ 80% and restore 6 ➔ 7 sp for the team. When hitcount is >= 50, deal additional Physical DMG equal to hitcount x 2% ➔ 2.5% ATK
                  <br/>
                  - When any of CS attack hits, deal 3 ➔ 4 points of dmg to shields that only take fixed damage.
                </td>
                <td>DPS <br/> SP Regen </td>
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
              <p>	Enemies take 30% ➔ 35% more Bleed DMG from PS, and 6% ➔ 8% more Total DMG from the team.
              </p>
              <p class="mt-2"><strong>Good for:</strong> DPS, Support</p>
            </div>
          </div>

          <div class="accordion-item">
            <div class="accordion-title" on:click={() => toggleItem(2)}>
              <span>S2</span>
              <span class="text-md">{openItem === 2 ? '-' : '+'}</span>
            </div>
            <div class="accordion-content {openItem === 2 ? 'open' : ''}">
              <p>		- UNLOCK: Casting Forest Piercer triggers evasion skill. <br/>
                - Self Bleed DMG +40% ➔ 42.5%
              </p>
              <p class="mt-2"><strong>Good for:</strong> DPS, Time fracture on demand</p>
            </div>
          </div>

        

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(3)}>
            <span>S3</span>
            <span class="text-md">{openItem === 3 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 3 ? 'open' : ''}">
            <p>Leader Skill:<br/>
              - PS's Stellar Shift Physical DMG +18% ➔ 28%.<br/>
              - Enemies take 17% ➔ 18% more Physical DMG from PS (independent multiplier).	
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
            <p>- UNLOCK: Joint Weapon Skill Total DMG +20%. <br/>
              - Swaying with Wind and Rain Total DMG +50 ➔ 65% and restore 5 ➔ 6 sp for the team. When hitcount is >= 50, deal additional Physical DMG equal to hitcount x 1.5% ➔ 2% ATK
            </p>
            <p class="mt-2"><strong>Good for:</strong> DPS, SP Regen</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(5)}>
            <span>SS1</span>
            <span class="text-md">{openItem === 5 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 5 ? 'open' : ''}">
            <p>Self Bleed DMG +42.5% ➔ 50%</p>
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
            <p>- UNLOCK: Casting QTE or Stellar Shift resets evasion skill. <br/>
              - Against bleeding enemies, gain Physical DMG +8% ➔ 12% and Total DMG +6% ➔ 8%
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
              - PS's Stellar Shift Physical DMG +28% ➔ 38%.<br/>
              - Enemies take 18% ➔ 19% more Physical DMG from PS (independent multiplier).
            <p class="mt-2"><strong>Good for:</strong> DPS</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(8)}>
            <span>SSS</span>
            <span class="text-md">{openItem === 8 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 8 ? 'open' : ''}">
            <p>		- Swaying with Wind and Rain Total DMG +65 ➔ 80% and restore 6 ➔ 7 sp for the team. When hitcount is >= 50, deal additional Physical DMG equal to hitcount x 2% ➔ 2.5% ATK. <br/>
              - When any of CS attack hits, deal 3 ➔ 4 points of dmg to shields that only take fixed damage. </p>
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
          <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">DPS and Support Rotation</h2>

          <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">Sorry, will post a separate vid for this part later.</p>

          <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/98-TVVWPN6o"
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
  
  
 {#if selectedTab === 'Gameplay Examples'}
 <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">GAMEPLAY EXAMPLES</h2>

 <div class=" gap-6 mt-5 mb-10">
  <!-- Video 1 with title and description -->


  <div class="bg-gray-800 p-4 rounded-lg shadow-md">
    <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">Peregrine Sword DPS</h2>

    <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">With various support combinations</p>

    <div class="relative overflow-hidden" style="padding-top: 56.25%;">
      <iframe
      loading="lazy" 

          class="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/hMuf_UM-HZg"
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

