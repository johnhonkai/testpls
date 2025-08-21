<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

   import html2canvas from 'html2canvas-pro';
  import { onMount , onDestroy , tick } from 'svelte';
	import Fa from 'svelte-fa';
  import { faCamera } from '@fortawesome/free-solid-svg-icons';
  
async function captureStats() {
  const target = document.getElementById('statsSection');



  // Capture screenshot
  const canvas = await html2canvas(target, {
    useCORS: true,
    allowTaint: true,
    scale: 2
  });

  
  // Trigger download
  const link = document.createElement('a');
  link.download = `rot.png`;
  link.href = canvas.toDataURL();
  link.click();
}   

</script>


<div class=" ">
  <div class="mb-20"></div>

    <div class="flex justify-center mb-6 mt-20 ">
    <button
      onclick={captureStats}
      class="px-4 py-2 rounded-md  font-medium transition cursor-pointer  text-xs sm:text-sm h-10 w-auto
            text-white hover:bg-gray-700">
        <span 
        class="relative z-10 flex items-center gap-2 cursor-pointer text-center">
          <Fa icon={faCamera} size="1.3x" />
        </span>  
    </button>
  </div>
// full team rotation  
<div class="max-w-lg mx-auto bg-slate-900 p-4  space-y-2 my-10"  >
  <div class="text-center">
      <h2 class="text-xl font-semibold mb-4 text-amber-400 ">Rotation Opener (Instant SO) </h2>
    </div>
  <!-- Row 1 -->
  <div class="flex items-center bg-slate-800 p-3 rounded-lg">
    <img
      src="images/valkportrait/paws.png"
      alt="Avatar"
      class="h-12 w-12 rounded-full mr-4"
    />
    <div>
      <p class="text-white  text-base">Ultimate</p>
    </div>
  </div>

    <div class="flex items-center bg-slate-700 p-3 rounded-lg">
    <img
    src="images/valkportrait/scoralie.png"
    alt="Avatar"
      class="h-12 w-12 rounded-full mr-4"
    />
    <div>
      <p class="text-white  text-base mb-1">
        QTE ➔ Weapon ➔ Ultimate ➔ Activate Stellar Outburst
      </p>

    </div>
  </div>

      </div>

<div class="max-w-lg mx-auto bg-slate-900 p-4  space-y-2 my-10"  id="statsSection" >
  <div class="text-center">
      <h2 class="text-xl font-semibold mb-4 text-amber-400 ">Rotation Opener (Delay SO) </h2>
    </div>
  <!-- Row 1 -->
  <div class="flex items-center bg-slate-800 p-3 rounded-lg">
    <img
      src="images/valkportrait/Vita Lone Planetfarer.png"
      alt="Avatar"
      class="h-12 w-12 rounded-full mr-4"
    />
    <div>
      <p class="text-white  text-base">Press Ult to enter Planet Quaker form</p>
    </div>
  </div>

    <div class="flex items-center bg-slate-700 p-3 rounded-lg">
    <img
    src="images/valkportrait/paws.png"
    alt="Avatar"
      class="h-12 w-12 rounded-full mr-4"
    />
    <div>
      <p class="text-white  text-base mb-1">
        Ultimate
      </p>

    </div>
  </div>

    <div class="flex items-center bg-slate-800 p-3 rounded-lg">
    <img
      src="images/valkportrait/Vita Lone Planetfarer.png"
      alt="Avatar"
      class="h-12 w-12 rounded-full mr-4"
    />
    <div>
      <p class="text-white  text-base">Weapon ➔ Basic ATK until final sequence ➔ Combo ATK (Can skip if enough sp to use Ult) ➔ Ultimate</p>
    </div>


    
  </div>

    <div class="flex items-center bg-slate-700 p-3 rounded-lg">
    <img
    src="images/valkportrait/scoralie.png"
    alt="Avatar"
      class="h-12 w-12 rounded-full mr-4"
    />
    <div>
      <p class="text-white  text-base mb-1">
        QTE ➔ Weapon ➔ Ultimate ➔ Activate Stellar Outburst ➔ Basic ATK x4 ➔ Weapon ➔ Ultimate. Repeat until when you want to use Stellar Outburst ➔ Activate Stellar Outburst
      </p>

    </div>

  </div>

      </div>      

