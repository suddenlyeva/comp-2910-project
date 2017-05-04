"use strict";

function Intro() {
    this.scene = new PIXI.Container();

    // Define and style text
    this.txtFood = new PIXI.Text("FOOD", {
        fontFamily: FONT_FAMILY, fontSize: 256, fill: 0x00ad5e,
        dropShadow: true, dropShadowAngle: 7 * Math.PI / 12, dropShadowDistance: 10,
        stroke: 0xFFFFFF, strokeThickness: 7
    });

    this.txtFactory = new PIXI.Text("FACTORY", this.txtFood.style);

    this.txtZero = new PIXI.Text("ZERO", this.txtFood.style.clone());
    this.txtZero.style.fontSize = 148;
    this.txtZero.style.fill = 0xff3333;
    this.txtZero.style.strokeThickness = 4;

    this.txtPress = new PIXI.Text("press anywhere to continue...", {
        fontFamily: FONT_FAMILY, fontSize: 96, fill: 0xbd00ff,
        stroke: 0xFFFFFF, strokeThickness: 7
    });

    this.txtTeam19 = new PIXI.Text("by team19", {
        fontFamily: FONT_FAMILY, fontSize: 64, fill: 0x333333, strokeThickness: 1
    });

    // Position text
    // note no padding between lines
    this.txtFood.position.set(RENDERER.width / 2 - this.txtFood.width / 2, 0);
    this.txtFactory.position.set(RENDERER.width / 2 - this.txtFactory.width / 2,
        this.txtFood.y + this.txtFood.height);
    this.txtZero.position.set(RENDERER.width / 2 - this.txtZero.width / 2,
        this.txtFactory.y + this.txtFactory.height);
    this.txtPress.position.set(RENDERER.width / 2 - this.txtPress.width / 2,
        RENDERER.height - this.txtPress.height - 10);
    this.txtTeam19.position.set(RENDERER.width - this.txtTeam19.width - 10,
        RENDERER.height - this.txtTeam19.height - 10);

    this.clickableArea = new PIXI.Graphics();
    this.clickableArea.beginFill(0);
    this.clickableArea.drawRect(0, 0, RENDERER.width, RENDERER.height);
    this.clickableArea.endFill();
    this.clickableArea.interactive = true;
    this.clickableArea.alpha = 0;
    this.clickableArea.pointertap = MainMenu.open;

    // Add to scene
    this.scene.addChild(this.txtFood);
    this.scene.addChild(this.txtFactory);
    this.scene.addChild(this.txtZero);
    this.scene.addChild(this.txtPress);
    this.scene.addChild(this.txtTeam19);
    this.scene.addChild(this.clickableArea);

    this.txtFood.alpha = 0;
    this.txtFactory.alpha = 0;
    this.txtZero.alpha = 0;
    this.txtPress.alpha = 0;

    this.appearSpeed = 0.02;
    this.flashFreq = 0.03;
    this.counter = 0;

    this.update = () => {
        if(this.txtFood.alpha < 1) {
            this.txtFood.alpha += this.appearSpeed;
        } else if(this.txtFactory.alpha < 1) {
            this.txtFactory.alpha += this.appearSpeed;
        } else if(this.txtZero.alpha < 1) {
            this.txtZero.alpha += this.appearSpeed;
        } else {
            this.txtPress.alpha = Math.pow(Math.sin(this.counter), 4);
            this.counter = (this.counter + this.flashFreq) % Math.PI;
        }
    };
}

Intro.open = () => {

    if(Intro.instance == null) {
        Intro.instance = new Intro();
    }

    SCENE = Intro.instance.scene;
    STATE = Intro.instance.update;
}
