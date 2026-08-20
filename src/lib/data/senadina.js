
export const initialar = [

    {
        rank: "S",
        ar: 50,

        maxStack:1,
    },



    {
        rank: "S",
        description: "If all 3 team members have the Harmonized Shadow Star trait, initial Astral Ring Intensity increases by 18. ",
        activation: { astralRing: "Wheel of Destiny"},
        condition: { tag: "Harmonized Shadow Star"},
        ar: 18,
        maxStack: 1,

    }, 

    {
        rank: "SS",
        description: "For every Team Member with the Harmonized Shadow Star trait, initial Astral Ring Intensity increases by 4.",
        activation: { astralRing: "Wheel of Destiny"},
        condition: { tag: "Harmonized Shadow Star"},
        ar: 4,
        maxStack: 3,
        value1_1: "4", value1_2: "8", value1_3: "12",

    },  

    {
        rank: "S",
        description: "While Rite of Oblivion is active and when at least 2 team members has the Omniscient Star trait, initial Astral Ring Intensity increases by 27.",
        condition: { astralRing: "Rite of Oblivion"},
        ar: 27,

    },  
];

export const surplusar = [
    {
        rank: "S",
        description: "While Wheel of Destiny is active, the character regains 12 Astral Ring Intensity by summoning a Phantom to attack; This can be triggered up to 1 / 2 times per Stellar Surplus / Stellar Outburst.",
        activation: { surplus : true },
        condition: { astralRing: "Wheel of Destiny"},

        ar: 12,
    },

    {
        rank: "SS",
        description: "During Stellar Surplus State: When a Phantom launch a support attack, regains an additional 5 Astral Ring Intensity (can only be triggered once per battle).",
        activation: { surplus : true },
        condition: { astralRing: "Wheel of Destiny"},

        ar: 5,
    },    
];

export const postsoar = [

    {
        rank: "S",
        description: "After entering Stellar Outburst State, Surplus Intensity is converted into Astral Ring Intensity by 50%, capped at 10 Astral Ring Intensity.",
        activation: { surplus : true },        
        condition: { astralRing: "Wheel of Destiny"},
        ar: 10,
    },

    {
        rank: "S",
        description: "While Wheel of Destiny is active, the character regains 12 Astral Ring Intensity by summoning a Phantom to attack; This can be triggered up to 1 / 2 times per Stellar Surplus / Stellar Outburst.",
        condition: { astralRing: "Wheel of Destiny"},
        ar: 24,
    },

    {
        rank: "SS",
        description: "When Stellar Outburst ends, restores 36 Astral Ring Intensity.",
        condition: { astralRing: "Rite of Oblivion"},
        ar: 36,
    }, 
    
    {
        rank: "SSS",
        description: "If Stellar Surplus is activated, after entering Stellar Outburst State, the conversion limit of Surplus Intensity increases to 15 points.",
        activation: { surplus : true },        
        condition: { astralRing: "Wheel of Destiny"},
        ar: 5,
    },
    
];

export const extraregen = [

    {
        rank: "S",
        description: "Max Surplus Intensity +100%",
        activation: { surplus : true },
        condition: { astralRing: "Wheel of Destiny"},

    },

    {
        rank: "SS",
        description: "If leader has no skill to end Stellar Outburst: After ending SO early, restore 25% AR of remaining SO duration.",
        activation: { endsoearly : false },
        condition: { astralRing: "Wheel of Destiny"},

    },     
];

export const specialbuff = [
    
];


