<svelte:head>
  <title>Senadina - Deepspace Anchor: First Light</title> 

    <meta property="og:title" content="Senadina - Deepspace Anchor: First Light" />
    <meta property="og:description" content="Sena Guides, Builds and Gameplay" />
    <meta property="og:image" content="https://i.imgur.com/9RaYzHw.png" />
    <meta property="og:url" content="https://marisaimpact.com/valk/sena" />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary_large_image">


    <link rel="canonical"  />
</svelte:head>

<script lang="ts">
    import { goto } from '$app/navigation';
    import likesData from '$lib/data/likes.json'; // Import local JSON data

    import { onMount } from "svelte";
import { hasUserLiked, likeWithVoterId } from "$lib/firebaseLikes"; // Import helper functions
import { getFirestore } from "firebase/firestore";
import { app } from "$lib/firebaseConfig";

const db = getFirestore(app); // Ensure this is used for Firebase operations
  import SimpDPS from '$lib/components/lineup/simpdps.svelte';
  import SenaDPS from '$lib/components/lineup/senadps.svelte';


import Lightbox from '$lib/components/lightbox.svelte';
	import Sparkledps from '$lib/components/lineup/sparkledps.svelte';
	import Jddps from '$lib/components/lineup/jddps.svelte';
	import Lanterndps from '$lib/components/lineup/lanterndps.svelte';
	import Thelemadps from '$lib/components/lineup/thelemadps.svelte';
	import { limit } from 'firebase/firestore';
	import Hohdps from '$lib/components/lineup/hohdps.svelte';
	import CharBio from '$lib/components/CharBio.svelte';
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
import { faCircleUser , faUsers , faBook , faVideo , faHome , faBolt ,faComments  ,faStar , faFire , faTriangleExclamation} from '@fortawesome/free-solid-svg-icons';
	import CharacterLayoutShort from '$lib/components/valkpage/CharacterLayoutShort.svelte';

  let selectedTab = 'Overview'; // Default tab
  const tabs = [
    { name: 'Overview', short: 'overview', icon: faHome },
  { name: 'Lineup', short: 'lineup', icon: faUsers },
  { name: 'Equipment', short: 'equipment', icon: faBolt  },
  { name: 'Support Buffs', short: 'support', icon: faCircleUser },
  { name: 'How to Play', short: 'howtoplay', icon: faBook },
  { name: 'Gameplay', short: 'example', icon: faVideo },
  { name: 'Elysian Realm', short: 'er', icon: faFire },
  { name: 'Rank Up', short: 'rank', icon: faStar },
  { name: 'Question', short: 'qna' , icon: faComments  },
 // { name: 'Overview Card', short: 'card' },
  { name: 'TL Error', short: 'translation', icon: faTriangleExclamation  },
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
  let senalikes = likesData["sena"] || 0; // Get initial likes from JSON
  const charName = "sena"; // Route name for this character
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

    senalikes++;

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
 
 #app {
    height: 35rem;
    overflow: hidden;
    position: relative;
  }
</style>
  

<section class="relative mx-auto flex flex-row items-center justify-center px-4 md:p-2 gap-3 md:pb-0 sm:mb-10 md:mt-0  pt-2	sm:pt-0">
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

<div class="fixed  h-1/2 w-1/2 top-[-5vh] right-[-20vw]  z-[-8] hidden sm:block " id="avabox">    
  <img src="/images/bg/ava_sena.webp" alt="Lone Planetfarer" class=" object-contain slide-in-pls" /> 
</div>

<CharacterLayoutShort
  charName="sena"
  initialLikes={likesData["sena"] || 0}
  accent="bg-orange-800"
  image="/images/valkfull/Senadina.webp"
  alt="sena"
  title="Deepspace Anchor: First Light"
  name="Senadina"
  release="v7.3 (29 Feb 2024)"
>
  <!-- Tags / Type Row -->
  <CharBio mode="dps" rank="s" type="sd" element="lightning" ar="ws" bg="bg-orange-800" />

  <!-- Support Section -->
  <CharBio mode="support" ar={['wod', 'ws']}  bg="bg-orange-800"/>

</CharacterLayoutShort>


</section>

