<svelte:head>
  <title>Kiana - Herrscher of Finality</title> 

    <meta property="og:title" content="Kiana - Herrscher of Finality" />
    <meta property="og:description" content="HoFinality Guides, Builds and Gameplay" />
    <meta property="og:image" content="https://i.imgur.com/IfnW1pa.png" />
    <meta property="og:url" content="https://marisaimpact.com/valk/hofi" />
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
	import Hofidps from '$lib/components/lineup/hofidps.svelte';
	import Vitadps from '$lib/components/lineup/vitadps.svelte';
	import Hoodps from '$lib/components/lineup/hoodps.svelte';
	import Simpdps from '$lib/components/lineup/simpdps.svelte';
	import Senadps from '$lib/components/lineup/senadps.svelte';
	import Sparkledps from "$lib/components/lineup/sparkledps.svelte";
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
	import CharacterLayout from "$lib/components/valkpage/CharacterLayout.svelte";

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
  let hofilikes = likesData["hofi"] || 0; // Get initial likes from JSON
  const charName = "hofi"; // Route name for this character
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

    hofilikes++;

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
    background: radial-gradient(rgb(var(--light-fuchsia-rgb)), rgb(var(--dark-fuchsia-rgb)));
  }

  #star-gradient-overlay {
    background: radial-gradient(circle, transparent 75%, rgb(var(--dark-fuchsia-rgb)));
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
  


<div class="fixed  h-1/2 w-1/2 top-[-5vh] right-[-20vw]  z-[-8] hidden sm:block " id="avabox">    
  <img src="/images/bg/ava_hofi.webp" alt="Lone Planetfarer" class=" object-contain slide-in-pls" /> 
</div>

 <CharacterLayout
  charName="hofi"
  initialLikes={likesData["hofi"] || 0}
  accent="bg-fuchsia-800"
  image="/images/valkfull/kiana_hofi.webp"
  alt="Herrscher of Finality"
  title="Herrscher of Finality"
  name="Kiana Kaslana"
  release="v6.4 (16 Feb 2023)"
  dlc="v7.8 (17 Oct 2024)"
