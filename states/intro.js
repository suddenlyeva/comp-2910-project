let introCounter = 0;

function intro() {
    introCounter++;
    if(introCounter === 60 * 1) {
        game.backgroundColor = 0x00aa00;
    }
    if(introCounter === 60 * 2) {
        game.state = openMainMenu;
    }
}
