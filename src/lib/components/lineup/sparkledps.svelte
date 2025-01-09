<script lang="ts">
    import Charred from '$lib/components/charpctred.svelte';

    // Define the data for main characters
    const mainCharacters = [
        { name: 'Vita', image: '/images/valkportrait/Vita Lone Planetfarer.png', teampct: '100%', speed: '' },
        { name: 'Kiana', image: '/images/valkportrait/Kiana Herrscher of Finality.png', teampct: '100%', speed: '' },
        { name: 'Lantern', image: '/images/valkportrait/Lantern Lone Destruction.png', teampct: '98%', speed: '' },
        { name: 'Sena', image: '/images/valkportrait/Senadina Deepspace Anchor.png', teampct: '97%', speed: '' },
        { name: 'Thelema', image: '/images/valkportrait/Thelema Mad Pleasure.png', teampct: '95%', speed: '' },
        { name: 'Simp', image: "/images/valkportrait/Theresa Schicksal's Imperative.png", teampct: '88%', speed: '' },
        { name: 'Coralie', image: '/images/valkportrait/Coralie Valkyrie Blastmetal.png', teampct: '81%', speed: 'Slow' },
        { name: 'Helia', image: '/images/valkportrait/Helia Valkyrie Boltstorm.png', teampct: '74%', speed: 'Slow' },
        { name: 'Badum', image: '/images/valkportrait/Blazing Wishes.png',  speed: '' },

    ];

    const asopchar = [
        { name: 'Songque', image: '/images/valkportrait/asop_songque.png', teampct: '100%', speed: '' },
        { name: 'Kiana', image: '/images/valkportrait/elf_kiana.png', teampct: '98%', speed: 'Slow' },
        { name: 'Sera', image: '/images/valkportrait/asop_sera.png', teampct: '92%', speed: '' },
        { name: 'DS', image: '/images/valkportrait/asop_ds.png', teampct: '90%', speed: 'Slow' }
    ];

    // Pass the index or name of the first character to the reusable component
    export let firstCharName: string = 'Vita'; // default to 'Vita'
    export let maindps: boolean = false;

    // Find the character with the matching name and use it as firstCharred
    let firstCharred = mainCharacters.find(char => char.name === firstCharName);

    // Remove firstCharred from mainCharacters to avoid repetition
    let filteredMainCharacters = mainCharacters.filter(char => char.name !== firstCharName);
</script>

<div class="mb-8 mt-8 border rounded-lg bg-gradient-to-b from-red-950 to-red-900 shadow-lg shadow-base-100 overflow-hidden">
    <h3 class="text-xl font-semibold mb-2 text-center text-zinc-900 bg-slate-100 font-s">Sparkle DPS</h3>

    <div class="flex flex-wrap px-2 pt-2 gap-2 gap-y-6 mb-4 justify-center">

        <!-- Leader Image -->
        <div class="relative w-20 h-20 sm:w-28 sm:h-28">
            <img src="/images/valkportrait/sparkle.png" alt="SIMP" class="w-full h-full object-cover">
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
            <p class="text-sm sm:text-base">
                <li class="text-sm  sm:text-base mb-4">Sparkle DPS's strongest and fastest team is Vita + HoFi. (Data based on 7.9 Resonance Vita) , but in Red Lotus where enemies die faster, other supports like Senadina and Thelema are close, or maybe better. For Fire Kosma boss, Lantern support is used to counter hitcount shield.</li>

                <li class="text-sm sm:text-base mb-4"><b>Vita</b> provides Elemental Breach (Ele res reduction) and other strong buffs, gives a significant damage improvement.</li>
                <li class="text-sm sm:text-base mb-4"><b>HoFi</b> triggers resonance marks very fast and provides good amount of buffs.</li>
                <li class="text-sm sm:text-base mb-4"><b>Lantern</b> provides good amount of buffs. Her high-hitcount attacks can counter Fire Kosma boss. Lantern + Vita / HoFi / Sena are in CN Top 100 (Data based on 7.9 Fire Kosma)</li>
                <li class="text-sm sm:text-base mt-4"><b>Senadina</b>  also provides Breach, and when paired with Songque AstralOp, you gain +25 more initial AR. </li>
                <li class="text-sm sm:text-base mt-4">During Stellar Outburst, Sparkle's resonance mark and can be triggered 18 times. Best paired with teammates that can trigger resonance 6 times (Vita, HoFi, Thelema, Lantern, SIMP)</li>
                <li class="text-sm sm:text-base mt-4">During Stellar Outburst, Sparkle's resonance mark can consume teammate's resonance mark, dealing resonance dmg 3 times (Senadina, Helia)</li>


            </p>
        </div>
    </details>
</div>
