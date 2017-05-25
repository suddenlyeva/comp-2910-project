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

    let contFoodFactory = new PIXI.Container();
    contFoodFactory.addChild(txtFood);
    txtFactory.x = contFoodFactory.width + TILES_PX / 1.85;
    contFoodFactory.addChild(txtFactory);

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
    let teamBg = new PIXI.Sprite(PIXI.loader.resources["images/spritesheet.json"].textures["fade-backing.png"]);

    let byTeam19 = new PIXI.Container();
    byTeam19.addChild(teamBg);
    teamBg.scale.set(1.5, 1);
    txtTeam19.position.set(byTeam19.width / 2 - txtTeam19.width / 2 + 5, byTeam19.height / 2 - txtTeam19.height / 2 - 5)
    byTeam19.addChild(txtTeam19);

    // Position text
    // note no padding between lines - because font has spacing already

    // FOOD FACTORY
    contFoodFactory.position.set(CANVAS_WIDTH / 2 - contFoodFactory.width / 2, 0);
    // ZERO
    txtZero.position.set(CANVAS_WIDTH / 2 - txtZero.width / 2, contFoodFactory.y + contFoodFactory.height);
    // press anywhere to continue...
    txtPress.position.set(CANVAS_WIDTH / 2 - txtPress.width / 2, CANVAS_HEIGHT - txtPress.height - 10);
    // by team19
    byTeam19.position.set(CANVAS_WIDTH - byTeam19.width, CANVAS_HEIGHT - byTeam19.height);

    // reference coordinates for positioning the scaled down container
    let team19Coord = { refX: byTeam19.x + byTeam19.width / 2, refY: byTeam19.y + byTeam19.height / 2 };

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
            spinningGear.speed     += speedDiff / gearSpin.decel * TICKER.deltaTime;
            gearSpin.max.reached    = Math.abs(speedDiff) < gearSpin.epsilon;
        } else if(!gearSpin.final.reached) {
            speedDiff               = gearSpin.final.val - spinningGear.speed;
            spinningGear.speed     += speedDiff / gearSpin.decel * TICKER.deltaTime;
            gearSpin.final.reached  = Math.abs(speedDiff) < gearSpin.epsilon;
        }
    };

    let gearMove  = {
        startingY : -spinningGear.height,
        finalY    : { val: CANVAS_HEIGHT / 2 - TILES_PX, reached: false },
        epsilon   : 1,
        decel     : 10,
    };

    let logoApple = new PIXI.Sprite(PIXI.loader.resources["images/spritesheet.json"].textures["constantine-large.png"]);
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
            gearMove.finalY.reached  = Math.abs(posDiff) < gearMove.epsilon;
            gearAppleContainer.y    += (posDiff / gearMove.decel) * TICKER.deltaTime;
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
        PlaySound(eSFXList.StageEnter, false);
        if(!musicOnce) {
            PlaySound(eMusicList.Music,true); // -> sfx.js
            musicOnce = true;
        }
        StageSelect.open(); // -> states/mainmenu.js
    };

    let foodBurst = makeItemBurst(gearAppleContainer.x + gearAppleContainer.width / 2, gearMove.finalY.val + gearAppleContainer.height / 2);

    let background = new PIXI.Sprite(PIXI.utils.TextureCache["images/background-intro.png"]);
    
    // Sound controls
    let musicOnce   = false;
    let musicStart  = 160;
    let musicTicker = 0;
    
    let dropSFXOnce = false;
    let gearSFXOnce = false;
    let burstSFXOnce = false;
    

    // Add to scene
    this.scene = new PIXI.Container();
    this.scene.addChild(background);
    this.scene.addChild(foodBurst);
    this.scene.addChild(contFoodFactory);
    this.scene.addChild(txtZero);
    this.scene.addChild(txtPress);
    this.scene.addChild(byTeam19);
    this.scene.addChild(gearAppleContainer);
    this.scene.addChild(clickableArea);

    // Start invisible
    contFoodFactory.alpha = 0;
    txtZero        .alpha = 0;
    txtPress       .alpha = 0;
    byTeam19       .scale.set(0);

    // Controls for appearing text
    let appearSpeed = 0.02;
    let flashFreq   = 0.03;
    let counter     = 0;
    let scaleDecel  = 7;
    
    // Update the scene
    this.update = () => {
        if(contFoodFactory.alpha < 1) {
            contFoodFactory.alpha += appearSpeed * TICKER.deltaTime;
        } else if(!gearMove.finalY.reached) {
            
            if (!dropSFXOnce) {
                PlaySound(eSFXList.IntoProcessor, false);
                dropSFXOnce = true;
            }
            
            gearAppleContainer.updatePos();
        } else {
            
            if (!gearSFXOnce) {
                PlaySound(eSFXList.Processing, false);
                gearSFXOnce = true;
            }
            
            if(txtZero.alpha < 1) {
                txtZero.alpha += appearSpeed * TICKER.deltaTime;
            }
            spinningGear.updateSpeed();
            if(gearSpin.max.reached) {
                
                if (!burstSFXOnce) {
                    PlaySound(eSFXList.RecipeComplete, false);
                    burstSFXOnce = true;
                }
                
                // Then the continue text flashes based on a sin function
                txtPress.alpha = Math.pow(Math.sin(counter), 4);
                counter        = (counter + flashFreq * TICKER.deltaTime) % Math.PI;
                foodBurst.update();
                if(byTeam19.scale.x < 1) {
                    byTeam19.scale.set(byTeam19.scale.x + (1 - byTeam19.scale.x) / scaleDecel * TICKER.deltaTime);
                    byTeam19.position.set(
                        team19Coord.refX - byTeam19.width / 2,
                        team19Coord.refY - byTeam19.height / 2);
                }
            }
        }
        spinningGear.update();
        
        if(!musicOnce) {
            musicTicker += TICKER.deltaTime;
            if (musicTicker >= musicStart) {
                PlaySound(eMusicList.Music,true); // -> sfx.js
                musicOnce = true;
            }
        }
    };
}

// Function to open. Intro is singleton
Intro.open = () => {
    if(Intro.instance == null) {
        Intro.instance = new Intro();
    }

    SCENE = Intro.instance.scene;
    STATE = Intro.instance.update;
};

