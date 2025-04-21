
<svelte:head>
  <title>Durandal - Reign Solaris</title> 

    <meta property="og:title" content="Durandal - Reign Solaris" />
    <meta property="og:description" content="Reign Solaris Guides, Builds and Gameplay" />
    <meta property="og:image" content="https://i.imgur.com/WvbTAHq.png" />
    <meta property="og:url" content="https://marisaimpact.com/valk/durandal" />
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
  import Lightbox from '$lib/components/lightbox.svelte';

	import Dududps from '$lib/components/lineup/dududps.svelte';
	import Lanterndps from "$lib/components/lineup/lanterndps.svelte";
	import Jddps from "$lib/components/lineup/jddps.svelte";
	import Thelemadps from "$lib/components/lineup/thelemadps.svelte";
	import P1physical from "$lib/components/lineup/p1physical.svelte";
	import Badumdps from "$lib/components/lineup/badumdps.svelte";
	import Hohdps from "$lib/components/lineup/hohdps.svelte";
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
  let durandallikes = likesData["durandal"] || 0; // Get initial likes from JSON
  const charName = "durandal"; // Route name for this character
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
.like-container {
    display: flex;
    align-items: center;
    gap: 8px;
}
</style>

<section class="relative mx-auto flex flex-row items-center justify-center px-4 md:p-2 gap-3 md:pb-0  md:mt-0  pt-2	sm:pt-0">
  <div class="absolute   top-0 w-full h-[90vh] z-[-10] opacity-85 " id="bgwavebox">    
    <img src="/images/bg/wave_lp.svg" alt="Durandal wave" class="w-full h-full object-cover overflow-hidden" /> 
  </div>



<!-- Left: Character Image -->
<div class="relative  w-auto h-48 sm:h-60 md:h-72 flex justify-center mt-4" id="valkpicbox">
  <!-- Image for Larger Screens -->
  <img src="/images/valkfull/rs.webp" alt="Durandal" class="h-full w-auto object-cover md:object-contain  " style ="view-transition-name: valkyrie-image-16;"/> 
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
        <span class="text-white font-semibold">{durandallikes}</span>
    </button>
</div>

</div>



