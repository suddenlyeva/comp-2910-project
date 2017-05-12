"use strict";

let TILES_PX = 80;

// JSON
let LEVELS = [
    // current reset button implementation requires id to be equal to index
    {id: 0, name: "tutorial",
    
        wasteLimit: 3,
		
        conveyorBelt: {
            items: [APPLE,BLANK,APPLE,BLANK,APPLE],
            speed: 1.2
        },
		
        processors: [
            {
                recipe: [APPLE],
                result: APPLE_SLICE,
                x: 7*TILES_PX,
                y: 3*TILES_PX
            }
		],
		
		finalItems: [APPLE_SLICE]
    },
    {id: 1, name: "apple apple banana",
	
        wasteLimit: 5,
    
        conveyorBelt: {
            items: [APPLE, BLANK, APPLE, APPLE, BLANK, APPLE, APPLE, BLANK, BLANK, BLANK, APPLE],
            speed: 1.2
        },
		
        processors: [
            {
                recipe: [APPLE, APPLE],
                result: BANANA,
                x: 7*TILES_PX,
                y: 4*TILES_PX
            }
		],
		
		finalItems: [BANANA]
    },
    {id: 2, name: "fruit yogurt",

        wasteLimit: 5,

        conveyorBelt: {
            items: [ORANGE, BLANK, KIWI, KIWI, BLANK, ORANGE, ORANGE, BLANK, BLANK, BLANK, YOGURT],
            speed: 1.2
        },

        processors: [
            {
                recipe: [ORANGE],
                result: ORANGE_SLICE,
                x: 1*TILES_PX,
                y: 2*TILES_PX
            },
            {
                recipe: [KIWI],
                result: KIWI_SLICE,
                x: 7*TILES_PX,
                y: 2*TILES_PX
            },
            {
                recipe: [ORANGE_SLICE, KIWI_SLICE, YOGURT],
                result: FRUIT_YOGURT,
                x: 1*TILES_PX,
                y: 5*TILES_PX
            }
        ],

        finalItems: [FRUIT_YOGURT]
    }
];

function Level(data) {
    // Score variable
    let score = 0;

    // Identifiers
    this.id = data.id;
    this.name = data.name;

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
    this.levelTxt = new PIXI.Text("level " + this.id + " : " + this.name, this.txtStyle);
    this.levelTxt.position.set(TILES_PX * 7, 0);
    this.scene.addChild(this.levelTxt);

    this.txtStyle = new PIXI.TextStyle({
        fontFamily: FONT_FAMILY, fontSize: 192, fill: 0x0
    });

    // Add Score txt
    this.score = 0;
    this.scoreTxt = new PIXI.Text(("00000" + this.score).slice(-5), this.txtStyle);
    this.scoreTxt.anchor.set(0, 0.3);
    this.scoreTxt.position.set(TILES_PX * 13, 0);
    this.scene.addChild(this.scoreTxt);

    // Add Pause Button
    this.isPaused = false;
    this.pauseButton = new PIXI.Sprite(PIXI.loader.resources["images/spritesheet.json"].textures["pause-on.png"]);
    this.pauseButton.position.set(CANVAS_WIDTH - TILES_PX, 0);
    this.pauseButton.interactive = true;
    this.pauseButton.buttonMode = true;
    this.pauseButton.on("pointertap", () => {
        this.pauseButton.texture = PIXI.loader.resources["images/spritesheet.json"].textures["pause-off.png"];
        this.isPaused = true;
        PauseMenu.open(this);
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
    this.gear = makeGear("m", data.conveyorBelt.speed);
    this.gear.anchor.set(0.5);
    this.gear.position.set(TILES_PX / 2, TILES_PX / 2);
    this.scene.addChild(this.gear);
    
    // Add Constantine
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
        if (this.completionData.waste >= data.wasteLimit) {
            this.isComplete = true;
        }
    };
    
	// Identifiers
    this.id = data.id;
    this.name = data.name;
	
	// Load processors
	this.processors = [];
	for (let i in data.processors) {
		this.processors.push(
            new Processor(new Recipe(data.processors[i].recipe, data.processors[i].result),this)
		);
        this.processors[i].SetPosition(data.processors[i].x, data.processors[i].y);
        this.processors[i].Spawn();
	}
	
    // Check all processors for processing state
    this.processorsActive = () => {
        for (let i in this.processors) {
            if(this.processors[i].currentState == 1) {
                return true;
            }
            else {
                return false;
            }
        }
    }
    
	// Load Conveyor Belt
    this.conveyorBelt = new ConveyorBelt(data.conveyorBelt.items, data.conveyorBelt.speed, this);
	
	// Completion trackers
	this.isComplete = false;
	this.timeOut = 120;
	
	// Passed to stage complete menu
	this.completionData = {
		waste: 0,
		itemsComplete: []
	};
	
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
        if (!this.isComplete) {
            for (let i in this.conveyorBelt.items) {
                if (this.conveyorBelt.items[i].type != BLANK) {
                    return false;
                }
            }
        }
		return true;
	};

	// Getter for score
    this.getScore = () => {
        return this.score;
    };

    // Setter for score
    this.addScore = (numToAdd) => {
        this.score += numToAdd;
    };

    this.update = () => {
        
        // Update scene objects
        this.conveyorBelt.update();
        // this.scoreTxt.text = ("00000" + this.score).slice(-5);
        this.scoreTxt.text = padZeroForInt(this.score, 5);
        for (let i in this.processors) {
            this.processors[i].update();
        }
        this.gear.update();
        this.hpBar.update();
		
        // Timeout on completion
		if(this.isComplete && !this.processorsActive()) {
			this.timeOut -= TICKER.deltaTime;
			if (this.timeOut <= 0) {
				StageComplete.open(this.completionData);
			}
		}
        
        // Pause Button fix
		if(this.isPaused) {
            this.pauseButton.texture = PIXI.loader.resources["images/spritesheet.json"].textures["pause-on.png"];
            this.isPaused = false;
        }
		
    };
}

Level.open = (data) => {
    // create new instance every time to prevent saving progress
    Level.instance = new Level(data);

    SCENE = Level.instance.scene;
    STATE = Level.instance.update;
}
