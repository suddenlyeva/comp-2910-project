"use strict";

// Options menu overlayable
function OptionsMenu() {

    // Scale proportions
    let width  = 10 * TILES_PX;
    let height = 6 * TILES_PX;

    // Make Panel and Buttons
    let panel = new PIXI.Graphics();
    panel.lineStyle(1, 0, 1);
    panel.beginFill(0xfff3ad);
    panel.drawRect(0, 0, width, height);
    panel.endFill();
    
    let okButton = new PIXI.Sprite(
            PIXI.loader.resources["images/spritesheet.json"].textures["menu-ok.png"]
    );
    okButton.interactive = okButton.buttonMode = true;
    
    let txtStyle = new PIXI.TextStyle({
        fontFamily: FONT_FAMILY, fontSize: 200, fill: 0x0
    });
    
    let soundTxt = new PIXI.Text("sound", txtStyle);
    let soundVol = makeSlider(SFX_VOLUME, panel.width - 400, 100); // -> util.js
    let musicTxt = new PIXI.Text("music", txtStyle);
    let musicVol = makeSlider(MUSIC_VOLUME, soundVol.width, soundVol.height); // -> util.js

    panel.interactive = true;

    // Add to scene
    this.scene = new PIXI.Container();
    this.scene.addChild(panel);
    this.scene.addChild(okButton);
    this.scene.addChild(soundTxt);
    this.scene.addChild(soundVol);
    this.scene.addChild(musicTxt);
    this.scene.addChild(musicVol);

    // Position everything
    okButton.position.set(
        width / 2 - okButton.width / 2, height - okButton.height - 20);
    soundVol.position.set(
        width / 2.7, height / 4 - musicVol.height / 2);
    soundTxt.position.set(
        soundVol.x - 250, height / 4 - soundTxt.height / 2);
    musicVol.position.set(
        soundVol.x, height / 1.8 - musicVol.height / 2);
    musicTxt.position.set(soundTxt.x, height / 1.8 - soundTxt.height / 2);
    this.scene.position.set(
        CANVAS_WIDTH  / 2 - width  / 2,
        CANVAS_HEIGHT / 2 - height / 2
    );

    // Back button moves to main menu
    // bind(this) is used to give the function context (which is the current object)
    okButton.on("pointertap", () => {
        PlaySound(eSFXList.ButtonClick, false); // -> sfx.js
        OptionsMenu.close();
    });

    // Adjusts the volume for all sfx based on slider position
    soundVol.onSliderAdjust = (value) => {
        SFX_VOLUME = value;
        updateVolumeMaster();
    };

    // Adjusts the volume of bgm music based on slider position
    musicVol.onSliderAdjust = (value) => {
        MUSIC_VOLUME = value;
        updateVolumeMaster();
    };

    this.scene.on("removed", () => {
        soundVol.cleanUp();
        musicVol.cleanUp();
    });
    
}

// Function to open. Options Menu is singleton
OptionsMenu.open = () => {
    if(OptionsMenu.instance == null) {
        OptionsMenu.instance = new OptionsMenu();
    }

    // Toggle switch
    OptionsMenu.instance.isOpen = true;

    // only adds one options menu no matter how many times it's called
    SCENE.addChild(OptionsMenu.instance.scene);
};

// Close function removes itself from the scene
OptionsMenu.close = () => {
    if(OptionsMenu.instance != null && OptionsMenu.instance.scene.parent != null) {
        OptionsMenu.instance.scene.parent.removeChild(OptionsMenu.instance.scene);
        OptionsMenu.instance.isOpen = false;
        saveOptions(); // -> progress.js
    }
};
