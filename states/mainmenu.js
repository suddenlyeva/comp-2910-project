"use strict";

let mainMenuScene;

function MainMenu() {
    this.scene = new PIXI.Container();

    // TODO: Make Background
    this.background = new PIXI.Container();
    this.bgTri = new PIXI.Graphics();
    this.bgTri.beginFill();

    this.bgTri.endFill();

    // Make Buttons
    this.distFromEdge = 200;
    this.buttonWidth = RENDERER.width / 2 - this.distFromEdge - 20; // 20 between buttons
    this.buttonHeight = RENDERER.height / 2;
    this.playButton = makeSimpleButton(this.buttonWidth, this.buttonHeight,
        "Play", 0xb3ecec, this.buttonHeight / 4);
    this.optionsButton = makeSimpleButton(this.buttonWidth, this.buttonHeight,
        "Options", 0x94b8b8, this.buttonHeight / 4);

    this.playButton.position.set(this.distFromEdge,
        RENDERER.height / 2 - this.playButton.height / 2);
    this.optionsButton.position.set(RENDERER.width - this.optionsButton.width - this.distFromEdge,
        RENDERER.height / 2 - this.optionsButton.height / 2);

    // Play button moves to stage select
    this.playButton.on("pointertap", function () {
        closeOptionsMenu();
        openStageSelect();
    });

    // Options button opens an options panel
    this.optionsButton.on("pointertap", openOptionsMenu);

    // Add to scene
    this.scene.addChild(this.background);
    this.scene.addChild(this.playButton);
    this.scene.addChild(this.optionsButton);

    // Update function to be called by the main game loop
    this.update = function() {};
}

function openMainMenu() {
    if(mainMenuScene == null) {
        mainMenuScene = new MainMenu();
    }

    RENDERER.backgroundColor = 0x00d27f;
    SCENE = mainMenuScene.scene;
    STATE = mainMenuScene.update;
}
