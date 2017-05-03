"use strict";

function StageSelect() {
    // Declare an array of buttons
    this.stageBtns = [];

    // Make scene groups
    this.scene = new PIXI.Container();

    // Initialize buttons
    for(let i = 0; i < STAGES.length; i++) {

        // Create
        this.stageBtns.push(makeSimpleButton(100, 50, "Stage " + i, 0xffdfba));

        // Add to group
        this.scene.addChild(this.stageBtns[i]);

        // Position
        this.stageBtns[i].position.set(i * 120 + 60, 100);

        // Set behaviour
        this.stageBtns[i].on("pointertap", STAGES[i]);
    }

    this.backToMainMenu = makeSimpleButton(200, 50, "Back to Main Menu", 0xb3ecec);
    this.backToMainMenu.position.set(550, 500);
    this.backToMainMenu.on("pointertap", MainMenu.open);

    this.scene.addChild(this.backToMainMenu);

    this.update = () => {};
}

StageSelect.open = () => {

    // First initialize only
    if(StageSelect.instance == null) {
        StageSelect.instance = new StageSelect();
    }

    SCENE = StageSelect.instance.scene;
    STATE = StageSelect.instance.update;
}
