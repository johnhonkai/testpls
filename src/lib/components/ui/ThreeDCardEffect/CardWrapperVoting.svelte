<script lang="ts">
  import CardContainer from './CardContainer.svelte';
  import CardBody from './CardBody.svelte';
  import CardItem from './CardItem.svelte';

  export let card;

  
  let isMouseEntered = false;
</script>

  <CardContainer bind:isMouseEntered className="inter-var">
    <CardBody className="relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-[url('https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/bgpurple2.svg')]  border-white/[0.2] max-w-[400px] max-h-80 rounded-xl p-6 border">
      <CardItem {isMouseEntered} translateZ="50" className="text-lg font-bold text-white">
        {card.title}
      </CardItem>

      <CardItem {isMouseEntered} translateZ="100" className="w-full mt-4">
        <img
          src={card.image}
          class="h-40 w-full rounded-xl object-cover object-top group-hover/card:shadow-xl"
          alt="{card.name} thumbnail"
        />
      </CardItem>
  <slot /> <!-- main content -->

  <slot name="below" /> <!-- optional below content -->
    </CardBody>
  </CardContainer>
