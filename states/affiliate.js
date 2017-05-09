"use strict";

function Affiliate() {

    this.scene = new PIXI.Container();
    this.bg = new PIXI.Graphics();
    this.bg.beginFill(0);
    this.bg.drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.bg.endFill();

    this.update = () => {}
}


Affiliate.open = () => {

    if(Affiliate.instance == null) {
        Affiliate.instance = new Credits();
    }

    SCENE = Affiliate.instance.scene;
    STATE = Affiliate.instance.update;
}