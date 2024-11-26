


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
        "Sparkle": {
            title: "Battlesuit Supply A: Sparkle",
            description: '<li>Duration: 4 weeks</li><li>First ten pulls are 50% off.</li><li>A-rank: Valkyrie Boltstorm (UP), Ritual Imayoh, Gyakushin Miko, Kriegsmesser</li>',
            image: 'https://i.imgur.com/yngcMUS.png'
        },
        "Vita": {
            title: "Battlesuit Supply B: Lone Planetfarer",
            description: '<li>Duration: 2 weeks.</li><li>A-rank: Valkyrie Blastmetal (UP), Sundenjager, Valkyrie Bladestrike, Valkyrie Gloria </li>',
            image: 'https://i.imgur.com/8a0N5jC.png'

        },
        "Equip": {
            title: "Equipment Supply",
            description: '<li>Equipment Supply only has one featured weapon and stigma sets.</li><li>Every 10 pulls guarantee either weapon or stigma.</li><li>Weapon guaranteed in 60 pulls or less.</li>',
        },
        "Returnee": {
            title: "Returnee Supply",
            description: "Condition for returnee status:<li>Captain Level ≥ 15, has no returnee record, and has been 15 days or more since last login</li><li>Captains Level ≥ 15, has a previous returnee record, and has been 45 days or more since login and last returnee status</li><li>Returnee expansion and focus work the same as normal Expansion and Focus Supply, but the pity won't carry over to normal expansion and focus.</li><li>You get one free pull everyday (limited amount)</li>",
        },
        "TimeCapsule": {
            title: "Time Capsule",
            image: "https://i.imgur.com/E3grel4.png"
        },
        "Freehoh": {
            title: "Free Herrscher of Human: Ego",
            description: "Complete 4 out of 5 event missions in 7.9 to get free Herrscher of Human: Ego<li>Login</li><li>Clear phase 3 HI3xHSR Collab</li><li>Clear P2 Chapter 6</li><li>Clear the main stages of Ai-chan Cafe event</li><li>Clear 9 stages of Dual Core event</li>",
            image: "https://i.imgur.com/YGirdES.png"
        },
        "FoV": {
            title: "Battlesuit Supply: Fenghuang of Vicissitude",
            description: '<li>Duration: 1 week</li><li>Midnight Absinthe (UP), Shadow Dash, Luna Kindred, Valkyrie Accipiter</li>',
            image: 'https://i.imgur.com/ejZ4Adp.png'
        },
        "OutfitBox": {
            title: "OUTFIT SUPPLY BOX",
            description: '<li>Duration: 1 week</li><li>7680 crystal max to get outfit box + all rewards.</li><li>Choose one outfit: Herrscher of the Void Frigid Empress, Celestial Hymn Empyrean Psalms, Argent Knight Bride, or ADV Outfit Tickets x100</li>',
            image: 'https://i.imgur.com/DSr04fZ.jpeg'
        },
        "Crane": {
            title: "Outfit Supply: Crane of Taixuan for Fenghuang of Vicissitude",
            description: '<li>Duration: 2 weeks</li><li>9600 crystal to get outfit and all rewards.</li><li>S-rank selector: Choose HoThunder card / Bright Knight card / Phoenix card / HoThunder stamps x10 / Bright Knight stamps x5 / Phoenix stamps x5</li>',
            image: 'https://i.imgur.com/6ilLhQ7.png'
        },
        "ToEons": {
            title: "Focused Supply A",
            description: "<li>Duration: 1 week</li><li>UP: Torch of Eons, Fu Hua OD</li><li>Weapon: Torch of Eons (UP), Echo of Paradise, KoAscension, Anchor of the Voyage, Pandora 18, Life Harvester, Lost Conviction</li><li>Stigma: Fu Hua OD (UP), Little Joys, Elysia Pristine, Cecilia Youth, Raiden Mei",
            image: 'https://i.imgur.com/2u8A8ol.png'

        },
    };


