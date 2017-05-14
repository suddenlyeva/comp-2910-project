"use strict";

// Stage Select Screen
function StageSelect() {

    // Create Scene
    this.scene = new PIXI.Container();

    // Make background
    let background = new PIXI.Container(),
        bgFill     = new PIXI.Graphics();
    bgFill.beginFill(0x5d32ea);
    bgFill.drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    bgFill.endFill();

    background.addChild(bgFill);

    // ---------- carousel
    let stageButtons   = new PIXI.Container();
    // index of the current displayed button
    let currentButton  = 0;
    // if the current button was set manually(true) or calculated automatically(false)
    let setManually    = false;
    // if moved less than 5 units, consider it a button press
    let tapSensitivity = 5;

    // initialize buttons
    let buttonWidth        = CANVAS_WIDTH  / 2,
        buttonHeight       = CANVAS_HEIGHT / 2,
        padding            = 40,
        buttonDisplayWidth = buttonWidth + padding * 2;

    // initialX act as the 'anchor' of the carousel; used in position related calculations
    stageButtons.initialX    = CANVAS_WIDTH / 2 - buttonDisplayWidth / 2;
    stageButtons.position.set(stageButtons.initialX, CANVAS_HEIGHT / 2 - buttonHeight / 2);
    stageButtons.interactive = stageButtons.buttonMode = true;

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
            // relative to SCENE
            if(!button.clickPos) {
                button.clickPos = eventData.data.getLocalPosition(stageButtons.parent);
            }
        };

        button.pointerupoutside = button.pointerout = (eventData) => {
            button.clickPos = false;
        };

        button.pointerup = (eventData) => {
            if(!button.clickPos) return;
            let newPos = eventData.data.getLocalPosition(stageButtons.parent); // relative to SCENE
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
        // update wrapper appearance based on how far away it is from stageButtons.initialX
        // leftOfView - is the wrapper is to the left of initialX(true) or to the right(false)?
        wrapper.update = (leftOfView) => {
            let buttonPos = stageButtons.x + wrapper.x;

            let ratioFromTarget = buttonDisplayWidth /
                (buttonDisplayWidth + Math.abs(stageButtons.initialX - buttonPos));
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
        currentButton         = stageButtons.determineCurrent();
    };

    stageButtons.determineCurrent = () => {
        if(setManually) {
            setManually = false;
            return currentButton;
        }
        // button closest to the center point becomes the currentButton
        let centerPoint = stageButtons.initialX + buttonDisplayWidth / 2;

        for(let i = 0; i < stageButtons.children.length; i++) {
            let buttonR = stageButtons.x +
                stageButtons.children[i].x +
                stageButtons.children[i].width;
            if(buttonR >= centerPoint) {
                return i;
            }
        }
        return stageButtons.children.length - 1;
    };

    // calculate the difference in x position the carousel needs to be moved by
    stageButtons.calcPosDiff = () => {
        return stageButtons.x -
            stageButtons.initialX +
            stageButtons.children[currentButton].x;
    };

    stageButtons.pointermove = eventData => {
        stageButtons.pressedDown   = false;
        if(stageButtons.dragData) {
            let newPos             = eventData.data.getLocalPosition(stageButtons.parent);
            let xDelta             = newPos.x - stageButtons.dragData.x;
            stageButtons.x        += xDelta;
            stageButtons.dragData  = newPos;
            stageButtons.moving    = true;
        }
    };

    // ---------------
    let backToMainMenu = makeSimpleButton(200, 50, "back to main menu", 0xb3ecec, 50); // -> util.js
    backToMainMenu.position.set(CANVAS_WIDTH - 220, CANVAS_HEIGHT - 70);
    backToMainMenu.pointertap = MainMenu.open; // -> states/mainmenu.js

    this.scene.addChild(background);
    this.scene.addChild(stageButtons);
    this.scene.addChild(backToMainMenu);

    stageButtons.deceleration = 10; // ... of the movement animation
    stageButtons.posEpsilon   = 1;  // for position comparison

    stageButtons.updateDisplay = () => {
        // adjust carousel display based on position
        for(let i = 0; i < stageButtons.children.length; i++) {
            stageButtons.children[i].update(
                stageButtons.x + stageButtons.children[i].x < stageButtons.initialX
            );
        }
    };

    this.update = () => {
        let posDiff = stageButtons.calcPosDiff();
        if(Math.abs(posDiff) > stageButtons.posEpsilon) {
            if(!stageButtons.moving && !stageButtons.pressedDown) {
                // carousel movement animation
                stageButtons.x -= (posDiff / stageButtons.deceleration) * TICKER.deltaTime;
            }
            stageButtons.updateDisplay();
        }
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
// Find a middle point (like initialX) and have all the buttons
// move towards it. The perceived scroll speed should seem consistent.
