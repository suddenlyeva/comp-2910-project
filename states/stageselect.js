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
            btn = makeSimpleButton( // -> util.js
                btnWidth, btnHeight, "stage " + i + "\npreview placeholder",
                0xffdfba, btnHeight / 4);
        btn.x = padding;

        btn.pointertap = () => {
            if(!this.stageBtns.moving)
                Level.open(LEVELS[i]); // -> states/levels.js
        }

        btnCont.x = this.btnWBox * i;
        btnCont.initialX = btnCont.x;

        btnCont.addChild(btn);
        btnCont.getBtnPos = () => { return btn.position; };
        btnCont.setBtnPos = (x, y) => { btn.position.set(x, y); };

        this.stageBtns.addChild(btnCont);
    }

    this.stageBtns.initialX = this.stageBtns.targetX = CANVAS_WIDTH / 2 - this.btnWBox / 2;
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
        // if scrolled more than half button width -> advance
        if(diffAbs > this.btnWBox / 2) {
            // +1 if moving right, -1 if moving left, 0 if same position
            this.stageBtns.currentBtn -= (diff > 0) - (diff < 0);
            // check bounds
            if(this.stageBtns.currentBtn < 0) {
                this.stageBtns.currentBtn = 0;
            } else if(this.stageBtns.currentBtn >= this.stageBtns.children.length) {
                this.stageBtns.currentBtn = this.stageBtns.children.length - 1;
            }
        }
        // x position that the carousel needs to be moved to
        this.stageBtns.targetX =
            this.stageBtns.initialX - this.stageBtns.children[this.stageBtns.currentBtn].x;
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

    this.stageBtns.deceleration = 10; // ... of the movement animation
    this.stageBtns.posEpsilon = 1; // for position comparison

    this.stageBtns.updateDisplay = () => {
        // carousel alpha animation
        for(let i = 0; i < this.stageBtns.children.length; i++) {
            // button position on the scene
            let btnPos = this.stageBtns.x + this.stageBtns.children[i].x;
            // optimization: only process the visible buttons
            if(btnPos + this.stageBtns.children[i].width < 0) continue;
            if(btnPos > CANVAS_WIDTH) break;

            // magic
            let ratioFromTarget = this.btnWBox /
                (this.btnWBox + Math.abs(btnPos - this.stageBtns.initialX));
            this.stageBtns.children[i].alpha = ratioFromTarget;
            this.stageBtns.children[i].scale.set(ratioFromTarget);

            // this.stageBtns.children[i].y =
            //     this.stageBtns.height / 2 * (1 - ratioFromTarget);
            if(i !== 0) {
                this.stageBtns.children[i].x =
                    this.stageBtns.children[i - 1].x
                    + this.stageBtns.children[i - 1].width;
            }
        }
    };

    // initial carousel display
    this.stageBtns.updateDisplay();

    this.update = () => {
        let posDiff = this.stageBtns.x - this.stageBtns.targetX;
        if(posDiff !== 0) {
            if(!this.stageBtns.moving && !this.stageBtns.pressedDown) {
                // carousel movement animation
                this.stageBtns.x =
                    Math.abs(posDiff) < this.stageBtns.posEpsilon ?
                    this.stageBtns.targetX :
                    this.stageBtns.x - (posDiff / this.stageBtns.deceleration) * TICKER.deltaTime;
            }
            this.stageBtns.updateDisplay();
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
