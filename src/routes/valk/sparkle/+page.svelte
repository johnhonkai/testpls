<svelte:head>
  <title>Sparkle - Thousand-Faced Maestro: Cameo!</title> 

    <meta property="og:title" content="Sparkle - Thousand-Faced Maestro: Cameo!" />
    <meta property="og:description" content="Sparkle Guides, Builds and Gameplay" />
    <meta property="og:image" content="https://i.imgur.com/tWNhY33.png" />
    <meta property="og:url" content="https://marisaimpact.com/valk/sparkle" />
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


  import SimpDPS from '$lib/components/lineup/simpdps.svelte';
  import SenaDPS from '$lib/components/lineup/senadps.svelte';
import Lightbox from '$lib/components/lightbox.svelte';
	import Sparkledps from '$lib/components/lineup/sparkledps.svelte';
	import Fovdps from '$lib/components/lineup/fovdps.svelte';
	import P1fire from '$lib/components/lineup/p1fire.svelte';
	import Sirindps from '$lib/components/lineup/sirindps.svelte';
	import Dududps from '$lib/components/lineup/dududps.svelte';
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
  let sparklelikes = likesData["sparkle"] || 0; // Get initial likes from JSON
  const charName = "sparkle"; // Route name for this character
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

    sparklelikes++;

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

<section class="relative mx-auto flex flex-row items-center justify-center px-4 md:p-2 gap-3 md:pb-0  md:mt-0  pt-8	sm:pt-0">
<div class="absolute   top-[-3.5rem] w-full h-[90vh] z-[-10] opacity-85 " id="bgwavebox">    
  <img src="https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/valkbg/wave_sparkle2.svg" alt="Lone Planetfarer" class="w-full h-full object-cover overflow-hidden "  /> 
</div>


<div class="fixed  h-1/2 w-1/2 top-[-5vh] right-[-20vw]  z-[-8] hidden sm:block " id="avabox"> 
  <img src="https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/valkbg/ava_sparkle.webp" alt="Lone Planetfarer" class=" object-contain slide-in-pls" /> 
</div>

<!-- Left: Character Image -->
<div class="relative  w-auto h-48 sm:h-60 md:h-72 flex justify-center " id="valkpicbox">
  <!-- Image for Larger Screens -->
  <img src="https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/valkfull/sparkle.webp" alt="Sparkle" class="h-full w-auto object-cover md:object-contain  " style ="view-transition-name: valkyrie-image-14;"/> 

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
      <span class="text-white font-semibold">{sparklelikes}</span>
    </button>
  </div>
</div>

