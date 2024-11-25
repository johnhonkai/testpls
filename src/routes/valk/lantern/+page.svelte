<svelte:head>
  <title>Lantern - Lone Destruction: Shadowchaser</title> 

    <meta property="og:title" content="Lantern - Lone Destruction: Shadowchaser" />
    <meta property="og:description" content="Lantern Guides, Builds and Gameplay" />
    <meta property="og:image" content="https://i.imgur.com/8Fly1Xl.png" />
    <meta property="og:url" content="https://marisaimpact.com/valk/lantern" />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary_large_image">


    <link rel="canonical"  />
</svelte:head>

<script lang="ts">
    import { goto } from '$app/navigation';
    import likesData from '$lib/data/likes.json'; // Import local JSON data

  import { onMount } from 'svelte';
  import Charred from '$lib/components/charpctred.svelte';
  import SimpDPS from '$lib/components/lineup/simpdps.svelte';
  import SenaDPS from '$lib/components/lineup/senadps.svelte';
  import JDDPS from '$lib/components/lineup/jddps.svelte';
  import LanternDPS from '$lib/components/lineup/lanterndps.svelte';
import ThelDPS from '$lib/components/lineup/thelemadps.svelte';
import VitaDPS from '$lib/components/lineup/vitadps.svelte';

