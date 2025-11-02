
  <title>Seele - Herrscher of Rebirth</title> 

    <meta property="og:title" content="Seele - Herrscher of Rebirth" />
    <meta property="og:description" content="Herrscher of Rebirth Guides, Builds and Gameplay" />
    <meta property="og:image" content="https://i.imgur.com/Ixh2Nfs.png" />
    <meta property="og:url" content="https://marisaimpact.com/valk/horb" />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary_large_image">


<link rel="canonical"  />

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
	import Dududps from "$lib/components/lineup/dududps.svelte";
	import Badumdps from "$lib/components/lineup/badumdps.svelte";
	import Jddps from "$lib/components/lineup/jddps.svelte";
	import Lanterndps from "$lib/components/lineup/lanterndps.svelte";
	import Thelemadps from "$lib/components/lineup/thelemadps.svelte";
	import Hohdps from "$lib/components/lineup/hohdps.svelte";
	import CharBio from "$lib/components/CharBio.svelte";
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
	import Psdps from "$lib/components/lineup/psdps.svelte";
	import Heliadps from "$lib/components/lineup/heliadps.svelte";
	import CharacterLayout from "$lib/components/valkpage/CharacterLayout.svelte";
	import Horbdlcdps from "$lib/components/lineup/horbdlcdps.svelte";
	import Hilovedps from "$lib/components/lineup/hilovedps.svelte";
	import Sparkledps from "$lib/components/lineup/sparkledps.svelte";
	import Simpdps from "$lib/components/lineup/simpdps.svelte";
	import Senadps from "$lib/components/lineup/senadps.svelte";
	import Horbdps from "$lib/components/lineup/horbdps.svelte";
	import Susannahdps from "$lib/components/lineup/susannahdps.svelte";
	import Cedps from "$lib/components/lineup/cedps.svelte";

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
//  { name: 'Question', short: 'qna' , icon: faComments  },
 // { name: 'Overview Card', short: 'card' },
 // { name: 'TL Error', short: 'translation', icon: faTriangleExclamation  },
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

// Track the active playstyle tab
let activeLineup = '1';

// Function to switch tabs
function setLineup(lineup) {
activeLineup = lineup;
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
  let fovlikes = likesData["horb"] || 0; // Get initial likes from JSON
  const charName = "horb"; // Route name for this character
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
  #star-container {
    background: radial-gradient(rgb(var(--light-purple-rgb)), rgb(var(--dark-purple-rgb)));
  }

  #star-gradient-overlay {
    background: radial-gradient(circle, transparent 75%, rgb(var(--dark-purple-rgb)));
  }

  #app {
  height: 38rem;
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
  

<CharacterLayout
  charName="horb"
  initialLikes={likesData["horb"] || 0}
  accent="bg-violet-800"
  image="/images/valkfull/horb.webp"
  alt="Herrscher of Rebirth"
  title="Herrscher of Rebirth"
  name="Seele Vollerei"
  release="v6.8 (3 Aug 2023)"
  dlc="v8.5 (23 Oct 2025)"
>
  <!-- Tags / Type Row -->
  <CharBio mode="dps" rank="s" type="psy" element="phy" ar="ws" bg="bg-violet-800" />

  <!-- Support Section -->
  <CharBio mode="support" ar={['goi' , 'ws' , 'p1phy']}  bg="bg-violet-800"/>

</CharacterLayout>



  
  </section>
  
<div class="flex max-w-(--breakpoint-xl) justify-center mx-auto "> 


  <aside class="w-full sm:max-w-[10rem] md:max-w-[12rem] hidden sm:block p-4  text-gray-200 sticky top-16 h-[calc(100vh-4rem)] " >

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
    <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-4  text-center">OVERVIEW</h2>
    <div class="flex max-w-(--breakpoint-xl) justify-center mx-auto ">
      <p class="text-sm sm:text-base mb-4 sm:mb-0">
        <strong>Updated For v8.5 (23 October 2025)
    </p>
    </div>
    <div>
        <!-- Roles Section -->
        <h2 class="text-xl  font-semibold mb-2 text-left cooltext text-slate-100">ROLES</h2>

          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">Part 1: Physical DPS and Support</strong> 
          </p>
          <ul class="list-disc ml-6 text-sm sm:text-base">
                <li>Herrscher of Rebirth (HoRB) is a powerful Part 1 Physical DPS. She has a unique skill where she can use Ultimate again when she defeats an enemy with a non-Ultimate attack. </li>
                <li>HoRB is the backbone support of Part 1 Physical teams, providing a wide range of buffs such as 75% impair (DEF reduction), 100% Crit Rate, Crit DMG buff and more.</li>
          </ul>    

        <p class="mt-4 text-sm sm:text-base">
            <strong class="text-amber-400">World Star DPS</strong> <br/>
            HoRB is brought back into the meta with the addition of her Stellar Key DLC [Sea-Cleansing Floret], turning her into a World Star DPS. 
        </p>
          <ul class="list-disc ml-6 text-sm sm:text-base">
                <li>As a DPS, she's just like other Part 2 valks: Good in optimal matchups, just decent everywhere else.  </li>
                <li>It's expected for her bosses to only appear once or twice per patch, just like HoFinality.  </li>                
                <li>HoRB role also expands as a Part 2 support for the following teams:</li>
          </ul>    

      <p class="mt-4 text-sm sm:text-base">
        <strong class="text-amber-400">Grail of Infinitude Support</strong> <br/>
        In Abyss, HoRB does not provide any improvement on existing GoI teams. In Arena, HoRB has a lot of suspended animations, making her a good support for that mode.
      </p>

    <p class="mt-4 text-sm sm:text-base">
      <strong class="text-amber-400">World Star Support</strong> <br/>
        HoRB is a great World Star support. During AR Charging, she has near zero field time - she's basically like HoFi support but can still contribute damage and consume Stellar Drain in the backline.
    </p>


        <div class="divider  "></div>
        <!-- Pull Recommendation Section -->
        <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext ">PULL RECOMMENDATION</h2>

        <p class="text-sm sm:text-base mt-4">
          <strong class="text-amber-400">HoRB</strong> 
          <br/>Currently there is no F2P way to get HoRB. She might be added to free Battle Pass next year. In 8.5, the only way to get HoRB is from 1680 b-chips pack, which is not cheap. 
        </p>

        <p class="text-sm sm:text-base mt-4">
          <strong class="text-amber-400">DLC Weapon</strong> 
          <br/>In v8.5, I only recommended getting HoRB DLC Weapon:
        </p>
          <ul class="list-disc ml-6 text-sm sm:text-base">
                <li>If you already have HoRB.  </li>
                <li>After you get full gear Hi Love Elf. </li>
                <li>BFD Coralie will return on Week 5-6. If you still don't have BFD and have enough crystal for her fullgear, then it's better to go BFD first than HoRB DLC. </li>

          </ul>    
      


        <p class="text-sm sm:text-base mt-4">
          <strong class="text-amber-400">Old Equipment</strong> 
          <br/>Do note that the old equipment is still used to support Part 1 teams, since the Stellar Key DLC locks HoRB in DPS form in Part 1 teams. But the only P1 Physical DPS teams that are still being used once every few months are Dreamweaver and HoSentience.
        </p>

        <div class="divider  "></div>
        <!-- How to Get Section -->
        <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">HOW TO GET</h2>
        <ul class="list-disc ml-6 text-sm sm:text-base ">
            <li ><strong>Herrscher of Rebirth:</strong> B-Chip Pack. HoRB will likely be added to Battle Pass next year.</li>
              <li><strong>DLC Weapon:</strong> Equipment Supply</li>
              <li><strong>DLC Stigma:</strong> Equipment Supply, Forgeable, Free stigma box in 8.5</li>
              <li><strong>Old Equipment:</strong> Not available.</li>
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
                  src="https://www.youtube.com/embed/J5paWnhog48"
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
  
