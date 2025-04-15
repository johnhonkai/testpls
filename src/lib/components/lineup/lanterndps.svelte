<script lang="ts">
    import Charred from '$lib/components/charpctred.svelte';

    // Define the data for main characters
    const mainCharacters = [
        { name: 'Vita', image: '/images/valkportrait/Vita Lone Planetfarer.png', teampct: '100%', speed: '' },
        { name: 'Sena', image: '/images/valkportrait/Senadina Deepspace Anchor.png', teampct: '100%', speed: '' },
        { name: 'Thelema', image: '/images/valkportrait/Thelema Mad Pleasure.png', teampct: '100%', speed: '' },
        { name: 'JD', image: '/images/valkportrait/Songque Jovial Deception.png', teampct: '98%', speed: '' },
        { name: 'Simp', image: "/images/valkportrait/Theresa Schicksal's Imperative.png", teampct: '96%', speed: '' },
        { name: 'RS', image: '/images/valkportrait/dudu.png', teampct: '91%', speed: '' },
        { name: 'Kiana', image: '/images/valkportrait/Kiana Herrscher of Finality.png', teampct: '86%', speed: '' },
        { name: 'Coralie', image: '/images/valkportrait/Coralie Valkyrie Blastmetal.png', teampct: '86%', speed: 'Slow' },
        { name: 'HoH', image: '/images/valkportrait/Elysia Herrscher of Human Ego.png',  speed: '' },

    ];

    const asopchar = [
        { name: 'Sera', image: '/images/valkportrait/asop_sera.png', teampct: '100%', speed: '' },
        { name: 'Songque', image: '/images/valkportrait/asop_songque.png', teampct: '94%', speed: '' },
        { name: 'Kiana', image: '/images/valkportrait/elf_kiana.png', teampct: '95%', speed: 'Slow' },
        { name: 'DS', image: '/images/valkportrait/asop_ds.png', teampct: '89%', speed: 'Slow' }
    ];

    // Pass the index or name of the first character to the reusable component
    export let firstCharName: string = 'Vita'; // default to 'Vita'
    export let maindps: boolean = false;
    
    // Find the character with the matching name and use it as firstCharred
    let firstCharred = mainCharacters.find(char => char.name === firstCharName);

    // Remove firstCharred from mainCharacters to avoid repetition
    let filteredMainCharacters = mainCharacters.filter(char => char.name !== firstCharName);


</script>

<div class="mb-8 mt-8 border rounded-lg bg-linear-to-b from-rose-950 to-rose-900   shadow-lg shadow-base-100 overflow-hidden  ">
    <h3 class="text-xl  font-semibold mb-2 text-center text-zinc-900 bg-slate-100">Lone Destruction DPS</h3>

    <div class="flex flex-wrap px-2 pt-2  gap-2 gap-y-6 mb-4 justify-center">

        <!-- Leader Image -->
        <div class="relative w-20 h-20 sm:w-28 sm:h-28">
            <img src="/images/valkportrait/Lantern Lone Destruction.png" alt="Sena" class="w-full h-full object-cover">
            <span class="sm:badge-md badge badge-sm absolute top-0.5 left-0.5 text-white px-1 rounded-sm z-10 text-center">Leader</span>
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
        <summary class="text-base sm:text-md font-medium text-center p-1 sm:p-2 cursor-pointer hover:bg-linear-to-r from-sky-500/0 to-sky-500/0 via-slate-900 	 hover:transition-colors hover:duration-200">
            Details
        </summary>
        <div class="py-3 px-4">
            <p class="text-sm sm:text-base">
                <li class="text-sm sm:text-base mb-4">At S-rank, Sena support scores higher than Vita. Although Vita provides more buff, the dmg increase is not big enough to beat the score with Sena's zero field time. (Data based on Type Counter Kasumi).</li>
                <li class="text-sm sm:text-base mb-4">At higher ranks and weapon synergy, Sena and Vita scores are close. (Data based on Type Counter Kasumi).</li>
                <li class="text-sm sm:text-base"><b>Thelema</b>'s abilities make her an indispensable support for Lantern. Shieldbreak is a game-changer against Kasumi. Evasion spam AR regen is used on multiple bosses: RPC, Tank, Mobius. 
                Thelema herself also contributes damage.</li>
            </p>
        </div>
    </details>
</div>
