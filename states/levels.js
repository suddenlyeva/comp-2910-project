"use strict";

// Size of one tile unit
// TODO: Move to better spot
let TILES_PX = 80;
let PPAP_UNLOCKED = false;

let LEVEL_PROGRESS = [];
// adding or removing a property must be done in 5 places:
// this file       -> in writeToVar: getDefault, setToDefault, if(progress) loop
//                 -> saveProgress
// conveyorbelt.js -> pen.onDragEnd

// technically every getDefault("id", index) can be replaced with LEVELS[index].id and case "id" deleted
//
// property "id" is also not strictly necessary

function loadProgress () {
    // write progress to the LEVEL_PROGRESS variable
    // in the same order as levels appear in the LEVELS array
    function writeToVar (progress = false) {
        let getDefault = (prop, index) => {
            switch(prop) {
                case "id"        : return LEVELS[index].id;
                    // tutorial starts unlocked; assume tutorial is first in the LEVELS arrray
                case "unlocked"  : return index === 0;
                case "highscore" : return 0;
                default          : throw new Error("No default for property: " + prop);
            }
        };

        // set entry at index to a default value
        let setToDefault = (index) => {
            LEVEL_PROGRESS[index] = {
                id        : getDefault("id"       , index),
                unlocked  : getDefault("unlocked" , index),
                highscore : getDefault("highscore", index)
            };
        };


        if(progress) { // fetch from database
            for (let i = 0; i < LEVELS.length; i++) {
                let dbEntry = progress[LEVELS[i].id];
                if(dbEntry == null) { // level id not found in the database
                    setToDefault(i);
                } else {
                    let getDbProp = (prop) => {
                        // if db entry doesn't have requested property, return default
                        return dbEntry[prop] == null ? getDefault(prop, i) : dbEntry[prop];
                    };

                    LEVEL_PROGRESS[i] = {
                        // id is not stored in database as a property so no point using getDbProp
                        id        : getDefault("id", i),
                        unlocked  : getDbProp("unlocked"),
                        highscore : getDbProp("highscore")
                    };
                }
            }
        } else { // load defaults
            for (let i = 0; i < LEVELS.length; i++) {
                setToDefault(i);
            }
        }
    }

    firebase.auth().onAuthStateChanged(function(user) {
        // check user is signed in or not
        if (user) {
            // signed in
            console.log(user.uid);
            console.log("Loading progress from database, please wait...");
            // check the user existence on db
            DATABASE.ref('users/' + user.uid).once('value').then(function(snapshot){
                if(snapshot.exists()) {
                    // the user already exists on db
                    console.log("Found existing user: " + user.uid);
                    // get the user object value and write the user's progress to an array
                    writeToVar(snapshot.val());
                } else {
                    // the user does not exist on db
                    console.log("New user detected: " + user.uid);
                    writeToVar(); // initialize progress with default values
                }
                console.log("Progress loaded.");
            });
        } else {
            console.log("Not logged in");
            writeToVar(); // initialize progress with default values
        }
    });
}

// Saves progress to database
function saveProgress() {
    // check user login status again before saving
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
            // signed in, then save progress
            console.log("Saving progress...");
            for (let i = 0; i < LEVEL_PROGRESS.length; i++) {
                DATABASE.ref('users/' + user.uid + '/' + LEVEL_PROGRESS[i].id).set({
                    unlocked  : LEVEL_PROGRESS[i].unlocked,
                    highscore : LEVEL_PROGRESS[i].highscore
                });
            }
        } else {
            // not signed in, then nothing.
            console.log("Failed to save. Please login.");
        }
    });
}

// Level constructor reads from JSON array
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
        levelDisplayName(this.id, this.name), // -> util.js
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
        PlaySound(eSFXList.ButtonClick, false); // -> sfx.js
        PlaySound(eSFXList.MenuOpen, false);    // -> sfx.js
        StopSound(eSFXList.ClockTicking, true); // -> sfx.js
        this.pauseButton.texture = PIXI.loader.resources["images/spritesheet.json"].textures["pause-off.png"];
        this.isPaused = true;
        PauseMenu.open(this); // -> states/pausemenu.js
    });
    this.scene.addChild(this.pauseButton);

    // Add HP Bar
    this.hpBar = makeProgressBar(5*TILES_PX, 60, 10, 0x222222, 0x00d27f); // -> util.js
    this.hpBar.xScale(1);
    this.hpBar.x += TILES_PX;
    this.hpBar.y += 10;
    this.scene.addChild(this.hpBar);

    // HP Bar Tracks Waste
    this.hpBar.update = () => {
        // Smoothly Scale HP
        if ( this.hpBar.getScale() > (1 - this.completionData.waste / data.wasteLimit)) {
            this.hpBar.xScale(this.hpBar.getScale() * 0.975 ); // -> util.js
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

    // Called every frame
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
            if (!(this.completionData.waste >= data.wasteLimit)) {
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
                if (!(this.completionData.waste >= data.wasteLimit)) {
                    StageComplete.open(this.completionData); // -> states/stagecomplete.js
                }
                else {
                    GameOver.open(); // -> states/gameover.js
                }
            }
        }

        // Pause Button fix
        if(this.isPaused) {
            this.pauseButton.texture = PIXI.loader.resources["images/spritesheet.json"].textures["pause-on.png"];
            this.isPaused = false;
        }

    };

    // PPAP sound
    if(data.id == PPAP.id) {
        sounds[eMusicList.PPAP].playFrom(0); // -> sfx.js
        StopSound(eMusicList.Music, true);   // -> sfx.js
    }

}

// Function to open. Level recreates itself
// Takes in level data
Level.open = (data) => {
    Level.instance = new Level(data);

    SCENE = Level.instance.scene;
    STATE = Level.instance.update;
};

// Opens a level based on its data id
Level.openById = (id) => {
    Level.open(LEVELS[findIndexById(LEVELS, id)]);
}
