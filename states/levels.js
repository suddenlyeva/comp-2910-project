"use strict";

// JSON
let LEVELS = [
    {id: 0,
        name: "tutorial",
        conveyorBelt: {
            items: [APPLE, BLANK, BLANK, APPLE, BLANK, APPLE, APPLE, BLANK, BLANK, BLANK, APPLE],
            speed: 0.8
        },
        processors: []
    },
    {id: 1,
        conveyorBelt: {
            items: [APPLE, BLANK, BLANK, APPLE, BLANK, APPLE, APPLE, BLANK, BLANK, BLANK, APPLE],
            speed: 1.2
        },
        processors: []
    }
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
    this.processors = data.processors;
    this.conveyorBelt = new ConveyorBelt(data.conveyorBelt.items, data.conveyorBelt.speed, this);
    this.update = () => {
        this.conveyorBelt.update();
    };
}

Level.open = (data) => {
    
    if(Level.instance == null) {
        Level.instance = new Level(data);
    }

    SCENE = Level.instance.scene;
    STATE = Level.instance.update;
}