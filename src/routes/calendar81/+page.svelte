

<svelte:head>
    <title>v8.1 Calendar and Boss Schedule</title> 
    <meta property="og:title" content="HI3 Calendar and Boss Schedule"/>
    <meta property="og:description" content="Version 8.1" />
    <meta property="og:image" content={data.ogImage} />
    <meta property="og:url" content="https://marisaimpact.com/valk/calendar81" />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary_large_image">

    <link rel="canonical" href="https://marisaimpact.com/valk/calendar81" />
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
            title: "Battlesuit Supply A: Ba-dum! Fiery Wishing Star",
            description: '<li>Duration: 6 weeks</li><li>First ten pulls are 50% off.</li><li>A-rank: Valkyrie Blastmetal (UP), Shadow Dash, Valkyrie Accipiter, Valkyrie Gloria</li>',
            image: "https://i.imgur.com/Bgwl3ag.jpeg"
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
            image: "https://i.imgur.com/55haToA.jpeg"
        },
        "Returnee": {
            title: "Returnee Supply",
            description: "Condition for returnee status:<li>Captain Level ≥ 15, has no returnee record, and has been 15 days or more since last login</li><li>Captains Level ≥ 15, has a previous returnee record, and has been 45 days or more since login and last returnee status</li><li>Returnee expansion and focus work the same as normal Expansion and Focus Supply, but the pity won't carry over to normal expansion and focus.</li><li>You get one free pull everyday (limited amount)</li>",
        },
        "Login1": {
            title: "7-Day Login 1",
            description: "Continued from v8.0 Week 6",
            image: "https://i.imgur.com/72vgGBG.png"
        },
        "Login2": {
            title: "7-Day Login 2",
            image: "https://i.imgur.com/R670Fut.png"
        },
        "Srankbox": {
            title: "S-rank Box. Choose one:",
            image: "https://i.imgur.com/BsIUjAl.png"
        },
        "ADV": {
            title: "ADV Supply",
            description: '<li>Duration: 2 weeks</li><li>Every 10 pulls guarantee either A-rank or S-rank card.</li> <li>S-rank card guaranteed within 100 pulls.</li><li>You also get one rank-up stamp (10 frags) every 10 pulls, until 100 pulls. (Total 10 stamps = 100 frags)</li>'
        },
        "Rebate": {
            title: "REBATE FOCUSED SUPPLY",
            description: "<li>Duration: 2 weeks</li><li>UP: Torch of Eons, Fu Hua OD</li><li>For the first 50 pulls, you get 3 Equipment Supply Cards every 10 pulls (total 15 cards max)</li><li>Weapon: Torch of Eons (UP), Star Dance, Bloodied Casket, Pandora 18, Life Harvester, Rudder in Dream</li><li>Stigma: Fu Hua OD (UP), Cecilia Youth, Van Gogh, Elysia Pristine, Little Joys</li>",
        },
        "Carnival": {
            title: "Carnival Supply",
            description: "",
            image: "https://i.imgur.com/reSwzqO.png"
        },
        "lpoutfit": {
            title: "Outfit Supply",
            description: "<li>Duration: 3 weeks</li><li>Max 9600 crystals for outfit + all rewards</li><li>S-rank box: Herrscher of Sentience card / 10 stamps, Stygian Nymph card / 5 stamps, Starchasm Nyx card / 5 stamps</li>",
            image: "https://i.imgur.com/0Pc7G3X.png"
        },
        "TimeCapsule": {
            title: "Time Capsule",
            description: "",
            image: "https://i.imgur.com/ijwUV7A.png"
        },
        "SpendingEvent": {
            title: "Major Spending Event",
            description: "",
            image: "https://i.imgur.com/Ov9FbQm.png"
        },
    };


</script>



<div class="max-w-5xl mx-auto p-4 pb-0 rounded-lg  text-center mb-5">

    <h2 class="text-2xl font-semibold mb-2 text-red-400 ">Supply and Event Timeline</h2>
    <p class="text-xs sm:text-sm">
        The data is based on CN server. Schedule might be different for SEA / KR / GLB servers.
    </p>
