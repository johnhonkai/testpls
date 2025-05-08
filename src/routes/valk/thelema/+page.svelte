<svelte:head>
  <title>Thelema - Mad Pleasure: Shadowbringer</title> 

    <meta property="og:title" content="Thelema - Mad Pleasure: Shadowbringer" />
    <meta property="og:description" content="Thelema Guides, Builds and Gameplay" />
    <meta property="og:image" content="https://i.imgur.com/PP0siCM.png" />
    <meta property="og:url" content="https://marisaimpact.com/valk/thelema" />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary_large_image">

    <link rel="canonical" href="https://marisaimpact.com/valk/thelema" />
</svelte:head>


<script lang="ts">

import likesData from '$lib/data/likes.json'; // Import local JSON data

  import { goto } from '$app/navigation';

  import { onMount } from "svelte";
import { hasUserLiked, likeWithVoterId } from "$lib/firebaseLikes"; // Import helper functions
import { getFirestore } from "firebase/firestore";
import { app } from "$lib/firebaseConfig";

const db = getFirestore(app); // Ensure this is used for Firebase operations
  import Charred from '$lib/components/charpctred.svelte';
  import SimpDPS from '$lib/components/lineup/simpdps.svelte';
  import SenaDPS from '$lib/components/lineup/senadps.svelte';
  import JDDPS from '$lib/components/lineup/jddps.svelte';
  import LanternDPS from '$lib/components/lineup/lanterndps.svelte';
import ThelDPS from '$lib/components/lineup/thelemadps.svelte';
import VitaDPS from '$lib/components/lineup/vitadps.svelte';

import Lightbox from '$lib/components/lightbox.svelte';
	import Hofidps from '$lib/components/lineup/hofidps.svelte';
	import Hohdps from '$lib/components/lineup/hohdps.svelte';
	import Sparkledps from '$lib/components/lineup/sparkledps.svelte';
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
  { name: 'Support Buffs', short: 'support' },
  { name: 'How to Play', short: 'howtoplay' },
  { name: 'Gameplay Examples', short: 'example' },
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
  
  let thelemalikes = likesData["thelema"] || 0; // Get initial likes from JSON
  const charName = "thelema"; // Route name for this character
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

    thelemalikes++;

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

<div class="sm:mt-14"></div>
<section class="relative mx-auto flex flex-row items-center justify-center px-4 md:p-2 gap-3 md:pb-0  md:mt-0  pt-8	sm:pt-0	">
<div class="absolute   top-0 w-full h-[90vh] z-[-10] opacity-85 " id="bgwavebox">    
  <img src="/images/bg/wave_thelema.svg" alt="Lone Planetfarer" class="w-full h-full object-cover overflow-hidden" /> 
</div>


<div class="fixed  h-1/2 w-1/2 top-[-5vh] right-[-20vw]  z-[-8] hidden sm:block " id="avabox">    
  <img src="/images/bg/ava_thelema.webp" alt="Lone Planetfarer" class=" object-contain slide-in-pls" /> 
</div>

<!-- Left: Character Image -->
<div class="relative  w-auto h-48 sm:h-60 md:h-72 flex justify-center " id="valkpicbox">
  <!-- Image for Larger Screens -->
  <img src="/images/valkfull/thelema.webp" alt="Sparkle" class="h-full w-auto object-cover md:object-contain  " style ="view-transition-name: valkyrie-image-9;"/> 

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
      <span class="text-white font-semibold">{thelemalikes}</span>
    </button>
  </div>

</div>



<!-- Right: Character Info (Centered) -->
<div class="flex flex-col items-center text-center justify-start">
  <!-- Battlesuit Name -->

  <div>
  <h1 class="text-xl md:text-2xl text-slate-100 font-bold text-center leading-4 mb-4 sm:mb-0">Mad Pleasure: Shadowbringer</h1>
