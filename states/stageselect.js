"use strict";

// Stage Select Screen
function StageSelect() {

    // ----------------------------------- Carousel -----------------------------------
    let stageButtons       = new PIXI.Container();
    // index of the current displayed button
    let currentButton      = 0;
    // if the current button was set manually(true) or calculated automatically(false)
    let setManually        = false;
    // from pointerup to pointerdown: if moved less than the number of units(x and y)
    // specified by tapSensitivity, consider it a tap/click
    let tapSensitivity     = 10;
    // xDelta multiplier
    let scrollSensitivity  = 1.1;
    // swipe speed exponent
    let swipeSensitivity   = 1.6;

    let swipeDistance      = 0;  // accumulates unadjusted xDelta

    // update loop variables
    let deceleration       = 20; // ... of the movement animation
    let positionEpsilon    = 1;  // for position comparison
    let stopWatch          = 0;  // for calculating swipe speed

    // button dimensions
    let buttonWidth        = CANVAS_WIDTH  / 2,
        buttonHeight       = CANVAS_HEIGHT / 2,
        padding            = 25,
        buttonDisplayWidth = buttonWidth + padding * 2;

    // referenceX is a starting x position of the carousel
    // used as a base reference in position related calculations
    let referenceX         = CANVAS_WIDTH / 2 - buttonDisplayWidth / 2;

    stageButtons.position.set(referenceX, CANVAS_HEIGHT / 2 - buttonHeight / 2);
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
        button.x = padding;

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
            if(!button.clickPos) return;
            // position relative to carousel parent
            let newPos = eventData.data.getLocalPosition(stageButtons.parent);
            let diffX  = Math.abs(newPos.x - button.clickPos.x),
                diffY  = Math.abs(newPos.y - button.clickPos.y);

            if(diffX < tapSensitivity && diffY < tapSensitivity) {
                if(currentButton === i) {
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
        // update wrapper appearance based on how far away it is from referenceX
        // leftOfView - is the wrapper is to the left of initialX(true) or to the right(false)?
        wrapper.update = (leftOfView) => {
            let buttonPos = stageButtons.x + wrapper.x;

            let ratioFromTarget = buttonDisplayWidth /
                (buttonDisplayWidth + Math.abs(referenceX - buttonPos));
            button.alpha = ratioFromTarget;
            // wrapper.scale.set(ratioFromTarget);
            button.scale.set(ratioFromTarget);
            button.x = leftOfView ? wrapper.width - button.width - padding : padding;
            button.y = wrapper.height / 2 - button.height / 2;
        };
        // --------------------

        wrapper.update();

        stageButtons.addChild(wrapper);
    }

    stageButtons.pointerdown = (eventData) => {
        stageButtons.dragData = eventData.data.getLocalPosition(stageButtons.parent);
        // necessary to stop movement on tap, different from .moving
        stageButtons.pressedDown = true;
    };

    stageButtons.pointerup = stageButtons.pointerupoutside = (eventData) => {
        stageButtons.dragData = stageButtons.moving = stageButtons.pressedDown = false;
        // prevent division by 0
        let swipeSpeed = stopWatch === 0 ? 0 : swipeDistance / stopWatch;
        // raise to power, preserve sign
        let distAdj = Math.pow(Math.abs(swipeSpeed), swipeSensitivity) * (swipeSpeed < 0 ? -1 : 1);
        currentButton = determineCurrent(distAdj);
        stopWatch = swipeDistance = 0;
    };

    // determine the current button based on which one is closest to the center point
    // does nothing if current button was set manually (by clicking a button other than current)
    // adjX modifier changes how much further ahead to look for currentButton
    let determineCurrent = (adjX) => {
        if(setManually) {
            setManually = false;
            return currentButton;
        }

        let centerPoint = referenceX + buttonDisplayWidth / 2;

        for(let i = 0; i < stageButtons.children.length; i++) {
            let buttonR = stageButtons.x +
                stageButtons.children[i].x +
                stageButtons.children[i].width + adjX;
            if(buttonR >= centerPoint) {
                return i;
            }
        }
        return stageButtons.children.length - 1;
    };

    stageButtons.pointermove = eventData => {
        stageButtons.pressedDown   = false;
        if(stageButtons.dragData) {
            let newPos             = eventData.data.getLocalPosition(stageButtons.parent);
            let xDelta             = newPos.x - stageButtons.dragData.x;
            stageButtons.x        += xDelta * scrollSensitivity;
            stageButtons.dragData  = newPos;
            stageButtons.moving    = true;

            swipeDistance         += xDelta;
        }
    };

    // adjust carousel display based on current position
    let updateDisplay = () => {
        for(let i = 0; i < stageButtons.children.length; i++) {
            stageButtons.children[i].update(
                stageButtons.x + stageButtons.children[i].x < referenceX
            );
        }
    };

    let updateCarousel = () => {
        // calculate difference in x position that the carousel needs to be moved by
        let posDiff = stageButtons.x - referenceX + stageButtons.children[currentButton].x;
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
    sounds["sounds/menu-open.wav"].play();
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
// Find a middle point (like initialX) and have all the buttons
// move towards it. The perceived scroll speed should seem consistent.