<!-- Right: Character Info (Centered) -->
<div class="flex flex-col items-center text-center justify-start">
  <!-- Battlesuit Name -->
  <h1 class="text-xl md:text-2xl text-slate-100 font-bold text-center leading-4 mb-4 sm:mb-0">Thousand-Faced Maestro: Cameo!</h1>

  <!-- Character Name and Release Date -->
  <p class="text-base md:text-md custom-font mb-2 text-center tracking-wider md:block hidden text-slate-100">Sparkle | Release Date: v7.9 (28 Nov 2024)</p>

  <!-- Common wrapper to ensure same width -->
  <div class="w-full max-w-sm mb-2">
    <!-- Container with 4 pictures (Centered) -->
    <div class="flex flex-col items-center" id="typebox">
      <div class="flex w-[260px] md:w-[300px] gap-2 flex-wrap justify-center outline outline-rose-500 outline-1 bg-rose-950/75 rounded-lg p-2 backdrop-blur-sm">
        <img src="/images/ranks/Valkyrie_S.webp" alt="S-rank" class="w-auto h-8 md:h-10" />
        <img src="/images/type/IconQUA.png" alt="Mech" class="w-auto h-8 md:h-10" />
        <img src="/images/element/Core_Fire_DMG.png" alt="Icon 3" class="w-auto h-8 md:h-10" />
        <img src="/images/artype/ar world star.png" alt="ar" class="w-auto h-8 md:h-10" />
      </div>
    </div>

    <!-- Support For Container (Centered) -->
    <div class="flex flex-col mt-4 items-center" id="arbox">

      <div class="flex flex-col  w-[260px] md:w-[300px] flex-wrap justify-center outline outline-rose-500 outline-1 bg-rose-950/75 rounded-lg p-2 backdrop-blur-sm">
        <div class="flex flex-wrap justify-center">
          <h2 class="text-base md:text-md custom-font tracking-wider text-slate-100">SUPPORT FOR:</h2>
        </div >
        <div class="flex flex-row gap-2 flex-wrap justify-center">
          <img src="/images/artype/p1fire.png" alt="Support 1" class="w-auto h-8 md:h-10" />
          <img src="/images/artype/ar world star.png" alt="Support 2" class="w-auto h-8 md:h-10" />
          <img src="/images/artype/ar loa.webp" alt="Support 3" class="w-auto h-8 md:h-10" />
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
              <strong class="text-amber-400">DPS</strong> <br/> Sparkle is very underwhelming as a DPS, BUT she has her top scores: Fire Kosma (Best), and Resonance Vita (Second best after SIMP). Just like other Part 2 valks, Sparkle will probably get more top score bosses in future patches.
          </p>
          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">Part 1 Fire Support</strong> <br/> Sparkle is the new best support for Part 1 Fire and Ignite teams, replacing Chrono Navi. Sparkle allows Fenghuang of Vicissitude and Miracle Magical Girl to  <b>USE ULTIMATE TWICE PER ROTATION</b>. Sparkle also provides sp regen, huge Ignite DMG, and extra ignite stacks. 
          </p>
          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">World Star Support</strong> <br/> New best teammate for Schicksal's Imperative against Quantum enemies. Just another buffer for Senadina.
          </p>

          <p class="mt-4 text-sm sm:text-base">
            <strong class="text-amber-400">Future ??? AR Support</strong> <br/> Sparkle will be a support for one AR team in the future.
        </p>

        <p class="mt-4 text-sm sm:text-base">
          <strong class="text-amber-400">Quantum Counter</strong> <br/> Sparkle can insta-kill QUA enemies below 10% HP. Sparkle can be used by any team that requires quantum collapse. Sparkle ult provides two QUA collapses. If she uses her ult on a teammate, the teammate's Ult gains two QUA collapses.
      </p>
          <div class="divider divider-neutral"></div>
          <!-- Pull Recommendation Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">PULL RECOMMENDATION</h2>
          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">New Players</strong> <br/> It is NOT highly recommended to pull Sparkle. Vita [Lone Planetfarer] is available in v7.9 and she is much more valuable for new players. BUT, if you do decide to pull Sparkle, she will have her uses:
            </p>
              <ul class="list-disc ml-6 text-sm sm:text-base mt-3"></ul>
              <li class="mt-2">Sparkle will cover Quantum content, but she won't be a very good dps anywhere else.</li>  
              <li class="mt-2">You have a support for World Star teams. <span class="text-gray-400">(Also covered by Vita) </span></li>
              <li class="mt-2">You have a support for the future ??? AR teams.  <span class="text-gray-400">(Also covered by Vita) </span></li>

          <p class="mt-5 text-sm sm:text-base">
              <strong class="text-amber-400">Existing Players / Competitive</strong> <br/>
          </p>
          Sparkle's value varies. Everyone's account is different.

          <ul class="list-disc ml-6 text-sm sm:text-base">
            <li class="mt-2">As DPS, Sparkle currently only top scores Fire Kosma, and is the second best top scorer for Resonance Vita. Sparkle will probably get more top score bosses in future patches, like most Part 2 valks. </li>
              <li class="mt-2">Sparkle has buffs for Quantum teammates, and this makes Sparkle one of the best teammate for Schicksal's Imperative (SIMP) against Quantum enemies. But SIMP-Vita-Hofi are still good enough to be in top 100 in CN server.</li>
              <li class="mt-2">If you don't have FoV or Sirin, then Sparkle's value for your account diminishes.</li>
              <li class="mt-2">In my opinion, a major deciding factor to pull Sparkle - is what she provides for the new AR. It's better to wait 8.0 Beta info on the new Astral Ring before you pull Sparkle.</li>

          </ul>
          <div class="divider divider-neutral"></div>
          <!-- How to Get Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">HOW TO GET</h2>
          <ul class="list-disc ml-6 text-sm sm:text-base ">
              <li ><strong>Sparkle:</strong> Battlesuit Supply</li>
              <li><strong>Sparkle's Weapon:</strong> Equipment Supply</li>
              <li><strong>Sparkle's Stigma:</strong> Equipment Supply, Forgeable, Free stigma box in 7.9</li>
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
                src="https://www.youtube.com/embed/zig1RAylxV4"
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
      <!-- Category 1: Vita DPS -->

      <Sparkledps maindps={true}/>

      <div class="divider divider-accent text-xl custom-font tracking-wider text-teal-300"> World Star Support </div>
      
      <SimpDPS firstCharName="Sparkle" />

      <div class="divider divider-neutral"></div>

      <SenaDPS firstCharName="Sparkle"  />
      {/if}

      {#if currentPage === 2}
      <div class="divider divider-accent text-xl custom-font tracking-wider text-teal-300 my-10"> Part 1 Fire Support </div>

      <Fovdps></Fovdps>

      <div class="divider divider-neutral"></div>

      <Sirindps></Sirindps>


      <div class="divider divider-neutral"></div>

      <P1fire></P1fire>

      {/if}

      {#if currentPage === 3}
      <div class="divider divider-accent text-xl custom-font tracking-wider text-teal-300 my-10"> Future AR ??? Support </div>

      <Dududps firstCharName ='Sparkle'></Dududps>
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
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/10/19/50494840/1bf1d09cd6de50e1e2e90aa9054c37e2_6487852907325483142.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/10/19/50494840/6627958c8d88e9193711c52f001a7e54_8069092569744474147.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/10/19/50494840/187bd72bed9aad0d3b69418bc5bb6af6_370957180479214717.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/10/19/50494840/98b6c7a1fee9edda66da9588868fae53_6043494433778262778.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

              </div>  
              <h4 class="text-base sm:text-base text-white text-center">Volatile Sparkler + Sparkle: Thousand-Faced Maestro Stigma</h4>
              </div>

              <div class="p-4 mt-4 bg-gradient-to-r from-rose-950/75 to-rose-900/75 rounded">
                <p class="text-sm sm:text-base text-left mb-4">
                  <b>Volatile Sparkler</b><br/> Adds 1.5s timestop to [I am Elation] skill. This is <b>VERY IMPORTANT</b>.
                   It is such a small change to your mechanic, but without this weapon: 
                   <br/>- In Part 1 Fire team, Sirin / FoV's second Ult will miss or barely fit into Herrscher of Truth's breach duration window.
                   <br/>- As Sparkle DPS, in Sparkle Vita HoFi team, you won't be able to perform second Combo ATK and cast [I am Elation] skill before Stellar Outburst ends. <br/>
                  Also adds one more Quantum Collapse to Ult skills (self and teammate).
                </p>
              
                <p class="text-sm sm:text-base text-left mb-4">
                  <b>Sparkle Stigma: </b> Tons of self buffs and support buffs.
                </p>
              
                <p class="text-sm sm:text-base text-left">
                  <b>Affix:</b> Full ATK.
                </p>
              </div>
              

              <div class="divider divider-neutral"></div>

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
                          <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/01/15/73749426/7f0ca6d81d2e7ff8405e13c5a7206a83_4150025281676061990.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                      </div>
  
                  </div>  
                  <p class="text-sm sm:text-base text-white text-center">Red Star Thunderbolt</p>
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
              <div class="p-4 mt-4 bg-gradient-to-r from-gray-800/75 to-gray-700/75 rounded">
                <p class="text-sm sm:text-base text-left ">
                  For Sparkle, these weapons are around equal performance - equally average. As mentioned above, signature weapon Volatile Sparkler gives timestop to  [I am Elation] skill, which prevents you from missing out on important dmg buff duration, and as dps, allows Sparkle to do her full attack sequence before Stellar Outburst ends.
                </p>

              </div>

              <div class="divider divider-neutral"></div>


              <div class="flex items-center justify-center text-orange-300 ">
              <img src="https://i.imgur.com/khNqVAN.png" alt="Icon" class="w-[1000px] h-auto rounded-lg" />
            </div>

            <div class="flex items-center justify-center text-orange-300 ">
              <img src="https://i.imgur.com/GPRAylq.png" alt="Icon" class="w-[1000px] h-auto rounded-lg" />
            </div>

            <div class="flex items-center justify-center text-orange-300 ">
              <img src="https://i.imgur.com/4VQbfyd.png" alt="Icon" class="w-[1000px] h-auto rounded-lg" />
            </div>
      
      
            </div>
      {/if}

      {#if selectedTab === 'Support Buffs'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-gradient-to-r  from-blue-700 to-blue-500 text-white rounded px-2 mb-2 text-center">SUPPORT BUFFS</h2>

      <div class="flex flex-wrap gap-4 mt-8">
        <!-- Example image list for support buffs; add your own image sources -->
        <img
          src="/images/valkbuff/buff_sparkle.webp"
          alt="Buff 1"
          class=" object-cover cursor-pointer"
          on:click={() => openLightbox('/images/valkbuff/buff_sparkle.webp')}
        />
      </div>

      <div class="my-5 text-sm sm:text-base text-slate-100 space-y-4">
        <p class="mb-4 font-semibold">How to activate Sparkle buffs:</p>
        
        <div class="flex items-start gap-4">
          <span class="text-cyan-300 font-bold text-lg">1</span>
          <div>
            <p class="font-semibold text-cyan-300">Stellar Drain:</p>
            <p> Combo ATK / I am Elation consumes Stellar Drain and restores 20 AR.</p>
          </div>
        </div>
      
        <div class="flex items-start gap-4">
          <span class="text-cyan-300 font-bold text-lg">2</span>
          <div>
            <p class="font-semibold text-cyan-300">Ultimate (Part 1 Team):</p>
            <p>
              Ult has all the major buffs: Ignite DMG +25%, 30% more Ignite Trauma, 
              enemies take 65% more Ignite DMG, 30 sp, ult cooldown -5s, next ult cd -6s, ult sp cost reduction, and more.
            </p>
          </div>
        </div>
      
        <div class="flex items-start gap-4">
          <span class="text-cyan-300 font-bold text-lg">3</span>
          <div>
            <p class="font-semibold text-cyan-300">Ultimate (World Star Team):</p>
            <p>
              Provides current ult cooldown -5s, next ult cd -6s, 30 SP, and higher anti-interrupt. If used on a Fire DMG 
              dealer, the SP consumption of their next Ultimate is reduced by 50%.
            </p>
          </div>
        </div>
      
        <div class="flex items-start gap-4">
          <span class="text-cyan-300 font-bold text-lg">4</span>
          <div>
            <p class="font-semibold text-cyan-300">Quantum Collapse:</p>
            <p>
              When Sparkle casts her Ult on a teammate, that teammate's Ult will apply two Quantum Collapses.
            </p>
          </div>
        </div>
      
        <div class="flex items-start gap-4">
          <span class="text-cyan-300 font-bold text-lg">5</span>
          <div>
            <p class="font-semibold text-cyan-300">I am Elation:</p>
            <p>Recovers 12 (S) / 24 (S2) SP for teammates.</p>
          </div>
        </div>
      
        <div class="flex items-start gap-4">
          <span class="text-cyan-300 font-bold text-lg">6</span>
          <div>
            <p class="font-semibold text-cyan-300">Any weapon skill / I am Elation:</p>
            <p>Insta-kill QUA enemies below 10% HP.</p>
          </div>
        </div>

        <div class="flex items-start gap-4">
          <span class="text-cyan-300 font-bold text-lg">7</span>
          <div>
            <p class="font-semibold text-cyan-300">Passive Buffs:</p>
            <p>The rest of her buffs are activated passively.</p>
          </div>
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
            Stellar Outburst
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
              <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Deceit ➔ Dream Scale</p>
              <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Opulence</p>
            </div>
          </div>
          
        </div>
        <div class="p-2 mt-3 rounded" >
          <p class="text-sm sm:text-base text-left">
              <li class="text-sm sm:text-base"> ER Lite mode: Equip Because of You sigil and get all three Ego signets on Floor 7.</li>
              <li class="text-sm sm:text-base"> Normal mode: Sparkle DPS in general is a bit weak, try to get all signets. You can get both Ego signets at the start by using Thorny Crown sigil, OR by resetting Floor 1 until you get another Ego portal, OR use Because of You support sigil and get the other two Ego signets on Floor 7.</li>
          </p>
          </div>

          <div class="divider divider-neutral"></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            <!-- First Signet with 'Start' text -->
            <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
                <img src="/images/signets/Signets of Gold (Eden).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>
          
            <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Deliverance (Kevin).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Vicissitude (Hua).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">2</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Infinity (Mobius).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>
              


              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Reverie (Pardofelis).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold">1</p>
              </div>

          </div>

          <div class="p-2 mt-3 rounded" >
            <p class="text-sm sm:text-base text-left">
                <li class="text-sm sm:text-base"> Deliverance 1: Only pick this nexus if you have signature weapon. Otherwise, you will miss some buff duration.</li>
                <li class="text-sm sm:text-base"> Deliverance 1: Duration extension is optional. If you're fast enough, you can fit I am Elation within Deliverance buff duration.</li>
                <li class="text-sm sm:text-base"> Infinity 1: Sparkle can re-trigger Mind Sync since this playstyle spams Stellar Outburst activation. Honestly I am just suggesting this because Sparkle doesn't synergize with other Nexus that well. </li>
                <li class="text-sm sm:text-base"> Vicissitude 2: Vic is good since it gives unconditional dmg buff. Vic 2 is easier to build and takes less signets than Infinity 1.</li>

            </p>
            </div>

            <div class="divider divider-neutral"></div>
            <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SUPPORTS</h2>

          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            
            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                <img src="/images/valkportrait/Senadina Deepspace Anchor.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">START</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                <img src="/images/valkportrait/Senadina Deepspace Anchor.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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
                <img src="/images/sigils/Gold_Goblet.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/sigils/Because_of_You.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">START (ER Lite)</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                    <img src="/images/sigils/Gold_Goblet.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                    <img src="/images/sigils/Dreamful_Gold.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">START (Normal)</p>
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
          <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">HOW TO PLAY</h2>

          <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>Start with ultimate to trigger Opulence signet buff.</li>
          <li>Activate Stellar Outburst.</li>
          <li>Spam Basic ATK until you cast I am Elation.</li>
          <li>Use Ultimate.</li>
          <li>Use Combo ATK.</li>
          <li>Activate Stellar Outburst, repeat.</li>
          <li>If you have signet buffs triggered by weapon skill (Helix, Stars), use weapon skill once in a while to trigger the buffs.</li>
        </ol>

        <p class="mt-2 text-sm sm:text-base pb-4 text-center">
            Check out this showcase from Marisa Honkai:
        </p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/Vt8VnkbGzlI/"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                loading="lazy">
            </iframe>
        </div>
        {/if}

        {#if activePlaystyle === '2'}
        <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">Astral Ring Charging Playstyle</h2> 
        <p class="text-sm sm:text-base text-center sm:text-left">
          Alternating Weapon + Combo ATK Spam
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
              <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Radiant Flames ➔ Thousand Faces</p>
              <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Opulence </p>
            </div>
          </div>
        </div>
        <div class="p-2 mt-3 rounded" >
          <p class="text-sm sm:text-base text-left">
              <li class="text-sm sm:text-base"> ER Lite: Equip Because of You sigil and get all three Ego signets on Floor 7.</li>
              <li class="text-sm sm:text-base"> Normal: Sparkle DPS in general is a bit weak, try to get all signets. Get both Ego signets at the start by using Thorny Crown sigil, OR by resetting Floor 1 until you get another Ego portal, OR use Because of You support sigil and get the other two Ego signets on Floor 7.</li>
          </p>
          </div>
          <div class="divider divider-neutral"></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            <!-- First Signet with 'Start' text -->
            <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
              <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
              <img src="/images/signets/Signets of Gold (Eden).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold ">1</p>
            </div>

            <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
              <img src="/images/signets/Signets of Helix (Vill-V).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <p class="text-lg font-semibold ">1</p>
            </div>
        
          <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
              <img src="/images/signets/Signets of Stars (Griseo).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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
                <img src="/images/sigils/Gold_Goblet.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <img src="/images/sigils/Because_of_You.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-lg font-semibold">START (ER Lite)</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                    <img src="/images/sigils/Gold_Goblet.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                    <img src="/images/sigils/Dreamful_Gold.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-lg font-semibold">START (Normal)</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
                <div class="flex flex-row rounded">
                    <img src="/images/sigils/Key_to_the_Deep.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                    <img src="/images/sigils/Dreamful_Gold.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-lg font-semibold">FINAL</p>
            </div>

          </div>

          
          <div class="divider divider-neutral"></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">HOW TO PLAY</h2>

          <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>Use Ultimate.</li>
          <li>Press weapon ➔ Combo ATK.</li>
          <li>Press weapon ➔ Combo ATK.</li>
          <li>Press weapon to cast I am Elation.</li>
          <li>Press weapon ➔ Combo ATK.</li>
          <li>Press weapon ➔ Combo ATK.</li>
          <li>Press weapon to cast I am Elation.</li>
          <li>Go back to step 1, repeat.</li>
        </ol>

        <p class="mt-2 text-sm sm:text-base pb-4 text-center">
            Check out this showcase from Marisa Honkai:
        </p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/ZQcnuXezGCE"
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
              <li>SS has increased independent multiplier. I am Elation and Ult gain increased ATK% multiplier.</li>
              <li>Every rank up has a DPS upgrade.</li>
            </ul>
          </div>
      
          <!-- Support Upgrade Box -->
          <div class="flex-1 p-2 bg-gray-800 rounded-lg shadow-md border border-yellow-400">
            <h3 class="text-lg font-semibold text-yellow-400 mb-2">Support Upgrade</h3>
            <ul class=" text-slate-100 text-base">
              <li>S2 and SS: Improves P1 support buffs<br/></li>
              <li>SS: I am Elation restores 18 sp for Sparkle. This enables Sparkle to get Ult without using Combo ATK in some cases, improving score.<br/></li>
              <li>SS2: Improves buffs when supporting Schicksal's Imperative against QUA enemies.</li>
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
                  1. During Stellar Outburst: Total DMG +30% ➔ 35% and Fire DMG +36% ➔ 43% <br/>
                  2. Reso DMG from consumed reso mark - Each hit deal 255% ➔ 300% ATK of Fire DMG, cd 0.5s. If the mark trigger count from mark consumption is more than 7, each mark trigger deals 1084% ➔ 1420% ATK of Fire DMG. 
                </td>
                <td class="p-3">DPS</td>
              </tr>
              <!-- Sample Row 2 -->
              <tr>
                <td>S2</td>
                <td>
                    1. UNLOCK: Upon casting Combo ATK, trigger 3s time fracture, cd 8s <br/>
                    2. Teammates with Spotlight: Attack against type advantage enemy gain Total DMG +10.2% ➔ 12.6%. Her Ult further gain Ignite DMG +49% ➔ 62%.  <br/>
                    3. When the final hit of I am Elation hits, recover extra 8 ➔ 20 sp for teammates.

                </td>
                <td>Support <br/> DPS</td>
              </tr>
              <tr>
                <td>S3</td>
                <td>
                  Leader Skill:<br/>
                  - During AR Charging, team Elemental DMG +17.2% ➔ 21.1% <br/>
                  - Sparkle resonance atk gain Total DMG +21 ➔ 25.5%.<br/>
                  - Enemies take +17.5% ➔ 21.25% more Fire DMG from Sparkle's Resonance DMG (independent multiplier)

                </td>
                <td>DPS</td>
              </tr>
              <tr>
                <td>SS</td>
                <td>
                  1. UNLOCK: [I am Elation] restore 18 sp for Sparkle.<br/>
                  2. Enemies take 9.2% ➔ 12% more Fire DMG and Total DMG from Sparkle. [I am Elation] deal additional 800% ➔ 1000% ATK of Fire DMG, and Ult deal additional 1600% ➔ 2000% ATK of Fire DMG<br/>
                  3. Teammates with Spotlight: Attack against type advantage enemy gain Total DMG +12.6% ➔ 15%. Her Ult further gain Ignite DMG +62% ➔ 75%. <br/>
                </td>
                <td>Support<br/>
                  DPS<br/>
              </tr>
              <tr>
                <td>SS1</td>
                <td>
                  When Resonance mark is triggered and deal dmg, the subsequent dmg multiplier increases by 60.5% ➔ 65% , after dealing dmg 13 times, the dmg multiplier increases by an additional 102% ➔ 120%.
                </td>
                <td>DPS
              </tr>
              <tr>
                <td>SS2</td>
                <td>
                  QUA enemies take 28.5% ➔ 30% more Total DMG from Sparkle, and all QUA teammates gain Total DMG +8.5% ➔ 10% against QUA enemies.
                </td>
                <td>DPS<br/>SIMP Support
              </tr>
              <tr>
                <td>SS3</td>
                <td>
                  Leader Skill:<br/>
                  - During AR Charging, team Elemental DMG +21.1% ➔ 25% <br/>
                  - Sparkle resonance atk gain Total DMG +25 ➔ 30%.<br/>
                  - Enemies take +21.25% ➔ 25% more Fire DMG from Sparkle's Resonance DMG (independent multiplier)               
                </td>
                <td>DPS
              </tr>
              <tr>
                <td>SSS</td>
                <td>
                  During Stellar Outburst: Total DMG +35% ➔ 40% and Fire DMG +43% ➔ 50%
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
              <p>1. During Stellar Outburst: Total DMG +30% ➔ 35% and Fire DMG +36% ➔ 43%<br/>
                2. Reso DMG from consumed reso mark - Each hit deal 255% ➔ 300% ATK of Fire DMG, cd 0.5s. If the mark trigger count from mark consumption is more than 7, each mark trigger deals 1084% ➔ 1420% ATK of Fire DMG.

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
              <p>1. UNLOCK: Upon casting Combo ATK, trigger 3s time fracture, cd 8s<br/>
                2. Teammates with Spotlight: Attack against type advantage enemy gain Total DMG +10.2% ➔ 12.6%. Her Ult further gain Ignite DMG +49% ➔ 62%.<br/>
                3. When the final hit of I am Elation hits, recover extra 8 ➔ 20 sp for teammates.	

              </p>
              <p class="mt-2"><strong>Good for:</strong> Support, DPS</p>
            </div>
          </div>

        

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(3)}>
            <span>S3</span>
            <span class="text-md">{openItem === 3 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 3 ? 'open' : ''}">
            <p>Leader Skill:<br/>
              - During AR Charging, team Elemental DMG +17.2% ➔ 21.1%<br/>
              - Sparkle resonance atk gain Total DMG +21 ➔ 25.5%<br/>
              - Enemies take +17.5% ➔ 21.25% more Fire DMG from Sparkle's Resonance DMG (independent multiplier)
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
            <p>1. UNLOCK: [I am Elation] restore 18 sp for Sparkle<br/>
              2. Enemies take 9.2% ➔ 12% more Fire DMG and Total DMG from Sparkle. [I am Elation] deal additional 800% ➔ 1000% ATK of Fire DMG, and Ult deal additional 1600% ➔ 2000% ATK of Fire DMG<br/>
              3. Teammates with Spotlight: Attack against type advantage enemy gain Total DMG +12.6% ➔ 15%. Her Ult further gain Ignite DMG +62% ➔ 75%.
            </p>
            <p class="mt-2"><strong>Good for:</strong> Support, DPS</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(5)}>
            <span>SS1</span>
            <span class="text-md">{openItem === 5 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 5 ? 'open' : ''}">
            <p>When Resonance mark is triggered and deal dmg, the subsequent dmg multiplier increases by 60.5% ➔ 65% , after dealing dmg 13 times, the dmg multiplier increases by an additional 102% ➔ 120%.</p>
            <p class="mt-2"><strong>Good for:</strong> DPS</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(6)}>
            <span>SS2</span>
            <span class="text-md">{openItem === 6 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 6 ? 'open' : ''}">
            <p>QUA enemies take 28.5% ➔ 30% more Total DMG from Sparkle, and all QUA teammates gain Total DMG +8.5% ➔ 10% against QUA enemies.</p>
            <p class="mt-2"><strong>Good for:</strong> DPS, SIMP Support</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(7)}>
            <span>SS3</span>
            <span class="text-md">{openItem === 7 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 7 ? 'open' : ''}">
            <p>Leader Skill:<br/>
              - During AR Charging, team Elemental DMG +21.1% ➔ 25%<br/>
              - Sparkle resonance atk gain Total DMG +25 ➔ 30%<br/>
              - Enemies take +21.25% ➔ 25% more Fire DMG from Sparkle's Resonance DMG (independent multiplier)</p>
            <p class="mt-2"><strong>Good for:</strong> DPS</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(8)}>
            <span>SSS</span>
            <span class="text-md">{openItem === 8 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 8 ? 'open' : ''}">
            <p>During Stellar Outburst: Total DMG +35% ➔ 40% and Fire DMG +43% ➔ 50%	</p>
            <p class="mt-2"><strong>Good for:</strong> DPS
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
            <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">Sparkle DPS </h2>

            <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">Sparkle DPS rotation with Vita and HoFi support</p>

            <div class="relative overflow-hidden" style="padding-top: 56.25%;">
              <iframe
                  class="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/LMvnp-sKAIs"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                  loading="lazy"
                  >
              </iframe>
          </div>
        </div>

      </div>



    <div class=" gap-6 my-10">
      <!-- Video 1 with title and description -->
      <div class="bg-gray-800 p-4 rounded-lg shadow-md">
        <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">Sparkle Support (Part 1)</h2>

        <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">Sparkle Support for Part 1 Team example with Sirin</p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
          <iframe
              class="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/UTk1dCEbap0"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              loading="lazy"
              >
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
          <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">Various Sparkle DPS Teams</h2>

          <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">Different team showcase vs Resonance Vita Boss (Low Disturbance)</p>

          <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
            loading="lazy" 

                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/_cfYygEWX10"
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

  <div class="text-center my-4">
    <p class="text-center text-sm sm:text-base">No popular question
    </p>
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

