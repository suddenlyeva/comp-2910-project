"use strict";

function PauseMenu() {
    this.width  = 800;
    this.height = 600;
    this.scene  = new PIXI.Container();
    // holds the state before the pause
    this.stateBuffer;

    // pause the game when scene gets added
    this.scene.on("added", () => {
        this.stateBuffer = STATE;
        STATE = this.update;
    });

    this.panel = new PIXI.Graphics();
    this.panel.lineStyle(1, 0, 1);
    this.panel.beginFill(0xfff3ad);
    this.panel.drawRect(0, 0, this.width, this.height);
    this.panel.endFill();

    // Make Buttons
    this.resumeButton   = makeSimpleButton(100, 50, "resume"   , 0xb3ecec, 50);
    this.optionsButton  = makeSimpleButton(100, 50, "options"  , 0x94b8b8, 50);
    this.mainMenuButton = makeSimpleButton(100, 50, "main menu", 0xfff3ad, 50);
    this.resetButton    = makeSimpleButton(100, 50, "reset"    , 0xfff3ad, 50);

    this.bgFill = new PIXI.Graphics();
    this.bgFill.beginFill(0x6a0e1d);
    this.bgFill.drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.bgFill.alpha = 0.4;
    this.bgFill.endFill();


    // Make background elements and add them to the background container
    this.background = new PIXI.Container();
    // prevent the scene under from being clickable
    this.background.interactive = true;
    this.background.addChild(this.bgFill);

    // Add to scene
    this.scene.addChild(this.background);
    this.scene.addChild(this.panel);
    this.scene.addChild(this.resumeButton);
    this.scene.addChild(this.resetButton);
    this.scene.addChild(this.optionsButton);
    this.scene.addChild(this.mainMenuButton);

    // Position Buttons
    this.panel.position.set(CANVAS_WIDTH  / 2 - this.panel.width  / 2,
                            CANVAS_HEIGHT / 2 - this.panel.height / 2);
    this.resumeButton.position.set(150, 200);
    this.resetButton.position.set(300, 200);
    this.optionsButton.position.set(150, 300);
    this.mainMenuButton.position.set(300, 300);

    // Play button moves to stage select
    // Requres "this" context to operate so we use () => {}
    this.resumeButton.pointertap = () => {
        STATE = this.stateBuffer;
        this.cleanUp();
    };
    this.resetButton.pointertap = () => {
        // this.cleanUp(); // doesn't seem to be needed, because the level is recreated
        Level.open(LEVELS[Level.instance.levelNumber]);
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

