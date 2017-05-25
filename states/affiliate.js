"use strict";
/*Affiliate Page with the list of affiliates and logos acting as the
links to the pages
*/

function Affiliate() {

    let foodFallUrl    = "http://foodfall.ca/";
    let captainPlanUrl = "http://ec2-34-223-205-71.us-west-2.compute.amazonaws.com/Captain-Plan-It/index.php";
    let raceToZeroUrl  = "http://racetozero.byethost12.com/";

    //-------- Text Style -------------------------

    // Text style for the title
    let textStyleTitle = new PIXI.TextStyle({
        fontFamily: FONT_FAMILY, fontSize: 140, fill: 0x00ad5e,
        dropShadow: true, dropShadowAngle: 7 * Math.PI / 12, dropShadowDistance: 7, dropShadowAlpha: 0.7,
        stroke: 0xFFFFFF, strokeThickness: 7
    });

    // Text style for the affiliate name
    let textStyleAffiliateName             = textStyleTitle.clone();
    textStyleAffiliateName.fontSize        = 100;
    textStyleAffiliateName.strokeThickness = 4;

    // ------------- Food Fall ----------------------------------

    // Create logo
    let foodFallLogo = new PIXI.Sprite(PIXI.loader.resources["images/spritesheet.json"].textures["foodfalllogo.jpg"]);

    // Set the logo to be interactive as a button
    foodFallLogo.interactive = foodFallLogo.buttonMode = true;

    // Set the position of the logo
    foodFallLogo.position.set(100, 200);

    // When logo is clicked send user to affiliates page
    foodFallLogo.pointertap = () => {
        PlaySound(eSFXList.ButtonClick, false); // -> sfx.js

        window.parent.location.href = foodFallUrl;
    };

    //--------------- Race to Zero ----------------------------

    // Create logo
    let raceToZeroLogo = new PIXI.Sprite(PIXI.loader.resources["images/spritesheet.json"].textures["racetozerologo.png"]);

    // Set logo to be interactive as a button
    raceToZeroLogo.interactive = raceToZeroLogo.buttonMode = true;

    // Set position of logo
    raceToZeroLogo.position.set((CANVAS_WIDTH / 2) - (raceToZeroLogo.width / 2), 200);

    // When logo is clicked send user to affiliate page
    raceToZeroLogo.pointertap = () => {
        PlaySound(eSFXList.ButtonClick, false); // -> sfx.js

        window.parent.location.href = raceToZeroUrl;
    };

    //----------------- Captain Plan-it ----------------------------

    // Make logo
    let captainPlanLogo = new PIXI.Sprite(PIXI.loader.resources["images/spritesheet.json"].textures["cp2.png"]);

    // Set logo as interactive as a button
    captainPlanLogo.interactive = captainPlanLogo.buttonMode = true;

    //Set position of logo
    captainPlanLogo.position.set(CANVAS_WIDTH - 300, 200);

    // When logo is clicked send user to affiliate page
    captainPlanLogo.pointertap = () => {
        PlaySound(eSFXList.ButtonClick, false); // -> sfx.js

        window.parent.location.href = captainPlanUrl;
    };

    // Main menu button
    let mainMenuButton = new PIXI.Sprite(PIXI.utils.TextureCache["menu-back.png"]);
    mainMenuButton.interactive = mainMenuButton.buttonMode = true;
    mainMenuButton.position.set((CANVAS_WIDTH - mainMenuButton.width) / 2, CANVAS_HEIGHT - mainMenuButton.height - 60);
    mainMenuButton.on("pointertap", () => {
        PlaySound(eSFXList.ButtonClick, false); // -> sfx.js

        StageSelect.open(); // -> states/stageselect.js
    });

    // Shadows for the affiliate logos
    let shadows = new PIXI.Graphics();
    shadows.beginFill(0, 0.7);
    shadows.drawRect(foodFallLogo.x + 7, foodFallLogo.y + 7, foodFallLogo.width, foodFallLogo.height);
    shadows.drawRect(raceToZeroLogo.x + 7, raceToZeroLogo.y + 7, raceToZeroLogo.width, raceToZeroLogo.height);
    shadows.drawRect(captainPlanLogo.x + 7, captainPlanLogo.y + 7, captainPlanLogo.width, captainPlanLogo.height);
    shadows.endFill();

    //--------------- Text ------------------------------------

    // Title page text
    let gamesTxt = new PIXI.Text("more games", textStyleTitle);
    gamesTxt.position.set((CANVAS_WIDTH - gamesTxt.width) / 2, 37);

    // Affiliate name texts
    let foodFallTxt    = new PIXI.Text("food fall", textStyleAffiliateName);
    let raceToZeroTxt  = new PIXI.Text("race to zero", textStyleAffiliateName);
    let captainPlanTxt = new PIXI.Text("captain plan-it", textStyleAffiliateName);

    // Position logo texts
    foodFallTxt.position.set(
        foodFallLogo.x + foodFallLogo.width / 2 - foodFallTxt.width / 2,
        foodFallLogo.y + 200);
    raceToZeroTxt.position.set(
        raceToZeroLogo.x + raceToZeroLogo.width / 2 - raceToZeroTxt.width / 2 + 10,
        raceToZeroLogo.y + 200);
    captainPlanTxt.position.set(
        captainPlanLogo.x + captainPlanLogo.width / 2 - captainPlanTxt.width / 2 + 15,
        captainPlanLogo.y + 200);

    // Background
    let background = new PIXI.Sprite(PIXI.utils.TextureCache["images/background-intro.png"]);

    // Add to scene
    this.scene = new PIXI.Container();
    this.scene.addChild(background);

    this.scene.addChild(gamesTxt);
    this.scene.addChild(foodFallTxt);
    this.scene.addChild(raceToZeroTxt);
    this.scene.addChild(captainPlanTxt);
    this.scene.addChild(shadows);
    this.scene.addChild(foodFallLogo);
    this.scene.addChild(raceToZeroLogo);
    this.scene.addChild(captainPlanLogo);
    this.scene.addChild(mainMenuButton);

    // Update function to be called by the main game loop
    this.update = () => {};
}

// Opens affiliate page used in credits and main menu pages
Affiliate.open = () => {
    if(Affiliate.instance == null) {
        Affiliate.instance = new Affiliate();
    }

    SCENE = Affiliate.instance.scene;
    STATE = Affiliate.instance.update;
};
