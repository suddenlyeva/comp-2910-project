"use strict";

function PauseMenu() {

    this.scene = new PIXI.Container();
    // holds the state before the pause
    this.stateBuffer;

    // pause the game when scene gets added
    this.scene.on("added", function() {
        this.stateBuffer = STATE;
        STATE = this.update;
    }.bind(this));

    // Make Buttons
    this.resumeButton = makeSimpleButton(100, 50, "Resume", 0xb3ecec);
    this.optionsButton = makeSimpleButton(100, 50, "Options", 0x94b8b8);

    // Make background elements and add them to the background container
    this.background = new PIXI.Container();
    // prevent the scene under from being clickable
    this.background.interactive = true;

    this.bgFill = new PIXI.Graphics();
    this.bgFill.beginFill(0x6a0e1d);
    this.bgFill.drawRect(0, 0, RENDERER.width, RENDERER.height);
    this.bgFill.alpha = 0.4;
    this.bgFill.endFill();

    this.background.addChild(this.bgFill);

    // Add to scene
    this.scene.addChild(this.background);
    this.scene.addChild(this.resumeButton);
    this.scene.addChild(this.optionsButton);

    // Position Buttons
    this.resumeButton.position.set(150, 200);
    this.optionsButton.position.set(150, 300);

    // Play button moves to stage select
    this.resumeButton.on("pointertap", function() {
        this.unpause();
    }.bind(this));

    // Options button opens an options panel
    this.optionsButton.on("pointertap", function() {
        openOptionsMenu();
    });

    this.update = function() {};

    this.unpause = function() {
        STATE = this.stateBuffer;
        closeOptionsMenu();
        this.scene.parent.removeChild(this.scene);
    };
}

let pauseScene;
function openPauseMenu() {
    if(pauseScene == null) {
        pauseScene = new PauseMenu();
    }

    SCENE.addChild(pauseScene.scene);
}

