<svelte:head>
  <title>Lunar Vow: Crimson Love</title> 

    <meta property="og:title" content="Lunar Vow: Crimson Love" />
    <meta property="og:description" content="Lunar Vow Guides, Builds and Gameplay" />
    <meta property="og:image" content="https://i.imgur.com/p2NSx8E.png" />
    <meta property="og:url" content="https://marisaimpact.com/valk/lv" />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary_large_image">


    <link rel="canonical"  />
</svelte:head>

<script lang="ts">
  import { onMount } from 'svelte';
  import LVDPS from '$lib/components/lineup/lvdpsdual.svelte';
  import LVDPSNormal from '$lib/components/lineup/lvdpsnormal.svelte';
  import P1DPS from '$lib/components/lineup/p1lightningdps.svelte';
  import { goto } from '$app/navigation';
  import likesData from '$lib/data/likes.json'; // Import local JSON data


import Lightbox from '$lib/components/lightbox.svelte';
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
  //{ name: 'Support Buffs', short: 'support' },
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
  let lvlikes = likesData["lv"] || 0; // Get initial likes from JSON
  const charName = "lv"; // Route name for this character
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
    lvlikes++;

    // Mark as liked in localStorage
    localStorage.setItem(`liked_${charName}`, "true"); 
    hasLiked = true;

    // Update the likes.json file (this would be done during a manual update process)
    console.log(`Character "${charName}" liked! New count: ${lvlikes}`);
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
  <img src="/images/bg/wave_lv.svg" alt="Lone Planetfarer" class="w-full h-full object-cover overflow-hidden" /> 
</div>


<div class="fixed  h-1/2 w-1/2 top-[-5vh] right-[-20vw]  z-[-8] hidden sm:block ">    
  <img src="/images/bg/ava_luna.webp" alt="Lone Planetfarer" class=" object-contain slide-in-pls" /> 
</div>

<!-- Left: Character Image -->
<div class="relative  w-auto h-48 sm:h-60 md:h-72 flex justify-center ">
  <!-- Image for Larger Screens -->
  <img src="/images/valkfull/lunar_vow.webp" alt="Sparkle" class="h-full w-auto object-cover md:object-contain  " style ="view-transition-name: valkyrie-image-4;"/> 

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
      <span class="text-white font-semibold">{lvlikes}</span>
    </button>
  </div>

</div>



<!-- Right: Character Info (Centered) -->
<div class="flex flex-col items-center text-center justify-start">
  <!-- Battlesuit Name -->

  <div>
  <h1 class="text-xl md:text-2xl text-slate-100 font-bold text-center leading-4 mb-2 sm:mb-0">Lunar Vow: Crimson Love  </h1>
