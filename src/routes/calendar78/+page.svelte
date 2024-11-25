
<svelte:head>
    <meta property="og:title" content="HI3 Calendar and Boss Schedule"/>
    <meta property="og:description" content="Version 7.8" />
    <meta property="og:image" content="https://i.imgur.com/mq1iWsY.png" />
    <meta property="og:url" content="https://marisaimpact.com/valk/calendar78" />
    <meta property="og:type" content="website" />

    <meta name="twitter:title" content="HI3 Calendar and Boss Schedule" />
    <meta name="twitter:image:type" content="website" />
    <meta name="twitter:card" content="summary_large_image">

    <link rel="canonical"  />
</svelte:head>



<script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';
    import BossCard from '$lib/components/calendarbosspic.svelte'
	import VersionSelect from '$lib/components/VersionSelect.svelte';



    // Tabs
    let activeTab = "Supply"; // Default tab

    // Variables for modal
    let selectedSupply = null;
    let showModal = false;

    // Sample data for supplies
    const supplies = {
        "Lone Planetfarer": {
            title: "Battlesuit Supply: Lone Planetfarer",
            description: '<li>Duration: 4 weeks</li><li>A-rank: Valkyrie Blastmetal (UP), Night Squire, Wolf Dawn, Midnight Absinthe</li><li>First ten pulls are free, does not count towards spending event milestone.</li>',
            image: ''
        },
        "Equip": {
            title: "Equipment Supply",
            description: '<li>Equipment Supply only has one featured weapon and stigma sets.</li><li>Every 10 pulls guarantee either weapon or stigma.</li><li>Weapon guaranteed in 60 pulls or less.</li>',
            image: ''
        },
        "Schicksal's Imperative": {
            title: "Battlesuit Supply: Schicksal's Imperative",
            description: "<li>Duration: 2 weeks</li><li>A-rank: Valkyrie Boltstorm(UP), Valkyrie Ranger, Valkyrie Accipiter,  Swallowtail Phantasm, </li>",
        },
        "Carnival": {
            title: "Carnival Supply",
            description: "",
            image: "https://i.imgur.com/2sdJMXp.png"
        },
        "Asop Rotation": {
            title: "Songque and Serapeum Rotation",
            description: "<li>Duration: 4 weeks</li><li>Songque (6 Days) > Serapeum (6 Days) > Songque (3 Days) > Serapeum (7 Days) > Songque (7 Days)</li>",
        },
        "Jovial Deception": {
            title: "Battlesuit Supply: Jovial Deception",
            description: "<li>Duration: 2 weeks</li><li>A-rank: Valkyrie Boltstorm(UP), Valkyrie Ranger, Valkyrie Accipiter, Swallowtail Phantasm</li>",
        },
        "VanGogh": {
            title: "Focused Supply",
            description: "<li>Duration: 1 week</li><li>UP: Star Voyage, Van Gogh</li><li>Weapon: Star Voyage (UP), KoAnonimity, Tower of the Past, Bloodied Casket, Pandora 18, Life Harvester, Midnight Eclipse</li><li>Stigma: Van Gogh (UP), Li Sushang, Elysia Pristine, Aladdin, Little Joys</li>",
        },
        "Returnee": {
            title: "Returnee Supply",
            description: "Condition for returnee status:<li>Captain Level ≥ 15, has no returnee record, and has been 15 days or more since last login</li><li>Captains Level ≥ 15, has a previous returnee record, and has been 45 days or more since login and last returnee status</li><li>Returnee expansion and focus work the same as normal Expansion and Focus Supply, but the pity won't carry over to normal expansion and focus.</li><li>You get one free pull everyday (limited amount)</li>",
        },
        "Spending": {
            title: "Spending Event",
            image: "https://i.imgur.com/Yym0yrW.png",
        },
        "Fescard": {
            title: "Free Carnival Supply Cards",
            description: "Free card that can be used to do 10 pulls (at once) on Fes Battlesuit Supply.<li>First card: Week1 Saturday 12 PM</li><li>Second card: Week2 Tuesday 12 PM</li><li>These cards will expire when Fes Supply is over at the end of 7.8 Week 3 (est. Nov 8)</li>"
        },
        "TimeCapsule": {
            title: "Time Capsule",
            image: "https://i.imgur.com/E3grel4.png"
        },
        "Divine Key": {
            title: "Art Book and Free Divine Key event",
            image: "https://i.imgur.com/blUekJn.png"
        },
        "FreeSW": {
            title: "Free Silverwing and Supply Cards",
            description: "<li>For valk box, you get one box. You can choose Silverwing card / 5 stamps, Sirin card / 5 stamps, or 600 Ancient Willpower</li><li>For supply card box, you get 3 boxes. You can choose 5 Battlesuit Supply Cards, 5 Equipment Supply cards or 1200 Crystal for each box.</li>"
        },
    };

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
    }
