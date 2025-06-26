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
<div class="max-w-lg mx-auto bg-slate-900 p-4  space-y-2 my-10">
  <div class="text-center">
      <h2 class="text-xl font-semibold mb-4 text-amber-400 ">Rotation Opener</h2>
    </div>
  <!-- Row 1 -->
  <div class="flex items-center bg-slate-800 p-3 rounded-lg">
    <img
      src="images/valkportrait/kiana badum.png"
      alt="Avatar"
      class="h-12 w-12 rounded-full mr-4"
    />
    <div>
      <p class="text-white  text-base">Combo ATK ➔ Ultimate</p>
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
        QTE ➔ Weapon ➔ Ultimate
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
          <p class="text-white text-base mb-1">
            QTE ➔ Ultimate ➔ Weapon ➔ Ultimate ➔ Basic ATK x4 ➔ Ultimate ➔ Combo ATK. Repeat until you can activate Stellar Outburst.
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
            Ultimate ➔ Weapon ➔ Ultimate ➔ Basic ATK x4 ➔ Ultimate ➔ Combo ATK
          </p>
      </div>
    </div>

  <!-- Row 2 -->
  <div class="flex items-center bg-slate-700 p-3 rounded-lg">
    <img
      src="images/valkportrait/kiana badum.png"
      alt="Avatar"
      class="h-12 w-12 rounded-full mr-4"
    />
    <div>
      <p class="text-white  text-base mb-1">QTE ➔ Combo ATK / Weapon ➔ Ultimate</p>
      <p class="text-gray-300 text-sm">Combo ATK is faster. Weapon skill is better for mobs to apply dmg link effect.</p>

    </div>
  </div>
  <!-- Row 3 -->

  <div class="flex items-center bg-slate-800 p-3 rounded-lg">
    <img
      src="images/valkportrait/ps.png"
      alt="Avatar"
      class="h-12 w-12 rounded-full mr-4"
    />
    <div>
      <p class="text-white  text-base mb-1">QTE ➔ Weapon ➔ Ultimate </p>

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
        <p class="text-white text-base mb-1">
            QTE ➔ Ultimate ➔ Weapon ➔ Ultimate ➔ Basic ATK x4 ➔ Ultimate ➔ Combo ATK. Repeat until you can activate Stellar Outburst.
        </p>

      </div>
    </div>
  <p class="text-sm text-slate-400 text-center">Continue with Stellar Outburst Rotation</p>

</div>