</div>
  <!-- Character Name and Release Date -->
  <p class="text-base md:text-md custom-font mb-2 text-center tracking-wider md:block hidden text-slate-100">Luna 'Theresa' | Release Date: v7.0 (26 Oct 2023)</p>

  <!-- Common wrapper to ensure same width -->
  <div class="w-full max-w-sm mb-2">
    <!-- Container with 4 pictures (Centered) -->
    <div class="flex flex-col items-center">
      <div class="flex w-[260px] md:w-[300px] gap-2 flex-wrap justify-center outline outline-rose-500 outline-1 bg-rose-950/75 rounded-lg p-2 backdrop-blur-sm">
        <img src="/images/ranks/Valkyrie_S.webp" alt="S-rank" class="w-auto h-8 md:h-10" />
        <img src="/images/type/IconPSI.png" alt="Mech" class="w-auto h-8 md:h-10" />
        <img src="/images/element/Core_Lightning_DMG.png" alt="Icon 3" class="w-auto h-8 md:h-10" />
        <img src="/images/element/Core_Bleed_DMG.png" alt="Bleed" class="w-auto h-8 md:h-10" />
      </div>
    </div>

    <!-- Support For Container (Centered) -->
    <div class="flex flex-col mt-4 items-center">

      <div class="flex flex-col  w-[260px] md:w-[300px] flex-wrap justify-center outline outline-rose-500 outline-1 bg-rose-950/75 rounded-lg p-2 backdrop-blur-sm">
        <div class="flex flex-wrap justify-center">
          <h2 class="text-base md:text-md custom-font tracking-wider text-slate-100">SUPPORT FOR:</h2>
        </div >
        <div class="flex flex-row gap-2 flex-wrap justify-center">
          <img src="/images/artype/p1lightning.png" alt="Support 2" class="w-auto h-8 md:h-10" />
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
              <strong class="text-amber-400">Lighting Bleed DPS:</strong> One of the strongest Part 1 valks when fully geared. Luna's attacks count as Bleed DMG, so she can benefit from both Bleed and Lightning buffs.
          </p>
          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">P1 Lightning Support:</strong> As a Part 1 Lightning support, Luna provides Elemental Breach, sp regen and contributes team dmg herself.
          </p>

          <div class="divider divider-neutral"></div>
          <!-- Pull Recommendation Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">PULL RECOMMENDATION</h2>
          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">F2P Players:</strong> Only use your crystal to pull Part 2 valkyries, since they use a new Astral Ring system. If LV and her gears are available through other means, such as spending event or Battle Pass, you can consider getting them that way.
          </p>

          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">Competitive:</strong> Her scores are now even higher with the new Schicksal's Imperative support. However, getting LV should not be prioritized over Part 2 characters.
          </p>

          <div class="divider divider-neutral"></div>
          <!-- How to Get Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">HOW TO GET</h2>
          <ul class="list-disc ml-6 text-sm sm:text-base ">
              <li ><strong>Lunar Vow:</strong> Battlesuit Supply, Starter Supply</li>
              <li><strong>Lunar Vow's Weapon and Stigma:</strong> Focused Supply, Starter Supply</li>
              <li>Regular supply not available in v7.9. Last known supply is v7.7. </li>

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
                  src="https://www.youtube.com/embed/V5E91hNPYMk"
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



    <LVDPS/>

    <div class="divider divider-neutral"></div>


    <LVDPSNormal/>

    <div class="divider divider-neutral"></div>

    <P1DPS/>


