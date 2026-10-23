<script lang="ts">
    import Charred from '$lib/components/charpctred.svelte';

    // Define the data for main characters
    const mainCharacters = [
        { name: 'WoP', image: '/images/valkportrait/Seele Wings of Panacea.png',  teampct: '#1' },
        { name: 'HLE', image: '/images/valkportrait/Elysia Hi Love Elf.png', teampct: '#1', },
        { name: 'Rita', image: '/images/valkportrait/Miss Espionage.png', teampct: '#1',  speed: 'IMG' },




        { name: 'JD', image: '/images/valkportrait/Songque Jovial Deception.png', speed: '' },
        { name: 'Thel', image: '/images/valkportrait/Thelema Mad Pleasure.png',  speed: '' },
        { name: 'RS', image: '/images/valkportrait/dudu.png',  speed: '' },
        { name: 'HoH', image: '/images/valkportrait/Elysia Herrscher of Human Ego.png',  speed: '' },
        { name: 'Lantern', image: '/images/valkportrait/Lantern Lone Destruction.png',  speed: '' },
        { name: 'Simp', image: "/images/valkportrait/Theresa Schicksal's Imperative.png",  speed: '' },
        { name: 'FoV', image: '/images/valkportrait/Fu Hua Fenghuang of Vicissitude.png', teampct: '', speed: '' },


    ];

    const asopchar = [
        { name: 'Sena', image: '/images/valkportrait/asop_senadina.png', teampct: '#1', speed: '' },
        { name: 'Youyun', image: '/images/valkportrait/asop_youyun.png', teampct: '#2', speed: '' },
        { name: 'Sera', image: '/images/valkportrait/asop_sera.png', teampct: '#3', speed: '' },
        { name: 'DS', image: '/images/valkportrait/asop_ds.png', teampct: '#6', speed: 'Slow' }
    ];

     export let firstCharName: string = 'WoP'; 
    export let secondCharName: string = 'HLE'; 
    export let thirdCharName: string = 'Rita'; // default to 'Vita'

    export let maindps: boolean = false;

    // Find the character with the matching name and use it as firstCharred
    let firstCharred = mainCharacters.find(char => char.name === firstCharName);
    let secondCharred = mainCharacters.find(char => char.name === secondCharName);
    let thirdCharred = mainCharacters.find(char => char.name === thirdCharName);;

    // Remove firstCharred from mainCharacters to avoid repetition
let filteredMainCharacters = mainCharacters.filter(
  char => char.name !== 'HLE' && char.name !== 'Rita' && char.name !== 'WoP'
);
</script>

<div class="mb-8 mt-8 border rounded-lg bg-linear-to-b from-purple-950 to-purple-900 shadow-lg shadow-base-100 overflow-hidden">
    <h3 class="text-xl font-semibold mb-2 text-center text-zinc-900 bg-slate-100 font-s">HoTime DPS</h3>

    <div class="flex flex-wrap px-2 pt-2 gap-2 gap-y-6 mb-4 justify-center">

        <!-- Leader Image -->
        <div class="relative w-20 h-20 sm:w-28 sm:h-28">
            <img src="/images/valkportrait/Herrscher of Time.png" alt="badum" class="w-full h-full object-cover">
            <span class="sm:badge-md badge badge-sm absolute top-0.5 left-0.5 text-white px-1 rounded-sm z-10 text-center">Leader</span>
        </div>

        <!-- Conditional Plus Icon -->

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


</div>
