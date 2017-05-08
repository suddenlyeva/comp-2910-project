"use strict";

function StageSelect() {

    this.scene = new PIXI.Container();

    // Make background
    this.background = new PIXI.Container();
    this.bgFill = new PIXI.Graphics();
    this.bgFill.beginFill(0x5d32ea);
    this.bgFill.drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.bgFill.endFill();

    this.background.addChild(this.bgFill);

    this.scene.addChild(this.background);

    // Declare an array of buttons
    this.stageBtns = [];
    // Initialize buttons
    for(let i = 0; i < LEVELS.length; i++) {

        // Create
        this.stageBtns.push(makeSimpleButton(100, 50, "stage " + i, 0xffdfba, 50));
        //this.stageBtns.push(makeSimpleButton(750, 450, "stage " + i, 0xffdfba, 150));

        // Add to group
        this.scene.addChild(this.stageBtns[i]);

        // Position
        this.stageBtns[i].position.set(i * 120 + 60, 100);
        //this.stageBtns[i].position.set(CANVAS_WIDTH/2 - 375, CANVAS_HEIGHT/2 - 225);
        
        //
        // TODO: Build rest of stage select auto placement
        //

        // Set behaviour
        this.stageBtns[i].on("pointertap", function () {
            Level.open(LEVELS[i]);
        });
    }

    this.backToMainMenu = makeSimpleButton(200, 50, "back to main menu", 0xb3ecec, 50);
    this.backToMainMenu.position.set(CANVAS_WIDTH - 220, CANVAS_HEIGHT - 70);
    this.backToMainMenu.on("pointertap", MainMenu.open);

    this.scene.addChild(this.backToMainMenu);

    this.update = () => {};
}

StageSelect.open = () => {
    if(StageSelect.instance == null) {
        StageSelect.instance = new StageSelect();
    }

    SCENE = StageSelect.instance.scene;
    STATE = StageSelect.instance.update;
}