</script>

<div class="max-w-5xl mx-auto p-4 pb-0 rounded-lg  text-center mb-5">
    <h2 class="text-2xl font-semibold mb-2 text-teal-400 ">Supply and Event Timeline</h2>
    <p class="text-xs sm:text-sm">
        The data is based on CN server. Schedule might be different for SEA / KR / GLB servers.
    </p>
</div>
  

<div class="flex justify-center items-end gap-5">

    <VersionSelect currentVersion="7.8"></VersionSelect>
  <!-- Tabs for 'Supply and Events' and 'Boss' -->
  <div role="tablist" class="tabs-bordered mt-4 space-x-2">
     <button
        role="tab" class="tab {activeTab === 'Supply' ? 'tab-active' : ''}"
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

<div class="p-4 mt-4 container-screen-2xl flex justify-center items-center ">
        <!-- Supply and Events Calendar Layout -->
        <div class="overflow-x-auto ">
            <div class="w-[940px] rounded-lg bg-gradient-to-b from-cyan-500 to-teal-100 ">
                <!-- Calendar Header Row -->
                <div class="grid grid-cols-7 gap-2 text-center font-semibold bg-gray-800 text-white p-2 rounded text-sm ">
                    <div>Estimated date for SEA / KR / GLB</div>
                    <div>WEEK 1<br />Oct 17 - 25</div>
                    <div>WEEK 2<br />Oct 25 - Nov 1</div>
                    <div>WEEK 3<br />Nov 1 - 8</div>
                    <div>WEEK 4<br />Nov 8 - 15</div>
                    <div>WEEK 5<br />Nov 15 - 22</div>
                    <div>WEEK 6<br />Nov 22 - 28</div>
                </div>

 <!-- Row example with text centered and image aligned to the right -->
 <div class="relative grid grid-cols-7 gap-1 h-[55px] pe-1 overflow-x-clip">
    <div class="flex font-bold text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
        <span class="font-bold text-zinc-800">BATTLESUIT SUPPLY A</span>
    </div> 

    <!-- Clickable item that opens modal -->
    <div on:click={() => openModal("Lone Planetfarer")} class=" will-change-transform  transform transition-transform hover:scale-105 ease-linear relative my-0.5 col-span-4 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-cyan-700 cursor-pointer">
        <span class="absolute inset-0 flex items-center justify-center">Lone Planetfarer</span>
        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-40 h-[45px]">
            <img src="https://i.imgur.com/K18FIaa.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-md" />
        </div>
    </div>

    <div on:click={() => openModal("Schicksal's Imperative")} class="will-change-transform transform transition-transform hover:scale-105 relative my-0.5 col-span-2 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-cyan-700 cursor-pointer">
        <span class="absolute inset-0 flex items-center justify-center">Schicksal's Imperative</span>
    </div>

    
