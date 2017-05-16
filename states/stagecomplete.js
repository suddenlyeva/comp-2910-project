"use strict";
 
// TODO: Overhaul
// Shows when stage is complete=]
function StageComplete(data) {
    this.scene = new PIXI.Container();

    // home button
    this.homeButton = new PIXI.Sprite(PIXI.utils.TextureCache["menu-home.png"]);
    this.homeButton.position.set(TILES_PX * 1.5, TILES_PX * 6.5);
    this.homeButton.interactive = true;
    this.homeButton.buttonMode = true;

    // continue button
    this.continueButton = new PIXI.Sprite(PIXI.utils.TextureCache["menu-next.png"]);
    this.continueButton.position.set(TILES_PX * 4.5, TILES_PX * 6.25);
    this.continueButton.interactive = true;
    this.continueButton.buttonMode = true;

    // replay button
    this.replayButton = new PIXI.Sprite(PIXI.utils.TextureCache["menu-replay.png"]);
    this.replayButton.position.set(TILES_PX * 13, TILES_PX * 6.5);
    this.replayButton.interactive = true;
    this.replayButton.buttonMode = true;

    let txtVAlign = 6; // Vertical padding on button labels

    // Style for labels
    this.txtStyle = new PIXI.TextStyle({
        fontFamily: FONT_FAMILY, fontSize: 96, fill: 0x0
    });
    this.gradeTxtStyle = new PIXI.TextStyle({
        fontFamily: FONT_FAMILY, fontSize: 200, fill: 0x0
    });
    this.clearTxtStyle = new PIXI.TextStyle({
        fontFamily: FONT_FAMILY, fontSize: 80, fill: 0x0
    });

    // gradeTxt
    this.gradeTxt = new PIXI.Text(data.grade, this.gradeTxtStyle);
    this.gradeTxt.position.set(CANVAS_WIDTH / 2 - this.gradeTxt.width / 2, 0);

    // ClearMessage
    this.clearTxt = new PIXI.Text("an apple a day is one less apple in the trash.", this.clearTxtStyle);
    this.clearTxt.anchor.set(0.5);
    this.clearTxt.position.set(CANVAS_WIDTH / 2, TILES_PX * 2.5);

    // scoreTxt
    // TODO: Need to replace the text with the actual score
    this.scoreTxt = new PIXI.Text("score : 00000", this.txtStyle);
    this.scoreTxt.position.set(TILES_PX * 1.5, TILES_PX * 0.75);

    // Stars. These are temporary place holder, need to change code later
    // TODO: replace with the atual sprite
    let stars = [];
    for (let i = 0; i < 5; i++) {
        stars.push(new PIXI.Sprite(
            PIXI.loader.resources["images/spritesheet.json"].textures["background.png"]
        ));
        stars[i].position.set(TILES_PX * 2 + 2.5 * i * TILES_PX, TILES_PX * 3.5);
        stars[i].scale.set(2,2);
        this.scene.addChild(stars[i]);
    }
    //  End of temporary code

    // wasteTxt
    this.wasteTxt = new PIXI.Text("waste : 00", this.txtStyle);
    this.wasteTxt.position.set(TILES_PX * 12.5, TILES_PX * 0.75);

    // homeTxt for home button
    this.homeTxt = new PIXI.Text("home", this.txtStyle);
    this.homeTxt.position.set(this.homeButton.x + this.homeButton.width / 2 - this.homeTxt.width / 2,
        this.homeButton.y + this.homeButton.height - this.homeTxt.height / txtVAlign);

    // replayTxt for replay button
    this.replayTxt = new PIXI.Text("replay", this.txtStyle);
    this.replayTxt.position.set(this.replayButton.x + this.replayButton.width / 2 - this.replayTxt.width / 2,
        this.replayButton.y + this.replayButton.height - this.replayTxt.height / txtVAlign);

    // Add to scene
    this.scene.addChild(this.homeButton);
    this.scene.addChild(this.continueButton);
    this.scene.addChild(this.replayButton);
    this.scene.addChild(this.gradeTxt);
    this.scene.addChild(this.clearTxt);
    this.scene.addChild(this.scoreTxt);
    this.scene.addChild(this.wasteTxt);
    this.scene.addChild(this.homeTxt);
    this.scene.addChild(this.replayTxt);

    // Continue button moves to next stage
    this.continueButton.on("pointertap", () => {
        let next = data.id + 1;
        if (next >= LEVELS.length) {
            Credits.open(); // -> states/credits.js
        }
        else {
            Level.open(LEVELS[next]); // -> states/levels.js
        }
    });

    // Back button takes you to the main menu
    this.homeButton.on("pointertap", () => {
        StageSelect.open(); // -> states/stageselect.js
    });

    this.update = () => {};
}

StageComplete.open = (completionData) => {
    StageComplete.instance = new StageComplete(completionData);

    SCENE = StageComplete.instance.scene;
    STATE = StageComplete.instance.update;
}
