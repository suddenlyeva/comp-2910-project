"use strict";

// Size of one tile unit
// TODO: Move to better spot
let TILES_PX = 80;

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

let PPAP_UNLOCKED = false;
let PPAP = {id: LEVELS.length, name: "ppap",
        
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

let LEVEL_PROGRESS = [];
function loadProgress () {
    firebase.auth().onAuthStateChanged(function(user) {
        // check user is signed in or not
        if (user) {
            // signed in
            console.log(user.uid);
            // check the user existence on db
            DATABASE.ref('users/' + user.uid).once('value').then(function(snapshot){
                if(snapshot.exists()) {
                    // the user already exists on db
                    console.log("existing : " + user.uid);
                    // get the user object value
                    let progress = snapshot.val();
                    // load the user's progress
                    for (let i = 0; i < LEVELS.length; i++) {
                        LEVEL_PROGRESS[i] = {
                            unlocked: progress[i].unlocked,
                            highscore: progress[i].highscore
                        };
                    }
                } else {
                    // the user is not existed on db
                    console.log("no exiting : " + user.uid);
                    // initialize progress with default values
                    for (let i = 0; i < LEVELS.length; i++) {
                        if(i <= 0) {
                            LEVEL_PROGRESS[i] = {
                                unlocked: true,
                                highscore: 0
                            };
                        } else {
                            LEVEL_PROGRESS[i] = {
                                unlocked: false,
                                highscore: 0
                            };
                        }
                    }
                }
            });
        } else {
            // not signed in.
            console.log("Not logged in");
            // initialize progress with default values
            LEVEL_PROGRESS[0] = {
               unlocked: true,
               highscore: 0
            };
            for (let i = 1; i < LEVELS.length; i++) {
                LEVEL_PROGRESS[i] = {
                    unlocked: false,
                    highscore: 0
                };
            }
        }
    });
}

function saveProgress() {
    // check user login status again before saving
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // signed in, then save progress
            console.log("Saving progress...");
            for (let i = 0; i < LEVELS.length; i++) {
                DATABASE.ref('users/' + user.uid + '/' + i).set({
                    unlocked: LEVEL_PROGRESS[i].unlocked,
                    highscore: LEVEL_PROGRESS[i].highscore
                });
            }
        } else {
            // not signed in, then nothing.
            console.log("Failed to save. Please login.");
        }
    });
}

