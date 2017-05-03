"use strict";

let introScene;

function Intro() {
    this.scene = new PIXI.Container();
    this.txtFood = new PIXI.Text(
        "FOOD",
        {fontFamily: "Arial", fontSize: 256, fill: 0x00ad5e, align: "center"}
    );
    this.txtFactor = new PIXI.Text(
    
    );
    this.txtZero = new PIXI.Text(
    
    );

    this.update = function() {
        
    };
}

function openIntro() {

    if(introScene == null) {
        introScene = new Intro();
    }

    SCENE = introScene.scene;
    STATE = introScene.update;
}
