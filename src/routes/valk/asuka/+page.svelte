
<svelte:head>
    <title>Asuka - Blazing Hope</title> 
    <meta property="og:title" content="Asuka - Blazing Hope" />
    <meta property="og:description" content="Blazing Hope Guide, Builds and Gameplay" />
    <meta property="og:image" content="" />
    <meta property="og:url" content="https://marisaimpact.com/valk/asuka" />
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
	import P1fire from "$lib/components/lineup/p1fire.svelte";
	import Horbdps from "$lib/components/lineup/horbdps.svelte";
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
   { name: 'Gameplay Examples', short: 'example' },
  //{ name: 'Elysian Realm', short: 'er' },
  //{ name: 'Rank Up', short: 'rank' },
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
  let fovlikes = likesData["asuka"] || 0; // Get initial likes from JSON
  const charName = "asuka"; // Route name for this character
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
    <img src="/images/bg/wave_lantern.svg" alt="Lone Planetfarer" class="w-full h-full object-cover overflow-hidden" /> 
  </div>
  
  
  
  <!-- Left: Character Image -->
  <div class="relative  w-auto h-48 sm:h-60 md:h-72 flex justify-center " id="valkpicbox">
    <!-- Image for Larger Screens -->
    <img src="/images/valkfull/asuka.webp" alt="Sirin" class="h-full w-auto object-cover md:object-contain  " style ="view-transition-name: valkyrie-image-43;"/> 
  
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
    <h1 class="text-xl md:text-2xl text-slate-100 font-bold text-center leading-4 mb-4 sm:mb-0">Blazing Hope</h1>
  </div>
    <!-- Character Name and Release Date -->
    <p class="text-base md:text-md text-center md:block hidden text-slate-300 mb-2">Asuka | Release Date: v4.5 (21 Jan 2021)  </p>

  
    <!-- Common wrapper to ensure same width -->
    <div class="w-full max-w-sm mb-2">
      <!-- Container with 4 pictures (Centered) -->
      <div class="flex flex-col items-center">
        <div class="flex w-[260px] md:w-[300px] gap-2 flex-wrap justify-center outline outline-red-500 outline-1 bg-red-950/75 rounded-lg p-2 backdrop-blur-sm">
          <img src="/images/ranks/Valkyrie_A.webp" alt="S-rank" class="w-auto h-8 md:h-10" />
          <img src="/images/type/IconBIO.png" alt="Mech" class="w-auto h-8 md:h-10" />
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
        
        <p class="mt-4 text-sm sm:text-base">
          <strong class="text-amber-400">Part 1 Physical DPS</strong>
          <br/> - Blazing Hope is an Evangelion collab character.
          <br/> - Just a decent Physical DPS. Asuka was used a few times against Saha Assaka.
      </p>



        <div class="divider divider-neutral"></div>
        <!-- Pull Recommendation Section -->
        <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext ">PULL RECOMMENDATION</h2>


        <p class="mt-4 text-sm sm:text-base">
          Asuka cannot be acquired anymore.
      </p>


        <div class="divider divider-neutral"></div>
        <!-- How to Get Section -->
        <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">HOW YOU COULD HAVE GOTTEN HER</h2>


        <p class="mt-4 text-sm sm:text-base">
          <strong class="text-amber-400 ">Asuka</strong>
          <br/> Asuka was available from a limited-time SP supply. Currently, she can no longer be obtained.
      </p>


      <p class="mt-4 text-sm sm:text-base">
        <strong class="text-amber-400 ">Lance of Longinus</strong>
        <br/> Lance of Longinus was available from a limited-time Focused supply. Currently, the weapon can no longer be obtained.
    </p>
    <p class="mt-4 text-sm sm:text-base">
      <strong class="text-amber-400 ">Children stigma set</strong>
      <br/> - Children stigma was available from a limited-time Focused supply. Currently, the stigma can no longer be obtained.
      <br/> - G3 Columbus stigma was introduced as an alternative for Children set with the same stats.
  </p>

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
                  <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/09/07/91006211/7797ec153fc6516419e6ccb5cd720f2d_199612893826922994.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
              </div>

              <div class="w-20 h-20 sm:w-28 sm:h-28">
                <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/11/19/77124895/3d5cf830e207990a24c3b2e8b382a931_2381995292430155616.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
            </div>
      
            <div class="w-20 h-20 sm:w-28 sm:h-28">
                <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/11/19/77124895/fcb0fb603d4687728609b8320e62ba7f_4478419982120441927.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
            </div>
      
            <div class="w-20 h-20 sm:w-28 sm:h-28">
                <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/11/19/77124895/89d6118587a3b81aef8526453454f4dd_3781213386012413494.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
            </div>

              </div>  
              <h4 class="text-base sm:text-base text-white"> Lance of Longinus + Children set </h4>
              </div>



           </div>

           <div>



            <div class="p-4 mt-4 bg-gradient-to-r from-red-950/75 to-red-900/75 rounded">
              <p class="text-sm sm:text-base text-left mb-4">
                <b>Lance of Longinus</b><br/> One of the best weapons for Asuka.
              </p>
            

              <p class="text-sm sm:text-base text-left">
                <b>Affix</b> <br/>Ideally, 4 ATK and 2 Crit DMG lines. Full ATK is also fine.
              </p>
            </div>


            </div>
            <div class="divider divider-neutral"></div>

            <h2 class="text-lg sm:text-xl font-semibold text-center  text-sky-400"> OTHER EQUIPMENT OPTIONS </h2>

            <div class="flex flex-col justify-center items-center">
                
            <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">
      
            <div class="w-20 h-20 sm:w-28 sm:h-28">
                <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/09/27/6100274/630f32b2d8da1cffa01dd1d347caf76d_6246057471359952089.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
            </div>
      
      
            </div>  
      
            <h4 class="text-base sm:text-base text-white">Abyss Flower: Liminal Spiral</h4>
      
            </div>
      
            
            <div class="p-4 mt-4 bg-gradient-to-r from-fuchsia-950/75 to-fuchsia-900/75 rounded">
              <p class="text-sm sm:text-base text-left">
                <b>Abyss Flower</b> <br/>
                Damage-wise, very close to Longinus.
              </p>
            
            </div>

            <div class="divider divider-neutral"></div>

            <div>


              <div class="flex flex-col justify-center items-center">
                  
              <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">

              <div class="w-20 h-20 sm:w-28 sm:h-28">
                <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/10/26/77124895/da0b06f6cdcc746515d754d3e62aadbc_218089820853957416.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
            </div>
      
            <div class="w-20 h-20 sm:w-28 sm:h-28">
              <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/10/26/77124895/f9762bb1e59fbbfbb26d55442c0cc928_6953807172225273902.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
            </div>
      
            <div class="w-20 h-20 sm:w-28 sm:h-28">
                <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/10/26/77124895/64de0dd9808187a681c0441e63f3db21_5431735846925388113.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
            </div>

              </div>  
              <h4 class="text-base sm:text-base text-white"> Columbus set</h4>
              </div>



           </div>

           <div>



            <div class="p-4 mt-4 bg-gradient-to-r from-fuchsia-950/75 to-fuchsia-900/75 rounded">
              <p class="text-sm sm:text-base text-left">
                <b>G3 Columbus</b><br/> - Has same stats as Children set.
                <br/> - Forgeable in Foundry.
              </p>
            
            </div>


            </div>
            

      {/if}


      {#if selectedTab === 'Elysian Realm'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-gradient-to-r  from-blue-700 to-blue-500 text-white rounded px-2 mb-2 text-center">ELYSIAN REALM</h2>

      <div class="flex justify-center gap-4 my-6">
        <button
          on:click={() => setPlaystyle('1')}
          class={`px-4 py-2 font-semibold rounded ${activePlaystyle === '1' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gradient-to-r from-orange-600 to-amber-500 hover:text-white'}`}
        >
          BRICK
        </button>
      
        <button
          on:click={() => setPlaystyle('2')}
          class={`px-4 py-2 font-semibold rounded ${activePlaystyle === '2' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gradient-to-r from-orange-600 to-amber-500 hover:text-white'}`}
        >
          STANDARD
        </button>
      </div>


      {#if activePlaystyle === '1'}
      <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">Brick Playstyle</h2> 
      <p class="text-sm sm:text-base text-center sm:text-left">
        Use this when you have Brick equipped.
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
              <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Legion / Victory / Ego</p>
              <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Supremacy </p>

            </div>
          </div>
        </div>
        <div class="mt-3 rounded" >
          <p class="text-sm sm:text-base text-left">
            - You can start with any of the three Ego signets. Each Ego signet has a different starting general signet.
            <br/>
            - Legion: Buffed Combo ATK.
            <br/>
            - Victory: Bonk playstyle.
            <br/>
            - Ego: Summons a clone.
            <br/>
            - Supremacy gives a nuke every few seconds.
          </p>
        </div>

        <div class="divider divider-neutral"></div>
        <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">STARTING GENERAL SIGNET</h2>

        
        <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
          <!-- First Signet with 'Start' text -->
          <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
            <div class="badge badge-accent z-10 absolute top-2 font-semibold">LEGION</div>
            <img src="/images/signets/Signets of Decimation (Kalpas).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            <p class="text-lg font-semibold">1</p>
          </div>

          <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
            <div class="badge badge-accent z-10 absolute top-2 font-semibold">VICTORY</div>
            <img src="/images/signets/Signets of Deliverance (Kevin).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            <p class="text-lg font-semibold">2</p>
          </div>

          <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
            <div class="badge badge-accent z-10 absolute top-2 font-semibold">EGO</div>
            <img src="/images/signets/Signets of Infinity (Mobius).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            <p class="text-lg font-semibold">1</p>
          </div>

        </div>
        <div class="mt-3 rounded" >
          <p class="text-sm sm:text-base text-left">
            <b>Decimation 1:</b> To keep your HP low, bring Blood Rose support, and get enhanced signet [Burden, Difficulty, and Calamity] as soon as you can.
          </p>
        </div>


          
          <div class="divider divider-neutral"></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">SUBSEQUENT GENERAL SIGNETS</h2>

          
          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">


            <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
              <img src="/images/signets/Signets of Stars (Griseo).png" alt="Signet 5" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold ">1</p>
            </div>

            <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
              <img src="/images/signets/Signets of Gold (Eden).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">2</p>
            </div>

            <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
              <img src="/images/signets/Signets of Vicissitude (Hua).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">2</p>
            </div>

            <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
              <img src="/images/signets/Signets of Discipline (Aponia).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">2</p>
            </div>

            <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
              <img src="/images/signets/Signets of Reverie (Pardofelis).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">1</p>
            </div>

          </div>
          <div class="mt-3 rounded" >
            <p class="text-sm sm:text-base text-left">
               You want initial sp Gold signet so you can immediately use Ult at the start, without Lightning Empress support. You want sp regen so you can keep using Ult as soon as you can.
            </p>
          </div>

            <div class="divider divider-neutral"></div>
            <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SUPPORTS</h2>

          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            
            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
              <div class="flex flex-row rounded">
                <img src="/images/valkportrait/Mei Lightning Empress.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              </div>
              <p class="text-base sm:text-lg font-semibold">START</p>
          </div>

          <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
              <div class="flex flex-row rounded">
                <img src="/images/valkportrait/Mei Lightning Empress.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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
          <div class="mt-3 rounded" >
            <p class="text-sm sm:text-base text-left">
               You can swap out Lightning Empress once you get the initial sp Gold signet.
            </p>
          </div>

          <div class="divider divider-neutral"></div>
          <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SIGIL</h2>

          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
          

            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
              <div class="flex flex-row rounded">
              <img src="/images/sigils/Mad_Kings_Mask.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/sigils/An_Old_Pals_Legacy.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            </div>
              <p class="text-base sm:text-lg font-semibold">START</p>
          </div>

          <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
              <div class="flex flex-row rounded">
                <img src="/images/sigils/Rainbow_of_Absence.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/sigils/An_Old_Pals_Legacy.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              </div>
              <p class="text-base sm:text-lg font-semibold">MID</p>
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

          <h2 class="text-md font-semibold  mt-3  text-left text-white ">Before Burst Mode</h2>

          <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
            <li>Press Lightning Empress support ➔ evade ➔ weapon. You should have 125 sp now. </li>
            <li>If you still don't have 125 sp, press Ult to switch weapon ➔ Repeat Combo and weapon switch until you have 125 sp. </li>
            <li>Hold Ult to activate Burst Mode. </li>

          </ol>
          <h2 class="text-md font-semibold  mt-3  text-left text-white ">During Burst Mode</h2>
          <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
            <li>Press Ult ➔ spam ATK until full sequence is over ➔ press Ult ➔ press weapon.</li>

          </ol>
        <p class="mt-2 text-sm sm:text-base pb-4 text-center">
            Check out this showcase from Marisa Honkai:
        </p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/3HTGDKVzx0A"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                loading="lazy">
            </iframe>
        </div>
        {/if}

        {#if activePlaystyle === '2'}
        <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">Standard Playstyle (Bonk!)</h2> 
        <p class="text-sm sm:text-base text-center sm:text-left">
          Bonks the enemy! Use this playstyle if HoS equips other gauntlets that isn't brick.
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
                <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Victory</p>
                <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Dark Plumes </p>
  
              </div>
            </div>
          </div>
          <div class="mt-3 rounded" >
            <p class="text-sm sm:text-base text-left">
              Dark Plumes gives sp regen and damage over time.
            </p>
          </div>
  
  
  
            
            <div class="divider divider-neutral"></div>
            <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
  
            
            <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
              <!-- First Signet with 'Start' text -->
              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
                <img src="/images/signets/Signets of Deliverance (Kevin).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold">2</p>
              </div>
  
              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Discipline (Aponia).png" alt="Signet 5" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">2</p>
              </div>
  
              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Vicissitude (Hua).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold">2</p>
              </div>
  
              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Decimation (Kalpas).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold">2</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Reverie (Pardofelis).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold">1</p>
              </div>
  
            </div>
            <div class="mt-3 rounded" >
              <p class="text-sm sm:text-base text-left">
                 For Discipline 2, you just want the [You Shall Follow Good] enhanced signet.
              </p>
            </div>
  
              <div class="divider divider-neutral"></div>
              <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SUPPORTS</h2>
  
            <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
              
              <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                  <img src="/images/valkportrait/Mei Lightning Empress.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  <img src="/images/valkportrait/Bronya Snowy Sniper.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">START</p>
            </div>
  
            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
              <div class="flex flex-row rounded">
                <img src="/images/valkportrait/Mei Lightning Empress.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Bronya Snowy Sniper.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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
            <div class="mt-3 rounded" >
              <p class="text-sm sm:text-base text-left">
                 You can swap out Lightning Empress once you have enough sp regen.
              </p>
            </div>
  
            <div class="divider divider-neutral"></div>
            <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SIGIL</h2>
  
            <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            
  
              <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                <img src="/images/sigils/Burden.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/sigils/It_Will_Be_Written.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              </div>
                <p class="text-base sm:text-lg font-semibold">START</p>
            </div>
  
            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                  <img src="/images/sigils/Veil_of_Tears.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  <img src="/images/sigils/Dreamful_Gold.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">MID</p>
            </div>
  
            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                    <img src="/images/sigils/Tin_Flask.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                    <img src="/images/sigils/Dreamful_Gold.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  </div>
                <p class="text-base sm:text-lg font-semibold">FINAL</p>
            </div>
  
            </div>
  
            
            <div class="divider divider-neutral"></div>
            <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">HOW TO PLAY</h2>
            <h2 class="text-md font-semibold  mt-3  text-left text-white ">Before Burst Mode</h2>

  
            <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
              <li>Press Lightning Empress support ➔ evade ➔ Combo ATK.  </li>
              <li>If you still don't have 125 sp, press Ult to switch weapon ➔ Repeat Combo and weapon switch until you have 125 sp. </li>
              <li>Hold Ult to activate Burst Mode.</li>  
            </ol>
  
            <h2 class="text-md font-semibold  mt-3  text-left text-white ">During Burst Mode</h2>
            <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
              <li>Press Ult whenever it's available.</li>
              <li>Hold ATK to start bonk sequence, spam ATK until bonk ends.</li>  
              <li>Repeat until Burst Mode ends.</li>
            </ol>

          <p class="mt-2 text-sm sm:text-base pb-4 text-center">
              Check out this showcase from Marisa Honkai:
          </p>
  
          <div class="relative overflow-hidden" style="padding-top: 56.25%;">
              <iframe
                  class="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/pTHVf1kHZEU"
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

        <!-- Full Rank Up List -->
        <div class="text-slate-100 text-left mt-8 ">
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
                  In Herrscher form, Crit DMG +35% ➔ 60%
                </td>
                <td class="p-3">DPS</td>
              </tr>
              <!-- Sample Row 2 -->
              <tr>
                <td>S2</td>
                <td>
                  Leader Skill: Team Crit DMG +28% in Burst Mode. For every BIO valk on the team, team Crit Rate +5% 

                </td>
                <td>DPS</td>
              </tr>

              <tr>
                <td>S3</td>
                <td>
                  Shield boost Crit DMG +24% ➔ 30%.
                </td>
                <td>DPS</td>

              </tr>
              <tr>
                <td>SS</td>
                <td>
                  UNLOCK: In Psyched status, Combo ATK restore 2 bonus sp and have special effects:
                  <br/> - Sword: 2nd sequence inflicts 0.5s coma on enemies hit.
                  <br/> - Spear: 1st sequence time locks enemies for 1s on hit.
                  <br/> - Chain blades: Impair enemies, DEF -50%, for 15s.
                </td>
                <td> DPS <br/> SP Regen</td>
              </tr>
              <tr>
                <td>SS1</td>
                <td>
                  In Herrscher form, plume atk deal 150% ➔ 180% ATK of Physical DMG.

                </td>
                                  
            <td> DPS </td>

              </tr>
              <tr>
                <td>SS2</td>
                <td>
                  Leader Skill: Team Crit DMG +28% ➔ 30% in Burst Mode. For every BIO valk on the team, team Crit Rate +5% ➔ 6%
                </td>
                <td> DPS</td>
              </tr>
              <tr>
                <td>SS3</td>
                <td>
                  UNLOCK: Illusion explosions deal additional 600% ATK of Physical DMG.
                </td>
                <td>DPS </td>
              </tr>
              <tr>
                <td>SSS</td>
                <td>
                  UNLOCK: Initial sp +40
                </td>
                <td> Memorial Arena</td>
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
          <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">Asuka DPS</h2>

          <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">Asuka vs Herrscher of Corruption 435 D</p>

          <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
            loading="lazy" 

                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/p-MiO_U-G6E"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        </div>
      </div>

    </div>

      
    <div class=" gap-6 mt-5 mb-10">

      <div class="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">With Lance of Longinus</h2>

        <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">Asuka gameplay from Beta</p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
          <iframe
          loading="lazy" 

              class="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/7QLSwka8YuA"
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
