
export const weatherList = {
  lightning: [
    {id: 'lightningsprout',name: 'Sprout of Wishing'}
  ],
  fire: [
    {id: 'firemobius', name: 'Mobius'},
    {id: 'firekosma', name: 'Kosma'},
  ],
  typecounter: [
    {id: 'typekasumi', name:'Kasumi'}, 
    {id: 'typeandrius', name:'Andrius'}, 
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
    {id: 'sdepernay', name: 'Meteroid: Epernay'}
  ],
  stellar: [
    {id: 'stellarassaka', name: 'Assaka'}
  ],
  starless: [
    {id: 'starbenares', name: 'Benares: Ice'},
    {id: 'starrimestar', name: 'Herrscher of Rimestar'},
    {id: 'starandrius', name: 'Dominator of Wolves'}
  ],
  bleed: [
    {id: 'bleedhos', name: 'Herrscher of Sentience'},
    {id: 'pishacha', name: 'Pischacha'},
  ],
  ignite: [
    {id: 'ignitehov', name: 'Herrscher of the Void'}
  ],
  resonance: [
    {id: 'resovita', name: "Vita - Sea's Depths"}
  ],
  melee: [
    {id: 'meleehoc', name: 'Herrscher of Corruption'}
  ],
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
    weakness: 'Immune to Ice DMG.',
    typeicon: "images/type/IconBIO.png",
    bosspic: "images/Bosses/Dominator of Wolves.webp",
    weather: "Counter: Type counter effect is 20% stronger."
  },

  obvhomu: {
      name: 'Homu Emperor', 
      mechanics: 'After defeating an enemy, Total DMG +20% for 15s, max 8 stacks, each stack duration is independent.', 
      weakness: 'None', 
      typeicon: "images/type/IconNULL.png", 
      bosspic: "images/Bosses/HOMU Emperor.webp", 
      weather: "Stellar Crown: For every character in the team with Omniscient Star tag, team Total DMG +8%. When AR Rite of Oblivion is activated, team Total DMG +30%.", 
  },
  bloodsdmob: {
    name: 'SD-Mech Swarm', 
      mechanics: 'Enemies appear in waves. Stage is complete once you defeat 36 enemies.', 
      typeicon: "images/type/IconSDMECH.png", 
      weakness: 'None', 
      bosspic: "images/Bosses/Alien Guard.webp", 
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
    weakness: 'Fire Immunity, Lightning (M), Physical (M)', 
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
      weather: "Stardust: SD valk DMG +20%", 
  },
  stellarassaka: {
    name: 'Saha: Assaka', 
    mechanics: 'First wave has 1 Alien Guard and 2 Zombie mobs.', 
    weakness: 'None', 
    typeicon: "images/type/IconPSI.png", 
    bosspic: "images/Bosses/Saha Assaka.webp", 
    weather: "Stellar: When AR is activated, Total DMG +30%. During Stellar Outburst, gain extra Total DMG +10%.", 
  },
  starbenares:{
    name: 'Benares: Ice', 
      mechanics: 'First wave has creepers with paralyze trauma. When Astral Ring is not activated, Total DMG +20%', 
      weakness: 'Ice (H), Phy (H)', 
      typeicon: "images/type/IconNULL.png", 
      bosspic: "images/Bosses/Benares.webp", 
      weather: "Starless: Gain Total DMG +15%, effect is disabled during Stellar Outburst. When Astral Ring is not activated, Total DMG +30%.", 
  },
  starrimestar:{
    name: 'Herrscher of the Rimestar', 
      mechanics: '', 
      weakness: '', 
      typeicon: "images/type/IconPSI.png", 
      bosspic: "images/Bosses/Herrscher of Rimestar.png", 
      weather: "Starless: Gain Total DMG +15%, effect is disabled during Stellar Outburst. When Astral Ring is not activated, Total DMG +30%.", 
  },
  starandrius:{
    name: 'Dominator of Wolves', 
      mechanics: 'When AR is not activated, Total DMG +20%. Summons BIO mobs periodically. Transition phase requires a valk with melee atk to parry the attack three times. Phase 2 has a shield.', 
      weakness: 'Immune to Ice DMG', 
      typeicon: "images/type/IconBIO.png", 
      bosspic: "images/Bosses/Dominator of Wolves.webp", 
      weather: "Starless: Gain Total DMG +15%, effect is disabled during Stellar Outburst. When Astral Ring is not activated, Total DMG +30%.", 
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
      typeicon: "images/type/IconNULL.png", 
      bosspic: "images/Bosses/Pishacha.webp", 
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
    mechanics: "Has three Qua shields. Transition phase drains all your sp. Evade Vita's attacks and catch the falling energy orbs to regain lost sp. Also gain dmg buff.", 
    weakness: 'None', 
    typeicon: "images/type/IconQUA.png", 
    bosspic: "images/Bosses/Vita.png", 
    weather: "Echoing: For every character in the team with Domain Resonance attribute, team Total DMG +5%. When AR World Star is activated, team Total DMG +30%.", 
  },
  meleehoc: {
    name: 'Herrscher of Corruption', 
    mechanics: 'Transition phase has high hitcount hp', 
    weakness: 'None', 
    typeicon: "images/type/IconPSI.png", 
    bosspic: "images/Bosses/Herrscher of Corruption.webp", 
    weather: "Scrappy: Enemies take 50% more Total DMG from Melee ATK, and take 50% less Total DMG from Ranged ATK", 
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

    videos: [
        { url: 'https://www.youtube.com/embed/Vryx1NK94nw', abyss: 'RedLotus 480D', uploader: 'Marisa Honkai' },
        { url: 'https://www.youtube.com/embed/Vryx1NK94nw', abyss: 'RedLotus 480D', uploader: 'Marisa Honkai' },
        { url: 'https://www.youtube.com/embed/Vryx1NK94nw', abyss: 'RedLotus 480D', uploader: 'Marisa Honkai' },
      ], 

  },

  
  typekasumi: {
    teamDataSets: [
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
    ],},],
    videos: [
      { url: 'https://www.youtube.com/embed/Vryx1NK94nw', abyss: 'RedLotus 480D', uploader: 'Marisa Honkai' },
      { url: 'https://www.youtube.com/embed/Vryx1NK94nw', abyss: 'RedLotus 480D', uploader: 'Marisa Honkai' },
      { url: 'https://www.youtube.com/embed/Vryx1NK94nw', abyss: 'RedLotus 480D', uploader: 'Marisa Honkai' },
    ] 
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
    ]},] 
  },
  
  imgflower: {
    teamDataSets: [
    {
      tabname: "v7.8",
      teamInfoText: "Data is from v7.8 CN Server (PC) Top 100 Myriad ??? D.",
    entries: [
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Kiana Herrscher of Finality.png", "images/valkportrait/Mei Herrscher of Origin.png", "images/valkportrait/Bronya Herrscher of Truth.png"],
        pct: '100%',
      },
    ]},]
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
    ]},],
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
      { url: 'https://www.youtube.com/embed/Vryx1NK94nw', abyss: 'RedLotus 480D', uploader: 'Marisa Honkai' },
      { url: 'https://www.youtube.com/embed/Vryx1NK94nw', abyss: 'RedLotus 480D', uploader: 'Marisa Honkai' },
      { url: 'https://www.youtube.com/embed/Vryx1NK94nw', abyss: 'RedLotus 480D', uploader: 'Marisa Honkai' },
    ]
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
      tabname: "v7.8",
      teamInfoText: "Data is from v7.8 CN Server (PC) Top 100 Myriad ??? D.",
    entries: [
      {
        type: 'lineup',
        lineup: ["images/valkportrait/Fu Hua Fenghuang of Vicissitude.png", "images/valkportrait/Bronya Herrscher of Truth.png", "images/valkportrait/Chrono Navi.png", "images/valkportrait/elf_kiana.png"],
        pct: '100%',
      }
    ]},],
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
    ]},]
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
    ]},]
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
    ]},]
  },
  bleedhos: {
    teamDataSets: [
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
}