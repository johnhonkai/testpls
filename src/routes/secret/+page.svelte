<script lang="ts">
  import type { PageData } from './$types';
  let { data }: { data: PageData } = $props();

  import html2canvas from 'html2canvas-pro';
  import Fa from 'svelte-fa';
  import {
    faCamera,
    faPlus,
    faTrash,
    faArrowUp,
    faArrowDown,
    faPen
  } from '@fortawesome/free-solid-svg-icons';
  import { onMount } from 'svelte';
  import { valkyries } from '$lib/data/characterdata';

  type Step = { name: string; image: string; text: string };
  type Tab = { id: string; name: string; title: string; steps: Step[] };

  const LS_KEY = 'rotationTabs_v1';

  // ---------------- State ----------------
  let tabs = $state<Tab[]>([]);
  let activeId = $state<string>('');

  // Builder UI state (per active tab)
  let selectedName = $state(valkyries[0]?.name ?? '');
  let stepText = $state('');

  // ---------------- Persistence ----------------
  function loadFromStorage() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as { tabs: Tab[]; activeId: string };
        tabs = parsed.tabs ?? [];
        activeId = parsed.activeId ?? (tabs[0]?.id ?? '');
      }
    } catch {
      // ignore
    }
    // If nothing yet, create a starter tab
    if (tabs.length === 0) {
      const id = crypto.randomUUID();
      tabs = [
        {
          id,
          name: 'Preset 1',
          title: 'Rotation Opener (Delay SO)',
          steps: []
        }
      ];
      activeId = id;
      saveToStorage();
    }
  }

  function saveToStorage() {
    const payload = JSON.stringify({ tabs, activeId });
    localStorage.setItem(LS_KEY, payload);
  }

  onMount(loadFromStorage);

  // A little helper so any mutation triggers save
  function commit() {
    saveToStorage();
  }

  // ---------------- Tab helpers ----------------
  function setActive(id: string) {
    activeId = id;
    commit();
  }

  function addTab() {
    const id = crypto.randomUUID();
    tabs.push({
      id,
      name: `Preset ${tabs.length + 1}`,
      title: 'New Rotation',
      steps: []
    });
    activeId = id;
    commit();
  }

  function renameTab(id: string, newName: string) {
    const t = tabs.find((x) => x.id === id);
    if (!t) return;
    t.name = newName || t.name;
    commit();
  }

  function deleteTab(id: string) {
    if (tabs.length === 1) return; // keep at least one
    const idx = tabs.findIndex((t) => t.id === id);
    if (idx === -1) return;
    tabs.splice(idx, 1);
    // Choose new active
    if (activeId === id) {
      activeId = tabs[Math.max(0, idx - 1)]?.id ?? tabs[0]?.id ?? '';
    }
    commit();
  }

  // ---------------- Active Tab selectors ----------------
  function currentTab(): Tab {
    return tabs.find((t) => t.id === activeId)!;
  }

  // ---------------- Steps (per active tab) ----------------
  function addStep() {
    const v = valkyries.find((x) => x.name === selectedName);
    if (!v) return;
    const text = stepText.trim();
    if (!text) return;
    currentTab().steps.push({ name: v.name, image: v.image, text });
    stepText = '';
    commit();
  }

  function removeStep(i: number) {
    currentTab().steps.splice(i, 1);
    commit();
  }

  function moveUp(i: number) {
    if (i <= 0) return;
    const arr = currentTab().steps;
    const [s] = arr.splice(i, 1);
    arr.splice(i - 1, 0, s);
    commit();
  }

  function moveDown(i: number) {
    const arr = currentTab().steps;
    if (i >= arr.length - 1) return;
    const [s] = arr.splice(i, 1);
    arr.splice(i + 1, 0, s);
    commit();
  }

  function updateTitle(v: string) {
    currentTab().title = v;
    commit();
  }

  // ---------------- Capture ----------------
  async function captureStats() {
    const target = document.getElementById('statsSection');
    if (!target) return;
    const canvas = await html2canvas(target, { useCORS: true, allowTaint: true, scale: 2 });
    const link = document.createElement('a');
    link.download = `rot.png`;
    link.href = canvas.toDataURL();
    link.click();
  }
</script>

