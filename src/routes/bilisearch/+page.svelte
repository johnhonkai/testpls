<svelte:head>
<title>Bilibili Search Generator</title> 

<meta property="og:title" content="Bilibili Search Generator" />
<meta property="og:description" content="Search Abyss, Arena, ER videos on Bili2" />
<meta property="og:image" content="https://i.imgur.com/kyAyhiN.png" />
<meta property="og:url" content="https://marisaimpact.com/bilisearch" />
<meta property="og:type" content="website" />

<meta name="twitter:card" content="summary_large_image">


<link rel="canonical"  />
</svelte:head>


<script lang="ts">
  // Placeholder state variables (you'll wire these later)
  import SearchableSelect from "./SearchableSelect.svelte";
    import SearchableInput from "./SearchableInput.svelte";

  import { valkAliasMap , bossAliasMap , weatherAliasMap , bossKeys  } from "./bilisearchdb";


  let bossSSS = false;
let selectedBoss: string = "";
let selectedValks: string[] = [];
let selectedWeather: string = "";
  let abyssGroups: string[] = [];
  let showBossModal = false;
  let showValkModal = false;
let bossQuery = "";
  let bossInputRef: any;
  let valkInputRef: any;

  const abyssKeys = Object.keys(abyssToChinese);

 import {
    valkToChinese,
    weatherToChinese,
    bossToChinese,
    abyssToChinese,
  } from "./bilisearchdb";

  function getImage(key: string, db: any) {
    return key && db[key]?.image ? db[key].image : "https://via.placeholder.com/80x80?text=+";
  }

$: generatedLinks = [];

$: {
    // nothing selected -> early set to empty
    if (!(selectedBoss || selectedValks.length || selectedWeather || abyssGroups.length)) {
      generatedLinks = [];
    } else {
      // boss: alternatives (each boss alias stays as an alternative)
      let bossKeywords: string[] = selectedBoss ? (bossToChinese[selectedBoss].keywords  ?? []) : [];

      // append "sss" to each boss variant if checked
      if (bossSSS && bossKeywords.length) {
        bossKeywords = bossKeywords.map(k => `${k} sss`);
      }

      // valks: combine ALL selected valks into ONE group string
      let valkKeywordsArr: string[] = [];
      if (selectedValks.length) {
        const perValk = selectedValks
          .map(v => (valkToChinese[v].keywords ?? []).join(" "))
          .filter(Boolean);
        if (perValk.length) {
          valkKeywordsArr = [perValk.join(" ")]; // single element representing all valks
        }
      }

      // weather: alternatives (some weathers may have multiple Chinese keywords)
      const weatherKeywordsArr: string[] = selectedWeather ? (weatherToChinese[selectedWeather] ?? []) : [];

      // abyss groups: combine selected abyss keywords into one group string (single element)
      let abyssKeywordsArr: string[] = [];
      if (abyssGroups.length) {
        const perAbyss = abyssGroups.flatMap(g => abyssToChinese[g] ?? []);
        if (perAbyss.length) abyssKeywordsArr = [perAbyss.join(" ")];
      }

      // build arrays to do Cartesian product on — include only non-empty arrays
      const all = [bossKeywords, valkKeywordsArr, weatherKeywordsArr, abyssKeywordsArr].filter(arr => arr.length > 0);

      if (all.length === 0) {
        generatedLinks = [];
      } else {
        // Cartesian product
        function cartesian(arrays: string[][]): string[][] {
          return arrays.reduce(
            (acc, curr) => acc.flatMap(a => curr.map(b => [...a, b])),
            [[]] as string[][]
          );
        }

        const combos = cartesian(all);

        // join each combo by spaces to form the search keyword line; raw Chinese (no encode)
        generatedLinks = combos.map(combo => `https://search.bilibili.com/all?keyword=${combo.join(" ")}`);
      }
    }
  }

let valkQuery = "";

// Ensure max 4 valks
function selectValk(valk: string) {
  if (selectedValks.includes(valk)) {
    // already selected → remove
    selectedValks = selectedValks.filter(v => v !== valk);
  } else if (selectedValks.length < 4) {
    selectedValks = [...selectedValks, valk];
  }
}

  $: if (!showBossModal) bossQuery = "";
  $: if (!showValkModal) valkQuery = "";

</script>

