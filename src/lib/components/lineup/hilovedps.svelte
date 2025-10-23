<script lang="ts">
    import Charred from '$lib/components/charpctred.svelte';

    // Define the data for main characters
    const mainCharacters = [
        { name: 'BFD', image: '/images/valkportrait/scoralie.png',  teampct: '100%'},
        { name: 'PAWS', image: '/images/valkportrait/paws.png',  teampct: '100%'},
        { name: 'Badum', image: '/images/valkportrait/kiana badum.png',  teampct: '98%' },
        { name: 'PS', image: '/images/valkportrait/ps.png',  teampct: '96%' },
        { name: 'HoH', image: '/images/valkportrait/Elysia Herrscher of Human Ego.png',  teampct: '96%' },
        { name: 'RS', image: '/images/valkportrait/dudu.png',  teampct: '92%'},
        { name: 'HoRB', image: '/images/valkportrait/Seele Herrscher of Rebirth.png',  teampct: '88%'},

    ];

    const asopchar = [
        { name: 'Chenxue', image: '/images/valkportrait/asop_chenxue.png' ,  teampct: '100%', speed: 'Fast'   },
        { name: 'Songque', image: '/images/valkportrait/asop_songque.png' , teampct: '96%'  },
        { name: 'Elysia', image: '/images/valkportrait/elf_ely.png' , teampct: '95%', speed: 'Slow'   },
        { name: 'DS', image: '/images/valkportrait/asop_ds.png',  teampct: '94%', speed: 'Slow' },

    ];

    // Pass the index or name of the first character to the reusable component
    export let firstCharName: string = 'BFD'; // default to 'Vita'
    export let maindps: boolean = false;

    // Find the character with the matching name and use it as firstCharred
    let firstCharred = mainCharacters.find(char => char.name === firstCharName);

    // Remove firstCharred from mainCharacters to avoid repetition
    let filteredMainCharacters = mainCharacters.filter(char => char.name !== firstCharName);
</script>

<div class="mb-8 mt-8 border rounded-lg bg-linear-to-b from-pink-950 to-pink-900 shadow-lg shadow-base-100 overflow-hidden">
    <h3 class="text-xl font-semibold mb-2 text-center text-zinc-900 bg-slate-100 font-s">Hi ♪ Love Elf ♥ DPS</h3>

    <div class="flex flex-wrap px-2 pt-2 gap-2 gap-y-6 mb-4 justify-center">

        <!-- Leader Image -->
        <div class="relative w-20 h-20 sm:w-28 sm:h-28">
            <img src="/images/valkportrait/Elysia Hi Love Elf.png" alt="badum" class="w-full h-full object-cover">
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
                Hi Love Elf best teammates are usually <a href='/valk/behold-fate-defying-dragon' class="link">Behold! Fate-Defying Dragon (BFD)</a> + either <a href='/valk/paws' class="link">PAWS</a> or <a href='/valk/badum' class="link">Badum</a> or even <a href='/valk/hoh' class="link">HoH</a> (can be others) depending on the boss.
            </p>

            <p class="text-sm sm:text-base mb-4"><b>BFD</b><br/> - Provides elemental breach and strong buffs.
                <br/>
                - Increases the amount of freeze trauma and freeze duration inflicted by HLE.

            </p> 

            <p class="text-sm sm:text-base mb-4"><b>PAWS</b><br/> Used in Symphony weather where three different elements are required to gain maximum damage buff.

            </p> 

            <p class="text-sm sm:text-base mb-4"><b>Badum</b><br/> Used to counter SD enemies.

            </p> 

            <p class="text-sm sm:text-base mb-4"><b>Herrscher of Rebirth</b><br/> HoRB provides a lot of suspended animations, so she can be a good support for Memorial Arena mode.

            </p> 

            <p class="text-sm sm:text-base mb-4"><b>Chenxue</b><br/> Chenxue gives big dmg buff and speeds up your Stellar Outburst rotation by allowing the support to skip actions like Combo ATK or Weapon Skill - the supports just have to cast Ult.

            </p> 

            <p class="text-sm sm:text-base mb-4"><b>Missing a teammate with Symbiosis tag</b><br/> If you are missing a teammate with Symbiosis tag, you can use Rite of Oblivion characters: <a href='/valk/lp' class="link">Lone Planetfarer</a>, <a href='/valk/hofi' class="link">Herrscher of Finality</a> or <a href='/valk/hofi' class="link">Valkyrie Blastmetal.</a> Thanks to HLE's negative sp mechanic, you can do full rotation even without a third Symbiosis team member.</p>

    </div>
    </details>
</div>