import Lightbox from '$lib/components/lightbox.svelte';
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
  let lanternlikes = likesData["lantern"] || 0; // Get initial likes from JSON
  const charName = "lantern"; // Route name for this character
  let hasLiked = false; // Track if the user has liked
  let voterId = ""; // User's unique voter ID

  // Generate or fetch the voterId on component mount
  onMount(() => {
    voterId = localStorage.getItem("voterId") || crypto.randomUUID(); // Generate a new voterId if not already stored
    localStorage.setItem("voterId", voterId); // Save voterId in localStorage

    // Check if the user has already liked this character
    hasLiked = !!localStorage.getItem(`liked_${charName}`);
  });

  // Increment likes in local storage and JSON
  async function increaseLike() {
    if (hasLiked) return; // Prevent multiple likes

    // Increment local counter
    lanternlikes++;

    // Mark as liked in localStorage
    localStorage.setItem(`liked_${charName}`, "true"); 
    hasLiked = true;

    // Update the likes.json file (this would be done during a manual update process)
    console.log(`Character "${charName}" liked! New count: ${lanternlikes}`);
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
<div class="absolute   top-0 w-full h-[90vh] z-[-10] opacity-85 ">    
  <img src="/images/bg/wave_lantern.svg" alt="Lone Planetfarer" class="w-full h-full object-cover overflow-hidden" /> 
</div>


<div class="fixed  h-1/2 w-1/2 top-[-5vh] right-[-20vw]  z-[-8] hidden sm:block ">    
  <img src="/images/bg/ava_lantern.webp" alt="Lone Planetfarer" class=" object-contain slide-in-pls" /> 
</div>

<!-- Left: Character Image -->
<div class="relative  w-auto h-48 sm:h-60 md:h-72 flex justify-center ">
  <!-- Image for Larger Screens -->
  <img src="/images/valkfull/lantern.webp" alt="Sparkle" class="h-full w-auto object-cover md:object-contain  " style ="view-transition-name: valkyrie-image-10;"/> 

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
      <span class="text-white font-semibold">{lanternlikes}</span>
    </button>
  </div>

</div>



<!-- Right: Character Info (Centered) -->
<div class="flex flex-col items-center text-center justify-start">
  <!-- Battlesuit Name -->

  <div>
  <h1 class="text-xl md:text-2xl text-slate-100 font-bold text-center leading-4 mb-2 sm:mb-0">Lone Destruction: Shadowchaser</h1>
</div>
  <!-- Character Name and Release Date -->
  <p class="text-base md:text-md custom-font mb-2 text-center tracking-wider md:block hidden text-slate-100">Tsavorae 'Lantern' | Release Date: v7.5 (6 June 2024)</p>

  <!-- Common wrapper to ensure same width -->
  <div class="w-full max-w-sm mb-2">
    <!-- Container with 4 pictures (Centered) -->
    <div class="flex flex-col items-center">
      <div class="flex w-[260px] md:w-[300px] gap-2 flex-wrap justify-center outline outline-rose-500 outline-1 bg-rose-950/75 rounded-lg p-2 backdrop-blur-sm">
        <img src="/images/ranks/Valkyrie_S.webp" alt="S-rank" class="w-auto h-8 md:h-10" />
        <img src="/images/type/IconPSI.png" alt="Mech" class="w-auto h-8 md:h-10" />
        <img src="/images/element/Core_Fire_DMG.png" alt="Icon 3" class="w-auto h-8 md:h-10" />
        <img src="/images/artype/ar wheel of destiny.png" alt="ar" class="w-auto h-8 md:h-10" />
      </div>
    </div>

    <!-- Support For Container (Centered) -->
    <div class="flex flex-col mt-4 items-center">

      <div class="flex flex-col  w-[260px] md:w-[300px] flex-wrap justify-center outline outline-rose-500 outline-1 bg-rose-950/75 rounded-lg p-2 backdrop-blur-sm">
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
      <h2 class="text-2xl sm:text-3xl font-semibold bg-gradient-to-r  from-blue-700 to-blue-500 text-white rounded px-2 mb-4 text-center">OVERVIEW</h2>

      <div>
          <!-- Roles Section -->
          <h2 class="text-xl  font-semibold mb-2 text-left cooltext text-slate-100">ROLES</h2>
          
          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">Gunslinger Fire DPS</strong> <br/>Switches between three firearms to attack. Has hight hitcount. No ignite.
          </p>
          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">World Star Support</strong> <br/>Lantern is good, but not the best support generally for World Star teams. But, Lantern is used against Fire Kosma to break his high hitcount hp fast.
          </p>
          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">WoDestiny Support</strong> <br/>One of the best supports for all WoDestiny DPS so far. As Jovial Deception support, Lantern provides 30% Crit Rate and 30-35% Crit DMG. Lantern herself also contributes dmg against bosses such as Ranged Kalpas.
          </p>

          <div class="divider divider-neutral"></div>
          <!-- Pull Recommendation Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">PULL RECOMMENDATION</h2>
          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">F2P Players</strong> <br/>Lantern is good, but so is every other Part 2 S-rank. Not highly recommended to get Lantern due to Lantern having less value than other Part 2 S-ranks. If you still plan to get her, at least make sure she can synergize with your existing characters.
          </p>

          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">Competitive</strong> <br/>Recommended to pull as DPS, and as support for Thelema and Jovial Deception.
          </p>

          <div class="divider divider-neutral"></div>
          <!-- How to Get Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">HOW TO GET</h2>
          <ul class="list-disc ml-6 text-sm sm:text-base ">
              <li ><strong>Lantern:</strong> Battlesuit Supply</li>
              <li><strong>Lantern's Weapon:</strong> Equipment Supply</li>
              <li><strong>Lantern's Stigma:</strong> Equipment Supply, Forgeable</li>
              <li>Not available in v7.9. Last known supply is v7.8. </li>

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
                  src="https://www.youtube.com/embed/hJ3oOfaBKx8"
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

    {#if currentPage === 1}

    <LanternDPS firstCharIndex={0} maindps={true} />

    <div class="divider divider-accent text-xl custom-font tracking-wider text-teal-300"> Wheel of Destiny Support </div>

    <JDDPS firstCharIndex={1} />

    <div class="divider divider-neutral"></div>

    <ThelDPS firstCharIndex={2} />

    {/if}


      {#if currentPage === 2}




      <div class="divider divider-accent text-xl custom-font tracking-wider text-teal-300"> World Star Support </div>
      
<Sparkledps  firstCharName='Lantern' ></Sparkledps>

      <div class="divider divider-neutral"></div>

      <SimpDPS firstCharName='Lantern' />

      <div class="divider divider-neutral"></div>

      <SenaDPS firstCharName='Lantern' />



  
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
      <h2 class="text-2xl sm:text-3xl font-semibold bg-gradient-to-r  from-blue-700 to-blue-500 text-white rounded px-2 mb-2 text-center">EQUIPMENT</h2>
 
      <div>


              <h2 class="text-xl font-semibold text-center  text-yellow-400">BEST</h2>

              <div class="flex flex-col justify-center items-center">
                  
              <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/04/26/50494840/fdf9a3b1880444e00efc1f922a74aa74_8009935878666782667.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/04/26/50494840/5363cd661844090b823da7e47bcdbe9b_2353231369413872792.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/04/26/50494840/e0652107ba0efebd7745117794d96488_3069810941181076618.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/04/26/50494840/725a4ecf67c7366cdbd9302eb1520bfa_1805052475713266074.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

              </div>  
              <h4 class="text-base sm:text-base text-white">Burn the Long Night + Lantern: Guardian Set</h4>
              </div>

              <div class="p-2 mt-2 bg-gradient-to-r from-cyan-950/75 to-cyan-900/75 rounded" >
              <p class="text-sm sm:text-base text-left">
                  <li class="text-sm sm:text-base"><b>Burn the Long Night :</b> Has multiple utilities - initial sp +20/35/50, start with half Blast Energy meter, and auto evasion trigger.</li>
                  <li class="text-sm sm:text-base"><b>Lantern: Guardian: </b> All buffs </li>
                  <li class="text-sm sm:text-base"><b>Affix: </b> Full ATK.</li>
              </p>
              </div>

              <div class="divider divider-neutral"></div>

              <h2 class="text-xl font-semibold text-center">TRANSITIONAL</h2>
              <div class="flex flex-col justify-center items-center">
                  
                  <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">
  
                      <div class="w-20 h-20 sm:w-28 sm:h-28">
                          <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/01/29/79683856/ea83fc1ab3d44a7cb541fadea9fb5cd5_7541009746074619802.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                      </div>
  
                  </div>  
                  <p class="text-sm sm:text-base text-white">Lightning Arc</p>
  
                  <p></p>
                  </div>
           </div>
      {/if}

      {#if selectedTab === 'Support Buffs'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-gradient-to-r  from-blue-700 to-blue-500 text-white rounded px-2 mb-2 text-center">SUPPORT BUFFS</h2>

      <div class="flex flex-wrap gap-4 my-8">
        <!-- Example image list for support buffs; add your own image sources -->
        <img
          src="/images/valkbuff/buffs_lantern.png"
          alt="Buff 1"
          class=" object-cover cursor-pointer"
          on:click={() => openLightbox('/images/valkbuff/buffs_lantern.png')}
        />

        <!-- Add more images as needed -->
      </div>


      <div class="my-5 text-sm sm:text-base text-slate-100 space-y-4">
        <p class="mb-4 font-semibold">How to activate Lantern support buffs:</p>
        
          <div>
            <p class="font-semibold text-orange-300  mt-6">Stellar Drain</p>
            <p>Combo ATK consumes Stellar Drain. In WoDestiny team, teammates can consume Lantern's Stellar Drain.</p>
          </div>

          <div>
            <p class="font-semibold text-orange-300 mt-6">Ultimate / Combo ATK</p>
            <p>Activates Fire Shower buff for 25s. This is also activated / refreshed during Stellar Outburst.</p>
          </div>

          <div>
            <p class="font-semibold text-orange-300  mt-6">Deal damage</p>
            <p>Activates stigma effect Hanging Flame for 25s. This is also activated / refreshed during Stellar Outburst.</p>
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
      <h2 class="text-2xl sm:text-3xl font-semibold bg-gradient-to-r  from-blue-700 to-blue-500 text-white rounded px-2 mb-2 text-center">ELYSIAN REALM</h2>

      <div class="flex justify-center gap-4 my-6">
          <button
            on:click={() => setPlaystyle('1')}
            class={`px-4 py-2 font-semibold rounded ${activePlaystyle === '1' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gradient-to-r from-orange-600 to-amber-500 hover:text-white'}`}
          >
            STELLAR OUTBURST
          </button>
        
          <button
            on:click={() => setPlaystyle('2')}
            class={`px-4 py-2 font-semibold rounded ${activePlaystyle === '2' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gradient-to-r from-orange-600 to-amber-500 hover:text-white'}`}
          >
            AR CHARGING
          </button>
        </div>
      
        {#if activePlaystyle === '1'}
        <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">Stellar Outburst Playstyle</h2> 
        <p class="text-sm sm:text-base text-center sm:text-left">
          Stronger playstyle.
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
              <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Raging Fire ➔ Scorching Flames</p>
              <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Illuminated Night</p>
            </div>
          </div>
          
        </div>
        <div class="p-2 mt-3 rounded" >
          <p class="text-sm sm:text-base text-left">
              <li class="text-sm sm:text-base"> ER Lite mode: Equip Because of You sigil and get all three Ego signets on Floor 7.</li>
              <li class="text-sm sm:text-base"> Normal mode: You can complete the run with just one Ego signet (Raging Fire), but having both Ego signets is a big improvement. You can get both Ego signets at the start by using Thorny Crown sigil, OR by resetting Floor 1 until you get another Ego portal, OR use Because of You support sigil and get the other two Ego signets on Floor 7.</li>
          </p>
          </div>

          <div class="divider divider-neutral"></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            <!-- First Signet with 'Start' text -->
            <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
              <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
                <img src="/images/signets/Signets of Helix (Vill-V).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>

            <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Gold (Eden).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>
          


              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Bodhi (Su).png" alt="Signet 5" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">2</p>
              </div>

              <div class="flex flex-col items-center p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Decimation (Kalpas).png" alt="Signet 4" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">2</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Reverie (Pardofelis).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold">1</p>
              </div>

          </div>


            <div class="divider divider-neutral"></div>
            <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SUPPORTS</h2>

          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            
            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                <img src="/images/valkportrait/Thelema Mad Pleasure.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">START</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                <img src="/images/valkportrait/Thelema Mad Pleasure.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">MID</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                <img src="/images/valkportrait/Pardofelis Reverist Calico.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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
                    <img src="/images/sigils/Heavy_as_a_Million_Lives.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                    <img src="/images/sigils/Dreamful_Gold.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">FINAL</p>
            </div>

          </div>

          
          <div class="divider divider-neutral"></div>
          <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">HOW TO PLAY</h2>

          <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>Activate Stellar Outburst.</li>
          <li>Use Support (phantom).</li>
          <li>Press weapon ➔ Spam Basic ATK to fill meter.</li>
          <li>Spam Basic ATK until meter is full ➔ Use Combo ATK ➔ Repeat</li>
          <li>Use Ultimate whenever available</li>
          <li>Optional: At the start of battle, use firearm rotation first to gather enemies</li>
        </ol>

        <p class="mt-2 text-sm sm:text-base pb-4 text-center">
            Check out this showcase from Marisa Honkai:
        </p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/_YzN4ayJaCQ"
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
          Weaker playstyle. Hold evasion to spin and win~

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
              <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Blazing Torch ➔ Luminance</p>
              <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b>  Illuminated Night</p>
            </div>
          </div>
        </div>
        <div class="p-2 mt-3 rounded" >
          <p class="text-sm sm:text-base text-left">
              <li class="text-sm sm:text-base"> ER Lite mode: Equip Because of You sigil and get all three Ego signets on Floor 7.</li>
              <li class="text-sm sm:text-base"> Normal mode: You can complete the run with just one Ego signet (Blazing Torch), but having both Ego signets is a big improvement. You can get both Ego signets at the start by using Thorny Crown sigil, OR by resetting Floor 1 until you get another Ego portal, OR use Because of You support sigil and get the other two Ego signets on Floor 7.</li>
          </p>
          </div>
          <div class="divider divider-neutral"></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            <!-- First Signet with 'Start' text -->
            <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
                <img src="/images/signets/Signets of Setsuna (Sakura).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">2</p>
              </div>
          
            <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Gold (Eden).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>
              
              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Bodhi (Su).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>


              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Decimation (Kalpas).png" alt="Signet 5" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">2</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Reverie (Pardofelis).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold">1</p>
              </div>

          </div>


            <div class="divider divider-neutral"></div>
            <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SUPPORTS</h2>

          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            
            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                <img src="/images/valkportrait/Fu Hua Azure Empyrea.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-lg font-semibold">START</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                <img src="/images/valkportrait/Fu Hua Azure Empyrea.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-lg font-semibold">MID</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                <img src="/images/valkportrait/Pardofelis Reverist Calico.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-lg font-semibold">FINAL</p>
            </div>
            
          </div>

          <div class="divider divider-neutral"></div>
          <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SIGIL</h2>

          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            
            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                <img src="/images/sigils/Forget-Me-Not.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/sigils/Because_of_You.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-lg font-semibold">START (ER Lite)</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                    <img src="/images/sigils/Forget-Me-Not.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                    <img src="/images/sigils/Tsukimi_Himiko.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-lg font-semibold">START (Normal)</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                    <img src="/images/sigils/Tin_Flask.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                    <img src="/images/sigils/Dreamful_Gold.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-lg font-semibold">FINAL</p>
            </div>

          </div>

          
          <div class="divider divider-neutral"></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">HOW TO PLAY</h2>

          <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>Hold evade button</li>
          <li>???</li>
          <li>Win</li>
          <li>Optional: At the start of battle, use firearm rotation first to gather enemies and to trigger Helix buffs. </li>
          <li>Optional: Use Ult whenever available.</li>
        </ol>

        <p class="mt-2 text-sm sm:text-base pb-4 text-center">
            Check out this showcase from Marisa Honkai:
        </p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/_YzN4ayJaCQ"
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
      <h2 class="text-xl font-semibold my-4 cooltext text-white">NOTABLE RANK-UP</h2>

        <!-- Notable Rank Ups Section -->
        <div class="flex flex-col lg:flex-row gap-4 mb-8">
          <!-- DPS Upgrade Box -->
          <div class="flex-1 p-2 bg-gray-800 rounded-lg shadow-md border border-blue-400">
            <h3 class="text-lg font-semibold text-blue-400 mb-2">DPS Upgrade</h3>
            <ul class=" text-slate-100 text-base">
              <li>S2: Combo ATK deals more dmg and more hits</li>
              <li>SSS: Regular evasion triggers evasion skill</li>
              <li>All ranks have DPS upgrades</li>
            </ul>
          </div>
      
          <!-- Support Upgrade Box -->
          <div class="flex-1 p-2 bg-gray-800 rounded-lg shadow-md border border-yellow-400">
            <h3 class="text-lg font-semibold text-yellow-400 mb-2">Support Upgrade</h3>
            <ul class=" text-slate-100 text-base">
              <li>S1: When AR: World Star is active, enemies take 3.5% > 5% more Elemental DMG</li>
              <li>SS: Teammates Total DMG +10%</li>
              <li>SS1: WoD valks gain Total DMG +8% > 10% [AC] / +15% > 18% [SO]</li>
            </ul>
          </div>
        </div>

        <div class="divider divider-neutral"></div>

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
                  Self Fire DMG +9% ➔ 16%. When AR: World Star is active, enemies take 3.5% ➔ 5% more Elemental DMG.
                </td>
                <td class="p-3">1. DPS<br>2. World Star Support</td>
              </tr>
              <!-- Sample Row 2 -->
              <tr>
                <td>S2</td>
                <td>
                  UNLOCK: During Combo ATK, rocket launcher fires cluster bombs, deal additional 8x75% ATK of Fire DMG, counts as Combo ATK.

                </td>
                <td>1. DPS<br/>2. Hitcount</td>
              </tr>
              <tr>
                <td>S3</td>
                <td>
                  Leader Skill:<br/>
                  Team Shadow Star ATK gain Total DMG +18% ➔ 22%<br/>
                  During AR Charging: Valk on the field gain Fire DMG +16% ➔ 20%<br/>
                  During Stellar Outburst, enemies take 12% ➔ 15% more Fire DMG from valks on the field (independent multiplier)

                </td>
                <td>DPS</td>
              </tr>
              <tr>
                <td>SS</td>
                <td>
                  UNLOCK: Self Combo ATK +20%. When you have Fire Shower buff, other teammates gain Total DMG +10%
                </td>
                <td>1. DPS <br/>2. Support</td>
              </tr>
              <tr>
                <td>SS1</td>
                <td>
                  During AR Charging: Valks with AR Wheel of Destiny gain Total DMG +8% ➔ 10%<br/>
                  During Stellar Outburst: Valks with AR Wheel of Destiny gain Total DMG +15% ➔ 18%

                </td>
                <td>1. DPS <br/>2. WoD Support</td>
              </tr>
              <tr>
                <td>SS2</td>
                <td>
                  When you have Cracked Shot buff, self Total DMG +18% ➔ 24%	                
                </td>
                <td>DPS
              </tr>
              <tr>
                <td>SS3</td>
                <td>
                  Leader Skill:<br/>
                  Team Shadow Star ATK gain Total DMG +22% ➔ 26%<br/>
                  During AR Charging: Valk on the field gain Fire DMG +20% ➔ 24%<br/>
                  During Stellar Outburst, enemies take 15% ➔ 18% more Fire DMG from valks on the field (independent multiplier)               
                </td>
                <td>DPS
              </tr>
              <tr>
                <td>SSS</td>
                <td>
                  1. UNLOCK: Non-ultimate evasion on the ground also triggers evasion skill. CD: 1<br/>
                  2. When you use QTE or Firepower Rotation Attack, gain No Bullet Wasted buff, Self Fire DMG +26% ➔ 35%
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
              <p>1. When AR World Star / WoDestiny is activated, Omniscient Skyveil grants Breach for valks with World Star / WoDestiny trait:<br/>
                - Elemental Breach +11.5% ➔ 14%<br/>
                - Physical Breach +37% ➔ 45%<br/>
                2. The locked AR subskill has S1 upgrade.
              </p>
              <p class="mt-2"><strong>Good for:</strong> WoDestiny Support, World Star Support, Future AR Support. Recommended!</p>
            </div>
          </div>

          <div class="accordion-item">
            <div class="accordion-title" on:click={() => toggleItem(2)}>
              <span>S2</span>
              <span class="text-md">{openItem === 2 ? '-' : '+'}</span>
            </div>
            <div class="accordion-content {openItem === 2 ? 'open' : ''}">
              <p>1. Enemies take 37% ➔ 40% more Lightning DMG from LP (independent multiplier). If there are 2/3 team members with AR Rite of Oblivion, LP gain Total DMG and Lightning DMG +18.5/64.9% ➔ 20/70%<br/>
                2. UNLOCK: Weapon skill trigger 3 second time fracture, trigger interval 2 seconds.
              </p>
              <p class="mt-2"><strong>Good for:</strong> DPS, Time Fracture. Recommended!</p>
            </div>
          </div>

        

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(3)}>
            <span>S3</span>
            <span class="text-md">{openItem === 3 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 3 ? 'open' : ''}">
            <p>1. Leader Skill:<br/>
              - Team Total DMG +8% ➔ 10%<br/>
              - Team Elemental DMG +8% ➔ 10%<br/>
              - Enemies take +4% ➔ 5% more Total DMG<br/>
              2. Enemies take 12% ➔ 15% more Elemental DMG and 9% ➔ 11% more Physical DMG from valks with Omniscient Skyveil
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
            <p>1. When using Celestial Rupture, consume all Abyssal Ingestion stacks when consuming Stellar Drain. Each stack restores an additional 5 ➔ 10 AR meter.<br/>
              2. Combo ATK Lightning DMG +14% ➔ 20% , and Elemental Breach +5.5% ➔ 8%<br/>
              3. UNLOCK: When WoD is activated, when battle starts, the first Celestial Rupture used can consume Stellar Drain two more times. This effect lasts until you enter Stellar Outburst.
            </p>
            <p class="mt-2"><strong>Good for:</strong> DPS, WoDestiny support, Any AR Support</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(5)}>
            <span>SS1</span>
            <span class="text-md">{openItem === 5 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 5 ? 'open' : ''}">
            <p>When Celestial Rupture hits, deal additional dmg equal to ATK x105 ➔ x140 (HP Loss DMG). Restore 300 ➔ 400 HP</p>
            <p class="mt-2"><strong>Good for:</strong> DPS</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(6)}>
            <span>SS2</span>
            <span class="text-md">{openItem === 6 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 6 ? 'open' : ''}">
            <p>When LP is the leader, when there are 3 team members with AR Rite of Oblivion trait, LP's attacks gain Elemental Breach +5% ➔ 6%, and her Ult deals additional 800% ➔ 900% ATK of Lightning DMG.</p>
            <p class="mt-2"><strong>Good for:</strong> DPS</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(7)}>
            <span>SS3</span>
            <span class="text-md">{openItem === 7 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 7 ? 'open' : ''}">
            <p>Leader Skill:<br/>
              - Team Total DMG +10% ➔ 12%<br/>
              - Team Elemental DMG +10% ➔ 12%<br/>
              - Enemies take +5% ➔ 6% more Total DMG</p>
            <p class="mt-2"><strong>Good for:</strong> DPS</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(8)}>
            <span>SSS</span>
            <span class="text-md">{openItem === 8 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 8 ? 'open' : ''}">
            <p>	When AR is activated, at the start of battle, LP provides Sprouting Wish for the team for 25s. Sprouting Wish provides these effects:<br/>
              - Total DMG +10%, Elemental DMG +83%, Physical DMG +64%<br/>
              - Enemies take 15% more EleDMG and 11% more PhyDMG from valks with Sprouting Wish.<br/>
              - When you gain Omniscient Skyveil, Sprouting Wish is disabled.<br/>
            <p class="mt-2"><strong>Good for:</strong> Any AR Support
            </p>
          </div>
        </div>


    </div>
        {/if}
      {/if}


      {#if selectedTab === 'How to Play'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded px-2 mb-2 text-center">HOW TO PLAY</h2>
  
      <div class=" gap-6 mt-4">
          <!-- Video 1 with title and description -->
          <div class="bg-gray-800 p-4 rounded-lg shadow-md">
            <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">Lantern DPS and Support</h2>

            <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">Around 8:58</p>

            <div class="relative overflow-hidden" style="padding-top: 56.25%;">
              <iframe
                  class="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/hJ3oOfaBKx8"
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
        <!-- Video 1 with title and description -->

      
        <div class="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">Lantern DPS</h2>

          <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">S0 Lantern DPS in Nirvana vs Type Counter Kasumi</p>

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

    <div class=" gap-6 my-10">
      <!-- Video 1 with title and description -->

    
      <div class="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">Lantern Supporting JD</h2>

        <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">Lantern Support JD vs Stellar Assaka</p>

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
  <h2 class="text-2xl sm:text-3xl font-semibold bg-gradient-to-r  from-blue-700 to-blue-500 text-white rounded px-2 mb-2 text-center">POPULAR QUESTION</h2>


  <div class="my-10">
    <div class="chat chat-start ">
      <div class="chat-image avatar">
        <div class="w-10 sm:w-12 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="/images/meibald.webp" />
        </div>
      </div>
      <div class="chat-bubble chat-bubble-primary text-slate-100 ">I was following your rotation, why can't I switch my character as fast as your rotation?</div>
    </div>

    <div class="chat chat-end">
      <div class="chat-image avatar">
        <div class="w-10 sm:w-12 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="/images/ds.webp" />
        </div>
      </div>
      <div class="chat-bubble chat-bubble-neutral text-slate-100 py-5">Turn off the support's QTE. Using QTE makes your switch cd longer.

      </div>
    </div>
  </div>

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

