<script lang="ts">
    import Charred from '$lib/components/charpctred.svelte';

    // Define the data for main characters
    const mainCharacters = [
        { name: 'WoP', image: '/images/valkportrait/Seele Wings of Panacea.png',  teampct: '#1' },
        { name: 'Vita', image: '/images/valkportrait/Vita Lone Planetfarer.png', teampct: '#2', speed: 'Slow' },
        { name: 'Sena', image: '/images/valkportrait/Senadina Deepspace Anchor.png', teampct: '#3', speed: 'Fast' },


        { name: 'Rita', image: '/images/valkportrait/Miss Espionage.png', teampct: '100%', speed: '' },

        { name: 'Lantern', image: '/images/valkportrait/Lantern Lone Destruction.png', teampct: '78%', speed: '' },
        { name: 'Thelema', image: '/images/valkportrait/Thelema Mad Pleasure.png', teampct: '78%', speed: '' },
        { name: 'RS', image: '/images/valkportrait/dudu.png', teampct: '77%', speed: '' },
        { name: 'HLE2', image: "/images/valkportrait/Elysia Hi Love Elf.png", teampct: '75%', speed: '' },

        { name: 'Simp', image: "/images/valkportrait/Theresa Schicksal's Imperative.png", teampct: '74%', speed: '' },
        { name: 'HoH', image: '/images/valkportrait/Elysia Herrscher of Human Ego.png', teampct: '74%', speed: '' },
        { name: 'Sena', image: '/images/valkportrait/Senadina Deepspace Anchor.png', teampct: '73%', speed: '' },

    ];

    const asopchar = [
        { name: 'Sena', image: '/images/valkportrait/asop_senadina.png', teampct: '#1', speed: '' },
        { name: 'Sera', image: '/images/valkportrait/asop_sera.png', teampct: '#2', speed: '' },
        { name: 'Youyun', image: '/images/valkportrait/asop_youyun.png', teampct: '#3', speed: '' },
        { name: 'Songque', image: '/images/valkportrait/asop_songque.png', teampct: '#4', speed: '' },
        { name: 'Kiana', image: '/images/valkportrait/elf_bunny.png', teampct: '#5', speed: 'Slow' },
        { name: 'DS', image: '/images/valkportrait/asop_ds.png', teampct: '#6', speed: 'Slow' }
    ];

    // Pass the index or name of the first character to the reusable component
     export let firstCharName: string = 'WoP'; 
    export let secondCharName: string = 'Vita'; 
    export let thirdCharName: string = 'Sena'; // default to 'Vita'

    export let maindps: boolean = false;

    // Find the character with the matching name and use it as firstCharred
    let firstCharred = mainCharacters.find(char => char.name === firstCharName);
    let secondCharred = mainCharacters.find(char => char.name === secondCharName);
    let thirdCharred = mainCharacters.find(char => char.name === thirdCharName);;

    // Remove firstCharred from mainCharacters to avoid repetition
let filteredMainCharacters = mainCharacters.filter(
  char => char.name !== 'Sena' && char.name !== 'Vita' && char.name !== 'WoP'
);


</script>

<div class="mb-8 mt-8 border rounded-lg bg-linear-to-b from-cyan-900 to-amber-900   shadow-lg shadow-base-100 overflow-hidden  ">
    <h3 class="text-xl  font-semibold mb-2 text-center text-zinc-900 bg-slate-100 font-s">Jovial Deception DPS</h3>

    <div class="flex flex-wrap px-2 pt-2  gap-2 gap-y-6 mb-4 justify-center">

        <!-- Leader Image -->
        <div class="relative w-20 h-20 sm:w-28 sm:h-28 justify-center">
            <img src="/images/valkportrait/Songque Jovial Deception.png" alt="Sena" class="w-full h-full object-cover">
            <span class="sm:badge-md badge badge-sm absolute top-0.5 left-0.5 text-white px-1 rounded-sm z-10 text-center">Leader</span>
        </div>

        <img src="/images/valkportrait/Plus.png" alt="Plus Icon" class="w-[20px] object-contain">

        <!-- First Charred component (can be swapped) -->
        {#if firstCharred}
            <Charred name={firstCharred.name} image={firstCharred.image} teampct={firstCharred.teampct} utility={firstCharred.utility} speed={firstCharred.speed} />
        {/if}

        {#if secondCharred}
            <Charred name={secondCharred.name} image={secondCharred.image} teampct={secondCharred.teampct} utility={secondCharred.utility} speed={secondCharred.speed} />
        {/if}
    
        {#if thirdCharred}
            <Charred name={thirdCharred.name} image={thirdCharred.image} teampct={thirdCharred.teampct} utility={thirdCharred.utility} speed={thirdCharred.speed} />
        {/if}           
        <!-- Plus Icon shown only if maindps is true -->
        {#if !maindps}
            <img src="/images/valkportrait/Plus.png" alt="Plus Icon" class="w-[20px] object-contain">
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
        <summary class="text-base sm:text-md font-medium text-center p-1 sm:p-2 cursor-pointer hover:bg-linear-to-r from-sky-500/0 to-sky-500/0 via-slate-900 	 hover:transition-colors hover:duration-200">
            Details
        </summary>
        <div class="py-3 px-4">

            <p class="text-sm sm:text-base mb-4">
                <b>Best team options</b> <br/>
                - Standard team: Breach Support (WoP / Vita / Sena) + another support <br/>
                - Mono SD team: WoP + Hi Love Elf
            </p>

            <p class="text-sm sm:text-base"> <b>Note</b><br/>
          <ul class="list-disc ml-6 text-sm sm:text-base">
                <li class="text-sm sm:text-base">Against Ranged Kalpas, Lantern is important to break hitcount phase, and becomes a double dps with JD.</li>
                <li class="text-sm sm:text-base">Against SD enemies, HiLoveElf or Sena support contributes dmg.</li>
                <li class="text-sm sm:text-base">Thelema provides shieldbreak (common against Phy enemies), freeze (used against Ranged Kalpas), and can spam evasion AR regen.</li>  
          </ul>
                
                <br/>
                <p class="text-sm sm:text-base"> <b>Crit Rate</b><br/>
                     Youyun and Serapeum AstralOp (S0-rank) ensures that all JD attacks will crit (technically it maxes at 30% Crit Rate but it's way more than enough). Without the Crit conversion from Serapeum, having two supports that provide Crit Rate such as Lantern, Sena, Vita or SIMP are more valuable. However, for most casual players, JD is still fine with only one support that provides Crit Rate, since most of JD's important attacks (Ult, Combo, Weapon) already have boosted Crit Rate.

                    </p>            

                <br/>
                <p class="text-sm sm:text-base"> <b>Elemental Breach State Conversion </b> <br/>
                      JD has a unique passive: When JD is in Elemental Breach state, if Crit Rate &gt; 100%, gain Physical DMG +33%. If Crit Rate &lt; 100%, gain 22% Crit Rate and Total DMG +22%. So far, the only Part 2 supports that can provide Elemental Breach state are Senadina and Vita.
                </p>
        </div>
    </details>
</div>
