
<svelte:head>
  <title>Vill-V - Helical Contraption</title> 

    <meta property="og:title" content="Vill-V - Helical Contraption" />
    <meta property="og:description" content="Helical Contraption: Ego Guide, Builds and Gameplay" />
    <meta property="og:image" content="" />
    <meta property="og:url" content="https://marisaimpact.com/valk/villv" />
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
	import P1fire from "$lib/components/lineup/p1fire.svelte";
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
  //{ name: 'Gameplay Examples', short: 'example' },
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
  let fovlikes = likesData["vv"] || 0; // Get initial likes from JSON
  const charName = "vv"; // Route name for this character
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
    <img src="/images/valkfull/villv.webp" alt="Sirin" class="h-full w-auto object-cover md:object-contain  " style ="view-transition-name: valkyrie-image-26;"/> 
  
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
    <h1 class="text-xl md:text-2xl text-slate-100 font-bold text-center leading-4 mb-4 sm:mb-0">Helical Contraption</h1>
  </div>
    <!-- Character Name and Release Date -->
    <p class="text-base md:text-md custom-font mb-2 text-center tracking-wider md:block hidden text-slate-100">Vill-V | Release Date: v5.9 (11 Aug 2022)  </p>
  
    <!-- Common wrapper to ensure same width -->
    <div class="w-full max-w-sm mb-2">
      <!-- Container with 4 pictures (Centered) -->
      <div class="flex flex-col items-center">
        <div class="flex w-[260px] md:w-[300px] gap-2 flex-wrap justify-center outline outline-zinc-500 outline-1 bg-zinc-950/75 rounded-lg p-2 backdrop-blur-sm">
          <img src="/images/ranks/Valkyrie_S.webp" alt="S-rank" class="w-auto h-8 md:h-10" />
          <img src="/images/type/IconQUA.png" alt="Mech" class="w-auto h-8 md:h-10" />
          <img src="/images/element/Core_Fire_DMG.png" alt="Icon 3" class="w-auto h-8 md:h-10" />
  
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
            <strong class="text-amber-400">Outdated Quantum DPS</strong> <br/>
            Vill-V was more of a quantum type specialist rather than a Fire DPS. Her buffs were targeted on Quantum type, and all her top scores were Qua bosses.
        </p>

        <div class="divider divider-neutral"></div>
        <!-- Pull Recommendation Section -->
        <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext ">PULL RECOMMENDATION</h2>

        <p class="text-sm sm:text-base mt-4 mb-4">
          <strong class="text-amber-400">Everyone</strong> <br/> Nah. Only use your crystal to pull Part 2 valkyries, since they use a new Astral Ring system. If Vill-V and her gears are available through other means, such as spending event or Battle Pass, you can consider getting them that way.
      </p>



        <div class="divider divider-neutral"></div>
        <!-- How to Get Section -->
        <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">HOW TO GET</h2>
        <ul class="list-disc ml-6 text-sm sm:text-base ">
            <li ><strong>Helical Contraption:</strong> Battlesuit Supply</li>
            <li ><strong>Helical Contraption Equipment:</strong> Focused Supply</li>

        </ul>
        <div class="divider divider-neutral"></div>
        <!-- Full Guide Section -->
        <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">FULL GUIDE</h2>
        <p class="mt-2 text-sm sm:text-base pb-4">
          I didn't make a guide on Vill-V
      </p>
    </div>
{/if}



  {#if selectedTab === 'Lineup'}
  <h2 class="text-2xl sm:text-3xl font-semibold bg-gradient-to-r  from-blue-700 to-blue-500 text-white rounded px-2 mb-2 text-center">LINEUP</h2>

  <section class="max-w-screen-lg mx-auto ">

    <P1fire></P1fire>

</section>

  {/if}

      {#if selectedTab === 'Equipment'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-gradient-to-r  from-blue-700 to-blue-500 text-white rounded px-2 mb-2 text-center">EQUIPMENT</h2>
 
      <div>


              <h2 class="text-xl font-semibold text-center  text-yellow-400">BEST</h2>

              <div class="flex flex-col justify-center items-center">
                  
              <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">

                <div class="w-20 h-20 sm:w-28 sm:h-28">
                  <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2022/07/11/264755623/a3d30f67f31d0abf75f0e3cae778b28f_2328811248874384355.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
              </div>

              <div class="w-20 h-20 sm:w-28 sm:h-28">
                  <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2022/06/25/50494840/26733702e4e3079f2e6666b96ca013ba_7985062262695361933.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
              </div>

              <div class="w-20 h-20 sm:w-28 sm:h-28">
                  <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2022/06/25/50494840/d591681323fdc3e48609ce1594f461e9_7055959847866042350.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
              </div>

              <div class="w-20 h-20 sm:w-28 sm:h-28">
                  <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2022/06/25/50494840/de941d26b0ba8179e1729079bc29e57f_7300082095635260246.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
              </div>

              </div>  
              <h4 class="text-base sm:text-base text-white"> Tower of the Past + Carlo Collodi set</h4>
              </div>



           </div>

           <div>



            <div class="p-4 mt-4 bg-gradient-to-r from-red-950/75 to-red-900/75 rounded">
              <p class="text-sm sm:text-base text-left mb-4">
                <b>Tower of the Past</b><br/>
                Big damage.
              </p>
            
              <p class="text-sm sm:text-base text-left mb-4">
                <b>Carlo Collodi</b><br/> - Big buffs. Mid piece has evasion cd -20%. Bottom piece has sp recovery.
                <br/> - Priority should be MB > T.
              </p>
            
              <p class="text-sm sm:text-base text-left">
                <b>Affix:</b> Full ATK
              </p>
            </div>


            </div>

            <div class="divider divider-neutral"></div>

            <div>


              <h2 class="text-xl font-semibold text-center  text-blue-400 mb-2">OTHER EQUIPMENT OPTIONS</h2>

              <div class="flex flex-col justify-center items-center">
                  
              <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">



                <div class="w-20 h-20 sm:w-28 sm:h-28">
                  <img src="https://act-upload.mihoyo.com/bh3-wiki/2023/08/12/282941837/7df819142546acc5810989fe30c4873f_7239579905567990276.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
              </div>

              <div class="w-20 h-20 sm:w-28 sm:h-28">
                  <img src="https://act-upload.mihoyo.com/bh3-wiki/2023/08/12/282941837/763480600e89f9c800410a25da49ec2e_2776697066366451417.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
              </div>

              <div class="w-20 h-20 sm:w-28 sm:h-28">
                  <img src="https://act-upload.mihoyo.com/bh3-wiki/2023/08/12/282941837/8e65a0478b4e273cf49e6cd606a49483_4401041772639778296.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
              </div>


              </div>  
              <h4 class="text-base sm:text-base text-white"> G4 Little Joys</h4>
              </div>



           </div>

           <div>



            <div class="p-4 mt-4 bg-gradient-to-r from-blue-950/75 to-blue-900/75 rounded">
              <p class="text-sm sm:text-base text-left">
                Next best option
              </p>
            </div>


            </div>

            <div class="divider divider-neutral"></div>


            <div class="flex flex-col justify-center items-center">
                  
              <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">

  

                <div class="w-20 h-20 sm:w-28 sm:h-28">
                  <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/09/16/75216984/012ad384fa52f9af1158877fe68d0627_3468778953287680325.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
              </div>

              <div class="w-20 h-20 sm:w-28 sm:h-28">
                  <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/09/16/91006211/20ba35b905a9ec935e2bf5afebb1f3e2_5266815546114285656.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
              </div>

              <div class="w-20 h-20 sm:w-28 sm:h-28">
                  <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2021/09/16/75216984/07bf0f5b958d33e8ecc7aaca33d89762_1930228974379517957.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
              </div>


              </div>  
              <h4 class="text-base sm:text-base text-white"> G3 Leeuwenhoek TB, G2 Thales M</h4>
              </div>
            

              <div class="p-4 mt-4 bg-gradient-to-r from-blue-950/75 to-blue-900/75 rounded">
                <p class="text-sm sm:text-base text-left">
                  Just use this while you are farming the materials to upgrade to Little Joys set
                </p>
              </div>
  

      {/if}


      {#if selectedTab === 'Elysian Realm'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-gradient-to-r  from-blue-700 to-blue-500 text-white rounded px-2 mb-2 text-center">ELYSIAN REALM</h2>

      <div class="flex justify-center gap-4 my-6">
          <button
            on:click={() => setPlaystyle('1')}
            class={`px-4 py-2 font-semibold rounded ${activePlaystyle === '1' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gradient-to-r from-orange-600 to-amber-500 hover:text-white'}`}
          >
            STANDARD
          </button>
        
          <button
            on:click={() => setPlaystyle('2')}
            class={`px-4 py-2 font-semibold rounded ${activePlaystyle === '2' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gradient-to-r from-orange-600 to-amber-500 hover:text-white'}`}
          >
            BURST MODE
          </button>
        </div>
      
        {#if activePlaystyle === '1'}
        <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">Standard Playstyle</h2> 
        <p class="text-sm sm:text-base text-center sm:text-left">
         Normal Vill-V but with boosted ER damage. Stronger playstyle.
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
              <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Sleight + Facade</p>
              <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Assemblage </p>
            </div>
          </div>
          
        </div>
        <div class="mt-3 rounded" >
          <p class="text-sm sm:text-base text-left">
            Vill-V starts with two Ego signets.
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
                <img src="/images/signets/Signets of Vicissitude (Hua).png" alt="Signet 5" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">2</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Bodhi (Su).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold">2</p>
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

          <div class=" mt-3 rounded" >
            <p class="text-sm sm:text-base text-left">
              <b> Decimation 1:</b> Your HP will be very low. If you are a new player, you can skip this, or build Vicissitude 2 first for survivability.
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
              <img src="/images/sigils/An_Old_Pals_Legacy.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            </div>
              <p class="text-base sm:text-lg font-semibold">START</p>
          </div>

          <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
              <div class="flex flex-row rounded">
                <img src="/images/sigils/Light_as_a_Bodhi_Leaf.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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
          <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">HOW TO PLAY</h2>

          <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>Hold ATK to enter weapon mode for a while, to trigger buffs</li>
          <li>Press Ult to activate Burst Mode</li>
          <li>Hold ATK until you cast the second Interlude Salute</li>
          <li>Press Ult to activate Burst Mode finisher attack</li>
          <li>Hold ATK to enter weapon mode and attack until Burst Mode is available again</li>
          <li>Repeat from step 2</li>
        </ol>

        <p class="mt-8 text-sm sm:text-base pb-4 text-center">
            Check out this showcase from Marisa Honkai:
        </p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/ikAFwXUv37o"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                loading="lazy">
            </iframe>
        </div>
        {/if}

        {#if activePlaystyle === '2'}
        <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">Burst Mode Playstyle</h2> 
        <p class="text-sm sm:text-base text-center sm:text-left">
          You stay in Burst Mode for as long as you can.
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
              <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Transmission + Reversal</p>
              <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Assemblage </p>
            </div>
          </div>
        </div>
        <div class="mt-3 rounded" >
          <p class="text-sm sm:text-base text-left">
              Vill-V starts with two Ego signets.
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
                <img src="/images/signets/Signets of Vicissitude (Hua).png" alt="Signet 5" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">2</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Gold (Eden).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold">Sp regen</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Bodhi (Su).png" alt="Signet 5" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">2</p>
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
          <div class=" mt-3 rounded" >
            <p class="text-sm sm:text-base text-left">
                 <b> Decimation 1:</b> Your HP will be very low. If you are a new player, you can skip this, or build Vicissitude 2 first for survivability.
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
              <img src="/images/sigils/Pseudo_Miracle.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/sigils/Dreamful_Gold.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            </div>
              <p class="text-base sm:text-lg font-semibold">START</p>
          </div>

          <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
              <div class="flex flex-row rounded">
                <img src="/images/sigils/Burden.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/sigils/Dreamful_Gold.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              </div>
              <p class="text-base sm:text-lg font-semibold">MID</p>
          </div>

          <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
              <div class="flex flex-row rounded">
                  <img src="/images/sigils/Key_to_the_Deep.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  <img src="/images/sigils/Dreamful_Gold.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
              <p class="text-base sm:text-lg font-semibold">FINAL</p>
          </div>


          </div>

          
          <div class="divider divider-neutral"></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">HOW TO PLAY</h2>

          <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
            <li>Hold ATK to enter weapon mode for a while, to trigger buffs</li>
            <li>Press Ult to activate Burst Mode</li>
            <li>Hold ATK until Burst Mode ends</li>
            <li>After 3 Interlude Salute, weapon skill will reset. Press it.</li>
            <li>If you run out of sp, Burst Mode will end. Hold ATK until Ultimate is available again.</li>
          </ol>
  

        <p class="mt-2 text-sm sm:text-base pb-4 text-center">
            Check out this showcase from Marisa Honkai:
        </p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/UbH453JYC-k"
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
                  Interlude Salute Total DMG +37.5% ➔ 50%. Within 5s of entering Burst Mode, deal additional 225% ➔ 300% ATK of Fire DMG.
                </td>
                <td class="p-3">DPS</td>
              </tr>
              <!-- Sample Row 2 -->
              <tr>
                <td>S2</td>
                <td>
                 - During Climax Approaching, sp regen +1.6 ➔ 2, hp recovery +24 ➔ 30. Weapon Mode Charged ATK Total DMG +35 ➔ 45%.
                 <br/>
                 - After entering Weapon Mode or Burst Mode, enemies take 13% ➔ 16.5% more Fire DMG from Helical Contraption (independent).

                </td>
                <td>DPS</td>
                            </tr>
              <tr>
                <td>S3</td>
                <td>
                  Leader Skill: Team Total DMG +12% ➔ 16%. Team Fire DMG +10% ➔ 15%.
                </td>
                <td>DPS</td>

              </tr>
              <tr>
                <td>SS</td>
                <td>
                  - UNLOCK: In Weapon Mode, Charged ATK Total DMG +15%, and recover 15 sp, cd 10s.
                  <br/>
                  - In Burst Mode, Fire DMG +32.5% ➔ 45%. Against collapsed QUA enemies, Fire DMG +17.5% ➔ 20%.
                </td>
                <td> DPS </td>
              </tr>
              <tr>
                <td>SS1</td>
                <td>
                  - In Weapon Mode, Fire DMG +32% ➔ 40%. Against QUA enemies, Fire DMG +18.5% ➔ 20% <br/>
                  - In Burst Mode, Fire DMG +15% ➔ 20%. Within 5s of exiting Burst Mode, Weapon Mode restores Heat Value, max 125 ➔ 150.
                </td>
                                  
            <td> DPS </td>

              </tr>
              <tr>
                <td>SS2</td>
                <td>
                After entering Weapon Mode or Burst Mode, enemies take 16.5% ➔ 20% more Fire DMG from Helical Contraption (independent).
                </td>
                <td> DPS </td>
              </tr>
              <tr>
                <td>SS3</td>
                <td>
                  Leader Skill: Team Total DMG +16% ➔ 20%. Team Fire DMG +15% ➔ 20%.


                </td>
                <td>DPS</td>
              </tr>
              <tr>
                <td>SSS</td>
                <td>
                  UNLOCK: When Interlude Salute hits a target, self Fire DMG +20% for 15s, can be refreshed.
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

