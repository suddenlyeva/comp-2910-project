// JSON Level Data
let DIFFICULTY = { easy : 1, normal: 10, hard: 12};

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
            items: [APPLE_SLICE, BLANK, FLOUR, APPLE_SLICE, BLANK, FLOUR, APPLE_SLICE, BLANK, BLANK, FLOUR],
            speed: 1.2
        },

        processors: [
            {
                recipe: [APPLE_SLICE, FLOUR],
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
            items: [APPLE, BLANK, ORANGE, APPLE, BLANK, ORANGE, BLANK, BLANK, APPLE, BLANK, ORANGE],
            speed: 1.2
        },

        processors: [
            {
                recipe: [APPLE],
                result: APPLE_SLICE,
                score: 100,
                x: 3*TILES_PX,
                y: 4*TILES_PX
            },
            {
                recipe: [ORANGE],
                result: ORANGE_SLICE,
                score: 100,
                x: 9*TILES_PX,
                y: 4*TILES_PX
            }

        ],

        finalItems: [APPLE_SLICE, ORANGE_SLICE]
    },

    //Stage 3
    {id: 3, name: "fruit yogurt",

        clearMessage: "yogurt goes well with all kinds of leftover fruit.",
        wasteLimit: 7,
        maxScore: 600,

        conveyorBelt: {
            items: [ORANGE_SLICE, ORANGE_SLICE, BLANK, BLANK, KIWI_SLICE, ORANGE_SLICE, BLANK, BLANK, BLANK,
                    YOGURT, BLANK, BLANK, BLANK, KIWI_SLICE, BLANK, BLANK, KIWI_SLICE, BLANK, BLANK, BLANK,
                    YOGURT, BLANK, YOGURT],
            speed: 1.2
        },

        processors: [
            {
                recipe: [ORANGE_SLICE, KIWI_SLICE, YOGURT],
                result: FRUIT_YOGURT,
                score: 300,
                x: 5*TILES_PX,
                y: 3*TILES_PX
            }

        ],

        finalItems: [FRUIT_YOGURT]
    },

    //Stage 4
    {id: 4, name: " apple pie and kiwi slice",

        clearMessage: "fruits should go in the low humidity drawer",
        wasteLimit: 7,
        maxScore: 1000,

        conveyorBelt: {
            items: [APPLE_SLICE, BLANK, APPLE_SLICE, KIWI, APPLE_SLICE, BLANK, KIWI, FLOUR, BLANK,
                    KIWI, BLANK, FLOUR, BLANK, BLANK, FLOUR],
            speed: 1.25
        },

        processors: [
            {
                recipe: [APPLE_SLICE, FLOUR],
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

    {id: 5, name: "bread and cappuccino",
    
        clearMessage: "set for now",
        wasteLimit: 5,
        maxScore: 800,
    
        conveyorBelt: {
            items: [MILK, BLANK, COFFEE_BEAN, FLOUR, BLANK, MILK, COFFEE_BEAN, BLANK, FLOUR, MILK, MILK],
            speed: 1.5
        },
    
        processors: [
            { recipe:[FLOUR, MILK], result: BREAD, score: 200, x: 3*TILES_PX, y: 3*TILES_PX },
            { recipe:[COFFEE_BEAN, MILK], result: CAPPUCCINO, score: 200, x: 9*TILES_PX, y: 3*TILES_PX }
        ],
        finalItems: [BREAD, CAPPUCCINO]
    
    },
    
    {id: 6, name: "fish soup",
    
        clearMessage: "nothing new",
        wasteLimit: 5,
        maxScore: 600,
    
        conveyorBelt: {
            items: [BLANK, WATER, FISH_STEAK, BLANK, BLANK, FISH_STEAK, FISH_STEAK, WATER, BLANK, FISH_STEAK],
            speed: 1.5
        },
    
        processors: [
            { recipe:[WATER], result: SOUP, score: 100, x: 6*TILES_PX, y: 2*TILES_PX },
            { recipe:[SOUP, FISH_STEAK, FISH_STEAK], result: FISH_SOUP, score: 200, x: 5*TILES_PX, y: 5*TILES_PX }
        ],
        finalItems: [FISH_SOUP]
    
    },
    
    {id: 7, name: "orange juice",
    
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
            { recipe:[ORANGE_SLICE, ORANGE_SLICE], result: ORANGE_JUICE, score: 200, x: 1*TILES_PX, y: 5*TILES_PX },
        ],
        finalItems: [ORANGE_JUICE]
    
    },
    
    {id: 8, name: "cake",
    
        clearMessage: "nothing new",
        wasteLimit: 5,
        maxScore: 800,
    
        conveyorBelt: {
            items: [FLOUR, CHEESE, BLANK, STRAWBERRY, BLANK, FLOUR, CHEESE, BLANK, STRAWBERRY],
            speed: 1.5
        },
    
        processors: [
            { recipe:[FLOUR], result: BREAD, score: 100, x: 1*TILES_PX, y: 2*TILES_PX },
            { recipe:[CHEESE], result: CHEESE_SLICE, score: 100, x: 7*TILES_PX, y: 2*TILES_PX },
            { recipe:[BREAD, CHEESE_SLICE, STRAWBERRY], result: CAKE, score: 300, x: 1*TILES_PX, y: 5*TILES_PX },
        ],
        finalItems: [CAKE]
    
    },
    
    {id: 9, name: "steak",
    
        clearMessage: "nothing new",
        wasteLimit: 5,
        maxScore: 1400,
    
        conveyorBelt: {
            items: [CHEESE_SLICE, BLANK, CHEESE_SLICE, BLANK, MEAT_3, BLANK, RICE, BLANK, CHEESE_SLICE, BLANK, CHEESE_SLICE, BLANK, BLANK, MEAT_3, RICE], 
            speed: 1.5
        },
    
        processors: [
            { recipe:[CHEESE_SLICE, CHEESE_SLICE], result: CHEESE, score: 200, x: 1*TILES_PX, y: 2*TILES_PX },
            { recipe:[MEAT_3], result: MEAT, score: 100, x: 7*TILES_PX, y: 2*TILES_PX },
            { recipe:[MEAT, RICE, CHEESE], result: STEAK, score: 300, x: 1*TILES_PX, y: 5*TILES_PX },
        ],
        finalItems: [STEAK]
    
    },
    
    // Normal - Stage 1
    {id: 10, name: "fruit yogurt 2",

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
    {id: 11, name: "octopus salad",

        clearMessage: "yogurt goes well with all kinds of leftover fruit.",
        wasteLimit: 5,
        maxScore: 1800,

        conveyorBelt: {
            items: [TOMATO, BLANK, CUCUMBER, BLANK, BLANK, CABBAGE, BLANK, TOMATO, BLANK,
                    CUCUMBER, BLANK, CABBAGE, TOMATO, OCTOPUS, BLANK, CUCUMBER, OCTOPUS, BLANK,
                    CABBAGE, OCTOPUS],
            speed: 1.55
        },

        processors: [
            {
                recipe: [TOMATO, CABBAGE],
                result: SALAD,
                score: 200,
                x: 1*TILES_PX,
                y: 2*TILES_PX
            },
            {
                recipe: [CUCUMBER],
                result: CUCUMBER_SLICE,
                score: 100,
                x: 9*TILES_PX,
                y: 3*TILES_PX
            },
            {
                recipe: [SALAD, CUCUMBER_SLICE, OCTOPUS],
                result: SALAD_2,
                score: 300,
                x: 3*TILES_PX,
                y: 5*TILES_PX
            }
        ],

        finalItems: [SALAD_2]
    },

    // Normal Stage 3
    //
    {id: 12, name: "fish soup and sushi",

        clearMessage: "yogurt goes well with all kinds of leftover fruit.",
        wasteLimit: 5,
        maxScore: 9999,

        conveyorBelt: {
            items: [FISH, BLANK, FISH, NORI, BLANK, SOUP, RICE, FISH, FISH, RICE, BLANK,
                    FISH, NORI, BLANK, RICE, SOUP, BLANK, NORI],
            speed: 1.65
        },

        processors: [
            {
                recipe: [FISH],
                result: FISH_STEAK,
                score: 100,
                x: 3*TILES_PX,
                y: 2*TILES_PX
            },
            {
                recipe: [FISH_STEAK, NORI, RICE],
                result: SUSHI_ROLL,
                score: 300,
                x: 8*TILES_PX,
                y: 4*TILES_PX
            },
            {
                recipe: [FISH, SOUP],
                result: FISH_SOUP,
                score: 200,
                x: 2*TILES_PX,
                y: 5*TILES_PX
            }

        ],

        finalItems: [SUSHI_ROLL, FISH_SOUP]
    },

    // Normal Stage 4
    {id: 13, name: "sandwich",

        clearMessage: "yogurt goes well with all kinds of leftover fruit.",
        wasteLimit: 5,
        maxScore: 9999,

        conveyorBelt: {
            items: [CHEESE, BLANK, SAUSAGE, BREAD, BREAD, CABBAGE, BLANK, SAUSAGE, BLANK, BLANK, CABBAGE,
                    CHEESE, BLANK, BREAD, SAUSAGE, BLANK, CHEESE, BLANK, CABBAGE],
            speed: 1.7
        },

        processors: [
            {
                recipe: [CABBAGE],
                result: CABBAGE_SLICE,
                score: 100,
                x: 2*TILES_PX,
                y: 2*TILES_PX
            },
            {
                recipe: [CHEESE],
                result: CHEESE_SLICE,
                score: 100,
                x: 7*TILES_PX,
                y: 2*TILES_PX
            },

            {
                recipe: [BREAD, CHEESE_SLICE, CABBAGE_SLICE, SAUSAGE],
                result: SANDWICH,
                score: 400,
                x: 5*TILES_PX,
                y: 5*TILES_PX
            }

        ],

        finalItems: [SANDWICH]
    },

    // Normal Stage 5
    {id: 14, name: "14",

        clearMessage: "yogurt goes well with all kinds of leftover fruit.",
        wasteLimit: 5,
        maxScore: 9999,

        conveyorBelt: {
            items: [CHEESE, BLANK, SAUSAGE, BREAD, BREAD, CABBAGE, BLANK, SAUSAGE, BLANK, BLANK, CABBAGE,
                    CHEESE, BLANK, BREAD, SAUSAGE, BLANK, CHEESE, BLANK, CABBAGE],
            speed: 1.7
        },

        processors: [
            {
                recipe: [CABBAGE],
                result: CABBAGE_SLICE,
                score: 100,
                x: 2*TILES_PX,
                y: 2*TILES_PX
            },
            {
                recipe: [CHEESE],
                result: CHEESE_SLICE,
                score: 100,
                x: 7*TILES_PX,
                y: 2*TILES_PX
            },

            {
                recipe: [BREAD, CHEESE_SLICE, CABBAGE_SLICE, SAUSAGE],
                result: SANDWICH,
                score: 400,
                x: 5*TILES_PX,
                y: 5*TILES_PX
            }

        ],

        finalItems: [SANDWICH]
    },

    // Normal Stage 6
    {id: 15, name: "15",

        clearMessage: "yogurt goes well with all kinds of leftover fruit.",
        wasteLimit: 5,
        maxScore: 9999,

        conveyorBelt: {
            items: [CHEESE, BLANK, SAUSAGE, BREAD, BREAD, CABBAGE, BLANK, SAUSAGE, BLANK, BLANK, CABBAGE,
                    CHEESE, BLANK, BREAD, SAUSAGE, BLANK, CHEESE, BLANK, CABBAGE],
            speed: 1.7
        },

        processors: [
            {
                recipe: [CABBAGE],
                result: CABBAGE_SLICE,
                score: 100,
                x: 2*TILES_PX,
                y: 2*TILES_PX
            },
            {
                recipe: [CHEESE],
                result: CHEESE_SLICE,
                score: 100,
                x: 7*TILES_PX,
                y: 2*TILES_PX
            },

            {
                recipe: [BREAD, CHEESE_SLICE, CABBAGE_SLICE, SAUSAGE],
                result: SANDWICH,
                score: 400,
                x: 5*TILES_PX,
                y: 5*TILES_PX
            }

        ],

        finalItems: [SANDWICH]
    },
    
    {id: 16, name: "careful",
    
        clearMessage: "nothing new",
        wasteLimit: 4,
        maxScore: 2600,
    
        conveyorBelt: {
            items:[ KIWI        , YOGURT      , BLANK       , APPLE       , ORANGE        
                  , BLANK       , KIWI_SLICE  , BLANK       , BLANK       , APPLE       
                  , BLANK       , ORANGE      , APPLE       , BLANK       , BLANK       
                  , KIWI        , BLANK       , YOGURT      , BLANK       , KIWI_SLICE
                  , APPLE
                  ], 
            speed: 2.5
        },
    
        processors: [
            { recipe:[APPLE, ORANGE],                      result: APPLE_SLICE,    score: 400, x: 2*TILES_PX, y: 2*TILES_PX },
            { recipe:[KIWI_SLICE, KIWI, APPLE],            result: ORANGE_SLICE,   score: 450, x: 8*TILES_PX, y: 2*TILES_PX },
            { recipe:[APPLE_SLICE, ORANGE_SLICE, YOGURT],  result: YOGURT,         score: 450, x: 5*TILES_PX, y: 5*TILES_PX }
            
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
            items: [BLANK, FLOUR, APPLE, BLANK, FLOUR     
                  , APPLE, EGGS, BLANK, BLANK, ORANGE      
                  , BLANK, APPLE, PIE,EGGS, BLANK, ORANGE    
                  , FLOUR   ], 
            speed: 2
        },
    
        processors: [
            { recipe:[APPLE],                     result: APPLE_SLICE,    score: 100, x: 1*TILES_PX, y: 2*TILES_PX },
            { recipe:[ORANGE],                     result: FLOUR,          score: 100, x: 1*TILES_PX, y: 5*TILES_PX },
            { recipe:[FLOUR, EGGS],                result: PIE,            score: 200, x: 5*TILES_PX, y: 2*TILES_PX }, 
            { recipe:[FLOUR, APPLE_SLICE, PIE],   result: APPLE_PIE,      score: 400, x: 5*TILES_PX, y: 5*TILES_PX }
        ],
        finalItems: [APPLE_PIE]
        //ORANGE = WHEAT
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

