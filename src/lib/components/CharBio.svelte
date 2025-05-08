<script lang="ts">
    export let bg: string = 'bg-emerald-950/70'; // default
    export let mode: 'dps' | 'support'; // replaces `type`
    export let rank: string | null = null;
    export let type: string | null = null; // character type: bio, mech, etc.
    export let element: string | null = null;
    export let optelement: string | null = null;
    export let ar: string | string[] = [];
  
    $: arList = Array.isArray(ar) ? ar : [ar];
  
    const imgMap = {
      // Ranks
      a: { src: '/images/ranks/Valkyrie_A.webp', tip: 'A-rank' },
      s: { src: '/images/ranks/Valkyrie_S.webp', tip: 'S-rank' },
  
      // Types
      bio: { src: '/images/type/icon_bio.webp', tip: 'Bio Type' },
      mech: { src: '/images/type/icon_mech.webp', tip: 'Mech Type' },
      psy: { src: '/images/type/icon_psy.webp', tip: 'Psy Type' },
      qua: { src: '/images/type/icon_qua.webp', tip: 'Quantum Type' },
      img: { src: '/images/type/icon_img.webp', tip: 'Imaginary Type' },
      sd: { src: '/images/type/icon_sd.webp', tip: 'Stardust Type' },
  
      // Elements
      phy: { src: '/images/element/icon_physical.webp', tip: 'Physical DMG' },
      fire: { src: '/images/element/icon_fire.webp', tip: 'Fire DMG' },
      ice: { src: '/images/element/icon_ice.webp', tip: 'Ice DMG' },
      lightning: { src: '/images/element/icon_lightning.webp', tip: 'Lightning DMG' },
      bleed: { src: '/images/element/icon_bleed.webp', tip: 'Bleed DMG. Cannot crit. Not considered as Melee or Ranged DMG.' },
      ignite: { src: '/images/element/icon_ignite.webp', tip: 'Ignite DMG. Not considered as Melee or Ranged DMG.' },

      // Astral Rings
      loa: { src: '/images/artype/ar loa.webp', tip: 'Law of Ascension playstyle revolves around QTE.' },
      ws: { src: '/images/artype/ar world star.png', tip: 'World Star playstyle revolves around generating and detonating Resonance marks.' },
      wod: { src: '/images/artype/ar wheel of destiny.png', tip: 'Wheel of Destiny is centered around solo playstyle.' },
      roo: { src: '/images/artype/ar roo.png', tip: 'Every Rite of Oblivion DPS has her own playstyle.' },
      hg: { src: '/images/artype/ar grail.png', tip: 'Heavenly Grail playstyle revolves around consuming SP.' },

      // Part 1
      p1phy: { src: '/images/artype/p1physical.png', tip: 'Part 1 Physical Team' },
      p1fire: { src: '/images/artype/p1fire.png', tip: 'Part 1 Fire Team' },
      p1lightning: { src: '/images/artype/p1lightning.png', tip: 'Part 1 Lightning Team' },
      p1ice: { src: '/images/artype/p1ice.png', tip: 'Part 1 Ice Team' },

    };
  </script>
  
  {#if mode === 'dps'}


  <div class={`mt-2 w-[260px] md:w-[300px] ${bg} rounded-xl p-2 shadow-md backdrop-blur-sm flex flex-wrap justify-center gap-2`}>
    {#if rank && imgMap[rank]}
        <div class="lg:tooltip" data-tip={imgMap[rank].tip}>
          <img src={imgMap[rank].src} alt={rank} class="h-8 " />
        </div>
      {/if}
  
      {#if type && imgMap[type]}
        <div class="lg:tooltip" data-tip={imgMap[type].tip}>
          <img src={imgMap[type].src} alt={type} class="h-8 " />
        </div>
      {/if}
  
      {#if element && imgMap[element]}
        <div class="lg:tooltip" data-tip={imgMap[element].tip}>
          <img src={imgMap[element].src} alt={element} class="h-8 " />
        </div>
      {/if}
  
      {#if optelement && imgMap[optelement]}
        <div class="lg:tooltip" data-tip={imgMap[optelement].tip}>
          <img src={imgMap[optelement].src} alt={optelement} class="h-8 " />
        </div>
      {/if}
  
      {#each arList as arType}
        {#if imgMap[arType]}
          <div class="lg:tooltip" data-tip={imgMap[arType].tip}>
            <img src={imgMap[arType].src} alt={arType} class="h-8 " />
          </div>
        {/if}
      {/each}
    </div>
  
  {:else if mode === 'support'}


  <div class={`mt-2 w-[260px] md:w-[300px] ${bg} rounded-xl p-2 shadow-md backdrop-blur-sm`}>
    <h2 class="text-white text-sm font-semibold mb-1">SUPPORT FOR:</h2>
      <div class="flex justify-center flex-wrap gap-2">
        {#each arList as arType}
          {#if imgMap[arType]}
          <div class="lg:tooltip" data-tip={imgMap[arType].tip}>
            <img src={imgMap[arType].src} alt={arType} class="h-8" />
          </div>
          {/if}
        {/each}
      </div>
    </div>
  {/if}
  