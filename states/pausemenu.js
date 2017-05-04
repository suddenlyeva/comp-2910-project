"use strict";

function PauseMenu() {
    this.scene = new PIXI.Container();
    // holds the state before the pause
    this.stateBuffer;

    // pause the game when scene gets added
    this.scene.on("added", () => {
        this.stateBuffer = STATE;
        STATE = this.update;
    });

    // Make Buttons
    this.resumeButton = makeSimpleButton(100, 50, "resume", 0xb3ecec, 50);
    this.optionsButton = makeSimpleButton(100, 50, "options", 0x94b8b8, 50);

    // Make background elements and add them to the background container
    this.background = new PIXI.Container();
    // prevent the scene under from being clickable
    this.background.interactive = true;

    this.bgFill = new PIXI.Graphics();
    this.bgFill.beginFill(0x6a0e1d);
    this.bgFill.drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.bgFill.alpha = 0.4;
    this.bgFill.endFill();

    this.background.addChild(this.bgFill);

    // Add to scene
    this.scene.addChild(this.background);
    this.scene.addChild(this.resumeButton);
    this.scene.addChild(this.optionsButton);

    // Position Buttons
    this.resumeButton.position.set(150, 200);
    this.optionsButton.position.set(150, 300);

    // Play button moves to stage select
    // Requres "this" context to operate so we use () => {}
    this.resumeButton.on("pointertap", () => { this.unpause() });

    // Options button opens an options panel
    this.optionsButton.on("pointertap", OptionsMenu.open);

    this.update = function() {};

    this.unpause = function() {
        STATE = this.stateBuffer;
        OptionsMenu.close();
        this.scene.parent.removeChild(this.scene);
    };
}

PauseMenu.open = () => {
    if(PauseMenu.instance == null) {
        PauseMenu.instance = new PauseMenu();
    }

    SCENE.addChild(PauseMenu.instance.scene);
}