<div class="max-w-lg mx-auto bg-slate-900 p-4  space-y-2 my-10 "   >
  
  <div class="text-center">
      <h2 class="text-xl font-semibold text-amber-400 mb-1">AR Charging Rotation</h2>

    </div>
  <!-- Row 1 -->

    <div class="flex items-center bg-slate-800 p-3 rounded-lg">
      <img
        src="images/valkportrait/scoralie.png"
        alt="Avatar"
        class="h-12 w-12 rounded-full mr-4"
      />
      <div>
          <p class="text-white text-base mb-1">
            Basic ATK x4 ➔ Weapon ➔ Ultimate. 
          </p>
          <p class="text-teal-500 mt-2 text-base">
           If some time has passed after Stellar Outburst (eg. after transition phase), if support buffs have expired, then start with supports sequence instead.
          </p>

      </div>
    </div>

  <!-- Row 2 -->
  <div class="flex items-center bg-slate-700 p-3 rounded-lg">
    <img
      src="images/valkportrait/Vita Lone Planetfarer.png"
      alt="Avatar"
      class="h-12 w-12 rounded-full mr-4"
    />
    <div>
      <p class="text-white  text-base mb-1">Press Ult to enter Planet Quaker form ➔ Weapon ➔ Basic ATK until final sequence ➔ Combo ATK ➔ Ultimate</p>

    </div>
  </div>
  <!-- Row 3 -->

  <div class="flex items-center bg-slate-800 p-3 rounded-lg">
    <img
      src="images/valkportrait/paws.png"
      alt="Avatar"
      class="h-12 w-12 rounded-full mr-4"
    />
    <div>
      <p class="text-white  text-base mb-1">QTE ➔ Ultimate</p>
          <p class="text-teal-500 mt-2 text-base">
           If there's other sp source (eg. stage sp pack), then you can toggle off QTE.
          </p>
    </div>
  </div>
  <!-- Row 4 -->

    <div class="flex items-center bg-slate-700 p-3 rounded-lg">
      <img
      src="images/valkportrait/scoralie.png"
      alt="Avatar"
        class="h-12 w-12 rounded-full mr-4"
      />
      <div>
        <p class="text-white text-base mb-1">
            QTE ➔ Weapon ➔ Ultimate ➔ Basic ATK x4 ➔ Weapon ➔ Ultimate. Repeat until Stellar Outburst is ready ➔ Activate Stellar Outburst
        </p>

      </div>
    </div>
  <p class="text-sm text-slate-400 text-center">Continue with Stellar Outburst Rotation</p>

</div>

<div class="max-w-lg mx-auto bg-slate-900 p-4  space-y-2 my-10">
  
  <div class="text-center">
      <p class="text-xl font-semibold mb-4 text-amber-400">Stellar Outburst Rotation</p>
    
  </div>
    <div class="flex items-center bg-slate-800 p-3 rounded-lg">
      <img
        src="images/valkportrait/scoralie.png"
        alt="Avatar"
        class="h-12 w-12 rounded-full mr-4"
      />
      <div>
        <p class="text-white  text-base">Hold ATK until Dragon Breath ends ➔ Basic ATK x2 ➔ Weapon ➔ Basic ATK x4 ➔ Weapon ➔ Ultimate ➔ Hold Ult button until prompt ends.    </p>
        <p class="text-teal-500 mt-2 text-base">As mentioned in skill section, you can end Stellar Outburst early by casting Ult with 1 or 2 Guzzled Flames stacks.  </p>

      </div>
    </div>



 
  <p class="text-sm text-slate-400 text-center">Continue with AR Charging Rotation</p>

</div>

