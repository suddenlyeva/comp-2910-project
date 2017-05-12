"use strict";

function StageSelect() {

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
    this.btnWidth = CANVAS_WIDTH / 2;
    this.btnHeight = CANVAS_HEIGHT / 2;
    for(let i = 0; i < LEVELS.length; i++) {
        let btn = makeSimpleButton(
            this.btnWidth, this.btnHeight, "stage " + i + "\npreview placeholder",
            0xffdfba, this.btnHeight / 4);
        btn.position.set(this.btnWidth * i, 0);

        btn.pointertap = () => {
            if(!this.stageBtns.moving)
                Level.open(LEVELS[i]);
        }

        this.stageBtns.addChild(btn);
    }

    // this.carouselMask = new PIXI.Graphics();
    // this.carouselMask.beginFill(0, 0);
    // this.carouselMask.drawRect(0, 0, this.btnWidth, this.btnHeight);
    // this.carouselMask.endFill();

    // this.stageBtns.mask = this.carouselMask;
    this.stageBtns.initialX = this.stageBtns.targetX = CANVAS_WIDTH / 2 - this.btnWidth / 2;
    this.stageBtns.position.set(CANVAS_WIDTH / 2 - this.btnWidth / 2,
        CANVAS_HEIGHT / 2 - this.btnHeight / 2);
    // same position for mask
    // this.carouselMask.position.set(this.stageBtns.x, this.stageBtns.y);
    this.stageBtns.interactive = this.stageBtns.buttonMode = true;
    // index of the current displayed button
    this.stageBtns.currentBtn = 0;
    this.stageBtns.moving = false;
    this.stageBtns.tapSensitivity = 5;

    this.stageBtns.pointerdown = eventData => {
        this.stageBtns.dragData = eventData.data.getLocalPosition(this.stageBtns.parent);
        this.stageBtns.oldX = this.stageBtns.x;
        // necessary to stop movement on tap, different from .moving
        this.stageBtns.pressedDown = true;
    };

    this.stageBtns.pointerup = this.stageBtns.pointerupoutside = eventData => {
        this.stageBtns.dragData = this.stageBtns.moving = this.stageBtns.pressedDown = false;
        let diff = this.stageBtns.x - this.stageBtns.oldX,
            diffAbs = Math.abs(diff);

        if(diffAbs < this.stageBtns.tapSensitivity) {
            Level.open(LEVELS[this.stageBtns.currentBtn]);
        }
        // if scrolled more than half button width -> advance
        if(diffAbs > this.btnWidth / 2) {
            // +1 if moving right, -1 if moving left, 0 otherwise
            this.stageBtns.currentBtn -= (diff > 0) - (diff < 0);
            // check bounds
            if(this.stageBtns.currentBtn < 0) {
                this.stageBtns.currentBtn = 0;
            } else if(this.stageBtns.currentBtn >= this.stageBtns.children.length) {
                this.stageBtns.currentBtn = this.stageBtns.children.length - 1;
            }
        }
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
    this.backToMainMenu = makeSimpleButton(200, 50, "back to main menu", 0xb3ecec, 50);
    this.backToMainMenu.position.set(CANVAS_WIDTH - 220, CANVAS_HEIGHT - 70);
    this.backToMainMenu.pointertap = MainMenu.open;

    this.scene.addChild(this.background);
    this.scene.addChild(this.stageBtns);
    // this.scene.addChild(this.carouselMask);
    this.scene.addChild(this.backToMainMenu);

    this.stageBtns.deceleration = 10; // ... of the movement animation
    this.stageBtns.posEpsilon = 1; // for position comparison

    this.stageBtns.updateDisplay = () => {
        // carousel alpha animation
        for(let i = 0; i < this.stageBtns.children.length; i++) {
            // button position on the scene
            let btnPos = this.stageBtns.x + this.stageBtns.children[i].x;
            // optimization: only process the visible buttons
            if(btnPos + this.btnWidth < 0) continue;
            if(btnPos > CANVAS_WIDTH) break;

            // magic
            let ratioFromTarget = this.btnWidth /
                (this.btnWidth + Math.abs(btnPos - this.stageBtns.initialX));
            this.stageBtns.children[i].alpha = ratioFromTarget;
        }
    }

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

StageSelect.open = () => {
    if(StageSelect.instance == null) {
        StageSelect.instance = new StageSelect();
    }

    SCENE = StageSelect.instance.scene;
    STATE = StageSelect.instance.update;
}