<div class="grid gap-4 my-6 
            grid-cols-2 
            md:grid-cols-4 
            w-full max-w-4xl mx-auto">
  <button
    on:click={() => setLineup('1')}
    class={`btn w-full px-4 py-2 font-semibold rounded-sm 
      ${activeLineup === '1' 
        ? 'bg-blue-500 text-white' 
        : 'bg-gray-300 text-gray-700 hover:bg-gradient-to-r from-orange-600 to-amber-500 hover:text-white'}`}
  >
    DPS
  </button>



  <button
    on:click={() => setLineup('2')}
    class={`btn w-full px-4 py-2 font-semibold rounded-sm leading-3 
      ${activeLineup === '2' 
        ? 'bg-blue-500 text-white' 
        : 'bg-gray-300 text-gray-700 hover:bg-gradient-to-r from-orange-600 to-amber-500 hover:text-white'}`}
  >
    GRAIL OF INFINITUDE
  </button>

  <button
    on:click={() => setLineup('3')}
    class={`btn w-full px-4 py-2 font-semibold rounded-sm 
      ${activeLineup === '3' 
        ? 'bg-blue-500 text-white' 
        : 'bg-gray-300 text-gray-700 hover:bg-gradient-to-r from-orange-600 to-amber-500 hover:text-white'}`}
  >
    WORLD STAR
  </button>

  <button
    on:click={() => setLineup('4')}
    class={`btn w-full px-4 py-2 font-semibold rounded-sm 
      ${activeLineup === '4' 
        ? 'bg-blue-500 text-white' 
        : 'bg-gray-300 text-gray-700 hover:bg-gradient-to-r from-orange-600 to-amber-500 hover:text-white'}`}
  >
    P1 PHYSICAL
  </button>

