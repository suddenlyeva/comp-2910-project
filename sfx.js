"use strict";

// Array of all the sound effects
let SFX_MASTER = [];

// Default volume
let SFX_VOLUME = 1.0;

/* This list allows us to change the file names of the audio
* without changing it in other areas*/
let eSFXList = {
    MenuOpen : "sounds/menu-open.wav",
    ButtonClick: "sounds/button-click.wav",
    ItemPickUp: "sounds/item-pickup.wav",
    Splat: "sounds/splat.wav",
    Processing : "sounds/processing.ogg",
    ClockTicking : "sounds/ticking.wav",

};

// Loads the sound effects
sounds.load([
    eSFXList.MenuOpen,
    eSFXList.ButtonClick,
    eSFXList.ItemPickUp,
    eSFXList.Splat,
    eSFXList.Processing,
    eSFXList.ClockTicking
]);

// Adds the sounds to SFX master to allow volume control of sfx
sounds.whenLoaded = () => {
    SFX_MASTER.push(sounds[eSFXList.MenuOpen]);
    SFX_MASTER.push(sounds[eSFXList.ButtonClick]);
    SFX_MASTER.push(sounds[eSFXList.ItemPickUp]);
    SFX_MASTER.push(sounds[eSFXList.Splat]);
    SFX_MASTER.push(sounds[eSFXList.Processing]);
    SFX_MASTER.push(sounds[eSFXList.ClockTicking]);
};






