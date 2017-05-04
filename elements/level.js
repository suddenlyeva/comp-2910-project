
function Level(levelNumber, conveyorItems, conveyorSpeed, processors) {
    this.scene = new PIXI.Container();
    this.background = new PIXI.Sprite(PIXI.utils.TextureCache["background.png"]);
    this.scene.addChild(this.background);
    this.levelNumber = levelNumber;
    this.processors = processors;
    this.conveyorBelt = new ConveyorBelt(conveyorItems, conveyorSpeed, this);
    this.update = () => {
        this.conveyorBelt.update();
    };
}

Level.open = () => {
    
    let ITEMS = [
    APPLE,
    BLANK,
    BLANK,
    APPLE,
    BLANK,
    APPLE,
    APPLE,
    BLANK,
    BLANK,
    APPLE,
    BLANK,
    APPLE,
    APPLE,
    BLANK,
    BLANK,
    APPLE,
    BLANK,
    APPLE,
    APPLE,
    BLANK,
    BLANK,
    APPLE,
    BLANK,
    APPLE,
    APPLE,
    BLANK,
    BLANK,
    APPLE,
    BLANK,
    APPLE
    ];
    
    let CONVEYOR_SPEED = 0.8;
    
    if(Level.instance == null) {
        Level.instance = new Level(0, ITEMS, CONVEYOR_SPEED);
    }

    SCENE = Level.instance.scene;
    STATE = Level.instance.update;
}