<script lang="ts">
    import Charred from '$lib/components/charpctred.svelte';

    // Define the data for main characters
    const mainCharacters = [
        { name: 'SCoralie', image: '/images/valkportrait/scoralie.png', teampct: '100%', speed: '' },
        { name: 'Kiana', image: '/images/valkportrait/Kiana Herrscher of Finality.png', teampct: '100%', speed: '' },
        { name: 'Coralie', image: '/images/valkportrait/Coralie Valkyrie Blastmetal.png', teampct: '97%', speed: '' },
        { name: 'LV', image: '/images/valkportrait/Theresa Lunar Vow.png', teampct: '82%', speed: '' },
        { name: 'Eden', image: '/images/valkportrait/Eden Golden Diva.png', teampct: '62%', speed: 'Fast' },
        { name: 'Helia', image: '/images/valkportrait/Helia Valkyrie Boltstorm.png', teampct: '47%', speed: 'Slow' },
    ];

    const asopchar = [
        { name: 'Chenxue', image: '/images/valkportrait/asop_chenxue.png', teampct: '100%' },

        { name: 'Teri', image: '/images/valkportrait/asop_teri.png', teampct: '97%' },
        { name: 'Songque', image: '/images/valkportrait/asop_songque.png', teampct: '96%', speed: '' },
        { name: 'Kiana', image: '/images/valkportrait/elf_kiana.png', teampct: '95%', speed: 'Slow' },
        { name: 'Sera', image: '/images/valkportrait/asop_sera.png', teampct: '89%', speed: 'Slow' },
        { name: 'DS', image: '/images/valkportrait/asop_ds.png', teampct: '88%', speed: 'Slow' }
    ];

    // Pass the index or name of the first character to the reusable component
    export let firstCharName: string = 'SCoralie'; // default to 'Vita'


    // Find the character with the matching name and use it as firstCharred
    let firstCharred = mainCharacters.find(char => char.name === firstCharName);

    // Remove firstCharred from mainCharacters to avoid repetition
    let filteredMainCharacters = mainCharacters.filter(char => char.name !== firstCharName);
</script>

<div class="mb-8 mt-8 border rounded-lg bg-linear-to-b from-cyan-950 to-cyan-900   shadow-lg shadow-base-100 overflow-hidden  ">
    <h3 class="text-xl  font-semibold mb-2 text-center text-zinc-900 bg-slate-100 font-s">Lone Planetfarer DPS</h3>

    <div class="flex flex-wrap px-2 pt-2  gap-2 gap-y-6 mb-4 justify-center">

        <!-- Leader Image -->
        <div class="relative w-20 h-20 sm:w-28 sm:h-28">
            <img src="/images/valkportrait/Vita Lone Planetfarer.png" alt="Vita" class="w-full h-full object-cover">
            <span class="sm:badge-md badge badge-sm absolute top-0.5 left-0.5 text-white px-1 rounded-sm z-10 text-center">Leader</span>
        </div>

        <img src="/images/valkportrait/Plus.png" alt="Plus Icon" class="w-[20px] object-contain">

        <!-- Display first character -->
        {#if firstCharred}
            <Charred name={firstCharred.name} image={firstCharred.image} teampct={firstCharred.teampct} speed={firstCharred.speed} />
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


      <details class="group rounded-md my-2 overflow-hidden transition duration-200">
        <summary class="text-base sm:text-md font-medium text-center p-1 sm:p-2 cursor-pointer hover:bg-linear-to-r from-sky-500/0 to-sky-500/0 via-slate-900 	 hover:transition-colors hover:duration-200">
            Details
        </summary>
        <div class="py-3 px-4">

             <p class="text-sm sm:text-base mb-4">
                Vita's best teammates are <a href='/valk/scoralie' class="link">Behold! Fate-Defying Dragon (BFD)</a> + either <a href='/valk/hofi' class="link">Herrscher of Finality (HoFi)</a> or <a href='/valk/coralie' class="link">Valkyrie Blastmetal (VBM)</a>.
            </p>

            <p class="text-sm sm:text-base mb-4"><b>VBM</b><br/> - VBM provides slightly stronger buff than HoFi during Stellar Outburst.
                <br/>
                - VBM support is actually used in Top 100 Abyss team against Lightning weather Sprout of Wishing boss.

            </p>  

            <p class="text-sm sm:text-base mb-4"><b>Rite of Oblivion character requirement</b><br/> - Vita's leader skill grants powerful effects such as Elemental Breach and stronger Ultimate, but requires three members from AR Rite of Oblivion (RoO). 
                <br/>
                - Without three RoO members, Vita's damage significantly drops.

            </p>  

                        <p class="text-sm sm:text-base mb-4"><b>Special Case</b><br/> Vita DPS with HoFi + Lunar Vow supports got top score against Bleed weather HoSentience boss once.
                <br/>


            </p>  
        </div>
    </details>
</div>
