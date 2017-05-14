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
        buttonDisplayWidth = buttonWidth + padding * 2,
        nextButtonX        = 0;

    stageButtons.initialX = CANVAS_WIDTH / 2 - buttonDisplayWidth / 2;
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

        // --------------------
        // update wrapper appearance based on how far away it is from stageButtons.initialX
        // takes x position as an argument
        // returns new width of the wrapper
        wrapper.update = (xPos) => {
            wrapper.x = xPos;
            let buttonPos = stageButtons.x + wrapper.x;

            let ratioFromTarget = buttonDisplayWidth /
                (buttonDisplayWidth + Math.abs(stageButtons.initialX - buttonPos));
            wrapper.alpha = ratioFromTarget;
            wrapper.scale.set(ratioFromTarget);
            wrapper.y = buttonHeight / 2 - wrapper.height / 2;

            return wrapper.x + wrapper.width;
        };
        // --------------------

        nextButtonX = wrapper.update(nextButtonX);

        stageButtons.addChild(wrapper);
    }

    stageButtons.pointerdown = (eventData) => {
        stageButtons.dragData = eventData.data.getLocalPosition(stageButtons.parent);
        // necessary to stop movement on tap, different from .moving
        stageButtons.pressedDown = true;
    };

    stageButtons.pointerup = stageButtons.pointerupoutside = (eventData) => {
        stageButtons.dragData = stageButtons.moving = stageButtons.pressedDown = false;
        currentButton = stageButtons.determineCurrent();
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
        return stageButtons.x
            - stageButtons.initialX
            + stageButtons.children[currentButton].x;
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
        // carousel display based on position
        nextButtonX = 0;
        for(let i = 0; i < stageButtons.children.length; i++) {
            nextButtonX = stageButtons.children[i].update(nextButtonX);
        }
    };

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