<!-- Right: Character Info (Centered) -->
<div class="flex flex-col items-center text-center justify-start mt-3">
  <!-- Battlesuit Name -->
  <h1 class="text-xl md:text-2xl text-slate-100 font-bold text-center leading-4 mb-4 sm:mb-1">Reign Solaris</h1>

  <!-- Character Name and Release Date -->
  <p class="text-base md:text-md text-center md:block hidden text-slate-300 my-2">Bianka | Release Date: v8.0 (9 Jan 2025) </p>
  <!-- Common wrapper to ensure same width -->
  <div class="w-full max-w-sm mb-2">
    <!-- Container with 4 pictures (Centered) -->
    <div class="flex flex-col items-center" id="typebox">
      <div class="flex w-[260px] md:w-[300px] gap-2 flex-wrap justify-center outline outline-cyan-500 outline-1 bg-cyan-950/75 rounded-lg p-2 backdrop-blur-xs">
        <img src="/images/ranks/Valkyrie_S.webp" alt="S-rank" class="w-auto h-8 md:h-10" />
        <img src="/images/type/IconIMG.png" alt="IMG" class="w-auto h-8 md:h-10" />
        <img src="/images/element/Core_Physical.png" alt="Physical" class="w-auto h-8 md:h-10" />
        <img src="/images/artype/ar loa.webp" alt="ar" class="w-auto h-8 md:h-10" />
      </div>
    </div>

    <!-- Support For Container (Centered) -->
    <div class="flex flex-col mt-4 items-center" id="arbox">

      <div class="flex flex-col  w-[260px] md:w-[300px] flex-wrap justify-center outline outline-cyan-500 outline-1 bg-cyan-950/75 rounded-lg p-2 backdrop-blur-xs">
        <div class="flex flex-wrap justify-center">
          <h2 class="text-base md:text-md custom-font tracking-wider text-slate-100">SUPPORT FOR:</h2>
        </div >
        <div class="flex flex-row gap-2 flex-wrap justify-center">
          <img src="/images/artype/ar loa.webp" alt="Support 1" class="w-auto h-8 md:h-10" />
          <img src="/images/artype/ar wheel of destiny.png" alt="Support 2" class="w-auto h-8 md:h-10" />
          <img src="/images/artype/ar future.png" alt="Support 3" class="w-auto h-8 md:h-10" />
          <img src="/images/artype/p1physical.png" alt="Support 4" class="w-auto h-8 md:h-10" />

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
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-4 text-center">OVERVIEW</h2>

      <div>
          <!-- Roles Section -->
          <h2 class="text-xl  font-semibold mb-2 text-left cooltext text-slate-100">ROLES</h2>
          
          <p class="mt-4 text-sm sm:text-base">
            <strong class="text-amber-400">DPS</strong>
        </p>
        <ul class="list-disc ml-6 text-sm sm:text-base">
          <li>Reign Solaris (RS) is a powerful Physical IMG DPS with huge shieldbreak. </li>
          <li>IMG Counter: RS has multiple skills that can transfer damage from IMG shell to seed.</li>
      </ul>
        <p class="mt-4 text-sm sm:text-base">
            <strong class="text-amber-400">Part 1 Physical Support</strong> <br/>RS is the new best support for Part 1 Physical teams, replacing <a href="/valk/prom" class="link ">Prometheus Terminal Aide.</a>  
        </p>
        <ul class="list-disc ml-6 text-sm sm:text-base">
          <li>RS gives around 30% increased damage output than Terminal Aide. </li>
          <li>RS provides shieldbreak and can inflict stun trauma. </li>
      </ul>
        <p class="mt-4 text-sm sm:text-base">
          <strong class="text-amber-400">Law of Ascension Support</strong> <br/>For LoAscension teams, RS provides shieldbreak and impair (DEF -55%). 

      </p>

      <p class="mt-4 text-sm sm:text-base">
        <strong class="text-amber-400">Wheel of Destiny Support</strong> <br/> RS does not offer any improvement for existing WoDestiny lineups. Good support for Jovial Deception, provides Crit DMG. 

    </p>

    <p class="mt-4 text-sm sm:text-base">
      <strong class="text-amber-400">Future AR Support</strong> <br/> RS will be a support for a future Astral Ring.

  </p>

          <div class="divider  "></div>
          <!-- Pull Recommendation Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">PULL RECOMMENDATION</h2>
          <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">F2P Players / New Players</strong> 
              <br/>
              RS is a great valk. HOWEVER, version 8.1 is a CN New Year / Regional Anniversary patch. That means there is a spending event, where you can get an S-rank card by spending around 44,000 crystals. And based on the previous spending event in v7.8, there is a chance that there will be a new Divine Key too. It's better to save for 8.1.

              
            </p>
            <ul class="list-disc ml-6 text-sm sm:text-base">
              <li class="mt-2">Just do the discounted first ten pulls for Reign Solaris.</li>
              <li class="mt-2">If you still decide to pull Reign Solaris, it is still fine - RS is a great valk, and her shieldbreak utility will definitely be useful for future LoAscension DPS.</li>
          </ul>
            <p class="mt-4 text-sm sm:text-base">
              <strong class="text-amber-400">Competitive</strong> <br/> Recommended. RS value is insane.
            </p>
            <ul class="list-disc ml-6 text-sm sm:text-base">
              <li class="mt-2">As <span class="text-teal-300">DPS</span>, RS top scores three bosses in 8.0: Phy Otto, Phy Deliverance, and Ascension mob boss. Just like other Part 2 valks, she might get more bosses in the future.</li>
              <li class="mt-2">For <span class="text-rose-300">Law of Ascension</span> teams, RS will be an important shieldbreak support against enemies with tanky shields. She also provides impair, but that will only be useful for her own attacks until another Physical LoAscension DPS is added.</li>
              <li class="mt-2">For <span class="text-amber-300">Part 1 Physical</span> teams, RS replaces Prometheus, providing around ~30% increased damage, plus shieldbreak and stun.</li>
              <li class="mt-2">RS will also be a support for a <span class="text-sky-300">future Astral Ring.</span></li>

          </ul>
          <div class="divider  "></div>
          <!-- How to Get Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">HOW TO GET</h2>
          <ul class="list-disc ml-6 text-sm sm:text-base ">
              <li  class="mt-2"><strong>Reign Solaris:</strong> Battlesuit Supply. 50% off for the first ten pulls in v8.0</li>
              <li class="mt-2"><strong>Valorous Effulgence:</strong> Equipment Supply</li>
              <li class="mt-2"><strong>Durandal Stigma:</strong> Equipment Supply, Forgeable, Free stigma box in 8.0</li>
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
                src="https://www.youtube.com/embed/MJFhTLjbqik"
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
      <!-- Category 1: Vita DPS -->

      <Dududps maindps={true}/>

      <div class="divider divider-accent text-xl custom-font tracking-wider text-teal-300 mt-16"> Part 1 Physical Support </div>

      <P1physical></P1physical>

      <div class="divider divider-accent text-xl custom-font tracking-wider text-teal-300 mt-16"> Law of Ascension Support </div>

      <Badumdps></Badumdps>

      <div class="divider divider-accent text-xl custom-font tracking-wider text-teal-300 mt-16"> Wheel of Destiny Support </div>

      <Hohdps firstCharName="RS"></Hohdps>

      <div class="divider  "></div>

      <Jddps firstCharName="RS"></Jddps>

      <div class="divider  "></div>

      <Lanterndps firstCharName="RS"></Lanterndps>

      <div class="divider  "></div>

      <Thelemadps firstCharName="RS"></Thelemadps>


      {/if}

     
