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

// States
function optionsMenu() {
}

function stageSelect() {
}

function stage1() {
}

function stage2() {
}

function stage3() {
}

function stage4() {
}

function stage5() {
}

function nextStage() {
}

function pauseMenu() {
}

function stageComplete() {
}
