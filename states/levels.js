"use strict";

let TILES_PX = 64;

// JSON
let LEVELS = [
    // current reset button implementation requires id to be equal to index
    {id: 0,
        name: "tutorial",
        conveyorBelt: {
            items: [BLANK,APPLE],
            speed: 1.0
        },
        processors: [
            {
                recipe: [APPLE],
                result: APPLE_SLICE,
                x: 7*TILES_PX,
                y: 4*TILES_PX
            }
		]
    },
    {id: 1,
        name: "apple apple banana",
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
		]
    }
];

function Level(data) {
	// Declare scene
    this.scene = new PIXI.Container();
    
	// Add background
    this.background = new PIXI.Sprite(PIXI.utils.TextureCache["background.png"]);
    this.scene.addChild(this.background);
    
	// Add Pause Button
    this.pauseButton = makeSimpleButton(100, 50, "pause", 0x94b8b8, 50);
    this.pauseButton.position.set(CANVAS_WIDTH - 150, 100);
    this.pauseButton.on("pointertap", PauseMenu.open);
    this.scene.addChild(this.pauseButton);
    
	// Identifiers
    this.levelNumber = data.id;
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
	this.timeOut = 300;
	
	this.completionData = {
		waste: 0,
		itemsComplete: []
	};
	
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
			this.timeOut--;
			if (this.timeOut == 0) {
				StageComplete.open(this.completionData);
			}
		}
		
    };
}

Level.open = (data) => {
    // create new instance every time to prevent saving progress
    Level.instance = new Level(data);

    SCENE = Level.instance.scene;
    STATE = Level.instance.update;
}
