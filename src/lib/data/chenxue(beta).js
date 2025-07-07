
export const initialar = [

    {
        rank: "S",
        ar: 50,

        maxStack:1,
    },
    
    {
        rank: "S",
        description: "For every team member with AR Grail of Infinitude or Rite of Oblivion, initial AR +11. For every character with Symbiosis or Omniscient Star trait, initial AR +8. Each character can only be counted once.",

        condition_or: { tag: ["Rite of Oblivion", "Grail of Infinitude"] },

        ar: 3,
        maxStack: 3,

        value1_1: "3", value1_2: "6", value1_3: "9",
    },
  

        {
        rank: "S",
        description: "For every team member with AR Grail of Infinitude or Rite of Oblivion, initial AR +11. For every character with Symbiosis or Omniscient Star trait, initial AR +8. Each character can only be counted once.",
        condition_or: { tag: ["Symbiosis", "Omniscient Star"] },

        ar: 8,
        maxStack: 3,

        value1_1: "8", value1_2: "16", value1_3: "24",
    },    


];


export const postsoar = [

    {
        rank: "SS",
        description: "When Rite of Oblivion is activated: When SO ends, restore 36 AR.",

        condition: { astralRing: "Rite of Oblivion"},
        ar: 36,
        maxStack:1,

    },

      {
        rank: "SS",
        description: "",

        condition: { astralRing: "Grail of Infinitude"},
        ar: 30,
        maxStack:1,

    },  
];

export const extraregen = [

];

export const specialbuff = [
    {
    rank: "S",
    description: "After activating Stellar Outburst: The leader can use Stellar Shift one more time.",
    available_by_default: "no",
    condition: { astralRing: "Law of Ascension"},
    },

    {
        rank: "S",
        description: "HP Loss DMG inflicted by the leader is increased by 6%.",
        available_by_default: "no",
        condition: { astralRing: "Law of Ascension"},
    },
    
];


export const valkbuffs = [
    

    {
        rank: "S",
        description: "During AR Charging: Enemies take 8% more Elemental DMG, 5% more Physical DMG. During SO: Enemies take 22% more Elemental DMG, 12% more Physical DMG.",
        available_by_default: "yes",

        aceletaken:8,
        acphytaken:5,
        soeletaken: 22,
        sophytaken: 12,
    },

    {
        rank: "S",
        description: "When AR Grail of Infinitude is activated: Team Elemental DMG +8%, Physical DMG +4%, Crit Rate +25%.",
        available_by_default: "no",
        condition: { astralRing: "Grail of Infinitude"},
        ele: 8,
        phy: 4,
        crate:25,
    },

    {
        rank: "S",
        description: "When AR Rite of Oblivion is activated: Team Elemental DMG +18%, Physical DMG +8%, Crit Rate +25%. During SO: Team Lightning DMG +6%.",
        available_by_default: "no",
        condition: { astralRing: "Rite of Oblivion"},
        ele: 18,
        phy: 8,
        crate:25,
        solightning: 6,
    },

    {
        rank: "S",
        available_by_default: "no",
        condition: { astralRing:"Grail of Infinitude"},
        description: "When AR Grail of Infinitude is activated: When activating or exiting SO, reduce the team’s switch cooldown by 8s and trigger team QTE. During SO: When a valk casts Ult for the first time, gain additional 300 Shimmering Trace and 120 sp.",
    },  
        {
        rank: "SS",
        description: "For every team member with Symbiosis or Omniscient Star tag, enemies take 1.5% more Total DMG. ( Current Buff: TDM Taken +{value1}% )",
        available_by_default: "yes",

       condition_or: { tag: ["Symbiosis" , "Omniscient Star"]},

        maxStack: 3,
        value1_1: "1.5", value1_2: "3", value1_3: "4.5",
        bufftype1: "tdmtaken",
    },

     {
        rank: "SS",
        available_by_default: "yes",
        description: "Stellar Outburst cd -4s (cannot stack, highest value will take effect).",
    },    

    {
        rank: "SSS",
        description: "Enemies take 6% more Total DMG from Ult.",
        available_by_default: "yes",
        condtdmtaken:6,
    },

     

    {
        rank: "SSS",
        available_by_default: "no",
        condition_or: { astralRing: ["Rite of Oblivion" , "Grail of Infinitude"]},
        description: "When Rite of Oblivion or Grail of Infinitude is activated: When SO ends, based on the remaining SO duration, reduce the current SO cd by 35% of the remaining proportion, up to 4.5s.",
    },  

];


export const asopbuffs = [
     {
        rank: "S",
        available_by_default: "yes",
        description: "Unleash Synergy ATK, pull enemies and deal 2500% ATK of Fire DMG. When PAWS and Dragoon Coralie are both in the team, Synergy ATK deals additional 1200% ATK of Fire DMG.",
    },   
];
