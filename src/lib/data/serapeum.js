
export const initialar = [

    {
        rank: "S",
        ar: 50,

        maxStack:1,
    },
    
    {
        rank: "SS",
        condition: { tag: "Harmonized Shadow Star"},

        ar: 8,
        maxStack: 3,
    },

];


export const postsoar = [

    {
        rank: "S",
        condition: { astralRing: "Wheel of Destiny"},
        ar: 28,
        maxStack:1,

    },
    
    {
        rank: "S",
        condition: { astralRing: "World Star"},
        ar: 22.5,
        maxStack:1,
    },
];

export const extraregen = [

    
];



export const valkbuffs = [
    

    {
        rank: "S",
        description: "During Stellar Outburst, enemies take 18% more Physical DMG, and take 12% more Elemental DMG.",
        available_by_default: "yes",

        sophytaken: 18,
        soeletaken:12,

    },



    {
        rank: "S",
        description: "Team Crit DMG +{value}%",
        available_by_default: "no",
        condition: { astralRing: "Wheel of Destiny"},
        basevalue: "18", 
        maxvalue: "26",

        bufftype: "critdmg",
    },

    {
        rank: "S",
        available_by_default: "no",

        description: "Team Total DMG +8%",
        condition: { astralRing: "Wheel of Destiny"},

        tdm:8

    },

    {
        rank: "S",
        available_by_default: "no",

        description: "Valk enters Crit DMG Overflow state: When an attack's Crit Rate <100%, 2.5% of Crit DMG is converted to 1% Crit Rate, until it reaches 100%, convert up to 75% Crit DMG.",
        condition: { astralRing: "Wheel of Destiny"},

        crate: 30,
    },

    {
        rank: "S",
        available_by_default: "no",

        description: "During AR Charging, when AR meter is full, the current Stellar Outburst cd will be reduced by 2.5 seconds, only takes effect once for every AR Charging state.",
        condition: { astralRing: "Wheel of Destiny"},
    },

    {
        rank: "S",
        available_by_default: "yes",

        description: "When valk HP <50%, recover 1600 HP, cd 15s."
    },

    {
        rank: "SS",
        available_by_default: "no",

        description: "For every team member with Harmonized Shadow Star tag, enemies take 5.5% more Elemental DMG, and 2.5% more Physical DMG. (Current Buff: Ele Taken +{value1}% and Phy Taken +{value2}%)",
        condition: { tag: "Harmonized Shadow Star"},
        maxStack: 3,
        value1_1: "5.5", value1_2: "11", value1_3: "16.5",
        value2_1: "2.5", value2_2: "5", value2_3: "7.5",

        bufftype1: "eletaken",
        bufftype2: "phytaken",
    },

    {
        rank: "SSS",
        available_by_default: "no",

        description: "Enemies take 24% more Total DMG from Shadow Star ATK.",
        condition: { astralRing: "Wheel of Destiny"},

        shadowtdmtaken: 24,
    },

    {
        rank: "SSS",
        description: "Valk on the field will restore 1 SP per second during Rondo in the Shadows state.",
        available_by_default: "no",
        condition: { astralRing: "Wheel of Destiny"}
    },

];


export const asopbuffs = [
    {
        rank: "S", 
        available_by_default: "yes",

        description: "Synergy ATK deal {value}% ATK of Physical DMG. Resets switch cd and trigger QTE.",
        condition: { valk: "Jovial Deception: Shadowdimmer" },
        maxStack: 1,
        basevalue: "1500",
        maxvalue: "2500",
        },
    
        {
            rank: "S",
            available_by_default: "yes",

            description: "Sera's Physical DMG +100%. Assist atk inflict 3 points of stun trauma.",
        },
    
        {
            rank: "SS",
            available_by_default: "no",

            description: "Sera's Total DMG +{value1}%, Physical Breach +{value2}%.",
            condition: { tag: "Harmonized Shadow Star"},
            maxStack: 3,
            value1_1: "33", value1_2: "66", value1_3: "99",
            value2_1: "16", value2_2: "32", value2_3: "48",
        },
    
        {
            rank: "SSS",
            available_by_default: "no",

            description: "Sera's ATK +100%, and Crit DMG +150%. Assist atk has 100% Crit Rate.",
            condition: { astralRing: "Wheel of Destiny"},

        },
];