// f2p team rotation  
<div class="max-w-lg mx-auto bg-slate-900 p-4  space-y-2 my-10">
  <div class="text-center">
      <h2 class="text-xl font-semibold mb-4 text-amber-400 ">Rotation Opener </h2>
    </div>
  <!-- Row 1 -->
  <div class="flex items-center bg-slate-800 p-3 rounded-lg">
    <img
      src="images/valkportrait/Vita Lone Planetfarer.png"
      alt="Avatar"
      class="h-12 w-12 rounded-full mr-4"
    />
    <div>
      <p class="text-white  text-base">Press Ult to enter Planet Quaker form</p>
    </div>
  </div>

  <div class="flex items-center bg-slate-700 p-3 rounded-lg">
    <img
    src="images/valkportrait/Coralie Valkyrie Blastmetal.png"
    alt="Avatar"
      class="h-12 w-12 rounded-full mr-4"
    />
    <div>
      <p class="text-white  text-base mb-1">
        Ultimate
      </p>

    </div>
  </div>

      <!-- Row 3 -->
  <div class="flex items-center bg-slate-800 p-3 rounded-lg">
    <img
      src="images/valkportrait/Vita Lone Planetfarer.png"
      alt="Avatar"
      class="h-12 w-12 rounded-full mr-4"
    />
    <div>
      <p class="text-white  text-base">Weapon ➔ Basic ATK until final sequence ➔ Combo ATK ➔ Ultimate</p>
    </div>
  </div>

    <div class="flex items-center bg-slate-700 p-3 rounded-lg">
    <img
    src="images/valkportrait/scoralie.png"
    alt="Avatar"
      class="h-12 w-12 rounded-full mr-4"
    />
    <div>
      <p class="text-white  text-base mb-1">
        QTE ➔ Weapon ➔ Ultimate ➔ ATK a bit until AR meter is full ➔ Activate Stellar Outburst
      </p>

    </div>
  </div>

      </div>

<div class="max-w-lg mx-auto bg-slate-900 p-4  space-y-2 my-10 "     >
  
  <div class="text-center">
      <h2 class="text-xl font-semibold text-amber-400 mb-1">AR Charging Rotation</h2>

    </div>
  <!-- Row 1 -->

    <div class="flex items-center bg-slate-800 p-3 rounded-lg">
      <img
        src="images/valkportrait/scoralie.png"
        alt="Avatar"
        class="h-12 w-12 rounded-full mr-4"
      />
      <div>
          <p class="text-white text-base mb-1">
            Basic ATK x4 ➔ Weapon ➔ Ultimate. Repeat one more time.
          </p>
          <p class="text-teal-500 mt-2 text-base">
           If some time has passed after Stellar Outburst (eg. after transition phase), if support buffs have expired, then start with supports sequence instead.
          </p>

      </div>
    </div>

  <!-- Row 2 -->
  <div class="flex items-center bg-slate-700 p-3 rounded-lg">
    <img
      src="images/valkportrait/Coralie Valkyrie Blastmetal.png"
      alt="Avatar"
      class="h-12 w-12 rounded-full mr-4"
    />
    <div>
      <p class="text-white  text-base mb-1">Weapon ➔ Weapon again when button glows ➔ Ultimate (optional for more dmg)</p>

    </div>
  </div>
  <!-- Row 3 -->

  <div class="flex items-center bg-slate-800 p-3 rounded-lg">
    <img
      src="images/valkportrait/Vita Lone Planetfarer.png"
      alt="Avatar"
      class="h-12 w-12 rounded-full mr-4"
    />
    <div>
      <p class="text-white  text-base mb-1">QTE ➔ Basic ATK until final sequence ➔ Press Ult to enter Planet Quaker form ➔ Weapon ➔ Basic ATK until final sequence ➔ Combo ATK ➔ Ultimate</p>

    </div>
  </div>
  <!-- Row 4 -->

    <div class="flex items-center bg-slate-700 p-3 rounded-lg">
      <img
      src="images/valkportrait/scoralie.png"
      alt="Avatar"
        class="h-12 w-12 rounded-full mr-4"
      />
      <div>
        <p class="text-white text-base mb-1">
            QTE ➔ Weapon ➔ Ultimate ➔ Basic ATK x4 ➔ Weapon ➔ Ultimate. Repeat until Stellar Outburst is ready ➔ Activate Stellar Outburst
        </p>

      </div>
    </div>
  <p class="text-sm text-slate-400 text-center">Continue with Stellar Outburst Rotation</p>

