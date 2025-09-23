

<svelte:head>
    <title>v8.5 Calendar and Boss Schedule</title> 
    <meta property="og:title" content="HI3 Calendar and Boss Schedule"/>
    <meta property="og:description" content="Version 8.5" />
    <meta property="og:image" content={data.ogImage} />
    <meta property="og:url" content="https://marisaimpact.com/valk/calendar85" />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary_large_image">

    <link rel="canonical" href="https://marisaimpact.com/valk/calendar85" />
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
            title: "Battlesuit Supply A: Hi Love Elf",
            description: '<li>Duration: 6 weeks</li><li>First ten pulls are free.</li><li>A-rank: Valkyrie Boltstorm (UP), Flame Sakitama, Umbral Rose, Valkyrie Gloria</li>',
        },
        "Valk2": {
            title: "Battlesuit Supply B: Reign Solaris",
            description: '<li>Duration: 2 weeks</li><li>A-rank: Valkyrie Pledge (UP), Ritual Imayoh, Snowy Sniper, Wolf Dawn </li>',
        },    
        "Valk3": {
            title: "Battlesuit Supply A: PAWS",
            description: '<li>Duration: 3 weeks</li><li>A-rank: Valkyrie Boltstorm (UP), Night Squire, Divine Prayer, Valkyrie Gloria </li>',
        },             
        "Equip": {
            title: "Equipment Supply",
            description: '<li>Equipment Supply only has one featured weapon and stigma set.</li><li>Cost: 280 crystal or Equipment Supply Card, per pull.</li><li>Every 10 pulls guarantee either weapon or stigma.</li><li>Weapon guaranteed in 60 pulls (16,800 crystals) or less.</li>',
        },
        "Returnee": {
            title: "Returnee Supply",
            description: "Condition for returnee status:<li>Captain Level ≥ 15, has no returnee record, and has been 15 days or more since last login</li><li>Captains Level ≥ 15, has a previous returnee record, and has been 45 days or more since login and last returnee status (Note: I heard you need around 60 days now since 6 patches a year)</li><li>Returnee expansion and focus work the same as normal Expansion and Focus Supply, but the pity won't carry over to normal expansion and focus.</li><li>You get one free pull everyday (limited amount)</li>",
        },
        "Spending": {
            title: "Major Spending Event",
            image: "https://i.imgur.com/R263Hoh.jpeg"
        },
        "OutfitRerun": {
            title: "Outfit Rerun Event",
            image: "https://i.imgur.com/anYIaO6.jpeg"
        },
        "HoFiOutfit": {
            title: "Selenic Ripples Outfit Supply",
            description: '<li>Duration: 2 weeks</li><li>Max cost: 7680 crystal for outfit + other rewards</li><li>S-rank box: AE card or 10 stamps, SN card or 5 stamps, DA card or 5 stamps.</li>',
            image: "https://i.imgur.com/QGpCGL3.jpeg"
        },  
        "OutfitBox": {
            title: "Outfit Box Supply",
            description: '<li>Duration: 2 weeks</li><li>Outfit Box: Choose one of the outfits</li><li>Max cost: 7680 crystal for outfit box + other rewards</li><li>S-rank box: HoS card or 10 stamps, Mobius card or 5 stamps, HoF card or 5 stamps.</li>',
            image: "https://i.imgur.com/UOFxmct.jpeg"
        },          
        "NewADV": {
            title: "Ascension Supply: Jovial Deception",
            description: '<li>Duration: 3 weeks.</li><li>A-rank: Swallowtail Phantasm (UP), Sakuno Rondo, Valkyrie Ranger, Kriegmesser </li><li>Cost: 280 crystal or one Ascension Supply Card per pull.</li><li>Every 10 pulls guarantee either A-rank or S-rank card.</li> <li>S-rank card guaranteed within 90 pulls.</li><li>Pull until 90 pulls to get 100 stamps, enough to rank up a valk to SS-rank.</li><li>Guarantee counter for each Ascension Supply banner is not carried over to other Ascension Supply banners.</li>',

        },
        "NewRebate": {
            title: "Ascension Armament: Jovial Deception Equipment",
            description: '<li>Duration: 3 weeks.</li><li>Cost: 280 crystal or one Equipment Supply Card per pull.</li><li>Every 10 pulls gives 3 Equipment Supply Cards, max 18 Equipment cards can be obtained (at 60 pulls).</li> <li>Every 10 pulls guarantee either weapon or stigma. Weapon is guaranteed in 60 pulls or less.</li><li>Guarantee counter for each Armament Ascension banner is not carried over to other Armament Ascension banners.</li>',

        },
        "Anni7Day": {
            title: "CN 9th Anniversary Login Rewards",
            image: "https://i.imgur.com/OlcuwHM.jpeg"
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

    <VersionSelect currentVersion="8.5"></VersionSelect>

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
            <div class="w-[1485px]  bg-linear-to-b from-pink-500 to-pink-100 ">
                <!-- Calendar Header Row -->
                <div class="grid grid-cols-11 gap-2 text-center font-semibold bg-pink-900 text-white p-2  text-sm ">
                    <div>Estimated date for Regional Servers</div>
                    <div>WEEK 1<br/>Oct 23 - 31</div>
                    <div>WEEK 2<br/>Oct 31 - Nov 7</div>
                    <div>WEEK 3<br/>Nov 7 - 14</div>
                    <div>WEEK 4<br/>Nov 14 -21</div>
                    <div>WEEK 5<br/>Nov 21 - 28</div>
                    <div>WEEK 6<br/>Nov 28 - Dec 5</div>
                    <div>WEEK 7<br/>Dec 5 - 12</div>
                    <div>WEEK 8<br/>Dec 12 - 19</div>
                    <div>WEEK 9<br/>Dec 19 - 26</div>
                    <div>WEEK 10<br/>Dec 26 - Jan 1</div>

                </div>


                <div class="relative grid grid-cols-11 gap-1  h-[54px] pe-1 overflow-x-clip ">
                    <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                         <span class="font-bold0">BATTLESUIT SUPPLY A</span>
                    </div>                    
                    <div on:click={() => openModal("Valk1")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-6 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Hi ♪ Love Elf ♥<br/>First ten pulls are free</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-32 h-full">
                            <img src="https://i.imgur.com/UMmAJMr.png" alt="Lone Planetfarer" class="w-full h-full object-cover" />
                        </div>
                    </div>    
 
                </div>

                <div class="relative grid grid-cols-11 gap-1  h-[54px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-pink-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">EQUIPMENT SUPPLY A</span>
                    </div>                    
                    <div on:click={() => openModal("Equip")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-6 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10">Hi ♪ Love Elf ♥ Equipment</span>
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-32 h-full">
                            <img src="https://i.imgur.com/S37M0fG.png" alt="Lone Planetfarer" class="w-full h-full object-cover" />
                        </div>
                    </div>                   

                </div>

                <div class="relative grid grid-cols-11 gap-1  h-[54px] pe-1 overflow-x-clip ">
                    <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>                         
                        <span class="font-bold0">BATTLESUIT SUPPLY B</span>
                    </div>  
                    <div class=" col-span-4"></div>                  
                    <div on:click={() => openModal("Valk2")} class=" col-span-2 will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">BFD</span>
                        <!-- Image positioned on the right side -->

                    </div>    

                </div>

                <div class="relative grid grid-cols-11 gap-1  h-[54px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-pink-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">EQUIPMENT SUPPLY B</span>
                    </div>  
                    <div on:click={() => openModal("Equip")} class="col-span-4 will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10">Herrscher of Rebirth DLC</span>
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-32 h-full">
                            <img src="https://i.imgur.com/vmiHny4.png" alt="Lone Planetfarer" class="w-full h-full object-cover" />
                        </div>
                    </div>    
                    
                    <div on:click={() => openModal("Equip")} class="col-span-2 will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10">BFD Equipment</span>

                    </div>

                </div>

                <div class="relative grid grid-cols-22 gap-1  h-[54px] pe-1 overflow-x-clip ">
                    <div class="flex font-bold col-span-2 text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>                         
                        <span class="font-bold0">CARNIVAL BATTLESUIT</span>
                    </div>   
                    <div></div>            
                    <div on:click={() => openModal("")} class=" col-span-7 will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        
                        <!-- Centered Text -->
                        <span class="absolute top-2 left-2 flex items-center justify-center z-10 leading-4 text-left">Alternating supplies for Vita, PS,<br/> Badum and Sparkle Battlesuit</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-40 h-full">
                            <img src="https://i.imgur.com/wECgdOI.png" alt="Lone Planetfarer" class="w-full h-full object-cover" />
                        </div>
                    </div>    

                </div>

                <div class="relative grid grid-cols-22 gap-1  h-[54px] pe-1 overflow-x-clip">
                    <div class="flex font-bold col-span-2 text-pink-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">CARNIVAL EQUIPMENT</span>
                    </div>   
                    <div></div>            
                    <div on:click={() => openModal("Equip")} class="col-span-7 will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute top-2 left-2 flex items-center justify-center z-10 leading-4 text-left">Alternating supplies for Vita, PS,<br/> Badum and Sparkle Equipment</span>
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-40 h-full">
                            <img src="https://i.imgur.com/a9VLfRk.png" alt="Lone Planetfarer" class="w-full h-full object-cover" />
                        </div>
                    </div>    

                </div>

                <div class="relative grid grid-cols-11 gap-1  h-[54px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">ASTRAL OP SUPPLY</span>
                    </div>                    
                    <div on:click={() => openModal("")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-1 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10"></span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-31 h-full">
                            <img src="https://i.imgur.com/SQZ1a1c.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-md" />
                        </div>
                    </div>  
                    <div on:click={() => openModal("")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-1 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10"></span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-32 h-full">
                            <img src="https://i.imgur.com/wqXgzZw.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-md" />
                        </div>
                    </div>     
                    <div on:click={() => openModal("")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-1 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10"></span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-32 h-full">
                            <img src="https://i.imgur.com/I0zCv7C.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-md" />
                        </div>
                    </div>     
                    <div on:click={() => openModal("")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-1 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10"></span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute center-0 top-1/2 transform -translate-y-1/2 w-28 h-full">
                            <img src="https://i.imgur.com/HfH0P3l.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-md" />
                        </div>
                    </div>                            
                    <div on:click={() => openModal("")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-2 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10">Chenxue</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-16 h-full">
                            <img src="https://i.imgur.com/SQZ1a1c.png" alt="PS" class="w-full h-full object-cover rounded-md" />
                        </div>
                    </div>   

  

                </div>

                <div class="relative grid grid-cols-11 gap-1  h-[54px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-pink-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">OUTFIT SUPPLY</span>
                    </div>       
                    <div></div>       
                    <div on:click={() => openModal("")} class="col-span-3 will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
<div class="absolute inset-0 flex flex-col items-center justify-center z-10 leading-5">
  <span class="font-semibold">Winter Wishes</span>
  <span class="font-light">9600 crystals</span>
</div>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-32 h-[47px]">
                            <img src="https://i.imgur.com/ege6cGB.png" alt="Badum" class="w-full h-full object-cover rounded-md" />
                        </div>
                    </div>    
                    
                    <div on:click={() => openModal("")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-2 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
<div class="absolute inset-0 flex flex-col items-center justify-center z-10 leading-5">
  <span class="font-semibold">Eternal Night</span>
  <span class="font-light">??? crystals</span>
</div>                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-20 h-[47px]">
                            <img src="https://i.imgur.com/92SkZUr.png" alt="HoRB" class="w-full h-full object-cover rounded-md" />
                        </div>
                    </div>  
                </div>

                
    
                
                                <div class="relative grid grid-cols-11 gap-1  h-[54px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">RETURNEE SUPPLY</span>
                    </div>                  
                    <div on:click={() => openModal("Returnee")} class=" will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-10 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-5">To Be Announced</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-40 h-[45px]">
                        </div>
                    </div>                 
                </div>



                
            </div>
        </div>

        

        

</div>

<div class="block sm:hidden mx-0 mt-2 text-center font-bold">EVENT</div>

<div class="p-4 container-screen-2xl flex justify-center items-center mb-20 ">
    <!-- Supply and Events Calendar Layout -->
    <div class="overflow-x-auto ">
            <div class="w-[1485px]  bg-linear-to-b from-pink-500 to-pink-100 ">
                <!-- Calendar Header Row -->
                <div class="grid grid-cols-11 gap-2 text-center font-semibold bg-pink-900 text-white p-2  text-sm ">
                    <div>Estimated date for Regional Servers</div>
                    <div>WEEK 1<br/>Oct 23 - 31</div>
                    <div>WEEK 2<br/>Oct 31 - Nov 7</div>
                    <div>WEEK 3<br/>Nov 7 - 14</div>
                    <div>WEEK 4<br/>Nov 14 -21</div>
                    <div>WEEK 5<br/>Nov 21 - 28</div>
                    <div>WEEK 6<br/>Nov 28 - Dec 5</div>
                    <div>WEEK 7<br/>Dec 5 - 12</div>
                    <div>WEEK 8<br/>Dec 12 - 19</div>
                    <div>WEEK 9<br/>Dec 19 - 26</div>
                    <div>WEEK 10<br/>Dec 26 - Jan 1</div>

                </div>



            <div class="relative grid grid-cols-11 gap-1 h-[54px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                     <span class="font-bold0">EVENT 1</span>
                </div> 
    
                <div on:click={() => openModal("Spending")} class="col-span-6 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-pink-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Major Spending Event</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-48 h-full">
                        <img src="https://i.imgur.com/8xVzsx3.png" alt="Event 1" class="w-full h-full object-cover " />
                    </div>
                </div>

            </div>

            <div class="relative grid grid-cols-11 gap-1 h-[54px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-pink-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 2</span>
                </div> 
    
                <div on:click={() => openModal("")} class="col-span-6 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-pink-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Art Collection Vol 4 Event</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-48 h-full">
                        <img src="https://i.imgur.com/2EbbGhr.png" alt="Event 1" class="w-full h-full object-cover " />
                    </div>
                </div>

            </div>

            <div class="relative grid grid-cols-11 gap-1 h-[54px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 3</span>
                </div> 
    
    
                <div on:click={() => openModal("Anni7Day")} class="col-span-10 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-pink-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Login Event. [1] Hi Love Elf and HoRB DLC Stigma Box and crystals. [2] 10 Equipment Supply Cards, Stigma Upgrade Coupon, 9th Anni Emblem </span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-48 h-full">
                        <img src="https://i.imgur.com/Akf4mWk.png" alt="Event 1" class="w-full h-full object-cover " />
                    </div>
                </div>

            </div>
            <div class="relative grid grid-cols-11 gap-1 h-[54px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-pink-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 4</span>
                </div> 
                
                
                <div on:click={() => openModal("")} class="col-span-10 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-pink-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">With You! Youthful Dreams</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-48 h-full">
                        <img src="https://i.imgur.com/rsyvoYz.png" alt="Event 1" class="w-full h-full object-cover " />
                    </div>
                </div>

                
            </div>

            <div class="relative grid grid-cols-22 gap-1 h-[54px] pe-1 overflow-x-clip">
                <div class="flex font-bold col-span-2 text-zinc-700 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 5</span>
                </div> 
                
                <div></div>
                <div on:click={() => openModal("")} class="col-span-19 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-pink-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Ely Cube Event</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-48 h-full">
                        <img src="https://i.imgur.com/PB6TY09.png" alt="Event 1" class="w-full h-full object-cover " />
                    </div>
                </div>

                
            </div>

            <div class="relative grid grid-cols-22 gap-1 h-[54px] pe-1 overflow-x-clip">
                <div class="flex font-bold col-span-2 text-pink-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 6</span>
                </div> 
                
                <div></div>
                <div on:click={() => openModal("")} class="col-span-19 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-pink-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Anniversary 7-Day Login: Free HoTr or HoH. Free 15x Battlesuit or Equipment Cards.</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-48 h-full">
                        <img src="https://i.imgur.com/eYI50mn.png" alt="Event 1" class="w-full h-full object-cover " />
                    </div>
                </div>

            </div>
                     
            <div class="relative grid grid-cols-22 gap-1 h-[54px] pe-1 overflow-x-clip">
                <div class="flex font-bold col-span-2  text-zinc-700 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 7</span>
                </div> 
                <div></div>
                <div on:click={() => openModal("")} class="col-span-11 will-change-transform transform transition-transform hover:scale-105 ease-linear cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-left items-center justify-center border-2  border-pink-700">
                    <!-- Centered Text -->
                    <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Anniversary Recap</span>
                    <!-- Image positioned on the right side -->
                    <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-48 h-full">
                        <img src="https://i.imgur.com/2oiIVry.png" alt="Event 1" class="w-full h-full object-cover " />
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
                <div class="col-span-1 px-4 py-2 mr-3 ">v8.5 WEEK</div>
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
                <BossCard />
                <BossCard />
                </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                        <BossCard   />
                        <BossCard  />
                        <BossCard    />
                    </div>
    

            </div>
            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    2
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                <BossCard />
                <BossCard />
                </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                        <BossCard   />
                        <BossCard  />
                        <BossCard    />
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
                        <BossCard   />
                        <BossCard  />
                        <BossCard    />
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
                        <BossCard   />
                        <BossCard  />
                        <BossCard    />
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
                        <BossCard   />
                        <BossCard  />
                        <BossCard    />
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
                        <BossCard   />
                        <BossCard  />
                        <BossCard    />
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
                        <BossCard   />
                        <BossCard  />
                        <BossCard    />
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
                        <BossCard   />
                        <BossCard  />
                        <BossCard    />
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
                        <BossCard   />
                        <BossCard  />
                        <BossCard    />
                    </div>

            </div>     

            <div class="grid grid-cols-6 gap-1 items-center bg-slate-100 text pt-1 pb-1 pe-2 " >
                <!-- Week Column -->
                <div class="flex items-center justify-center font-bold text-lg rounded-l-lg p-2 text-black">
                    10
                </div>

                <div class="flex col-span-2 justify-center gap-1 mr-2" >
                <BossCard />
                <BossCard />
                </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                        <BossCard   />
                        <BossCard  />
                        <BossCard    />
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