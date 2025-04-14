
export const weatherList = {
  lightning: [
    {id: 'lightningsprout',name: 'Sprout of Wishing'},
    {id: 'lightningguaymas',name: 'Meteoroid: Guaymas'},

  ],
  fire: [
    {id: 'firemobius', name: 'Mobius'},
    {id: 'firekosma', name: 'Kosma'},
    {id: 'firetona', name: 'Tonatiuh'},

  ],
  ice: [
    {id: 'raven', name: 'Raven'},
    {id: 'icehellmaru', name: 'Hellmaru'},

  ],
  typecounter: [
    {id: 'typekasumi', name:'Kasumi'}, 
    {id: 'typeandrius', name:'Andrius'}, 
    {id: 'typesprout', name:'Sprout of Wishing'}, 
    {id: 'typeparvati', name:'Parvati'}, 

  ],
  oblivion: [
    {id: 'obvhomu', name: 'Homu'}
  ],
  blood:[
    {id: 'bloodsdmob', name: 'SD-Mech Swarm'}
  ],
 imaginary: [
    {id: 'imgflower', name: 'Husk: Existentialism'}
  ],
  quantum: [
    {id: 'quavalralhal', name: 'Valralhal'}
  ],
  ranged: [
    {id: 'rangedkalpas', name: 'Kalpas'},
    {id: 'rangedhepa', name: 'Hephaestus'}
  ],
  stun:[
    {id: 'stunfish', name: 'Flying Fish'}
  ],
  stardust:[
    {id: 'sdepernay', name: 'Meteroid: Epernay'},
    {id: 'sdguaymas', name: 'Meteoroid: Guaymas'},
    {id: 'sa', name: 'Sa'},
    {id: 'sdalien', name: 'Alien Guard'},

  ],
  stellar: [
    {id: 'stellarassaka', name: 'Assaka'},
    {id: 'stellarrpc', name: 'RPC-6626'},

  ],
  starless: [
    {id: 'starbenares', name: 'Benares: Ice'},
    {id: 'starrimestar', name: 'Herrscher of Rimestar'},
    {id: 'starandrius', name: 'Dominator of Wolves'},
    {id: 'starbull', name: 'Husk: Mysticism'},
    {id: 'starsk', name: 'Shadow Knight'},

  ],
  bleed: [
    {id: 'bleedhos', name: 'Herrscher of Sentience'},
    {id: 'pishacha', name: 'Pishacha'},
    {id: 'villv', name: 'Vill-V'},

  ],
  ignite: [
    {id: 'ignitehov', name: 'Herrscher of the Void'},
    {id: 'aka', name: 'Argent Knight: Artemis'},

  ],
  resonance: [
    {id: 'resovita', name: "Vita - Sea's Depths"}
  ],
  melee: [
    {id: 'meleehoc', name: 'Herrscher of Corruption'}
  ],
  physical: [
    {id: 'phyalien', name: 'Alien Guard'},
    {id: 'otto', name: 'Otto Apocalypse'},
    {id: 'deliverance', name: 'Bygone Deliverance'},
    {id: 'phyhod', name: 'Herrscher of Dominance'},

  ],
  shadow: [
    {id: 'shadowtank', name: 'MHT-3C Retaliator'},
  ],
  symphony: [
    {id: 'symphellmaru', name: 'Hellmaru'},
    {id: 'kevin', name: 'Diabolic Kevin'},

  ],
  flux: [
    {id: 'momemperor', name: 'Mockery and Frost Emperor'},
    {id: 'fluxhomu', name: 'Homu Performer'},
    {id: 'fluxandrius', name: 'Dominator of Wolves'},
    {id: 'fluxtank', name: 'MHT-3C Retaliator'},
    {id: 'lantern', name: 'Lantern'},

  ],
  dominance: [
    {id: 'aponia', name: 'Aponia'},
  ],
  
}

export const weatherEffect = {
  lightning: "Lightning: Enemies take 50% more Lightning DMG, and 50% less Physical DMG.",
  fire: "Fire: Enemies take 50% more Fire DMG, and 50% less Ice DMG.",
  ice: "Ice: Enemies take 50% more Ice DMG, and 50% less Fire DMG.",
  physical: "Physical: Enemies take 50% more Physical DMG, and 50% less Lightning DMG.",

  oblivion: "Stellar Crown: For every character in the team with Omniscient Star tag, team Total DMG +10%. When AR Rite of Oblivion is activated, team Total DMG +40%.",
  shadow: "Shadow: All characters on the field gain Total DMG +15%. When Shadow Star ATK hits, valk on the field gain Total DMG +50% for 15s.",
  resonance: "Echoing: For every character in the team with Domain Resonance attribute, team Total DMG +10%. When AR World Star is activated, team Total DMG +30%.",
  stellar: "Stellar: When AR is activated, Total DMG +30%. During Stellar Outburst, gain extra Total DMG +20%.",
  starless: "Starless: Gain Total DMG +15%, effect is disabled during Stellar Outburst. When Astral Ring is not activated, Total DMG +50%.",

  imaginary: "IMG: IMG valk DMG +20%",
  quantum: "QUA: QUA valk DMG +20%",
  stardust: "Stardust: SD valk DMG +20%",
  typecounter: "Counter: Type counter effect is 20% stronger.",

  ranged: "Sniper: Enemies take 50% more DMG from Ranged ATK, and 50% less DMG from Melee ATK",
  melee: "Scrappy: Enemies take 50% more Melee DMG, and take 50% less Ranged DMG",

  blood: "Bloodthirsty: After defeating an enemy, Total DMG +20% for 15s, max 8 stacks, each stack duration is independent.",
  bleed: "Bleed: Bleeding enemies take 40% more DMG, and Bleed DMG +45%",
  stun: "Unbalanced: Enemies take 40% more DMG when stunned and within 4s after the stun ends.",
  ignite: "Ignite: Ignited enemies take 40% more DMG, Ignite DMG +45%",

}

