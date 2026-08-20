<script lang="ts">
    import Charred from '$lib/components/charpctred.svelte';

    // Define the data for main characters
    const mainCharacters = [
        { name: 'WoP', image: '/images/valkportrait/Seele Wings of Panacea.png',  teampct: '#1' },
        { name: 'Vita', image: '/images/valkportrait/Vita Lone Planetfarer.png', teampct: '#2', speed: 'Slow' },
        { name: 'Sena', image: '/images/valkportrait/Senadina Deepspace Anchor.png', teampct: '#3', speed: 'Fast' },



        { name: 'HLE', image: '/images/valkportrait/Elysia Hi Love Elf.png', teampct: '100%', speed: '' },

        { name: 'Rita', image: '/images/valkportrait/Miss Espionage.png', teampct: '98%', speed: '' },
        { name: 'Thelema', image: '/images/valkportrait/Thelema Mad Pleasure.png', teampct: '84%', speed: '' },
        { name: 'JD', image: '/images/valkportrait/Songque Jovial Deception.png', teampct: '80%', speed: '' },
        { name: 'Lantern', image: '/images/valkportrait/Lantern Lone Destruction.png', teampct: '77%', speed: '' },

        { name: 'RS', image: '/images/valkportrait/dudu.png', teampct: '76%',  speed: '' },

        { name: 'Simp', image: "/images/valkportrait/Theresa Schicksal's Imperative.png", teampct: '74%', speed: '' },
        { name: 'FoV', image: '/images/valkportrait/Fu Hua Fenghuang of Vicissitude.png', teampct: '', speed: '' },


    ];

    const asopchar = [
        { name: 'Sena', image: '/images/valkportrait/asop_senadina.png' ,  teampct: '#1'  },
        { name: 'Sera', image: '/images/valkportrait/asop_sera.png' ,  teampct: '#2'  },

        { name: 'Youyun', image: '/images/valkportrait/asop_youyun.png' ,  teampct: '#3'  },
        { name: 'Ely', image: '/images/valkportrait/elf_ely.png', teampct: '#4', speed: 'Slow' },
        { name: 'Songque', image: '/images/valkportrait/asop_songque.png', teampct: '#5', speed: 'Slow' },

        { name: 'DS', image: '/images/valkportrait/asop_ds.png', teampct: '#6' , speed: 'Slow' },

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

<div class="mb-8 mt-8 border rounded-lg bg-linear-to-b from-pink-950 to-pink-900   shadow-lg shadow-base-100 overflow-hidden  ">
    <h3 class="text-xl  font-semibold mb-2 text-center text-zinc-900 bg-slate-100">Herrrscher of Human DPS</h3>

    <div class="flex flex-wrap px-2 pt-2  gap-2 gap-y-6 mb-4 justify-center">


        <!-- Leader Image -->
        <div class="relative w-20 h-20 sm:w-28 sm:h-28">
            <img src="/images/valkportrait/Elysia Herrscher of Human Ego.png" alt="Sena" class="w-full h-full object-cover">
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


            <img src="/images/valkportrait/Plus.png" alt="Plus Icon" class="w-[20px] object-contain">


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

         <p class="text-sm sm:text-base mb-4"><b>A standard team usually consists of</b><br/> 
            - Breach Support (WoP, Vita, Sena)
            <br/>
            - Plus another support, usually either HLE or Rita, or whatever the boss requires.
        </p>  
             

        <p class="text-sm sm:text-base mb-4"><b>Freeze</b><br/> HLE and Thelema can apply freeze trauma.
        </p>    


        </div>
    </details> 
</div>
