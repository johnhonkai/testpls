<script lang="ts">
    import Charred from '$lib/components/charpctred.svelte';

    // Define the data for main characters
    const mainCharacters = [

        { name: 'HoRB', image: '/images/valkportrait/Seele%20Herrscher%20of%20Rebirth.png', teampct: '#1', speed: '' },
        { name: 'HLE', image: '/images/valkportrait/Elysia Hi Love Elf.png', teampct: '#1', speed: 'Fast' },
        { name: 'Vita', image: '/images/valkportrait/Vita Lone Planetfarer.png', teampct: '#1',  speed: 'Slow' },
        { name: 'Xentinel', image: '/images/valkportrait/Mei Xentinel.png', },

        { name: 'Badum', image: '/images/valkportrait/kiana badum.png', speed: '' },   
        { name: 'Sparkle', image: '/images/valkportrait/sparkle.png', speed: '' },
        { name: 'Kiana', image: '/images/valkportrait/Kiana Herrscher of Finality.png', speed: '' },
        { name: 'Simp', image: "/images/valkportrait/Theresa Schicksal's Imperative.png", speed: '' },

        { name: 'Lantern', image: '/images/valkportrait/Lantern Lone Destruction.png',   speed: '' },
        { name: 'Thelema', image: '/images/valkportrait/Thelema Mad Pleasure.png',  speed: '' },
        { name: 'Sena', image: '/images/valkportrait/Senadina Deepspace Anchor.png',  speed: '' },
        { name: 'Coralie', image: '/images/valkportrait/Coralie Valkyrie Blastmetal.png', },
        { name: 'Helia', image: '/images/valkportrait/Helia Valkyrie Boltstorm.png',  },

    ];

    const asopchar = [

        { name: 'YouyunSS', image: '/images/valkportrait/asop_youyun_ss.png', teampct: '#1', speed: 'Fast'},
        { name: 'YouyunS', image: '/images/valkportrait/asop_youyun_s.png', teampct: '#2', speed: 'Slow'},

        { name: 'Songque', image: '/images/valkportrait/asop_songque.png', speed: 'Poor'  },
        { name: 'DS', image: '/images/valkportrait/asop_ds.png', speed: 'Damn' },

    ];

    // Pass the index or name of the first character to the reusable component
    export let firstCharName: string = 'HoRB'; // default to 'Vita'
    export let maindps: boolean = false;

    // Find the character with the matching name and use it as firstCharred
    let firstCharred = mainCharacters.find(char => char.name === firstCharName);

    // Remove firstCharred from mainCharacters to avoid repetition
    let filteredMainCharacters = mainCharacters.filter(char => char.name !== firstCharName);
</script>

<div class="mb-8 mt-8 border rounded-lg bg-linear-to-b from-blue-950 to-blue-900 shadow-lg shadow-base-100 overflow-hidden">
    <h3 class="text-xl font-semibold mb-2 text-center text-zinc-900 bg-slate-100 font-s">Silverwing DLC DPS</h3>

    <div class="flex flex-wrap px-2 pt-2 gap-2 gap-y-6 mb-4 justify-center">

        <!-- Leader Image -->
        <div class="relative w-20 h-20 sm:w-28 sm:h-28">
            <img src="/images/valkportrait/Bronya Silverwing N-EX.png" alt="badum" class="w-full h-full object-cover">
            <span class="sm:badge-md badge badge-sm absolute top-0.5 left-0.5 text-white px-1 rounded-sm z-10 text-center">Leader</span>
        </div>

        <!-- Conditional Plus Icon -->

            <img src="/images/valkportrait/Plus.png" alt="Plus Icon" class="w-[20px] object-contain">


        <!-- First Charred component (can be swapped) -->
        {#if firstCharred}
            <Charred name={firstCharred.name} image={firstCharred.image} teampct={firstCharred.teampct} utility={firstCharred.utility} speed={firstCharred.speed} />
        {/if}



        <!-- Main Characters Loop (excluding the first character) -->
        {#each filteredMainCharacters as char}
            <Charred name={char.name} image={char.image} utility={char.utility} teampct={char.teampct} speed={char.speed} />
        {/each}

        <img src="/images/valkportrait/Plus.png" alt="Plus Icon" class="w-[20px] object-contain">

        <!-- Support Characters Loop -->
        {#each asopchar as char}
            <Charred name={char.name} image={char.image} teampct={char.teampct} speed={char.speed} />
        {/each}
    </div>

    <details class="group rounded-md my-2 overflow-hidden">
        <summary class="text-base sm:text-md font-medium text-center p-1 sm:p-2 cursor-pointer hover:bg-linear-to-r from-sky-500/0 to-sky-500/0 via-slate-900 hover:transition-colors hover:duration-200">
            Details
        </summary>
        <div class="py-3 px-4">
             <p class="text-sm sm:text-base mb-4">
                So far, SW best team members are either HoRB, Vita or HLE. In cases like Herrscher of Corruption boss where SW does not trigger teammates' Resonance, even BFD Coralie can be used over Vita.
            </p>

            <p class="text-sm sm:text-base mb-4"><b>SS-rank Youyun</b><br/> Youyun is a massive buff for Silverwing (plus she herself deals big dmg and triggers extra Resonance). At SS-rank, Youyun gives enough initial AR to let you instantly get Surplus at the start of battle.

            </p>  

            <p class="text-sm sm:text-base mb-4"><b>Without SS-rank Youyun</b><br/> Unfortunately you don't have enough initial AR and Stellar Drain to quickly activate Surplus. Use Vita support, since she gives the most AR regen.

            </p>  
    </div>
    </details>
</div>
