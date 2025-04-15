<script lang="ts">
    export let name: string;
    export let image: string;
    export let teampct: string;
    export let speed: string | undefined; // Optional: 'Fast' or 'Slow'
    export let utility: string | undefined; // Optional: 'Fast' or 'Slow'

    // Function to determine the background color for teampct based on its value
    function getTeampctBg(teampct: string): string {
        const pct = parseInt(teampct);

        if (pct >= 80 && pct <= 89) {
            return 'bg-violet-700';
        } else if (pct >= 60 && pct <= 79) {
            return 'bg-orange-600';
        } else if (pct < 60) {
            return 'bg-slate-600';
        } else {
            return 'bg-rose-600'; // Default bg for anything above 89
        }
    }

    // Function to determine the background color for speed
    function getSpeedBg(speed: string | undefined): string {
        if (speed === 'Fast') {
            return 'bg-rose-600';
        } else if (speed === 'Slow') {
            return 'bg-slate-600';
        } else {
            return '';
        }
    }
</script>

<div class="relative w-20 h-20 sm:w-28 sm:h-28">
    <!-- Badge for teampct with conditional background color -->
     {#if teampct}
    <span class="sm:badge-md badge badge-sm w-10 absolute top-0.5 right-0.5 text-white px-1 rounded-sm z-10 text-center {getTeampctBg(teampct)}">
        {teampct}
    </span>
    {/if}

    <!-- Optional Badge for speed with conditional background color -->
    {#if utility}
        <span class="sm:badge-md badge badge-sm w-10 absolute sm:top-6 top-5 right-0.5 text-white px-1 rounded-sm z-10 text-center bg-blue-900">
            {utility}
        </span>
    {/if}

    <!-- Optional Badge for speed with conditional background color -->
    {#if speed}
        <span class="sm:badge-md badge badge-sm w-10 absolute sm:top-6 top-5 right-0.5 text-white px-1 rounded-sm z-10 text-center {getSpeedBg(speed)}">
            {speed}
        </span>
    {/if}

    <!-- Character Image -->
    <img src={image} alt={name} class="w-full h-full object-cover  shadow-md">
</div>
