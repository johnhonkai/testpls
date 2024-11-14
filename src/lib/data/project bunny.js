
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
        description: "During Stellar Outburst, enemies take +12% more Physical DMG.",
        available_by_default: "yes",
        sophytaken:12,
    },

    {
        rank: "S",
        description: "When any team member deals QTE DMG or uses weapon skill, all team members gain All Out status, Physical DMG +5.5% for 23s.",
        available_by_default: "yes",
        phy:5.5,
    },

    {
            rank: "SS",
            description: "For every Physical DMG dealer on the team, team Physical DMG +1.5%. Current buff: Physical DMG +{value1}%.",
            available_by_default: "no",
            condition: { element: "Physical" },
            value1_1: "1.5", value1_2: "3", value1_3: "4.5",
            bufftype1: "phy",
            maxStack: 3,
    },

    {
        rank: "SS",
        description: "All Out status: Total DMG +6%",
        available_by_default: "yes",
        tdm:6,
},
        
];


export const asopbuffs = [
    {
        rank: "S",
        available_by_default: "yes",
        description: "Synergy ATK deals 3500% ATK of Phyiscal DMG. Pulls enemies, blocks the next incoming attack for the team, then grants invincibility for 0.3s. Entering Stellar Outburst reduces switch CD by 8s.",
    },
    {
        rank: "S",
        available_by_default: "yes",
        description: "When the team leader is a Physical DMG dealer, Bunny's Physical DMG +40% more Physical DMG.",
    },
    {
        rank: "SS",
        available_by_default: "yes",
        description: "Bunny's Total DMG +40%.",
    },
    {
        rank: "SS",
        description: "All Out status: Bunny's Synergy ATK is guaranteed to crit, and gain Crit DMG +30%. Bunny's Total DMG +6%." ,
        available_by_default: "yes",
},
    {
        rank: "SSS",
        available_by_default: "yes",
        description: "Synergy ATK deals additional 2500% ATK of Physical DMG.",
    },

    {
        rank: "SSS",
        available_by_default: "yes",
        description: "All Out: Bunny's Total DMG +40%.",
    },



];