<div class="relative w-full h-40 md:h-70 overflow-hidden "  id="bannerpic">

  <img
    src="https://i.imgur.com/Dwrg5Tu.png"
    alt="Header"
    class="w-full h-full object-cover [object-position:50%_30%] opacity-35"
    />


 
  <!-- Text overlay -->
  <div class="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 pb-3 md:pb-0 md:pt-6 z-10">
    <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-md font-russoone italic tracking-wider text-shadow-lg/30 ">
      Bilibili Search Generator
    </h1>
    <p class="text-sm sm:text-lg text-slate-200 drop-shadow-sm">
      Search Abyss, Arena, ER videos on Bili2



    </p>
  </div>
  

  <!-- Blur overlay at bottom -->
  <div class="absolute bottom-0 left-0 w-full h-25 bg-gradient-to-t from-base-100 to-transparent z-0">
    
  </div>

</div>

<div class="flex mx-auto justify-center gap-4 items-center mt-4">
  <div class="text-xs sm:text-sm md:text-base text-accent" >
    Ai-chan says: Only fill out as much as you need! <br/>
  </div>
</div>

<div class="w-full max-w-4xl mx-auto  mb-6 p-6  rounded-2xl  space-y-6 ">

  <div class="flex flex-row gap-15 justify-center">
