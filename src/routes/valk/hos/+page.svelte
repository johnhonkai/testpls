
<svelte:head>
    <title>Fu Hua - Herrscher of Sentience</title> 
    <meta property="og:title" content="u Hua - Herrscher of Sentience" />
    <meta property="og:description" content="Herrscher of Sentience Guide, Builds and Gameplay" />
    <meta property="og:image" content="" />
    <meta property="og:url" content="https://marisaimpact.com/valk/hos" />
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
  let fovlikes = likesData["hos"] || 0; // Get initial likes from JSON
  const charName = "hos"; // Route name for this character
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


<div class="sm:mt-14"></div>
<section class="relative mx-auto flex flex-row items-center justify-center px-4 md:p-2 gap-3 md:pb-0  md:mt-0  pt-2	sm:pt-0	">
  <div class="absolute   top-0 w-full h-[90vh] z-[-10] opacity-85 " id="bgwavebox">    
    <img src="/images/bg/wave_lantern.svg" alt="Lone Planetfarer" class="w-full h-full object-cover overflow-hidden" /> 
  </div>
  
  
  
  <!-- Left: Character Image -->
  <div class="relative  w-auto h-48 sm:h-60 md:h-72 flex justify-center " id="valkpicbox">
    <!-- Image for Larger Screens -->
    <img src="/images/valkfull/hos.webp" alt="Sirin" class="h-full w-auto object-cover md:object-contain  " style ="view-transition-name: valkyrie-image-42;"/> 
  
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
    <h1 class="text-xl md:text-2xl text-slate-100 font-bold text-center leading-4 mb-4 sm:mb-0">Herrscher of Sentience</h1>
  </div>
    <!-- Character Name and Release Date -->
    <p class="text-base md:text-md text-center md:block hidden text-slate-300 mt-2">Fu Hua | Release Date: v4.6 (4 Mar 2021)  </p>
    <p class="text-base md:text-md text-center md:block hidden text-slate-300 mb-2">DLC Date: v7.0 (26 Oct 2023)  </p>

  
    <!-- Common wrapper to ensure same width -->
    <div class="w-full max-w-sm mb-2">
      <!-- Container with 4 pictures (Centered) -->
      <div class="flex flex-col items-center">
        <div class="flex w-[260px] md:w-[300px] gap-2 flex-wrap justify-center outline outline-red-500 outline-1 bg-red-950/75 rounded-lg p-2 backdrop-blur-xs">
          <img src="/images/ranks/Valkyrie_S.webp" alt="S-rank" class="w-auto h-8 md:h-10" />
          <img src="/images/type/IconBIO.png" alt="Mech" class="w-auto h-8 md:h-10" />
          <img src="/images/element/Core_Physical.png" alt="Icon 3" class="w-auto h-8 md:h-10" />
  
        </div>
      </div>

      <div class="flex flex-col mt-4 items-center">

        <div class="flex flex-col  w-[260px] md:w-[300px] flex-wrap justify-center outline outline-red-500 outline-1 bg-red-950/75 rounded-lg p-2 backdrop-blur-xs">
          <div class="flex flex-wrap justify-center">
            <h2 class="text-base md:text-md custom-font tracking-wider text-slate-100">SUPPORT FOR:</h2>
          </div >
          <div class="flex flex-row gap-2 flex-wrap justify-center">
            <img src="/images/artype/p1physical.png" alt="Support 3" class="w-auto h-8 md:h-10" />
  
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
    <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-4  text-center">OVERVIEW</h2>

    <div>
        <!-- Roles Section -->
        <h2 class="text-xl  font-semibold mb-2 text-left cooltext text-slate-100">ROLES</h2>
        
        <p class="mt-4 text-sm sm:text-base">
          <strong class="text-amber-400">Part 1 Physical Support</strong>
      </p>

      <ul class="list-disc ml-6 text-sm sm:text-base">
        <li class="mt-2"> Herrscher of Sentience (HoS) was the backbone of Physical teams, providing impair (DEF reduction) and more. But now, Herrscher of Rebirth (HoRB) has replaced HoS.
        </li>
          <li class="mt-2"> However, HoS is still used to support HoRB since she does not have her own impair in DPS form.</li>

      </ul>
        <p class="mt-4 text-sm sm:text-base">
            <strong class="text-amber-400">Brick DPS</strong> <br/>
            v7.0 introduced a Brick Divine Key and Pericles stigma for HOS DPS. In a full team and high ranks, she had some good scores for a while.
        </p>



        <div class="divider  "></div>
        <!-- Pull Recommendation Section -->
        <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext ">FARM AND PULL RECOMMENDATION</h2>


        <p class="mt-4 text-sm sm:text-base">
          <strong class="text-amber-400 ">New Players on Herrscher of Sentience</strong>
      </p>

      <ul class="list-disc ml-6 text-sm sm:text-base">
        <li class="mt-2">Sirin, Sushang and Herrscher of Sentience are the only battlesuits in War Treasury that are still somewhat relevant, so yes, go ahead and farm Herrscher of Sentience. </li>
          <li class="mt-2"> However, without gears and ranks, HoS will not be a very useful unit.</li>

      </ul>

      <p class="mt-4 text-sm sm:text-base">
        <strong class="text-amber-400 ">New Players on Brick and Pericles (DPS)</strong>
        <br/>Only use your crystal to pull Part 2 valkyries, since they use a new Astral Ring system. If Brick and Pericles are available through other means, such as spending event or Battle Pass, you can consider getting them that way.
    </p>

    <p class="mt-4 text-sm sm:text-base">
      <strong class="text-amber-400 ">New Players on Nebulous Duality and Shattered Swords (SUPPORT)</strong>
  </p>

  <ul class="list-disc ml-6 text-sm sm:text-base">
    <li class="mt-2">Nebulous Duality is available in Growth Regimen phase 5. Go get it!</li>
      <li class="mt-2"> Shattered Swords is available in Exchange Shop, but requires stigma resonance currency, which might take months for new player to farm. </li>

  </ul>


        <div class="divider  "></div>
        <!-- How to Get Section -->
        <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">HOW TO GET</h2>
        <ul class="list-disc ml-6 text-sm sm:text-base ">
            <li ><strong>Herrscher of Sentience:</strong> War Treasury, Dorm Supply, 6 stamps in ER Shop.</li>
            <li ><strong>Brick, Pericles:</strong> Focused Supply.</li>
            <li ><strong>Nebulous Duality:</strong> Growth Regimen phase 5.</li>
            <li ><strong>Shattered Swords</strong> Exchange Shop.</li>

        </ul>

    </div>
{/if}



  {#if selectedTab === 'Lineup'}
  <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">LINEUP</h2>

  <section class="max-w-(--breakpoint-lg) mx-auto ">


  
    <P1physical></P1physical>

    <div class="divider  "></div>

    <Horbdps></Horbdps>

</section>

  {/if}

      {#if selectedTab === 'Equipment'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">EQUIPMENT</h2>
 
      <div>


              <h2 class="text-xl font-semibold text-center  text-yellow-400">BEST (DPS)</h2>

              <div class="flex flex-col justify-center items-center">
                  
              <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">

                <div class="w-20 h-20 sm:w-28 sm:h-28">
                  <img src="https://act-upload.mihoyo.com/bh3-wiki/2023/09/09/282941837/fff43c685e3289a09d51c6286bd6027b_3235012757279876992.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
              </div>

              <div class="w-20 h-20 sm:w-28 sm:h-28">
                <img src="https://act-upload.mihoyo.com/bh3-wiki/2023/09/23/282941837/9bf462162d3a50ec8d2fc4c1c1ced6ab_8892987628835714947.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
            </div>
      
            <div class="w-20 h-20 sm:w-28 sm:h-28">
                <img src="https://act-upload.mihoyo.com/bh3-wiki/2023/09/23/282941837/a2036bbe5e48c7d180041c5f260d2134_8728155106914204073.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
            </div>
      
            <div class="w-20 h-20 sm:w-28 sm:h-28">
                <img src="https://act-upload.mihoyo.com/bh3-wiki/2023/09/23/282941837/8a13504dff8524c001fdd1a4ddb003b8_818240626146681245.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
            </div>

              </div>  
              <h4 class="text-base sm:text-base text-white"> Brick + Pericles set </h4>
              </div>



           </div>

           <div>



            <div class="p-4 mt-4 bg-linear-to-r from-red-950/75 to-red-900/75 rounded-sm">
              <p class="text-sm sm:text-base text-left mb-4">
                <b>Brick</b><br/> - Big damage buffs. Brick introduces new skills, and fixes HoS skills that conflict with modern supports.
                <br/> - HoS's Innate Vulnerability shield grants HoS Crit DMG. However, with Prometheus support, Prom shield will be active instead of HoS, preventing the Crit DMG buff from taking effect. Brick fixes this by making the Crit DMG buff permanent.
                <br/> - Both HoS and HoRB provide impair aura. Brick converts HoS impair to 18% Physical DMG taken debuff if the enemy has already been affected by another impair source (HoRB).
              </p>
            
              <p class="text-sm sm:text-base text-left mb-4">
                <b>Pericles</b><br/> - Best set for HoS DPS. <br/>
                - Each piece is strong. If you only have Pericles 2PC, then the set strength is only on par with Sirin Ascendant T Dirac MB.
              </p>

              <p class="text-sm sm:text-base text-left">
                <b>Affix</b> <br/>Ideally, 4 ATK and 2 Crit DMG lines. Full ATK is also fine.
              </p>
            </div>


            </div>
            <div class="divider  "></div>

            <h2 class="text-lg sm:text-xl font-semibold text-center  text-sky-400"> ALTERNATIVE STIGMA FOR DPS </h2>

            <div class="flex flex-col justify-center items-center">
                
            <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">
      
            <div class="w-20 h-20 sm:w-28 sm:h-28">
                <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/09/17/91006211/1b2742adbaceb54327189ecb7bb37c71_8342698277354074985.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
            </div>
      
            <div class="w-20 h-20 sm:w-28 sm:h-28">
                <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/09/17/91006211/c85dd72ee95e8a4f67f107ae1cc4927a_3991707354687390950.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
            </div>
      
            <div class="w-20 h-20 sm:w-28 sm:h-28">
                <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/09/17/91006211/81d92e1c22df663252844ab02861dfe8_3894485999362011434.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
            </div>
      
      
            </div>  
      
            <h4 class="text-base sm:text-base text-white">Sirin Ascendant T, Dirac MB</h4>
      
            </div>
      
            
            <div class="p-4 mt-4 bg-linear-to-r from-fuchsia-950/75 to-fuchsia-900/75 rounded-sm">
              <p class="text-sm sm:text-base text-left mb-4">
                <b>Sirin Ascendant T</b> <br/>
                Available in Exchange Shop.
              </p>
            
              <p class="text-sm sm:text-base text-left">
                <b>G3 Dirac MB</b><br/>  Forgeable in Foundry.
              </p>
            </div>


            <div class="flex flex-wrap gap-4 my-8">
              <!-- Example image list for support buffs; add your own image sources -->
              <img
                src="https://i.imgur.com/W66pFCE.png"
                alt="DMG TEST DPS"
                class=" object-cover cursor-pointer"
                on:click={() => openLightbox('https://i.imgur.com/W66pFCE.png')}
              />
      
            </div>
            <Lightbox show={showLightbox} image={selectedImage} onClose={closeLightbox} />

            <div class="divider  "></div>

            <div>


              <h2 class="text-xl font-semibold text-center  text-yellow-400">BEST (SUPPORT)</h2>

              <div class="flex flex-col justify-center items-center">
                  
              <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">

                <div class="w-20 h-20 sm:w-28 sm:h-28">
                  <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/09/07/72350798/49af15ff2079750b65d08e8c3f1b45c7_7494978688822983090.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
              </div>

              <div class="w-20 h-20 sm:w-28 sm:h-28">
                <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/09/18/72350798/2f186c088308a28c5feb34055757830c_6711912582958643119.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
            </div>
      
            <div class="w-20 h-20 sm:w-28 sm:h-28">
                <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/09/18/72350798/3eb6c4145746fbff3a74710a4256f1bb_4925513654779854546.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
            </div>
      
            <div class="w-20 h-20 sm:w-28 sm:h-28">
                <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/09/18/72350798/023a3c4d9ca176c6d82950cbbae38a44_6006197407125585285.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
            </div>

              </div>  
              <h4 class="text-base sm:text-base text-white"> Cosmic Duality + Shattered Swords set </h4>
              </div>



           </div>

           <div>



            <div class="p-4 mt-4 bg-linear-to-r from-red-950/75 to-red-900/75 rounded-sm">
              <p class="text-sm sm:text-base text-left mb-4">
                <b>Cosmic Duality</b><br/> - Provides sp regen and buff for the team.
                <br/> - Available in Growth Regimen Phase 5
              </p>
            
              <p class="text-sm sm:text-base text-left mb-4">
                <b>Shattered Swords</b><br/> Best set for support (non-Bleed teams).
              </p>

              <p class="text-sm sm:text-base text-left">
                <b>Affix</b> <br/>SP regen, SP cost reduction
              </p>
            </div>


            </div>
            <div class="divider  "></div>

            <h2 class="text-lg sm:text-xl font-semibold text-center  text-sky-400"> FOR BLEED TEAMS </h2>

            <div class="flex flex-col justify-center items-center">
                
            <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">
      
            <div class="w-20 h-20 sm:w-28 sm:h-28">
                <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2023/04/02/50494840/2eca76c2478a11bf10244e02eed1535f_1624703347362359491.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
            </div>
      
            <div class="w-20 h-20 sm:w-28 sm:h-28">
                <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2023/03/09/264755623/bb0b90819ed7c4f792364a6cb26a94a0_4116526821499071922.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
            </div>
      
            <div class="w-20 h-20 sm:w-28 sm:h-28">
                <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2023/03/09/264755623/970eaf27b9a295fdd4f8466d7be59e52_220783703453271013.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
            </div>
      
      
            </div>  
      
            <h4 class="text-base sm:text-base text-white">Susannah: Overtime T + Aladdin MB</h4>
      
            </div>
      
            
            <div class="p-4 mt-4 bg-linear-to-r from-fuchsia-950/75 to-fuchsia-900/75 rounded-sm">
              <p class="text-sm sm:text-base text-left mb-4">
                <b>Why a different stigma set is used for Bleed teams? </b> <br/>
                Bleed DMG cannot crit. Shattered Swords stigma effects have a mix of team Total DMG, Crit DMG and Crit Rate buffs. The only effect that will still work for Bleed valk is the 3PC: Team Total DMG +35%.
              </p>
            
              <p class="text-sm sm:text-base text-left mb-4">
                <b>Susannah Overtime T </b><br/>  - This is an event stigma. It might return in event shop once in a while.<br/>
                - You can use G2 Tesla Band T as substitute (or any stigma shown in dmg test chart below).
              </p>
      
            
              <p class="text-sm sm:text-base text-left">
                <b>Aladdin MB</b><br/> - Grants Bleed DMG, increased Bleed Trauma, Total DMG and Physical DMG. <br/>
                - When supporting Susannah, if you only have one copy of Aladdin, then it's better to put Aladdin on Susannah instead of HoRB.
              </p>
            </div>

            <div class="divider  "></div>

            <h2 class="text-lg sm:text-xl font-semibold text-center  text-sky-400"> OTHER STIGMA OPTION FOR SUPPORT </h2>

            <div class="flex flex-col justify-center items-center">

              <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">

  

                <div class="w-20 h-20 sm:w-28 sm:h-28">
                  <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/01/31/282941837/e65a0afbe683a9b90c3ac5844d98a12c_580233590440738955.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
              </div>

              <div class="w-20 h-20 sm:w-28 sm:h-28">
                  <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/01/31/282941837/141b8b6bf380a84dc22e4edefa5d4ffc_2283739336785483035.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
              </div>

              <div class="w-20 h-20 sm:w-28 sm:h-28">
                  <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/01/31/282941837/bb34b0b344929564e4fff60ada174541_7013397103999569464.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
              </div>

              </div>  
              <h4 class="text-base sm:text-base text-white">Tsiolkovsky</h4>
              </div>

      {/if}


      {#if selectedTab === 'Elysian Realm'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">ELYSIAN REALM</h2>

      <div class="flex justify-center gap-4 my-6">
        <button
          on:click={() => setPlaystyle('1')}
          class={`px-4 py-2 font-semibold rounded-sm ${activePlaystyle === '1' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-linear-to-r from-orange-600 to-amber-500 hover:text-white'}`}
        >
          BRICK
        </button>
      
        <button
          on:click={() => setPlaystyle('2')}
          class={`px-4 py-2 font-semibold rounded-sm ${activePlaystyle === '2' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-linear-to-r from-orange-600 to-amber-500 hover:text-white'}`}
        >
          STANDARD
        </button>
      </div>


      {#if activePlaystyle === '1'}
      <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">Brick Playstyle</h2> 
      <p class="text-sm sm:text-base text-center sm:text-left">
        Use this when you have Brick equipped.
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
              <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Legion / Victory / Ego</p>
              <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Supremacy </p>

            </div>
          </div>
        </div>
        <div class="mt-3 rounded-sm" >
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

        <div class="divider  "></div>
        <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">STARTING GENERAL SIGNET</h2>

        
        <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
          <!-- First Signet with 'Start' text -->
          <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
            <div class="badge badge-accent z-10 absolute top-2 font-semibold">LEGION</div>
            <img src="/images/signets/Signets of Decimation (Kalpas).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            <p class="text-lg font-semibold">1</p>
          </div>

          <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
            <div class="badge badge-accent z-10 absolute top-2 font-semibold">VICTORY</div>
            <img src="/images/signets/Signets of Deliverance (Kevin).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            <p class="text-lg font-semibold">2</p>
          </div>

          <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
            <div class="badge badge-accent z-10 absolute top-2 font-semibold">EGO</div>
            <img src="/images/signets/Signets of Infinity (Mobius).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            <p class="text-lg font-semibold">1</p>
          </div>

        </div>
        <div class="mt-3 rounded-sm" >
          <p class="text-sm sm:text-base text-left">
            <b>Decimation 1:</b> To keep your HP low, bring Blood Rose support, and get enhanced signet [Burden, Difficulty, and Calamity] as soon as you can.
          </p>
        </div>


          
          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">SUBSEQUENT GENERAL SIGNETS</h2>

          
          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">


            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Stars (Griseo).png" alt="Signet 5" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold ">1</p>
            </div>

            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Gold (Eden).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">2</p>
            </div>

            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Vicissitude (Hua).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">2</p>
            </div>

            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Discipline (Aponia).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">2</p>
            </div>

            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <img src="/images/signets/Signets of Reverie (Pardofelis).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold">1</p>
            </div>

          </div>
          <div class="mt-3 rounded-sm" >
            <p class="text-sm sm:text-base text-left">
               You want initial sp Gold signet so you can immediately use Ult at the start, without Lightning Empress support. You want sp regen so you can keep using Ult as soon as you can.
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
                <img src="/images/valkportrait/Bronya Snowy Sniper.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              </div>
              <p class="text-base sm:text-lg font-semibold">FINAL</p>
          </div>
            
          </div>
          <div class="mt-3 rounded-sm" >
            <p class="text-sm sm:text-base text-left">
               You can swap out Lightning Empress once you get the initial sp Gold signet.
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
                <img src="/images/sigils/Rainbow_of_Absence.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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
                <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Victory</p>
                <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Dark Plumes </p>
  
              </div>
            </div>
          </div>
          <div class="mt-3 rounded-sm" >
            <p class="text-sm sm:text-base text-left">
              Dark Plumes gives sp regen and damage over time.
            </p>
          </div>
  
  
  
            
            <div class="divider  "></div>
            <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
  
            
            <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
              <!-- First Signet with 'Start' text -->
              <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
                <img src="/images/signets/Signets of Deliverance (Kevin).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold">2</p>
              </div>
  
              <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Discipline (Aponia).png" alt="Signet 5" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">2</p>
              </div>
  
              <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Vicissitude (Hua).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold">2</p>
              </div>
  
              <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Decimation (Kalpas).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold">2</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Reverie (Pardofelis).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold">1</p>
              </div>
  
            </div>
            <div class="mt-3 rounded-sm" >
              <p class="text-sm sm:text-base text-left">
                 For Discipline 2, you just want the [You Shall Follow Good] enhanced signet.
              </p>
            </div>
  
              <div class="divider  "></div>
              <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SUPPORTS</h2>
  
            <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
              
              <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
                <div class="flex flex-row rounded-sm">
                  <img src="/images/valkportrait/Mei Lightning Empress.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  <img src="/images/valkportrait/Bronya Snowy Sniper.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">START</p>
            </div>
  
            <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
              <div class="flex flex-row rounded-sm">
                <img src="/images/valkportrait/Mei Lightning Empress.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Bronya Snowy Sniper.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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
            <div class="mt-3 rounded-sm" >
              <p class="text-sm sm:text-base text-left">
                 You can swap out Lightning Empress once you have enough sp regen.
              </p>
            </div>
  
            <div class="divider  "></div>
            <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SIGIL</h2>
  
            <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            
  
              <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
                <div class="flex flex-row rounded-sm">
                <img src="/images/sigils/Burden.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/sigils/It_Will_Be_Written.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              </div>
                <p class="text-base sm:text-lg font-semibold">START</p>
            </div>
  
            <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
                <div class="flex flex-row rounded-sm">
                  <img src="/images/sigils/Veil_of_Tears.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  <img src="/images/sigils/Dreamful_Gold.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">MID</p>
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
      <div class="flex flex-col justify-center items-center">
          
        <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">

            <div class="w-20 h-20 sm:w-28 sm:h-28">
              <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/09/18/72350798/2f186c088308a28c5feb34055757830c_6711912582958643119.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
            </div>

        </div>  
        <p class="text-sm sm:text-base text-white">Shattered Swords 3PC</p>

    </div>

    <div class="text-center my-4 rounded-sm bg-gray-700">
      <p class="text-left text-sm sm:text-base px-2 py-3">
        <b>In-Game Text:</b><br/>
        Team gains 10% Crit Rate for 12s upon entry.
      </p>
    </div>

    <div class="text-center my-4 rounded-sm bg-cyan-800">
      <p class="text-left text-sm sm:text-base px-2 py-3 text-white">
        <b>Correct Translation:</b><br/>
        Team gains 10% Crit Rate while on the field.
      </p>

    </div>


    <div class="divider  "></div>
      {/if}


  </div>

</section>


</div>

</section>


</div>
