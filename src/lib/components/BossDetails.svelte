<script>
  export let boss;
</script>

{#if boss}
<div class="p-3 rounded-lg  text-gray-800 mb-3">
<h2 class="text-lg sm:text-xl font-semibold text-left text-white cooltext">BOSS INFO</h2>


  <div class="flex relative flex-col sm:flex-row text-gray-800 rounded-lg mt-3 text-center justify-center sm:gap-2  sm:pr-2 border border-slate-300 ">
    <div class="absolute  top-0 w-full h-full z-[-2] opacity-15 overflow-hidden">    
      <img src="/images/abss-boss-bg.svg" alt="Lone Planetfarer" class="w-full h-auto object-cover  " /> 
    </div>
    <div class="absolute bottom-[-3px] left-14 h-1 w-20 bg-orange-400"></div>
    <div class="flex flex-col items-center justify-center mt-3 sm:mt-0">
    
    <img src={boss.bosspic} alt="{boss.name} Picture" class="w-40 sm:w-60 h-auto object-cover sm:min-w-60  " />
    
      <div class="flex items-center justify-center gap-2 mb-0 mx-1">
        <img src={boss.typeicon} alt="Boss Type Icon" class="w-6 h-6 lg:w-9 lg:h-9 mb-1" />
        <h2 class="text-md lg:text-xl text-center text-white custom-font tracking-wider ">{boss.name}</h2>
      </div>
  </div>

  <div class="grid grid-cols-[1fr,4fr] my-1 sm:my-3 justify-start mx-1 sm:mx-0 rounded-lg bg-sky-950 flex-grow-0 max-w-[700px] border border-sky-900">

    <div class=" flex  justify-center text-center items-center p-2">
      <p class="text-slate-100 text-sm sm:text-base font-semibold">Weather</p>
    </div>

    <div class=" flex  text-left items-center p-2 ">
      <p class="text-slate-100 text-xs sm:text-base">{boss.weather}</p>
    </div>


    <div class=" flex justify-center text-center items-center p-2 bg-sky-900">
      <p class="text-slate-100 text-sm sm:text-base font-semibold">Mechanics</p>
    </div>

    <div class=" flex  text-left items-center p-2 bg-sky-900">
      <p class="text-slate-100 text-xs sm:text-base">{boss.mechanics}</p>
    </div>

    <div class=" flex  justify-center text-center items-center p-2">
      <p class="text-slate-100 text-sm sm:text-base font-semibold">Resistance</p>
    </div>

    <div class=" flex text-left items-center p-2">
      <p class="text-slate-100 text-xs sm:text-base">{boss.weakness}</p>
    </div>

    {#if boss.debuff}
    <div class=" flex justify-center text-center items-center p-2 bg-sky-900">
      <p class="text-slate-100 text-sm sm:text-base font-semibold">Weakness</p>
    </div>

    <div class=" flex  text-left items-center p-2 bg-sky-900">
      <p class="text-slate-100 text-xs sm:text-base">{boss.debuff}</p>
    </div>
    {/if}

  </div>




  
  </div>
</div>
{:else}
  <p>No boss selected.</p>
{/if}
