

<svelte:head>
    <title>v8.3 Calendar and Boss Schedule</title> 
    <meta property="og:title" content="HI3 Calendar and Boss Schedule"/>
    <meta property="og:description" content="Version 8.3" />
    <meta property="og:image" content={data.ogImage} />
    <meta property="og:url" content="https://marisaimpact.com/valk/calendar83" />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary_large_image">

    <link rel="canonical" href="https://marisaimpact.com/valk/calendar83" />
</svelte:head>

<script>
    export let data; // This will include `ogImage` from the load function

    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import BossCard from '$lib/components/calendarbosspic.svelte'
	import VersionSelect from '$lib/components/VersionSelect.svelte';


    // Tabs
    let activeTab = "Supply"; // Default tab

        // Detect URL query parameters
        onMount(() => {
        const params = new URLSearchParams(window.location.search);
        if (params.has('boss')) {
            activeTab = "Boss";
        }
    });

    // Variables for modal
    let selectedSupply = null;
    let showModal = false;

        // Function to open modal with selected supply data
        function openModal(supplyName) {
        selectedSupply = supplies[supplyName];
        showModal = true;
    }

    // Function to close modal
    function closeModal() {
        showModal = false;
    }

    // Switch tab function
    function switchTab(tabName) {
        activeTab = tabName;
        updateURL(tabName);
    }

    // Function to update the URL based on active tab
    function updateURL(tabName) {
    const url = new URL(window.location.href);

    if (tabName === "Boss") {
        // Set 'boss' without an '='
        url.search = '?boss';
    } else {
        // Remove 'boss' query parameter
        url.searchParams.delete('boss');
    }

    // Use `goto` to change the URL without reloading
    goto(url.pathname + url.search, { replaceState: true });
}

    // Sample data for supplies
    const supplies = {
        "Valk1": {
            title: "Battlesuit Supply A: PAWS",
            description: '<li>Duration: 6 weeks</li><li>First ten pulls are 50% off.</li><li>A-rank: Valkyrie Gloria (UP), Blueberry Blitz, Flame Sakitama, Kriegmesser</li>',
        },
        "Equip": {
            title: "Equipment Supply",
            description: '<li>Equipment Supply only has one featured weapon and stigma set.</li><li>Cost: 280 crystal or Equipment Supply Card, per pull.</li><li>Every 10 pulls guarantee either weapon or stigma.</li><li>Weapon guaranteed in 60 pulls (16,800 crystals) or less.</li>',
        },
        "Returnee": {
            title: "Returnee Supply",
            description: "Condition for returnee status:<li>Captain Level ≥ 15, has no returnee record, and has been 15 days or more since last login</li><li>Captains Level ≥ 15, has a previous returnee record, and has been 45 days or more since login and last returnee status</li><li>Returnee expansion and focus work the same as normal Expansion and Focus Supply, but the pity won't carry over to normal expansion and focus.</li><li>You get one free pull everyday (limited amount)</li>",
        },
        "Topup": {
            title: "Topup Event",
            image: "https://i.imgur.com/7eZLlBw.png"
        },
        "OutfitRerun": {
            title: "Outfit Rerun Event",
            image: "https://i.imgur.com/anYIaO6.jpeg"
        },
    };


</script>



<div class="relative w-full h-40 md:h-70 overflow-hidden "  id="bannerpic">

    <img
      src="https://i.imgur.com/0jPW5D8.jpeg"
      alt="Header"
      class="w-full h-full object-cover  opacity-35"
      />
  
  
   
    <!-- Text overlay -->
    <div class="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 pb-3 md:pb-0 md:pt-6 z-10">
      <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-md font-russoone italic tracking-wider text-shadow-lg/30 ">
        Supply and Boss Timeline
      </h1>
      <p class="text-sm sm:text-lg text-slate-200 drop-shadow-sm">
        Based on CN server. Schedule might be different for Regional servers.

      </p>
    </div>
    
  
    <!-- Blur overlay at bottom -->
    <div class="absolute bottom-0 left-0 w-full h-15 bg-gradient-to-t from-base-100 to-transparent z-0"></div>
  
  </div>
  

<div class="flex justify-center items-end gap-5 -mt-3">

    <VersionSelect currentVersion="8.3"></VersionSelect>

  <div role="tablist" class="tabs-border mt-4 space-x-2 ">
     <button
        role="tab" class="tab {activeTab === 'Supply' ? 'tab-active ' : ''}"
        on:click={() => switchTab("Supply")}
    >
        Supply
    </button>
    <button
        role="tab" class="tab  {activeTab === 'Boss' ? 'tab-active' : ''}"
        on:click={() => switchTab("Boss")}
    >
        Boss
    </button>
</div>

