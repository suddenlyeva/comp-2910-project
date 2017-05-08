"use strict";

function PauseMenu() {
    this.scene  = new PIXI.Container();
    // holds the state before the pause
    this.stateBuffer;

    // pause the game when scene gets added
    this.scene.on("added", () => {
        this.stateBuffer = STATE;
        STATE = this.update;
    });

    this.panel = new PIXI.Graphics();
    this.panel.lineStyle(5, 0, 1);
    this.panel.beginFill(0xadfff3);
    this.panel.drawRect(0, 0, 1024, 576);
    this.panel.endFill();

    // Make Buttons
    this.buttons = new PIXI.Container();
    // Set dimensions of the buttons container
    this.buttonsDimensions = new PIXI.Graphics();
    this.buttonsDimensions.beginFill(0, 0);
    this.buttonsDimensions.drawRect(720, 270);
    this.buttonsDimensions.endFill();
    this.resumeButton   = makeSimpleButton(300, 100, "resume"   , 0x66FF66, 100);
    this.optionsButton  = makeSimpleButton(300, 100, "options"  , 0xFFFF66, 100);
    this.mainMenuButton = makeSimpleButton(300, 100, "main menu", 0xFFFF66, 100);
    this.resetButton    = makeSimpleButton(300, 100, "reset"    , 0xFF8866, 100);
    this.buttons.addChild(this.buttonsDimensions);
    this.buttons.addChild(this.resumeButton);
    this.buttons.addChild(this.resetButton);
    this.buttons.addChild(this.optionsButton);
    this.buttons.addChild(this.mainMenuButton);
    this.resumeButton  .position.set(0, 0);
    this.resetButton   .position.set(this.buttons.width - this.resetButton.width, 0);
    this.optionsButton .position.set(0, this.buttons.height - this.optionsButton.height);
    this.mainMenuButton.position.set(this.resetButton.x, this.optionsButton.y);

    this.bgFill = new PIXI.Graphics();
    this.bgFill.beginFill(0x6a0e1d, 0.4);
    this.bgFill.drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.bgFill.endFill();

    // Make background elements and add them to the background container
    this.background = new PIXI.Container();
    // prevent the scene under from being clickable
    this.background.interactive = true;
    this.background.addChild(this.bgFill);

    // Add to scene
    this.scene.addChild(this.background);
    this.scene.addChild(this.panel);
    this.scene.addChild(this.buttons);

    // Position Buttons
    this.panel  .position.set(CANVAS_WIDTH  / 2 - this.panel  .width  / 2,
                              CANVAS_HEIGHT / 2 - this.panel  .height / 2);
    this.buttons.position.set(CANVAS_WIDTH  / 2 - this.buttons.width  / 2,
                              CANVAS_HEIGHT / 2 - this.buttons.height / 2);

    // Play button moves to stage select
    // Requres "this" context to operate so we use () => {}
    this.resumeButton.pointertap = () => {
        STATE = this.stateBuffer;
        this.cleanUp();
    };
    this.resetButton.pointertap = () => {
        // this.cleanUp(); // doesn't seem to be needed, because the level is recreated
        Level.open(LEVELS[Level.instance.id]);
    };
    this.optionsButton.pointertap = OptionsMenu.open;
    this.mainMenuButton.pointertap = () => {
        // this.cleanUp(); // also not needed
        MainMenu.open();
    };

    this.cleanUp = () => {
        OptionsMenu.close();
        this.scene.parent.removeChild(this.scene);
    };

    this.update = () => {};
}

PauseMenu.open = () => {
    if(PauseMenu.instance == null) {
        PauseMenu.instance = new PauseMenu();
    }

    SCENE.addChild(PauseMenu.instance.scene);
}

