"use strict";

// Stage Select Screen
function StageSelect() {

    // ----------------------------------- Carousel -----------------------------------

    let deceleration       = 12;  // ... of the movement animation
    let positionEpsilon    = 1;   // for position comparison
    // background - buttons not in view, foreground - button in view
    let bgButtonAlpha      = 0.5;
    let fgButtonAlpha      = 1;
    let bgButtonScale      = 0.6; // x and y
    let fgButtonScale      = 1;
    // from pointerup to pointerdown: if moved less than the number of units(x and y)
    // specified by tapSensitivity, consider it a tap/click
    let tapSensitivity     = 10;  // xDelta multiplier
    let scrollSensitivity  = 1.1; // swipe speed exponent
    let swipeSensitivity   = 1.6;
    // button dimensions
    let buttonWidth        = CANVAS_WIDTH  / 2,
        buttonHeight       = CANVAS_HEIGHT / 2,
        buttonPadding      = 25;
    // clicking current button takes you to the stage if refXCenter is within the button's bounds
    // currentPosLimiter limits these bounds
    // values of buttonWidth / 2 and above will cause the current button to be unclickable
    let currentPosLimiter  = buttonWidth / 4;

    // ***** avoid modifying the following variables *****
    let stageButtons       = new PIXI.Container();
    // index of the current displayed button
    let currentButton      = 0;
    // if the current button was set manually(true) or calculated automatically(false)
    let setManually        = false;
    let swipeDistance      = 0;  // accumulates unadjusted xDelta
    let stopWatch          = 0;  // for calculating swipe speed

    let buttonDisplayWidth = buttonWidth + buttonPadding * 2;

    // refXLeft is a starting x position of the carousel
    // used as a base reference in position related calculations
    let refXLeft           = CANVAS_WIDTH / 2 - buttonDisplayWidth / 2; // left   of display
    // more reference positions
    let refXCenter         = refXLeft + buttonDisplayWidth / 2;         // center of display
    let refXRight          = refXLeft + buttonDisplayWidth;             // right  of display

    stageButtons.position.set(refXLeft, CANVAS_HEIGHT / 2 - buttonHeight / 2);
    stageButtons.interactive = stageButtons.buttonMode = true;

    // initialize buttons
    for(let i = 0; i < LEVELS.length; i++) {
        let wrapper  = new PIXI.Container(),
            buttonBg = new PIXI.Graphics();
        // transparent background creates padding
        buttonBg.beginFill(0, 0);
        buttonBg.drawRect (0, 0, buttonDisplayWidth, buttonHeight);
        buttonBg.endFill();
        let button = makeSimpleButton( // -> util.js
            buttonWidth, buttonHeight, "stage " + i + "\npreview placeholder",
            0xffdfba, buttonHeight / 4);
        button.x = buttonPadding;

        button.pointerdown = (eventData) => {
            // remember position where the button was first clicked
            // relative to carousel parent (which is going to be this.scene)
            if(!button.clickPos) {
                button.clickPos = eventData.data.getLocalPosition(stageButtons.parent);
            }
        };

        button.pointerupoutside = button.pointerout = (eventData) => {
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
                    Level.open(LEVELS[currentButton]); // -> states/levels.js
                } else {
                    setManually   = true;
                    currentButton = i;
                }
            }

            button.clickPos = false;
        };

        wrapper.addChild(buttonBg);
        wrapper.addChild(button);

        wrapper.x = wrapper.width * i;

        // --------------------
        // update wrapper appearance based on how far away it is from refXLeft
        // leftOfView - is the wrapper is to the left of refXLeft(true) or to the right(false)?
        wrapper.update = (leftOfView) => {
            let posL = wrapper.x + stageButtons.x,  // wrapper's left  edge position
                posR = posL      + wrapper.width;   // wrapper's right edge position

            // Calculate how much of the button is in the spotlight
            // and divide it by display width to find out the percentage of the button in the spotlight.
            // In center position produces numbers like 0.9986321642984926, if rounding is desired
            // use Math.round( ... * 100) / 100 to round to 2 decimal places
            let percentageInView =
                // performance: conditional operator or multiply by boolean?
                (posL <= refXRight && refXLeft <= posR ?
                    Math.min(refXRight - posL, posR - refXLeft) / buttonDisplayWidth
                    : 0);
            button.alpha =   bgButtonAlpha + (fgButtonAlpha - bgButtonAlpha) * percentageInView;
            button.scale.set(bgButtonScale + (fgButtonScale - bgButtonScale) * percentageInView);
            button.x = leftOfView ? wrapper.width - button.width - buttonPadding : buttonPadding;
            button.y = wrapper.height / 2 - button.height / 2;
        };
        // --------------------
