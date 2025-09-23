<script lang="ts">
  import { tick } from "svelte";

  export let label: string = "";
  export let value: string = "";
  export let aliasMap: Record<string, string> = {};
  export let placeholder: string = "Search...";
  export let autoFocus = false; // parent-controlled

  let inputValue = value;
  let inputEl: HTMLInputElement;

  function handleInput(e: Event) {
    const target = e.target as HTMLInputElement;
    inputValue = target.value;
    value = inputValue; // keep raw while typing
  }

  function handleBlur() {
    const canonical = aliasMap[inputValue.toLowerCase()];
    if (canonical) {
      value = canonical;
      inputValue = canonical;
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === "Enter") {
      const canonical = aliasMap[inputValue.toLowerCase()];
      if (canonical) {
        value = canonical;
        inputValue = canonical;
      } else {
        value = inputValue;
      }
    }
  }

  // Expose clear() to parent
  export function clear() {
    inputValue = "";
    value = "";
  }

  // ✅ Autofocus after the element exists
  $: if (autoFocus) {
    tick().then(() => inputEl?.focus());
  }
</script>

<div class="w-full">
  {#if label}
    <label class="block mb-1 text-sm font-medium text-gray-200">{label}</label>
  {/if}

  <div class="w-full min-h-[2.5rem] border border-gray-600 rounded-lg px-2 py-1 flex items-center bg-base-100">
    <input
      bind:this={inputEl}
      type="text"
      class="flex-grow outline-none bg-transparent text-base sm:text-sm text-gray-100 placeholder-gray-400 py-1"
      placeholder={placeholder}
      bind:value={inputValue}
      on:input={handleInput}
      on:blur={handleBlur}
      on:keydown={handleKeydown}
    />
    {#if inputValue}
      <button type="button" class="ml-2 text-gray-400 hover:text-red-400" on:click={() => clear()}>
        ✕
      </button>
    {/if}
  </div>
</div>