<div class="max-w-lg mx-auto bg-slate-900 p-4  space-y-2 my-10 "  id="statsSection">
  
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
        <p class="text-white  text-base">Ultimate x3 ➔ Combo ATK  </p>

      </div>
    </div>

  <!-- Row 1 -->

    <div class="flex items-center bg-slate-700 p-3 rounded-lg">
      <img
        src="images/valkportrait/kiana badum.png"
        alt="Avatar"
        class="h-12 w-12 rounded-full mr-4"
      />
      <div>
        <p class="text-white  text-base mb-1">QTE ➔ Weapon ➔ Ultimate</p> 

      </div>
    </div>

  <!-- Row 2 -->
  <div class="flex items-center bg-slate-800 p-3 rounded-lg">
    <img
    src="images/valkportrait/ps.png"
    alt="Avatar"
      class="h-12 w-12 rounded-full mr-4"
    />
    <div>
        <p class="text-white  text-base mb-1">QTE ➔ Weapon ➔ Ultimate
      </p> 


    </div>
  </div>

  <!-- Row 3 -->

  <div class="flex items-center bg-slate-700 p-3 rounded-lg">
    <img
      src="images/valkportrait/paws.png"
      alt="Avatar"
      class="h-12 w-12 rounded-full mr-4"
    />
    <div>
      <p class="text-white  text-base mb-1">QTE ➔ Ultimate x3 ➔ Combo ATK ➔ Ultimate Finisher</p>
        <p class="text-gray-300 text-sm">If this is the final rotation, you can use weapon skill for more damage. If not, preferably, you want to save weapon skill for AR Charging state.</p>

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
            QTE ➔ Ultimate ➔ Weapon ➔ Ultimate ➔ Basic ATK x4 ➔ Ultimate ➔ Combo ATK. Repeat until you can activate Stellar Outburst (SO).
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
            Ultimate ➔ Weapon ➔ Ultimate ➔ Basic ATK x4 ➔ Ultimate ➔ Combo ATK
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
      <p class="text-white  text-base mb-1">QTE ➔ Weapon ➔ Ultimate</p>

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
            QTE ➔ Ultimate ➔ Weapon ➔ Ultimate ➔ Basic ATK x4 ➔ Ultimate ➔ Combo ATK. Repeat until you can activate Stellar Outburst (SO).
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
  
  <div class="max-w-lg mx-auto bg-slate-900 p-4 rounded-lg space-y-2 my-10">
    
    <div class="text-center">
        <h2 class="text-xl font-semibold mb-4 text-amber-400">Rotation Flow</h2>
      </div>
    <!-- Row 1 -->

      <div class="flex items-center bg-slate-800 p-3 rounded-lg">
        <img
          src="images/valkportrait/dudu.png"
          alt="Avatar"
          class="h-12 w-12 rounded-full mr-4"
        />
        <div>
          <p class="text-white  text-base">QTE ➔ Ultimate ➔ Charged ATK ➔ Charged ATK EX</p>
        </div>
      </div>

    <!-- Row 2 -->
    <div class="flex items-center bg-slate-700 p-3 rounded-lg">
        <img
        src="images/valkportrait/sparkle.png"
        alt="Avatar"
          class="h-12 w-12 rounded-full mr-4"
        />
        <div>
          <p class="text-white text-base">
            QTE ➔ Weapon ➔ Combo ATK ➔ Ultimate (if available)
          </p>
  
        </div>
      </div>
    <!-- Row 3 -->

      <div class="flex items-center bg-slate-800 p-3 rounded-lg">
        <img
          src="images/valkportrait/dudu.png"
          alt="Avatar"
          class="h-12 w-12 rounded-full mr-4"
        />
        <div>
          <p class="text-white  text-base">QTE ➔ Charged ATK ➔ Charged ATK EX ➔ Weapon ➔ Charged ATK ➔ Charged ATK EX</p>
        </div>
      </div>

    <!-- Row 4 -->
    <div class="flex items-center bg-slate-700 p-3 rounded-lg">
        <img
          src="images/valkportrait/Vita Lone Planetfarer.png"
          alt="Avatar"
          class="h-12 w-12 rounded-full mr-4"
        />
        <div>
          <p class="text-white  text-base">QTE ➔ Press Ult to enter Planet Quaker form ➔ Basic ATK until full meter ➔ Ultimate (if available)</p>
        </div>
      </div>
  
  </div>

  <div class="max-w-lg mx-auto bg-slate-900 p-4 rounded-lg space-y-2 my-10">
    
    <div class="text-center">
        <h2 class="text-xl font-semibold mb-4 text-amber-400">Stellar Shift Rotation</h2>
      </div>

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

    <!-- Row 1 -->

      <div class="flex items-center bg-slate-700 p-3 rounded-lg">
        <img
          src="images/valkportrait/dudu.png"
          alt="Avatar"
          class="h-12 w-12 rounded-full mr-4"
        />
        <div>
          <p class="text-white  text-base">Stellar Shift ➔ Press ATK 4 times ➔ Ultimate (if available) ➔ Charged ATK x3 ➔ Charged ATK EX</p>
        </div>
      </div>

    <!-- Row 2 -->
    <div class="flex items-center bg-slate-800 p-3 rounded-lg">
        <img
        src="images/valkportrait/sparkle.png"
        alt="Avatar"
          class="h-12 w-12 rounded-full mr-4"
        />
        <div>
          <p class="text-white text-base">
            Stellar Shift ➔ Weapon ➔ Combo ATK ➔ Ultimate (if available)
          </p>
  
        </div>
      </div>
    <!-- Row 3 -->

      <div class="flex items-center bg-slate-700 p-3 rounded-lg">
        <img
          src="images/valkportrait/dudu.png"
          alt="Avatar"
          class="h-12 w-12 rounded-full mr-4"
        />
        <div>
          <p class="text-white  text-base">QTE ➔ Charged ATK ➔ Weapon ➔ Charged ATK ➔ Charged ATK EX
            <br/>
            Use Ultimate whenever available
          </p>
        </div>
      </div>

    <!-- Row 4 -->
    <div class="flex items-center bg-slate-800 p-3 rounded-lg">
        <img
          src="images/valkportrait/Vita Lone Planetfarer.png"
          alt="Avatar"
          class="h-12 w-12 rounded-full mr-4"
        />
        <div>
          <p class="text-white  text-base">Stellar Shift ➔ Spam ATK until finisher move ➔ Ultimate (if available) </p>
        </div>
      </div>
  
  </div>

  <div class="max-w-lg mx-auto bg-slate-900 p-4 rounded-lg space-y-2 my-10">
    
    <div class="text-center">
        <h2 class="text-xl font-semibold mb-4 text-amber-400">Stellar Outburst</h2>
      </div>
    <!-- Row 1 -->
    <div class="flex items-center bg-slate-700 p-3 rounded-lg">
        <img
        src="images/valkportrait/sparkle.png"
        alt="Avatar"
          class="h-12 w-12 rounded-full mr-4"
        />
        <div>
          <p class="text-white text-base">
            Activate Stellar Outburst ➔ Basic ATK until you cast I am Elation
          </p>
  
        </div>
      </div>


  
    <!-- Row 2 -->
    <div class="flex items-center bg-slate-800 p-3 rounded-lg">
      <img
      src="images/valkportrait/Kiana Herrscher of Finality.png"
      alt="Avatar"
        class="h-12 w-12 rounded-full mr-4"
      />
      <div>
        <p class="text-white  text-base">Ground Basic ATK x2 ➔ Evade ➔ Ground Basic ATK x2 ➔ Combo ATK ➔ Ultimate</p>
      </div>
    </div>
  
    <div class="flex items-center bg-slate-600 p-3 rounded-lg">
        <img
          src="images/valkportrait/Vita Lone Planetfarer.png"
          alt="Avatar"
          class="h-12 w-12 rounded-full mr-4"
        />
        <div>
          <p class="text-white  text-base">Press ATK until mecha punch ➔ Ultimate</p>
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
          QTE ➔ Weapon (I am Elation) ➔ Ultimate ➔ Combo ATK ➔ Basic ATK until full meter ➔ Combo ATK ➔ Weapon (I am Elation)
        </p>

      </div>
    </div>
  </div>

  <div class="max-w-lg mx-auto bg-slate-900 p-4 rounded-lg space-y-2 my-10">
    <div class="text-center">
        <h2 class="text-xl font-semibold mb-4 text-amber-400">AR Charging - Subsequent Rotations</h2>
      </div>
        <!-- Row 2 -->
        <div class="flex items-center bg-slate-700 p-3 rounded-lg">
            <img
            src="images/valkportrait/Kiana Herrscher of Finality.png"
            alt="Avatar"
              class="h-12 w-12 rounded-full mr-4"
            />
            <div>
              <p class="text-white  text-base">Ground Basic ATK x2 ➔ Evade ➔ Ground Basic ATK x2 ➔ Evade ➔ Ground Basic ATK ➔ Weapon ➔ Combo ATK</p>
            </div>
          </div>

    <!-- Row 1 -->
    <div class="flex items-center bg-slate-800 p-3 rounded-lg">
        <img
        src="images/valkportrait/Vita Lone Planetfarer.png"
        alt="Avatar"
          class="h-12 w-12 rounded-full mr-4"
        />
        <div>
          <p class="text-white text-base">
            QTE + Weapon Auto-cast ➔ Basic ATK full sequence ➔ Press Ult to enter Planet Quaker Form ➔ Weapon ➔ Basic ATK until full meter ➔ Combo ATK ➔ Ultimate
          </p>
  
        </div>
      </div>

  
    <!-- Row 4 -->
    <div class="flex items-center bg-slate-700 p-3 rounded-lg">
      <img
      src="images/valkportrait/sparkle.png"
      alt="Avatar"
        class="h-12 w-12 rounded-full mr-4"
      />
      <div>
        <p class="text-white text-base">
          QTE ➔ Weapon (I am Elation) ➔ Combo ATK ➔ Basic ATK until full meter ➔ Combo ATK ➔ Weapon (I am Elation)
        </p>
        <p class="text-gray-300 text-sm">Ultimate is flexible, you can use it whenever suitable</p>
        <p class="text-gray-300 text-sm">Repeat until enough AR to activate Stellar Outburst</p>

        
      </div>
    </div>
  </div>

  <div class="max-w-lg mx-auto bg-slate-900 p-4 rounded-lg space-y-2 my-10">
    <div class="text-center">
        <h2 class="text-xl font-semibold mb-4 text-amber-400">First Rotation</h2>
      </div>
        <!-- Row 2 -->
        <div class="flex items-center bg-slate-700 p-3 rounded-lg">
            <img
            src="images/valkportrait/Bronya Herrscher of Truth.png"
            alt="Avatar"
              class="h-12 w-12 rounded-full mr-4"
            />
            <div>
              <p class="text-white  text-base">Weapon ➔ Basic ATK ➔ Ult (Salvo Transformation) ➔ Ultimate</p>
            </div>
          </div>

    <!-- Row 1 -->
    <div class="flex items-center bg-slate-800 p-3 rounded-lg">
        <img
        src="images/valkportrait/sparkle.png"
        alt="Avatar"
          class="h-12 w-12 rounded-full mr-4"
        />
        <div>
          <p class="text-white text-base">
            QTE ➔ Weapon (I am Elation) ➔ Ultimate ➔ Cast on DPS
          </p>
  
        </div>
      </div>

  
    <!-- Row 4 -->
    <div class="flex items-center bg-slate-700 p-3 rounded-lg">
      <img
      src="images/valkportrait/Sirin Miracle Magical Girl.png"
      alt="Avatar"
        class="h-12 w-12 rounded-full mr-4"
      />
      <div>
        <p class="text-white text-base">
          QTE ➔ Ultimate ➔ Weapon x 2 ➔ Basic ATK until full meter ➔ Charged ATK ➔ Weapon ➔ Ultimate
        </p>

        
      </div>
    </div>
  </div>

  <div class="max-w-lg mx-auto bg-slate-900 p-4 rounded-lg space-y-2 my-10">
    <div class="text-center">
        <h2 class="text-xl font-semibold mb-4 text-amber-400">Subsequent Rotation</h2>
      </div>
        <!-- Row 2 -->
        <div class="flex items-center bg-slate-700 p-3 rounded-lg">
            <img
            src="images/valkportrait/Bronya Herrscher of Truth.png"
            alt="Avatar"
              class="h-12 w-12 rounded-full mr-4"
            />
            <div>
              <p class="text-white  text-base">Weapon ➔ Basic ATK ➔ Ult (Reverse Brake Transformation) ➔ Combo ATK ➔ Ultimate (If enough sp)</p>
            </div>
          </div>

    <!-- Row 1 -->
    <div class="flex items-center bg-slate-800 p-3 rounded-lg">
        <img
        src="images/valkportrait/sparkle.png"
        alt="Avatar"
          class="h-12 w-12 rounded-full mr-4"
        />
        <div>
          <p class="text-white text-base">
            QTE ➔ Weapon (I am Elation) ➔ Combo ATK ➔ Ultimate ➔ Cast on DPS
          </p>
          <p class="text-gray-300 text-sm">If you have enough sp to ult, can skip Combo ATK</p>

        </div>
      </div>

  
    <!-- Row 4 -->
    <div class="flex items-center bg-slate-700 p-3 rounded-lg">
      <img
      src="images/valkportrait/Sirin Miracle Magical Girl.png"
      alt="Avatar"
        class="h-12 w-12 rounded-full mr-4"
      />
      <div>
        <p class="text-white text-base">
          QTE ➔ Ultimate ➔ Weapon x 2 ➔ Basic ATK until full meter ➔ Charged ATK ➔ Weapon ➔ Ultimate
        </p>

        
      </div>
    </div>
  </div>


  <div class="max-w-lg mx-auto bg-black p-4 rounded-lg space-y-2 my-10">
    <!-- Row 1 -->
    <div class="flex items-center bg-slate-800 p-3 rounded-lg">
      <img
        src="images/valkportrait/Coralie Valkyrie Blastmetal.png"
        alt="Avatar"
        class="h-12 w-12 rounded-full mr-4"
      />
      <div>
        <p class="text-white  text-base">Ultimate ➔ Weapon once </p>
      </div>
    </div>
  
    <!-- Row 2 -->
    <div class="flex items-center bg-slate-700 p-3 rounded-lg">
      <img
      src="images/valkportrait/Helia Valkyrie Boltstorm.png"
      alt="Avatar"
        class="h-12 w-12 rounded-full mr-4"
      />
      <div>
        <p class="text-white  text-base">QTE ➔ Weapon ➔ When you reach the threshold, press weapon ➔ Ultimate</p>
        <p class="text-gray-300 text-sm">Ult is optional, gives AR Regen and stronger debuff</p>
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
          QTE ➔ Ultimate ➔ Weapon (I am Elation) ➔ Combo ATK ➔ Basic ATK until full meter ➔ Combo ATK ➔ Weapon (I am Elation)
        </p>
        <p class="text-gray-300 text-sm">Repeat until enough AR to activate Stellar Outburst
        </p>
        <p class="text-gray-300 text-sm">Note: Ultimate is flexible, you can use it whenever suitable</p>

      </div>
    </div>
  </div>
  

  <div class="max-w-lg mx-auto bg-black p-4 rounded-lg space-y-2 my-10">
    <!-- Row 1 -->
    <div class="flex items-center bg-slate-700 p-3 rounded-lg">
        <img
        src="images/valkportrait/sparkle.png"
        alt="Avatar"
          class="h-12 w-12 rounded-full mr-4"
        />
        <div>
          <p class="text-white text-base">
            Activate Stellar Outburst ➔ Basic ATK until you cast I am Elation
          </p>
  
        </div>
      </div>


  
    <!-- Row 2 -->
    <div class="flex items-center bg-slate-800 p-3 rounded-lg">
      <img
      src="images/valkportrait/Helia Valkyrie Boltstorm.png"
      alt="Avatar"
        class="h-12 w-12 rounded-full mr-4"
      />
      <div>
        <p class="text-white  text-base">QTE ➔ Weapon ➔ When you reach the threshold, press weapon</p>
      </div>
    </div>
  
    <div class="flex items-center bg-slate-700 p-3 rounded-lg">
        <img
        src="images/valkportrait/Coralie Valkyrie Blastmetal.png"
          alt="Avatar"
          class="h-12 w-12 rounded-full mr-4"
        />
        <div>
          <p class="text-white  text-base">QTE ➔ Press weapon until meter depletes and big explosion happens</p>
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
          QTE ➔ Weapon (I am Elation) ➔ Ultimate ➔ Combo ATK ➔ Basic ATK until full meter ➔ Combo ATK ➔ Weapon (I am Elation)
        </p>

      </div>
    </div>
  </div>

  <div class="max-w-lg mx-auto bg-black p-4 rounded-lg space-y-2 my-10">

        <!-- Row 2 -->
        <div class="flex items-center bg-slate-700 p-3 rounded-lg">
            <img
            src="images/valkportrait/Helia Valkyrie Boltstorm.png"
            alt="Avatar"
              class="h-12 w-12 rounded-full mr-4"
            />
            <div>
                <p class="text-white  text-base">QTE ➔ Weapon ➔ When you reach the threshold, press weapon ➔ Ultimate</p>
                <p class="text-gray-300 text-sm">Ult is optional, gives AR Regen and stronger debuff</p>           
             </div>
          </div>

    <!-- Row 1 -->
    <div class="flex items-center bg-slate-800 p-3 rounded-lg">
        <img
        src="images/valkportrait/Coralie Valkyrie Blastmetal.png"
        alt="Avatar"
          class="h-12 w-12 rounded-full mr-4"
        />
        <div>
          <p class="text-white text-base">
            QTE ➔ Weapon x3 (until big explosion) ➔ Ultimate
          </p>
          <p class="text-gray-300 text-sm">Ult is optional, gives AR Regen and stronger debuff</p>           

        </div>
      </div>

  
    <!-- Row 4 -->
    <div class="flex items-center bg-slate-700 p-3 rounded-lg">
      <img
      src="images/valkportrait/sparkle.png"
      alt="Avatar"
        class="h-12 w-12 rounded-full mr-4"
      />
      <div>
        <p class="text-white text-base">
          QTE ➔ Weapon (I am Elation) ➔ Combo ATK ➔ Basic ATK until full meter ➔ Combo ATK ➔ Weapon (I am Elation)
        </p>
        <p class="text-gray-300 text-sm">Repeat until enough AR to activate Stellar Outburst</p>

        
      </div>
    </div>
  </div>

</div>