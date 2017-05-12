"use strict";

// Intro animation
function Intro() {
    
    // Create Scene
    this.scene = new PIXI.Container();

    // Define and style text
    
    // FOOD
    this.txtFood = new PIXI.Text("FOOD", {
        fontFamily: FONT_FAMILY, fontSize: 256, fill: 0x00ad5e,
        dropShadow: true, dropShadowAngle: 7 * Math.PI / 12, dropShadowDistance: 10,
        stroke: 0xFFFFFF, strokeThickness: 7
    });
    
    // FACTORY
    this.txtFactory = new PIXI.Text("FACTORY", this.txtFood.style);
    
    // ZERO
    this.txtZero = new PIXI.Text("ZERO", this.txtFood.style.clone());
    this.txtZero.style.fontSize = 148;
    this.txtZero.style.fill = 0xff3333;
    this.txtZero.style.strokeThickness = 4;
    
    // press anywhere to continue...
    this.txtPress = new PIXI.Text("press anywhere to continue...", {
        fontFamily: FONT_FAMILY, fontSize: 96, fill: 0xbd00ff,
        stroke: 0xFFFFFF, strokeThickness: 7
    });
    
    // by team19
    this.txtTeam19 = new PIXI.Text("by team19", {
        fontFamily: FONT_FAMILY, fontSize: 64, fill: 0x333333
    });

    // Position text
    // note no padding between lines - because font has spacing already
    
    // FOOD
    this.txtFood.position.set(CANVAS_WIDTH / 2 - this.txtFood.width / 2, 0);
    // FACTORY
    this.txtFactory.position.set(CANVAS_WIDTH / 2 - this.txtFactory.width / 2,
        this.txtFood.y + this.txtFood.height);
    // ZERO
    this.txtZero.position.set(CANVAS_WIDTH / 2 - this.txtZero.width / 2,
        this.txtFactory.y + this.txtFactory.height);
    // press anywhere to continue...
    this.txtPress.position.set(CANVAS_WIDTH / 2 - this.txtPress.width / 2,
        CANVAS_HEIGHT - this.txtPress.height - 10);
    // by team19
    this.txtTeam19.position.set(CANVAS_WIDTH - this.txtTeam19.width - 10,
        CANVAS_HEIGHT - this.txtTeam19.height - 10);
    
    // Make the screen clickable
    this.clickableArea = new PIXI.Graphics();
    this.clickableArea.beginFill(0, 0);
    this.clickableArea.drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.clickableArea.endFill();
    this.clickableArea.interactive = true;
    this.clickableArea.pointertap = MainMenu.open; // -> states/mainmenu.js

    // Add to scene
    this.scene.addChild(this.txtFood);
    this.scene.addChild(this.txtFactory);
    this.scene.addChild(this.txtZero);
    this.scene.addChild(this.txtPress);
    this.scene.addChild(this.txtTeam19);
    this.scene.addChild(this.clickableArea);
    
    // Start invisible
    this.txtFood.alpha = 0;
    this.txtFactory.alpha = 0;
    this.txtZero.alpha = 0;
    this.txtPress.alpha = 0;
    
    // Controls for appearing text
    this.appearSpeed = 0.02;
    this.flashFreq = 0.03;
    this.counter = 0;
    
    // Update the scene
    this.update = () => {
        if(this.txtFood.alpha < 1) {
            this.txtFood.alpha += this.appearSpeed * TICKER.deltaTime;
        } else if(this.txtFactory.alpha < 1) {
            this.txtFactory.alpha += this.appearSpeed * TICKER.deltaTime;       // Each line shows one at a time
        } else if(this.txtZero.alpha < 1) {
            this.txtZero.alpha += this.appearSpeed * TICKER.deltaTime;
        } else {                                                                // Then the continue text flashes based on a sin function
            this.txtPress.alpha = Math.pow(Math.sin(this.counter), 4);
            this.counter = (this.counter + this.flashFreq * TICKER.deltaTime) % Math.PI; 
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
}
