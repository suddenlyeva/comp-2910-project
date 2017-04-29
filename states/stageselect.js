"use strict";

let stageSelectScene;

function openStageSelect() {

    // First initialize only
    if(stageSelectScene == null) {
        
        // Declare an array of buttons
        let stageBtns = [];
        
        // Make scene groups
        stageSelectScene = game.group();
        stageSelectScene.buttons = groupButtons();
        stageSelectScene.addChild(stageSelectScene.buttons);
        game.stage.addChild(stageSelectScene);
        
        // Initialize buttons
        for(let i = 0; i < STAGES.length; i++) {
            
            // Create
            stageBtns.push(game.circle(50, "blue"));
            stageBtns[i].interact = true;
            
            // Add to group
            stageSelectScene.buttons.addChild(stageBtns[i]);
            
            // Position
            stageBtns[i].position.set(300, i * 60 + 60);

            // Set behaviour
            stageBtns[i].tap = () => {
                stageSelectScene.visible = false;
                stageSelectScene.buttons.disable();
                game.state = STAGES[i];
            };
        }
    }
    
    // Every time opened
    game.backgroundColor = 0x005555;
    stageSelectScene.buttons.enable();
    
    game.state = stageSelect;
}

function stageSelect() {
}
