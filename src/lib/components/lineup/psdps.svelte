<script lang="ts">
    import Charred from '$lib/components/charpctred.svelte';

    // Define the data for main characters
    const mainCharacters = [

        { name: 'Vita', image: '/images/valkportrait/Vita Lone Planetfarer.png',  teampct: '100%',  speed: '' },
        { name: 'Badum', image: '/images/valkportrait/kiana badum.png',  teampct: '100%',  utility: 'Mobs',  speed: '' },
        { name: 'RS', image: '/images/valkportrait/dudu.png', teampct: '99%', utility: 'Shield',  speed: '' },
        { name: 'PAWS', image: '/images/valkportrait/paws.png',  teampct: '98%',  speed: '' },    
        { name: 'JD', image: '/images/valkportrait/Songque Jovial Deception.png', teampct: '98%', utility: 'SD',  speed: '' },
        { name: 'Sparkle', image: '/images/valkportrait/sparkle.png',  teampct: '97%', utility: 'CD',  speed: '' },
        { name: 'HoH', image: '/images/valkportrait/Elysia Herrscher of Human Ego.png', teampct: '93%', utility: 'Bow',  speed: '' },


    ];

    const asopchar = [
        { name: 'Teri', image: '/images/valkportrait/asop_teri.png', teampct: '100%' , speed: '' },
        { name: 'Kiana', image: '/images/valkportrait/elf_bunny.png',  teampct: '91%' ,speed: '' },
        { name: 'DS', image: '/images/valkportrait/asop_ds.png',   teampct: '90%' ,speed: '' }
    ];

    // Pass the index or name of the first character to the reusable component
    export let firstCharName: string = 'Vita'; // default to 'Vita'
    export let maindps: boolean = false;

    // Find the character with the matching name and use it as firstCharred
    let firstCharred = mainCharacters.find(char => char.name === firstCharName);

    // Remove firstCharred from mainCharacters to avoid repetition
    let filteredMainCharacters = mainCharacters.filter(char => char.name !== firstCharName);
</script>

<div class="mb-8 mt-8 border rounded-lg bg-linear-to-b from-teal-950 to-teal-900 shadow-lg shadow-base-100 overflow-hidden">
    <h3 class="text-xl font-semibold mb-2 text-center text-zinc-900 bg-slate-100 font-s">Peregrine Sword DPS</h3>

    <div class="flex flex-wrap px-2 pt-2 gap-2 gap-y-6 mb-4 justify-center">

        <!-- Leader Image -->
        <div class="relative w-20 h-20 sm:w-28 sm:h-28">
            <img src="/images/valkportrait/ps.png" alt="badum" class="w-full h-full object-cover">
            <span class="sm:badge-md badge badge-sm absolute top-0.5 left-0.5 text-white px-1 rounded-sm z-10 text-center">Leader</span>
        </div>

        <!-- Conditional Plus Icon -->

            <img src="/images/valkportrait/Plus.png" alt="Plus Icon" class="w-[20px] object-contain">


        <!-- First Charred component (can be swapped) -->
        {#if firstCharred}
            <Charred name={firstCharred.name} image={firstCharred.image} teampct={firstCharred.teampct} utility={firstCharred.utility} speed={firstCharred.speed} />
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

    <details class="group rounded-md my-2 overflow-hidden">
        <summary class="text-base sm:text-md font-medium text-center p-1 sm:p-2 cursor-pointer hover:bg-linear-to-r from-sky-500/0 to-sky-500/0 via-slate-900 hover:transition-colors hover:duration-200">
            Details
        </summary>
        <div class="py-3 px-4">

            <p class="text-sm sm:text-base mb-4"><b>Lone Planetfarer</b><br/> - Provides Physical Breach state. When PS has Breach state, she gains Bleed DMG buff, which is a rare multiplier even in Part 2. This contributes a significant boost for PS DMG output.
                <br/>
                - Vita can use Susannah T Aladdin MB stigma. This improves Sushang's self dmg output, but supports' personal dmg are reduced.
            </p>          
    </div>
    </details>
</div>
