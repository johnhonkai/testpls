<script>
  export let bossData; // Specific boss data (e.g., teamData.bloodsdmob)
  let activeIndex = 0; // Track the active dataset tab

  // Switch to a different teamData set when a tab is clicked
  function selectTab(index) {
    activeIndex = index;
  }

  function getThumbnail(videoUrl) {
    if (videoUrl.includes("youtube.com") || videoUrl.includes("youtu.be")) {
      const youtubeId = videoUrl.split("v=")[1]?.split("&")[0] || videoUrl.split("/").pop();
      return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
    } else if (videoUrl.includes("bilibili.com")) {
      const bilibiliId = videoUrl.split("/video/")[1];
      return `https://i.imgur.com/RrsKeX5.png`; // Replace with correct thumbnail URL pattern
    }
    return "";
  }
</script>

{#if bossData && bossData.teamDataSets}


  <!-- Display the Active Team Data Set -->
  <div class="p-3 rounded-lg text-gray-800">
    <h2 class="text-lg sm:text-xl font-semibold text-left text-white cooltext">TOP TEAMS</h2>

      <!-- Tab Navigation (only if there are multiple datasets) -->
  {#if bossData.teamDataSets.length > 1}
  <div class="flex space-x-4 my-6 ">
    {#each bossData.teamDataSets as teamData, index}
      <button
        class="py-2 px-4  rounded-lg 
                {activeIndex === index ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-700'}"
        on:click={() => selectTab(index)}
      >
        {teamData.tabname}
      </button>
    {/each}
  </div>
{/if}

    <p class="text-left text-xs sm:text-sm text-gray-300 mb-4">
      {bossData.teamDataSets[activeIndex].teamInfoText}
    </p>


    <!-- Teams Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-0 sm:gap-4">
      {#each bossData.teamDataSets[activeIndex].entries as entry}
        {#if entry.type === 'lineup'}
          <div class="flex flex-col gap-2 justify-center items-center mb-4 sm:mb-0 bg-gray-100 p-4 rounded-lg ">
            {#if entry.toptext}
              <p class="text-zinc-800 text-lg font-bold text-center mb-2">{entry.toptext}</p>
            {/if}

            <div class="flex gap-2 justify-center items-center">
              {#each entry.lineup as imgSrc}
                <img src={imgSrc} alt="Team Member" class="w-12 h-12 sm:w-20 sm:h-20 rounded-md object-cover" />
              {/each}

              {#if entry.rank}
                <div class="flex flex-col ml-1 sm:ml-2 text-center">
                  <span class="text-gray-600 text-xs sm:text-base">Rank</span>
                  <p class="font-semibold text-rose-600 text-sm sm:text-base">{entry.rank}</p>
                </div>
              {/if}

              <div class="flex flex-col ml-1 sm:ml-2 text-center">
                <span class="text-gray-600 text-xs sm:text-base">Users</span>
                <p class="font-semibold text-blue-600 text-sm sm:text-base">{entry.pct}</p>
              </div>
            </div>

            {#if entry.bottext}
              <p class="text-center text-xs sm:text-sm text-gray-600">{entry.bottext}</p>
            {/if}
          </div>
        {/if}

        {#if entry.type === 'extraTeamRow'}
          <div class={`flex flex-col ${entry.extraTeamRow.length > 6 ? 'lg:col-span-2' : ''} gap-2 justify-center items-center  bg-gray-100 p-4 rounded-lg `}>
            <p class="text-gray-500 text-xs sm:text-sm text-center">{entry.toptext}</p>

            <div class="flex gap-4 justify-center items-center">
              {#each entry.extraTeamRow as row}
                <div class="flex-col text-center justify-center items-center">
                  <div class="flex justify-center items-center"><img src={row.img} alt="Rank Icon" class="w-8 h-8 sm:w-16 sm:h-16 rounded-md object-cover" /></div>
                  <div><p class="text-xs sm:text-sm text-gray-500">{row.text}</p></div>
                </div>
              {/each}
            </div>
          </div>
        {/if}
      {/each}
    </div>

    <!-- Gameplay Videos Section (only one set of videos) -->
    <h2 class="text-lg sm:text-xl font-semibold text-left text-white cooltext mt-12">GAMEPLAY EXAMPLES</h2>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4 mb-20">
      {#each bossData.videos as video, index}
      <div class="bg-gray-100 p-4 rounded-lg">
        <a href={video.url} target="_blank" rel="noopener noreferrer">
          <img src={getThumbnail(video.url)} alt="Video Thumbnail" class="w-full h-44 object-cover rounded-sm" />
        </a>
        <p class="mt-2 text-gray-600 text-sm"><strong>Abyss:</strong> {video.abyss}</p>
        <p class="text-gray-600 text-sm"><strong>Uploader:</strong> {video.uploader}</p>
      </div>
    {/each}
    </div>
  </div>
{:else}
  <p class="text-center text-gray-600">No team data available.</p>
{/if}
