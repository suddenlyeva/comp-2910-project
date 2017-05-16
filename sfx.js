"use strict";

// Loads the sound effects
sounds.load([
    "sounds/collect_coin_03.wav",
    "sounds/collect_item_13.wav"
]);

// Assign callback funtion that should run when the sounds are loaded
sounds.whenLoaded = setupSounds;

// Intialize sounds

let buttonClickSFX;
let itemPickUpSFX;
let itemDroppedSFX;
let itemWastedSFX;
let recipesComplete;


function setupSounds() {
    
    buttonClickSFX = sounds["sounds/collect_coin_03.wav"];
    itemPickUpSFX = sounds["sounds/collect_item_13.wav"];
}



