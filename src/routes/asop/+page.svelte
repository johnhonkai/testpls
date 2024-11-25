
<svelte:head>
    <meta property="og:title" content="AstralOp Calculator"/>
    <meta property="og:description" content="Calculate and compare AstralOp buffs." />
    <meta property="og:image" content="https://i.imgur.com/ULCqc90.png" />
    <meta property="og:url" content="https://marisaimpact.com/valk/asop" />
    <meta property="og:type" content="website" />

    <meta name="twitter:title" content="AstralOp Calculator" />
    <meta name="twitter:image:type" content="website" />
    <meta name="twitter:card" content="summary_large_image">

    <link rel="canonical"  />
</svelte:head>

<script lang="ts">
  import { onMount } from 'svelte';
  import { fade } from 'svelte/transition';
  import { persistentStore } from '$lib/data/persistentStore';

  import { valkyries } from '$lib/data/valkyries.js';
  import { astralop } from '$lib/data/astralop.js';

    // Persistent store for slots
    const slotsStore = persistentStore('astralop-slots', {
    leader: null,
    valkyrie1: null,
    valkyrie2: null,
    astralOp: null,
    compareAstralOp: null
  });


  let initialar, postsoar, valkbuffs, asopbuffs; // Declare data placeholders
  let compareinitialar, comparesoar, comparevalkbuffs, compareasopbuffs; // Declare data placeholders

  let slots;

  $: slots = $slotsStore;


  const slotNames = {
    leader: "Select Leader",
    valkyrie1: "Select Valkyrie",
    valkyrie2: "Select Valkyrie",
    astralOp: "Select AstralOp",
    compareAstralOp: "Compare"
  };

  let selectedSlot = null;
  let showModal = false;

  let initialAR = 0;
  let postSOAR = 0;
  let processedValkBuffs = [];
  let processedAsopBuffs = [];
  let cumulativeBuffs = {}; // Initialize cumulativeBuffs as an empty object
  let extraregen = [];


  let compareInitialAR = 0;
  let comparePostSOAR = 0;
  let compareProcessedValkBuffs = [];
  let compareProcessedAsopBuffs = [];
  let compareCumulativeBuffs = {};
  let compareextraregen = [];

  let selectedRank = 'SSS'; // default to the highest rank
  let compareSelectedRank = 'SSS';
  const rankOrder = { 'S': 1, 'SS': 2, 'SSS': 3 };

  // Reactive statement to load the correct data when `slots.astralOp` changes
$: if (slots.astralOp) {
  loadAstralOpData(slots.astralOp.name, 'main');
}

  // Reactive statement to load data for compareAstralOp when it's selected
  $: if (slots.compareAstralOp) {
    loadAstralOpData(slots.compareAstralOp.name, 'compare');
  }


// Function to load data based on selected AstralOp name
async function loadAstralOpData(astralOpName, type) {
    const data = await import(`$lib/data/${astralOpName.toLowerCase()}.js`);
    if (type === 'main') {
      ({ initialar, postsoar, valkbuffs, asopbuffs, extraregen } = data);
      updateValues();
    } else if (type === 'compare') {
  ({ initialar: compareinitialar, postsoar: comparesoar, valkbuffs: comparevalkbuffs, asopbuffs: compareasopbuffs, extraregen: compareextraregen } = data);
  updateCompareValues();
}





  }
  // Open modal for slot selection
  function openModal(slot) {
    selectedSlot = slot;
    showModal = true;
  }

  function selectCharacter(character) {
  // Check if the selected character is already in the selected slot
  if ($slotsStore[selectedSlot]?.name === character.name) {
    showModal = false; // Close the modal without making changes
    return;
  }

  // Assign the character to the selected slot
  $slotsStore[selectedSlot] = character;

  // Close the modal
  showModal = false;

  // Update values based on the selected slot
  if (selectedSlot === 'compareAstralOp') {
    updateCompareValues();
  } else {
    updateValues();
  }
}



  function removeCharacter(slot) {
    $slotsStore[slot] = null;
    if (slot === 'compareAstralOp') {
      updateCompareValues();
    } else {
      updateValues();
    }
  }

    // Recalculate AR and Buffs
    function updateValues() {
    initialAR = calculateInitialAr(initialar, selectedRank);
    postSOAR = calculatePostSoAr(postsoar, selectedRank);
    processedValkBuffs = calculateBuffs(valkbuffs, selectedRank);
    processedAsopBuffs = calculateBuffs(asopbuffs, selectedRank);
    cumulativeBuffs = calculateCumulativeValues([...valkbuffs, ...asopbuffs], selectedRank);
  }

  function updateCompareValues() {
    compareInitialAR = calculateInitialAr(compareinitialar, compareSelectedRank);
    comparePostSOAR = calculatePostSoAr(comparesoar, compareSelectedRank);
    compareProcessedValkBuffs = calculateBuffs(comparevalkbuffs, compareSelectedRank);
    compareProcessedAsopBuffs = calculateBuffs(compareasopbuffs, compareSelectedRank);
    compareCumulativeBuffs = calculateCumulativeValues([...comparevalkbuffs, ...compareasopbuffs], compareSelectedRank);
  }
  
  // Calculate total AR for Initial AR based on conditions
  function calculateInitialAr(data, rank) {
  return data.reduce((total, entry) => {
    // Exclude AR entries that exceed the selected rank
    if (rankOrder[entry.rank] > rankOrder[rank]) return total;

    const count = entry.condition ? countCharactersWithCondition(entry.condition) : 1;
    const applicableCount = entry.maxStack ? Math.min(count, entry.maxStack) : count;
    return total + entry.ar * applicableCount;
  }, 0);
}

function calculatePostSoAr(data, rank) {
  return data.reduce((total, entry) => {
    // Exclude AR entries that exceed the selected rank
    if (rankOrder[entry.rank] > rankOrder[rank]) return total;

    const count = entry.condition ? countCharactersWithCondition(entry.condition) : 1;
    const applicableCount = entry.maxStack ? Math.min(count, entry.maxStack) : count;
    return total + entry.ar * applicableCount;
  }, 0);
}

  // Function to count characters with a specific condition
  function countCharactersWithCondition(condition) {
    let count = 0;

    // Check the 'astralRing' condition only for the 'leader' slot
    if (condition.astralRing) {
      const leader = slots.leader;
      const leaderMatch = leader && leader.astralRing === condition.astralRing;
      if (leaderMatch) count += 1;
    }

    // Check the 'tag' condition for only 'leader', 'valkyrie1', and 'valkyrie2' slots
    if (condition.tag) {
      const relevantSlots = ['leader', 'valkyrie1', 'valkyrie2'];
      relevantSlots.forEach(slotName => {
        const character = slots[slotName];
        const tagMatch = character && Array.isArray(character.artag) && character.artag.includes(condition.tag);
        if (tagMatch) count += 1;
      });
    }

    if (condition.element) {
  const relevantSlots = ['leader', 'valkyrie1', 'valkyrie2'];
  relevantSlots.forEach(slotName => {
    const character = slots[slotName];
    const eleMatch = character && character.element === condition.element; // Updated to check for string match
    if (eleMatch) count += 1;
  });
}


  // Check if there are at least two different elements in the team
  if (condition.element === "different") {
    const relevantSlots = ['leader', 'valkyrie1', 'valkyrie2'];
    const elements = new Set();

    relevantSlots.forEach(slotName => {
      const character = slots[slotName];
      if (character && character.element) {
        elements.add(character.element);
      }
    });

    // Count the condition as met if there are at least two distinct elements
    if (elements.size >= 2) {
      count += 1;
    }
  }

    if (condition.valk) {
      const teamSlots = ['leader', 'valkyrie1', 'valkyrie2', 'astralOp'];
      const valkInTeam = teamSlots.some(slotName => {
        const character = slots[slotName];
        return character && character.name === condition.valk;
      });
      if (valkInTeam) count += 1;
    }



    return count;
  }

  function calculateBuffs(buffs, rank) {
  return buffs
    .filter(buff => {
      // Check if buff should be shown based on available_by_default and rank conditions
      if (rankOrder[buff.rank] > rankOrder[rank]) return false;

      // Show unconditionally if available_by_default is "yes"
      if (buff.available_by_default === "yes") return true;

      // Show conditionally if available_by_default is "no" and condition is met
      return buff.available_by_default === "no" && countCharactersWithCondition(buff.condition) > 0;
    })
    .map(buff => {
      let description = buff.description;
      const stackCount = buff.maxStack ? Math.min(buff.maxStack, countCharactersWithCondition(buff.condition)) : 1;
      const value1 = buff[`value1_${stackCount}`] || "";
      const value2 = buff[`value2_${stackCount}`] || "";

      // Replace placeholders in the description with calculated values
      description = description.replace(`{value1}`, value1).replace(`{value2}`, value2);

      // Determine if max or base value should be used and replace {value} in the description
      const shouldUseMaxValue = buff.basevalue && buff.maxvalue && countCharactersWithCondition(buff.condition) > 0;
      description = description.replace(`{value}`, shouldUseMaxValue ? buff.maxvalue : buff.basevalue);

      return { ...buff, description };
    });
}


  // Initial calculation on mount
  onMount(() => {
    updateValues();
  });

  $: astralRingText = slots.leader && slots.leader.astralRing 
    ? `Astral Ring: ${slots.leader.astralRing}` 
    : "Astral Ring: Not Activated";

  function calculateCumulativeValues(buffs, rank) {
    const cumulativeValues = {
      phy: 0,
      acphy: 0,
      sophy: 0,
      condphy: 0,

      phytaken: 0,
      acphytaken: 0,
      sophytaken: 0,

      condphytaken: 0,
      critdmg: 0,
      condcritdmg: 0,
      crate: 0,
      condcrate: 0,

      ele: 0,
      acele: 0,
      soele: 0,

      condele: 0,
      eletaken: 0,
      aceletaken: 0,
      soeletaken: 0,
      condeletaken: 0,

      tdm: 0,
      actdm: 0,
      sotdm: 0,
      resotdm: 0,
      condtdm: 0,


      tdmtaken: 0,
      actdmtaken: 0,
      sotdmtaken: 0,
      shadowtdmtaken: 0,
      condtdmtaken: 0,

      lightning: 0,
      aclightning: 0,
      solightning: 0,

      lightningtaken: 0,
      aclightningtaken: 0,
      solightningtaken: 0,

      ice: 0,
      acice: 0,
      soice: 0,

      icetaken: 0,
      acicetaken: 0,
      soicetaken: 0,

      fire: 0,
      acfire: 0,
      sofire: 0,

      firetaken: 0,
      acfiretaken: 0,
      sofiretaken: 0,
    };

    buffs.forEach(buff => {
      if (rankOrder[buff.rank] > rankOrder[rank]) return;

      const conditionMet = buff.available_by_default === "yes" && !buff.condition ? true : countCharactersWithCondition(buff.condition) > 0;

      if (conditionMet) {
        cumulativeValues.phy += buff.phy || 0;
        cumulativeValues.acphy += buff.acphy || 0;
        cumulativeValues.sophy += buff.sophy || 0;

cumulativeValues.phytaken += buff.phytaken || 0;
cumulativeValues.acphytaken += buff.acphytaken || 0;
cumulativeValues.sophytaken += buff.sophytaken || 0;

cumulativeValues.critdmg += buff.critdmg || 0;
cumulativeValues.crate += buff.crate || 0;

cumulativeValues.ele += buff.ele || 0;
cumulativeValues.acele += buff.acele || 0;
cumulativeValues.soele += buff.soele || 0;

cumulativeValues.eletaken += buff.eletaken || 0;
cumulativeValues.aceletaken += buff.aceletaken || 0;
cumulativeValues.soeletaken += buff.soeletaken || 0;

cumulativeValues.tdm += buff.tdm || 0;
cumulativeValues.actdm += buff.actdm || 0;
cumulativeValues.sotdm += buff.sotdm || 0;

cumulativeValues.resotdm += buff.resotdm || 0;

cumulativeValues.tdmtaken += buff.tdmtaken || 0;
cumulativeValues.actdmtaken += buff.actdmtaken || 0;
cumulativeValues.sotdmtaken += buff.sotdmtaken || 0;
cumulativeValues.shadowtdmtaken += buff.shadowtdmtaken || 0;

cumulativeValues.lightning += buff.lightning || 0;
cumulativeValues.aclightning += buff.aclightning || 0;
cumulativeValues.solightning += buff.solightning || 0;

cumulativeValues.lightningtaken += buff.lightningtaken || 0;
cumulativeValues.aclightningtaken += buff.aclightningtaken || 0;
cumulativeValues.solightningtaken += buff.solightningtaken || 0;

cumulativeValues.ice += buff.ice || 0;
cumulativeValues.acice += buff.acice || 0;
cumulativeValues.soice += buff.soice || 0;

cumulativeValues.icetaken += buff.icetaken || 0;
cumulativeValues.acicetaken += buff.acicetaken || 0;
cumulativeValues.soicetaken += buff.soicetaken || 0;

cumulativeValues.fire += buff.fire || 0;
cumulativeValues.acfire += buff.acfire || 0;
cumulativeValues.sofire += buff.sofire || 0;

cumulativeValues.firetaken += buff.firetaken || 0;
cumulativeValues.acfiretaken += buff.acfiretaken || 0;
cumulativeValues.sofiretaken += buff.sofiretaken || 0;

cumulativeValues.condphy += buff.condphy || 0;
cumulativeValues.condphytaken += buff.condphytaken || 0;
cumulativeValues.condcritdmg += buff.condcritdmg || 0;
cumulativeValues.condcrate += buff.condcrate || 0;
cumulativeValues.condele += buff.condele || 0;
cumulativeValues.condeletaken += buff.condeletaken || 0;
cumulativeValues.condtdm += buff.condtdm || 0;
cumulativeValues.condtdmtaken += buff.condtdmtaken || 0;


// Calculate dynamic values for bufftype1 and bufftype2 based on stack count
const stackCount = buff.maxStack ? Math.min(buff.maxStack, countCharactersWithCondition(buff.condition)) : 1;

// Convert bufftype1 to cumulative values if present
if (buff.bufftype1 && buff[`value1_${stackCount}`]) {
  cumulativeValues[buff.bufftype1] += parseFloat(buff[`value1_${stackCount}`]) || 0;
}

// Convert bufftype2 to cumulative values if present
if (buff.bufftype2 && buff[`value2_${stackCount}`]) {
  cumulativeValues[buff.bufftype2] += parseFloat(buff[`value2_${stackCount}`]) || 0;
}

// Handle single bufftype with conditional basevalue and maxvalue
if (buff.bufftype) {
  const appliedValue = conditionMet && countCharactersWithCondition(buff.condition) > 0
    ? parseFloat(buff.maxvalue)
    : parseFloat(buff.basevalue);
  cumulativeValues[buff.bufftype] += appliedValue || 0;
}
      }
    });

    return cumulativeValues;
  }


  function calculateBuffMultiplier(...buffs) {
  // Sum up all the buffs provided and divide by 100, then add 1
  const totalBuff = buffs.reduce((acc, buff) => acc + buff, 0);
  return 1 + totalBuff / 100;
}

