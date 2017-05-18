"use strict";

// Main Menu Scene
// TODO: Probably merge with stage select
function MainMenu() {
    this.scene = new PIXI.Container();

    // Make Background
    this.background = new PIXI.Container();
    this.bgTriangle1 = new PIXI.Graphics();
    this.bgTriangle1.beginFill(0x00ff6b);
    this.bgTriangle1.drawPolygon([0,CANVAS_HEIGHT, 0,0, CANVAS_WIDTH,0]);
    this.bgTriangle1.endFill();

    this.bgTriangle2 = new PIXI.Graphics();
    this.bgTriangle2.beginFill(0x00ccff);
    this.bgTriangle2.drawPolygon([
        0,CANVAS_HEIGHT,
        CANVAS_WIDTH,CANVAS_HEIGHT,
        CANVAS_WIDTH,0]);
    this.bgTriangle2.endFill();

    this.bgLine = new PIXI.Graphics();
    this.bgLine.lineStyle(8, 0x222222, 1);
    this.bgLine.moveTo(0, CANVAS_HEIGHT);
    this.bgLine.lineTo(CANVAS_WIDTH, 0);

    this.background.addChild(this.bgTriangle1);
    this.background.addChild(this.bgTriangle2);
    this.background.addChild(this.bgLine);

    // Make Buttons
    this.distFromEdge = 200;
    this.buttonWidth = CANVAS_WIDTH / 2 - this.distFromEdge - 20; // 20 between buttons
    this.buttonHeight = CANVAS_HEIGHT / 2;
    this.playButton = makeSimpleButton(this.buttonWidth, this.buttonHeight, // -> util.js
        "play", 0xb3ecec, this.buttonHeight / 2, 4);
    this.optionsButton = makeSimpleButton(this.buttonWidth, this.buttonHeight, // -> util.js
        "options", 0x94b8b8, this.buttonHeight / 2, 4);
    // this.fullScreenButton = makeSimpleButton(100, 50, "full screen", 0x94b8b8, 50); // -> util.js

    this.moreGamesButton = makeSimpleButton(200, 50, "more games", 0xFFFF66, 75); // -> util.js

    this.playButton.position.set(this.distFromEdge,
        CANVAS_HEIGHT / 2 - this.playButton.height / 2);
    this.optionsButton.position.set(CANVAS_WIDTH - this.optionsButton.width - this.distFromEdge,
        CANVAS_HEIGHT / 2 - this.optionsButton.height / 2);
    // this.fullScreenButton.position.set(CANVAS_WIDTH - 150, CANVAS_HEIGHT - 100);

    this.moreGamesButton.position.set((CANVAS_WIDTH / 2) - 100, CANVAS_HEIGHT - 100);



    // Play button moves to stage select
    this.playButton.on("pointertap", () => {
        PlaySound(eSFXList.ButtonClick, false);
        PlaySound(eSFXList.MenuOpen, false);
        //sounds[eSFXList.ButtonClick].play();
        //sounds[eSFXList.MenuOpen].play();
        OptionsMenu.close();    // -> states/optionsmenu.js
        StageSelect.open();     // -> states/stageselect.js
    });

    // Options button opens an options panel
    this.optionsButton.on("pointertap", () => {
        PlaySound(eSFXList.ButtonClick, false);
        PlaySound(eSFXList.MenuOpen, false);
        //sounds[eSFXList.ButtonClick].play();
        //sounds[eSFXList.MenuOpen].play();
        OptionsMenu.open(); // -> states/optionsmenu.js
    });
    // this.fullScreenButton.pointertap = toggleFullScreen;

    //more games button opens the affiliate page

    this.moreGamesButton.on("pointertap", () => {
        PlaySound(eSFXList.ButtonClick, false);
        PlaySound(eSFXList.MenuOpen, false);
        //sounds[eSFXList.ButtonClick].play();
        //sounds[eSFXList.MenuOpen].play();
        Affiliate.open(); // -> states/affiliate.js
    });
    // Add to scene
    this.scene.addChild(this.background);
    this.scene.addChild(this.playButton);
    this.scene.addChild(this.optionsButton);
    this.scene.addChild(this.moreGamesButton);
    // this.scene.addChild(this.fullScreenButton);

    // Update function to be called by the main game loop
    this.update = () => {};
}

// Function to Open. Main Menu is singleton
MainMenu.open = () => {
    if(MainMenu.instance == null) {
        MainMenu.instance = new MainMenu();
    }

    SCENE = MainMenu.instance.scene;
    STATE = MainMenu.instance.update;
}
