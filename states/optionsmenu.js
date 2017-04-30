"use strict";

let optionsMenuScene;

function openOptionsMenu() {

    // First Initialize Only
    if(optionsMenuScene == null) {
        let width = 200,
            height = 400;

        // Make Panel and Buttons
        let optionsPanel = new PIXI.Graphics(); // game.rectangle(200,400,"grey");
        optionsPanel.lineStyle(1, 0, 1);
        optionsPanel.beginFill(0xcecfe2);
        optionsPanel.drawRect(0, 0, width, height);
        optionsPanel.endFill();
        let backButton = makeSimpleButton(20, 20, "X", 0xf00e46);

        // Add to scene
        optionsMenuScene = new PIXI.Container();
        optionsMenuScene.addChild(optionsPanel);
        optionsMenuScene.addChild(backButton);

        // Position stuff
        backButton.position.set(10, 10);
        optionsMenuScene.position.set(
            canvasWidth / 2 - width / 2,
            canvasHeight / 2 - height / 2);

        SCENE.addChild(optionsMenuScene);

        // Back button moves to main menu
        backButton.on("pointertap", () => {
            optionsMenuScene.visible = false;
        });
    }

    // Every time opened
    optionsMenuScene.visible = true;
	STATE = optionsMenu;
}

function optionsMenu() {
}
