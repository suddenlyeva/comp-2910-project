var canvasWidth = 800,
    canvasHeight = 600;
var thingsToLoad = ["spritesheet.json"];
var game = hexi(canvasWidth, canvasHeight, setup, thingsToLoad, load);
game.start();
var counter = 0;

function load() {
}

function setup() {
    game.state = intro;
}

// States
function mainMenu() {
}

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
