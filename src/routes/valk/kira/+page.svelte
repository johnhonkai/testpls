
<svelte:head>
  <title>Shigure Kira - Sugary Starburst</title> 

    <meta property="og:title" content="Shigure Kira - Sugary Starburst"/>
    <meta property="og:description" content="Sugary Starburst Expression Guides, Builds and Gameplay" />
    <meta property="og:image" content="" />
    <meta property="og:url" content="https://marisaimpact.com/valk/kira" />
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
	import Lvdpsnormal from "$lib/components/lineup/lvdpsnormal.svelte";
	import Susannahdps from "$lib/components/lineup/susannahdps.svelte";
	import Cedps from "$lib/components/lineup/cedps.svelte";
	import P1ice from "$lib/components/lineup/p1ice.svelte";
	import Ice3support from "$lib/components/lineup/ice3support.svelte";
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
  { name: 'Gameplay Examples', short: 'example' },
  { name: 'Elysian Realm', short: 'er' },
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
  let celikes = likesData["kira"] || 0; // Get initial likes from JSON
  const charName = "kira"; // Route name for this character
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

    celikes++;

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
  <img src="/images/bg/wave_kira.svg" alt="Lone Planetfarer" class="w-full h-full object-cover overflow-hidden" /> 
</div>

<!-- Left: Character Image -->
<div class="relative  w-auto h-48 sm:h-60 md:h-72 flex justify-center " id="valkpicbox">
  <!-- Image for Larger Screens -->
  <img src="/images/valkfull/kira.webp" alt="Sparkle" class="h-full w-auto object-cover md:object-contain  " style ="view-transition-name: valkyrie-image-19;"/> 

  <div class="absolute bottom-0 left-0 like-container flex items-center gap-2 mt-4">
    <button
    on:click={increaseLike}
    class="bg-gray-800 text-white px-4 py-2 rounded-sm transition-all flex items-center gap-2"
    disabled={hasLiked} 
  >
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
    <span class="text-white font-semibold">{celikes}</span>
  </button>
  
  </div>

</div>



<!-- Right: Character Info (Centered) -->
<div class="flex flex-col items-center text-center justify-start">
  <!-- Battlesuit Name -->

  <div>
  <h1 class="text-xl md:text-2xl text-slate-100 font-bold text-center leading-4 mb-4 sm:mb-0">Sugary Starburst</h1>
