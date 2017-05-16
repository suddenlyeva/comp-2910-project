"use strict";

// Options menu overlayable
function OptionsMenu() {

    // Scale proportions
    this.width  = CANVAS_WIDTH  / 1.5;
    this.height = CANVAS_HEIGHT / 1.5;

    // Create Scene
    this.scene = new PIXI.Container();

    // Make Panel and Buttons
    this.panel = new PIXI.Graphics();
    this.panel.lineStyle(1, 0, 1);
    this.panel.beginFill(0xfff3ad);
    this.panel.drawRect(0, 0, this.width, this.height);
    this.panel.endFill();
    this.okButton = makeSimpleButton(150, 90, "ok", 0xf00e46, 120); // -> util.js

    this.txtStyle = new PIXI.TextStyle({
        fontFamily: FONT_FAMILY, fontSize: 200, fill: 0x0
    });
    this.soundTxt = new PIXI.Text("sound", this.txtStyle);
    this.soundVol = makeSlider(this.panel.width - 400, 100); // -> util.js
    this.musicTxt = new PIXI.Text("music", this.txtStyle);
    this.musicVol = makeSlider(this.soundVol.width, this.soundVol.height); // -> util.js

    this.panel.interactive = true;

    // Add to scene
    this.scene.addChild(this.panel);
    this.scene.addChild(this.okButton);
    this.scene.addChild(this.soundTxt);
    this.scene.addChild(this.soundVol);
    this.scene.addChild(this.musicTxt);
    this.scene.addChild(this.musicVol);

    // Position everything
    this.okButton.position.set(
        this.width / 2 - this.okButton.width / 2, this.height - this.okButton.height - 20);
    this.soundVol.position.set(
        this.width / 2.7, this.height / 4 - this.musicVol.height / 2);
    this.soundTxt.position.set(
        this.soundVol.x - 250, this.height / 4 - this.soundTxt.height / 2);
    this.musicVol.position.set(
        this.soundVol.x, this.height / 1.8 - this.musicVol.height / 2);
    this.musicTxt.position.set(this.soundTxt.x, this.height / 1.8 - this.soundTxt.height / 2);
    this.scene.position.set(
        CANVAS_WIDTH  / 2 - this.width  / 2,
        CANVAS_HEIGHT / 2 - this.height / 2
    );

    // Back button moves to main menu
    // bind(this) is used to give the function context (which is the current object)
    this.okButton.on("pointertap", () => {
        sounds["sounds/button-click.wav"].play();
        OptionsMenu.close();
    });

    this.soundVol.onSliderAdjust = () => {

      for (let i in SFX_MASTER) {
          SFX_MASTER[i].volume = this.soundVol.value;
      }
    };
}

// Function to open. Options Menu is singleton
OptionsMenu.open = () => {
    if(OptionsMenu.instance == null) {
        OptionsMenu.instance = new OptionsMenu();
    }

    // console.log(SCENE.children.length);
    // only adds one options menu no matter how many times it's called
    SCENE.addChild(OptionsMenu.instance.scene);
};

// Close function removes itself from the scene
OptionsMenu.close = () => {
    if(OptionsMenu.instance != null && OptionsMenu.instance.scene.parent != null) {
        OptionsMenu.instance.scene.parent.removeChild(OptionsMenu.instance.scene);
    }
};
