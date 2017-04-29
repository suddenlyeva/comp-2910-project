"use strict";

let introScene;

function openIntro() {
    
    if(introScene == null) {
        introScene = game.group();
    }
    
    introScene.frames = 0;
    game.backgroundColor = 0xaa0000;
    game.state = intro;
}

function intro() {
    introScene.frames++;
    if(introScene.frames === 120) {
        game.state = openMainMenu;
    }
};
