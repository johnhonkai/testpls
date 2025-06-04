<script lang="ts">
  import CardContainer from './CardContainer.svelte';
  import CardBody from './CardBody.svelte';
  import CardItem from './CardItem.svelte';

  export let card;
  let isMouseEntered = false;
</script>

<a href={`/${card.slug}`}>
  <CardContainer bind:isMouseEntered className="inter-var">
    <CardBody className="relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-zinc-900 border-white/[0.2] max-w-[400px] max-h-70 rounded-xl p-6 border">
      <CardItem {isMouseEntered} translateZ="50" className="text-xl font-bold text-white">
        {card.name}
      </CardItem>

      <CardItem {isMouseEntered} translateZ="100" className="w-full mt-4">
        <img
          src={card.image}
          class="h-45 w-full rounded-xl object-cover object-top group-hover/card:shadow-xl"
          alt="{card.name} thumbnail"
        />
      </CardItem>
    </CardBody>
  </CardContainer>
</a>
