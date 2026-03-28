

<svelte:head>
    <title>v8.7 Calendar and Boss Schedule</title> 
    <meta property="og:title" content="HI3 Calendar and Boss Schedule"/>
    <meta property="og:description" content="Version 8.7" />
    <meta property="og:image" content={data.ogImage} />
    <meta property="og:url" content="https://marisaimpact.com/valk/calendar87" />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary_large_image">

    <link rel="canonical" href="https://marisaimpact.com/valk/calendar87" />
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
            title: "Battlesuit Supply A: Xentinel",
            description: '<ul class="list-disc px-4 text-sm sm:text-base"><li>Duration: 6 weeks</li><li>First ten pulls are 50% off.</li><li>A-rank: Valkyrie Gloria (UP), Valkyrie Triumph, Divine Prayer, Swallowtail Phantasm </li></ul>',
        
        },
        "Valk2": {
            title: "Battlesuit Supply B: BFD",
            description: '- Duration: 2 weeks<br/>- A-rank: Valkyrie Blastmetal (UP), Phantom Iron, Snowy Sniper, Midnight Absinthe',
        },         
        "Valk3": {
            title: "Battlesuit Supply A: Reign Solaris",
            description: '- Duration: 4 weeks<br/>- A-rank: Blueberry Blitz (UP), Valkyrie Triumph, Valkyrie Pledge, Swallowtail Phantasm',
        },    
        "Carnival": {
            title: "Carnival Battlesuit Supply",
            description: '- Carnival Battlesuit Supply has the same rates and rules as regular Battlesuit Supply. <br/> - You get free 2x Ten-Pull Carnival Battlesuit Card in 8.7. Can only be used in 8.7. <br/> - Guarantee is not shared with regular supplies.  <br/> - Guarantee is shared with other carnival supplies in the same patch. <br/> - Guarantee counter resets when the patch ends.',
        },            
        "CarnivalEquip": {
            title: "Carnival Equipment Supply",
            description: '- Carnival Equipment Supply has the same rates and rules as regular Equipment Supply. <br/> - Guarantee is not shared with regular supplies.  <br/> - Guarantee is shared with other carnival supplies in the same patch. <br/> - Guarantee counter resets when the patch ends.',
        },             
        "Equip": {
            title: "Equipment Supply",
            description: '          <ul class="list-disc px-4 text-sm sm:text-base"><li>Equipment Supply only has one featured weapon and stigma set.</li><li>Cost: 280 crystal or Equipment Supply Card, per pull.</li><li>Every 10 pulls guarantee either weapon or stigma.</li><li>Weapon guaranteed in 60 pulls (16,800 crystals) or less.</li></ul>',
        },
        "Horbdlc": {
            title: "Equipment Supply",
            description: '          <ul class="list-disc px-4 text-sm sm:text-base"><li>Equipment Supply only has one featured weapon and stigma set.</li><li>Cost: 280 crystal or Equipment Supply Card, per pull.</li><li>Every 10 pulls guarantee either weapon or stigma.</li><li>Weapon guaranteed in 60 pulls (16,800 crystals) or less.</li></ul>',
            image: "https://i.imgur.com/Kf1bHVC.jpeg"
        
        },        
        "Returnee": {
            title: "Returnee Supply",
            description: 'Condition for Returnee Supply:          <ul class="list-disc px-4 text-sm sm:text-base"><li>Captain Level ≥ 15, has no returnee record, and has been 15 days or more since last login</li><li>Captains Level ≥ 15, has a previous returnee record, and has been 45 days or more since login and last returnee status (Note: I heard you need around 60 days now since 6 patches a year)</li><li>I have been informed that currently the requirement is ~60 days, since patches are longer. I cannot confirm it myself.</li> </ul>',
        },
        "Spending": {
            title: "Major Spending Event",
            image: "https://i.imgur.com/R263Hoh.jpeg"
        },
        "OutfitRerun": {
            title: "Outfit Rerun Event",
            image: "https://i.imgur.com/anYIaO6.jpeg"
        },
        "OutfitSupply": {
            title: "Badum Wintery Wishes Outfit Supply",
            description: '- Duration: 3 weeks<br/>- Max cost: 9600 crystal for outfit + other rewards<br/>- S-rank box: DA / HoFs / MPE card or 5 stamps.',
            image: "https://i.imgur.com/M2lLRVy.jpeg"
        },  
        "OutfitSupply3": {
            title: "Peachy Spring Outfit Supply",
            description: '- Duration: 2 weeks<br/>- Max cost: 7680 crystal for outfit + other rewards<br/>- S-rank box: AE / FR / CH card or stamps.',
        },         
        "OutfitSupply2": {
            title: "HoRB Eternal Outfit Outfit Supply",
            description: '- Duration: 2 weeks<br/>- Max cost: 7680 crystal for outfit + other rewards<br/>- S-rank box: MC / BK / Phoenix card or 5 stamps.',
            image: "https://i.imgur.com/KWv3zIZ.jpeg"
        },          
        "OutfitBox": {
            title: "Outfit Box Supply",
            description: '          <ul class="list-disc px-4 text-sm sm:text-base"><li>Duration: 2 weeks</li><li>Outfit Box: Choose one of the outfits</li><li>Max cost: 7680 crystal for outfit box + other rewards</li><li>S-rank box: HoS card or 10 stamps, Mobius card or 5 stamps, HoF card or 5 stamps.</li></ul>',
            image: "https://i.imgur.com/UOFxmct.jpeg"
        },          
        "NewADV": {
            title: "Ascension Supply: Lone Planetfarer",
            description: '<li>Duration: 3weeks.</li><li>A-rank: Scarlet Fusion (UP), Luna Kindred, Valkyrie Blastmetal, Valkyrie Gloria </li><li>Cost: 280 crystal or one Ascension Supply Card per pull.</li><li>Every 10 pulls guarantee either A-rank or S-rank card.</li> <li>S-rank card guaranteed within 90 pulls.</li><li>Pull until 90 pulls to get 100 stamps, enough to rank up a valk to SS-rank.</li><li>Guarantee counter for each Ascension Supply banner is not carried over to other Ascension Supply banners.</li>',

        },
        "NewRebate": {
            title: "Ascension Armament",
            description: '<li>Duration: 3 weeks.</li><li>Cost: 280 crystal or one Equipment Supply Card per pull.</li><li>Every 10 pulls gives 3 Equipment Supply Cards, max 18 Equipment cards can be obtained (at 60 pulls).</li> <li>Every 10 pulls guarantee either weapon or stigma. Weapon is guaranteed in 60 pulls or less.</li><li>Guarantee counter for each Armament Ascension banner is not carried over to other Armament Ascension banners.</li>',

        },
        "Anni7Day": {
            title: "CN 9th Anniversary Login Rewards",
            image: "https://i.imgur.com/3X8i73G.jpeg"
        },       
        "TimeCapsule": {
            title: "Time Capsule",
            image: "https://i.imgur.com/ENrc9Io.jpeg"
        },     
        "Artbook": {
            title: "Art Collection Vol 4 Event",
            image: "https://i.imgur.com/KsCHAeL.jpeg"
        },    
        "FreeBox": {
            title: "Two Outfit Boxes",
            image: "https://i.imgur.com/lhzwTo5.jpeg"
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

    <VersionSelect currentVersion="8.7"></VersionSelect>

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
            <div class="w-[1215px]  bg-linear-to-b from-pink-500 to-pink-100 ">
                <!-- Calendar Header Row -->
                <div class="grid grid-cols-9 gap-2 text-center font-semibold bg-pink-900 text-white p-2  text-sm ">
                    <div>Estimated date for Regional Servers</div>
                    <div>WEEK 1<br/>Mar 5 - 13</div>
                    <div>WEEK 2<br/>Mar 13 - 20</div>
                    <div>WEEK 3<br/>Mar 20 - 27</div>
                    <div>WEEK 4<br/>Mar 27 - Apr 3</div>
                    <div>WEEK 5<br/>Apr 3 - 10</div>
                    <div>WEEK 6<br/>Apr 10 - 17</div>
                    <div>WEEK 7<br/>Apr 17 - 24</div>
                    <div>WEEK 8<br/>Apr 24 - 30</div>

                </div>


                <div class="relative grid grid-cols-9 gap-1  h-[54px] pe-1 overflow-x-clip ">
                    <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                         <span class="font-bold0">BATTLESUIT SUPPLY A</span>
                    </div>                    
                    <div on:click={() => openModal("Valk1")} class="rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-6 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Xentinel<br/>First ten pulls are 50% off</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-32 h-full ">
                            <img src="https://i.imgur.com/dVZrems.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-lg" />
                        </div>
                    </div>    
                    <div on:click={() => openModal("")} class="rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-2 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Miss Espionage</span>

                    </div>  
                </div>

                <div class="relative grid grid-cols-9 gap-1  h-[54px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-pink-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">EQUIPMENT SUPPLY A</span>
                    </div>                    
                    <div on:click={() => openModal("Equip")} class="rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-6 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Xentinel Equipment</span>

                    </div>                
                    <div on:click={() => openModal("")} class="rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-2 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Miss Espionage Equipment</span>

                    </div> 
                </div>

                <div class="relative grid grid-cols-9 gap-1  h-[54px] pe-1 overflow-x-clip ">
                    <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                         
                        <span class="font-bold0">BATTLESUIT SUPPLY B</span>
                    </div>  
                    <div class="col-span-3"></div>                  
                    <div on:click={() => openModal("")} class="col-span-3 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Hi Love Elf</span>

                    </div>    

                </div>

                <div class="relative grid grid-cols-9 gap-1  h-[54px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-pink-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">EQUIPMENT SUPPLY B</span>
                    </div>                    
                    <div on:click={() => openModal("Equip")} class="col-span-3 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Lunar Vow DLC</span>

                    </div>                
                    <div on:click={() => openModal("Equip")} class="col-span-3 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Hi Love Elf Equipment</span>

                    </div>   
                </div>

                <div class="relative grid grid-cols-9 gap-1  h-[54px] pe-1 overflow-x-clip ">
                    <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                        <span class="font-bold0">CARNIVAL BATTLESUIT</span>
                    </div>  
                    <div class="col-span-1"></div>                  
                    <div on:click={() => openModal("Carnival")} class="col-span-3 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        
                        <!-- Centered Text -->
                        <span class="absolute top-2 left-2 flex items-center justify-center z-10 leading-4 text-left">Alternating supplies for BFD, PAWS<br/> Badum and Vita Battlesuit</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-32 h-full ">
                            <img src="https://i.imgur.com/FitRAzH.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-lg" />
                        </div>
                    </div>    

                </div>

                <div class="relative grid grid-cols-9 gap-1  h-[54px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-pink-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">CARNIVAL EQUIPMENT</span>
                    </div>   
                     <div class="col-span-1"></div>                  
                 
                    <div on:click={() => openModal("CarnivalEquip")} class="col-span-3 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        
                        <!-- Centered Text -->
                        <span class="absolute top-2 left-2 flex items-center justify-center z-10 leading-4 text-left">Alternating supplies for BFD, PAWS<br/> Badum and Vita Equipment</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-32 h-full ">
                            <img src="https://i.imgur.com/W3Z5NB3.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-lg" />
                        </div>
                    </div>   
                </div>                

                <div class="relative grid grid-cols-9 gap-1  h-[54px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">ASTRAL OP SUPPLY</span>
                    </div>        

                    <div on:click={() => openModal("")} class="col-span-2 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Chenxue</span>

                    </div>    
                    <div on:click={() => openModal("")} class="col-span-1 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Teri</span>

                    </div>   
                                        <div on:click={() => openModal("")} class="col-span-1 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Sera</span>

                    </div>
                     <div on:click={() => openModal("")} class="col-span-2 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Chenxue</span>

                    </div>   
                </div>

                <div class="relative grid grid-cols-9 gap-1  h-[54px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-pink-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">OUTFIT</span>
                    </div>     
                    <div></div>  
                    <div on:click={() => openModal("")} class="col-span-3 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Hi Love Elf Outfit<br/>9600 Crystals</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-32 h-full ">
                            <img src="https://i.imgur.com/iZuO0E4.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-lg" />
                        </div>
                    </div>    
                    
                    <div on:click={() => openModal("")} class="col-span-2 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Badum Wintery Wishes<br/>9600 Crystals</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-10 h-full ">
                            <img src="https://i.imgur.com/mtSEhcz.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-lg" />
                        </div>
                    </div>  

                </div>

                <div class="relative grid grid-cols-9 gap-1  h-[54px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">ASCENSION SUPPLY</span>
                    </div>   
                    <div class="col-span-6"></div>  
                    <div on:click={() => openModal("NewADV")} class="col-span-2 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Reign Solaris</span>

                    </div>                      
                </div>

                <div class="relative grid grid-cols-9 gap-1  h-[54px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-pink-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">ARMAMENT ASCENSION</span>
                    </div>  
                    
                                                        <div class="col-span-6"></div>  
                    <div on:click={() => openModal("NewRebate")} class="col-span-2 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Reign Solaris Equipment</span>

                    </div>   
                </div>

            </div>
        </div>

        

        

</div>

<div class=" mx-0 mt-4 text-center font-bold">EVENT</div>

<div class="p-4 container-screen-2xl flex justify-center items-center mb-20 ">
    <!-- Supply and Events Calendar Layout -->
    <div class="overflow-x-auto ">
            <div class="w-[1215px]  bg-linear-to-b from-pink-500 to-pink-100 ">
                <!-- Calendar Header Row -->
                <div class="grid grid-cols-9 gap-2 text-center font-semibold bg-pink-900 text-white p-2  text-sm ">
                    <div>Estimated date for Regional Servers</div>
                    <div>WEEK 1<br/>Mar 5 - 13</div>
                    <div>WEEK 2<br/>Mar 13 - 20</div>
                    <div>WEEK 3<br/>Mar 20 - 27</div>
                    <div>WEEK 4<br/>Mar 27 - Apr 3</div>
                    <div>WEEK 5<br/>Apr 3 - 10</div>
                    <div>WEEK 6<br/>Apr 10 - 17</div>
                    <div>WEEK 7<br/>Apr 17 - 24</div>
                    <div>WEEK 8<br/>Apr 24 - 30</div>

                </div>



            <div class="relative grid grid-cols-9 gap-1 h-[54px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                     <span class="font-bold0">EVENT 1</span>
                </div> 
    
                    <div on:click={() => openModal("")} class="col-span-6 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Major Spending Event</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-40 h-full ">
                            <img src="https://i.imgur.com/Tz7bNzS.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded" />
                        </div>
                    </div>   
                    
                    <div on:click={() => openModal("")} class="col-span-2 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Hot on the Trail</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-20 h-full ">
                            <img src="https://i.imgur.com/EkXSLEB.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded" />
                        </div>
                    </div>  

            </div>

            <div class="relative grid grid-cols-9 gap-1 h-[54px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-pink-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 2</span>
                </div> 
    
                    <div on:click={() => openModal("")} class="col-span-8 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">7-Day Login: 10 Equip Cards, 1 Xentinel stigma box and 1 Luna DLC stigma box</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-40 h-full ">
                            <img src="https://i.imgur.com/M38gAfC.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded" />
                        </div>
                    </div>   

            </div>

            <div class="relative grid grid-cols-9 gap-1 h-[54px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">                   
                    <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                    
                   <span class="font-bold0">EVENT 3</span>
                </div> 
    
                    <div on:click={() => openModal("")} class="col-span-8 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">7-Day Login: 5 Battlesuit Cards and 1 Prism Stigma Upgrade Ticket</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-40 h-full ">
                            <img src="https://i.imgur.com/QFa184E.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded" />
                        </div>
                    </div>   


            </div>
            <div class="relative grid grid-cols-9 gap-1 h-[54px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-pink-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 4</span>
                </div> 
                     <div></div>
   
                    <div on:click={() => openModal("")} class="col-span-7 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">CNY Freebies: S-rank Selector (Up to HoTR), 5 Battlesuit Cards, frame, 288 crystals</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-40 h-full ">
                            <img src="https://i.imgur.com/LwaBZ7X.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded" />
                        </div>
                    </div>   

            </div>

            <div class="relative grid grid-cols-9 gap-1 h-[54px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">                   
                    <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                    
                   <span class="font-bold0">EVENT 5</span>
                </div> 
                    <div></div>
                    <div on:click={() => openModal("")} class="col-span-7 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Spring Lobby</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-40 h-full ">
                            <img src="https://i.imgur.com/W1yFNBV.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded" />
                        </div>
                    </div>   


            </div>

                <div class="relative grid grid-cols-9 gap-1 h-[54px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-pink-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 6</span>
                </div> 
    
                    <div on:click={() => openModal("")} class="col-span-8 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Featured Event</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-40 h-full ">
                            <img src="https://i.imgur.com/8GZdkPg.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded" />
                        </div>
                    </div>   

            </div>

                        <div class="relative grid grid-cols-9 gap-1 h-[54px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">                   
                    <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                    
                   <span class="font-bold0">EVENT 7</span>
                </div> 
    
                    <div on:click={() => openModal("")} class="col-span-2 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Time Capsule</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-20 h-full ">
                            <img src="https://i.imgur.com/FWcD2cv.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded" />
                        </div>
                    </div>   
                    <div></div>
                    <div on:click={() => openModal("")} class="col-span-5 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">P2 Chapter 11-EX</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-20 h-full ">
                            <img src="https://i.imgur.com/b6BluWL.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded" />
                        </div>
                    </div>   
            </div>

           <div class="relative grid grid-cols-9 gap-1 h-[54px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-pink-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">                   
                    <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                    
                   <span class="font-bold0">EVENT 8</span>
                </div> 
    

                    <div class="col-span-3"></div>
                    <div on:click={() => openModal("FreeBox")} class="col-span-5 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Free Outfit Boxes</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-20 h-full ">
                            <img src="https://i.imgur.com/BsvWITy.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded" />
                        </div>
                    </div>   
            </div>

                       <div class="relative grid grid-cols-9 gap-1 h-[54px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">                   
                    <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                    
                   <span class="font-bold0">EVENT 9</span>
                </div> 
    

                    <div class="col-span-5"></div>
                    <div on:click={() => openModal("")} class="col-span-2 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Bingo Stigma Event</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-20 h-full ">
                            <img src="https://i.imgur.com/JiNOQYu.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded" />
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
                <div class="col-span-1 px-4 py-2 mr-3 ">v8.7 WEEK</div>
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
                <BossCard image="/images/Bosses/Ricecake.webp" date="Mar 6" weather="Physical" bosspage="/boss?ricecake" />
                <BossCard image="/images/Bosses/tribunal.png" date="Mar 9" weather="Bleed" bosspage="/boss?bleed-tribunal" />
                </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                <BossCard image="/images/Bosses/Ricecake.webp" date="Mar 10" />
                <BossCard image="/images/BossesMA/Bright Knight Excelsis_SSS.webp"/>
                <BossCard image="/images/Bosses/Dark Jixuanyuan.webp"/>                
                </div>
    

            </div>
            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    2
                </div>



                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                <BossCard image="/images/Bosses/Raven.png" date="Mar 13" weather="Extreme" bosspage="/boss?extreme-raven" />
                <BossCard image="/images/Bosses/Benares.webp" date="Mar 16" weather="Ice" bosspage="/boss?benares" />
                </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                <BossCard image="/images/Bosses/Paros.png" date="Mar 17" />
                <BossCard image="/images/Bosses/Husk Mysticism.webp"/>
                <BossCard image="/images/Bosses/Herrscher of the Void.webp"/>                
                </div>

            </div>
            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    3
                </div>


                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                <BossCard image="/images/Bosses/Sprout_of_Wishing_SSS.webp" date="Mar 20" weather="Lightning" bosspage="/boss?lightningsprout" />
                <BossCard image="/images/Bosses/Dark Jixuanyuan.webp" date="Mar 23" weather="Type" bosspage="/boss?typedjxy" />
                </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                <BossCard image="/images/Bosses/Sa_SSS.webp" date="Mar 24" />
                <BossCard image="/images/Bosses/Hephaestus SSS.webp"/>
                <BossCard image="/images/Bosses/Assaka.webp"/>                
                </div>
    

            </div>
            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    4
                </div>



                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                <BossCard image="/images/Bosses/Paros.png" date="Mar 27" weather="Extreme" bosspage="/boss?paros" />
                <BossCard image="/images/Bosses/Parvati.webp" date="Mar 30" weather="Extreme" bosspage="/boss?extreme-parvati" />
                </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                <BossCard image="/images/Bosses/Ricecake.webp" date="Mar 31" />
                <BossCard image="/images/Bosses/Lantern_Tsavorae_SSS.webp"/>
                <BossCard image="/images/Bosses/Dark Jixuanyuan.webp"/>                
                </div>

            </div>  
            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    5
                </div>


                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                <BossCard image="/images/Bosses/MOBIUS2.png" date="Apr 3" weather="Bleed" bosspage="/boss?bleedmobius" />
                <BossCard image="/images/Bosses/Swarm.webp" date="Apr 6" weather="Flux" bosspage="/boss?fluxmob" />
                </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                <BossCard image="/images/Bosses/epernay.png" date="Apr 7" />
                <BossCard image="/images/Bosses/MOBIUS2.png"/>
                <BossCard image="/images/Bosses/Kallen.webp"/>                
                </div>

            </div> 
            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    6
                </div>


                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                <BossCard image="/images/Bosses/Shadow Knight (SK).webp" date="Apr 10" weather="Dominance" bosspage="/boss?domsk" />
                <BossCard image="/images/Bosses/JizoMitama.webp" date="Apr 13" weather="Physical" bosspage="/boss?jizo" />
                </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                <BossCard image="/images/Bosses/Kevin Deliverance.webp" date="Apr 14" />
                <BossCard image="/images/Bosses/duonigue.png"/>
                <BossCard image="/images/Bosses/Argent Knight Artemis (AKA).webp"/>                
                </div>

            </div> 
            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    7
                </div>


                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                <BossCard image="/images/Bosses/Imgpig.webp" date="Apr 17" weather="Lightning" bosspage="/boss?marut" />
                <BossCard image="/images/Bosses/Kevin Deliverance.webp" date="Apr 20" weather="Physical" bosspage="/boss?kevin" />
                </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                <BossCard image="/images/Bosses/Ricecake.webp" date="Apr 21" />
                <BossCard image="/images/Bosses/Imgpig.webp"/>
                <BossCard image="/images/Bosses/RPC-6626.webp"/>                
                </div>
    

            </div>  
            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    8
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                <BossCard image="/images/Bosses/MHT-3B Nirvana.webp" date="Apr 24" weather="Fire" bosspage="/boss?firetank" />
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
        <div class="modal-box max-w-4xl max-h-[90vh]" on:click|stopPropagation>
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