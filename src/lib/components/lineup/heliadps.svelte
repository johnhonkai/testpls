<script lang="ts">
    import Charred from '$lib/components/charpctred.svelte';

    // Define the data for main characters
    const mainCharacters = [
        { name: 'Badum', image: '/images/valkportrait/kiana badum.png',  teampct: '100%',  },
        { name: 'PS', image: '/images/valkportrait/ps.png',  teampct: '100%', },
        { name: 'HoH', image: '/images/valkportrait/Elysia Herrscher of Human Ego.png',  teampct: '99%', },
        { name: 'RS', image: '/images/valkportrait/dudu.png',  teampct: '98%', utility: 'Shield',},

    ];

    const asopchar = [
        { name: 'Teri', image: '/images/valkportrait/asop_teri.png' ,  teampct: '#2' , speed: 'Faster'  },
        { name: 'Songque', image: '/images/valkportrait/asop_songque.png' ,  teampct: '#1',  speed: 'Slower'  },
        { name: 'Kiana', image: '/images/valkportrait/elf_kiana.png', },
        { name: 'DS', image: '/images/valkportrait/asop_ds.png',  }
    ];

    // Pass the index or name of the first character to the reusable component
    export let firstCharName: string = 'Badum'; // default to 'Vita'
    export let maindps: boolean = false;

    // Find the character with the matching name and use it as firstCharred
    let firstCharred = mainCharacters.find(char => char.name === firstCharName);

    // Remove firstCharred from mainCharacters to avoid repetition
    let filteredMainCharacters = mainCharacters.filter(char => char.name !== firstCharName);
</script>

<div class="mb-8 mt-8 border rounded-lg bg-linear-to-b from-orange-950 to-orange-900 shadow-lg shadow-base-100 overflow-hidden">
    <h3 class="text-xl font-semibold mb-2 text-center text-zinc-900 bg-slate-100 font-s">Planar Armament DPS</h3>

    <div class="flex flex-wrap px-2 pt-2 gap-2 gap-y-6 mb-4 justify-center">

        <!-- Leader Image -->
        <div class="relative w-20 h-20 sm:w-28 sm:h-28">
            <img src="/images/valkportrait/New Helia.png" alt="badum" class="w-full h-full object-cover">
            <span class="sm:badge-md badge badge-sm absolute top-0.5 left-0.5 text-white px-1 rounded-sm z-10 text-center">Leader</span>
        </div>

        <!-- Conditional Plus Icon -->

            <img src="/images/valkportrait/Plus.png" alt="Plus Icon" class="w-[20px] object-contain">


        <!-- First Charred component (can be swapped) -->
        {#if firstCharred}
            <Charred name={firstCharred.name} image={firstCharred.image} teampct={firstCharred.teampct} utility={firstCharred.utility} speed={firstCharred.speed} />
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

</div>
