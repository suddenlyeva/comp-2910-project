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

    this.gamesTxt.position.set(25, 0);

    //Food Fall

    // Create circle container
    this.foodFallContainer = new PIXI.Container();
    this.foodFallCircle = new PIXI.Graphics();
    this.foodFallCircle.beginFill(0);
    this.foodFallCircle.drawCircle(200, 300, 150);
    this.foodFallCircle.endFill();

    // Create button and logo
    this.foodFallLogo = new PIXI.Sprite(PIXI.loader.resources["images/foodfalllogo.jpg"].texture);
    this.foodFallLogo.interactive = this.foodFallLogo.buttonMode = true;

    // Add to container
    this.foodFallContainer.addChild(this.foodFallCircle);
    this.foodFallContainer.addChild(this.foodFallLogo);

    this.foodFallLogo.position.set(100, 200);

    this.foodFallLogo.pointertap = () => {

        window.location.href = "http://foodfall.ca/";

    };


    // Race to Zero

    // Create circle container
    this.raceToZeroContainer = new PIXI.Container();
    this.raceToZeroCircle = new PIXI.Graphics();
    this.raceToZeroCircle.beginFill(0);
    this.raceToZeroCircle.drawCircle(CANVAS_WIDTH / 2, 300, 150);
    this.raceToZeroCircle.endFill();

    // Make logo as button
    this.raceToZeroLogo = new PIXI.Sprite(PIXI.loader.resources["images/racetozerologo.png"].texture);
    this.raceToZeroLogo.interactive = this.raceToZeroLogo.buttonMode = true;

    // Add to container
    this.raceToZeroContainer.addChild(this.raceToZeroCircle);
    this.raceToZeroContainer.addChild(this.raceToZeroLogo);

    // Set position of logo
    this.raceToZeroLogo.position.set(540, 250);

    this.raceToZeroLogo.pointertap = () => {

        window.location.href = "";

    };

    //Captain Plan-it

    //Create circle container
    this.captainPlanContainer = new PIXI.Container();
    this.captainPlanCircle = new PIXI.Graphics();
    this.captainPlanCircle.beginFill(0);
    this.captainPlanCircle.drawCircle(CANVAS_WIDTH - 200, 300, 150);
    this.captainPlanCircle.endFill();

    //Make logo as button
    this.captainPlanLogo = new PIXI.Sprite(PIXI.loader.resources["images/cp2.png"].texture);
    this.captainPlanLogo.interactive = this.captainPlanLogo.buttonMode = true;

    //Set position
    this.captainPlanLogo.position.set(CANVAS_WIDTH - 300, 220);

    //Add to container
    this.captainPlanContainer.addChild(this.captainPlanCircle);
    this.captainPlanContainer.addChild(this.captainPlanLogo);

    this.captainPlanLogo.pointertap = () => {

        window.location.href = "";

    };

    // Main menu button
    this.mainMenuButton = makeSimpleButton(200, 50, "main menu", 0xFFFF66, 75);
    this.mainMenuButton.position.set((CANVAS_WIDTH /2) - 100, CANVAS_HEIGHT - 100);
    this.mainMenuButton.on("pointertap", MainMenu.open);


    //Add to scene
    this.scene.addChild(this.bg);
    this.scene.addChild(this.gamesTxt);
    this.scene.addChild(this.foodFallContainer);
    this.scene.addChild(this.raceToZeroContainer);
    this.scene.addChild(this.captainPlanContainer);
    this.scene.addChild(this.mainMenuButton);



    this.update = () => {};
}


Affiliate.open = () => {

    if(Affiliate.instance == null) {
        Affiliate.instance = new Affiliate();
    }

    SCENE = Affiliate.instance.scene;
    STATE = Affiliate.instance.update;
}