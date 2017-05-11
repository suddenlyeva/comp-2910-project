"use strict";

function StageSelect() {

    this.scene = new PIXI.Container();

    // Make background
    this.background = new PIXI.Container();
    this.bgFill = new PIXI.Graphics();
    this.bgFill.beginFill(0x5d32ea);
    this.bgFill.drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.bgFill.endFill();

    this.background.addChild(this.bgFill);

    // Declare an array of buttons
    this.stageBtns = new PIXI.Container();

    let btnWidth = CANVAS_WIDTH / 2,
        btnHeight = CANVAS_HEIGHT / 2;
    for(let i = 0; i < LEVELS.length; i++) {
        let btn = makeSimpleButton(
            btnWidth, btnHeight, "stage " + i + "\npreview placeholder",
            0xffdfba, btnHeight / 4);
        btn.position.set(btnWidth * i, 0);
        btn.pointertap = () => { Level.open(LEVELS[i]); };
        this.stageBtns.addChild(btn);
    }
    this.stageBtns.position.set(CANVAS_WIDTH / 2 - btnWidth / 2, CANVAS_HEIGHT / 2 - btnHeight / 2);
    this.stageBtns.interactive = this.stageBtns.buttonMode = true;

    this.stageBtns.pointerdown = () => {
    };

    this.backToMainMenu = makeSimpleButton(200, 50, "back to main menu", 0xb3ecec, 50);
    this.backToMainMenu.position.set(CANVAS_WIDTH - 220, CANVAS_HEIGHT - 70);
    this.backToMainMenu.on("pointertap", MainMenu.open);

    this.scene.addChild(this.background);
    this.scene.addChild(this.stageBtns);
    this.scene.addChild(this.backToMainMenu);

    this.update = () => {};
}

StageSelect.open = () => {
    if(StageSelect.instance == null) {
        StageSelect.instance = new StageSelect();
    }

    SCENE = StageSelect.instance.scene;
    STATE = StageSelect.instance.update;
}
