

<svelte:head>
    <title>v8.1 Calendar and Boss Schedule</title> 
    <meta property="og:title" content="HI3 Calendar and Boss Schedule"/>
    <meta property="og:description" content="Version 8.2" />
    <meta property="og:image" content={data.ogImage} />
    <meta property="og:url" content="https://marisaimpact.com/valk/calendar82" />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary_large_image">

    <link rel="canonical" href="https://marisaimpact.com/valk/calendar82" />
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
            title: "Battlesuit Supply A: Peregrine Sword",
            description: '<li>Duration: 6 weeks</li><li>First ten pulls are 50% off.</li><li>A-rank: Wolf Dawn (UP), Valkyrie Ranger, Valkyrei Triumph, Valkyrie Blastmetal</li>',
            image: ""
        },
        "Valk2": {
            title: "Battlesuit Supply B: Lone Planetfarer",
            description: '<li>Duration: 2 weeks</li><li>A-rank: TBA</li>',
        },
        "Equip": {
            title: "Equipment Supply",
            description: '<li>Equipment Supply only has one featured weapon and stigma set.</li><li>Cost: 280 crystal or Equipment Supply Card, per pull.</li><li>Every 10 pulls guarantee either weapon or stigma.</li><li>Weapon guaranteed in 60 pulls (16,800 crystals) or less.</li>',
        },
        "HoHDLC": {
            title: "Equipment Supply",
            description: '<li>Equipment Supply only has one featured weapon and stigma set.</li><li>Cost: 280 crystal or Equipment Supply Card, per pull.</li><li>Every 10 pulls guarantee either weapon or stigma.</li><li>Weapon guaranteed in 60 pulls (16,800 crystals) or less.</li>',
            image: "https://i.imgur.com/kniF12q.jpeg"
        },
        "BadumWeapon": {
            title: "Equipment Supply",
            description: '<li>Equipment Supply only has one featured weapon and stigma set.</li><li>Cost: 280 crystal or Equipment Supply Card, per pull.</li><li>Every 10 pulls guarantee either weapon or stigma.</li><li>Weapon guaranteed in 60 pulls (16,800 crystals) or less.</li>',
            image: ""
        },
        "Returnee": {
            title: "Returnee Supply",
            description: "Condition for returnee status:<li>Captain Level ≥ 15, has no returnee record, and has been 15 days or more since last login</li><li>Captains Level ≥ 15, has a previous returnee record, and has been 45 days or more since login and last returnee status</li><li>Returnee expansion and focus work the same as normal Expansion and Focus Supply, but the pity won't carry over to normal expansion and focus.</li><li>You get one free pull everyday (limited amount)</li>",
        },
    };


</script>



<div class="max-w-5xl mx-auto p-4 pb-0 rounded-lg  text-center mb-5">

    <h2 class="text-2xl font-semibold mb-2 text-cyan-400 ">Supply and Event Timeline</h2>
    <p class="text-xs sm:text-sm">
        The data is based on CN server. Schedule might be different for SEA / KR / GLB servers.
    </p>
</div>
  

