// JSON Level Data
let DIFFICULTY = { easy : 1, normal: 11, hard: 21};

let LEVELS = [

    // Tutorial
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

    // Stage 1
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

    //Stage 2
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

    //Stage 3
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

    //Stage 4
    {id: 4, name: "stage 4",

        clearMessage: "yogurt goes well with all kinds of leftover fruit.",
        wasteLimit: 7,
        maxScore: 1000,

        conveyorBelt: {
            items: [APPLE, BLANK, BANANA, BLANK, KIWI, BLANK, APPLE, BLANK, BLANK,
                    KIWI, BLANK, BLANK, BLANK, APPLE, BLANK, BLANK, KIWI, BLANK,
                    BLANK, BLANK, BLANK, BLANK, BLANK, BLANK, BLANK, BANANA, KIWI,
                    BLANK, BLANK, BANANA, BLANK],
            speed: 1.25
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
                score: 150,
                x: 7*TILES_PX,
                y: 5*TILES_PX
            }

        ],

        finalItems: [APPLE_SLICE, KIWI_SLICE]
    },

    // Normal - Stage 1
    {id: 11, name: "stage 11",

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
    },

    // tomato + lettce = salad, apple, bacon/fish
    {id: 11, name: "stage 12",

        clearMessage: "yogurt goes well with all kinds of leftover fruit.",
        wasteLimit: 5,
        maxScore: 2100,

        conveyorBelt: {
            items: [ORANGE, BLANK, KIWI, BLANK, APPLE, BLANK, KIWI, BLANK, ORANGE, ORANGE,
                    BLANK, BLANK, APPLE, BLANK, KIWI, YOGURT, BLANK, BLANK, APPLE, YOGURT],
            speed: 1.6
        },

        processors: [
            {
                recipe: [ORANGE, KIWI],
                result: ORANGE_SLICE,
                score: 100,
                x: 1*TILES_PX,
                y: 2*TILES_PX
            },
            {
                recipe: [APPLE],
                result: APPLE_SLICE,
                score: 100,
                x: 7*TILES_PX,
                y: 2*TILES_PX
            },
            {
                recipe: [ORANGE_SLICE, APPLE_SLICE, YOGURT],
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

