
<slot /> <!-- This will render the content of each page -->

<svelte:head>
  <title>Marisa Impact - A Honkai Impact 3rd Guide Website</title> 
    <meta property="og:title" content="Marisa Impact - A Honkai Impact 3rd Guide Website" />
    <meta property="og:description" content="Honkai Impact 3rd Guides, Character Builds, Beta News and More" />
    <meta property="og:image" content="https://i.imgur.com/mX6zxhQ.png" />
    <meta property="og:url" content="https://marisaimpact.com" />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary_large_image">

    <link rel="canonical" href="https://marisaimpact.com" />
</svelte:head>

<script lang="ts">
  import { onMount } from 'svelte';

  // IDs of images to wait for
  const imageIds = ['bgwave', 'bannerpic', 'news1', 'news2', 'news3', 'content1' , 'content2'];

  let isLoading = true;

  onMount(() => {
    const promises = imageIds.map((id) => {
      return new Promise<void>((resolve) => {
        const container = document.getElementById(id);
        if (!container) {
          console.warn(`Element with ID ${id} not found`);
          resolve(); // Resolve immediately if the element is missing
          return;
        }

        const img = container.querySelector('img');
        if (img?.complete) {
          resolve(); // Image already loaded
        } else if (img) {
          img.addEventListener('load', () => resolve(), { once: true });
          img.addEventListener('error', () => {
            console.error(`Error loading image for ID ${id}`);
            resolve(); // Resolve even if the image fails to load
          }, { once: true });
        } else {
          console.warn(`No image found inside element with ID ${id}`);
          resolve(); // Resolve immediately if no <img> is found
        }
      });
    });

    // Add a fallback timeout
    const timeout = new Promise<void>((resolve) => {
      setTimeout(() => {
        console.warn('Timeout reached, proceeding to show page');
        resolve();
      }, 10000); // Adjust timeout as needed (10 seconds here)
    });

    // Wait for all images to load or timeout
    Promise.race([Promise.all(promises), timeout]).then(() => {
      isLoading = false; // Hide the loading state
    });
  });

  
  let isClicked = false;
  let imageSrc = '/images/test2.webp';

  // Function to handle image click
  function handleClick() {
    isClicked = true;
    imageSrc = '/images/test3.webp';

    // Revert to the original image after a few seconds
    setTimeout(() => {
      imageSrc = '/images/test2.webp';
      isClicked = false;
    }, 3000); // Adjust time as needed
  }


  let regionalServerInfo = '';
  let cnServerInfo = '';
  
  onMount(() => {
      updatePatchTime();
  });

  function updatePatchTime() {
      const regionalStartDate = new Date('2024-11-29'); // Start date for v7.9 in Regional Servers
      const cnStartDate = new Date('2024-12-12');       // Start date for v7.9 in CN Servers

      const currentWeekRegional = calculateWeek(regionalStartDate);
      const currentWeekCN = calculateWeek(cnStartDate);

      regionalServerInfo = `Current: v7.9 Week ${currentWeekRegional}`;
      cnServerInfo = `Current: v8.0 Week ${currentWeekCN}`;
  }

  function calculateWeek(startDate: Date): number {
    const now = new Date();
    const msInWeek = 1000 * 60 * 60 * 24 * 7;

    // Convert current time to UTC+8 by adding 8 hours (8 * 60 * 60 * 1000 ms)
    const nowUTC8 = new Date(now.getTime() + 8 * 60 * 60 * 1000);
    
    const diffInWeeks = Math.floor((Date.UTC(nowUTC8.getUTCFullYear(), nowUTC8.getUTCMonth(), nowUTC8.getUTCDate())
        - Date.UTC(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate())) / msInWeek);

    return diffInWeeks + 1;
}


</script>


