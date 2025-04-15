<script lang="ts">
    import Charred from '$lib/components/charpctred.svelte';

    // Define the data for main characters
    const mainCharacters = [
        { name: 'Sparkle', image: '/images/valkportrait/sparkle.png', teampct: '100%', speed: '' },
        { name: 'Thelema', image: '/images/valkportrait/Thelema Mad Pleasure.png', teampct: '100%', speed: '' },
        { name: 'Vita', image: '/images/valkportrait/Vita Lone Planetfarer.png', teampct: '98%', speed: '' },
        { name: 'Kiana', image: '/images/valkportrait/Kiana Herrscher of Finality.png', teampct: '98%', speed: '' },
        { name: 'Lantern', image: '/images/valkportrait/Lantern Lone Destruction.png', teampct: '88%', speed: '' },
        { name: 'Sena', image: '/images/valkportrait/Senadina Deepspace Anchor.png', teampct: '82%', speed: '' },
        { name: 'Coralie', image: '/images/valkportrait/Coralie Valkyrie Blastmetal.png', teampct: '76%', speed: 'Slow' },
        { name: 'Helia', image: '/images/valkportrait/Helia Valkyrie Boltstorm.png', teampct: '76%', speed: 'Slow' },
        { name: 'Badum', image: '/images/valkportrait/Blazing Wishes.png',  speed: '' },


    ];

    const asopchar = [
        { name: 'Songque', image: '/images/valkportrait/asop_songque.png', teampct: '100%', speed: '' },
        { name: 'Sera', image: '/images/valkportrait/asop_sera.png', teampct: '93%', speed: '' },
        { name: 'Kiana', image: '/images/valkportrait/elf_kiana.png', teampct: '93%', speed: 'Slow' },
        { name: 'DS', image: '/images/valkportrait/asop_ds.png', teampct: '88%', speed: 'Slow' }
    ];

    // Pass the index or name of the first character to the reusable component
    export let firstCharName: string = 'Vita'; // default to 'Vita'
    export let maindps: boolean = false;

    // Find the character with the matching name and use it as firstCharred
    let firstCharred = mainCharacters.find(char => char.name === firstCharName);

    // Remove firstCharred from mainCharacters to avoid repetition
    let filteredMainCharacters = mainCharacters.filter(char => char.name !== firstCharName);
</script>

<div class="mb-8 mt-8 border rounded-lg bg-linear-to-b from-purple-950 to-purple-900 shadow-lg shadow-base-100 overflow-hidden">
    <h3 class="text-xl font-semibold mb-2 text-center text-zinc-900 bg-slate-100 font-s">Schicksal's Imperative DPS</h3>

    <div class="flex flex-wrap px-2 pt-2 gap-2 gap-y-6 mb-4 justify-center">

        <!-- Leader Image -->
        <div class="relative w-20 h-20 sm:w-28 sm:h-28">
            <img src="/images/valkportrait/Theresa Schicksal's Imperative.png" alt="SIMP" class="w-full h-full object-cover">
            <span class="sm:badge-md badge badge-sm absolute top-0.5 left-0.5 text-white px-1 rounded-sm z-10 text-center">Leader</span>
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
        <summary class="text-base sm:text-md font-medium text-center p-1 sm:p-2 cursor-pointer hover:bg-linear-to-r from-sky-500/0 to-sky-500/0 via-slate-900 hover:transition-colors hover:duration-200">
            Details
        </summary>
        <div class="py-3 px-4">
            <p class="text-sm sm:text-base">
                <li class="text-sm sm:text-base mb-4"><b>Sparkle</b> provides two more Qua collapse, extra TDM +8.5% (S) / 10% (SS2) buff for QUA teammates against QUA enemies. Her ult cd reduction also allows SIMP to use her Ult one more time during Stellar Outburst. For these reasons, Sparkle has become one of the best teammates against Qua enemies like Valralhal and Resonance Vita.</li>
                <li class="text-sm sm:text-base mb-4"><b>Vita</b> provides Elemental Breach (Ele res reduction) and other strong buffs, gives a significant damage improvement.</li>
                <li class="text-sm sm:text-base mb-4"><b>HoFi</b> triggers resonance marks very fast and provides good amount of buffs.</li>
                <li class="text-sm sm:text-base mb-4"><b>Senadina</b>  also provides Breach, and when paired with Songque AstralOp, you gain +25 more initial AR. </li>
                <li class="text-sm sm:text-base mb-4">The pairings used in Top 100 are Sparkle + Thelema, and Vita + HoFi (Data based on Resonance Vita). Other pairings are still very good for Red Lotus and Nirvana retention.</li>
                <li class="text-sm sm:text-base mb-4">During Stellar Outburst, Homu becomes resonance mark and can be triggered 18 times. Best paired with teammates that can trigger resonance 6 times (Vita, HoFi, Thelema, Lantern, Sparkle)</li>
                <li class="text-sm sm:text-base">During Stellar Outburst, Homu mark can consume teammate's resonance mark, dealing resonance dmg 3 times (Senadina, Helia)</li>
            </p>
        </div>
    </details>
</div>