</section>

  {/if}

      {#if selectedTab === 'Equipment'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">EQUIPMENT</h2>
 
      <div>


        <h2 class="text-xl font-semibold text-center  text-yellow-400">BEST</h2>

        <div class="flex flex-col justify-center items-center">
            
        <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">

          <div class="w-20 h-20 sm:w-28 sm:h-28">
            <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/11/30/50494840/94e51931f312c1ccf6b4ad17aee01b8d_7618638875560602605.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
        </div>

        <div class="w-20 h-20 sm:w-28 sm:h-28">
          <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/12/01/9917988/27fc51f1d99db068c09bbf3c3fec07e6_3242647471571866833.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
      </div>

      <div class="w-20 h-20 sm:w-28 sm:h-28">
          <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/12/01/9917988/ba86872f743b4ec46a9d4b7cbeaf6182_7366737120267816848.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
      </div>

      <div class="w-20 h-20 sm:w-28 sm:h-28">
          <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/12/01/9917988/97c04963253aeed05239ff3dfe9fa3ae_4747604725905162829.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
      </div>

        </div>  
        <h4 class="text-base sm:text-base text-white"> Valorous Effulgence + Durandal set</h4>
        </div>



     </div>

     <div>



      <div class="p-4 mt-4 bg-linear-to-r from-teal-950/75 to-teal-900/75 rounded-sm">
        <p class="text-sm sm:text-base text-left mb-4">
          <b>Valorous Effulgence </b><br/> - A must-have weapon for RS.
          <br/>- Enables Stellar Shift and Heavenly Link attacks to transfer 40% / 45% / 50% damage from IMG shell to seed.
          <br/>- In Rampager form, Charged ATK will reset weapon cd, allowing you to enter Skyrider form. Without Valorous Effulgence, weapon skill will still be on cooldown.
        </p>

        <p class="text-sm sm:text-base text-left mb-4">
          <b>Durandal set</b><br/> - All buffs. 3PC gives impair, DEF -55%.
          <br/> - Forgeable in Foundry.
        </p>

        <p class="text-sm sm:text-base text-left">
          <b>Affix</b> <br/>Full ATK.
        </p>
      </div>


      </div>

      <div class="divider  "></div>


      <div class="flex items-center justify-center text-orange-300 ">
      <img src="https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/guidepics/dmg%20test%20rs%20dps%20neutral.png" alt="Icon" class="w-[1000px] h-auto rounded-lg" />
    </div>

    <div class="divider  "></div>

    <div class="flex items-center justify-center text-orange-300 ">
      <img src="https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/guidepics/dmg%20test%20rs%20dps%20img.png" alt="Icon" class="w-[1000px] h-auto rounded-lg" />
    </div>

    <div class="divider  "></div>

    <div class="flex items-center justify-center text-orange-300 ">
      <img src="https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/guidepics/dmg%20test%20p1.png" alt="Icon" class="w-[1000px] h-auto rounded-lg" />
    </div>

    <div class="divider  "></div>

    <div class="flex items-center justify-center text-orange-300 ">
      <img src="https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/guidepics/dmg%20test%20wod%20support.png" alt="Icon" class="w-[1000px] h-auto rounded-lg" />
    </div>

      {/if}

      {#if selectedTab === 'Support Buffs'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r  from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">SUPPORT BUFFS</h2>
      <div class="flex flex-wrap gap-4 mt-8">
        <!-- Example image list for support buffs; add your own image sources -->
        <img
          src="https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/guidepics/RS%20SUPPORT%20BUFF%201.webp"
          alt="Buff 1"
          class=" object-cover cursor-pointer"
          on:click={() => openLightbox('https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/guidepics/RS%20SUPPORT%20BUFF%201.webp')}
        />
      </div>

      <div class="flex flex-wrap gap-4 mt-8">
        <!-- Example image list for support buffs; add your own image sources -->
        <img
          src="https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/guidepics/RS%20SUPPORT%20BUFF%202.webp"
          alt="Buff 2"
          class=" object-cover cursor-pointer"
          on:click={() => openLightbox('https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/guidepics/RS%20SUPPORT%20BUFF%202.webp')}
        />
      </div>
      
      <div class="my-5 text-sm sm:text-base text-slate-100 space-y-4">
        <p class="mb-4 font-semibold">How to activate RS support buffs:</p>
        
          <div>
            <p class="font-semibold text-orange-300  mt-6">AR Regen</p>
            <p>- Charged ATK consumes Stellar Drain.<br/>
              - In Law of Ascension team, QTE also restore AR.
            </p>
          </div>

          <div>
            <p class="font-semibold text-orange-300 mt-6">Durandal Stigma</p>
           <p>QTE or Charged ATK triggers an important stigma buff [Resplendent Determination] for 25s. This is also activated / refreshed upon Stellar Outburst activation.</p>
          </div>

          <div>
            <p class="font-semibold text-orange-300 mt-6">Part 1 Buff</p>
           <p>- As Part 1 support, you must enter with QTE, then do a Charged ATK to trigger 10% (S) / 18% (SS1) TDM Taken, more self buff and more shieldbreak.
            <br/>
            - As Part 1 support, Ultimate makes enemies take 15% more Physical DMG for 20s.

           </p>
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
            class={`px-4 py-2 font-semibold rounded-sm ${activePlaystyle === '1' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-linear-to-r from-orange-600 to-amber-500 hover:text-white'}`}
          >
          ONE EGO
          </button>
        
          <button
            on:click={() => setPlaystyle('2')}
            class={`px-4 py-2 font-semibold rounded-sm ${activePlaystyle === '2' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-linear-to-r from-orange-600 to-amber-500 hover:text-white'}`}
          >
            SURF N NUKE
          </button>

          <button
          on:click={() => setPlaystyle('3')}
          class={`px-4 py-2 font-semibold rounded-sm ${activePlaystyle === '3' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-linear-to-r from-orange-600 to-amber-500 hover:text-white'}`}
        >
          CHARGED ATK
        </button>
        </div>
      


    {#if activePlaystyle === '1'}
    <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">One Ego Playstyle</h2> 
    <p class="text-sm sm:text-base text-center sm:text-left">
      Durandal shreds the enemies simply by surfing around. Also relies on Ult. Recommended for veteran players with high Divine Key and Dorm stats. 
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
          <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Daylight</p>
        </div>
      </div>
    </div>

      
      <div class="divider  "></div>
      <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
      <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
        <!-- First Signet with 'Start' text -->
          <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
            <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
            <img src="/images/signets/Signets of Decimation (Kalpas).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            <p class="text-lg font-semibold">1</p>
          </div>

          <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
            <img src="/images/signets/Signets of Bodhi (Su).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            <p class="text-lg font-semibold">1</p>
          </div>

          <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
            <img src="/images/signets/Signets of Setsuna (Sakura).png" alt="Signet 5" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            <p class="text-lg font-semibold ">2</p>
          </div>

          <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
            <img src="/images/signets/Signets of Stars (Griseo).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            <p class="text-lg font-semibold">2</p>
          </div>

          <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
            <img src="/images/signets/Signets of Reverie (Pardofelis).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            <p class="text-lg font-semibold">1</p>
          </div>

      </div>

      <div class="mt-3 rounded-sm" >
        <p class="text-sm sm:text-base text-left">
          <b>Decimation 1:</b> Get [Burden, Difficulty, and Calamity] enhancement signet as soon as you can to keep your HP low. <br/>
          <b>Stars 2:</b> In 8.0, stage effect applies all unlocked Star dyes. Stars might not be optimal after v8.0.<br/>
        </p>
      </div>
        <div class="divider  "></div>
        <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SUPPORTS</h2>

      <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
        
        <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
          <div class="flex flex-row rounded-sm">
            <img src="/images/valkportrait/Bronya Snowy Sniper.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
          </div>
          <p class="text-base sm:text-lg font-semibold">START</p>
      </div>

      <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
          <div class="flex flex-row rounded-sm">
            <img src="/images/valkportrait/Bronya Snowy Sniper.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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
            <img src="/images/sigils/Forget-Me-Not.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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

      <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
        <li>Press weapon</li>
        <li>Press evade, then move around until the stage ends</li>
        <li>Use Ult to finish off the final wave</li>

      </ol>

      <h2 class="text-md font-semibold  mt-3  text-left text-white ">Technical Info</h2>

        <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>Against HoD Minion boss, use Ult before the Shell hp reaches zero. Your ult deals 2x damage to Seed if you use it on IMG Shell.</li>
          <li>Surf around at normal speed, don't use the faster version (press evade again / hold evade). I find that it's easier for the javelins to hit at normal surf speed. </li>
        </ol>

    <p class="mt-4 text-sm sm:text-base pb-4 text-center">
        Check out this showcase from Marisa Honkai:
    </p>

    <div class="relative overflow-hidden" style="padding-top: 56.25%;">
        <iframe
            class="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/NPlXbJmUPqY"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            loading="lazy">
        </iframe>
    </div>
    {/if}

    
    {#if activePlaystyle === '2'}
    <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">Surf n Nuke Playstyle</h2> 
    <p class="text-sm sm:text-base text-center sm:text-left">
     It's like the One Ego playstyle, but more emphasis on Stellar Outburst damage. Has around the same clear speed as Charged ATK playsytle.
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
          <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Daylight ➔ Iridiscence  </p>
          <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b>   Everlasting Radiance </p>
        </div>
      </div>
      
    </div>
    <div class="mt-3 rounded-sm" >
      <p class="text-sm sm:text-base text-left">
        <li class="text-sm sm:text-base"> ER Lite mode: Equip Because of You sigil and get all three Ego signets on Floor 7.</li>
        <li class="text-sm sm:text-base"> Normal mode: You can complete the run with just one Ego signet (Daylight), but having both Ego signets is a big improvement. You can get both Ego signets at the start by using Thorny Crown sigil, OR by resetting Floor 1 until you get another Ego portal, OR use Because of You support sigil and get the other two Ego signets on Floor 7.</li>
    </p>
      </div>

      <div class="divider  "></div>
      <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
      <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
        <!-- First Signet with 'Start' text -->
          <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
            <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
            <img src="/images/signets/Signets of Decimation (Kalpas).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            <p class="text-lg font-semibold">1</p>
          </div>

          <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
            <img src="/images/signets/Signets of Bodhi (Su).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            <p class="text-lg font-semibold">1</p>
          </div>

          <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
            <img src="/images/signets/Signets of Setsuna (Sakura).png" alt="Signet 5" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            <p class="text-lg font-semibold ">2</p>
          </div>

          <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
            <img src="/images/signets/Signets of Stars (Griseo).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            <p class="text-lg font-semibold">2</p>
          </div>

          <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
            <img src="/images/signets/Signets of Reverie (Pardofelis).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            <p class="text-lg font-semibold">1</p>
          </div>

      </div>
      <div class="mt-3 rounded-sm" >
        <p class="text-sm sm:text-base text-left">
          <b>Decimation 1:</b> Get [Burden, Difficulty, and Calamity] enhancement signet as soon as you can to keep your HP low. <br/>
          <b>Stars 2:</b> In 8.0, stage effect applies all unlocked Star dyes. Stars might not be optimal after v8.0.<br/>
        </p>
      </div>

        <div class="divider  "></div>
        <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SUPPORTS</h2>

      <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
        
        <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
          <div class="flex flex-row rounded-sm">
            <img src="/images/valkportrait/Bronya Snowy Sniper.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
          </div>
          <p class="text-base sm:text-lg font-semibold">START</p>
      </div>

      <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
          <div class="flex flex-row rounded-sm">
            <img src="/images/valkportrait/Bronya Snowy Sniper.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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


      <div class="divider  "></div>
      <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SIGIL</h2>

      <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
        

        <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
          <div class="flex flex-row rounded-sm">
            <img src="/images/sigils/Mad_Kings_Mask.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            <img src="/images/sigils/An_Old_Pals_Legacy.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            </div>
          <p class="text-base sm:text-lg font-semibold">START (Normal)</p>
      </div>
  
        <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
            <div class="flex flex-row rounded-sm">
              <img src="/images/sigils/Memory.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              <img src="/images/sigils/An_Old_Pals_Legacy.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            </div>
            <p class="text-base sm:text-lg font-semibold">MID</p>
        </div>
  

      <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
          <div class="flex flex-row rounded-sm">
            <img src="/images/sigils/Forget-Me-Not.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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
      <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">HOW TO PLAY</h2>

      <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
        <li>Press weapon</li>
        <li>Press evade, then move around until you have 20 multiplier stacks (icon above your HP bar)</li>
        <li>Use Stellar Outburst (Stellar Shift)</li>
        <li>Repeat step 2 and 3 until the stage ends</li>
        <li>Use Ult to finish off the final wave</li>
      </ol>

    <p class="mt-8 text-sm sm:text-base pb-4 text-center">
        Check out this showcase from Marisa Honkai:
    </p>

    <div class="relative overflow-hidden" style="padding-top: 56.25%;">
        <iframe
            class="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/w4J0E7j0FcM"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
            loading="lazy">
        </iframe>
    </div>
    {/if}

    {#if activePlaystyle === '3'}
    <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">Charged ATK Playstyle</h2> 
    <p class="text-sm sm:text-base text-center sm:text-left">
     A playstyle for when you want to cleave enemies instead of surfing around. Has around the same clear speed as surf playsytle. <br/>
     For RS without signature weapon, this playstyle is worse for survivability because Charged ATK puts you in a fixed position without any invincibility for a few seconds, so you can easily die to boss attacks.
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
          <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Dominance ➔ Perseverance</p>
          <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b>   Everlasting Radiance </p>
        </div>
      </div>
      
    </div>
    <div class="mt-3 rounded-sm" >
      <p class="text-sm sm:text-base text-left">
        <li class="text-sm sm:text-base"> ER Lite mode: Equip Because of You sigil and get all three Ego signets on Floor 7.</li>
        <li class="text-sm sm:text-base"> Normal mode: You can complete the run with just one Ego signet (Dominance), but having both Ego signets is a big improvement. You can get both Ego signets at the start by using Thorny Crown sigil, OR by resetting Floor 1 until you get another Ego portal, OR use Because of You support sigil and get the other two Ego signets on Floor 7.</li>
    </p>
      </div>

      <div class="divider  "></div>
      <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
      <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
        <!-- First Signet with 'Start' text -->
          <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
            <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
            <img src="/images/signets/Signets of Decimation (Kalpas).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            <p class="text-lg font-semibold">1</p>
          </div>

          <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
            <img src="/images/signets/Signets of Vicissitude (Hua).png" alt="Signet 5" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            <p class="text-lg font-semibold ">2</p>
          </div>


          <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
            <img src="/images/signets/Signets of Helix (Vill-V).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            <p class="text-lg font-semibold">1</p>
          </div>


          <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
            <img src="/images/signets/Signets of Stars (Griseo).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            <p class="text-lg font-semibold">2</p>
          </div>

          <div class="flex flex-col items-center  p-1 rounded-sm relative border border-slate-500">
            <img src="/images/signets/Signets of Reverie (Pardofelis).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            <p class="text-lg font-semibold">1</p>
          </div>

      </div>
      <div class="mt-3 rounded-sm" >
        <p class="text-sm sm:text-base text-left">
          <b>Decimation 1:</b> Your HP will be very low. Build Vicissitude 2 for survivability. <br/>
          <b>Decimation 1:</b> Get [Burden, Difficulty, and Calamity] enhancement signet as soon as you can to keep your HP low. <br/>
          <b>Stars 2:</b> In 8.0, stage effect applies all unlocked Star dyes. Stars might not be optimal after v8.0.<br/>
        </p>
      </div>

        <div class="divider  "></div>
        <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">SUPPORTS</h2>

      <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
        
        <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
          <div class="flex flex-row rounded-sm">
            <img src="/images/valkportrait/Bronya Snowy Sniper.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
            <img src="/images/valkportrait/Himeko Blood Rose.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
          </div>
          <p class="text-base sm:text-lg font-semibold">START</p>
      </div>

      <div class="flex flex-col items-center p-1 rounded-sm relative border border-slate-500 ">
          <div class="flex flex-row rounded-sm">
            <img src="/images/valkportrait/Bronya Snowy Sniper.png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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
            <img src="/images/sigils/Memory.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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
      <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">HOW TO PLAY</h2>

      <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
        <li>Use Stellar Outburst (Stellar Shift)</li>
        <li>Use Charged ATK three times ➔ Charged ATK EX</li>
        <li>Repeat [Weapon ➔ Charged ATK ➔ Charged ATK EX] until the stage ends</li>
        <li>Can use Ult to finish off the final wave</li>
      </ol>

    <p class="mt-8 text-sm sm:text-base pb-4 text-center">
        Check out this showcase from Marisa Honkai:
    </p>

    <div class="relative overflow-hidden" style="padding-top: 56.25%;">
        <iframe
            class="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/XQkzfh2pd84"
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
              <li>SS: Increased damage transfer from img shell to seed.</li>
              <li>SS2: Increased Shield DMG.</li>
            </ul>
          </div>
      
          <!-- Support Upgrade Box -->
          <div class="flex-1 p-2 bg-gray-800 rounded-lg shadow-md border border-yellow-400">
            <h3 class="text-lg font-semibold text-yellow-400 mb-2">Support Upgrade</h3>
            <ul class=" text-slate-100 text-base">
              <li>SS2: Increased Shield DMG.</li>
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
                  When Reign Solaris has Fearless Vanguard buff, enemies take 9% ➔ 12% more Physical DMG from Reign Solaris, and team Total DMG +6% ➔ 11%.
                </td>
                <td class="p-3">DPS <br/> Support</td>
              </tr>
              <!-- Sample Row 2 -->
              <tr>
                <td>S2</td>
                <td>

                  UNLOCK: Quick Charged ATK deals additional 100% ATK of Physical DMG.

                </td>
                <td>DPS</td>
              </tr>
              <tr>
                <td>S3</td>
                <td>
                  Leader Skill:<br/>
                  - Reign Solaris' Stellar Shift gain Physical DMG +22% ➔ 25%.
                  <br/>
                  - Enemies take 26% ➔ 27% more Physical DMG from Reign Solaris (independent).
                </td>
                <td>DPS</td>
              </tr>
              <tr>
                <td>SS</td>
                <td>
                  - Charged ATK Level 3 and Charged ATK EX transfer 35% ➔ 50% dmg from img shell to seed.<br/>
                  - Fearless Vanguard: Physical DMG +16% ➔ 20%, Total DMG +11% ➔ 15%.
                </td>
                <td>DPS<br/>IMG counter

              </tr>
              <tr>
                <td>SS1</td>
                <td>
                  When AR is not activated: Enemies take 10% ➔ 18% more Total DMG.
                </td>
                <td>Part 1 Support
              </tr>
              <tr>
                <td>SS2</td>
                <td>
                  When AR Law of Ascension is activated: <br/>
                  - Team Shield DMG +65% ➔ 80%. Self Shield DMG +40% ➔ 50%. <br/>
                  - Law of Ascension valks Total DMG +7% ➔ 10%
                
                
                </td>
                <td>DPS <br/> Shieldbreak <br/> LoA Support
              </tr>
              <tr>
                <td>SS3</td>
                <td>
                  Leader Skill:<br/>
                  - Reign Solaris' Stellar Shift gain Physical DMG +25% ➔ 28%.
                  <br/>
                  - Enemies take 27% ➔ 28% more Physical DMG from Reign Solaris (independent).     
                </td>
                <td>DPS
              </tr>
              <tr>
                <td>SSS</td>
                <td>
                  UNLOCK: Ult deals extra 200% ATK of Physical DMG.
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
              <p>	When Reign Solaris has Fearless Vanguard buff, enemies take 9% ➔ 12% more Physical DMG from Reign Solaris, and team Total DMG +6% ➔ 11%.
              </p>
              <p class="mt-2"><strong>Good for:</strong> DPS, Support</p>
            </div>
          </div>

          <div class="accordion-item">
            <div class="accordion-title" on:click={() => toggleItem(2)}>
              <span>S2</span>
              <span class="text-md">{openItem === 2 ? '-' : '+'}</span>
            </div>
            <div class="accordion-content {openItem === 2 ? 'open' : ''}">
              <p>	UNLOCK: Quick Charged ATK deals additional 100% ATK of Physical DMG.	
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
              - Reign Solaris' Stellar Shift gain Physical DMG +22% ➔ 25%.<br/>
- Enemies take 26% ➔ 27% more Physical DMG from Reign Solaris (independent).
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
            <p>- Charged ATK Level 3 and Charged ATK EX transfer 35% ➔ 50% dmg from img shell to seed.<br/>
              - Fearless Vanguard: Physical DMG +16% ➔ 20%, Total DMG +11% ➔ 15%.
            </p>
            <p class="mt-2"><strong>Good for:</strong> DPS, IMG counter</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(5)}>
            <span>SS1</span>
            <span class="text-md">{openItem === 5 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 5 ? 'open' : ''}">
            <p>When AR is not activated: Enemies take 10% ➔ 18% more Total DMG.	</p>
            <p class="mt-2"><strong>Good for:</strong> Part 1 Support
            </p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(6)}>
            <span>SS2</span>
            <span class="text-md">{openItem === 6 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 6 ? 'open' : ''}">
            <p>When AR Law of Ascension is activated:<br/>
              - Team Shield DMG +65% ➔ 80%. Self Shield DMG +40% ➔ 50%.<br/>
              - Law of Ascension valks Total DMG +7% ➔ 10%	
            </p>
            <p class="mt-2"><strong>Good for:</strong> DPS, Shieldbreak, LoA Support</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(7)}>
            <span>SS3</span>
            <span class="text-md">{openItem === 7 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 7 ? 'open' : ''}">
            <p>Leader Skill:<br/>
              - Reign Solaris' Stellar Shift gain Physical DMG +25% ➔ 28%.<br/>
              - Enemies take 27% ➔ 28% more Physical DMG from Reign Solaris (independent).	
            <p class="mt-2"><strong>Good for:</strong> DPS</p>
          </div>
        </div>

        <div class="accordion-item">
          <div class="accordion-title" on:click={() => toggleItem(8)}>
            <span>SSS</span>
            <span class="text-md">{openItem === 8 ? '-' : '+'}</span>
          </div>
          <div class="accordion-content {openItem === 8 ? 'open' : ''}">
            <p>		UNLOCK: Ult deals extra 200% ATK of Physical DMG.	</p>
            <p class="mt-2"><strong>Good for:</strong> DPS
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
          <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">Reign Solaris DPS </h2>

          <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">Reign Solaris DPS rotation example with Sparkle and Jovial Deception. Law of Ascension rotation is just alternating between supports. If you are using other supports (for example, Vita or Ba-dum Kiana), just swap Sparkle or JD in the rotation with your support.</p>

          <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/HUsy55KpxXA"
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
      <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">Reign Solaris Support (Part 1)</h2>

      <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">Reign Solaris Support for Part 1 Team example with Dreamweaver</p>

      <div class="relative overflow-hidden" style="padding-top: 56.25%;">
        <iframe
            class="absolute top-0 left-0 w-full h-full"
            src="https://www.youtube.com/embed/lEo7H5wWgag"
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
      <h2 class="text-2xl sm:text-3xl font-semibold bg-linear-to-r from-blue-700 to-blue-500 text-white rounded-sm px-2 mb-2 text-center">GAMEPLAY EXAMPLES</h2>

      <div class=" gap-6 mt-5 mb-10">
        <!-- Video 1 with title and description -->

      
        <div class="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">Durandal DPS</h2>

          <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">Durandal DPS vs Deliverance Kevin</p>

          <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
            loading="lazy" 

                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/ykOI7V8liL8"
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
        <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">Durandal Part 1 Support</h2>

        <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base"> Durandal Supporting Herrscher of Rebirth DPS </p>

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
  
  {#if selectedTab === 'Popular Question'}
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
      <div class="chat-bubble chat-bubble-primary text-base text-white">Why is Durandal small now?</div>
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
        Part 2 story takes place on a super computer's simulation of Mars. Reign Solaris is Durandal's avatar in the simulation world.
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

