<script lang="ts">
    import Charred from '$lib/components/charpctred.svelte';

    // Define the data for main characters
    const mainCharacters = [

        { name: 'Sena', image: '/images/valkportrait/Senadina Deepspace Anchor.png', teampct: '100%', speed: '' },
        { name: 'Thelema', image: '/images/valkportrait/Thelema Mad Pleasure.png', teampct: '100%', speed: '' },
        { name: 'Vita', image: '/images/valkportrait/Vita Lone Planetfarer.png', teampct: '98%', speed: '' },
        { name: 'JD', image: '/images/valkportrait/Songque Jovial Deception.png', teampct: '95%', speed: '' },
        { name: 'Lantern', image: '/images/valkportrait/Lantern Lone Destruction.png', teampct: '92%', speed: '' },

        { name: 'RS', image: '/images/valkportrait/dudu.png', teampct: '91%',  speed: '' },

        { name: 'Simp', image: "/images/valkportrait/Theresa Schicksal's Imperative.png", teampct: '88%', speed: '' },


    ];

    const asopchar = [
        { name: 'Sera', image: '/images/valkportrait/asop_sera.png', teampct: '100%', speed: '' },
        { name: 'Kiana', image: '/images/valkportrait/elf_ely.png', teampct: '92%', speed: 'Slow' },
        { name: 'Songque', image: '/images/valkportrait/asop_songque.png', teampct: '90%', speed: '' },
        { name: 'DS', image: '/images/valkportrait/asop_ds.png', teampct: '84%', speed: 'Slow' }
    ];

    // Pass the index or name of the first character to the reusable component
    export let firstCharName: string = 'Sena'; // default to 'Vita'
    export let maindps: boolean = false;
    
    // Find the character with the matching name and use it as firstCharred
    let firstCharred = mainCharacters.find(char => char.name === firstCharName);

    // Remove firstCharred from mainCharacters to avoid repetition
    let filteredMainCharacters = mainCharacters.filter(char => char.name !== firstCharName);



</script>

<div class="mb-8 mt-8 border rounded-lg bg-gradient-to-b from-pink-950 to-pink-900   shadow-lg shadow-base-100 overflow-hidden  ">
    <h3 class="text-xl  font-semibold mb-2 text-center text-zinc-900 bg-slate-100">Herrrscher of Human DPS</h3>

    <div class="flex flex-wrap px-2 pt-2  gap-2 gap-y-6 mb-4 justify-center">


        <!-- Leader Image -->
        <div class="relative w-20 h-20 sm:w-28 sm:h-28">
            <img src="/images/valkportrait/Elysia Herrscher of Human Ego.png" alt="Sena" class="w-full h-full object-cover">
            <span class="sm:badge-md badge badge-sm absolute top-0.5 left-0.5 text-white px-1 rounded z-10 text-center">Leader</span>
        </div>

        <img src="/images/valkportrait/Plus.png" alt="Plus Icon" class="w-[20px] object-contain">


        <!-- First Charred component (can be swapped) -->
        {#if firstCharred}
            <Charred name={firstCharred.name} image={firstCharred.image} teampct={firstCharred.teampct} speed={firstCharred.speed} />
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
        <summary class="text-base sm:text-md font-medium text-center p-1 sm:p-2 cursor-pointer hover:bg-gradient-to-r from-sky-500/0 to-sky-500/0 via-slate-900 	 hover:transition-colors hover:duration-200">
            Details
        </summary>
        <div class="py-3 px-4">

        <p class="text-sm sm:text-base mb-4"><b>Thelema</b><br/> - As DPS, HoH needs Thelema support.
            <br/>
            - Old HoH bosses require freeze and/or shieldbreak. These were provided by Kira and Sushang, but in WoDestiny team, only Thelema can provide these utilities.
            <br/>
            - Thelema also has a unique evasion spam strat to quickly regen AR meter, which can significantly improve score.
            <br/>
            - Thelema also contributes damage in ice weather.
        </p>         
        
        <p class="text-sm sm:text-base mb-4"><b>Vita vs Sena</b><br/> - Vita provides strong buffs, Elemental Breach, and slightly more AR regen.
            <br/>
            - Sena provides buffs and Elemental Breach with zero field time.
            <br/>
            - At S-rank, Sena support scores higher than Vita. Although Vita provides stronger buff, the dmg increase is not big enough to beat the score with Sena's zero field time. 

        </p>     

        <p class="text-sm sm:text-base mb-4"><b>AstralOp</b><br/> Serapeum provides the strongest dmg buff, as well as initial AR and post-SO AR regen.

        </p>     

        </div>
    </details> 
</div>
