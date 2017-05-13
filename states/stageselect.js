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
    let stageButtons = new PIXI.Container();

    // initialize buttons
    let buttonWidth        = CANVAS_WIDTH  / 2,
        buttonHeight       = CANVAS_HEIGHT / 2,
        padding            = 20,
        buttonDisplayWidth = buttonWidth + padding * 2;
    for(let i = 0; i < LEVELS.length; i++) {
        let wrapper = new PIXI.Container(),
            buttonBg   = new PIXI.Graphics();
        // transparent background creates padding
        buttonBg.beginFill(0, 0);
        buttonBg.drawRect (0, 0, buttonDisplayWidth, buttonHeight);
        buttonBg.endFill();
        let button = makeSimpleButton( // -> util.js
            buttonWidth, buttonHeight, "stage " + i + "\npreview placeholder",
            0xffdfba, buttonHeight / 4);
        button.x = padding;

        // button.pointertap = () => {
        //     if(!stageButtons.moving)
        //         Level.open(LEVELS[i]); // -> states/levels.js
        // }

        wrapper.addChild(buttonBg);
        wrapper.addChild(button);

        stageButtons.addChild(wrapper);
    }

    stageButtons.initialX = CANVAS_WIDTH / 2 - buttonDisplayWidth / 2;
    stageButtons.position.set(stageButtons.initialX, CANVAS_HEIGHT / 2 - buttonHeight / 2);
    stageButtons.interactive = stageButtons.buttonMode = true;
    // index of the current displayed button
    stageButtons.currentButton = 0;
    // if moved less than 5 units, consider it a button press
    stageButtons.tapSensitivity = 5;

    stageButtons.pointerdown = (eventData) => {
        stageButtons.dragData = eventData.data.getLocalPosition(stageButtons.parent);
        stageButtons.startingDragData = stageButtons.dragData;
        // necessary to stop movement on tap, different from .moving
        stageButtons.pressedDown = true;
    };

    stageButtons.pointerup = stageButtons.pointerupoutside = (eventData) => {
        let diff = Math.abs(
            eventData.data.getLocalPosition(stageButtons.parent).x -
            stageButtons.startingDragData.x);

        stageButtons.dragData = stageButtons.moving = stageButtons.pressedDown = false;

        if(diff < stageButtons.tapSensitivity) {
            Level.open(LEVELS[stageButtons.currentButton]); // -> states/levels.js
        }
        stageButtons.currentButton = stageButtons.determineCurrent();
    };

    stageButtons.determineCurrent = () => {
        // button closest to the center point becomes the currentButton
        let centerPoint = stageButtons.initialX + buttonDisplayWidth / 2;

        // bound checking
        if(stageButtons.x > centerPoint) {
            return 0;
        }

        if(stageButtons.x + stageButtons.width < centerPoint) {
            return stageButtons.children.length - 1;
        }

        for(let i = 0; i < stageButtons.children.length; i++) {
            let buttonPos = stageButtons.x + stageButtons.children[i].x;
            if(buttonPos <= centerPoint &&
                centerPoint <= buttonPos + stageButtons.children[i].width) {
                return i;
            }
        }
    };

    // calculate the difference in x position the carousel needs to be moved by
    stageButtons.calcPosDiff = () => {
        return stageButtons.x
            - stageButtons.initialX
            + stageButtons.children[stageButtons.currentButton].x;
    };

    stageButtons.pointermove = eventData => {
        stageButtons.pressedDown = false;
        if(stageButtons.dragData) {
            let newPos = eventData.data.getLocalPosition(stageButtons.parent);
            let xDelta = newPos.x - stageButtons.dragData.x;
            stageButtons.x += xDelta;
            stageButtons.dragData = newPos;
            stageButtons.moving = true;
        }
    };

    // ---------------
    let backToMainMenu = makeSimpleButton(200, 50, "back to main menu", 0xb3ecec, 50); // -> util.js
    backToMainMenu.position.set(CANVAS_WIDTH - 220, CANVAS_HEIGHT - 70);
    backToMainMenu.pointertap = MainMenu.open; // -> states/mainmenu.js

    this.scene.addChild(background);
    this.scene.addChild(stageButtons);
    this.scene.addChild(backToMainMenu);

    stageButtons.deceleration = 7; // ... of the movement animation
    stageButtons.posEpsilon = 1; // for position comparison

    // direction - true (1) if moving left, false(0) if moving right
    // TODO: currenly unused
    stageButtons.updateDisplay = (direction) => {
        // carousel alpha animation
        for(let i = 0; i < stageButtons.children.length; i++) {
            // button position on the scene
            let buttonPos = stageButtons.x + stageButtons.children[i].x;
            // TODO: optimization: only process the visible buttons
            // if(buttonPos + stageButtons.children[i].width < 0) continue;
            // if(buttonPos > CANVAS_WIDTH) break;

            // magic
            let ratioFromTarget = buttonDisplayWidth /
                (buttonDisplayWidth + Math.abs(stageButtons.initialX - buttonPos));
            stageButtons.children[i].alpha = ratioFromTarget;
            stageButtons.children[i].scale.set(ratioFromTarget);
            // adjust button positions after rescaling
            // TODO: compensate for loss of stageButtons width OR invert calculation
            // currently it's accelerating when moving left
            if(i < stageButtons.children.length - 1) {
                stageButtons.children[i + 1].x =
                    stageButtons.children[i].x +
                    stageButtons.children[i].width;
            }

            // stay vertically centered
            stageButtons.children[i].y =
                buttonHeight / 2 - stageButtons.children[i].height / 2;
        }
    };

    // initial carousel display
    stageButtons.updateDisplay();

    this.update = () => {
        let posDiff = stageButtons.calcPosDiff();
        if(Math.abs(posDiff) > stageButtons.posEpsilon) {
            if(!stageButtons.moving && !stageButtons.pressedDown) {
                // carousel movement animation
                stageButtons.x -= (posDiff / stageButtons.deceleration) * TICKER.deltaTime;
            }
            stageButtons.updateDisplay(posDiff < 0);
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
