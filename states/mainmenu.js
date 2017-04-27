"use strict";

function openMainMenu() {
    let menuGroup = game.group()
    let playButton = game.button(["images/play_button.png"]);
    let optionsButton = game.button(["images/options_button.png"]);
    menuGroup.addChild(playButton);
    menuGroup.addChild(optionsButton);
    game.stage.addChild(menuGroup);

    playButton.position.set(100, 100);
    optionsButton.position.set(100, 300);

    playButton.tap = () => {
		playButton.enabled = false;
		optionsButton.enabled = false;
        game.stage.remove(menuGroup);
        game.state = openStageSelect;
    };

    optionsButton.tap = () => {
		playButton.enabled = false;
		optionsButton.enabled = false;
        game.stage.remove(menuGroup);
        game.state = openOptionsMenu;
    };

    game.state = mainMenu;
}

function mainMenu() {
	
}