</div>
  

<div class="flex justify-center items-end gap-5">

    <VersionSelect currentVersion="8.1"></VersionSelect>

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
            <div class="w-[1350px] rounded-lg bg-gradient-to-b from-rose-500 to-rose-100 ">
                <!-- Calendar Header Row -->
                <div class="grid grid-cols-10 gap-2 text-center font-semibold bg-gray-800 text-white p-2 rounded text-sm ">
                    <div>Estimated date for SEA / KR / GLB</div>
                    <div>WEEK 1<br />Feb 20 - 28</div>
                    <div>WEEK 2<br />Feb 28 - Mar 7 </div>
                    <div>WEEK 3<br />Mar 7 - 14 </div>
                    <div>WEEK 4<br />Mar 14 - 21</div>
                    <div>WEEK 5<br />Mar 21 - 28</div>
                    <div>WEEK 6<br />Mar 28 - Apr 4 </div>
                    <div>WEEK 7<br />Apr 4 - 11 </div>
                    <div>WEEK 8<br />Apr 11 - 18 </div>
                    <div>WEEK 9<br />Apr 18 - 24 </div>
                </div>

                <div class="relative grid grid-cols-10 gap-1  h-[55px] pe-1 overflow-x-clip ">
                    <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                         <span class="font-bold0">BATTLESUIT SUPPLY A</span>
                    </div>                    
                    <div on:click={() => openModal("Valk1")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-6 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-rose-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Ba-dum! Fiery Wishing Star<br/>First ten pulls are 50% off</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-32 h-full">
                            <img src="https://i.imgur.com/tJWJEDk.png" alt="Lone Planetfarer" class="w-full h-full object-cover" />
                        </div>
                    </div>    
 
                    <div on:click={() => openModal("")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-3 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-rose-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10">Sparkle</span>

                    </div>   
                </div>

                <div class="relative grid grid-cols-10 gap-1  h-[55px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-rose-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-rose-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">EQUIPMENT SUPPLY A</span>
                    </div>                    
                    <div on:click={() => openModal("BadumWeapon")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-6 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-rose-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10">Ba-dum! Fiery Wishing Star Equipment</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-32 h-full">
                            <img src="https://i.imgur.com/zyupPos.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-md" />
                        </div>
                    </div>     

                    <div on:click={() => openModal("")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-3 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-rose-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10">Sparkle Equipment</span>

                    </div>   
                </div>


                <div class="relative grid grid-cols-10 gap-1  h-[55px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-rose-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">ASTRAL OP SUPPLY</span>
                    </div>                    
                    <div on:click={() => openModal("")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-6 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-rose-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10">Theresa Apocalypse</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-32 h-full">
                            <img src="https://i.imgur.com/wqXgzZw.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-md" />
                        </div>
                    </div>     
            
                </div>
                <div class="relative grid grid-cols-10 gap-1  h-[55px] pe-1 overflow-x-clip ">
                    <div class="flex font-bold  text-rose-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-rose-600 inline-block top-[-3px] left-0"></span>

                        <span class="font-bold0">BATTLESUIT SUPPLY B</span>
                    </div> 
                    <div></div>  
                    <div></div>                   
                    <div on:click={() => openModal("Valk2")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-2 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-rose-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Lone Planetfarer</span>

                    </div>    
                    <div></div>  
                    <div></div>  
                    <div on:click={() => openModal("")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-3 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-rose-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10">Reign Solaris</span>

                    </div>   
                </div>

                <div class="relative grid grid-cols-10 gap-1  h-[55px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-rose-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">EQUIPMENT SUPPLY B</span>
                    </div>  
                    <div on:click={() => openModal("HoHDLC")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-2 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-rose-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10">HoH DLC <br/> Solon</span>
                    </div>     
                
                    <div on:click={() => openModal("Equip")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-2 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-rose-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10">Skyveil Feathers <br/> Vita Lone Planetfarer</span>
                    </div>     

                    <div on:click={() => openModal("Equip")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-2 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-rose-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10">Waxing Moon <br/> Iskandar</span>
                    </div>   

                    <div on:click={() => openModal("")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-3 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-rose-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10">Reign Solaris Equipment</span>

                    </div>   
            
                </div>

                <div class="relative grid grid-cols-10 gap-1  h-[55px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-rose-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-rose-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">ADV SUPPLY</span>
                    </div>                    
                    <div></div>  
                    <div></div>   
                    <div></div>
                    <div></div>     
                    <div on:click={() => openModal("ADV")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-2 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-rose-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Herrscher of Finality</span>
   
                    </div>    
                </div>

                <div class="relative grid grid-cols-10 gap-1  h-[55px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-rose-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">CARNIVAL BATTLESUIT</span>
                    </div>           
                    <div on:click={() => openModal("Carnival")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-4 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-rose-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Rotation supply of JD, Lantern, Thelema and SIMP Battlesuit<br/>Starts on Monday</span>
   
                    </div>    
                </div>

                <div class="relative grid grid-cols-10 gap-1  h-[55px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-rose-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-rose-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">CARNIVAL EQUIPMENT</span>
                    </div>           
                    <div on:click={() => openModal("Carnival")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-4 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-rose-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Rotation supply of JD, Lantern, Thelema and SIMP Gears<br/>Starts on Monday</span>
   
                    </div>    
                </div>

                <div class="relative grid grid-cols-10 gap-1  h-[55px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-rose-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">OUTFIT SUPPLY</span>
                    </div>                    
                    <div></div>      
                    <div on:click={() => openModal("lpoutfit")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-3 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-rose-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">LP Outfit</span>
                           <!-- Image positioned on the right side -->
                           <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-24 h-full">
                            <img src="https://i.imgur.com/Gy9X3ap.png" alt="Lone Planetfarer" class="w-full h-full object-cover" />
                        </div>
                    </div>    

                    <div></div> 
                    <div></div> 
                    <div></div> 

                    <div on:click={() => openModal("")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-2 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-rose-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">HoH Peachy Springs</span>
   
                    </div>    
                </div>

                <div class="relative grid grid-cols-10 gap-1  h-[55px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-rose-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-rose-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">RETURNEE SUPPLY</span>
                    </div>                  
                    <div on:click={() => openModal("Returnee")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-9 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-rose-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-5">Lunar Vow and her equipment</span>
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
        <div class="w-[1350px] rounded-lg bg-gradient-to-b from-rose-500 to-rose-100 ">
            <!-- Calendar Header Row -->
            <div class="flex gap-2 text-center font-semibold bg-gray-800 text-white p-2 rounded text-sm justify-center">
                <div>EVENTS</div>

            </div>


            <div class="relative grid grid-cols-10 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                     <span class="font-bold0">EVENT 1</span>
                </div> 
    
                <div on:click={() => openModal("SpendingEvent")} class="col-span-6 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-rose-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Major Spending Event</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-48 h-full">
                        <img src="https://i.imgur.com/ARNAnCq.png" alt="Event 1" class="w-full h-full object-cover " />
                    </div>
                </div>

            </div>

            <div class="relative grid grid-cols-10 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-rose-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-rose-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 2</span>
                </div> 
    
                <div on:click={() => openModal("Login1")} class="col-span-9 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-rose-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Log-in Event 1: Free 5 Battlesuit Supply Cards,  1 Prism Stigma Upgrade Ticket</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-48 h-full">
                        <img src="https://i.imgur.com/PQpo5Cp.png" alt="Event 1" class="w-full h-full object-cover " />
                    </div>
                </div>

            </div>

            <div class="relative grid grid-cols-10 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-rose-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 3</span>
                </div> 
    
                <div on:click={() => openModal("Login2")} class="col-span-9 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-rose-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Log-in Event 2: Kiana Stigma Box, Solon Stigma Box, 10 Equipment Supply Cards</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-48 h-full">
                        <img src="https://i.imgur.com/Dfn8QSg.png" alt="Event 1" class="w-full h-full object-cover " />
                    </div>
                </div>

            </div>

            <div class="relative grid grid-cols-10 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-rose-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-rose-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 4</span>
                </div> 
    
                <div on:click={() => openModal("")} class="col-span-9 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-rose-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Teamfight Tactics Event</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-48 h-full">
                        <img src="https://i.imgur.com/7sMQAg7.png" alt="Event 1" class="w-full h-full object-cover " />
                    </div>
                </div>

            </div>
            <div class="relative grid grid-cols-10 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-rose-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 5</span>
                </div> 
                
                <div on:click={() => openModal("")} class="col-span-4 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-rose-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Spring Lobby 2025</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-48 h-full">
                        <img src="https://i.imgur.com/6if181W.png" alt="Event 1" class="w-full h-full object-cover " />
                    </div>
                </div>

                <div on:click={() => openModal("")} class="col-span-5 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-rose-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Elysian Realm: Performance Test</span>

                </div>
            </div>

            <div class="relative grid grid-cols-10 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-rose-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-rose-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 6</span>
                </div> 
    
                <div on:click={() => openModal("TimeCapsule")} class="col-span-4 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-rose-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Time Capsule</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-32 h-full">
                        <img src="https://i.imgur.com/HY5K6Bb.png" alt="Event 1" class="w-full h-full object-cover " />
                    </div>
                </div>
                <div on:click={() => openModal("")} class="col-span-5 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-rose-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Free Outfits</span>

                </div>

            </div>
            <div class="relative grid grid-cols-10 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-rose-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 7</span>
                </div> 
                <div on:click={() => openModal("")} class="col-span-4 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-rose-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Free 2x Carnival Battlesuit Supply 10-Pull Cards <br/> Starts on Monday. Expires after supply ends.</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-32 h-full">
                        <img src="https://i.imgur.com/bM4dZEU.png" alt="Event 1" class="w-full h-full object-cover " />
                    </div>
                </div>
                <div></div>
                <div on:click={() => openModal("")} class="col-span-1 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-rose-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Bingo event?</span>

                </div>
            </div>

            <div class="relative grid grid-cols-10 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-rose-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-rose-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 8</span>
                </div> 
    
                <div on:click={() => openModal("Srankbox")} class="col-span-9 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-rose-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Log-in Event 3 (Starts on Tuesday): Free S-rank Selector, 5 Battlesuit Supply Cards, 288 Crystal and Ribbon</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-48 h-full">
                        <img src="https://i.imgur.com/9ces1W1.png" alt="Event 1" class="w-full h-full object-cover " />
                    </div>
                </div>

            </div>

            <div class="relative grid grid-cols-10 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-rose-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 9</span>
                </div> 

                <div></div>
                <div></div>

                <div on:click={() => openModal("")} class="col-span-7 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-rose-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Chapter 7-EX</span>

                </div>


            </div>

            
            <div class="relative grid grid-cols-10 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-rose-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-rose-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 10</span>
                </div> 

                <div></div>
                <div></div>
                <div></div>
                <div on:click={() => openModal("")} class="col-span-6 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-rose-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">After the Blood Moon Fades</span>

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
                <div class="col-span-1 px-4 py-2 mr-3 ">v8.1 WEEK</div>
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
                <BossCard image="/images/Bosses/Meteor_Guaymas.webp" date="Feb 21" weather="Stardust" bosspage="/boss?sdguaymas" />
                <BossCard image="/images/Bosses/Yae Kasumi.webp" date="Feb 24" weather="Type" bosspage="/boss?typekasumi" />
                </div>
                 
                <div class="flex col-span-3 justify-center gap-1 ml-2">
                    <BossCard image="/images/BossesMA/Sa_SSS.webp" date="Feb 25"  />
                    <BossCard image="/images/BossesMA/Huodou_SSS.webp"  />
                    <BossCard image="/images/Bosses/Assaka.webp"  />
                </div>

            </div>

            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    2
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                    <BossCard image="/images/BossesMA/Sa_SSS.webp" date="Feb 28" weather="Stardust" bosspage="/boss?sa" />
                    <BossCard image="/images/Bosses/Hellmaru.webp" date="Mar 3" weather="Ice" bosspage="/boss?icehellmaru" />
                </div>
                 
                <div class="flex col-span-3 justify-center gap-1 ml-2">
                    <BossCard image="/images/Bosses/Kevin Deliverance.webp" date="Mar 4"  />
                    <BossCard image="/images/Bosses/epernay.png"  />
                    <BossCard image="/images/Bosses/HOMU Emperor.webp"  />
                </div>

            </div>
            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    3
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                    <BossCard image="/images/Bosses/HOMU Emperor.webp" date="Mar 7" weather="Flux" bosspage="/boss?fluxhomu" />
                    <BossCard image="/images/Bosses/Sprout_of_Wishing_SSS.webp" date="Mar 10" weather="Type" bosspage="/boss?typesprout" />
                </div>
                 
                 
                <div class="flex col-span-3 justify-center gap-1 ml-2">
                    <BossCard image="/images/Bosses/Sprout_of_Wishing_SSS.webp" date="Mar 11"  />
                    <BossCard image="/images/Bosses/Varaha.png"  />
                    <BossCard image="/images/Bosses/Alien Guard.webp"  />
                </div>

            </div>
            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    4
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                    <BossCard image="/images/Bosses/Dominator of Wolves.webp" date="Mar 14" weather="Flux" bosspage="/boss?fluxandrius" />
                    <BossCard image="/images/Bosses/Herrscher of Domination Minion.webp" date="Mar 17" weather="Physical" bosspage="/boss?phyhod" />
                </div>
                 
                <div class="flex col-span-3 justify-center gap-1 ml-2">
                    <BossCard image="/images/BossesMA/Sa_SSS.webp" date="Mar 18"  />
                    <BossCard image="/images/BossesMA/Aesir Heimdall_SSS.webp"  />
                    <BossCard image="/images/Bosses/Herrscher of the Void.webp"  />
                </div>

            </div>
            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    5
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                    <BossCard image="/images/Bosses/Husk - Existentialism.webp" date="Mar 21" weather="IMG" bosspage="/boss?imgflower" />
                    <BossCard image="/images/Bosses/Shadow Knight (SK).webp" date="Mar 24" weather="Starless" bosspage="/boss?starsk" />
                </div>
                 
                <div class="flex col-span-3 justify-center gap-1 ml-2">
                    <BossCard image="/images/Bosses/Kevin Deliverance.webp" date="Mar 25"  />
                    <BossCard image="/images/BossesMA/Husk - Existentialism_SSS.webp"  />
                    <BossCard image="/images/Bosses/Hellmaru.webp"  />
                </div>

            </div>

            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    6
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                    <BossCard image="/images/Bosses/MHT-3B Nirvana.webp" date="Mar 28" weather="Flux" bosspage="/boss?fluxtank" />
                    <BossCard image="/images/Bosses/Flame-Chaser - Vill-V.webp" date="Mar 31" weather="Bleed" bosspage="/boss?villv" />
                </div>

                <div class="flex col-span-3 justify-center gap-1 ml-2">
                    <BossCard image="/images/Bosses/Meteor_Guaymas_SSS.webp" date="Apr 1"  />
                    <BossCard image="/images/Bosses/Herrscher of Rimestar.png"  />
                    <BossCard image="/images/Bosses/Argent Knight Artemis (AKA).webp"  />
                </div>

            </div>

            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    7
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                    <BossCard image="/images/Bosses/Otto Apocalypse.webp" date="Apr 4" weather="Physical" bosspage="/boss?otto" />
                    <BossCard image="/images/Bosses/Ultra Tonatiuh.webp" date="Apr 7" weather="Fire" bosspage="/boss?firetona" />
                </div>
                 
                <div class="flex col-span-3 justify-center gap-1 ml-2">
                    <BossCard image="/images/Bosses/BOSS_460.png" date="Apr 8"  />
                    <BossCard image="/images/BossesMA/MHT-3B Nirvana_SSS.webp"  />
                    <BossCard image="/images/BossesMA/Deathly Doom.webp"  />
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