"use strict";

let introScene;

function openIntro() {

    if(introScene == null) {
        introScene = new PIXI.Container();
    }

    introScene.frames = 0;
    renderer.backgroundColor = 0xaa0000;
    SCENE = introScene;
    STATE = intro;
}

function intro() {
    introScene.frames++;
    if(introScene.frames === 120) {
        STATE = openMainMenu;
    }
};
