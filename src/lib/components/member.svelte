<script>
  import { ytmember, discord, patreon } from '$lib/data/member.js';

  const randomImages = Object.keys(import.meta.glob('/static/images/randompic/*.png')).map((path) => path.replace('/static', ''));
  function getRandomImage() {
    return randomImages[Math.floor(Math.random() * randomImages.length)];
  }
  
  let groupedMembers = {
    "Equinox Supporter": [],
    "Herrscher of Finality": [],
    "Herrscher of Origin": [],
  };

  ytmember.forEach((member) => {
    if (groupedMembers[member["Current level"]]) {
      groupedMembers[member["Current level"]].push(member);
    }
  });

  // Helper function to format time into years, months, and days
  function formatTime(months) {
  if (months < 1) {
    return "New Member"; // Display "New Member" for less than 1 month
  }

  const years = Math.floor(months / 12);
  const remainingMonths = Math.floor(months % 12); // Remove decimal points for months

  if (years > 0) {
    return `${years} year${years > 1 ? 's' : ''}${
      remainingMonths > 0 ? ` and ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}` : ''
    }`;
  }
  return `${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
}


</script>

<p class="text-lg font-bold mb-4 text-white">YouTube Members</p>

{#each Object.entries(groupedMembers) as [tier, members]}
  <!-- Tier Header -->
  <p
    class="text-md mb-4 
    {tier === 'Herrscher of Finality' ? 'text-yellow-400' : ''} 
    {tier === 'Herrscher of Origin' ? 'text-orange-400' : ''} 
    {tier === 'Equinox Supporter' ? 'text-blue-400' : ''}">
    {tier}
  </p>

  <!-- Member List -->
  <ul
    class="mb-8 
    {tier === 'Herrscher of Finality' || tier === 'Herrscher of Origin' ? 'grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'space-y-2'}"
  >
    {#each members.sort((a, b) => b["Total time as member (months)"] - a["Total time as member (months)"]) as member, index}
      <li
        class="relative flex items-center gap-3 p-4 rounded-md bg-cover bg-center shadow-lg overflow-hidden 
        {tier === 'Equinox Supporter' && index === 0 ? 'bg-[url("/images/bg/wpr2.svg")] text-white' : ''} 
        {tier === 'Equinox Supporter' && index === 1 ? 'bg-[url("/images/bg/member_card_equinox_2.svg")] text-white' : ''} 
        {tier === 'Herrscher of Finality' ? 'bg-[url("/images/bg/member_card_finality.svg")] text-black font-semibold' : ''} 
        {tier === 'Herrscher of Origin' ? 'bg-[url("/images/bg/member_card_origin.svg")]' : ''}"
      >
        <!-- Member Profile Picture -->
        <img
        src={member.Image || getRandomImage()}
          alt={member.Member}
          class="w-12 h-12 rounded-full object-cover border-2 border-gray-600"
        />
        <!-- Member Info -->
        <div class="flex-grow">
          <a
            href={member["Link to profile"]}
            target="_blank"
            rel="noopener noreferrer"
            class="hover:underline font-medium text-sm"
          >
            {member.Member}
          </a>
          <p class="text-xs">
            {formatTime(member["Total time as member (months)"])}
          </p>
        </div>
        <!-- Overlay Image for Equinox Supporters -->
        {#if tier === 'Equinox Supporter'}
          <img
            src={index === 0 ? '/images/bg/wpr.webp' : '/images/bg/miah.png'}
            alt="Equinox Overlay"
            class="absolute right-0 transform w-60 h-auto object-contain"
          />
        {/if}
      </li>
    {/each}
  </ul>
{/each}

<p class="text-lg font-bold mb-4 text-white">Patreon Members</p>
<ul class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-8">
  {#each patreon as member}
    <li class=" relative flex items-center gap-3 p-4 rounded-md bg-gray-800 shadow-lg" style="background-image: url('/images/bg/member_card_equinox_1.svg');">
      <!-- Member Profile Picture -->
      <img
      src={member.Image || getRandomImage()}
      alt={member.Name}
        class="w-12 h-12 rounded-full object-cover border-2 border-gray-600"
      />
      <!-- Member Info -->
      <div class="flex-grow">
        <span class="text-white font-medium text-sm">{member.Name}</span>
      </div>
    </li>
  {/each}
</ul>

<p class="text-lg font-bold mb-4 text-white">Thank you for v1 Website Feedback</p>
<ul class="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
  {#each discord as member}
    <li class="relative flex items-center gap-3 p-4 rounded-md bg-gray-800 shadow-lg">
      <!-- Member Profile Picture -->
      <img
        src={member.Image || 'https://via.placeholder.com/50'}
        alt={member.Name}
        class="w-12 h-12 rounded-full object-cover border-2 border-gray-600"
      />
      <!-- Member Info -->
      <div class="flex-grow">
        <span class="text-white font-medium text-sm">{member.Name}</span>
      </div>
    </li>
  {/each}
</ul>
