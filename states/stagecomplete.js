"use strict";

// This should probably be part of the level object;

let stageCompleteScene;

function openStageComplete() {
    
    // First Initialize Only
    if(stageCompleteScene == null) {
        
        // Make Panel and Buttons
        let panel = game.rectangle(200,400,"grey");
        let backButton = game.circle(50,"red");
        let continueButton = game.circle(50,"green");
        backButton.interact = true;
        continueButton.interact = true;
        
        // Add to scene
        stageCompleteScene = game.group();
        stageCompleteScene.buttons = groupButtons(backButton,continueButton);
        stageCompleteScene.addChild(panel);
        stageCompleteScene.addChild(stageCompleteScene.buttons);
        
        game.stage.addChild(stageCompleteScene);
        
        // Position stuff
        game.stage.putCenter(stageCompleteScene);
        backButton.x += 50;
        
        // Continue button moves to next stage
        continueButton.tap = () => {
            stageCompleteScene.visible = false;
            stageCompleteScene.buttons.disable();
            nextStage();
            game.state = STAGES[currentStage];
        }
    }
    
    // Every time opened
    stageCompleteScene.visible = true;
    stageCompleteScene.buttons.enable();

	game.state = stageComplete;
}

function stageComplete() {
}