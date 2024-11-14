<script lang="ts">
    import Charred from '$lib/components/charpctred.svelte';

    // Define the data for main characters
    const mainCharacters = [
        { name: 'Vita', image: '/images/valkportrait/Vita Lone Planetfarer.png', teampct: '100%', speed: '' },
        { name: 'Lantern', image: '/images/valkportrait/Lantern Lone Destruction.png', teampct: '100%', speed: '' },
        { name: 'Thelema', image: '/images/valkportrait/Thelema Mad Pleasure.png', teampct: '100%', speed: '' },
        { name: 'Sena', image: '/images/valkportrait/Senadina Deepspace Anchor.png', teampct: '94%', speed: '' },
        { name: 'Simp', image: "/images/valkportrait/Theresa Schicksal's Imperative.png", teampct: '95%', speed: '' },
        { name: 'Coralie', image: '/images/valkportrait/Coralie Valkyrie Blastmetal.png', teampct: '80%', speed: 'Slow' },
        { name: 'Kiana', image: '/images/valkportrait/Kiana Herrscher of Finality.png', teampct: '78%', speed: '' },
    ];

    const asopchar = [
        { name: 'Sera', image: '/images/valkportrait/asop_sera.png', teampct: '100%', speed: '' },
        { name: 'Songque', image: '/images/valkportrait/asop_songque.png', teampct: '72%', speed: '' },
        { name: 'Kiana', image: '/images/valkportrait/elf_bunny.png', teampct: '81%', speed: 'Slow' },
        { name: 'DS', image: '/images/valkportrait/asop_ds.png', teampct: '76%', speed: 'Slow' }
    ];

    // Pass the index or name of the first character to the reusable component
    export let firstCharIndex: number = 0; // default to the first character

    // Extract the first character from the mainCharacters array
    let firstCharred = mainCharacters[firstCharIndex];

    export let maindps: boolean = false;

    // Remove firstCharred from mainCharacters so it doesn’t repeat
    let filteredMainCharacters = mainCharacters.filter((char, index) => index !== firstCharIndex);
</script>

<div class="mb-8 mt-8 border rounded-lg bg-gradient-to-b from-cyan-900 to-amber-900   shadow-lg shadow-base-100 overflow-hidden  ">
    <h3 class="text-xl  font-semibold mb-2 text-center text-zinc-900 bg-slate-100 font-s">Jovial Deception DPS</h3>

    <div class="flex flex-wrap px-2 pt-2  gap-2 gap-y-6 mb-4 justify-center">

        <!-- Leader Image -->
        <div class="relative w-20 h-20 sm:w-28 sm:h-28 justify-center">
            <img src="/images/valkportrait/Songque Jovial Deception.png" alt="Sena" class="w-full h-full object-cover">
            <span class="sm:badge-md badge badge-sm absolute top-0.5 left-0.5 text-white px-1 rounded z-10 text-center">Leader</span>
        </div>

        <img src="/images/valkportrait/Plus.png" alt="Plus Icon" class="w-[20px] object-contain">

        <!-- First Charred component (can be swapped) -->
        <Charred name={firstCharred.name} image={firstCharred.image} teampct={firstCharred.teampct} speed={firstCharred.speed} />

        {#if !maindps}
            <img src="/images/valkportrait/Plus.png" alt="Plus Icon" class="w-[20px] object-contain">
        {/if}
        <!-- Main Characters Loop (without the first character) -->
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
            <p class="text-sm sm:text-base"> 
                Jovial Deception lineup has a bit of complexity to it.

                <li class="text-sm sm:text-base">At S-rank, Lantern > Sena > Vita support. (Data based on SD Epernay).</li>
                <li class="text-sm sm:text-base">At SS+ ranks, Vita > Lantern > Sena support. (Data based on SD Epernay).</li>
                <li class="text-sm sm:text-base">Against Ranged Kalpas, Lantern is important to break hitcount phase, and becomes a double dps with JD.</li>
                <li class="text-sm sm:text-base">Against SD enemies, Sena support also contributes dmg.</li>
                <li class="text-sm sm:text-base">Thelema provides shieldbreak (common against Phy enemies), freeze (used against Ranged Kalpas), and can spam evasion AR regen.</li>  
            
                
                <br/>
                <li class="text-sm sm:text-base"> <b>Crit Rate:</b> Serapeum AstralOp (S0-rank) ensures that all JD attacks will crit (technically it maxes at 30% Crit Rate but it's way more than enough). Without the Crit conversion from Serapeum, having two supports that provide Crit Rate such as Lantern, Sena, Vita or SIMP are more valuable. However, for most casual players, JD is still fine with only one support that provides Crit Rate, since most of JD's important attacks (Ult, Combo, Weapon) already have boosted Crit Rate.</li>            

                <br/>
                <li class="text-sm sm:text-base"> <b>Elemental Breach State Conversion: </b>  JD has a unique passive: When JD is in Elemental Breach state, if Crit Rate &gt; 100%, gain Physical DMG +33%. If Crit Rate &lt; 100%, gain 22% Crit Rate and Total DMG +22%. So far, the only Part 2 supports that can provide Elemental Breach state are Senadina and Vita.
                </li>
                
                <br/>
                <li class="text-sm sm:text-base"> <b>Fastest opener: </b>   With SS-rank Serapeum AstralOp, S2 Thelema + Lantern supports provide the fastest opener to get Stellar Outburst on first rotation. This only matters for Top 50 players.
                         
                </li>   

            </p>
        </div>
    </details>
</div>
