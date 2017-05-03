"use strict";

let mainMenuScene;

function openMainMenu() {

    // First Initialize Only
    if(mainMenuScene == null) {

        // Make Buttons
        let playButton = makeSimpleButton(100, 50, "Play", 0xb3ecec);
        let optionsButton = makeSimpleButton(100, 50, "Options", 0x94b8b8);

        // Add to scene
        mainMenuScene = new PIXI.Container();
        mainMenuScene.addChild(playButton);
        mainMenuScene.addChild(optionsButton);

        // Position Buttons
        playButton.position.set(150, 200);
        optionsButton.position.set(150, 300);

        // Play button moves to stage select
        playButton.on("pointertap", () => {
            SCENE.removeChild(optionsMenuScene);
            // Test Code
            STATE = ingredientTest;
        });

        // Options button opens an options panel
        optionsButton.on("pointertap", () => {
            // STATE = openOptionsMenu;
            openOptionsMenu();
        });
    }

    // Every time opened
    renderer.backgroundColor = 0x00d27f;
    SCENE = mainMenuScene;
    STATE = mainMenu;
}

// Update loop
function mainMenu() {

}
