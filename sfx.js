"use strict";

// Array of all the sound effects
let SFX_MASTER = [];

// Array of all the bgm
let MUSIC_MASTER = [];

// Default volume
let SFX_VOLUME = 1.0;

let MUSIC_VOLUME = 1.0;

/* This list allows us to change the file names of the sfx audio
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
    StageComplete: "sounds/stage-complete.wav",
    GameOver: "sounds/game-over.wav",
    PPAP: "sounds/ppap.wav"
};


/* This list allows us to change the file names of the music
 * without changing it in the rest of the code*/
let eMusicList = {
    Music: "sounds/music.wav"
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
    eSFXList.StageComplete,
    eSFXList.GameOver,
    eSFXList.PPAP,
    eMusicList.Music
]);

// Adds the sounds to SFX master to allow volume control of sfx
sounds.whenLoaded = () => {
    for(let i in eSFXList) {
        SFX_MASTER.push(sounds[eSFXList[i]]);
    }
    for(let i in eMusicList) {
        MUSIC_MASTER.push(sounds[eMusicList[i]]);
    }
    loadResources();
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

function PlaySound(sfx, isLooping) {
	
    sounds[sfx].loop = isLooping;
	
    if(isLooping) {
        if (sounds[sfx].nPlaying == null) {
            sounds[sfx].nPlaying = 1;
        }
        else {
            sounds[sfx].nPlaying++;
        }
        sounds[sfx].restart();
        sounds[sfx].resume = null;
    }
    else {
        sounds[sfx].play();
    }
}

function ResumeSoundLoop(sfx) {
    if(sounds[sfx].loop && sounds[sfx].resume) {
        sounds[sfx].nPlaying = sounds[sfx].resume;
        sounds[sfx].resume = null;
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

function StopSound(sfx, isFullStop) {
    if(sounds[sfx].loop) {
        if(isFullStop) {
            sounds[sfx].resume = sounds[sfx].nPlaying;
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
        sounds[sfx].pause();        // Pauses it right after reseting playbar
    }
}

function VolSetSound(level) {
	for(let i in eSFXList) {

	    if(level < sounds[eSFXList[i]].volume && eSFXList[i] != eSFXList.ClockTicking)
            sounds[eSFXList[i]].fadeOut(0.1);
	    else if (eSFXList[i] != eSFXList.ClockTicking)
            sounds[eSFXList[i]].fadeIn(0.5);

		sounds[eSFXList[i]].volume = level;
	}
}

function ResetSound() {
    
    //Resets the Tick
    VolSetSound(SFX_VOLUME); 
    
    StopSound(eSFXList.ClockTicking, true); // Explicitly Forced
}



