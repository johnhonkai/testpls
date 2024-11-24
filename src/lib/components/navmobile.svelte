<script>
	import MemberList from './member.svelte';
	import { onMount } from 'svelte';

	let showProfileModal = false; // Profile modal visibility
	let showPrivacyModal = false; // Privacy Policy modal visibility
	let showAboutModal = false; // Privacy Policy modal visibility
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
			if (showProfileModal && modalBox && !modalBox.contains(event.target)) {
				closeModal();
			}
		}

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	});

	// Open the Profile modal
	function openProfileModal() {
		showProfileModal = true;
	}

		// Open the Privacy Policy modal
		function openPrivacyModal() {
		showPrivacyModal = true;
	}

			// Open the Privacy Policy modal
			function openAboutModal() {
		showAboutModal = true;
	}

	// Close the modal
	function closeModal() {
		showProfileModal = false;
		showPrivacyModal = false;
		showAboutModal = false;
	}

	// Close modal on clicking outside
	onMount(() => {
		function handleClickOutside(event) {
			const modalBox = document.querySelector('.modal-box');
			if (showPrivacyModal || showAboutModal && modalBox && !modalBox.contains(event.target)) {
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
	<div class="navbar py-0 bg-base-300 absolute z-40 lg:z-20 " style="view-transition-name: daisyuinav;">
		<div class="navbar-start">
			<div class="dropdown">
				<div tabindex="0" role="button" class="btn btn-ghost lg:hidden">
					<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
					</svg>
				</div>
				<ul tabindex="0" class="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow">
					<li><a href="/valk">Valkyrie</a></li>
					<li><a href="/asop">Astral Op</a></li>

					<li><a href="/boss">Boss</a></li>
					<li><a href="/calendar79">Timeline</a></li>
					<li><a href="/classroom/welcome">Classroom</a></li>
					<li><a href="/betanews">Beta News</a></li>
					<li><a href="/hi3awards">HI3 Awards</a></li>

				</ul>
			</div>
			<a class="btn btn-ghost">Marisa Impact BETA</a>
		</div>

		<div class="navbar-end">
			<div class="dropdown dropdown-end">
				<div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
					<div class="w-10 rounded-full">
						<img alt="Avatar" src={avatarImage} />
					</div>
				</div>
				<ul tabindex="0" class="menu menu-sm dropdown-content bg-base-300 rounded-box z-[1] mt-3 w-52 p-2 shadow">
					<li>
						<a class="justify-between" on:click={openProfileModal} >
							Profile
							<span class="badge">New</span>
						</a>
					</li>
					<li>
						<a on:click={openAboutModal}>
							About
						</a>
					</li>
					<li>
						<a on:click={openPrivacyModal}>
							Privacy Policy
						</a>
					</li>					
					<li><a>Logout</a></li>
				</ul>
			</div>
		</div>
	</div>
</div>

<!-- DaisyUI Modal for Profile -->
{#if showProfileModal}
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

<!-- Privacy Policy Modal -->
{#if showPrivacyModal}
	<div class="modal modal-open">
		<div class="modal-box max-w-3xl overflow-y-auto">
			<h2 class="text-xl font-bold mb-4">Privacy Policy</h2>
			<p class="text leading-relaxed">
				This website collects anonymous data for voting (HI3 Awards Page), view count (Articles) and analytics purposes.
				Your data will not be shared with third parties. 
			</p>
			<ul class="list-disc ml-6 mt-4 ">
				<li>Votes are stored anonymously.</li>
				<li>Analytics data is used to improve user experience.</li>
				<li>Cookies may be used for session management.</li>
			</ul>
			<div class="modal-action">
				<button class="btn btn-secondary" on:click={closeModal}>Close</button>
			</div>
		</div>
	</div>
{/if}


{#if showAboutModal}
	<div class="modal modal-open">
		<div class="modal-box max-w-3xl overflow-y-auto">
			<h2 class="text-xl font-bold mb-4">About</h2>
			<p class="text leading-relaxed mb-6">
				This is a fan-created website of the game Honkai Impact 3rd by content creator 
				<span class="text-blue-400"><a href="https://www.youtube.com/@MarisaHonkai" target="_blank">Marisa Honkai</a></span>.
			</p>

			<p class="text leading-relaxed mb-2">
				Marisa Honkai F2P has been playing Honkai Impact for a few years. Some of his in-game achievements include: 
			</p>
			<ul class="list-disc ml-6 text-sm sm:text-base px-2">
				<li> <span class="text-blue-400 underline"><a href="https://www.youtube.com/watch?v=MoZSgbbXuE8" target="_blank">Top 1 Darkbolt Jonin Myriad in hardest server SEA</a></span></li>
				<li> Top 15 Lantern Myriad in hardest server SEA I forgot was it tank or kasumi</li>
				<li> uh what else, i guess occasional top 50 or 100 i should stay in nirv and upload nirvana run more often </li>
				<li> <span class="text-blue-400 underline"><a href="https://www.youtube.com/watch?v=H6RBW8dzVwY" target="_blank">Promoted from Agony with just White Comet</a></span></li>

			</ul>
			<div class="divider divider-neutral my-5"></div>


			<!-- Support and Socials Section -->
			<div class="flex flex-col sm:flex-row justify-between items-start space-y-6 sm:space-y-0">
				<!-- Support Me Section -->
				<div class="flex items-start space-x-4">
					<img src="https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/images/songquexd%20copy.webp" alt="Support Icon" class=" rounded h-20 w-20">
					<div>
						<h3 class="text-lg font-semibold mb-2">SUPPORT ME</h3>
						<div class="flex space-x-4">
							<a href="https://www.youtube.com/marisahonkai/join" target="_blank" class="btn btn-square btn-outline">
								<i class="fab fa-youtube text-xl"></i> <!-- Font Awesome YouTube -->
							</a>
							<a href="https://ko-fi.com/marisahonkai" target="_blank" class="btn btn-square btn-outline">
								<i class="fas fa-mug-hot text-xl"></i> <!-- Font Awesome Ko-fi -->
							</a>
							<a href="https://paypal.me/marisahonkai" target="_blank" class="btn btn-square btn-outline">
								<i class="fab fa-paypal text-xl"></i> <!-- Font Awesome PayPal -->
							</a>
						</div>
						<p class="text-gray-400 text-sm mt-2">Join YouTube membership, or donate</p>
					</div>
				</div>

				<!-- Socials Section -->
				<div>
					<h3 class="text-lg font-semibold mb-2">SOCIAL</h3>
					<div class="flex space-x-4">
						<a href="https://www.youtube.com/@MarisaHonkai" target="_blank" class="btn btn-square btn-outline">
							<i class="fab fa-youtube text-xl"></i> <!-- Font Awesome YouTube -->
						</a>
						<a href="https://www.hoyolab.com/accountCenter/postList?id=1021101" target="_blank" class="btn btn-square btn-outline">
							<img src="https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/images/hoyolab%20copy.webp" alt="HoYoLab" class="h-6 w-8 opacity-70">
						</a>
						<a href="https://discord.gg/marisahonkai" target="_blank" class="btn btn-square btn-outline">
							<i class="fab fa-discord text-xl"></i> <!-- Font Awesome Discord -->
						</a>
						<a href="https://twitter.com/marisahonkai" target="_blank" class="btn btn-square btn-outline">
							<i class="fab fa-twitter text-xl"></i> <!-- Font Awesome Twitter -->
						</a>
						<a href="https://www.instagram.com/morisohonkai/" target="_blank" class="btn btn-square btn-outline">
							<i class="fab fa-instagram text-xl"></i> <!-- Font Awesome Instagram -->
						</a>

					</div>
					<p class="text-gray-400 text-sm mt-2">For the latest HI3 news, guides, and memes</p>
				</div>
			</div>

			<div class="modal-action">
				<button class="btn btn-secondary" on:click={closeModal}>Close</button>
			</div>
		</div>
	</div>
{/if}
