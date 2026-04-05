
export const initialar = [

    {
        rank: "S",
        ar: 50,

        maxStack:1,
    },

    {
        rank: "S",
        description: "When Stellar Surplus is activated: When Wheel of Destiny or World Star is active: Gain additional initial 10.0 Astral Ring Intensity.",
        activation: { surplus : true },
        condition_or: { astralRing: ["Wheel of Destiny", "World Star"] },

        ar: 10,
        maxStack: 1,

    },   

    {
        rank: "SS",
        description: "When World Star is active: For every team member with Domain Resonance trait, initial AR +10",
        activation: { astralRing: "World Star"},
        condition: { tag: "Domain Resonance"},

        ar: 10,
        maxStack: 3,

        value1_1: "10", value1_2: "20", value1_3: "30",
    },

    {
        rank: "SS",
        description: "When Wheel of Destiny is active: For every team member with Harmonized Shadow Star trait, initial AR +5",
        activation: { astralRing: "Wheel of Destiny"},
        condition: { tag: "Harmonized Shadow Star"},

        ar: 5,
        maxStack: 3,

        value1_1: "5", value1_2: "10", value1_3: "15",
    },

];

export const surplusar = [

    {
        rank: "S",
        description: "When World Star is active: When any Team Member casts Resonance Attacks, restores 5.0 Astral Ring Intensity. This can be triggered up to 1 / 6 per Stellar Surplus State / Stellar Outburst State.",
        activation: { surplus : true },
        condition: { astralRing: "World Star" },

        ar: 5,
    },

    {
        rank: "S",
        description: "When Wheel of Destiny is active: When a Phantom performs Shadow Star Attack, restores 10.0 Astral Ring Intensity. This effect can be triggered up to 1 / 2 times per Stellar Surplus State / Stellar Outburst State.",
        activation: { surplus : true },
        condition: { astralRing: "Wheel of Destiny" },

        ar: 5,
    },    
];

export const postsoar = [
    {
        rank: "S",
        description: "When Stellar Surplus is activated: When Wheel of Destiny or World Star is active: When entering Stellar Outburst State, 50.0% of Surplus Intensity is converted to Astral Ring Intensity, up to 10.0 Astral Ring Intensity.",
        activation: { surplus : true },
        condition: { astralRing: "Wheel of Destiny" },

        ar: 10,
        maxStack: 1,

    },   

    {
        rank: "S",
        description: "When Stellar Surplus is activated: When Wheel of Destiny or World Star is active: When entering Stellar Outburst State, 50.0% of Surplus Intensity is converted to Astral Ring Intensity, up to 10.0 Astral Ring Intensity.",
        activation: { surplus : true },
        condition: { astralRing: "World Star" },

        ar: 10,
        maxStack: 1,

    },     

    {
        rank: "S",
        description: "When World Star is active: When any Team Member casts Resonance Attacks, restores 5.0 Astral Ring Intensity. This can be triggered up to 1 / 6 per Stellar Surplus State / Stellar Outburst State.",

        condition: { astralRing: "World Star"},
        ar: 30,
        maxStack:1,

    },

    {
        rank: "S",
        description: "When Wheel of Destiny is active: When a Phantom performs Shadow Star Attack, restores 10.0 Astral Ring Intensity. This effect can be triggered up to 1 / 2 times per Stellar Surplus State / Stellar Outburst State.",
        condition: { astralRing: "Wheel of Destiny"},
        ar: 20,
        maxStack:1,

    },

    {
        rank: "SS",
        description: "When any Team Members emptied their Quantum Mech Energy V3: and Domain Resonance Mark is present on the field, then when the next Team Member triggers a Resonance Skill for the first time, Youyun will fire one Artillery Shot: restoring 3.0 Astral Ring Intensity",

        condition: { astralRing: "World Star"},
        ar: 6,
    },

    {
        rank: "SS",
        description: "When World Star is active: If the Team Leader has no skill to end Stellar Outburst: When the Team Leader's Quantum Mech Energy is emptied: Casting their Ultimate will end Stellar Outburst State. For each remaining trigger counts from the Team Leader's Domain Resonance Mark, restores 1.0 Astral Ring Intensity.",
        activation: { endsoearly : false },
        condition: { astralRing: "World Star"},
        ar: 12,
        maxStack:1,

    },

    {
        rank: "SSS",
        description: "During Stellar Outburst State: After any 2 Team Members' Quantum Mech Energy is emptied, sends all Team members into Intensity Recovery State for 3s once Stellar Outburst ends.",
        condition: { astralRing: "World Star"},
        ar: 6,

    },

    {
        rank: "SSS",
        description: "In Stellar Surplus State: After entering Stellar Outburst State, max limit of Stellar Intensity that can be converted to Astral Ring Intensity is increased to 15.0.",
        activation: { surplus : true },
        condition: { astralRing: "World Star"},

        ar: 5,
        maxStack: 1,

    },        
];

export const extraregen = [
    {
        rank: "S",
        description: "Max Surplus Intensity +50%",
        activation: { surplus : true },
        condition: { astralRing: "World Star"},

    },
];

export const specialbuff = [

    
];


