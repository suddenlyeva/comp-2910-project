"use strict";

let introScene;

function Intro() {
    this.scene = new PIXI.Container();
    this.txtFood = new PIXI.Text("FOOD", {
        fontFamily: "Arial", fontSize: 128, fill: 0x00ad5e,
        dropShadow: true, dropShadowAngle: 7 * Math.PI / 12, dropShadowDistance: 10,
        fontWeight: "bold", stroke: 0xFFFFFF, strokeThickness: 7
    });

    this.txtFactory = new PIXI.Text("FACTORY", this.txtFood.style);

    this.txtZero = new PIXI.Text("ZERO",
        {fontFamily: "Arial", fontSize: 74, fill: 0xc8543b}
    );

    // Position relatively
    this.txtFood.position.set(RENDERER.width / 2 - this.txtFood.width / 2, 130);
    this.txtFactory.position.set(RENDERER.width / 2 - this.txtFactory.width / 2,
        this.txtFood.y + this.txtFood.height + 20);
    this.txtZero.y = this.txtFactory.y + this.txtFactory.height + 20;

    this.update = function() {

    };

    this.scene.addChild(this.txtFood);
    this.scene.addChild(this.txtFactory);
    this.scene.addChild(this.txtZero);
}

function openIntro() {

    if(introScene == null) {
        introScene = new Intro();
    }

    SCENE = introScene.scene;
    STATE = introScene.update;
}
