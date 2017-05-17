"use strict";

function PauseMenu() {

    // Create Scene
    this.scene  = new PIXI.Container();

    // Holds the state before the pause
    this.stateBuffer;

    // pause the game when scene gets added
    this.scene.on("added", () => {
        this.stateBuffer = STATE;
        STATE = this.update;
    });

    // Make Panel
    this.panel = new PIXI.Graphics();
    this.panel.lineStyle(5, 0, 1);
    // this.panel.width = TILES_PX * 12;
    // this.panel.height = TILES_PX * 7;
    this.panel.beginFill(0xf5f19c);
    this.panel.drawRect(TILES_PX * 2, TILES_PX, CANVAS_WIDTH - TILES_PX * 4, TILES_PX * 7);
    this.panel.endFill();

    // Make Buttons

    // Container
    this.buttons = new PIXI.Container();
    // Set dimensions of the buttons container
    // this.buttonsDimensions = new PIXI.Graphics();
    // this.buttonsDimensions.beginFill(0, 0);
    // this.buttonsDimensions.drawRect(CANVAS_WIDTH - TILES_PX * 4, CANVAS_HEIGHT - TILES_PX * 2);
    // this.buttonsDimensions.endFill();
    // console.log(this.buttonsDimensions.width);

    // Resume
    this.resumeButton = new PIXI.Sprite(PIXI.utils.TextureCache["menu-play.png"]);
    this.resumeButton.position.set(TILES_PX * 2, TILES_PX * 2);
    this.resumeButton.interactive = true;
    this.resumeButton.buttonMode = true;

    // Reset
    this.resetButton = new PIXI.Sprite(PIXI.utils.TextureCache["menu-restart.png"]);
    this.resetButton.position.set(this.resumeButton.x + TILES_PX * 3, TILES_PX * 2);
    this.resetButton.interactive = true;
    this.resetButton.buttonMode = true;

    // Options
    this.optionsButton = new PIXI.Sprite(PIXI.utils.TextureCache["menu-options.png"]);
    this.optionsButton.position.set(this.resetButton.x + TILES_PX * 3, TILES_PX * 2);
    this.optionsButton.interactive = true;
    this.optionsButton.buttonMode = true;

    // Back to Menu
    this.mainMenuButton = new PIXI.Sprite(PIXI.utils.TextureCache["menu-back.png"]);
    this.mainMenuButton.position.set(this.panel.width / 2 - this.mainMenuButton.width / 2, TILES_PX * 5);
    this.mainMenuButton.interactive = true;
    this.mainMenuButton.buttonMode = true;

    // Create and Style Text

    let txtVAlign = 6; // Vertical padding on button labels

    // Style for Pause Label
    this.txtStyle = new PIXI.TextStyle({
        fontFamily: FONT_FAMILY, fontSize: 200, fill: 0x0
    });

    // Paused Label
    this.pauseTxt = new PIXI.Text("paused", this.txtStyle);
    this.pauseTxt.position.set(this.panel.width / 2 - this.pauseTxt.width / 2, 0);

    // Style for other labels
    this.txtStyle = new PIXI.TextStyle({
        fontFamily: FONT_FAMILY, fontSize: 96, fill: 0x0
    });

    // Resume
    this.resumeTxt = new PIXI.Text("continue", this.txtStyle);
    this.resumeTxt.position.set(this.resumeButton.x + this.resumeButton.width / 2 - this.resumeTxt.width / 2,
            this.resumeButton.y + this.resumeButton.height - this.resumeTxt.height / txtVAlign);

    // Reset
    this.resetTxt = new PIXI.Text("restart", this.txtStyle);
    this.resetTxt.position.set(this.resetButton.x + this.resetButton.width / 2 - this.resetTxt.width / 2,
        this.resetButton.y + this.resetButton.height - this.resetTxt.height / txtVAlign);

    // Options
    this.optionsTxt = new PIXI.Text("options", this.txtStyle);
    this.optionsTxt.position.set(this.optionsButton.x + this.optionsButton.width / 2 - this.optionsTxt.width / 2,
        this.optionsButton.y + this.optionsButton.height - this.optionsTxt.height / txtVAlign);


    // Add to container
    // this.buttons.addChild(this.buttonsDimensions);
    this.buttons.addChild(this.resumeButton);
    this.buttons.addChild(this.resetButton);
    this.buttons.addChild(this.optionsButton);
    this.buttons.addChild(this.mainMenuButton);
    this.buttons.addChild(this.pauseTxt);
    this.buttons.addChild(this.resumeTxt);
    this.buttons.addChild(this.resetTxt);
    this.buttons.addChild(this.optionsTxt);

    // Create Transparent Overlay
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
    this.buttons.position.set(TILES_PX * 2, TILES_PX);


    // Play button moves to stage select
    // Requires "this" context to operate so we use () => {}
    this.resumeButton.pointertap = () => {
        sounds["sounds/button-click.wav"].play();
        sounds["sounds/menu-open.wav"].play();
        STATE = this.stateBuffer;
        this.cleanUp();
    };

    this.resetButton.pointertap = () => {
        sounds["sounds/button-click.wav"].play();
        // this.cleanUp(); // doesn't seem to be needed, because the level is recreated
        Level.open(LEVELS[Level.instance.id]); // -> states/levels.js
    };

    this.optionsButton.on("pointertap", () => {
        sounds["sounds/button-click.wav"].play();
        sounds["sounds/menu-open.wav"].play();
        OptionsMenu.open(); // -> states/optionsmenu.js
    });

    this.mainMenuButton.pointertap = () => {
        // this.cleanUp(); // also not needed
        sounds["sounds/button-click.wav"].play();
        StageSelect.open(); // -> states/mainmenu.js
    };

    this.cleanUp = () => {
        OptionsMenu.close();
        this.scene.parent.removeChild(this.scene);
    };

    this.update = () => {};
}

// Function to open. Pause Menu is singleton
PauseMenu.open = () => {
    if(PauseMenu.instance == null) {
        PauseMenu.instance = new PauseMenu();
    }

    SCENE.addChild(PauseMenu.instance.scene);
}

