<script lang="ts">
	import CardBody from '$lib/components/ui/ThreeDCardEffect/CardBody.svelte';
	import CardContainer from '$lib/components/ui/ThreeDCardEffect/CardContainer.svelte';
	import CardItem from '$lib/components/ui/ThreeDCardEffect/CardItem.svelte';

	import { onMount } from 'svelte';
	import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore";
	import { app } from "$lib/firebaseConfig";

	let isMouseEntered = false;
	let countdown = '';
	let selectedCard = null;
	let showModal = false;
	let hasVoted = false;

	const db = getFirestore(app);

	// Cards data
	let cards = [
		{ title: 'Deepspace Anchor', description: '', imgSrc: '/images/valkfull/Senadina.png', votes: 0 },
		{ title: 'Valkyrie Boltstorm', description: '', imgSrc: '/images/valkfull/Helia.png', votes: 0 },
		{ title: 'Valkyrie Blastmetal', description: '', imgSrc: '/images/valkfull/Coralie.png', votes: 0 },
		{ title: 'Mad Pleasure', description: '', imgSrc: '/images/valkfull/thelema.png', votes: 0 },
		{ title: 'Lone Destruction', description: '', imgSrc: '/images/valkfull/lantern.png', votes: 0 },
		{ title: 'Jovial Deception', description: '', imgSrc: '/images/valkfull/jd.png', votes: 0 },
		{ title: "Schicksal's Imperative", description: '', imgSrc: '/images/valkfull/teri_simp.png', votes: 0 },
		{ title: 'Lone Planetfarer', description: '', imgSrc: '/images/valkfull/vita.png', votes: 0 },
		{ title: 'Sparkle', description: '', imgSrc: '/images/valkfull/sparkle.png', votes: 0 },
		
	];

	let chaptercards = [
		{ title: 'Chapter 1', description: '', imgSrc: '/images/hi3award24/ch1.webp', votes: 0 },
		{ title: 'Chapter 2', description: '', imgSrc: '/images/hi3award24/ch2.webp', votes: 0 },
		{ title: 'Chapter 3', description: '', imgSrc: '/images/hi3award24/ch3.webp', votes: 0 },
		{ title: 'Chapter 3-EX', description: '', imgSrc: '/images/hi3award24/ch3ex.webp', votes: 0 },
		{ title: 'Chapter 4', description: '', imgSrc: '/images/hi3award24/ch4.webp', votes: 0 },
		{ title: 'Chapter 5', description: '', imgSrc: '/images/hi3award24/ch5.webp', votes: 0 },
		{ title: "Chapter 6", description: '', imgSrc: '/images/hi3award24/ch6.webp', votes: 0 },
	];

	let bosscards = [
		{ title: 'Duonigue', description: '', imgSrc: '/images/hi3award24/duonigue.webp', votes: 0 },
		{ title: 'Lantern', description: '', imgSrc: '/images/hi3award24/lanternboss.webp', votes: 0 },
		{ title: 'Perception', description: '', imgSrc: '/images/hi3award24/ch3.webp', votes: 0 },
	];

	const fetchVoteCounts = async (category) => {
    try {
        const q = query(
            collection(db, "votes"),
            where("category", "==", category)
        );
        const querySnapshot = await getDocs(q);
        const voteCounts = {};

        querySnapshot.forEach((doc) => {
            const { vote } = doc.data();
            if (vote) {
                voteCounts[vote] = (voteCounts[vote] || 0) + 1;
            }
        });

        // Update vote counts for the corresponding category
		if (category === "Best Valkyrie") {
    cards = cards.map((card) => ({
        ...card,
        votes: voteCounts[card.title] || 0,
    }));
} else if (category === "Best Chapter") {
    chaptercards = chaptercards.map((card) => ({
        ...card,
        votes: voteCounts[card.title] || 0,
    }));
} else if (category === "Best Boss") {
    bosscards = bosscards.map((card) => ({
        ...card,
        votes: voteCounts[card.title] || 0,
    }));
}
    } catch (err) {
        console.error("Error fetching vote counts:", err);
    }
};






	// Function to open the vote modal
	const openVoteModal = (cardTitle, category) => {
    const voteKey = `votedFor_${category.replace(" ", "")}`;
    const alreadyVoted = localStorage.getItem(voteKey);

    if (alreadyVoted) {
        alert(`You have already voted for the "${category}" category.`);
        return;
    }

    selectedCard = { title: cardTitle, category }; // Store the category and title
    showModal = true;
};


	// Function to confirm the vote
	const confirmVote = async () => {
    try {
        const category = selectedCard.category; // Determine the category
        const voterId = localStorage.getItem("voterId") || crypto.randomUUID();
        localStorage.setItem("voterId", voterId);

        const voteKey = `votedFor_${category.replace(" ", "")}`;
        const alreadyVoted = localStorage.getItem(voteKey);

        if (alreadyVoted) {
            alert(`You have already voted for the "${category}" category.`);
            return;
        }

        // Save the vote to Firestore
        await addDoc(collection(db, "votes"), {
            voterId,
            vote: selectedCard.title,
            category,
            timestamp: new Date(),
        });

        // Mark as voted locally
        localStorage.setItem(voteKey, selectedCard.title);
        hasVoted = true;
        showModal = false;

        alert(`Thank you for voting for "${selectedCard.title}" in the "${category}" category!`);

        // Refresh vote counts
        await fetchVoteCounts(category);
    } catch (err) {
        console.error("Error confirming vote:", err);
        alert("An error occurred. Please try again later.");
    }
};



	// Function to cancel the vote
	const cancelVote = () => {
		selectedCard = null;
		showModal = false;
	};

	onMount(() => {
    fetchVoteCounts("Best Valkyrie");
    fetchVoteCounts("Best Chapter");
    fetchVoteCounts("Best Boss");

    const deadline = new Date("2024-12-12T16:00:00.000Z");
    const updateCountdown = () => {
        const now = new Date();
        const diff = deadline.getTime() - now.getTime();

        if (diff <= 0) {
            countdown = "Voting has ended.";
            clearInterval(interval);
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const seconds = Math.floor((diff / 1000) % 60);

        countdown = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
    };

    const interval = setInterval(updateCountdown, 1000);
    updateCountdown();
});

</script>

<div class="flex flex-col items-center px-4 py-6 mb-60">
	<h1 class="text-3xl font-bold text-center text-emerald-500 mb-2">Honkai Impact 3rd Awards 2024</h1>
	<p class="text-sm text-gray-500 dark:text-gray-400 mb-6">Voting ends in: {countdown}</p>

	<p class="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-4">BEST VALKYRIE</p>

	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-screen-xl w-full">
		{#each cards as card (card.title)}
			<CardContainer bind:isMouseEntered className="inter-var">
				<CardBody className="bg-gray-50 relative group/card glassdark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-[url('/images/hi3award24/bgvalk.svg')] dark:border-white/[0.2] border-black/[0.1] max-w-[280px] max-h-80 rounded-xl p-6 border">
					<CardItem {isMouseEntered} translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white">
						{card.title}
					</CardItem>

					<CardItem {isMouseEntered} translateZ="100" className="w-full mt-4">
						<img
							src={card.imgSrc}
							class="h-40 w-full rounded-xl object-cover object-top group-hover/card:shadow-xl"
							alt="{card.title} thumbnail"
						/>
					</CardItem>
					<div class="mt-5 flex items-center justify-between">
						<CardItem {isMouseEntered} translateZ="50" className="text-sm text-gray-500 dark:text-gray-300">
							Votes: {card.votes}
						</CardItem>
						<CardItem {isMouseEntered} translateZ={20} className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold cursor-pointer">
							<button on:click={() => openVoteModal(card.title, "Best Valkyrie")}>
								VOTE
							</button>
						</CardItem>
					</div>
				</CardBody>
			</CardContainer>
		{/each}
	</div>

	<p class="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-4 mt-20">BEST CHAPTER</p>

	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-screen-xl w-full">
		{#each chaptercards as card (card.title)}
			<CardContainer bind:isMouseEntered className="inter-var">
				<CardBody className="bg-gray-50 relative group/card glassdark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-[url('/images/hi3award24/bg.svg')] dark:border-white/[0.2] border-black/[0.1] max-w-[400px] max-h-80 rounded-xl p-6 border">
					<CardItem {isMouseEntered} translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white">
						{card.title}
					</CardItem>

					<CardItem {isMouseEntered} translateZ="100" className="w-full mt-4">
						<img
							src={card.imgSrc}
							class="h-40 w-full rounded-xl object-cover object-top group-hover/card:shadow-xl"
							alt="{card.title} thumbnail"
						/>
					</CardItem>
					<div class="mt-5 flex items-center justify-between">
						<CardItem {isMouseEntered} translateZ="50" className="text-sm text-gray-500 dark:text-gray-300">
							Votes: {card.votes}
						</CardItem>
						<CardItem {isMouseEntered} translateZ={20} className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold cursor-pointer">
							<button on:click={() => openVoteModal(card.title, "Best Chapter")}>
								VOTE
							</button>
						</CardItem>
					</div>
				</CardBody>
			</CardContainer>
		{/each}
	</div>

	<p class="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-4 mt-20">BEST BOSS</p>

	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-screen-xl w-full">
		{#each bosscards as card (card.title)}
			<CardContainer bind:isMouseEntered className="inter-var">
				<CardBody className="bg-gray-50 relative group/card glassdark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] max-w-[400px] max-h-80 rounded-xl p-6 border">
					<CardItem {isMouseEntered} translateZ="50" className="text-xl font-bold text-neutral-600 dark:text-white">
						{card.title}
					</CardItem>

					<CardItem {isMouseEntered} translateZ="100" className="w-full mt-4">
						<img
							src={card.imgSrc}
							class="h-40 w-full rounded-xl object-cover object-top group-hover/card:shadow-xl"
							alt="{card.title} thumbnail"
						/>
					</CardItem>
					<div class="mt-5 flex items-center justify-between">
						<CardItem {isMouseEntered} translateZ="50" className="text-sm text-gray-500 dark:text-gray-300">
							Votes: {card.votes}
						</CardItem>
						<CardItem {isMouseEntered} translateZ={20} className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold cursor-pointer">
							<button on:click={() => openVoteModal(card.title, "Best Boss")}>
								VOTE
							</button>
						</CardItem>
					</div>
				</CardBody>
			</CardContainer>
		{/each}
	</div>
</div>

<!-- Modal -->
{#if showModal}
	<div class="modal modal-open">
		<div class="modal-box">
			<h2 class="font-bold text-lg">Confirm Your Vote</h2>
			<p>Are you sure you want to vote for <strong>{selectedCard.title}</strong> in the <strong>{selectedCard.category}</strong> category? This cannot be undone.</p>
			<div class="modal-action">
				<button class="btn btn-primary" on:click={confirmVote}>Yes</button>
				<button class="btn btn-secondary" on:click={cancelVote}>No</button>
			</div>
		</div>
	</div>
{/if}