// Example usage
const comparefiretotal = calculateBuffMultiplier(
  compareCumulativeBuffs.firetaken,
  compareCumulativeBuffs.sofiretaken,
  compareCumulativeBuffs.eletaken,
  compareCumulativeBuffs.soeletaken
);


$: rankLabels = slots.astralOp?.type === "elf" 
    ? ["2⭐", "3⭐", "4⭐"] 
    : ["S-rank", "SS-rank", "SSS-rank"];

$: rankLabelscompare = slots.compareAstralOp?.type === "elf" 
    ? ["2⭐", "3⭐", "4⭐"] 
    : ["S-rank", "SS-rank", "SSS-rank"];

     // Helper function to get rank display
 function displayRank(rank) {
    if (slots.astralOp?.type === "elf") {
      switch (rank) {
        case "S": return "2⭐";
        case "SS": return "3⭐";
        case "SSS": return "4⭐";
        default: return rank;
      }
    }
    return rank; // Default if not elf
  }

 // Helper function to get rank display
 function displayRankcompare(rank) {
    if (slots.compareAstralOp?.type === "elf") {
      switch (rank) {
        case "S": return "2⭐";
        case "SS": return "3⭐";
        case "SSS": return "4⭐";
        default: return rank;
      }
    }
    return rank; // Default if not elf
  }
</script>



<div class="max-w-5xl mx-auto p-4 pb-0 rounded-lg text-center">
  <h2 class="text-2xl font-semibold mb-2 text-teal-400">Astral Op Calculator</h2>
  <p class="text-xs sm:text-sm">Calculate and compare AstralOp buffs.</p>
</div>