<div class="flex max-w-(--breakpoint-xl) justify-center mx-auto mt-5"> 


  <aside class="w-full sm:max-w-[10rem] md:max-w-[12rem] hidden sm:block p-4 text-gray-200 sticky top-16 h-[calc(100vh-4rem)]">
    <ul class="space-y-2">
      {#each tabs as tab}
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
          <strong>Updated For v8.5 (23 Oct 2025)
      </p>
      </div>

      <div>
          <!-- Roles Section -->
          <h2 class="text-xl  font-semibold mb-2 text-left cooltext text-slate-100">ROLES</h2>
          
          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">DPS</strong> <br/> An okay Lightning SD DPS. Excels against SD mobs thanks to dmg link mechanic. However, she has not been used as much as DPS, because:
              <br/>
              - Swarm bosses don't appear that frequently anymore.
              <br/>
              - Low rank Sena can't compete with more recent DPSes.
              <br/>
              - In a high investment team, high rank Sena can get good score on a few bosses like Lightning Guaymas and Stardust Sa. 
          </p>
          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">WoDestiny Support</strong> <br/> Great support. Provides Elemental Breach and strong buffs, with ZERO on-field time.
          </p>
          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">World Star Support</strong> <br/> Sena is a lower tier support for Resonance teams. Sena generates a resonance mark that can be consumed by other DPS to trigger resonance dmg 3 times.
          </p>

          <p class="mt-4 text-sm sm:text-base">
            <strong class="text-amber-400">Songque Synergy</strong> <br/> When Sena is paired with Songque AstralOp, activates the passive skill [Initial AR +25].
        </p>
          <div class="divider  "></div>
          <!-- Pull Recommendation Section -->
          <h2 class="text-xl font-semibold text-left text-slate-100 cooltext">PULL RECOMMENDATION</h2>

          <p class="mt-4 text-sm sm:text-base">
            <strong class="text-amber-400">New Players</strong><br/> Do not pull Sena from starter supply. The reason is (1) Sena is old and (2) Starter supply has the same cost and rate as regular supply, and worst of all, it lasts for 90 days, and the guarantee does not carry over like regular supplies.
            
        </p>

            <p class="mt-4 text-sm sm:text-base">
                <strong class="text-amber-400">F2P Players</strong>
                <br/>Currently, there's no way to get Sena, but if for some reason she returns in normal supply, it is not recommended to get Sena. Due to how Part 2 meta works (all valks are kinda balanced now and have their own niche) and how patches are longer (Monthly players can afford S-rank fullgear every patch, f2p can get S-rank fullgear every one or two patches), it’s better to 
                <br/> - Save until you can guarantee valk + fullgear,
                <br/> - Then get the latest valk early in the patch.
            </p>

          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">Competitive Players</strong> 

              <br/> 
              Currently, there's no way to get Sena. When she is available, you can consider getting her since she still has her niche uses.
              <br/>
            </p>

          <ul class="list-disc ml-6 text-sm sm:text-base">
              <li class="mt-2">Wheel of Destiny Support: At S-rank, Sena is slightly better than Vita thanks to her zero on-field time. In v8.5, we have a new good WoD support Hi Love Elf. We are lacking live data to compare the two valks as primary support.</li>
              <li class="mt-2">DPS: Sena is rarely used as DPS anymore, but a high investment Sena team can get good score on a few bosses like Lightning Guaymas and Stardust Sa.</li>

          </ul>

          <div class="divider  "></div>
          <!-- How to Get Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">HOW TO GET</h2>
          <ul class="list-disc ml-6 text-sm sm:text-base ">
              <li class="mt-2" ><strong>Senadina:</strong> Starter Supply</li>
              <li class="mt-2"><strong>Senadina's Weapon:</strong> Starter Equipment Supply</li>
              <li class="mt-2"><strong>Senadina's Stigma:</strong> Starter Equipment Supply, Forgeable</li>
          </ul>
          <div class="divider  "></div>
          <!-- Full Guide Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">FULL GUIDE</h2>
          <p class="mt-2 text-sm sm:text-base pb-4">
              Check out the full guide on YouTube (Soon)
          </p>


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
      <!-- Category 1: Vita DPS -->

      <SenaDPS maindps={true} />

      <div class="divider divider-accent text-xl custom-font tracking-wider text-teal-300  my-10"> World Star Support </div>
      
      <SimpDPS firstCharName="Sena" />

      <div class="divider  "></div>

      <Sparkledps firstCharName="Sena"></Sparkledps>

      {/if}

      {#if currentPage === 2}
      <div class="divider divider-accent text-xl custom-font tracking-wider text-teal-300 mt-8"> Wheel of Destiny Support </div>

      <Hohdps firstCharName='Sena'></Hohdps>

      <div class="divider  "></div>

<Jddps firstCharName='Sena'></Jddps>

      <div class="divider  "></div>

<Lanterndps firstCharName='Sena'></Lanterndps>

      <div class="divider  "></div>

<Thelemadps firstCharName='Sena'></Thelemadps>
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
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/01/15/73749426/7f0ca6d81d2e7ff8405e13c5a7206a83_4150025281676061990.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/02/01/50494840/e75568319856a6e13e22f5ec5d15df6a_8745920059461594503.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/02/01/50494840/444adc9467316bd2852de92832c5b03a_4065404017036214747.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/02/01/50494840/4cf038fc474f19c026e44108f504c2ac_2584338063707464472.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

              </div>  
              <h4 class="text-base sm:text-base text-white">Red Star Thunderbolt + Perfect Morning Set</h4>
              </div>




              <div class="p-4 mt-4 bg-linear-to-r from-cyan-950/75 to-cyan-900/75 rounded-sm">
                <p class="text-sm sm:text-base text-left mb-4">
                  <b>Red Star Thunderbolt </b><br/>  Huge self buffs and team buffs.
                </p>
        
                <p class="text-sm sm:text-base text-left mb-4">
                  <b>Perfect Morning set</b><br/> - MID and 3PC have WoDestiny support buffs that require Sena to consume 30 sp on standby (off field). The sp consumption is triggered when battle starts, when SO activates, and when SO ends. If Sena is on the field when enemy spawns (battle starts), Sena does consume sp but SHE IS NOT ON STANDBY, so the stigma buffs will not activate.
                  <br/> - When supporting WoDestiny team, if Sena switches in, some of the buffs from Prismatic Stars buff will be disabled permanently. However, if Sena equips Perfect Morning 3PC, Sena can switch in without losing any buff.
                  <br/> - Forgeable in Foundry.
                </p>
        
                <p class="text-sm sm:text-base text-left">
                  <b>Affix</b> <br/>Full ATK.
                </p>
              </div>
        

              <div class="divider  "></div>

              <h2 class="text-xl font-semibold text-center">TRANSITIONAL</h2>
              <div class="flex flex-row justify-center items-center gap-5">
                <div class="flex flex-col justify-center items-center">
                
                  <div class="flex flex-wrap my-2 rounded-lg overflow-hidden ">
  
                      <div class="w-14 h-14 sm:w-28 sm:h-28">
                          <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/09/06/50494840/2841a5bbda40fdb327b1d584d4472561_6166052678851258594.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                      </div>
  
                  </div>  
                  <p class="text-sm sm:text-base text-white text-center">Skyveil Feathers</p>
                  </div>


                <div class="flex flex-col justify-center items-center">
                
                  <div class="flex flex-wrap my-2 rounded-lg overflow-hidden ">
  
                      <div class="w-14 h-14 sm:w-28 sm:h-28">
                          <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/10/19/50494840/1bf1d09cd6de50e1e2e90aa9054c37e2_6487852907325483142.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                      </div>
  
                  </div>  
                  <p class="text-sm sm:text-base text-white text-center">Volatile Sparkler
                  </p>
                </div>

                <div class="flex flex-col justify-center items-center">
                
                  <div class="flex flex-wrap my-2 rounded-lg overflow-hidden ">
  
                      <div class="w-14 h-14 sm:w-28 sm:h-28">
                          <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/01/15/73749426/e4a04240fc1beb3486b1edf52fc8e686_1933481799434645907.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                      </div>
  
                  </div>  
                  <p class="text-sm sm:text-base text-white text-center">Life of Pi</p>
                </div>
                
              </div>
           </div>
      {/if}

      {#if selectedTab === 'Support Buffs'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">SUPPORT BUFFS</h2>

      <div class="flex flex-wrap gap-4 my-8">
        <!-- Example image list for support buffs; add your own image sources -->
        <img
          src="/images/valkbuff/buffs_sena.png"
          alt="Buff 1"
          class=" object-cover cursor-pointer"
          on:click={() => openLightbox('/images/valkbuff/buffs_sena.png')}
        />

        <!-- Add more images as needed -->
      </div>


      <div class="my-5 text-sm sm:text-base text-slate-100 space-y-4">
        <p class="mb-4 font-semibold">How to activate Senadina support buffs:</p>
        
          <div>
            <p class="font-semibold text-orange-300  mt-6">Stellar Drain</p>
            <p>Combo ATK consumes Stellar Drain. In WoDestiny team, teammates can consume Sena's Stellar Drain.</p>
          </div>

          <div>
            <p class="font-semibold text-orange-300 mt-6">Buffs for Wheel of Destiny</p>
            <li> Elemental Breach and buffs for Wheel of Destiny require Sena to consume 30 sp on standby (off field). 30 SP is automatically consumed when battle starts, when SO activates, and when SO ends. </li>
            <li> Perfect Morning MID and 3PC buffs require Sena to consume 30 sp <b>on standby (off field).</b> If Sena is on the field when the enemy spawns (battle starts), Sena does consume sp but SHE IS NOT ON STANDBY, so the stigma buffs will not activate.</li>
          </div>

          <div>
            <p class="font-semibold text-orange-300  mt-6">Without Perfect Morning 3PC</p>
            <p>When supporting WoDestiny team, if Sena switches in, some of the buffs from Prismatic Stars buff will be disabled permanently. However, if Sena equips Perfect Morning 3PC, Sena can switch in without losing any buff.</p>
          </div>

          <div>
            <p class="font-semibold text-orange-300 mt-6">Elemental Breach for World Star</p>
            Use Thunder in Clear Skies or Lightning Anchor (yoyo attack last hit) to make all teammates with AR World Star gain Ele Breach +12% and Ele DMG +25% for 25s.
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
            AR CHARGING
          </button>

          <button
          on:click={() => setPlaystyle('2')}
          class={`btn px-4 py-2 font-semibold rounded-sm ${activePlaystyle === '2' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-linear-to-r from-orange-600 to-amber-500 hover:text-white'}`}
        >
          STELLAR OUTBURST
        </button>
        </div>
      
        {#if activePlaystyle === '3'}
        <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">One Ego Playstyle</h2> 
        <p class="text-sm sm:text-base text-center sm:text-left">
          A playstyle centered around clearing a floor within one rotation of AR Charging and Stellar Outburst modes.

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
              <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Effortlessness</p>
              <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Any other Ego signet</p>
            </div>
          </div>
          
        </div>


          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            <!-- First Signet with 'Start' text -->
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
                <img src="/images/signets/Signets of Helix (Vill-V).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1 or 2</p>
              </div>

              <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Decimation (Kalpas).png" alt="Signet 4" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Gold (Eden).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>


              <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Setsuna (Sakura).png" alt="Signet 5" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1 or 2</p>
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

          <div class="p-2 mt-3 rounded-sm" >
            <p class="text-sm sm:text-base text-left">
                <li class="text-sm sm:text-base"> Senadina can use a lot of signets.</li>
                <li class="text-sm sm:text-base"> Decimation 1: Your HP is very low, and bosses can one-shot you. Not recommended for new players, , but you can get Vicissitude 2 for survivability. </li>
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
                <img src="/images/sigils/Pseudo_Miracle.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/sigils/Falling_in_Past_Light.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">START </p>
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

          <b>AR CHARGING</b>
          <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>START: Evade > Basic ATK x2 > Weapon > Basic ATK > Weapon x2 (Thunder in Clear Skies) (If you don't know what to press, just follow the flashing buttons.)</li>
          <li>Use Ultimate. Weapon skill will flash, and you can shortcut to Press Weapon > Press Weapon (Thunder in Clear Skies).</li>
          <li>Evasion > Basic ATK x2 > Weapon x2 (Thunder in Clear Skies).</li>
        </ol>

        <b>STELLAR OUTBURST</b>
        <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>Activate Stellar Outburst. Weapon skill will flash, and you can shortcut to Press Weapon > Press Weapon (Lightning Flash Anchor).</li>
          <li>If weapon button is flashing: Shortcut to Press Weapon > Press Weapon (Thunder in Clear Skies).</li>
          <li>If weapon button isn't flashing: Evade > Basic ATK x2 > Weapon x2.</li>
          <li>Use Ultimate whenever available..</li>
        </ol>
        
        <b>NOTE</b>
        <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>AR meter carries over from floor to floor. If the battle ends during Stellar Outburst, Stellar Outburst will also end early and you keep the remaining AR meter.</li>
          <li>Be careful not to activate Stellar Outburst after the battle is over. This will reset your AR meter to zero.</li>
        </ol>

        <p class="mt-2 text-sm sm:text-base pb-4 text-center">
            Check out this showcase from Marisa Honkai:
        </p>
        {/if}

        {#if activePlaystyle === '1'}
        <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">AR Charging Playstyle</h2> 
        <p class="text-sm sm:text-base text-center sm:text-left">
          A playstyle where Sena can keep consuming evasion charge to extend Thunderous Blazar state. Technically you can use this playstyle during Stellar Outburst, but there are better signets for Stellar Outburst.
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
              <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b>  Initial Dawning</p>
              <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Effortlessness ➔ Stellar Drive </p>
            </div>
          </div>
        </div>
        <div class="p-2 mt-3 rounded-sm" >
          <p class="text-sm sm:text-base text-left">          </p>
                     <ul class="list-disc px-4 text-sm sm:text-base">
 
              <li class="text-sm sm:text-base"> ER Lite mode: Equip Because of You sigil and get all three Ego signets on Floor 7.</li>
              <li class="text-sm sm:text-base"> Normal mode: Get both Ego signets at the start by using Thorny Crown sigil, OR by resetting Floor 1 until you get another Ego portal, OR use Because of You support sigil and get the other two Ego signets on Floor 7.</li>
            </ul>
          </div>
          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            <!-- First Signet with 'Start' text -->
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
              <img src="/images/signets/Signets of Helix (Vill-V).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold ">1 or 2</p>
            </div>



            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Gold (Eden).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold ">1</p>
            </div>


            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Setsuna (Sakura).png" alt="Signet 5" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold ">1 or 2</p>
            </div>

            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Stars (Griseo).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">1 or 2</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Decimation (Kalpas).png" alt="Signet 4" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold ">1</p>
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

          <div class="p-2 mt-3 rounded-sm" >
            <p class="text-sm sm:text-base text-left ">            </p>
          <ul class="list-disc px-4 text-sm sm:text-base">

                <li class="text-sm sm:text-base"> <span class="text-teal-400">Vicissitude 2</span>: Recommended to get Vicissitude 2 before tank boss. Senadina doesn't have a lot of invincibility frames. </li>
                <li class="text-sm sm:text-base"> <span class="text-sky-400">Setsuna</span>: Recommended to get the Setsuna signet that gives extra evasion charge so you have no evasion down time.</li>
                <li class="text-sm sm:text-base"> <span class="text-rose-400">Decimation 1</span>: Very strong signet, but your HP will be very low, and bosses can one-shot you. Not recommended for new players, but getting Vicissitude 2 should help you survive.</li>
          </ul>

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
              <img src="/images/sigils/Pseudo_Miracle.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/sigils/Because_of_You.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              </div>
              <p class="text-base sm:text-lg font-semibold">START (ER Lite) </p>
          </div>

            <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
                <div class="flex flex-row rounded-sm">
                <img src="/images/sigils/Pseudo_Miracle.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/sigils/Falling_in_Past_Light.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">START (Normal) </p>
            </div>

          <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
              <div class="flex flex-row rounded-sm">
                  <img src="/images/sigils/Key_to_the_Deep.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  <img src="/images/sigils/Dreamful_Gold.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              </div>
              <p class="text-base sm:text-lg font-semibold">FINAL (Gold Build)</p>
          </div>

          <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
              <div class="flex flex-row rounded-sm">
                  <img src="/images/sigils/Tin_Flask.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  <img src="/images/sigils/An_Old_Pals_Legacy.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              </div>
              <p class="text-base sm:text-lg font-semibold">FINAL (Decimation Build)</p>
          </div>

          </div>

          
          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">HOW TO PLAY</h2>

          <b>When you have evasion charge:</b>
          <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">

          <li>First evasion: Evade → Basic ATK x2 → Weapon → Basic ATK → Weapon x2 (Thunder in Clear Skies). </li>
          <li>Subsequent evasions: Evade → Basic ATK → Weapon x2 (Thunder in Clear Skies).</li>
          <li>If you don't know what to press, just follow the flashing buttons.</li>
          <li>Note: If you have Setsuna 2, evasion skill can be triggered without Basic ATK, allowing you to skip some Basic ATK. Just see if your weapon skill flashes.</li>

        </ol>

          <b>When you don't have evasion charge:</b>
          <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>If Ult is available, use Ultimate. This will restore full evasion charges. Also, weapon skill will flash. Press Weapon → Press Weapon (Thunder in Clear Skies)</li>
          <li>If Ult is not available, just spam Basic ATK to start the sequence in step 1.</li>
        </ol>

        <p class="mt-2 text-sm sm:text-base pb-4 text-center">
            Check out this showcase from Marisa Honkai:
        </p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
          <iframe
              class="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/Up1Kb8sK2FY/"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              loading="lazy">
          </iframe>
      </div>

        {/if}

        {#if activePlaystyle === '2'}
        <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">Stellar Outburst Playstyle</h2> 
        <p class="text-sm sm:text-base text-center sm:text-left">        </p>

                                  <ol class="list-disc px-4 mb-6 text-sm sm:text-base">

          <li>A playstyle centered around buffing Domain Resonance damage.</li>
          <li>Sena has a weird issue compared to other Part 2 valks: SHE DOES NOT START THE FLOOR WITH FULL AR METER and NONE OF HER SIGNET GIVE AR METER AFTER STELLAR OUTBURST ENDS. Instead, AR meter carries over from floor to floor. This means you are forced to play regular Senadina while waiting for AR meter to fill up.</li>
                                    </ol>
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
              <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Sudden Thunderbolt ➔ Increment</p>
              <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b>  Initial Dawning (Extend Blazar) OR Effortlessness (More DMG) </p>
            </div>
          </div>
          
        </div>


          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            <!-- First Signet with 'Start' text -->
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
                <img src="/images/signets/Signets of Helix (Vill-V).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1 or 2</p>
              </div>

              <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Decimation (Kalpas).png" alt="Signet 4" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Gold (Eden).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>


              <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Setsuna (Sakura).png" alt="Signet 5" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1 or 2</p>
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

          <div class="p-2 mt-3 rounded-sm" >
            <p class="text-sm sm:text-base text-left">            </p>
                        <ol class="list-disc px-4 mb-6 text-sm sm:text-base">

                <li class="text-sm sm:text-base"> Senadina can use a lot of signets.</li>
                <li class="text-sm sm:text-base"> Decimation 1: Your HP is very low, and bosses can one-shot you. Not recommended for new players, , but you can get Vicissitude 2 for survivability. </li>
                        </ol>
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
              <img src="/images/sigils/Pseudo_Miracle.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/sigils/Because_of_You.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              </div>
              <p class="text-base sm:text-lg font-semibold">START (ER Lite) </p>
          </div>

            <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
                <div class="flex flex-row rounded-sm">
                <img src="/images/sigils/Pseudo_Miracle.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/sigils/Falling_in_Past_Light.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">START (Normal) </p>
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

          <b>AR CHARGING</b>
          <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>START: Evade > Basic ATK x2 > Weapon > Basic ATK > Weapon x2 (Thunder in Clear Skies) (If you don't know what to press, just follow the flashing buttons.)</li>
          <li>Use Ultimate. Weapon skill will flash, and you can shortcut to Press Weapon > Press Weapon (Thunder in Clear Skies).</li>
          <li>Evasion > Basic ATK x2 > Weapon x2 (Thunder in Clear Skies).</li>
        </ol>

        <b>STELLAR OUTBURST</b>
        <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>Activate Stellar Outburst. Weapon skill will flash, and you can shortcut to Press Weapon > Press Weapon (Lightning Flash Anchor).</li>
          <li>If weapon button is flashing: Shortcut to Press Weapon > Press Weapon (Thunder in Clear Skies).</li>
          <li>If weapon button isn't flashing: Evade > Basic ATK x2 > Weapon x2.</li>
          <li>Use Ultimate whenever available.</li>
        </ol>
        
        <b>NOTE</b>
        <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>AR meter carries over from floor to floor. If the battle ends during Stellar Outburst, Stellar Outburst will also end early and you keep the remaining AR meter.</li>
          <li>Be careful not to activate Stellar Outburst after the battle is over. This will reset your AR meter to zero.</li>
        </ol>

        <p class="mt-2 text-sm sm:text-base pb-4 text-center">
            Check out this showcase from Marisa Honkai:
        </p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
          <iframe
              class="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/8jw88F1yufQ/"
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
            <ul class=" text-slate-100 text-base">
              <li>S2: Shares 80% of additional max HP dmg of an SD enemy to other SD enemies.</li>
              <li>SS: Evasion charge +1. Allows you to use evade ➔ weapon sequence one more time per rotation.</li>
              <li>SSS: Deal more dmg against swarm enemies.</li>
            </ul>
          </div>
      
          <!-- Support Upgrade Box -->
          <div class="flex-1 p-2 bg-gray-800 rounded-lg shadow-md border border-yellow-400">
            <h3 class="text-lg font-semibold text-yellow-400 mb-2">Support Upgrade</h3>
            <ul class=" text-slate-100 text-base">
              <li>SS1: AR World Star: Team Elemental Breach +4.5% ➔ 6%. Weapon Skill Total DMG +15% ➔ 20%.</li>
              <li>SSS: Valk on the field Total DMG +6%.</li>
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
                  During Thunderous Blazar, Basic ATK SEQ 4 deals additional 200% ATK of Lightning DMG.	
                </td>
                <td class="p-3">DPS</td>
              </tr>
              <!-- Sample Row 2 -->
              <tr>
                <td>S2</td>
                <td>

                  When you have sd remnant, 80% of the additional DMG dealt to an SD-type enemy's max HP will be passed onto up to 5 other nearby SD-type enemies.

                </td>
                <td>DPS</td>
              </tr>
              <tr>
                <td>S3</td>
                <td>
                  1. Leader Skill:<br/>
                  - During AR Charging: Weapon skill gain Lightning DMG +20% ➔ 25%.
                  <br/>
                  - Enemies take 20% ➔ 25% more Elemental DMG from Resonance ATK (independent multiplier)
                </td>
                <td>DPS</td>
              </tr>
              <tr>
                <td>SS</td>
                <td>
                  - Thunderous Blazar duration +1 second.<br/>
                  - Gain +1 evasion charge.<br/>
                  - Triggering Ultimate Evasion enhances Basic ATK SEQ 3 for 5s, making it deal additional 450% ATK of Lightning DMG (considered as weapon skill DMG)
                </td>
                <td>DPS<br/>
                  Rotation improved

              </tr>
              <tr>
                <td>SS1</td>
                <td>
                  When AR World Star is active: Weapon skill of all valks with Domain Resonance trait gain Total DMG +15% ➔ 20%, and their Elemental Breach +4.5% ➔ 6%. During AR Charging: Enemies take 9% ➔ 12% more Elemental DMG from valkyries with Domain Resonance trait
                </td>
                <td>DPS<br/> World Star Support
              </tr>
              <tr>
                <td>SS2</td>
                <td>
                  When AR is not activated: Lightning DMG +43% ➔ 50%, and Thunder in Clear Skies deal 300% ➔ 400% ATK of additional Lightning DMG. During Thunderous Blazar, enemies take 36% ➔ 40% more Lightning DMG from Deepspace Anchor (independent multiplier)                </td>
                <td>Part 1 DPS
              </tr>
              <tr>
                <td>SS3</td>
                <td>
                  Leader Skill:<br/>
                  - During AR Charging: Weapon skill gain Lightning DMG +25% ➔ 30%.<br/>
                  - Enemies take 25% ➔ 30% more Elemental DMG from Resonance ATK (independent multiplier)      
                </td>
                <td>DPS
              </tr>
              <tr>
                <td>SSS</td>
                <td>
                  All valks on the field gain Total DMG +6%. During Stellar Outburst: When Domain Resonance mark is triggered, deal 130% ATK of Lightning DMG (considered as weapon skill dmg) to up to 5 enemies affected by the resonance dmg. If there are less than 5 enemies, Deepspace Anchor's Domain Resonance mark will count as a target.
                </td>
                <td>DPS <br/>Support
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
              <p>During Thunderous Blazar, Basic ATK SEQ 4 deals additional 200% ATK of Lightning DMG.	
              </p>
              <p class="mt-2"><strong>Good for:</strong> DPS</p>
            </div>
          </div>

          <div class="accordion-item">
            <div class="accordion-title" on:click={() => toggleItem(2)}>
              <span>S2</span>
              <span class="text-md">{openItem === 2 ? '-' : '+'}</span>
            </div>
            <div class="accordion-content {openItem === 2 ? 'open' : ''}">
              <p>	When you have sd remnant, 80% of the additional DMG dealt to an SD-type enemy's max HP will be passed onto up to 5 other nearby SD-type enemies.
              </p>
              <p class="mt-2"><strong>Good for:</strong> DPS</p>
            </div>
          </div>

        

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(3)}>
            <span>S3</span>
            <span class="text-md">{openItem === 3 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 3 ? 'open' : ''}">
            <p>Leader Skill:<br/>
              - During AR Charging: Weapon skill gain Lightning DMG +20% ➔ 25%<br/>
              - Enemies take 20% ➔ 25% more Elemental DMG from Resonance ATK (independent multiplier)<br/>
              - Enemies take +4% ➔ 5% more Total DMG
            </p>
            <p class="mt-2"><strong>Good for:</strong> DPS, Any AR Support</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(4)}>
            <span>SS</span>
            <span class="text-md">{openItem === 4 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 4 ? 'open' : ''}">
            <p>1. Thunderous Blazar duration +1 second.<br/>
              2. Gain +1 evasion charge.<br/>
              3. Triggering Ultimate Evasion enhances Basic ATK SEQ 3 for 5s, making it deal additional 450% ATK of Lightning DMG (considered as weapon skill DMG)
            </p>
            <p class="mt-2"><strong>Good for:</strong> DPS, Rotation Improved</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(5)}>
            <span>SS1</span>
            <span class="text-md">{openItem === 5 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 5 ? 'open' : ''}">
            <p>When AR World Star is active: Weapon skill of all valks with Domain Resonance trait gain Total DMG +15% ➔ 20%, and their Elemental Breach +4.5% ➔ 6%. During AR Charging: Enemies take 9% ➔ 12% more Elemental DMG from valkyries with Domain Resonance trait</p>
            <p class="mt-2"><strong>Good for:</strong> DPS, World Star Support</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(6)}>
            <span>SS2</span>
            <span class="text-md">{openItem === 6 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 6 ? 'open' : ''}">
            <p>When AR is not activated: Lightning DMG +43% ➔ 50%, and Thunder in Clear Skies deal 300% ➔ 400% ATK of additional Lightning DMG. During Thunderous Blazar, enemies take 36% ➔ 40% more Lightning DMG from Deepspace Anchor (independent multiplier)</p>
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
              - During AR Charging: Weapon skill gain Lightning DMG +25% ➔ 30%.<br/>
              - Enemies take 25% ➔ 30% more Elemental DMG from Resonance ATK (independent multiplier)
            <p class="mt-2"><strong>Good for:</strong> DPS</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(8)}>
            <span>SSS</span>
            <span class="text-md">{openItem === 8 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 8 ? 'open' : ''}">
            <p>		All valks on the field gain Total DMG +6%. During Stellar Outburst: When Domain Resonance mark is triggered, deal 130% ATK of Lightning DMG (considered as weapon skill dmg) to up to 5 enemies affected by the resonance dmg. If there are less than 5 enemies, Deepspace Anchor's Domain Resonance mark will count as a target.
            <p class="mt-2"><strong>Good for:</strong> DPS, Support
            </p>
          </div>
        </div>


    </div>
        {/if}
      {/if}


      {#if selectedTab === 'How to Play'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">HOW TO PLAY</h2>
    
      <div class="text-center my-4">
        <p class="text-center text-sm sm:text-base">To Be Added
        </p>
      </div>

  {/if}
  
  
      {#if selectedTab === 'Gameplay'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">GAMEPLAY EXAMPLES</h2>
  


    <div class="gap-6 mt-5 mb-10 ">

      <div class="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">Senadina DPS</h2>

        <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">Sena DPS vs Stellar Assaka</p>

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

  <div class=" gap-6 my-10">
    <div class="bg-gray-800 p-4 rounded-lg shadow-md">
      <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">Senadina Support </h2>

      <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">Sena Supporting Lantern vs Type Counter Kasumi</p>

      <div class="relative overflow-hidden" style="padding-top: 56.25%;">
        <iframe
        loading="lazy" 

            class="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/-4YALc-iFy0"
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

  <div class="text-center my-4">
    <p class="text-center text-sm sm:text-base">No question
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


      {#if selectedTab === 'TL Error'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">TRANSLATION ERROR</h2>
      <div class="flex flex-col justify-center items-center">
          
          <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">

              <div class="w-20 h-20 sm:w-28 sm:h-28">
                  <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/02/01/50494840/444adc9467316bd2852de92832c5b03a_4065404017036214747.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
              </div>

          </div>  
          <p class="text-sm sm:text-base text-white">Senadina Scenery M</p>

      </div>

      <div class="text-center my-4 rounded-sm bg-gray-700">
        <p class="text-left text-sm sm:text-base px-2 py-3">
          <b>In-Game Text:</b><br/>
          Increases team's Elemental DMG by 20% (exclusive)
        </p>
      </div>

      <div class="text-center my-4 rounded-sm bg-cyan-700">
        <p class="text-left text-sm sm:text-base px-2 py-3 text-white">
          <b>Correct Translation:</b><br/>
          Increases team's weapon skill Elemental DMG by 20% (exclusive)
        </p>
      </div>

      <div class="text-center my-4 rounded-sm bg-gray-700">
        <p class="text-left text-sm sm:text-base px-2 py-3">
          <b>In-Game Text:</b><br/>
          ... team's Total DMG and Elemental DMG +25% permanently in AR Charging state (cannot stack)
        </p>
      </div>

      <div class="text-center my-4 rounded-sm bg-cyan-700">
        <p class="text-left text-sm sm:text-base px-2 py-3 text-white">
          <b>Correct Translation:</b><br/>
          ... team's Total DMG and Elemental DMG +25% permanently in AR Charging state (multiple triggers do not stack)
        </p>
      </div>


      <div>
        <div class="flex flex-col justify-center items-center">
            
          <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">
  
              <div class="w-20 h-20 sm:w-28 sm:h-28">
                  <img src="/images/valkportrait/Senadina Deepspace Anchor.png" alt="lv" class="w-full h-full object-cover">
              </div>
  
          </div>  
          <p class="text-sm sm:text-base text-white">Astral Ring sub-skill Custom Module: Radon</p>
  
      </div>
  
      <div class="text-center my-4 rounded-sm bg-gray-700">
        <p class="text-left text-sm sm:text-base px-2 py-3 ">
          <b>In-Game Text:</b><br/>
          When 30 sp has been consumed, all attacks from characters protected by Wheel of Destiny gain 16% Elemental Breach for 30s.
        </p>
      </div>
  
      <div class="text-center my-4 rounded-sm bg-cyan-700">
        <p class="text-left text-sm sm:text-base px-2 py-3 text-white">
          <b>Correct Translation:</b><br/>
          When 30 sp has been consumed, all characters protected by Wheel of Destiny enter <b>Elemental Breach state</b>, where all their attacks gain 16% Elemental Breach, lasts for 30s.
        </p>
      </div>
      </div>

      {/if}


  </div>

</section>


</div>

</section>


</div>

