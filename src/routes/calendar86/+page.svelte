

<svelte:head>
    <title>v8.6 Calendar and Boss Schedule</title> 
    <meta property="og:title" content="HI3 Calendar and Boss Schedule"/>
    <meta property="og:description" content="Version 8.6" />
    <meta property="og:image" content={data.ogImage} />
    <meta property="og:url" content="https://marisaimpact.com/valk/calendar86" />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary_large_image">

    <link rel="canonical" href="https://marisaimpact.com/valk/calendar86" />
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
            description: '<ul class="list-disc px-4 text-sm sm:text-base"><li>Duration: 6 weeks</li><li>First ten pulls are 50% off.</li><li>A-rank: Swallowtail Phantasm (UP), Valkyrie Boltstorm, Umbral Rose, Midnight Absinthe </li></ul>',
        
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
            description: '- Carnival Battlesuit Supply has the same rates and rules as regular Battlesuit Supply. <br/> - You get free 2x Ten-Pull Carnival Battlesuit Card in 8.5. Can only be used in 8.5. <br/> - Guarantee is not shared with regular supplies.  <br/> - Guarantee is shared with other carnival supplies in the same patch. <br/> - Guarantee counter resets when the patch ends.',
            image: "https://i.imgur.com/QCJQBIL.png"        
        },            
        "CarnivalEquip": {
            title: "Carnival Equipment Supply",
            description: '- Carnival Equipment Supply has the same rates and rules as regular Equipment Supply. <br/> - Guarantee is not shared with regular supplies.  <br/> - Guarantee is shared with other carnival supplies in the same patch. <br/> - Guarantee counter resets when the patch ends.',
            image: "https://i.imgur.com/oGj8Rr3.jpeg"        
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
            title: "Ascension Supply: SIMP",
            description: '<li>Duration: 2 weeks.</li><li>A-rank: Ritual Imayoh (UP), Night Squire, Yamabuki Armor, Swallowtail Phantasm </li><li>Cost: 280 crystal or one Ascension Supply Card per pull.</li><li>Every 10 pulls guarantee either A-rank or S-rank card.</li> <li>S-rank card guaranteed within 90 pulls.</li><li>Pull until 90 pulls to get 100 stamps, enough to rank up a valk to SS-rank.</li><li>Guarantee counter for each Ascension Supply banner is not carried over to other Ascension Supply banners.</li>',

        },
        "NewRebate": {
            title: "Ascension Armament",
            description: '<li>Duration: 2 weeks.</li><li>Cost: 280 crystal or one Equipment Supply Card per pull.</li><li>Every 10 pulls gives 3 Equipment Supply Cards, max 18 Equipment cards can be obtained (at 60 pulls).</li> <li>Every 10 pulls guarantee either weapon or stigma. Weapon is guaranteed in 60 pulls or less.</li><li>Guarantee counter for each Armament Ascension banner is not carried over to other Armament Ascension banners.</li>',

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
        "Freehoh": {
            title: "Free HoH / HoTr card or 5 stamps and 15 Supply Cards",
            image: "https://i.imgur.com/rVvX1wc.jpeg"
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

    <VersionSelect currentVersion="8.6"></VersionSelect>

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
                    <div>WEEK 1<br/>Jan 1 - 9</div>
                    <div>WEEK 2<br/>Jan 9 - 16</div>
                    <div>WEEK 3<br/>Jan 16 - 23</div>
                    <div>WEEK 4<br/>Jan 23 - 30</div>
                    <div>WEEK 5<br/>Jan 30 - Feb 6</div>
                    <div>WEEK 6<br/>Feb 6 - 13</div>
                    <div>WEEK 7<br/>Feb 13 - 20</div>
                    <div>WEEK 8<br/>Feb 20 - 27</div>
                    <div>WEEK 9<br/>Feb 27 - Mar 5</div>

                </div>


                <div class="relative grid grid-cols-10 gap-1  h-[54px] pe-1 overflow-x-clip ">
                    <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                         <span class="font-bold0">BATTLESUIT SUPPLY A</span>
                    </div>                    
                    <div on:click={() => openModal("Valk1")} class="rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-6 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Miss Espionage<br/>First ten pulls are 50% off</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-32 h-full ">
                            <img src="https://i.imgur.com/ZRv8yx4.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-lg" />
                        </div>
                    </div>    
                </div>

                <div class="relative grid grid-cols-10 gap-1  h-[54px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-pink-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">EQUIPMENT SUPPLY A</span>
                    </div>                    
                    <div on:click={() => openModal("Equip")} class="rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5 col-span-6 bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Miss Espionage Equipment</span>

                    </div>                

                </div>



                <div class="relative grid grid-cols-10 gap-1  h-[54px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">ASTRAL OP SUPPLY</span>
                    </div>        

                    <div on:click={() => openModal("")} class="col-span-3 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Serapeum</span>

                    </div>    

                </div>

                <div class="relative grid grid-cols-10 gap-1  h-[54px] pe-1 overflow-x-clip">
                    <div class="flex font-bold  text-pink-600 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                        <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                         <span class="font-bold0">OUTFIT</span>
                    </div>     
                    <div></div>  
                    <div on:click={() => openModal("")} class="col-span-8 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute inset-0 flex items-center justify-center z-10 leading-4">Vita Outfit First Week: 1680 Bchips, Normal Price: 1980 Bchips</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-32 h-full ">
                            <img src="https://i.imgur.com/Ow6PIGU.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded-lg" />
                        </div>
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
                    <div>WEEK 1<br/>Jan 1 - 9</div>
                    <div>WEEK 2<br/>Jan 9 - 16</div>
                    <div>WEEK 3<br/>Jan 16 - 23</div>
                    <div>WEEK 4<br/>Jan 23 - 30</div>
                    <div>WEEK 5<br/>Jan 30 - Feb 6</div>
                    <div>WEEK 6<br/>Feb 6 - 13</div>
                    <div>WEEK 7<br/>Feb 13 - 20</div>
                    <div>WEEK 8<br/>Feb 20 - 27</div>
                    <div>WEEK 9<br/>Feb 27 - Mar 5</div>

                </div>



            <div class="relative grid grid-cols-10 gap-1 h-[54px] pe-1 overflow-x-clip">
                <div class="flex font-bold  text-zinc-800 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                     <span class="font-bold0">EVENT 1</span>
                </div> 
    
                    <div on:click={() => openModal("")} class="col-span-9 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Login Event. Free Miss Espionage stigma box.</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-40 h-full ">
                            <img src="https://i.imgur.com/N5YQKN2.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded" />
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
                        <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Free Lunar Vow</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-40 h-full ">
                            <img src="https://i.imgur.com/oShwLMy.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded" />
                        </div>
                    </div>   

            </div>

            <div class="relative grid grid-cols-10 gap-1 h-[54px] pe-1 overflow-x-clip">
                <div class="flex font-bold col-span-1  text-zinc-700 bg-white border-b-[2px] border-slate-300 items-center justify-center text-center leading-4">
                    <span class="absolute w-[30px] h-[4px] bg-pink-600 inline-block top-[-3px] left-0"></span>
                     <span class="font-bold0">EVENT 3</span>
                </div> 

                    <div on:click={() => openModal("")} class="col-span-9 rounded-lg will-change-transform transform transition-transform hover:scale-105 cursor-pointer relative my-0.5  bg-gray-100 text-black font-semibold text-center items-center justify-center border-2 border-pink-700">
                        <!-- Centered Text -->
                        <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Topup Event. Topup ~100 usd to get  up to 3 Thel or JD stamps and more</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-40 h-full ">
                            <img src="https://i.imgur.com/Qo7id7s.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded" />
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
                        <span class="absolute px-2.5 leading-4 inset-0 flex items-center justify-left">Banquet of Intrigue</span>
                        <!-- Image positioned on the right side -->
                        <div class="absolute right-0 top-1/2 transform -translate-y-1/2 w-40 h-full ">
                            <img src="https://i.imgur.com/YYwJBwM.png" alt="Lone Planetfarer" class="w-full h-full object-cover rounded" />
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
                <div class="col-span-1 px-4 py-2 mr-3 ">v8.6 WEEK</div>
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
                <BossCard image="/images/Bosses/Husk Mysticism.webp" date="Jan 2" weather="IMG" bosspage="/boss?imgbull" />
                <BossCard image="/images/Bosses/epernay.png" date="Jan 5" weather="Ice" bosspage="/boss?iceepernay" />
                </div>
                     
                    <div class="flex col-span-3 justify-center gap-1 ml-2">
                <BossCard image="/images/Bosses/Imgpig.webp" date="Jan 6" />
                <BossCard image="/images/Bosses/Sprout_of_Wishing_SSS.webp"/>
                <BossCard image="/images/Bosses/Assaka.webp"/>                
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