</div>

<div class="max-w-lg mx-auto bg-slate-900 p-4  space-y-2 my-10 ">
  
  <div class="text-center">
      <p class="text-xl font-semibold mb-4 text-amber-400">Stellar Outburst Rotation</p>
    
  </div>
    <div class="flex items-center bg-slate-800 p-3 rounded-lg">
      <img
        src="images/valkportrait/scoralie.png"
        alt="Avatar"
        class="h-12 w-12 rounded-full mr-4"
      />
      <div>
        <p class="text-white  text-base">Hold ATK until Dragon Breath ends ➔ Basic ATK x2 ➔ Weapon ➔ Basic ATK x4 ➔ Weapon ➔ Ultimate ➔ Hold Ult button until prompt ends.    </p>
        <p class="text-teal-500 mt-2 text-base">As mentioned in skill section, you can end Stellar Outburst early by casting Ult with 1 or 2 Guzzled Flames stacks.  </p>

      </div>
    </div>



 
  <p class="text-sm text-slate-400 text-center">Continue with AR Charging Rotation</p>

</div>



// f2p team rotation  
<div class="max-w-lg mx-auto bg-slate-900 p-4  space-y-2 my-10" >
  <div class="text-center">
      <h2 class="text-xl font-semibold mb-4 text-amber-400 ">Rotation Opener</h2>
    </div>
  <!-- Row 1 -->
  <div class="flex items-center bg-slate-800 p-3 rounded-lg">
    <img
      src="images/valkportrait/Elysia Herrscher of Human Ego.png"
      alt="Avatar"
      class="h-12 w-12 rounded-full mr-4"
    />
    <div>
      <p class="text-white  text-base">Evade ➔ Charged ATK ➔ Weapon</p>
    </div>
  </div>

  <div class="flex items-center bg-slate-700 p-3 rounded-lg">
    <img
    src="images/valkportrait/Coralie Valkyrie Blastmetal.png"
    alt="Avatar"
      class="h-12 w-12 rounded-full mr-4"
    />
    <div>
      <p class="text-white  text-base mb-1">
      QTE ➔ Weapon ➔ Weapon again when button glows ➔ Ultimate (if available)
      </p>

    </div>
  </div>

      <!-- Row 4 -->
      <div class="flex items-center bg-slate-800 p-3 rounded-lg">
        <img
        src="images/valkportrait/paws.png"
        alt="Avatar"
          class="h-12 w-12 rounded-full mr-4"
        />
        <div>
          <p class="text-white text-base mb-2">
            QTE ➔ Ultimate ➔ Weapon ➔ Ultimate ➔ Basic ATK x3 ➔ Ultimate ➔ Combo ATK. Repeat until you can activate Stellar Outburst (SO).
          </p>
          <p class="text-white text-base mb-1">
            Make sure to have at least 100 sp before using SO, so you can use Ult immediately after SO ends.

          </p>
        </div>
      </div>

      </div>

