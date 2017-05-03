"use strict";

function StageComplete() {
    this.width  = 200;
    this.height = 400;

    this.scene = new PIXI.Container();

    // Make Panel and Buttons
    this.panel = new PIXI.Graphics();
    this.panel.lineStyle(1, 0, 1);
    this.panel.beginFill(0xcecfe2);
    this.panel.drawRect(0, 0, this.width, this.height);
    this.panel.endFill();
    this.continueButton = makeSimpleButton(100, 50, "Continue", 0x00d27f);
    this.backButton = makeSimpleButton(50, 50, "Back", 0xaa3355);

    // Add to scene
    this.scene.addChild(this.panel);
    this.scene.addChild(this.backButton);
    this.scene.addChild(this.continueButton);

    // Position stuff
    this.continueButton.position.set(10, 10);
    this.backButton.position.set(this.continueButton.width + 20, 10);
    this.scene.position.set(
        RENDERER.width / 2 - this.width / 2,
        RENDERER.height / 2 - this.height / 2);

    // Continue button moves to next stage
    this.continueButton.on("pointertap", () => {
        this.scene.parent.removeChild(this.scene);
        nextStage();
        STATE = STAGES[currentStage];
    });

    // Back button takes you to the main menu
    this.backButton.on("pointertap", () => {
        this.scene.parent.removeChild(this.scene);
        StageSelect.open();
    });

    this.update = () => {};
}

StageComplete.open = () => {
    if(StageComplete.instance == null) {
        StageComplete.instance = new StageComplete();
    }

    SCENE.addChild(StageComplete.instance.scene);
    STATE = StageComplete.instance.update;
}
