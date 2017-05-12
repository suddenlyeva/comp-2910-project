"use strict";

// TODO: Overhaul
// Shows when stage is complete
function StageComplete(data) {
    this.width  = 200;
    this.height = 400;

    this.scene = new PIXI.Container();

    // Make Panel and Buttons
    this.panel = new PIXI.Graphics();
    this.panel.lineStyle(1, 0, 1);
    this.panel.beginFill(0xcecfe2);
    this.panel.drawRect(0, 0, this.width, this.height);
    this.panel.endFill();
    this.continueButton = makeSimpleButton(100, 50, "continue", 0x00d27f, 50);  // -> util.js
    this.backButton = makeSimpleButton(50, 50, "back", 0xaa3355, 50);           // -> util.js

    // Add to scene
    this.scene.addChild(this.panel);
    this.scene.addChild(this.backButton);
    this.scene.addChild(this.continueButton);

    // Position stuff
    this.continueButton.position.set(10, 10);
    this.backButton.position.set(this.continueButton.width + 20, 10);
    this.scene.position.set(
        CANVAS_WIDTH / 2 - this.width / 2,
        CANVAS_HEIGHT / 2 - this.height / 2);

    // Continue button moves to next stage
    this.continueButton.on("pointertap", () => {
        let next = Level.instance.id + 1;
        this.scene.parent.removeChild(this.scene);
        if (next >= LEVELS.length) {
            Credits.open(); // -> states/credits.js
        }
        else {
            Level.open(LEVELS[next]); // -> states/levels.js
        }
        ;
    });

    // Back button takes you to the main menu
    this.backButton.on("pointertap", () => {
        this.scene.parent.removeChild(this.scene);
        StageSelect.open(); // -> states/stageselect.js
    });

    this.update = () => {};
}

StageComplete.open = (completionData) => {
    if(StageComplete.instance == null) {
        StageComplete.instance = new StageComplete(completionData);
    }

    SCENE.addChild(StageComplete.instance.scene);
    STATE = StageComplete.instance.update;
}
