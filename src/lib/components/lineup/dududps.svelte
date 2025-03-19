<script lang="ts">
    import Charred from '$lib/components/charpctred.svelte';

    // Define the data for main characters
    const mainCharacters = [
        { name: 'CS', image: '/images/valkportrait/Casual Stroll.png',  teampct: '108%',  speed: 'BETA' },
        { name: 'Sparkle', image: '/images/valkportrait/sparkle.png', teampct: '100%',  speed: '' },
        { name: 'JD', image: '/images/valkportrait/Songque Jovial Deception.png', teampct: '100%',  speed: '' },
        { name: 'Vita', image: '/images/valkportrait/Vita Lone Planetfarer.png', teampct: '97%',  speed: '' },
        { name: 'BW', image: '/images/valkportrait/kiana badum.png', teampct: 'Mobs',  speed: '' },
        { name: 'HoH', image: '/images/valkportrait/Elysia Herrscher of Human Ego.png', teampct: 'Bow',  speed: '' },

    ];

    const asopchar = [
        { name: 'Teri', image: '/images/valkportrait/asop_teri.png', teampct: '119%' , speed: 'BETA' },
        { name: 'Sera', image: '/images/valkportrait/asop_sera.png', teampct: '100%', speed: '' },
        { name: 'Bunny', image: '/images/valkportrait/elf_bunny.png', teampct: '97%', speed: '' },
        { name: 'DS', image: '/images/valkportrait/asop_ds.png', teampct: '92%', speed: '' },
        { name: 'Songque', image: '/images/valkportrait/asop_songque.png', teampct: '90%', speed: '' }

    ];

    // Pass the index or name of the first character to the reusable component
    export let firstCharName: string = 'Sparkle'; // default to 'Vita'
    export let maindps: boolean = false;

    // Find the character with the matching name and use it as firstCharred
    let firstCharred = mainCharacters.find(char => char.name === firstCharName);

    // Remove firstCharred from mainCharacters to avoid repetition
    let filteredMainCharacters = mainCharacters.filter(char => char.name !== firstCharName);
</script>

<div class="mb-8 mt-8 border rounded-lg bg-gradient-to-b from-cyan-950 to-cyan-900 shadow-lg shadow-base-100 overflow-hidden">
    <h3 class="text-xl font-semibold mb-2 text-center text-zinc-900 bg-slate-100 font-s">Reign Solaris DPS</h3>

    <div class="flex flex-wrap px-2 pt-2 gap-2 gap-y-6 mb-4 justify-center">

        <!-- Leader Image -->
        <div class="relative w-20 h-20 sm:w-28 sm:h-28">
            <img src="/images/valkportrait/dudu.png" alt="SIMP" class="w-full h-full object-cover">
            <span class="sm:badge-md badge badge-sm absolute top-0.5 left-0.5 text-white px-1 rounded z-10 text-center">Leader</span>
        </div>

        <!-- Conditional Plus Icon -->

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
        <summary class="text-base sm:text-md font-medium text-center p-1 sm:p-2 cursor-pointer hover:bg-gradient-to-r from-sky-500/0 to-sky-500/0 via-slate-900 hover:transition-colors hover:duration-200">
            Details
        </summary>
        <div class="py-3 px-4">

                <p class="text-sm sm:text-base mb-4">The best supports for Reign Solaris depend on the boss. For general use cases, Vita, Sparkle and Jovial Deception are the best. Vita only starts beating other supports at really high rank (SS+) , but Vita is still a great option.</p>
                <p class="text-sm sm:text-base mb-4"><b>Sparkle</b><br/>
                    Provides Ult cd reduction and sp regen. More ult = more damage! She also has short on-field time.</p>
                <p class="text-sm sm:text-base mb-4"><b>Jovial Deception</b><br/>
                     - Counters SD enemies (trigger sd critical point, gathers sd remnant). In v8.0, there will be a new Abyss stage with SD boss.
                     <br/>
                     - In Physical weather Abyss, JD will also get buffed by weather effect.
                </p>          
                <p class="text-sm sm:text-base mb-4"><b>Lone Planetfarer</b><br/> - Provides strong buffs, including Elemental Breach and Physical Breach.
                    <br/>
                    - Has a slightly longer on-field time than other supports.<br/>
                    - In Physical weather Abyss, Vita herself deals less damage since weather effect reduces Lightning DMG.
                </p>          

                <p class="text-sm sm:text-base mb-4"><b>Badum Kiana</b><br/> - Provides team-wide damage share against mobs.
                    <br/>
                    - Badum support is used against Physical HoD Minion in v8.1.
                </p>   

                <p class="text-sm sm:text-base mb-4"><b>Herrscher of Human</b><br/>
                    - Utility: As a bow user, HoH can hit enemy's weak spot.
                    <br/>
                     - There's only one boss that requires HoH support: MHT-3C Tank. MHT-3C gains a huge debuff when its weak spot is hit. This is the only situation where HoH support is the best.
                </p> 
    
                <p class="text-sm sm:text-base"><b>AstralOp</b><br/> Theresa AstralOp provides tons of utilities:
                    <br/>
                    - Double Stellar Shift
                    <br/>
                    - Increased HP Loss DMG
                    <br/>
                    - Crit Rate +27%
                    <br/>
                    - Initial AR (S), and post-SO AR (SS)
                </p> 
        </div>
    </details>
</div>
