"use strict";

function GameOver() {

    // Holds the state before the pause
    let stateBuffer;

    // Make Panel
    let panel = new PIXI.Graphics();
    panel.lineStyle(5, 0, 1);
    panel.beginFill(0xf5f19c);
    panel.drawRect(TILES_PX * 2, TILES_PX, CANVAS_WIDTH - TILES_PX * 4, TILES_PX * 7);
    panel.endFill();

    // Make Buttons

    // Reset
    let resetButton = new PIXI.Sprite(PIXI.loader.resources["images/spritesheet.json"].textures["menu-restart.png"]);
    resetButton.position.set(panel.width / 2 - resetButton.width / 2, TILES_PX * 2);
    resetButton.interactive = resetButton.buttonMode = true;

    // Back to Menu
    let mainMenuButton = new PIXI.Sprite(PIXI.loader.resources["images/spritesheet.json"].textures["menu-back.png"]);
    mainMenuButton.position.set(panel.width / 2 - mainMenuButton.width / 2, TILES_PX * 5);
    mainMenuButton.interactive = mainMenuButton.buttonMode = true;

    // Create and Style Text

    let txtVAlign = 6; // Vertical padding on button labels

    // Style for Pause Label
    let txtStyleLarge = new PIXI.TextStyle({
        fontFamily: FONT_FAMILY, fontSize: 200, fill: 0x0
    });

    // Paused Label
    let gameOverTxt = new PIXI.Text("game over", txtStyleLarge);
    gameOverTxt.position.set(panel.width / 2 - gameOverTxt.width / 2, 0);

    // Style for other labels
    let txtStyleSmall = txtStyleLarge.clone();
    txtStyleSmall.fontSize = 96;

    // Reset
    let resetTxt = new PIXI.Text("restart", txtStyleSmall);
    resetTxt.position.set(resetButton.x + resetButton.width / 2 - resetTxt.width / 2,
        resetButton.y + resetButton.height - resetTxt.height / txtVAlign);

    // Add to container
    let buttons = new PIXI.Container();
    buttons.addChild(resetButton);
    buttons.addChild(mainMenuButton);
    buttons.addChild(gameOverTxt);
    buttons.addChild(resetTxt);

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

    resetButton.pointertap = () => {
        PlaySound(eSFXList.ButtonClick, false);
        ResumeSoundLoop(eMusicList.Music); // -> sfx.js
        Level.openById(Level.instance.id); // -> states/levels.js
    };

    mainMenuButton.pointertap = () => {
        PlaySound(eSFXList.ButtonClick, false);
        ResumeSoundLoop(eMusicList.Music); // -> sfx.js
        StageSelect.open(); // -> states/stageselect.js
    };

    // Not used
    // this.cleanUp = () => {
    //     // OptionsMenu.close();
    //     this.scene.parent.removeChild(this.scene);
    // };

    this.update = () => {};
}

// Function to open. Pause Menu is singleton
GameOver.open = () => {
    PlaySound(eSFXList.GameOver, false);
    StopSound(eMusicList.Music, true);
    StopSound(eSFXList.ClockTicking, true);
    if(GameOver.instance == null) {
        GameOver.instance = new GameOver();
    }

    SCENE.addChild(GameOver.instance.scene);
};

