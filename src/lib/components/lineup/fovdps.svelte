<script lang="ts">
    import Charred from '$lib/components/charpctred.svelte';

    // Define the data for main characters
    const mainCharacters = [
        { name: 'HoTr', image: '/images/valkportrait/Bronya Herrscher of Truth.png', speed: '' },
        { name: 'Sparkle', image: '/images/valkportrait/sparkle.png', teampct: '100%', speed: '' },
        { name: 'CN', image: '/images/valkportrait/Chrono Navi.png', teampct: '88%', speed: '' }
    ];

    const asopchar = [
        { name: 'Kiana', image: '/images/valkportrait/elf_kiana.png', speed: '' }
    ];

    // Pass the index or name of the first character to the reusable component
    export let firstCharName: string = 'HoTr'; // default to 'Vita'


    // Find the character with the matching name and use it as firstCharred
    let firstCharred = mainCharacters.find(char => char.name === firstCharName);

    // Remove firstCharred from mainCharacters to avoid repetition
    let filteredMainCharacters = mainCharacters.filter(char => char.name !== firstCharName);
</script>

<div class="mb-8 mt-8 border rounded-lg bg-linear-to-b from-red-950 to-red-900 shadow-lg shadow-base-100 overflow-hidden">
    <h3 class="text-xl font-semibold mb-2 text-center text-zinc-900 bg-slate-100 font-s">Fenghuang of Vicissitude DPS</h3>

    <div class="flex flex-wrap px-2 pt-2 gap-2 gap-y-6 mb-4 justify-center">

        <!-- Leader Image -->
        <div class="relative w-20 h-20 sm:w-28 sm:h-28">
            <img src="/images/valkportrait/Fu Hua Fenghuang of Vicissitude.png" alt="FoV" class="w-full h-full object-cover">
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
                <li class="text-sm sm:text-base mb-3">Sparkle provides tons of buffs, and allows FoV to use <b>TWO ULTIMATES IN ONE ROTATION.</b> At S0 Syn1, Sparkle provides around 13% damage improvement for FoV (which is significant in HI3). For comparison, this is similar to Cosmic Expression replacing Eden for Lunar Vow team.
                Also Sparkle provides ~2s faster rotation than Chrono Navi. </li>
                    <li class="text-sm sm:text-base mb-3">Herrscher of Truth is mandatory for Sparkle support because: All Sparkle's big buffs are triggered by Ultimate skill, and it has a long cd. By default, you can only use this once every two rotations. Sparkle only gains ult cd reduction if she casts her Ult while having Elemental Breach state. In Fire teams, Ele Breach state can only be provided by Herrscher of Truth. (Or Azure Empyrea but she's outdated.)</li> 

                <li class="text-sm sm:text-base mb-3">Herrscher of Truth provides Elemental Breach, strong buffs and more.</li>
                <li class="text-sm sm:text-base mb-3">Chrono Navi provides buffs, ignite, sp regen and more.</li>
            </p>
        </div>
    </details>

  
</div>