</section>

  {/if}

      {#if selectedTab === 'Equipment'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-gradient-to-r  from-blue-700 to-blue-500 text-white rounded px-2 mb-2 text-center">EQUIPMENT</h2>
 
      <div>


              <h2 class="text-xl font-semibold text-center  text-yellow-400">BEST FOR BOTH DPS AND SUPPORT</h2>

              <div class="flex flex-col justify-center items-center">
                  
              <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2023/09/20/73749426/b2e2438694ca6abf803db1c9cbc2e45c_6234720183403357231.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2023/09/24/79683856/426cc5889b9239e8ff4014777c8dc2fa_4488466297192546109.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2023/09/24/79683856/af3711d1f9e48f9cca45cd7e5bd3a507_918417302771055766.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2023/09/24/79683856/b9d9e14e19eb6f7130f86d779f2d8282_5263195937204938457.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

              </div>  
              <h4 class="text-base sm:text-base text-white">Bloodied Casket + Sweet Dreams</h4>
              </div>

              <div class="p-2 mt-2 bg-gradient-to-r from-cyan-950/75 to-cyan-900/75 rounded" >
              <p class="text-sm sm:text-base text-left">
                  <li class="text-sm sm:text-base"><b>Bloodied Casket :</b> Pure damage for Lunar Vow. Inflict Bleed trauma per second. In Elysian Realm, weapon active also allows you to benefit from Infinity signet</li>
                  <li class="text-sm sm:text-base"><b>Sweet Dreams: </b> Has dps and support buffs. 3PC has sp regen, which may make or break a run. </li>
                  <li class="text-sm sm:text-base"><b>Affix: </b> Full ATK.</li>
              </p>
              </div>

           </div>
      {/if}

      {#if selectedTab === 'Support Buffs'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-gradient-to-r  from-blue-700 to-blue-500 text-white rounded px-2 mb-2 text-center">SUPPORT BUFFS</h2>

      <div class="my-5 text-sm sm:text-base">
      <p class=" text-slate-100">
        How to activate Lunar Vow buffs:
        <li> <b>Stellar Drain:</b> Combo ATK consumes Stellar Drain. In WoDestiny team, teammates can consume Lantern's Stellar Drain.</li>
        <li> <b>Ultimate / Combo ATK: </b> Activates Fire Shower buff for 25s. This is also activated / refreshed during Stellar Outburst.</li>
        <li> <b>Deal damage: </b> Activates stigma effect Hanging Flame for 25s. This is also activated / refreshed during Stellar Outburst.</li>
        <li> The rest of her buffs are activated passively.</li>
      </p>
      </div>

      <div class="flex flex-wrap gap-4">
        <!-- Example image list for support buffs; add your own image sources -->
        <img
          src="/images/valkbuff/buffs_lantern.png"
          alt="Buff 1"
          class=" object-cover cursor-pointer"
          on:click={() => openLightbox('/images/valkbuff/buffs_lantern.png')}
        />

        <!-- Add more images as needed -->
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
            CHAINSAW MAAM
          </button>
        
          <button
            on:click={() => setPlaystyle('2')}
            class={`px-4 py-2 font-semibold rounded ${activePlaystyle === '2' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gradient-to-r from-orange-600 to-amber-500 hover:text-white'}`}
          >
            WEAPON SLASHER
          </button>
        </div>
      
        {#if activePlaystyle === '1'}
        <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">Basic ATK Playstyle</h2> 
        <p class="text-sm sm:text-base text-center sm:text-left">
          Lunar Vow stays at very low HP to deal massive damage. Don't worry, she gains a permanent shield and has dmg resistance, so she will never die and will never let you down.
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
              <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Vessel</p>
              <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Lasting Embrace ➔ Hermit</p>
            </div>
          </div>
          
        </div>
        <div class="p-2 mt-3 rounded" >
          <p class="text-sm sm:text-base text-left">
              <li class="text-sm sm:text-base"> ER Lite mode: Equip Because of You sigil and get all three Ego signets on Floor 7.</li>
              <li class="text-sm sm:text-base"> Normal mode: You can complete the run with just one Ego signet (Vessel), but having more Ego signets is a big improvement, especially if you are not using full gear Lunar Vow. You can get more Ego signets at the start by using Thorny Crown sigil, OR by resetting Floor 1 until you get another Ego portal, OR use Because of You support sigil and get the other two Ego signets on Floor 7.</li>
          </p>
          </div>

          <div class="divider divider-neutral"></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            <!-- First Signet with 'Start' text -->
            <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
              <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
                <img src="/images/signets/Signets of Decimation (Kalpas).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Bodhi (Su).png" alt="Signet 5" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>

              <div class="flex flex-col items-center p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Daybreak (Kosma).png" alt="Signet 4" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>

              <div class="flex flex-col items-center p-1 rounded relative border border-slate-500">
                <div class="badge badge-accent z-10 absolute top-2 font-semibold">CASKET</div>
                <img src="/images/signets/Signets of Infinity (Mobius).png" alt="Signet 4" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>

              <div class="flex flex-col items-center p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Deliverance (Kevin).png" alt="Signet 4" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">2</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Reverie (Pardofelis).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold">1</p>
              </div>


          </div>

          <div class="p-2 mt-3 rounded" >
            <p class="text-sm sm:text-base text-left">
                <li class="text-sm sm:text-base"> Infinity: Only works with Bloodied Casket equipped. With Bloodied Casket, weapon skill summons bats, which are considered as summoned entity.</li>
                <li class="text-sm sm:text-base"> Daybreak: LV is one of the four valks that deal Bleed DMG, and Daybreak provides buffs for Bleed DMG.
                </li>
                <li class="text-sm sm:text-base"> Deliverance 2: LV's Ultimate has enough hitcount to activate Deliverance 2.
                </li>
            </p>
            </div>

            <div class="divider divider-neutral"></div>
            <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SUPPORTS</h2>

          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            
            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                <img src="/images/valkportrait/Fu Hua Azure Empyrea.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">START</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                <img src="/images/valkportrait/Fu Hua Azure Empyrea.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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
          <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">HOW TO PLAY</h2>

          <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>Use weapon to enter Frenzy mode</li>
          <li>Press evade ➔ Press and hold Basic ATK to use chainsaw slash</li>
          <li>At the end of slash sequence, Basic ATK button will flash, press Basic ATK to cast Combo ATK</li>
          <li>Repeat Step 2 and 3</li>
          <li>Use Ultimate whenever available</li>
          <li>If the battle takes too long, Elemental Breach and Lightning DMG buff will expire (Luna icon above HP bar). Hold weapon to end Frenzy mode, then when meter is full again, use weapon to activate Frenzy mode.</li>
        </ol>

        <p class="mt-2 text-sm sm:text-base pb-4 text-center">
            Check out this showcase from Marisa Honkai:
        </p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/NvEYO8asYV0"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                loading="lazy">
            </iframe>
        </div>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
          <iframe
              class="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/vCIWCJEsu3Q"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              loading="lazy">
          </iframe>
      </div>
        {/if}

        {#if activePlaystyle === '2'}
        <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">Weapon Spam Playstyle
        </h2> 
        <p class="text-sm sm:text-base text-center sm:text-left">
          Spam weapon button


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
              <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Chase</p>
              <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b>  Divine Pact ➔ Hermit</p>
            </div>
          </div>
        </div>
        <div class="p-2 mt-3 rounded" >
          <p class="text-sm sm:text-base text-left">
              <li class="text-sm sm:text-base"> ER Lite mode: Equip Because of You sigil and get all three Ego signets on Floor 7.</li>
              <li class="text-sm sm:text-base"> Normal mode: You can complete the run with just one Ego signet (Chase), but having more Ego signets is a big improvement, especially if you are not using full gear Lunar Vow. You can get more Ego signets at the start by using Thorny Crown sigil, OR by resetting Floor 1 until you get another Ego portal, OR use Because of You support sigil and get the other two Ego signets on Floor 7.</li>
          </p>
          </div>
          <div class="divider divider-neutral"></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">

          
            <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
              <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
                <img src="/images/signets/Signets of Helix (Vill-V).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1 or 2</p>
              </div>
              
              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Bodhi (Su).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>


              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Daybreak (Kosma).png" alt="Signet 5" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
                  <img src="/images/signets/Signets of Infinity (Mobius).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  <p class="text-lg font-semibold ">Casket</p>
                </div>

                <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                  <img src="/images/signets/Signets of Deliverance (Kevin).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  <p class="text-lg font-semibold">2</p>
                </div>

              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Reverie (Pardofelis).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold">1</p>
              </div>

          </div>
          <div class="p-2 mt-3 rounded" >
            <p class="text-sm sm:text-base text-left">
                <li class="text-sm sm:text-base"> Infinity: Only works with Bloodied Casket equipped. With Bloodied Casket, weapon skill summons bats, which are considered as summoned entity.</li>
                <li class="text-sm sm:text-base"> Daybreak: LV is one of the four valks that deal Bleed DMG, and Daybreak provides buffs for Bleed DMG.
                </li>
                <li class="text-sm sm:text-base"> Deliverance 2: LV's Ultimate has enough hitcount to activate Deliverance 2.
                </li>
            </p>
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
                <img src="/images/sigils/Pseudo_Miracle.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/sigils/Because_of_You.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-lg font-semibold">START (ER Lite)</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                    <img src="/images/sigils/Pseudo_Miracle.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                    <img src="/images/sigils/Falling_in_Past_Light.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-lg font-semibold">START (Normal)</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                    <img src="/images/sigils/Heavy_as_a_Million_Lives.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                    <img src="/images/sigils/Falling_in_Past_Light.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-lg font-semibold">FINAL</p>
            </div>

          </div>

          
          <div class="divider divider-neutral"></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">HOW TO PLAY</h2>

          <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>Press weapon to enter Frenzy mode.</li>
          <li>Spam weapon until meter depletes</li>
          <li>Use Ultimate</li>
          <li>If you have Divine Pact signet, Ult will restore full meter. If you don't have Divine Pact signet, hold weapon to restore meter.</li>
          <li>Repeat. </li>
        </ol>

        <p class="mt-2 text-sm sm:text-base pb-4 text-center">
            Check out this showcase from Marisa Honkai:
        </p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/umzF5U6uxWs"
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
            <h3 class="text-lg font-semibold text-blue-400 mb-1">DPS Upgrade</h3>
            <ul class=" text-slate-100 text-base">
              <li>S2: Team Lightning DMG +30%</li>
              <li>SS: Ult Lightning DMG +100%
              </li>
              <li>SS2: Team Total DMG +10% ➔ 30%
              </li>
              <li>SSS: Combo ATK Lightning DMG +100%</li>
            </ul>
          </div>
      
          <!-- Support Upgrade Box -->
          <div class="flex-1 p-2 bg-gray-800 rounded-lg shadow-md border border-yellow-400">
            <h3 class="text-lg font-semibold text-yellow-400 mb-1">Support Upgrade</h3>
            <ul class=" text-slate-100 text-base">
              <li>SS1 and SS: More Elemental Breach
              </li>
              <li>S2: Team Lightning DMG +30%
              </li>
              <li>SS2: Team Total DMG +10% ➔ 30%</li>
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
                  Casting Ultimate grants Lightning teammates Elemental Breach +11% ➔ 14% for 16s	
                </td>
                <td class="p-3">Support<br/>Recommended!</td>
              </tr>
              <!-- Sample Row 2 -->
              <tr>
                <td>S2</td>
                <td>
                  UNLOCK: Upon entering Frenzy mode, team Lightning DMG +30% for 16s	

                </td>
                <td>DPS<br/>Support<br/>Recommended!</td>
              </tr>
              <tr>
                <td>S3</td>
                <td>
                  Leader Skill: Team Lightning DMG +25% ➔ 26%, and Bleed DMG +39% ➔ 40%	
                </td>
                <td>DPS</td>
              </tr>
              <tr>
                <td>SS</td>
                <td>
                  1. UNLOCK: Ultimate Lightning DMG +100%<br/>
                  2. Casting Ultimate grants Lightning teammates Elemental Breach +14% ➔ 17% for 16s<br/>
                </td>
                <td>DPS<br/>
                  Support<br/>
              </tr>
              <tr>
                <td>SS1</td>
                <td>
                  When LV deals Bleed DMG while on standby, LV recover 1 ➔ 1.2 sp, CD 0.5s </td>
                <td>DPS<br/>
                  Support<br/>
              </tr>
              <tr>
                <td>SS2</td>
                <td>
                  When there are 3 team members of different types: When entering Frenzy mode, teammates gain Total DMG +10% ➔ 30% for 20s.                </td>
                <td>Support
              </tr>
              <tr>
                <td>SS3</td>
                <td>
                  Leader Skill: Team Lightning DMG +26% ➔ 27%, and Bleed DMG +40% ➔ 41%	                
                </td>
                <td>DPS
              </tr>
              <tr>
                <td>SSS</td>
                <td>
                  1. UNLOCK: Combo ATK Lightning DMG +50%<br/>
                  2. UNLOCK: Start the battle with 40sp
                </td>
                <td>DPS<br/>
                  Memorial Arena<br/>
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
            <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">Lunar Vow DPS and Support</h2>

            <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">Around 7:00 timestamp</p>

            <div class="relative overflow-hidden" style="padding-top: 56.25%;">
              <iframe
                  class="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/V5E91hNPYMk"
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
  


    <div class=" gap-6 my-10">
      <div class="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">Lunar Vow x SIMP Double DPS</h2>

        <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">VS Starless Benares</p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
          <iframe
          loading="lazy" 

              class="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/fh0J4KpRQLc"
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
      <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">Lunar Vow Bleed DPS</h2>

      <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">VS Bleed Cruising Tribunal Boss</p>

      <div class="relative overflow-hidden" style="padding-top: 56.25%;">
        <iframe
        loading="lazy" 

            class="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/ekFVwuQYphc"
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
        <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">Lunar Vow Support (Part 1)</h2>

        <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">LV Supporting Part 1 Lightning DPS Mobius</p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
          <iframe
          loading="lazy" 

              class="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/QNbnmaqrXHQ"
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

      <div class="my-6 mx-2">
        <div class="chat chat-start ">
          <div class="chat-image avatar">
            <div class="w-10 sm:w-12 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="/images/meibald.webp" />
            </div>
          </div>
          <div class="chat-bubble chat-bubble-primary text-base text-white">Umm ackshually Luna is not the first Lightning valk that deals Bleed DMG. Shadow Knight did it first.</div>
        </div>

        <div class="chat chat-end">
          <div class="chat-image avatar">
            <div class="w-10 sm:w-12 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="/images/ds.webp" />
            </div>
          </div>
          <div class="chat-bubble chat-bubble-neutral text-slate-100 py-4">Shadow Knight inflicts <span class="text-rose-300">Bleed status damage-over-time</span> to activate one of her <span class="text-purple-300">Lightning DMG buffs</span>. Lunar Vow's <span class="text-purple-300">Lightning DMG</span> attacks count as <span class="text-rose-300"><b>Bleed DMG</b></span>, which is a completely separate dmg type. Only four valks deal Bleed DMG - Lunar Vow, Susannah, Cosmic Expression and Starry Impression.</div>
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

      <div>
      <div class="flex flex-col justify-center items-center">
          
        <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">

            <div class="w-20 h-20 sm:w-28 sm:h-28">
                <img src="/images/valkportrait/Theresa Lunar Vow.png" alt="lv" class="w-full h-full object-cover">
            </div>

        </div>  
        <p class="text-sm sm:text-base text-white">Ultimate sub-skill 3: Devouring Vision</p>

    </div>

    <div class="text-center my-4 rounded bg-gray-700">
      <p class="text-left text-sm sm:text-base px-2 py-3">
        <b>In-Game Text:</b><br/>
        Casting Ultimate grants Elemental Breach to all Lightning DMG dealers on the team...
      </p>
    </div>

    <div class="text-center my-4 rounded bg-cyan-700">
      <p class="text-left text-sm sm:text-base px-2 py-3 text-white">
        <b>Correct Translation:</b><br/>
        Casting Ultimate grants Elemental Breach <b>state</b> to all Lightning DMG dealers on the team...
      </p>
    </div>
    </div>

    
    <div>
      <div class="flex flex-col justify-center items-center">
          
        <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">

            <div class="w-20 h-20 sm:w-28 sm:h-28">
                <img src="https://act-upload.mihoyo.com/bh3-wiki/2023/09/24/79683856/426cc5889b9239e8ff4014777c8dc2fa_4488466297192546109.png?x-oss-process=image/quality,q_75/resize,s_120" alt="lv" class="w-full h-full object-cover">
            </div>

        </div>  
        <p class="text-sm sm:text-base text-white">Darkness: Illuminated 3-PC</p>

    </div>

    <div class="text-center my-4 rounded bg-gray-700">
      <p class="text-left text-sm sm:text-base px-2 py-3">
        <b>In-Game Text:</b><br/>
        ... she recovers 1 sp per second and ...
      </p>
    </div>

    <div class="text-center my-4 rounded bg-cyan-700">
      <p class="text-left text-sm sm:text-base px-2 py-3 text-white">
        <b>Correct Translation:</b><br/>
        ... she recovers 1 sp per second <b>while on the field</b> and ...
      </p>
    </div>
    </div>

      {/if}
    

  </div>

</section>


</div>

</section>


</div>

