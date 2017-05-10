"use strict";

let TILES_PX = 80;

// JSON
let LEVELS = [
    // current reset button implementation requires id to be equal to index
    {id: 0, name: "tutorial",
		
        conveyorBelt: {
            items: [APPLE],
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
    }
];

function Level(data) {
	// Declare scene
    this.scene = new PIXI.Container();
    
	// Add background
    this.background = new PIXI.Sprite(PIXI.utils.TextureCache["background.png"]);
    this.scene.addChild(this.background);
	this.background.y += TILES_PX;
    
	// Add Pause Button
    this.isPaused = false;
    this.pauseButton = new PIXI.Sprite(PIXI.utils.TextureCache["pause-on.png"]);
    this.pauseButton.position.set(CANVAS_WIDTH - TILES_PX, 0);
    this.pauseButton.interactive = true;
    this.pauseButton.buttonMode = true;
    this.pauseButton.on("pointertap", () => {
        this.pauseButton.texture = PIXI.loader.resources["images/spritesheet.json"].textures["pause-off.png"];
        this.isPaused = true;
        PauseMenu.open(this);
    });
    this.scene.addChild(this.pauseButton);

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
		for (let i in this.conveyorBelt.items) {
			if (this.conveyorBelt.items[i].type != BLANK) {
				return false;
			}
		}
		return true;
	};
	
    this.update = () => {
        this.conveyorBelt.update();
        for (let i in this.processors) {
            this.processors[i].update();
        }
		
		if(this.isComplete) {
			this.timeOut -= TICKER.deltaTime;
			if (this.timeOut <= 0) {
				StageComplete.open(this.completionData);
			}
		}

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
