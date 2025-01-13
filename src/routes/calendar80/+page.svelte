

<svelte:head>
    <title>v8.0 Calendar and Boss Schedule</title> 
    <meta property="og:title" content="HI3 Calendar and Boss Schedule"/>
    <meta property="og:description" content="Version 8.0" />
    <meta property="og:image" content={data.ogImage} />
    <meta property="og:url" content="https://marisaimpact.com/valk/calendar80" />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary_large_image">

    <link rel="canonical" href="https://marisaimpact.com/valk/calendar80" />
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
            title: "Battlesuit Supply A: Reign Solaris",
            description: '<li>Duration: 4 weeks</li><li>First ten pulls are 50% off.</li><li>A-rank: Divine Prayer (UP), Phantom Iron, Flame Sakitama, Wolf Dawn</li>',
            image: "https://i.imgur.com/3EOIQRx.png"

        },
        "Valk2": {
            title: "Battlesuit Supply B: Sparkle",
            description: '<li>Duration: 2 weeks</li><li>A-rank: Umbral Rose (UP), Scarlet Fusion, Night Squire, Valkyrie Pledge</li>',

        },
        "Raffle": {
            image: "https://i.imgur.com/CZNJxzs.png"
        },
        "Equip": {
            title: "Equipment Supply",
            description: '<li>Equipment Supply only has one featured weapon and stigma set.</li><li>Every 10 pulls guarantee either weapon or stigma.</li><li>Weapon guaranteed in 60 pulls or less.</li>',
        },
        "Returnee": {
            title: "Returnee Supply",
            description: "Condition for returnee status:<li>Captain Level ≥ 15, has no returnee record, and has been 15 days or more since last login</li><li>Captains Level ≥ 15, has a previous returnee record, and has been 45 days or more since login and last returnee status</li><li>Returnee expansion and focus work the same as normal Expansion and Focus Supply, but the pity won't carry over to normal expansion and focus.</li><li>You get one free pull everyday (limited amount)</li>",
        },
        "TimeCapsule": {
            title: "Time Capsule",
            image: "https://i.imgur.com/E3grel4.png"
        },
        "Login": {
            title: "7-Day Login",
            image: "https://i.imgur.com/ig9SiwS.png"
        },
        "Freehoh": {
            title: "Free Herrscher of Human: Ego",
            description: "Complete 4 out of 5 event missions in 7.9 to get free Herrscher of Human: Ego<li>Login</li><li>Clear phase 3 HI3xHSR Collab</li><li>Clear P2 Chapter 6</li><li>Clear the main stages of Ai-chan Cafe event</li><li>Clear 9 stages of Dual Core event</li>",
            image: "https://i.imgur.com/YGirdES.png"
        },
        "ADV": {
            title: "ADV Supply: Fenghuang of Vicissitude",
            description: '<li>Duration: 2 weeks</li><li>Every 10 pulls guarantee either A-rank or S-rank card.</li> <li>S-rank card guaranteed within 100 pulls.</li><li>You also get one FoV stamp (10 frags) every 10 pulls, until 100 pulls. (Total 10 stamps = 100 frags)</li>'
        },
        "Rebate": {
            title: "REBATE FOCUSED SUPPLY",
            description: "<li>Duration: 2 weeks</li><li>UP: Torch of Eons, Fu Hua OD</li><li>For the first 50 pulls, you get 3 Equipment Supply Cards every 10 pulls (total 15 cards max)</li><li>Weapon: Torch of Eons (UP), Star Dance, Bloodied Casket, Pandora 18, Life Harvester, Rudder in Dream</li><li>Stigma: Fu Hua OD (UP), Cecilia Youth, Van Gogh, Elysia Pristine, Little Joys</li>",
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

    <VersionSelect currentVersion="8.0"></VersionSelect>

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
            <div class="w-[940px] rounded-lg bg-gradient-to-b from-cyan-500 to-cyan-100 ">
                <!-- Calendar Header Row -->
                <div class="grid grid-cols-7 gap-2 text-center font-semibold bg-gray-800 text-white p-2 rounded text-sm ">
                    <div>Estimated date for SEA / KR / GLB</div>
                    <div>WEEK 1<br />Jan 9 - 17</div>
                    <div>WEEK 2<br />Jan 17 - 24 </div>
                    <div>WEEK 3<br />Jan 24 - 31 </div>
                    <div>WEEK 4<br />Jan 31 - Feb 7</div>
                    <div>WEEK 5<br />Feb 7 - 14 </div>
                    <div>WEEK 6<br />Feb 14 - 20 </div>
                </div>

                <div class="relative grid grid-cols-7 gap-1  h-[55px] pe-1 overflow-x-clip ">
                    <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                         <span class="font-bold0">BATTLESUIT SUPPLY A</span>
                    </div>                    
                    <div on:click={() => openModal("Valk1")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-4 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-cyan-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Reign Solaris<br/>First ten pulls are 50% off</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-32 h-full">
                            <img src="https://i.imgur.com/sThJVgX.png" alt="Lone Planetfarer" class="w-full h-full object-cover" />
                        </div>
                    </div>    

                    <div on:click={() => openModal("")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-2 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-cyan-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Deepspace Anchor</span>
   
                    </div>    

                </div>

                <div class="relative grid grid-cols-7 gap-1  h-[55px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-cyan-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-cyan-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">EQUIPMENT SUPPLY A</span>
                    </div>                    
                    <div on:click={() => openModal("Equip")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-4 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-cyan-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10">Reign Solaris Equipment</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-32 h-full">
                            <img src="https://i.imgur.com/N91w2u4.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-md" />
                        </div>
                    </div>     
                    <div on:click={() => openModal("Equip")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-2 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-cyan-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Deepspace Anchor Equipment</span>
   
                    </div>    
                </div>

                <div class="relative grid grid-cols-7 gap-1  h-[55px] pe-1 overflow-x-clip ">
                    <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-cyan-600 inline-block top-[-3px] left-0"></span>

                        <span class="font-bold0">BATTLESUIT SUPPLY B</span>
                    </div> 
                    <div></div>  
                    <div></div>                   
                    <div on:click={() => openModal("Valk2")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-2 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-cyan-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Sparkle</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-24 h-full">
                            <img src="https://i.imgur.com/dpVXF4o.png" alt="Lone Planetfarer" class="w-full h-full object-cover" />
                        </div>
                    </div>    

                </div>

                <div class="relative grid grid-cols-7 gap-1  h-[55px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-cyan-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-cyan-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">EQUIPMENT SUPPLY B</span>
                    </div>  
                    <div></div>  
                    <div></div>                    
                    <div on:click={() => openModal("Equip")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-2 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-cyan-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10">Sparkle Equipment</span>


                    </div>     
            
                </div>

                <div class="relative grid grid-cols-7 gap-1  h-[55px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-cyan-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">ASTRAL OP SUPPLY</span>
                    </div>                    
                    <div on:click={() => openModal("")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-2 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-cyan-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10">Serapeum</span>

                    </div>     
            
                </div>
                <div class="relative grid grid-cols-7 gap-1  h-[55px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-cyan-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-cyan-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">ADV SUPPLY</span>
                    </div>                    
                    <div></div>  
                    <div></div>   
                    <div></div>
                    <div></div>     
                    <div on:click={() => openModal("ADV")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-2 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-cyan-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Fenghuang of Vicissitude</span>
   
                    </div>    
                </div>

                <div class="relative grid grid-cols-7 gap-1  h-[55px] pe-1 overflow-x-clip ">
                    <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-cyan-600 inline-block top-[-3px] left-0"></span>

                        <span class="font-bold0">REBATE FOCUSED SUPPLY</span>
                    </div> 
                    <div></div>  
                    <div></div>   
                    <div></div>
                    <div></div>                
                    <div on:click={() => openModal("Rebate")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-2 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-cyan-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Torch of Eons <br/> FuHua OD</span>

                    </div>    

                </div>

                <div class="relative grid grid-cols-7 gap-1  h-[55px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-cyan-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-cyan-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">RETURNEE SUPPLY</span>
                    </div>                  
                    <div on:click={() => openModal("Returnee")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-6 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-cyan-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-5">Herrscher of Human and her equipment</span>
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
        <div class="w-[940px] rounded-lg bg-gradient-to-b from-cyan-500 to-cyan-100 ">
            <!-- Calendar Header Row -->
            <div class="flex gap-2 text-center font-semibold bg-gray-800 text-white p-2 rounded text-sm justify-center">
                <div>EVENTS</div>

            </div>


            <div class="relative grid grid-cols-7 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                     <span class="font-bold0">EVENT 1</span>
                </div> 
    
                <div on:click={() => openModal("")} class="col-span-6 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-cyan-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">P2 Chapter 7 and Cube Durandal event</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-48 h-full">
                        <img src="https://i.imgur.com/Kkq9gtN.png" alt="Event 1" class="w-full h-full object-cover " />
                    </div>
                </div>

            </div>

            <div class="relative grid grid-cols-7 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-cyan-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-cyan-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 2</span>
                </div> 
    
                <div on:click={() => openModal("Login")} class="col-span-6 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-cyan-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">7-Day Login Event<br/>Free RS Stigma box, 120 crystal and asterite</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-48 h-full">
                        <img src="https://i.imgur.com/CC5s3FB.png" alt="Event 2" class="w-full h-full object-cover" />
                    </div>
                </div>

            </div>

            <div class="relative grid grid-cols-7 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-cyan-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 3</span>
                </div> 
    
                <div on:click={() => openModal("Raffle")} class="col-span-6 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-cyan-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Raffle Event: A chance to win 400 - 18,000 crystals, <br/> S-rank valkyries and more <br/></span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-48 h-full">
                        <img src="https://i.imgur.com/1lFxsPV.png" alt="Event 3" class="w-full h-full object-cover" />
                    </div>
                </div>

            </div>

            <div class="relative grid grid-cols-7 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-cyan-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-cyan-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 4</span>
                </div> 
                
                <div></div>
                <div on:click={() => openModal("")} class="col-span-5 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-cyan-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Countdown: To Sweet Dreams!</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-48 h-full">
                        <img src="https://i.imgur.com/xMdDFiG.png" alt="Event 4" class="w-full h-full object-cover" />
                    </div>
                </div>

            </div>

            <div class="relative grid grid-cols-7 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-cyan-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 5</span>
                </div> 
                
                <div></div>
                <div></div>
                <div on:click={() => openModal("")} class="col-span-4 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-cyan-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Before the Endless Dream Ends <br/> Starts on Monday</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-48 h-full">
                        <img src="https://i.imgur.com/PrckGCL.png" alt="Event 4" class="w-full h-full object-cover" />
                    </div>
                </div>

            </div>

            <div class="relative grid grid-cols-7 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-cyan-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-cyan-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 6</span>
                </div> 
                
                <div></div>
                <div></div>
                <div on:click={() => openModal("")} class="col-span-4 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-cyan-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">New Year 7-Day Log-in</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-48 h-full">
                        <img src="https://i.imgur.com/pc6Eegc.png" alt="Event 4" class="w-full h-full object-cover" />
                    </div>
                </div>

            </div>


            <div class="relative grid grid-cols-7 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-zinc-700 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-cyan-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 7</span>
                </div> 
                
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div on:click={() => openModal("")} class="col-span-2 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-cyan-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Hot on the Trail</span>

                </div>

            </div>
            <div class="relative grid grid-cols-7 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-cyan-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-cyan-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 8</span>
                </div> 
                
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div on:click={() => openModal("")} class="col-span-2 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-cyan-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Web Event: Memories of the Moon Sea</span>

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
                <div class="col-span-1 px-4 py-2 mr-3 ">v8.0 WEEK</div>
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
                    <BossCard image="/images/Bosses/Otto Apocalypse.webp" date="Jan 10" weather="Physical" bosspage="/boss?otto" />
                    <BossCard image="/images/Bosses/MHT-3B Nirvana.webp" date="Jan 13" weather="Shadow" bosspage="/boss?shadowtank" />

                </div>
                 
                <div class="flex col-span-3 justify-center gap-1 ml-2">
                    <BossCard image="/images/BossesMA/SSS_Kevin.png" date="Jan 14"/>
                    <BossCard image="/images/Bosses/Dominator of Wolves.webp" />
                    <BossCard image="/images/Bosses/Shadow Knight (SK).webp" />
                </div>

            </div>

            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    2
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                    <BossCard image="/images/Bosses/Kevin Deliverance.webp" date="Jan 17" weather="Physical" bosspage="/boss?deliverance" />
                    <BossCard image="/images/Bosses/Hellmaru.webp" date="Jan 20" weather="Symphony" bosspage="/boss?symphellmaru" />
                </div>
                 
                <div class="flex col-span-3 justify-center gap-1 ml-2">
                    <BossCard image="/images/Bosses/Meteor_Guaymas_SSS.webp" date="Jan 21"/>
                    <BossCard image="/images/Bosses/Flame-Chaser - Aponia_SSS.webp" />
                    <BossCard image="/images/Bosses/Assaka.webp"  />
                </div>

            </div>

            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    3
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                <BossCard image="/images/Bosses/Mockery_Emperor.webp" date="Jan 24" weather="LoAscension" bosspage="/boss?momemperor" />
                <BossCard image="/images/Bosses/Ultra Tonatiuh.webp" date="Jan 27" weather="Fire" bosspage="/boss?firetona" />
                </div>
                 
                <div class="flex col-span-3 justify-center gap-1 ml-2">
                    <BossCard  image="/images/Bosses/Vita.png" date="Jan 28"/>
                    <BossCard image="/images/BossesMA/Jizo Mitama_SSS.webp" />
                    <BossCard image="/images/BossesMA/Argent Knight Artemis.webp" />
                </div>

            </div>

            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    4
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                <BossCard image="/images/Bosses/Flame-Chaser - Aponia_SSS.webp" date="Jan 31" weather="Dominance" bosspage="/boss?aponia" />
                <BossCard image="/images/Bosses/Argent Knight Artemis (AKA).webp" date="Feb 3" weather="Ignite" bosspage="/boss?aka" />

                </div>
                 
                <div class="flex col-span-3 justify-center gap-1 ml-2">
                    <BossCard image="/images/BossesMA/SSS_Kevin.png" date="Feb 4"/>
                    <BossCard image="/images/BossesMA/Parvati_SSS.webp" />
                    <BossCard image="/images/Bosses/Alien Guard.webp" />
                </div>

            </div>

            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    5
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                    <BossCard image="/images/Bosses/Meteor_Guaymas.webp" date="Feb 7" weather="Lightning" bosspage="/boss?lightningguaymas" />
                    <BossCard image="/images/Bosses/Kevin Kaslana.webp" date="Feb 10" weather="Symphony" bosspage="/boss?kevin" />
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