</script>


<svelte:head>
    <title>v7.9 Calendar and Boss Schedule</title> 
    <meta property="og:title" content="HI3 Calendar and Boss Schedule"/>
    <meta property="og:description" content="Version 7.9" />
    <meta property="og:image" content={data.ogImage} />
    <meta property="og:url" content="https://marisaimpact.com/valk/calendar79" />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary_large_image">

    <link rel="canonical" href="https://marisaimpact.com/valk/calendar79" />
</svelte:head>

<div class="max-w-5xl mx-auto p-4 pb-0 rounded-lg  text-center mb-5">

    <h2 class="text-2xl font-semibold mb-2 text-rose-400 ">Supply and Event Timeline</h2>
    <p class="text-xs sm:text-sm">
        The data is based on CN server. Schedule might be different for SEA / KR / GLB servers.
    </p>
</div>
  

<div class="flex justify-center items-end gap-5">

    <VersionSelect currentVersion="7.9"></VersionSelect>

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

<div class="p-4 container-screen-2xl flex justify-center items-center mt-4">
        <!-- Supply and Events Calendar Layout -->
        <div class="overflow-x-auto ">
            <div class="w-[940px] rounded-lg bg-gradient-to-b from-rose-500 to-rose-100 ">
                <!-- Calendar Header Row -->
                <div class="grid grid-cols-7 gap-2 text-center font-semibold bg-gray-800 text-white p-2 rounded text-sm ">
                    <div>Estimated date for SEA / KR / GLB</div>
                    <div>WEEK 1<br />Nov 28 - Dec 6</div>
                    <div>WEEK 2<br />Dec 6 - 13</div>
                    <div>WEEK 3<br />Dec 13 - 20</div>
                    <div>WEEK 4<br />Dec 20 - 27</div>
                    <div>WEEK 5<br />Dec 27 - Jan 3</div>
                    <div>WEEK 6<br />Jan 3 - 9</div>
                </div>

                <div class="relative grid grid-cols-7 gap-1  h-[55px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                         <span class="font-bold0">BATTLESUIT SUPPLY A</span>
                    </div>                    
                    <div on:click={() => openModal("Sparkle")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-4 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-rose-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Sparkle<br/>First ten pulls are 50% off</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-auto h-full">
                            <img src="https://i.imgur.com/K5HkEO7.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-md" />
                        </div>
                    </div>                 
                </div>

                <div class="relative grid grid-cols-7 gap-1  h-[55px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-rose-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-rose-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">EQUIPMENT SUPPLY A</span>
                    </div>                    
                    <div on:click={() => openModal("Equip")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-4 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-rose-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10">Sparkle Equipment</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-auto h-full">
                            <img src="https://i.imgur.com/6FkUYcQ.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-md" />
                        </div>
                    </div>                 
                </div>

                <div class="relative grid grid-cols-7 gap-1  h-[55px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-rose-600 inline-block top-[-3px] left-0"></span>
 
                        <span class="font-bold0">BATTLESUIT SUPPLY B</span>
                    </div>
                    <div></div>           
                    <div on:click={() => openModal("FoV")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-1 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-rose-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-5">Fenghuang of Vicissitude</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-40 h-[45px]">
                        </div>
                    </div>             
                    <div on:click={() => openModal("Vita")} class=" col-span-2 will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-rose-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Lone Planetfarer</span>

                    </div>                 
                </div>

                <div class="relative grid grid-cols-7 gap-1  h-[55px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-rose-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-rose-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">EQUIPMENT SUPPLY B</span>
                    </div>   
                    <div></div>           
                    <div></div>                 
                    <div on:click={() => openModal("Equip")} class="col-span-2 will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-rose-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-5">Lone Planetfarer<br/> Equipment</span>

                    </div>                 
                </div>

                <div class="relative grid grid-cols-7 gap-1  h-[55px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-rose-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">ASTRAL OP SUPPLY</span>
                    </div>                    
                    <div on:click={() => openModal("Asop")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-2 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-rose-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10">Songque</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-40 h-[45px]">
                        </div>
                    </div>                 
                </div>


                <div class="relative grid grid-cols-7 gap-1  h-[55px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-rose-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-rose-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">FOCUSED SUPPLY A</span>
                    </div>      
                    <div></div>              
                    <div on:click={() => openModal("ToEons")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-1 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-rose-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-5">Torch of Eons<br/>Fu Hua OD</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-40 h-[45px]">
                        </div>
                    </div>                 
                </div>

                <div class="relative grid grid-cols-7 gap-1  h-[55px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-rose-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">OUTFIT</span>
                    </div>    
                    <div></div>                
                    <div on:click={() => openModal("Crane")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-2 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-rose-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10">Crane of Taixuan</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-40 h-[45px]">
                        </div>
                    </div>      
                    
                    <div on:click={() => openModal("OutfitBox")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-rose-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10">Outfit Box</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-40 h-[45px]">
                        </div>
                    </div>     
                </div>

                <div class="relative grid grid-cols-7 gap-1  h-[55px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-rose-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-rose-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">RETURNEE SUPPLY</span>
                    </div>                  
                    <div on:click={() => openModal("Returnee")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-6 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-rose-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-5">Herrscher of Rebirth valkyrie and equipment</span>
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
        <div class="w-[940px] rounded-lg bg-gradient-to-b from-rose-500 to-rose-100 ">
            <!-- Calendar Header Row -->
            <div class="flex gap-2 text-center font-semibold bg-gray-800 text-white p-2 rounded text-sm justify-center">
                <div>EVENTS</div>

            </div>


            <div class="relative grid grid-cols-7 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                     <span class="font-bold0">EVENT 1</span>
                </div> 
    
                <div on:click={() => openModal("")} class="col-span-6 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-rose-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">HI3 x HSR Collab Event<br/>Honkai: A Fool's Hand</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-42 h-full">
                        <img src="https://i.imgur.com/S7FM984.png" alt="Lone Planetfarer" class="w-full h-full object-cover " />
                    </div>
                </div>

            </div>

            <div class="relative grid grid-cols-7 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-rose-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-rose-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 2</span>
                </div> 
    
                <div on:click={() => openModal("Freehoh")} class="col-span-6 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-rose-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Free Herrscher of Human: Ego</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-42 h-full">
                        <img src="https://i.imgur.com/gc31Qus.png" alt="Lone Planetfarer" class="w-full h-full object-cover" />
                    </div>
                </div>

            </div>

            <div class="relative grid grid-cols-7 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-rose-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 3</span>
                </div> 
    
                <div on:click={() => openModal("")} class="col-span-6 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-rose-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Log-in Freebies: 5 Battlesuit Cards, 5 Equipment Cards + Sparkle Fumo,<br/>Sparkle Stigma Box, Crystal, Asterite, AE Imaginon</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-42 h-full">
                        <img src="https://i.imgur.com/oNbUWsd.png" alt="Lone Planetfarer" class="w-full h-full object-cover" />
                    </div>
                </div>

            </div>

            <div class="relative grid grid-cols-7 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-rose-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-rose-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 4</span>
                </div> 
    
                <div on:click={() => openModal("")} class="col-span-6 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-rose-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Topup Event: Topup ~100 usd to get up to 3 Dreamweaver stamps /<br/> 3 HoFi stamps / 240 AL + other mats</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-42 h-full">
                        <img src="https://i.imgur.com/XsChDpd.png" alt="Lone Planetfarer" class="w-full h-full object-cover " />
                    </div>
                </div>

            </div>


            <div class="relative grid grid-cols-7 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-rose-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 5</span>
                </div> 

                <div></div>
    
                <div on:click={() => openModal("")} class="col-span-5 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-rose-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Part 2 Chapter 6<br/>Starts on Monday at 10 AM</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-48 h-full">
                        <img src="https://i.imgur.com/GcgAXuP.png" alt="Lone Planetfarer" class="w-full h-full object-cover" />
                    </div>
                </div>

            </div>
            <div class="relative grid grid-cols-7 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-rose-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-rose-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 6</span>
                </div> 
    
                <div></div><div></div>
                <div on:click={() => openModal("")} class="col-span-4 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-rose-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Snazzy Cards Club<br/>Starts on Monday at 10 AM</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-28 sm:w-32 md:w-36 lg:w-42 h-full">
                        <img src="https://i.imgur.com/XdlGcBX.png" alt="Lone Planetfarer" class="w-full h-full object-cover" />
                    </div>
                </div>

            </div>

            <div class="relative grid grid-cols-7 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-rose-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 7</span>
                </div> 
    
                <div class="col-span-4"></div>
                <div on:click={() => openModal("")} class="col-span-2 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-rose-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Powered Duo</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-28 sm:w-32 md:w-36 lg:w-42 h-full">
                        <img src="https://i.imgur.com/l5KamET.png" alt="Lone Planetfarer" class="w-full h-full object-cover" />
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
                <div class="col-span-1 px-4 py-2 mr-3 ">v7.9 WEEK</div>
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
                <BossCard image="/images/Bosses/Herrscher%20of%20the%20Void.webp" date="Nov 29" weather="Ignite" bosspage="/boss?ignitehov" />
                <BossCard image="/images/Bosses/Alien Guard.webp" date="Dec 2" weather="Blood" bosspage="/boss?bloodsdmob"/>
                </div>
                 
                <div class="flex col-span-3 justify-center gap-1 ml-2">
                    <BossCard image="/images/Bosses/Vita.png" date="Dec 3"/>
                    <BossCard image="/images/Bosses/False God Otto.webp"/>
                    <BossCard image="/images/Bosses/Hellmaru.webp"/>
                </div>

            </div>
            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2">
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    2
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2">
                    <BossCard image="/images/Bosses/Vita.png" date="Dec 6" weather="Resonance" bosspage="/boss?resovita"/>
                    <BossCard image="/images/Bosses/Herrscher of Corruption.webp" date="Dec 9" weather="Melee" bosspage="/boss?meleehoc"/>
                    </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                        <BossCard image="/images/Bosses/Herrscher of Rimestar.png" date="Dec 10"/>
                        <BossCard image="/images/Bosses/Varaha.png" />
                        <BossCard image="/images/Bosses/Herrscher of the Void.webp" />
                    </div>

            </div>
            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2">
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    3
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2">
                    <BossCard image="/images/Bosses/Sprout_of_Wishing_SSS.webp" date="Dec 13" weather="Lightning" bosspage="/boss?lightningsprout"/>
                    <BossCard image="/images/Bosses/Flame-Chaser - Kosma.webp" date="Dec 16" weather="Fire" bosspage="/boss?firekosma"/>
                    </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                        <BossCard image="/images/Bosses/Sprout_of_Wishing_SSS.webp" date="Dec 17"/>
                        <BossCard image="/images/Bosses/Pishacha.webp"/>
                        <BossCard image="/images/Bosses/Doom.webp"/>
                    </div>

            </div>

            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2">
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    4
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2">
                    <BossCard image="" date="TBA" weather="TBA" />
                    <BossCard image="" date="TBA" weather="TBA" />
                    </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                        <BossCard image="" date="TBA"/>
                        <BossCard />
                        <BossCard />
                    </div>
            </div>

            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2">
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    5
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2">
                    <BossCard image="" date="TBA" weather="TBA" />
                    <BossCard image="" date="TBA" weather="TBA" />
                    </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                        <BossCard image="" date="TBA"/>
                        <BossCard />
                        <BossCard />
                    </div>

            </div>

            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2">
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    6
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2">
                    <BossCard image="" date="TBA" weather="TBA" />
                    <BossCard image="" date="TBA" weather="TBA" />
                    </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                        <BossCard image="" date="TBA"/>
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