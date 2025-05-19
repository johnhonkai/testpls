<script>
import { onMount } from 'svelte';
import { page } from '$app/stores';

import { goto } from '$app/navigation';

import { afterNavigate, beforeNavigate } from '$app/navigation';

	import Fa from 'svelte-fa';
  import { faStar , faWebAwesome , faChartSimple } from '@fortawesome/free-solid-svg-icons';

beforeNavigate(() => {
  document.documentElement.classList.add('hover-disabled');
});

afterNavigate(() => {
  requestAnimationFrame(() => {
    document.documentElement.classList.remove('hover-disabled');
  });
});

function handleClick(event, path) {
  const dropdown = event.currentTarget.closest('.group')?.querySelector('.dropdown-menu');
  if (dropdown) {
    dropdown.classList.add('opacity-0', 'invisible');
  }

  setTimeout(() => {
    goto(path);
  }, 100);
}
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
				<a href="/" class="nav-link custom-font" data-sveltekit-preload-data="hover">Home</a>
			</li>
<li aria-current={$page.url.pathname.startsWith('/valk') ? 'page' : $page.url.pathname.startsWith('/ar') ? 'page' : undefined}>
  <div class="relative group mt-3.5 -mr-1">
				<!-- Button -->
    <div
      class="nav-link custom-font text-white hover:text-sky-400 transition-colors duration-200 cursor-pointer"
      on:click={(e) => handleClick(e, '/valk')}
    >
      VALKYRIE ▾
    </div>
			  
				<!-- Dropdown -->
    <div
      class="dropdown-menu absolute top-6 -right-50 w-[500px] bg-zinc-900 text-white shadow-xl rounded-lg
      invisible opacity-0 group-hover:visible group-hover:opacity-100
      transition-all duration-200 z-50"
    >
				  <div class="grid grid-cols-2 gap-4 p-4">
					<!-- Left column -->

					<a
					href="/valk"
					data-sveltekit-preload-data="hover"
				  >
					<div
					class="bg-zinc-800 rounded-md p-4 h-full transition hover:bg-zinc-700 hover:shadow-md cursor-pointer"
				  >
					<div class="text-white font-semibold mb-1">Valkyrie Guide</div>
					<p class="text-sm text-zinc-400">Learn more about your waifus here</p>
				  </div>
					</a>
					<!-- Right column -->
					<div class="flex flex-col gap-3">
						<a
						href="/ar"
						data-sveltekit-preload-data="hover"
					  >
					  <div
						class="p-2 rounded-md transition hover:bg-zinc-800  cursor-pointer"
					  >

						<div class="font-semibold">
														        <span 
        class="relative z-10 flex items-center gap-2 cursor-pointer text-center text-amber-400">
          <Fa icon={faStar} />
		  Astral Ring
        </span>  


						</div>

						<p class="text-sm text-zinc-400 group-hover:text-zinc-300">Overview of all AR teams.</p>
					  </div>
					</a>
											<a
						href="/statistics"
						data-sveltekit-preload-data="hover"
					  >			
					  <div
						class="p-2 rounded-md transition hover:bg-zinc-800 cursor-pointer"
					  >
						<div class="font-semibold">
							        <span 
        class="relative z-10 flex items-center gap-2 cursor-pointer text-center text-rose-500">
          <Fa icon={faChartSimple} />
		  Statistics
        </span>  


						</div>

						<p class="text-sm text-zinc-400 group-hover:text-zinc-300">Charater usage in a version</p>
					  </div>
											</a>
											<a
						
						data-sveltekit-preload-data="hover"
					  >
					  <div
						class="p-2 rounded-md transition hover:bg-zinc-800  cursor-pointer"
					  >
						<div class="font-semibold"> 
							        <span 
        class="relative z-10 flex items-center gap-2 cursor-pointer text-center text-teal-500">
          <Fa icon={faWebAwesome} />
		  Best Valkyries
        </span>  
							
						</div>
						<p class="text-sm text-zinc-400 group-hover:text-zinc-300">Coming Soon</p>
					  </div>

											</a>


					</div>
				  </div>
				</div>
			  </div>
			</li>



      <li aria-current={$page.url.pathname === '/asop' ? 'page' : undefined}>
				<a href="/asop" class="nav-link custom-font" data-sveltekit-preload-data="hover">AstralOp</a>
			</li>


			
			<li aria-current={$page.url.pathname.startsWith('/calendar') ? 'page' : undefined}>
				<a href="/calendar82" class="nav-link custom-font" data-sveltekit-preload-data="hover">Timeline</a>
			</li>
			