<!-- Boss Preview (click to open modal) -->
<div class="flex items-center gap-4">
  <div
    class="w-20 h-12 sm:w-40 sm:h-20 rounded-lg overflow-hidden cursor-pointer border border-base-300 flex items-center justify-center bg-slate-600"
    on:click={() => (showBossModal = true)}
  >
    {#if selectedBoss}
      <img
        src={getImage(selectedBoss, bossToChinese)}
        alt={selectedBoss}
        class="w-full h-full object-cover"
      />
    {:else}
      <span class="text-sm text-gray-100">Select Boss</span>
    {/if}
  </div>
</div>


<!-- Boss Modal -->
{#if showBossModal}
  <div class="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
    <div
      class="bg-base-200 p-6 rounded-xl shadow-lg w-full max-w-4xl
             h-[700px] flex flex-col"
    >
      <h2 class="text-xl font-bold mb-4">Select Boss</h2>

      <!-- Search input -->
      <SearchableInput
        bind:this={bossInputRef}
        label="Search Boss"
        aliasMap={bossAliasMap}
        bind:value={bossQuery}
        autoFocus={showBossModal}
      />

      <!-- Grid -->
      <div class="mt-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 flex-1 overflow-y-auto">
        {#each bossKeys.filter(b =>
          b.toLowerCase().includes(bossQuery.toLowerCase())
        ) as boss}
          <div
            class="relative cursor-pointer flex flex-col items-center p-2 rounded-lg border transition-all
              {selectedBoss === boss
                ? 'border-primary ring-2 ring-primary'
                : 'border-base-300 hover:border-primary'}"
            on:click={() => {
              selectedBoss = boss;
              bossInputRef?.clear();
              showBossModal = false;
            }}
          >
            <img src={getImage(boss, bossToChinese)} alt={boss} class="w-11 h-6 sm:w-22 sm:h-12 object-cover rounded-md" />
            <span class="mt-2 text-sm text-center">{boss}</span>
          </div>
        {/each}
      </div>

      <!-- Footer -->
      <div class="mt-6 flex justify-end gap-2">
        <button
          class="px-4 py-2 rounded bg-amber-600 hover:bg-amber-500 text-black cursor-pointer"
          on:click={() => {
            bossInputRef?.clear();
            showBossModal = false;
          }}
        >
          Close
        </button>
      </div>
    </div>
  </div>
{/if}



<!-- Valkyries (4 slots) -->
<div class="flex gap-4">
  {#each Array(4) as _, i}
    <div
      class="w-12 h-12 sm:w-20 sm:h-20 rounded-lg overflow-hidden cursor-pointer border border-base-300 flex items-center justify-center bg-slate-600"
      on:click={() => (showValkModal = true)}
    >
      {#if selectedValks[i]}
        <img
          src={getImage(selectedValks[i], valkToChinese)}
          alt={selectedValks[i]}
          class="w-full h-full object-cover"
        />
      {:else}
        <span class="text-xs text-gray-100 text-center">Select Valk</span>
      {/if}
    </div>
  {/each}
</div>


<!-- Valk Modal -->
{#if showValkModal}
  <div class="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
    <div
      class="bg-base-200 p-6 rounded-xl shadow-lg w-full max-w-4xl
             h-[700px] flex flex-col"
    >
      <h2 class="text-xl font-bold mb-4">Select Valkyries</h2>

      <!-- Alias-aware search input -->
      <SearchableInput
        bind:this={valkInputRef}
        label="Search Valk"
        aliasMap={valkAliasMap}
        bind:value={valkQuery}
        autoFocus={showValkModal}
      />

      <!-- Grid -->
      <div class="mt-2 grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 flex-1 overflow-y-auto">
        {#each Object.keys(valkToChinese).filter(v => {
          const canonical = valkAliasMap[valkQuery.toLowerCase()];
          return !valkQuery || v.toLowerCase().includes(valkQuery.toLowerCase()) || v === canonical;
        }) as valk}
          <div
            class="relative cursor-pointer flex flex-col items-center p-2 rounded-lg border transition-all
              {selectedValks.includes(valk)
                ? 'border-primary ring-2 ring-primary'
                : 'border-base-300 hover:border-primary'}"
            on:click={() => {
              selectValk(valk);
              valkInputRef?.clear();
            }}
          >
            <img src={getImage(valk, valkToChinese)} alt={valk} class="w-10 h-10 sm:w-20 sm:h-20 object-cover rounded-md" />
            <span class="mt-2 text-xs text-center">{valk}</span>
          </div>
        {/each}
      </div>

      <!-- Footer -->
      <div class="mt-6 flex justify-end gap-2">
        <button
          class="px-4 py-2 rounded bg-amber-600 hover:bg-amber-500 text-black cursor-pointer"
          on:click={() => {
            valkInputRef?.clear();
            showValkModal = false;
          }}
        >
          Close
        </button>
      </div>
    </div>
  </div>
{/if}


</div>



  <!-- Boss -->
  <div class="flex flex-col items-start gap-4">
    <SearchableSelect
      label="Boss"
  options={bossKeys}
  aliasMap={bossAliasMap}
      bind:value={selectedBoss}
    />


<label class="flex items-start gap-2 pb-2 w-full">
  <input
    type="checkbox"
    bind:checked={bossSSS}
    class="checkbox checkbox-primary "
  />
  <span class="text-xs sm:text-sm text-gray-400  leading-snug break-words mt-0 sm:mt-0.5 cursor-pointer">
    SSS Boss? (Tip: Some MA videos will only show up when this is unchecked,
    so try both!)
  </span>
</label>

  </div>

  <!-- Valk (multi max 4) -->
<SearchableSelect
  label="Valkyrie"
  options={Object.keys(valkToChinese)}
  aliasMap={valkAliasMap}
  multi={true}
  maxSelected={4}
  bind:value={selectedValks}
/>

<div class="flex items-start mt-[-16px] gap-2 pb-2 ml-1 w-full text-xs sm:text-sm text-gray-400 leading-snug break-words cursor-pointer">

    Order matters. Choose the lead valk first.
</div>


  <!-- Weather -->
  <SearchableSelect
    label="Weather"
  options={Object.keys(weatherToChinese)}
  aliasMap={weatherAliasMap}
    bind:value={selectedWeather}
  />

  

<!-- Abyss Group -->
<div class="form-control">
  <label class="label">
    <span class="label-text text-base font-semibold mb-2 text-gray-200 mt-4">Other Modifiers</span>
  </label>
  <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 px-1">
    {#each abyssKeys as group}
      <label class="label cursor-pointer gap-2 items-center text-xs sm:text-sm text-gray-300 " >
        <input
          type="checkbox"
          value={group}
          bind:group={abyssGroups}
          class="checkbox checkbox-sm sm:checkbox-md checkbox-accent"
        />
        <span class="label-text truncate">{group}</span>
      </label>
    {/each}
  </div>
</div>


  <!-- Generated Link -->
<div class="p-4 bg-base-200 rounded-lg shadow-inner">
  <h2 class="text-lg font-bold mb-2">Generated Link</h2>
  {#if generatedLinks.length === 0}
    <p class=" text-slate-400 italic">Your generated link will appear here...</p>
  {:else}
    <ul class="space-y-1">
      {#each generatedLinks as link}
        <li>
          <a href={link} target="_blank" class="link text-accent break-all">{link}</a>
        </li>
      {/each}
    </ul>
  {/if}
</div>

</div>

<div class="flex max-w-3xl mx-auto justify-center gap-4 items-center mt-2 p-4 mb-20">

  <div class="h-12 sm:h-16 flex-0.5">
    <img src="https://i.imgur.com/ykqy9RB.gif"
    class="w-full h-full object-cover rounded-lg"/>
  </div>

  <div class="flex-1 text-center text-xs sm:text-sm md:text-base text-gray-400" >
    This page is passed down from <a class="link" href="https://honkai-guide.web.app/#/" target="_blank">https://honkai-guide.web.app/#/</a>. Credits to the original creator and contributors: Pingu, Keebster, Darius and more.<br/>
  </div>

  
  <div class="h-12 sm:h-16 flex-0.5">
    <img src="https://i.imgur.com/Vq4GzqY.gif"
    class="w-full h-full object-cover rounded-lg"/>
  </div>
</div>