<div class="max-w-lg mx-auto bg-slate-900 p-4  space-y-2 my-10 "  >
  
  <div class="text-center">
      <h2 class="text-xl font-semibold text-amber-400 mb-1">AR Charging Rotation</h2>

    </div>
  <!-- Row 1 -->

    <div class="flex items-center bg-slate-800 p-3 rounded-lg">
      <img
        src="images/valkportrait/paws.png"
        alt="Avatar"
        class="h-12 w-12 rounded-full mr-4"
      />
      <div>
          <p class="text-white text-base mb-1">
            Ultimate ➔ Weapon ➔ Ultimate ➔ Basic ATK x3 ➔ Ultimate ➔ Combo ATK
          </p>
      </div>
    </div>

  <!-- Row 2 -->
  <div class="flex items-center bg-slate-700 p-3 rounded-lg">
    <img
      src="images/valkportrait/Elysia Herrscher of Human Ego.png"
      alt="Avatar"
      class="h-12 w-12 rounded-full mr-4"
    />
    <div>
      <p class="text-white  text-base mb-1">QTE ➔ Weapon ➔ Ultimate (if available)</p>

    </div>
  </div>
  <!-- Row 3 -->

  <div class="flex items-center bg-slate-800 p-3 rounded-lg">
    <img
    src="images/valkportrait/Coralie Valkyrie Blastmetal.png"
      alt="Avatar"
      class="h-12 w-12 rounded-full mr-4"
    />
    <div>
      <p class="text-white  text-base mb-1">
      QTE ➔ Weapon ➔ Weapon again when button glows ➔ Ultimate (if available)
      </p>

    </div>
  </div>
  <!-- Row 4 -->

    <div class="flex items-center bg-slate-700 p-3 rounded-lg">
      <img
      src="images/valkportrait/paws.png"
      alt="Avatar"
        class="h-12 w-12 rounded-full mr-4"
      />
        <div>
          <p class="text-white text-base mb-2">
            QTE ➔ Ultimate ➔ Weapon ➔ Ultimate ➔ Basic ATK x3 ➔ Ultimate ➔ Combo ATK. Repeat until you can activate Stellar Outburst (SO).
          </p>
          <p class="text-white text-base mb-1">
            Make sure to have at least 100 sp before using SO, so you can use Ult immediately after SO ends.

          </p>
        </div>
    </div>
  <p class="text-sm text-slate-400 text-center">Continue with Stellar Outburst Rotation</p>

</div>

<div class="max-w-lg mx-auto bg-slate-900 p-4  space-y-2 my-10 ">
  
  <div class="text-center">
      <p class="text-xl font-semibold mb-4 text-amber-400">Stellar Outburst Rotation</p>
    
  </div>
    <div class="flex items-center bg-slate-800 p-3 rounded-lg">
      <img
        src="images/valkportrait/paws.png"
        alt="Avatar"
        class="h-12 w-12 rounded-full mr-4"
      />
      <div>
        <p class="text-white  text-base">Ultimate x3 ➔ Combo ATK ➔ Ultimate Finisher </p>
      </div>
    </div>


 
  <p class="text-sm text-slate-400 text-center">Continue with AR Charging Rotation</p>

</div>

<div class="max-w-lg mx-auto bg-slate-900 p-4 rounded-lg space-y-2 my-10">
  
  <div class="text-center">
      <p class="text-xl font-semibold mb-4 text-amber-400">First Rotation</p>
  </div>


    <div class="flex items-center bg-slate-700 p-3 rounded-lg">
      <img
        src="images/valkportrait/Seele Herrscher of Rebirth.png"
        alt="Avatar"
        class="h-12 w-12 rounded-full mr-4"
      />
      <div>
        <p class="text-white  text-base mb-1">Evade ➔ Basic ATK until full meter ➔ Combo ATK ➔ Combo ATK followup</p>
        <p class="text-gray-300 text-sm">S2-rank can skip Combo ATK</p>

      </div>
    </div>

  <!-- Row 2 -->
  <div class="flex items-center bg-slate-800 p-3 rounded-lg">
    <img
    src="images/valkportrait/dudu.png"
    alt="Avatar"
      class="h-12 w-12 rounded-full mr-4"
    />
    <div>
      <p class="text-white text-base">
        QTE ➔ Basic ATK x2 ➔ Charged ATK ➔ Ultimate 
        
      </p>

    </div>
  </div>
  <div class="flex items-center bg-slate-700 p-3 rounded-lg">
    <img
      src="images/valkportrait/Seele Herrscher of Rebirth.png"
      alt="Avatar"
      class="h-12 w-12 rounded-full mr-4"
    />
    <div>
      <p class="text-white  text-base">Ultimate ➔ Weapon</p>

    </div>
  </div>

  <!-- Row 3 -->

    <div class="flex items-center bg-slate-800 p-3 rounded-lg">
      <img
        src="images/valkportrait/Hare Dreamweaver.png"
        alt="Avatar"
        class="h-12 w-12 rounded-full mr-4"
      />
      <div>
        <p class="text-white  text-base ">DPS does her dps stuff</p>

       
      </div>
    </div>


