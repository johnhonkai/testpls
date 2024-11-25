<script lang="ts">
	import '../app.css';
	import Footer from '$lib/components/footer.svelte';
    import Navbar from '$lib/components/navbar.svelte';


	let { children } = $props();

	import { onNavigate } from '$app/navigation';
	import Navmobile from '$lib/components/navmobile.svelte';

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
  <Navmobile></Navmobile>
<main class="flex-grow mt-[3.5rem]">
	
	{@render children()}


</main>

</div>

<svelte:head>
    <meta property="og:title" content="Marisa Impact - A Honkai Impact 3rd Guide Website" />
    <meta property="og:description" content="Honkai Impact 3rd Guides, Character Builds, Beta News and More" />
    <meta property="og:image" content="https://i.imgur.com/SPBNehH.png" />
    <meta property="og:url" content="https://marisaimpact.com" />
    <meta property="og:type" content="website" />

    <meta name="twitter:title" content="Marisa Impact - A Honkai Impact 3rd Guide Website" />
    <meta name="twitter:image" content="https://i.imgur.com/SPBNehH.png" />
    <meta name="twitter:image:type" content="website" />
    <meta name="twitter:card" content="summary_large_image">

    <link rel="canonical"  />
</svelte:head>