;
        wrapper.update();

        stageButtons.addChild(wrapper);
    }

    stageButtons.pointerdown = (eventData) => {
        let pointerData = {
            id  : eventData.data.originalEvent.pointerId,
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

    // ptrArr - array of pointers to look through; ptrId - pointer id whose index we want to find
    // javascript promises that pointer ids are unique
    let findIndexById = (ptrArr, ptrId) => {
        let i = 0;
        while(ptrArr[i].id !== ptrId && ++i !== ptrArr.length);
        // if pointer id is not in the array, something went terribly wrong
        if(i === ptrArr.length) throw new Error("Pointer ID not found");
        return i;
    };

    stageButtons.pointerup = stageButtons.pointerupoutside = (eventData) => {
        // remove pointer from pointer array
        stageButtons.pointers.splice(
            findIndexById(stageButtons.pointers, eventData.data.originalEvent.pointerId), 1);
        // don't do anything if using multi-touch
        if(stageButtons.pointers.length !== 0) return;
        stageButtons.pointers = stageButtons.moving = stageButtons.pressedDown = false;
        // prevent division by 0
        let swipeSpeed = stopWatch === 0 ? 0 : swipeDistance / stopWatch;
        // raise to power, preserve sign
        let distAdj   = Math.pow(Math.abs(swipeSpeed), swipeSensitivity) * (swipeSpeed < 0 ? -1 : 1);
        currentButton = determineCurrent(distAdj);
        stopWatch     = swipeDistance = 0;
    };

    stageButtons.pointermove = eventData => {
        let newPos = eventData.data.getLocalPosition(stageButtons.parent);
        // move only if there's one pointer
        if(stageButtons.pointers.length === 1) {
            stageButtons.pressedDown      = false;
            let xDelta                    = newPos.x - stageButtons.pointers[0].pos.x;
            stageButtons.x               += xDelta * scrollSensitivity;
            stageButtons.moving           = true;
            stageButtons.pointers[0].pos  = newPos;

            swipeDistance                += xDelta;
        } else if(stageButtons.pointers.length > 1) {
            // update the pointer that moved
            stageButtons.pointers[
                findIndexById(stageButtons.pointers, eventData.data.originalEvent.pointerId)
            ].pos = newPos;
        }
    };

    // determine the current button based on which one is closest to the center point
    // does nothing if current button was set manually (by clicking a button other than current)
    // adjX modifier changes how much further ahead to look for currentButton
    let determineCurrent = (adjX) => {
        if(setManually) {
            setManually = false;
            return currentButton;
        }

        for(let i = 0; i < stageButtons.children.length; i++) {
            if(stageButtons.x +
                stageButtons.children[i].x +
                stageButtons.children[i].width + adjX
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
                console.log(i);
                stageButtons.children[i].update(pos < refXLeft);
            }
        }
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

    // -------------------------------- End of carousel --------------------------------

    let backToMainMenu = makeSimpleButton(200, 50, "back to main menu", 0xb3ecec, 50); // -> util.js
    backToMainMenu.position.set(CANVAS_WIDTH - 220, CANVAS_HEIGHT - 70);
    backToMainMenu.pointertap = MainMenu.open; // -> states/mainmenu.js

    let background = new PIXI.Container(),
        bgFill     = new PIXI.Graphics();
    bgFill.beginFill(0x5d32ea);
    bgFill.drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    bgFill.endFill();

    background.addChild(bgFill);

    // Create Scene
    this.scene = new PIXI.Container();
    this.scene.addChild(background);
    this.scene.addChild(stageButtons);
    this.scene.addChild(backToMainMenu);

    this.update = () => {
        updateCarousel();
    };
}

// Function to open. Stage Select is singleton
StageSelect.open = () => {
    if(StageSelect.instance == null) {
        StageSelect.instance = new StageSelect();
    }

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
