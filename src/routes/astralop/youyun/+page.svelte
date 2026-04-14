<svelte:head>
  <title>Youyun</title> 

    <meta property="og:title" content="Youyun" />
    <meta property="og:description" content="Youyun Guides, Builds and Gameplay" />
    <meta property="og:image" content="https://i.imgur.com/fZa0crZ.png" />
    <meta property="og:url" content="https://marisaimpact.com/astralop/youyun" />
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




    import likesData from '$lib/data/likes.json'; // Import local JSON data

  import { goto } from '$app/navigation';
  import Lightbox from "$lib/components/lightbox.svelte";
	import Heliadps from "$lib/components/lineup/heliadps.svelte";
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
import { faCircleUser , faUsers , faBook , faVideo , faHome , faBolt ,faComments  ,faStar , faFire} from '@fortawesome/free-solid-svg-icons';
	import CharBio from '$lib/components/CharBio.svelte';
	import Dududps from "$lib/components/lineup/dududps.svelte";
	import Badumdps from "$lib/components/lineup/badumdps.svelte";
	import Psdps from "$lib/components/lineup/psdps.svelte";
	import Coraliedps from "$lib/components/lineup/coraliedps.svelte";
	import Vitadps from "$lib/components/lineup/vitadps.svelte";
	import Newelydps from "$lib/components/lineup/hilovedps.svelte";
	import CharacterLayout from "$lib/components/valkpage/CharacterLayout.svelte";
	import Horbdps from "$lib/components/lineup/horbdps.svelte";
	import Sparkledps from "$lib/components/lineup/sparkledps.svelte";
	import Simpdps from "$lib/components/lineup/simpdps.svelte";
	import Senadps from "$lib/components/lineup/senadps.svelte";
	import Horbdlcdps from "$lib/components/lineup/horbdlcdps.svelte";
	import Hilovedps from "$lib/components/lineup/hilovedps.svelte";
	import Hohdps from "$lib/components/lineup/hohdps.svelte";
	import Jddps from "$lib/components/lineup/jddps.svelte";
	import Lanterndps from "$lib/components/lineup/lanterndps.svelte";
	import Thelemadps from "$lib/components/lineup/thelemadps.svelte";
	import Agentritadps from "$lib/components/lineup/agentritadps.svelte";
	import Xentineldps from "$lib/components/lineup/xentineldps.svelte";
	import Lunadlcdps from "$lib/components/lineup/lunadlcdps.svelte";
	import Hofidps from "$lib/components/lineup/hofidps.svelte";
	import Swdlcdps from "$lib/components/lineup/swdlcdps.svelte";

  let selectedTab = 'Overview'; // Default tab
  const tabs = [
  { name: 'Overview', short: 'overview', icon: faHome },
 // { name: 'Skills', short: 'support', icon: faCircleUser },
  { name: 'Lineup', short: 'lineup', icon: faUsers },
 // { name: 'Translation Error', short: 'translation' },
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
  let durandallikes = likesData["newmei"] || 0; // Get initial likes from JSON
  const charName = "newmei"; // Route name for this character
  let hasLiked = false; // Track if the user has liked
  let voterId = ""; // User's unique voter ID

  // Generate or fetch the voterId on component mount
  onMount(async () => {
  voterId = localStorage.getItem("voterId") || crypto.randomUUID(); // Generate a voter ID if not present
  localStorage.setItem("voterId", voterId); // Save voter ID in localStorage

  // Check Firebase if the user has already liked this character
  const userHasLiked = await hasUserLiked(charName, voterId);

  if (userHasLiked) {
    hasLiked = true; // Update state to disable the button
    localStorage.setItem(`liked_${charName}`, "true"); // Persist locally
  }
});
// Handle Like Button Click
async function increaseLike() {
  try {
    if (hasLiked) {
      console.log("User has already liked this character.");
      return;
    }

    durandallikes++; // Increment the local counter for display purposes

    // Call likeWithVoterId to send the like to Firebase
    await likeWithVoterId(charName, voterId);

    // Update local state to prevent multiple likes
    hasLiked = true;
    localStorage.setItem(`liked_${charName}`, "true"); // Persist locally
    console.log(`Successfully liked "${charName}".`);
  } catch (error) {
    
    durandallikes--; // Revert the local counter in case of an error
    console.error("Error liking the character:", error);
  }
}
</script>


<style>
  #star-container {
    background: radial-gradient(rgb(var(--light-pink-rgb)), rgb(var(--dark-pink-rgb)));
    height: 100%;  
    overflow: hidden;
    position: relative;
  }

  #star-gradient-overlay {
    background: radial-gradient(circle, transparent 75%, rgb(var(--dark-pink-rgb)));
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100%;
    height: 100%;
    opacity: 0.9;
    z-index: 2;
  }

  #app {
  height: 36rem;
  overflow: hidden;
  position: relative;
}
</style>

