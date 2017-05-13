"use strict";

// Stage Select Screen
function StageSelect() {

    // Create Scene
    this.scene = new PIXI.Container();

    // Make background
    this.background = new PIXI.Container();
    this.bgFill = new PIXI.Graphics();
    this.bgFill.beginFill(0x5d32ea);
    this.bgFill.drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.bgFill.endFill();

    this.background.addChild(this.bgFill);

    // ---------- carousel
    this.stageBtns = new PIXI.Container();

    // initialize buttons
    let btnWidth  = CANVAS_WIDTH / 2,
        btnHeight = CANVAS_HEIGHT / 2,
        padding   = 20;
    this.btnWBox  = btnWidth + padding * 2;
    for(let i = 0; i < LEVELS.length; i++) {
        let btnCont = new PIXI.Container(),
            btnBg = new PIXI.Graphics();
        // transparent background creates padding
        btnBg.beginFill(0, 0);
        btnBg.drawRect(0, 0, this.btnWBox, btnHeight);
        btnBg.endFill();
        let btn = makeSimpleButton( // -> util.js
            btnWidth, btnHeight, "stage " + i + "\npreview placeholder",
            0xffdfba, btnHeight / 4);
        btn.x = padding;

        btn.pointertap = () => {
            if(!this.stageBtns.moving)
                Level.open(LEVELS[i]); // -> states/levels.js
        }

        btnCont.addChild(btnBg);
        btnCont.addChild(btn);

        this.stageBtns.addChild(btnCont);
    }

    this.stageBtns.initialX = CANVAS_WIDTH / 2 - this.btnWBox / 2;
    this.stageBtns.position.set(CANVAS_WIDTH / 2 - this.btnWBox / 2,
        CANVAS_HEIGHT / 2 - btnHeight / 2);
    // same position for mask
    this.stageBtns.interactive = this.stageBtns.buttonMode = true;
    // index of the current displayed button
    this.stageBtns.currentBtn = 0;
    this.stageBtns.moving = false;
    // if moved less than 5 units, consider it a button press
    this.stageBtns.tapSensitivity = 5;

    this.stageBtns.pointerdown = (eventData) => {
        this.stageBtns.dragData = eventData.data.getLocalPosition(this.stageBtns.parent);
        this.stageBtns.oldX = this.stageBtns.x;
        // necessary to stop movement on tap, different from .moving
        this.stageBtns.pressedDown = true;
    };

    this.stageBtns.pointerup = this.stageBtns.pointerupoutside = (eventData) => {
        this.stageBtns.dragData = this.stageBtns.moving = this.stageBtns.pressedDown = false;
        let diff = this.stageBtns.x - this.stageBtns.oldX,
            diffAbs = Math.abs(diff);

        if(diffAbs < this.stageBtns.tapSensitivity) {
            Level.open(LEVELS[this.stageBtns.currentBtn]); // -> states/levels.js
        }
        this.stageBtns.currentBtn = this.stageBtns.determineCurrent();
    };

    this.stageBtns.determineCurrent = () => {
        // button closest to the center point becomes the currentBtn
        let centerPoint = this.stageBtns.initialX + this.btnWBox / 2;

        // bound checking
        if(this.stageBtns.x > centerPoint) {
            return 0;
        }

        if(this.stageBtns.x + this.stageBtns.width < centerPoint) {
            return this.stageBtns.children.length - 1;
        }

        for(let i = 0; i < this.stageBtns.children.length; i++) {
            let btnPos = this.stageBtns.x + this.stageBtns.children[i].x;
            if(btnPos <= centerPoint && centerPoint <= btnPos + this.stageBtns.children[i].width) {
                return i;
            }
        }
    };

    // calculate the difference in x position the carousel needs to be moved by
    this.stageBtns.calcPosDiff = () => {
        return this.stageBtns.x
            - this.stageBtns.initialX
            + this.stageBtns.children[this.stageBtns.currentBtn].x;
    };

    this.stageBtns.pointermove = eventData => {
        this.stageBtns.pressedDown = false;
        if(this.stageBtns.dragData) {
            let newPos = eventData.data.getLocalPosition(this.stageBtns.parent);
            let xDelta = newPos.x - this.stageBtns.dragData.x;
            this.stageBtns.x += xDelta;
            this.stageBtns.dragData = newPos;
            this.stageBtns.moving = true;
        }
    };

    // ---------------
    this.backToMainMenu = makeSimpleButton(200, 50, "back to main menu", 0xb3ecec, 50); // -> util.js
    this.backToMainMenu.position.set(CANVAS_WIDTH - 220, CANVAS_HEIGHT - 70);
    this.backToMainMenu.pointertap = MainMenu.open; // -> states/mainmenu.js

    this.scene.addChild(this.background);
    this.scene.addChild(this.stageBtns);
    this.scene.addChild(this.backToMainMenu);

    this.stageBtns.deceleration = 7; // ... of the movement animation
    this.stageBtns.posEpsilon = 1; // for position comparison

    // direction - true (1) if moving left, false(0) if moving right
    // TODO: currenly unused
    this.stageBtns.updateDisplay = (direction) => {
        // carousel alpha animation
        for(let i = 0; i < this.stageBtns.children.length; i++) {
            // button position on the scene
            let btnPos = this.stageBtns.x + this.stageBtns.children[i].x;
            // TODO: optimization: only process the visible buttons
            // if(btnPos + this.stageBtns.children[i].width < 0) continue;
            // if(btnPos > CANVAS_WIDTH) break;

            // magic
            let ratioFromTarget = this.btnWBox /
                (this.btnWBox + Math.abs(btnPos - this.stageBtns.initialX));
            this.stageBtns.children[i].alpha = ratioFromTarget;
            this.stageBtns.children[i].scale.set(ratioFromTarget);
            // adjust button positions after rescaling
            // TODO: compensate for loss of stageBtns width.
            // currently it's accelerating when moving left
            if(i < this.stageBtns.children.length - 1) {
                this.stageBtns.children[i + 1].x =
                    this.stageBtns.children[i].x
                    + this.stageBtns.children[i].width;
            }

            this.stageBtns.children[i].y =
                btnHeight / 2 - this.stageBtns.children[i].height / 2;
        }
    };

    // initial carousel display
    this.stageBtns.updateDisplay();

    this.update = () => {
        let posDiff = this.stageBtns.calcPosDiff();
        if(Math.abs(posDiff) > this.stageBtns.posEpsilon) {
            if(!this.stageBtns.moving && !this.stageBtns.pressedDown) {
                // carousel movement animation
                this.stageBtns.x -= (posDiff / this.stageBtns.deceleration) * TICKER.deltaTime;
            }
            this.stageBtns.updateDisplay(posDiff < 0);
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
