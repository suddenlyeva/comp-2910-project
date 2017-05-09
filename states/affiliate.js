"use strict";

function Affiliate() {

    this.scene = new PIXI.Container();

    //Background
    this.bg = new PIXI.Graphics();
    this.bg.beginFill(0x66d2fb);
    this.bg.drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.bg.endFill();

    //Food Fall
    this.foodFallLogo = new PIXI.Sprite(PIXI.loader.resources["images/foodfalllogo.jpg"].texture);
    this.foodFallLogo.position.set();
    this.foodFallLogo.interactive = this.foodFallLogo.buttonMode = true;


    this.foodFallLogo.pointertap = () => {

        window.location.href = "http://foodfall.ca/";

    };


    //Add to scene
    this.scene.addChild(this.bg);
    this.scene.addChild(this.foodFallLogo);


    this.update = () => {};
}


Affiliate.open = () => {

    if(Affiliate.instance == null) {
        Affiliate.instance = new Affiliate();
    }

    SCENE = Affiliate.instance.scene;
    STATE = Affiliate.instance.update;
}