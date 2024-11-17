<script>
  // Group members by tier
  export let groupedMembers = {};

  // Helper function to format time into years and months
  function formatTime(months) {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years > 0) {
      return `${years} year${years > 1 ? 's' : ''}${remainingMonths > 0 ? ` and ${remainingMonths} month${remainingMonths > 1 ? 's' : ''}` : ''}`;
    }
    return `${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
  }
</script>

<h2 class="text-lg font-bold mb-4 text-white">YouTube Members</h2>

{#each Object.entries(groupedMembers) as [tier, members]}
  <!-- Tier Header -->
  <h3 class="text-md font-semibold mb-2 text-gray-300">{tier}</h3>

  <!-- Member List -->
  <ul class="space-y-1">
    {#each members.sort((a, b) => b["Total time as member (months)"] - a["Total time as member (months)"]) as member}
      <li class="flex items-center gap-3 p-2 bg-gray-800 rounded-md">
        <!-- Member Profile Picture -->
        <img
          src={member.Image || 'https://via.placeholder.com/50'}
          alt={member.Member}
          class="w-10 h-10 rounded-full object-cover"
        />
        <!-- Member Info -->
        <div>
          <a
            href={member["Link to profile"]}
            target="_blank"
            rel="noopener noreferrer"
            class="text-cyan-400 hover:underline font-medium text-sm"
          >
            {member.Member}
          </a>
          <p class="text-xs text-gray-400">
            {formatTime(Math.round(member["Total time as member (months)"]))}
          </p>
        </div>
      </li>
    {/each}
  </ul>
{/each}

<style>
  h2, h3 {
    margin-bottom: 0.5rem;
  }

  ul {
    margin-bottom: 1rem;
  }

  li {
    padding: 0.5rem;
    display: flex;
    align-items: center;
  }

  img {
    border: 2px solid #2d3748;
  }

  a:hover {
    color: #63b3ed;
  }
</style>