</div>

<div class="max-w-lg mx-auto bg-slate-900 p-4 rounded-lg space-y-2 my-10">
  
  <div class="text-center">
      <p class="text-xl font-semibold mb-4 text-amber-400">Second Rotation</p>
  </div>

  <!-- Row 2 -->
  <div class="flex items-center bg-slate-800 p-3 rounded-lg">
    <img
    src="images/valkportrait/dudu.png"
    alt="Avatar"
      class="h-12 w-12 rounded-full mr-4"
    />
    <div>
      <p class="text-white text-base">
        QTE ➔ Basic ATK x2 ➔ Charged ATK ➔ Ultimate 
        
      </p>

    </div>
  </div>

    <div class="flex items-center bg-slate-700 p-3 rounded-lg">
      <img
        src="images/valkportrait/Seele Herrscher of Rebirth.png"
        alt="Avatar"
        class="h-12 w-12 rounded-full mr-4"
      />
      <div>
        <p class="text-white  text-base">QTE ➔ Combo ATK ➔ Combo ATK followup</p>

      </div>
    </div>



  <!-- Row 3 -->

    <div class="flex items-center bg-slate-800 p-3 rounded-lg">
      <img
        src="images/valkportrait/Hare Dreamweaver.png"
        alt="Avatar"
        class="h-12 w-12 rounded-full mr-4"
      />
      <div>
        <p class="text-white  text-base ">DPS does her dps stuff</p>

       
      </div>
    </div>

  <p class="text-sm text-slate-400 text-center">Back to first rotation sequence</p>

</div>
<div class="max-w-lg mx-auto bg-slate-900 p-4 rounded-lg space-y-2 my-10">
    <div class="text-center">
        <h2 class="text-xl font-semibold mb-4 text-amber-400">Rotation Opener</h2>
      </div>
    <!-- Row 1 -->
    <div class="flex items-center bg-slate-800 p-3 rounded-lg">
      <img
        src="images/valkportrait/dudu.png"
        alt="Avatar"
        class="h-12 w-12 rounded-full mr-4"
      />
      <div>
        <p class="text-white  text-base">Press weapon to enter Skyrider form</p>
      </div>
    </div>
  
    <div class="flex items-center bg-slate-700 p-3 rounded-lg">
      <img
      src="images/valkportrait/Vita Lone Planetfarer.png"
      alt="Avatar"
        class="h-12 w-12 rounded-full mr-4"
      />
      <div>
        <p class="text-white  text-base">
          Press Ult to enter Planet Quaker form ➔ Weapon ➔ Basic ATK until full meter ➔ Combo ATK ➔ Ultimate
        </p>
      </div>
    </div>
  
        <!-- Row 4 -->
        <div class="flex items-center bg-slate-800 p-3 rounded-lg">
          <img
          src="images/valkportrait/sparkle.png"
          alt="Avatar"
            class="h-12 w-12 rounded-full mr-4"
          />
          <div>
            <p class="text-white text-base">
              QTE ➔ Weapon ➔ Combo ATK ➔ Ultimate 
            </p>
            <p class="text-gray-300 text-sm">SS-rank Sparkle can skip Combo ATK</p>
    
          </div>
        </div>


  </div>
 
