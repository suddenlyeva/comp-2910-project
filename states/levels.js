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
    }/*,
    {id: 1,
        name: "pen pineapple apple pen",
        conveyorBelt: {
            items: [APPLE, BLANK, BLANK, APPLE, BLANK, APPLE, APPLE, BLANK, BLANK, BLANK, APPLE],
            speed: 1.2
        },
        processors: []
    }*/
];

function Level(data) {
    this.scene = new PIXI.Container();
    
    this.background = new PIXI.Sprite(PIXI.utils.TextureCache["background.png"]);
    this.scene.addChild(this.background);
    
    
    this.pauseButton = makeSimpleButton(100, 50, "pause", 0x94b8b8, 50);
    this.pauseButton.position.set(CANVAS_WIDTH - 150, 100);
    this.pauseButton.on("pointertap", PauseMenu.open);
    this.scene.addChild(this.pauseButton);
    
    this.levelNumber = data.id;
    this.name = data.name;
	this.processors = [];
	for (let i in data.processors) {
		this.processors.push(
            new Processor(new Recipe(data.processors[i].recipe, data.processors[i].result),this)
		);
        this.processors[i].SetPosition(data.processors[i].x, data.processors[i].y);
        this.processors[i].Spawn();
	}
	
    this.conveyorBelt = new ConveyorBelt(data.conveyorBelt.items, data.conveyorBelt.speed, this);
    this.update = () => {
        this.conveyorBelt.update();
        for (let i in this.processors) {
            this.processors[i].update();
        }
    };
}

Level.open = (data) => {
    // create new instance every time to prevent saving progress
    Level.instance = new Level(data);

    SCENE = Level.instance.scene;
    STATE = Level.instance.update;
}
