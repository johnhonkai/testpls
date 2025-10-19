<script lang="ts">
  import CardContainer from './CardContainer.svelte';
  import CardBody from './CardBody.svelte';
  import CardItem from './CardItem.svelte';

  export let card;
  let showVideo = false;
  let isMouseEntered = false;

  function handleKeydown(event) {
    if (event.key === "Escape") {
      showVideo = false;
    }
  }

  function isYouTubeLink(url: string) {
    return url.includes("youtube.com") || url.includes("youtu.be");
  }

  function toYouTubeEmbed(url: string) {
    try {
      let videoId = "";

      if (url.includes("youtube.com/watch")) {
        // https://www.youtube.com/watch?v=abcd123
        const params = new URL(url).searchParams;
        videoId = params.get("v") ?? "";
      } else if (url.includes("youtu.be/")) {
        // https://youtu.be/abcd123
        videoId = url.split("youtu.be/")[1].split("?")[0];
      }

      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    } catch (e) {
      return url;
    }
  }
</script>

<CardContainer bind:isMouseEntered className="inter-var">
  <CardBody className="relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-rose-900 border-white/[0.2] max-w-[400px] max-h-80 rounded-xl p-6 border">
    <CardItem {isMouseEntered} translateZ="50" className="text-lg font-bold text-white">
      {card.title}
    </CardItem>

    <CardItem {isMouseEntered} translateZ="100" className="w-full mt-4">
      <img
        src={card.image}
        class="h-40 w-full rounded-xl object-cover object-top group-hover/card:shadow-xl cursor-pointer"
        alt="{card.name} thumbnail"
        on:click={() => showVideo = true}
      />
    </CardItem>

    <slot /> <!-- main content -->
    <slot name="below" /> <!-- optional below content -->
  </CardBody>
</CardContainer>

{#if showVideo}
  <!-- Overlay -->
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
    on:click={() => showVideo = false}
  >
    <!-- Video container -->
    <div
      class="relative w-full max-w-3xl aspect-video"
      on:click|stopPropagation
    >
      {#if isYouTubeLink(card.video)}
        <iframe
          src={toYouTubeEmbed(card.video)}
          class="w-full h-full rounded-lg"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      {:else}
        <video
          src={card.video}
          controls
          autoplay
          class="w-full h-full rounded-lg"
        ></video>
      {/if}
    </div>
  </div>
{/if}
