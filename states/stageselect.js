"use strict";

// Stage Select Screen
function StageSelect() {

    // ----------------------------------- Carousel -----------------------------------

    let deceleration       = 12;  // ... of the movement animation
    let positionEpsilon    = 1;   // for position comparison
    // primary - button in spotlight, secondary - buttons not in spotlight
    let buttonAlpha        = { primary : 1, secondary : 0.6 };
    let buttonScale        = { primary : 1, secondary : 0.6 };
    // from pointerup to pointerdown: if moved less than the number of units(x and y)
    // specified by tapSensitivity, consider it a tap/click
    let tapSensitivity     = 10;  // xDelta multiplier
    let scrollSensitivity  = 1.1; // swipe speed exponent
    let swipeSensitivity   = 1.6;
    // button properties
    let buttonWidth        = 640,
        buttonHeight       = 460,
        buttonPadding      = 25,
        buttonTextStyle    = new PIXI.TextStyle({
            fontFamily: FONT_FAMILY, fontSize: 100
        });
    // background width is calculated by multiplying number of buttons by bgWidthPerButton
    let bgWidthPerButton   = 2 * TILES_PX;
    // clicking current button takes you to the stage if refXCenter is within the button's bounds
    // currentPosLimiter limits these bounds
    // values of buttonWidth / 2 and above will cause the current button to be unclickable
    let currentPosLimiter  = buttonWidth / 4;

    // ***** avoid modifying the following variables *****
    let stageButtons       = new PIXI.Container();
    // if the current button was set manually(true) or calculated automatically(false)
    let setManually        = false;
    let swipeDistance      = 0;  // accumulates unadjusted xDelta
    let stopWatch          = 0;  // for calculating swipe speed

    let buttonDisplayWidth  = buttonWidth + buttonPadding * 2,
        buttonDisplayHeight = buttonHeight;

    // refXLeft is a starting x position of the carousel
    // used as a base reference in position related calculations
    let refXLeft           = CANVAS_WIDTH / 2 - buttonDisplayWidth / 2; // left   of display
    // more reference positions
    let refXCenter         = refXLeft + buttonDisplayWidth / 2;         // center of display
    let refXRight          = refXLeft + buttonDisplayWidth;             // right  of display

    // find first locked level and return its index - 1
    let firstBeforeLocked = () => {
        let i = 0;
        while(i + 1 < LEVEL_PROGRESS.length && LEVEL_PROGRESS[i + 1].unlocked) i++; // -> states/levels.js
        return i;
    };

    // index of the current displayed button
    let currentButton = firstBeforeLocked();
    // button in the spotlight position
    let currentInView = currentButton;

    let background = new PIXI.extras.TilingSprite(
        PIXI.utils.TextureCache["images/background-stageselect.png"],
        0, 9*TILES_PX
    );

    // set background width and necessary values to calculate background position
    background.set = () => {
        background.width   = Math.max(stageButtons.children.length * bgWidthPerButton, CANVAS_WIDTH);
        // background width to carousel width ratio
        background.ratio = (background.width - CANVAS_WIDTH) / (stageButtons.width - buttonDisplayWidth);
        // maximum background x position
        background.xMax  = CANVAS_WIDTH - background.width;
        return background;
    };

    // update background position; don't use before calling background.set()
    background.update = () => {
        background.x = Math.max(Math.min(stageButtons.x - refXLeft, 0) * background.ratio, background.xMax);
    };

    stageButtons.position.set(refXLeft - (buttonDisplayWidth * currentButton),
        CANVAS_HEIGHT / 2 - buttonDisplayHeight / 2);
    stageButtons.interactive = stageButtons.buttonMode = true;

    // initialize buttons
    // forceReinit - if true, all buttons will be recreated even if they already exist
    // otherwise initialize any additional buttons; if there aren't any new buttons, do nothing
    this.initButtons = (forceReinit = false) => {
        if(LEVELS.length === stageButtons.children.length && !forceReinit) return;
        for(let i = forceReinit ? 0 : stageButtons.children.length; i < LEVELS.length; i++) {
            let wrapper  = new PIXI.Container(),
                button   = new PIXI.Container(),
                buttonBg = new PIXI.Graphics();
            // transparent background creates padding
            buttonBg.beginFill(0, 0);
            buttonBg.drawRect (0, 0, buttonDisplayWidth, buttonDisplayHeight);
            buttonBg.endFill();

            let buttonImage = new PIXI.Sprite(
                PIXI.loader.resources["images/spritesheet.json"].textures["stage-preview.png"]
            );
            button.addChild(buttonImage);

            let buttonText = new PIXI.Text(
                levelDisplayName(LEVELS[i].id, LEVELS[i].name, i), // -> util.js
                buttonTextStyle);
            button.addChild(buttonText);
            buttonText.position.set(button.width / 2 - buttonText.width / 2, button.height / 5);

            let highscoreText = new PIXI.Text("", buttonTextStyle);
            button.addChild(highscoreText);

            // let previewArray = getPreviewFromId(LEVELS[i].id, i);
            let previewArray = LEVELS[i].finalItems;
            let previewContainer = new PIXI.Container();
            for(let itemIndex = 0; itemIndex < previewArray.length; itemIndex++) {
                let previewItem = new PIXI.Sprite(ITEM_TEXTURES[previewArray[itemIndex]]);
                previewItem.scale.set(1.5);
                previewItem.x = previewContainer.width;
                previewContainer.addChild(previewItem);
            }
            button.addChild(previewContainer);
            previewContainer.position.set(button.width / 2 - previewContainer.width / 2, TILES_PX * 2.1);

            // stuff visible when the level is locked
            let lockedContainer = new PIXI.Container();
            let lockedImg = new PIXI.Sprite(PIXI.loader.resources["images/spritesheet.json"].textures["lock.png"]);
            lockedContainer.addChild(lockedImg);
            let lockedText = new PIXI.Text("locked", buttonTextStyle.clone());
            lockedText.style.fontSize = 200; // bigger font
            // set position using container width before the container is stretched out
            lockedText.x = lockedContainer.width + TILES_PX / 3.2;
            lockedImg.y = TILES_PX / 3.8;
            lockedContainer.addChild(lockedText);
            lockedContainer.position.set(button.width / 2 - lockedContainer.width / 2,
                button.height - lockedContainer.height * 1.24);
            button.addChild(lockedContainer);

            let lockedOverlay = new PIXI.Sprite(
                PIXI.loader.resources["images/spritesheet.json"].textures["stage-preview-overlay.png"]);
            button.addChild(lockedOverlay);

            let starContainer = new PIXI.Container();
            button.addChild(starContainer);

            wrapper.updateProgress = () => {
                // scale the button back to 100%, set text positions and scale the button back
                let scaleMemX = button.scale.x,
                    scaleMemY = button.scale.y;
                button.scale.set(buttonScale.primary);

                if(!(lockedContainer.visible = lockedOverlay.visible = !LEVEL_PROGRESS[i].unlocked)) { // assignment intentional
                    highscoreText.text = "highscore: " + padZeroForInt(LEVEL_PROGRESS[i].highscore, 5);
                    highscoreText.position.set(button.width / 2 - highscoreText.width / 2, button.height / 1.7);

                    if(LEVEL_PROGRESS[i].highscore !== 0) {
                        // find the number of stars to display
                        let grade = calculateGrade({ maxScore: LEVELS[i].maxScore, score: LEVEL_PROGRESS[i].highscore });
                        // add the correct number of stars to the star container
                        for (let j = starContainer.children.length; j < grade.nStars; j++) {
                            let star = new PIXI.Sprite(PIXI.loader.resources["images/spritesheet.json"].textures["star-small.png"]);
                            star.scale.set(0.8);
                            star.x = starContainer.width + (j === 0 ? 0 : 15);
                            starContainer.addChild(star);
                        }
                        starContainer.position.set(button.width / 2 - starContainer.width / 2,
                            button.height - starContainer.height * 1.7);
                    }
                } // else {
                    // unnecessary to do this because it's currently impossible to lock levels
                // highscoreText.text = "";
                // }

                button.scale.set(scaleMemX, scaleMemY);
            };

            button.interactive = button.buttonMode = true;
            button.x = buttonPadding;

            button.pointerdown = (eventData) => {
                // remember position where the button was first clicked
                // relative to carousel parent (which is going to be this.scene)
                button.clickPos = eventData.data.getLocalPosition(stageButtons.parent);
            };

            button.pointerupoutside = button.pointerout = button.pointercancel = (eventData) => {
                button.clickPos = false;
            };

            button.pointerup = (eventData) => {
                if(!button.clickPos || stageButtons.pointers.length !== 1) return;
                // position relative to carousel parent
                let newPos = eventData.data.getLocalPosition(stageButtons.parent);
                let diffX  = Math.abs(newPos.x - button.clickPos.x),
                    diffY  = Math.abs(newPos.y - button.clickPos.y);

                if(diffX < tapSensitivity && diffY < tapSensitivity) {
                    let pos  = wrapper.x + button.x + stageButtons.x,  // button's left  edge position
                        posL = pos + currentPosLimiter,                // adjusted button's left  edge position
                        posR = pos - currentPosLimiter + button.width; // adjusted button's right edge position
                    // if the current button is at least half way in position, it's clickable
                    if(currentButton === i && posL < refXCenter && refXCenter < posR) {

                        if (LEVEL_PROGRESS[currentButton].unlocked) { // -> states/levels.js
                            PlaySound(eSFXList.ButtonClick, false); // -> sfx.js
                            PlaySound(eSFXList.StageEnter, false); // -> sfx.js
                            PlaySound(eSFXList.MenuOpen, false);    // -> sfx.js
                            // no need to do id lookup because buttons should always be in the same order as in LEVELS
                            Level.open(LEVELS[currentButton]); // -> states/levels.js
                        }

                    } else {
                        setManually = true;
                        PlaySound(eSFXList.ButtonClick, false);
                        this.goToButton(i);
                    }
                }

                button.clickPos = false;
            };

            wrapper.addChild(buttonBg);
            wrapper.addChild(button);

            // consider replacing all 'wrapper.width' with 'buttonDisplayWidth'
            wrapper.x = buttonDisplayWidth * i;

            // --------------------
            // update wrapper appearance based on how far away it is from refXLeft
            // leftOfView - is the wrapper is to the left of refXLeft(true) or to the right(false)?
            wrapper.update = (leftOfView) => {
                let posL = wrapper.x + stageButtons.x,  // wrapper's left  edge position
                    posR = posL      + buttonDisplayWidth;   // wrapper's right edge position

                // Calculate percentage of the button in the spotlight:
                //  = width in spotlight divided by buttonDisplayWidth
                // In center position produces numbers like 0.9986321642984926, if rounding is desired
                // use Math.round( ... * 100) / 100 to round to 2 decimal places
                let percentageInView =
                    // performance: conditional operator or multiply by boolean?
                    (posL <= refXRight && refXLeft <= posR ?
                        Math.min(refXRight - posL, posR - refXLeft) / buttonDisplayWidth
                        : 0);
                button.alpha   = buttonAlpha.secondary +
                    (buttonAlpha.primary - buttonAlpha.secondary) * percentageInView;

                button.scale.set(buttonScale.secondary +
                    (buttonScale.primary - buttonScale.secondary) * percentageInView);
                button.x = leftOfView ? buttonDisplayWidth - button.width - buttonPadding : buttonPadding;
                button.y = buttonDisplayHeight / 2 - button.height / 2;

                // help the difficultyGear see the the button in view
                if(percentageInView > 0.5) {
                    currentInView = i;
                }
            };
            // --------------------

            wrapper.update(stageButtons.x + wrapper.x < refXLeft);

            stageButtons.addChild(wrapper);
        }

        // set background variables and update it's position
        background.set().update();
    }

    this.initButtons();

    stageButtons.pointerdown = (eventData) => {
        let pointerData = {
            // javascript promises that pointer ids are unique
            id  : eventData.data.identifier,
            pos : eventData.data.getLocalPosition(stageButtons.parent)
        };
        // if multi-touch is detected, don't send events to buttons and save new pointer id/position
        if(!stageButtons.pointers || stageButtons.pointers.length === 0) {
            stageButtons.pointers = [pointerData];
        } else {
            stageButtons.pointers.push(pointerData);
            eventData.stopPropagation();
        }

        // necessary to stop movement on tap, different from .moving
        stageButtons.pressedDown = true;
    };

    stageButtons.pointerup = stageButtons.pointerupoutside = stageButtons.pointercancel =
        eventData => {
            if(!stageButtons.pointers) return;
            let ptrIndex = findIndexById(stageButtons.pointers, eventData.data.identifier);

            // if pointer id is not in the array, something went terribly wrong
            if(ptrIndex === -1) throw new Error("Pointer ID not found");
            // remove pointer from pointer array
            stageButtons.pointers.splice(ptrIndex, 1);
            // don't do anything if using multi-touch
            if(stageButtons.pointers.length !== 0) return;

            cleanUpCarousel();
        };

    stageButtons.pointermove = eventData => {
        if(!stageButtons.pointers) return;
        let newPos = eventData.data.getLocalPosition(stageButtons.parent);
        // move only if there's one pointer
        if(stageButtons.pointers.length === 1) {
            if(eventData.data.identifier !== stageButtons.pointers[0].id) return;
            stageButtons.pressedDown      = false;
            let xDelta                    = newPos.x - stageButtons.pointers[0].pos.x;
            stageButtons.x               += xDelta * scrollSensitivity;
            stageButtons.moving           = true;
            stageButtons.pointers[0].pos  = newPos;

            swipeDistance                += xDelta;
        } else if(stageButtons.pointers.length > 1) {
            // update the pointer that moved
            stageButtons.pointers[
                findIndexById(stageButtons.pointers, eventData.data.identifier)
            ].pos = newPos;
        }
    };

    // determine the current button based on which one is closest to the center point
    // does nothing if current button was set manually (by clicking a button other than current)
    let determineCurrent = () => {
        if(setManually) {
            return currentButton;
        }

        // calculate how much further ahead to look for the current button based on swipe speed
        // prevent division by 0
        let swipeSpeed = stopWatch === 0 ? 0 : swipeDistance / stopWatch;
        // raise to power, preserve sign
        let distAdj    = Math.pow(Math.abs(swipeSpeed), swipeSensitivity) * (swipeSpeed < 0 ? -1 : 1);

        for(let i = 0; i < stageButtons.children.length; i++) {
            if(stageButtons.x +
                stageButtons.children[i].x +
                stageButtons.children[i].width + distAdj
                >= refXCenter) {
                return i;
            }
        }
        return stageButtons.children.length - 1;
    };

    // adjust carousel display based on current position
    let updateDisplay = () => {
        let pos;
        for(let i = 0; i < stageButtons.children.length &&
            // if position is outside the canvas, don't update
            (pos = stageButtons.x + stageButtons.children[i].x) <= CANVAS_WIDTH; i++) {
            if(pos + stageButtons.children[i].width >= 0) {
                stageButtons.children[i].update(pos < refXLeft);
            }
        }
        // move background
        background.update();
    };

    let updateCarousel = () => {
        // calculate difference in x position that the carousel needs to be moved by
        let posDiff = stageButtons.x - refXLeft + stageButtons.children[currentButton].x;
        if(Math.abs(posDiff) > positionEpsilon) {
            if(!stageButtons.moving && !stageButtons.pressedDown) {
                // carousel movement animation
                stageButtons.x -= (posDiff / deceleration) * TICKER.deltaTime;
            }
            updateDisplay();
        }
        if(stageButtons.moving) stopWatch += TICKER.deltaTime;
    };

    this.goToButton = (n, scroll = true) => {
        if(n < 0 || n >= stageButtons.children.length) throw new Error("goToButton: requested button doesn't exist.");

        currentButton = n;

        if(!scroll) {
            stageButtons.x = refXLeft - stageButtons.children[n].x;
            updateDisplay();
        }
    }

    // determine current button and reset scrolling variables
    let cleanUpCarousel = () => {
        currentButton = determineCurrent();
        setManually   = stageButtons.pointers = stageButtons.moving = stageButtons.pressedDown = false;
        swipeDistance = stopWatch = 0;
    };

    // -------------------------------- End of carousel --------------------------------

    // Difficulty buttons
    let easyButton   = new PIXI.Sprite(PIXI.loader.resources["images/spritesheet.json"].textures["difficulty-easy.png"]);
    easyButton.interactive   = easyButton.buttonMode   = true;

    let normalButton = new PIXI.Sprite(PIXI.loader.resources["images/spritesheet.json"].textures["difficulty-normal.png"]);
    normalButton.interactive = normalButton.buttonMode = true;

    let hardButton   = new PIXI.Sprite(PIXI.loader.resources["images/spritesheet.json"].textures["difficulty-hard.png"]);
    hardButton.interactive   = hardButton.buttonMode   = true;

    // center the normal button and position the other 2 relative to it
    normalButton.position.set(CANVAS_WIDTH / 2 - normalButton.width / 2, CANVAS_HEIGHT - TILES_PX * 1.3);
    hardButton.position.set(normalButton.x + hardButton.width + TILES_PX * 0.6, normalButton.y);
    easyButton.position.set(normalButton.x - easyButton.width - TILES_PX * 0.6, normalButton.y);

    // --------------------------- Shifting difficulty gear ----------------------------
    let difficultyGear = makeGear("m", 1);
    difficultyGear.scale.set(0.7);

    let diffGearPos = {
        easy: {
            x: easyButton.x + easyButton.width  / 2 - difficultyGear.width  / 2,
            y: easyButton.y + easyButton.height / 2 - difficultyGear.height / 2
        },
        normal: {
            x: normalButton.x + normalButton.width  / 2 - difficultyGear.width  / 2,
            y: normalButton.y + normalButton.height / 2 - difficultyGear.height / 2
        },
        hard: {
            x: hardButton.x + hardButton.width  / 2 - difficultyGear.width  / 2,
            y: hardButton.y + hardButton.height / 2 - difficultyGear.height / 2
        }
    };

    // determine difficulty gear target position
    // override true means the target is the currentButton, false - current button in view
    let diffGearTargetPos = (override = false) => {
        // currentButton/currentInView provided by carousel; DIFFICULTY is found in leveldata.js
        let target = override ? currentButton : currentInView;
        if(target >= DIFFICULTY.hard) {
            return diffGearPos.hard;
        } else if(target >= DIFFICULTY.normal) {
            return diffGearPos.normal;
        } else { // if(target >= DIFFICULTY.easy)
            return diffGearPos.easy;
        }
    };

    // set initial position
    let diffGearInitialPos = diffGearTargetPos();
    difficultyGear.position.set(diffGearInitialPos.x, diffGearInitialPos.y);

    difficultyGear.updatePos = () => {
        let targetPos = diffGearTargetPos(!stageButtons.pressedDown && !stageButtons.moving);
        let posDiff = {
            x: difficultyGear.x - targetPos.x,
            y: difficultyGear.y - targetPos.y
        };

        if(Math.abs(posDiff.x) > positionEpsilon) {
            difficultyGear.x -= (posDiff.x / deceleration) * TICKER.deltaTime;
        }

        if(Math.abs(posDiff.y) > positionEpsilon) {
            difficultyGear.y -= (posDiff.y / deceleration) * TICKER.deltaTime;
        }
    };
    // ------------------------ End of shifting difficulty gear ------------------------

    easyButton  .pointertap = () => {
        PlaySound(eSFXList.ButtonClick, false); // -> sfx.js
        this.goToButton(DIFFICULTY.easy);   // -> leveldata.js
    };
    normalButton.pointertap = () => {
        PlaySound(eSFXList.ButtonClick, false); // -> sfx.js
        this.goToButton(DIFFICULTY.normal); // -> leveldata.js
    };
    hardButton  .pointertap = () => {
        PlaySound(eSFXList.ButtonClick, false); // -> sfx.js
        this.goToButton(DIFFICULTY.hard);   // -> leveldata.js
    };

    // Options
    let optionsButton = new PIXI.Sprite(PIXI.loader.resources["images/spritesheet.json"].textures["menu-options.png"]);
    optionsButton.position.set(CANVAS_WIDTH - TILES_PX * 1.5, CANVAS_HEIGHT - TILES_PX * 1.5);
    optionsButton.scale.set(2/3);
    optionsButton.interactive = optionsButton.buttonMode = true;

    optionsButton.on("pointertap", () => {
        PlaySound(eSFXList.ButtonClick, false); // -> sfx.js
        // cleanUpCarousel(); // not needed for locally opened pop-up menu
        if(!OptionsMenu.instance || !OptionsMenu.instance.isOpen) { // -> states/optionsmenu.js
            OptionsMenu.open(); // -> states/optionsmenu.js
            PlaySound(eSFXList.MenuOpen, false); // -> sfx.js
        }
        else {
            OptionsMenu.close(); // -> states/optionsmenu.js
        }
    });

    // Fullscreen
    // let fullscreenButton = new PIXI.Sprite(PIXI.utils.TextureCache["menu-options.png"]);
    // fullscreenButton.position.set(CANVAS_WIDTH - TILES_PX * 1.5, CANVAS_HEIGHT - TILES_PX * 1.5);
    // fullscreenButton.scale.set(1/1.5,1/1.5);
    // fullscreenButton.interactive = true;
    // fullscreenButton.buttonMode = true;
    // fullscreenButton.on("pointertap", () => {
    //     cleanUpCarousel();
    //     toggleFullScreen();
    // });

    // More Games
    let moreGamesButton = new PIXI.Sprite(PIXI.loader.resources["images/spritesheet.json"].textures["menu-games.png"]);
    moreGamesButton.interactive = moreGamesButton.buttonMode = true;
    moreGamesButton.position.set(TILES_PX * 0.135, CANVAS_HEIGHT - TILES_PX * 1.5);
    moreGamesButton.scale.set(2/3);

    moreGamesButton.on("pointertap", () => {
        PlaySound(eSFXList.ButtonClick, false); // -> sfx.js
        PlaySound(eSFXList.MenuOpen, false);    // -> sfx.js
        cleanUpCarousel();
        OptionsMenu.close();    // -> states/optionsmenu.js
        Affiliate.open(); // -> states/affiliate.js
    });

    // Title Text
    let titleTxt = new PIXI.Sprite(PIXI.loader.resources["images/spritesheet.json"].textures["text-stageselect.png"]);
    titleTxt.anchor.set(0.5);
    titleTxt.position.set(CANVAS_WIDTH / 2, TILES_PX );

    // Create Scene
    this.scene = new PIXI.Container();
    this.scene.addChild(background);
    this.scene.addChild(stageButtons);
    this.scene.addChild(optionsButton);
    //this.scene.addChild(fullscreenButton);
    this.scene.addChild(difficultyGear);
    this.scene.addChild(moreGamesButton);
    this.scene.addChild(easyButton);
    this.scene.addChild(normalButton);
    this.scene.addChild(hardButton);
    this.scene.addChild(titleTxt);
    //this.scene.addChild(backToMainMenu);

    this.updateProgress = () => {
        for(let i = 0; i < stageButtons.children.length; i++) {
            stageButtons.children[i].updateProgress();
        }
    };

    this.update = () => {
        updateCarousel();
        difficultyGear.update();
        difficultyGear.updatePos();
    };
}

// Function to open. Stage Select is singleton
StageSelect.open = () => {

    if(StageSelect.instance == null) {
        StageSelect.instance = new StageSelect();
    }

    StageSelect.instance.initButtons();
    StageSelect.instance.updateProgress();

    SCENE = StageSelect.instance.scene;
    STATE = StageSelect.instance.update;
}

// Future TODO:
// Figure out a solution for scaling wrapper instead of button
// Problem that needs to be solved:
// Scaling the button wrapper requires adjusting it's x-position while
// keeping scroll speed consistant.
// I had a solution where all buttons left-align to match their adjusted scale.
// This cause the scroll speed to be inconsistent - the further you scroll
// the more it accelerates and total carousel width varies as a result of scaling.
// Possible solution:
// Find a middle point (like refXLeft) and have all the buttons
// move towards it. The perceived scroll speed should seem consistent.
