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
    this.txtThankYou.position.set(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 500);
    this.txtTeam19.position.set(CANVAS_WIDTH - this.txtTeam19.width - 10,
        CANVAS_HEIGHT - this.txtTeam19.height - 10);

    /* Creates a transparent area that covers the canvas in which if the user clicks
     * anywhere on the canvas other than the button they will be sent to the main menu */
    this.clickableArea = new PIXI.Graphics();
    this.clickableArea.beginFill(0);
    this.clickableArea.drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    this.clickableArea.endFill();
    this.clickableArea.interactive = true;
    this.clickableArea.alpha = 0;
    this.clickableArea.pointertap = StageSelect.open;

    // Create button to affiliate page

    this.affiliateButton = makeSimpleButton(300, 100, "more games", 0xFFFF66, 100); // -> util.js

    // Position the button

    this.affiliateButton.position.set((CANVAS_WIDTH / 2) - 170, (CANVAS_HEIGHT / 2) + 200);

    // Opens affiliate page when the button is pressed or clicked

    this.affiliateButton.on("pointertap", () => {
        PlaySound(eSFXList.ButtonClick, false); // -> sfx.js
        PlaySound(eSFXList.MenuOpen, false);    // -> sfx.js
        
        Affiliate.open(); // -> states/affiliate.js
    });

    // Add to scene
    this.scene.addChild(this.txtThankYou);
    this.scene.addChild(this.txtTeam19);
    this.scene.addChild(this.clickableArea);
    this.scene.addChild(this.affiliateButton);

    this.txtThankYou.alpha = 0;

    this.appearSpeed = 0.02;
    this.flashFreq = 0.03;
    this.counter = 0;

    // Update function to be called by the main game loop
    this.update = () => {
        if(this.txtThankYou.alpha < 1) {
            this.txtThankYou.alpha += this.appearSpeed;
        }
    };
}

// Function to open. Credits page is singleton
Credits.open = () => {

    if(Credits.instance == null) {
        Credits.instance = new Credits();
    }

    SCENE = Credits.instance.scene;
    STATE = Credits.instance.update;
};