</div>
  <!-- Character Name and Release Date -->
  <p class="text-base md:text-md text-center md:block hidden text-slate-300 my-2">Shigure Kira | Release Date: v6.7 (29 June 2023)

  </p>

  <!-- Common wrapper to ensure same width -->
  <div class="w-full max-w-sm mb-2">
    <!-- Container with 4 pictures (Centered) -->
    <div class="flex flex-col items-center">
      <div class="flex w-[260px] md:w-[300px] gap-2 flex-wrap justify-center outline outline-blue-500 outline-1 bg-blue-950/75 rounded-lg p-2 backdrop-blur-xs">
        <img src="/images/ranks/Valkyrie_A.webp" alt="S-rank" class="w-auto h-8 md:h-10" />
        <img src="/images/type/IconMECH.png" alt="Mech" class="w-auto h-8 md:h-10" />
        <img src="/images/element/Core_Ice_DMG.png" alt="Icon 3" class="w-auto h-8 md:h-10" />
      </div>
    </div>

    <!-- Support For Container (Centered) -->
    <div class="flex flex-col mt-4 items-center">

      <div class="flex flex-col  w-[260px] md:w-[300px] flex-wrap justify-center outline outline-blue-500 outline-1 bg-blue-950/75 rounded-lg p-2 backdrop-blur-xs">
        <div class="flex flex-wrap justify-center">
          <h2 class="text-base md:text-md custom-font tracking-wider text-slate-100">SUPPORT FOR:</h2>
        </div >
        <div class="flex flex-row gap-2 flex-wrap justify-center">
          <img src="/images/artype/p1ice.png" alt="Support 1" class="w-auto h-8 md:h-10" />

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
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">OVERVIEW</h2>

      <div>
          <!-- Roles Section -->
          <h2 class="text-xl  font-semibold mt-4 mb-2 text-left cooltext text-slate-100">ROLES</h2>

          <p class="text-sm sm:text-base mt-4">
              <strong class="text-amber-400">P1 Ice / Freeze Support</strong><br/> Sugary Starburst (commonly referred to as Kira) is a Part 1 ice support who can also inflict huge freeze trauma.
          </p>

          <p class="text-sm sm:text-base mt-4">
            <strong class="text-amber-400">Can Support other P1 elements</strong><br/> Kira and her equipment provide Total DMG, Elemental DMG and sp recovery, which means Fire and Lightning teams can benefit from Kira support.
        </p>

        <p class="text-sm sm:text-base mt-4">
          <strong class="text-amber-400">HP Loss DMG</strong><br/> Charged ATK deals HP Loss DMG, which is important to counter certain enemies with black hp bar mechanic.
      </p>

          <p class="text-sm sm:text-base mt-4">
              <strong class="text-amber-400">Decent DPS</strong><br/> Can form a farmable 3-support Ice team with Sushang-Kira-Pardo.
          </p>


          <div class="divider  "></div>
          <!-- Pull Recommendation Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">FARM AND PULL RECOMMENDATION</h2>
          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">New Players</strong>
              <br/> - Farm <a href="/valk/coralie" class="link ">Coralie Valkyrie Blastmetal</a>               first from Asterite Shop and Open World since she can fit in any Astral Ring team. If you have extra Asterite, then you can consider getting Kira fragments.
              <br/> - Once you breakthrough Lv80+, you will encounter enemies with huge freeze trauma in Abyss. For new players, Kira and Pardofelis are your only farmable options to apply freeze. If you don't have any valkyrie that can apply freeze, you can farm Kira to counter the freeze mechanic.
            </p>

          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">Competitive</strong><br/> Kira is still used as a support for Part 1 ice teams. However, Kira might get replaced in the future by a Part 2 valkyrie. This has already happened to other sp valkyries (Terminal Aide, Chrono Navi, Golden Diva)
          </p>

          <div class="divider  "></div>
          <!-- How to Get Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">HOW TO GET</h2>
          <ul class="list-disc ml-6 text-sm sm:text-base ">
              <li ><strong>Kira:</strong> Asterite Shop, Open World Task</li>
              <li><strong>Kira Equipment:</strong> Focused Supply. Not available in 7.9. </li>
          </ul>
          <div class="divider  "></div>
          <!-- Full Guide Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">FULL GUIDE</h2>
          <p class="mt-2 text-sm sm:text-base pb-4">
              Check out the full guide on YouTube
          </p>
          <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/tp2SLiHQVPQ"
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

    <P1ice></P1ice>


    <div class="divider  "></div>

    <Ice3support></Ice3support>


      