function Level(data) {

    // Identifiers
    this.id = data.id;
    this.name = data.name;

    // Passed to stage complete menu
    this.completionData = {
        id: data.id,
        maxScore: data.maxScore,
        clearMessage: data.clearMessage,
        score: 0,
        waste: 0,
        itemsComplete: []
    };

    // Declare scene
    this.scene = new PIXI.Container();

    // Add background
    this.background = new PIXI.extras.TilingSprite(
        PIXI.loader.resources["images/spritesheet.json"].textures["background.png"],
        16*TILES_PX,
        9*TILES_PX
    );
    this.scene.addChild(this.background);

    // Add topbar
    this.topbar = new PIXI.extras.TilingSprite(
        PIXI.loader.resources["images/spritesheet.json"].textures["topbar.png"],
        16*TILES_PX,
        TILES_PX
    );
    this.scene.addChild(this.topbar);

    // Add Level txt
    this.txtStyle = new PIXI.TextStyle({
        fontFamily: FONT_FAMILY, fontSize: 96, fill: 0x0
    });
    this.levelTxt = new PIXI.Text(
        (this.id !== 0 ? "level " + this.id + " :" : "") + " " + this.name,
        this.txtStyle);
    this.levelTxt.position.set(TILES_PX * 7, 0);
    this.scene.addChild(this.levelTxt);

    // Add Score txt
    this.txtStyle = new PIXI.TextStyle({
        fontFamily: FONT_FAMILY, fontSize: 192, fill: 0x0
    });
    this.scoreTxt = new PIXI.Text(padZeroForInt(0, 5), this.txtStyle);
    this.scoreTxt.anchor.set(0, 0.3);
    this.scoreTxt.position.set(TILES_PX * 13, 0);
    this.scene.addChild(this.scoreTxt);

    // Adds to the Level's score
    this.addScore = (addedScore) => {
        this.completionData.score += addedScore;
        this.scoreTxt.text = padZeroForInt(this.completionData.score, 5);
    };

    // Add Pause Button
    this.isPaused = false;
    this.pauseButton = new PIXI.Sprite(PIXI.loader.resources["images/spritesheet.json"].textures["pause-on.png"]);
    this.pauseButton.position.set(CANVAS_WIDTH - TILES_PX, 0);
    this.pauseButton.interactive = true;
    this.pauseButton.buttonMode = true;
    this.pauseButton.on("pointertap", () => {
        sounds["sounds/menu-open.wav"].play();
        sounds["sounds/button-click.wav"].play();
        this.pauseButton.texture = PIXI.loader.resources["images/spritesheet.json"].textures["pause-off.png"];
        this.isPaused = true;
        PauseMenu.open(this); // -> states/pausemenu.js
    });
    this.scene.addChild(this.pauseButton);

    // Add HP Bar
    this.hpBar = makeProgressBar(5*TILES_PX, 60, 10, 0x222222, 0x00d27f);
    this.hpBar.xScale(1);
    this.hpBar.x += TILES_PX;
    this.hpBar.y += 10;
    this.scene.addChild(this.hpBar);

    // HP Bar Tracks Waste
    this.hpBar.update = () => {
        // Smoothly Scale HP
        if ( this.hpBar.getScale() > (1 - this.completionData.waste / data.wasteLimit)) {
            this.hpBar.xScale(this.hpBar.getScale() * 0.975 );
        }
    };

    // Add Gear
    this.gear = makeGear("m", data.conveyorBelt.speed); // -> util.js
    this.gear.anchor.set(0.5);
    this.gear.position.set(TILES_PX / 2, TILES_PX / 2);
    this.scene.addChild(this.gear);

    // Add Constantine the Apple
    this.constantine = new PIXI.Sprite(
        PIXI.loader.resources["images/spritesheet.json"].textures["constantine-happy.png"]
    );
    this.constantine.anchor.set(0.5);
    this.constantine.position.set(TILES_PX / 2, TILES_PX / 2 - 12);
    this.scene.addChild(this.constantine);

    // Change stuff as waste is tracked
    this.neutralLimit = data.wasteLimit * 0.5;
    this.sadLimit = data.wasteLimit * 0.8;

    this.updateWasteInfo = () => {
        if (this.completionData.waste >= this.sadLimit) {
            this.constantine.texture = PIXI.loader.resources["images/spritesheet.json"].textures["constantine-sad.png"];
            this.hpBar.setColor(0xFF2222);
        }
        else if (this.completionData.waste >= this.neutralLimit) {
            this.constantine.texture = PIXI.loader.resources["images/spritesheet.json"].textures["constantine-neutral.png"];
            this.hpBar.setColor(0xFFFF22);
        }
    };

    // Load processors
    this.processors = [];
    for (let i in data.processors) {
        this.processors.push(
            new Processor( new Recipe(data.processors[i].recipe, data.processors[i].result, data.processors[i].score), this ) // -> elements/processor.js
        );
        this.processors[i].SetPosition(data.processors[i].x, data.processors[i].y); // -> elements/processor.js
        this.processors[i].Spawn();                                                 // -> elements/processor.js
    }

    // Load Conveyor Belt
    this.conveyorBelt = new ConveyorBelt(data.conveyorBelt.items, data.conveyorBelt.speed, this); // -> elements/conveyorbelt.js

    // Completion trackers
    this.isComplete = false;
    this.timeOut = 120;
    this.itemPickedup = false;

    // Check if an item is the level's final item.
    this.isFinalItem = (itemType) => {
        for (let i in data.finalItems) {
            if (itemType == data.finalItems[i]) {
                return true;
            }
        }

        return false;
    };

    // Checks if the level is over
    this.checkForCompletion = () => {

        // HP Check
        if (this.completionData.waste >= data.wasteLimit) {
            return true;
        }

        // Conveyor Check
        for (let i in this.conveyorBelt.items) {
            if (this.conveyorBelt.items[i].type != BLANK) {
                return false;
            }
        }
        
        // Item Check
        if (this.itemPickedup) {
            return false;
        }

        return true;
    };

    this.update = () => {

        // Update scene objects
        this.conveyorBelt.update();
        for (let i in this.processors) {
            this.processors[i].update(); // elements/processor.js
        }
        this.gear.update();
        this.hpBar.update();

        // Timeout on completion
        if(this.isComplete) {
            
            if (!this.completionData.waste >= data.wasteLimit) {
                // Processor Check
                for (let i in this.processors) {
                    if(this.processors[i].GetState() > 0) { // Any active or waiting state.
                        this.timeOut = 120; // Stall if it catches a false flag.
                    }
                }
            }
            // Re-Authenticate
            if (this.checkForCompletion()) {

                this.timeOut -= TICKER.deltaTime; // Tick

            }
            // Move to Stage Complete
            if (this.timeOut <= 0) {
                if (!this.completionData.waste >= data.wasteLimit) {
                    StageComplete.open(this.completionData); // -> states/stagecomplete.js
                }
                else {
                    GameOver.open();
                }
            }
        }

        // Pause Button fix
        if(this.isPaused) {
            this.pauseButton.texture = PIXI.loader.resources["images/spritesheet.json"].textures["pause-on.png"];
            this.isPaused = false;
        }

    };
    
    if(data.id == PPAP.id) {
        PlaySound(eSFXList.PPAP);
    }
    
}

// Function to open. Level recreates itself
// Takes in level data
Level.open = (data) => {
    Level.instance = new Level(data);

    SCENE = Level.instance.scene;
    STATE = Level.instance.update;
}
