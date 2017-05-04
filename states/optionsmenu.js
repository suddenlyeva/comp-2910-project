"use strict";

function OptionsMenu() {
    this.width = CANVAS_WIDTH / 1.5;
    this.height = CANVAS_HEIGHT / 1.5;

    this.scene = new PIXI.Container();

    // Make Panel and Buttons
    this.panel = new PIXI.Graphics();
    this.panel.lineStyle(1, 0, 1);
    this.panel.beginFill(0xcecfe2);
    this.panel.drawRect(0, 0, this.width, this.height);
    this.panel.endFill();
    this.closeButton = makeSimpleButton(30, 30, "X", 0xf00e46);
    this.musicVol = makeSlider(this.panel.width - 100, 100, "music", 50);
    this.soundVol = makeSlider(this.panel.width - 100, 100, "sound", 50);

    this.panel.interactive = true;

    // Add to scene
    this.scene.addChild(this.panel);
    this.scene.addChild(this.closeButton);
    this.scene.addChild(this.soundVol);
    this.scene.addChild(this.musicVol);

    this.closeButton.position.set(
        this.panel.width - this.closeButton.width - 10, 10);
    this.soundVol.position.set(
        50, this.height / 3 - this.musicVol.height / 2);
    this.musicVol.position.set(
        50, 2 * this.height / 3 - this.musicVol.height / 2);
    this.scene.position.set(
        CANVAS_WIDTH / 2 - this.width / 2,
        CANVAS_HEIGHT / 2 - this.height / 2
    );

    // Back button moves to main menu
    // bind(this) is used to give the function context (which is the current object)
    this.closeButton.on("pointertap", OptionsMenu.close); 
}

OptionsMenu.open = () => {
    if(OptionsMenu.instance == null) {
        OptionsMenu.instance = new OptionsMenu();
    }

    // console.log(SCENE.children.length);
    // only adds one options menu no matter how many times it's called
    SCENE.addChild(OptionsMenu.instance.scene);
};

OptionsMenu.close = () => {
    if(OptionsMenu.instance != null && OptionsMenu.instance.scene.parent != null) {
        OptionsMenu.instance.scene.parent.removeChild(OptionsMenu.instance.scene);
    }
};
