<script lang="ts">
	import '../app.css';
	import Footer from '$lib/components/footer.svelte';
    import Navbar from '$lib/components/navbar.svelte';


	let { children } = $props();

	import { onNavigate } from '$app/navigation';
	import Navmobile from '$lib/components/navmobile.svelte';
	import Newnav from '$lib/components/newnav.svelte';

	onNavigate((navigation) => {
    if (
      !document.startViewTransition ||
      navigation.from?.route.id === navigation.to?.route.id 
    ) return;

    return new Promise((resolve) => {
      document.startViewTransition(async () => {
        resolve();
        await navigation.complete;
      });
    });
  });
</script>

<div class="flex flex-col min-h-[100vh]">
	<!-- Main Content Section -->
	<Navbar></Navbar>

  <div class="lg:block hidden">
  <Newnav></Newnav>
  </div>

  <div class="block lg:hidden">
  <Navmobile></Navmobile>
</div>

<main class="grow mt-[3.5rem] lg:mt-0">
	
	{@render children()}


</main>

</div>

