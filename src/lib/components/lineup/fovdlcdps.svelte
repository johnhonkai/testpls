<script lang="ts">
    import Charred from '$lib/components/charpctred.svelte';

    // Define the data for main characters
    const mainCharacters = [

       
        { name: 'WoP', image: '/images/valkportrait/Seele Wings of Panacea.png',  teampct: '#1',  },
        { name: 'HLE', image: '/images/valkportrait/Elysia Hi Love Elf.png',  teampct: '#1', },

        { name: 'Vita', image: '/images/valkportrait/Vita Lone Planetfarer.png',  teampct: '',  },
        { name: 'Sena', image: '/images/valkportrait/Senadina Deepspace Anchor.png',  teampct: '',  },


        { name: 'Rita', image: '/images/valkportrait/Miss Espionage.png',  teampct: '',   },

        { name: 'JD', image: '/images/valkportrait/Songque Jovial Deception.png',  teampct: '',  speed: '' },
        { name: 'Thel', image: '/images/valkportrait/Thelema Mad Pleasure.png', teampct: '', speed: '' },
        { name: 'RS', image: '/images/valkportrait/dudu.png', teampct: '', speed: '' },
        { name: 'HoH', image: '/images/valkportrait/Elysia Herrscher of Human Ego.png', teampct: '', speed: '' },
        { name: 'Lantern', image: '/images/valkportrait/Lantern Lone Destruction.png', teampct: '', speed: '' },
        { name: 'Simp', image: "/images/valkportrait/Theresa Schicksal's Imperative.png",  teampct: '', speed: '' },


    ];

    const asopchar = [
        { name: 'Sena', image: '/images/valkportrait/asop_senadina.png' ,  teampct: '#1'  },
        { name: 'Youyun', image: '/images/valkportrait/asop_youyun.png' ,  teampct: '#2'  },
        { name: 'Sera', image: '/images/valkportrait/asop_sera.png' ,  teampct: '#3'  },
        { name: 'DS', image: '/images/valkportrait/asop_ds.png', teampct: '#4' , speed: 'Slow' },

    ];

    // Pass the index or name of the first character to the reusable component
    export let firstCharName: string = 'BFD'; // default to 'Vita'
    export let maindps: boolean = false;

    // Find the character with the matching name and use it as firstCharred
    let firstCharred = mainCharacters.find(char => char.name === firstCharName);

    // Remove firstCharred from mainCharacters to avoid repetition
    let filteredMainCharacters = mainCharacters.filter(char => char.name !== firstCharName);
</script>

<div class="mb-8 mt-8 border rounded-lg bg-linear-to-b from-red-950 to-red-900 shadow-lg shadow-base-100 overflow-hidden">
    <h3 class="text-xl font-semibold mb-2 text-center text-zinc-900 bg-slate-100 font-s">Fenghuang of Vicissitude DPS</h3>

    <div class="flex flex-wrap px-2 pt-2 gap-2 gap-y-6 mb-4 justify-center">

        <!-- Leader Image -->
        <div class="relative w-20 h-20 sm:w-28 sm:h-28">
            <img src="/images/valkportrait/Fu Hua Fenghuang of Vicissitude.png" alt="badum" class="w-full h-full object-cover">
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
                - Wings of Panacea is the best WoD support - provides Breach, ar regen, and more.
                <br/>

                - Hi Love Elf is the best team member since FoV has a passive where she gets independent dmg boost when an Ice teammate is present. Other options include HoH and Thelema.


            </p>

        

    </div>
    </details>
</div>