<div class="flex justify-center items-end gap-5">

    <VersionSelect currentVersion="8.2"></VersionSelect>

  <div role="tablist" class="tabs-bordered mt-4 space-x-2 ">
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
            <div class="w-[1350px] rounded-lg bg-gradient-to-b from-cyan-500 to-cyan-100 ">
                <!-- Calendar Header Row -->
                <div class="grid grid-cols-10 gap-2 text-center font-semibold bg-gray-800 text-white p-2 rounded text-sm ">
                    <div>Estimated date for Regional Servers</div>
                    <div>WEEK 1<br />Apr 24 - May 2</div>
                    <div>WEEK 2<br />May 2 - 9</div>
                    <div>WEEK 3<br />May 9 - 16</div>
                    <div>WEEK 4<br />May 16 - 23</div>
                    <div>WEEK 5<br />May 23 - 30</div>
                    <div>WEEK 6<br />Mar 30 - Jun 6 </div>
                    <div>WEEK 7<br />Jun 6 - 13 </div>
                    <div>WEEK 8<br />Jun 13 - 20 </div>
                    <div>WEEK 9<br />Jun 20 - 26 </div>
                </div>

                <div class="relative grid grid-cols-10 gap-1  h-[55px] pe-1 overflow-x-clip ">
                    <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                         <span class="font-bold0">BATTLESUIT SUPPLY A</span>
                    </div>                    
                    <div on:click={() => openModal("Valk1")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-6 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-cyan-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Peregrine Sword<br/>First ten pulls are 50% off</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-32 h-full">
                            <img src="https://i.imgur.com/MCy8jwJ.png" alt="Lone Planetfarer" class="w-full h-full object-cover" />
                        </div>
                    </div>    
 
                </div>

                <div class="relative grid grid-cols-10 gap-1  h-[55px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-cyan-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-cyan-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">EQUIPMENT SUPPLY A</span>
                    </div>                    
                    <div on:click={() => openModal("BadumWeapon")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-6 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-cyan-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10">Peregrine Sword Equipment</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-32 h-full">
                            <img src="https://i.imgur.com/hcQe2jm.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-md" />
                        </div>
                    </div>     

                </div>


                <div class="relative grid grid-cols-10 gap-1  h-[55px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-cyan-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">ASTRAL OP SUPPLY</span>
                    </div>                    
                    <div on:click={() => openModal("")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-4 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-cyan-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10">Theresa Apocalypse</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-32 h-full">
                            <img src="https://i.imgur.com/wqXgzZw.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-md" />
                        </div>
                    </div>     
            
                </div>
                <div class="relative grid grid-cols-10 gap-1  h-[55px] pe-1 overflow-x-clip ">
                    <div class="flex font-bold  text-cyan-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-cyan-600 inline-block top-[-3px] left-0"></span>

                        <span class="font-bold0">NEW ADV SUPPLY</span>
                    </div> 
                    <div></div>  
                    <div></div>                   
                    <div></div>  
                    <div></div>                     
                    <div></div>  
                    <div></div>                   
                    <div></div>  
                    <div></div> 
                    <div></div> 
                </div>

                <div class="relative grid grid-cols-10 gap-1  h-[55px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-cyan-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">NEW REBATE EQUIPMENT</span>
                    </div>  
                    <div></div>  
                    <div></div>                   
                    <div></div>  
                    <div></div>                     
                    <div></div>  
                    <div></div>                   
                    <div></div>  
                    <div></div> 
                    <div></div> 
            
                </div>



                <div class="relative grid grid-cols-10 gap-1  h-[55px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-cyan-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-cyan-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">RETURNEE SUPPLY</span>
                    </div>                  
                    <div on:click={() => openModal("Returnee")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-9 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-cyan-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-5">Herrscher of Rebirth</span>
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
        <div class="w-[1350px] rounded-lg bg-gradient-to-b from-cyan-500 to-cyan-100 ">
            <!-- Calendar Header Row -->
            <div class="flex gap-2 text-center font-semibold bg-gray-800 text-white p-2 rounded text-sm justify-center">
                <div>EVENTS</div>

            </div>


            <div class="relative grid grid-cols-10 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                     <span class="font-bold0">EVENT 1</span>
                </div> 
    
                <div on:click={() => openModal("SpendingEvent")} class="col-span-9 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-cyan-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Log-in Event: PS Stigma Box, Crystals, AE Imaginon</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-48 h-full">
                        <img src="https://i.imgur.com/gZhODMb.png" alt="Event 1" class="w-full h-full object-cover " />
                    </div>
                </div>

            </div>

            <div class="relative grid grid-cols-10 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-cyan-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-cyan-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 2</span>
                </div> 
    
                <div on:click={() => openModal("Login1")} class="col-span-9 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-cyan-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Sushang Restaurant</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-48 h-full">
                        <img src="https://i.imgur.com/6irF4y4.png" alt="Event 1" class="w-full h-full object-cover " />
                    </div>
                </div>

            </div>

            <div class="relative grid grid-cols-10 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-cyan-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 3</span>
                </div> 
    
                <div on:click={() => openModal("Login2")} class="col-span-9 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-cyan-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Free ELF: Login and do events to get S-rank ELF selector</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-48 h-full">
                        <img src="https://i.imgur.com/ZcIHhFf.png" alt="Event 1" class="w-full h-full object-cover " />
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
                <div class="col-span-1 px-4 py-2 mr-3 ">v8.2 WEEK</div>
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
                    <BossCard image="/images/Bosses/Herrscher of Sentience.webp" date="Apr 25" weather="Bleed" bosspage="/boss?bleedhos" />
                    <BossCard image="/images/Bosses/Alien Guard.webp" date="Apr 28" weather="Physical" bosspage="/boss?phyalien" />
                    </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                        <BossCard image="/images/Bosses/Lantern_Tsavorae_SSS.webp" date="Apr 29"  />
                        <BossCard image="/images/BossesMA/Argent Knight Artemis_SSS.webp"  />
                        <BossCard image="/images/BossesMA/Kallen.webp"  />
                    </div>
    

            </div>

            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    2
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                    <BossCard image="/images/Bosses/Lantern_Tsavorae_SSS.webp" date="May 2" weather="Flux" bosspage="/boss?lantern" />
                    <BossCard />
                </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                        <BossCard />
                        <BossCard />
                        <BossCard />
                    </div>
    

            </div>
            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    3
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                    <BossCard />
                    <BossCard />
                    </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                        <BossCard />
                        <BossCard />
                        <BossCard />
                    </div>
    

            </div>
            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    4
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                    <BossCard />
                    <BossCard />
                    </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                        <BossCard />
                        <BossCard />
                        <BossCard />
                    </div>
    

            </div>
            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    5
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                    <BossCard />
                    <BossCard />
                    </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                        <BossCard />
                        <BossCard />
                        <BossCard />
                    </div>
    

            </div>

            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    6
                </div>
                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                    <BossCard />
                    <BossCard />
                    </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                        <BossCard />
                        <BossCard />
                        <BossCard />
                    </div>
    

            </div>

            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    7
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                    <BossCard />
                    <BossCard />
                    </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                        <BossCard />
                        <BossCard />
                        <BossCard />
                    </div>
    

            </div>

            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    8
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                    <BossCard />
                    <BossCard />
                    </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                        <BossCard />
                        <BossCard />
                        <BossCard />
                    </div>
    


            </div>
            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    9
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                <BossCard />
                <BossCard />
                </div>
                 
                <div class="flex col-span-3 justify-center gap-1 ml-2">
                    <BossCard />
                    <BossCard />
                    <BossCard />
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