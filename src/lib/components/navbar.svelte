<script>
  import { onMount } from 'svelte';

  let isOpen = false;
  let isNavbarVisible = true;
  let lastScrollY = 0;

  let navLinks = [
    { name: 'Home', href: '/testpls' },
    { name: 'Valkyrie', href: '/testpls/valk' },
    { name: 'Account Planner', href: '/testpls/planner' },
    { name: 'AstralOp', href: '/testpls/asop' },
    { name: 'Boss', href: '/testpls/boss' },
    { name: 'Timeline', href: '/testpls/calendar79' },
    { name: 'Classroom', href: '/testpls/classroom' },
    { name: 'Beta News', href: '/testpls/beta-news' },
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


<nav class="navbar bg-gray-800/75 text-white p-4 w-full z-40 backdrop-blur-md {isNavbarVisible ? '' : 'navbar-hidden'}">
  
  <div class="flex justify-between items-center w-full">
      <!-- Left Section: Hamburger Menu and Logo -->
      <div class="flex items-center space-x-4">
          <button
              class="block lg:hidden focus:outline-none"
              on:click={toggleMenu}
              aria-label="Toggle menu"
          >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
          </button>
          <a href="/" class="text-2xl font-bold flex items-center">
              My Site
              <span class="text-sm ml-2 text-gray-400">v1.1</span> <!-- Version Text -->
          </a>
      </div>
      <ul class="hidden lg:flex space-x-4">
          {#each navLinks as link}
              <li><a href="{link.href}" class="">{link.name}</a></li>
          {/each}
      </ul>
  </div>

    <!-- Mobile Navigation Menu (hidden by default) -->
    <div class={`lg:hidden ${isOpen ? 'block' : 'hidden'} mt-4`}>
      <ul class="flex flex-col space-y-2">
        {#each navLinks as link}
          <li><a href="{link.href}" class="block p-2 hover:underline">{link.name}</a></li>
        {/each}
      </ul>
    </div>
</nav>

<style>
  .navbar {
	display: flex;
	justify-content: space-between;
	view-transition-name: header;
}
</style>