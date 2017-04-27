var canvasWidth = 800,
    canvasHeight = 600;
var thingsToLoad = [
    "spritesheet.json",
    "images/play_button.png",
    "images/options_button.png",
];
var game = hexi(canvasWidth, canvasHeight, setup, thingsToLoad, load);
game.start();

function load() {
}

function setup() {
    game.backgroundColor = 0xaa0000;
    game.state = intro;
}
