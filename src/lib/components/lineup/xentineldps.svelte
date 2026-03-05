<script lang="ts">
    import Charred from '$lib/components/charpctred.svelte';

    // Define the data for main characters
    const mainCharacters = [

        { name: 'BFD', image: '/images/valkportrait/scoralie.png',  teampct: '100%'},
        { name: 'Badum', image: '/images/valkportrait/kiana badum.png',  teampct: '100%' },

        { name: 'HLE', image: '/images/valkportrait/Elysia Hi Love Elf.png',  teampct: '99%' },


        { name: 'LV', image: '/images/valkportrait/Theresa Lunar Vow.png',  teampct: ''},

        { name: 'PAWS', image: '/images/valkportrait/paws.png',  teampct: ''},
        { name: 'PS', image: '/images/valkportrait/ps.png',  teampct: '' },
        { name: 'HoH', image: '/images/valkportrait/Elysia Herrscher of Human Ego.png',  teampct: '' },
        { name: 'RS', image: '/images/valkportrait/dudu.png',  teampct: ''},
        { name: 'HoRB', image: '/images/valkportrait/Seele Herrscher of Rebirth.png',  teampct: ''},

    ];

    const asopchar = [
        { name: 'Sera', image: '/images/valkportrait/asop_chenxue.png' ,  teampct: '100%'  },
        { name: 'DS', image: '/images/valkportrait/asop_ds.png', },

    ];

    // Pass the index or name of the first character to the reusable component
    export let firstCharName: string = 'BFD'; // default to 'Vita'
    export let maindps: boolean = false;

    // Find the character with the matching name and use it as firstCharred
    let firstCharred = mainCharacters.find(char => char.name === firstCharName);

    // Remove firstCharred from mainCharacters to avoid repetition
    let filteredMainCharacters = mainCharacters.filter(char => char.name !== firstCharName);
</script>

<div class="mb-8 mt-8 border rounded-lg bg-linear-to-b from-purple-950 to-purple-900 shadow-lg shadow-base-100 overflow-hidden">
    <h3 class="text-xl font-semibold mb-2 text-center text-zinc-900 bg-slate-100 font-s">Xentinel DPS</h3>

    <div class="flex flex-wrap px-2 pt-2 gap-2 gap-y-6 mb-4 justify-center">

        <!-- Leader Image -->
        <div class="relative w-20 h-20 sm:w-28 sm:h-28">
            <img src="/images/valkportrait/Mei Xentinel.png" alt="badum" class="w-full h-full object-cover">
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
                Xentinel's best teammates are usually BFD, Badum and HLE. Other supports are also optimal depending on the boss - for example, Peregerine Sword support against Dark Jixuanyuan for bleed and type counter advantage.
            </p>

            <p class="text-sm sm:text-base mb-4"><b>Badum</b><br/> Xentinel gains 12% (S) / 20% (SS) Phy Breach buff when Kiana is in the team. If Xentinel already has a Breach state buff, then this buff becomes Physical DMG +20%


            </p> 

            <p class="text-sm sm:text-base mb-4"><b>Elysia</b><br/> Enemies take 15% more TDM when Elysia is in the team.
            </p> 

            <p class="text-sm sm:text-base mb-4"><b>???</b><br/> Xentinel has a locked buff that may require a future character.
            </p> 
    </div>
    </details>
</div>
