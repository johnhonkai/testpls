

<svelte:head>
    <title>v9.0 Calendar and Boss Schedule</title> 
    <meta property="og:title" content="HI3 Calendar and Boss Schedule"/>
    <meta property="og:description" content="Version 9.0" />
    <meta property="og:image" content={data.ogImage} />
    <meta property="og:url" content="https://marisaimpact.com/valk/calendar90" />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary_large_image">

    <link rel="canonical" href="https://marisaimpact.com/valk/calendar90" />
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
        "OutfitSupply": {
            title: "Outfit Supply",
            description: '- Max cost: 9600 crystal for outfit + other rewards<br/>- S-rank box: HoT / Mobius / MPE card or stamps.',
        },        
        "OutfitBox": {
            title: "Outfit Box Supply",
            description: '          <ul class="list-disc px-4 text-sm sm:text-base"><li>Duration: 2 weeks</li><li>Outfit Box: Choose one of the outfits</li><li>Max cost: 7680 crystal for outfit box + other rewards</li><li>S-rank box: HoS card or 10 stamps, Mobius card or 5 stamps, HoF card or 5 stamps.</li></ul>',
            image: "https://i.imgur.com/UOFxmct.jpeg"
        },          
        "NewADV": {
            title: "Ascension Supply",
            description: '<ul class="list-disc px-4 text-sm sm:text-base"><li>Cost: 280 crystal or one Ascension Supply Card per pull.</li><li>Every 10 pulls guarantee either A-rank or S-rank card.</li> <li>S-rank card guaranteed within 90 pulls.</li><li>Pull until 90 pulls to get 100 stamps, enough to rank up a valk to SS-rank.</li><li>Guarantee counter for each Ascension Supply banner is not carried over to other Ascension Supply banners.</li></ul>',

        },
        "NewRebate": {
            title: "Ascension Armament",
            description: '<li>Cost: 280 crystal or one Equipment Supply Card per pull.</li><li>Every 10 pulls gives 3 Equipment Supply Cards, max 18 Equipment cards can be obtained (at 60 pulls).</li> <li>Every 10 pulls guarantee either weapon or stigma. Weapon is guaranteed in 60 pulls or less.</li><li>Guarantee counter for each Armament Ascension banner is not carried over to other Armament Ascension banners.</li>',
        },    
        "TimeCapsule": {
            title: "Time Capsule",
            image: "https://i.imgur.com/ENrc9Io.jpeg"
        },     
        "Artbook": {
            title: "Art Collection Vol 4 Event",
            image: "https://i.imgur.com/KsCHAeL.jpeg"
        },    
        "Summer": {
            title: "Returning Outfits",
            image: "https://i.imgur.com/Ho6r1Vi.png"
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

    <VersionSelect currentVersion="9.0"></VersionSelect>

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
            <div class="w-[1350px]  bg-linear-to-b from-pink-500 to-pink-100 ">
                <!-- Calendar Header Row -->
                <div class="grid grid-cols-10 gap-2 text-center font-semibold bg-pink-900 text-white p-2  text-sm ">
                    <div>Estimated date for Regional Servers</div>
                    <div>WEEK 1<br/>Aug 20 - 28</div>
                    <div>WEEK 2<br/>Aug 28 - Sep 4</div>
                    <div>WEEK 3<br/>Sep 4 - 11</div>
                    <div>WEEK 4<br/>Sep 11 - 18</div>
                    <div>WEEK 5<br/>Sep 18 - 25</div>
                    <div>WEEK 6<br/>Sep 25 - Oct 2</div>
                    <div>WEEK 7<br/>Oct 2 - 9</div>
                    <div>WEEK 8<br/>Oct 9 - 16</div>
                    <div>WEEK 9<br/>Oct 16 - 22</div>

                </div>


                <div class="relative grid grid-cols-10 gap-1  h-[54px] pe-1 overflow-x-clip ">
                    <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                         <span class="font-bold0">BATTLESUIT SUPPLY A</span>
                    </div>      

                </div>

                <div class="relative grid grid-cols-10 gap-1  h-[54px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-pink-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">EQUIPMENT SUPPLY A</span>
                    </div>                    
                    <div on:click={() => openModal("Equip")} class="rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-6 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Fenghuang of Vicissitude DLC</span>
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-42 h-full ">
                            <img src="https://i.imgur.com/q3fGvFR.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-lg" />
                        </div>  
                    </div>       
                     <div on:click={() => openModal("Equip")} class="rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-3 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Herrscher of Human DLC</span>

                    </div>                                        
                </div>

                <div class="relative grid grid-cols-10 gap-1  h-[54px] pe-1 overflow-x-clip ">
                    <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                         
                        <span class="font-bold0">BATTLESUIT SUPPLY B</span>
                    </div>             
                    <div on:click={() => openModal("")} class="col-span-9 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Jovial Deception</span>
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-25 h-full ">
                            <img src="https://i.imgur.com/jXjGF6i.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-lg" />
                        </div>
                    </div>    

                </div>

                <div class="relative grid grid-cols-10 gap-1  h-[54px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-pink-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">EQUIPMENT SUPPLY B</span>
                    </div>                    
                    <div on:click={() => openModal("Equip")} class="col-span-9 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Jovial Deception Equipment</span>

                    </div>                                                      
                </div>

          

                <div class="relative grid grid-cols-10 gap-1  h-[54px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">ASTRAL OP SUPPLY</span>
                    </div>        

                    <div on:click={() => openModal("")} class="col-span-6 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4 ">Senadina. Every 10 pulls give 2 Equip cards, up to 12 max.<br/>Sena will return in 9.1</span>
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-25 h-full ">
                            <img src="https://i.imgur.com/aoaAhrt.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-lg" />
                        </div>

                    </div>    
                    
                </div>

                <div class="relative grid grid-cols-10 gap-1  h-[54px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-pink-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">OUTFIT</span>
                    </div>     
                    <div></div>  
                    <div on:click={() => openModal("OutfitSupply")} class="col-span-2 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center leading-4 ">Crane of Taixuan<br/> 9600 crystal</span>
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-15 h-full ">
                            <img src="https://i.imgur.com/UlqjpdY.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-lg" />
                        </div>
                    </div>       

                </div>

                <div class="relative grid grid-cols-10 gap-1  h-[54px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">ASCENSION SUPPLY</span>
                    </div>     
                    <div on:click={() => openModal("NewADV")} class="col-span-3 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center leading-4 ">Mad Pleasure</span>
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-15 h-full ">
                            <img src="https://i.imgur.com/aYKdgJk.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-lg" />
                        </div>
                    </div>    
                    <div on:click={() => openModal("NewADV")} class="col-span-3 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center leading-4 ">Lone Destruction</span>
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-15 h-full ">
                            <img src="https://i.imgur.com/uv7AkXU.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-lg" />
                        </div>
                    </div>                                       
                </div>

                <div class="relative grid grid-cols-10 gap-1  h-[54px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-pink-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">ARMAMENT ASCENSION</span>
                    </div>  
                    <div on:click={() => openModal("NewRebate")} class="col-span-3 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center leading-4 ">Mad Pleasure Equipment</span>

                    </div>  
                    <div on:click={() => openModal("NewRebate")} class="col-span-3 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center leading-4 ">Lone Destruction Equipment</span>

                    </div>                      
                </div>

            </div>
        </div>

        

        

</div>

<div class=" mx-0 mt-4 text-center font-bold">EVENT</div>

<div class="p-4 container-screen-2xl flex justify-center items-center mb-20 ">
    <!-- Supply and Events Calendar Layout -->
    <div class="overflow-x-auto ">
            <div class="w-[1350px]  bg-linear-to-b from-pink-500 to-pink-100 ">
                <!-- Calendar Header Row -->
                <div class="grid grid-cols-10 gap-2 text-center font-semibold bg-pink-900 text-white p-2  text-sm ">
                    <div>Estimated date for Regional Servers</div>
                    <div>WEEK 1<br/>Aug 20 - 28</div>
                    <div>WEEK 2<br/>Aug 28 - Sep 4</div>
                    <div>WEEK 3<br/>Sep 4 - 11</div>
                    <div>WEEK 4<br/>Sep 11 - 18</div>
                    <div>WEEK 5<br/>Sep 18 - 25</div>
                    <div>WEEK 6<br/>Sep 25 - Oct 2</div>
                    <div>WEEK 7<br/>Oct 2 - 9</div>
                    <div>WEEK 8<br/>Oct 9 - 16</div>
                    <div>WEEK 9<br/>Oct 16 - 22</div>

                </div>



            <div class="relative grid grid-cols-10 gap-1 h-[54px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                     <span class="font-bold0">EVENT 1</span>
                </div> 
    
                    <div on:click={() => openModal("")} class="col-span-9 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Topup Event: Topup ~100usd to get up to 3x Sparkle / Reign Solaris stamps</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-40 h-full ">
                            <img src="https://i.imgur.com/wBb9Ifv.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded" />
                        </div>
                    </div>   


            </div>

            <div class="relative grid grid-cols-10 gap-1 h-[54px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-pink-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 2</span>
                </div> 
    
                    <div on:click={() => openModal("")} class="col-span-9 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">7-Day Login: 120 crystals, 1 FoV DLC stigma box, and mats</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-40 h-full ">
                            <img src="https://i.imgur.com/K7BHwQ3.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded" />
                        </div>
                    </div>   

            </div>

            <div class="relative grid grid-cols-10 gap-1 h-[54px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">                   
                    <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                    
                   <span class="font-bold0">EVENT 3</span>
                </div> 
                    <div on:click={() => openModal("")} class="col-span-6 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">7-Day Login: 300 crystals (cont from v8.9)</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-40 h-full ">
                            <img src="https://i.imgur.com/MWL3IyU.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded" />
                        </div>
                    </div>   
                    <div on:click={() => openModal("")} class="col-span-3 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">7-Day Login: 2 Equip Card</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-40 h-full ">
                            <img src="/images/events/90/event10.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded" />
                        </div>
                    </div>   
            </div>
            <div class="relative grid grid-cols-10 gap-1 h-[54px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-pink-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 4</span>
                </div> 
                    <div on:click={() => openModal("")} class="col-span-9 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Captain’s Wishing Tree Secrets</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-40 h-full ">
                            <img src="https://i.imgur.com/WNfOCix.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded" />
                        </div>
                    </div>     
            </div>
             <div class="relative grid grid-cols-10 gap-1 h-[54px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">                   
                    <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                    
                   <span class="font-bold0">EVENT 5</span>
                </div> 
                    <div></div>
                    <div on:click={() => openModal("")} class="col-span-8 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">8-Day Login: 5 Equip Cards</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-40 h-full ">
                            <img src="https://i.imgur.com/CEXLmaT.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded" />
                        </div>
                    </div>   


            </div>                     
             <div class="relative grid grid-cols-10 gap-1 h-[54px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-pink-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 6</span>
                </div> 
                <div></div>
                <div></div>
                    <div on:click={() => openModal("")} class="col-span-7 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Part 2 Finale</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-40 h-full ">
                            <img src="https://i.imgur.com/HVYWoVx.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded" />
                        </div>
                    </div>     
            </div>   
             <div class="relative grid grid-cols-10 gap-1 h-[54px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">                   
                    <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                    
                   <span class="font-bold0">EVENT 7</span>
                </div> 
                    <div class="col-span-3"></div>
                    <div on:click={() => openModal("")} class="col-span-6 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Flying to Oxia Invitation Contest</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-40 h-full ">
                            <img src="https://i.imgur.com/PTwcycr.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded" />
                        </div>
                    </div>   


            </div>
            
           <div class="relative grid grid-cols-20 gap-1 h-[54px] pe-1 overflow-x-clip">
                <div class="col-span-2 flex font-bold  text-pink-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 8</span>
                </div> 
                <div class="col-span-9"></div>
                    <div on:click={() => openModal("")} class="col-span-4 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Cabbage Farm</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-20 h-full ">
                            <img src="/images/events/90/event8.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded" />
                        </div>
                    </div>     
            </div> 
             <div class="relative grid grid-cols-10 gap-1 h-[54px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">                   
                    <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                    
                   <span class="font-bold0">EVENT 9</span>
                </div> 
                    <div class="col-span-6"></div>
                    <div on:click={() => openModal("")} class="col-span-3 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Star-Tempering Clash</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-40 h-full ">
                            <img src="/images/events/90/event9.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded" />
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
                <div class="col-span-1 px-4 py-2 mr-3 ">v9.0 WEEK</div>
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
                <BossCard image="/images/Bosses/Parvati.webp" date="Aug 21" weather="Shadow" bosspage="/boss?shadow-parvati" />
                <BossCard image="/images/Bosses/Herrscher of the Void.webp" date="Aug 24" weather="Ice" bosspage="/boss?icehov" />
                </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                <BossCard image="/images/Bosses/Herrscher of Rimestar.png" date="Aug 25" />
                <BossCard image="/images/Bosses/Lantern_Tsavorae_SSS.webp" />
                <BossCard image="/images/BossesMA/Deathly Doom.webp" />
                </div>


            </div>
            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    2
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                <BossCard image="/images/Bosses/Herrscher of Rimestar.png" date="Aug 28" weather="Fire" bosspage="/boss?firerimestar" />
                <BossCard image="/images/Bosses/epernay.png" date="Aug 31" weather="Shadow" bosspage="/boss?shadow-epernay" />
                </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                <BossCard image="/images/Bosses/Alien Guard_SSS.webp" date="Sep 1" />
                <BossCard image="/images/Bosses/Vita.png" />
                <BossCard image="/images/Bosses/Hellmaru.webp" />
                </div>


            </div>
            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    3
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                <BossCard image="/images/Bosses/Meteor_Guaymas.webp" date="Sep 4" weather="Lightning" bosspage="/boss?lightningguaymas" />
                <BossCard image="/images/Bosses/Saha Assaka.webp" date="Sep 7" weather="Shadow" bosspage="/boss?shadow-assaka" />
                </div>

                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                <BossCard image="/images/Bosses/Flame-Chaser - Kalpas.webp" date="Sep 8" />
                <BossCard image="/images/BossesMA/Huodou_SSS.webp" />
                <BossCard image="/images/Bosses/Lantern_SS.webp" />
                </div>


            </div>
            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    4
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                <BossCard image="/images/Bosses/Husk%20Mysticism.webp" date="Sep 11" weather="Lightning" bosspage="/boss?lightbull" />
                <BossCard image="/images/Bosses/MOBIUS2.png" date="Sep 14" weather="Fire" bosspage="/boss?firemobius" />
                </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                <BossCard image="/images/Bosses/Herrscher of Rimestar.png" date="Sep 15" />
                <BossCard image="/images/Bosses/Sampo.webp" />
                <BossCard image="/images/Bosses/Dark Jixuanyuan.webp" />
                </div>


            </div>  
            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    5
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                <BossCard image="/images/Bosses/Argent Knight Artemis (AKA).webp" date="Sep 18" weather="Ignite" bosspage="/boss?aka" />
                <BossCard image="/images/Bosses/Paros.png" date="Sep 21" weather="Extreme" bosspage="/boss?paros" />
                </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                <BossCard image="/images/Bosses/Vita.png" date="Sep 22" />
                <BossCard image="/images/Bosses/Flame-Chaser - Kosma.webp" />
                <BossCard image="/images/Bosses/Hephaestus.webp" />
                </div>

            </div> 
            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    6
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                <BossCard image="/images/Bosses/Sampo.webp" date="Sep 25" weather="Fire" bosspage="/boss?firesampo" />
                <BossCard image="/images/Bosses/Vita.png" date="Sep 28" weather="Lightning" bosspage="/boss?lightvita" />
                </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                <BossCard image="/images/Bosses/Sampo.webp" date="Sep 29" />
                <BossCard image="/images/Bosses/Varaha.png" />
                <BossCard image="/images/Bosses/Argent Knight Artemis (AKA).webp" />
                </div>

            </div> 
            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    7
                </div>


                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                <BossCard />
                <BossCard/>
                </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                <BossCard  />
                <BossCard />
                <BossCard  />
                </div>


            </div>  
            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    8
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                <BossCard />
                <BossCard  />
                </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                <BossCard  />
                <BossCard  />
                <BossCard  />
                </div>

            </div>    
            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    9
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                <BossCard />
                <BossCard  />
                </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                <BossCard  />
                <BossCard  />
                <BossCard  />
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