"use strict";

function ConveyorBelt(items, speed) {

    // Define Constants
    let SCENE_HEIGHT_PX = 480;
    let SCENE_WIDTH_PX = 640;
    let SPRITE_SIZE_PX = 32;
    let SPRITE_HALF_PX = SPRITE_SIZE_PX/2;
    let ARRAY_MIN_SIZE = 20;

    // Define Properties
    this.items = [];
    this.speed = speed;
    this.deltaX = 0;
    
    this.lastIndex = items.length - 1;
    if (this.lastIndex < ARRAY_MIN_SIZE) {
        this.lastIndex = ARRAY_MIN_SIZE;
    }
    
    // Define Behaviours
    this.update = () => {

        // Move belt forwards
        for (let i in this.items) {
            this.items[i].x += this.speed;
        }

        // Track change in X
        this.deltaX += speed;

        // When last item reaches trash can:
        if(this.deltaX >= SPRITE_SIZE_PX) {

            // Remove first item
            // TODO: replace with waste()
            stageScene.removeChild(this.items[0]);

            // Shift Indices
            this.items.shift();

            // Add a blank to the end
            this.addItemAtIndex(makeTestBlank(), this.lastIndex);

            // Reset Delta
            this.deltaX = 0;
        }
        
        // TODO: Needs ingredient hookup
        // Check for items removed from array
        // Check for items placed into array
    }

    // Adds an item to the array
    this.addItemAtIndex = (item, index) => {

        // Position
        // At bottom of screen
        item.y = SCENE_HEIGHT_PX - SPRITE_HALF_PX;

        // Normalize to near bottom right corner
        item.x = SCENE_WIDTH_PX - SPRITE_SIZE_PX - SPRITE_HALF_PX;

        // Shift left by index
        item.x -= SPRITE_SIZE_PX * index;

        // Copy in
        this.items[index] = item;
    }
    
    // Returns an index based on an X position
    this.getIndexFromX = (x) => {
        console.log(x);
        return Math.floor((SCENE_WIDTH_PX + this.deltaX - x) / SPRITE_SIZE_PX) - 1;
    }

    
    // Finish Constructor

    // Populate array
    for(let i in items) {
        this.addItemAtIndex(items[i], i);
    }

    // Fill empty array spots
    for(let i = this.items.length; i <= ARRAY_MIN_SIZE; i++) {
        this.addItemAtIndex(makeTestBlank(), i);
    }
}

// ------------------------------- //
// -          Test Code          - //
// ------------------------------- //

function makeTestApple() {
    let apple = new PIXI.Sprite(
        PIXI.loader.resources["images/spritesheet.json"].textures["apple.png"]
    );
    apple.anchor.set(0.5);
    stageScene.addChild(apple);
    return apple;
}

function makeTestBlank() {
    let blank = new PIXI.Sprite(
        PIXI.loader.resources["images/spritesheet.json"].textures["testblank.png"]
    );
    blank.anchor.set(0.5);
    stageScene.addChild(blank);
    blank.alpha = 0.1;
    return blank;
}

function setupConveyorTest() {

    stageInit();

    let apples = [];
    let BELT_SPEED = 1;

    for (let i = 0; i < 6; i++) {
        apples.push(makeTestApple());
        apples.push(makeTestBlank());
    }

    let conveyorBelt = new ConveyorBelt(apples, BELT_SPEED);

    SCENE = stageScene;
    STATE = conveyorBelt.update;
}