</div>
  <!-- Character Name and Release Date -->
  <p class="text-base md:text-md text-center md:block hidden text-slate-300 my-2">Thelema Nutrisco | Release Date: v7.4 (25 April 2024)</p>

  <!-- Common wrapper to ensure same width -->
  <div class="w-full max-w-sm mb-2">
    <!-- Container with 4 pictures (Centered) -->
    <div class="flex flex-col items-center" id="typebox">
      <div class="flex w-[260px] md:w-[300px] gap-2 flex-wrap justify-center outline outline-rose-500 outline-1 bg-rose-950/75 rounded-lg p-2 backdrop-blur-xs">
        <img src="/images/ranks/Valkyrie_S.webp" alt="S-rank" class="w-auto h-8 md:h-10" />
        <img src="/images/type/IconMECH.png" alt="Mech" class="w-auto h-8 md:h-10" />
        <img src="/images/element/Core_Ice_DMG.png" alt="Icon 3" class="w-auto h-8 md:h-10" />
        <img src="/images/artype/ar wheel of destiny.png" alt="ar" class="w-auto h-8 md:h-10" />
      </div>
    </div>

    <!-- Support For Container (Centered) -->
    <div class="flex flex-col mt-4 items-center" id="arbox">

      <div class="flex flex-col  w-[260px] md:w-[300px] flex-wrap justify-center outline outline-rose-500 outline-1 bg-rose-950/75 rounded-lg p-2 backdrop-blur-xs">
        <div class="flex flex-wrap justify-center">
          <h2 class="text-base md:text-md custom-font tracking-wider text-slate-100">SUPPORT FOR:</h2>
        </div >
        <div class="flex flex-row gap-2 flex-wrap justify-center">
          <img src="/images/artype/ar world star.png" alt="Support 2" class="w-auto h-8 md:h-10" />
          <img src="/images/artype/ar wheel of destiny.png" alt="ar" class="w-auto h-8 md:h-10" />
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
      
      <div class="flex max-w-(--breakpoint-xl) justify-center mx-auto ">
        <p class="text-sm sm:text-base">
          <strong>Updated For v8.1
      </p>
      </div>
      <div>
          <!-- Roles Section -->
          <h2 class="text-xl  font-semibold mb-2 text-left cooltext text-slate-100">ROLES</h2>
          
          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">DPS</strong> <br/> Powerful Ice DPS with shieldbreak and huge freeze trauma.
          </p>
          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">Wheel of Destiny Support</strong> <br/> - One of the best supports for all current WoD DPS. Provide strong buffs with important utilities: Shieldbreak, freeze trauma, AR regen and timestop.
              <br/>
              - Very important for Herrscher of Human DLC since her old bosses required shieldbreak and/or freeze. These utilities were provided by Sushang and Kira, but in WoD team, only Thelema can provide  these utilities.
          </p>
          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">World Star Support</strong> <br/>Currently, Resonance teams seem to do better with Vita + HoFi / Badum combo.
          </p>

          <p class="mt-4 text-sm sm:text-base">
            <strong class="text-amber-400">AR Regen</strong> <br/>Has a unique aerial evasion spam tech. When paired with signature weapon (grants 2 AR regen upon ultimate evasion), Thelema can provide the team a lot of AR regen in a short time.
        </p>
          <div class="divider  "></div>
          <!-- Pull Recommendation Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">PULL RECOMMENDATION</h2>

          <p class="mt-4 text-sm sm:text-base">
            <strong class="text-amber-400">All Players</strong> <br/>- Thelema is good, but it's better to use your crystal on newer valks.
            <br/>
            - Thelema is one of the valks available from Carnival Supply. Only use your free 20 pulls, not worth getting her using crystals now. In my opinion, the order of valk importance based on meta is Thelema > Jovial Deception > SIMP / Lantern.
        </p>

          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">Competitive</strong> <br/>Thelema is still used in WoD teams, and she's very important for HoH team.
          </p>


            

          <div class="divider  "></div>
          <!-- How to Get Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">HOW TO GET</h2>
          <ul class="list-disc ml-6 text-sm sm:text-base ">
              <li ><strong>Thelema:</strong> Battlesuit Supply</li>
              <li><strong>Thelema's Weapon:</strong> Equipment Supply</li>
              <li><strong>Thelema's Stigma:</strong> Equipment Supply, Forgeable</li>
              <li>Not available in v8.0. High chance of returning in v8.1 spending event. </li>
          </ul>
          <div class="divider  "></div>
          <!-- Full Guide Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">FULL GUIDE</h2>
          <p class="mt-2 text-sm sm:text-base pb-4">
              Check out the full guide on YouTube: 
          </p>

          <div class="relative overflow-hidden" style="padding-top: 56.25%;">
              <iframe
                  class="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/O-gIiHYQtMI"
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


    <div class="flex justify-center mt-8 flex-wrap gap-2 sm:static">
      {#each Array(totalPages).fill(0) as _, index}
          <button
              on:click={() => goToPage(index + 1)}
              class={`btn ${currentPage === index + 1 ? 'btn-active' : ''}`}
          >
              {index + 1}
          </button>
      {/each}
  </div>

      {#if currentPage === 1}

      <ThelDPS maindps={true}/>

      <div class="divider divider-accent text-xl custom-font tracking-wider text-teal-300 mt-16"> Wheel of Destiny Support </div>

      <Hohdps firstCharName="Thelema"></Hohdps>

      <div class="divider  "></div>


      <JDDPS firstCharName="Thelema" />

      <div class="divider  "></div>

      <LanternDPS firstCharName="Thelema"/>





      {/if}

      {#if currentPage === 2}
      <div class="divider divider-accent text-xl custom-font tracking-wider text-teal-300 mt-8"> World Star Support </div>
      
      <Sparkledps firstCharName="Thelema" ></Sparkledps>
      
      <div class="divider  "></div>

      <SimpDPS firstCharName="Thelema"/>

      <div class="divider  "></div>

      <SenaDPS firstCharName="Thelema" />

      {/if}



      <div class="flex justify-center mt-8 flex-wrap gap-2 sm:static">
        {#each Array(totalPages).fill(0) as _, index}
            <button
                on:click={() => goToPage(index + 1)}
                class={`btn ${currentPage === index + 1 ? 'btn-active' : ''}`}
            >
                {index + 1}
            </button>
        {/each}
    </div>
</section>

  {/if}

      {#if selectedTab === 'Equipment'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">EQUIPMENT</h2>
 
      <div>


              <h2 class="text-xl font-semibold text-center  text-yellow-400">BEST</h2>

              <div class="flex flex-col justify-center items-center">
                  
              <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/03/16/50494840/8a70f8491e52988cfc37944df3af4a27_4125609499620936440.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/03/26/50494840/4d2be3e23a30fa1b1f2dbfb9f0bffc96_1392376876591991459.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/03/26/50494840/5b7c85979b7a9b8246f43c27be3d7dd0_5535690259854723137.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/03/26/50494840/f249e858eb58f88c7391fc2a6b6fd227_1056052236554261950.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

              </div>  
              <h4 class="text-base sm:text-base text-white">Banquet Rose + Splendors of Amber Set</h4>
              </div>

              <div class="p-2 mt-2 bg-linear-to-r from-cyan-950/75 to-cyan-900/75 rounded-sm" >
              <p class="text-sm sm:text-base text-left">
                  <li class="text-sm sm:text-base"><b>Banquet Rose:</b> Has two important utilities: 3 second timestop after ult, and evasion gives 2 AR meter.</li>
                  <li class="text-sm sm:text-base"><b>Splendor of Ambers: </b> All buffs. </li>
                  <li class="text-sm sm:text-base"><b>Affix: </b> Full ATK.</li>
              </p>
              </div>

              <div class="divider  "></div>

              <h2 class="text-xl font-semibold text-center">TRANSITIONAL</h2>
              <div class="flex flex-col justify-center items-center">
                  
                  <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">
  
                      <div class="w-20 h-20 sm:w-28 sm:h-28">
                          <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/07/26/50494840/db6b8de98a0f9bfe7238663dbc69c26e_1923411626236960886.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                      </div>
  
                  </div>  
                  <p class="text-sm sm:text-base text-white">Vacation Notice</p>
  
                  <p></p>
                  </div>
           </div>
      {/if}

      {#if selectedTab === 'Support Buffs'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">SUPPORT BUFFS</h2>

      <div class="flex flex-wrap gap-4 my-8">
        <!-- Example image list for support buffs; add your own image sources -->
        <img
          src="/images/valkbuff/buffs_thelema.png"
          alt="Buff 1"
          class=" object-cover cursor-pointer"
          on:click={() => openLightbox('/images/valkbuff/buffs_thelema.png')}
        />

      </div>



      <div class="my-5 text-sm sm:text-base text-slate-100 space-y-4">
        <p class="mb-4 font-semibold">How to activate Thelema support buffs:</p>
        
          <div>
            <p class="font-semibold text-orange-300  mt-6">Stellar Drain</p>
            <p>Moment of Indulgence consumes Stellar Drain. In WoDestiny team, teammates can consume Thelema's Stellar Drain.</p>
          </div>

          <div>
            <p class="font-semibold text-orange-300 mt-6">Deal Damage</p>
           <p>Activates stigma effect Share A Glass for 25s. When AR WoDestiny is activated, the buff is also activated / refreshed when a team member with AR Wheel of Destiny tag deals dmg.</p>
          </div>

          <div>
            <p class="font-semibold text-orange-300 mt-6">Moment of Indulgence</p>
           <p>When AR World Star is activated, for every team member with AR World Star tag, team gain Total DMG +6% (max 12%) and enemies take 8% more Total DMG (max 16%) for 25s. This is also activated / refreshed during Stellar Outburst.</p>
          </div>

          <div>
            <p class="font-semibold text-orange-300 mt-6">Ultimate</p>
           <p>With signature weapon equipped, shatter dmg when timestop ends makes enemies take 18% more Total DMG for 25s. This is also activated / refreshed during Stellar Outburst. When AR WoDestiny is activated, the buff is also activated / refreshed when a team member with AR Wheel of Destiny tag's Ultimate hits a target.</p>
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
            STELLAR OUTBURST
          </button>
        
          <button
            on:click={() => setPlaystyle('2')}
            class={`px-4 py-2 font-semibold rounded-sm ${activePlaystyle === '2' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-linear-to-r from-orange-600 to-amber-500 hover:text-white'}`}
          >
            SHADOW CLONE BARRAGE
          </button>
        </div>
      
        {#if activePlaystyle === '1'}
        <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">Stellar Outburst Playstyle</h2> 
        <p class="text-sm sm:text-base text-center sm:text-left">
            Mecha smashes all
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
              <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Waltz ➔ Fine Clothes</p>
              <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Nobility</p>
            </div>
          </div>
          
        </div>
        <div class="p-2 mt-3 rounded-sm" >
          <p class="text-sm sm:text-base text-left">
              <li class="text-sm sm:text-base"> ER Lite mode: Equip Because of You sigil and get all three Ego signets on Floor 7.</li>
              <li class="text-sm sm:text-base"> Normal mode: You can complete the run with just one Ego signet (Waltz), but having both Ego signets is a big improvement. You can get both Ego signets at the start by using Thorny Crown sigil, OR by resetting Floor 1 until you get another Ego portal, OR use Because of You support sigil and get the other two Ego signets on Floor 7.</li>
          </p>
          </div>

          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            <!-- First Signet with 'Start' text -->
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
                <img src="/images/signets/Signets of Gold (Eden).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>
          
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Infinity (Mobius).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>
              
              <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Setsuna (Sakura).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">2</p>
              </div>

              <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Stars (Griseo).png" alt="Signet 4" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Reverie (Pardofelis).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold">1</p>
              </div>

          </div>

          <div class="p-2 mt-3 rounded-sm" >
            <p class="text-sm sm:text-base text-left">
                <li class="text-sm sm:text-base"> <b> Setsuna:</b> Moment of Indulgence triggers evasion skill.</li>
                  <li class="text-sm sm:text-base"> <b>Infinity:</b> Evasion skill summons a phantom that counts as a summoned entity.</li>
            </p>
          </div>

            <div class="divider  "></div>
            <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SUPPORTS</h2>

          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            
            <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
                <div class="flex flex-row rounded-sm">
                <img src="/images/valkportrait/Senadina Deepspace Anchor.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">START</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
                <div class="flex flex-row rounded-sm">
                <img src="/images/valkportrait/Senadina Deepspace Anchor.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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
                <img src="/images/sigils/Because_of_You.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">START (ER Lite)</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
              <div class="flex flex-row rounded-sm">
              <img src="/images/sigils/Gold_Goblet.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/sigils/Dreamful_Gold.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              </div>
              <p class="text-base sm:text-lg font-semibold">START (Normal)</p>
          </div>

            <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
                <div class="flex flex-row rounded-sm">
                    <img src="/images/sigils/Tin_Flask.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                    <img src="/images/sigils/Dreamful_Gold.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">FINAL</p>
            </div>

          </div>

          
          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">HOW TO PLAY</h2>

          <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>Use both supports. They become Phantoms during Stellar Outburst, and you can't trigger their normal active skills.</li>
          <li>Activate Stellar Outburst.</li>
          <li>Use Ultimate.</li>
          <li>Use support (Phantom).</li>
          <li>Use Basic ATK full sequence / weapon skill until you get full Banquet. Then, use Moment of Indulgence (Press ATK or Weapon). Repeat step 5 until Stellar Outburst ends.</li>
        </ol>

          <p class="text-emerald-400">
          <b>TECHNICAL INFO</b></p>
          <li>To gain Banquet, you can just use the normal rotation that you use in normal battles. Personally, I like to spam Basic ATK, and weapon skill sometimes in-between.</li>
          <li>For a smoother Basic ATK flow, evade to cancel the Basic ATK final hit backswing (Basic ATK seq 1,2,3 > Evade > Basic ATK seq 1,2,3). Or, use weapon skill between Basic ATK sequences.</li>
          <li>Can use weapon skill at the start or after Indulgence to gather enemies, and to trigger buffs activated by weapon skill, like Helix and Stars signet.</li>
          <li>If you can't see Thelema's action on the screen (it is very messy), just look at the Banquet stack above HP bar to see if the attack already hits.</li>


        <p class="mt-8 text-sm sm:text-base pb-4 text-center">
            Check out this showcase from Marisa Honkai (Soon)
        </p>


        {/if}

        {#if activePlaystyle === '2'}
        <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">AR CHARGING PLAYSTYLE</h2> 
        <p class="text-sm sm:text-base text-center sm:text-left">
          Strong playstyle with lots of suspended animation and timestop.
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
              <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Feast + Goblet</p>
              <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Nobility</p>
            </div>
          </div>
        </div>
        <div class="p-2 mt-3 rounded-sm" >
          <p class="text-sm sm:text-base text-left">
              <li class="text-sm sm:text-base"> ER Lite: Equip Because of You sigil and get all three Ego signets on Floor 7.</li>
              <li class="text-sm sm:text-base"> Normal mode: Feast is the enabler, and Goblet allows you to keep up the rotation. Get both Ego signets at the start by using Thorny Crown sigil, OR by resetting Floor 1 until you get another Ego portal, OR use Because of You support sigil and get the other two Ego signets on Floor 7.</li>
          </p>
          </div>
          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            <!-- First Signet with 'Start' text -->
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
                <img src="/images/signets/Signets of Decimation (Kalpas).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>
          
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Deliverance (Kevin).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1 or 2</p>
              </div>
              
              <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Vicissitude (Hua).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">2</p>
              </div>

              <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Helix (Vill-V).png" alt="Signet 4" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Gold (Eden).png" alt="Signet 5" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Reverie (Pardofelis).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold">2</p>
              </div>

          </div>

          <div class="p-2 mt-3 rounded-sm" >
            <p class="text-sm sm:text-base text-left ">

                <li class="text-sm sm:text-base"> Decimation 1: Not recommended for new players, since you can easily die.</li>
                <li class="text-sm sm:text-base"> Deliverance 2: The additional Lightning DMG from Cosmos and Lovely Wishes count as Ult DMG, and can increase Deliverance 2 stack. It takes around 3 Basic ATK cycles to get max stack. </li>

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
                <p class="text-lg font-semibold">START</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
                <div class="flex flex-row rounded-sm">
                <img src="/images/valkportrait/Fu Hua Azure Empyrea.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-lg font-semibold">MID</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
                <div class="flex flex-row rounded-sm">
                <img src="/images/valkportrait/Pardofelis Reverist Calico.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-lg font-semibold">FINAL</p>
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
                <p class="text-lg font-semibold">START (ER Lite)</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
                <div class="flex flex-row rounded-sm">
                    <img src="/images/sigils/Mad_Kings_Mask.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                    <img src="/images/sigils/An_Old_Pals_Legacy.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-lg font-semibold">START (Normal)</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
                <div class="flex flex-row rounded-sm">
                    <img src="/images/sigils/Tin_Flask.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                    <img src="/images/sigils/An_Old_Pals_Legacy.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-lg font-semibold">FINAL</p>
            </div>

          </div>

          
          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">HOW TO PLAY</h2>

          <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>Press Ult to enter Planet Quaker form.</li>
          <li>Press weapon ➔ spam Basic ATK until meter is full.</li>
          <li>When meter is full, use Combo ATK.</li>
          <li>When ult is available, use Ult.</li>
          <li>Repeat.</li>
        </ol>

        <p class="mt-8 text-sm sm:text-base pb-4 text-center">
          Check out this showcase from Marisa Honkai (Soon)
      </p>
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
              <li class="mb-3"><b>S2:</b> Ultimate restores full Banquet. Big upgrade for both dmg and rotation. Also speeds up Stellar Drain.</li>
              <li class="mb-3"><b>SS:</b> Total DMG +10%. Hold-Weapon skill +6 freeze trauma. On bosses with big freeze trauma like Hephaestus or Huodou, this reduces the number of hold-weapon required from three times to two times.</li>
              <li><b>SS1:</b> Self Shield DMG +80% ➔ +100%</li>
            </ul>
          </div>
      
          <!-- Support Upgrade Box -->
          <div class="flex-1 p-2 bg-gray-800 rounded-lg shadow-md border border-yellow-400">
            <h3 class="text-lg font-semibold text-yellow-400 mb-2">Support Upgrade</h3>
            <ul class=" text-slate-100 text-base">
              <li class="mb-3"><b>S2:</b> Ultimate restores full Banquet. Big upgrade for both dmg and rotation. Also speeds up Stellar Drain.</li>
              <li class="mb-3"><b>SS:</b> Total DMG +10%</li>
              <li><b>SS1:</b> Team Shield DMG +65% ➔ 80%.</li>
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
                  When AR Wheel of Destiny is activated:<br/>
                  - Enemies take +7.5% ➔ 10% more Physical and Elemental DMG from WoDestiny valks
<br/>
- During AR Charging: WoDestiny valks gain Elemental and Physical DMG +7.5% ➔ 10%
<br/>- During Stellar Outburst: WoDestiny valks gain Elemental and Physical DMG +27% ➔ 30%

                </td>
                <td class="p-3">DPS<br>WoDestiny Support</td>
              </tr>
              <!-- Sample Row 2 -->
              <tr>
                <td>S2</td>
                <td>

                  After casting Ult, restore full Banquet. For every Banquet restored, the next Moment of Indulgence deals 100% ATK of Ice DMG.

                </td>
                <td>Big upgrade to rotation and dmg for dps and support roles.</td>
              </tr>
              <tr>
                <td>S3</td>
                <td>
                  1. Leader Skill:<br/>
                  - Team Shadow Star ATK Total DMG +18% ➔ 22%
<br/>
- During AR Charging: Valks on the field gain Ice DMG +16% ➔ 20%
<br/>
- During Stellar Outburst: Enemies take 12% ➔ 15% more Ice DMG from valks on the field (independent multiplier)
                </td>
                <td>DPS</td>
              </tr>
              <tr>
                <td>SS</td>
                <td>
                  1. UNLOCK: Total DMG +6%. Hold-Weapon skill inflicts 6 additional points of freeze trauma.<br/>
                  2. UNLOCK: When Astral Ring is active, if Thelema is on field, off-field Valkyries gain Total DMG +10%. If Thelema is off-field,  Valkyries on the field gain Total DMG +10%.
                </td>
                <td>DPS<br/>
                  Any AR Support <br/>
                  Bigger freeze trauma</td>
              </tr>
              <tr>
                <td>SS1</td>
                <td>
                  Self Shield DMG +15% ➔ 20%. When AR Wheel of Destiny is active: Team Shield DMG +65% ➔ 80%. During Stellar Outburst: Self Total DMG +7.5% ➔ 10%.                </td>
                <td>DPS<br/>WoDestiny Support

              </tr>
              <tr>
                <td>SS2</td>
                <td>
                  When AR is inactive, Thelema gain Ice DMG and Total DMG +30% ➔ 33% , gain +12% ➔ 16% more against BIO enemies, and enemies take 27% ➔ 30% more Ice DMG from Thelema (independent multiplier).                </td>
                <td>Part 1 DPS

              </tr>
              <tr>
                <td>SS3</td>
                <td>
                  Leader Skill:<br/>
                  - Team Shadow Star ATK Total DMG +22% ➔ 26%<br/>
                  - During AR Charging: Valks on the field gain Ice DMG +20% ➔ 24%<br/>
                  - During Stellar Outburst: Enemies take 15% ➔ 18% more Ice DMG from valks on the field (independent multiplier)              
                </td>
                <td>DPS
              </tr>
              <tr>
                <td>SSS</td>
                <td>
                  Ice DMG +12%. After casting Moment of Indulgence, the next 6 attacks that restore Banquet gain Ice DMG +30%.
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
              <p>When AR Wheel of Destiny is activated:<br/>
                - Enemies take +7.5% ➔ 10% more Physical and Elemental DMG from WoDestiny valks<br/>
                - During AR Charging: WoDestiny valks gain Elemental and Physical DMG +7.5% ➔ 10%<br/>
                - During Stellar Outburst: WoDestiny valks gain Elemental and Physical DMG +27% ➔ 30%
              </p>
              <p class="mt-2"><strong>Good for:</strong> DPS, WoDestiny Support</p>
            </div>
          </div>

          <div class="accordion-item">
            <div class="accordion-title" on:click={() => toggleItem(2)}>
              <span>S2</span>
              <span class="text-md">{openItem === 2 ? '-' : '+'}</span>
            </div>
            <div class="accordion-content {openItem === 2 ? 'open' : ''}">
              <p>After casting Ult, restore full Banquet. For every Banquet restored, the next Moment of Indulgence deals 100% ATK of Ice DMG.
              </p>
              <p class="mt-2"><strong>Good for:</strong> Big upgrade to rotation and dmg for dps and support roles.</p>
            </div>
          </div>

        

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(3)}>
            <span>S3</span>
            <span class="text-md">{openItem === 3 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 3 ? 'open' : ''}">
            <p>Leader Skill:<br/>
              - Team Shadow Star ATK Total DMG +18% ➔ 22%<br/>
              - During AR Charging: Valks on the field gain Ice DMG +16% ➔ 20%<br/>
              - During Stellar Outburst: Enemies take 12% ➔ 15% more Ice DMG from valks on the field (independent multiplier)
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
            <p>1. UNLOCK: Total DMG +6%. Hold-Weapon skill inflicts 6 additional points of freeze trauma.<br/>
              2. UNLOCK: When Astral Ring is active, if Thelema is on field, off-field Valkyries gain Total DMG +10%. If Thelema is off-field, Valkyries on the field gain Total DMG +10%.
            </p>
            <p class="mt-2"><strong>Good for:</strong> DPS, Any AR Support, Bigger freeze trauma</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(5)}>
            <span>SS1</span>
            <span class="text-md">{openItem === 5 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 5 ? 'open' : ''}">
            <p>WSelf Shield DMG +15% ➔ 20%. When AR Wheel of Destiny is active: Team Shield DMG +65% ➔ 80%. During Stellar Outburst: Self Total DMG +7.5% ➔ 10%.</p>
            <p class="mt-2"><strong>Good for:</strong> DPS, WoDestiny Support</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(6)}>
            <span>SS2</span>
            <span class="text-md">{openItem === 6 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 6 ? 'open' : ''}">
            <p>When AR is inactive, Thelema gain Ice DMG and Total DMG +30% ➔ 33% , gain +12% ➔ 16% more against BIO enemies, and enemies take 27% ➔ 30% more Ice DMG from Thelema (independent multiplier).</p>
            <p class="mt-2"><strong>Good for:</strong> Part 1 DPS</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(7)}>
            <span>SS3</span>
            <span class="text-md">{openItem === 7 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 7 ? 'open' : ''}">
            <p>Leader Skill:<br/>
              - Team Shadow Star ATK Total DMG +22% ➔ 26%<br/>
              - During AR Charging: Valks on the field gain Ice DMG +20% ➔ 24%<br/>
              - During Stellar Outburst: Enemies take 15% ➔ 18% more Ice DMG from valks on the field (independent multiplier)</p>
            <p class="mt-2"><strong>Good for:</strong> DPS</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(8)}>
            <span>SSS</span>
            <span class="text-md">{openItem === 8 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 8 ? 'open' : ''}">
            <p>	Ice DMG +12%. After casting Moment of Indulgence, the next 6 attacks that restore Banquet gain Ice DMG +30%. </p>
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
            <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">Thelema DPS and Support</h2>

            <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">Around 8:44</p>

            <div class="relative overflow-hidden" style="padding-top: 56.25%;">
              <iframe
                  class="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/O-gIiHYQtMI"
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
        <!-- Video 1 with title and description -->

      
        <div class="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">Thelema DPS</h2>

          <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">VS Ice Raven</p>

          <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
            loading="lazy" 

                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/No11TBnKoO8"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        </div>
      </div>

      
      

    </div>

    <div class=" gap-6 my-10">
      <!-- Video 1 with title and description -->

    
      <div class="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">Thelema Support (Wheel of Destiny)</h2>

        <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">Thelema supporting Jovial Deception</p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
          <iframe
          loading="lazy" 

              class="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/tKkwXiFwRUI"
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