</section>

  {/if}

      {#if selectedTab === 'Equipment'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">EQUIPMENT</h2>
 
      <div>


              <h2 class="text-xl font-semibold text-center  text-yellow-400">BEST</h2>

              <div class="flex flex-col justify-center items-center">
                  
              <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">

                <div class="w-20 h-20 sm:w-28 sm:h-28">
                  <img src="https://act-upload.mihoyo.com/bh3-wiki/2023/05/19/282941837/5ef0e9735ad6d6a00eb57e334ba0f676_6183505925051027803.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Star Dance" class="w-full h-full object-cover">

                </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                    <img src="https://act-upload.mihoyo.com/bh3-wiki/2023/05/19/282941837/013e48e0f771631f1122b8d0ed35b0de_3152372602503446000.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Cecilia Youth T" class="w-full h-full object-cover">

                  </div>


                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                    <img src="https://act-upload.mihoyo.com/bh3-wiki/2023/05/19/282941837/b01ff1bbc21a921eb29bde47d428ab49_6257244865755113817.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Cecilia Youth M" class="w-full h-full object-cover">

                  </div>

                  
                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                    <img src="https://act-upload.mihoyo.com/bh3-wiki/2023/05/19/282941837/799c0d303bed720f27db274f67e8c688_4656685800660733206.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Cecilia Youth B" class="w-full h-full object-cover">
                </div>

              </div>  
              <h4 class="text-base sm:text-base text-white">Star Dance + Cecilia: Youth</h4>
              </div>


              <div class="p-4 mt-4 bg-linear-to-r from-blue-950/75 to-blue-900/75 rounded-sm">
                <p class="text-sm sm:text-base text-left mb-4">
                  <b>Star Dance</b><br/> Star Dance is important to freeze bosses with huge freeze trauma like Hephaestus, Huodou and Kalpas.
                </p>
              
                <p class="text-sm sm:text-base text-left mb-4">
                  <b>Cecilia: Youth </b><br/> Cecilia stigma has significantly higher buff compared to Bastet or Turgenev, but needs 3 PC to reach max buff. So get 3pc or just stick with Turgenev / Bastet / Tsiolkovsky.
                </p>
  
              
                <p class="text-sm sm:text-base text-left">
                  <b>Affix</b><br/> Full ATK
                </p>
              </div>
  
              <div class="divider  "></div>

              <h2 class="text-xl font-semibold text-center  text-blue-400">OTHER STIGMA OPTIONS</h2>

              <div class="flex flex-col justify-center items-center">
                  
              <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">

  

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                    <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2022/02/25/50494840/27f6c9b5333ecf75e3cea5aa1b4e64a0_7537345594680698213.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Cecilia Youth T" class="w-full h-full object-cover">

                  </div>


                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                    <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2022/02/25/50494840/af6b489d8a62262cb8b474608b59f95d_1392671643236615924.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Cecilia Youth M" class="w-full h-full object-cover">

                  </div>

                  
                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                    <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/10/14/73514954/edc6733fda3b2cd58dc6bc7b4075af54_5150773373846188441.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Cecilia Youth B" class="w-full h-full object-cover">
                </div>

              </div>  
              <h4 class="text-base sm:text-base text-white">G4 Bastet TM , Newton B</h4>
              </div>


              <div class="p-4 mt-4 bg-linear-to-r from-cyan-950/75 to-cyan-900/75 rounded-sm">
                <p class="text-sm sm:text-base text-left mb-4">
                  Only for enemies that can be frozen
                </p>

                <p class="text-sm sm:text-base text-left mb-4">
                  <b>Bastet TM</b><br/> Forgeable starting in 8.0
                </p>

                <p class="text-sm sm:text-base text-left">
                  <b>Newton B</b><br/> Can be acquired in Exchange Shop
                </p>
              </div>

              <div class="divider  "></div>

              <div class="flex flex-col justify-center items-center">
                  
                <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">
  
    
  
                    <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/09/24/75216984/f2e785b423273338556e66771a543a69_5615190248057583714.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Cecilia Youth T" class="w-full h-full object-cover">
  
                    </div>
  
  
                    <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/10/26/6100274/47912cb5ee05db0c9804de7c8be148c8_6704934550393204988.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Cecilia Youth M" class="w-full h-full object-cover">
  
                    </div>
  
                    
                    <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/09/24/75216984/73531d5b12f1133e5f5f926f1cf14b0b_2678839856354413010.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Cecilia Youth B" class="w-full h-full object-cover">
                  </div>
  
                </div>  
                <h4 class="text-base sm:text-base text-white">G3 Turgenev TB , Mei: Beach Party M</h4>
                </div>
  
  
                <div class="p-4 mt-4 bg-linear-to-r from-cyan-950/75 to-cyan-900/75 rounded-sm">

  
                  <p class="text-sm sm:text-base text-left mb-4">
                    <b>Turgenev TB</b><br/> Forgeable in Foundry
                  </p>
  
                  <p class="text-sm sm:text-base text-left">
                    <b>Mei: Beach Party M</b><br/> Can be acquired in Exchange Shop
                  </p>
                </div>

                <div class="divider  "></div>

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

                <div class="divider  "></div>


                <div class="flex flex-wrap gap-4 my-8">
                  <!-- Example image list for support buffs; add your own image sources -->
                  <img
                    src="https://i.imgur.com/RjVRLUo.png"
                    alt="DMG TEST DPS"
                    class=" object-cover cursor-pointer"
                    on:click={() => openLightbox('https://i.imgur.com/RjVRLUo.png')}
                  />

                </div>
                <Lightbox show={showLightbox} image={selectedImage} onClose={closeLightbox} />
  

           </div>
      {/if}

      {#if selectedTab === 'Support Buffs'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">SUPPORT BUFFS</h2>

      
      <div class="flex flex-wrap gap-4 my-8">
        <!-- Example image list for support buffs; add your own image sources -->
        <img
          src="https://i.imgur.com/gPzqeSZ.png"
          alt="Buff 1"
          class=" object-cover cursor-pointer"
          on:click={() => openLightbox('/images/valkbuff/buff_coralie.png')}
        />
        
      </div>

      <div class="my-5 text-sm sm:text-base text-slate-100 space-y-4">
        <p class="mb-4 font-semibold">How to activate CE support buffs:</p>
        
          <div>
            <p class="font-semibold text-orange-300  mt-6">Weapon Skill and Ultimate</p>
            <p>Weapon skill and Ultimate activate most of CE Support buffs</p>
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
            ULTIMATE
          </button>
        
          <button
            on:click={() => setPlaystyle('2')}
            class={`px-4 py-2 font-semibold rounded-sm ${activePlaystyle === '2' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-linear-to-r from-orange-600 to-amber-500 hover:text-white'}`}
          >
            CHARGED ATK
          </button>
        </div>
      
        {#if activePlaystyle === '1'}
        <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">Ultimate Playstyle</h2> 
        <p class="text-sm sm:text-base text-center sm:text-left">
          Spam Ult
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
              <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b>  Roller Dance </p>
              <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Salute ➔ Rhythm</p>

            </div>
          </div>
          
        </div>
        <div class="mt-3 rounded-sm" >
          <p class="text-sm sm:text-base text-left">
            You can complete the run with just one Ego signet (Roller Dance). Salute signet is just a minor buff - it just makes your Ult shoots faster and have 3 more bullets.
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

              <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Deliverance (Kevin).png" alt="Signet 4" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Vicissitude (Hua).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">2</p>
              </div>

          
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Discipline (Aponia).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
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
                <img src="/images/sigils/Mad_Kings_Mask.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/sigils/Because_of_You.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            </div>
                <p class="text-base sm:text-lg font-semibold">START (ER Lite)</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
              <div class="flex flex-row rounded-sm">
                <img src="/images/sigils/Mad_Kings_Mask.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/sigils/An_Old_Pals_Legacy.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            </div>
              <p class="text-base sm:text-lg font-semibold">START (Normal)</p>
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
          <li>Evade and ATK until Ultimate is available.</li>
          <li>Use Charged ATK to trigger buffs. I am not sure what buffs, but you deal more dmg if you use Charged ATK once.</li>
          <li>Use Ultimate. Press ATK to shoot.</li>
          <li>Repeat.</li>
        </ol>

        <p class="mt-8 text-sm sm:text-base pb-4 text-center">
            Check out this showcase from Marisa Honkai:
        </p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/AX0QZop58xY"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                loading="lazy">
            </iframe>
        </div>
        {/if}

        {#if activePlaystyle === '2'}
        <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">Charged ATK Playstyle</h2> 
        <p class="text-sm sm:text-base text-center sm:text-left">
          Shoot and repeat
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
              <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b>  Acoustic Spectrum + Astral Path</p>
              <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Rhythm</p>

            </div>
          </div>
          
        </div>
        <div class="p-2 mt-3 rounded-sm" >
          <p class="text-sm sm:text-base text-left">
            <li class="text-sm sm:text-base"> ER Lite mode: Equip Because of You sigil and get all three Ego signets on Floor 7.</li>
            <li class="text-sm sm:text-base"> Normal mode: [Acoustic Spectrum] provides the damage, and [Astral Path] enables the playstyle. You can get both Ego signets at the start by using Thorny Crown sigil, OR by resetting Floor 1 until you get another Ego portal, OR use Because of You support sigil and get the other two Ego signets on Floor 7.</li>
        </p>
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
                <p class="text-lg font-semibold ">2</p>
              </div>
          
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Discipline (Aponia).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Vicissitude (Hua).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">2</p>
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
                    <img src="/images/sigils/Pseudo_Miracle.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                    <img src="/images/sigils/Because_of_You.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">START (ER Lite)</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
              <div class="flex flex-row rounded-sm">
                <img src="/images/sigils/Pseudo_Miracle.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/sigils/Falling_in_Past_Light.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              </div>
              <p class="text-base sm:text-lg font-semibold">START (Normal)</p>
          </div>

            <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
                <div class="flex flex-row rounded-sm">
                    <img src="/images/sigils/Tin_Flask.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                    <img src="/images/sigils/Boundless_Feeling.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">FINAL</p>
            </div>

          </div>

          
          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">HOW TO PLAY</h2>

        <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>Use weapon skill, then press ATK.</li>
          <li>Use Charged ATK two times.</li>
          <li>Repeat</li>
        </ol>

        <p class="mt-8 text-sm sm:text-base pb-4 text-center">
            Check out this showcase from Marisa Honkai:
        </p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/fLt5zPaHu90"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                loading="lazy">
            </iframe>
        </div>
        {/if}
      {/if}


  
      {#if selectedTab === 'Gameplay Examples'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">GAMEPLAY EXAMPLES</h2>

    <div class=" gap-6 mt-5 mb-10">
      <!-- Video 1 with title and description -->

    
      <div class="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">Shigure Kira Support</h2>

        <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">VS Wardens of Tower</p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
          <iframe
          loading="lazy" 

              class="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/aqdBaAlI5OU"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
          </iframe>
      </div>
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