<li aria-current={$page.url.pathname.startsWith('/boss') ? 'page' : undefined}>

  <div class="relative group mt-3.5 -mr-1">
				<!-- Button -->
				<a
				href="/boss"
				  class="nav-link custom-font text-white hover:text-sky-400 transition-colors duration-200 cursor-pointer"
				  data-sveltekit-preload-data="hover"
				>
				  BOSS ▾
				</a>
			  
				<!-- Dropdown -->
				<div
				  class="absolute top-5 -right-40 w-[250px] bg-zinc-900 text-white shadow-xl rounded-lg
				  invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50"
				>
				  <div class="grid grid-cols-1 gap-4 p-4">
					<!-- Left column -->


					<!-- Right column -->
					<div class="flex flex-col gap-3">
						<a
						href="/boss"
						data-sveltekit-preload-data="hover"
					  >
					  <div
						class="p-2 rounded-md transition hover:bg-zinc-800  cursor-pointer"
					  >

						<div class="font-semibold">
														        <span 
        class="relative z-10 flex items-center gap-2 cursor-pointer text-center text-amber-400">
          <Fa icon={faStar} />
		  Abyss Mode
        </span>  


						</div>

						<p class="text-sm text-zinc-400 group-hover:text-zinc-300">Reference for Abyss mode</p>
					  </div>
					</a>
											<a
						href="https://www.arustats.com/en-us/hi3/memorial/"
						data-sveltekit-preload-data="hover"
					  >			
					  <div
						class="p-2 rounded-md transition hover:bg-zinc-800 cursor-pointer"
					  >
						<div class="font-semibold">
							        <span 
        class="relative z-10 flex items-center gap-2 cursor-pointer text-center text-rose-500">
          <Fa icon={faChartSimple} />
		  Memorial Arena
        </span>  


						</div>

						<p class="text-sm text-zinc-400 group-hover:text-zinc-300">You will be redirected to Arustat</p>
					  </div>
											</a>
					</div>
				  </div>
				</div>
			  </div>
</li>
			<li aria-current={$page.url.pathname.startsWith('/betanews') ? 'page' : undefined}>
				<a href="/betanews" class="nav-link custom-font" data-sveltekit-preload-data="hover">Beta News</a>
			</li>

			<li aria-current={$page.url.pathname.startsWith('/classroom') ? 'page' : undefined}>
				<a href="/classroom/welcome" class="nav-link custom-font" data-sveltekit-preload-data="hover">Classroom</a>
			</li>



			<div class="relative group">
				<!-- Button -->
				<a
				  class="nav-link custom-font text-white hover:text-sky-400 transition-colors duration-200 cursor-pointer"
				  data-sveltekit-preload-data="hover"
				>
				  MORE ▾
				</a>
			  
				<!-- Dropdown -->
				<div
				  class="absolute top-5 -right-40 w-[500px] bg-zinc-900 text-white shadow-xl rounded-lg
				  invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 z-50"
				>
				  <div class="grid grid-cols-2 gap-4 p-4">
					<!-- Left column -->

					<a
					href="https://www.arustats.com/"
					data-sveltekit-preload-data="hover"
				  >
					<div
					class="bg-zinc-800 rounded-md p-4 h-full transition hover:bg-zinc-700 hover:shadow-md cursor-pointer"
				  >
					<div class="text-white font-semibold mb-1">Arustats</div>
					<p class="text-sm text-zinc-400">Check out Arustat site for HI3 teambuilder, Arena teams, gacha simulator, and more.</p>
				  </div>
					</a>
					<!-- Right column -->
					<div class="flex flex-col gap-3">
						<a
						href="/story"
						data-sveltekit-preload-data="hover"
					  >
					  <div
						class="p-2 rounded-md transition hover:bg-zinc-800  cursor-pointer"
					  >

						<div class="font-semibold">Story</div>

						<p class="text-sm text-zinc-400 group-hover:text-zinc-300">Story and Events Order</p>
					  </div>
					</a>
						<a
						href="/hi3awards"
						data-sveltekit-preload-data="hover"
					  >
					  <div
						class="p-2 rounded-md transition hover:bg-zinc-800  cursor-pointer"
					  >

						<div class="font-semibold">2024 Awards</div>

						<p class="text-sm text-zinc-400 group-hover:text-zinc-300">Celebrate HI3</p>
					  </div>
					</a>
					  <div
						class="p-2 rounded-md transition hover:bg-zinc-800 cursor-pointer"
					  >
						<div class="font-semibold">⚙️ To Be Added</div>
						<p class="text-sm text-zinc-400 group-hover:text-zinc-300">Coming Soon</p>
					  </div>
					</div>
				  </div>
				</div>
			  </div>
			  
		</ul>
		<svg viewBox="0 0 2 3" aria-hidden="true">
			<path d="M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z" />
		</svg>
	</nav>


</header>
</div>


<style>

	.hover-disabled .group:hover .dropdown-menu {
  visibility: hidden !important;
  opacity: 0 !important;
}
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


	.nav-link {
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
.nav-link:hover {
		color: var(--color-theme-1, #00aaff);
	}

</style>