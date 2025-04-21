
<svelte:head>
    <title>Mei - Herrscher of Thunder</title> 
    <meta property="og:title" content="Mei - Herrscher of Thunder" />
    <meta property="og:description" content="Herrscher of Thunder Guide, Builds and Gameplay" />
    <meta property="og:image" content="" />
    <meta property="og:url" content="https://marisaimpact.com/valk/hot" />
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
  // { name: 'Gameplay Examples', short: 'example' },
  { name: 'Elysian Realm', short: 'er' },
  //{ name: 'Rank Up', short: 'rank' },
  //{ name: 'Popular Question', short: 'qna' },
 // { name: 'Overview Card', short: 'card' },
  //{ name: 'Translation Error', short: 'translation' },
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
  let fovlikes = likesData["hot"] || 0; // Get initial likes from JSON
  const charName = "hot"; // Route name for this character
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


<section class="relative mx-auto flex flex-row items-center justify-center px-4 md:p-2 gap-3 md:pb-0  md:mt-0  pt-4	sm:pt-0	">
  <div class="absolute   top-0 w-full h-[90vh] z-[-10] opacity-85 " id="bgwavebox">    
    <img src="/images/bg/wave_lantern.svg" alt="Lone Planetfarer" class="w-full h-full object-cover overflow-hidden" /> 
  </div>
  
  
  
  <!-- Left: Character Image -->
  <div class="relative  w-auto h-48 sm:h-60 md:h-72 flex justify-center " id="valkpicbox">
    <!-- Image for Larger Screens -->
    <img src="/images/valkfull/hot.webp" alt="Sirin" class="h-full w-auto object-cover md:object-contain  " style ="view-transition-name: valkyrie-image-48;"/> 
  
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
  
    <div >
    <h1 class="text-xl md:text-2xl text-slate-100 font-bold text-center leading-4 mb-4 sm:mb-0">Herrscher of Thunder</h1>
  </div>
    <!-- Character Name and Release Date -->
    <p class="text-base md:text-md text-center md:block hidden text-slate-300 mt-2">Raiden Mei | Release Date: v4.1 (6 Aug 2020)  </p>
    <p class="text-base md:text-md text-center md:block hidden text-slate-300 mb-2">Divine Key DLC: v5.8 (15 July 2022) </p>

  
    <!-- Common wrapper to ensure same width -->
    <div class="w-full max-w-sm mb-2">
      <!-- Container with 4 pictures (Centered) -->
      <div class="flex flex-col items-center">
        <div class="flex w-[260px] md:w-[300px] gap-2 flex-wrap justify-center outline outline-red-500 outline-1 bg-red-950/75 rounded-lg p-2 backdrop-blur-xs">
          <img src="/images/ranks/Valkyrie_S.webp" alt="S-rank" class="w-auto h-8 md:h-10" />
          <img src="/images/type/IconPSI.png" alt="Mech" class="w-auto h-8 md:h-10" />
          <img src="/images/element/Core_Lightning_DMG.png" alt="Icon 3" class="w-auto h-8 md:h-10" />
  
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
    <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-4  text-center">OVERVIEW</h2>

    <div>
        <!-- Roles Section -->
        <h2 class="text-xl  font-semibold mb-2 text-left cooltext text-slate-100">ROLES</h2>
        
        <p class="mt-4 text-sm sm:text-base">
          <strong class="text-amber-400">Outdated Part 1 Lightning DPS</strong>
          
      </p>



      <ul class="list-disc ml-6 text-sm sm:text-base">
        <li class="mt-2">Herrscher of Thunder (HoT) is a very old battlesuit that was brought to meta again in 2022 with the introduction of Divine Key [Seven Thunders of Retribution].</li>
          <li class="mt-2"> Really wants ranks and Seven Thunders to be usable.</li>
          <li class="mt-2"> Currently, HoT has been replaced by <a href="/valk/lv" class="link ">Lunar Vow.</a> </li>

      </ul>




        <div class="divider  "></div>
        <!-- Pull Recommendation Section -->
        <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext ">FARM AND PULL RECOMMENDATION</h2>
        <p class="mt-4 text-sm sm:text-base">
          <strong class="text-amber-400 ">New Players on HoT</strong>
      </p>

      <ul class="list-disc ml-6 text-sm sm:text-base">
        <li class="mt-2">Sirin, Sushang and Herrscher of Sentience are the only battlesuits in War Treasury that are still somewhat relevant, so no, not recommended to farm HoT first. </li>
          <li class="mt-2"> You can consider unlocking HoT in the future for Elysian Realm first-clear crystal rewards.</li>

      </ul>

      <p class="mt-4 text-sm sm:text-base">
        <strong class="text-amber-400 ">New Players on HoT Equipment</strong>
        <br/>
    </p>

    <ul class="list-disc ml-6 text-sm sm:text-base">

        <li class="mt-2"> Seven Thunders is available in Battle Pass. Should you get it? That's debatable, since everything in the BP is really good. Pros of getting 7T: Give +10 ATK for all valkyries.</li>
        <li class="mt-2"> G4 Handel is forgeable in Foundry.
        </li>

    </ul>


        <div class="divider  "></div>
        <!-- How to Get Section -->
        <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">HOW TO GET</h2>
        <ul class="list-disc ml-6 text-sm sm:text-base ">
          <li ><strong>Herrscher of Thunder:</strong> War Treasury, Dorm Supply.</li>
            <li ><strong>Seven Thunders:</strong> Battle Pass.</li>
            <li ><strong>G4 Handel:</strong> Forgeable in foundry.</li>
            <li>Very old valkyrie, so besides Dorm Supply, expect her to only be available from events or ADV Supply.</li>

        </ul>

    </div>
{/if}



  {#if selectedTab === 'Lineup'}
  <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">LINEUP</h2>

  <section class="max-w-(--breakpoint-lg) mx-auto ">


  
    <P1lightningdps></P1lightningdps>


</section>

  {/if}

      {#if selectedTab === 'Equipment'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">EQUIPMENT</h2>
 
      <div>


              <h2 class="text-xl font-semibold text-center  text-yellow-400">BEST</h2>

              <div class="flex flex-col justify-center items-center">
                  
              <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">

                <div class="w-20 h-20 sm:w-28 sm:h-28">
                  <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2022/06/01/50494840/d7f7f51abcaa2f144e36efae69cb8207_6709264798925209170.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
              </div>

              <div class="w-20 h-20 sm:w-28 sm:h-28">
                <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2022/04/18/50494840/69197917c070e877ad922d21a3536325_2748643889039309262.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Cecilia Youth T" class="w-full h-full object-cover">

              </div>


              <div class="w-20 h-20 sm:w-28 sm:h-28">
                <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2022/04/18/50494840/a6ecf711857945fdcbfb02ccace6075d_8482437261998817983.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Cecilia Youth M" class="w-full h-full object-cover">

              </div>

              
              <div class="w-20 h-20 sm:w-28 sm:h-28">
                <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2022/04/18/50494840/b1c357b7a1d6d5e39fae925f7c90e724_8580284000724519020.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Cecilia Youth B" class="w-full h-full object-cover">
            </div>

              </div>  
              <h4 class="text-base sm:text-base text-white"> Seven Thunders + Handel set </h4>
              </div>



           </div>

           <div>



            <div class="p-4 mt-4 bg-linear-to-r from-violet-950/75 to-violet-900/75 rounded-sm">
              <p class="text-sm sm:text-base text-left">
                <b>Seven Thunders </b><br/> - A must-have for Herrscher of Thunder.
                <br/> - Big buffs, recover meter, and more.
                <br/> - Adds timestop to Ultimate activation and finisher.
              </p>

            </div>


            </div>
            <div class="divider  "></div>

            <h2 class="text-lg sm:text-xl font-semibold text-center  text-sky-400"> OTHER STIGMA OPTIONS </h2>

                


 <div class="flex flex-col justify-center items-center">
                
            <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">
              <div class="w-20 h-20 sm:w-28 sm:h-28">
                <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/10/15/73514954/a5a42c56741ca20c0ee9cc0bdaf92b2b_2130077980729098664.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">

              </div>

              <div class="w-20 h-20 sm:w-28 sm:h-28">
                <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2022/04/18/50494840/a6ecf711857945fdcbfb02ccace6075d_8482437261998817983.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Cecilia Youth M" class="w-full h-full object-cover">

              </div>

              <div class="w-20 h-20 sm:w-28 sm:h-28">
                <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/10/15/73514954/5a4ab375e227506ecc7d83b6bcdd197d_3134151908279986304.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">

              </div>
            </div>  
      
            <h4 class="text-base sm:text-base text-white">Zhenyi TB Handel M</h4>
            </div>
      
            
            <div class="p-4 mt-4 bg-linear-to-r from-zinc-950/75 to-zinc-900/75 rounded-sm">
              <p class="text-sm sm:text-base text-left">
                <b>G3 Zhenyi</b><br/> Forgeable in Foundry.
              </p>

            
            </div>

      {/if}


      {#if selectedTab === 'Elysian Realm'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">ELYSIAN REALM</h2>




        <h2 class="text-xl font-semibold mb-4 mt-8  text-left text-white cooltext">EGO SIGNETS</h2>

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
              <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Narukami </p>
              <p class="text-sm sm:text-lg text-slate-100"> <b>SP Regen:</b> Tsukuyomi</p>

            </div>
          </div>
        </div>
        <div class="mt-3 rounded-sm" >
          <p class="text-sm sm:text-base text-left">
            You can complete the run with just one Ego signet (Narukami). Tsukuyomi makes attack sequence faster and gives sp regen. Recommended to get both for a more comfortable run.
          </p>
        </div>

        

          
          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext"> GENERAL SIGNETS</h2>

          
          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">

            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
              <img src="/images/signets/Signets of Decimation (Kalpas).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">1</p>
            </div>

            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Deliverance (Kevin).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">1</p>
            </div>


            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Stars (Griseo).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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
              <p class="text-lg font-semibold">Act VI</p>
            </div>

            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Reverie (Pardofelis).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">1</p>
            </div>

          </div>
          <div class="mt-3 rounded-sm" >
            <p class="text-sm sm:text-base text-left">
              <b>SP Regen:</b> Get sp regen Deliverance signet early so you can keep using Ult. <br/>
              <b>Helix:</b> Act VI reduces weapon active cooldown, so you can use Ult earlier.
            </p>
          </div>

            <div class="divider  "></div>
            <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SUPPORTS</h2>

          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            
            <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
              <div class="flex flex-row rounded-sm">
              <img src="/images/valkportrait/Mei Lightning Empress.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              </div>
              <p class="text-base sm:text-lg font-semibold">START</p>
          </div>

          <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
              <div class="flex flex-row rounded-sm">
                <img src="/images/valkportrait/Mei Lightning Empress.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              </div>
              <p class="text-base sm:text-lg font-semibold">MID</p>
          </div>

          <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
              <div class="flex flex-row rounded-sm">
                <img src="/images/valkportrait/Mei Lightning Empress.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              </div>
              <p class="text-base sm:text-lg font-semibold">FINAL</p>
          </div>
            
          </div>
          <div class="mt-3 rounded-sm" >
            <p class="text-sm sm:text-base text-left">
              You can swap Lightning Empress to Azure Empyrea if you have enough sp regen.
            </p>
          </div>

          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SIGIL</h2>

          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
          

            <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
              <div class="flex flex-row rounded-sm">
              <img src="/images/sigils/Mad_Kings_Mask.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/sigils/An_Old_Pals_Legacy.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            </div>
              <p class="text-base sm:text-lg font-semibold">START</p>
          </div>

          <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
              <div class="flex flex-row rounded-sm">
                <img src="/images/sigils/Burden.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">HOW TO PLAY</h2>


          <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
            <li>With Tsukuyomi signet: Evade ➔ Spam ATK until full meter. Repeat until you have enough sp for Ult. Combo ATK is optional.</li>
            <li>Without Tsukuyomi signet: ATK until full meter ➔ Use Combo ATK. Repeat until you have enough sp for Ult.</li>
            <li>Use weapon active ➔ Ultimate. </li>
            <li>Use weapon active ➔ Ultimate finisher.</li>
            <li>Use Combo ATK.</li>
            <li>Repeat step 1 / 2 until weapon is off cooldown, and you have enough sp for Ult.</li>
            <li>Repeat.</li>

          </ol>

        <p class="mt-2 text-sm sm:text-base pb-4 text-center">
            Check out this showcase from Marisa Honkai:
        </p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/9pKp40sV1FE"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                loading="lazy">
            </iframe>
        </div>


      {/if}

      {#if selectedTab === 'Rank Up'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">RANK UP</h2>

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
                  Enemies take 16% ➔ 20% more Fire DMG from DA (independent multiplier).
                </td>
                <td class="p-3">DPS</td>
              </tr>
              <!-- Sample Row 2 -->
              <tr>
                <td>S2</td>
                <td>
                  UNLOCK: On standby, restore 1.5 sp per second.

                </td>
                <td>SP Regen</td>
              </tr>

              <tr>
                <td>S3</td>
                <td>
                  Leader Skill:  Team Ult ATK Total DMG +18% ➔ 21%. With 3 valks with Fire tag in the team, Fire DMG +21% ➔ 25.5%.
                </td>
                <td>DPS</td>

              </tr>
              <tr>
                <td>SS</td>
                <td>
                  - UNLOCK: Astral Flare EX deal additional 320% ATK of Fire DMG.
                  <br/> - UNLOCK: Astral Flare EX and Voidstar Anchor EX gain Fire DMG +25%
                </td>
                <td> DPS </td>
              </tr>
              <tr>
                <td>SS1</td>
                <td>
                  Enemies take 20% ➔ 24% more Fire DMG from DA (independent multiplier).

                </td>
                                  
            <td> DPS </td>

              </tr>
              <tr>
                <td>SS2</td>
                <td>
                  UNLOCK: Seiriois Ballista Total DMG +50%.
                </td>
                <td> DPS</td>
              </tr>
              <tr>
                <td>SS3</td>
                <td>
                  Leader Skill:  Team Ult ATK Total DMG +21% ➔ 24%. With 3 valks with Fire tag in the team, Fire DMG +25.5% ➔ 30%.
                </td>
                <td>DPS </td>
              </tr>
              <tr>
                <td>SSS</td>
                <td>
                  UNLOCK: Seiriois Ballista restore 10 sp, and sp cost cap raised to 42.
                </td>
                <td> DPS <br/> SP Regen</td>
              </tr>
            </tbody>
          </table>
        </div>


      {/if}


      {#if selectedTab === 'How to Play'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">HOW TO PLAY</h2>
  
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
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">GAMEPLAY EXAMPLES</h2>
  
      <div class=" gap-6 mt-5 mb-10">

        <div class="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 class="text-xl  font-semibold mb-4 text-left text-slate-100 cooltext">DA with Sparkle Support</h2>


          <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
            loading="lazy" 

                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/kY_1zw8LNF0"
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
        <h2 class="text-xl  font-semibold mb-4 text-left text-slate-100 cooltext">DA with HoTr and CN Support</h2>


        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
          <iframe
          loading="lazy" 

              class="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/lonrVng7W5g"
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
