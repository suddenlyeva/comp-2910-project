"use strict";
/*Affiliate Page with the list of affiliates and logos acting as the
links to the pages
*/

function Affiliate() {

    // Scene
    this.scene = new PIXI.Container();

    // Background
    this.bg = new PIXI.Graphics();
    this.bg.beginFill(0x66d2fb);
    this.bg.drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.bg.endFill();

    //Text Style

    //Textstyle for the title
    this.textStyleTitle = new PIXI.TextStyle({fontFamily: FONT_FAMILY, fontSize: 140, fill: 0x00ad5e,
        dropShadow: true, dropShadowAngle: 7 * Math.PI / 12, dropShadowDistance: 7, dropShadowAlpha: 0.7,
        stroke: 0xFFFFFF, strokeThickness: 7});

    //Text style for the affiliate name
    this.textStyleLogo = this.textStyleTitle.clone();
    this.textStyleLogo.fontSize = 100;
    this.textStyleLogo.strokeThickness = 4;




    // ------------- Food Fall ----------------------------------

    // Create logo
    this.foodFallLogo = new PIXI.Sprite(PIXI.loader.resources["images/foodfalllogo.jpg"].texture);

    // Set the logo to be interactive as a button
    this.foodFallLogo.interactive = this.foodFallLogo.buttonMode = true;

    // Set the position of the logo
    this.foodFallLogo.position.set(100, 200);

    // When logo is clicked send user to affiliates page
    this.foodFallLogo.pointertap = () => {

        window.location.href = "http://foodfall.ca/";

    };


    //--------------- Race to Zero ----------------------------

    // Create logo
    this.raceToZeroLogo = new PIXI.Sprite(PIXI.loader.resources["images/racetozerologo.png"].texture);

    // Set logo to be interactive as a button
    this.raceToZeroLogo.interactive = this.raceToZeroLogo.buttonMode = true;

    // Set position of logo
    this.raceToZeroLogo.position.set((CANVAS_WIDTH / 2) - (this.raceToZeroLogo.width /2), 200);

    // When logo is clicked send user to affiliate page
    this.raceToZeroLogo.pointertap = () => {

        window.location.href = "";

    };

    //----------------- Captain Plan-it ----------------------------

    // Make logo
    this.captainPlanLogo = new PIXI.Sprite(PIXI.loader.resources["images/cp2.png"].texture);

    // Set logo as interactive as a button
    this.captainPlanLogo.interactive = this.captainPlanLogo.buttonMode = true;

    //Set position of logo
    this.captainPlanLogo.position.set(CANVAS_WIDTH - 300, 200);

    // When logo is clicked send user to affiliate page
    this.captainPlanLogo.pointertap = () => {

        window.location.href = "http://students.bcitdev.com/A01009216/Captain-Plan-It/index.php";

    };

    // Main menu button
    this.mainMenuButton = makeSimpleButton(200, 50, "main menu", 0xFFFF66, 75);
    this.mainMenuButton.position.set((CANVAS_WIDTH /2) - 100, CANVAS_HEIGHT - 100);
    this.mainMenuButton.on("pointertap", MainMenu.open);

    //Shadows for the logos
    this.shadows = new PIXI.Graphics();
    this.shadows.beginFill(0);
    this.shadows.drawRect(this.foodFallLogo.x + 7, this.foodFallLogo.y + 7,
                          this.foodFallLogo.width, this.foodFallLogo.height);
    this.shadows.drawRect(this.raceToZeroLogo.x + 7, this.raceToZeroLogo.y + 7,
                          this.raceToZeroLogo.width, this.raceToZeroLogo.height);
    this.shadows.drawRect(this.captainPlanLogo.x + 7, this.captainPlanLogo.y + 7,
                          this.captainPlanLogo.width, this.captainPlanLogo.height);

    this.shadows.endFill();
    this.shadows.alpha = 0.7;

    // Text

    // Title page text
    this.gamesTxt = new PIXI.Text("games", this.textStyleTitle);
    this.gamesTxt.position.set(25, 0);

    //Logo texts
    this.foodFallTxt = new PIXI.Text("food fall", this.textStyleLogo);
    this.raceToZeroTxt = new PIXI.Text("race to zero", this.textStyleLogo);
    this.captainPlanTxt = new PIXI.Text("captain plan-it", this.textStyleLogo);

    // Position logo texts
    this.foodFallTxt.position.set(this.foodFallLogo.x + this.foodFallLogo.width / 2 - this.foodFallTxt.width / 2,
                                  this.foodFallLogo.y + 200);
    this.raceToZeroTxt.position.set(this.raceToZeroLogo.x + this.raceToZeroLogo.width / 2 - this.raceToZeroTxt.width / 2
                                     + 10, this.raceToZeroLogo.y + 200);
    this.captainPlanTxt.position.set(this.captainPlanLogo.x + this.captainPlanLogo.width / 2 - this.captainPlanTxt.width / 2
                                     + 15, this.captainPlanLogo.y + 200);

    //Add to scene
    this.scene.addChild(this.bg);
    this.scene.addChild(this.gamesTxt);
    this.scene.addChild(this.foodFallTxt);
    this.scene.addChild(this.raceToZeroTxt);
    this.scene.addChild(this.captainPlanTxt);
    this.scene.addChild(this.shadows);
    this.scene.addChild(this.foodFallLogo);
    this.scene.addChild(this.raceToZeroLogo);
    this.scene.addChild(this.captainPlanLogo);
    this.scene.addChild(this.mainMenuButton);




    // Update function
    this.update = () => {};
}


Affiliate.open = () => {

    if(Affiliate.instance == null) {
        Affiliate.instance = new Affiliate();
    }

    SCENE = Affiliate.instance.scene;
    STATE = Affiliate.instance.update;
}