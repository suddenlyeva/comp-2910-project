"use strict";

let menuGroup;
function openMainMenu() {
    // checks for both null and undefined
    if(menuGroup == null) {
        let playButton = game.button(["images/play_button.png"]);
        let optionsButton = game.button(["images/options_button.png"]);
        menuGroup = game.group(playButton, optionsButton)
        game.stage.addChild(menuGroup);

        playButton.position.set(100, 100);
        optionsButton.position.set(100, 300);

        menuGroup.setBtnState = (state) => {
            menuGroup.children.forEach(btn => {
                btn.enabled = state;
            });
        }

        playButton.tap = () => {
            menuGroup.setBtnState(false);
            menuGroup.visible = false;
            game.state = openStageSelect;
        };

        optionsButton.tap = () => {
            menuGroup.setBtnState(false);
            game.state = openOptionsMenu;
        };
    }

    menuGroup.setBtnState(true);
    menuGroup.visible = true;

    game.state = mainMenu;
}

function mainMenu() {
}
