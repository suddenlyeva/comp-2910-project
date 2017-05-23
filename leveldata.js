// JSON Level Data
let DIFFICULTY = { easy : 1, normal: 10, hard: 0};

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
    {id: 1, name: "apple pie",

        clearMessage: "set your fridge temperature to 4 degrees celsius or lower to keep food fresh",
        wasteLimit: 5,
        maxScore: 300,

        conveyorBelt: {
            items: [APPLE, BLANK, FLOUR, APPLE, BLANK, FLOUR, APPLE, BLANK, BLANK, FLOUR],
            speed: 1.2
        },

        processors: [
            {
                recipe: [APPLE, FLOUR],
                result: PIE,
                score: 100,
                x: 6*TILES_PX,
                y: 4*TILES_PX
            }
        ],

        finalItems: [PIE]
    },

    //Stage 2
    {id: 2, name: "fruit slices",

        clearMessage: "55,000 apples are wasted every day in metro vancouver",
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
            items: [ORANGE, ORANGE, BLANK, BLANK, KIWI, ORANGE, BLANK, BLANK, BLANK, YOGURT, BLANK, BLANK,
                    BLANK, KIWI, BLANK, BLANK, KIWI, BLANK, BLANK, BLANK, YOGURT, BLANK, YOGURT],
            speed: 1.2
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

        clearMessage: "fruits should go in the low humidity drawer",
        wasteLimit: 7,
        maxScore: 1000,

        conveyorBelt: {
            items: [APPLE, BLANK, APPLE, KIWI, APPLE, BLANK, KIWI, FLOUR, BLANK,
                    KIWI, BLANK, FLOUR, BLANK, BLANK, FLOUR],
            speed: 1.25
        },

        processors: [
            {
                recipe: [APPLE, FLOUR],
                result: PIE,
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

        finalItems: [PIE, KIWI_SLICE]
    },

    {id: 5, name: "level 5",
    
        clearMessage: "set for now",
        wasteLimit: 5,
        maxScore: 800,
    
        conveyorBelt: {
            items: [KIWI, BLANK, APPLE, ORANGE, BLANK, KIWI, APPLE, BLANK, ORANGE, KIWI, KIWI],
            speed: 1.5
        },
    
        processors: [
            { recipe:[ORANGE, KIWI], result: ORANGE_SLICE, score: 200, x: 3*TILES_PX, y: 3*TILES_PX },
            { recipe:[APPLE, KIWI], result: KIWI_SLICE, score: 200, x: 9*TILES_PX, y: 3*TILES_PX }
        ],
        finalItems: [ORANGE_SLICE, KIWI_SLICE]
    
    },
    
    {id: 6, name: "level 6",
    
        clearMessage: "nothing new",
        wasteLimit: 5,
        maxScore: 600,
    
        conveyorBelt: {
            items: [BLANK, APPLE, ORANGE, BLANK, BLANK, ORANGE, ORANGE, APPLE, BLANK, ORANGE],
            speed: 1.5
        },
    
        processors: [
            { recipe:[APPLE], result: APPLE_SLICE, score: 100, x: 6*TILES_PX, y: 2*TILES_PX },
            { recipe:[APPLE_SLICE, ORANGE, ORANGE], result: KIWI_SLICE, score: 200, x: 5*TILES_PX, y: 5*TILES_PX }
        ],
        finalItems: [KIWI_SLICE]
    
    },
    
    {id: 7, name: "level 7",
    
        clearMessage: "nothing new",
        wasteLimit: 5,
        maxScore: 700,
    
        conveyorBelt: {
            items: [BLANK, ORANGE, ORANGE, BLANK, ORANGE_SLICE, ORANGE],
            speed: 1.5
        },
    
        processors: [
            { recipe:[ORANGE], result: ORANGE_SLICE, score: 100, x: 1*TILES_PX, y: 2*TILES_PX },
            { recipe:[ORANGE], result: ORANGE_SLICE, score: 100, x: 7*TILES_PX, y: 2*TILES_PX },
            { recipe:[ORANGE_SLICE, ORANGE_SLICE], result: APPLE_SLICE, score: 200, x: 1*TILES_PX, y: 5*TILES_PX },
        ],
        finalItems: [APPLE_SLICE]
    
    },
    
    {id: 8, name: "level 8",
    
        clearMessage: "nothing new",
        wasteLimit: 5,
        maxScore: 800,
    
        conveyorBelt: {
            items: [KIWI, ORANGE, BLANK, APPLE, BLANK, KIWI, ORANGE, BLANK,APPLE],
            speed: 1.5
        },
    
        processors: [
            { recipe:[KIWI], result: KIWI_SLICE, score: 100, x: 1*TILES_PX, y: 2*TILES_PX },
            { recipe:[ORANGE], result: ORANGE_SLICE, score: 100, x: 7*TILES_PX, y: 2*TILES_PX },
            { recipe:[KIWI_SLICE, ORANGE_SLICE, APPLE], result: APPLE_SLICE, score: 300, x: 1*TILES_PX, y: 5*TILES_PX },
        ],
        finalItems: [APPLE_SLICE]
    
    },
    
    {id: 9, name: "long",
    
        clearMessage: "nothing new",
        wasteLimit: 5,
        maxScore: 1400,
    
        conveyorBelt: {
            items: [APPLE, BLANK, APPLE, BLANK, ORANGE, BLANK, KIWI_SLICE, BLANK, APPLE, BLANK, APPLE, BLANK, BLANK, ORANGE, KIWI_SLICE], 
            speed: 1.5
        },
    
        processors: [
            { recipe:[APPLE, APPLE], result: APPLE_SLICE, score: 200, x: 1*TILES_PX, y: 2*TILES_PX },
            { recipe:[ORANGE], result: ORANGE_SLICE, score: 100, x: 7*TILES_PX, y: 2*TILES_PX },
            { recipe:[ORANGE_SLICE, KIWI_SLICE, APPLE_SLICE], result: YOGURT, score: 300, x: 1*TILES_PX, y: 5*TILES_PX },
        ],
        finalItems: [YOGURT]
    
    },
    
    // Normal - Stage 1
    {id: 10, name: "stage 10",

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

    // Normal - Stage 2
    // tomato + lettce = salad, apple, bacon/fish
    {id: 11, name: "stage 11",

        clearMessage: "yogurt goes well with all kinds of leftover fruit.",
        wasteLimit: 5,
        maxScore: 2100,

        conveyorBelt: {
            items: [TOMATO, BLANK, APPLE, BLANK, BLANK, CABBAGE, BLANK, TOMATO, BLANK,
                    APPLE, BLANK, CABBAGE, ORANGE, OCTOPUS, BLANK, APPLE, OCTOPUS, BLANK,
                    KIWI, OCTOPUS],
            speed: 1.55
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
                x: 9*TILES_PX,
                y: 3*TILES_PX
            },
            {
                recipe: [ORANGE_SLICE, APPLE_SLICE, YOGURT],
                result: FRUIT_YOGURT,
                score: 500,
                x: 3*TILES_PX,
                y: 5*TILES_PX
            }
        ],

        finalItems: [FRUIT_YOGURT]
    },

    // Normal Stage 3
    //
    {id: 12, name: "stage 12",

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
    
    {id: 16, name: "careful",
    
        clearMessage: "nothing new",
        wasteLimit: 4,
        maxScore: 2300,
    
        conveyorBelt: {
            items:[ BLANK       , APPLE       , ORANGE      , BLANK       , KIWI        
                  , KIWI_SLICE  , BLANK       , ORANGE_SLICE, BLANK       , APPLE       
                  , BLANK       , ORANGE      , BLANK       , KIWI_SLICE  , APPLE       
                  , ORANGE      , BLANK       , KIWI
                  ], 
            speed: 2.5
        },
    
        processors: [
            { recipe:[APPLE, ORANGE],               result: APPLE_SLICE,    score: 200, x: 2*TILES_PX, y: 2*TILES_PX },
            { recipe:[KIWI_SLICE, KIWI],            result: ORANGE_SLICE,   score: 200, x: 8*TILES_PX, y: 2*TILES_PX },
            { recipe:[APPLE_SLICE, ORANGE_SLICE],   result: YOGURT,         score: 250, x: 6*TILES_PX, y: 5*TILES_PX }
            
        ],
        finalItems: [YOGURT]
    
    },
    
    
    {id: 17, name: "don't slip",
    
        clearMessage: "nothing new",
        wasteLimit: 4,
        maxScore: 2300,
    
        conveyorBelt: {
            items:[ BLANK       , APPLE       , ORANGE      , BLANK       , KIWI        
                  , KIWI_SLICE  , BLANK       , ORANGE_SLICE, BLANK       , APPLE       
                  , BLANK       , ORANGE      , BLANK       , KIWI_SLICE  , APPLE       
                  , ORANGE      , BLANK       , KIWI
                  ], 
            speed: 2.5
        },
    
        processors: [
            { recipe:[APPLE, ORANGE],               result: APPLE_SLICE,    score: 200, x: 2*TILES_PX, y: 2*TILES_PX },
            { recipe:[KIWI_SLICE, KIWI],            result: ORANGE_SLICE,   score: 200, x: 8*TILES_PX, y: 2*TILES_PX },
            { recipe:[APPLE_SLICE, ORANGE_SLICE],   result: YOGURT,         score: 250, x: 6*TILES_PX, y: 5*TILES_PX }
            
        ],
        finalItems: [YOGURT]
    
    },
    
    {id: 18, name: "waste not want not",
    
        clearMessage: "nothing new",
        wasteLimit: 4,
        maxScore: 2300,
    
        conveyorBelt: {
            items:[ BLANK       , BLANK       , APPLE       , BLANK , APPLE     
                  , BLANK       , ORANGE_SLICE, BLANK       , APPLE , BLANK       
                  , APPLE_SLICE , ORANGE_SLICE, BLANK       , APPLE , ORANGE_SLICE 
                  , BLANK       , BLANK       , APPLE       , APPLE , APPLE       
                  , BLANK       , APPLE       , APPLE       , BLANK , ORANGE_SLICE
                  ], 
            speed: 2
        },
    
        processors: [
            { recipe:[APPLE],                       result: APPLE_SLICE,    score: 100, x: 2*TILES_PX, y: 2*TILES_PX },
            { recipe:[APPLE],                       result: APPLE_SLICE,    score: 100, x: 2*TILES_PX, y: 5*TILES_PX },
            { recipe:[APPLE_SLICE, APPLE_SLICE],    result: YOGURT,         score: 200, x: 8*TILES_PX, y: 2*TILES_PX },
            { recipe:[APPLE_SLICE, ORANGE_SLICE],   result: YOGURT,         score: 200, x: 8*TILES_PX, y: 5*TILES_PX }
            
        ],
        finalItems: [YOGURT]
    
    },
    
    {id: 19, name: ":)",
    
        clearMessage: "nothing new",
        wasteLimit: 4,
        maxScore: 1900,
    
        conveyorBelt: {
            items:[ BLANK       , ORANGE_SLICE, ORANGE      , BLANK , BLANK     
                  , ORANGE      , BLANK       , ORANGE      , BLANK , BLANK       
                  , APPLE_SLICE , BLANK       , ORANGE      , BLANK , APPLE_SLICE 
                  , BLANK       , BLANK       , KIWI_SLICE  , ORANGE, BLANK       
                  , BLANK       , APPLE_SLICE , BLANK       , BLANK , ORANGE_SLICE
                  ], 
            speed: 2
        },
    
        processors: [
            { recipe:[ORANGE],                      result: ORANGE_SLICE,   score: 100, x: 1*TILES_PX, y: 2*TILES_PX },
            { recipe:[ORANGE],                      result: ORANGE_SLICE,   score: 100, x: 1*TILES_PX, y: 5*TILES_PX },
            { recipe:[ORANGE_SLICE, APPLE_SLICE],   result: KIWI_SLICE,     score: 200, x: 5*TILES_PX, y: 2*TILES_PX }, 
            { recipe:[ORANGE_SLICE, KIWI_SLICE],    result: YOGURT,         score: 200, x: 5*TILES_PX, y: 5*TILES_PX }
        ],
        finalItems: [YOGURT]
    
    },
    
    {id: 20, name: "havoc",
    
        clearMessage: "nothing new",
        wasteLimit: 4,
        maxScore: 1800,
    
        conveyorBelt: {
            items: [BLANK, ORANGE_SLICE, APPLE     , BLANK, BLANK     
                  , APPLE, KIWI_SLICE  , BLANK     , BLANK, ORANGE      
                  , BLANK, APPLE       , KIWI_SLICE, BLANK, ORANGE    
                  , APPLE, ORANGE     ], 
            speed: 2
        },
    
        processors: [
            { recipe:[APPLE],                                   result: APPLE_SLICE,    score: 100, x: 1*TILES_PX, y: 2*TILES_PX },
            { recipe:[ORANGE],                                  result: ORANGE_SLICE,   score: 100, x: 1*TILES_PX, y: 5*TILES_PX },
            { recipe:[ORANGE_SLICE, APPLE_SLICE],               result: KIWI_SLICE,     score: 200, x: 5*TILES_PX, y: 2*TILES_PX }, 
            { recipe:[ORANGE_SLICE, KIWI_SLICE, APPLE_SLICE],   result: YOGURT,         score: 400, x: 5*TILES_PX, y: 5*TILES_PX }
        ],
        finalItems: [YOGURT]
    
    },

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