<!-- Loading Screen -->
{#if isLoading}
<div class="loading-screen fixed inset-0  flex items-center justify-center z-50">
  <span class="loading loading-spinner loading-lg text-secondary"></span>
    <p class="text-white mt-4">Loading...</p>
  </div>
{/if}


<div class="page-content {isLoading ? 'hidden' : 'visible'}">
<section class="relative flex m-0 justify-center z-[-10]" id="bgwave">

  <img src="/images/bg/wave_sparkle.svg" alt="Banner" class="absolute top-0 w-full  h-auto z-[-7]">

    <img src="/images/radial.svg" alt="Banner" class="absolute top-0 left-0 w-full h-full object-cover z-[-1] mix-blend-multiply">

</section>

<section class="relative flex m-0 justify-center " id="bannerpic">

  <div class="relative max-w-screen-lg right-[-1rem]">
  <div>
    <img src="https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/sign/images/test1.webp?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvdGVzdDEud2VicCIsImlhdCI6MTczMjEyMzA1NCwiZXhwIjoyMDQ3NDgzMDU0fQ.7XeoccXhKwhr0-j_PGRBlBz-wlJw3AWSjg-_NakZMrA" alt="Banner" class="w-full h-full  object-cover">
  </div>
  <div class="absolute bottom-0 z-20 cursor-pointer" on:click={handleClick}>
    <img 
      src={imageSrc} 
      alt="Banner" 
      class="w-full h-full object-cover {isClicked ? 'stretch' : ''}"
    >
  </div>

</div>
</section>



<section class="py-6 z-10">
  <div class="xl:max-w-screen-2xl lg:max-w-screen-lg mx-auto px-4">
    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      
      <!-- Patch Time Section -->
      <div class="bg-gradient-to-b from-cyan-950 to-cyan-900 rounded-lg shadow-md outline-white outline-2 outline-double pb-3">
        <div class="flex items-center mb-2 bg-white rounded-t-lg">
            <img src="/images/crystal.png" alt="Patch Time Icon" class="w-8 h-8 mr-2">
            <h2 class="text-xl font-bold text-blue-600">PATCH TIME</h2>
        </div>
        
        <p class="text-sm sm:text-base text-slate-100 px-2">
            <strong class="text-amber-400">REGIONAL SERVERS</strong><br>
            - {regionalServerInfo}<br>
            - v8.0 update is on Jan 9
        </p>

        <p class="text-sm sm:text-base text-slate-100 px-2 mt-3">
            <strong class="text-amber-400">CN SERVER</strong><br>
            - {cnServerInfo}<br>
            - v8.1 update is on Jan 23
        </p>
    </div>

      <!-- 8.0 Info Date Section -->
      <div class="bg-gradient-to-b from-cyan-950 to-cyan-900 rounded-lg shadow-md outline-white outline-2 outline-double pb-3">
        <div class="flex items-center mb-2 bg-white rounded-t-lg">
          <img src="/images/crystal.png" alt="Info Date Icon" class="w-8 h-8 mr-2">
          <h2 class="text-xl font-bold text-blue-600">8.1 INFO DATE</h2>
        </div>
        <ul class="list-disc ml-6 text-sm sm:text-base text-slate-100 px-2">
          <li>Valk Reveal and Content Teaser: Jan 2-3</li>
          <li>Beta v1 (Private): Jan 3</li>
          <li>Dev Video: Jan 9</li>
          <li>Beta v2: Jan 10</li>
          <li>Beta v3: Jan 17</li>
          <li>Dev Livestream: Jan 18</li>
        </ul>
        <p class="text-sm sm:text-base text-gray-300 px-2 mt-3">Note: Estimated Date</p>
      </div>

      <!-- 7.9 Crystal Income Section -->
      <div class="bg-gradient-to-b from-cyan-950 to-cyan-900 rounded-lg shadow-md outline-white outline-2 outline-double pb-3">
        <div class="flex items-center mb-2 bg-white rounded-t-lg">
          <img src="/images/crystal.png" alt="Crystal Income Icon" class="w-8 h-8 mr-2">
          <h2 class="text-xl font-bold text-blue-600">8.0 CRYSTAL INCOME</h2>
        </div>

        <ul class="list-disc ml-6 text-sm sm:text-base text-slate-100 px-2 ">
          <li>F2P: 15,675</li>
          <li>Monthly: 19,195</li>
          <li>Monthly+BP: 20,515</li>
          <li>1 Equipment Card + 50% off the first 10 pull of Reign Solaris </li>
        </ul>
        <p class="text-sm sm:text-base text-gray-300 px-2 mt-3">Note: Calculation uses Agony 3 income</p>

        <div class="flex justify-center mt-5">
        <a href="https://www.miyoushe.com/bh3/article/59999849">
        <button class="btn btn-accent btn-sm">Source</button>
        </a>
      </div>
      </div>

            <!-- Active Codes -->
            <div class="bg-gradient-to-b from-cyan-950 to-cyan-900 rounded-lg shadow-md outline-white outline-2 outline-double pb-3">
              <div class="flex items-center mb-2 bg-white rounded-t-lg">
                <img src="/images/crystal.png" alt="Crystal Income Icon" class="w-8 h-8 mr-2">
                <h2 class="text-xl font-bold text-blue-600">ACTIVE CODES</h2>
              </div>
      
              <p class=" text-sm sm:text-base text-slate-100 px-2 ">
                <span class="font-bold">Sparkleimpact3rd , Sparkleplay   </span><br/>
                Sparkle Trial Card
              </p>

              <p class=" text-sm sm:text-base text-slate-100 px-2 mt-5">
                <span class="font-bold">HonkaixHonkai</span><br/>
                60 crystals
              </p>

              <p class=" text-sm sm:text-base text-slate-100 px-2 mt-5">
                <span class="font-bold">T9WPKNWDJD , 25VPANMD4Y</span><br/>
                50 crystals, 500 Asterite, 1 ADV skill mat
              </p>

              <p class=" text-sm sm:text-base text-slate-100 px-2 mt-5">
                <span class="font-bold">KIANAGIFT , SPARKLEGIFT , DURANDALGIFT , SONGQUESGIFT</span><br/>
                300 Asterite, 1 ADV skill mat , 1 stamina potion , 1 Special Outfit coupon
              </p>
      
              <div class="flex justify-center mt-5">

            </div>
            </div>

    </div>
  </div>
</section>
<section class="pb-10 pt-5  text-white z-10 ">
  <div class="xl:max-w-screen-xl lg:max-w-screen-lg mx-auto px-4">
    <h2 class="text-3xl font-bold mb-6 text-center">New Content</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      
      <!-- News Item Template -->
      <a href="/valk/sparkle" class="block bg-slate-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transform hover:scale-105 transition duration-200 ease-in-out" id="news1">

        <!-- svelte-ignore a11y_img_redundant_alt -->
        <img src="https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/images/news1.webp" alt="First Article Image" class="w-full h-48 object-cover" >
        <div class="p-4">
          <h3 class="text-xl font-semibold mb-2">New Battlesuit</h3>
          <p class="text-slate-300 text-base">Sparkle - Thousand-Faced Maestro: Cameo!</p>
        </div>
      </a>

      <a href="https://www.youtube.com/watch?v=KUcYGq-4Gpc" target=”_blank” class="block bg-slate-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transform hover:scale-105 transition duration-200 ease-in-out" id="news2">
        <!-- svelte-ignore a11y_img_redundant_alt -->
        <img src="https://i.ytimg.com/vi/KUcYGq-4Gpc/hqdefault.jpg" alt="Second Article Image" class="w-full h-48 object-cover">
        <div class="p-4">
          <h3 class="text-xl font-semibold mb-2">8.0 Beta News</h3>
          <p class="text-slate-300 text-base">Reign Solaris Gameplay</p>
        </div>
      </a>

      <a href="/hi3awards" class="block bg-slate-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transform hover:scale-105 transition duration-200 ease-in-out" id="news3">
        <!-- svelte-ignore a11y_img_redundant_alt -->
        <img src="https://ldbndupsaerjtcndwoqq.supabase.co/storage/v1/object/public/hi3award/hi3award.webp" alt="Third Article Image" class="w-full h-48 object-cover">
        <div class="p-4">
          <h3 class="text-xl font-semibold mb-2">HI3 Awards 2024</h3>
          <p class="text-slate-300 text-base">Results Are Out!</p>
        </div>
      </a>

      <!-- Add more news items as needed -->
      
    </div>
  </div>
</section>

<section class="pb-10 pt-5  text-white z-10 mb-40">
  <div class="xl:max-w-screen-xl lg:max-w-screen-lg mx-auto px-4">
    <h2 class="text-3xl font-bold mb-6 text-center">Featured</h2>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">



      <a href="https://www.youtube.com/watch?v=C3qwGALYccg" target=”_blank”  class="block bg-slate-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transform hover:scale-105 transition duration-200 ease-in-out" id="content1">
        <!-- svelte-ignore a11y_img_redundant_alt -->
        <img src="https://i.ytimg.com/vi/C3qwGALYccg/hqdefault.jpg" alt="Third Article Image" class="w-full h-48 object-cover">
        <div class="p-4">
          <h3 class="text-xl font-semibold mb-2">Latest Video From Earth</h3>
          <p class="text-slate-300 text-base">Check out Marisa Honkai's channel</p>
        </div>
      </a>

      <a href="https://arustats.herokuapp.com/" target=”_blank” class="block bg-slate-700 rounded-lg shadow-md overflow-hidden hover:shadow-lg transform hover:scale-105 transition duration-200 ease-in-out" id="content2">
        <!-- svelte-ignore a11y_img_redundant_alt -->
        <img src="/images/newstab/arustat.webp" alt="Fourth Article Image" class="w-full h-48 object-cover">
        <div class="p-4">
          <h3 class="text-xl font-semibold mb-2">Arustat Site</h3>
          <p class="text-slate-300 text-base">Check out Arustat site for HI3 teambuilder and more data</p>
        </div>
      </a>

      <!-- Add more news items as needed -->
      
    </div>
  </div>
</section>
<footer class="footer footer-center bg-base-300 text-base-content p-4">
  <aside>
    <p>This website is not associated with miHoYo/Hoyoverse. Honkai Impact 3rd game content and materials are trademarks and copyrights of miHoYo/Hoyoverse.</p>
  </aside>
</footer>

</div>


<style>
  /* Define the wobble animation */
  @keyframes wobble {
    0%, 100% { transform: rotate(0deg); }
    25% { transform: rotate(2deg); }
    50% { transform: rotate(-2deg); }
    75% { transform: rotate(2deg); }
  }

  /* Add the wobble class */
  .wobble {
    animation: wobble 1s ease infinite;
  }

  @keyframes stretch {
    0%, 100% { transform: scaleY(1); }
    50% { transform: scaleY(1.1); } /* Stretch slightly up and down */
  }

  .stretch {
    animation: stretch 0.5s ease-in-out infinite; /* Adjust duration and easing as needed */
    transform-origin: bottom; /* Keep the bottom fixed */
  }

  .loading-screen {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    z-index: 9999;
  }


  .spinner {
    width: 50px;
    height: 50px;
    border: 6px solid rgba(255, 255, 255, 0.3);
    border-top: 6px solid white;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  /* Page content hidden state */
  .page-content.hidden {
    visibility: hidden;
    opacity: 0;
    transition: visibility 0s, opacity 0.3s ease-in-out;
  }

  /* Page content visible state */
  .page-content.visible {
    visibility: visible;
    opacity: 1;
    transition: visibility 0s, opacity 0.3s ease-in-out;
  }
</style>