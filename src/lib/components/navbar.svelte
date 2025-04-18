<script>
  import { onMount } from 'svelte';
	import { page } from '$app/stores';

  let isOpen = false;
  let isNavbarVisible = true;
  let lastScrollY = 0;

  let navLinks = [
    { name: 'Home', href: '/', img: "" },
    { name: 'Valkyrie', href: '/valk' , img: ""},
    { name: 'Account Planner', href: '/planner', img: "" },
    { name: 'AstralOp', href: '/asop', img: "/images/navbar/astralop.webp" },
    { name: 'Boss', href: '/boss', img: "" },
    { name: 'Timeline', href: '/calendar82', img: "" },
    { name: 'Classroom', href: '/classroom', img: "" },
    { name: 'Beta News', href: '/betanews' , img: ""},
  ];

  function toggleMenu() {
    isOpen = !isOpen;
  }

  // Track scroll direction to show/hide the navbar
  onMount(() => {
      const handleScroll = () => {
          const currentScrollY = window.scrollY;
          isNavbarVisible = currentScrollY < lastScrollY || currentScrollY < 10;
          lastScrollY = currentScrollY;
      };

      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
  });
</script>

<div class="lg:flex justify-center relative z-100 hidden">
<header>


	<nav class="">
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z" />
		</svg>
		<ul class="text-slate-800">
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/" class="custom-font" data-sveltekit-preload-data="hover">Home</a>
			</li>
      <li aria-current={$page.url.pathname.startsWith('/valk') ? 'page' : undefined}>
				<a href="/valk" class="custom-font" data-sveltekit-preload-data="hover">Valkyrie</a>
			</li>

      <li aria-current={$page.url.pathname === '/asop' ? 'page' : undefined}>
				<a href="/asop" class="custom-font" data-sveltekit-preload-data="hover">AstralOp</a>
			</li>


			
			<li aria-current={$page.url.pathname.startsWith('/calendar') ? 'page' : undefined}>
				<a href="/calendar82" class="custom-font" data-sveltekit-preload-data="hover">Timeline</a>
			</li>

			<li aria-current={$page.url.pathname.startsWith('/boss') ? 'page' : undefined}>
				<a href="/boss" class="custom-font" data-sveltekit-preload-data="hover">Boss</a>
			</li>

			<li aria-current={$page.url.pathname.startsWith('/betanews') ? 'page' : undefined}>
				<a href="/betanews" class="custom-font" data-sveltekit-preload-data="hover">Beta News</a>
			</li>

			<li aria-current={$page.url.pathname.startsWith('/classroom') ? 'page' : undefined}>
				<a href="/classroom/welcome" class="custom-font" data-sveltekit-preload-data="hover">Classroom</a>
			</li>


			<li aria-current={$page.url.pathname === '/hi3awards' ? 'page' : undefined}>
				<a href="/hi3awards" class="custom-font" data-sveltekit-preload-data="hover">HI3 Awards</a>
			</li>
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>


</header>
</div>


<style>
  .navbar {
	display: flex;
  position: absolute;
	justify-content: space-between;
	view-transition-name: header;
	
}

li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page']::before {
		--size: 8px;
		content: '';
		width: 0;
		height: 0;
		position: absolute;
		top: 0;
		left: calc(50% - var(--size));
		border: var(--size) solid transparent;
    border-top: var(--size) solid var(--color-theme-1, #fa7335); /* Adjust to your theme color */
		view-transition-name: active-page;
	}

  header {
		display: flex;
		justify-content: space-between;
    position: absolute;
		view-transition-name: header;
	}

	.corner {
		width: 3em;
		height: 3em;
	}

	.corner a {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.corner img {
		width: 2em;
		height: 2em;
		object-fit: contain;
	}

	nav {
		display: flex;
		justify-content: center;
		--background: rgb(255, 255, 255);
	}

	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}


	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		font-weight: 700;
		font-size: 0.85rem;
		text-transform: uppercase;
		letter-spacing: 0.1em;
		text-decoration: none;
		transition: color 0.2s linear;
	}
	a:hover {
		color: var(--color-theme-1, #00aaff);
	}

</style>