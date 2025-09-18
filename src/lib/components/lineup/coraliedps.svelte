<script lang="ts">
    import Charred from '$lib/components/charpctred.svelte';

    // Define the data for main characters
    const mainCharacters = [
        { name: 'Paws', image: '/images/valkportrait/paws.png',  teampct: '100%', },
        { name: 'Vita', image: '/images/valkportrait/Vita Lone Planetfarer.png', teampct: '100%',   },
        { name: 'Hofi', image: '/images/valkportrait/Kiana Herrscher of Finality.png', teampct: '93%',  },
        { name: 'Coralie', image: '/images/valkportrait/Coralie Valkyrie Blastmetal.png', teampct: '90%'  },

    ];

    const asopchar = [
        { name: 'Chenxue', image: '/images/valkportrait/asop_chenxue.png' ,  teampct: '100%',  },
        { name: 'Theresa', image: '/images/valkportrait/asop_teri.png',  teampct: '94%'  },
        { name: 'Kiana', image: '/images/valkportrait/elf_kiana.png' ,  teampct: '94%' , },
        { name: 'Songque', image: '/images/valkportrait/asop_songque.png' ,  teampct: '92%' , },        
        { name: 'DS', image: '/images/valkportrait/asop_ds.png',  teampct: '87%'   },

    ];

    // Pass the index or name of the first character to the reusable component
    export let firstCharName: string = 'PS'; // default to 'Vita'
    export let maindps: boolean = false;

    // Find the character with the matching name and use it as firstCharred
    let firstCharred = mainCharacters.find(char => char.name === firstCharName);

    // Remove firstCharred from mainCharacters to avoid repetition
    let filteredMainCharacters = mainCharacters.filter(char => char.name !== firstCharName);
</script>

<div class="mb-8 mt-8 border rounded-lg bg-linear-to-b from-red-950 to-red-900 shadow-lg shadow-base-100 overflow-hidden">
    <h3 class="text-xl font-semibold mb-2 text-center text-zinc-900 bg-slate-100 font-s">Behold! Fate-Defying Dragon DPS</h3>

    <div class="flex flex-wrap px-2 pt-2 gap-2 gap-y-6 mb-4 justify-center">

        <!-- Leader Image -->
        <div class="relative w-20 h-20 sm:w-28 sm:h-28">
            <img src="/images/valkportrait/scoralie.png" alt="badum" class="w-full h-full object-cover">
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
                BFD best teammates are PAWS and Vita. 
            </p>

            <p class="text-sm sm:text-base mb-4"><b>PAWS</b><br/> - Provides strong buffs. The buffs she provides is better than having 2 Rite of Oblivion supports (for most cases).
                <br/>
                - Can quickly consume Stellar Drain through Ultimate.

            </p>  


            <p class="text-sm sm:text-base mb-4"><b>No PAWS?</b><br/> If you don't have PAWS, then you want two Rite of Oblivion characters as support. Her leader skill is strong, but requires all characters in the team to be Rite of Oblivion characters to activate / reach max buffs.

            </p>      

            <p class="text-sm sm:text-base mb-4"><b>Vita</b><br/> Provides Elemental Breach state and strong buffs.

            </p>  

            
            <p class="text-sm sm:text-base mb-4"><b>Herrscher of Finality</b><br/> In some cases where the battle is short, HoFi support may be used over Vita for higher score, since you just need to use weapon skill at the start.


            </p>  
    </div>
    </details>
</div>
