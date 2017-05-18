"use strict";

function GameOver() {

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

    // Reset
    this.resetButton = new PIXI.Sprite(PIXI.utils.TextureCache["menu-restart.png"]);
    this.resetButton.position.set(this.panel.width / 2 - this.resetButton.width / 2, TILES_PX * 2);
    this.resetButton.interactive = true;
    this.resetButton.buttonMode = true;

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
    this.gameOverTxt = new PIXI.Text("game over", this.txtStyle);
    this.gameOverTxt.position.set(this.panel.width / 2 - this.gameOverTxt.width / 2, 0);
<<<<<<< HEAD
    
    this.gameOverTxt.update = () => {
        this.gameOverTxt.x++;
    }
    
    
    let GOAnim = animate(this.gameOverText,
    {
        delay: 0,
        interval: 1,
        endCondition: () => {return false;}
    });
=======
>>>>>>> dev

    // Style for other labels
    this.txtStyle = new PIXI.TextStyle({
        fontFamily: FONT_FAMILY, fontSize: 96, fill: 0x0
    });

    // Reset
    this.resetTxt = new PIXI.Text("restart", this.txtStyle);
    this.resetTxt.position.set(this.resetButton.x + this.resetButton.width / 2 - this.resetTxt.width / 2,
        this.resetButton.y + this.resetButton.height - this.resetTxt.height / txtVAlign);

    // Add to container
    // this.buttons.addChild(this.buttonsDimensions);
    this.buttons.addChild(this.resetButton);
    this.buttons.addChild(this.mainMenuButton);
    this.buttons.addChild(this.gameOverTxt);
    this.buttons.addChild(this.resetTxt);

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

    this.resetButton.pointertap = () => {
        PlaySound(eSFXList.ButtonClick, false);
        //sounds[eSFXList.ButtonClick].play();
        // this.cleanUp(); // doesn't seem to be needed, because the level is recreated
        Level.open(LEVELS[Level.instance.id]); // -> states/levels.js
    };

    this.mainMenuButton.pointertap = () => {
        // this.cleanUp(); // also not needed
        PlaySound(eSFXList.ButtonClick, false);
        //sounds[eSFXList.ButtonClick].play();
        StageSelect.open(); // -> states/stageselect.js
    };

    this.cleanUp = () => {
        OptionsMenu.close();
        this.scene.parent.removeChild(this.scene);
    };

<<<<<<< HEAD
    this.update = () => {
        GOAnim();
    };
=======
    this.update = () => {};
>>>>>>> dev
}

// Function to open. Pause Menu is singleton
GameOver.open = () => {
    if(GameOver.instance == null) {
        GameOver.instance = new GameOver();
    }

    SCENE.addChild(GameOver.instance.scene);
}

