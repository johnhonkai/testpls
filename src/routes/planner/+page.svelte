<script>
  
  import { onMount } from 'svelte';


    const valkyries = [
  { name: 'Sparkle', image: '/images/valkportrait/sparkle.png'},
  { name: 'Lone Planetfarer', image: '/images/valkportrait/Vita Lone Planetfarer.png'},
  { name: "Schicksal's Imperative", image: "/images/valkportrait/Theresa Schicksal's Imperative.png"},
  { name: 'Jovial Deception: Shadowdimmer', image: '/images/valkportrait/Songque Jovial Deception.png'},
  { name: 'Lone Destruction: Shadowchaser', image: '/images/valkportrait/Lantern Lone Destruction.png'},
  { name: 'Mad Pleasure: Shadowbringer', image: '/images/valkportrait/Thelema Mad Pleasure.png'},
  { name: 'Deepspace Anchor: First Light', image: '/images/valkportrait/Senadina Deepspace Anchor.png'},
  { name: 'Valkyrie Boltstorm', image: '/images/valkportrait/Helia Valkyrie Boltstorm.png'},
  { name: 'Valkyrie Blastmetal', image: '/images/valkportrait/Coralie Valkyrie Blastmetal.png'},
  { name: 'Fenghuang of Vicissitude', image: '/images/valkportrait/Fu Hua Fenghuang of Vicissitude.png'},
  { name: 'Cosmic Expression', image: '/images/valkportrait/Griseo Cosmic Expression.png'},
  { name: 'Lunar Vow', image: '/images/valkportrait/Theresa Lunar Vow.png'},
  { name: 'Herrscher of Finality', image: '/images/valkportrait/Kiana Herrscher of Finality.png'},
  { name: 'Herrscher of Origin', image: '/images/valkportrait/Mei Herrscher of Origin.png'} ,
  { name: 'Herrscher of Truth', image: '/images/valkportrait/Bronya Herrscher of Truth.png' } ,
    ]


  let selectedValkyries = new Set(); // Track selected valkyries by name
  let resultText = ""; // Store generated result text

  function toggleSelection(valkName) {
    if (selectedValkyries.has(valkName)) {
      selectedValkyries.delete(valkName);
    } else {
      selectedValkyries.add(valkName);
    }
  }

  function generateResult() {
    // Check if specific valkyries are in `selectedValkyries`
    const hasSparkle = selectedValkyries.has('Sparkle');
    const hasSchicksalImperative = selectedValkyries.has("Schicksal's Imperative");
    const hasFoV = selectedValkyries.has('Fenghuang of Vicissitude');
    const hasSirin = selectedValkyries.has('Sirin');

    // Start building the result text
    resultText = hasSparkle ? "Roles:\n\nYES\n" : "Roles:\n\nNO\n";

    // Example condition: Quantum DPS
    if (!hasSchicksalImperative) {
      resultText += "1. Quantum DPS\nAs DPS, Sparkle can cover Quantum content, but as a DPS, she is very underwhelming.\n\n";
    } else {
      resultText += "Since you already have Schicksal's Imperative, you do not need Sparkle for quantum coverage anymore.\n\n";
    }

    // Example condition: Part 1 Fire Support
    if (!hasFoV && !hasSirin) {
      resultText += "2. Part 1 Fire Support\nSince you are new, you won't be able to use her as a support for Part 1 Fire Valkyries - Fenghuang of Vicissitude and Miracle Magical Girl. Currently, this is Sparkle's best role.\n\n";
    } else {
      resultText += "2. Part 1 Fire Support\nSparkle will be the new best support for Fenghuang of Vicissitude and/or Miracle Magical Girl, replacing Chrono Navi. Currently, this is Sparkle's best role.\n\n";
    }

    // Additional logic can be added here based on other conditions...
  }
</script>


<div class="max-w-5xl mx-auto p-4 pb-0 rounded-lg  text-center">
    <h2 class="text-2xl font-semibold mb-2 text-rose-400 ">Account Planner <span class=" text-white rounded-lg "> v7.9 </span></h2>
    <p class="text-xs sm:text-sm">
        Plan your pulls for the patch here.
    </p>
</div>

<div class="flex justify-center items-center">
    <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 p-4"> 
      {#each valkyries as valk}
        <label class="relative rounded-lg p-2 cursor-pointer flex flex-col items-center bg-gray-800 shadow-md">
          <div class="flex justify-center">
            <img src={valk.image} alt="Valkyrie" class="w-24 h-24 object-cover rounded-md" />
            {#if valk.image2}
              <img src={valk.image2} alt="Valkyrie Weapon" class="w-24 h-24 object-cover rounded-md ml-2" />
            {/if}
          </div>
          <input
            type="checkbox"
            class="checkbox checkbox-sm checkbox-accent mt-2"
            checked={selectedValkyries.has(valk.name)}
            on:change={() => toggleSelection(valk.name)}
          />
        </label>
      {/each}
    </div>
  </div>

  <div class="flex justify-center items-center gap-4">

    <button class="btn btn-outline flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
            <path fill-rule="evenodd" d="M9.53 2.47a.75.75 0 0 1 0 1.06L4.81 8.25H15a6.75 6.75 0 0 1 0 13.5h-3a.75.75 0 0 1 0-1.5h3a5.25 5.25 0 1 0 0-10.5H4.81l4.72 4.72a.75.75 0 1 1-1.06 1.06l-6-6a.75.75 0 0 1 0-1.06l6-6a.75.75 0 0 1 1.06 0Z" clip-rule="evenodd" />
          </svg>
          
        Reset</button>

            <button class="btn btn-primary  flex items-center gap-2 on:click={generateResult}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                    <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                  </svg>
        
                Submit</button>

    <button class="btn btn btn-secondary flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
            <path fill-rule="evenodd" d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z" clip-rule="evenodd" />
          </svg>
          
        I am a New Player</button>
</div>

<!-- Display Result Text -->
{#if resultText}
  <div class="mt-4 p-4 bg-gray-800 rounded-lg shadow-md text-white whitespace-pre-line">
    {resultText}
  </div>
{/if}