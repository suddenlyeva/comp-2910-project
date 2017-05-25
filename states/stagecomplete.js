"use strict";

// Shows when stage is complete
function StageComplete(data) { // <- states/levels.js

    let levelIndex = findIndexById(LEVELS, data.id);
    if(levelIndex === -1)            throw new Error("StageComplete: level not found"); // should be impossible
    if(StageSelect.instance == null) throw new Error("StageComplete: stage select not initialized."); // should also be impossible
    let nextLevelIndex = levelIndex + 1;
    // add buttons to the carousel if number of levels increased
    // cheap operation if no changes need to be made
    StageSelect.instance.initButtons();
    // advance the carousel to current level
    StageSelect.instance.goToButton(
        nextLevelIndex >= LEVELS.length ? levelIndex : nextLevelIndex, false); // -> states/stageselect.js

    // Update progress
    if (LEVEL_PROGRESS[levelIndex].highscore < data.score) {
        LEVEL_PROGRESS[levelIndex].highscore = data.score;
    }
    if (levelIndex < LEVEL_PROGRESS.length - 1) {
        LEVEL_PROGRESS[levelIndex + 1].unlocked = true;
    }

    let starContainer    = new PIXI.Container();
    let messageContainer = new PIXI.Container();

    let grade = calculateGrade(data); // -> util.js

    // variables to display score and waste dynamically
    let scoreDisplayed =  0;
    let wasteDisplayed =  0;
    let wasteInterval  = 30;
    let wasteTicker    =  0;

    // home button
    let homeButton = new PIXI.Sprite(PIXI.utils.TextureCache["menu-home.png"]);
    homeButton.position.set(TILES_PX * 2.25, TILES_PX * 6.5);
    homeButton.interactive =  homeButton.buttonMode  = true;

    // replay button
    let replayButton = new PIXI.Sprite(PIXI.utils.TextureCache["menu-replay.png"]);
    replayButton.position.set(TILES_PX * 12.25, TILES_PX * 6.5);
    replayButton.interactive = replayButton.buttonMode  = true;

    let txtVAlign = 6; // Magical padding for everything, somehow

    // Style for labels
    let txtStyle      = new PIXI.TextStyle({
        fontFamily: FONT_FAMILY, fontSize:  96, fill: 0x0
    });
    let gradeTxtStyle = new PIXI.TextStyle({
        fontFamily: FONT_FAMILY, fontSize: 200, fill: 0x0
    });
    let clearTxtStyle = new PIXI.TextStyle({
        fontFamily: FONT_FAMILY, fontSize:  80, fill: 0x0
        // dropShadow: true, dropShadowAngle: 4 * Math.PI / 12, dropShadowDistance: 2
    });

    // gradeTxt
    let gradeTxt = new PIXI.Text(grade.text, gradeTxtStyle);
    gradeTxt.position.set(CANVAS_WIDTH / 2 - gradeTxt.width / 2, -txtVAlign);
    
    // Top Glow
    let menuGlow = new PIXI.Sprite(PIXI.loader.resources["images/spritesheet.json"].textures["menu-glow.png"]);
    menuGlow.scale.set(3.5,1.1);
    menuGlow.position.x = CANVAS_WIDTH / 2 - menuGlow.width / 2;

    // ClearMessage
    let clearTxt   = new PIXI.Text(data.clearMessage, clearTxtStyle);
    clearTxt.x     = TILES_PX;
    clearTxt.y     = txtVAlign;
    clearTxt.alpha = 0.92;

    // message panel
    let messageLeft   = new PIXI.Sprite(PIXI.utils.TextureCache["message-left.png"]);
    let messageMiddle = new PIXI.extras.TilingSprite(
        PIXI.loader.resources["images/spritesheet.json"].textures["message-middle.png"],
        clearTxt.width,
        TILES_PX
    );
    let messageRight = new PIXI.Sprite(PIXI.utils.TextureCache["message-right.png"]);
    messageMiddle.x  = TILES_PX;
    messageRight.x   = messageMiddle.width + TILES_PX;
    messageContainer.addChild(messageLeft);
    messageContainer.addChild(messageMiddle);
    messageContainer.addChild(messageRight);
    messageContainer.addChild(clearTxt);
    messageContainer.position.set(CANVAS_WIDTH / 2 - messageContainer.width / 2, TILES_PX * 2);

    // scoreTxt
    let scoreTxt = new PIXI.Text("score : " + scoreDisplayed, txtStyle);
    scoreTxt.position.set(TILES_PX * 3 - scoreTxt.width / 2, TILES_PX * 0.5);

    // Stars
    let stars = [];
    for (let i = 0; i < grade.nStars; i++) {
        stars.push(new PIXI.Sprite(
            PIXI.loader.resources["images/spritesheet.json"].textures["star.png"]
        ));
        stars[i].x += i * TILES_PX * 2.5;
        stars[i].anchor.set(0.5);
        starContainer.addChild(stars[i]);
    }
    starContainer.position.set(CANVAS_WIDTH / 2 - starContainer.width / 2 + TILES_PX,
        TILES_PX * 4.5 + txtVAlign);

    // wasteTxt
    let wasteTxt = new PIXI.Text("waste : " + wasteDisplayed, txtStyle);
    wasteTxt.position.set(CANVAS_WIDTH - TILES_PX * 3 - wasteTxt.width / 2, TILES_PX * 0.5);

    // homeTxt for home button
    let homeTxt = new PIXI.Text("home", txtStyle);
    homeTxt.position.set(
        homeButton.x + homeButton.width / 2 - homeTxt.width / 2,
        homeButton.y + homeButton.height - homeTxt.height / txtVAlign);

    // replayTxt for replay button
    let replayTxt = new PIXI.Text("replay", txtStyle);
    replayTxt.position.set(
        replayButton.x + replayButton.width / 2 - replayTxt.width / 2,
        replayButton.y + replayButton.height - replayTxt.height / txtVAlign);

    let background = new PIXI.Sprite(PIXI.utils.TextureCache["images/background-intro.png"]);

    // Add to scene
    this.scene = new PIXI.Container();
    this.scene.addChild(background);
    this.scene.addChild(menuGlow);
    this.scene.addChild(starContainer);
    this.scene.addChild(messageContainer);
    this.scene.addChild(homeButton);
    this.scene.addChild(replayButton);
    this.scene.addChild(gradeTxt);
    this.scene.addChild(scoreTxt);
    this.scene.addChild(wasteTxt);
    this.scene.addChild(homeTxt);
    this.scene.addChild(replayTxt);

    // if this is the last level, display thank you text, otherwise display continue button
    if(levelIndex === LEVELS.length - 1) {
        // Define and style text
        let txtThankYou = new PIXI.Text("thank you for playing!", {
            fontFamily: FONT_FAMILY, fontSize: 148, fill: 0x00ad5e,
            dropShadow: true, dropShadowAngle: 7 * Math.PI / 12, dropShadowDistance: 10,
            stroke: 0xFFFFFF, strokeThickness: 7
        });

        txtThankYou.position.set(TILES_PX * 4.5, TILES_PX * 6.4);

        this.scene.addChild(txtThankYou);
    } else {
        // continue button
        let continueButton = new PIXI.Sprite(PIXI.utils.TextureCache["menu-next.png"]);
        continueButton.position.set(TILES_PX * 4.5, TILES_PX * 6.25);
        continueButton.interactive = continueButton.buttonMode = true;

        // Continue button moves to next stage
        continueButton.on("pointertap", () => {
            PlaySound(eSFXList.ButtonClick, false); // -> sfx.js
            PlaySound(eSFXList.StageEnter, false);  // -> sfx.js
            PlaySound(eSFXList.MenuOpen, false);    // -> sfx.js
            cleanUp();
            Level.open(LEVELS[nextLevelIndex]);     // -> states/levels.js
        });

        this.scene.addChild(continueButton);
    }

    // Home button takes you to the main menu
    homeButton.on("pointertap", () => {
        PlaySound(eSFXList.ButtonClick, false); // -> sfx.js
        cleanUp();
        StageSelect.open(); // -> states/stageselect.js
    });

    // Replay button
    replayButton.on("pointertap", () => {
        PlaySound(eSFXList.ButtonClick, false); // -> sfx.js
        PlaySound(eSFXList.MenuOpen, false);    // -> sfx.js
        cleanUp();
        Level.open(LEVELS[levelIndex]); // -> states/levels.js
    });

    // save state
    saveProgress(); // -> states/levels.js

    // Called every frame
    let displayScore = () => {
        if (scoreDisplayed < data.score) {
            scoreDisplayed += 13; // 13 is for optimal 10's and 1's digit distribution
            scoreTxt.text = "score : " + scoreDisplayed;
        } else {
            scoreTxt.text = "score : " + data.score;
        }
        scoreTxt.position.set(TILES_PX * 3 - scoreTxt.width / 2, TILES_PX * 0.5);
    };

    // Called every few frames using interval logic
    let displayWaste = () => {
        if (wasteDisplayed < data.waste) {
            wasteTicker += TICKER.deltaTime;
            if (wasteTicker >= wasteInterval) {
                wasteDisplayed++;
                wasteTxt.text  = "waste : " + wasteDisplayed;
                wasteTicker   -= wasteInterval;
            }
        } else {
            wasteTxt.text = "waste : " + data.waste;
        }
        wasteTxt.position.set(CANVAS_WIDTH - TILES_PX * 3 - wasteTxt.width / 2, TILES_PX * 0.5);
    };

    // Star animation.
    let limitScale   = 1;
    let starTicker   = 0;
    let starInterval = 1;
    let delayCounter = 0;

    // Initialize with different delays
    for(let i = 0; i < stars.length; i++){
        stars[i].currentScale = 0;
        stars[i].scale.x      = 0;
        stars[i].scale.y      = 0;
        stars[i].delay        = i * 10;
    }
    // Uses both interval logic and iterates to check delay
    let displayStar = () => {
        starTicker += TICKER.deltaTime;
        if(starTicker >= starInterval) {
            if(delayCounter <= stars[stars.length-1].delay)
                delayCounter++;
            for (let i = 0; i < stars.length; i++) {
                if (stars[i].currentScale < limitScale && stars[i].delay < delayCounter) {
                    stars[i].currentScale += 0.03;
                    stars[i].scale.x = stars[i].currentScale;
                    stars[i].scale.y = stars[i].currentScale;
                }
            }
            starTicker -= starInterval;
        }
    };

    this.update = () => {
        displayScore();
        displayWaste();
        displayStar();
    };

    PlaySound(eSFXList.StageComplete, false); // -> sfx.js

    let cleanUp = () => {
        if(data.id == PPAP.id) {
            StopSound(eMusicList.PPAP);         // -> sfx.js
            ResumeSoundLoop(eMusicList.Music);  // -> sfx.js
        }
    };
}

StageComplete.open = (completionData) => {
    StageComplete.instance = new StageComplete(completionData);

    SCENE = StageComplete.instance.scene;
    STATE = StageComplete.instance.update;
};
