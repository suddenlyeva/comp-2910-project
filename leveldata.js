// JSON Level Data

// Manually updated
// Assert indices: 0 <= easy < normal < hard < totalLevels
let DIFFICULTY = { easy : 0, normal: 7, hard: 16};

let LEVELS = [

    // Tutorial
    {id: 0, name: "apples",

        clearMessage: "an apple a day is one less apple in the trash.",
        wasteLimit: 3,
        maxScore: 3000,

        conveyorBelt: {
            items: [APPLE,BLANK,BLANK,BLANK,APPLE,BLANK,BLANK,BLANK,APPLE],
            speed: 1.2
        },

        processors: [
            {
                recipe: [APPLE],
                result: APPLE_SLICE,
                score: 1000,
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
        maxScore: 3000,

        conveyorBelt: {
            items: [APPLE_SLICE, BLANK, PIE, BLANK, BLANK, PIE, APPLE_SLICE, BLANK, BLANK, BLANK, APPLE_SLICE, BLANK, PIE],
            speed: 1.2
        },

        processors: [
            {
                recipe: [APPLE_SLICE, PIE],
                result: APPLE_PIE,
                score: 1000,
                x: 6*TILES_PX,
                y: 4*TILES_PX
            }
        ],

        finalItems: [APPLE_PIE]
    },

    //Stage 2
    {id: 2, name: "fruit slices",

        clearMessage: "store extra fruit slices inside a container in your fridge for lasting yumminess.",
        wasteLimit: 5,
        maxScore: 6000,

        conveyorBelt: {
            items: [APPLE, BLANK, ORANGE, BLANK, APPLE, BLANK, ORANGE, BLANK, APPLE, BLANK, ORANGE],
            speed: 1.2
        },

        processors: [
            {
                recipe: [APPLE],
                result: APPLE_SLICE,
                score: 1000,
                x: 3*TILES_PX,
                y: 4*TILES_PX
            },
            {
                recipe: [ORANGE],
                result: ORANGE_SLICE,
                score: 1000,
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
        maxScore: 9000,

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
                score: 3000,
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
        maxScore: 10500,

        conveyorBelt: {
            items: [APPLE_SLICE, BLANK, APPLE_SLICE, KIWI, BLANK, APPLE_SLICE, BLANK, KIWI, PIE, BLANK,
                    KIWI, BLANK, PIE, BLANK, BLANK, PIE],
            speed: 1.25
        },

        processors: [
            {
                recipe: [APPLE_SLICE, PIE],
                result: APPLE_PIE,
                score: 2000,
                x: 3*TILES_PX,
                y: 2*TILES_PX
            },
            {
                recipe: [KIWI],
                result: KIWI_SLICE,
                score: 1500,
                x: 7*TILES_PX,
                y: 5*TILES_PX
            }

        ],

        finalItems: [APPLE_PIE, KIWI_SLICE]
    },

    {id: 5, name: "breakfast",
    
        clearMessage: "use those last drops of milk in the carton for coffee or hot chocolate.",
        wasteLimit: 6,
        maxScore: 8000,
    
        conveyorBelt: {
            items: [MILK, BLANK, COFFEE_BEAN, FLOUR, BLANK, BLANK, MILK, COFFEE_BEAN, BLANK, FLOUR, MILK, BLANK, MILK],
            speed: 1.5
        },
    
        processors: [
            { recipe:[FLOUR, MILK], result: BREAD, score: 2000, x: 3*TILES_PX, y: 3*TILES_PX },
            { recipe:[COFFEE_BEAN, MILK], result: CAPPUCCINO, score: 2000, x: 9*TILES_PX, y: 3*TILES_PX }
        ],
        finalItems: [BREAD, CAPPUCCINO]
    
    },
    
    {id: 6, name: "fish soup",
    
        clearMessage: "almost any kind of leftovers can be part of a tasty soup.",
        wasteLimit: 5,
        maxScore: 9000,
    
        conveyorBelt: {
            items: [BLANK, WATER, FISH_STEAK, BLANK, BLANK, WATER, BLANK, FISH_STEAK, BLANK, WATER, BLANK, FISH_STEAK],
            speed: 1.5
        },
    
        processors: [
            { recipe:[WATER], result: SOUP, score: 1000, x: 3*TILES_PX, y: 3*TILES_PX },
            { recipe:[SOUP, FISH_STEAK], result: FISH_SOUP, score: 2000, x: 8*TILES_PX, y: 4*TILES_PX }
        ],
        finalItems: [FISH_SOUP]
    
    },
    
    {id: 7, name: "orange juice",
    
        clearMessage: "you can never have too many oranges for orange juice.",
        wasteLimit: 4,
        maxScore: 10000,
    
        conveyorBelt: {
            items: [BLANK, ORANGE, BLANK, ORANGE, BLANK, BLANK, ORANGE_SLICE, ORANGE, BLANK, BLANK, ORANGE_SLICE, BLANK, ORANGE],
            speed: 1.5
        },
    
        processors: [
            { recipe:[ORANGE], result: ORANGE_SLICE, score: 1000, x: 3*TILES_PX, y: 2*TILES_PX },
            { recipe:[ORANGE], result: ORANGE_SLICE, score: 1000, x: 9*TILES_PX, y: 2*TILES_PX },
            { recipe:[ORANGE_SLICE, ORANGE_SLICE], result: ORANGE_JUICE, score: 2000, x: 3*TILES_PX, y: 5*TILES_PX },
        ],
        finalItems: [ORANGE_JUICE]
    
    },
    
    {id: 8, name: "cheesecake",
    
        clearMessage: "real life cheesecake should be stored in the freezer.",
        wasteLimit: 5,
        maxScore: 13000,
    
        conveyorBelt: {
            items: [FLOUR, BLANK, CHEESE, BLANK, CHEESE_SLICE, BLANK, STRAWBERRY, BLANK, BREAD_2, 
                    FLOUR, BLANK, BLANK, STRAWBERRY, CHEESE, BLANK, BLANK, STRAWBERRY],
            speed: 1.5
        },
    
        processors: [
            { recipe:[FLOUR], result: BREAD_2, score: 1000, x: 3*TILES_PX, y: 2*TILES_PX },
            { recipe:[CHEESE], result: CHEESE_SLICE, score: 1000, x: 10*TILES_PX, y: 2*TILES_PX },
            { recipe:[BREAD_2, CHEESE_SLICE, STRAWBERRY], result: CAKE, score: 3000, x: 3*TILES_PX, y: 5*TILES_PX },
        ],
        finalItems: [CAKE]
    
    },
    
    {id: 9, name: "steak",
    
        clearMessage: "old vegetables still look tasty next to a juicy steak.",
        wasteLimit: 5,
        maxScore: 12000,
    
        conveyorBelt: {
            items: [CHEESE_SLICE, BLANK, CHEESE_SLICE, BLANK, MEAT_3, BLANK, ASPARAGUS, BLANK, BLANK, CHEESE_SLICE, BLANK, CHEESE_SLICE, BLANK, BLANK, MEAT_3, ASPARAGUS], 
            speed: 1.5
        },
    
        processors: [
            { recipe:[CHEESE_SLICE, CHEESE_SLICE], result: CHEESE, score: 2000, x: 3*TILES_PX, y: 2*TILES_PX },
            { recipe:[MEAT_3], result: MEAT, score: 1000, x: 10*TILES_PX, y: 5*TILES_PX },
            { recipe:[MEAT, ASPARAGUS, CHEESE], result: STEAK, score: 3000, x: 3*TILES_PX, y: 5*TILES_PX },
        ],
        finalItems: [STEAK]
    
    },
    
    // Normal - Stage 1
    {id: 10, name: "fruit yogurt 2",

        clearMessage: "ingredients still taste best while they are fresh.",
        wasteLimit: 5,
        maxScore: 21000,

        conveyorBelt: {
            items: [ORANGE, BLANK, KIWI, KIWI, BLANK, ORANGE, YOGURT, ORANGE, BLANK, BLANK, KIWI, YOGURT, BLANK, YOGURT],
            speed: 1.5
        },

        processors: [
            {
                recipe: [ORANGE],
                result: ORANGE_SLICE,
                score: 1000,
                x: 1*TILES_PX,
                y: 2*TILES_PX
            },
            {
                recipe: [KIWI],
                result: KIWI_SLICE,
                score: 1000,
                x: 7*TILES_PX,
                y: 2*TILES_PX
            },
            {
                recipe: [ORANGE_SLICE, KIWI_SLICE, YOGURT],
                result: FRUIT_YOGURT,
                score: 5000,
                x: 1*TILES_PX,
                y: 5*TILES_PX
            }
        ],

        finalItems: [FRUIT_YOGURT]
    },

    // Normal - Stage 2
    {id: 11, name: "octopus salad",

        clearMessage: "you can soak wilted lettuce in ice water to crisp it up again.",
        wasteLimit: 6,
        maxScore: 18000,

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
                score: 2000,
                x: 1*TILES_PX,
                y: 2*TILES_PX
            },
            {
                recipe: [CUCUMBER],
                result: CUCUMBER_SLICE,
                score: 1000,
                x: 9*TILES_PX,
                y: 3*TILES_PX
            },
            {
                recipe: [SALAD, CUCUMBER_SLICE, OCTOPUS],
                result: SALAD_2,
                score: 3000,
                x: 3*TILES_PX,
                y: 5*TILES_PX
            }
        ],

        finalItems: [SALAD_2]
    },

    // Normal Stage 3
    //
    {id: 12, name: "seafood",

        clearMessage: "sushi is surprisingly easy to make at home.",
        wasteLimit: 6,
        maxScore: 16000,

        conveyorBelt: {
            items: [FISH, BLANK, FISH_STEAK, NORI, BLANK, SOUP, RICE, BLANK, FISH_STEAK, FISH, RICE, BLANK,
                    FISH, NORI, BLANK, RICE, SOUP, BLANK, NORI],
            speed: 1.7
        },

        processors: [
            {
                recipe: [FISH],
                result: FISH_STEAK,
                score: 1000,
                x: 3*TILES_PX,
                y: 2*TILES_PX
            },
            {
                recipe: [FISH_STEAK, NORI, RICE],
                result: SUSHI_ROLL,
                score: 3000,
                x: 8*TILES_PX,
                y: 4*TILES_PX
            },
            {
                recipe: [FISH_STEAK, SOUP],
                result: FISH_SOUP,
                score: 2000,
                x: 2*TILES_PX,
                y: 5*TILES_PX
            }

        ],

        finalItems: [SUSHI_ROLL, FISH_SOUP]
    },

    // Normal Stage 4
    {id: 13, name: "sandwich",

        clearMessage: "you can call anything between two slices of bread a sandwich.",
        wasteLimit: 6,
        maxScore: 18000,

        conveyorBelt: {
            items: [CHEESE, BLANK, SAUSAGE, BREAD, BREAD, CABBAGE, BLANK, SAUSAGE, BLANK, BLANK, CABBAGE,
                    CHEESE, BLANK, BREAD, SAUSAGE, BLANK, CHEESE, BLANK, CABBAGE],
            speed: 1.7
        },

        processors: [
            {
                recipe: [CABBAGE],
                result: CABBAGE_SLICE,
                score: 1000,
                x: 2*TILES_PX,
                y: 2*TILES_PX
            },
            {
                recipe: [CHEESE],
                result: CHEESE_SLICE,
                score: 1000,
                x: 7*TILES_PX,
                y: 2*TILES_PX
            },

            {
                recipe: [BREAD, CHEESE_SLICE, CABBAGE_SLICE, SAUSAGE],
                result: SANDWICH,
                score: 4000,
                x: 5*TILES_PX,
                y: 5*TILES_PX
            }

        ],

        finalItems: [SANDWICH]
    },

    // Normal Stage 5
    {id: 14, name: "rice balls",

        clearMessage: "rice from yesterday is the delicious lunch of today.",
        wasteLimit: 7,
        maxScore: 16000,

        conveyorBelt: {
            items: [RICE, RICE, RICE, NORI, NORI, RICE, NORI, RICE, NORI, NORI,
                    BLANK, RICE, RICE, NORI, NORI, RICE, NORI],
            speed: 2.0
        },

        processors: [
            {
                recipe: [RICE, NORI],
                result: ONIGIRI,
                score: 2000,
                x: 2*TILES_PX,
                y: 4*TILES_PX
            },
            {
                recipe: [RICE, NORI],
                result: ONIGIRI,
                score: 2000,
                x: 8*TILES_PX,
                y: 4*TILES_PX
            }
        ],

        finalItems: [ONIGIRI]
    },

    // Normal Stage 6
    {id: 15, name: "lobster soup",

        clearMessage: "seafood expires quickly, cook it sooner rather than later.",
        wasteLimit: 5,
        maxScore: 21000,

        conveyorBelt: {
            items: [WATER, BLANK, LOBSTER, LOBSTER, BLANK, CHILI_PEPPER, LOBSTER, BLANK, WATER, BLANK,
                    CHILI_PEPPER, BLANK, WATER, BLANK, CHILI_PEPPER],
            speed: 1.8
        },

        processors: [
            {
                recipe: [LOBSTER],
                result: LOBSTER_BOILED,
                score: 1500,
                x: 2*TILES_PX,
                y: 2*TILES_PX
            },
            {
                recipe: [CHILI_PEPPER],
                result: SPICE,
                score: 1500,
                x: 7*TILES_PX,
                y: 2*TILES_PX
            },
            {
                recipe: [WATER],
                result: SOUP,
                score: 1000,
                x: 2*TILES_PX,
                y: 5*TILES_PX
            },
            {
                recipe: [LOBSTER_BOILED, SPICE, SOUP],
                result: LOBSTER_SOUP,
                score: 3000,
                x: 8*TILES_PX,
                y: 5*TILES_PX
            }
        ],

        finalItems: [LOBSTER_SOUP]
    },
    
    {id: 16, name: "mamma mia",
    
        clearMessage: "a pepperoni pizza technically covers all four food groups.",
        wasteLimit: 4,
        maxScore: 23000,
    
        conveyorBelt: {
            items:[ BLANK       , MILK        , BREAD    , BLANK        , BLANK     , PEPPER  , BLANK  , BLANK   , SAUSAGE   
                  , TOMATO      , BLANK       , BLANK    , SALAD        , BLANK     , SAUSAGE , BLANK  , CABBAGE   
                  , BLANK       , FLOUR       , BLANK    , BLANK        , TOMATO    , MILK    , BLANK  , CABBAGE 
                  , FLOUR       , BLANK       , BLANK    , PEPPER       , BLANK     , SAUSAGE , PEPPER
                  ], 
            speed: 1.75
        },
    
        processors: [
            { recipe:[MILK, FLOUR],             result: BREAD,          score: 2000, x: 2*TILES_PX, y: 2*TILES_PX },
            { recipe:[TOMATO, CABBAGE],         result: SALAD,          score: 2000, x: 9*TILES_PX, y: 2*TILES_PX },
            { recipe:[PEPPER],                  result: PEPPER_SLICE,   score: 1000, x: 2*TILES_PX, y: 5*TILES_PX },
            { recipe:[SAUSAGE ,BREAD, SALAD, PEPPER_SLICE],   result: PIZZA,    score: 4000, x: 7*TILES_PX, y: 5*TILES_PX }
            
        ],
        finalItems: [PIZZA]
    
    },
    
    {id: 17, name: "oats and fruits",
    
        clearMessage: "good oatmeal will last for over a year inside your pantry.",
        wasteLimit: 4,
        maxScore: 39000,
    
        conveyorBelt: {
            items:[ BLUEBERRY       , YOGURT    , BLANK       , MILK        , WHEAT      , BLANK  , WHEAT  
                  , BLUEBERRY       , BLANK     , BANANA      , BLANK       , MILK       , BLANK  , MILK   
                  , WHEAT           , BLANK     , WHEAT       , WHEAT       , BLANK      , BLANK  , YOGURT
                  , BLUEBERRY       , BLANK     , YOGURT      , BLANK       , BANANA     , BLANK  , BANANA
                  , WHEAT
                  ], 
            speed: 1.85
        },
    
        processors: [
            { recipe:[WHEAT, MILK],                     result: PORRIDGE,       score: 4000, x: 2*TILES_PX, y: 2*TILES_PX },
            { recipe:[BANANA, BLUEBERRY, WHEAT],        result: FRUIT_PLATE,    score: 4500, x: 8*TILES_PX, y: 2*TILES_PX },
            { recipe:[FRUIT_PLATE, PORRIDGE, YOGURT],   result: FRUIT_PORRIDGE, score: 4500, x: 5*TILES_PX, y: 5*TILES_PX }
            
        ],
        finalItems: [FRUIT_PORRIDGE]
    // Porrage = OATS, MILK/WATER, YOGURT, FRUITS
    },
    
    {id: 18, name: "tomatoes on sale",
    
        clearMessage: "many recipes start with tomatoes, you can always find a use for them.",
        wasteLimit: 4,
        maxScore: 23000,
    
        conveyorBelt: {
            items:[ BLANK        , BLANK        , TOMATO        , BLANK         , TOMATO     
                  , BLANK        , CABBAGE_SLICE        , BLANK         , TOMATO        , BLANK       
                  , TOMATO_SLICE , CABBAGE_SLICE        , BLANK         , TOMATO        , CABBAGE_SLICE 
                  , BLANK        , BLANK        , TOMATO        , TOMATO        , TOMATO       
                  , BLANK        , TOMATO       , BLANK         , TOMATO        , BLANK     , CABBAGE_SLICE
                  ], 
            speed: 1.75
        },
    
        processors: [
            { recipe:[TOMATO],                       result: TOMATO_SLICE,    score: 1000, x: 2*TILES_PX, y: 2*TILES_PX },
            { recipe:[TOMATO],                       result: TOMATO_SLICE,    score: 1000, x: 2*TILES_PX, y: 5*TILES_PX },
            { recipe:[TOMATO_SLICE, TOMATO_SLICE],   result: TOMATO_SOUP,     score: 2000, x: 8*TILES_PX, y: 2*TILES_PX },
            { recipe:[TOMATO_SLICE, CABBAGE_SLICE],          result: SALAD,           score: 2000, x: 8*TILES_PX, y: 5*TILES_PX }
            
        ],
        finalItems: [TOMATO_SOUP, SALAD]
    
    },
    /*
    {id: 19, name: "loaf of bread",
    
        clearMessage: "nothing new",
        wasteLimit: 4,
        maxScore: 1600,
    
        conveyorBelt: {
            items:[ BLANK       , BREAD         , BLANK             , BREAD_2           , BLANK         , BLANK     
                  , BREAD_2     , BLANK         , CHEESE_SLICE      , BLANK             , BLANK       
                  , CHEESE_SLICE, BLANK         , BREAD_2           , BLANK             , CHEESE_SLICE 
                  , BLANK       , BLANK         , MEAT_2            , BREAD_2           , BLANK       
                  , BLANK       , CHEESE_SLICE  , BLANK             , BLANK             , MEAT_2        , BLANK     , BREAD
                  ], 
            speed: 1.85
        },
    
        processors: [
            { recipe:[BREAD_2],             result: BREAD,      score: 100, x: 1*TILES_PX, y: 2*TILES_PX },
            { recipe:[BREAD_2],             result: BREAD,      score: 100, x: 1*TILES_PX, y: 5*TILES_PX },
            { recipe:[BREAD, CHEESE_SLICE], result: SANDWICH,   score: 200, x: 6*TILES_PX, y: 2*TILES_PX }, 
            { recipe:[BREAD, MEAT_2],       result: SANDWICH,   score: 200, x: 6*TILES_PX, y: 5*TILES_PX }
        ],
        finalItems: [SANDWICH]
    
    },
    */
    {id: 19, name: "apple pie 2",
    
        clearMessage: "pie is a lot more fun to make from scratch",
        wasteLimit: 4,
        maxScore: 24000,
    
        conveyorBelt: {
            items: [APPLE   , APPLE     , BLANK     , WHEAT     , BLANK     , FLOUR , WHEAT   , BLANK 
                  , WATER   , WATER     , BLANK     , EGGS      , BLANK     , BLANK , WHEAT   , WHEAT   , EGGS   
                  , BLANK   , BLANK     , APPLE     , EGGS      , BLANK     , WHEAT    
                  , WHEAT   , BLANK     , WATER 
                  ], 
            speed: 2
        },
    
        processors: [
            { recipe:[APPLE],                       result: APPLE_SLICE,    score: 1000, x: 2*TILES_PX, y: 2*TILES_PX },
            { recipe:[WHEAT, WHEAT, WHEAT],         result: FLOUR,          score: 3000, x: 2*TILES_PX, y: 5*TILES_PX },
            { recipe:[FLOUR, EGGS, WATER],          result: PIE,            score: 3000, x: 8*TILES_PX, y: 2*TILES_PX }, 
            { recipe:[APPLE_SLICE, PIE],            result: APPLE_PIE,      score: 2000, x: 9*TILES_PX, y: 5*TILES_PX }
        ],
        finalItems: [APPLE_PIE]
        //ORANGE = WHEAT
    },

];

// PPAP
let PPAP = {id: 99999, name: "ppap",

    clearMessage: "pen pineapple apple pen",
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