<!-- TABS -->
<div class="max-w-3xl mx-auto mt-20">
  <div class="flex items-center gap-2 overflow-x-auto pb-2">
    {#each tabs as t}
      <button
        class={`px-3 py-1.5 rounded-full border text-sm transition
          ${t.id === activeId
            ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
            : 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'}`}
        on:click={() => setActive(t.id)}
        title={t.name}
      >
        {t.name}
      </button>
    {/each}
    <button
      class="px-3 py-1.5 rounded-full border text-sm bg-emerald-700 text-white border-emerald-600 hover:bg-emerald-600"
      on:click={addTab}
      title="Add preset"
    >
      <span class="inline-flex items-center gap-2"><Fa icon={faPlus} size="1x" /> Add Preset</span>
    </button>
  </div>

  <!-- Tab meta (rename/delete) -->
  <div class="mt-3 flex items-center gap-3">
    <label class="text-sm text-gray-300">Preset name</label>
    <input
      value={currentTab()?.name ?? ''}
      on:input={(e) => renameTab(activeId, (e.target as HTMLInputElement).value)}
      class="rounded-md bg-slate-800 border border-slate-700 px-3 py-1.5 text-white"
      placeholder="Preset name"
    />
    <button
      class="ml-auto px-3 py-1.5 rounded-md bg-rose-700 hover:bg-rose-600 text-white"
      on:click={() => deleteTab(activeId)}
      title="Delete preset"
      disabled={tabs.length === 1}
    >
      <span class="inline-flex items-center gap-2"><Fa icon={faTrash} size="1x" /> Delete</span>
    </button>
  </div>
</div>

<!-- BUILDER CONTROLS -->
<div class="max-w-3xl mx-auto mt-6 space-y-6">
  <div class="flex items-center gap-3">
    <label class="text-sm text-gray-300">Title</label>
    <input
      value={currentTab()?.title ?? ''}
      on:input={(e) => updateTitle((e.target as HTMLInputElement).value)}
      class="flex-1 rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-white"
      placeholder="Section title"
    />
    <button
      on:click={captureStats}
      class="px-3 py-2 rounded-md bg-slate-700 hover:bg-slate-600 text-white"
      title="Capture preview"
    >
      <span class="inline-flex items-center gap-2"><Fa icon={faCamera} size="1x" /> Capture</span>
    </button>
  </div>

  <div class="rounded-lg border border-slate-700 bg-slate-900 p-4">
    <div class="grid grid-cols-1 md:grid-cols-12 gap-3">
      <!-- Avatar select -->
      <div class="md:col-span-4">
        <label class="block text-sm text-gray-300 mb-1">Avatar</label>
        <select
          bind:value={selectedName}
          class="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-white"
        >
          {#each valkyries as v}
            <option value={v.name}>{v.name}</option>
          {/each}
        </select>
      </div>

      <!-- Text -->
      <div class="md:col-span-7">
        <label class="block text-sm text-gray-300 mb-1">Instruction</label>
        <textarea
          bind:value={stepText}
          rows="2"
          class="w-full rounded-md bg-slate-800 border border-slate-700 px-3 py-2 text-white"
          placeholder="e.g. Ultimate ➔ Weapon ➔ Basic x4 ➔ Combo ATK ..."
        />
      </div>

      <!-- Add -->
      <div class="md:col-span-1 flex md:items-end">
        <button
          on:click={addStep}
          class="w-full md:w-auto h-10 mt-2 md:mt-0 px-3 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white font-medium"
          title="Add step"
        >
          <span class="inline-flex items-center gap-2"><Fa icon={faPlus} size="1x" /> Add</span>
        </button>
      </div>
    </div>

    <!-- Current steps list -->
    {#if currentTab()?.steps?.length > 0}
      <div class="mt-4 space-y-2">
        {#each currentTab().steps as s, i}
          <div class="flex items-center gap-3 rounded-md bg-slate-800/70 border border-slate-700 p-2">
            <img src={s.image} alt={s.name} class="h-9 w-9 rounded-full object-cover" />
            <div class="flex-1">
              <div class="text-sm text-amber-300">{s.name}</div>
              <div class="text-sm text-white">{s.text}</div>
            </div>
            <div class="flex items-center gap-1">
              <button on:click={() => moveUp(i)} class="px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-white" title="Move up">
                <Fa icon={faArrowUp} size="1x" />
              </button>
              <button on:click={() => moveDown(i)} class="px-2 py-1 rounded bg-slate-700 hover:bg-slate-600 text-white" title="Move down">
                <Fa icon={faArrowDown} size="1x" />
              </button>
              <button on:click={() => removeStep(i)} class="px-2 py-1 rounded bg-rose-700 hover:bg-rose-600 text-white" title="Remove">
                <Fa icon={faTrash} size="1x" />
              </button>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  </div>
</div>

<!-- PREVIEW (screenshot target) -->
<div id="statsSection" class="max-w-lg mx-auto bg-slate-900 p-4 space-y-2 my-10">
  <div class="text-center">
    <h2 class="text-xl font-semibold mb-4 text-amber-400">{currentTab()?.title ?? ''}</h2>
  </div>

  {#if (currentTab()?.steps?.length ?? 0) === 0}
    <div class="text-center text-slate-300 text-sm bg-slate-800/60 rounded-lg p-4">
      Add steps above to see them here.
    </div>
  {/if}

  {#each currentTab()?.steps ?? [] as s, i}
    <div class={`flex items-center p-3 rounded-lg ${i % 2 === 0 ? 'bg-slate-800' : 'bg-slate-700'}`}>
      <img src={s.image} alt={s.name} class="h-12 w-12 rounded-full mr-4 object-cover" />
      <div>
        <p class="text-white text-base">{s.text}</p>
      </div>
    </div>
  {/each}
</div>
