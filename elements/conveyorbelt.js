"use strict";

function ConveyorBelt(items, speed) {
    
    // Define Constants
    let SCENE_HEIGHT_PX = 480;
    let SCENE_WIDTH_PX = 640;
    let SPRITE_SIZE_PX = 32;
    let CONVEYOR_END = items.length - 1;
    
    
    // Define Properties
    this.items = [];
    this.speed = speed;
    this.deltaX = 0;
    
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
            stageScene.removeChild(this.items[0]);
            
            // Shift Indices
            this.items.shift();
            
            // Add a blank to the end
            this.addItemAtIndex(makeTestBlank(), CONVEYOR_END);
            
            // Reset Delta
            this.deltaX = 0;
        }
    
        // Check for items removed from array
        // Check for items placed into array
    }
    
    // Adds an item to the array
    this.addItemAtIndex = (item, index) => {
        
        // Position
        // At bottom of screen
        item.y = SCENE_HEIGHT_PX - SPRITE_SIZE_PX;
        
        // Normalize to near bottom right corner
        item.x = SCENE_WIDTH_PX - SPRITE_SIZE_PX * 2;
        
        // Shift left by index
        item.x -= SPRITE_SIZE_PX * index;
        
        // Copy in
        this.items[index] = item;
    }
    
    // Finish Constructor
    
    // Populate array
    for(let i in items) {
        this.addItemAtIndex(items[i], i);
    }
    
}

function makeTestApple() {
    let apple = new PIXI.Sprite(
        PIXI.loader.resources["images/spritesheet.json"].textures["apple.png"]
    );
    stageScene.addChild(apple);
    return apple;
}

function makeTestBlank() {
    let blank = new PIXI.Sprite(
        PIXI.loader.resources["images/spritesheet.json"].textures["testblank.png"]
    );
    stageScene.addChild(blank);
    blank.alpha = 0.2;
    return blank;
}