export const valkbuffs = [
    



    {
        rank: "S",
        description: "In Astral Ring Charging State: All Team Members deals 15.0% more Total DMG, 12.0% more Elemental DMG, and 8.0% more Physical DMG.",
        available_by_default: "yes",
        actdm: 15,
        acele: 12,
        acphy: 8,
    },

    {
        rank: "S",
        description: "When World Star or Wheel of Destiny is active: During Stellar Outburst State: Enemies on the field take 20.0% more Elemental DMG, 10.0% more Physical DMG, and an additional 5.0% more Lighting DMG from all Team Members. ",
        available_by_default: "no",
        condition: { astralRing: "World Star"},
        soeletaken: 20,
        sophytaken: 10,
        solightningtaken: 5,
    },

    {
        rank: "S",
        description: "When World Star or Wheel of Destiny is active: During Stellar Outburst State: Enemies on the field take 20.0% more Elemental DMG, 10.0% more Physical DMG, and an additional 5.0% more Lighting DMG from all Team Members. ",
        available_by_default: "no",
        condition: { astralRing: "Wheel of Destiny"},
        soeletaken: 20,
        sophytaken: 10,
        solightningtaken: 5,
    },

    {
        rank: "S",
        description: "During Stellar Surplus State: When Wheel of Destiny is active: when a Phantom performed Shadow Star Attack, all enemies on the field take 6.0% more Total DMG in the next Stellar Outburst State.",
        available_by_default: "no",
        activation: { surplus : true },
        condition: { astralRing: "Wheel of Destiny"},
        sotdmtaken:6,
    },

    {
        rank: "S",
        description: "During Stellar Surplus State: When World Star is active: when Domain Resonance Mark is triggered for at least 3 times, all enemies on the field take 6.0% more Total DMG in the next Stellar Outburst State.",
        available_by_default: "no",
        activation: { surplus : true },
        condition: { astralRing: "World Star"},
        sotdmtaken:6,
    },    

    {
        rank: "S",
        description: "When World Star is active: All Team Members gain 30.0% more Crit Rate, and for every 1.0% excess Crit Rate, increases Crit DMG by 1.0%. Crit Rate cannot exceed 115.0%.",
        available_by_default: "no",
        condition: { astralRing: "World Star"},
        crate: 30,
        critdmg: 15,

    }, 

    {
        rank: "S",
        description: "When World Star is active: For every Team Member with Domain Resonance Trait, all enemies on the field take 3.0% more Total DMG; If Stellar Surplus State is activated, all enemies on the field take an additional 3.0% Total DMG.",
        available_by_default: "no",
        activation: { astralRing: "World Star"},
        condition: { tag: "Domain Resonance"},

        maxStack: 3,
        value1_1: "3", value1_2: "6", value1_3: "9",
        value2_1: "3", value2_2: "6", value2_3: "9",

        bufftype1: "tdmtaken",
        bufftype2: "surplustdmtaken",

    }, 

    {
        rank: "S",
        description: "When Wheel of Destiny is active: For every Team Member with Harmonized Shadow Star Trait, all enemies on the field take 3.0% more Total DMG; If Stellar Surplus State is activated, all enemies on the field take an additional 3.0% Total DMG.",
        available_by_default: "no",
        activation: { astralRing: "Wheel of Destiny"},
        condition: { tag: "Harmonized Shadow Star"},

        maxStack: 3,
        value1_1: "3", value1_2: "6", value1_3: "9",
        value2_1: "3", value2_2: "6", value2_3: "9",

        bufftype1: "tdmtaken",
        bufftype2: "surplustdmtaken",

    },   

        {
        rank: "SS",
        description: "When World Star is active: If the Team Leader have skill to end Stellar Outburst: Team Leader's Ultimate deals additional 20.0% Elemental DMG and 20.0% Physical DMG.",
        available_by_default: "no",
        
        activation: { endsoearly : true },
        condition: { astralRing: "World Star"},
        ultele: 20,
        ultphy: 20,
    },

        {
        rank: "SS",
        description: "When World Star is active: During SO, If valk has no skill to end SO early, the valk can now end SO early by casting Ult.",
        available_by_default: "no",
        
        activation: { endsoearly : false },
        condition: { astralRing: "World Star"},

    },

    {
        rank: "SSS",
        description: "During Stellar Surplus State: Enemies on the field take 15.0% more Total DMG from all Team Members.",
        available_by_default: "yes",
        activation: { surplus : true },

        surplustdmtaken: 15,

    },

];


export const asopbuffs = [
     {
        rank: "S",
        description: "When World Star is active: Deals 2000.0% ATK of Lightning DMG, restoring 3.0 Astral Ring Intensity and triggering 1 Resonance Skill without consuming any Domain Resonance Mark.",
        available_by_default: "no",
        condition: { astralRing: "World Star" },
    },     
    

     {
        rank: "SSS",
        available_by_default: "no",
        description: "When World Star is active and during Stellar Surplus State: When the Team Leader leaves Domain Resonance Mark on the field, and they trigger Resonance Skill for the first time, Youyun will fire one Artillery Shot. Youyun can fire Artillery Shot once per Stellar Surplus State. ",
        condition: { astralRing: "World Star" },
   
    },   

     {
        rank: "SSS",
        available_by_default: "yes",
        description: "Youyun's ATK is increased by 300.0%, and she deals 300.0% more Lightning DMG. Both herself and her Resonance Skill deals 60.0% more DMG.",
    }, 
      
];
