"use strict";

let stageSelectScene;

function openStageSelect() {

    // First initialize only
    if(stageSelectScene == null) {

        // Declare an array of buttons
        let stageBtns = [];

        // Make scene groups
        stageSelectScene = new PIXI.Container();

        // Initialize buttons
        for(let i = 0; i < STAGES.length; i++) {

            // Create
            stageBtns.push(makeSimpleButton(100, 50, "Stage " + i, 0xffdfba));

            // Add to group
            stageSelectScene.addChild(stageBtns[i]);

            // Position
            stageBtns[i].position.set(i * 120 + 60, 100);

            // Set behaviour
            stageBtns[i].on("pointertap", () => { STATE = STAGES[i]; });
        }

        let backToMainMenu = makeSimpleButton(200, 50, "Back to Main Menu", 0xb3ecec);
        backToMainMenu.position.set(550, 500);
        backToMainMenu.on("pointertap", () => { STATE = openMainMenu; });
        stageSelectScene.addChild(backToMainMenu);
    }

    // Every time opened
    RENDERER.backgroundColor = 0x97ffff;

    SCENE = stageSelectScene;
    STATE = stageSelect;
}

function stageSelect() {
}
