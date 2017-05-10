"use strict";

function Affiliate() {

    this.scene = new PIXI.Container();

    //Background
    this.bg = new PIXI.Graphics();
    this.bg.beginFill(0x66d2fb);
    this.bg.drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.bg.endFill();

    //Text
    this.gamesTxt = new PIXI.Text("games", {fontFamily: FONT_FAMILY, fontSize: 128, fill: 0x00ad5e,
        dropShadow: true, dropShadowAngle: 7 * Math.PI / 12, dropShadowDistance: 10,
        stroke: 0xFFFFFF, strokeThickness: 7});


    //Food Fall
    this.foodFallCircle = new PIXI.Graphics();
    this.foodFallCircle.beginFill();
    this.foodFallLogo = new PIXI.Sprite(PIXI.loader.resources["images/foodfalllogo.jpg"].texture);
    this.foodFallLogo.position.set(0, 100);
    this.foodFallLogo.interactive = this.foodFallLogo.buttonMode = true;


    this.foodFallLogo.pointertap = () => {

        window.location.href = "http://foodfall.ca/";

    };


    //Race to Zero
    this.raceToZeroLogo = new PIXI.Sprite(PIXI.loader.resources["images/racetozerologo.png"].texture);
    this.raceToZeroLogo.position.set(300, 100);
    this.raceToZeroLogo.interactive = this.raceToZeroLogo.buttonMode = true;

    this.raceToZeroLogo.pointertap = () => {

        window.location.href = "";

    };

    //Captain Plan-it
    this.captainPlanLogo = new PIXI.Sprite(PIXI.loader.resources["images/cp2.png"].texture);
    this.captainPlanLogo.position.set(800, 100);
    this.captainPlanLogo.interactive = this.captainPlanLogo.buttonMode = true;

    this.captainPlanLogo.pointertap = () => {

        window.location.href = "";

    };



    //Add to scene
    this.scene.addChild(this.bg);
    this.scene.addChild(this.gamesTxt);
    this.scene.addChild(this.foodFallLogo);
    this.scene.addChild(this.raceToZeroLogo);
    this.scene.addChild(this.captainPlanLogo);



    this.update = () => {};
}


Affiliate.open = () => {

    if(Affiliate.instance == null) {
        Affiliate.instance = new Affiliate();
    }

    SCENE = Affiliate.instance.scene;
    STATE = Affiliate.instance.update;
}