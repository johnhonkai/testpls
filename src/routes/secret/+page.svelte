<script lang="ts">
    import type { PageData } from './$types';

    let { data }: { data: PageData } = $props();

    
</script>

<div class="max-w-lg mx-auto bg-slate-900 p-3 rounded-xl shadow-lg space-y-4 my-10 text-white">
    <!-- Title -->
    <div class="text-center">
      <h2 class="text-2xl font-semibold mb-2 text-amber-400">AR Charging - First Rotation</h2>
    </div>
  
    <!-- Row 1 -->
    <div class="flex items-center bg-slate-800 p-4 rounded-lg shadow-sm ">
      <img
        src="images/valkportrait/Vita Lone Planetfarer.png"
        alt="Avatar"
        class="h-14 w-14 rounded-full mr-4 border border-gray-700"
      />
      <div>
        <p class="text-lg font-medium">Press Ult to enter Planet Quaker Form</p>
        <p class="text-gray-400 text-sm">Before boss spawns</p>
      </div>
    </div>
  
    <!-- Row 2 -->
    <div class="flex items-center bg-slate-800 p-4 rounded-lg shadow-sm ">
      <img
        src="images/valkportrait/Kiana Herrscher of Finality.png"
        alt="Avatar"
        class="h-14 w-14 rounded-full mr-4 border border-gray-700"
      />
      <div>
        <p class="text-lg font-medium">Weapon</p>
        <p class="text-gray-400 text-sm">When boss spawns</p>
      </div>
    </div>
  
    <!-- Row 3 -->
    <div class="flex items-center bg-slate-800 p-4 rounded-lg shadow-sm ">
      <img
        src="images/valkportrait/Vita Lone Planetfarer.png"
        alt="Avatar"
        class="h-14 w-14 rounded-full mr-4 border border-gray-700"
      />
      <div>
        <p class="text-lg font-medium">
          QTE + Weapon Auto-cast ➔ Basic ATK until full meter ➔ Combo ATK ➔ Ultimate
        </p>
      </div>
    </div>
  
    <!-- Row 4 -->
    <div class="flex items-center bg-slate-800 p-4 rounded-lg shadow-sm ">
      <img
        src="images/valkportrait/sparkle.png"
        alt="Avatar"
        class="h-14 w-14 rounded-full mr-4 border border-gray-700"
      />
      <div>
        <p class="text-lg font-medium">
          QTE ➔ Ultimate ➔ Weapon (I am Elation) ➔ Combo ATK ➔ Basic ATK until full meter ➔ Combo ATK ➔ Weapon (I am Elation)
        </p>
        <p class="text-gray-400 text-sm">Note: Ultimate is flexible, you can use it whenever suitable</p>
      </div>
    </div>
  </div>

<div class="max-w-lg mx-auto bg-slate-900 p-4 rounded-lg space-y-2 my-10">
    <div class="text-center">
        <h2 class="text-xl font-semibold mb-4 text-amber-400">AR Charging - First Rotation</h2>
      </div>
    <!-- Row 1 -->
    <div class="flex items-center bg-slate-800 p-3 rounded-lg">
      <img
        src="images/valkportrait/Vita Lone Planetfarer.png"
        alt="Avatar"
        class="h-12 w-12 rounded-full mr-4"
      />
      <div>
        <p class="text-white  text-base">Press Ult to enter Planet Quaker Form</p>
        <p class="text-gray-300 text-sm">Before boss spawns</p>
      </div>
    </div>
  
    <!-- Row 2 -->
    <div class="flex items-center bg-slate-700 p-3 rounded-lg">
      <img
      src="images/valkportrait/Kiana Herrscher of Finality.png"
      alt="Avatar"
        class="h-12 w-12 rounded-full mr-4"
      />
      <div>
        <p class="text-white  text-base">Weapon</p>
        <p class="text-gray-300 text-sm">When boss spawns and Vita's switch cd is over</p>
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
        <p class="text-white  text-base">
          QTE + Weapon Auto-cast ➔ Basic ATK until full meter ➔ Combo ATK ➔ Ultimate
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
          QTE ➔ Ultimate ➔ Weapon (I am Elation) ➔ Combo ATK ➔ Basic ATK until full meter ➔ Combo ATK ➔ Weapon (I am Elation)
        </p>
        <p class="text-gray-300 text-sm">Note: Ultimate is flexible, you can use it whenever suitable</p>

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