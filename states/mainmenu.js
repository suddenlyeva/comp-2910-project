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
        game.stage.remove(menuGroup);
        game.state = openStageSelect;
    };

    optionsButton.tap = () => {
        game.stage.remove(menuGroup);
        game.state = openOptionsMenu;
    };

    game.state = mainMenu;
}

function mainMenu() {
	
}

