<script lang="ts">
    import Charred from '$lib/components/charpctred.svelte';

    // Define the data for main characters
    const mainCharacters = [
        { name: 'HoO', image: '/images/valkportrait/Mei Herrscher of Origin.png',  speed: '' },
        { name: 'HoTr', image: '/images/valkportrait/Bronya Herrscher of Truth.png', speed: '' },
    ];

    const asopchar = [
        { name: 'Kiana', image: '/images/valkportrait/elf_kiana.png', teampct: '100%', speed: '' },
        { name: 'Songque', image: '/images/valkportrait/asop_songque.png', teampct: '98%', speed: '' },
        { name: 'DS', image: '/images/valkportrait/asop_ds.png', teampct: '94%', speed: '' },
        { name: 'Sera', image: '/images/valkportrait/asop_sera.png', teampct: '93%', speed: '' }
    ];

</script>

<div class="mb-8 mt-8 border rounded-lg bg-gradient-to-b from-fuchsia-950 to-fuchsia-900   shadow-lg shadow-base-100 overflow-hidden  ">
    <h3 class="text-xl  font-semibold mb-2 text-center text-zinc-900 bg-slate-100 font-s">Herrscher of Finality DPS</h3>

    <div class="flex flex-wrap px-2 pt-2  gap-2 gap-y-6 mb-4 justify-center">

        <div class="relative w-20 h-20 sm:w-28 sm:h-28">
            <img src="/images/valkportrait/Kiana Herrscher of Finality.png" alt="FoV" class="w-full h-full object-cover">
            <span class="sm:badge-md badge badge-sm absolute top-0.5 left-0.5 text-white px-1 rounded z-10 text-center">Leader</span>
        </div>

        <!-- Main Characters Loop (without the first character) -->
        {#each mainCharacters as char}
            <Charred name={char.name} image={char.image} teampct={char.teampct} speed={char.speed} />
        {/each}

        <img src="/images/valkportrait/Plus.png" alt="Plus Icon" class="w-[20px] object-contain">

        <!-- Support Characters Loop -->
        {#each asopchar as char}
            <Charred name={char.name} image={char.image} teampct={char.teampct} speed={char.speed} />
        {/each}
    </div>


      <details class="group rounded-md my-2 overflow-hidden transition duration-200">
        <summary class="text-base sm:text-md font-medium text-center p-1 sm:p-2 cursor-pointer hover:bg-gradient-to-r from-sky-500/0 to-sky-500/0 via-slate-900 	 hover:transition-colors hover:duration-200">
            Details
        </summary>
        <div class="py-3 px-4">
            <p class="text-sm sm:text-base">
                <li class="text-sm sm:text-base mb-2">When Herrscher of Finality, Origin and Truth are in the same team, a powerful new playstyle is enabled.</li>
                <li class="text-sm sm:text-base mb-2"><b>Leader: </b> With Domain of Genesis weapon equipped, HoFi lead is better in Abyss for more dmg, HoO lead is better in Arena for initial sp.</li>
                <li class="text-sm sm:text-base mb-2"><b>Leader: </b> With Waxing Moon weapon equipped, HoFi lead activates AR Rite of Oblivion. In Arena, also gives initial sp.</li>
                <li class="text-sm sm:text-base mb-2"><b>AstralOp: </b> AR regen from asop doesn't matter too much for Trio team since you always need one full rotation for the first Stellar Outburst, and two full rotations to get subsequent Stellar Outburst. But for min-maxing cases, Songque gives 50 initial AR, Kiana gives 40 (2-star) / 45 (4-star) initial AR, and SS-Songque gives 10 AR after SO ends, so you can activate SO slightly earlier. </li>

            </p>
        </div>
    </details>
</div>
