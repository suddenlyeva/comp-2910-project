"use strict";

// This should probably be part of the level object;

function openStageComplete() {
    game.backgroundColor = 0x000044;
    
	let completionGroup = game.group();
	let completionPanel = game.rectangle(200,400,"grey");
	let continueButton = game.circle(50,"green");
	completionGroup.addChild(completionPanel, continueButton);
	game.stage.putCenter(completionGroup);
	continueButton.interact = true;
	
	continueButton.tap = () => {
		continueButton.enabled = false;
		game.stage.remove(completionGroup);
        nextStage();
		game.state = STAGES[currentStage];
	}
    game.state = stageComplete;
}

function stageComplete() {
}