</div>

                <div class="relative grid grid-cols-7 gap-1 h-[55px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-cyan-700 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-cyan-500 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">EQUIPMENT SUPPLY</span>
                    </div> 
        
                    <div on:click={() => openModal("Equip")} class="will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5 col-span-4 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-cyan-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center">Lone Planetfarer Equipment</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-40 h-[45px]">
                            <img src="https://i.imgur.com/cTPJnAb.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-md" />
                        </div>
                    </div>
        
                    <div on:click={() => openModal("Equip")} class="will-change-transform transform transition-transform hover:scale-105 ease-linear  cursor-pointer relative my-0.5 col-span-2 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-cyan-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center">Schicksal's Imperative Equipment</span>
                
                    </div>
                </div>

                <div class="relative grid grid-cols-7 gap-1  h-[55px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-cyan-500 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">CARNIVAL BATTLESUIT</span>
                    </div> 

                    <div on:click={() => openModal("Carnival")} class="will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-3 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-cyan-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10"></span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-full h-[43px]">
                            <img src="https://i.imgur.com/YFjmUu0.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-md" />
                        </div>
                    </div>
                
                </div>

                <div class="relative grid grid-cols-7 gap-1  h-[55px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-cyan-700 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-cyan-500 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">CARNIVAL EQUIPMENT</span>
                    </div> 
                    <div on:click={() => openModal("Carnival")} class="will-change-transform transform transition-transform hover:scale-105 ease-linear  cursor-pointer relative my-0.5 col-span-3 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-cyan-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10"></span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-full h-[43px]">
                            <img src="https://i.imgur.com/RR5ELUS.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-md" />
                        </div>
                    </div>               
                 </div>

                <div class="relative grid grid-cols-7 gap-1 h-[55px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-cyan-500 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">BATTLESUIT SUPPLY B</span>
                    </div> 
                    <div class="col-span-2"></div>
                    <div on:click={() => openModal("Jovial Deception")} class="will-change-transform transform transition-transform hover:scale-105 ease-linear  cursor-pointer relative my-0.5 col-span-2 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-cyan-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10">Jovial Deception</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-20 h-full">
                            <img src="https://i.imgur.com/XYq5dLU.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-md" />
                        </div>
                    </div>
                    
                    
                </div>

                <div class="relative grid grid-cols-7 gap-1  h-[55px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-cyan-700 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-cyan-500 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">EQUIPMENT SUPPLY B</span>
                    </div> 
                    <div on:click={() => openModal("Equip")} class="will-change-transform transform transition-transform hover:scale-105 cursor-pointer my-0.5 flex col-span-2 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-cyan-700 leading-5"> Eternal Moon<br/>Iskandar</div>
                    
                    <div on:click={() => openModal("Equip")} class="will-change-transform transform transition-transform hover:scale-105  cursor-pointer my-0.5 flex col-span-2 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-cyan-700 leading-5"> Purge of Ten Faces<br/>Leaf's Vision</div>
                </div>

                <div class="relative grid grid-cols-7 gap-1 h-[55px] pe-1 overflow-x-clip">

                    <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-cyan-500 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold px-2">FOCUSED SUPPLY</span>
                    </div>   
                    
                    <div class="col-span-4"></div>
                    <div on:click={() => openModal("VanGogh")} class="will-change-transform transform transition-transform hover:scale-105 cursor-pointer my-0.5 flex col-span-1 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-cyan-700 leading-5">Voyage<br/>Van Gogh</div>
                    <div on:click={() => openModal("")} class="will-change-transform transform transition-transform hover:scale-105 cursor-pointer my-0.5 flex col-span-1 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-cyan-700 leading-5">Star Dance<br/>Cecilia</div>
                </div>

                <div class="relative grid grid-cols-7 gap-1  h-[55px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-cyan-700 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-cyan-500 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">ASTRALOP SUPPLY</span>
                    </div>                    
                    <div on:click={() => openModal("Asop Rotation")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-4 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-cyan-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-start z-10 ps-28">Songque and Serapeum Rotation</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-40 h-[45px]">
                            <img src="https://i.imgur.com/bp4UDlG.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-md" />
                        </div>
                    </div>                 
                </div>

                <div class="relative grid grid-cols-7 gap-1 h-[55px] pe-1 overflow-x-clip">
                    
                    <div class="flex font-bold text-cyan-700 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-cyan-500 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold text-zinc-800">RETURNEE SUPPLY</span>
                    </div>
                    
                    <div on:click={() => openModal("Returnee")} class="will-change-transform transform transition-transform hover:scale-105 cursor-pointer my-0.5 flex col-span-6 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-cyan-700 leading-5">Herrscher of Truth and her equipment</div>
                </div>

                
            </div>
        </div>

        

        

</div>

<div class="p-4 container-screen-2xl flex justify-center items-center">
    <!-- Supply and Events Calendar Layout -->
    <div class="overflow-x-auto ">
        <div class="w-[940px] rounded-lg bg-gradient-to-b from-cyan-500 to-teal-100 ">
            <!-- Calendar Header Row -->
            <div class="flex gap-2 text-center font-semibold bg-gray-800 text-white p-2 rounded text-sm justify-center">
                <div>EVENTS</div>

            </div>

<!-- Row example with text centered and image aligned to the right -->
<div class="relative grid grid-cols-7 gap-1 h-[55px] pe-2">
<div class="flex font-bold text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
    <span class="font-bold text-zinc-800">EVENT 1</span>
</div> 

<!-- Clickable item that opens modal -->
<div on:click={() => openModal("Spending")} class=" will-change-transform  transform transition-transform hover:scale-105 ease-linear relative my-0.5 col-span-4 bg-gray-100 text-black font-semibold text-left items-center justify-center border-2 border-cyan-700 cursor-pointer">
    <span class="absolute inset-0 flex items-center justify-left px-2 z-10">Major Spending Event</span>
    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-100 h-[45px]">
        <img src="https://i.imgur.com/KXTjS7z.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-md" />
    </div>
</div>


</div>

            <div class="relative grid grid-cols-7 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-cyan-700 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-cyan-500 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 2</span>
                </div> 
    
                <div on:click={() => openModal("Divine Key")} class="col-span-6 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-cyan-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Art Collection Vol 3: Free Art book (Not in global server),<br/>divine key and more!</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-auto h-full">
                        <img src="https://i.imgur.com/00ZIQD3.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-md" />
                    </div>
                </div>

            </div>

            <div class="relative grid grid-cols-7 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-cyan-500 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 3</span>
                </div> 
    
                <div on:click={() => openModal("")} class="col-span-6 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-cyan-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">8-Day Login: Free Vita stigma box, Iskandar stigma box, 120 Crystal</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-auto h-full">
                        <img src="https://i.imgur.com/D0y49V9.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-md" />
                    </div>
                </div>

            </div>

            <div class="relative grid grid-cols-7 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-cyan-700 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-cyan-500 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 4</span>
                </div> 
    
                <div on:click={() => openModal("")} class="col-span-6 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-cyan-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Anniversary Login: Free 10 Equipment Supply Cards,<br/>Prism Stigma Upgrade Ticket, 8th Anni Emblem</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-auto h-full">
                        <img src="https://i.imgur.com/uHpR312.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-md" />
                    </div>
                </div>

            </div>

            <div class="relative grid grid-cols-7 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-cyan-500 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 5</span>
                </div> 
    
                <div on:click={() => openModal("")} class="col-span-6 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-cyan-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">P2 Chapter 5 + Monopoly Event: Infernal Weapon Box:<br/>Choose Coralie hammer, Helia weapon, or MaxATK Affix</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-auto h-full">
                        <img src="https://i.imgur.com/J9nd7cu.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-md" />
                    </div>
                </div>

            </div>

            <div class="relative grid grid-cols-7 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-cyan-700 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-cyan-500 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 6</span>
                </div> 
    
                <div on:click={() => openModal("")} class="col-span-6 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-cyan-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Annual Recap Event</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-auto h-full">
                        <img src="https://i.imgur.com/R7yXgFG.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-md" />
                    </div>
                </div>

            </div>

            <div class="relative grid grid-cols-7 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-cyan-500 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 7</span>
                </div> 
    
                <div on:click={() => openModal("Fescard")} class="col-span-3 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-cyan-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Free 2x Fes Battlesuit <br/> 10-Pull Card</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-auto h-full">
                        <img src="https://i.imgur.com/jSBoEas.png" alt="Lone Planetfarer" class="w-full h-full object-cover" />
                    </div>
                </div>

                <div on:click={() => openModal("")} class="col-span-3 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-cyan-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Hot on the Trail</span>
                    <!-- Image positioned on the right side -->

                </div>

            </div>

            <div class="relative grid grid-cols-7 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-cyan-700 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-cyan-500 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 8</span>
                </div> 
                <div></div>
                <div on:click={() => openModal("TimeCapsule")} class="col-span-2 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-cyan-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left z-10">Time Capsule</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-auto h-full">
                        <img src="https://i.imgur.com/KSvZJmb.png" alt="Lone Planetfarer" class="w-full h-full object-cover" />
                    </div>
                </div>

 

            </div>

            <div class="relative grid grid-cols-7 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-cyan-500 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 9</span>
                </div> 
                <div></div>
                <div on:click={() => openModal("FreeSW")} class="col-span-5 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-cyan-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Free Silverwing and Supply Cards</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-auto h-full">
                        <img src="https://i.imgur.com/jqSRpT6.png" alt="Lone Planetfarer" class="w-full h-full object-cover" />
                    </div>
                </div>


            </div>
            
            <div class="relative grid grid-cols-7 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-cyan-700 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-cyan-500 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 10</span>
                </div> 
                <div></div>
                <div on:click={() => openModal("")} class="col-span-5 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-cyan-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Wilderness Development Log</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-auto h-full">
                        <img src="https://i.imgur.com/pBo2KHY.png" alt="Lone Planetfarer" class="w-full h-full object-cover" />
                    </div>
                </div>


            </div>

            <div class="relative grid grid-cols-7 gap-1 h-[55px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-cyan-500 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 11</span>
                </div> 
                <div class="col-span-2"></div>
                <div on:click={() => openModal("")} class="col-span-4 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-cyan-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Teriri's Magical Quest</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-40 h-[45px]">
                        <img src="https://i.imgur.com/PScAbLh.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-md" />
                    </div>
                </div>


            </div>
        </div>
    </div>

    

    

</div>

{:else if activeTab === "Boss"}

<div class="p-4 mt-4 flex justify-center">
    <div class="overflow-x-auto overflow-y-clip">
        <div class="w-[940px] rounded-lg bg-gray-900 text-white">
            
            <!-- Header Row -->
            <div class="grid grid-cols-6 gap-1 text-center font-semibold bg-gray-800 text-white p-2 rounded-t-lg">
                <div class="col-span-1 px-4 py-2 mr-3 ">v7.8 WEEK</div>
                <div class="col-span-2 mr-4 px-4 py-2">EX ABYSS</div>
                <div class="col-span-3 px-4 py-2">MEMORIAL ARENA</div>
            </div>

            <!-- Week 1 Row -->
            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2">
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    1
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2">
                <BossCard image="images/Bosses/Dominator of Wolves.webp" date="Oct 18" weather="Type" bosspage="/boss?typeandrius"/>
                <BossCard image="images/Bosses/Husk - Existentialism.webp" date="Oct 21" weather="IMG" bosspage="/boss?imgflower"/>
                </div>
                 
                <div class="flex col-span-3 justify-center gap-1 ml-2">
                <BossCard image="images/Bosses/Sprout_of_Wishing_SSS.webp" date="Oct 22" />
                <BossCard image="images/Bosses/Herrscher of Rimestar.png"/>
                <BossCard image="images/Bosses/Herrscher of the Void.webp" />
                </div>

            </div>
            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2">
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    2
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2">
                <BossCard image="images/Bosses/Sprout_of_Wishing_SSS.webp" date="Oct 25" weather="Lightning" bosspage="/boss?lightningsprout"/>
                <BossCard image="images/Bosses/Yae Kasumi.webp" date="Oct 28" weather="Type" bosspage="/boss?typekasumi"/>
                </div>
                 
                <div class="flex col-span-3 justify-center gap-1 ml-2">
                <BossCard image="images/Bosses/Husk Mysticism.webp" date="Oct 29" />
                <BossCard image="images/Bosses/duonigue.png"/>
                <BossCard image="images/Bosses/HOMU Emperor.webp" />
                </div>

            </div>
            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2">
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    3
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2">
                <BossCard image="images/Bosses/HOMU Emperor.webp" date="Nov 1" weather="Oblivion" bosspage="/boss?obvhomu"/>
                <BossCard image="images/Bosses/epernay.png" date="Nov 4" weather="Stardust" bosspage="/boss?sdepernay" />
                </div>
                 
                <div class="flex col-span-3 justify-center gap-1 ml-2">
                <BossCard image="images/Bosses/Varaha.png" date="Nov 5" />
                <BossCard image="images/Bosses/Flame-Chaser - Aponia_SSS.webp"/>
                <BossCard image="images/Bosses/Alien Guard.webp" />
                </div>

            </div>

            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2">
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    4
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2">
                <BossCard image="images/Bosses/Saha Assaka.webp" date="Nov 8" weather="Stellar" bosspage="/boss?stellarassaka"/>
                <BossCard image="images/Bosses/Herrscher of Rimestar.png" date="Nov 11" weather="Starless" bosspage="/boss?starrimestar"/>
                </div>
                 
                <div class="flex col-span-3 justify-center gap-1 ml-2">
                <BossCard image="images/Bosses/Sprout_of_Wishing_SSS.webp" date="Nov 12" />
                <BossCard image="images/Bosses/Meteor_Guaymas_SSS.webp"/>
                <BossCard image="images/Bosses/Dark Jixuanyuan.webp" />
                </div>

            </div>

            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2">
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    5
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2">
                <BossCard image="images/Bosses/Dominator of Wolves.webp" date="Nov 15" weather="Starless" bosspage="/boss?starandrius"/>
                <BossCard image="images/Bosses/Herrscher of Sentience.webp" date="Nov 18" weather="Bleed" bosspage="/boss?bleedhos"/>
                </div>
                 
                <div class="flex col-span-3 justify-center gap-1 ml-2">
                <BossCard image="images/Bosses/Husk Mysticism.webp" date="Nov 12" />
                <BossCard image="images/Bosses/Pishacha.webp"/>
                <BossCard image="images/Bosses/Shadow Knight (SK).webp" />
                </div>

            </div>

            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2">
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    6
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2">
                <BossCard image="images/Bosses/Hephaestus SSS.webp" date="Nov 22" weather="Ranged" bosspage="/boss?rangedhepa"/>
                <BossCard image="images/Bosses/Varaha.png" date="Nov 25" weather="Quantum" bosspage="/boss?quavalralhal"/>
                </div>
                 
                <div class="flex col-span-3 justify-center gap-1 ml-2">
                <BossCard image="images/Bosses/Varaha.png" date="Nov 26" />
                <BossCard image="images/Bosses/MOBIUS.png"/>
                <BossCard image="images/Bosses/Kallen.webp" />
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