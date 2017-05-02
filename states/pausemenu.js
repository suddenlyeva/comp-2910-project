"use strict";

let pauseScene;
function openPauseMenu() {
    if(pauseScene == null) {
        // Make Buttons and Background
        let resumeButton = makeSimpleButton(100, 50, "Resume", 0xb3ecec);
        let optionsButton = makeSimpleButton(100, 50, "Options", 0x94b8b8);
        let background = new PIXI.Graphics();
        background.beginFill(0x6a0e1d);
        background.drawRect(0, 0, canvasWidth, canvasHeight);
        background.alpha = 0.4;
        background.endFill();

        // Add to scene
        pauseScene = new PIXI.Container();
        pauseScene.addChild(background);
        pauseScene.addChild(resumeButton);
        pauseScene.addChild(optionsButton);

        // Position Buttons
        resumeButton.position.set(150, 200);
        optionsButton.position.set(150, 300);

        // Play button moves to stage select
        resumeButton.on("pointertap", () => {
            STATE = stateBuffer;
            SCENE.removeChild(optionsMenuScene);
            SCENE.removeChild(pauseScene);
        });

        // Options button opens an options panel
        optionsButton.on("pointertap", () => {
            // STATE = openOptionsMenu;
            openOptionsMenu();
            });
    }

    SCENE.addChild(pauseScene);
    STATE = pause;
}

function pause() {
}