export const bossData = {
  lightningsprout: {
    name: 'Sprout of Wishing', 
    mechanics: 'Phase 2 has lightning-vulnerable shield.', 
    weakness: 'None', 
    typeicon: "images/type/IconBIO.png", 
    bosspic: "images/Bosses/Sprout_of_Wishing_SSS.webp", 
    weather: "Lightning: Enemies take 50% more Lightning DMG, and 50% less Physical DMG.",	
  },
  lightningguaymas: {
    name: 'Meteoroid: Guaymas', 
    mechanics: '', 
    weakness: 'None', 
    typeicon: "images/type/IconSD.webp", 
    bosspic: "images/Bosses/Meteor_Guaymas.webp", 
    weather: "Lightning: Enemies take 50% more Lightning DMG, and 50% less Physical DMG.",	
  },
  typekasumi: {
    name: 'Kasumi', 
    mechanics: 'Can choose fire or ice vulnerable shield.', 
    weakness: 'None', 
    typeicon: "images/type/IconMECH.png", 
    bosspic: "images/Bosses/Yae Kasumi.webp", 
    weather: "Counter: Type counter effect is 20% stronger.",
  },

  typeandrius: {
    name: 'Dominator of Wolves',
    mechanics: 'Transition phase requires a valk with melee atk to parry the attack three times.\nPhase 2 has a shield.',
    weakness: 'Ice (Immune)',
    typeicon: "images/type/IconBIO.png",
    bosspic: "images/Bosses/Dominator of Wolves.webp",
    weather: "Counter: Type counter effect is 20% stronger."
  },
  fluxandrius: {
    name: 'Dominator of Wolves',
    mechanics: 'Spawns BIO mobs periodically. Transition phase requires a valk with melee atk to parry the attack three times.\nPhase 2 has a shield.',
    weakness: 'Ice (Immune)',
    typeicon: "images/type/IconBIO.png",
    bosspic: "images/Bosses/Dominator of Wolves.webp",
    weather: "Flux: For every character in the team with Heavenly Shift tag, Team Total DMG +10%. When AR Law of Ascension is activated, Team Total DMG +40%.", 
  },
  typesprout: {
    name: 'Sprout of Wishing', 
    mechanics: 'Phase 2 has lightning-vulnerable shield.', 
    weakness: 'None', 
    typeicon: "images/type/IconBIO.png", 
    bosspic: "images/Bosses/Sprout_of_Wishing_SSS.webp", 
    weather: "Counter: Type counter effect is 20% stronger."
  },
  typeparvati: {
    name: 'Parvati', 
    mechanics: '', 
    weakness: 'Ice (Immune) , Physical (L)', 
    typeicon: "images/type/IconPSI.png", 
    bosspic: "images/Bosses/Parvati.webp", 
    weather: "Counter: Type counter effect is 20% stronger."
  },
  obvhomu: {
      name: 'Homu Emperor', 
      mechanics: 'After defeating an enemy, Total DMG +20% for 15s, max 8 stacks, each stack duration is independent.', 
      weakness: 'Phy / Lightning / Ice / Fire (M)', 
      typeicon: "images/type/IconNULL.webp", 
      bosspic: "images/Bosses/HOMU Emperor.webp", 
      weather: "Stellar Crown: For every character in the team with Omniscient Star tag, team Total DMG +10%. When AR Rite of Oblivion is activated, team Total DMG +40%.", 
  },
  bloodsdmob: {
    name: 'SD-Mech Swarm', 
      mechanics: 'Enemies appear in waves. Stage is complete once you defeat 36 enemies.', 
      typeicon: "images/type/IconSDMECH.png", 
      weakness: 'None', 
      bosspic: "images/Bosses/Swarm.webp", 
      weather: "Bloodthirsty: After defeating an enemy, Total DMG +20% for 15s, max 8 stacks, each stack duration is independent.", 
  },
  rangedkalpas:{
      name: 'Kalpas', 
      mechanics: 'Transition phase has high hitcount hp. Has huge freeze trauma, frenzy state is disabled when frozen.', 
      weakness: 'None', 
      typeicon: "images/type/IconBIO.png", 
      bosspic: "images/Bosses/Flame-Chaser - Kalpas.webp", 
      weather: "Sniper: Enemies take 50% more DMG from Ranged ATK, and 50% less DMG from Melee ATK", 
  },
  rangedhepa: {
    name: 'Hephaestus', 
    mechanics: 'Has huge freeze trauma.', 
    weakness: 'Fire (Immune), Lightning (M), Physical (M)', 
    typeicon: "images/type/IconMECH.png", 
    bosspic: "images/Bosses/Hephaestus SSS.webp", 
    weather: "Sniper: Enemies take 50% more DMG from Ranged ATK, and 50% less DMG from Melee ATK", 
  },
  stunfish:{
    name: 'Flying Fish: Patrol Force', 
      mechanics: 'Upon being stunned or having its special attack blocked, the boss will drop a Luminous Pupil. When it detonates, the boss takes more dmg, max 4 stacks.', 
      weakness: 'None', 
      typeicon: "images/type/IconPSI.png", 
      bosspic: "images/Bosses/ff_fish.webp", 
      weather: "Unbalanced: Enemies take 40% more DMG when stunned and within 4s after the stun ends.", 
  },
  sdepernay: {
    name: 'Meteroid: Epernay', 
      mechanics: 'Boss has breakable parts at certain points of the fight, breaking them reduces boss max HP. During transition, you can enter one of three false doors, each gives different effect: Generate 10 SD remnants, gain Total DMG +8% or gain sp pack.', 
      weakness: 'None', 
      typeicon: "images/type/IconSD.webp", 
      bosspic: "images/Bosses/epernay.png", 
      weather: "Stardust: SD valk DMG +20%.", 
  },
  sa: {
    name: 'Sa: Wheel of Transcendence', 
      mechanics: 'Boss has multiple critical index points.', 
      weakness: 'None', 
      typeicon: "images/type/IconSD.webp", 
      bosspic: "images/BossesMA/Sa_SSS.webp", 
      weather: "Stardust: SD valk DMG +20%.", 
  },
  sdalien: {
    name: 'Alien Guard', 
    mechanics: 'Starts with Creeper with Bleed trauma. Alien Guard does not have transition phase like the other versions.', 
    weakness: 'None', 
    typeicon: "images/type/IconSD.webp", 
    bosspic: "images/Bosses/Alien Guard.webp", 
    weather: "Stardust: SD valk DMG +20%.",
  },
  stellarassaka: {
    name: 'Saha: Assaka', 
    mechanics: 'First wave has 1 Alien Guard and 2 Zombie mobs.', 
    weakness: 'None', 
    typeicon: "images/type/IconPSI.png", 
    bosspic: "images/Bosses/Saha Assaka.webp", 
    weather: "Stellar: When AR is activated, Total DMG +30%. During Stellar Outburst, gain extra Total DMG +20%.", 
  },
  stellarrpc: {
    name: 'RPC-6626', 
    mechanics: 'First wave has 3 Mech mobs. Transition phase has 30 hitcount hp.', 
    weakness: 'None', 
    typeicon: "images/type/IconMECH.png", 
    bosspic: "images/Bosses/RPC-6626.webp", 
    weather: "Stellar: When AR is activated, Total DMG +30%. During Stellar Outburst, gain extra Total DMG +20%.", 
  },
  starbenares:{
    name: 'Benares: Ice', 
      mechanics: 'First wave has creepers with paralyze trauma. When Astral Ring is not activated, Total DMG +20%', 
      weakness: 'Ice (H), Phy (H)', 
      typeicon: "images/type/IconNULL.webp", 
      bosspic: "images/Bosses/Benares.webp", 
      weather: "Starless: Gain Total DMG +15%, effect is disabled during Stellar Outburst. When Astral Ring is not activated, Total DMG +50%.", 
  },
  starrimestar:{
    name: 'Herrscher of the Rimestar', 
      mechanics: 'When AR is not activated, Total DMG +20%. Transition phase: Use melee atk to knock the two lanterns. After that, deal as much dmg as you can to the ice star to start phase 2 and gain dmg buff, max 8 stacks.', 
      weakness: 'Ice (Immune), Lightning (S)', 
      typeicon: "images/type/IconPSI.png", 
      bosspic: "images/Bosses/Herrscher of Rimestar.png", 
      weather: "Starless: Gain Total DMG +15%, effect is disabled during Stellar Outburst. When Astral Ring is not activated, Total DMG +50%.", 
  },
  starandrius:{
    name: 'Dominator of Wolves', 
      mechanics: 'When AR is not activated, Total DMG +20%. Summons BIO mobs periodically. Transition phase requires a valk with melee atk to parry the attack three times. Phase 2 has a shield. ', 
      weakness: 'Ice (Immune)', 
      typeicon: "images/type/IconBIO.png", 
      bosspic: "images/Bosses/Dominator of Wolves.webp", 
      weather: "Starless: Gain Total DMG +15%, effect is disabled during Stellar Outburst. When Astral Ring is not activated, Total DMG +50%.", 
  },
  starbull:{
    name: 'Husk: Mysticism', 
      mechanics: 'Transition phase: Bait the bull to hit pillar 5 times to gain sp, you can also evade the bull when he is sprinting to gain AR or sp. After that, he summons a number of balls, destroy them to start Phase 2. ', 
      weakness: 'None', 
      typeicon: "images/type/IconIMG.png", 
      bosspic: "images/Bosses/Husk Mysticism.webp", 
      weather: "Starless: Gain Total DMG +15%, effect is disabled during Stellar Outburst. When Astral Ring is not activated, Total DMG +50%.", 
  },
  starsk:{
    name: 'Shadow Knight', 
      mechanics: 'When you deal Elemental DMG to SK, she takes 1% more Physical DMG for 5s, max 10 stacks.', 
      weakness: 'Ice / Fire / Lightning (M)', 
      typeicon: "images/type/IconMECH.png", 
      bosspic: "images/Bosses/Shadow Knight (SK).webp", 
      weather: "Starless: Gain Total DMG +15%, effect is disabled during Stellar Outburst. When Astral Ring is not activated, Total DMG +50%.", 
  },
  bleedhos: {
    name: 'Herrscher of Sentience', 
      mechanics: 'Transition has high hitcount hp', 
      weakness: 'None', 
      typeicon: "images/type/IconBIO.png", 
      bosspic: "images/Bosses/Herrscher\ of\ Sentience.webp", 
      weather: "Bleed: Bleeding enemies take 40% more DMG, and Bleed DMG +45%", 
     
  },
  pishacha: {
    name: 'Pishacha', 
      mechanics: 'Bleed is required', 
      weakness: 'None', 
      typeicon: "images/type/IconNULL.webp", 
      bosspic: "images/Bosses/Pishacha.webp", 
      weather: "Bleed: Bleeding enemies take 40% more DMG, and Bleed DMG +45%", 
     
  },
  villv: {
    name: 'Vill-V', 
      mechanics: 'When HP reaches the final bar, Vill-V will become invincible and gain a huge bleed trauma meter. Fill the trauma to insta-kill her. Otherwise, you have to wait until the phase ends, then continue fighting her.', 
      weakness: 'None', 
      typeicon: "images/type/IconNULL.webp", 
      bosspic: "images/Bosses/Flame-Chaser - Vill-V.webp", 
      weather: "Bleed: Bleeding enemies take 40% more DMG, and Bleed DMG +45%", 
     
  },
  firemobius: {
    name: 'Mobius', 
      mechanics: 'Green bar = shield. After green bar is destroyed, spawn a snake with hitcount hp. After snake is destroyed, get red bar. Red bar = take more damage. ', 
      weakness: 'Lightning (L)', 
      typeicon: "images/type/IconMECH.png", 
      bosspic: "images/Bosses/MOBIUS2.png", 
      weather: "Fire: Enemies take 50% more Fire DMG, and 50% less Ice DMG.", 
  },
  firekosma: {
    name: 'Kosma', 
      mechanics: "Defeat the mob with a Qua valk to gain 2 sp/s for 30s. Transition phase has 100 hit hp, each hit grants a debuff stack, makes Kosma take more damage.", 
      weakness: 'None', 
      typeicon: "images/type/IconQUA.png", 
      bosspic: "images/Bosses/Flame-Chaser - Kosma.webp", 
      weather: "Fire: Enemies take 50% more Fire DMG, and 50% less Ice DMG.", 
  },
  imgflower: {
      name: 'Husk: Existentialism', 
      mechanics: 'Transition phase requires melee atk to parry balls. Parrying the final massive rock will make the boss take more dmg.', 
      weakness: 'None', 
      typeicon: "images/type/IconIMG.png", 
      bosspic: "images/Bosses/Husk - Existentialism.webp", 
      weather: "IMG: IMG valk DMG +20%", 
  },
  quavalralhal: {
    name: 'Valralhal', 
    mechanics: "P1: Has 9 layers of qua shields. There's a minigame at the start, collect the orbs and applies the same amount of qua collapse. P2: Has 5 layers of qua shield. During transition, jump/evade Valralhal's slam to spawn collapse orbs.", 
    weakness: 'None', 
    typeicon: "images/type/IconQUA.png", 
    bosspic: "images/Bosses/Varaha.png", 
    weather: "QUA: QUA valk DMG +20%", 
  },
  ignitehov: {
    name: 'Herrscher of the Void', 
    mechanics: 'Has tanky elemental shield', 
    weakness: 'Phy (L), Lightning (Immune)', 
    typeicon: "images/type/IconBIO.png", 
    bosspic: "images/Bosses/Herrscher of the Void.webp", 
    weather: "Ignite: Ignited enemies take 40% more DMG, Ignite DMG +45%", 
  },
  resovita: {
    name: "Vita - Sea's Depths", 
    mechanics: "Phase 1 has three Qua shields, phase 2 has two Qua shields. Transition phase drains all your sp. Evade Vita's attacks and catch the falling energy orbs to regain lost sp, and gain dmg buff.", 
    weakness: 'None', 
    typeicon: "images/type/IconQUA.png", 
    bosspic: "images/Bosses/Vita.png", 
    weather: "Echoing: For every character in the team with Domain Resonance attribute, team Total DMG +10%. When AR World Star is activated, team Total DMG +30%.", 
  },
  meleehoc: {
    name: 'Herrscher of Corruption', 
    mechanics: 'Transition phase has high hitcount hp', 
    weakness: 'None', 
    typeicon: "images/type/IconPSI.png", 
    bosspic: "images/Bosses/Herrscher of Corruption.webp", 
    weather: "Scrappy: Enemies take 50% more Melee DMG, and take 50% less Ranged DMG", 
  },
  phyalien: {
    name: 'Alien Guard', 
    mechanics: 'Transition phase: Stand on the glowing platform, the boss attack will drop SD remnants. Deal enough damage to begin Phase 2. Use a SD-type DPS or Support to quickly gather SD remnants. ', 
    weakness: 'None', 
    typeicon: "images/type/IconSD.webp", 
    bosspic: "images/Bosses/Alien Guard.webp", 
    weather: "Physical: Enemies take 50% more Physical DMG, and 50% less Lightning DMG.", 
  },
  phyhod: {
    name: 'Herrscher of Dominance: Minion', 
    mechanics: 'Starts with mobs.', 
    weakness: 'None', 
    typeicon: "images/type/IconIMG.webp", 
    bosspic: "images/Bosses/Herrscher of Domination Minion.webp", 
    weather: "Physical: Enemies take 50% more Physical DMG, and 50% less Lightning DMG.", 
  },
  raven: {
    name: 'Raven', 
    mechanics: 'Transition phase: Counter with melee attacks to gain Feather stack. At the end of the phase, if you have 6 stacks, counter Raven attack to gain sp and AR pack.', 
    weakness: 'None', 
    typeicon: "images/type/IconBIO.png", 
    bosspic: "images/Bosses/Raven.png", 
    weather: "Ice: Enemies take 50% more Ice DMG, and 50% less Fire DMG.", 
  },
  icehellmaru: {
    name: 'Hellmaru', 
    mechanics: 'Has PSY mobs.', 
    weakness: 'Fire (H)',
    debuff: "Ice (H)", 
    typeicon: "images/type/IconNULL.webp", 
    bosspic: "images/Bosses/Hellmaru.webp", 
    weather: "Ice: Enemies take 50% more Ice DMG, and 50% less Fire DMG.", 
  },
  otto: {
    name: 'Otto Apocalypse', 
    mechanics: 'Starts with two IMG mobs. Otto Phase 2 has a tanky shield. ', 
    weakness: 'None', 
    typeicon: "images/type/IconNULL.webp", 
    bosspic: "images/Bosses/Otto Apocalypse.webp", 
    weather: "Physical: Enemies take 50% more Physical DMG, and 50% less Lightning DMG.", 
  },
  shadowtank: {
    name: 'MHT-3C Retaliator', 
    mechanics: '', 
    weakness: 'Ice (L), Lightning (L)', 
    typeicon: "images/type/IconMECH.png", 
    bosspic: "images/Bosses/MHT-3B Nirvana.webp", 
    weather: "Shadow: All characters on the field gain Total DMG +15%. When Shadow Star ATK hits, all characters on the field gain additional Total DMG +50% for 15s, can be refreshed.", 
  },
  fluxtank: {
    name: 'MHT-3C Retaliator', 
    mechanics: '', 
    weakness: 'Ice (L), Lightning (L)', 
    typeicon: "images/type/IconMECH.png", 
    bosspic: "images/Bosses/MHT-3B Nirvana.webp", 
    weather: "Flux: For every character in the team with Heavenly Shift tag, Team Total DMG +10%. When AR Law of Ascension is activated, Team Total DMG +40%.", 
  },
  deliverance: {
    name: 'Bygone Deliverance', 
    mechanics: 'Has 3 phases. Final phase requires you to approach Kevin balls to destroy his hitcount shield.', 
    weakness: 'None', 
    typeicon: "images/type/IconIMG.png", 
    bosspic: "images/Bosses/Kevin Deliverance.webp", 
    weather: "Physical: Enemies take 50% more Physical DMG, and 50% less Lightning DMG.", 
  },
  symphellmaru: {
    name: 'Hellmaru', 
    mechanics: 'First wave has two BIO mobs.', 
    weakness: 'Fire (H)', 
    debuff: 'Ice (H)', 
    typeicon: "images/type/IconNULL.webp", 
    bosspic: "images/Bosses/Hellmaru.webp", 
    weather: "Symphony: Enemies take 20% more Elemental DMG. For every valkyrie with different element in the team, the effect increases to 30% / 50%.", 
  },
  kevin: {
    name: 'Diabolic Kevin', 
    mechanics: 'REPEL STATE: Kevin will record elemental dmg received until the gauge is filled, or until the timer ends. Then, he will take less dmg from the element with the highest recorded dmg, and takes more dmg from other elements. If the gauge falls below 50%, the dmg debuff is increased. RUIN DEBUFF: When Kevin is frozen, paralyzed, or stunned, Kevin quickly recovers from these states, but takes more damage for a certain duration, max 3 stacks.', 
    weakness: 'Physical (H). During Repel state, Physical (Immune).', 
    typeicon: "images/type/IconNULL.webp", 
    bosspic: "images/Bosses/Kevin Kaslana.webp", 
    weather: "Symphony: Enemies take 20% more Elemental DMG. For every valkyrie with different element in the team, the effect increases to 30% / 50%.", 
  },
  momemperor: {
    name: 'Meteor: Mockery and Frost Emperor', 
    mechanics: '', 
    weakness: 'Emperor: Ice (H)', 
    debuff: 'Emperor: Fire (L)', 
    typeicon: "images/type/SD PSY.webp", 
    bosspic: "images/Bosses/Mockery_Emperor.webp", 
    weather: "Flux: For every character in the team with Heavenly Shift tag, Team Total DMG +10%. When AR Law of Ascension is activated, Team Total DMG +40%.", 
  },
  fluxhomu: {
    name: 'Homu Performer', 
    mechanics: '', 
    weakness: 'Phy / Lightning / Ice / Fire (M)', 
    typeicon: "images/type/IconNULL.webp", 
    bosspic: "images/Bosses/HOMU Emperor.webp", 
    weather: "Flux: For every character in the team with Heavenly Shift tag, Team Total DMG +10%. When AR Law of Ascension is activated, Team Total DMG +40%.", 
  },
  lantern: {
    name: 'Lantern', 
    mechanics: 'Transition phase has high hitount hp', 
    weakness: 'Fire (M)', 
    typeicon: "images/type/IconPSI.png", 
    bosspic: "images/Bosses/Lantern_Tsavorae_SSS.webp", 
    weather: "Flux: For every character in the team with Heavenly Shift tag, Team Total DMG +10%. When AR Law of Ascension is activated, Team Total DMG +40%.", 
  },
  firetona: {
    name: 'Tonatiuh - Sunshade', 
    mechanics: 'Phase 1 has two Qua shield, Phase 2 has three Qua shields. Transition: Hit the blue projectile two times to apply one quantum collapse.', 
    weakness: 'Phy (L)', 
    typeicon: "images/type/IconQUA.png", 
    bosspic: "images/Bosses/Ultra Tonatiuh.webp", 
    weather: "Fire: Enemies take 50% more Fire DMG, and 50% less Ice DMG.", 
  },
  aponia: {
    name: 'Aponia', 
    mechanics: 'Starts with 3 BIO mobs. Aponia has a tanky shield.', 
    weakness: 'Fire / Ice / Lightning (H)', 
    typeicon: "images/type/IconBIO.png", 
    bosspic: "images/Bosses/Flame-Chaser - Aponia_SSS.webp", 
    weather: "Dominance: Summoned entities deal 30% more DMG. Valkyrie deals 20% more DMG when self-generated summoned entity is present on the field.", 
  },
  aka: {
    name: 'Argent Knight: Artemis', 
    mechanics: 'Starts with a BIO mob. AKA takes less damage while she is attacking, effect is disabled during time fracture. AKA has huge ignite trauma. When AKA is ignited, enter weakened state for 18 seconds, where she takes increased fire damage and most armor effects are disabled.', 
    weakness: 'Physical / Lightning (M) , Ice (H)', 
    debuff: 'Fire (M)',
    typeicon: "images/type/IconBIO.png", 
    bosspic: "images/Bosses/Argent Knight Artemis (AKA).webp", 
    weather: "Ignite: Ignited enemies take 40% more DMG, Ignite DMG +45%", 
  },
  sdguaymas: {
    name: 'Meteoroid: Guaymas', 
    mechanics: '', 
    weakness: 'None', 
    typeicon: "images/type/IconSD.webp", 
    bosspic: "images/Bosses/Meteor_Guaymas.webp", 
    weather: "Stardust: SD valk DMG +20%",

  },
};


