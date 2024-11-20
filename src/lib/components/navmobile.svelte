<script>
	import MemberList from './member.svelte';
	import { onMount } from 'svelte';

	let showModal = false; // Modal visibility state
	let avatarImage; // Randomly selected avatar image

	// Dynamically load all images in /static/images/bg/memberpic
	const memberPicImages = Object.keys(import.meta.glob('/static/images/randompic/*.{png,webp}')).map((path) =>
		path.replace('/static', '')
	);

	// Helper function to get a random image
	function getRandomMemberPic() {
		return memberPicImages[Math.floor(Math.random() * memberPicImages.length)];
	}

	// Set the avatar image on mount
	onMount(() => {
		avatarImage = getRandomMemberPic();

		// Close modal on clicking outside
		function handleClickOutside(event) {
			const modalBox = document.querySelector('.modal-box');
			if (showModal && modalBox && !modalBox.contains(event.target)) {
				closeModal();
			}
		}

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	});

	// Open the modal
	function openProfileModal() {
		showModal = true;
	}

	// Close the modal
	function closeModal() {
		showModal = false;
	}

	// Close modal on clicking outside
	onMount(() => {
		function handleClickOutside(event) {
			const modalBox = document.querySelector('.modal-box');
			if (showModal && modalBox && !modalBox.contains(event.target)) {
				closeModal();
			}
		}

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	});
</script>

<div class="flex relative">
	<div class="navbar bg-base-100 absolute z-40 lg:z-20 top-[-10px]" style="view-transition-name: daisyuinav;">
		<div class="navbar-start">
			<div class="dropdown">
				<div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
					</svg>
				</div>
				<ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
					<li><a>Item 1</a></li>
					<li>
						<a>Parent</a>
						<ul class="p-2">
							<li><a>Submenu 1</a></li> 
							<li><a>Submenu 2</a></li>
						</ul>
					</li>
					<li><a>Item 3</a></li>
				</ul>
			</div>
			<a class="btn btn-ghost text-xl">Mars Impact</a>
		</div>

		<div class="navbar-end">
			<div class="dropdown dropdown-end">
				<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar top-1">
					<div class="w-10 rounded-full">
						<img alt="Avatar" src={avatarImage} />
					</div>
				</div>
				<ul tabindex="0" class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
					<li>
						<a class="justify-between" on:click={openProfileModal} >
							Profile
							<span class="badge">New</span>
						</a>
					</li>
					<li><a>Settings</a></li>
					<li><a>Logout</a></li>
				</ul>
			</div>
		</div>
	</div>
</div>

<!-- DaisyUI Modal for Profile -->
{#if showModal}
	<div class="modal modal-open">
		<div class="modal-box max-w-4xl">
			<MemberList />

			<!-- Close Button -->
			<div class="modal-action ">
				<button class="btn" on:click={closeModal}>Close</button>
			</div>
		</div>
	</div>
{/if}