<!-- Character Slots -->
<div class="flex justify-center items-center gap-6 my-8">
  {#each Object.entries(slots) as [slot, character]}
    <div class="relative w-24 h-24 cursor-pointer" on:click={() => openModal(slot)}>
      {#if character}
        <img src={character.image} alt={character.name} class="object-cover rounded-md w-full h-full" />
        <button 
          class="absolute btn btn-square btn-sm top-1 right-1 text-white bg-red-600  p-1" 
          on:click|stopPropagation={() => removeCharacter(slot)}
        >
          ✕
        </button>
      {:else}
        <div class="bg-gray-700 w-full h-full flex items-center justify-center text-gray-400 rounded-md text-center">
          {slotNames[slot] || "Select"}
        </div>
      {/if}
    </div>
  {/each}
</div>

<!-- Astral Ring Text -->
<div class="text-center mt-4 text-gray-300">
  <span class="mr-2"> {astralRingText} </span>
  
  <button class="btn btn-neutral btn-sm" on:click={() => $slotsStore = {
    leader: null,
    valkyrie1: null,
    valkyrie2: null,
    astralOp: null,
    compareAstralOp: null
  }}>
    Reset
  </button>
</div>



<!-- Character Selection Modal -->
{#if showModal}
  <div class="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center">
    <div class="bg-gray-800 p-6 rounded-lg max-w-xl w-full">
      <h3 class="text-lg font-semibold text-white mb-4">
        {#if selectedSlot === 'astralOp'}
          Select an AstralOp
        {:else if selectedSlot === 'compareAstralOp'}
          Select an AstralOp for Comparison
        {:else}
          Select a Valkyrie
        {/if}
      </h3>

      <div class="grid grid-cols-3 gap-4">
        {#each 
          (selectedSlot === 'astralOp' || selectedSlot === 'compareAstralOp' 
            ? astralop 
            : valkyries) as character}
            <button
            class="p-2 bg-gray-700 rounded-lg flex flex-col items-center hover:bg-gray-600"
            on:click={() => selectCharacter(character)}
            disabled={Object.values($slotsStore).some(slot => slot?.name === character.name)}
          >
            <img src={character.image} alt={character.name} class="w-16 h-16 object-cover rounded-md mb-1" />
            <span class="text-xs text-gray-300">{character.name}</span>
          </button>
          
        {/each}
      </div>

      <button class="mt-4 btn btn-secondary w-full" on:click={() => (showModal = false)}>Cancel</button>
    </div>
  </div>
{/if}


{#if slots.astralOp && slots.leader && slots.leader.astralRing}

<!-- Main and Compare AstralOp Buffs Display -->
<div class="flex gap-3 max-w-screen-xl mx-auto overflow-x-auto sm:overflow-visible sm:max-w-lg md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl mb-20">
  <!-- Main AstralOp Buffs -->
  <div class="flex-1">
    <div class="text-yellow-300 text-center font-bold rounded mt-3 text-lg"> {slots.astralOp.name}</div>

    <div class="flex justify-center items-center mt-4 text-white text-center space-x-4 ">
      <label class="flex items-center gap-2 cursor-pointer">
        <input type="radio" name="rank" value="S"  bind:group={selectedRank} on:change={updateValues} class="radio radio-warning radio-sm" />
        <span>{rankLabels[0]}</span>
      </label>
      <label class="flex items-center gap-2 cursor-pointer">
        <input type="radio" name="rank" value="SS" bind:group={selectedRank} on:change={updateValues} class="radio radio-warning radio-sm" />
        <span>{rankLabels[1]}</span>
      </label>
      <label class="flex items-center gap-2 cursor-pointer">
        <input type="radio" name="rank" value="SSS" bind:group={selectedRank} on:change={updateValues} class="radio radio-warning radio-sm" />
        <span>{rankLabels[2]}</span>
      </label>
    </div>

  <div class="mt-6 p-4 bg-gray-800 rounded-lg text-white">
    <h3 class="text-lg font-semibold text-cyan-400">AR Recovery</h3>
    <p>Initial AR = {initialAR}</p>
    <p>AR after Stellar Outburst = {postSOAR}</p>
    {#if extraregen && extraregen.length > 0}
        <div>

            <ul>
                {#each extraregen as regen}
                    <li>{regen.description}</li>
                {/each}
            </ul>
        </div>
    {/if}
  </div>


    <!-- Cumulative Buffs Section -->
    <div class="mt-6 p-4 bg-gray-800 rounded-lg text-white">
      <h3 class="text-lg font-semibold text-cyan-400 mb-4">Valkyrie Buffs (Simplified)</h3>



      <div class="flex mt-4 gap-4 flex-col sm:flex-row">

        <div class="  text-white rounded-lg text-left border border-white z-2 " id="totalphy">
          <p class=" bg-amber-700 text-center rounded-t-lg px-2">Physical DMG</p>
          <div class="bg-slate-800 text-white mt-1 mb-2 py-1 px-3 rounded">
          <span class="bg-emerald-800 rounded px-2  mr-1">AC</span> 

          x{ 
          parseFloat( 
          (
            (1+((cumulativeBuffs.tdm + cumulativeBuffs.actdm) / 100)) *
            (1+((cumulativeBuffs.tdmtaken + cumulativeBuffs.actdmtaken) / 100)) *
            (1+((cumulativeBuffs.phy + cumulativeBuffs.acphy) / 100)) *
            (1+((cumulativeBuffs.phytaken + cumulativeBuffs.acphytaken) / 100))
            ).toFixed(3)
          )
          }

          {#if cumulativeBuffs.condtdm > 0 || cumulativeBuffs.condtdmtaken > 0}
          - x{ 
            parseFloat( 
            (
              (1+((cumulativeBuffs.tdm + cumulativeBuffs.actdm + cumulativeBuffs.condtdm) / 100)) *
              (1+((cumulativeBuffs.tdmtaken + cumulativeBuffs.actdmtaken + cumulativeBuffs.condtdmtaken) / 100)) *
              (1+((cumulativeBuffs.phy + cumulativeBuffs.acphy) / 100)) *
              (1+((cumulativeBuffs.phytaken + cumulativeBuffs.acphytaken) / 100))
              ).toFixed(3)
            )
          }

          {/if}
        </div>

        <div class="bg-slate-800 text-white mt-1 mb-2 px-3 py-1 rounded">
          <span class="bg-sky-800 rounded px-2 text-bold  mr-1">SO</span>

          x{ 
        parseFloat( 
        (
          (1+((cumulativeBuffs.tdm + cumulativeBuffs.sotdm) / 100)) *
          (1+((cumulativeBuffs.tdmtaken + cumulativeBuffs.sotdmtaken) / 100)) *
          (1+((cumulativeBuffs.phy + cumulativeBuffs.sophy) / 100)) *
          (1+((cumulativeBuffs.phytaken + cumulativeBuffs.sophytaken) / 100))
          ).toFixed(3)
        )
        }

{#if cumulativeBuffs.condtdm > 0 || cumulativeBuffs.condtdmtaken > 0}
- x{ 
  parseFloat( 
  (
    (1+((cumulativeBuffs.tdm + cumulativeBuffs.sotdm + cumulativeBuffs.condtdm) / 100)) *
    (1+((cumulativeBuffs.tdmtaken + cumulativeBuffs.sotdmtaken + cumulativeBuffs.condtdmtaken) / 100)) *
    (1+((cumulativeBuffs.phy + cumulativeBuffs.sophy) / 100)) *
    (1+((cumulativeBuffs.phytaken + cumulativeBuffs.sophytaken) / 100))
    ).toFixed(3)
  )
}

{/if}
        </div>
        {#if slots.leader.astralRing == "World Star"}

        <div class="bg-slate-800 text-white mt-1 mb-2 px-3 py-1 rounded">
          <span class="bg-sky-800 rounded px-2 text-bold  mr-1">Reso</span>

          x{ 
            parseFloat( 
            (
              (1+((cumulativeBuffs.tdm + cumulativeBuffs.sotdm + cumulativeBuffs.resotdm) / 100)) *
              (1+((cumulativeBuffs.tdmtaken + cumulativeBuffs.sotdmtaken) / 100)) *
              (1+((cumulativeBuffs.phy + cumulativeBuffs.sophy) / 100)) *
              (1+((cumulativeBuffs.phytaken + cumulativeBuffs.sophytaken) / 100)) *
              (1+((cumulativeBuffs.resotdm) / 100))
              ).toFixed(3)
            )
            }
{#if cumulativeBuffs.condtdm > 0 || cumulativeBuffs.condtdmtaken > 0}
- x{ 
  parseFloat( 
  (
    (1+((cumulativeBuffs.tdm + cumulativeBuffs.sotdm + cumulativeBuffs.condtdm + cumulativeBuffs.resotdm) / 100)) *
    (1+((cumulativeBuffs.tdmtaken + cumulativeBuffs.sotdmtaken + cumulativeBuffs.condtdmtaken) / 100)) *
    (1+((cumulativeBuffs.phy + cumulativeBuffs.sophy) / 100)) *
    (1+((cumulativeBuffs.phytaken + cumulativeBuffs.sophytaken) / 100))
    ).toFixed(3)
  )
}

{/if}
        </div>
        {/if}

        {#if slots.leader.astralRing == "Wheel of Destiny"}

        <div class="bg-slate-800 text-white mt-1 mb-2 px-3 py-1 rounded">
          <span class="bg-sky-800 rounded px-2 text-bold mr-1">Shadow</span>

          x{ 
            parseFloat( 
            (
              (1+((cumulativeBuffs.tdm + cumulativeBuffs.sotdm) / 100)) *
              (1+((cumulativeBuffs.tdmtaken + cumulativeBuffs.sotdmtaken + cumulativeBuffs.shadowtdmtaken) / 100)) *
              (1+((cumulativeBuffs.phy + cumulativeBuffs.sophy) / 100)) *
              (1+((cumulativeBuffs.phytaken + cumulativeBuffs.sophytaken) / 100)) 
              ).toFixed(3)
            )
            }
{#if cumulativeBuffs.condtdm > 0 || cumulativeBuffs.condtdmtaken > 0}
- x{ 
  parseFloat( 
  (
    (1+((cumulativeBuffs.tdm + cumulativeBuffs.sotdm + cumulativeBuffs.condtdm) / 100)) *
    (1+((cumulativeBuffs.tdmtaken + cumulativeBuffs.sotdmtaken + cumulativeBuffs.condtdmtaken + cumulativeBuffs.shadowtdmtaken) / 100)) *
    (1+((cumulativeBuffs.phy + cumulativeBuffs.sophy) / 100)) *
    (1+((cumulativeBuffs.phytaken + cumulativeBuffs.sophytaken) / 100)) 
    ).toFixed(3)
  )
}

{/if}
        </div>
        {/if}
        

{#if cumulativeBuffs.critdmg > 0}
<div class="px-2 ml-1 text-white text-left rounded w-fit" id="critdmg">
      Crit DMG +{(cumulativeBuffs.critdmg)}%
</div>
{/if}

{#if cumulativeBuffs.crate > 0}
<div class="px-2 m-1 mb-3 text-white text-left rounded w-fit" id="critrate">
      Crit Rate +{(cumulativeBuffs.crate)}%
</div>
{/if}


      </div>

      <div class="  text-white rounded-lg text-left border border-white  z-2 " id="totallightning">
        <p class=" bg-violet-700 text-center rounded-t-lg px-2 ">Lightning DMG</p>


        <div class="bg-slate-800 text-white mt-1 mb-2 py-1 px-3 rounded">
            <span class="bg-emerald-800 rounded px-2  mr-1">AC</span> 
          x{ 
          parseFloat( 
          (
            (1+((cumulativeBuffs.tdm + cumulativeBuffs.actdm) / 100)) *
            (1+((cumulativeBuffs.tdmtaken + cumulativeBuffs.actdmtaken) / 100)) *
            (1+((cumulativeBuffs.lightning + cumulativeBuffs.aclightning + cumulativeBuffs.ele + cumulativeBuffs.acele) / 100)) *
            (1+((cumulativeBuffs.lightningtaken + cumulativeBuffs.aclightningtaken + cumulativeBuffs.eletaken + cumulativeBuffs.aceletaken) / 100))
            ).toFixed(3)
          )
          }

{#if cumulativeBuffs.condtdm > 0 || cumulativeBuffs.condtdmtaken > 0}
- x{ 
  parseFloat( 
  (
    (1+((cumulativeBuffs.tdm + cumulativeBuffs.actdm + cumulativeBuffs.condtdm) / 100)) *
    (1+((cumulativeBuffs.tdmtaken + cumulativeBuffs.actdmtaken + cumulativeBuffs.condtdmtaken) / 100)) *
    (1+((cumulativeBuffs.lightning + cumulativeBuffs.aclightning) / 100)) *
    (1+((cumulativeBuffs.lightningtaken + cumulativeBuffs.aclightningtaken) / 100))
    ).toFixed(3)
  )
}

{/if}

        </div>
        <div class="bg-slate-800 text-white mt-1 mb-2 py-1 px-3 rounded">
          <span class="bg-sky-800 rounded px-2 text-bold  mr-1">SO</span>

          x{ 
        parseFloat( 
        (
          (1+((cumulativeBuffs.tdm + cumulativeBuffs.sotdm) / 100)) *
          (1+((cumulativeBuffs.tdmtaken + cumulativeBuffs.sotdmtaken) / 100)) *
          (1+((cumulativeBuffs.lightning + cumulativeBuffs.solightning + cumulativeBuffs.ele + cumulativeBuffs.soele) / 100)) *
          (1+((cumulativeBuffs.lightningtaken + cumulativeBuffs.solightningtaken + cumulativeBuffs.eletaken + cumulativeBuffs.soeletaken) / 100))
          ).toFixed(3)
        )
        }

{#if cumulativeBuffs.condtdm > 0 || cumulativeBuffs.condtdmtaken > 0}
- x{ 
  parseFloat( 
  (
    (1+((cumulativeBuffs.tdm + cumulativeBuffs.sotdm + cumulativeBuffs.condtdm) / 100)) *
    (1+((cumulativeBuffs.tdmtaken + cumulativeBuffs.sotdmtaken + cumulativeBuffs.condtdmtaken) / 100)) *
    (1+((cumulativeBuffs.lightning + cumulativeBuffs.solightning) / 100)) *
    (1+((cumulativeBuffs.lightningtaken + cumulativeBuffs.solightningtaken) / 100))
    ).toFixed(3)
  )
}

{/if}
        </div>

        {#if slots.leader.astralRing == "World Star"}

        <div class="bg-slate-800 text-white mt-1 mb-2 px-3 py-1 rounded">
          <span class="bg-sky-800 rounded px-2 text-bold  mr-1">Reso</span>

          x{ 
            parseFloat( 
            (
              (1+((cumulativeBuffs.tdm + cumulativeBuffs.sotdm + cumulativeBuffs.resotdm) / 100)) *
          (1+((cumulativeBuffs.tdmtaken + cumulativeBuffs.sotdmtaken) / 100)) *
          (1+((cumulativeBuffs.lightning + cumulativeBuffs.solightning + cumulativeBuffs.ele + cumulativeBuffs.soele) / 100)) *
          (1+((cumulativeBuffs.lightningtaken + cumulativeBuffs.solightningtaken + cumulativeBuffs.eletaken + cumulativeBuffs.soeletaken) / 100)) 
              ).toFixed(3)
            )
            }
{#if cumulativeBuffs.condtdm > 0 || cumulativeBuffs.condtdmtaken > 0}
- x{ 
  parseFloat( 
  (
    (1+((cumulativeBuffs.tdm + cumulativeBuffs.sotdm + cumulativeBuffs.condtdm + cumulativeBuffs.resotdm) / 100)) *
    (1+((cumulativeBuffs.tdmtaken + cumulativeBuffs.sotdmtaken + cumulativeBuffs.condtdmtaken) / 100)) *
    (1+((cumulativeBuffs.lightning + cumulativeBuffs.solightning) / 100)) *
    (1+((cumulativeBuffs.lightningtaken + cumulativeBuffs.solightningtaken) / 100)) 
    ).toFixed(3)
  )
}

{/if}


        </div>
        {/if}

        {#if slots.leader.astralRing == "Wheel of Destiny"}

        <div class="bg-slate-800 text-white mt-1 mb-2 px-3 py-1 rounded">
          <span class="bg-sky-800 rounded px-2 text-bold mr-1">Shadow</span>

          x{ 
            parseFloat( 
            (
              (1+((cumulativeBuffs.tdm + cumulativeBuffs.sotdm) / 100)) *
          (1+((cumulativeBuffs.tdmtaken + cumulativeBuffs.sotdmtaken + cumulativeBuffs.shadowtdmtaken) / 100)) *
          (1+((cumulativeBuffs.lightning + cumulativeBuffs.solightning + cumulativeBuffs.ele + cumulativeBuffs.soele) / 100)) *
          (1+((cumulativeBuffs.lightningtaken + cumulativeBuffs.solightningtaken + cumulativeBuffs.eletaken + cumulativeBuffs.soeletaken) / 100)) 

              ).toFixed(3)
            )
            }
{#if cumulativeBuffs.condtdm > 0 || cumulativeBuffs.condtdmtaken > 0}
- x{ 
  parseFloat( 
  (
    (1+((cumulativeBuffs.tdm + cumulativeBuffs.sotdm + cumulativeBuffs.condtdm) / 100)) *
    (1+((cumulativeBuffs.tdmtaken + cumulativeBuffs.sotdmtaken + cumulativeBuffs.condtdmtaken + cumulativeBuffs.shadowtdmtaken) / 100)) *
    (1+((cumulativeBuffs.lightning + cumulativeBuffs.solightning) / 100)) *
    (1+((cumulativeBuffs.lightningtaken + cumulativeBuffs.solightningtaken) / 100))
    ).toFixed(3)
  )
}

{/if}
        </div>
        {/if}
      </div>

      <div class="  text-white rounded-lg text-left border border-white z-2 " id="totalice">
        <p class=" bg-blue-700 text-center rounded-t-lg px-2">Ice DMG</p>

        <div class="bg-slate-800 text-white mt-1 mb-2 py-1 px-3 rounded">
          <span class="bg-emerald-800 rounded px-2  mr-1">AC</span> 

          x{ 
          parseFloat( 
          (
            (1+((cumulativeBuffs.tdm + cumulativeBuffs.actdm) / 100)) *
            (1+((cumulativeBuffs.tdmtaken + cumulativeBuffs.actdmtaken) / 100)) *
            (1+((cumulativeBuffs.ice + cumulativeBuffs.acice + cumulativeBuffs.ele + cumulativeBuffs.acele) / 100)) *
            (1+((cumulativeBuffs.icetaken + cumulativeBuffs.acicetaken + cumulativeBuffs.eletaken + cumulativeBuffs.aceletaken) / 100))
            ).toFixed(3)
          )
          }
          {#if cumulativeBuffs.condtdm > 0 || cumulativeBuffs.condtdmtaken > 0}
          - x{ 
            parseFloat( 
            (
              (1+((cumulativeBuffs.tdm + cumulativeBuffs.actdm + cumulativeBuffs.condtdm) / 100)) *
              (1+((cumulativeBuffs.tdmtaken + cumulativeBuffs.actdmtaken + cumulativeBuffs.condtdmtaken) / 100)) *
              (1+((cumulativeBuffs.ice + cumulativeBuffs.acice) / 100)) *
              (1+((cumulativeBuffs.icetaken + cumulativeBuffs.acicetaken) / 100))
              ).toFixed(3)
            )
          }
          {/if}
        </div>
        <div class="bg-slate-800 text-white mt-1 mb-2 py-1 px-3 rounded">
          <span class="bg-sky-800 rounded px-2 text-bold  mr-1">SO</span>

          x{ 
        parseFloat( 
        (
          (1+((cumulativeBuffs.tdm + cumulativeBuffs.sotdm) / 100)) *
          (1+((cumulativeBuffs.tdmtaken + cumulativeBuffs.sotdmtaken) / 100)) *
          (1+((cumulativeBuffs.ice + cumulativeBuffs.soice + cumulativeBuffs.ele + cumulativeBuffs.soele) / 100)) *
          (1+((cumulativeBuffs.icetaken + cumulativeBuffs.soicetaken + cumulativeBuffs.eletaken + cumulativeBuffs.soeletaken) / 100))
          ).toFixed(3)
        )
        }

{#if cumulativeBuffs.condtdm > 0 || cumulativeBuffs.condtdmtaken > 0}
- x{ 
  parseFloat( 
  (
    (1+((cumulativeBuffs.tdm + cumulativeBuffs.sotdm + cumulativeBuffs.condtdm) / 100)) *
    (1+((cumulativeBuffs.tdmtaken + cumulativeBuffs.sotdmtaken + cumulativeBuffs.condtdmtaken) / 100)) *
    (1+((cumulativeBuffs.ice + cumulativeBuffs.soice) / 100)) *
    (1+((cumulativeBuffs.icetaken + cumulativeBuffs.soicetaken) / 100))
    ).toFixed(3)
  )
}
{/if}
        </div>

        {#if slots.leader.astralRing == "World Star"}

        <div class="bg-slate-800 text-white mt-1 mb-2 px-3 py-1 rounded">
          <span class="bg-sky-800 rounded px-2 text-bold  mr-1">Reso</span>

          x{ 
            parseFloat( 
            (
              (1+((cumulativeBuffs.tdm + cumulativeBuffs.sotdm + cumulativeBuffs.resotdm) / 100)) *
          (1+((cumulativeBuffs.tdmtaken + cumulativeBuffs.sotdmtaken) / 100)) *
          (1+((cumulativeBuffs.ice + cumulativeBuffs.soice + cumulativeBuffs.ele + cumulativeBuffs.soele) / 100)) *
          (1+((cumulativeBuffs.icetaken + cumulativeBuffs.soicetaken + cumulativeBuffs.eletaken + cumulativeBuffs.soeletaken) / 100)) 
              ).toFixed(3)
            )
            }
{#if cumulativeBuffs.condtdm > 0 || cumulativeBuffs.condtdmtaken > 0}
- x{ 
  parseFloat( 
  (
    (1+((cumulativeBuffs.tdm + cumulativeBuffs.sotdm + cumulativeBuffs.condtdm + cumulativeBuffs.resotdm) / 100)) *
    (1+((cumulativeBuffs.tdmtaken + cumulativeBuffs.sotdmtaken + cumulativeBuffs.condtdmtaken) / 100)) *
    (1+((cumulativeBuffs.ice + cumulativeBuffs.soice) / 100)) *
    (1+((cumulativeBuffs.icetaken + cumulativeBuffs.soicetaken) / 100)) 
    ).toFixed(3)
  )
}
{/if}
        </div>
        {/if}

        {#if slots.leader.astralRing == "Wheel of Destiny"}

        <div class="bg-slate-800 text-white mt-1 mb-2 px-3 py-1 rounded">
          <span class="bg-sky-800 rounded px-2 text-bold mr-1">Shadow</span>

          x{ 
            parseFloat( 
            (
              (1+((cumulativeBuffs.tdm + cumulativeBuffs.sotdm) / 100)) *
          (1+((cumulativeBuffs.tdmtaken + cumulativeBuffs.sotdmtaken + cumulativeBuffs.shadowtdmtaken) / 100)) *
          (1+((cumulativeBuffs.ice + cumulativeBuffs.soice + cumulativeBuffs.ele + cumulativeBuffs.soele) / 100)) *
          (1+((cumulativeBuffs.icetaken + cumulativeBuffs.soicetaken + cumulativeBuffs.eletaken + cumulativeBuffs.soeletaken) / 100))
              ).toFixed(3)
            )
            }

{#if cumulativeBuffs.condtdm > 0 || cumulativeBuffs.condtdmtaken > 0}
- x{ 
  parseFloat( 
  (
    (1+((cumulativeBuffs.tdm + cumulativeBuffs.sotdm + cumulativeBuffs.condtdm) / 100)) *
    (1+((cumulativeBuffs.tdmtaken + cumulativeBuffs.sotdmtaken + cumulativeBuffs.condtdmtaken + cumulativeBuffs.shadowtdmtaken) / 100)) *
    (1+((cumulativeBuffs.ice + cumulativeBuffs.soice) / 100)) *
    (1+((cumulativeBuffs.icetaken + cumulativeBuffs.soicetaken) / 100)) 

    ).toFixed(3)
  )
}
{/if}

        </div>
        {/if}
      </div>

      <div class="  text-white rounded-lg text-left border border-white z-2 " id="totalfire">
        <p class=" bg-red-700 text-center rounded-t-lg px-2">Fire DMG</p>
        <div class="bg-slate-800 text-white mt-1 mb-2 py-1 px-3 rounded">
          <span class="bg-emerald-800 rounded px-2  mr-1">AC</span> 

    
          x{ 
          parseFloat( 
          (
            (1+((cumulativeBuffs.tdm + cumulativeBuffs.actdm) / 100)) *
            (1+((cumulativeBuffs.tdmtaken + cumulativeBuffs.actdmtaken) / 100)) *
            (1+((cumulativeBuffs.fire + cumulativeBuffs.acfire + cumulativeBuffs.ele + cumulativeBuffs.acele) / 100)) *
            (1+((cumulativeBuffs.firetaken + cumulativeBuffs.acfiretaken + cumulativeBuffs.eletaken + cumulativeBuffs.aceletaken) / 100))
            ).toFixed(3)
          )
          }

{#if cumulativeBuffs.condtdm > 0 || cumulativeBuffs.condtdmtaken > 0}
- x{ 
  parseFloat( 
  (
    (1+((cumulativeBuffs.tdm + cumulativeBuffs.actdm + cumulativeBuffs.condtdm) / 100)) *
    (1+((cumulativeBuffs.tdmtaken + cumulativeBuffs.actdmtaken + cumulativeBuffs.condtdmtaken) / 100)) *
    (1+((cumulativeBuffs.fire + cumulativeBuffs.acfire) / 100)) *
    (1+((cumulativeBuffs.firetaken + cumulativeBuffs.acfiretaken) / 100))
    ).toFixed(3)
  )
}
{/if}
        </div>
        <div class="bg-slate-800 text-white mt-1 mb-2 py-1 px-3 rounded">
          <span class="bg-sky-800 rounded px-2 text-bold  mr-1">SO</span>
          
          x{ 
        parseFloat( 
        (
          (1+((cumulativeBuffs.tdm + cumulativeBuffs.sotdm) / 100)) *
          (1+((cumulativeBuffs.tdmtaken + cumulativeBuffs.sotdmtaken) / 100)) *
          (1+((cumulativeBuffs.fire + cumulativeBuffs.sofire + cumulativeBuffs.ele + cumulativeBuffs.soele) / 100)) *
          (1+((cumulativeBuffs.firetaken + cumulativeBuffs.sofiretaken + cumulativeBuffs.eletaken + cumulativeBuffs.soeletaken) / 100))
          ).toFixed(3)
        )
        }

{#if cumulativeBuffs.condtdm > 0 || cumulativeBuffs.condtdmtaken > 0}
- x{ 
  parseFloat( 
  (
    (1+((cumulativeBuffs.tdm + cumulativeBuffs.sotdm + cumulativeBuffs.condtdm) / 100)) *
    (1+((cumulativeBuffs.tdmtaken + cumulativeBuffs.sotdmtaken + cumulativeBuffs.condtdmtaken) / 100)) *
    (1+((cumulativeBuffs.fire + cumulativeBuffs.sofire) / 100)) *
    (1+((cumulativeBuffs.firetaken + cumulativeBuffs.sofiretaken) / 100))
    ).toFixed(3)
  )
}
{/if}
        </div>

        {#if slots.leader.astralRing == "World Star"}

        <div class="bg-slate-800 text-white mt-1 mb-2 px-3 py-1 rounded">
          <span class="bg-sky-800 rounded px-2 text-bold  mr-1">Reso</span>

          x{ 
            parseFloat( 
            (
              (1+((cumulativeBuffs.tdm + cumulativeBuffs.sotdm + cumulativeBuffs.resotdm) / 100)) *
          (1+((cumulativeBuffs.tdmtaken + cumulativeBuffs.sotdmtaken) / 100)) *
          (1+((cumulativeBuffs.fire + cumulativeBuffs.sofire + cumulativeBuffs.ele + cumulativeBuffs.soele) / 100)) *
          (1+((cumulativeBuffs.firetaken + cumulativeBuffs.sofiretaken + cumulativeBuffs.eletaken + cumulativeBuffs.soeletaken) / 100))
              ).toFixed(3)
            )
            }

{#if cumulativeBuffs.condtdm > 0 || cumulativeBuffs.condtdmtaken > 0}
- x{ 
  parseFloat( 
  (
    (1+((cumulativeBuffs.tdm + cumulativeBuffs.sotdm + cumulativeBuffs.condtdm + cumulativeBuffs.resotdm) / 100)) *
    (1+((cumulativeBuffs.tdmtaken + cumulativeBuffs.sotdmtaken + cumulativeBuffs.condtdmtaken) / 100)) *
    (1+((cumulativeBuffs.fire + cumulativeBuffs.sofire) / 100)) *
    (1+((cumulativeBuffs.firetaken + cumulativeBuffs.sofiretaken) / 100)) 

    ).toFixed(3)
  )
}
{/if}

        </div>
        {/if}

        {#if slots.leader.astralRing == "Wheel of Destiny"}

        <div class="bg-slate-800 text-white mt-1 mb-2 px-3 py-1 rounded">
          <span class="bg-sky-800 rounded px-2 text-bold mr-1">Shadow</span>

          x{ 
            parseFloat( 
            (
              (1+((cumulativeBuffs.tdm + cumulativeBuffs.sotdm) / 100)) *
          (1+((cumulativeBuffs.tdmtaken + cumulativeBuffs.sotdmtaken + cumulativeBuffs.shadowtdmtaken) / 100)) *
          (1+((cumulativeBuffs.fire + cumulativeBuffs.sofire + cumulativeBuffs.ele + cumulativeBuffs.soele) / 100)) *
          (1+((cumulativeBuffs.firetaken + cumulativeBuffs.sofiretaken + cumulativeBuffs.eletaken + cumulativeBuffs.soeletaken) / 100))
              ).toFixed(3)
            )
            }
{#if cumulativeBuffs.condtdm > 0 || cumulativeBuffs.condtdmtaken > 0}
- x{ 
  parseFloat( 
  (
    (1+((cumulativeBuffs.tdm + cumulativeBuffs.sotdm + cumulativeBuffs.condtdm) / 100)) *
    (1+((cumulativeBuffs.tdmtaken + cumulativeBuffs.sotdmtaken + cumulativeBuffs.condtdmtaken + cumulativeBuffs.shadowtdmtaken) / 100)) *
    (1+((cumulativeBuffs.fire + cumulativeBuffs.sofire) / 100)) *
    (1+((cumulativeBuffs.firetaken + cumulativeBuffs.sofiretaken) / 100)) 

    ).toFixed(3)
  )
}
{/if}
        </div>
        {/if}
      </div>

    </div>



    <details class="my-details bg-base-200 rounded-md mt-4  p-2  shadow-md">
      <summary class="my-summary cursor-pointer text-base text-slate-300 hover:bg-cyan-900 hover:text-white px-2 rounded-md">
        Buff Breakdown
      </summary>
      <div>
    <ul class="space-y-2 text-gray-200 mt-2">

      {#if cumulativeBuffs.tdm > 0 || cumulativeBuffs.condtdm > 0}
        <li>
          Total DMG +{cumulativeBuffs.tdm}%{#if cumulativeBuffs.condtdm > 0} - {cumulativeBuffs.tdm + cumulativeBuffs.condtdm}%{/if}</li>
      {/if}

      {#if cumulativeBuffs.resotdm > 0 }
      <li>Resonance ATK Total DMG +{cumulativeBuffs.resotdm}%</li>
    {/if}

    {#if cumulativeBuffs.shadowtdmtaken > 0 }
    <li>Shadow Star ATK Total DMG Taken +{cumulativeBuffs.shadowtdmtaken}%</li>
  {/if}


      {#if cumulativeBuffs.tdmtaken > 0 || cumulativeBuffs.actdmtaken > 0 || cumulativeBuffs.sotdmtaken > 0 }
      <li>
  
        Total DMG Taken +{cumulativeBuffs.tdmtaken + cumulativeBuffs.actdmtaken}%

        {#if cumulativeBuffs.condtdmtaken > 0}
        - {cumulativeBuffs.tdmtaken + cumulativeBuffs.condtdmtaken + cumulativeBuffs.actdmtaken}%
      {/if}
        
        {#if cumulativeBuffs.actdmtaken !== cumulativeBuffs.sotdmtaken} 
        
         <span class="bg-emerald-800 rounded px-2">AC</span> 
        
        / +{cumulativeBuffs.tdmtaken + cumulativeBuffs.sotdmtaken}% 
        
        {#if cumulativeBuffs.condtdmtaken > 0}
        - {cumulativeBuffs.tdmtaken + cumulativeBuffs.condtdmtaken + cumulativeBuffs.sotdmtaken}%
      {/if}
        
        <span class="bg-sky-800 rounded px-2">SO</span>


        {/if}
      
      </li>
    {/if}


    {#if cumulativeBuffs.phy > 0 || cumulativeBuffs.acphy > 0 || cumulativeBuffs.sophy > 0 }
    <li>

      Physical DMG +{cumulativeBuffs.phy + cumulativeBuffs.acphy}%
      
      {#if cumulativeBuffs.acphy !== cumulativeBuffs.sophy} 
      
       <span class="bg-emerald-800 rounded px-2">AC</span> 
      
      / +{cumulativeBuffs.phy + cumulativeBuffs.sophy}% <span class="bg-sky-800 rounded px-2">SO</span>
      {/if}
    
    </li>
  {/if}

      {#if cumulativeBuffs.phytaken > 0 || cumulativeBuffs.acphytaken > 0 || cumulativeBuffs.sophytaken > 0 }
      <li>
  
        Physical DMG Taken +{cumulativeBuffs.phytaken + cumulativeBuffs.acphytaken}%
        
        {#if cumulativeBuffs.acphytaken !== cumulativeBuffs.sophytaken} 
        
         <span class="bg-emerald-800 rounded px-2">AC</span> 
        
        / +{cumulativeBuffs.phytaken + cumulativeBuffs.sophytaken}% <span class="bg-sky-800 rounded px-2">SO</span>
        {/if}
      
      </li>
    {/if}

      {#if cumulativeBuffs.critdmg > 0 || cumulativeBuffs.condcritdmg > 0}
        <li>Crit DMG +{cumulativeBuffs.critdmg}%{#if cumulativeBuffs.condcritdmg > 0} - {cumulativeBuffs.critdmg + cumulativeBuffs.condcritdmg}%{/if}</li>
      {/if}

      {#if cumulativeBuffs.crate > 0 || cumulativeBuffs.condcrate > 0}
        <li>Crit Rate +{cumulativeBuffs.crate}%{#if cumulativeBuffs.condcrate > 0} - {cumulativeBuffs.crate + cumulativeBuffs.condcrate}%{/if}</li>
      {/if}


      {#if cumulativeBuffs.lightning > 0 || cumulativeBuffs.aclightning > 0 || cumulativeBuffs.solightning > 0 || cumulativeBuffs.ele > 0 || cumulativeBuffs.acele > 0 || cumulativeBuffs.soele > 0}
      <li>
      
        Lightning DMG +{cumulativeBuffs.ele + cumulativeBuffs.acele + cumulativeBuffs.lightning + cumulativeBuffs.aclightning}%
        
      {#if cumulativeBuffs.aclightning !== cumulativeBuffs.solightning || cumulativeBuffs.acele !== cumulativeBuffs.soele} 
        
         <span class="bg-emerald-800 rounded px-2">AC</span> 
        
        / +{cumulativeBuffs.ele + cumulativeBuffs.soele + cumulativeBuffs.lightning + cumulativeBuffs.solightning}% <span class="bg-sky-800 rounded px-2">SO</span>
      {/if}
      
      </li>
      {/if}
      
      {#if cumulativeBuffs.lightningtaken > 0 || cumulativeBuffs.aclightningtaken > 0 || cumulativeBuffs.solightningtaken > 0 || cumulativeBuffs.eletaken > 0 || cumulativeBuffs.aceletaken > 0 || cumulativeBuffs.soeletaken > 0}
      <li>
      
        Lightning DMG Taken +{cumulativeBuffs.eletaken + cumulativeBuffs.aceletaken + cumulativeBuffs.lightningtaken + cumulativeBuffs.aclightningtaken}%
        
        {#if cumulativeBuffs.aclightningtaken !== cumulativeBuffs.solightningtaken || cumulativeBuffs.aceletaken !== cumulativeBuffs.soeletaken} 
        
         <span class="bg-emerald-800 rounded px-2">AC</span> 
        
        / +{cumulativeBuffs.eletaken + cumulativeBuffs.soeletaken + cumulativeBuffs.lightningtaken + cumulativeBuffs.solightningtaken}% <span class="bg-sky-800 rounded px-2">SO</span>
        {/if}
      
      </li>
      {/if}

    {#if cumulativeBuffs.fire > 0 || cumulativeBuffs.acfire > 0 || cumulativeBuffs.sofire > 0 || cumulativeBuffs.ele > 0 || cumulativeBuffs.acele > 0 || cumulativeBuffs.soele > 0}
    <li>

      Fire DMG +{cumulativeBuffs.ele + cumulativeBuffs.acele + cumulativeBuffs.fire + cumulativeBuffs.acfire}%
      
  {#if cumulativeBuffs.acfire !== cumulativeBuffs.sofire || cumulativeBuffs.acele !== cumulativeBuffs.soele} 
      
       <span class="bg-emerald-800 rounded px-2">AC</span> 
      
      / +{cumulativeBuffs.ele + cumulativeBuffs.soele + cumulativeBuffs.fire + cumulativeBuffs.sofire}% <span class="bg-sky-800 rounded px-2">SO</span>
  {/if}
    
    </li>
  {/if}

  {#if cumulativeBuffs.firetaken > 0 || cumulativeBuffs.acfiretaken > 0 || cumulativeBuffs.sofiretaken > 0 || cumulativeBuffs.eletaken > 0 || cumulativeBuffs.aceletaken > 0 || cumulativeBuffs.soeletaken > 0}
    <li>

      Fire DMG Taken +{cumulativeBuffs.eletaken + cumulativeBuffs.aceletaken + cumulativeBuffs.firetaken + cumulativeBuffs.acfiretaken}%
      
      {#if cumulativeBuffs.acfiretaken !== cumulativeBuffs.sofiretaken || cumulativeBuffs.aceletaken !== cumulativeBuffs.soeletaken} 
      
       <span class="bg-emerald-800 rounded px-2">AC</span> 
      
      / +{cumulativeBuffs.eletaken + cumulativeBuffs.soeletaken + cumulativeBuffs.firetaken + cumulativeBuffs.sofiretaken}% <span class="bg-sky-800 rounded px-2">SO</span>
      {/if}
    
    </li>
  {/if}

  {#if cumulativeBuffs.ice > 0 || cumulativeBuffs.acice > 0 || cumulativeBuffs.soice > 0 || cumulativeBuffs.ele > 0 || cumulativeBuffs.acele > 0 || cumulativeBuffs.soele > 0}
  <li>
  
    Ice DMG +{cumulativeBuffs.ele + cumulativeBuffs.acele + cumulativeBuffs.ice + cumulativeBuffs.acice}%
    
  {#if cumulativeBuffs.acice !== cumulativeBuffs.soice || cumulativeBuffs.acele !== cumulativeBuffs.soele} 
    
     <span class="bg-emerald-800 rounded px-2">AC</span> 
    
    / +{cumulativeBuffs.ele + cumulativeBuffs.soele + cumulativeBuffs.ice + cumulativeBuffs.soice}% <span class="bg-sky-800 rounded px-2">SO</span>
  {/if}
  
  </li>
  {/if}
  
  {#if cumulativeBuffs.icetaken > 0 || cumulativeBuffs.acicetaken > 0 || cumulativeBuffs.soicetaken > 0 || cumulativeBuffs.eletaken > 0 || cumulativeBuffs.aceletaken > 0 || cumulativeBuffs.soeletaken > 0}
  <li>
  
    Ice DMG Taken +{cumulativeBuffs.eletaken + cumulativeBuffs.aceletaken + cumulativeBuffs.icetaken + cumulativeBuffs.acicetaken}%
    
    {#if cumulativeBuffs.acicetaken !== cumulativeBuffs.soicetaken || cumulativeBuffs.aceletaken !== cumulativeBuffs.soeletaken} 
    
     <span class="bg-emerald-800 rounded px-2">AC</span> 
    
    / +{cumulativeBuffs.eletaken + cumulativeBuffs.soeletaken + cumulativeBuffs.icetaken + cumulativeBuffs.soicetaken}% <span class="bg-sky-800 rounded px-2">SO</span>
    {/if}
  
  </li>
  {/if}


    </ul>
  </div>
</details>
    </div>

  <!-- Valkyrie Buffs Section -->
  <div class="mt-6 p-4 bg-gray-800 rounded-lg text-white">
    <h3 class="text-lg font-semibold text-cyan-400">Valkyrie Buffs (Detailed)</h3>
    <ul class="space-y-2 mt-2">
      {#each processedValkBuffs as buff}
        <li class="p-2 bg-gray-700 rounded-md">
          <strong>{displayRank(buff.rank)}</strong>: {@html buff.description}
        </li>
      {/each}
    </ul>
  </div>



  <!-- AstralOp Buffs Section -->
  <div class="mt-6 p-4 bg-gray-800 rounded-lg text-white">
    <h3 class="text-lg font-semibold text-cyan-400">AstralOp Buffs</h3>
    <ul class="space-y-2 mt-2">
      {#each processedAsopBuffs as buff}
        <li class="p-2 bg-gray-700 rounded-md">
          <strong>{displayRank(buff.rank)}</strong>: {@html buff.description}
        </li>
      {/each}
    </ul>
  </div>
  </div>


  {#if slots.compareAstralOp}
  <div class="flex-1">
    <!-- Rank Selection for Compare -->

<div class="text-teal-300 text-center font-bold rounded mt-3 text-lg"> {slots.compareAstralOp.name}</div>
    <div class="flex justify-center items-center mt-4 text-white text-center space-x-4 ">
      <label class="flex items-center gap-2 cursor-pointer">
        <input type="radio" name="compareRank" value="S"  bind:group={compareSelectedRank} on:change={updateCompareValues} class="radio radio-accent radio-sm" />
        <span>{rankLabelscompare[0]}</span>
      </label>
      <label class="flex items-center gap-2 cursor-pointer">
        <input type="radio" name="compareRank" value="SS" bind:group={compareSelectedRank} on:change={updateCompareValues} class="radio radio-accent radio-sm" />
        <span>{rankLabelscompare[1]}</span>
      </label>
      <label class="flex items-center gap-2 cursor-pointer">
        <input type="radio" name="compareRank" value="SSS" bind:group={compareSelectedRank} on:change={updateCompareValues} class="radio radio-accent radio-sm" />
        <span>{rankLabelscompare[2]}</span>
      </label>
    </div>

  <div class="mt-6 p-4 bg-cyan-950/50 rounded-lg text-white">
    <h3 class="text-lg font-semibold text-cyan-400">AR Recovery</h3>
    <p>Initial AR = {compareInitialAR}</p>
    <p>AR after Stellar Outburst = {comparePostSOAR}</p>
    {#if compareextraregen && compareextraregen.length > 0}
    <div>

        <ul>
            {#each compareextraregen as regen}
                <li>{regen.description}</li>
            {/each}
        </ul>
    </div>
{/if}
  </div>


    <!-- Cumulative Buffs Section -->
    <div class="mt-6 p-4 bg-cyan-950/50  rounded-lg text-white">
      <h3 class="text-lg font-semibold text-cyan-400 mb-4">Valkyrie Buffs (Simplified)</h3>


      <div class="flex mt-4 gap-4 flex-col sm:flex-row">

        <div class="  text-white rounded-lg text-left border border-white z-2 " id="totalphy">
          <p class=" bg-amber-700 text-center rounded-t-lg px-2">Physical DMG</p>
          <div class="bg-slate-800 text-white mt-1 mb-2 py-1 px-3 rounded">
          <span class="bg-emerald-800 rounded px-2  mr-1">AC</span> 

          x{ 
          parseFloat( 
          (
            (1+((compareCumulativeBuffs.tdm + compareCumulativeBuffs.actdm) / 100)) *
            (1+((compareCumulativeBuffs.tdmtaken + compareCumulativeBuffs.actdmtaken) / 100)) *
            (1+((compareCumulativeBuffs.phy + compareCumulativeBuffs.acphy) / 100)) *
            (1+((compareCumulativeBuffs.phytaken + compareCumulativeBuffs.acphytaken) / 100))
            ).toFixed(3)
          )
          }

          {#if compareCumulativeBuffs.condtdm > 0 || compareCumulativeBuffs.condtdmtaken > 0}
          - x{ 
            parseFloat( 
            (
              (1+((compareCumulativeBuffs.tdm + compareCumulativeBuffs.actdm + compareCumulativeBuffs.condtdm) / 100)) *
              (1+((compareCumulativeBuffs.tdmtaken + compareCumulativeBuffs.actdmtaken + compareCumulativeBuffs.condtdmtaken) / 100)) *
              (1+((compareCumulativeBuffs.phy + compareCumulativeBuffs.acphy) / 100)) *
              (1+((compareCumulativeBuffs.phytaken + compareCumulativeBuffs.acphytaken) / 100))
              ).toFixed(3)
            )
          }

          {/if}
        </div>

        <div class="bg-slate-800 text-white mt-1 mb-2 px-3 py-1 rounded">
          <span class="bg-sky-800 rounded px-2 text-bold  mr-1">SO</span>

          x{ 
        parseFloat( 
        (
          (1+((compareCumulativeBuffs.tdm + compareCumulativeBuffs.sotdm) / 100)) *
          (1+((compareCumulativeBuffs.tdmtaken + compareCumulativeBuffs.sotdmtaken) / 100)) *
          (1+((compareCumulativeBuffs.phy + compareCumulativeBuffs.sophy) / 100)) *
          (1+((compareCumulativeBuffs.phytaken + compareCumulativeBuffs.sophytaken) / 100))
          ).toFixed(3)
        )
        }

{#if compareCumulativeBuffs.condtdm > 0 || compareCumulativeBuffs.condtdmtaken > 0}
- x{ 
  parseFloat( 
  (
    (1+((compareCumulativeBuffs.tdm + compareCumulativeBuffs.sotdm + compareCumulativeBuffs.condtdm) / 100)) *
    (1+((compareCumulativeBuffs.tdmtaken + compareCumulativeBuffs.sotdmtaken + compareCumulativeBuffs.condtdmtaken) / 100)) *
    (1+((compareCumulativeBuffs.phy + compareCumulativeBuffs.sophy) / 100)) *
    (1+((compareCumulativeBuffs.phytaken + compareCumulativeBuffs.sophytaken) / 100))
    ).toFixed(3)
  )
}

{/if}
        </div>
        {#if slots.leader.astralRing == "World Star"}

        <div class="bg-slate-800 text-white mt-1 mb-2 px-3 py-1 rounded">
          <span class="bg-sky-800 rounded px-2 text-bold  mr-1">Reso</span>

          x{ 
            parseFloat( 
            (
              (1+((compareCumulativeBuffs.tdm + compareCumulativeBuffs.sotdm + compareCumulativeBuffs.resotdm) / 100)) *
              (1+((compareCumulativeBuffs.tdmtaken + compareCumulativeBuffs.sotdmtaken) / 100)) *
              (1+((compareCumulativeBuffs.phy + compareCumulativeBuffs.sophy) / 100)) *
              (1+((compareCumulativeBuffs.phytaken + compareCumulativeBuffs.sophytaken) / 100)) *
              (1+((compareCumulativeBuffs.resotdm) / 100))
              ).toFixed(3)
            )
            }
{#if compareCumulativeBuffs.condtdm > 0 || compareCumulativeBuffs.condtdmtaken > 0}
- x{ 
  parseFloat( 
  (
    (1+((compareCumulativeBuffs.tdm + compareCumulativeBuffs.sotdm + compareCumulativeBuffs.condtdm + compareCumulativeBuffs.resotdm) / 100)) *
    (1+((compareCumulativeBuffs.tdmtaken + compareCumulativeBuffs.sotdmtaken + compareCumulativeBuffs.condtdmtaken) / 100)) *
    (1+((compareCumulativeBuffs.phy + compareCumulativeBuffs.sophy) / 100)) *
    (1+((compareCumulativeBuffs.phytaken + compareCumulativeBuffs.sophytaken) / 100))
    ).toFixed(3)
  )
}

{/if}
        </div>
        {/if}

        {#if slots.leader.astralRing == "Wheel of Destiny"}

        <div class="bg-slate-800 text-white mt-1 mb-2 px-3 py-1 rounded">
          <span class="bg-sky-800 rounded px-2 text-bold mr-1">Shadow</span>

          x{ 
            parseFloat( 
            (
              (1+((compareCumulativeBuffs.tdm + compareCumulativeBuffs.sotdm) / 100)) *
              (1+((compareCumulativeBuffs.tdmtaken + compareCumulativeBuffs.sotdmtaken + compareCumulativeBuffs.shadowtdmtaken) / 100)) *
              (1+((compareCumulativeBuffs.phy + compareCumulativeBuffs.sophy) / 100)) *
              (1+((compareCumulativeBuffs.phytaken + compareCumulativeBuffs.sophytaken) / 100)) 
              ).toFixed(3)
            )
            }
{#if compareCumulativeBuffs.condtdm > 0 || compareCumulativeBuffs.condtdmtaken > 0}
- x{ 
  parseFloat( 
  (
    (1+((compareCumulativeBuffs.tdm + compareCumulativeBuffs.sotdm + compareCumulativeBuffs.condtdm) / 100)) *
    (1+((compareCumulativeBuffs.tdmtaken + compareCumulativeBuffs.sotdmtaken + compareCumulativeBuffs.condtdmtaken + compareCumulativeBuffs.shadowtdmtaken) / 100)) *
    (1+((compareCumulativeBuffs.phy + compareCumulativeBuffs.sophy) / 100)) *
    (1+((compareCumulativeBuffs.phytaken + compareCumulativeBuffs.sophytaken) / 100)) 
    ).toFixed(3)
  )
}

{/if}
        </div>
        {/if}
        

{#if compareCumulativeBuffs.critdmg > 0}
<div class="px-2 ml-1 text-white text-left rounded w-fit" id="critdmg">
      Crit DMG +{(compareCumulativeBuffs.critdmg)}%
</div>
{/if}

{#if compareCumulativeBuffs.crate > 0}
<div class="px-2 m-1 mb-3 text-white text-left rounded w-fit" id="critrate">
      Crit Rate +{(compareCumulativeBuffs.crate)}%
</div>
{/if}


      </div>

      <div class="  text-white rounded-lg text-left border border-white  z-2 " id="totallightning">
        <p class=" bg-violet-700 text-center rounded-t-lg px-2 ">Lightning DMG</p>


        <div class="bg-slate-800 text-white mt-1 mb-2 py-1 px-3 rounded">
            <span class="bg-emerald-800 rounded px-2  mr-1">AC</span> 
          x{ 
          parseFloat( 
          (
            (1+((compareCumulativeBuffs.tdm + compareCumulativeBuffs.actdm) / 100)) *
            (1+((compareCumulativeBuffs.tdmtaken + compareCumulativeBuffs.actdmtaken) / 100)) *
            (1+((compareCumulativeBuffs.lightning + compareCumulativeBuffs.aclightning + compareCumulativeBuffs.ele + compareCumulativeBuffs.acele) / 100)) *
            (1+((compareCumulativeBuffs.lightningtaken + compareCumulativeBuffs.aclightningtaken + compareCumulativeBuffs.eletaken + compareCumulativeBuffs.aceletaken) / 100))
            ).toFixed(3)
          )
          }

{#if compareCumulativeBuffs.condtdm > 0 || compareCumulativeBuffs.condtdmtaken > 0}
- x{ 
  parseFloat( 
  (
    (1+((compareCumulativeBuffs.tdm + compareCumulativeBuffs.actdm + compareCumulativeBuffs.condtdm) / 100)) *
    (1+((compareCumulativeBuffs.tdmtaken + compareCumulativeBuffs.actdmtaken + compareCumulativeBuffs.condtdmtaken) / 100)) *
    (1+((compareCumulativeBuffs.lightning + compareCumulativeBuffs.aclightning) / 100)) *
    (1+((compareCumulativeBuffs.lightningtaken + compareCumulativeBuffs.aclightningtaken) / 100))
    ).toFixed(3)
  )
}

{/if}

        </div>
        <div class="bg-slate-800 text-white mt-1 mb-2 py-1 px-3 rounded">
          <span class="bg-sky-800 rounded px-2 text-bold  mr-1">SO</span>

          x{ 
        parseFloat( 
        (
          (1+((compareCumulativeBuffs.tdm + compareCumulativeBuffs.sotdm) / 100)) *
          (1+((compareCumulativeBuffs.tdmtaken + compareCumulativeBuffs.sotdmtaken) / 100)) *
          (1+((compareCumulativeBuffs.lightning + compareCumulativeBuffs.solightning + compareCumulativeBuffs.ele + compareCumulativeBuffs.soele) / 100)) *
          (1+((compareCumulativeBuffs.lightningtaken + compareCumulativeBuffs.solightningtaken + compareCumulativeBuffs.eletaken + compareCumulativeBuffs.soeletaken) / 100))
          ).toFixed(3)
        )
        }

{#if compareCumulativeBuffs.condtdm > 0 || compareCumulativeBuffs.condtdmtaken > 0}
- x{ 
  parseFloat( 
  (
    (1+((compareCumulativeBuffs.tdm + compareCumulativeBuffs.sotdm + compareCumulativeBuffs.condtdm) / 100)) *
    (1+((compareCumulativeBuffs.tdmtaken + compareCumulativeBuffs.sotdmtaken + compareCumulativeBuffs.condtdmtaken) / 100)) *
    (1+((compareCumulativeBuffs.lightning + compareCumulativeBuffs.solightning) / 100)) *
    (1+((compareCumulativeBuffs.lightningtaken + compareCumulativeBuffs.solightningtaken) / 100))
    ).toFixed(3)
  )
}

{/if}
        </div>

        {#if slots.leader.astralRing == "World Star"}

        <div class="bg-slate-800 text-white mt-1 mb-2 px-3 py-1 rounded">
          <span class="bg-sky-800 rounded px-2 text-bold  mr-1">Reso</span>

          x{ 
            parseFloat( 
            (
              (1+((compareCumulativeBuffs.tdm + compareCumulativeBuffs.sotdm + compareCumulativeBuffs.resotdm) / 100)) *
          (1+((compareCumulativeBuffs.tdmtaken + compareCumulativeBuffs.sotdmtaken) / 100)) *
          (1+((compareCumulativeBuffs.lightning + compareCumulativeBuffs.solightning + compareCumulativeBuffs.ele + compareCumulativeBuffs.soele) / 100)) *
          (1+((compareCumulativeBuffs.lightningtaken + compareCumulativeBuffs.solightningtaken + compareCumulativeBuffs.eletaken + compareCumulativeBuffs.soeletaken) / 100)) 
              ).toFixed(3)
            )
            }
{#if compareCumulativeBuffs.condtdm > 0 || compareCumulativeBuffs.condtdmtaken > 0}
- x{ 
  parseFloat( 
  (
    (1+((compareCumulativeBuffs.tdm + compareCumulativeBuffs.sotdm + compareCumulativeBuffs.condtdm + compareCumulativeBuffs.resotdm) / 100)) *
    (1+((compareCumulativeBuffs.tdmtaken + compareCumulativeBuffs.sotdmtaken + compareCumulativeBuffs.condtdmtaken) / 100)) *
    (1+((compareCumulativeBuffs.lightning + compareCumulativeBuffs.solightning) / 100)) *
    (1+((compareCumulativeBuffs.lightningtaken + compareCumulativeBuffs.solightningtaken) / 100)) 
    ).toFixed(3)
  )
}

{/if}


        </div>
        {/if}

        {#if slots.leader.astralRing == "Wheel of Destiny"}

        <div class="bg-slate-800 text-white mt-1 mb-2 px-3 py-1 rounded">
          <span class="bg-sky-800 rounded px-2 text-bold mr-1">Shadow</span>

          x{ 
            parseFloat( 
            (
              (1+((compareCumulativeBuffs.tdm + compareCumulativeBuffs.sotdm) / 100)) *
          (1+((compareCumulativeBuffs.tdmtaken + compareCumulativeBuffs.sotdmtaken + compareCumulativeBuffs.shadowtdmtaken) / 100)) *
          (1+((compareCumulativeBuffs.lightning + compareCumulativeBuffs.solightning + compareCumulativeBuffs.ele + compareCumulativeBuffs.soele) / 100)) *
          (1+((compareCumulativeBuffs.lightningtaken + compareCumulativeBuffs.solightningtaken + compareCumulativeBuffs.eletaken + compareCumulativeBuffs.soeletaken) / 100)) 

              ).toFixed(3)
            )
            }
{#if compareCumulativeBuffs.condtdm > 0 || compareCumulativeBuffs.condtdmtaken > 0}
- x{ 
  parseFloat( 
  (
    (1+((compareCumulativeBuffs.tdm + compareCumulativeBuffs.sotdm + compareCumulativeBuffs.condtdm) / 100)) *
    (1+((compareCumulativeBuffs.tdmtaken + compareCumulativeBuffs.sotdmtaken + compareCumulativeBuffs.condtdmtaken + compareCumulativeBuffs.shadowtdmtaken) / 100)) *
    (1+((compareCumulativeBuffs.lightning + compareCumulativeBuffs.solightning) / 100)) *
    (1+((compareCumulativeBuffs.lightningtaken + compareCumulativeBuffs.solightningtaken) / 100))
    ).toFixed(3)
  )
}

{/if}
        </div>
        {/if}
      </div>

      <div class="  text-white rounded-lg text-left border border-white z-2 " id="totalice">
        <p class=" bg-blue-700 text-center rounded-t-lg px-2">Ice DMG</p>

        <div class="bg-slate-800 text-white mt-1 mb-2 py-1 px-3 rounded">
          <span class="bg-emerald-800 rounded px-2  mr-1">AC</span> 

          x{ 
          parseFloat( 
          (
            (1+((compareCumulativeBuffs.tdm + compareCumulativeBuffs.actdm) / 100)) *
            (1+((compareCumulativeBuffs.tdmtaken + compareCumulativeBuffs.actdmtaken) / 100)) *
            (1+((compareCumulativeBuffs.ice + compareCumulativeBuffs.acice + compareCumulativeBuffs.ele + compareCumulativeBuffs.acele) / 100)) *
            (1+((compareCumulativeBuffs.icetaken + compareCumulativeBuffs.acicetaken + compareCumulativeBuffs.eletaken + compareCumulativeBuffs.aceletaken) / 100))
            ).toFixed(3)
          )
          }
          {#if compareCumulativeBuffs.condtdm > 0 || compareCumulativeBuffs.condtdmtaken > 0}
          - x{ 
            parseFloat( 
            (
              (1+((compareCumulativeBuffs.tdm + compareCumulativeBuffs.actdm + compareCumulativeBuffs.condtdm) / 100)) *
              (1+((compareCumulativeBuffs.tdmtaken + compareCumulativeBuffs.actdmtaken + compareCumulativeBuffs.condtdmtaken) / 100)) *
              (1+((compareCumulativeBuffs.ice + compareCumulativeBuffs.acice) / 100)) *
              (1+((compareCumulativeBuffs.icetaken + compareCumulativeBuffs.acicetaken) / 100))
              ).toFixed(3)
            )
          }
          {/if}
        </div>
        <div class="bg-slate-800 text-white mt-1 mb-2 py-1 px-3 rounded">
          <span class="bg-sky-800 rounded px-2 text-bold  mr-1">SO</span>

          x{ 
        parseFloat( 
        (
          (1+((compareCumulativeBuffs.tdm + compareCumulativeBuffs.sotdm) / 100)) *
          (1+((compareCumulativeBuffs.tdmtaken + compareCumulativeBuffs.sotdmtaken) / 100)) *
          (1+((compareCumulativeBuffs.ice + compareCumulativeBuffs.soice + compareCumulativeBuffs.ele + compareCumulativeBuffs.soele) / 100)) *
          (1+((compareCumulativeBuffs.icetaken + compareCumulativeBuffs.soicetaken + compareCumulativeBuffs.eletaken + compareCumulativeBuffs.soeletaken) / 100))
          ).toFixed(3)
        )
        }

{#if compareCumulativeBuffs.condtdm > 0 || compareCumulativeBuffs.condtdmtaken > 0}
- x{ 
  parseFloat( 
  (
    (1+((compareCumulativeBuffs.tdm + compareCumulativeBuffs.sotdm + compareCumulativeBuffs.condtdm) / 100)) *
    (1+((compareCumulativeBuffs.tdmtaken + compareCumulativeBuffs.sotdmtaken + compareCumulativeBuffs.condtdmtaken) / 100)) *
    (1+((compareCumulativeBuffs.ice + compareCumulativeBuffs.soice) / 100)) *
    (1+((compareCumulativeBuffs.icetaken + compareCumulativeBuffs.soicetaken) / 100))
    ).toFixed(3)
  )
}
{/if}
        </div>

        {#if slots.leader.astralRing == "World Star"}

        <div class="bg-slate-800 text-white mt-1 mb-2 px-3 py-1 rounded">
          <span class="bg-sky-800 rounded px-2 text-bold  mr-1">Reso</span>

          x{ 
            parseFloat( 
            (
              (1+((compareCumulativeBuffs.tdm + compareCumulativeBuffs.sotdm + compareCumulativeBuffs.resotdm) / 100)) *
          (1+((compareCumulativeBuffs.tdmtaken + compareCumulativeBuffs.sotdmtaken) / 100)) *
          (1+((compareCumulativeBuffs.ice + compareCumulativeBuffs.soice + compareCumulativeBuffs.ele + compareCumulativeBuffs.soele) / 100)) *
          (1+((compareCumulativeBuffs.icetaken + compareCumulativeBuffs.soicetaken + compareCumulativeBuffs.eletaken + compareCumulativeBuffs.soeletaken) / 100)) 
              ).toFixed(3)
            )
            }
{#if compareCumulativeBuffs.condtdm > 0 || compareCumulativeBuffs.condtdmtaken > 0}
- x{ 
  parseFloat( 
  (
    (1+((compareCumulativeBuffs.tdm + compareCumulativeBuffs.sotdm + compareCumulativeBuffs.condtdm + compareCumulativeBuffs.resotdm) / 100)) *
    (1+((compareCumulativeBuffs.tdmtaken + compareCumulativeBuffs.sotdmtaken + compareCumulativeBuffs.condtdmtaken) / 100)) *
    (1+((compareCumulativeBuffs.ice + compareCumulativeBuffs.soice) / 100)) *
    (1+((compareCumulativeBuffs.icetaken + compareCumulativeBuffs.soicetaken) / 100)) 
    ).toFixed(3)
  )
}
{/if}
        </div>
        {/if}

        {#if slots.leader.astralRing == "Wheel of Destiny"}

        <div class="bg-slate-800 text-white mt-1 mb-2 px-3 py-1 rounded">
          <span class="bg-sky-800 rounded px-2 text-bold mr-1">Shadow</span>

          x{ 
            parseFloat( 
            (
              (1+((compareCumulativeBuffs.tdm + compareCumulativeBuffs.sotdm) / 100)) *
          (1+((compareCumulativeBuffs.tdmtaken + compareCumulativeBuffs.sotdmtaken + compareCumulativeBuffs.shadowtdmtaken) / 100)) *
          (1+((compareCumulativeBuffs.ice + compareCumulativeBuffs.soice + compareCumulativeBuffs.ele + compareCumulativeBuffs.soele) / 100)) *
          (1+((compareCumulativeBuffs.icetaken + compareCumulativeBuffs.soicetaken + compareCumulativeBuffs.eletaken + compareCumulativeBuffs.soeletaken) / 100))
              ).toFixed(3)
            )
            }

{#if compareCumulativeBuffs.condtdm > 0 || compareCumulativeBuffs.condtdmtaken > 0}
- x{ 
  parseFloat( 
  (
    (1+((compareCumulativeBuffs.tdm + compareCumulativeBuffs.sotdm + compareCumulativeBuffs.condtdm) / 100)) *
    (1+((compareCumulativeBuffs.tdmtaken + compareCumulativeBuffs.sotdmtaken + compareCumulativeBuffs.condtdmtaken + compareCumulativeBuffs.shadowtdmtaken) / 100)) *
    (1+((compareCumulativeBuffs.ice + compareCumulativeBuffs.soice) / 100)) *
    (1+((compareCumulativeBuffs.icetaken + compareCumulativeBuffs.soicetaken) / 100)) 

    ).toFixed(3)
  )
}
{/if}

        </div>
        {/if}
      </div>

      <div class="  text-white rounded-lg text-left border border-white z-2 " id="totalfire">
        <p class=" bg-red-700 text-center rounded-t-lg px-2">Fire DMG</p>
        <div class="bg-slate-800 text-white mt-1 mb-2 py-1 px-3 rounded">
          <span class="bg-emerald-800 rounded px-2  mr-1">AC</span> 

    
          x{ 
          parseFloat( 
          (
            (1+((compareCumulativeBuffs.tdm + compareCumulativeBuffs.actdm) / 100)) *
            (1+((compareCumulativeBuffs.tdmtaken + compareCumulativeBuffs.actdmtaken) / 100)) *
            (1+((compareCumulativeBuffs.fire + compareCumulativeBuffs.acfire + compareCumulativeBuffs.ele + compareCumulativeBuffs.acele) / 100)) *
            (1+((compareCumulativeBuffs.firetaken + compareCumulativeBuffs.acfiretaken + compareCumulativeBuffs.eletaken + compareCumulativeBuffs.aceletaken) / 100))
            ).toFixed(3)
          )
          }

{#if compareCumulativeBuffs.condtdm > 0 || compareCumulativeBuffs.condtdmtaken > 0}
- x{ 
  parseFloat( 
  (
    (1+((compareCumulativeBuffs.tdm + compareCumulativeBuffs.actdm + compareCumulativeBuffs.condtdm) / 100)) *
    (1+((compareCumulativeBuffs.tdmtaken + compareCumulativeBuffs.actdmtaken + compareCumulativeBuffs.condtdmtaken) / 100)) *
    (1+((compareCumulativeBuffs.fire + compareCumulativeBuffs.acfire) / 100)) *
    (1+((compareCumulativeBuffs.firetaken + compareCumulativeBuffs.acfiretaken) / 100))
    ).toFixed(3)
  )
}
{/if}
        </div>
        <div class="bg-slate-800 text-white mt-1 mb-2 py-1 px-3 rounded">
          <span class="bg-sky-800 rounded px-2 text-bold  mr-1">SO</span>
          
          x{ 
        parseFloat( 
        (
          (1+((compareCumulativeBuffs.tdm + compareCumulativeBuffs.sotdm) / 100)) *
          (1+((compareCumulativeBuffs.tdmtaken + compareCumulativeBuffs.sotdmtaken) / 100)) *
          (1+((compareCumulativeBuffs.fire + compareCumulativeBuffs.sofire + compareCumulativeBuffs.ele + compareCumulativeBuffs.soele) / 100)) *
          (1+((compareCumulativeBuffs.firetaken + compareCumulativeBuffs.sofiretaken + compareCumulativeBuffs.eletaken + compareCumulativeBuffs.soeletaken) / 100))
          ).toFixed(3)
        )
        }

{#if compareCumulativeBuffs.condtdm > 0 || compareCumulativeBuffs.condtdmtaken > 0}
- x{ 
  parseFloat( 
  (
    (1+((compareCumulativeBuffs.tdm + compareCumulativeBuffs.sotdm + compareCumulativeBuffs.condtdm) / 100)) *
    (1+((compareCumulativeBuffs.tdmtaken + compareCumulativeBuffs.sotdmtaken + compareCumulativeBuffs.condtdmtaken) / 100)) *
    (1+((compareCumulativeBuffs.fire + compareCumulativeBuffs.sofire) / 100)) *
    (1+((compareCumulativeBuffs.firetaken + compareCumulativeBuffs.sofiretaken) / 100))
    ).toFixed(3)
  )
}
{/if}
        </div>

        {#if slots.leader.astralRing == "World Star"}

        <div class="bg-slate-800 text-white mt-1 mb-2 px-3 py-1 rounded">
          <span class="bg-sky-800 rounded px-2 text-bold  mr-1">Reso</span>

          x{ 
            parseFloat( 
            (
              (1+((compareCumulativeBuffs.tdm + compareCumulativeBuffs.sotdm + compareCumulativeBuffs.resotdm) / 100)) *
          (1+((compareCumulativeBuffs.tdmtaken + compareCumulativeBuffs.sotdmtaken) / 100)) *
          (1+((compareCumulativeBuffs.fire + compareCumulativeBuffs.sofire + compareCumulativeBuffs.ele + compareCumulativeBuffs.soele) / 100)) *
          (1+((compareCumulativeBuffs.firetaken + compareCumulativeBuffs.sofiretaken + compareCumulativeBuffs.eletaken + compareCumulativeBuffs.soeletaken) / 100))
              ).toFixed(3)
            )
            }

{#if compareCumulativeBuffs.condtdm > 0 || compareCumulativeBuffs.condtdmtaken > 0}
- x{ 
  parseFloat( 
  (
    (1+((compareCumulativeBuffs.tdm + compareCumulativeBuffs.sotdm + compareCumulativeBuffs.condtdm + compareCumulativeBuffs.resotdm) / 100)) *
    (1+((compareCumulativeBuffs.tdmtaken + compareCumulativeBuffs.sotdmtaken + compareCumulativeBuffs.condtdmtaken) / 100)) *
    (1+((compareCumulativeBuffs.fire + compareCumulativeBuffs.sofire) / 100)) *
    (1+((compareCumulativeBuffs.firetaken + compareCumulativeBuffs.sofiretaken) / 100)) 

    ).toFixed(3)
  )
}
{/if}

        </div>
        {/if}

        {#if slots.leader.astralRing == "Wheel of Destiny"}

        <div class="bg-slate-800 text-white mt-1 mb-2 px-3 py-1 rounded">
          <span class="bg-sky-800 rounded px-2 text-bold mr-1">Shadow</span>

          x{ 
            parseFloat( 
            (
              (1+((compareCumulativeBuffs.tdm + compareCumulativeBuffs.sotdm) / 100)) *
          (1+((compareCumulativeBuffs.tdmtaken + compareCumulativeBuffs.sotdmtaken + compareCumulativeBuffs.shadowtdmtaken) / 100)) *
          (1+((compareCumulativeBuffs.fire + compareCumulativeBuffs.sofire + compareCumulativeBuffs.ele + compareCumulativeBuffs.soele) / 100)) *
          (1+((compareCumulativeBuffs.firetaken + compareCumulativeBuffs.sofiretaken + compareCumulativeBuffs.eletaken + compareCumulativeBuffs.soeletaken) / 100))
              ).toFixed(3)
            )
            }
{#if compareCumulativeBuffs.condtdm > 0 || compareCumulativeBuffs.condtdmtaken > 0}
- x{ 
  parseFloat( 
  (
    (1+((compareCumulativeBuffs.tdm + compareCumulativeBuffs.sotdm + compareCumulativeBuffs.condtdm) / 100)) *
    (1+((compareCumulativeBuffs.tdmtaken + compareCumulativeBuffs.sotdmtaken + compareCumulativeBuffs.condtdmtaken + compareCumulativeBuffs.shadowtdmtaken) / 100)) *
    (1+((compareCumulativeBuffs.fire + compareCumulativeBuffs.sofire) / 100)) *
    (1+((compareCumulativeBuffs.firetaken + compareCumulativeBuffs.sofiretaken) / 100)) 

    ).toFixed(3)
  )
}
{/if}
        </div>
        {/if}
      </div>

    </div>

        <details class="my-details bg-base-200 rounded-md mt-4  p-2 shadow-md">
          <summary class="my-summary cursor-pointer text-base text-slate-300 hover:bg-cyan-900 hover:text-white px-2 rounded-md">
            Buff Breakdown
          </summary>
          <div>
        <ul class="space-y-2 text-gray-200 mt-2">
  
          {#if compareCumulativeBuffs.tdm > 0 || compareCumulativeBuffs.condtdm > 0}
            <li>
              Total DMG +{compareCumulativeBuffs.tdm}%{#if compareCumulativeBuffs.condtdm > 0} - {compareCumulativeBuffs.tdm + compareCumulativeBuffs.condtdm}%{/if}</li>
          {/if}
          
          {#if compareCumulativeBuffs.resotdm > 0 }
          <li>Resonance ATK Total DMG +{compareCumulativeBuffs.resotdm}%</li>
          {/if}
          
          {#if compareCumulativeBuffs.shadowtdmtaken > 0 }
          <li>Shadow Star ATK Total DMG Taken +{compareCumulativeBuffs.shadowtdmtaken}%</li>
          {/if}
          
          
          {#if compareCumulativeBuffs.tdmtaken > 0 || compareCumulativeBuffs.actdmtaken > 0 || compareCumulativeBuffs.sotdmtaken > 0 }
          <li>
          
            Total DMG Taken +{compareCumulativeBuffs.tdmtaken + compareCumulativeBuffs.actdmtaken}%
          
            {#if compareCumulativeBuffs.condtdmtaken > 0}
            - {compareCumulativeBuffs.tdmtaken + compareCumulativeBuffs.condtdmtaken + compareCumulativeBuffs.actdmtaken}%
          {/if}
            
            {#if compareCumulativeBuffs.actdmtaken !== compareCumulativeBuffs.sotdmtaken} 
            
             <span class="bg-emerald-800 rounded px-2">AC</span> 
            
            / +{compareCumulativeBuffs.tdmtaken + compareCumulativeBuffs.sotdmtaken}% 
            
            {#if compareCumulativeBuffs.condtdmtaken > 0}
            - {compareCumulativeBuffs.tdmtaken + compareCumulativeBuffs.condtdmtaken + compareCumulativeBuffs.sotdmtaken}%
          {/if}
            
            <span class="bg-sky-800 rounded px-2">SO</span>
          
          
            {/if}
          
          </li>
          {/if}
          
          
          {#if compareCumulativeBuffs.phy > 0 || compareCumulativeBuffs.acphy > 0 || compareCumulativeBuffs.sophy > 0 }
          <li>
          
          Physical DMG +{compareCumulativeBuffs.phy + compareCumulativeBuffs.acphy}%
          
          {#if compareCumulativeBuffs.acphy !== compareCumulativeBuffs.sophy} 
          
           <span class="bg-emerald-800 rounded px-2">AC</span> 
          
          / +{compareCumulativeBuffs.phy + compareCumulativeBuffs.sophy}% <span class="bg-sky-800 rounded px-2">SO</span>
          {/if}
          
          </li>
          {/if}
          
          {#if compareCumulativeBuffs.phytaken > 0 || compareCumulativeBuffs.acphytaken > 0 || compareCumulativeBuffs.sophytaken > 0 }
          <li>
          
            Physical DMG Taken +{compareCumulativeBuffs.phytaken + compareCumulativeBuffs.acphytaken}%
            
            {#if compareCumulativeBuffs.acphytaken !== compareCumulativeBuffs.sophytaken} 
            
             <span class="bg-emerald-800 rounded px-2">AC</span> 
            
            / +{compareCumulativeBuffs.phytaken + compareCumulativeBuffs.sophytaken}% <span class="bg-sky-800 rounded px-2">SO</span>
            {/if}
          
          </li>
          {/if}
          
          {#if compareCumulativeBuffs.critdmg > 0 || compareCumulativeBuffs.condcritdmg > 0}
            <li>Crit DMG +{compareCumulativeBuffs.critdmg}%{#if compareCumulativeBuffs.condcritdmg > 0} - {compareCumulativeBuffs.critdmg + compareCumulativeBuffs.condcritdmg}%{/if}</li>
          {/if}
          
          {#if compareCumulativeBuffs.crate > 0 || compareCumulativeBuffs.condcrate > 0}
            <li>Crit Rate +{compareCumulativeBuffs.crate}%{#if compareCumulativeBuffs.condcrate > 0} - {compareCumulativeBuffs.crate + compareCumulativeBuffs.condcrate}%{/if}</li>
          {/if}
          
          
          {#if compareCumulativeBuffs.lightning > 0 || compareCumulativeBuffs.aclightning > 0 || compareCumulativeBuffs.solightning > 0 || compareCumulativeBuffs.ele > 0 || compareCumulativeBuffs.acele > 0 || compareCumulativeBuffs.soele > 0}
          <li>
          
            Lightning DMG +{compareCumulativeBuffs.ele + compareCumulativeBuffs.acele + compareCumulativeBuffs.lightning + compareCumulativeBuffs.aclightning}%
            
          {#if compareCumulativeBuffs.aclightning !== compareCumulativeBuffs.solightning || compareCumulativeBuffs.acele !== compareCumulativeBuffs.soele} 
            
             <span class="bg-emerald-800 rounded px-2">AC</span> 
            
            / +{compareCumulativeBuffs.ele + compareCumulativeBuffs.soele + compareCumulativeBuffs.lightning + compareCumulativeBuffs.solightning}% <span class="bg-sky-800 rounded px-2">SO</span>
          {/if}
          
          </li>
          {/if}
          
          {#if compareCumulativeBuffs.lightningtaken > 0 || compareCumulativeBuffs.aclightningtaken > 0 || compareCumulativeBuffs.solightningtaken > 0 || compareCumulativeBuffs.eletaken > 0 || compareCumulativeBuffs.aceletaken > 0 || compareCumulativeBuffs.soeletaken > 0}
          <li>
          
            Lightning DMG Taken +{compareCumulativeBuffs.eletaken + compareCumulativeBuffs.aceletaken + compareCumulativeBuffs.lightningtaken + compareCumulativeBuffs.aclightningtaken}%
            
            {#if compareCumulativeBuffs.aclightningtaken !== compareCumulativeBuffs.solightningtaken || compareCumulativeBuffs.aceletaken !== compareCumulativeBuffs.soeletaken} 
            
             <span class="bg-emerald-800 rounded px-2">AC</span> 
            
            / +{compareCumulativeBuffs.eletaken + compareCumulativeBuffs.soeletaken + compareCumulativeBuffs.lightningtaken + compareCumulativeBuffs.solightningtaken}% <span class="bg-sky-800 rounded px-2">SO</span>
            {/if}
          
          </li>
          {/if}
          
          {#if compareCumulativeBuffs.fire > 0 || compareCumulativeBuffs.acfire > 0 || compareCumulativeBuffs.sofire > 0 || compareCumulativeBuffs.ele > 0 || compareCumulativeBuffs.acele > 0 || compareCumulativeBuffs.soele > 0}
          <li>
          
          Fire DMG +{compareCumulativeBuffs.ele + compareCumulativeBuffs.acele + compareCumulativeBuffs.fire + compareCumulativeBuffs.acfire}%
          
          {#if compareCumulativeBuffs.acfire !== compareCumulativeBuffs.sofire || compareCumulativeBuffs.acele !== compareCumulativeBuffs.soele} 
          
           <span class="bg-emerald-800 rounded px-2">AC</span> 
          
          / +{compareCumulativeBuffs.ele + compareCumulativeBuffs.soele + compareCumulativeBuffs.fire + compareCumulativeBuffs.sofire}% <span class="bg-sky-800 rounded px-2">SO</span>
          {/if}
          
          </li>
          {/if}
          
          {#if compareCumulativeBuffs.firetaken > 0 || compareCumulativeBuffs.acfiretaken > 0 || compareCumulativeBuffs.sofiretaken > 0 || compareCumulativeBuffs.eletaken > 0 || compareCumulativeBuffs.aceletaken > 0 || compareCumulativeBuffs.soeletaken > 0}
          <li>
          
          Fire DMG Taken +{compareCumulativeBuffs.eletaken + compareCumulativeBuffs.aceletaken + compareCumulativeBuffs.firetaken + compareCumulativeBuffs.acfiretaken}%
          
          {#if compareCumulativeBuffs.acfiretaken !== compareCumulativeBuffs.sofiretaken || compareCumulativeBuffs.aceletaken !== compareCumulativeBuffs.soeletaken} 
          
           <span class="bg-emerald-800 rounded px-2">AC</span> 
          
          / +{compareCumulativeBuffs.eletaken + compareCumulativeBuffs.soeletaken + compareCumulativeBuffs.firetaken + compareCumulativeBuffs.sofiretaken}% <span class="bg-sky-800 rounded px-2">SO</span>
          {/if}
          
          </li>
          {/if}
          
          {#if compareCumulativeBuffs.ice > 0 || compareCumulativeBuffs.acice > 0 || compareCumulativeBuffs.soice > 0 || compareCumulativeBuffs.ele > 0 || compareCumulativeBuffs.acele > 0 || compareCumulativeBuffs.soele > 0}
          <li>
          
          Ice DMG +{compareCumulativeBuffs.ele + compareCumulativeBuffs.acele + compareCumulativeBuffs.ice + compareCumulativeBuffs.acice}%
          
          {#if compareCumulativeBuffs.acice !== compareCumulativeBuffs.soice || compareCumulativeBuffs.acele !== compareCumulativeBuffs.soele} 
          
          <span class="bg-emerald-800 rounded px-2">AC</span> 
          
          / +{compareCumulativeBuffs.ele + compareCumulativeBuffs.soele + compareCumulativeBuffs.ice + compareCumulativeBuffs.soice}% <span class="bg-sky-800 rounded px-2">SO</span>
          {/if}
          
          </li>
          {/if}
          
          {#if compareCumulativeBuffs.icetaken > 0 || compareCumulativeBuffs.acicetaken > 0 || compareCumulativeBuffs.soicetaken > 0 || compareCumulativeBuffs.eletaken > 0 || compareCumulativeBuffs.aceletaken > 0 || compareCumulativeBuffs.soeletaken > 0}
          <li>
          
          Ice DMG Taken +{compareCumulativeBuffs.eletaken + compareCumulativeBuffs.aceletaken + compareCumulativeBuffs.icetaken + compareCumulativeBuffs.acicetaken}%
          
          {#if compareCumulativeBuffs.acicetaken !== compareCumulativeBuffs.soicetaken || compareCumulativeBuffs.aceletaken !== compareCumulativeBuffs.soeletaken} 
          
          <span class="bg-emerald-800 rounded px-2">AC</span> 
          
          / +{compareCumulativeBuffs.eletaken + compareCumulativeBuffs.soeletaken + compareCumulativeBuffs.icetaken + compareCumulativeBuffs.soicetaken}% <span class="bg-sky-800 rounded px-2">SO</span>
          {/if}
          
          </li>
          {/if}
          
          
          </ul>
          </div>
        </details>
        
    </div>

  <!-- Valkyrie Buffs Section -->
  <div class="mt-6 p-4 bg-cyan-950/50 rounded-lg text-white">
    <h3 class="text-lg font-semibold text-cyan-400">Valkyrie Buffs (Detailed)</h3>
    <ul class="space-y-2 mt-2">
      {#each compareProcessedValkBuffs as buff}
        <li class="p-2 bg-gray-700 rounded-md">
          <strong>{displayRankcompare(buff.rank)}</strong>: {@html buff.description}
        </li>
      {/each}
    </ul>
  </div>

    <!-- AstralOp Buffs Section -->
    <div class="mt-6 p-4 bg-cyan-950/50 rounded-lg text-white">
      <h3 class="text-lg font-semibold text-cyan-400">AstralOp Buffs</h3>
      <ul class="space-y-2 mt-2">
        {#each compareProcessedAsopBuffs as buff}
          <li class="p-2 bg-gray-700 rounded-md">
            <strong>{displayRankcompare(buff.rank)}</strong>: {@html buff.description}
          </li>
        {/each}
      </ul>
    </div>


  </div>
{/if}

</div>

{/if}