export const teamData = {
  lightningsprout: {
    teamDataSets: [
      {
        tabname: "v7.9",
        teamInfoText: "Data is from v7.9 CN Server (PC) Top 100 Myriad ??? D.",
        entries: [
        {
          type: 'lineup',
          toptext: '',
          lineup: ["images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/Coralie Valkyrie Blastmetal.png", "images/valkportrait/asop_songque.png"],
          rank: '',
          pct: '100%',
          bottext: '',
        },
      ] },

    {
      tabname: "v7.8",
      teamInfoText: "Data is from v7.8 CN Server (PC) Top 100 Myriad ??? D.",
      entries: [
      {
        type: 'lineup',
        toptext: '',
        lineup: ["images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/Coralie Valkyrie Blastmetal.png", "images/valkportrait/asop_songque.png"],
        rank: '',
        pct: '100%',
        bottext: '',
      },
    ] },


  
  ],



  },

  
  typekasumi: {
    teamDataSets: [
      {
        tabname: "v8.1",
        teamInfoText: "Data is from v8.1 CN Server (PC) Top 100 Myriad ??? D.",
      entries: [
        {
          type: 'lineup',
          lineup: ["images/valkportrait/Elysia Herrscher of Human Ego.png", "images/valkportrait/Senadina Deepspace Anchor.png", "images/valkportrait/Thelema Mad Pleasure.png", "images/valkportrait/asop_sera.png"],
          rank: '1-6',
          pct: '40%',
          bottext: "Highest score: SSS 830"

        },
        {
          type: 'lineup',
          lineup: ["images/valkportrait/Elysia Herrscher of Human Ego.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/Thelema Mad Pleasure.png", "images/valkportrait/asop_sera.png"],
          rank: '7-10',
          pct: '59%',
          bottext: "Highest score: SS 782, SS2 786, SS3 794, SSS 808"

        },
        {
          type: 'lineup',
          lineup: ["images/valkportrait/Lantern Lone Destruction.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/Thelema Mad Pleasure.png", "images/valkportrait/asop_sera.png"],
          rank: '41',
          pct: '1%',
          bottext: "Highest score: SSS 789"

        },
        
        { 
          type: 'extraTeamRow', 
          toptext: 'Highest score for different Vita and Sena rank',
          extraTeamRow: [
            { img: 'images/valkportrait/Senadina Deepspace Anchor.png', text: 'SSS 830' },
            { img: 'images/valkportrait/Vita Lone Planetfarer.png', text: 'SS1 808' },
            { img: 'images/valkportrait/Vita Lone Planetfarer.png', text: 'SS 807' },
            { img: 'images/valkportrait/Senadina Deepspace Anchor.png', text: 'SS 801' },
            { img: 'images/valkportrait/Vita Lone Planetfarer.png', text: 'S2 798' },
            { img: 'images/valkportrait/Senadina Deepspace Anchor.png', text: 'S2 785' },
            { img: 'images/valkportrait/Senadina Deepspace Anchor.png', text: 'S0 783' },
            { img: 'images/valkportrait/Vita Lone Planetfarer.png', text: 'S0 N/A' },
          ] 
        },  
        { 
          type: 'extraTeamRow', 
          toptext: 'Vita and Sena use rate based on rank',
          extraTeamRow: [
            { img: 'images/valkportrait/Vita Lone Planetfarer.png', text: 'SS 42%' },
            { img: 'images/valkportrait/Senadina Deepspace Anchor.png', text: 'SS+ 12%' },
            { img: 'images/valkportrait/Senadina Deepspace Anchor.png', text: 'SS 11%' },
            { img: 'images/valkportrait/Vita Lone Planetfarer.png', text: 'SS+ 10%' },
            { img: 'images/valkportrait/Senadina Deepspace Anchor.png', text: 'S2 10%' },
            { img: 'images/valkportrait/Senadina Deepspace Anchor.png', text: 'S0 9%' },
            { img: 'images/valkportrait/Vita Lone Planetfarer.png', text: 'S2 6%' },
            { img: 'images/valkportrait/Vita Lone Planetfarer.png', text: 'S0 0%' },


          ] 
        },            
      ],},
    {
      tabname: "v7.8",
      teamInfoText: "Data is from v7.8 CN Server (PC) Top 100 Myriad ??? D.",
    entries: [
      {
        type: 'lineup',
        toptext: '',
        lineup: ["images/valkportrait/Lantern Lone Destruction.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/Thelema Mad Pleasure.png", "images/valkportrait/asop_sera.png"],
        rank: '1-2',
        pct: '28%',
        bottext: 'S-Sena has higher score than S-Vita. At higher ranks and synergy, scores are close.',
      },
      {
        type: 'lineup',
        toptext: '',
        lineup: ["images/valkportrait/Lantern Lone Destruction.png", "images/valkportrait/Senadina Deepspace Anchor.png", "images/valkportrait/Thelema Mad Pleasure.png", "images/valkportrait/asop_sera.png"],
        rank: '3-5',
        pct: '72%',
        bottext: '',
      },
      { 
        type: 'extraTeamRow', 
        toptext: 'Vita and Sena use rate based on rank',
        extraTeamRow: [
          { img: 'images/valkportrait/senass.png', text: 'SS+ 52%' },
          { img: 'images/valkportrait/vitass.png', text: 'SS+ 27%' },
          { img: 'images/valkportrait/senas0.png', text: 'S0 13%' },
          { img: 'images/valkportrait/senas2.png', text: 'S2 8%' },
          { img: 'images/valkportrait/vitas2.png', text: 'S2 1%' },
          { img: 'images/valkportrait/vitas0.png', text: 'S0 0%' }
        ] 
      },              
    ],},]
  },

  firemobius:{
    teamDataSets: [
    {
      tabname: "v7.8",
      teamInfoText: "Data is from v7.7 SEA Server Top 100 Myriad 528 D.",
  entries: [
    {
      type: 'lineup',
      lineup: ["images/valkportrait/Lantern Lone Destruction.png", "images/valkportrait/Senadina Deepspace Anchor.png", "images/valkportrait/Thelema Mad Pleasure.png", "images/valkportrait/asop_sera.png"],
      pct: '95%',
      bottext: 'Highest Score: S 754, S2 766, SS 795',

    },
    {
      type: 'lineup',
      lineup: ["images/valkportrait/Lantern Lone Destruction.png", "images/valkportrait/Senadina Deepspace Anchor.png", "images/valkportrait/Thelema Mad Pleasure.png", "images/valkportrait/asop_songque.png"],
      pct: '4%',
      bottext: 'Highest Score: S 683, S2 720, SS1 721',
    },
    {
      type: 'lineup',
      lineup: ["images/valkportrait/Lantern Lone Destruction.png", "images/valkportrait/Senadina Deepspace Anchor.png", "images/valkportrait/Songque Jovial Deception.png", "images/valkportrait/asop_sera.png"],
      pct: '1%',
      bottext: 'Highest Score: S 707',
    },
    ]},],
  },

  typeandrius:{
    teamDataSets: [

    {
      tabname: "v8.0",
      teamInfoText: "Data is from v8.0 CN Server (PC) Top 100 Myriad ???D.",
    entries: [
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/Coralie Valkyrie Blastmetal.png", "images/valkportrait/asop_songque.png"],
        pct: '100%',
        bottext: 'Highest score: S2 792, SS 816, SS2 821, SSS 834',
      }
    ]},
    {
      tabname: "v7.8",
      teamInfoText: "Data is from v7.8 SEA Server Top 100 Myriad 530D.",
    entries: [
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/Coralie Valkyrie Blastmetal.png", "images/valkportrait/asop_songque.png"],
        pct: '96%',
        bottext: 'Note: This round uses a HoFi fast weapon switch out cancel tech' 
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/Coralie Valkyrie Blastmetal.png", "images/valkportrait/elf_kiana.png"],
        pct: '4%',
      },
      { 
        type: 'extraTeamRow', 
        toptext: 'Highest score for each rank',
        extraTeamRow: [
          { img: 'images/valkportrait/vitass.png', text: 'SSS 847 Akayuki' },
          { img: 'images/valkportrait/vitass.png', text: 'SS1 829 Beemaster' },
          { img: 'images/valkportrait/vitass.png', text: 'SS 828 Freesia' },
          { img: 'images/valkportrait/vitas2.png', text: 'S2 815 Griseos Brush' },
          { img: 'images/valkportrait/vitas0.png', text: 'S0 790 Yuka' }
        ] 
      },
    ]},
  ] 
  },
  
  imgflower: {
    teamDataSets: [
      {
        tabname: "v8.1",
        teamInfoText: "Data is from v8.1 CN Server (PC) Top 100 Myriad ??? D.",
      entries: [
        {
          type: 'lineup',
          lineup: ["images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/Mei Herrscher of Origin.png", "images/valkportrait/Bronya Herrscher of Truth.png", "images/valkportrait/asop_teri.png"],
          pct: '100%',
        },
      ]},
    
    {
      tabname: "v7.8",
      teamInfoText: "Data is from v7.8 CN Server (PC) Top 100 Myriad ??? D.",
    entries: [
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/Mei Herrscher of Origin.png", "images/valkportrait/Bronya Herrscher of Truth.png"],
        pct: '100%',
      },
    ]},
  
  ]
  },
  obvhomu: {
    teamDataSets: [
    {
      tabname: "v7.8",
      teamInfoText: "Data is from v7.8 CN Server (PC) Top 100 Myriad ??? D.",
    entries: [
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/Coralie Valkyrie Blastmetal.png", "images/valkportrait/asop_songque.png"],
        rank: 'Rank 1,3,5',
        pct: '72%',
        bottext: 'Highest score: S2 786, SS 793, SSS 803',
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Senadina Deepspace Anchor.png", "images/valkportrait/Thelema Mad Pleasure.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/asop_songque.png"],
        rank: 'Rank 2,4',
        pct: '8%',
        bottext: 'Sena wants higher rank than Vita to beat Vita team. Highest score: SSS 801',
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/Mei Herrscher of Origin.png", "images/valkportrait/Bronya Herrscher of Truth.png", "images/valkportrait/asop_songque.png"],
        pct: '13%',
        bottext: ' Highest score: SSS 791',
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/Mei Herrscher of Origin.png", "images/valkportrait/Bronya Herrscher of Truth.png", "images/valkportrait/elf_kiana.png"],
        pct: '7%',
        bottext: ' Highest score: S2 783, SS 785, SSS 785', 
      },
    ]},],
  },
  rangedkalpas: {
    teamDataSets: [
    {
      tabname: "v7.7",
      teamInfoText: "Data is from v7.7 CN Server (PC) Top 100 Myriad ??? D.",
    entries: [
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Songque Jovial Deception.png", "images/valkportrait/Lantern Lone Destruction.png", "images/valkportrait/Thelema Mad Pleasure.png", "images/valkportrait/asop_sera.png"],
        pct: '91%',
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Bronya Silverwing N-EX.png", "images/valkportrait/Sushang Jade Knight.png", "images/valkportrait/Kira Sugary Starburst.png", "images/valkportrait/elf_ely.png"],
        pct: '8%',
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Elysia Herrscher of Human Ego.png", "images/valkportrait/Sushang Jade Knight.png", "images/valkportrait/Kira Sugary Starburst.png", "images/valkportrait/elf_ely.png"],
        pct: '1%',
      },
    ]},]
  },
  bloodsdmob: {
    teamDataSets: [
      {
        tabname: "v7.9 CN",
        teamInfoText: "Data is from v7.8 CN PC Server Top 100 Myriad ???D.",
        entries: [
          {
            type: 'lineup',
            lineup: ["images/valkportrait/Senadina Deepspace Anchor.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/asop_songque.png"],
            rank: '1-3, 5',
            pct: '90%',
            bottext: 'Highest Score: S0 760, S2 770, SS 823, SSS 878',
          },
          {
            type: 'lineup',
            lineup: ["images/valkportrait/Senadina Deepspace Anchor.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/Theresa Schicksal's Imperative.png", "images/valkportrait/asop_songque.png"],
            rank: '4, 6-10',
            pct: '10%',
            bottext: 'Only SS+ Simp users here.There are more HoFi users since more players have HoFi than SS+ Simp. Highest Score: SSS 868',
          },
        ]
      },
      {
        tabname: "v7.7 SEA",
        teamInfoText: "Data is from v7.7 SEA Server Top 100 Myriad 527D.",
        entries: [
          {
            type: 'lineup',
            lineup: ["images/valkportrait/Senadina Deepspace Anchor.png", "images/valkportrait/Thelema Mad Pleasure.png", "images/valkportrait/Theresa Schicksal's Imperative.png", "images/valkportrait/asop_songque.png"],
            rank: '1,2,4',
            pct: '37%',
            bottext: 'Highest Score: S0 Sena 737, S2 Sena 792, SSS Sena 862',
          },
          {
            type: 'lineup',
            lineup: ["images/valkportrait/Songque Jovial Deception.png", "images/valkportrait/Lantern Lone Destruction.png", "images/valkportrait/Senadina Deepspace Anchor.png", "images/valkportrait/asop_sera.png"],
            rank: '3,5',
            pct: '51%',
            bottext: 'Highest Score: S0 JD 764, S2 JD 764, SS1 805',
          },
          {
            type: 'lineup',
            lineup: ["images/valkportrait/Songque Jovial Deception.png", "images/valkportrait/Thelema Mad Pleasure.png", "images/valkportrait/Senadina Deepspace Anchor.png", "images/valkportrait/asop_sera.png"],
            pct: '10%',
            bottext: 'Highest Score: S0 JD 727',
          },
          {
            type: 'lineup',
            lineup: ["images/valkportrait/Songque Jovial Deception.png", "images/valkportrait/Thelema Mad Pleasure.png", "images/valkportrait/Lantern Lone Destruction.png", "images/valkportrait/asop_sera.png"],
            pct: '1%',
            bottext: 'Highest Score: SS JD 737',
    
          },
          {
            type: 'lineup',
            lineup: ["images/valkportrait/Senadina Deepspace Anchor.png", "images/valkportrait/Thelema Mad Pleasure.png", "images/valkportrait/Helia Valkyrie Boltstorm.png", "images/valkportrait/asop_songque.png"],
            pct: '1%',
            bottext: 'Highest Score: SS Sena 714',
          },
        ],
      },

      // Additional sets as needed
    ],
  
    videos: [
      { url: 'https://www.youtube.com/embed/Sqbvxea8Tc4', abyss: 'RedLotus 499D', uploader: 'Marisa Honkai' },
      { url: 'https://www.youtube.com/embed/nQZ3EhOOmqE', abyss: 'Nirvana 526D', uploader: 'phylynxbelt' },
    ], 
  },
  
  stunfish: {
    teamDataSets: [
    {
      tabname: "v7.7",
      teamInfoText: "Data is from v7.7 SEA Server Top 100 Myriad 527D.",
    entries: [
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Prometheus Terminal Aide.png", "images/valkportrait/Fu Hua Herrscher of Sentience.png", "images/valkportrait/Seele Herrscher of Rebirth.png", "images/valkportrait/elf_bunny.png"],
        pct: '89%',
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Prometheus Terminal Aide.png", "images/valkportrait/Fu Hua Herrscher of Sentience.png", "images/valkportrait/Seele Herrscher of Rebirth.png", "images/valkportrait/elf_dudu.png"],
        pct: '11%',
      },
    ]},],
  },
  sdepernay: {
    teamDataSets: [
    {
      tabname: "v7.8",
      teamInfoText: "Data is from v7.8 CN Server (PC) Top 100 Myriad ??? D.",
    entries: [
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Songque Jovial Deception.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/Thelema Mad Pleasure.png", "images/valkportrait/asop_sera.png"],
        rank: '1-5',
        pct: '58%'
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Songque Jovial Deception.png", "images/valkportrait/Lantern Lone Destruction.png", "images/valkportrait/Thelema Mad Pleasure.png", "images/valkportrait/asop_sera.png"],
        rank: '6',
        pct: '6%'
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Songque Jovial Deception.png", "images/valkportrait/Senadina Deepspace Anchor.png", "images/valkportrait/Thelema Mad Pleasure.png", "images/valkportrait/asop_sera.png"],
        pct: '35%'
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Songque Jovial Deception.png", "images/valkportrait/Lantern Lone Destruction.png", "images/valkportrait/Senadina Deepspace Anchor.png", "images/valkportrait/asop_sera.png"],
        pct: '1%',
      },
      { 
        type: 'extraTeamRow',
        toptext: 'Highest score for different Vita, Sena and Lantern rank',
        extraTeamRow: [
          { img: 'images/valkportrait/vitass.png', text: '853' },
          { img: 'images/valkportrait/lampss.png', text: '835' },
          { img: 'images/valkportrait/lamps0.png', text: '816' },
          { img: 'images/valkportrait/senass.png', text: '805' },
          { img: 'images/valkportrait/lamps2.png', text: '803' },
          { img: 'images/valkportrait/senas2.png', text: '794' },
          { img: 'images/valkportrait/senas0.png', text: '792' },
          { img: 'images/valkportrait/vitas2.png', text: 'N/A' },
          { img: 'images/valkportrait/vitas0.png', text: 'N/A' }
        ] 
      },
    ]},]
  },
  stellarassaka: {
    teamDataSets: [
    {
      tabname: "v7.8",
      teamInfoText: "Data is from v7.8 CN Server (PC) Top 100 Myriad ??? D.",
    entries: [
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Songque Jovial Deception.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/Lantern Lone Destruction.png", "images/valkportrait/asop_sera.png"],
        rank: '1-6',
        pct: '21%',
        bottext: 'Highest score: SS 823, SSS 843',
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/Mei Herrscher of Origin.png", "images/valkportrait/Bronya Herrscher of Truth.png", "images/valkportrait/elf_kiana.png"],
        rank: '7-10',
        pct: '78%',
        bottext: 'Highest score: SS 807, SS1 810, SS2 818, SS3 819, SSS 827',
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/Mei Herrscher of Origin.png", "images/valkportrait/Bronya Herrscher of Truth.png", "images/valkportrait/asop_songque.png"],
        pct: '1%',
        bottext: 'Highest score: SSS 809'
      },
    ]},]
  },
  starbenares: {
    teamDataSets: [
    {
      tabname: "v7.7",
      teamInfoText: "Data is from v7.7 SEA Server Top 100 Myriad 527D.",
    entries: [
      {
        type: 'lineup',
        lineup: ["images/valkportrait/lvdps.png", "images/valkportrait/simpdps.png", "images/valkportrait/Eden Golden Diva.png", "images/valkportrait/elf_kiana.png"],
        pct: '99%',
        bottext: 'This is SIMP x Luna Double DPS. SIMP uses Zeno TM Signature B (Top score), Zhenyi TM Signature B or Signature TMB',
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/lvdps.png", "images/valkportrait/Theresa Schicksal's Imperative.png", "images/valkportrait/Eden Golden Diva.png", "images/valkportrait/elf_kiana.png"],
        pct: '1%',
        bottext: 'Captain Yaesuo used Aladdin on Eden for dps SSS LV. Rank 76 Score 785',
      }
    ]},]
  },
  starrimestar: {
    teamDataSets: [
      {
        tabname: "v8.0",
        teamInfoText: "Data is from v8.0 CN Server (PC) Top 100 Myriad ??? D.",
      entries: [
        {
          type: 'lineup',
          lineup: ["images/valkportrait/Fu Hua Fenghuang of Vicissitude.png", "images/valkportrait/Bronya Herrscher of Truth.png", "images/valkportrait/Chrono Navi.png", "images/valkportrait/elf_kiana.png"],
          pct: '100%',
        }
      ]},
    {
      tabname: "v7.8",
      teamInfoText: "Data is from v7.8 CN Server (PC) Top 100 Myriad ??? D.",
    entries: [
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Fu Hua Fenghuang of Vicissitude.png", "images/valkportrait/Bronya Herrscher of Truth.png", "images/valkportrait/Chrono Navi.png", "images/valkportrait/elf_kiana.png"],
        pct: '100%',
      }
    ]},

  ],
    
  },
  starandrius: {
    teamDataSets: [
    {
      tabname: "v7.8",
      teamInfoText: "Data is from v7.8 CN Server (PC) Top 100 Myriad 534 D.",
    entries: [
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Mobius Infinite Ouroboros.png", "images/valkportrait/Theresa Lunar Vow.png", "images/valkportrait/Theresa Schicksal's Imperative.png", "images/valkportrait/elf_kiana.png"],
        pct: '66%',
        bottext: 'SIMP gear uses signature set / TeslaBand M / Paganini M. Highest Score: SSS 868, SS 853, S3 818, S2 813',
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Mobius Infinite Ouroboros.png", "images/valkportrait/Bronya Herrscher of Truth.png", "images/valkportrait/Theresa Schicksal's Imperative.png", "images/valkportrait/elf_kiana.png"],
        rank: '23',
        pct: '29%',
        bottext: 'Highest Score: 7S 841, SS 832, S3 818',
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Mobius Infinite Ouroboros.png", "images/valkportrait/Bronya Herrscher of Truth.png", "images/valkportrait/Theresa Lunar Vow.png", "images/valkportrait/elf_kiana.png"],
        pct: '3%',
        bottext: 'Highest score: 803',
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Mei Herrscher of Origin.png", "images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/Bronya Herrscher of Truth.png", "images/valkportrait/elf_kiana.png"],
        pct: '1%',
        bottext: 'Highest score: 7S 802',
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/Coralie Valkyrie Blastmetal.png", "images/valkportrait/asop_songque.png"],
        pct: '1%',
        bottext: 'Highest score: 8S 801',
      }
    ]},]
  },
  rangedhepa: {
    teamDataSets: [
    {
      tabname: "v7.8",
      teamInfoText: "Data is from v7.8 CN Server (PC) Top 100 Myriad ??? D.",
    entries: [
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Elysia Herrscher of Human Ego.png", "images/valkportrait/Sushang Jade Knight.png", "images/valkportrait/Kira Sugary Starburst.png", "images/valkportrait/elf_ely.png"],
        pct: '100%',
      }
    ]},]
  },
  quavalralhal: {
    teamDataSets: [
    {
      tabname: "v7.8",
      teamInfoText: "Data is from v7.8 CN Server (PC) Top 100 Myriad ??? D.",
    entries: [
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Theresa Schicksal's Imperative.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/asop_songque.png"],
        pct: '80%',
        bottext: 'Highest Score: S0 793, S2 806, SS+ 825'
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Theresa Schicksal's Imperative.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/elf_kiana.png"],
        pct: '20%',
        bottext: 'Highest Score: S0 786, S2 801'
      }
    ]},]
  },
  ignitehov: {
    teamDataSets: [
    {
      tabname: "v7.9",
      teamInfoText: "Data is from v7.9 CN Server (PC) Top 100 Myriad ??? D.",
    entries: [
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Sirin Miracle Magical Girl.png", "images/valkportrait/sparkle.png", "images/valkportrait/Bronya Herrscher of Truth.png", "images/valkportrait/elf_kiana.png"],
        pct: '100%',
      }
    ]},]
  },
  resovita: {
    teamDataSets: [
    {
      tabname: "v7.8",
      teamInfoText: "Data is from v7.8 CN Server (PC) Top 100 Myriad ??? D.",
    entries: [
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Theresa Schicksal's Imperative.png", "images/valkportrait/sparkle.png", "images/valkportrait/Thelema Mad Pleasure.png", "images/valkportrait/asop_songque.png"],
        rank: '1-11',
        pct: '51%',
        bottext: "Highest Score: S0 830, S2 849, SS+ 857 "
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/sparkle.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/asop_songque.png"],
        rank: '12',
        pct: '8%',
        bottext: "Only SS+ Sparkle DPS are on the leaderboards. Highest Score: SS 845, SSS 851"
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Theresa Schicksal's Imperative.png", "images/valkportrait/sparkle.png", "images/valkportrait/Thelema Mad Pleasure.png", "images/valkportrait/elf_kiana.png"],
        rank: '15',
        pct: '3%',
        bottext: "Highest Score: S2 825, SS 849 "
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Theresa Schicksal's Imperative.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/asop_songque.png"],
        rank: '23',
        pct: '27%',
        bottext: "Highest Score: S0 831, S2 843 "
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Theresa Schicksal's Imperative.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/elf_kiana.png"],
        rank: '65',
        pct: '11%',
      },

    ]},],
    videos: [
      { url: 'https://www.youtube.com/embed/_cfYygEWX10', abyss: 'RedLotus 482D', uploader: 'Marisa Honkai' },
      { url: 'https://www.youtube.com/embed/k_f42gTOs-M', abyss: 'Nirvana 538D', uploader: 'iChronos' },

    ] 
  },
  meleehoc: {
    teamDataSets: [
    {
      tabname: "v7.9",
      teamInfoText: "Data is from v7.9 CN Server (PC) Top 100 Myriad ??? D.",
    entries: [
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Fu Hua Fenghuang of Vicissitude.png", "images/valkportrait/sparkle.png", "images/valkportrait/Bronya Herrscher of Truth.png", "images/valkportrait/elf_kiana.png"],
        rank: '1-3',
        pct: '23%',
        bottext: "Highest Score: SS 791, SS+ 820 "
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/Mei Herrscher of Origin.png", "images/valkportrait/Bronya Herrscher of Truth.png", "images/valkportrait/asop_songque.png"],
        rank: '4-5',
        pct: '30%',
        bottext: "Highest Score: SS+ 814"
      },

      {
        type: 'lineup',
        lineup: ["images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/Mei Herrscher of Origin.png", "images/valkportrait/Bronya Herrscher of Truth.png", "images/valkportrait/elf_kiana.png"],
        rank: '23',
        pct: '47%',
        bottext: "Highest Score: S3 786, SS+ 803 "
      },
    ]},],
    videos: [
      { url: 'https://www.youtube.com/embed/gStp5LF95Hg', abyss: 'RedLotus 501D', uploader: 'Marisa Honkai' },
      { url: 'https://www.youtube.com/embed/aS_H4XU_td4', abyss: 'Nirvana 539D', uploader: 'Amadeus' },
    ] 
  },
  firekosma: {
    teamDataSets: [
    {
      tabname: "v7.9",
      teamInfoText: "Data is from v7.9 CN Server (PC) Top 100 Myriad ??? D.",
    entries: [
      {
        type: 'lineup',
        lineup: ["images/valkportrait/sparkle.png", "images/valkportrait/Lantern Lone Destruction.png", "images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/asop_songque.png"],
        rank: '1, 4-10',
        pct: '46%',
        bottext: "Highest Score: S 792, S2 810, SS+ 881 "
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/sparkle.png", "images/valkportrait/Lantern Lone Destruction.png", "images/valkportrait/Senadina Deepspace Anchor.png", "images/valkportrait/asop_songque.png"],
        rank: '2, 3',
        pct: '3%',
        bottext: "Highest Score: SS+ 878"
      },

      {
        type: 'lineup',
        lineup: ["images/valkportrait/sparkle.png", "images/valkportrait/Lantern Lone Destruction.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/asop_songque.png"],
        rank: '11',
        pct: '32%',
        bottext: "Highest Score: S2 831, SS 863"
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/sparkle.png", "images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/asop_songque.png"],
        rank: '40',
        pct: '17%',
        bottext: "Highest Score: S 799, S2 811, SS 836"
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/sparkle.png", "images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/elf_kiana.png"],
        rank: '87',
        pct: '2%',
        bottext: "Highest Score: S2 801"
      },
    ]},],
    videos: [
      { url: 'https://www.youtube.com/embed/WE8jzAjPt9c', abyss: 'Nirvana 541 D', uploader: 'Kyoshiro' },
    ] 
  },
  bleedhos: {
    teamDataSets: [
      {
        tabname: "v8.2 CN",
        teamInfoText: "Data is from v8.2 CN Server (PC) Top 50 Only, Myriad ??? D. ",
      entries: [
        {
          type: 'lineup',
          lineup: ["images/valkportrait/ps.png", "images/valkportrait/kiana badum.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/asop_teri.png"],
          rank: '1+',
          pct: '100%',
          bottext: "Highest Score: S 783, S2 786, SS 809, 9S 835 "
        }
      ]},
    {
      tabname: "v7.8 SEA",
      teamInfoText: "Data is from v7.8 SEA Server Top 100 Myriad 533 D.",
    entries: [
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/Theresa Lunar Vow.png", "images/valkportrait/asop_songque.png"],
        rank: '1-15',
        pct: '49%',
        bottext: "Highest Score: S 710, S2 817, SS+ 823 "
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Susannah Valkyrie Quicksand.png", "images/valkportrait/Griseo Cosmic Expression.png", "images/valkportrait/Seele Herrscher of Rebirth.png", "images/valkportrait/elf_bunny.png"],
        rank: '16',
        pct: '51%',
        bottext: "Highest Score: 756"
      },
    ]},]
  },
  pishacha: {
    teamDataSets: [
    {
      tabname: "v7.9 CN",
      teamInfoText: "Data is from v7.9 CN Server (PC) Top 100 Myriad ??? D.",
    entries: [
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Susannah Valkyrie Quicksand.png", "images/valkportrait/Griseo Cosmic Expression.png", "images/valkportrait/Seele Herrscher of Rebirth.png", "images/valkportrait/elf_bunny.png"],
        pct: '98%',
        bottext: "Highest Score: 805 "
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Susannah Valkyrie Quicksand.png", "images/valkportrait/Griseo Cosmic Expression.png", "images/valkportrait/Seele Herrscher of Rebirth.png", "images/valkportrait/elf_dudu.png"],
        rank: '55',
        pct: '2%',
        bottext: "Highest Score: 766"
      },
    ]},]
  },
  phyalien: {
    teamDataSets: [
      {
        tabname: "v8.2 CN",
        teamInfoText: "Data is from v8.2 CN Server (PC) Top 100 Myriad ??? D.",
      entries: [
        {
          type: 'lineup',
          lineup: ["images/valkportrait/Songque Jovial Deception.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/Thelema Mad Pleasure.png", "images/valkportrait/asop_sera.png"],
          rank: '1-3, 5-7, 9',
          pct: '22%',
          bottext: "Highest Score: SS 803, 9S 829"
        },
        {
          type: 'lineup',
          lineup: ["images/valkportrait/Songque Jovial Deception.png", "images/valkportrait/Lantern Lone Destruction.png", "images/valkportrait/Thelema Mad Pleasure.png", "images/valkportrait/asop_sera.png"],
          rank: '4, 8 , 10',
          pct: '16%',
          bottext: "Highest Score: S2 786, SS 807, 9S 818"
        },
        {
          type: 'lineup',
          lineup: ["images/valkportrait/dudu.png", "images/valkportrait/kiana badum.png", "images/valkportrait/Songque Jovial Deception.png", "images/valkportrait/asop_teri.png"],
          rank: '27',
          pct: '62%',
          bottext: "Highest Score: S 774, S2 780, SS 784, SSS 788"
        },
      ]},
    {
      tabname: "v7.9 CN",
      teamInfoText: "Data is from v7.9 CN Server (PC) Top 100 Myriad ??? D.",
    entries: [
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Songque Jovial Deception.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/Thelema Mad Pleasure.png", "images/valkportrait/asop_sera.png"],
        rank: '1-2, 4',
        pct: '52%',
        bottext: "Highest Score: S 789, S2 798, SS 810, 9S 842"
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Songque Jovial Deception.png", "images/valkportrait/Lantern Lone Destruction.png", "images/valkportrait/Thelema Mad Pleasure.png", "images/valkportrait/asop_sera.png"],
        rank: '3, 5-16',
        pct: '46%',
        bottext: "Highest Score: S 791, S2 801, SS 818, 9S 834"
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Songque Jovial Deception.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/Lantern Lone Destruction.png", "images/valkportrait/asop_sera.png"],
        rank: '29',
        pct: '2%',
        bottext: "Highest Score: SS 803"
      },
    ]},]
  },
  starbull: {
    teamDataSets: [
    {
      tabname: "v7.9 CN",
      teamInfoText: "Data is from v7.9 CN Server (PC) Top 100 Myriad 539 D.",
    entries: [
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Mei Herrscher of Origin.png", "images/valkportrait/Theresa Lunar Vow.png", "images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/elf_kiana.png"],
        rank: '1',
        pct: '1%',
        bottext: "Gear: DoUnity, Benares TM Cezanne B. Highest Score: 829"
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Mei Herrscher of Origin.png", "images/valkportrait/Eden Golden Diva.png", "images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/elf_kiana.png"],
        rank: '2-8',
        pct: '23%',
        bottext: "Gear: 7Thunder, Zhenyi TB Schro M. Highest Score: 827"
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Mei Herrscher of Origin.png", "images/valkportrait/Eden Golden Diva.png", "images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/elf_kiana.png"],
        rank: '9',
        pct: '17%',
        bottext: "Gear: DoUnity, Zhenyi TB Schro M. Highest Score: 824"
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Eden Golden Diva.png", "images/valkportrait/Mei Herrscher of Origin.png",  "images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/elf_kiana.png"],
        rank: '10-11',
        pct: '27%',
        bottext: "Gear: DoUnity, Zhenyi TB Schro M. Highest Score: 824"
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Eden Golden Diva.png", "images/valkportrait/Mei Herrscher of Origin.png",  "images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/elf_kiana.png"],
        rank: '40',
        pct: '28%',
        bottext: "Gear: 7Thunder, Zhenyi TB Schro M. Highest Score: 820"
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Mei Herrscher of Origin.png", "images/valkportrait/Eden Golden Diva.png", "images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/elf_kiana.png"],
        rank: '70',
        pct: '2%',
        bottext: "Gear: DoUnity, Raiden TM Cezanne B. Highest Score: 816"
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Eden Golden Diva.png", "images/valkportrait/Mei Herrscher of Origin.png",  "images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/elf_kiana.png"],
        rank: '85',
        pct: '1%',
        bottext: "Gear: 7Thunder, Raiden TM Cezanne B. Highest Score: 814"
      },

      {
        type: 'lineup',
        lineup: ["images/valkportrait/Eden Golden Diva.png", "images/valkportrait/Mei Herrscher of Origin.png",  "images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/elf_klein.png"],
        rank: '99',
        pct: '1%',
        bottext: "Gear: DoUnity, Zhenyi TB Schro M. Highest Score: 813"
      },
    ]},],
    videos: [
      { url: 'https://www.youtube.com/embed/wQScUHAtPBw', abyss: 'RedLotus 502D', uploader: 'Marisa Honkai' },
      { url: 'https://www.youtube.com/embed/uB7S9gjTB-U', abyss: 'RedLotus 502D', uploader: 'Amadeus' },
      { url: 'https://www.youtube.com/embed/noY1ADbFXHE', abyss: 'Nirvana 539D', uploader: 'Kyoshiro' },
    ] 
  },
  villv: {
    teamDataSets: [
    {
      tabname: "v7.9 CN",
      teamInfoText: "Data is from v7.9 CN Server (PC) Top 100 Myriad ??? D.",
    entries: [
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Theresa Lunar Vow.png", "images/valkportrait/Theresa Schicksal's Imperative.png", "images/valkportrait/Griseo Cosmic Expression.png", "images/valkportrait/elf_kiana.png"],
        pct: '100%',
        bottext: "Some SIMP use SignatureTB TeslaBand M. Highest Score: S2 760, SS 772, SSS 783"
      },
      
    ]},],
    videos: [
      { url: 'https://www.youtube.com/watch?v=9NB9rocr36Y', abyss: 'Nirvana 548D', uploader: 'phylynxbelt' },
      { url: 'https://www.youtube.com/embed/cz6VOeE-slU', abyss: 'Nirvana 540D', uploader: 'Xintsu' },
      { url: 'https://www.youtube.com/embed/HrVzdSswa50', abyss: 'RedLotus 503D', uploader: 'Marisa Honkai' },

    ] 
  },
  otto: {
    teamDataSets: [
      {
        tabname: "v8.1 CN",
        teamInfoText: "Data is from v8.1 CN Server (PC) Top 100 Myriad ??? D.",
      entries: [
        {
          type: 'lineup',
          lineup: ["images/valkportrait/dudu.png", "images/valkportrait/kiana badum.png", "images/valkportrait/sparkle.png", "images/valkportrait/asop_teri.png"],
          rank: '1-2, 4',
          pct: '7%',
          bottext: "Highest Score: SS 870, 9S 891"
        },
        {
          type: 'lineup',
          lineup: ["images/valkportrait/dudu.png", "images/valkportrait/kiana badum.png", "images/valkportrait/Songque Jovial Deception.png", "images/valkportrait/asop_teri.png"],
          rank: '3, 5-10',
          pct: '80%',
          bottext: "Highest Score: SS 874, 9S 884"
        },
        {
          type: 'lineup',
          lineup: ["images/valkportrait/dudu.png", "images/valkportrait/sparkle.png", "images/valkportrait/Songque Jovial Deception.png", "images/valkportrait/asop_teri.png"],
          rank: '17',
          pct: '10%',
          bottext: "Highest Score: S2 855, SSS 869"
        },
        {
          type: 'lineup',
          lineup: ["images/valkportrait/dudu.png", "images/valkportrait/kiana badum.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/asop_teri.png"],
          rank: '21',
          pct: '1%',
          bottext: "Highest Score: SS1 864"
        },
        {
          type: 'lineup',
          lineup: ["images/valkportrait/dudu.png", "images/valkportrait/Songque Jovial Deception.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/asop_teri.png"],
          rank: '36',
          pct: '2%',
          bottext: "Highest Score: S2 854"
        },
      ]},
    {
      tabname: "v8.0 CN",
      teamInfoText: "Data is from v8.0 CN Server (PC) Top 100 Myriad 539 D.",
    entries: [
      {
        type: 'lineup',
        lineup: ["images/valkportrait/dudu.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/sparkle.png", "images/valkportrait/asop_sera.png"],
        rank: '1',
        pct: '3%',
        bottext: "Highest Score: 8S 839, 9S 895"
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/dudu.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/Songque Jovial Deception.png", "images/valkportrait/asop_sera.png"],
        rank: '2,4,6,7',
        pct: '57%',
        bottext: "Highest Score: S 837, S2 859, SS 873, 8S 874, 95 885"
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/dudu.png", "images/valkportrait/sparkle.png", "images/valkportrait/Songque Jovial Deception.png", "images/valkportrait/asop_sera.png"],
        rank: '3,5,8',
        pct: '40%',
        bottext: "Highest Score: S 822, S2 855, SS 866, 9S 873"
      },
      { 
        type: 'extraTeamRow',
        toptext: 'Highest score for different Vita, Sparkle and JD rank',
        extraTeamRow: [
          { img: 'images/valkportrait/Vita Lone Planetfarer.png', text: 'SS+ 895' },
          { img: 'images/valkportrait/sparkle.png', text: 'SS+ 895' },
          { img: 'images/valkportrait/Songque Jovial Deception.png', text: 'SS+ 885' },
          { img: 'images/valkportrait/Songque Jovial Deception.png', text: 'S,S2 864' },
          { img: 'images/valkportrait/sparkle.png', text: 'S,S2 840' },
          { img: 'images/valkportrait/Vita Lone Planetfarer.png', text: 'S2 840' },
          { img: 'images/valkportrait/Vita Lone Planetfarer.png', text: 'S N/A' },

        ] 
      }
      
    ]},],
    videos: [
      { url: 'https://www.youtube.com/embed/fOtZH8BiZYg', abyss: 'Nirvana 542D', uploader: 'Marisa Honkai' },
      { url: 'https://www.youtube.com/embed/Chr0ksydpL4', abyss: 'Nirvana 542D', uploader: 'iChronos' },
    ] 
  },
  shadowtank: {
    teamDataSets: [
    {
      tabname: "v8.0 CN",
      teamInfoText: "Data is from v8.0 CN Server (PC) Top 100 Myriad 539 D.",
    entries: [
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Lantern Lone Destruction.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/Thelema Mad Pleasure.png", "images/valkportrait/asop_sera.png"],
        rank: '1-2, 5-10',
        pct: '48%',
        bottext: "Highest Score: S 760, S2 784, SS 807, 9S 830"
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Lantern Lone Destruction.png", "images/valkportrait/Senadina Deepspace Anchor.png", "images/valkportrait/Thelema Mad Pleasure.png", "images/valkportrait/asop_sera.png"],
        rank: '3-4',
        pct: '50%',
        bottext: "Highest Score: S 756, S2 789, SS 791, 9S 814"
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Lantern Lone Destruction.png", "images/valkportrait/Senadina Deepspace Anchor.png", "images/valkportrait/Thelema Mad Pleasure.png", "images/valkportrait/asop_songque.png"],
        rank: '81',
        pct: '1%',
        bottext: "Highest Score: SS 763"
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Songque Jovial Deception.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/Lantern Lone Destruction.png", "images/valkportrait/asop_sera.png"],
        rank: '94',
        pct: '1%',
        bottext: "Highest Score: SSS 753"
      },
      { 
        type: 'extraTeamRow',
        toptext: 'Highest score for different Vita and Sena rank',
        extraTeamRow: [
          { img: 'images/valkportrait/Vita Lone Planetfarer.png', text: 'SS+ 830' },
          { img: 'images/valkportrait/Senadina Deepspace Anchor.png', text: 'SS+ 814' },
          { img: 'images/valkportrait/Vita Lone Planetfarer.png', text: 'SS 807' },
          { img: 'images/valkportrait/Senadina Deepspace Anchor.png', text: 'SS 800' },
          { img: 'images/valkportrait/Senadina Deepspace Anchor.png', text: 'S, S2 789' },
          { img: 'images/valkportrait/Vita Lone Planetfarer.png', text: 'S2 781' },
          { img: 'images/valkportrait/Vita Lone Planetfarer.png', text: 'S N/A' },

        ] 
      },
    ]},],
    videos: [
      { url: 'https://www.youtube.com/embed/BLjl8jH-3BE', abyss: 'Nirvana 539D', uploader: 'Marisa Honkai' },
      { url: 'https://www.youtube.com/embed/WNymoQCWvEM', abyss: 'Nirvana 539D', uploader: 'iChronos' },
    ] 
  },
  deliverance: {
    teamDataSets: [
    {
      tabname: "v8.0 CN",
      teamInfoText: "Data is from v8.0 CN Server (PC) Top 100 Myriad ??? D.",
    entries: [
      {
        type: 'lineup',
        lineup: ["images/valkportrait/dudu.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/sparkle.png", "images/valkportrait/asop_sera.png"],
        rank: '1-2',
        pct: '2%',
        bottext: "Highest Score: 9S 934"
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/dudu.png", "images/valkportrait/Songque Jovial Deception.png", "images/valkportrait/sparkle.png", "images/valkportrait/asop_sera.png"],
        rank: '3+',
        pct: '98%',
        bottext: "Highest Score:  S 883, S2 902, SS 913, SS2 915, 9S 918"
      },
      
    ]},],
    videos: [
      { url: 'https://www.youtube.com/watch?v=F7h6SF1QJXQ', abyss: 'Nirvana 539D', uploader: 'Marisa Honkai' },
      { url: 'https://www.bilibili.com/video/BV146ktYBEPN/', abyss: 'S0 Reign Solaris vs Nirvana 541D', uploader: 'Saber' },

    ] 
  },
  momemperor: {
    teamDataSets: [
    {
      tabname: "v8.0 CN",
      teamInfoText: "Data is from v8.0 CN Server (PC) Top 100 Myriad ??? D.",
    entries: [
      {
        type: 'lineup',
        lineup: ["images/valkportrait/dudu.png", "images/valkportrait/Songque Jovial Deception.png", "images/valkportrait/sparkle.png", "images/valkportrait/asop_sera.png"],
        rank: '1+',
        pct: '98%',
        bottext: "Highest Score: S 839 , S2 874, SS 875, SS2 876, 9S 889"
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/dudu.png", "images/valkportrait/Songque Jovial Deception.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/asop_sera.png"],
        rank: '88',
        pct: '2%',
        bottext: "Highest Score:  S2 839"
      },
      
    ]},],
    videos: [
      { url: 'https://youtu.be/65YuOc-ft_c', abyss: 'Nirvana 541D', uploader: 'Marisa Honkai' },
      { url: 'https://www.bilibili.com/video/BV14qCnYnErh/', abyss: 'S0 Reign Solaris 508 D', uploader: '奕桐s' },

    ] 
  },
  firetona: {
    teamDataSets: [
      {
        tabname: "v8.1 CN",
        teamInfoText: "Data is from v8.0 CN Server (PC) Top 100 Myriad ??? D.",
      entries: [
        {
          type: 'lineup',
          lineup: ["images/valkportrait/sparkle.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/kiana badum.png", "images/valkportrait/asop_songque.png"],
          rank: '1-2, 4',
          pct: '26%',
          bottext: "Highest score: S 822, S2 827, SS 847, 9S 869"
        },
        {
          type: 'lineup',
          lineup: ["images/valkportrait/sparkle.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/asop_songque.png"],
          rank: '3, 5-10',
          pct: '46%',
          bottext: "Highest score: S 822, S2 825, SS 853, 9S 863"
        },
        {
          type: 'lineup',
          lineup: ["images/valkportrait/sparkle.png", "images/valkportrait/kiana badum.png", "images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/asop_songque.png"],
          rank: '30',
          pct: '28%',
          bottext: "Highest score: S 831, SS 844"
        },
      ]},
    {
      tabname: "v8.0 CN",
      teamInfoText: "Data is from v8.0 CN Server (PC) Top 100 Myriad ??? D.",
    entries: [
      {
        type: 'lineup',
        lineup: ["images/valkportrait/sparkle.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/asop_songque.png"],
        rank: '1+',
        pct: '99%',
        bottext: "Highest score: S 850, S2 852, SS 864, 9S 879"
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/sparkle.png", "images/valkportrait/Senadina Deepspace Anchor.png", "images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/asop_songque.png"],
        rank: '5',
        pct: '1%',
        bottext: "Highest score: 9S 865"
      },
      
    ]},],
    videos: [
      { url: 'https://www.youtube.com/watch?v=EZwGtPTtQsA', abyss: 'RedLotus 511D', uploader: 'Marisa Honkai' },

    ] 
  },

  aponia: {
    teamDataSets: [
      {
        tabname: "v8.1 CN",
        teamInfoText: "Data is from v8.0 CN Server (PC) Top 100 Myriad ??? D.",
      entries: [
        {
          type: 'lineup',
          lineup: ["images/valkportrait/Hare Dreamweaver.png", "images/valkportrait/dudu.png", "images/valkportrait/Seele Herrscher of Rebirth.png", "images/valkportrait/elf_bunny.png"],
          rank: '1+',
          pct: '100%'
        },
        
      ]},
    {
      tabname: "v8.0 CN",
      teamInfoText: "Data is from v8.0 CN Server (PC) Top 100 Myriad 537 D.",
    entries: [
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Hare Dreamweaver.png", "images/valkportrait/dudu.png", "images/valkportrait/Seele Herrscher of Rebirth.png", "images/valkportrait/elf_bunny.png"],
        rank: '1+',
        pct: '99%',
        bottext: "Highest score: S1 726, SS 747, SS2 773, SS3 780, 9S 808"
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Hare Dreamweaver.png", "images/valkportrait/dudu.png", "images/valkportrait/Seele Herrscher of Rebirth.png", "images/valkportrait/elf_kiana.png"],
        rank: '99',
        pct: '1%',
        bottext: "Highest score: 701"
      },
      
    ]},]
  },

  aka: {
    teamDataSets: [
    {
      tabname: "v8.0 CN",
      teamInfoText: "Data is from v8.0 CN Server (PC) Top 100 Myriad 534 D.",
    entries: [
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Sirin Miracle Magical Girl.png", "images/valkportrait/sparkle.png", "images/valkportrait/Bronya Herrscher of Truth.png", "images/valkportrait/elf_kiana.png"],
        rank: '1+',
        pct: '100%',
        bottext: "Highest score: 868"
      },
      
    ]},]
  },
  raven: {
    teamDataSets: [
    {
      tabname: "v7.9 SEA",
      teamInfoText: "Data is from v7.9 SEA Server Top 100 Myriad 541 D.",
    entries: [
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Thelema Mad Pleasure.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/Lantern Lone Destruction.png", "images/valkportrait/asop_sera.png"],
        rank: '1-6, 8',
        pct: '13%',
        bottext: "Highest Score: SS1 771, SSS 788"
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Thelema Mad Pleasure.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/Senadina Deepspace Anchor.png", "images/valkportrait/asop_sera.png"],
        rank: '7, 9, 10',
        pct: '58%',
        bottext: "Highest Score: S 730, SS 762"
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Thelema Mad Pleasure.png", "images/valkportrait/Senadina Deepspace Anchor.png", "images/valkportrait/Lantern Lone Destruction.png", "images/valkportrait/asop_sera.png"],
        rank: '15',
        pct: '2%',
        bottext: "Highest Score: SS 744"
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Thelema Mad Pleasure.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/Songque Jovial Deception.png", "images/valkportrait/asop_sera.png"],
        rank: '36',
        pct: '1%',
        bottext: "Highest Score: SS 724"
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Thelema Mad Pleasure.png", "images/valkportrait/Senadina Deepspace Anchor.png", "images/valkportrait/Theresa Schicksal's Imperative.png", "images/valkportrait/asop_sera.png"],
        rank: '41',
        pct: '12%',
        bottext: "Highest Score: S 719"
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Thelema Mad Pleasure.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/Senadina Deepspace Anchor.png", "images/valkportrait/asop_songque.png"],
        rank: '57',
        pct: '7%',
        bottext: "Highest Score: S 701"
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Thelema Mad Pleasure.png", "images/valkportrait/Senadina Deepspace Anchor.png", "images/valkportrait/Songque Jovial Deception.png", "images/valkportrait/asop_sera.png"],
        rank: '69',
        pct: '3%',
        bottext: "Highest Score: S 693"
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Thelema Mad Pleasure.png", "images/valkportrait/Senadina Deepspace Anchor.png", "images/valkportrait/Theresa Schicksal's Imperative.png", "images/valkportrait/asop_songque.png"],
        rank: '80',
        pct: '2%',
        bottext: "Highest Score: S 689"
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Thelema Mad Pleasure.png", "images/valkportrait/Senadina Deepspace Anchor.png", "images/valkportrait/Songque Jovial Deception.png", "images/valkportrait/asop_songque.png"],
        rank: '93',
        pct: '2%',
        bottext: "Highest Score: S2 683"
      },
    ]},],
    videos: [
      { url: 'https://www.youtube.com/embed/RvNgM9cFmVE', abyss: 'Nirvana 541D', uploader: 'Marisa Honkai' },

    ] 
  },

  lightningguaymas: {
    teamDataSets: [
      {
        tabname: "v8.2 CN",
        teamInfoText: "Data is from v8.2 CN Server (PC) Top 100 Myriad ??? D.",
      entries: [
        {
          type: 'lineup',
          lineup: ["images/valkportrait/Senadina Deepspace Anchor.png",  "images/valkportrait/Vita Lone Planetfarer.png", "/images/valkportrait/kiana badum.png", "images/valkportrait/asop_songque.png"],
          rank: '1-10',
          pct: '15%',
          bottext: "Top Score: SS1 807, SS2 816, 9S 848. Only SS1+ Sena are in T100.",
        },
        {
          type: 'lineup',
          lineup: ["images/valkportrait/kiana badum.png", "/images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/Songque Jovial Deception.png", "images/valkportrait/asop_teri.png"],
          rank: '13',
          pct: '85%',
          bottext: "Highest score: S 801, SS 809, 9S 809"
        },
        
      ]},
    {
      tabname: "v8.0 CN",
      teamInfoText: "Data is from v8.0 CN Server (PC) Top 100 Myriad ??? D.",
    entries: [
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Senadina Deepspace Anchor.png", "/images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/asop_songque.png"],
        rank: '1+',
        pct: '99%',
        bottext: "Highest score: S 781, S2 785, SS 812, 9S 843"
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Senadina Deepspace Anchor.png", "/images/valkportrait/Thelema Mad Pleasure.png", "images/valkportrait/Helia Valkyrie Boltstorm.png", "images/valkportrait/asop_songque.png"],
        rank: '47',
        pct: '1%',
        bottext: "Highest score: SS1 782"
      },
      
    ]},]
  },
  kevin: {
    teamDataSets: [
    {
      tabname: "v8.0 CN",
      teamInfoText: "Data is from v8.0 CN Server (PC) Top 100 Myriad ??? D.",
    entries: [
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Lantern Lone Destruction.png", "/images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/Thelema Mad Pleasure.png", "images/valkportrait/asop_sera.png"],
        rank: '1-4',
        pct: '5%',
        bottext: "Highest score: 9S 814"
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Kiana Herrscher of Finality.png", "/images/valkportrait/Mei Herrscher of Origin.png", "images/valkportrait/Bronya Herrscher of Truth.png", "images/valkportrait/asop_songque.png"],
        rank: '5, 7-10',
        pct: '42%',
        bottext: "Highest score: S3 765, SS 769, SS1 770, SS3 782"
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Thelema Mad Pleasure.png", "/images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/Lantern Lone Destruction.png", "images/valkportrait/asop_sera.png"],
        rank: '6',
        pct: '1%',
        bottext: "Highest score: 9S 779"
      },
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Kiana Herrscher of Finality.png", "/images/valkportrait/Mei Herrscher of Origin.png", "images/valkportrait/Bronya Herrscher of Truth.png", "images/valkportrait/elf_kiana.png"],
        rank: '31',
        pct: '52%',
        bottext: "Highest score: S3 765, SS1 766 , SS2 767 , SSS 769"
      },
      
    ]},]
  },
  symphellmaru: {
    
    teamDataSets: [
      {
        tabname: "v8.0 CN",
        teamInfoText: "Data is from v8.0 SEA Server Top 100 Myriad 540 D",
        entries: [
          {
            type: 'lineup',
            lineup: ["images/valkportrait/Thelema Mad Pleasure.png", "/images/valkportrait/Lantern Lone Destruction.png", "images/valkportrait/Senadina Deepspace Anchor.png", "images/valkportrait/asop_sera.png"],
            rank: '1, 5, 8',
            pct: '67%',
            bottext: "Highest score: S 762, S2 781, SS 796, 9S 835"
          },
          {
            type: 'lineup',
            lineup: ["images/valkportrait/Thelema Mad Pleasure.png", "/images/valkportrait/Lantern Lone Destruction.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/asop_sera.png"],
            rank: '2-4, 6, 7',
            pct: '19%',
            bottext: "Highest score: SS 794, SS1 816"
          },
          {
            type: 'lineup',
            lineup: ["images/valkportrait/Vita Lone Planetfarer.png", "/images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/Coralie Valkyrie Blastmetal.png", "images/valkportrait/asop_songque.png"],
            rank: '12',
            pct: '13%',
            bottext: "Highest score: S2 743, SS 786, SSS 791"
          },
          {
            type: 'lineup',
            lineup: ["images/valkportrait/Thelema Mad Pleasure.png", "/images/valkportrait/Senadina Deepspace Anchor.png", "images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/asop_sera.png"],
            rank: '35',
            pct: '1%',
            bottext: "Highest score: SSS 774"
          },
          
        ]
      }
    ],
    videos: [
      { url: 'https://youtu.be/YzAghCVowVk', abyss: 'Nirvana 540D , Redlotus 515D', uploader: 'Marisa Honkai' },
      { url: 'https://www.bilibili.com/video/BV1LmC5YJEz4/', abyss: 'S0 Thelema 740 vs Nirvana 541D', uploader: '春水草色向南深' },

    ] 
  },
  sdguaymas: {
    
    teamDataSets: [
      {
        tabname: "v8.1 CN",
        teamInfoText: "Data is from v8.1 CN Server (PC) Top 100 Myriad ??? D",
        entries: [
          {
            type: 'lineup',
            lineup: ["images/valkportrait/kiana badum.png", "/images/valkportrait/Songque Jovial Deception.png", "/images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/asop_teri.png"],
            rank: '1-6',
            pct: '97%',
            bottext: "Highest score: S 832, S2 836, SS 843, 9S 860"
          },
          {
            type: 'lineup',
            lineup: ["images/valkportrait/Songque Jovial Deception.png", "/images/valkportrait/Lantern Lone Destruction.png", "/images/valkportrait/Thelema Mad Pleasure.png", "images/valkportrait/asop_sera.png"],
            rank: '7, 9',
            pct: '3%',
            bottext: "SS 830, 9S 845"
          },
          
        ]
      }
    ],
    videos: [
      { url: 'https://www.youtube.com/watch?v=HFieeDTcQWs', abyss: 'RedLotus 501D', uploader: 'Marisa Honkai' },
      { url: 'https://youtu.be/tZ01rj70k50', abyss: 'RedLotus 501D', uploader: 'Xintsu' },

    ] 
    
  },
  sa: {
    
    teamDataSets: [
      {
        tabname: "v8.1 CN",
        teamInfoText: "Data is from v8.1 CN Server (PC) Top 100 Myriad ??? D",
        entries: [
          {
            type: 'lineup',
            lineup: ["images/valkportrait/kiana badum.png", "/images/valkportrait/Songque Jovial Deception.png", "/images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/asop_teri.png"],
            rank: '1-3',
            pct: '61%',
            bottext: "Highest score: S 802, S2 804, SS 806, 9S 827"
          },
          {
            type: 'lineup',
            lineup: ["images/valkportrait/kiana badum.png", "/images/valkportrait/Songque Jovial Deception.png", "/images/valkportrait/sparkle.png", "images/valkportrait/asop_teri.png"],
            rank: '4-10',
            pct: '39%',
            bottext: "Highest score: S 802, SS 810, SSS 820"
          },
          
        ]
      }
    ],
    videos: [
      { url: 'https://youtu.be/knD4cguuSa0?si=A0qjedXjI-HF2MPE', abyss: 'Nirvana 542D', uploader: 'Kyoshiro' },
      { url: 'https://www.youtube.com/watch?v=iSNZDuTlVDM', abyss: 'RedLotus 503D', uploader: 'Marisa Honkai' }

    ] 
  },

  typesprout: {
    
    teamDataSets: [
      {
        tabname: "v8.1 CN",
        teamInfoText: "Data is from v8.1 CN Server (PC) Top 100 Myriad ??? D",
        entries: [
          {
            type: 'lineup',
            lineup: ["images/valkportrait/Vita Lone Planetfarer.png", "/images/valkportrait/Kiana Herrscher of Finality.png", "/images/valkportrait/Coralie Valkyrie Blastmetal.png", "images/valkportrait/asop_teri.png"],
            rank: '1+',
            pct: '100%',
          },
          
        ]
      }
    ],
  },

  fluxandrius: {
    
    teamDataSets: [
      {
        tabname: "v8.1 CN",
        teamInfoText: "Data is from v8.1 CN Server (PC) Top 100 Myriad ??? D",
        entries: [
          {
            type: 'lineup',
            lineup: ["images/valkportrait/kiana badum.png", "/images/valkportrait/dudu.png", "/images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/asop_teri.png"],
            rank: '1+',
            pct: '100%',
          },
          
        ]
      }
    ],    
    videos: [
      { url: 'https://www.youtube.com/watch?v=FWNfppQPXpA', abyss: 'RedLotus 507D', uploader: 'Marisa Honkai' },
      { url: 'https://youtu.be/AzPx7kTVajg', abyss: 'Nirvana 543D', uploader: 'phylynxbelt' },
      { url: 'https://www.youtube.com/watch?v=CFp1LmN6yyQ', abyss: 'RedLotus 496D', uploader: 'Sheepless Ram' },

    ] 
  },

  icehellmaru: {
    
    teamDataSets: [
      {
        tabname: "v8.1 CN",
        teamInfoText: "Data is from v8.1 CN Server (PC) Top 100 Myriad ??? D",
        entries: [
          {
            type: 'lineup',
            lineup: ["images/valkportrait/Elysia Herrscher of Human Ego.png", "/images/valkportrait/Thelema Mad Pleasure.png", "/images/valkportrait/Senadina Deepspace Anchor.png", "images/valkportrait/asop_sera.png"],
            rank: '1-4, 6-9',
            pct: '33%',
          },
          {
            type: 'lineup',
            lineup: ["images/valkportrait/Elysia Herrscher of Human Ego.png", "/images/valkportrait/Thelema Mad Pleasure.png", "/images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/asop_sera.png"],
            rank: '5, 10',
            pct: '66%',
          },
          {
            type: 'lineup',
            lineup: ["images/valkportrait/Elysia Herrscher of Human Ego.png", "/images/valkportrait/Thelema Mad Pleasure.png", "/images/valkportrait/Lantern Lone Destruction.png", "images/valkportrait/asop_sera.png"],
            rank: '64',
            pct: '1%',
          },
          
        ]
      }
    ],
    videos: [
      { url: 'https://www.youtube.com/watch?v=c9kokHaKrnc', abyss: 'RedLotus 504D', uploader: 'Marisa Honkai' },
      { url: 'https://youtu.be/MmdTMpuwkTw', abyss: 'Nirvana 536D', uploader: 'Haxxor' }

    ] 
  },


  fluxhomu: {
    
    teamDataSets: [
      {
        tabname: "v8.1 CN",
        teamInfoText: "Data is from v8.1 CN Server (PC) Top 100 Myriad ??? D",
        entries: [
          {
            type: 'lineup',
            lineup: ["images/valkportrait/kiana badum.png","/images/valkportrait/Vita Lone Planetfarer.png",  "/images/valkportrait/dudu.png", "images/valkportrait/asop_teri.png"],
            rank: '1',
            pct: '3%',
            bottext: "Highest score: SS 811, 9S 833"
          },
          {
            type: 'lineup',
            lineup: ["images/valkportrait/kiana badum.png", "/images/valkportrait/Vita Lone Planetfarer.png", "/images/valkportrait/sparkle.png", "images/valkportrait/asop_teri.png"],
            rank: '2-10',
            pct: '91%',
            bottext: "Highest score: S 797, S2 799, SS 815, 8S 826 "
          },
          {
            type: 'lineup',
            lineup: ["images/valkportrait/kiana badum.png", "/images/valkportrait/Vita Lone Planetfarer.png", "/images/valkportrait/Songque Jovial Deception.png", "images/valkportrait/asop_teri.png"],
            rank: '50',
            pct: '2%',
            bottext: "Highest score: S 794"
          },
          {
            type: 'lineup',
            lineup: ["images/valkportrait/kiana badum.png", "/images/valkportrait/Vita Lone Planetfarer.png", "/images/valkportrait/Elysia Herrscher of Human Ego.png", "images/valkportrait/asop_teri.png"],
            rank: '54',
            pct: '4%',
            bottext: "Highest score: SS 793"
          },
        ]
      }
    ],
  },
  
  fluxtank: {
    
    teamDataSets: [
      {
        tabname: "v8.1 CN",
        teamInfoText: "Data is from v8.1 CN Server (PC) Top 100 Myriad ??? D",
        entries: [
          {
            type: 'lineup',
            lineup: ["images/valkportrait/dudu.png","/images/valkportrait/Elysia Herrscher of Human Ego.png",  "/images/valkportrait/sparkle.png", "images/valkportrait/asop_teri.png"],
            rank: '1+',
            pct: '81%',
            bottext: "Highest score: S 823, S2 837, SS 846, SS1 849, 9S 857"
          },
          {
            type: 'lineup',
            lineup: ["images/valkportrait/kiana badum.png", "/images/valkportrait/Elysia Herrscher of Human Ego.png", "/images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/asop_teri.png"],
            rank: '31',
            pct: '17%',
            bottext: "Highest score: S 823, SS 828, 9S 832 "
          },
          {
            type: 'lineup',
            lineup: ["images/valkportrait/dudu.png","/images/valkportrait/Elysia Herrscher of Human Ego.png",  "/images/valkportrait/Songque Jovial Deception.png", "images/valkportrait/asop_teri.png"],
            rank: '46',
            pct: '2%',
            bottext: "Highest score: S2 825, SS 827"
          },
        ]
      }
    ],
    videos: [
      { url: 'https://www.bilibili.com/video/BV1sUXDYoEdu/', abyss: 'Ba-dum team in Red Lotus', uploader: '蜗牛吖-接代肝' },
      { url: 'https://www.youtube.com/watch?v=Y99i6pl7xFI', abyss: 'Nirvana 547D', uploader: 'Marisa Honkai' },
      { url: 'https://www.youtube.com/watch?v=EiQ-jPfo6oY', abyss: 'Nirvana 547D', uploader: 'Xintsu' },


    ] 
  },

  lantern: {
    
    teamDataSets: [
      {
        tabname: "v8.2 CN",
        teamInfoText: "Data is from v8.2 CN Server (PC) Top 100 Myriad ??? D",
        entries: [
          {
            type: 'lineup',
            lineup: ["images/valkportrait/ps.png","/images/valkportrait/Vita Lone Planetfarer.png",  "/images/valkportrait/kiana badum.png", "images/valkportrait/asop_teri.png"],
            rank: '1+',
            pct: '85%',
            bottext: "Highest score: S 796, S2 804, SS 825, 9S 843"
          },
          {
            type: 'lineup',
            lineup: ["images/valkportrait/ps.png","/images/valkportrait/Vita Lone Planetfarer.png",  "/images/valkportrait/dudu.png", "images/valkportrait/asop_teri.png"],
            rank: '31',
            pct: '15%',
            bottext: "Highest score: S 796, SS 801"
          },
          
        ]
      }
    ],
  },

  sdalien: {
    
    teamDataSets: [
      {
        tabname: "v8.2 CN",
        teamInfoText: "Data is from v8.2 CN Server (PC) Top 100 Myriad ??? D",
        entries: [
          {
            type: 'lineup',
            lineup: ["/images/valkportrait/kiana badum.png", "images/valkportrait/ps.png","/images/valkportrait/Vita Lone Planetfarer.png", "images/valkportrait/asop_teri.png"],
            rank: '1+',
            pct: '100%',
            bottext: "Highest score: S 824, SS 842, 9S 867"
          },
          
        ]
      }
    ],
  },
}

