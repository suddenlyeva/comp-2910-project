"use strict";

let introScene;

function Intro() {
    this.scene = new PIXI.Container();

    // Define and style text
    this.txtFood = new PIXI.Text("FOOD", {
        fontFamily: "Arial", fontSize: 128, fill: 0x00ad5e,
        dropShadow: true, dropShadowAngle: 7 * Math.PI / 12, dropShadowDistance: 10,
        fontWeight: "bold", stroke: 0xFFFFFF, strokeThickness: 7
    });

    this.txtFactory = new PIXI.Text("FACTORY", this.txtFood.style);

    this.txtZero = new PIXI.Text("ZERO", this.txtFood.style.clone());
    this.txtZero.style.fontSize = 74;
    this.txtZero.style.fill = 0xff3333;
    this.txtZero.style.strokeThickness = 4;

    // Position text
    // note no padding between lines
    this.txtFood.position.set(RENDERER.width / 2 - this.txtFood.width / 2, 130);
    this.txtFactory.position.set(RENDERER.width / 2 - this.txtFactory.width / 2,
        this.txtFood.y + this.txtFood.height);
    this.txtZero.position.set(RENDERER.width / 2 - this.txtZero.width / 2,
        this.txtFactory.y + this.txtFactory.height);

    // Add to scene
    this.scene.addChild(this.txtFood);
    this.scene.addChild(this.txtFactory);
    this.scene.addChild(this.txtZero);

    this.txtFood.alpha = 0;
    this.txtFactory.alpha = 0;
    this.txtZero.alpha = 0;

    this.appearSpeed = 0.02;

    this.update = function() {
        if(this.txtFood.alpha < 1) {
            this.txtFood.alpha += this.appearSpeed;
        } else if(this.txtFactory.alpha < 1) {
            this.txtFactory.alpha += this.appearSpeed;
        } else if(this.txtZero.alpha < 1) {
            this.txtZero.alpha += this.appearSpeed;
        }
    }.bind(this);
}

function openIntro() {

    if(introScene == null) {
        introScene = new Intro();
    }

    SCENE = introScene.scene;
    STATE = introScene.update;
}
