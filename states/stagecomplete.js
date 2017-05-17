"use strict";
 
// TODO: Overhaul
// Shows when stage is complete=]
function StageComplete(data) {
    this.scene = new PIXI.Container();
    this.starContainer = new PIXI.Container();
    this.messageContainer = new PIXI.Container();

    let gradeLists = {
        perfect: {percentage: 100, text: "perfect!", nStars: 5},
        excellent: {percentage: 80, text: "excellent!", nStars: 4},
        great: {percentage: 60, text: "great!", nStars: 3},
        nice: {percentage: 40, text: "nice!", nStars: 2},
        good: {percentage: 0, text: "good enough!", nStars: 1}
    };

    let gradeRate = (data.score / data.maxScore) * 100;
    let grade;
    // Decide grade string
    if (gradeRate >= gradeLists.perfect.percentage) {
        grade = gradeLists.perfect;
    } else if (gradeRate >= gradeLists.excellent.percentage) {
        grade = gradeLists.excellent;
    } else if (gradeRate >= gradeLists.great.percentage) {
        grade = gradeLists.great;
    } else if (gradeRate >= gradeLists.nice.percentage) {
        grade = gradeLists.nice;
    } else if (gradeRate >= gradeLists.good.percentage) {
        grade = gradeLists.good;
    }

    // variables to display score and waste dynamically
    let scoreDisplayed = 0;
    let wasteDisplayed = 0;
    let wasteInterval = 30;
    let wasteTicker = 0;

    // home button
    this.homeButton = new PIXI.Sprite(PIXI.utils.TextureCache["menu-home.png"]);
    this.homeButton.position.set(TILES_PX * 2.25, TILES_PX * 6.5);
    this.homeButton.interactive = true;
    this.homeButton.buttonMode = true;

    // continue button
    this.continueButton = new PIXI.Sprite(PIXI.utils.TextureCache["menu-next.png"]);
    this.continueButton.position.set(TILES_PX * 4.5, TILES_PX * 6.25);
    this.continueButton.interactive = true;
    this.continueButton.buttonMode = true;

    // replay button
    this.replayButton = new PIXI.Sprite(PIXI.utils.TextureCache["menu-replay.png"]);
    this.replayButton.position.set(TILES_PX * 12.25, TILES_PX * 6.5);
    this.replayButton.interactive = true;
    this.replayButton.buttonMode = true;

    let txtVAlign = 6; // Magical padding for everything, somehow

    // Style for labels
    this.txtStyle = new PIXI.TextStyle({
        fontFamily: FONT_FAMILY, fontSize: 96, fill: 0x0
    });
    this.gradeTxtStyle = new PIXI.TextStyle({
        fontFamily: FONT_FAMILY, fontSize: 200, fill: 0x0
    });
    this.clearTxtStyle = new PIXI.TextStyle({
        fontFamily: FONT_FAMILY, fontSize: 80, fill: 0x0
        // dropShadow: true, dropShadowAngle: 4 * Math.PI / 12, dropShadowDistance: 2
    });

    // gradeTxt
    this.gradeTxt = new PIXI.Text(grade.text, this.gradeTxtStyle);
    this.gradeTxt.position.set(CANVAS_WIDTH / 2 - this.gradeTxt.width / 2, -txtVAlign);

    // ClearMessage
    this.clearTxt = new PIXI.Text(data.clearMessage, this.clearTxtStyle);
    this.clearTxt.x = TILES_PX;
    this.clearTxt.y = txtVAlign;
    this.clearTxt.alpha = 0.8;

    // message panel
    this.messageLeft = new PIXI.Sprite(PIXI.utils.TextureCache["message-left.png"]);
    this.messageMiddle = new PIXI.extras.TilingSprite(
        PIXI.loader.resources["images/spritesheet.json"].textures["message-middle.png"],
        this.clearTxt.width,
        TILES_PX
    );
    this.messageRight = new PIXI.Sprite(PIXI.utils.TextureCache["message-right.png"]);
    this.messageMiddle.x = TILES_PX;
    this.messageRight.x = this.messageMiddle.width + TILES_PX;
    this.messageContainer.addChild(this.messageLeft);
    this.messageContainer.addChild(this.messageMiddle);
    this.messageContainer.addChild(this.messageRight);
    this.messageContainer.addChild(this.clearTxt);
    this.messageContainer.position.set(CANVAS_WIDTH / 2 - this.messageContainer.width / 2, TILES_PX * 2);

    // scoreTxt
    this.scoreTxt = new PIXI.Text("score : " + scoreDisplayed, this.txtStyle);
    this.scoreTxt.position.set(TILES_PX * 3 - this.scoreTxt.width / 2, TILES_PX * 0.5);

    // Stars
    let stars = [];
    for (let i = 0; i < grade.nStars; i++) {
        stars.push(new PIXI.Sprite(
            PIXI.loader.resources["images/spritesheet.json"].textures["star.png"]
        ));
        stars[i].x += i * TILES_PX * 2.5;
        stars[i].anchor.set(0.5);
        this.starContainer.addChild(stars[i]);
    }
    this.starContainer.position.set(CANVAS_WIDTH / 2 - this.starContainer.width / 2 + TILES_PX,
        TILES_PX * 4.5 + txtVAlign);

    // wasteTxt
    this.wasteTxt = new PIXI.Text("waste : " + wasteDisplayed, this.txtStyle);
    this.wasteTxt.position.set(CANVAS_WIDTH - TILES_PX * 3 - this.wasteTxt.width / 2, TILES_PX * 0.5);

    // homeTxt for home button
    this.homeTxt = new PIXI.Text("home", this.txtStyle);
    this.homeTxt.position.set(this.homeButton.x + this.homeButton.width / 2 - this.homeTxt.width / 2,
        this.homeButton.y + this.homeButton.height - this.homeTxt.height / txtVAlign);

    // replayTxt for replay button
    this.replayTxt = new PIXI.Text("replay", this.txtStyle);
    this.replayTxt.position.set(this.replayButton.x + this.replayButton.width / 2 - this.replayTxt.width / 2,
        this.replayButton.y + this.replayButton.height - this.replayTxt.height / txtVAlign);

    // Add to scene
    this.scene.addChild(this.starContainer);
    this.scene.addChild(this.messageContainer);
    this.scene.addChild(this.homeButton);
    this.scene.addChild(this.continueButton);
    this.scene.addChild(this.replayButton);
    this.scene.addChild(this.gradeTxt);
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

    // Home button takes you to the main menu
    this.homeButton.on("pointertap", () => {
        StageSelect.open(); // -> states/stageselect.js
    });

    // Replay button
    this.replayButton.on("pointertap", () => {
        Level.open(LEVELS[data.id]);
    });

    this.displayScore = () => {
        if (scoreDisplayed < data.score) {
            scoreDisplayed += 13; // 13 is for optimal 10's and 1's digit distribution
            this.scoreTxt.text = "score : " + scoreDisplayed;
        } else {
            this.scoreTxt.text = "score : " + data.score;
        }
        this.scoreTxt.position.set(TILES_PX * 3 - this.scoreTxt.width / 2, TILES_PX * 0.5);
    };

    this.displayWaste = () => {
        if (wasteDisplayed < data.waste) {
            wasteTicker += TICKER.deltaTime;
            if (wasteTicker >= wasteInterval) {
                wasteDisplayed++;
                this.wasteTxt.text = "waste : " + wasteDisplayed;
                wasteTicker -= wasteInterval;
            }
        } else {
            this.wasteTxt.text = "waste : " + data.waste;
        }
        this.wasteTxt.position.set(CANVAS_WIDTH - TILES_PX * 3 - this.wasteTxt.width / 2, TILES_PX * 0.5);
    };

    // Star animation. TODO: Refactoring
    let limitScale = 1;
    let starTicker = 0;
    let starInterval = 1;
    let delayCounter = 0 ;
    for(let i = 0; i < stars.length; i++){
        stars[i].currentScale = 0;
        stars[i].scale.x = 0;
        stars[i].scale.y = 0;
        stars[i].delay = i*10;
    }
    this.displayStar = () => {
        starTicker += TICKER.deltaTime;
        if(starTicker >= starInterval) {
            if(delayCounter <= stars[stars.length-1].delay)
                delayCounter++;
            for (let i = 0; i < stars.length; i++) {
                if (stars[i].currentScale < limitScale && stars[i].delay < delayCounter) {
                    stars[i].currentScale += 0.03;
                    stars[i].scale.x = stars[i].currentScale;
                    stars[i].scale.y = stars[i].currentScale;
                    console.log(stars[i].currentScale);
                    console.log(stars[i].scale.x);
                    console.log(stars[i].scale.y);
                }
            }
            starTicker -= starInterval;
        }
    };

    this.update = () => {
        this.displayScore();
        this.displayWaste();
        this.displayStar();
    };
}

StageComplete.open = (completionData) => {
    StageComplete.instance = new StageComplete(completionData);

    SCENE = StageComplete.instance.scene;
    STATE = StageComplete.instance.update;
}
