"use strict";

function PauseMenu() {

    // Holds the state before the pause
    let stateBuffer;

    // Make Panel
    let panel = new PIXI.Graphics();
    panel.lineStyle(5, 0, 1);
    // panel.width = TILES_PX * 12;
    // panel.height = TILES_PX * 7;
    panel.beginFill(0xf5f19c);
    panel.drawRect(TILES_PX * 2, TILES_PX, CANVAS_WIDTH - TILES_PX * 4, TILES_PX * 7);
    panel.endFill();

    // Make Buttons

    // Resume
    let resumeButton = new PIXI.Sprite(PIXI.utils.TextureCache["menu-play.png"]);
    resumeButton.position.set(TILES_PX * 2, TILES_PX * 2);
    resumeButton.interactive = true;
    resumeButton.buttonMode = true;

    // Reset
    let resetButton = new PIXI.Sprite(PIXI.utils.TextureCache["menu-restart.png"]);
    resetButton.position.set(resumeButton.x + TILES_PX * 3, TILES_PX * 2);
    resetButton.interactive = true;
    resetButton.buttonMode = true;

    // Options
    let optionsButton = new PIXI.Sprite(PIXI.utils.TextureCache["menu-options.png"]);
    optionsButton.position.set(resetButton.x + TILES_PX * 3, TILES_PX * 2);
    optionsButton.interactive = true;
    optionsButton.buttonMode = true;

    // Back to Menu
    let mainMenuButton = new PIXI.Sprite(PIXI.utils.TextureCache["menu-back.png"]);
    mainMenuButton.position.set(panel.width / 2 - mainMenuButton.width / 2, TILES_PX * 5);
    mainMenuButton.interactive = true;
    mainMenuButton.buttonMode = true;

    // Create and Style Text

    let txtVAlign = 6; // Vertical padding on button labels

    // Style for Pause Label
    let txtStyle = new PIXI.TextStyle({
        fontFamily: FONT_FAMILY, fontSize: 200, fill: 0x0
    });

    // Paused Label
    let pauseTxt = new PIXI.Text("paused", txtStyle);
    pauseTxt.position.set(panel.width / 2 - pauseTxt.width / 2, 0);

    // Style for other labels
    txtStyle.fontSize = 96

    // Resume
    let resumeTxt = new PIXI.Text("continue", txtStyle);
    resumeTxt.position.set(resumeButton.x + resumeButton.width / 2 - resumeTxt.width / 2,
            resumeButton.y + resumeButton.height - resumeTxt.height / txtVAlign);

    // Reset
    let resetTxt = new PIXI.Text("restart", txtStyle);
    resetTxt.position.set(resetButton.x + resetButton.width / 2 - resetTxt.width / 2,
        resetButton.y + resetButton.height - resetTxt.height / txtVAlign);

    // Options
    let optionsTxt = new PIXI.Text("options", txtStyle);
    optionsTxt.position.set(optionsButton.x + optionsButton.width / 2 - optionsTxt.width / 2,
        optionsButton.y + optionsButton.height - optionsTxt.height / txtVAlign);


    // Add to container
    let buttons = new PIXI.Container();
    buttons.addChild(resumeButton);
    buttons.addChild(resetButton);
    buttons.addChild(optionsButton);
    buttons.addChild(mainMenuButton);
    buttons.addChild(pauseTxt);
    buttons.addChild(resumeTxt);
    buttons.addChild(resetTxt);
    buttons.addChild(optionsTxt);

    // Position Buttons
    buttons.position.set(TILES_PX * 2, TILES_PX);

    // Create Transparent Overlay
    let bgFill = new PIXI.Graphics();
    bgFill.beginFill(0x6a0e1d, 0.4);
    bgFill.drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    bgFill.endFill();

    // Make background elements and add them to the background container
    let background = new PIXI.Container();
    // prevent the scene under from being clickable
    background.interactive = true;
    background.addChild(bgFill);

    // Add to scene
    this.scene = new PIXI.Container();
    this.scene.addChild(background);
    this.scene.addChild(panel);
    this.scene.addChild(buttons);

    // pause the game when scene gets added
    this.scene.on("added", () => {
        stateBuffer = STATE;
        STATE = this.update;
    });

    // Play button moves to stage select
    resumeButton.pointertap = () => {
        PlaySound(eSFXList.ButtonClick, false); // -> sfx.js
        PlaySound(eSFXList.MenuOpen, false);    // -> sfx.js
        ResumeSoundLoop(eSFXList.ClockTicking); // -> sfx.js

        STATE = stateBuffer;
        cleanUp();
    };

    resetButton.pointertap = () => {
        PlaySound(eSFXList.MenuOpen, false);    // -> sfx.js
        PlaySound(eSFXList.ButtonClick, false); // -> sfx.js
        StopSound(eSFXList.ClockTicking, true); // -> sfx.js
        StopSound(eMusicList.PPAP, true);       // -> sfx.js
        ResumeSoundLoop(eMusicList.Music);      // -> sfx.js

        Level.openById(Level.instance.id); // -> states/levels.js
    };

    optionsButton.pointertap = () => {
        PlaySound(eSFXList.ButtonClick, false); // -> sfx.js
        PlaySound(eSFXList.MenuOpen, false);    // -> sfx.js
        OptionsMenu.open(); // -> states/optionsmenu.js
    };

    mainMenuButton.pointertap = () => {
        StopSound(eSFXList.ClockTicking, true); // -> sfx.js
        StopSound(eMusicList.PPAP, true);       // -> sfx.js
        PlaySound(eSFXList.ButtonClick, false); // -> sfx.js
        ResumeSoundLoop(eMusicList.Music);      // -> sfx.js
        StageSelect.open(); // -> states/stageselect.js
    };

    let cleanUp = () => {
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
};

