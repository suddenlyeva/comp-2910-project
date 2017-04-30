"use strict";

// This should probably be part of the level object;

let stageCompleteScene;

function openStageComplete() {

    // First Initialize Only
    if(stageCompleteScene == null) {
        let width = 200,
            height = 400;

        // Make Panel and Buttons
        let panel = new PIXI.Graphics();
        panel.lineStyle(1, 0, 1);
        panel.beginFill(0xcecfe2);
        panel.drawRect(0, 0, width, height);
        panel.endFill();
        let continueButton = makeSimpleButton(100, 50, "Continue", 0x00d27f);
        let backButton = makeSimpleButton(50, 50, "Back", 0xaa3355);

        // Add to scene
        stageCompleteScene = new PIXI.Container();
        stageCompleteScene.addChild(panel);
        stageCompleteScene.addChild(backButton);
        stageCompleteScene.addChild(continueButton);

        // Position stuff
        continueButton.position.set(10, 10);
        backButton.position.set(continueButton.width + 20, 10);
        stageCompleteScene.position.set(
            canvasWidth / 2 - width / 2,
            canvasHeight / 2 - height / 2);

        // Continue button moves to next stage
        continueButton.on("pointertap", () => {
            stageCompleteScene.visible = false;
            SCENE.removeChild(stageCompleteScene);
            nextStage();
            STATE = STAGES[currentStage];
        });

        // Back button takes you to the main menu
        backButton.on("pointertap", () => {
            SCENE.removeChild(stageCompleteScene);
            STATE = openMainMenu;
        });
    }

    // Every time opened
    stageCompleteScene.visible = true;
    // using addChild and remove because there are
    // multiple scenes that use this scene
    SCENE.addChild(stageCompleteScene);
	STATE = stageComplete;
}

function stageComplete() {
}
