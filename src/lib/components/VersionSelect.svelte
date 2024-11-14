    <script>
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    let versions = ["7.9", "7.8"];
    export let currentVersion = "7.9"; // Set current version

    function changeVersion(event) {
        const newVersion = event.target.value;
        goto(`/calendar${newVersion.replace('.', '')}`); // Redirect to the new version route
    }

    </script>
    
    <div class="flex justify-center items-center gap-2"> Version:
    <label class="form-control">

        <select class="select select-bordered select-sm w-full max-w-xs" on:change={changeVersion} bind:value={currentVersion}>
            
            {#each versions as ver}
                <option value={ver}>{ver}</option>
            {/each}
        </select>
      </label>
    </div>