</div>

      {#if activeLineup === '1'}
      <Horbdlcdps></Horbdlcdps>

      {/if}

      {#if activeLineup === '2'}

      <Hilovedps></Hilovedps>

      <div class="divider"></div>

      <Heliadps></Heliadps>   

      {/if}

      {#if activeLineup === '3'}

      <Sparkledps></Sparkledps>

      <div class="divider"></div>

      <Simpdps></Simpdps>

      <div class="divider"></div>

       <Senadps></Senadps> 

      {/if}

      {#if activeLineup === '4'}
      <Horbdps></Horbdps>

      <div class="divider  "></div>

      <P1physical></P1physical>

      <div class="divider  "></div>

      <Susannahdps></Susannahdps>

      <div class="divider  "></div>

      <Cedps></Cedps>


      {/if}

</section>

  {/if}

      {#if selectedTab === 'Equipment'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-gradient-to-r  from-blue-700 to-blue-500 text-white rounded px-2 mb-2 text-center">EQUIPMENT</h2>

            <div>


              <h2 class="text-xl font-semibold text-center  text-yellow-400 mt-4">BEST FOR PART 2</h2>

              <div class="flex flex-col justify-center items-center">
                  
              <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2025/09/06/50494840/2dacd8042bd4d81395db9116b2ab5374_7484074093435819987.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2025/09/06/9809137/fad3e7d000a2052086eea1708d818d04_8868426486462767089.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2025/09/06/9809137/7ba55bf106e05b3a42d40b27e04eb1aa_6525175215949766599.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2025/09/06/9809137/ade0b97ed5b28ef445cea9ac213c84c4_2181198158046883051.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

              </div>  
              <h4 class="text-base sm:text-base text-white">Sea-Cleansing Floret: Reciprocity + Aristophanes</h4>
              </div>

              <div class="p-4 mt-4 bg-gradient-to-r from-orange-950/75 to-orange-900/75 rounded">
                <p class="text-sm sm:text-base text-left mb-4">
                  <b>Sea-Cleansing Floret: Reciprocity</b><br/> - You need this weapon to unlock Astral Ring for HoRB.<br/>
                  - Major gameplay changes to HoRB. <br/>
                  - HoRB stays in Soul Shaper form in Grail of Infinitude teams. HoRB stays in Life Binder form in other teams. <br/>
                  - Huge self buffs and team buffs. 
                </p>
              
                <p class="text-sm sm:text-base text-left mb-4">
                  <b>Aristophanes </b><br/>  - Huge self buffs and team buffs. <br/> 
                  - Grants HoRB tons of Crit Rate, Crit DMG and Shieldbreak.<br/> 
                  - Forgeable in Foundry.
                </p>
  
              
                <p class="text-sm sm:text-base text-left">
                  <b>Affix</b><br/> Full ATK. But I see some pro players keep dupes for crit dmg affix. I'm not sure how useful will that be.
                </p>
              </div>
  


      </div>

      
      <div class="divider  "></div>


      <div>


              <h2 class="text-xl font-semibold text-center  text-gray-400 mt-4">BEST FOR PART 1 DPS AND GENERAL SUPPORT</h2>

              <div class="flex flex-col justify-center items-center">
                  
              <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2023/07/03/282941837/af5bc134dba2c9960116b905d577c58f_9071668271059278827.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2023/06/26/282941837/bfa0fb5b7502d019c8795605b4bedc9d_1181935826837724872.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2023/07/02/282941837/6647e2c178652897f98199afa6c2142b_8506151928304992863.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2023/07/02/282941837/c8f53045167ba15347202a604d213549_2893531837932914525.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

              </div>  
              <h4 class="text-base sm:text-base text-white">Life Harvester's Path: Shared Destiny + Seele: Herrscher of Rebirth</h4>
              </div>

              <div class="p-4 mt-4 bg-gradient-to-r from-violet-950/75 to-violet-900/75 rounded">
                <p class="text-sm sm:text-base text-left mb-4">
                  <b>Life Harvester's Path: Shared Destiny</b><br/> - Life Harvester grants 10 sp when any team member exits. <br/>
                  - DPS Form: Has 15% Crit Crate, so that is useful for Crit conversion.
                </p>
              
                <p class="text-sm sm:text-base text-left mb-4">
                  <b>Seele: Herrscher of Rebirth </b><br/>  - All buffs. The set has around 67% Crit DMG. <br/> 
                  - Stigma priority is Bottom >>> Top = Mid. Try to get TB or MB. <br/> 
                  - Bottom piece is mandatory to activate Life's Pistil state, where most of the buffs are.  <br/>
                  - 2PC has 30% Crit Rate, so that's useful for Crit Conversion.
                </p>
  
              
                <p class="text-sm sm:text-base text-left">
                  <b>Affix</b><br/> In some cases in Memorial Arena, you might want sp regen. If you don't care about Arena, then go full ATK.
                </p>
              </div>
  


      </div>

      
      <div class="divider  "></div>

      <h2 class="text-lg sm:text-xl font-semibold text-center  text-gray-400"> BEST FOR PART 1 BLEED TEAMS </h2>

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

      
      <div class="p-4 mt-4 bg-gradient-to-r from-fuchsia-950/75 to-fuchsia-900/75 rounded">
        <p class="text-sm sm:text-base text-left mb-4">
          <b>Why a different stigma set is used for Bleed teams? </b> <br/>
          Bleed DMG cannot crit. HoRB stigma effects have a mix of Physical DMG, Crit DMG and Crit Rate buffs. Although HoRB stigma set can be used to support Bleed DPS, it is not optimal.
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



      <div class="flex flex-wrap gap-4 my-8">
        <!-- Example image list for support buffs; add your own image sources -->
        <img
          src="https://i.imgur.com/jRNbJTk.png"
          alt="DMG TEST DPS"
          class=" object-cover cursor-pointer"
          on:click={() => openLightbox('https://i.imgur.com/jRNbJTk.png')}
        />

        <img
        src="https://i.imgur.com/cQzCWRD.png"
        alt="DMG TEST Support"
        class=" object-cover cursor-pointer"
        on:click={() => openLightbox('https://i.imgur.com/cQzCWRD.png')}
      />

      <img
      src="https://i.imgur.com/IYsXlbI.png"
      alt="DMG TEST Bleed Support"
      class=" object-cover cursor-pointer"
      on:click={() => openLightbox('https://i.imgur.com/IYsXlbI.png')}
    />
      </div>
      <Lightbox show={showLightbox} image={selectedImage} onClose={closeLightbox} />

      {/if}



     {#if selectedTab === 'Elysian Realm'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-gradient-to-r  from-blue-700 to-blue-500 text-white rounded px-2 mb-2 text-center">ELYSIAN REALM</h2>

<div class="grid gap-4 my-6 
            grid-cols-2 
            md:grid-cols-3 
            w-full max-w-4xl mx-auto">
  <button
    on:click={() => setPlaystyle('1')}
    class={`btn w-full px-4 py-2 font-semibold rounded-sm 
      ${activePlaystyle === '1' 
        ? 'bg-blue-500 text-white' 
        : 'bg-gray-300 text-gray-700 hover:bg-gradient-to-r from-orange-600 to-amber-500 hover:text-white'}`}
  >
    DLC: Stellar Outburst
  </button>

  <button
    on:click={() => setPlaystyle('3')}
    class={`btn w-full px-4 py-2 font-semibold rounded-sm 
      ${activePlaystyle === '3' 
        ? 'bg-blue-500 text-white' 
        : 'bg-gray-300 text-gray-700 hover:bg-gradient-to-r from-orange-600 to-amber-500 hover:text-white'}`}
  >
    DLC: AR Charging
  </button>

  <button
    on:click={() => setPlaystyle('2')}
    class={`btn w-full px-4 py-2 font-semibold rounded-sm 
      ${activePlaystyle === '2' 
        ? 'bg-blue-500 text-white' 
        : 'bg-gray-300 text-gray-700 hover:bg-gradient-to-r from-orange-600 to-amber-500 hover:text-white'}`}
  >
    DLC: Nuke Build
  </button>



  <button
    on:click={() => setPlaystyle('4')}
    class={`btn w-full px-4 py-2 font-semibold rounded-sm 
      ${activePlaystyle === '4' 
        ? 'bg-blue-500 text-white' 
        : 'bg-gray-300 text-gray-700 hover:bg-gradient-to-r from-orange-600 to-amber-500 hover:text-white'}`}
  >
    Life Binder
  </button>



   <button
    on:click={() => setPlaystyle('6')}
    class={`btn w-full px-4 py-2 font-semibold rounded-sm 
      ${activePlaystyle === '6' 
        ? 'bg-blue-500 text-white' 
        : 'bg-gray-300 text-gray-700 hover:bg-gradient-to-r from-orange-600 to-amber-500 hover:text-white'}`}
  >
    Soul Shaper
  </button>
  
  <button
    on:click={() => setPlaystyle('5')}
    class={`btn w-full px-4 py-2 font-semibold rounded-sm 
      ${activePlaystyle === '5' 
        ? 'bg-blue-500 text-white' 
        : 'bg-gray-300 text-gray-700 hover:bg-gradient-to-r from-orange-600 to-amber-500 hover:text-white'}`}
  >
    Decay Only
  </button>

</div>
        {#if activePlaystyle === '1'}
        <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">DLC: Stellar Outburst Playstyle
</h2> 
        <p class="text-sm sm:text-base text-center sm:text-left">
          This playstyle is only for HoRB with Stellar Key weapon.
        </p>

        <div class="divider  "></div>

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
              <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Decay </p>
              <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Shared Destiny ➔ Rising Sun </p>
             
            </div>
          </div>
          
        </div>
        <div class="p-2 mt-3 rounded" >
                            <ul class="list-disc px-4 text-sm sm:text-base">
              <li class="text-sm sm:text-base"> <span class="text-teal-300">Decay</span> gives damage buff and reduces Stellar Outburst cooldown.  <span class="text-orange-300">Shared Destiny</span> makes your Ult stronger. <span class="text-red-300">Rising Sun</span> gives Resonance DMG +20%. </li>
              <li class="text-sm sm:text-base"> ER Lite mode: Equip Because of You sigil and get all three Ego signets on Floor 7.</li>
              <li class="text-sm sm:text-base"> Normal mode: You can complete the run with just one Ego signet (Decay). You can get all three Ego signets by using Because of You support sigil and get the other two Ego signets on Floor 7.</li>
          </ul>
          </div>

          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            <!-- First Signet with 'Start' text -->
          
            <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
              <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
                <img src="/images/signets/Signets of Infinity (Mobius).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>

               <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Decimation (Kalpas).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1 or 2</p>
              </div>   

              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Vicissitude (Hua).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">2</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Reverie (Pardofelis).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold">1</p>
              </div>

          </div>

        <div class="p-2 mt-3 rounded" >
          <ul class="list-disc px-4 text-sm sm:text-base">
            <li class="text-sm sm:text-base"> <span class="text-red-300">Decimation 1</span>: V8.5 ER has a load buff that constantly reduce your HP, this helps you maximize Decimation 1 buff and damage proc. After v8.5, if there is no ER effect that helps keep your HP low, then it's better to use Decimation 2, or other signets.</li>
          </ul>
        </div>

            <div class="divider  "></div>
            <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SUPPORTS</h2>

          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            
            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                  <img src="/images/valkportrait/Theresa Starlit Astrologos.png" alt="SA" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="BR" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">START</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                  <img src="/images/valkportrait/Theresa Starlit Astrologos.png" alt="SA" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="BR" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">MID</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                  <img src="/images/valkportrait/Theresa Starlit Astrologos.png" alt="SA" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="BR" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">FINAL</p>
            </div>
            
          </div>

          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SIGIL</h2>

          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            
            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                <img src="/images/sigils/Forbidden_Seed.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/sigils/Because_of_You.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">START (ER Lite)</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                    <img src="/images/sigils/Forbidden_Seed.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                    <img src="/images/sigils/Boundless_Logos.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">START (Normal)</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                    <img src="/images/sigils/Mad_Kings_Mask.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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

          
          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">HOW TO PLAY</h2>

          <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>Activate Stellar Outburst.</li>
          <li>Do full Basic ATK sequence, repeat two more times (total 3 times). You can stop early to finish the last wave / boss with Ultimate.</li>
          <li>Use Ultimate.</li>
          <li>Attack a bit until Stellar Outburst is ready again.</li>
          <li>Repeat.</li>
          <li>Optional: If you have initial sp signet, at the start, you can do evade ➔ ultimate for a lil extra damage.</li>
        </ol>

        <p class="mt-2 text-sm sm:text-base pb-4 text-center">
            Check out this showcase from Marisa Honkai:
        </p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/H2uWWoAKpEY"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                loading="lazy">
            </iframe>
        </div>
        {/if}

                {#if activePlaystyle === '2'}
        <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">DLC: Nuke Build
</h2> 
        <p class="text-sm sm:text-base text-center sm:text-left">
          This playstyle is only for HoRB with Stellar Key weapon. This is a speedrun build. It is very rng-heavy, you will waste more time resetting for optimal signets than doing the actual run. Worth to try if you want to flex sub one minute run on your friends.
        </p>

        <div class="divider  "></div>

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
              <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Shared Destiny + Decay</p>
            </div>
          </div>
          
        </div>
          <div class=" mt-3 rounded" >
            <p class="text-sm sm:text-base text-left">
                Both Ego signets are very important. Shared Destiny makes your Ult stronger. Decay gives damage, and allows normal evasion to trigger evasion skill. In 8.5, evasion skill is also important to trigger the extra damage from load buff.
                </p>
            </div>

          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            <!-- First Signet with 'Start' text -->
          
            <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
              <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
                <img src="/images/signets/Signets of Decimation (Kalpas).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>

              <div class="flex flex-col items-center p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Gold (Eden).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-sm sm:text-lg ">Initial SP</p>
              </div>    

              <div class="flex flex-col items-center p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Deliverance (Kevin).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>
              
              <div class="flex flex-col items-center p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Infinity (Mobius).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Vicissitude (Hua).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">2</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Reverie (Pardofelis).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold">1</p>
              </div>

          </div>

          <div class=" mt-3 rounded" >
            <p class="text-sm sm:text-base text-left">
                You want to get Gold signet initial sp as early as you can to immediately use Ult at the start.
                </p>
            </div>

            <div class="divider  "></div>
            <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SUPPORTS</h2>

          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            
            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                  <img src="/images/valkportrait/Theresa Starlit Astrologos.png" alt="SA" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="BR" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">START</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                  <img src="/images/valkportrait/Theresa Starlit Astrologos.png" alt="SA" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="BR" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">MID</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                  <img src="/images/valkportrait/Theresa Starlit Astrologos.png" alt="SA" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="BR" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">FINAL</p>
            </div>
            
          </div>

          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SIGIL</h2>

          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            
            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                <img src="/images/sigils/Mad_Kings_Mask.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/sigils/An_Old_Pals_Legacy.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">START (ER Lite)</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                    <img src="/images/sigils/Forbidden_Seed.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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

          
          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">HOW TO PLAY</h2>

          <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>Use Ultimate.</li>
          <li>Weapon / Evade / Both. </li>
          <li>If an enemy dies, Ult will refresh, use Ult. If this is a boss, then you can use Combo ATK or activate Stellar Outburst and attack normally. See which one is faster.</li>
           <li>In 8.5, pick Setsuna-Infinity load buff - using weapon + evade + ult will deal damage.</li>
       
        </ol>

        <p class="mt-2 text-sm sm:text-base pb-4 text-center">
            Check out this showcase from Marisa Honkai:
        </p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/n28Aj7_cMZE"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                loading="lazy">
            </iframe>
        </div>
        {/if}

        {#if activePlaystyle === '3'}
        <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">DLC: AR Charging Playstyle</h2> 
        <p class="text-sm sm:text-base text-center sm:text-left">
          This playstyle is only for HoRB with Stellar Key weapon. This is basically the same as regular Life Binder gameplay without the initial Soul Shaper form setup.
        </p>

        <div class="divider  "></div>

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
              <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Soothingness ➔ Decay</p>
              <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Shared Destiny ➔ Spirits</p>
            </div>
          </div>
          
        </div>
        <div class="p-2 mt-3 rounded" >
                            <ul class="list-disc px-4 text-sm sm:text-base">
              <li class="text-sm sm:text-base">  <span class="text-orange-300">Shared Destiny</span> makes your Ult stronger. <span class="text-teal-300">Spirits</span> gives Physical DMG +20%.</li>                
              <li class="text-sm sm:text-base"> ER Lite mode: Equip Because of You sigil and get all three Ego signets on Floor 7.</li>
              <li class="text-sm sm:text-base"> Normal mode: You can complete the run with just one Ego signet (Soothingness), but having both Ego signets is a big improvement. You can get both Ego signets at the start by using Thorny Crown sigil, OR by resetting Floor 1 until you get another Ego portal, OR use Because of You support sigil and get the other two Ego signets on Floor 7.</li>
                            </ul>
          </div>

          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            <!-- First Signet with 'Start' text -->
          
            <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
              <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
                <img src="/images/signets/Signets of Infinity (Mobius).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Decimation (Kalpas).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1 or 2</p>
              </div>  

              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Vicissitude (Hua).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">2</p>
              </div>

              <div class="flex flex-col items-center p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Helix (Vill-V).png" alt="Signet 4" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Reverie (Pardofelis).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold">1</p>
              </div>

          </div>
        <div class="p-2 mt-3 rounded" >
          <ul class="list-disc px-4 text-sm sm:text-base">

            <li class="text-sm sm:text-base"> <span class="text-red-300">Decimation 1</span>: V8.5 ER has a load buff that constantly reduce your HP, this helps you maximize Decimation 1 buff and damage proc. After v8.5, if there is no ER effect that helps keep your HP low, then it's better to use Decimation 2, or other signets.</li>
          </ul>
        </div>



            <div class="divider  "></div>
            <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SUPPORTS</h2>

          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            
            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                  <img src="/images/valkportrait/Theresa Starlit Astrologos.png" alt="Teri" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Himeko" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">START</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                  <img src="/images/valkportrait/Theresa Starlit Astrologos.png" alt="Teri" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Himeko" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">MID</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                <img src="/images/valkportrait/Theresa Starlit Astrologos.png" alt="Teri" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Himeko" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">FINAL</p>
            </div>
            
          </div>

          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SIGIL</h2>

          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            
            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                <img src="/images/sigils/Forbidden_Seed.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/sigils/Because_of_You.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">START (ER Lite)</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                    <img src="/images/sigils/Forbidden_Seed.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                    <img src="/images/sigils/Boundless_Logos.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">START (Normal)</p>
            </div>
            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                    <img src="/images/sigils/Mad_Kings_Mask.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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

          
          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">HOW TO PLAY</h2>

          <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">

          <li>Weapon ➔ Joint Weapon (Spin).</li>
          <li>Combo ATK ➔ Joint Combo.</li>
          <li>Use Ultimate whenever available.</li>
          <li>Repeat.</li>
        </ol>

        <p class="mt-2 text-sm sm:text-base pb-4 text-center">
            Check out this showcase from Marisa Honkai:
        </p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/WeV1aGlQ56k"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                loading="lazy">
            </iframe>
        </div>
        {/if}
        {#if activePlaystyle === '4'}
        <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">Life Binder Form Playstyle</h2> 
        <p class="text-sm sm:text-base text-center sm:text-left">
          DPS form standard playstyle
        </p>

        <div class="divider  "></div>

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
              <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Soothingness ➔ Decay </p>
              <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Shared Destiny</p>
            </div>
          </div>
          
        </div>
        <div class="p-2 mt-3 rounded" >
          <ul class="list-disc px-4 text-sm sm:text-base">
              <li class="text-sm sm:text-base"> ER Lite mode: Equip Because of You sigil and get all three Ego signets on Floor 7.</li>
              <li class="text-sm sm:text-base"> Normal mode: You can complete the run with just one Ego signet (Soothingness), but having both Ego signets is a big improvement. You can get both Ego signets at the start by using Thorny Crown sigil, OR by resetting Floor 1 until you get another Ego portal, OR use Because of You support sigil and get the other two Ego signets on Floor 7.</li>
          </ul>
        </div>

          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            <!-- First Signet with 'Start' text -->
          
            <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
              <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
                <img src="/images/signets/Signets of Infinity (Mobius).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>
              
              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Vicissitude (Hua).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">2</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Decimation (Kalpas).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">2</p>
              </div>

              <div class="flex flex-col items-center p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Helix (Vill-V).png" alt="Signet 4" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Reverie (Pardofelis).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold">1</p>
              </div>

          </div>

          <div class="p-2 mt-3 rounded" >
            <p class="text-sm sm:text-base text-left">
                Infinity: Flora and Diona are considered as a summoned entities in ER. Combo ATK counts as resummoning Diona.
                </p>
            </div>

            <div class="divider  "></div>
            <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SUPPORTS</h2>

          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            
            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                  <img src="/images/valkportrait/Bronya Snowy Sniper.png" alt="Snowy Sniper" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">START</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                  <img src="/images/valkportrait/Bronya Snowy Sniper.png" alt="Snowy Sniper" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">MID</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                  <img src="/images/valkportrait/Bronya Snowy Sniper.png" alt="Snowy Sniper" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">FINAL</p>
            </div>
            
          </div>

          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SIGIL</h2>

          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            
            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                <img src="/images/sigils/Forbidden_Seed.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/sigils/Because_of_You.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">START (ER Lite)</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                    <img src="/images/sigils/Forbidden_Seed.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                    <img src="/images/sigils/Boundless_Logos.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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

          
          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">HOW TO PLAY</h2>

          <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>Evade, then Ultimate.</li>
          <li>Press ult to switch to DPS Form.</li>
          <li>Spam Basic ATK until Combo ATK meter is full, then use Combo ATK.</li>
          <li>Weapon skill, just go merry go round. Fills up Combo ATK meter.</li>
          <li>Use Combo ATK.</li>
          <li>Use Ultimate when available.</li>
          <li>Repeat Step 3-6.</li>
        </ol>

        <p class="mt-2 text-sm sm:text-base pb-4 text-center">
            Check out this showcase from Marisa Honkai:
        </p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/xsr8kb3Iobs"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                loading="lazy">
            </iframe>
        </div>
        {/if}
        {#if activePlaystyle === '5'}
        <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">Life Binder: Decay Signet Only</h2> 
        <p class="text-sm sm:text-base text-center sm:text-left">
          Speedrun build using only Decay Ego signet. This run abuses Decimation 1 nuke. HoRB has high HP, and Decimation 1 damage increases the more HP you're missing = Big Nuke. Recommended for full gear HoRB.
        </p>

        <div class="divider  "></div>

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
              <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Decay </p>
            </div>
          </div>
          
        </div>

          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            <!-- First Signet with 'Start' text -->
          
            <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
              <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
              <img src="/images/signets/Signets of Decimation (Kalpas).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold ">1</p>
            </div>

            <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Infinity (Mobius).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>
              
              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Vicissitude (Hua).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">2</p>
              </div>

              <div class="flex flex-col items-center p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Helix (Vill-V).png" alt="Signet 4" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Reverie (Pardofelis).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold">1</p>
              </div>

          </div>

          <div class="p-2 mt-3 rounded" >
            <p class="text-sm sm:text-base text-left">
                - Infinity: Flora and Diona are considered as a summoned entities in ER. Combo ATK counts as resummoning Diona.<br/>
                - Setsuna +1 Evasion charge helps you get Combo ATK faster. <br/>
                - Can pick Daybreak if the current boss has a tanky shield.
                </p>
            </div>

            <div class="divider  "></div>
            <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SUPPORTS</h2>

          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            
            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                  <img src="/images/valkportrait/Bronya Snowy Sniper.png" alt="Snowy Sniper" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">START</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                  <img src="/images/valkportrait/Bronya Snowy Sniper.png" alt="Snowy Sniper" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">MID</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                  <img src="/images/valkportrait/Bronya Snowy Sniper.png" alt="Snowy Sniper" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">FINAL</p>
            </div>
            
          </div>

          <div class="divider  "></div>
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
                    <img src="/images/sigils/Forbidden_Seed.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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

          
          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">HOW TO PLAY</h2>

          <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>Evade, then Ultimate.</li>
          <li>Press ult to switch to DPS Form.</li>
          <li>Spam Basic ATK until Combo ATK meter is full, then use Combo ATK, but DO NOT TRIGGER JOINT ATK. You don't want to heal because we are using Decimation 1 nuke.</li>
          <li>Weapon skill, just go merry go round. Fills up Combo ATK meter.</li>
          <li>Use Combo ATK. Again, DO NOT TRIGGER JOINT ATK. You don't want to heal because we are using Decimation 1 nuke.</li>
          <li>Use Ultimate when available.</li>
          <li>Repeat Step 3-6.</li>
        </ol>

        <p class="mt-2 text-sm sm:text-base pb-4 text-center">
            Check out this showcase from Marisa Honkai:
        </p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/6LQn_wdz0D0"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                loading="lazy">
            </iframe>
        </div>
        {/if}

        {#if activePlaystyle === '6'}
        <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">Soul Shaper Playstyle</h2> 
        <p class="text-sm sm:text-base text-center sm:text-left">
          Support Form standard playstyle
                </p>

        <div class="divider  "></div>

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
              <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Spirits + Rising Sun </p>
              <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Shared Destiny</p>
            </div>

          </div>


        <div class="p-2 mt-3 rounded" >
                            <ul class="list-disc px-4 text-sm sm:text-base">

            <li class="text-sm sm:text-base"> ER Lite mode: Equip Because of You sigil and get all three Ego signets on Floor 7.</li>
            <li class="text-sm sm:text-base"> Normal mode: Try to start with both Spirits and Rising Sun. Spirits enable the playstyle, and Rising Sun gives big damage, gathers enemies, and synergizes with signets: Recover and consume sp (Gold 1 and 2), recover HP (Decimation 2), and gives hitcount (Bodhi 1 and 2). You can get both Ego signets at the start by using Thorny Crown sigil, OR by resetting Floor 1 until you get another Ego portal, OR use Because of You support sigil and get the other two Ego signets on Floor 7.</li>
                            </ul>
          </div>
          
        </div>

          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            <!-- First Signet with 'Start' text -->
          


            <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
              <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
                <img src="/images/signets/Signets of Infinity (Mobius).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>
              
              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Decimation (Kalpas).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">2</p>
              </div>

              <div class="flex flex-col items-center p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Bodhi (Su).png" alt="Signet 4" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>

              <div class="flex flex-col items-center p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Gold (Eden).png" alt="Signet 4" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1 or 2</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Reverie (Pardofelis).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold">1</p>
              </div>

          </div>

          <div class="p-2 mt-3 rounded" >
            <p class="text-sm sm:text-base text-left">
                - Infinity: Flora is considered as a summoned entity in ER. Combo ATK counts as resummoning Flora.<br/>
                - Can pick Daybreak if the current boss has a tanky shield.
                </p>
            </div>

            <div class="divider  "></div>
            <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SUPPORTS</h2>

          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            
            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                  <img src="/images/valkportrait/Bronya Snowy Sniper.png" alt="Snowy Sniper" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">START</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                  <img src="/images/valkportrait/Bronya Snowy Sniper.png" alt="Snowy Sniper" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">MID</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                  <img src="/images/valkportrait/Bronya Snowy Sniper.png" alt="Snowy Sniper" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">FINAL</p>
            </div>
            
          </div>

          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SIGIL</h2>

          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            
            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                <img src="/images/sigils/Forbidden_Seed.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/sigils/Because_of_You.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">START (ER LITE)</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                    <img src="/images/sigils/Forbidden_Seed.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                    <img src="/images/sigils/Boundless_Logos.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">START (NORMAL)</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                    <img src="/images/sigils/Heavy_as_a_Million_Lives.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                    <img src="/images/sigils/An_Old_Pals_Legacy.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">FINAL</p>
            </div>

          </div>

          
          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">HOW TO PLAY</h2>

          <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>Evade, then Ultimate.</li>
          <li>Press weapon, then press weapon again to end the merry go round. (This improves the impair to 75%)</li>
          <li>Hold Basic ATK to fire machine gun.</li>
          <li>Use Combo ATK when meter is full.</li>
          <li>When impair duration is almost over (the purple icon above HP bar), use evade and Ultimate.</li>
          <li>Repeat.</li>
        </ol>

        <p class="mt-2 text-sm sm:text-base pb-4 text-center">
            Check out this showcase from Marisa Honkai:
        </p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/AU_7SuoySwE"
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
              <li>Every rank except S2 has a DPS upgrade
              </li>
            </ul>
          </div>
      
          <!-- Support Upgrade Box -->
          <div class="flex-1 p-2 bg-gray-800 rounded-lg shadow-md border border-yellow-400">
            <h3 class="text-lg font-semibold text-yellow-400 mb-2">Support Upgrade</h3>
            S2: In Part 1 team, allows you to skip Combo ATK for sp to use Ultimate. Speeds up rotation and improves score.

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
                  DPS Form: Joint weapon skill finishing slash boosts Combo ATK's Physical DMG +35% ➔ 50%
                </td>
                <td class="p-3">DPS</td>
              </tr>
              <!-- Sample Row 2 -->
              <tr>
                <td>S2</td>
                <td>
                  Support Form: <br/>
                  - After ultimate evasion, each hit of Basic ATK seq 3 recover 8 ➔ 12 sp for HoRB <br/>
                  - Triggering time fracture for the first time restores 15 ➔ 30 sp extra sp for HoRB <br/>
                  - Team Total DMG + 7% ➔ 17% for 16s

                </td>
                <td>Part 1 Support</td>
              </tr>
              <tr>
                <td>S3</td>
                <td>
                  Leader Skill:<br/>
                    - Team Max HP +5% ➔ 7.5%<br/>
                    - Team Physical DMG +10% ➔ 15%
                </td>
                <td>DPS</td>
              </tr>
              <tr>
                <td>SS</td>
                <td>
                  UNLOCK: For every 0.5s of Joint Weapon skill, final slash deals additional 40% ATK of Physical DMG<br/>
                  Crit Conversion state: Attacks with 100% Crit Rate gain 2% ➔ 8%% Physical DMG against enemies with Withering Fissure
                </td>
                <td> DPS<br/>Support</td>
              </tr>
              <tr>
                <td>SS1</td>
                <td>
                  Enemies with Withering Fissure take 2.6% ➔ 5% more Total DMG from HoRB (independent multiplier)
                </td>
                <td>DPS</td>
              </tr>
              <tr>
                <td>SS2</td>
                <td>
                  DPS Form: Max HP +1040 ➔ 1200. When Max HP is over 3000, for every 10 exceeding HP, enemies take 1% more Total DMG from HoRB, max 41% ➔ 45%
                </td>
                <td>DPS
              </tr>
              <tr>
                <td>SS3</td>
                <td>
                  Leader Skill:<br/>
                    - Team Max HP +7.5% ➔ 10%<br/>
                    - Team Physical DMG +15% ➔ 20%              
                </td>
                <td>DPS
              </tr>
              <tr>
                <td>SSS</td>
                <td>
                  UNLOCK: Support Form: Triggering global time fracture restores 15 sp, cd: 16s<br/>
                  UNLOCK: DPS Form: Each Ult cast makes it deal additional 80% ATK of Physical DMG, max 3 stacks.<br/>
                  Support Form: Triggering time fracture for the first time restores 30 ➔ 60 sp extra sp for HoRB
                </td>
                <td>DPS <br/> Support <br/> Memorial Arena
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
              <p>DPS Form: Joint weapon skill finishing slash boosts Combo ATK's Physical DMG +35% ➔ 50%
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
              <p>	Support Form:<br/>
                - After ultimate evasion, each hit of Basic ATK seq 3 recover 8 ➔ 12 sp for HoRB<br/>
                - Triggering time fracture for the first time restores 15 ➔ 30 sp extra sp for HoRB<br/>
                - Team Total DMG + 7% ➔ 17% for 16s
              </p>
              <p class="mt-2"><strong>Good for:</strong> Part 1 Support</p>
            </div>
          </div>

        

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(3)}>
            <span>S3</span>
            <span class="text-md">{openItem === 3 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 3 ? 'open' : ''}">
            <p>Leader Skill:<br/>
              Leader Skill:
              - Team Max HP +5% ➔ 7.5%<br/>
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
            <p>1. 	UNLOCK: For every 0.5s of Joint Weapon skill, final slash deals additional 40% ATK of Physical DMG<br/>
              2. Crit Conversion state: Attacks with 100% Crit Rate gain 2% ➔ 8%% Physical DMG against enemies with Withering Fissure
            </p>
            <p class="mt-2"><strong>Good for:</strong> DPS, Support</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(5)}>
            <span>SS1</span>
            <span class="text-md">{openItem === 5 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 5 ? 'open' : ''}">
            <p>Enemies with Withering Fissure take 2.6% ➔ 5% more Total DMG from HoRB (independent multiplier)</p>
            <p class="mt-2"><strong>Good for:</strong>  DPS</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(6)}>
            <span>SS2</span>
            <span class="text-md">{openItem === 6 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 6 ? 'open' : ''}">
            <p>
              DPS Form: Max HP +1040 ➔ 1200. When Max HP is over 3000, for every 10 exceeding HP, enemies take 1% more Total DMG from HoRB, max 41% ➔ 45%

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
            <p>Leader Skill:<br/>
              - Team Max HP +7.5% ➔ 10%<br/>
              - Team Physical DMG +15% ➔ 20%
            <p class="mt-2"><strong>Good for:</strong> DPS</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(8)}>
            <span>SSS</span>
            <span class="text-md">{openItem === 8 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 8 ? 'open' : ''}">
            <p>	1. UNLOCK: Support Form: Triggering global time fracture restores 15 sp, cd: 16s <br/>
              2. UNLOCK: DPS Form: Each Ult cast makes it deal additional 80% ATK of Physical DMG, max 3 stacks. <br/>
              3. Support Form: Triggering time fracture for the first time restores 30 ➔ 60 sp extra sp for HoRB
            <p class="mt-2"><strong>Good for:</strong> DPS, Support, Memorial Arena
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
            <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">HoRB Part 2 DPS and Support</h2>

            <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">DPS starts at 1:17, SUP starts at 3:27</p>

            <div class="relative overflow-hidden" style="padding-top: 56.25%;">
              <iframe
                  class="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/J5paWnhog48"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen>
              </iframe>
          </div>
        </div>

      </div>

  {/if}
  
  
      {#if selectedTab === 'Gameplay'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">GAMEPLAY EXAMPLES</h2>
  
      <div class=" gap-6 mt-5 mb-10">

        <div class="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">HoRB Part 2 DPS and Support</h2>

          <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">Starts at 4:51. Will update in the future with live abyss runs</p>

          <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
            loading="lazy" 

                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/J5paWnhog48"
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
          <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">HoRB Part 1 DPS</h2>

          <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">HoRB DPS with the new support Reign Solaris vs Starless Shadow Knight</p>

          <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
            loading="lazy" 

                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/BxukhzXIKgY"
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

  <div class="my-6">
    <div class="chat chat-start ">
      <div class="chat-image avatar">
        <div class="w-10 sm:w-12 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="/images/meibald.webp" />
        </div>
      </div>
      <div class="chat-bubble chat-bubble-primary text-base text-white">Does HoH really need Thelema support?</div>
    </div>

    <div class="chat chat-end">
      <div class="chat-image avatar">
        <div class="w-10 sm:w-12 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src="/images/ds.webp" />
        </div>
      </div>
      <div class="chat-bubble chat-bubble-neutral text-base text-white py-5">
        As DPS, HoH needs Thelema support. Old HoH bosses require freeze and/or shieldbreak. These were provided by Kira and Sushang, but in WoDestiny team, only Thelema can provide these utilities. Thelema also provides evasion spam ar regen, and will contribute damage in Ice weather.

      
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

      {#if selectedTab === 'Support Buffs'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">SUPPORT BUFFS</h2>

            
      <div class="my-6  py-5 rounded-xl text-slate-100 space-y-6 text-sm sm:text-base">
        <h3 class="text-lg sm:text-xl font-bold text-center">
          How to Activate HoRB Support Buffs (Part 2 Teams)
        </h3>
      
        <div class="space-y-2 border-l-4 border-orange-300 pl-4">
          <h4 class="font-semibold text-orange-300 text-base sm:text-lg">Stellar Drain</h4>
          <p class="leading-relaxed">
            Combo ATK or Joint Weapon consumes Stellar Drain.
          </p>
        </div>
      
        <div class="space-y-2 border-l-4 border-orange-300 pl-4">
          <h4 class="font-semibold text-orange-300 text-base sm:text-lg">Aristophanes Stigma Buff</h4>
          <p class="leading-relaxed">
            - Life Binder form: Any attack from HoRB will trigger an important stigma buff <span class="text-sky-200 italic">[xxx]</span> for 25s.
            <br/>
            - Soul Shaper form (Grail of Infinitude team): Casting Ultimate triggers an important stigma buff <span class="text-sky-200 italic">[xxx]</span> for 25s. Also activated/refreshed upon <span class="italic text-sky-200">Stellar Outburst </span> activation.
          </p>
        </div>

        <div class="space-y-2 border-l-4 border-orange-300 pl-4">
          <h4 class="font-semibold text-orange-300 text-base sm:text-lg">Grail of Infinitude Buff</h4>
          <p class="leading-relaxed">
            - During AR Charging, casting Ult and consuming extra sp will activate a buff for 25s: Team Total DMG +0.3% x the extra sp consumed.
            <br/>
            - When Joint Combo hits a target or after casting Joint Weapon, Withering Fissure DEF reduction is increased to 55%, and enemies with Withering Gap take 10% more Physical DMG and 5% more Elemental DMG.
          </p>
        </div>        

        <div class="space-y-2 border-l-4 border-orange-300 pl-4">
          <h4 class="font-semibold text-orange-300 text-base sm:text-lg">Passive</h4>
          <p class="leading-relaxed">
            The rest of her buffs are activated passively.
          </p>
        </div>
      </div>

      <!-- Lightbox Component -->
      <Lightbox show={showLightbox} image={selectedImage} onClose={closeLightbox} />
      {/if}
  </div>

</section>


</div>

</section>


</div>

