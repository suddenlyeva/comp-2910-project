"use strict";

// Needs heavy refactoring

let STAGES = [setupStage0, setupStage1, setupStage2, setupStage3, setupStage4];
let currentStage = 0;
let stageTimer;

function setupStage0() {
    game.backgroundColor = 0x000000;
    currentStage = 0;
    console.log("stage 0");
    let background = game.sprite("background.png");
    stageTimer = 0;
    
    game.state = stage0;
}

function stage0() {
    stageTimer++;
    if (stageTimer === 120) {
        game.state = openStageComplete;
    }
}

function setupStage1() {
    game.backgroundColor = 0x330000;
    currentStage = 1;
    console.log("stage 1");
    let background = game.sprite("background.png");
    stageTimer = 0;
    game.state = stage1;
}

function stage1() {
    stageTimer++;
    if (stageTimer === 120) {
        game.state = openStageComplete;
    }
}

function setupStage2() {
    game.backgroundColor = 0x660000;
    currentStage = 2;
    console.log("stage 2");
    let background = game.sprite("background.png");
    stageTimer = 0;
    
    game.state = stage2;
}

function stage2() {
    stageTimer++;
    if (stageTimer === 120) {
        game.state = openStageComplete;
    }
}

function setupStage3() {
    game.backgroundColor = 0x990000;
    currentStage = 3;
    console.log("stage 3");
    let background = game.sprite("background.png");
    stageTimer = 0;
    
    game.state = stage3;
}

function stage3() {
    stageTimer++;
    if (stageTimer === 120) {
        game.state = openStageComplete;
    }
}

function setupStage4() {
    game.backgroundColor = 0xcc0000;
    currentStage = 4;
    console.log("stage 4");
    let background = game.sprite("background.png");
    stageTimer = 0;
    
    game.state = stage4;
}

function stage4() {
    stageTimer++;
    if (stageTimer === 120) {
        game.state = openStageComplete;
    }
}

function nextStage() {
    currentStage = currentStage === STAGES.length - 1 ? 0 : currentStage + 1;
}
