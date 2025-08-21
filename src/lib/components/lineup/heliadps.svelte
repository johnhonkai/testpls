<script lang="ts">
    import Charred from '$lib/components/charpctred.svelte';

    // Define the data for main characters
    const mainCharacters = [
        { name: 'BFD', image: '/images/valkportrait/scoralie.png',  teampct: '100%', },
        { name: 'Badum', image: '/images/valkportrait/kiana badum.png',  teampct: '100%',  },
        { name: 'PS', image: '/images/valkportrait/ps.png',  teampct: '99%', },
        { name: 'HoH', image: '/images/valkportrait/Elysia Herrscher of Human Ego.png',  teampct: '96%', },
        { name: 'RS', image: '/images/valkportrait/dudu.png',  teampct: '95%', utility: 'Shield',},

    ];

    const asopchar = [
        { name: 'Chenxue', image: '/images/valkportrait/asop_chenxue.png' ,  teampct: '100%', speed: 'Faster'   },
        { name: 'Songque', image: '/images/valkportrait/asop_songque.png' ,  teampct: '97%',  },
        { name: 'Kiana', image: '/images/valkportrait/elf_kiana.png',  teampct: '96%'  },
        { name: 'DS', image: '/images/valkportrait/asop_ds.png',  teampct: '94%'   },
        { name: 'Teri', image: '/images/valkportrait/asop_teri.png' ,  teampct: '93%' , speed: 'Faster'  },

    ];

    // Pass the index or name of the first character to the reusable component
    export let firstCharName: string = 'BFD'; // default to 'Vita'
    export let maindps: boolean = false;

    // Find the character with the matching name and use it as firstCharred
    let firstCharred = mainCharacters.find(char => char.name === firstCharName);

    // Remove firstCharred from mainCharacters to avoid repetition
    let filteredMainCharacters = mainCharacters.filter(char => char.name !== firstCharName);
</script>

<div class="mb-8 mt-8 border rounded-lg bg-linear-to-b from-orange-950 to-orange-900 shadow-lg shadow-base-100 overflow-hidden">
    <h3 class="text-xl font-semibold mb-2 text-center text-zinc-900 bg-slate-100 font-s">Planar Armament DPS</h3>

    <div class="flex flex-wrap px-2 pt-2 gap-2 gap-y-6 mb-4 justify-center">

        <!-- Leader Image -->
        <div class="relative w-20 h-20 sm:w-28 sm:h-28">
            <img src="/images/valkportrait/paws.png" alt="badum" class="w-full h-full object-cover">
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
                PAWS's best teammates are <a href='/valk/scoralie' class="link">Behold! Fate-Defying Dragon (BFD)</a> + either <a href='/valk/badum' class="link">Badum!</a> or <a href='/valk/peregrine-sword' class="link">Peregrine Sword (PS)</a>.
            </p>

            <p class="text-sm sm:text-base mb-4"><b>BFD</b><br/> - Provides elemental breach and strong buffs.
                <br/>
                - Increases the amount of paralyze trauma inflicted by PAWS.

            </p> 

            
            <p class="text-sm sm:text-base mb-4"><b>Chenxue</b><br/> Chenxue speeds up your Stellar Outburst rotation by allowing the support to skip actions like Combo ATK or Weapon Skill - the supports just have to cast Ult.

            </p> 

            <p class="text-sm sm:text-base mb-4"><b>Missing a teammate with Symbiosis tag</b><br/> If you are missing a teammate with Symbiosis tag, you can use Rite of Oblivion characters: <a href='/valk/lp' class="link">Lone Planetfarer</a>, <a href='/valk/hofi' class="link">Herrscher of Finality</a> or <a href='/valk/hofi' class="link">Valkyrie Blastmetal.</a> During Stellar Outburst, you cannot do a full rotation since you won't have enough sp, so just do one PAWS sequence, and end Stellar Outburst early. (See How to Play section for an example).</p>

    </div>
    </details>
</div>
