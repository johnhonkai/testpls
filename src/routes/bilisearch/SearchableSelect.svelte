<script lang="ts">
  import { onMount } from "svelte";

  export let aliasMap: Record<string, string> = {};
  export let label: string;
  export let options: string[] = [];
  export let placeholder = "Type or select";
  export let multi = false;
  export let maxSelected: number | null = null;
  export let value: string | string[]; // bound externally

  let query = "";
  let isOpen = false;
  let container: HTMLDivElement;

  // --- Filtering logic
  $: filtered = options.filter((opt) => {
    if (multi && (value as string[])?.includes(opt)) return false;
    if (query === "") return true;

    const lower = query.toLowerCase();
    return (
      opt.toLowerCase().includes(lower) ||
      Object.keys(aliasMap).some(
        (alias) => alias.includes(lower) && aliasMap[alias] === opt
      )
    );
  });

  function selectOption(opt: string) {
    if (multi) {
      let arr = (value as string[]) ?? [];
      if (arr.includes(opt)) return;
      if (maxSelected !== null && arr.length >= maxSelected) return;
      value = [...arr, opt];
    } else {
      value = opt;
    }
    query = "";
    isOpen = false;
  }

  function removeOption(opt: string) {
    if (multi) {
      value = (value as string[]).filter((v) => v !== opt);
    } else {
      value = "";
    }
    isOpen = false;
  }

  function toggleDropdown() {
    isOpen = !isOpen;
  }

  onMount(() => {
    function handleClickOutside(event: MouseEvent) {
      if (container && !container.contains(event.target as Node)) {
        isOpen = false;
      }
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  });
</script>

<div class="w-full relative" bind:this={container}>
  <label class="block text-base font-semibold mb-1 text-gray-200">{label}</label>

  <!-- Custom select box -->
  <div
    class="w-full min-h-[2.5rem] border border-gray-600 rounded-lg px-2 py-1 flex flex-wrap items-center gap-2 cursor-text bg-slate-700"
    on:click={toggleDropdown}
  >
    {#if multi}
      {#each value as val (val)}
        <span class="px-2 py-1 text-sm bg-blue-600 text-white rounded flex items-center gap-1">
          <span class="max-w-[120px] sm:max-w-100 truncate sm:whitespace-nowrap">{val}</span>
          <button
            type="button"
            class="hover:text-black text-blue-600 bg-white ml-1 px-1 rounded cursor-pointer font-bold"
            on:click|stopPropagation={() => removeOption(val)}
          >
            ✕
          </button>
        </span>
      {/each}

      {#if !maxSelected || (value as string[])?.length < maxSelected}
        <input
          class="flex-grow min-w-[4ch] outline-none text-sm py-1"
          placeholder={placeholder}
          bind:value={query}
          on:focus={() => (isOpen = true)}
          on:click|stopPropagation
        />
      {/if}
    {:else}
      {#if value}
        <span class="px-2 py-1 text-sm bg-blue-600 text-white rounded flex items-center gap-1">
          <span class="max-w-[120px] sm:max-w-100 truncate sm:whitespace-nowrap">{value}</span>
          <button
            type="button"
            class="hover:text-black text-blue-600 bg-white ml-1 px-1 rounded cursor-pointer font-bold"
            on:click|stopPropagation={() => removeOption(value as string)}
          >
            ✕
          </button>
        </span>
      {:else}
        <input
          class="flex-grow min-w-[4ch] outline-none bg-transparent text-base sm:text-sm py-1"
          placeholder={placeholder}
          bind:value={query}
          on:focus={() => (isOpen = true)}
          on:click|stopPropagation
        />
      {/if}
    {/if}
  </div>

  <!-- Dropdown -->
  {#if isOpen}
    <ul
      class="absolute z-20 mt-1 w-full max-h-48 overflow-y-auto outline-2 bg-slate-700 border border-gray-600 rounded-lg shadow-md text-sm sm:text-base"
    >
      {#if filtered.length > 0}
        {#each filtered as opt}
          <li
            class="px-3 py-2 cursor-pointer hover:bg-slate-800"
            on:click={() => selectOption(opt)}
          >
            {opt}
          </li>
        {/each}
      {:else}
        <li class="px-3 py-2 text-gray-400 italic">No results</li>
      {/if}
    </ul>
  {/if}
</div>
