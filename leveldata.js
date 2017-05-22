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

    {id: 1, name: "apple banana kiwi",

        clearMessage: "this is a test level. don't try this at home.",
        wasteLimit: 5,
        maxScore: 300,

        conveyorBelt: {
            items: [APPLE, BLANK, ORANGE, APPLE, BLANK, ORANGE, APPLE, BLANK, BLANK, BLANK, ORANGE],
            speed: 1.2
        },

        processors: [
            {
                recipe: [APPLE, ORANGE],
                result: KIWI_SLICE,
                score: 100,
                x: 6*TILES_PX,
                y: 4*TILES_PX
            }
        ],

        finalItems: [KIWI_SLICE]
    },

    {id: 2, name: "stage 2",

        clearMessage: "yogurt goes well with all kinds of leftover fruit.",
        wasteLimit: 4,
        maxScore: 600,

        conveyorBelt: {
            items: [APPLE, BLANK, KIWI, APPLE, BLANK, KIWI, BLANK, BLANK, APPLE, BLANK, KIWI],
            speed: 1.2
        },

        processors: [
            {
                recipe: [APPLE],
                result: APPLE_SLICE,
                score: 100,
                x: 1*TILES_PX,
                y: 3*TILES_PX
            },
            {
                recipe: [KIWI],
                result: KIWI_SLICE,
                score: 100,
                x: 7*TILES_PX,
                y: 3*TILES_PX
            }

        ],

        finalItems: [APPLE_SLICE, KIWI_SLICE]
    },

    {id: 3, name: "stage 3",

        clearMessage: "yogurt goes well with all kinds of leftover fruit.",
        wasteLimit: 7,
        maxScore: 600,

        conveyorBelt: {
            items: [ORANGE, BLANK, KIWI, BLANK, BLANK, YOGURT, ORANGE, BLANK, KIWI, BLANK, ORANGE, BLANK, KIWI,
                    BLANK, BLANK, BLANK, BLANK, BLANK, BLANK, BLANK, BLANK, BLANK, YOGURT, BLANK, BLANK, YOGURT],
            speed: 1.3
        },

        processors: [
            {
                recipe: [ORANGE, KIWI, YOGURT],
                result: FRUIT_YOGURT,
                score: 300,
                x: 5*TILES_PX,
                y: 3*TILES_PX
            }

        ],

        finalItems: [FRUIT_YOGURT]
    },

    {id: 4, name: "stage 4",

        clearMessage: "yogurt goes well with all kinds of leftover fruit.",
        wasteLimit: 4,
        maxScore: 1000,

        conveyorBelt: {
            items: [APPLE, BLANK, BANANA, BLANK, KIWI, BLANK, KIWI, BLANK, APPLE, BLANK, APPLE,
                    BLANK, BLANK, KIWI, BLANK, BLANK, BLANK, BLANK, BLANK, BLANK, BLANK, BLANK,
                    BANANA, KIWI, BLANK, BLANK, BANANA, BLANK],
            speed: 1.3
        },

        processors: [
            {
                recipe: [APPLE, BANANA],
                result: APPLE_SLICE,
                score: 200,
                x: 3*TILES_PX,
                y: 2*TILES_PX
            },
            {
                recipe: [KIWI],
                result: KIWI_SLICE,
                score: 100,
                x: 7*TILES_PX,
                y: 5*TILES_PX
            }

        ],

        finalItems: [APPLE_SLICE, KIWI_SLICE]
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

