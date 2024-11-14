<script>
    export let image;
    export let date = ""; // Optional: Default is empty
    export let weather = ""; // Optional: Default is empty
    export let bosspage ="";
</script>


{#snippet div()}
<div class="w-36 h-16 relative bg-blue-900 rounded-lg flex flex-col items-center cursor-pointer hover:scale-105 transition transform will-change-transform ease-linear">

    {#if date}
        <span class="w-[50px] h-[18px] leading-4 text-center absolute top-1 left-1 bg-orange-500 text-[14px] font-semibold rounded">
            {date}
        </span>
    {/if}

    {#if image}
    <!-- svelte-ignore a11y_img_redundant_alt -->
    <img src={image} alt="Boss Image" class="w-full h-16 object-cover rounded-md mb-1" />
    {/if}

    {#if weather}
        <span class="absolute bottom-0 right-1.5 font-semibold text-outline bg-opacity-50 rounded">
            {weather}
        </span>
    {/if}

</div>

{/snippet}

{#if bosspage}

<a href="{bosspage}">
    {@render div()}
</a>

{:else}
{@render div()}


{/if}
<style>
    .text-outline {
        text-shadow:  -1px 1px 1px black, 1px 1px 1px black, 1px -1px 1px black, -1px -1px 1px black}
</style>