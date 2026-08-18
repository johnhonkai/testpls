<script lang="ts">
    import Charred from '$lib/components/charpctred.svelte';

    // Define the data for main characters
    const mainCharacters = [
        { name: 'WoP', image: '/images/valkportrait/Seele Wings of Panacea.png', teampct: '#1', speed: '' },
        { name: 'Vita', image: '/images/valkportrait/Vita Lone Planetfarer.png', teampct: '#2', speed: 'Slow' },

        { name: 'Sparkle', image: '/images/valkportrait/sparkle.png', teampct: '100%', speed: '' },
        { name: 'Thelema', image: '/images/valkportrait/Thelema Mad Pleasure.png', teampct: '100%', speed: '' },
        { name: 'HORB', image: '/images/valkportrait/Seele Herrscher of Rebirth.png', teampct: '98.7%', speed: '' },
        { name: 'Vita', image: '/images/valkportrait/Vita Lone Planetfarer.png', teampct: '98%', speed: '' },
        { name: 'Kiana', image: '/images/valkportrait/Kiana Herrscher of Finality.png', teampct: '98%', speed: '' },
        { name: 'Badum', image: '/images/valkportrait/kiana badum.png', teampct: '97%', speed: '' },
        { name: 'HLE', image: '/images/valkportrait/Elysia Hi Love Elf.png', teampct: '95%', speed: '' },
        { name: 'Lantern', image: '/images/valkportrait/Lantern Lone Destruction.png', teampct: '88%', speed: '' },
        { name: 'Sena', image: '/images/valkportrait/Senadina Deepspace Anchor.png', teampct: '82%', speed: '' },
        { name: 'Xentinel', image: '/images/valkportrait/Mei Xentinel.png', },
        { name: 'SW', image: '/images/valkportrait/Bronya Silverwing N-EX.png'},


        { name: 'Coralie', image: '/images/valkportrait/Coralie Valkyrie Blastmetal.png', teampct: '76%', speed: 'Slow' },
        { name: 'Helia', image: '/images/valkportrait/Helia Valkyrie Boltstorm.png', teampct: '76%', speed: 'Slow' },


    ];

    const asopchar = [
        { name: 'Youyun', image: '/images/valkportrait/asop_youyun.png', teampct: '100%', speed: '' },
        { name: 'Songque', image: '/images/valkportrait/asop_songque.png', teampct: '94%', speed: '' },
        { name: 'Sera', image: '/images/valkportrait/asop_sera.png', teampct: '88%', speed: '' },
        { name: 'Kiana', image: '/images/valkportrait/elf_kiana.png', teampct: '88%', speed: 'Slow' },
        { name: 'DS', image: '/images/valkportrait/asop_ds.png', teampct: '83%', speed: 'Slow' }
    ];

 // Pass the index or name of the first character to the reusable component
    export let firstCharName: string = 'WoP'; // default to 'Vita'
    export let secondCharName: string = 'Vita'; // default to 'Vita'

    export let maindps: boolean = false;

    // Find the character with the matching name and use it as firstCharred
    let firstCharred = mainCharacters.find(char => char.name === firstCharName);
    let secondCharred = mainCharacters.find(char => char.name === secondCharName);;

    // Remove firstCharred from mainCharacters to avoid repetition
let filteredMainCharacters = mainCharacters.filter(
  char => char.name !== 'Vita' && char.name !== 'WoP'
);

</script>

<div class="mb-8 mt-8 border rounded-lg bg-linear-to-b from-purple-950 to-purple-900 shadow-lg shadow-base-100 overflow-hidden">
    <h3 class="text-xl font-semibold mb-2 text-center text-zinc-900 bg-slate-100 font-s">Schicksal's Imperative DPS</h3>

    <div class="flex flex-wrap px-2 pt-2 gap-2 gap-y-6 mb-4 justify-center">

        <!-- Leader Image -->
        <div class="relative w-20 h-20 sm:w-28 sm:h-28">
            <img src="/images/valkportrait/Theresa Schicksal's Imperative.png" alt="SIMP" class="w-full h-full object-cover">
            <span class="sm:badge-md badge badge-sm absolute top-0.5 left-0.5 text-white px-1 rounded-sm z-10 text-center">Leader</span>
        </div>

        <!-- Conditional Plus Icon -->

            <img src="/images/valkportrait/Plus.png" alt="Plus Icon" class="w-[20px] object-contain">


        <!-- First Charred component (can be swapped) -->
        {#if firstCharred}
            <Charred name={firstCharred.name} image={firstCharred.image} teampct={firstCharred.teampct} utility={firstCharred.utility} speed={firstCharred.speed} />
        {/if}

        {#if secondCharred}
            <Charred name={secondCharred.name} image={secondCharred.image} teampct={secondCharred.teampct} utility={secondCharred.utility} speed={secondCharred.speed} />
        {/if}


        <!-- Plus Icon shown only if maindps is true -->
        {#if !maindps}
            <img src="/images/valkportrait/Plus.png" alt="Plus Icon" class="w-[20px] object-contain">
        {/if}


        <!-- Main Characters Loop (excluding the first character) -->
        {#each filteredMainCharacters as char}
            <Charred name={char.name} image={char.image} teampct={char.teampct} speed={char.speed} />
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

            <p class="text-sm sm:text-base mb-4"><b>Team options</b>
                <br/> - Standard Team: Breach support (WoP or Vita) + Another support.
                <br/> - Mono Quantum: WoP + Sparkle

            </p>  

            <p class="text-sm sm:text-base mb-4">
                <b>Fast Reso Trigger</b><br/> HoFI and Badum can trigger resonance marks very fast.
            </p> 

            <p class="text-sm sm:text-base mb-4">
                <b>Herrscher of Rebirth</b><br/> During AR Charging, HoRB has near zero field time. She's basically HoFi but can contribute damage and can consume Stellar Drain in the back.
            </p> 


        </div>
    </details>
</div>
