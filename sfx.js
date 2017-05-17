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
    IntoProcessor : "sounds/into-processor.wav"
};

// Loads the sound effects
sounds.load([
    eSFXList.MenuOpen,
    eSFXList.ButtonClick,
    eSFXList.ItemPickUp,
    eSFXList.Splat,
    eSFXList.Processing,
    eSFXList.ClockTicking,
    eSFXList.IntoProcessor
]);

// Adds the sounds to SFX master to allow volume control of sfx
sounds.whenLoaded = () => {
    console.log("test");
    SFX_MASTER.push(sounds[eSFXList.MenuOpen]);
    SFX_MASTER.push(sounds[eSFXList.ButtonClick]);
    SFX_MASTER.push(sounds[eSFXList.ItemPickUp]);
    SFX_MASTER.push(sounds[eSFXList.Splat]);
    SFX_MASTER.push(sounds[eSFXList.Processing]);
    SFX_MASTER.push(sounds[eSFXList.ClockTicking]);
    SFX_MASTER.push(sounds[eSFXList.IntoProcessor]);
};

function PlaySound(sfx, isLooping) {
    sounds[sfx].loop = isLooping;
    sounds[sfx].play();
};

function StopSound(sfx) {
    sounds[sfx].playFrom(0);    // Resets the player back to time 0
    sounds[sfx].pause();        // Pauses it right after reseting playbar
    sounds[sfx].loop = false;   // In case if it is flagged as looping
};






