<script lang="ts">
    import Charred from '$lib/components/charpctred.svelte';

    const mainCharacters = [
        { name: 'WoP', image: '/images/valkportrait/Seele Wings of Panacea.png', teampct: '#1', speed: '' },
        { name: 'Vita', image: '/images/valkportrait/Vita Lone Planetfarer.png', teampct: '#2', speed: 'Slow' },
        { name: 'HORB', image: '/images/valkportrait/Seele Herrscher of Rebirth.png', teampct: '100%', speed: '' },
        { name: 'Badum', image: '/images/valkportrait/kiana badum.png', teampct: '97%', speed: '' },
        { name: 'Kiana', image: '/images/valkportrait/Kiana Herrscher of Finality.png', teampct: '97%', speed: '' },
        { name: 'Simp', image: "/images/valkportrait/Theresa Schicksal's Imperative.png", teampct: '95%', speed: '' },
        { name: 'Thelema', image: '/images/valkportrait/Thelema Mad Pleasure.png', teampct: '93%', speed: '' },
        { name: 'HLE', image: '/images/valkportrait/Elysia Hi Love Elf.png', teampct: '91%', speed: '' },
        { name: 'Lantern', image: '/images/valkportrait/Lantern Lone Destruction.png', teampct: '87%', speed: '' },
        { name: 'Silverwing', image: '/images/valkportrait/Bronya Silverwing N-EX.png', teampct: '', speed: '' },
        { name: 'Sparkle', image: '/images/valkportrait/sparkle.png', teampct: '', speed: '' },
        { name: 'ACoralie', image: '/images/valkportrait/Coralie Valkyrie Blastmetal.png', teampct: '', speed: 'Slow' },
        { name: 'Helia', image: '/images/valkportrait/Helia Valkyrie Boltstorm.png', teampct: '', speed: 'Slow' },

    ];

    const asopchar = [
        { name: 'Senadina', image: '/images/valkportrait/asop_senadina.png', teampct: '#1', speed: '' },
        { name: 'Youyun', image: '/images/valkportrait/asop_youyun.png', teampct: '#2', speed: '' },
        { name: 'Songque', image: '/images/valkportrait/asop_songque.png', teampct: '#3', speed: '' },
        { name: 'Sera', image: '/images/valkportrait/asop_sera.png', teampct: '#4', speed: '' },
        { name: 'Kiana', image: '/images/valkportrait/elf_kiana.png', teampct: '#5', speed: 'Slow' },
        { name: 'DS', image: '/images/valkportrait/asop_ds.png', teampct: '#6', speed: 'Slow' }
    ];

    // Pass the index or name of the first character to the reusable component
    export let firstCharName: string = 'WoP'; // default to 'Vita'
    export let secondCharName: string = 'Vita'; // default to 'Vita'

    export let maindps: boolean = false;

    // Find the character with the matching name and use it as firstCharred
    let firstCharred = mainCharacters.find(char => char.name === firstCharName);
    let secondCharred = mainCharacters.find(char => char.name === secondCharName);

    // Remove firstCharred from mainCharacters to avoid repetition
let filteredMainCharacters = mainCharacters.filter(
  char => char.name !== 'WoP' && char.name !== 'Vita' 
);
</script>

<div class="mb-8 mt-8 border rounded-lg bg-linear-to-b from-orange-950 to-orange-900 shadow-lg shadow-base-100 overflow-hidden">
    <h3 class="text-xl font-semibold mb-2 text-center text-zinc-900 bg-slate-100">Deepspace Anchor DPS</h3>

     <div class="flex flex-wrap px-2 pt-2 gap-2 gap-y-6 mb-4 justify-center">

        <!-- Leader Image -->
        <div class="relative w-20 h-20 sm:w-28 sm:h-28">
            <img src="/images/valkportrait/Senadina Deepspace Anchor.png" alt="badum" class="w-full h-full object-cover">
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
            <Charred name={char.name} image={char.image} utility={char.utility} teampct={char.teampct} speed={char.speed} />
        {/each}

        <img src="/images/valkportrait/Plus.png" alt="Plus Icon" class="w-[20px] object-contain">

        <!-- Support Characters Loop -->
        {#each asopchar as char}
            <Charred name={char.name} image={char.image} teampct={char.teampct} speed={char.speed} />
        {/each}
    </div>

    <details class="group rounded-md my-2 overflow-hidden transition duration-200">
        <summary class="text-base sm:text-md font-medium text-center p-1 sm:p-2 cursor-pointer hover:bg-linear-to-r from-sky-500/0 to-sky-500/0 via-slate-900 hover:transition-colors hover:duration-200">
            Details
        </summary>
        <div class="py-3 px-4">

            <p class="text-sm sm:text-base mb-4">
                Best team options for Sena <br/>
                - Standard team: Breach Support (WoP / Vita) + another support <br/>
                - Mono SD team: WoP + Badum / Hi Love Elf
            </p>

            <p class="text-sm sm:text-base mb-4">
                <b>Only Need 9 Reso Triggers</b><br/> Unlike other World Star DPS, you only need supports to trigger Sena's reso marks 9 times. This has led to some weird team comps that exclude Vita, since Vita cannot switch out during Stellar Outburst.
            </p> 

            <p class="text-sm sm:text-base mb-4">
                <b>Fast Reso Trigger</b><br/> HoFI and Badum can trigger resonance marks very fast.
            </p> 

            <p class="text-sm sm:text-base mb-4">
                <b>Herrscher of Rebirth</b><br/> During AR Charging, HoRB has near zero field time. She's basically HoFi but can contribute damage and can consume Stellar Drain in the back.
            </p> 


            <p class="text-sm sm:text-base mb-4">
                <b>Songque AstralOp</b><br/> When using Songque AstralOp, if you have Sena support, gain initial AR +25.
            </p> 
        </div>
    </details>
</div>
