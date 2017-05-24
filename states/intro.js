"use strict";

// Intro animation
function Intro() {

    // Define and style text

    // FOOD
    let txtFood = new PIXI.Text("FOOD", {
        fontFamily: FONT_FAMILY, fontSize: 256, fill: 0x00ad5e,
        dropShadow: true, dropShadowAngle: 7 * Math.PI / 12, dropShadowDistance: 10,
        stroke: 0xFFFFFF, strokeThickness: 7
    });

    // FACTORY
    let txtFactory = new PIXI.Text("FACTORY", txtFood.style);

    // ZERO
    let txtZero = new PIXI.Text("ZERO", txtFood.style.clone());
    txtZero.style.fontSize = 148;
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
    txtFood.position.set(CANVAS_WIDTH / 2 - txtFood.width / 2, 0);
    // FACTORY
    txtFactory.position.set(CANVAS_WIDTH / 2 - txtFactory.width / 2, txtFood.y + txtFood.height);
    // ZERO
    txtZero.position.set(CANVAS_WIDTH / 2 - txtZero.width / 2, txtFactory.y + txtFactory.height);
    // press anywhere to continue...
    txtPress.position.set(CANVAS_WIDTH / 2 - txtPress.width / 2, CANVAS_HEIGHT - txtPress.height - 10);
    // by team19
    txtTeam19.position.set(CANVAS_WIDTH - txtTeam19.width - 10, CANVAS_HEIGHT - txtTeam19.height - 10);

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

    // Add to scene
    this.scene = new PIXI.Container();
    this.scene.addChild(txtFood);
    this.scene.addChild(txtFactory);
    this.scene.addChild(txtZero);
    this.scene.addChild(txtPress);
    this.scene.addChild(txtTeam19);
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
    
    // Creates a burst of every food item on the screen
    // RECONSIDERING...
    /* 
    data = {
        x    : The x position of the burst,
        y    : The y position of the burst,
        xMax : The maximum x distance that particles will fly.
        yMax : The maximum y distance that particles will fly.
    }
    let makeItemBurst = (x,y) => {
        let sprites = [];
        let secretItems = 2;
        console.log(Object.keys(ITEM_TEXTURES).length - secretItems);
        for (let i = APPLE; i < Object.keys(ITEM_TEXTURES).length - secretItems; i++) {
            sprites.push(new PIXI.Sprite(ITEM_TEXTURES[i]));
        }
        for (let i in sprites) {
            sprites[i].scale = 0;
            sprites[i].x = x;
            sprites[i].y = y;
            
            sprites[i].initDeltaX;
            sprites[i].initDeltaY;
            sprites[i].deceleration;
            sprites[i].limitX;
            sprites[i].limitY;
            sprites[i].deltaScale;
            sprites[i].limitScale;
            sprites[i].initRotationFactor;
            sprites[i].deltaRotationFactor;
            
            this.scene.addChild(sprites[i]);
        }
    };

    makeItemBurst(100,100);
    
    */
    
    
    // Update the scene
    this.update = () => {
        if(txtFood.alpha < 1) {
            txtFood.alpha    += appearSpeed * TICKER.deltaTime;
        } else if(txtFactory.alpha < 1) {
            txtFactory.alpha += appearSpeed * TICKER.deltaTime; // Each line shows one at a time
        } else if(txtZero.alpha < 1) {
            txtZero.alpha    += appearSpeed * TICKER.deltaTime;
        } else { // Then the continue text flashes based on a sin function
            txtPress.alpha = Math.pow(Math.sin(counter), 4);
            counter        = (counter + flashFreq * TICKER.deltaTime) % Math.PI;
        }
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

