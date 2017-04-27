function openMainMenu() {
    var menuGroup = game.group()
    var playButton = game.button(["images/play_button.png"]);
    var optionsButton = game.button(["images/options_button.png"]);
    menuGroup.addChild(playButton);
    menuGroup.addChild(optionsButton);
    game.stage.addChild(menuGroup);

    playButton.position.set(100, 100);
    optionsButton.position.set(100, 300);

    playButton.release = () => {
        game.stage.remove(menuGroup);
        game.state = openStageSelect;
    };

    optionsButton.release = () => {
        game.stage.remove(menuGroup);
        game.state = openOptionsMenu;
    };

    game.state = mainMenu;
}

function mainMenu() {
}

