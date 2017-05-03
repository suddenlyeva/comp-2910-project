"use strict";

function ConveyorBelt(itemTypes, speed) {

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
    
    this.lastIndex = itemTypes.length + ARRAY_MIN_SIZE - 1;
    
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
            this.items[0].waste();

            // Shift Indices
            this.items.shift();

            // Reset Delta
            this.deltaX -= SPRITE_SIZE_PX;
            
            // Add a blank to the end
            this.addItemAtIndex(makeItem(BLANK), this.lastIndex);
        }
    }

    // Adds an item to the array
    this.addItemAtIndex = (item, index) => {
        
        // Remove previous blank
        if(this.items[index] != null && this.items[index].type == BLANK) {
            stageScene.removeChild(this.items[index]);
        }

        // Position
        // At bottom of screen
        item.y = SCENE_HEIGHT_PX - SPRITE_HALF_PX;

        // Normalize to near bottom right corner
        item.x = SCENE_WIDTH_PX + this.deltaX - SPRITE_SIZE_PX - SPRITE_HALF_PX;

        // Shift left by index
        item.x -= SPRITE_SIZE_PX * index;

        // Copy in
        this.items[index] = item;
    }
    
    // Returns an index based on an X position
    this.getIndexFromX = (x) => {
        return Math.floor((SCENE_WIDTH_PX + this.deltaX - x) / SPRITE_SIZE_PX) - 1;
    }
    
    // Returns an item based on index
    this.getItemAtX = (x) => {
        return this.items[getIndexFromX(x)];
    }
    
    // Adds an item based on an x position
    this.addItemAtX = (x) => {
        this.addItemAtIndex(this.getIndexFromX(x));
    }
    
    // Finish Constructor

    // Pad array
    for(let i = 0; i < ARRAY_MIN_SIZE; i++) {
        this.addItemAtIndex(makeItem(BLANK), i);
        
    }
    
    // Fill out rest of conveyor
    for(let i = 0; i < itemTypes.length; i++) {
        this.addItemAtIndex(makeItem(itemTypes[i]), i + ARRAY_MIN_SIZE);
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
    blank.isBlank = true;
    blank.anchor.set(0.5);
    stageScene.addChild(blank);
    blank.alpha = 0.1;
    return blank;
}

function setupConveyorTest() {

    stageInit();

    let apples = [];
    let BELT_SPEED = 1.3;

    for (let i = 0; i < 6; i++) {
        apples.push(makeTestApple());
        apples.push(makeTestBlank());
    }

    let conveyorBelt = new ConveyorBelt(apples, BELT_SPEED);

    SCENE = stageScene;
    STATE = conveyorBelt.update;
}