</div>
{#if activeTab === "Supply"}

<div class="p-4 container-screen-2xl flex justify-center items-center mt-4 ">
        <!-- Supply and Events Calendar Layout -->
        <div class="overflow-x-auto ">
            <div class="w-[1215px] rounded-lg bg-linear-to-b from-amber-500 to-amber-100 ">
                <!-- Calendar Header Row -->
                <div class="grid grid-cols-9 gap-2 text-center font-semibold bg-gray-800 text-white p-2 rounded-sm text-sm ">
                    <div>Estimated date for Regional Servers</div>
                    <div>WEEK 1<br/>Jun 26 - Jul 4</div>
                    <div>WEEK 2<br/>Jul 4 - 11</div>
                    <div>WEEK 3<br/>Jul 11 - 18</div>
                    <div>WEEK 4<br/>Jul 18 - 25</div>
                    <div>WEEK 5<br/>Jul 25 - Aug 1</div>
                    <div>WEEK 6<br/>Aug 1 - 8 </div>
                    <div>WEEK 7<br/>Aug 8 - 15</div>
                    <div>WEEK 8<br/>Aug 15 - 21 </div>
                </div>

                <div class="relative grid grid-cols-9 gap-1  h-[55px] pe-1 overflow-x-clip ">
                    <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                         <span class="font-bold0">BATTLESUIT SUPPLY A</span>
                    </div>                    
                    <div on:click={() => openModal("Valk1")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-6 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-amber-700">
                        
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">PAWS<br/>First ten pulls are 50% off</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-32 h-full">
                            <img src="https://i.imgur.com/2P0RKAA.png" alt="Lone Planetfarer" class="w-full h-full object-cover" />
                        </div>
                    </div>    

 
                </div>

                <div class="relative grid grid-cols-9 gap-1  h-[55px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-amber-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-amber-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">EQUIPMENT SUPPLY A</span>
                    </div>                    
                    <div on:click={() => openModal("Equip")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-6 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-amber-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10">PAWS Equipment</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-32 h-full">
                            <img src="https://i.imgur.com/zyGoyBM.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-md" />
                        </div>
                    </div>    
                    


                </div>





                <div class="relative grid grid-cols-9 gap-1  h-[55px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-amber-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">ASTRAL OP SUPPLY</span>
                    </div>                    
                    <div on:click={() => openModal("")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-4 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-amber-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10">Theresa Apocalypse</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-32 h-full">
                            <img src="https://i.imgur.com/wqXgzZw.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-md" />
                        </div>
                    </div>     

                </div>


                <div class="relative grid grid-cols-9 gap-1  h-[55px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-amber-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-amber-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">OUTFIT SUPPLY</span>
                    </div>       
                    <div></div>           
                    <div on:click={() => openModal("")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-2 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-amber-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-5">Eldritch Vantage<br/>9600 crystals</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-12 h-[47px]">
                            <img src="https://i.imgur.com/l2cRslz.png" alt="Vita" class="w-full h-full object-cover rounded-md" />
                        </div>
                    </div>                 
                </div>

                                <div class="relative grid grid-cols-9 gap-1  h-[55px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-amber-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">RETURNEE SUPPLY</span>
                    </div>                  
                    <div on:click={() => openModal("Returnee")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-8 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-amber-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-5">Fenghuang of Vicissitude and her gears</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-40 h-[45px]">
                        </div>
                    </div>                 
                </div>



                
            </div>
        </div>

        

        

</div>

<div class="p-4 container-screen-2xl flex justify-center items-center mb-20 ">
    <!-- Supply and Events Calendar Layout -->
    <div class="overflow-x-auto ">
        <div class="w-[1215px] rounded-lg bg-linear-to-b from-amber-500 to-amber-100 ">
            <!-- Calendar Header Row -->
            <div class="flex gap-2 text-center font-semibold bg-gray-800 text-white p-2 rounded-sm text-sm justify-center">
                <div>EVENTS</div>

            </div>


            <div class="relative grid grid-cols-9 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                     <span class="font-bold0">EVENT 1</span>
                </div> 
    
                <div on:click={() => openModal("")} class="col-span-8 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-amber-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Log-in Event: PAWS Stigma Box, Crystals, AE Imaginon</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-48 h-full">
                        <img src="https://i.imgur.com/bgTkmpi.png" alt="Event 1" class="w-full h-full object-cover " />
                    </div>
                </div>

            </div>

            <div class="relative grid grid-cols-9 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-amber-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-amber-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 2</span>
                </div> 
    
                <div on:click={() => openModal("")} class="col-span-8 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-amber-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Bon Voyage! Towards Blessings and Wishes!</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-48 h-full">
                        <img src="https://i.imgur.com/z3d7BAE.png" alt="Event 1" class="w-full h-full object-cover " />
                    </div>
                </div>

            </div>

            <div class="relative grid grid-cols-9 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-amber-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 3</span>
                </div> 
    
                <div on:click={() => openModal("Topup")} class="col-span-8 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-amber-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Top-Up Event<br/>
                        Topup ~100 usd to get up to 3 LV or FoV stamps, and more.</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-48 h-full">
                        <img src="https://i.imgur.com/4vwZmIJ.png" alt="Event 1" class="w-full h-full object-cover " />
                    </div>
                </div>

            </div>

            <div class="relative grid grid-cols-9 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-amber-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-amber-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 4</span>
                </div> 
    
                <div on:click={() => openModal("OutfitRerun")} class="col-span-8 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-amber-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Outfit Rerun</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-48 h-full">
                        <img src="https://i.imgur.com/BO38ktw.png" alt="Event 1" class="w-full h-full object-cover " />
                    </div>
                </div>

            </div>
        </div>
    </div>

    

    

</div>

{:else if activeTab === "Boss"}

<div class="p-4 flex justify-center mb-20 mt-4">
    <div class="overflow-x-auto overflow-y-clip">
        <div class="w-[940px] rounded-lg bg-gray-900 text-white" >
            
            <!-- Header Row -->
            <div class="grid grid-cols-6 gap-1 text-center font-semibold bg-gray-800 text-white p-2 rounded-t-lg">
                <div class="col-span-1 px-4 py-2 mr-3 ">v8.3 WEEK</div>
                <div class="col-span-2 mr-4 px-4 py-2">EX ABYSS</div>
                <div class="col-span-3 px-4 py-2">MEMORIAL ARENA</div>
            </div>

            <!-- Week 1 Row -->
            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    1
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                <BossCard image="/images/Bosses/Husk - Nihilus (Hitcount).webp" date="Jun 27" weather="Lightning" bosspage="/boss?husk-hitcount" />
                <BossCard image="/images/Bosses/Herrscher of Sentience.webp" date="Jun 30" weather="Bleed" bosspage="/boss?bleedhos" />
                </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                        <BossCard image="/images/Bosses/Sampo.webp" date="Jun 27"  />
                        <BossCard image="/images/Bosses/Meteor_Guaymas_SSS.webp" />
                        <BossCard image="/images/Bosses/Herrscher of the Void.webp"   />
                    </div>
    

            </div>
            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    2
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                <BossCard image="/images/Bosses/Sampo.webp" date="Jul 4" weather="Melee" bosspage="/boss?sampo" />
                    <BossCard />
                    </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                        <BossCard />
                        <BossCard />
                        <BossCard   />
                    </div>
    

            </div>
            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    3
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                    <BossCard/>
                    <BossCard />
                    </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                        <BossCard />
                        <BossCard />
                        <BossCard   />
                    </div>
    

            </div>
            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    4
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                    <BossCard/>
                    <BossCard />
                    </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                        <BossCard />
                        <BossCard />
                        <BossCard   />
                    </div>
    

            </div>  
            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    5
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                    <BossCard/>
                    <BossCard />
                    </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                        <BossCard />
                        <BossCard />
                        <BossCard   />
                    </div>
    

            </div> 
            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    6
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                    <BossCard/>
                    <BossCard />
                    </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                        <BossCard />
                        <BossCard />
                        <BossCard   />
                    </div>
    

            </div> 
            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    7
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                    <BossCard/>
                    <BossCard />
                    </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                        <BossCard />
                        <BossCard />
                        <BossCard   />
                    </div>
    

            </div>  
            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    8
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                    <BossCard/>
                    <BossCard />
                    </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                        <BossCard />
                        <BossCard />
                        <BossCard   />
                    </div>
    

            </div>                                                      
        </div>
    </div>
</div>


{/if}

<!-- DaisyUI Modal Component -->
{#if showModal && selectedSupply}
    <div class="modal modal-open" on:click={closeModal}>
        <!-- Conditionally apply larger size when an image is present -->
        <div class="modal-box max-w-4xl" on:click|stopPropagation>
            <h2 class="font-bold text-lg mb-4">{selectedSupply.title}</h2>
            <div class="mb-4">
                {@html selectedSupply.description}
            </div>
            {#if selectedSupply.image}
                <img src="{selectedSupply.image}" alt="{selectedSupply.title}" class=" max-h-auto object-cover rounded-md mb-4" />
            {/if}            
            <div class="modal-action">
                <button on:click={closeModal} class="btn">Close</button>
            </div>
        </div>
    </div>
{/if}

<style>
    .text-outline {
        text-shadow:  -1px 1px 1px black, 1px 1px 1px black, 1px -1px 1px black, -1px -1px 1px black}
</style>