"use strict";

// Array of all the sound effects
let SFX_MASTER = [];

// Default volume
let SFX_VOLUME = 1.0;

/* This list allows us to change the file names of the audio
* without changing it in the rest of the code*/
let eSFXList = {
    MenuOpen : "sounds/menu-open.wav",
    ButtonClick: "sounds/button-click.wav",
    ItemPickUp: "sounds/item-pickup.wav",
    Splat: "sounds/splat.wav",
    Processing : "sounds/processing.ogg",
    ClockTicking : "sounds/ticking.wav",
    IntoProcessor: "sounds/into-processor.wav",
    RecipeComplete: "sounds/recipe-complete.wav",
    IntoConveyor: "sounds/into-conveyor.wav",
    ItemDropped: "sounds/item-dropped.wav",
    Error: "sounds/error.wav",
    PPAP: "sounds/ppap.wav"

};

// Loads the sound effects
sounds.load([
    eSFXList.MenuOpen,
    eSFXList.ButtonClick,
    eSFXList.ItemPickUp,
    eSFXList.Splat,
    eSFXList.Processing,
    eSFXList.ClockTicking,
    eSFXList.IntoProcessor,
    eSFXList.RecipeComplete,
    eSFXList.IntoConveyor,
    eSFXList.ItemDropped,
    eSFXList.Error,
    eSFXList.PPAP
]);

// Adds the sounds to SFX master to allow volume control of sfx
sounds.whenLoaded = () => {
    for(let i in eSFXList) {
        SFX_MASTER.push(sounds[eSFXList[i]]);
    }
};

function PlaySound(sfx, isLooping) {
    sounds[sfx].loop = isLooping;
    sounds[sfx].play();
}

function StopSound(sfx) {
    sounds[sfx].playFrom(0);    // Resets the player back to time 0
    sounds[sfx].pause();        // Pauses it right after reseting playbar
    sounds[sfx].loop = false;   // In case if flag is true
}




