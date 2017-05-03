"use strict";

let mainMenuScene;

function MainMenu() {
    this.scene = new PIXI.Container();

    // TODO: Make Background
    this.background = new PIXI.Container();

    // Make Buttons
    this.playButton = makeSimpleButton(100, 50, "Play", 0xb3ecec);
    this.optionsButton = makeSimpleButton(100, 50, "Options", 0x94b8b8);

    this.playButton.position.set(150, 200);
    this.optionsButton.position.set(150, 300);

    // Play button moves to stage select
    this.playButton.on("pointertap", function () {
        closeOptionsMenu();
        // openStageSelect();
        // Test Code
        STATE = ingredientTest;
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
