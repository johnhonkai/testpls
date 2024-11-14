
export const initialar = [
    {
        rank: "S",
        ar: 50,

        maxStack:1,
    },

    {
        rank: "S",
        ar: 25,
        condition: { valk: "Deepspace Anchor: First Light" },
        maxStack:1,
    },
];


export const postsoar = [

    {
        rank: "SS",
        condition: { tag: "Domain Resonance"},
        ar: 10,
        maxStack: 3,
    },

];

export const extraregen = [

    {
        rank: "S",
        description: "When weapon skill hits, gain 2 AR. (CD:15s, separate cd for each character)",
    },
    
];


export const valkbuffs = [
    
    {
        rank: "S",
        description: "During Stellar Outburst, Shadow-plagued enemies take 30% more Elemental DMG.",
        available_by_default: "yes",

        soeletaken:30,

    },

    {
        rank: "S",
        description: "During AR Charging state, enemies take 15% more Elemental DMG.",
        available_by_default: "yes",

        aceletaken:15,

    },

    {
        rank: "SS",
        description: "Take 15% less dmg. Upon entering Stellar Outburst, recover 1000 HP.",
        available_by_default: "yes",

    },

    {
        rank: "SS",
        description: "When you deal Resonance DMG, gain 2 sp, CD: 3s",
        available_by_default: "yes",

    },


    {
        rank: "SSS",
        description: "During Stellar Outburst, Resonance Total DMG +20%.",
        available_by_default: "no",
        condition: { astralRing: "World Star" },
        resotdm:20,
    },

    {
        rank: "SSS",
        description: "During Stellar Outburst, enemies take 5% more Lightning DMG.",
        available_by_default: "yes",
        solightningtaken: 5,
    },

];


export const asopbuffs = [
    {
        rank: "S", 
        available_by_default: "yes",

        description: "Synergy ATK pulls enemies, deal {value}% ATK of Lightning DMG, and inflict 6 Paralyze trauma. Resets switch cd and trigger QTE.",
        condition: { valk: "Deepspace Anchor: First Light" },
        maxStack: 1,
        basevalue: "3000",
        maxvalue: "3500",
        },
        {
        rank: "SSS", 
        available_by_default: "yes",

        description: " Songque's Lightning DMG +200%. When a Shadow Plagued enemy takes Elemental DMG from a character, the character deals additional 800% ATK of Lightning DMG to it. CD per enemy: 5s.",

        },

];
