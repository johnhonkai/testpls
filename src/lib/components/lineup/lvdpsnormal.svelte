<script lang="ts">
    import Charred from '$lib/components/charpctred.svelte';

    // Define the data for main characters
    const mainCharacters = [
        { name: 'Simp', image: "/images/valkportrait/Theresa Schicksal's Imperative.png", teampct: '100%', speed: '' },
        { name: 'HoTr', image: '/images/valkportrait/Bronya Herrscher of Truth.png', teampct: 'TBA%', speed: '' },
        { name: 'CE', image: '/images/valkportrait/Griseo Cosmic Expression.png', teampct: '100%', speed: '' },
        { name: 'Eden', image: '/images/valkportrait/Eden Golden Diva.png', teampct: '90%', speed: '' }
    ];

    const asopchar = [
        { name: 'Kiana', image: '/images/valkportrait/elf_kiana.png', teampct: '100%', speed: '' }
    ];

    // Pass the index or name of the first character to the reusable component
    export let firstCharName: string = 'Simp'; // default to 'Vita'
    export let secondCharName: string = 'HoTr';

    // Find the character with the matching name and use it as firstCharred
    let firstCharred = mainCharacters.find(char => char.name === firstCharName);
    let secondCharred = mainCharacters.find(char => char.name === secondCharName);

    // Remove firstCharred from mainCharacters to avoid repetition
    let filteredMainCharacters = mainCharacters.filter(char => char.name !== firstCharName && char.name !== secondCharName);


</script>

<div class="mb-8 mt-8 border rounded-lg bg-gradient-to-b from-red-950 to-red-900 shadow-lg shadow-base-100 overflow-hidden">
    <h3 class="text-xl font-semibold mb-2 text-center text-zinc-900 bg-slate-100 font-s">Lunar Vow DPS (Normal)</h3>

    <div class="flex flex-wrap px-2 pt-2 gap-2 gap-y-6 mb-4 justify-center">

        <!-- Leader Image -->
        <div class="relative w-20 h-20 sm:w-28 sm:h-28">
            <img src="/images/valkportrait/Theresa Lunar Vow.png" alt="LV" class="w-full h-full object-cover">
            <span class="sm:badge-md badge badge-sm absolute top-0.5 left-0.5 text-white px-1 rounded z-10 text-center">Leader</span>
        </div>

        <!-- Conditional Plus Icon -->

            <img src="/images/valkportrait/Plus.png" alt="Plus Icon" class="w-[20px] object-contain">


        <!-- First Charred component (can be swapped) -->
        {#if firstCharred}
            <Charred name={firstCharred.name} image={firstCharred.image} teampct={firstCharred.teampct} speed={firstCharred.speed} />
        {/if}

        {#if secondCharred}
        <Charred name={secondCharred.name} image={secondCharred.image} teampct={secondCharred.teampct} speed={secondCharred.speed} />
        {/if}

        <!-- Plus Icon shown only if maindps is true -->

            <img src="/images/valkportrait/Plus.png" alt="Plus Icon" class="w-[20px] object-contain">


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
        <summary class="text-base sm:text-md font-medium text-center p-1 sm:p-2 cursor-pointer hover:bg-gradient-to-r from-sky-500/0 to-sky-500/0 via-slate-900 hover:transition-colors hover:duration-200">
            Details
        </summary>
        <div class="py-3 px-4">
            <p class="text-sm sm:text-base">
                <li class="text-sm sm:text-base">In this lineup, you are mostly relying on LV's own Lightning/Bleed DMG, like a normal Part 1 team.</li>
                <li class="text-sm sm:text-base">This is better (than Luna x SIMP double dps) on bosses like Bleed Tribunal and Bleed Vill-V.</li>
            </p>
        </div>
    </details>
</div>