// PS team rotation  
<div class="max-w-lg mx-auto bg-slate-900 p-4  space-y-2 my-10" >
  <div class="text-center">
      <h2 class="text-xl font-semibold mb-4 text-amber-400 ">Rotation Opener </h2>
    </div>
  <!-- Row 1 -->
  <div class="flex items-center bg-slate-800 p-3 rounded-lg">
    <img
      src="images/valkportrait/Vita%20Lone%20Planetfarer.png"
      alt="Avatar"
      class="h-12 w-12 rounded-full mr-4"
    />
    <div>
      <p class="text-white  text-base">Press Ult (Enter Planet Quaker Form) ➔ Weapon ➔ Basic ATK until final sequence ➔ Ultimate</p>
    </div>
  </div>

  <div class="flex items-center bg-slate-700 p-3 rounded-lg">
    <img
    src="images/valkportrait/kiana badum.png"
    alt="Avatar"
      class="h-12 w-12 rounded-full mr-4"
    />
    <div>
      <p class="text-white  text-base mb-1">
        QTE
      </p>
        <p class="text-gray-300 text-sm">To activate buffs.</p>

    </div>
  </div>

      <!-- Row 4 -->
      <div class="flex items-center bg-slate-800 p-3 rounded-lg">
        <img
        src="images/valkportrait/ps.png"
        alt="Avatar"
          class="h-12 w-12 rounded-full mr-4"
        />
        <div>
          <p class="text-white text-base mb-1">
            QTE ➔ Weapon ➔ Ultimate (optional) ➔ Combo ATK ➔ Weapon
          </p>
        <p class="text-gray-300 text-sm">Ult is flexible, but don't use it when weapon button is flashing.</p>

        </div>
      </div>

        <div class="flex items-center bg-slate-700 p-3 rounded-lg">
    <img
    src="images/valkportrait/kiana badum.png"
    alt="Avatar"
      class="h-12 w-12 rounded-full mr-4"
    />
    <div>
      <p class="text-white  text-base mb-1">
        QTE ➔ Combo ATK / Weapon
      </p> 
        <p class="text-gray-300 text-sm">Combo ATK is faster. Weapon skill is better for mobs to apply damage link effect.</p>

    </div>
  </div>

      <div class="flex items-center bg-slate-800 p-3 rounded-lg">
        <img
        src="images/valkportrait/ps.png"
        alt="Avatar"
          class="h-12 w-12 rounded-full mr-4"
        />
        <div>
          <p class="text-white text-base mb-1">
            QTE ➔ Weapon ➔ Combo ATK ➔ Weapon
          </p>

        </div>
      </div>  

  <div class="flex items-center bg-slate-700 p-3 rounded-lg">
    <img
    src="images/valkportrait/Vita%20Lone%20Planetfarer.png"
    alt="Avatar"
      class="h-12 w-12 rounded-full mr-4"
    />
    <div>
      <p class="text-white  text-base mb-1">
        QTE
      </p>
        <p class="text-gray-300 text-sm">QTE to gain AR intensity. Stellar Outburst is ready.</p>

    </div>
  </div>


      </div>

