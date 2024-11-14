<script lang="ts">
	import '../app.css';
	import Footer from '$lib/components/footer.svelte';
    import Navbar from '$lib/components/navbar.svelte';

	let { children } = $props();

	import { onNavigate } from '$app/navigation';

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
<main class="flex-grow">
	
	{@render children()}


</main>

</div>