<section class="relative mx-auto flex flex-row items-center justify-center px-4 md:p-2 gap-3 md:pb-0  md:mt-0  pt-2	sm:pt-0 ">

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
  charName="youyun"
  initialLikes={likesData["youyun"] || 0}
  accent="bg-pink-800"
  image="/images/valkfull/youyun.png"
  alt="Youyun"

  valk="false"

  titleEN="Youyun"
  titleCN="游云"

  nameEN="Bailu Youyun"
  nameCN="白鹿游云"

  releaseEN="v8.8 (30 Apr 2026)"
  releaseCN="v8.8 (2 Apr 2026)"  

>
  <CharBio mode="support" ar={['ws' , 'wod' ]} bg="bg-pink-800" />
</CharacterLayout>




</section>

<div class="flex max-w-(--breakpoint-xl) justify-center mx-auto sm:mt-8"> 


  <aside class="w-full sm:max-w-[10rem] md:max-w-[12rem] hidden sm:block p-4  text-gray-200 sticky top-16 h-[calc(100vh-4rem)] " >

    <ul class="space-y-2">
      {#each tabs as tab}
        <li>
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

      <div>
          <!-- Roles Section -->
          <h2 class="text-xl  font-semibold mb-2 text-left cooltext text-slate-100">ROLES</h2>
          
     
          
          
            <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">World Star Support</strong>
            </p>   
          <ul class="list-disc ml-6 text-sm sm:text-base">
                <li>Youyun is the new best Astral Op for World Star teams.</li>
                <li>Youyun can trigger Resonance 1-3 more times.</li>
                <li>Youyun is really broken for DPS that utilize Stellar Surplus mechanic  - the buff is huge in Surplus state. Currently, only Silverwing DLC has Stellar Surplus.</li>
                <li>For characters that do not have a skill that ends SO early, SS-rank Youyun now enables these characters to end SO early when they cast Ult.</li>
                <li>Provides initial ar, surplus max limit +50%, SO cd reduction, and recover ar during SO.</li>

          </ul> 

          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">Wheel of Destiny Support </strong> 
          </p>
          <ul class="list-disc ml-6 text-sm sm:text-base">
                <li>Youyun is the best Astral Op for WoD DPS that utilize Stellar Surplus mechanic. Currently, only Miss Espionage has Stellar Surplus.</li>
                <li>For non-Surplus DPS, Youyun is still very good, but <a class="link" href="/astralop/serapeum">Serapeum</a> is better. Youyun gives more dmg during AC, but less dmg during SO. Youyun also gives less initial AR and post-so AR.</li>
                <li>Provides initial ar, SO cd reduction, and recover ar during SO.</li>

          </ul>   

          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">Other AR</strong> 
              <br/>
              Youyun gives zero buffs during Stellar Outburst. She is worse than Dreamseeker.
          </p>


          <div class="divider  "></div>
          <!-- Pull Recommendation Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">PULL RECOMMENDATION</h2>

          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">F2P</strong> 
          </p>
          <ul class="list-disc ml-6 text-sm sm:text-base">
                <li>Dreamseeker / Songque is enough. </li>
                <li>In 8.8, there's no new valk - getting Silverwing DLC + Youyon asop is a good combo deal if you can afford it. Additionally, 8.9 valk is Seele, which is 99% gonna be World Star too.</li>



          </ul>           

          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">Spenders</strong> <br/>  
          </p>
          <ul class="list-disc ml-6 text-sm sm:text-base">
                <li>S-rank is enough for Red Lotus. </li>
                <li>SS-rank is the optimal rank. SS gives 90 initial sp, allowing valks to get Stellar Surplus very fast. SS also enables valks like Sparkle and SIMP to end Stellar Outburst early.</li>
                <li>SSS-rank gives more ar regen and makes enemies take more dmg during Surplus state.</li>



          </ul> 

          <div class="divider  "></div>
          <!-- How to Get Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">HOW TO GET</h2>
          <p class="mt-4 text-sm sm:text-base">
               AstralOp Supply
          </p>


      </div>

  {/if}
  

  {#if selectedTab === 'Lineup'}
  <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">LINEUP</h2>

  <section class="max-w-(--breakpoint-lg) mx-auto ">
  
<div class="w-full max-w-4xl mx-auto my-6">
  <div class="grid grid-cols-2 gap-3">
    
    <!-- Tab -->
    <button
        class="py-2 px-4  rounded btn
                {activeLineup === '1' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'}"
      on:click={() => setLineup('1')}
    >
      WORLD STAR
    </button>

    <!-- Tab -->
    <button
        class="py-2 px-4  rounded btn
                {activeLineup === '2' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'}"
      on:click={() => setLineup('2')}
    >
      WHEEL OF DESTINY
    </button>


  </div>
</div>


      {#if activeLineup === '1'}

      <Swdlcdps></Swdlcdps>

      <div class="divider"></div>

      <Horbdlcdps></Horbdlcdps>

      <div class="divider"></div>

      <Sparkledps></Sparkledps>

      <div class="divider"></div>
       
      <Simpdps></Simpdps>

      <div class="divider"></div>

      <Senadps></Senadps>
      {/if}



      {#if activeLineup === '2'}
      
      <Agentritadps></Agentritadps>

      <div class="divider"></div>

      <Hohdps></Hohdps>

      <div class="divider"></div>

      <Jddps></Jddps>

      <div class="divider"></div>

      <Lanterndps></Lanterndps>

      <div class="divider"></div>

      <Thelemadps></Thelemadps>

      {/if}


</section>

  {/if}


      {#if selectedTab === 'Skills'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-4 text-center">SKILLS</h2>

      <div>
          <!-- Roles Section -->
          <h2 class="text-xl  font-semibold mb-2 text-left cooltext text-slate-100">ASSIST SKILL</h2>
          
     
          <ul class="list-disc ml-6 text-sm sm:text-base">
                <li class="mb-2">Casts Synergy Attack, attracts nearby targets, and deals 2,500% ATK of Fire DMG to them. When both Planar Armament: Warped Spacetime and Behold! Fate-Defying Dragon are in the team, Synergy Attack deals an additional 1,200% ATK of Fire DMG.</li>
                <li class="mb-2">Chenxue deals 130% more Fire DMG. </li>
                <li class="mb-2"><strong class="text-amber-400">[SS]</strong> Chenxue's Total DMG increases by 125%. When Grail of Infinitude activates, activating Stellar Outburst restores 200 SP.</li>
                <li class="mb-2"><strong class="text-amber-400">[SSS]</strong> Chenxue's ATK increases by 120%.</li>
          </ul> 

          <div class="divider  "></div>
          <!-- Pull Recommendation Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">RECHARGE SKILL</h2>

          <ul class="list-disc ml-6 text-sm sm:text-base">
                <li class="mb-2">In Astral Ring Charging state, if the character lands an attack, all team members gain Intensity Recovery state for 1s, which restores 1 Astral Ring Intensity per 0.5s. Start a battle with 50 more initial Astral Ring Intensity, which applies once every 10 min in Part 2's Open World and shares a CD with other AstralOps.</li>
                <li class="mb-2">[Team-triggered] For each team member with the Grail of Infinitude or Rite of Oblivion Specialization, initial Astral Ring Intensity increases by 11. For each team member with the Symbiosis or Omniscient Star trait, initial Astral Ring Intensity increases by 8. Each character is counted only once. </li>
                <li class="mb-2"><strong class="text-amber-400">[SS]</strong> Reduces Stellar Outburst's CD by 4s (exclusive; highest value of the same effect takes priority).
With Grail of Infinitude activated: after enabling Stellar Outburst, when the character uses Ultimate, gains 10 Astral Ring Intensity (CD: 12s; calculated independently for each character; can trigger up to 3 times for a team, and the trigger count is reset after enabling Stellar Outburst).
With Rite of Oblivion activated: When Stellar Outburst ends, restores 36 Astral Ring Intensity.</li>
                <li class="mb-2"><strong class="text-amber-400">[SSS]</strong> With Rite of Oblivion or Grail of Infinitude activated: After exiting Stellar Outburst state, reduces Astral Ring CD by 40% of the remaining Astral Ring duration, reducing up to 4.5s.</li>
          </ul> 

          <div class="divider  "></div>
          <!-- Pull Recommendation Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">PASSIVE SKILL</h2>

          <ul class="list-disc ml-6 text-sm sm:text-base">
                <li class="mb-2">During Astral Ring Charging, enemies on the field take 8% more Elemental DMG and 5% more Physical DMG. During Stellar Outburst, enemies on the field take 22% more Elemental DMG and 12% more Physical DMG.</li>

                <li class="mb-2">With Grail of Infinitude activated:</li>
                <ul class="list-disc ml-6 text-sm sm:text-base">

                    <li class="mb-2">When entering and exiting Stellar Outburst state, reduces all team members' Ultimate CD by 8s, and refreshes and triggers teammates' QTE.</li>
                    <li class="mb-2">During Stellar Outburst state, gain additional 300 Shining Trace and 120 SP for using Ultimate for the first time.</li>
                    <li class="mb-2">All team members deal 4% more Total DMG, 4% more Elemental DMG, 4% more Physical DMG, and gain 27% Crit Rate.</li>
                
                </ul>

                <li class="mb-2">With Rite of Oblivion activated:</li>
                <ul class="list-disc ml-6 text-sm sm:text-base">

                    <li class="mb-2">All team members deal 8% more Total DMG, 18% more Elemental DMG, 8% more Physical DMG, and gain 27% Crit Rate.</li>
                    <li class="mb-2">During Stellar Outburst state, all team members deal 6% more Lightning DMG.</li>
                
                </ul>


                <li class="mb-2">Reduces Total DMG taken by all team members by 20%, and restores 600 HP to the character for using Ultimate (CD: 12s; calculated independently for each character).</li>
                <li class="mb-2"><strong class="text-amber-400">[SS]</strong> [Team-triggered] For each team member with the Symbiosis or Omniscient Star trait, enemies take 1.5% more Total DMG.</li>
                <li class="mb-2"><strong class="text-amber-400">[SSS]</strong> Enemies on the field take 6% more Total DMG from Ultimate.</li>
          </ul> 

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