<div class="max-w-lg mx-auto bg-slate-900 p-4  space-y-2 my-10"  >
  <div class="text-center">
      <h2 class="text-xl font-semibold mb-4 text-amber-400 ">Stellar Shift Rotation </h2>
    </div>
  <!-- Row 1 -->
  <div class="flex items-center bg-slate-800 p-3 rounded-lg">
    <img
      src="images/valkportrait/unknownchar.png"
      alt="Avatar"
      class="h-12 w-12 rounded-full mr-4"
    />
    <div>
      <p class="text-white  text-base">Any character activates Stellar Outburst</p>
    </div>
  </div>

  <div class="flex items-center bg-slate-700 p-3 rounded-lg">
    <img
    src="images/valkportrait/ps.png"
    alt="Avatar"
      class="h-12 w-12 rounded-full mr-4"
    />
    <div>
      <p class="text-white  text-base mb-1">
        Stellar Shift ➔ Press QTE button ➔ Weapon ➔ Ultimate (optional) ➔ Weapon x2
      </p>
        <p class="text-gray-300 text-sm">Ult is flexible.</p>

    </div>
  </div>

      <!-- Row 4 -->
      <div class="flex items-center bg-slate-800 p-3 rounded-lg">
        <img
        src="images/valkportrait/kiana badum.png"
        alt="Avatar"
          class="h-12 w-12 rounded-full mr-4"
        />
        <div>
          <p class="text-white text-base mb-1">
            Stellar Shift ➔ Press QTE button x2 ➔ Weapon ➔ Ultimate
          </p>

        </div>
      </div>

        <div class="flex items-center bg-slate-700 p-3 rounded-lg">
    <img
    src="images/valkportrait/ps.png"
    alt="Avatar"
      class="h-12 w-12 rounded-full mr-4"
    />
    <div>
      <p class="text-white  text-base mb-1">
        QTE ➔ Weapon ➔ Combo ATK ➔ Weapon
      </p> 

    </div>
  </div>

      <div class="flex items-center bg-slate-800 p-3 rounded-lg">
        <img
        src="images/valkportrait/Vita%20Lone%20Planetfarer.png"
        alt="Avatar"
          class="h-12 w-12 rounded-full mr-4"
        />
        <div>
          <p class="text-white text-base mb-1">
            Stellar Shift ➔ Spam ATK until mecha punch ➔ Ultimate
          </p>

        </div>
      </div>  
  <p class="text-sm text-slate-400 text-center">Continue with AR Charging Rotation</p>


      </div>

<div class="max-w-lg mx-auto bg-slate-900 p-4  space-y-2 my-10" >
  <div class="text-center">
      <h2 class="text-xl font-semibold mb-4 text-amber-400 ">AR Charging Rotation </h2>
    </div>
  <!-- Row 1 -->
  <div class="flex items-center bg-slate-800 p-3 rounded-lg">
    <img
      src="images/valkportrait/ps.png"
      alt="Avatar"
      class="h-12 w-12 rounded-full mr-4"
    />
    <div>
      <p class="text-white  text-base">QTE ➔ Weapon ➔ Ultimate (optional) ➔ Combo ATK ➔ Weapon</p>
        <p class="text-gray-300 text-sm">Ult is flexible, but don't use it when weapon button is flashing.</p>

    </div>

  </div>

  <div class="flex items-center bg-slate-700 p-3 rounded-lg">
    <img
    src="images/valkportrait/kiana badum.png"
    alt="Avatar"
      class="h-12 w-12 rounded-full mr-4"
    />
    <div>
      <p class="text-white  text-base mb-1">
        QTE ➔ Combo ATK / Weapon
      </p>
        <p class="text-gray-300 text-sm">Combo ATK is faster. Weapon skill is better for mobs to apply damage link effect.</p>

    </div>
  </div>

      <!-- Row 4 -->
      <div class="flex items-center bg-slate-800 p-3 rounded-lg">
        <img
        src="images/valkportrait/ps.png"
        alt="Avatar"
          class="h-12 w-12 rounded-full mr-4"
        />
        <div>
          <p class="text-white text-base mb-1">
            QTE ➔ Weapon ➔ Combo ATK ➔ Weapon
          </p>

        </div>
      </div>

        <div class="flex items-center bg-slate-700 p-3 rounded-lg">
    <img
    src="images/valkportrait/Vita%20Lone%20Planetfarer.png"
    alt="Avatar"
      class="h-12 w-12 rounded-full mr-4"
    />
    <div>
      <p class="text-white  text-base mb-1">
        QTE ➔ Press Ult (Enter Planet Quaker Form) ➔ Weapon ➔ Basic ATK until final sequence ➔ Ultimate
      </p> 

    </div>
  </div>



  <p class="text-sm text-slate-400 text-center">Repeat until you can activate Stellar Outburst</p>

      </div>
      
</div>