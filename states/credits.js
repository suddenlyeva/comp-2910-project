"use strict";

function Credits() {
    this.scene = new PIXI.Container();

    // Define and style text
    this.txtThankYou = new PIXI.Text("thank you for playing!", {
        fontFamily: FONT_FAMILY, fontSize: 128, fill: 0x00ad5e,
        dropShadow: true, dropShadowAngle: 7 * Math.PI / 12, dropShadowDistance: 10,
        stroke: 0xFFFFFF, strokeThickness: 7
    });
	
	this.txtThankYou.anchor.set(0.5);

    this.txtTeam19 = new PIXI.Text("by team19", {
        fontFamily: FONT_FAMILY, fontSize: 64, fill: 0x333333
    });

    // Position text
    // note no padding between lines
    this.txtThankYou.position.set(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    this.txtTeam19.position.set(CANVAS_WIDTH - this.txtTeam19.width - 10,
        CANVAS_HEIGHT - this.txtTeam19.height - 10);

    this.clickableArea = new PIXI.Graphics();
    this.clickableArea.beginFill(0);
    this.clickableArea.drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.clickableArea.endFill();
    this.clickableArea.interactive = true;
    this.clickableArea.alpha = 0;
    this.clickableArea.pointertap = MainMenu.open;

    // Add to scene
    this.scene.addChild(this.txtThankYou);
    this.scene.addChild(this.txtTeam19);
    this.scene.addChild(this.clickableArea);

    this.txtThankYou.alpha = 0;

    this.appearSpeed = 0.02;
    this.flashFreq = 0.03;
    this.counter = 0;

    this.update = () => {
        if(this.txtThankYou.alpha < 1) {
            this.txtThankYou.alpha += this.appearSpeed;
        }
    };
}

Credits.open = () => {

    if(Credits.instance == null) {
        Credits.instance = new Credits();
    }

    SCENE = Credits.instance.scene;
    STATE = Credits.instance.update;
}