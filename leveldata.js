// JSON Level Data

// Manually updated
// Assert indices: 0 <= easy < normal < hard < totalLevels
let DIFFICULTY = { easy : 0, normal: 10, hard: 18};

let LEVELS = [

    // Tutorial
    {id: 0, name: "apples",

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

        clearMessage: "browned apple slices still taste great in apple pie.",
        wasteLimit: 5,
        maxScore: 300,

        conveyorBelt: {
            items: [APPLE_SLICE, BLANK, FLOUR, BLANK, BLANK, FLOUR, APPLE_SLICE, BLANK, BLANK, BLANK, APPLE_SLICE, BLANK, FLOUR],
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

        clearMessage: "store extra fruit slices with a container in your fridge for lasting yumminess",
        wasteLimit: 4,
        maxScore: 600,

        conveyorBelt: {
            items: [APPLE, BLANK, ORANGE, BLANK, APPLE, BLANK, ORANGE, BLANK, APPLE, BLANK, ORANGE],
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
            items: [ORANGE_SLICE, BLANK, ORANGE_SLICE, BLANK, BLANK, KIWI_SLICE, ORANGE_SLICE, BLANK, BLANK, BLANK,
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
    {id: 4, name: "dessert",

        clearMessage: "fruits are a healthier way to end every meal.",
        wasteLimit: 7,
        maxScore: 1000,

        conveyorBelt: {
            items: [APPLE_SLICE, BLANK, APPLE_SLICE, KIWI, BLANK, APPLE_SLICE, BLANK, KIWI, FLOUR, BLANK,
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

    {id: 5, name: "breakfast",
    
        clearMessage: "use those last drops of milk in the carton for coffee or hot chocolate.",
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
    
        clearMessage: "almost any kind of leftovers can be part of a tasty soup.",
        wasteLimit: 5,
        maxScore: 900,
    
        conveyorBelt: {
            items: [BLANK, WATER, FISH_STEAK, BLANK, BLANK, WATER, BLANK, FISH_STEAK, WATER, BLANK, FISH_STEAK],
            speed: 1.5
        },
    
        processors: [
            { recipe:[WATER], result: SOUP, score: 100, x: 3*TILES_PX, y: 3*TILES_PX },
            { recipe:[SOUP, FISH_STEAK], result: FISH_SOUP, score: 200, x: 8*TILES_PX, y: 4*TILES_PX }
        ],
        finalItems: [FISH_SOUP]
    
    },
    
    {id: 7, name: "orange juice",
    
        clearMessage: "there are never too many oranges for orange juice.",
        wasteLimit: 5,
        maxScore: 1000,
    
        conveyorBelt: {
            items: [BLANK, ORANGE, ORANGE, BLANK, ORANGE_SLICE, ORANGE, BLANK, BLANK, ORANGE_SLICE, BLANK, ORANGE],
            speed: 1.5
        },
    
        processors: [
            { recipe:[ORANGE], result: ORANGE_SLICE, score: 100, x: 3*TILES_PX, y: 2*TILES_PX },
            { recipe:[ORANGE], result: ORANGE_SLICE, score: 100, x: 9*TILES_PX, y: 2*TILES_PX },
            { recipe:[ORANGE_SLICE, ORANGE_SLICE], result: ORANGE_JUICE, score: 200, x: 3*TILES_PX, y: 5*TILES_PX },
        ],
        finalItems: [ORANGE_JUICE]
    
    },
    
    {id: 8, name: "cheesecake",
    
        clearMessage: "real life cheesecake should be stored in the freezer.",
        wasteLimit: 5,
        maxScore: 1300,
    
        conveyorBelt: {
            items: [FLOUR, BLANK, CHEESE, BLANK, CHEESE_SLICE, BLANK, STRAWBERRY, BLANK, BREAD, 
                    FLOUR, BLANK, BLANK, STRAWBERRY, CHEESE, BLANK, BLANK, STRAWBERRY],
            speed: 1.5
        },
    
        processors: [
            { recipe:[FLOUR], result: BREAD, score: 100, x: 3*TILES_PX, y: 2*TILES_PX },
            { recipe:[CHEESE], result: CHEESE_SLICE, score: 100, x: 10*TILES_PX, y: 2*TILES_PX },
            { recipe:[BREAD, CHEESE_SLICE, STRAWBERRY], result: CAKE, score: 300, x: 3*TILES_PX, y: 5*TILES_PX },
        ],
        finalItems: [CAKE]
    
    },
    
    {id: 9, name: "steak",
    
        clearMessage: "old vegetables will still look tasty next to a juicy steak.",
        wasteLimit: 5,
        maxScore: 1200,
    
        conveyorBelt: {
            items: [CHEESE_SLICE, BLANK, CHEESE_SLICE, BLANK, MEAT_3, BLANK, ASPARAGUS, BLANK, CHEESE_SLICE, BLANK, CHEESE_SLICE, BLANK, BLANK, MEAT_3, ASPARAGUS], 
            speed: 1.5
        },
    
        processors: [
            { recipe:[CHEESE_SLICE, CHEESE_SLICE], result: CHEESE, score: 200, x: 3*TILES_PX, y: 2*TILES_PX },
            { recipe:[MEAT_3], result: MEAT, score: 100, x: 10*TILES_PX, y: 5*TILES_PX },
            { recipe:[MEAT, ASPARAGUS, CHEESE], result: STEAK, score: 300, x: 3*TILES_PX, y: 5*TILES_PX },
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
            speed: 1.8
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
        wasteLimit: 8,
        maxScore: 9999,

        conveyorBelt: {
            items: [CHEESE, BLANK, SAUSAGE, BREAD, BREAD, CABBAGE, BLANK, SAUSAGE, BLANK, BLANK, CABBAGE,
                    CHEESE, BLANK, BREAD, SAUSAGE, BLANK, CHEESE, BLANK, CABBAGE],
            speed: 1.9
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
    {id: 14, name: "onigiri",

        clearMessage: "yogurt goes well with all kinds of leftover fruit.",
        wasteLimit: 8,
        maxScore: 9999,

        conveyorBelt: {
            items: [RICE, RICE, RICE, NORI, NORI, RICE, NORI, RICE, NORI, NORI,
                    BLANK, RICE, RICE, NORI, NORI, RICE, NORI],
            speed: 2.2
        },

        processors: [
            {
                recipe: [RICE, NORI],
                result: ONIGIRI,
                score: 200,
                x: 2*TILES_PX,
                y: 4*TILES_PX
            },

            {
                recipe: [RICE, NORI],
                result: ONIGIRI,
                score: 200,
                x: 8*TILES_PX,
                y: 4*TILES_PX
            }
        ],

        finalItems: [ONIGIRI]
    },

    // Normal Stage 6
    {id: 15, name: "15",

        clearMessage: "yogurt goes well with all kinds of leftover fruit.",
        wasteLimit: 5,
        maxScore: 9999,

        conveyorBelt: {
            items: [WATER, BLANK, LOBSTER, LOBSTER, BLANK, CUCUMBER, BLANK, LOBSTER, BLANK, WATER, BLANK
                    CUCUMBER, BLANK, WATER, BLANK, BLANK, CUCUMBER],
            speed: 1.7
        },

        processors: [
            {
                recipe: [LOBSTER],
                result: LOBSTER_BOILED,
                score: 100,
                x: 2*TILES_PX,
                y: 2*TILES_PX
            },
            {
                recipe: [CUCUMBER],
                result: CUCUMBER_SLICE,
                score: 100,
                x: 5*TILES_PX,
                y: 2*TILES_PX
            },
            {
                recipe: [WATER],
                result: SOUP,
                score: 100,
                x: 2*TILES_PX,
                y: 5*TILES_PX
            },
            {
                recipe: [LOBSTER_BOILED, CUCUMBER_SLICE, SOUP],
                result: LOBSTER_SOUP,
                score: 400,
                x: 6*TILES_PX,
                y: 5*TILES_PX
            }

        ],

        finalItems: [LOBSTER_SOUP]
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

