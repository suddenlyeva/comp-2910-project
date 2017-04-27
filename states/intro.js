"use strict";

let introCounter = 0;
function intro() {
    introCounter++;
    if(introCounter === 120) {
        game.backgroundColor = 0x00aa00;
        game.state = openMainMenu;
    }
}
