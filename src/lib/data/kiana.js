
export const initialar = [
    {
        rank: "S",
        ar: 40,
        maxStack:1,
    },

    {
        rank: "SS",
        ar: 5,
        maxStack:1,
    },

];


export const postsoar = [


];

export const extraregen = [

    
];

export const valkbuffs = [
    {
    rank: "S",
    description: "During Stellar Outburst, Fire and Lightning DMG +12% to inflammable or conductive enemies, and enemies take 12% more Elemental DMG.",
    available_by_default: "yes",
    sofire:12,
    solightning:12,
    soeletaken:12,

    },
    {
    rank: "S",
    description: "Synergy ATK grants Team Elemental DMG +10% for 12s, duration refreshes when Synergy ATK launches again (either through premature detonation or in 7 seconds after first Synergy ATK).",
    available_by_default: "yes",
    soele:10,

    },
    {
    rank: "S",
    description: "Team Fire and Lightning DMG +4%.",
    available_by_default: "yes",
    fire:4,
    lightning:4,
    },    

    {
    rank: "SS",
    description: "During Stellar Outburst, enemies take 8% more Fire and Lightning DMG.",
    available_by_default: "yes",
    sofiretaken:8,
    solightningtaken:8,
    },

    {
        rank: "SSS",
        available_by_default: "no",
        description: "When the team has members of different elements, team Total DMG +8%.",
        tdm: 8,
        condition: { element: "different" },  

    },

];


export const asopbuffs = [

    {
        rank: "S",
        available_by_default: "yes",
        description: "Synergy ATK deals 1200% + 1500% ATK of Fire / Lightning DMG.",


    },
    {
        rank: "S",
        available_by_default: "yes",
        description: "Kiana's Total DMG +30%. When leader is a Fire DMG dealer, Kiana's Fire DMG +30%. When the leader is a Lightning DMG dealer, Kiana's Lightning DMG +30%.",


    },
    {
        rank: "SSS",
        available_by_default: "yes",
        description: "Kiana's Elemental DMG +100%. Synergy ATK Total DMG +45%.",


    },
    {
        rank: "SSS",
        available_by_default: "no",
        description: "When the team has members of different elements, AstralOp Total DMG +8%",
        condition: { element: "different" },  


    },
     
];
