"use strict";

let optionsMenuScene;

function openOptionsMenu() {
    
    // First Initialize Only
    if(optionsMenuScene == null) {
        
        // Make Panel and Buttons
        let optionsPanel = game.rectangle(200,400,"grey");
        let backButton = game.circle(50,"red");
        backButton.interact = true;
        
        // Add to scene
        optionsMenuScene = game.group();
        optionsMenuScene.buttons = groupButtons(backButton);
        optionsMenuScene.addChild(optionsPanel);
        optionsMenuScene.addChild(optionsMenuScene.buttons);
        
        game.stage.addChild(optionsMenuScene);
        
        // Position stuff
        game.stage.putCenter(optionsMenuScene);
        
        // Back button moves to main menu
        backButton.tap = () => {
            optionsMenuScene.visible = false;
            optionsMenuScene.buttons.disable();
            game.state = openMainMenu;
        }
    }
    
    // Every time opened
    optionsMenuScene.visible = true;
    optionsMenuScene.buttons.enable();
	game.state = optionsMenu;
}

function optionsMenu() {
}
