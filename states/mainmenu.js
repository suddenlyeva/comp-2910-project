"use strict";

let mainMenu = new GameState(game);

mainMenu.initialize = () => {
        let playButton = game.button(["images/play_button.png"]);
        let optionsButton = game.button(["images/options_button.png"]);
        mainMenu.buttons.addChild(playButton);
        mainMenu.buttons.addChild(optionsButton);
        game.stage.addChild(mainMenu.scene);

        playButton.position.set(100, 100);
        optionsButton.position.set(100, 300);

        playButton.tap = () => {
            mainMenu.disableButtons();
            mainMenu.scene.visible = false;
            game.state = openStageSelect;
        };

        optionsButton.tap = () => {
            mainMenu.disableButtons();
            game.state = openOptionsMenu;
        };
        
        mainMenu.initialized = true;
};

mainMenu.open = () => {
    if(!mainMenu.initialized) {
        mainMenu.initialize();
    }
    
    mainMenu.scene.visible = true;
    mainMenu.enableButtons();
    game.state = mainMenu.run();
};

