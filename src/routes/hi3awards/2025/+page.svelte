
<svelte:head>
	<title>HI3 Awards 2025</title> 
    <meta property="og:title" content="Honkai Impact 3rd Awards 2025"/>
    <meta property="og:description" content="Vote for Your Favourite HI3 Content" />
    <meta property="og:image" content="https://i.imgur.com/sukrQ9x.png" />
    <meta property="og:url" content="https://marisaimpact.com/hi3awards/2025" />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary_large_image">

    <link rel="canonical" href="https://marisaimpact.com/hi3awards" />
</svelte:head>

<script lang="ts">

import voteSummary from '$lib/data/VoteSummary2025.json'; // Adjust path as needed

	import CardBody from '$lib/components/ui/ThreeDCardEffect/CardBody.svelte';
	import CardContainer from '$lib/components/ui/ThreeDCardEffect/CardContainer.svelte';
	import CardItem from '$lib/components/ui/ThreeDCardEffect/CardItem.svelte';
	import CardWrapper from '$lib/components/ui/ThreeDCardEffect/CardWrapperVoting.svelte';

	import { onMount, onDestroy  } from 'svelte';
	import { getFirestore, collection, addDoc, query, where, getDocs, doc, getDoc, updateDoc, arrayUnion, increment } from "firebase/firestore";
	import { app } from "$lib/firebaseConfig";
	import CardWrapperVoting from '$lib/components/ui/ThreeDCardEffect/CardWrapperVoting.svelte';
	import CardWrapperVotingVideo from '$lib/components/ui/ThreeDCardEffect/CardWrapperVotingVideo.svelte';
	import CardWrapperVotingWide from '$lib/components/ui/ThreeDCardEffect/CardWrapperVotingWide.svelte';
	import CardWrapperVotingWideRed from '$lib/components/ui/ThreeDCardEffect/CardWrapperVotingWideRed.svelte';

	let isMouseEntered = false;
	let countdown = '';
	let selectedCard = null;
	let showModal = false;
	let votedCategories = {}; // Object to store voting status for each category
	let hasVotedFlag = false; // Flag to determine if the user has voted

	const db = getFirestore(app);

	// Cards data
	let BestValk2025 = [
		{ title: 'Reign Solaris (EN release)', description: '', image: '/images/valkfull/rs.webp', votes: 0 },
		{ title: 'Ba-dum! Fiery Wishing Star', description: '', image: '/images/valkfull/bw.webp', votes: 0 },
		{ title: 'Peregrine Sword', description: '', image: '/images/valkfull/ps.png', votes: 0 },
		{ title: 'Planar Armament', description: '', image: '/images/valkfull/paws.png', votes: 0 },
		{ title: 'Behold! Fate-Defying Dragon', description: '', image: '/images/valkfull/scoralie.png', votes: 0 },
		{ title: 'Hi Love Elf', description: '', image: '/images/valkfull/mol.png', votes: 0 },

	];

  	let BestValkGameplay2025 = [
		{ title: 'Reign Solaris (EN release)', description: '', image: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/vid-rs.jpg', video:"https://act-webstatic.mihoyo.com/puzzle/bh3/bh3_version_page_800_1217/resource/puzzle/2024/12/06/8af4a8bb4eed7f8acb65398d8324d549_3011193823025982132.mp4", votes: 0 },
		{ title: 'Ba-dum! Fiery Wishing Star', description: '', image: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/vid-badum.jpg', video:'https://act-webstatic.mihoyo.com/puzzle/bh3/bh3_version_page_810_1239/resource/puzzle/2025/01/17/3a2764bf6b8182c6f7451551cebbdfbb_6526445854139983168.mp4', votes: 0 },
		{ title: 'Herrscher of Human DLC', description: '', image: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/vid-hoh.jpg', video:'https://act-webstatic.mihoyo.com/puzzle/bh3/bh3_version_page_810_1239/resource/puzzle/2025/01/16/4c267691b70c53a8180d5ef54ce8b0ce_1218956534081137429.mp4', votes: 0 },		
    { title: 'Peregrine Sword', description: '', image: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/vid-ps.jpg', video: 'https://act-webstatic.mihoyo.com/puzzle/bh3/bh3_version_page_8200_1255/resource/puzzle/2025/03/22/424fb53e467a2802dbe1a4ed6382cde1_7353432943863447762.mp4', votes: 0 },
		{ title: 'Planar Armament', description: '', image: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/vid-helia.jpg', video:"https://act-webstatic.mihoyo.com/puzzle/bh3/bh3_version_page_830_1269/resource/puzzle/2025/05/23/0e86b0f3ead54e2df215d1a5d73e3414_3046586644079159533.mp4", votes: 0 },
		{ title: 'Behold! Fate-Defying Dragon', description: '', image: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/vid-coralie.jpg', video:"https://act-webstatic.mihoyo.com/puzzle/bh3/bh3_version_page_840_1288/resource/puzzle/2025/07/18/794825bd0a8eb6489686426aeb6fe190_1505945113103333527.mp4", votes: 0 },
		{ title: 'Hi Love Elf', description: '', image: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/vid-newely.jpg', video:'https://act-webstatic.mihoyo.com/puzzle/bh3/bh3_version_page_850_1308/resource/puzzle/2025/09/19/5cc06b7fcad358b5bd7cbd62252a1076_8428162742011678380.mp4', votes: 0 },
		{ title: 'Herrscher of Rebirth DLC', description: '', image: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/vid-horb.jpg', video:'https://act-webstatic.mihoyo.com/puzzle/bh3/bh3_version_page_850_1308/resource/puzzle/2025/09/17/5bba6812a6dfcfeb674687171a337f8c_6932344177050499288.mp4', votes: 0 },
  ];

	let BestStoryArc = [
		{ title: "P2 Chapter 7-10", description: '', image: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/p2ch.jpg', votes: 0 },
		{ title: "CN New Year Arc", description: '', image: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/cny.jpg', votes: 0 },
		{ title: "Messenger of Love Arc", description: '', image: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/bustyverse.jpg', votes: 0 },
	];

	let BestBoss = [
		{ title: 'Mega Godly Drum', description: '', image: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/godlydrum.png', votes: 0 },
		{ title: 'Litost', description: '', image: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/litost.png', votes: 0 },
		{ title: 'SoaSH: SCoS', description: '', image: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/soash.png', votes: 0 },
		{ title: 'New HoC', description: '', image: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/newhoc.png', votes: 0 },

	];

  	let BestDPS = [
		{ title: 'Reign Solaris', description: '', image: '/images/valkfull/rs.webp', votes: 909 },
		{ title: 'Peregrine Sword', description: '', image: '/images/valkfull/ps.png', votes: 902 },
		{ title: 'Ba-dum! Fiery Wishing Star', description: '', image: '/images/valkfull/bw.webp', votes: 883 },

	];

  	let BestSUP = [
		{ title: 'Lone Planetfarer', description: '', image: '/images/valkfull/vita.webp', votes: 3315 },
		{ title: 'Ba-dum! Fiery Wishing Star', description: '', image: '/images/valkfull/bw.webp', votes: 2098 },
		{ title: 'Jovial Deception: Shadowdimmer', description: '', image: '/images/valkfull/jd.webp', votes: 1319 },
	];

  	let Animation = [
		{ title: 'Miss Elf Magical Invitation', description: '', image: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/chapter/ely%20song.jpg' },
	];

  	let BestHSRRef = [
		{ title: 'Kevin as Phainon', description: '', image: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/kevinphainon.png', votes: 0 },
		{ title: 'Elysia as Cyrene', description: '', image: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/elycyrene.png', votes: 0 },

	];

	let MostAnticipated = [
		{ title: 'Timido', description: '', image: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/Timido.webp', votes: 0 },
		{ title: 'APHO Mei', description: '', image: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/Raiden_Mei_29.webp', votes: 0 },
		{ title: 'Seele', description: '', image: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/Gwl4BnzbcAAsRM2.jpg', votes: 0 },
  	{ title: 'Another Ely or FC', description: '', image: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/hocely.jpg', votes: 0 },
		{ title: 'Some Part 2 Char', description: '', image: 'https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/part2.jpg', votes: 0 },

	];


const updateVoteCounts = (category) => {
    const counts = voteSummary[category] || {};

    if (category === "Best Valkyrie Design 2025") {
        BestValk2025 = BestValk2025.map((card) => ({
            ...card,
            votes: counts[card.title] || 0,
        }));
    } else if (category === "Best Valkyrie Gameplay 2025") {
        BestValkGameplay2025 = BestValkGameplay2025.map((card) => ({
            ...card,
            votes: counts[card.title] || 0,
        }));        
    } else if (category === "Best Story Arc 2025") {
        BestStoryArc = BestStoryArc.map((card) => ({
            ...card,
            votes: counts[card.title] || 0,
        }));
    } else if (category === "Best Boss 2025") {
        BestBoss = BestBoss.map((card) => ({
            ...card,
            votes: counts[card.title] || 0,
        }));
    } else if (category === "Most Hype HI3-like HSR Character 2025") {
        BestHSRRef = BestHSRRef.map((card) => ({
            ...card,
            votes: counts[card.title] || 0,
        }));
    } else if (category === "Most Anticipated Future Valk") {
        MostAnticipated = MostAnticipated.map((card) => ({
            ...card,
            votes: counts[card.title] || 0,
        }));
    } 
};

// Countdown timer and vote count initialization
onMount(() => {
  updateVoteCounts('Best Valkyrie Design 2025');
  updateVoteCounts('Best Valkyrie Gameplay 2025');
  updateVoteCounts('Best Story Arc 2025');
  updateVoteCounts('Best Boss 2025');
  updateVoteCounts('Most Hype HI3-like HSR Character 2025');
  updateVoteCounts('Most Anticipated Future Valk');

  const deadline = new Date('2025-12-11T16:00:00.000Z'); // 11 December 2024, 4 PM UTC
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

    countdown = `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds. (12 December 2024, 12 AM UTC+8)`;
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
    const categoryDocRef = doc(db, "Vote2025", category);
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

  const categoryDocRef = doc(db, "Vote2025", category);
  const categoryDocSnap = await getDoc(categoryDocRef);

  if (!categoryDocSnap.exists()) return false;

  const categoryData = categoryDocSnap.data();
  return categoryData.voterIds?.includes(voterId) || false;
};


const checkVotedStatus = async () => {
  const categories = ["Best Valkyrie Design 2025", "Best Valkyrie Gameplay 2025", "Best Story Arc 2025", "Best Boss 2025","Most Hype HI3-like HSR Character 2025","Most Anticipated Future Valk"];
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

  let showVideo = false;

  function isYouTubeLink(url: string) {
    return url.includes("youtube.com") || url.includes("youtu.be");
  }

  function toYouTubeEmbed(url: string) {
    try {
      let videoId = "";

      if (url.includes("youtube.com/watch")) {
        const params = new URL(url).searchParams;
        videoId = params.get("v") ?? "";
      } else if (url.includes("youtu.be/")) {
        videoId = url.split("youtu.be/")[1].split("?")[0];
      }

      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    } catch (e) {
      return url;
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Escape") {
      showVideo = false;
    }
  }

  onMount(() => {
    window.addEventListener("keydown", handleKeydown);
  });

  let selectedVideo: string | null = null;

</script>

<div class="relative w-full h-40 md:h-70 overflow-hidden "  id="bannerpic">

  <img
    src="/images/newstab/newely.png"
    alt="Header"
    class="w-full h-full object-cover [object-position:50%_25%] opacity-45"
    />


 
  <!-- Text overlay -->
  <div class="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4 pb-3 md:pb-0 md:pt-6 z-10">
    <h1 class="text-3xl sm:text-4xl md:text-5xl font-bold drop-shadow-md font-russoone italic tracking-wider text-shadow-lg/30 ">
      HI3 Awards 2025
    </h1>
    <p class="text-sm sm:text-lg text-slate-200 drop-shadow-sm">
      Celebrate HI3

    </p>
  </div>
  

  <!-- Blur overlay at bottom -->
  <div class="absolute bottom-0 left-0 w-full h-15 bg-gradient-to-t from-base-100 to-transparent z-0"></div>

</div>

<div class="flex flex-col items-center px-4 py-6 mb-60 ">
	<p class="text-center  text-gray-400 mb-8">Voting ends in: {countdown}
    <br/>
    Votes are not updated in real-time. Votes will be hidden near the end of voting time.
  </p>

	
	

	<p class="text-center text-xl sm:text-2xl font-semibold text-slate-100 mb-6 font-russoone italic tracking-wider">BEST VALKYRIE DESIGN 2025</p>

	<div class="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-screen-lg w-full ">
		{#each BestValk2025 as card (card.title)}
<div 
  class="group rounded-2xl border border-white/20 bg-gradient-to-b from-rose-950 to-rose-900 shadow-sm overflow-hidden
         transform transition-all duration-300 ease-in-out
         hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/20
         
         "
>
  <!-- Image at top -->
  <img 
    src={card.image} 
    alt={card.title} 
    class="w-full h-40 sm:h-70 object-cover object-top 
           transition-transform duration-500 ease-in-out 
           group-hover:scale-105"
  />

  <div class="flex flex-col sm:flex-row sm:justify-between p-4">
    <div>
    <!-- Title -->
    <h2 class="text-lg font-semibold text-white tracking-tight mb-3 text-center sm:text-left truncate whitespace-nowrap">
      {card.title}
    </h2>

    <!-- Votes + Button -->
      <div class="text-sm text-slate-300 text-center sm:text-left">
        Votes: {card.votes}
      </div>
          </div>
      <div class="flex justify-center">
      <button 
        on:click={() => openVoteModal(card.title, "Best Valkyrie Design 2025")}
        class="btn btn-sm sm:btn-lg mt-3 sm:mt-2 px-4 py-2 rounded-xl bg-white text-black text-xs font-bold cursor-pointer "
      >
        VOTE
      </button>
      </div>
  </div>
</div>


		{/each}


	</div>



	<p class="text-center text-xl sm:text-2xl font-semibold text-slate-100 mb-6 mt-30 font-russoone italic tracking-wider">BEST VALKYRIE GAMEPLAY 2025</p>

	<div class="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-10 max-w-screen-xl w-full ">
		{#each BestValkGameplay2025 as card (card.title)}
<div 
  class="group rounded-2xl border border-white/20 bg-gradient-to-b from-cyan-950 to-cyan-900 shadow-sm overflow-hidden
         transform transition-all duration-300 ease-in-out
         hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/20"
>
  <!-- Image at top -->
<img 
  src={card.image} 
  alt={card.title} 
  class="w-full h-40 sm:h-50 object-cover object-top 
         transition-transform duration-500 ease-in-out 
         group-hover:scale-105 cursor-pointer"
  on:click={() => {
    selectedVideo = card.video;
    showVideo = true;
  }}
/>

  <div class="flex flex-col sm:flex-row sm:justify-between p-4">
    <div>
    <!-- Title -->
    <h2 class="text-lg font-semibold text-white tracking-tight mb-3 text-center sm:text-left truncate whitespace-nowrap">
      {card.title}
    </h2>

    <!-- Votes + Button -->
      <div class="text-sm text-slate-300 text-center sm:text-left">
        Votes: {card.votes}
      </div>
          </div>
      <div class="flex justify-center">
      <button 
        on:click={() => openVoteModal(card.title, "Best Valkyrie Gameplay 2025")}
        class="btn btn-sm sm:btn-lg mt-3 sm:mt-2 px-4 py-2 rounded-xl bg-white text-black text-xs font-bold cursor-pointer "
      >
        VOTE
      </button>
      </div>
  </div>
</div>
		{/each}
	</div>

	<p class="text-center text-xl sm:text-2xl font-semibold text-slate-100 mb-6 mt-30 font-russoone italic tracking-wider">BEST STORY ARC 2025</p>

	<div class="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-10 max-w-screen-xl w-full ">
		{#each BestStoryArc as card (card.title)}
<div 
  class="group rounded-2xl border border-white/20 bg-gradient-to-b from-violet-950 to-violet-900 shadow-sm overflow-hidden
         transform transition-all duration-300 ease-in-out
         hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/20
         
         "
>
  <!-- Image at top -->
  <img 
    src={card.image} 
    alt={card.title} 
    class="w-full h-40 sm:h-50 object-cover object-top 
           transition-transform duration-500 ease-in-out 
           group-hover:scale-105"
  />

  <div class="flex flex-col sm:flex-row sm:justify-between p-4">
    <div>
    <!-- Title -->
    <h2 class="text-lg font-semibold text-white tracking-tight mb-3 text-center sm:text-left truncate whitespace-nowrap">
      {card.title}
    </h2>

    <!-- Votes + Button -->
      <div class="text-sm text-slate-300 text-center sm:text-left">
        Votes: {card.votes}
      </div>
          </div>
      <div class="flex justify-center">
      <button 
        on:click={() => openVoteModal(card.title, "Best Story Arc 2025")}
        class="btn btn-sm sm:btn-lg mt-3 sm:mt-2 px-4 py-2 rounded-xl bg-white text-black text-xs font-bold cursor-pointer "
      >
        VOTE
      </button>
      </div>
  </div>
</div>

		{/each}
	</div>

	<p class="text-center text-xl sm:text-2xl font-semibold text-slate-100 mb-6 mt-30 font-russoone italic tracking-wider">BEST BOSS 2025</p>


	<div class="grid grid-cols-2 gap-4 sm:gap-10 max-w-screen-lg w-full ">
		{#each BestBoss as card (card.title)}
<div 
  class="group rounded-2xl border border-white/20 bg-gradient-to-b from-orange-950 to-orange-900 shadow-sm overflow-hidden
         transform transition-all duration-300 ease-in-out
         hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/20
         
         "
>
  <!-- Image at top -->
  <img 
    src={card.image} 
    alt={card.title} 
    class="w-full h-40 sm:h-50 object-cover object-top 
           transition-transform duration-500 ease-in-out 
           group-hover:scale-105"
  />

  <div class="flex flex-col sm:flex-row sm:justify-between p-4">
    <div>
    <!-- Title -->
    <h2 class="text-lg font-semibold text-white tracking-tight mb-3 text-center sm:text-left truncate whitespace-nowrap">
      {card.title}
    </h2>

    <!-- Votes + Button -->
      <div class="text-sm text-slate-300 text-center sm:text-left">
        Votes: {card.votes}
      </div>
          </div>
      <div class="flex justify-center">
      <button 
        on:click={() => openVoteModal(card.title, "Best Boss 2025")}
        class="btn btn-sm sm:btn-lg mt-3 sm:mt-2 px-4 py-2 rounded-xl bg-white text-black text-xs font-bold cursor-pointer "
      >
        VOTE
      </button>
      </div>
  </div>
</div>
		{/each}
	</div>

	<p class="text-center text-xl sm:text-2xl  font-semibold text-slate-100 mb-6 mt-30 font-russoone italic tracking-wider">MOST ANTICIPATED FUTURE VALK</p>

	<div class="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 max-w-screen-lg w-full ">
		{#each MostAnticipated as card (card.title)}
<div 
  class="group rounded-2xl border border-white/20 bg-gradient-to-b from-rose-950 to-rose-900 shadow-sm overflow-hidden
         transform transition-all duration-300 ease-in-out
         hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/20
         
         "
>
  <!-- Image at top -->
  <img 
    src={card.image} 
    alt={card.title} 
    class="w-full h-40 sm:h-70 object-cover object-top 
           transition-transform duration-500 ease-in-out 
           group-hover:scale-105"
  />

  <div class="flex flex-col sm:flex-row sm:justify-between p-4">
    <div>
    <!-- Title -->
    <h2 class="text-lg font-semibold text-white tracking-tight mb-3 text-center sm:text-left truncate whitespace-nowrap">
      {card.title}
    </h2>

    <!-- Votes + Button -->
      <div class="text-sm text-slate-300 text-center sm:text-left">
        Votes: {card.votes}
      </div>
          </div>
      <div class="flex justify-center">
      <button 
        on:click={() => openVoteModal(card.title, "Most Anticipated Future Valk")}
        class="btn btn-sm sm:btn-lg mt-3 sm:mt-2 px-4 py-2 rounded-xl bg-white text-black text-xs font-bold cursor-pointer "
      >
        VOTE
      </button>
      </div>
  </div>
</div>


		{/each}


	</div>

	<p class="text-center text-xl sm:text-2xl font-semibold text-slate-100 mb-1 mt-20 font-russoone italic tracking-wider">BEST ANIMATION</p>
	<p class="text-center  text-gray-400 mb-8">Miss Elf Magical Invitation wins by default since there's no other animation. Watch it here <a class="link" href="https://www.youtube.com/watch?v=kcZXMXSHbm4">https://www.youtube.com/watch?v=kcZXMXSHbm4</a></p>


	<div class="grid grid-cols-1  gap-6 max-w-screen-xl w-full">
		{#each Animation as card (card.title)}
			<CardWrapperVotingWide {card} bg="bg-rose-500">
        <div slot="below" class="flex items-center justify-between mt-6 w-full">

        </div>
			</CardWrapperVotingWide>
		{/each}
	</div>

	<p class="text-center text-xl sm:text-2xl font-semibold text-slate-100 mb-1 mt-20 font-russoone italic tracking-wider">TOP 3 DPS 2025</p>
	<p class="text-center  text-gray-400 mb-8">Number of times the characters are used in Top 100 Abyss in CN PC Server. This list will be updated with v8.5 count when I have the data.</p>


	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-screen-xl w-full">
		{#each BestDPS as card (card.title)}
			<CardWrapperVotingWide {card} bg="bg-rose-500">
        <div slot="below" class="flex items-center justify-between mt-6 w-full">
						<CardItem {isMouseEntered} translateZ="50" className="text-sm  text-slate-100">
							Usage Count: {card.votes}
						</CardItem>

        </div>
			</CardWrapperVotingWide>
		{/each}
	</div>

	<p class="text-center text-xl sm:text-2xl  font-semibold text-slate-100 mb-1 mt-20  font-russoone italic tracking-wider">TOP 3 SUPPORT 2025</p>
	<p class="text-center  text-gray-400 mb-8">Number of times the characters are used in Top 100 Abyss in CN PC Server. This list will be updated with v8.5 count when I have the data.</p>


	<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-w-screen-xl w-full">
		{#each BestSUP as card (card.title)}
			<CardWrapperVotingWide {card}>
        <div slot="below" class="flex items-center justify-between mt-6 w-full">
						<CardItem {isMouseEntered} translateZ="50" className="text-sm  text-slate-100">
							Usage Count: {card.votes}
						</CardItem>

        </div>
			</CardWrapperVotingWide>
		{/each}
	</div>



	<div class="text-center mt-30 text-3xl">Thank You For Voting</div>

</div>

<!-- Modal -->
{#if showModal}

<div class="modal modal-open">
  <div class="modal-box rounded-xl shadow-lg bg-base-200">
    <h2 class="text-xl font-semibold mb-3 text-center">
      Confirm Your Vote
    </h2>

    <p class="text-base leading-relaxed text-center">
      Are you sure you want to vote for 
      <strong class="text-gray-200">{selectedCard.title}</strong> 
      in the 
      <strong class="text-gray-200">{selectedCard.category}</strong> 
      category? <br />
      <span class="text-gray-400">This cannot be undone.</span>
    </p>

    <div class="modal-action flex justify-center gap-4 mt-4">
      <button
        class="btn btn-outline btn-accent px-6"
        on:click={confirmVote}
        disabled={!selectedCard || hasVotedFlag}
      >
        Yes
      </button>

      <button
        class="btn btn-outline btn-secondary px-6"
        on:click={cancelVote}
      >
        No
      </button>
    </div>

    {#if hasVotedFlag}
      <p class="text-red-500 text-sm text-center mt-3">
        You have already voted in this category.
      </p>
    {/if}
  </div>
</div>



{/if}

{#if showVideo && selectedVideo}
  <!-- Fullscreen overlay -->
  <div 
    class="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
    on:click={() => (showVideo = false)}
  >
    <!-- Video container -->
    <div 
      class="relative max-w-6xl w-full px-4"
      on:click|stopPropagation
    >


      {#if isYouTubeLink(selectedVideo)}
        <iframe
          src={toYouTubeEmbed(selectedVideo)}
          class="w-full aspect-video rounded-lg"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen
        ></iframe>
      {:else}
        <video
          src={selectedVideo}
          controls
          autoplay
          class="w-full rounded-lg"
        ></video>
      {/if}
    </div>
  </div>
{/if}
