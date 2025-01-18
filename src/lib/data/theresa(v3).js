
export const initialar = [

    {
        rank: "S",
        ar: 50,

        maxStack:1,
    },
    
    {
        rank: "S",
        description: "For every team member with Heavenly Shift Tag, initial AR +8. ( Current: Initial AR +{value1} )",

        condition: { tag: "Heavenly Shift"},

        ar: 8,
        maxStack: 3,

        value1_1: "8", value1_2: "16", value1_3: "24",
    },

];


export const postsoar = [

    {
        rank: "SS",
        description: "Upon casting Synergy ATK, restore 8 AR. ",

        condition: { astralRing: "Law of Ascension"},
        ar: 8,
        maxStack:1,

    },

    {
        rank: "SS",
        description: "Upon casting Judah spear (triggers when you use Stellar Shift), restore 2 AR. CD: 4s.",

        condition: { astralRing: "Law of Ascension"},
        ar: 8,
        maxStack:1,
    },

    {
        rank: "SS",
        description: "Upon casting Synergy ATK, restore 36 AR. ",

        condition: { astralRing: "Rite of Oblivion"},
        ar: 36,
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
        description: "During Stellar Outburst, enemies take 8% more Elemental DMG and 5% more Total DMG.",
        available_by_default: "yes",

        soeletaken:8,
        sotdmtaken:5

    },

    {
        rank: "S",
        description: "When AR Rite of Oblivion is activated: During AR Charging, Team Lightning DMG +35%.",
        available_by_default: "no",
        condition: { astralRing: "Rite of Oblivion"},
        aclightning: 35,
    },

    {
        rank: "S",
        description: "Team Elemental DMG +10%, Crit Rate +27%.",
        available_by_default: "no",
        condition: { astralRing: "Law of Ascension"},
        crate: 27,
        ele: 10,
    },
    
    {
        rank: "S",
        description: "When Law of Ascension is activated: After activating Stellar Outburst, the leader can use Stellar Shift one more time.",
        available_by_default: "no",
        condition: { astralRing: "Law of Ascension"},
        },
    
        {
            rank: "S",
            description: "When Law of Ascension is activated: HP Loss DMG inflicted by the leader is increased by 6%.",
            available_by_default: "no",
            condition: { astralRing: "Law of Ascension"},
        },
    {
        rank: "SS",
        available_by_default: "no",

        description: "When AR Law of Ascension is activated: For every team member with Heavenly Shift tag, enemies take 1.5% more Elemental DMG, and 1.5% more Physical DMG. ( Current Buff: Ele Taken +{value1}% and Phy Taken +{value2}% )",
        activation: { astralRing: "Law of Ascension"},
        condition: {  tag: "Heavenly Shift"},
        maxStack: 3,
        value1_1: "1.5", value1_2: "3", value1_3: "4.5",
        value2_1: "1.5", value2_2: "3", value2_3: "4.5",

        bufftype1: "eletaken",
        bufftype2: "phytaken",
    },

    {
        rank: "SS",
        available_by_default: "no",

        description: "When AR Rite of Oblivion is activated: For every team member with Omniscient Star tag, enemies take 5% more Elemental DMG. ( Current Buff: Ele Taken +{value1}% )",
        activation: { astralRing: "Rite of Oblivion"},
        condition: {  tag: "Omniscient Star"},
        maxStack: 3,
        value1_1: "5", value1_2: "10", value1_3: "15",
        bufftype2: "eletaken",
    },

    {
        rank: "SSS",
        available_by_default: "no",

        description: "When AR Law of Ascension is activated: Enemies take 12% more Total DMG from QTE and Stellar Shift.",
        condition: { astralRing: "Law of Ascension"},

        qtetdmtaken: 12,
    },

    {
        rank: "SSS",
        available_by_default: "no",

        description: "When AR Rite of Oblivion is activated: Enemies take 4.5% more Total DMG.",
        condition: { astralRing: "Rite of Oblivion"},

        tdmtaken: 4.5,
    },

    {
        rank: "SSS",
        available_by_default: "no",

        description: "When a valk uses Stellar Shift, restore 6 SP to everyone, CD: 4s.",
        condition: { astralRing: "Law of Ascension"},
    },

];


export const asopbuffs = [
    {
        rank: "S", 
        available_by_default: "yes",

        description: "Synergy ATK deal {value}% ATK of Lightning DMG.",
        condition: { valk: "Ba-dum! Fiery Wishing Star" },
        maxStack: 1,
        basevalue: "1500",
        maxvalue: "3000",
        },
    
        {
            rank: "S",
            available_by_default: "yes",

            description: " When Stellar Shift hits, Theresa summons a Judah spear, deal 800% ATK of Lightning DMG. Theresa gain Lightning DMG +100%.",
        },
    
        {
            rank: "SS",
            available_by_default: "no",

            description: "For every valk with Heavenly Shift tag, Theresa gain Total DMG +33%. ( Current Buff: TDM +{value1}% )",
            condition: { tag: "Heavenly Shift"},
            maxStack: 3,
            value1_1: "33", value1_2: "66", value1_3: "99"
        },
    
        {
            rank: "SSS",
            available_by_default: "no",

            description: "Theresa's ATK +100%. Assist ATK and Judah spear deal additional 1000% ATK of Lightning DMG.",
            condition: { astralRing: "Law of Ascension"},

        },
];
