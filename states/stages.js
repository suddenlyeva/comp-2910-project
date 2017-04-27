"use strict";

let STAGES = [setupStage0, setupStage1, setupStage2, setupStage3, setupStage4];
let currentStage = 0;

function setupStage0() {
    game.backgroundColor = 0x000000;
    currentStage = 0;
    console.log("stage 0");
    game.state = stage0;
}

function stage0() {
}

function setupStage1() {
    game.backgroundColor = 0x000000;
    currentStage = 1;
    console.log("stage 1");
    game.state = stage1;
}

function stage1() {
}

function setupStage2() {
    game.backgroundColor = 0x000000;
    currentStage = 2;
    console.log("stage 2");
    game.state = stage2;
}

function stage2() {
}

function setupStage3() {
    game.backgroundColor = 0x000000;
    currentStage = 3;
    console.log("stage 3");
    game.state = stage3;
}

function stage3() {
}

function setupStage4() {
    game.backgroundColor = 0x000000;
    currentStage = 4;
    console.log("stage 4");
    game.state = stage4;
}

function stage4() {
}

function nextStage() {
    currentStage = currentStage === STAGES.length - 1 ? 0 : currentStage + 1;
}
