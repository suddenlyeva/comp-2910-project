// JSON Level Data
let LEVELS = [

    {id: 0, name: "tutorial",

        clearMessage: "an apple a day is one less apple in the trash.",
        wasteLimit: 3,
        maxScore: 300,

        conveyorBelt: {
            items: [APPLE,BLANK,BLANK,BLANK,APPLE,BLANK,BLANK,BLANK,APPLE],
            speed: 1.2
        },

        processors: [
            {
                recipe: [APPLE],
                result: APPLE_SLICE,
                score: 100,
                x: 7*TILES_PX,
                y: 3*TILES_PX
            }
        ],

        finalItems: [APPLE_SLICE]
    },

    {id: 1, name: "apple apple banana",

        clearMessage: "this is a test level. don't try this at home.",
        wasteLimit: 5,
        maxScore: 300,

        conveyorBelt: {
            items: [APPLE, BLANK, APPLE, APPLE, BLANK, APPLE, APPLE, BLANK, BLANK, BLANK, APPLE],
            speed: 1.2
        },

        processors: [
            {
                recipe: [APPLE, APPLE],
                result: BANANA,
                score: 100,
                x: 7*TILES_PX,
                y: 4*TILES_PX
            }
        ],

        finalItems: [BANANA]
    },

    {id: 2, name: "fruit yogurt",

        clearMessage: "yogurt goes well with all kinds of leftover fruit.",
        wasteLimit: 5,
        maxScore: 2100,

        conveyorBelt: {
            items: [ORANGE, BLANK, KIWI, KIWI, BLANK, ORANGE, YOGURT, ORANGE, BLANK, BLANK, KIWI, YOGURT, BLANK, YOGURT],
            speed: 1.5
        },

        processors: [
            {
                recipe: [ORANGE],
                result: ORANGE_SLICE,
                score: 100,
                x: 1*TILES_PX,
                y: 2*TILES_PX
            },
            {
                recipe: [KIWI],
                result: KIWI_SLICE,
                score: 100,
                x: 7*TILES_PX,
                y: 2*TILES_PX
            },
            {
                recipe: [ORANGE_SLICE, KIWI_SLICE, YOGURT],
                result: FRUIT_YOGURT,
                score: 500,
                x: 1*TILES_PX,
                y: 5*TILES_PX
            }
        ],

        finalItems: [FRUIT_YOGURT]
    }
];

// PPAP
let PPAP = {id: 99999, name: "ppap",

    clearMessage: "now go play the actual levels",
    wasteLimit: 5,
    maxScore: 99999,

    conveyorBelt: {
        items: [PEN,BLANK,PINEAPPLE,BLANK,APPLE,BLANK,PEN],
        speed: 1.3
    },

    processors: [
        {
            recipe: [PEN,PINEAPPLE,APPLE,PEN],
            result: PPAP_ITEM,
            score: 99999,
            x: 4*TILES_PX,
            y: 3*TILES_PX
        }
    ],

    finalItems: [PPAP_ITEM]
};