export const valkbuffs = [
    
    {
        rank: "S",
        description: "When entering battle or Stellar Outburst State, all team members gain Crit Conversation State. When the character attacks with less than 100% Crit Rate, converts 2% of Crit DMG to 1% Crit Rate until Crit Rate reaches 100% or 75% of Crit DMG has been converted. If Crit Rate still has not reached 100% upon reaching the conversion limit, forcibly increased to 100% Crit Rate.",
        available_by_default: "no",
        condition: { astralRing: "Wheel of Destiny"},
        crate: 100,

    }, 

    {
        rank: "S",
        description: "During Astral Ring Charging State: All Team Members deals 10% more Physical DMG, and 10.0% more Fire DMG.",
        available_by_default: "no",
        condition: { astralRing: "Wheel of Destiny"},
        acphy: 10,
        acfire: 10,

    }, 

    {
        rank: "S",
        description: "During Stellar Outburst State: Combo ATKs from all Team Members deal 9% more Total DMG. Enemies on the field take 35% more Physical DMG and 12% more Fire DMG.",
        available_by_default: "no",
        condition: { astralRing: "Wheel of Destiny"},
        sotdm: 9,
        sophytaken: 35,
        sofiretaken: 12,

    }, 

    {
        rank: "S",
        description: "All Team Members deal 20% more Total DMG and 25% more Elemental DMG.",
        available_by_default: "no",
        condition: { astralRing: "Rite of Oblivion"},
        tdm: 20,
        ele: 20,

    }, 

    {
        rank: "S",
        description: "In Stellar Outburst State, all Team Members deal 15% more Fire DMG and 5% more Lightning DMG, and all enemies present on the field take 12% more Elemental DMG.",
        available_by_default: "no",
        condition: { astralRing: "Rite of Oblivion"},
        sofire: 15,
        solightning: 5,
        soeletaken: 12,

    }, 
    {
        rank: "SS",
        description: "If the leader can end Stellar Outburst early: After leader has summoned 2 Phantoms to attack during Stellar Outburst, the leader's Ultimate deals 20.0% more Elemental DMG and 16.0% more Physical DMG.",
        activation: { endsoearly : true },
        condition: { astralRing: "Wheel of Destiny"},
        ultele: 20,
        ultphy: 16,
    },  

    {
        rank: "SS",
        description: "If Stellar Surplus is activated, after entering Stellar Outburst State: If the character has <10 Surplus Intensity, all Team Members deal 10% more Total DMG until Stellar Outburst State ends.",
        condition: { astralRing: "Wheel of Destiny"},
        activation: { surplus : true },        
        sotdm: 10,
    }, 

    {
        rank: "SSS",
        description: "If the duration of this Stellar Outburst is ≥12s: In Astral Ring Charging State, all Team Member's Ultimate deals 6% more Total DMG (removed this effect when entering Stellar Outburst State).",
        condition: { astralRing: "Wheel of Destiny"},
        ulttdm: 6,
    },    
    
    {
        rank: "S",
        description: "During Stellar Surplus State: If a Phantom launched a support attack, on the next Stellar Outburst State: All enemies present on the field take 6.0% more Elemental DMG and 6.0% more Physical DMG.",
        available_by_default: "no",
        activation: { surplus : true },
        condition: { astralRing: "Wheel of Destiny"},
        soeletaken: 6,
        sophytaken: 6,

    }, 
    {
        rank: "S",
        description: "For every Team Member with the Harmonized Shadow Star trait, enemies on the field take 8.0% more Total DMG.",
        available_by_default: "no",
        condition: { tag: "Harmonized Shadow Star"},
        activation: { astralRing: "Wheel of Destiny"},

        maxStack: 3,
        value1_1: "8", value1_2: "16", value1_3: "24",
        bufftype1: "tdmtaken",        

    },     
     {
        rank: "S",
        description: "Each time an enemy is Frozen, Paralyzed, or Ignited, the corresponding Ice, Lightning, or Fire DMG taken by that enemy increases by 10% / 10% / 10% respectively for 15s, can be refreshed. ",
        available_by_default: "yes",


        icetaken: 10,
        firetaken: 10,
        lightningtaken: 10,       

    },   
    
    {
        rank: "SS",
        description: "Upon entering Stellar Outburst State, if Surplus Intensity reaches =40, the Team Leader deals 8.0% more Total DMG until Stellar Outburst State ends.",
        available_by_default: "no",
        activation: { surplus : true },
        condition: { astralRing: "Wheel of Destiny"},
        sotdm: 8,

    },    
    
    {
        rank: "SS",
        description: "If all 3 Team Members have the Harmonized Shadow Star trait, the Team Leader deals 5% more Physical DMG and 4.5% more Elemental DMG during Stellar Outburst State.",
        available_by_default: "no",
        activation: { surplus : true },
        condition: { astralRing: "Wheel of Destiny"},
        sophy: 5,
        soele: 4.5,

    },     

    {
        rank: "SS",
        description: "Each time a Phantom launch a support attack, enemies on the field take 4.0% more Total DMG from the Team Leader (removed this effect when exiting Stellar Outburst State). In Stellar Outburst State, this effect can stack up to 2 times.",
        available_by_default: "no",
        activation: { surplus : true },
        condition: { astralRing: "Wheel of Destiny"},
        soeletaken: 8,
        surplustdmtaken: 4,
    },     
    
    {
        rank: "SS",
        description: "With Rite of Oblivion activated: When at least 2 team members has the Omniscient Star trait: During Stellar Outburst State, enemies on the field take 10% more Total DMG, 12% more Fire DMG and 5% more Lightning DMG.",
        available_by_default: "no",
        condition: { astralRing: "Rite of Oblivion"},
        sotdmtaken: 10,
        sofiretaken: 12,
        solightningtaken: 5,

    },     

    {
        rank: "SSS",
        description: "With Wheel of Destiny activated: Enemies on the field take 10.0% more Total DMG from Shadow Star ATK",
        available_by_default: "no",
        condition: { astralRing: "Wheel of Destiny"},
        shadowtdmtaken: 10,

    },   
    
    {
        rank: "SSS",
        description: "In Stellar Surplus State, enemies present on the field take 9.0% more Total DMG from the Team Leader.",
        available_by_default: "no",
        activation: { surplus : true },
        condition: { astralRing: "Wheel of Destiny"},
        surplustdmtaken: 9,

    },     
];


export const asopbuffs = [
     {
        rank: "SSS",
        description: "With Wheel of Destiny activated: Phantom support attacks launched by the on-field character deals an additional 400.0% ATK of Adaptive DMG.",
        available_by_default: "no",
        condition: { astralRing: "Wheel of Destiny"},
    },     
      
];
