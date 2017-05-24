"use strict";

// Intro animation
function Intro() {

    // Define and style text

    // FOOD
    let txtFood = new PIXI.Text("FOOD", {
        fontFamily: FONT_FAMILY, fontSize: 196, fill: 0x00ad5e,
        dropShadow: true, dropShadowAngle: 7 * Math.PI / 12, dropShadowDistance: 10,
        stroke: 0xFFFFFF, strokeThickness: 7
    });

    // FACTORY
    let txtFactory = new PIXI.Text("FACTORY", txtFood.style);

    // ZERO
    let txtZero = new PIXI.Text("ZERO", txtFood.style.clone());
    txtZero.style.fontSize = 112;
    txtZero.style.fill = 0xff3333;
    txtZero.style.strokeThickness = 4;

    // press anywhere to continue...
    let txtPress = new PIXI.Text("press anywhere to continue...", {
        fontFamily: FONT_FAMILY, fontSize: 96, fill: 0xbd00ff,
        stroke: 0xFFFFFF, strokeThickness: 7
    });

    // by team19
    let txtTeam19 = new PIXI.Text("by team19", {
        fontFamily: FONT_FAMILY, fontSize: 64, fill: 0x333333
    });

    // Position text
    // note no padding between lines - because font has spacing already

    // FOOD
    txtFood.position.set(TILES_PX * 4, 0);
    // FACTORY
    txtFactory.position.set(txtFood.x + txtFood.width + TILES_PX / 2, txtFood.y);
    // ZERO
    txtZero.position.set(CANVAS_WIDTH / 2 - txtZero.width / 2, txtFactory.y + txtFactory.height);
    // press anywhere to continue...
    txtPress.position.set(CANVAS_WIDTH / 2 - txtPress.width / 2, CANVAS_HEIGHT - txtPress.height - 10);
    // by team19
    txtTeam19.position.set(CANVAS_WIDTH - txtTeam19.width - 10, CANVAS_HEIGHT - txtTeam19.height - 10);

    // Gear ------------------------------------------------------------
    let gearSpin = {
        starting : { val: 1 },
        max      : { val: 5, reached: false },
        final    : { val: 1, reached: false },
        epsilon  : 0.1,
        decel    : 20 // smooth deceleration
    };
    let spinningGear = makeGear("l", gearSpin.starting.val);
    let speedDiff;
    spinningGear.updateSpeed = () => {
        if(!gearSpin.max.reached) {
            speedDiff               = gearSpin.max.val - spinningGear.speed;
            spinningGear.speed         += speedDiff / gearSpin.decel * TICKER.deltaTime;
            gearSpin.max.reached    = Math.abs(speedDiff) < gearSpin.epsilon;
        } else if(!gearSpin.final.reached) {
            speedDiff               = gearSpin.final.val - spinningGear.speed;
            spinningGear.speed         += speedDiff / gearSpin.decel * TICKER.deltaTime;
            gearSpin.final.reached  = Math.abs(speedDiff) < gearSpin.epsilon;
        }
    };

    let gearMove  = {
        startingY : -spinningGear.height,
        finalY    : { val: CANVAS_HEIGHT / 2 - TILES_PX, reached: false },
        epsilon   : 1,
        decel     : 10,
    };

    let logoApple = new PIXI.Sprite(PIXI.utils.TextureCache["constantine-large.png"]);
    let gearAppleContainer = new PIXI.Container();
    gearAppleContainer.addChild(spinningGear);
    gearAppleContainer.addChild(logoApple);
    logoApple.position.set(
        gearAppleContainer.width  / 2 - logoApple.width  / 2,
        gearAppleContainer.height / 2 - logoApple.height / 2 - 25);
    gearAppleContainer.position.set(CANVAS_WIDTH / 2 - gearAppleContainer.width / 2, gearMove.startingY);

    gearAppleContainer.updatePos = () => {
        let posDiff = gearMove.finalY.val - gearAppleContainer.y;
        if(!gearMove.finalY.reached) {
            gearMove.finalY.reached = Math.abs(posDiff) < gearMove.epsilon;
            gearAppleContainer.y += (posDiff / gearMove.decel) * TICKER.deltaTime;
        }
    };

    // End of gear -----------------------------------------------------

    // Make the screen clickable
    let clickableArea = new PIXI.Graphics();
    clickableArea.beginFill(0, 0);
    clickableArea.drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    clickableArea.endFill();
    clickableArea.interactive = true;
    clickableArea.pointertap = () => {
        PlaySound(eSFXList.ButtonClick, false); // -> sfx.js
        PlaySound(eSFXList.MenuOpen, false);    // -> sfx.js
        StageSelect.open(); // -> states/mainmenu.js
    }

    let foodBurst = makeItemBurst(gearAppleContainer.x + gearAppleContainer.width / 2, gearMove.finalY.val + gearAppleContainer.height / 2);

    // Add to scene
    this.scene = new PIXI.Container();
    this.scene.addChild(foodBurst);
    this.scene.addChild(txtFood);
    this.scene.addChild(txtFactory);
    this.scene.addChild(txtZero);
    this.scene.addChild(txtPress);
    this.scene.addChild(txtTeam19);
    this.scene.addChild(gearAppleContainer);
    this.scene.addChild(clickableArea);

    // Start invisible
    txtFood   .alpha = 0;
    txtFactory.alpha = 0;
    txtZero   .alpha = 0;
    txtPress  .alpha = 0;

    // Controls for appearing text
    let appearSpeed = 0.02;
    let flashFreq   = 0.03;
    let counter     = 0;
    
    // Update the scene
    this.update = () => {
        if(txtFood.alpha < 1 && txtFactory.alpha < 1) {
            txtFood.alpha    += appearSpeed * TICKER.deltaTime;
            // } else if(txtFactory.alpha < 1) {
            txtFactory.alpha += appearSpeed * TICKER.deltaTime; // Each line shows one at a time
        } else if(!gearMove.finalY.reached) {
            gearAppleContainer.updatePos();
        } else { // Then the continue text flashes based on a sin function
            txtPress.alpha = Math.pow(Math.sin(counter), 4);
            counter        = (counter + flashFreq * TICKER.deltaTime) % Math.PI;
            if(txtZero.alpha < 1) {
                txtZero.alpha    += appearSpeed * TICKER.deltaTime;
            }
            spinningGear.updateSpeed();
            if(gearSpin.max.reached) {
                foodBurst.update();
            }
        }
        spinningGear.update();
    };
}

// Function to open. Intro is singleton
Intro.open = () => {
    if(Intro.instance == null) {
        Intro.instance = new Intro();
    }

    PlaySound(eMusicList.Music,true); // -> sfx.js

    SCENE = Intro.instance.scene;
    STATE = Intro.instance.update;
};

