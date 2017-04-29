"use strict";

let mainMenuScene;

function openMainMenu() {
    
    // First Initialize Only
    if(mainMenuScene == null) {
        
        // Make Buttons
        let playButton = game.button(["images/play_button.png"]);
        let optionsButton = game.button(["images/options_button.png"]);
        
        // Add to scene
        mainMenuScene = game.group();
        mainMenuScene.buttons = groupButtons(playButton, optionsButton);
        mainMenuScene.addChild(mainMenuScene.buttons);

        // Position Buttons
        playButton.position.set(100, 100);
        optionsButton.position.set(100, 300);
        
        // Play button moves to stage select
        playButton.tap = () => {
            mainMenuScene.buttons.disable();
            mainMenuScene.visible = false;
            game.state = openStageSelect;
        };
        
        // Options button opens an options panel
        optionsButton.tap = () => {
            mainMenuScene.buttons.disable();
            game.state = openOptionsMenu;
        };
    }

    // Every time opened
    game.backgroundColor = 0x00aa00;
    mainMenuScene.buttons.enable();
    mainMenuScene.visible = true;

    game.state = mainMenu;
}

// Update loop
function mainMenu() {
    
}
