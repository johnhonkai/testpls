<script lang="ts">
  import { onMount } from 'svelte';
  import Charred from '$lib/components/charpctred.svelte';
  import SimpDPS from '$lib/components/lineup/simpdps.svelte';
  import SenaDPS from '$lib/components/lineup/senadps.svelte';
  import JDDPS from '$lib/components/lineup/jddps.svelte';
  import LanternDPS from '$lib/components/lineup/lanterndps.svelte';
import ThelDPS from '$lib/components/lineup/thelemadps.svelte';
import VitaDPS from '$lib/components/lineup/vitadps.svelte';

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
  { name: 'Support Buffs', short: 'support' },
  { name: 'How to Play', short: 'howtoplay' },
  { name: 'Gameplay Examples', short: 'example' },
  { name: 'Elysian Realm', short: 'er' },
  { name: 'Rank Up', short: 'rank' },
  { name: 'Popular Question', short: 'qna' },
  { name: 'Overview Card', short: 'card' },
  { name: 'Translation Error', short: 'translation' },
];  

function selectTab(tab) {
  selectedTab = tab;
}


  // onMount to check for URL parameters
  onMount(() => {
  // Get the current URL query parameters
  const urlParams = new URLSearchParams(window.location.search);
  const tabParam = urlParams.get('tab');

  // If a short URL parameter exists, find the corresponding full tab name
  if (tabParam) {
      const fullTab = tabs.find(tab => tab.short === tabParam)?.name;
      if (fullTab) {
          selectedTab = fullTab;
      }
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
  let senalikes = 0;
  let senahasLiked = false;

  // Check local storage to see if the user has already liked
  onMount(() => {
    senahasLiked = JSON.parse(localStorage.getItem('senahasLiked')) || false;
      // Load the initial likes count from the server or storage
      senalikes = parseInt(localStorage.getItem('senalikes')) || 0;
  });

  function increaseLike() {
      // Prevent spamming: only allow if the user hasn't liked yet
      if (!senahasLiked) {
        senalikes += 1;
        senahasLiked = true;

          // Store the new like count and flag in local storage
          localStorage.setItem('senalikes', senalikes);
          localStorage.setItem('senahasLiked', JSON.stringify(senahasLiked));
      } else {
          alert("You've already liked this page!");
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
<div class="absolute   top-0 w-full h-[90vh] z-[-10] opacity-85 ">    
  <img src="https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/valkbg/wave_helia.svg" alt="Lone Planetfarer" class="w-full h-full object-cover overflow-hidden" /> 
</div>


<div class="fixed  h-1/2 w-1/2 top-[-5vh] right-[-20vw]  z-[-8] hidden sm:block ">    
  <img src="https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/valkbg/ava_helia.webp" alt="Lone Planetfarer" class=" object-contain slide-in-pls" /> 
</div>

<!-- Left: Character Image -->
<div class="relative  w-auto h-48 sm:h-60 md:h-72 flex justify-center ">
  <!-- Image for Larger Screens -->
  <img src="/images/valkfull/Helia.png" alt="Sparkle" class="h-full w-auto object-cover md:object-contain  " style ="view-transition-name: valkyrie-image-7;"/> 

  <div class="absolute bottom-0 left-0 like-container flex items-center gap-2 mt-4">
    <button on:click={increaseLike} class="bg-gray-800 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all">
      🩷 <span class="text-white font-semibold">{senalikes}</span>
    </button>
    
  </div>

</div>



<!-- Right: Character Info (Centered) -->
<div class="flex flex-col items-center text-center justify-start">
  <!-- Battlesuit Name -->

  <div>
  <h1 class="text-xl md:text-2xl text-slate-100 font-bold text-center leading-4 mb-2 sm:mb-0">Valkyrie Boltstorm</h1>
</div>
  <!-- Character Name and Release Date -->
  <p class="text-base md:text-md custom-font mb-2 text-center tracking-wider sm:block hidden text-slate-100">Erdős Helia | Release Date: v7.3 (29 Feb 2024)  </p>

  <!-- Common wrapper to ensure same width -->
  <div class="w-full max-w-sm mb-2">
    <!-- Container with 4 pictures (Centered) -->
    <div class="flex flex-col items-center">
      <div class="flex w-[260px] md:w-[300px] gap-2 flex-wrap justify-center outline outline-rose-500 outline-1 bg-rose-950/75 rounded-lg p-2 backdrop-blur-sm">
        <img src="/images/ranks/Valkyrie_A.webp" alt="S-rank" class="w-auto h-8 md:h-10" />
        <img src="/images/type/IconMECH.png" alt="Mech" class="w-auto h-8 md:h-10" />
        <img src="/images/element/Core_Lightning_DMG.png" alt="Icon 3" class="w-auto h-8 md:h-10" />
        <img src="/images/artype/ar world star.png" alt="ar" class="w-auto h-8 md:h-10" />
      </div>
    </div>

    <!-- Support For Container (Centered) -->
    <div class="flex flex-col mt-4 items-center">

      <div class="flex flex-col  w-[260px] md:w-[300px] flex-wrap justify-center outline outline-rose-500 outline-1 bg-rose-950/75 rounded-lg p-2 backdrop-blur-sm">
        <div class="flex flex-wrap justify-center">
          <h2 class="text-base md:text-md custom-font tracking-wider text-slate-100">SUPPORT FOR:</h2>
        </div >
        <div class="flex flex-row gap-2 flex-wrap justify-center">
          <img src="/images/artype/ar world star.png" alt="Support 1" class="w-auto h-8 md:h-10" />
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
        on:click={() => (selectedTab = tab.name)}
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
<select class="select select-bordered w-full max-w-xs" on:change={selectTabMobile}>

    {#each tabs as tab}
        <option 
            value={tab.name} selected={selectedTab === tab.name}>
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
      <h2 class="text-2xl sm:text-3xl font-semibold bg-gradient-to-r  from-blue-700 to-blue-500 text-white rounded px-2 mb-2 text-center">OVERVIEW</h2>

      <div>
          <!-- Roles Section -->
          <h2 class="text-xl  font-semibold mb-2 text-left cooltext text-slate-100">ROLES</h2>
          
          <p class="mt-2 text-sm sm:text-base">
              <strong class="text-amber-400">World Star Support:</strong> When fully geared, Helia is a powerful support for World Star team (Deepspace Anchor, Schicksal's Imperative and Sparkle), but loses to other S-rank supports due to slower rotation and lack of timestop and self damage.
          </p>

          <p class="mt-2 text-sm sm:text-base">
            <strong class="text-amber-400">Utilities:</strong> Has high hitcount, and can apply moderate paralyze trauma.
        </p>
          
          <div class="divider divider-neutral"></div>
          <!-- Pull Recommendation Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">FARM RECOMMENDATION</h2>
          <p class="mt-2 text-sm sm:text-base">
              <strong class="text-amber-400">New Players:</strong> Not a priortiy, but you should farm Helia if you have a World Star DPS (Deepspace Anchor, Schicksal's Imperative, or Sparkle), and you're lacking the third support for that DPS.
          </p>
          
          <p class="mt-2 text-sm sm:text-base">
              <strong class="text-amber-400">Competitive:</strong> Helia is still a great support, but loses to other S-rank supports due to slower rotation and lack of timestop and self damage. 
              For characters like SIMP and Sparkle, they have 18 resonance trigger limit - It's better to pair them with a character with 6 mark trigger count (like Vita, Thelema, HoFi) instead of Helia.
          </p>

          <div class="divider divider-neutral"></div>
          <!-- How to Get Section -->
          <h2 class="text-xl font-semibold mb-2 text-left text-slate-100 cooltext">HOW TO GET</h2>
          <ul class="list-disc ml-6 text-sm sm:text-base ">
              <li ><strong>Helia:</strong>  Asterite Shop, Open World Task, Battlesuit Supply</li>
              <li><strong>Helia's Weapon:</strong> Part 2 Chapter 5, Equipment Supply, Synergy Upgrade in Asterite Shop</li>
              <li><strong>Helia's Stigma:</strong> Equipment Supply, Forgeable</li>
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
                  src="https://www.youtube.com/embed/8AwMiPw-4Hs"
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

      <div class="divider divider-accent text-xl custom-font tracking-wider text-teal-300"> World Star Support </div>
      
      <SimpDPS firstCharName='Helia' />

      <div class="divider divider-neutral"></div>

      <SenaDPS firstCharName='Helia'  />


</section>

  {/if}

      {#if selectedTab === 'Equipment'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-gradient-to-r  from-blue-700 to-blue-500 text-white rounded px-2 mb-2 text-center">EQUIPMENT</h2>
 
      <div>


              <h2 class="text-xl font-semibold text-center  text-yellow-400">BEST</h2>

              <div class="flex flex-col justify-center items-center">
                  
              <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/01/29/79683856/ea83fc1ab3d44a7cb541fadea9fb5cd5_7541009746074619802.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/01/30/79683856/69d076fa0d6882d76458640f1f6fe4bf_4418170955858098658.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/01/30/79683856/5424dfb45576c9eb4b4002786f423c6a_3340305908070674952.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

                  <div class="w-20 h-20 sm:w-28 sm:h-28">
                      <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/01/30/79683856/82d648db344c8f1a095c7ee142c4f005_6624252308515445179.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
                  </div>

              </div>  
              <h4 class="text-base sm:text-base text-white">Electrifying Arc + Von Neumann</h4>
              </div>

              <div class="p-2 mt-2 bg-gradient-to-r from-cyan-950/75 to-cyan-900/75 rounded" >
              <p class="text-sm sm:text-base text-left">
                  <li class="text-sm sm:text-base"><b>Electrifying Arc:</b> Although Helia does not rely on Electrifying Arc to function, this weapon contributes around 20% of team dmg, which is big.</li>
                  <li class="text-sm sm:text-base"><b>Von Neumann: </b> All buffs. Some sp regen for Helia. </li>
                  <li class="text-sm sm:text-base"><b>Affix: </b> Full ATK.</li>
              </p>
              </div>



           </div>
      {/if}

      {#if selectedTab === 'Support Buffs'}
      <h2 class="text-2xl sm:text-3xl font-semibold bg-gradient-to-r  from-blue-700 to-blue-500 text-white rounded px-2 mb-2 text-center">SUPPORT BUFFS</h2>

      <div class="my-5 text-sm sm:text-base">
      <p class=" text-slate-100">
        How to activate Helia buffs:
        <li class="mb-1"> <b>Stellar Drain:</b> Weapon skill finisher Target Bombardment consumes Stellar Drain.</li>
        <li class="mb-1"> <b>Ultimate:</b> Restore 3 AR, and enemies take 20% more Ice/Fire DMG and 32% more Lightning DMG for 25s. This is also activated / refreshed during Stellar Outburst. During SO, this effect is increased by 20%, and enemies take 6% more Total DMG from resonance atk.</li>
        <li class="mb-1"> <b>Targeted Bombardment / Ult: </b> Team Ice/Fire DMG +25%, Lightning DMG +40% fro 25s. This is also activated / refreshed during Stellar Outburst. During SO, this effect is increased by 20%.</li>
        <li class="mb-1"> <b>Rapidshot:</b> Von Neumann 3PC: Each rapidshot hit grants Status Sequence stack. Teammates' attacks will consume the stack, Total DMG +40% for 1s.</li>
        <li class="mb-1"> <b>Homing Blast:</b> Deal 18 Paralyze trauma.</li>
        <li class="mb-1"> The rest of her buffs are activated passively.</li>
      </p>
      </div>

      <div class="flex flex-wrap gap-4">
        <!-- Example image list for support buffs; add your own image sources -->
        <img
          src="/images/valkbuff/buff_helia.png"
          alt="Buff 1"
          class=" object-cover cursor-pointer"
          on:click={() => openLightbox('/images/valkbuff/buff_helia.png')}
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
            Stellar Outburst
          </button>
        
          <button
            on:click={() => setPlaystyle('2')}
            class={`px-4 py-2 font-semibold rounded ${activePlaystyle === '2' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700 hover:bg-gradient-to-r from-orange-600 to-amber-500 hover:text-white'}`}
          >
            Infinite Rapid Shot
          </button>
        </div>
      
        {#if activePlaystyle === '1'}
        <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">STELLAR OUTBURST PLAYSTYLE</h2> 
        <p class="text-sm sm:text-base text-center sm:text-left">
          Pros: Strong. Cons: Have to sit through Stellar Outburst animation.
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
              <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b> Resolution + Vivace</p>
              <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Meditation</p>
            </div>
          </div>
          
        </div>
        <div class="p-2 mt-3 rounded" >
          <p class="text-sm sm:text-base text-left">
              <li class="text-sm sm:text-base"> ER Lite mode: Equip Because of You sigil and get all three Ego signets on Floor 7.</li>
              <li class="text-sm sm:text-base"> Normal mode: Helia is really strong with Electrifying Arc and after she gets all three signets. It is recommended to get both Ego signets at the start by using Thorny Crown sigil, OR by resetting Floor 1 until you get another Ego portal, OR use Because of You support sigil and get the other two Ego signets on Floor 7.</li>
          </p>
          </div>

          <div class="divider divider-neutral"></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            <!-- First Signet with 'Start' text -->
            <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
                <img src="/images/signets/Signets of Helix (Vill-V).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1 or 2</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Bodhi (Su).png" alt="Signet 5" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">2</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Gold (Eden).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
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
            <p class="text-sm sm:text-base text-left">
               <b>Helix 1 or 2?</b>  Helix 1 only needs the nexus. Once you get the nexus, you can proceed to build other signets. Helix 2 wants more enhancement signets. Also, the time fracture triggered from Helix 2 explosion suspends the spawn animation of some enemies.
            </p><br/>

            <p class="text-sm sm:text-base text-left ">

              <b>Decimation:</b> Nexus 1 is stronger but - [1] Requires you to spam Blood Rose hp reduction, and [2] If battle takes too long, you will recover too much HP.
              Get enhancement [Burden, Difficulty, and Calamity] to keep your HP consistently low.

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
                    <img src="/images/sigils/Falling_in_Past_Light.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">FINAL</p>
            </div>

            <div class="flex flex-col items-center p-1 rounded relative border border-slate-500 ">
              <div class="flex flex-row rounded">
                  <img src="/images/sigils/Tin_Flask.webp" alt="Goblet" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                  <img src="/images/sigils/Dreamful_Gold.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
              </div>
              <p class="text-base sm:text-lg font-semibold">FINAL</p>
          </div>

          </div>

          
          <div class="divider divider-neutral"></div>
          <h2 class="text-xl font-semibold mb-4 text-left text-white cooltext">HOW TO PLAY</h2>

          <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>Activate Stellar Outburst</li>
          <li>Press weapon to enter Rapid Shot state, then just let Helia fire and auto-cast grenade</li>
          <li>To recover meter, press Weapon ➔ Basic ATK to launch follow-up attack</li>
          <li>If you have Ego signet [Meditation], you can use Ult to recover full meter </li>
          <li>Repeat steps 2,3,4 until Stellar Outburst ends</li>
          <li>During AR Charging state, just do step 2 and 3 until AR is full again</li>
          <li>Repeat</li>
        </ol>

        <p class="mt-2 text-sm sm:text-base pb-4 text-center">
            Check out this showcase from Marisa Honkai:
        </p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/7EUv761jrfk"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                loading="lazy">
            </iframe>
        </div>
        {/if}

        {#if activePlaystyle === '2'}
        <h2 class="text-xl md:text-2xl font-semibold mb-0 md:mb-2 text-center sm:text-left text-blue-400">INFINITE RAPIDSHOT PLAYSTYLE</h2> 
        <p class="text-sm sm:text-base text-center sm:text-left">
          Weaker playstyle, but don't have to sit through Stellar Outburst animation. Sometimes against huge / mobs, you have to look real hard for the reload drop.
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
              <p class="text-sm sm:text-lg text-slate-100"> <b>Start:</b>  Sparkling Lightning + Improvisation</p>
              <p class="text-sm sm:text-lg text-slate-100"> <b>Optional:</b> Meditation</p>
            </div>
          </div>
        </div>
        <div class="p-2 mt-3 rounded" >
          <p class="text-sm sm:text-base text-left">
              <li class="text-sm sm:text-base"> ER Lite mode: Equip Because of You sigil and get all three Ego signets on Floor 7.</li>
              <li class="text-sm sm:text-base"> Normal mode: Helia is really strong with Electrifying Arc and after she gets all three signets. It is recommended to get both Ego signets at the start by using Thorny Crown sigil, OR by resetting Floor 1 until you get another Ego portal, OR use Because of You support sigil and get the other two Ego signets on Floor 7.</li>
          </p>
          </div>
          <div class="divider divider-neutral"></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">GENERAL SIGNETS</h2>
          <div class="flex flex-wrap gap-2 justify-center sm:justify-start">
            <!-- First Signet with 'Start' text -->
            <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <div class="badge badge-accent z-10 absolute top-2 font-semibold">START</div>
                <img src="/images/signets/Signets of Helix (Vill-V).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1 or 2</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Bodhi (Su).png" alt="Signet 5" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">2</p>
              </div>

              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Gold (Eden).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1</p>
              </div>
          
            <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Decimation (Kalpas).png" alt="Signet 3" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold ">1 or 2</p>
              </div>
            

              <div class="flex flex-col items-center  p-1 rounded relative border border-slate-500">
                <img src="/images/signets/Signets of Reverie (Pardofelis).png" alt="Signet 6" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                <p class="text-lg font-semibold">1</p>
              </div>

          </div>

          <div class="p-2 mt-3 rounded" >
            <p class="text-sm sm:text-base text-left ">

               <b>Decimation:</b> Nexus 1 is stronger but - [1] Requires you to spam Blood Rose hp reduction, and [2] If battle takes too long, you will recover too much HP.
               Get enhancement [Burden, Difficulty, and Calamity] to keep your HP consistently low.

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
                    <img src="/images/sigils/Falling_in_Past_Light.webp" alt="Because of You" class="w-16 h-16 sm:w-20 sm:h-20 object-cover">
                </div>
                <p class="text-base sm:text-lg font-semibold">FINAL</p>
            </div>

          </div>

          
          <div class="divider divider-neutral"></div>
          <h2 class="text-xl font-semibold mb-4  text-left text-white cooltext">HOW TO PLAY</h2>

          <ol class="list-decimal px-4 mb-6 text-sm sm:text-base">
          <li>Press weapon, then follow up attack to fully recover Rapid Shot meter</li>
          <li>Press weapon to enter Rapid Shot state</li>
          <li>Pick up the drop to continue firing</li>
        </ol>

        <p class="mt-2 text-sm sm:text-base pb-4 text-center">
            Check out this showcase from Marisa Honkai:
        </p>

        <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/yL4N5qCLQCk"
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
      <h2 class="text-2xl sm:text-3xl font-semibold bg-gradient-to-r  from-blue-700 to-blue-500 text-white rounded px-2 mb-2  text-center">RANK UP</h2>




        {#if !isMobile}
        <!-- Full Rank Up List -->
        <div class="text-slate-100 text-left mt-5">
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
                <td >S</td>
                <td>

                  1. Team Elemental DMG +20% ➔ 25%, Lightning DMG +32% ➔ 40%<br/>
                  2. Increase effect of Thunder Surge and Thunder Tangle by 20%<br/>
                  3. Enemies take 6% more Total DMG from resonance atk<br/>
                  4. Unlocks paralyze trauma
                </td>
                <td class="p-3">Support <br/> Paralyze Trauma  </td>
              </tr>
              <!-- Sample Row 2 -->
              <tr>
                <td>SS</td>
                <td>
                  1. Team Weapon Skill Total DMG +16%<br/>
                  2. Team Resonance ATK gain Total DMG +30%<br/>
                </td>
                <td>Support </td>
              </tr>
              <tr>
                <td>SSS</td>
                <td>
                	
1. Each rapid shot hit recovers 0.4 sp<br/>
2. Debuff improved: Ice/Fire DMG Taken +15% ➔ 20%, Lightning DMG Taken +27% ➔ 35%
 </td>
                <td>Support </td>
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
            <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">Vita DPS</h2>

            <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">Vita DPS rotation with Coralie and HoFi support.</p>

            <div class="relative overflow-hidden" style="padding-top: 56.25%;">
              <iframe
                  class="absolute top-0 left-0 w-full h-full"
                  src="https://www.youtube.com/embed/8AwMiPw-4Hs"
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
          <h2 class="text-xl  font-semibold mb-2 text-left text-slate-100 cooltext">Vita Support</h2>

          <p class="text-gray-200 mt-2 mb-4 text-sm sm:text-base">Vita's rotation as a support in World Star and Wheel of Destiny teams.</p>

          <div class="relative overflow-hidden" style="padding-top: 56.25%;">
            <iframe
                class="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/8AwMiPw-4Hs"
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
  
      <div class="grid gap-6 md:grid-cols-2 my-6">
          <div class="bg-gray-800 p-4 rounded-lg shadow-md">
              <iframe 
                  src="https://www.youtube.com/embed/VIDEO_ID_1" 
                  title="YouTube video player" 
                  frameborder="0" 
                  class="w-full h-64 rounded-md"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen>
              </iframe>
              <p class="text-gray-200 mt-2">Test</p>
          </div>
  
          <div class="bg-gray-800 p-4 rounded-lg shadow-md">
              <iframe 
                  src="https://www.youtube.com/embed/VIDEO_ID_2" 
                  title="YouTube video player" 
                  frameborder="0" 
                  class="w-full h-64 rounded-md"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                  allowfullscreen>
              </iframe>
              <p class="text-gray-200 mt-2">Test</p>
          </div>
  
      </div>
  {/if}
  
  {#if selectedTab === 'Popular Question'}
  <h2 class="text-2xl sm:text-3xl font-semibold bg-gradient-to-r  from-blue-700 to-blue-500 text-white rounded px-2 mb-2 text-center">POPULAR QUESTION</h2>

      <div class="my-6">
        <div class="chat chat-start ">
          <div class="chat-image avatar">
            <div class="w-10 sm:w-12 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="/images/meibald.webp" />
            </div>
          </div>
          <div class="chat-bubble chat-bubble-primary text-base ">Does Helia need Electrifying Arc weapon?</div>
        </div>

        <div class="chat chat-end">
          <div class="chat-image avatar">
            <div class="w-10 sm:w-12 rounded-full">
              <img
                alt="Tailwind CSS chat bubble component"
                src="/images/ds.webp" />
            </div>
          </div>
          <div class="chat-bubble chat-bubble-neutral text-slate-100">Although Helia does not rely on Electrifying Arc to function, this weapon contributes around 20% of team dmg, which is big. Electrifying Arc is also FREE from Part 2 Chapter 5. Go get it~</div>
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
      <div class="flex flex-col justify-center items-center">
          
          <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">

              <div class="w-20 h-20 sm:w-28 sm:h-28">
                  <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/01/30/79683856/69d076fa0d6882d76458640f1f6fe4bf_4418170955858098658.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
              </div>

          </div>  
          <p class="text-sm sm:text-base text-white">Von Neumann T</p>

      </div>

      <div class="text-center my-4 rounded bg-gray-700">
        <p class="text-left text-sm sm:text-base px-2 py-3">
          <b>In-Game Text:</b><br/>
          ... they deal 24% more Lightning DMG with Resonance ...
        </p>
      </div>

      <div class="text-center my-4 rounded bg-cyan-700">
        <p class="text-left text-sm sm:text-base px-2 py-3">
          <b>Correct Translation:</b><br/>
          ... their Resonance ATK deal 30% more Lightning DMG ...
        </p>
      </div>

      <div class="flex flex-col justify-center items-center">
          
        <div class="flex flex-wrap my-2 rounded-lg overflow-hidden w-fit gap-1">

            <div class="w-20 h-20 sm:w-28 sm:h-28">
                <img src="https://act-upload.mihoyo.com/bh3-wiki/2024/01/30/79683856/82d648db344c8f1a095c7ee142c4f005_6624252308515445179.png?x-oss-process=image/quality,q_75/resize,s_120" alt="Vita" class="w-full h-full object-cover">
            </div>

        </div>  
        <p class="text-sm sm:text-base text-white">Von Neumann B</p>

    </div>

    <div class="text-center my-4 rounded bg-gray-700">
      <p class="text-left text-sm sm:text-base px-2 py-3">
        <b>In-Game Text:</b><br/>
        Increases Lightning DMG by 35%.
      </p>
    </div>

    <div class="text-center my-4 rounded bg-cyan-700">
      <p class="text-left text-sm sm:text-base px-2 py-3">
        <b>Correct Translation:</b><br/>
        Increases weapon skill Lightning DMG by 35%.
      </p>
    </div>
      {/if}


  </div>

</section>


</div>

</section>


</div>

