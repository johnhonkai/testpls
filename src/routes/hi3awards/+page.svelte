
<svelte:head>
	<title>HI3 Awards 2024</title> 
    <meta property="og:title" content="Honkai Impact 3rd Awards 2024"/>
    <meta property="og:description" content="Vote for Your Favourite HI3 Content" />
    <meta property="og:image" content="https://i.imgur.com/vIxSuxg.jpeg" />
    <meta property="og:url" content="https://marisaimpact.com/hi3awards" />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary_large_image">

    <link rel="canonical" href="https://marisaimpact.com/hi3awards" />
</svelte:head>

<script lang="ts">

import voteSummary from '$lib/data/voteSummary.json'; // Adjust path as needed

	import CardBody from '$lib/components/ui/ThreeDCardEffect/CardBody.svelte';
	import CardContainer from '$lib/components/ui/ThreeDCardEffect/CardContainer.svelte';
	import CardItem from '$lib/components/ui/ThreeDCardEffect/CardItem.svelte';

	import { onMount } from 'svelte';
	import { getFirestore, collection, addDoc, query, where, getDocs, doc, getDoc, updateDoc, arrayUnion, increment } from "firebase/firestore";
	import { app } from "$lib/firebaseConfig";

	let isMouseEntered = false;
	let countdown = '';
	let selectedCard = null;
	let showModal = false;
	let votedCategories = {}; // Object to store voting status for each category
	let hasVotedFlag = false; // Flag to determine if the user has voted

	const db = getFirestore(app);

	// Cards data
	let cards = [
		{ title: 'Deepspace Anchor', description: '', imgSrc: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/valkfull/Senadina.webp', votes: 0 },
		{ title: 'Valkyrie Boltstorm', description: '', imgSrc: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/valkfull/Helia.webp', votes: 0 },
		{ title: 'Valkyrie Blastmetal', description: '', imgSrc: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/valkfull/Coralie.webp', votes: 0 },
		{ title: 'Mad Pleasure', description: '', imgSrc: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/valkfull/thelema.webp', votes: 0 },
		{ title: 'Lone Destruction', description: '', imgSrc: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/valkfull/lantern.webp', votes: 0 },
		{ title: 'Jovial Deception', description: '', imgSrc: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/valkfull/jd.webp', votes: 0 },
		{ title: "Schicksal's Imperative", description: '', imgSrc: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/valkfull/teri_simp.webp', votes: 0 },
		{ title: 'Lone Planetfarer', description: '', imgSrc: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/valkfull/vita.webp', votes: 0 },
		{ title: 'Sparkle', description: '', imgSrc: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/valkfull/sparkle.webp', votes: 0 },
		{ title: 'Durandal', description: '', imgSrc: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/valkfull/dudu.webp', votes: 0 },

	];

	let chaptercards = [
		{ title: 'Chapter 1', description: '', imgSrc: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/ch1.webp', votes: 0 },
		{ title: 'Chapter 2', description: '', imgSrc: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/ch2.webp', votes: 0 },
		{ title: 'Chapter 3', description: '', imgSrc: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/ch3.webp', votes: 0 },
		{ title: 'Chapter 3-EX', description: '', imgSrc: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/ch3ex.webp', votes: 0 },
		{ title: 'Chapter 4', description: '', imgSrc: '/images/hi3award24/ch4.webp', votes: 0 },
		{ title: 'Chapter 5', description: '', imgSrc: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/ch5.webp', votes: 0 },
		{ title: "Chapter 6", description: '', imgSrc: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/ch6.webp', votes: 0 },
	];

	let bosscards = [
		{ title: 'Duonigue', description: '', imgSrc: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/duonigue.webp', votes: 0 },
		{ title: 'Lantern', description: '', imgSrc: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/lanternboss.webp', votes: 0 },
		{ title: 'Perception', description: '', imgSrc: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/ch3.webp', votes: 0 },
		{ title: 'Sampo', description: '', imgSrc: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/sampo.webp', votes: 0 },

	];

	let songquecards = [
		{ title: 'Sussy Moment 1', description: '', imgSrc: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/sussy1.webp', votes: 0 },
		{ title: 'Feet', description: '', imgSrc: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/sussy2.webp', votes: 0 },
		{ title: 'Suskibidi Moemnt 3', description: '', imgSrc: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/sussy3.webp', votes: 0 },
		{ title: 'Beach', description: '', imgSrc: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/sussy4.webp', votes: 0 },

	];


const updateCardsWithVoteCounts = (category, voteCounts) => {
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
    } else if (category === "Sussiest Songque Moment") {
        songquecards = songquecards.map((card) => ({
            ...card,
            votes: voteCounts[card.title] || 0,
        }));
    }
};



const updateVoteCounts = (category) => {
    const counts = voteSummary[category] || {};

    if (category === "Best Valkyrie") {
        cards = cards.map((card) => ({
            ...card,
            votes: counts[card.title] || 0,
        }));
    } else if (category === "Best Chapter") {
        chaptercards = chaptercards.map((card) => ({
            ...card,
            votes: counts[card.title] || 0,
        }));
    } else if (category === "Best Boss") {
        bosscards = bosscards.map((card) => ({
            ...card,
            votes: counts[card.title] || 0,
        }));
    } else if (category === "Sussiest Songque Moment") {
        songquecards = songquecards.map((card) => ({
            ...card,
            votes: counts[card.title] || 0,
        }));
    }
};

// Countdown timer and vote count initialization
onMount(() => {
  updateVoteCounts('Best Valkyrie');
  updateVoteCounts('Best Chapter');
  updateVoteCounts('Best Boss');
  updateVoteCounts('Sussiest Songque Moment');

  const deadline = new Date('2024-12-11T16:00:00.000Z'); // 11 December 2024, 4 PM UTC
  const updateCountdown = () => {
    const now = new Date();
    const diff = deadline.getTime() - now.getTime();

    if (diff <= 0) {
      countdown = 'Voting has ended. Results will be announced soon.';
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
	// Function to open the vote modal
	const openVoteModal = (cardTitle, category) => {
    selectedCard = { title: cardTitle, category }; // Store the category and title
    showModal = true;
};

const retry = async (fn, retries = 3, delay = 500) => {
    try {
        return await fn();
    } catch (err) {
        if (retries === 0) throw err;
        await new Promise((res) => setTimeout(res, delay));
        return retry(fn, retries - 1, delay * 2);
    }
};

const confirmVote = async () => {
  try {
    if (!selectedCard) {
      alert("Error: No card selected. Please try again.");
      return;
    }

    const voterId = localStorage.getItem("voterId") || crypto.randomUUID();
    localStorage.setItem("voterId", voterId); // Store voterId in local storage

    const { category, title: selectedOption } = selectedCard;

    // Firestore document for the category
    const categoryDocRef = doc(db, "newvote", category);
    const categoryDocSnap = await getDoc(categoryDocRef);

    if (!categoryDocSnap.exists()) {
      alert("Error: Category not found in the database.");
      return;
    }

    const categoryData = categoryDocSnap.data();

    // Check if voterId already exists in voterIds
    if (categoryData.voterIds?.includes(voterId)) {
      alert("You have already voted in this category.");
      return;
    }

    // Increment vote count for the selected option and add voterId to voterIds
    await updateDoc(categoryDocRef, {
      [selectedOption]: increment(1),
      voterIds: arrayUnion(voterId),
    });

    // Mark as voted locally
    votedCategories[category] = true;
    localStorage.setItem(`voted_${category}`, selectedOption);

    alert(`Thank you for voting for "${selectedOption}" in the "${category}" category!`);
    showModal = false; // Close modal
  } catch (error) {
    console.error("Error confirming vote:", error);
    alert("An error occurred. Please try again later.");
  }
};




	// Function to cancel the vote
	const cancelVote = () => {
		selectedCard = null;
		showModal = false;
	};


	const hasVotedInCategory = async (category: string): Promise<boolean> => {
  const voterId = localStorage.getItem("voterId");
  if (!voterId) return false;

  const categoryDocRef = doc(db, "newvote", category);
  const categoryDocSnap = await getDoc(categoryDocRef);

  if (!categoryDocSnap.exists()) return false;

  const categoryData = categoryDocSnap.data();
  return categoryData.voterIds?.includes(voterId) || false;
};


const checkVotedStatus = async () => {
  const categories = ["Best Valkyrie", "Best Chapter", "Best Boss", "Sussiest Songque Moment"];
  const voterId = localStorage.getItem("voterId") || crypto.randomUUID();
  localStorage.setItem("voterId", voterId); // Save voterId in localStorage

  for (const category of categories) {
    votedCategories[category] = await hasVotedInCategory(category);
  }
};


  // Run on component mount
  onMount(() => {
    checkVotedStatus();
  });

  $: if (selectedCard) {
    hasVotedInCategory(selectedCard.category).then((voted) => {
      hasVotedFlag = voted;
    });
  }
</script>

<div class="flex flex-col items-center px-4 py-6 mb-60 ">


	<div class="flex justify-center items-center mb-10 p-4">
		<img 
		  src="https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/results%20copyvasd2.webp" 
		  alt="Centered Image" 
		  class="max-w-full max-h-[80vh] object-contain rounded-lg"
		/>
	  </div>
	  
	<p class="cursor-default text-xl font-semibold  text-gray-300 mb-4 relative after:absolute after:bg-neutral-400 after:bottom-0 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300">BEST VALKYRIE</p>

	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-screen-xl w-full">
		{#each cards as card (card.title)}
			<CardContainer bind:isMouseEntered className="inter-var">
				<CardBody className="relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-rose-900   border-white/[0.2] max-w-[280px] max-h-80 rounded-xl p-6 border">
					<CardItem {isMouseEntered} translateZ="50" className="text-xl font-bold text-white">
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
						<CardItem {isMouseEntered} translateZ="50" className="text-sm  text-gray-300">
							Votes: {card.votes}
						</CardItem>

					</div>
				</CardBody>
			</CardContainer>
		{/each}
	</div>

	<p class="cursor-default text-xl font-semibold  text-gray-300 mb-4 mt-20 relative after:absolute after:bg-neutral-400 after:bottom-0 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300">BEST CHAPTER</p>

	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-screen-xl w-full">
		{#each chaptercards as card (card.title)}
			<CardContainer bind:isMouseEntered className="inter-var">
				<CardBody className="  relative group/card  hover:shadow-2xl  hover:shadow-emerald-500/[0.1]  bg-[url('https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/bg.svg')]   border-white/[0.2] max-w-[400px] max-h-80 rounded-xl p-6 border">
					<CardItem {isMouseEntered} translateZ="50" className="text-xl font-bold text-white">
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
						<CardItem {isMouseEntered} translateZ="50" className="text-sm  text-gray-300">
							Votes: {card.votes}
						</CardItem>

					</div>
				</CardBody>
			</CardContainer>
		{/each}
	</div>

	<p class="cursor-default text-xl font-semibold  text-gray-300 mb-4 mt-20 relative after:absolute after:bg-neutral-400 after:bottom-0 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300">
		BEST BOSS </p>

	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-screen-xl w-full">
		{#each bosscards as card (card.title)}
			<CardContainer bind:isMouseEntered className="inter-var">
				<CardBody className=" relative group/card hover:shadow-2xl hover:shadow-emerald-500/[0.1] bg-black   border-white/[0.2] max-w-[400px] max-h-80 rounded-xl p-6 border">
					<CardItem {isMouseEntered} translateZ="50" className="text-xl font-bold text-white">
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
						<CardItem {isMouseEntered} translateZ="50" className="text-sm  text-gray-300">
							Votes: {card.votes}
						</CardItem>

					</div>
				</CardBody>
			</CardContainer>
		{/each}
	</div>

	<p class="cursor-default text-xl font-semibold  text-gray-300 mb-4 mt-20 relative after:absolute after:bg-neutral-400 after:bottom-0 after:left-0 after:h-px after:w-full after:origin-bottom-right after:scale-x-0 hover:after:origin-bottom-left hover:after:scale-x-100 after:transition-transform after:ease-in-out after:duration-300">
		SUSSIEST SONGQUE MOMENT</p>

	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-screen-xl w-full">
		{#each songquecards as card (card.title)}
			<CardContainer bind:isMouseEntered className="inter-var">
				<CardBody className="relative group/card  hover:shadow-2xl  hover:shadow-emerald-500/[0.1]  bg-cyan-800   border-white/[0.2] max-w-[400px] max-h-80 rounded-xl p-6 border">
					<CardItem {isMouseEntered} translateZ="50" className="text-xl font-bold text-white">
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
						<CardItem {isMouseEntered} translateZ="50" className="text-sm  text-gray-300">
							Votes: {card.votes}
						</CardItem>
	
					</div>
				</CardBody>
			</CardContainer>
		{/each}
	</div>

	<div class="text-center mt-10 text-3xl">Thank You For Voting</div>

</div>

<!-- Modal -->
{#if showModal}

<div class="modal modal-open">
    <div class="modal-box">
        <h2 class="font-bold text-lg">Confirm Your Vote</h2>
        <p>
            Are you sure you want to vote for <strong>{selectedCard.title}</strong>
            in the <strong>{selectedCard.category}</strong> category? This cannot
            be undone.
        </p>
        <div class="modal-action">
            <button
                class="btn btn-primary"
                on:click={confirmVote}
				disabled={!selectedCard || hasVotedFlag}
				>
                Yes
            </button>
            <button class="btn btn-secondary" on:click={cancelVote}>No</button>
        </div>
        <!-- Display message if the user has already voted -->
        {#if hasVotedFlag}
            <p class="text-red-500 text-sm mt-2">You have already voted in this category.</p>
        {/if}
    </div>
</div>


{/if}

