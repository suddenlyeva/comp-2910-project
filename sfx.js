"use strict";

// Array of all the sound effects
let SFX_MASTER = [];

// Array of all the bgm
let MUSIC_MASTER = [];

// Default volume
let SFX_VOLUME = 0.5;

let MUSIC_VOLUME = 0.5;

/* This list allows us to change the file names of the sfx audio
* without changing it in the rest of the code*/
let eSFXList = {
    MenuOpen       : "sounds/menu-open.mp3",
    ButtonClick    : "sounds/button-click.mp3",
    ItemPickUp     : "sounds/item-pickup.mp3",
    Splat          : "sounds/splat.mp3",
    Processing     : "sounds/processing.mp3",
    ClockTicking   : "sounds/ticking.mp3",
    IntoProcessor  : "sounds/into-processor.mp3",
    RecipeComplete : "sounds/recipe-complete.mp3",
    IntoConveyor   : "sounds/into-conveyor.mp3",
    ItemDropped    : "sounds/item-dropped.mp3",
    Error          : "sounds/error.mp3",
    StageComplete  : "sounds/stage-complete.mp3",
    GameOver       : "sounds/game-over.mp3"
};


/* This list allows us to change the file names of the music
 * without changing it in the rest of the code*/
let eMusicList = {
    Music          : "sounds/music.mp3",
    PPAP           : "sounds/ppap.mp3"
};

// Loads the sound effects
function loadSounds() {
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
        eSFXList.StageComplete,
        eSFXList.GameOver,
        eMusicList.PPAP,
        eMusicList.Music
    ]);
}

// Adds the sounds to SFX master to allow volume control of sfx
sounds.whenLoaded = () => {
    for(let i in eSFXList) {
        SFX_MASTER.push(sounds[eSFXList[i]]);
    }
    for(let i in eMusicList) {
        MUSIC_MASTER.push(sounds[eMusicList[i]]);
    }
    updateVolumeMaster();
    setup(); // -> main.js
};

// Update loading bar on sound load
sounds.onProgress = (percentage) => {
    // Other half of loading bar is in main.js
    loadingProgressBar.xScale(percentage / 200 + 0.5); // -> util.js

    // vv Required vv

    // Resize loading screen
    sceneResize(STRETCH_THRESHOLD);
    RENDERER.resize(CANVAS_WIDTH * SCENE.scale.x, CANVAS_HEIGHT * SCENE.scale.y);

    // Draw loading screen
    RENDERER.render(SCENE);
};

// function PlaySound(sfx, isLooping) {
    // sounds[sfx].loop = isLooping;
    // sounds[sfx].play();
// }

// function StopSound(sfx) {
    // sounds[sfx].playFrom(0);    // Resets the player back to time 0
    // sounds[sfx].pause();        // Pauses it right after reseting playbar
    // sounds[sfx].loop = false;   // In case if flag is true
// }

// Custom Play Sound call
function PlaySound(sfx, isLooping) {

    sounds[sfx].loop = isLooping;

    // Simulate a stack for looping sounds so that they pause and resume comfortably.
    if(isLooping) {
        if (sounds[sfx].nPlaying == null) {
            sounds[sfx].nPlaying = 1;
        }
        else {
            sounds[sfx].nPlaying++;
        }
        sounds[sfx].restart();
        sounds[sfx].resume = null; // Hacky way of rebuilding a full sound stack.
    }
    else {
        sounds[sfx].play();
    }
}

// Resuming loops neeeds to be slightly different from the normal PlaySound to properly rebuild the stack.
function ResumeSoundLoop(sfx) {
    if(sounds[sfx].loop && sounds[sfx].resume) {
        sounds[sfx].nPlaying = sounds[sfx].resume;
        sounds[sfx].resume = null; // Only resume if previously fullStopped.
        sounds[sfx].play();
    }
}

// function StopSound(sfx) {
    // if(sounds[sfx].loop) {
        // sounds[sfx].nPlaying--;
        // if (sounds[sfx].nPlaying < 1) {
            // sounds[sfx].pause();
        // }
    // }
    // else {
        // sounds[sfx].pause();        // Pauses it right after reseting playbar
    // }
 // }


 // Custom pause function to fix some looping issues.
function StopSound(sfx, isFullStop) {

    // When a sound loops, you can choose to pop one "sound" off the stack or stop the whole stack.
    if(sounds[sfx].loop) {
        if(isFullStop) {
            sounds[sfx].resume = sounds[sfx].nPlaying; // When you stop the whole stack, you have the option to resume the whole thing.
            sounds[sfx].nPlaying = 0;
        }
        if (sounds[sfx].nPlaying > 0) {
            sounds[sfx].nPlaying--;
        }
        if (sounds[sfx].nPlaying < 1) {
            sounds[sfx].pause();
        }
    }
    else {
        sounds[sfx].pause();
    }
}

// Enforces the sound volume to match the variables.
function updateVolumeMaster() {
    for (let i in SFX_MASTER) {
      SFX_MASTER[i].volume = SFX_VOLUME;
    }
    for(let i in MUSIC_MASTER) {
        MUSIC_MASTER[i].volume = MUSIC_VOLUME;
    }
}

// Currently deprecated
function VolSetSound(level) {
    for(let i in eSFXList) {

        if(level < sounds[eSFXList[i]].volume && eSFXList[i] != eSFXList.ClockTicking)
            sounds[eSFXList[i]].fadeOut(0.1);
        else if (eSFXList[i] != eSFXList.ClockTicking)
            sounds[eSFXList[i]].fadeIn(0.5);

        sounds[eSFXList[i]].volume = level;
    }
}

// Currently deprecated
function ResetSound() {

    //Resets the Tick
    VolSetSound(SFX_VOLUME);

    StopSound(eSFXList.ClockTicking, true); // Explicitly Forced
}



