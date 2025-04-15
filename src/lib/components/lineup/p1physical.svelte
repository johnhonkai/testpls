<script lang="ts">
    import Charred from '$lib/components/charpctred.svelte';

    // Define the data for main characters
    const mainCharacters = [
        { name: 'HoRB', image: '/images/valkportrait/Seele Herrscher of Rebirth.png', teampct: '100%', speed: '' },
        { name: 'HoS', image: '/images/valkportrait/Fu Hua Herrscher of Sentience.png', teampct: '85%', speed: '' },
        { name: 'RS', image: '/images/valkportrait/dudu.png', teampct: '100%', speed: '' },
        { name: 'Prom', image: '/images/valkportrait/Prometheus Terminal Aide.png', teampct: '76%', speed: '' }
    ];

    const asopchar = [
        { name: 'Bunny', image: '/images/valkportrait/elf_bunny.png', speed: '' }
    ];

    // Pass the index or name of the first character to the reusable component
    export let firstCharName: string = 'HoRB'; // default to 'Vita'
    export let secondCharName: string = 'HoS';

    // Find the character with the matching name and use it as firstCharred
    let firstCharred = mainCharacters.find(char => char.name === firstCharName);
    let secondCharred = mainCharacters.find(char => char.name === secondCharName);

    // Remove firstCharred from mainCharacters to avoid repetition
    let filteredMainCharacters = mainCharacters.filter(char => char.name !== firstCharName && char.name !== secondCharName);


</script>

<div class="mb-8 mt-8 border rounded-lg bg-linear-to-b from-amber-950 to-amber-900 shadow-lg shadow-base-100 overflow-hidden">
    <h3 class="text-xl font-semibold mb-2 text-center text-zinc-900 bg-slate-100 font-s">Part 1 Physical DPS</h3>

    <div class="flex flex-wrap px-2 pt-2 gap-2 gap-y-6 mb-4 justify-center">

        <!-- Leader Image -->
        <div class="relative w-20 h-20 sm:w-28 sm:h-28">
            <img src="/images/valkportrait/p1physical.png" alt="LV" class="w-full h-full object-cover">
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

        <img src="/images/valkportrait/Plus.png" alt="Plus Icon" class="w-[20px] object-contain">


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
            <p class="text-sm sm:text-base">
                <li class="text-sm sm:text-base mb-3">Herrscher of Rebirth: Provides impair (DEF -75%), increases Crit Rate to 100%, Crit DMG, sp regen and more</li>
                <li class="text-sm sm:text-base mb-3">Herrscher of Sentience: Provides impair (DEF -75%)</li>
                <li class="text-sm sm:text-base mb-3">Reign Solaris: Provides ~30% more damage than Terminal Aide. Also provides shieldbreak and stun trauma.</li>
                <li class="text-sm sm:text-base mb-3">Terminal Aide: Provides huge dmg buff, shieldbreak and stun trauma.</li>
            </p>
        </div>
    </details>
</div>
