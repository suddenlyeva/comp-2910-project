"use strict";

function OptionsMenu() {
    this.width = 200;
    this.height = 400;

    this.scene = new PIXI.Container();

    // Make Panel and Buttons
    this.panel = new PIXI.Graphics();
    this.panel.lineStyle(1, 0, 1);
    this.panel.beginFill(0xcecfe2);
    this.panel.drawRect(0, 0, this.width, this.height);
    this.panel.endFill();
    this.closeButton = makeSimpleButton(30, 30, "X", 0xf00e46);

    // Add to scene
    this.scene.addChild(this.panel);
    this.scene.addChild(this.closeButton);

    this.closeButton.position.set(10, 10);
    this.scene.position.set(
        RENDERER.width / 2 - this.width / 2,
        RENDERER.height / 2 - this.height / 2
    );

    // Back button moves to main menu
    // bind(this) is used to give the function context (which is the current object)
    this.closeButton.on("pointertap", function() { this.close() }.bind(this)); 

    this.close = function() {
        if(this.scene.parent != null) {
            this.scene.parent.removeChild(this.scene);
        }
    };
}

let optionsMenuScene;

function openOptionsMenu() {
    if(optionsMenuScene == null) {
        optionsMenuScene = new OptionsMenu();
    }

    // console.log(SCENE.children.length);
    // only adds one options menu no matter how many times it's called
    SCENE.addChild(optionsMenuScene.scene);
}

function closeOptionsMenu() {
    if(optionsMenuScene != null) {
        optionsMenuScene.close();
    }
}
