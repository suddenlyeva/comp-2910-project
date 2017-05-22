"use strict";

function Credits() {
    // Define and style text
    let txtThankYou = new PIXI.Text("thank you for playing!", {
        fontFamily: FONT_FAMILY, fontSize: 128, fill: 0x00ad5e,
        dropShadow: true, dropShadowAngle: 7 * Math.PI / 12, dropShadowDistance: 10,
        stroke: 0xFFFFFF, strokeThickness: 7
    });

    txtThankYou.anchor.set(0.5);

    let txtTeam19 = new PIXI.Text("by team19", {
        fontFamily: FONT_FAMILY, fontSize: 64, fill: 0x333333
    });

    // Position text
    // note no padding between lines
    txtThankYou.position.set(CANVAS_WIDTH / 2, CANVAS_HEIGHT - 500);
    txtTeam19.position.set(CANVAS_WIDTH - txtTeam19.width - 10,
        CANVAS_HEIGHT - txtTeam19.height - 10);

    /* Creates a transparent area that covers the canvas in which if the user clicks
     * anywhere on the canvas other than the button they will be sent to the main menu */
    let clickableArea = new PIXI.Graphics();
    clickableArea.beginFill(0, 0);
    clickableArea.drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    clickableArea.endFill();
    clickableArea.interactive = true;
    clickableArea.pointertap  = StageSelect.open;

    // Create button to affiliate page
    let affiliateButton = makeSimpleButton(300, 100, "more games", 0xFFFF66, 100); // -> util.js

    // Position the button
    affiliateButton.position.set((CANVAS_WIDTH / 2) - 170, (CANVAS_HEIGHT / 2) + 200);

    // Opens affiliate page when the button is pressed or clicked
    affiliateButton.on("pointertap", () => {
        PlaySound(eSFXList.ButtonClick, false); // -> sfx.js
        PlaySound(eSFXList.MenuOpen, false);    // -> sfx.js

        Affiliate.open(); // -> states/affiliate.js
    });

    // Add to scene
    this.scene = new PIXI.Container();

    this.scene.addChild(txtThankYou);
    this.scene.addChild(txtTeam19);
    this.scene.addChild(clickableArea);
    this.scene.addChild(affiliateButton);

    txtThankYou.alpha = 0;

    let appearSpeed = 0.02;
    // let flashFreq = 0.03; // why is this here?
    // let counter = 0;

    // Update function to be called by the main game loop
    this.update = () => {
        if(txtThankYou.alpha < 1) {
            txtThankYou.alpha += appearSpeed;
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