>
  <!-- Tags / Type Row -->
  <CharBio mode="dps" rank="s" type="img" element="fire" ar="roo" bg="bg-fuchsia-800" />

  <!-- Support Section -->
  <CharBio mode="support" ar={['scoralie', 'lp' , 'ws' , 'hoo' ]}  bg="bg-fuchsia-800"/>


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
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-4 text-center">OVERVIEW</h2>
        <div class="flex max-w-(--breakpoint-xl) justify-center mx-auto ">
          <p class="text-sm sm:text-base">
            <strong>Updated For v8.4 (21 Aug 2025)
        </p>
        </div>
      <div>
          <!-- Roles Section -->
          <h2 class="text-xl mt-4 font-semibold mb-2 text-left cooltext text-slate-100">ROLES</h2>
          
          <p class="mt-6 text-sm sm:text-base">
              <strong class="text-amber-400">Original Role: Part 1 DPS</strong><br/> Powerful Fire-IMG DPS, the culmination of 6 years of journey. HoFi's full potential is only unlocked in Herrscher Trio team with <a href="/valk/hoo" class="link ">Herrscher of Origin </a> and <a href="/valk/hotr" class="link ">Herrscher of Truth.</a>
          </p>
          <p class="mt-6 text-sm sm:text-base">
              <strong class="text-amber-400">Rite of Oblivion DPS</strong><br/>When HoFi equips the new Divine Key Waxing Moon, she unlocks Astral Ring: Rite of Oblivion. HoFi's role also expands into a support for the following teams:
          </p>

          <p class="mt-6 text-sm sm:text-base">
              <strong class="text-amber-400">Vita and BFD Support</strong><br/>  HoFi+DLC is one of the better supports for <a href="/valk/lp" class="link ">Vita Lone Planetfarer</a> and <a href="/valk/behold-fate-defying-dragon" class="link ">Behold! Fate-Defying Dragon</a>.
          </p>

          <p class="mt-6 text-sm sm:text-base">
            <strong class="text-amber-400">World Star Support</strong><br/> One of the best supports for World Star team. Can trigger Domain Resonance very fast.
        </p>


        <p class="mt-6 text-sm sm:text-base">
          <strong class="text-amber-400">Herrscher of Origin Support</strong><br/>  Iskandar stigma has buffs for HoOrigin DPS. So far, HoOrigin only has one top score in live version Abyss, Starless Husk Mysticism.
      </p>

      <p class="mt-6 text-sm sm:text-base">
        <strong class="text-amber-400">Last Resort Support Option For Other AR</strong><br/>  As a RoOblivion character, HoFi can technically support other AR teams, but she is as terrible as A-rank Coralie.
    </p>

          <div class="divider  "></div>
          <!-- Pull Recommendation Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">PULL RECOMMENDATION</h2>
            <p class="mt-4 text-sm sm:text-base">
                <strong class="text-amber-400">F2P Players</strong>
                <br/>Not very recommended. You can get HoFi from Battle Pass (BP), but it will take you almost a year to get enough Crystallum to exchange her. Personally, I think getting Divine Keys from BP for the +10 ATK is still better for your account long-term. Also, even if you get HoFi, you still need to get the DLC gears from supply - not really worth using your crystal to get old stuff as a F2P player.
            </p>

            <p class="mt-4 text-sm sm:text-base">
                <strong class="text-amber-400">Paid Players</strong>
                <br/>If you can afford Knight or Paladin BP, then you can get HoFi much faster. Just a reminder that you still need to get the DLC gears from supply.
            </p>

          <p class="mt-6 text-sm sm:text-base">
              <strong class="text-amber-400">Competitive Players on DLC Gears</strong><br/> You can try to get it if you can afford it, especially for Vita or BFD support. HoOrigin support is more of a bonus. As DPS, HoFi DPS is still used at least once every patch in Abyss.
          </p>

          <p class="mt-6 text-sm sm:text-base">
            <strong class="text-amber-400">For Super Whales</strong><br/> Waxing Moon pistol synergy (duplicates) gives global ATK (Syn1 +10 ATK, Syn2 +5 ATK, Syn3 +5 ATK).
        </p>

        <p class="mt-6 text-sm sm:text-base">
          <strong class="text-amber-400">Original Gears</strong><br/> They are available in BP, but no reason to get them now.
      </p>

          <div class="divider  "></div>
          <!-- How to Get Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">HOW TO GET</h2>
          <ul class="list-disc ml-6 text-sm sm:text-base ">
              <li ><strong>HoFi:</strong> Battle Pass, ADV Supply.</li>
              <li><strong>Waxing Moon:</strong> Equipment Supply.</li>
              <li><strong>Iskandar Stigma:</strong> Equipment Supply, Forgeable.</li>

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
                  src="https://www.youtube.com/embed/XSTXBo_loCM"
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
    {#if currentPage === 1}
    <Hofidps />

    <div class="divider  "></div>

    <Hoodps />

    <div class="divider  "></div>


    <Vitadps />
    {/if}

    {#if currentPage === 2}
    <div class="divider divider-accent text-xl custom-font tracking-wider text-teal-300"> World Star Support </div>

    <Sparkledps firstCharName="Kiana"/>

    <div class="divider  "></div>

    <Simpdps firstCharName="Kiana"/>

    <div class="divider  "></div>

    <Senadps firstCharName="Kiana"/>

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


              <h2 class="text-xl font-semibold text-center  text-yellow-400 mt-4">BEST FOR DPS AND SUPPORT</h2>

              <div class="flex flex-col justify-center items-center">
                  
              <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/09/06/50494840/9b7903168970d5776986761551f4eb0b_1448098610288260173.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>


                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                    <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/09/06/50494840/7738cc815ca740d1a2dd9c3589eb6ae7_279751038084009354.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/09/06/50494840/4e646fd8cd717e25c93be66912a3ec10_6964676481641277055.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                    <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/09/06/50494840/e28b50d8a395f368bd811f51d2d008f7_7016861296820168113.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                </div>
              </div>  
              <h4 class="text-base sm:text-base text-white"> Waxing Moon + Iskandar Set</h4>
              </div>

              <div class="p-4 mt-4 bg-linear-to-r from-cyan-950/75 to-cyan-900/75 rounded-sm" >
              <p class="text-sm sm:text-base text-left"></p>
                  <b>Waxing Moon: </b>  A must-have for HoFi: Huge dmg buff with important utilties:
                  <div class="mx-2 mb-3 text-sm sm:text-base">
1. Enables Astral Ring system for HoFi. HoFi gains AR Rite of Oblivion, as well as Omniscient Star (RoOblivion) and Domain Resonance (WorldStar) traits.<br/>
2. Similar to Domain of Genesis, Waxing Moon allows HoFi to quickly gain Descent points, massively improves rotation.<br/>
3. Gives access to a new, stronger, cooler Ultimate.<br/>
4. Synergy (duplicates) gives global ATK (Syn1 +10 ATK, Syn2 +5 ATK, Syn3 +5 ATK).
</div>

<p class="text-sm sm:text-base text-left mt-8"></p>
<b>Iskandar: </b>   Has DPS and support buffs. Requires Waxing Moon to activate most of the effects.
<div class="mx-2 mb-3 text-sm sm:text-base">

  1. Q: Can I use Iskandar on other valks or HoFi with Domain of Genesis? A: No, the stigma effects specifically require HoFi with Waxing Moon.<br/>
  2. SP Regen: Iskandar only gives sp regen after you use Ult (20 sp) and after activating Stellar Outburst (10 sp), while Kiana Kaslana stigma gives 16 sp during rotation.<br/>
  3. Affix: Full ATK

  </div>              
              </div>

              <div class="divider  "></div>

              <h2 class="text-xl font-semibold text-center  text-gray-400">OLD EQUIPMENT</h2>

              <div class="flex flex-col justify-center items-center">
                  
              <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2023/01/06/50494840/a63431d7842a1c32d9afb0afd890e40c_2891212680813816314.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2023/01/14/50494840/4cd25fc449f3ea637f4b88535f416171_4803528014557789900.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2023/01/14/50494840/c565c6f605f34ee2277a95fb4866b1e7_1122606044813520906.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://uploadstatic.mihoyo.com/bh3-wiki/2023/01/14/50494840/ba17e49a200f32b603e39e144a1d95c8_3223055669023052157.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

              </div>  
              <h4 class="text-base sm:text-base text-white"> Domain of Genesis + Kiana Kaslana Set</h4>
              </div>

              <div class="py-2 px-4 mt-2 bg-linear-to-r from-cyan-950/75 to-cyan-900/75 rounded-sm" >
                <p class="text-sm sm:text-base text-left">
                    <li class="text-sm sm:text-base mt-2">Old equipment. As DPS, you can use Kiana Kaslana with Waxing Moon pistol, but there is no reason to, because it's just worse than Iskandar.</li>
                    <li class="text-sm sm:text-base mt-2"><b>Affix: </b> Full ATK.</li>
                </p>

                </div>


                <div class="divider  "></div>

                <div class="m-0 flex justify-center items-center py-1">
                  <img src="/images/dmg copy.png" alt="dmg comparison">
                </div>

           </div>
      {/if}

      {#if selectedTab === 'Support Buffs'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">SUPPORT BUFFS</h2>

      <div class="flex flex-wrap gap-4 my-8">
        <!-- Example image list for support buffs; add your own image sources -->
        <img
          src="/images/valkbuff/buff_hofi.png"
          alt="Buff 1"
          class=" object-cover cursor-pointer"
          on:click={() => openLightbox('/images/valkbuff/buff_hofi.png')}
        />

        <img
        src="/images/valkbuff/buff_hofi2.png"
        alt="Buff 1"
        class=" object-cover cursor-pointer"
        on:click={() => openLightbox('/images/valkbuff/buff_hofi2.png')}
      />

      </div>
      


      <div class="my-5 text-sm sm:text-base text-slate-100 space-y-4">
        <p class="mb-4 font-semibold">How to activate Herrscher of Finality support buffs:</p>
        
          <div>
            <p class="font-semibold text-orange-300  mt-6">Stellar Drain</p>
            <p>Combo ATK consumes Stellar Drain.</p>
          </div>

          <div>
            <p class="font-semibold text-orange-300 mt-6">Weapon Skill - Cast</p>
            <p>Activates Iskandar stigma effect [Moonrising] for 25s. This is also activated / refreshed during Stellar Outburst. </p>
          </div>

          <div>
            <p class="font-semibold text-orange-300  mt-6">Weapon Skill - On Hit</p>
            <p>When weapon skill hits, team Total DMG +10% for 25s. This is also activated / refreshed during Stellar Outburst. </p>
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
            COMBO ATK
          </button>
        
          <button
            on:click={() => setPlaystyle('2')}
            class={`btn px-4 py-2 font-semibold rounded-sm ${activePlaystyle === '2' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-linear-to-r from-orange-600 to-amber-500 hover:text-white'}`}
          >
            ULTIMATE
          </button>
        </div>
      
        {#if activePlaystyle === '1'}
        <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">Combo ATK Playstyle</h2> 
        <p class="text-sm sm:text-base text-center sm:text-left">
          Combo ATK spam. This playstyle works with both Domain of Genesis and Waxing Moon weapons.
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
              <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Condescension + High Flames </p>
              <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Clarity</p>
            </div>
          </div>
          
        </div>
        <div class="p-2 mt-3 rounded-sm" >
          <p class="text-sm sm:text-base text-left">
              <li class="text-sm sm:text-base"> ER Lite mode: Equip Because of You sigil and get all three Ego signets on Floor 7.</li>
              <li class="text-sm sm:text-base"> Normal mode: Get both Condescension + High Flames as early as you can. Condescension enables the rotation, High Flames is where all the damage is at. You can get both Ego signets at the start by using Thorny Crown sigil, OR by resetting Floor 1 until you get another Ego portal, OR use Because of You support sigil and get the other two Ego signets on Floor 7.</li>
          </p>
          </div>

          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            <!-- First Signet with 'Start' text -->
            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
              <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
              <img src="/images/signets/Signets of Decimation (Kalpas).png" alt="Signet 4" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold ">1</p>
              </div>

            <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Gold (Eden).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>
          
              <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Helix (Vill-V).png" alt="Signet 5" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>

              <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Vicissitude (Hua).png" alt="Signet 4" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">2</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
                <img src="/images/signets/Signets of Reverie (Pardofelis).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold">1</p>
              </div>

          </div>
          <div class="p-2 mt-3 rounded-sm" >
            <p class="text-sm sm:text-base text-left">
                <b>Decimation: </b> Nexus 1 is stronger but - [1] Requires you to spam Blood Rose hp reduction, and [2] If battle takes too long, you will recover too much HP.
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
          <li>Activate Stellar Outburst.</li>
          <li>Hold evasion button to activate Absolute Time Fracture (ATF).</li>
          <li>During ATF, Basic ATK until meter depletes, you will auto-cast Combo ATK.</li>
          <li>Press weapon ➔ Combo ATK ➔ Repeat </li>
          <li>When you can activate Stellar Outburst and enter ATF again, go back to step 1.</li>
        </ol>

        <p class="mt-2 text-sm sm:text-base pb-4 text-center">
            Check out this showcase (Soon)
        </p>

        {/if}

        {#if activePlaystyle === '2'}
        <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">Ultimate Playstyle</h2> 
        <p class="text-sm sm:text-base text-center sm:text-left">
          Ultimate deals big damage, but you still rely on Basic ATK and Combo ATK to gain stacks and deal damage.

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
              <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Rift + Final Moon</p>
              <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b>  Clarity</p>
            </div>
          </div>
        </div>
        <div class="p-2 mt-3 rounded-sm" >
          <p class="text-sm sm:text-base text-left">
              <li class="text-sm sm:text-base"> ER Lite mode: Equip Because of You sigil and get all three Ego signets on Floor 7.</li>
              <li class="text-sm sm:text-base"> Normal mode: Get both Rift + Final Moon as early as you can. You can get both Ego signets at the start by using Thorny Crown sigil, OR by resetting Floor 1 until you get another Ego portal, OR use Because of You support sigil and get the other two Ego signets on Floor 7.</li>
          </p>
          </div>
          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">


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
            


          </div>

          
          <div class="divider  "></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">HOW TO PLAY</h2>

          <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>To Be Added</li>
        </ol>

        <p class="mt-2 text-sm sm:text-base pb-4 text-center">
          Check out this showcase (Soon)
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
              <li>S1 increases independent multiplier +3%</li>
              <li>S2 and SS2 give more Elemental Breach.</li>
              <li>S2 and SS1 give more sp.</li>
              <li>All ranks have dps upgrades. </li>
            </ul>
          </div>
      
          <!-- Support Upgrade Box -->
          <div class="flex-1 p-2 bg-gray-800 rounded-lg shadow-md border border-yellow-400">
            <h3 class="text-lg font-semibold text-yellow-400 mb-2">Support Upgrade</h3>
            <ul class=" text-slate-100 text-base">
              <li>SS1: Enemies take 6.9% ➔ 8% more Total DMG </li>
              <li>SSS: Enemies take 5.20% more Total DMG from Mei valks and HoFi.</li>
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
                  Enemies take 17% ➔ 20% more Fire DMG from HoFi (independent multiplier)	
                </td>
                <td class="p-3">DPS</td>
              </tr>
              <!-- Sample Row 2 -->
              <tr>
                <td>S2</td>
                <td>

                  1. Time Flint: When Combo ATK hits, enemies take 30% ➔ 35% more Fire DMG for 15s. Moon Blade: When Combo ATK hits, recover 12 ➔ 16 sp.<br/>
                  2. Gaining Descent stack grants Elemental Breach +1.65% ➔ +1.95% for 20s, max 8 stacks (+13.2% ➔ +15.6%).

                </td>
                <td>DPS<br/>SP Regen</td>
              </tr>
              <tr>
                <td>S3</td>
                <td>
                  Leader Skill: Team Elemental DMG +35% ➔ 40%. When Mei is on the team, the Mei valk and HoFi gain extra Elemental DMG +35% ➔ 40%.	

                </td>
                <td>DPS</td>
              </tr>
              <tr>
                <td>SS</td>
                <td>
                  1. UNLOCK: Basic ATK and Combo ATK gain Total DMG +20%.<br/>
                  2. Fire DMG +32.5% ➔ 40%. During Absolute Time Fracture, Fire DMG +32.5% ➔ 40%.
                  <br/>
                </td>
                <td>DPS</td>
              </tr>
              <tr>
                <td>SS1</td>
                <td>
                  	
When HoFi's entry via HoTr's Joint Bursting hits, enemies take 6.9% ➔ 8% more Total DMG for 15s.<br/>
When HoFi's entry via HoO's Joint Bursting hits, HoFi recovers 13 ➔ 16 sp.<br/>
After entry via Joint Bursting, HoFi gains Total DMG +13.1% ➔ 15% for 10s.

                </td>
                <td>DPS<br/>HoO Support<br/>SP Regen
              </tr>
              <tr>
                <td>SS2</td>
                <td>
                  Gaining Descent stack grants Elemental Breach +1.95% ➔ +2.25% for 20s, max 8 stacks (+15.6% ➔ +17.76%).                </td>
                <td>DPS
              </tr>
              <tr>
                <td>SS3</td>
                <td>
                  Leader Skill:Team Elemental DMG +40% ➔ 45%. When Mei is on the team, the Mei valk and HoFi gain extra Elemental DMG +40% ➔ 45%.               
                </td>
                <td>DPS
              </tr>
              <tr>
                <td>SSS</td>
                <td>
                  Total DMG +10%. Enemies take 5.20% more Total DMG from Mei valks and HoFi.	
                </td>
                <td>DPS<br/>HoO Support
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
              <p>Enemies take 17% ➔ 20% more Fire DMG from HoFi (independent multiplier)	
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
              <p>1. Time Flint: When Combo ATK hits, enemies take 30% ➔ 35% more Fire DMG for 15s. Moon Blade: When Combo ATK hits, recover 12 ➔ 16 sp.<br/>
                2. Gaining Descent stack grants Elemental Breach +1.65% ➔ +1.95% for 20s, max 8 stacks (+13.2% ➔ +15.6%).
              </p>
              <p class="mt-2"><strong>Good for:</strong> DPS, SP Regen</p>
            </div>
          </div>

        

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(3)}>
            <span>S3</span>
            <span class="text-md">{openItem === 3 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 3 ? 'open' : ''}">
            <p>Leader Skill: Team Elemental DMG +35% ➔ 40%. When Mei is on the team, the Mei valk and HoFi gain extra Elemental DMG +35% ➔ 40%.
            </p>
            <p class="mt-2"><strong>Good for:</strong> DPS            </p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(4)}>
            <span>SS</span>
            <span class="text-md">{openItem === 4 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 4 ? 'open' : ''}">
            <p>	1. UNLOCK: Basic ATK and Combo ATK gain Total DMG +20%. <br/>
              2. Fire DMG +32.5% ➔ 40%. During Absolute Time Fracture, Fire DMG +32.5% ➔ 40%.
            </p>
            <p class="mt-2"><strong>Good for:</strong> DPS</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(5)}>
            <span>SS1</span>
            <span class="text-md">{openItem === 5 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 5 ? 'open' : ''}">
            <p>- When HoFi's entry via HoTr's Joint Bursting hits, enemies take 6.9% ➔ 8% more Total DMG for 15s. <br/>
              - When HoFi's entry via HoO's Joint Bursting hits, HoFi recovers 13 ➔ 16 sp. <br/>
              - After entry via Joint Bursting, HoFi gains Total DMG +13.1% ➔ 15% for 10s.

            </p>
            <p class="mt-2"><strong>Good for:</strong> DPS, HoO Support, SP Regen</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(6)}>
            <span>SS2</span>
            <span class="text-md">{openItem === 6 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 6 ? 'open' : ''}">
            <p>	Gaining Descent stack grants Elemental Breach +1.95% ➔ +2.25% for 20s, max 8 stacks (+15.6% ➔ +17.76%).</p>
            <p class="mt-2"><strong>Good for:</strong> DPS</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(7)}>
            <span>SS3</span>
            <span class="text-md">{openItem === 7 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 7 ? 'open' : ''}">
            <p>Leader Skill:Team Elemental DMG +40% ➔ 45%. When Mei is on the team, the Mei valk and HoFi gain extra Elemental DMG +40% ➔ 45%.</p>
            <p class="mt-2"><strong>Good for:</strong> DPS</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(8)}>
            <span>SSS</span>
            <span class="text-md">{openItem === 8 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 8 ? 'open' : ''}">
            <p>	Total DMG +10%. Enemies take 5.20% more Total DMG from Mei valks and HoFi.	</p>
            <p class="mt-2"><strong>Good for:</strong> DPS, HoO Support
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
            <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">HoFi DPS</h2>

            <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">HoFi DPS Rotation in Trio Team. Starts at 1:18</p>

            <div class="relative overflow-hidden" style="padding-top: 56.25%;">
              <iframe
                  class="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/XSTXBo_loCM"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen>
              </iframe>
          </div>
        </div>

      </div>

      <div class=" gap-6 mt-4">
        <!-- Video 1 with title and description -->
        <div class="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">HoFi World Star Support</h2>

          <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">This shows HoFi in Sparkle rotation.</p>

          <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/8vgWi3yzXn0"
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
        <!-- Video 1 with title and description -->

      
        <div class="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">HoFi DPS</h2>

          <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">VS Stellar Assaka</p>

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
      <!-- Video 1 with title and description -->

    
      <div class="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">HoFi Supporting Senadina Team</h2>

        <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base"> VS Stellar Assaka</p>

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
          <div class="chat-bubble chat-bubble-primary text-base ">Can I use Iskandar on other valks or HoFi with Domain of Genesis?</div>
        </div>

        <div class="chat chat-end">
          <div class="chat-image avatar">
            <div class="w-10 sm:w-12 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="/images/ds.webp" />
            </div>
          </div>
          <div class="chat-bubble chat-bubble-neutral text-slate-100">No, the stigma effects specifically require HoFi with Waxing Moon (Omniscient Star tag).</div>
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


      {#if selectedTab === 'TL Error'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">TRANSLATION ERROR</h2>
      
      <div class="flex flex-col justify-center items-center">
          
        <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">

            <div class="w-20 h-20 sm:w-28 sm:h-28">
                <img src="/images/valkportrait/Kiana Herrscher of Finality.png" alt="Vita" class="w-full h-full object-cover">
            </div>

        </div>  
        <p class="text-sm sm:text-base text-white">HoFi AR Subskill 2: Judgment of Flame</p>

    </div>

    <div class="text-center my-4 rounded-sm bg-gray-700">
      <p class="text-left text-sm sm:text-base px-2 py-3">
        <b>In-Game Text:</b><br/>
        All team members deal 20% more Elemental DMG
      </p>
    </div>

    <div class="text-center my-4 rounded-sm bg-cyan-700">
      <p class="text-left text-sm sm:text-base px-2 py-3 text-slate-100">
        <b>Correct Translation:</b><br/>
        All team members' weapon skill deal 20% more Elemental DMG
      </p>
    </div>
      
      <div class="flex flex-col justify-center items-center">
          
          <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">

              <div class="w-20 h-20 sm:w-28 sm:h-28">
                  <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/09/06/50494840/9b7903168970d5776986761551f4eb0b_1448098610288260173.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
              </div>

          </div>  
          <p class="text-sm sm:text-base text-white">Waxing Moon</p>

      </div>

      <div class="text-center my-4 rounded-sm bg-gray-700">
        <p class="text-left text-sm sm:text-base px-2 py-3">
          <b>In-Game Text:</b><br/>
          All team members deal 25% more Elemental DMG and 20% more Physical DMG.
        </p>
      </div>

      <div class="text-center my-4 rounded-sm bg-cyan-700">
        <p class="text-left text-sm sm:text-base px-2 py-3 text-slate-100">
          <b>Correct Translation:</b><br/>
          Teammates deal 25% more Elemental DMG and 20% more Physical DMG.
        </p>
      </div>


      {/if}


  </div>

</section>


</div>

</section>


</div>

