"use strict";

let SFX_MASTER = [];

// Loads the sound effects
sounds.load([
    "sounds/menu-open.wav",
    "sounds/button-click.wav",
    "sounds/item-pickup.wav",
    "sounds/splat.wav"

]);

sounds.whenLoaded = () => {
    SFX_MASTER.push(sounds["sounds/menu-open.wav"]);
    SFX_MASTER.push(sounds["sounds/button-click.wav"]);
    SFX_MASTER.push(sounds["sounds/item-pickup.wav"]);
    SFX_MASTER.push(sounds["sounds/splat.wav"]);
};







