<script lang="ts">
    import Charred from '$lib/components/charpctred.svelte';

    // Define the data for main characters
    const mainCharacters = [
        { name: 'HoFi', image: "/images/valkportrait/Kiana Herrscher of Finality.png", teampct: '100%', speed: '' },
        { name: 'HoTr', image: '/images/valkportrait/Bronya Herrscher of Truth.png', teampct: '100%', speed: '' },
        { name: 'Eden', image: '/images/valkportrait/Eden Golden Diva.png', teampct: '75%', speed: 'Fast' },
        { name: 'LV', image: '/images/valkportrait/Theresa Lunar Vow.png', teampct: '80%', speed: '' },
        { name: 'Simp', image: "/images/valkportrait/Theresa Schicksal's Imperative.png", teampct: '80%', speed: '' },
    ];

    const asopchar = [
    ];

    // Pass the index or name of the first character to the reusable component
    export let firstCharName: string = 'HoFi'; // default to 'Vita'

    // Find the character with the matching name and use it as firstCharred
    let firstCharred = mainCharacters.find(char => char.name === firstCharName);

    // Remove firstCharred from mainCharacters to avoid repetition
    let filteredMainCharacters = mainCharacters.filter(char => char.name !== firstCharName && char.name);


</script>

<div class="mb-8 mt-8 border rounded-lg bg-linear-to-b from-violet-950 to-violet-900 shadow-lg shadow-base-100 overflow-hidden">
    <h3 class="text-xl font-semibold mb-2 text-center text-zinc-900 bg-slate-100 font-s">Herrscher of Origin DPS</h3>

    <div class="flex flex-wrap px-2 pt-2 gap-2 gap-y-6 mb-4 justify-center">

        <!-- Leader Image -->
        <div class="relative w-20 h-20 sm:w-28 sm:h-28">
            <img src="/images/valkportrait/Mei Herrscher of Origin.png" alt="LV" class="w-full h-full object-cover">
            <span class="sm:badge-md badge badge-sm absolute top-0.5 left-0.5 text-white px-1 rounded-sm z-10 text-center">Leader</span>
        </div>

        <!-- Conditional Plus Icon -->

            <img src="/images/valkportrait/Plus.png" alt="Plus Icon" class="w-[20px] object-contain">


        <!-- First Charred component (can be swapped) -->
        {#if firstCharred}
            <Charred name={firstCharred.name} image={firstCharred.image} teampct={firstCharred.teampct} speed={firstCharred.speed} />
        {/if}


        <!-- Plus Icon shown only if maindps is true -->

            <img src="/images/valkportrait/Plus.png" alt="Plus Icon" class="w-[20px] object-contain">


        <!-- Main Characters Loop (excluding the first character) -->
        {#each filteredMainCharacters as char}
            <Charred name={char.name} image={char.image} teampct={char.teampct} speed={char.speed} />
        {/each}


    </div>

    <details class="group rounded-md my-2 overflow-hidden">
        <summary class="text-base sm:text-md font-medium text-center p-1 sm:p-2 cursor-pointer hover:bg-linear-to-r from-sky-500/0 to-sky-500/0 via-slate-900 hover:transition-colors hover:duration-200">
            Details
        </summary>
        <div class="py-3 px-4">
            <p class="text-sm sm:text-base">
                <li class="text-sm sm:text-base mb-2"><b>Requirement:</b> This lineup requires Herrscher of Finality with the new Divine Key and Iskandar Stigma. No, you cannot put Iskandar on another valk. No, this lineup does not work if HoFi only has Iskandar but not the new Divine Key.</li>
                <li class="text-sm sm:text-base mb-2"> <b>HoTr Support:</b> In this lineup, HoFi also contributes dmg, and Trio Joint Bursting mechanic is still being utilized.</li>
                <li class="text-sm sm:text-base mb-2"> <b>Other Supports:</b>  This lineup relies mostly on HoOrigin's own damage, and HoOrigin's default ult is used.</li>
                <li class="text-sm sm:text-base mb-2" > <b>Which One Is Better:</b>   Based on the data we have so far - For most Abyss bosses, Trio team is better. For Husk Mysticism, HoO uses HoFi + Golden Diva support. In Arena, any support works.</li>

            </p>
        </div>
    </details>
</div>
