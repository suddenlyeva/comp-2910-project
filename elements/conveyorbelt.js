"use strict";

function ConveyorBelt(itemTypes, speed, level) {

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

            // Waste first item if not a blank
            if (this.items[0].type != BLANK) {
                this.items[0].waste();
            }
            // Otherwise just remove from stage entirely.
            else {
                level.scene.removeChild(this.items[0]);
            }

            // Shift Indices
            this.items.shift();

            // Reset Delta
            this.deltaX -= SPRITE_SIZE_PX;
            
            // Add a blank to the end
            this.addItemAtIndex(makeItem(BLANK, level), this.lastIndex);
        }
    }

    // Adds an item to the array
    this.addItemAtIndex = (item, index) => {
        
        // Remove previous blank
        if(this.items[index] != null && this.items[index].type == BLANK) {
            level.scene.removeChild(this.items[index]);
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
        return this.items[this.getIndexFromX(x)];
    }
    
    // Adds an item based on an x position
    this.addItemAtX = (item, x) => {
        this.addItemAtIndex(item, this.getIndexFromX(x));
    }
    
    // Point Collision
    this.collidesWithPoint = (x,y) => {
        return (0 < x && x < SCENE_WIDTH_PX - SPRITE_SIZE_PX) && (SCENE_HEIGHT_PX - SPRITE_SIZE_PX < y && y < SCENE_HEIGHT_PX);
    }
    
    // Finish Constructor

    // Pad array
    for(let i = 0; i < ARRAY_MIN_SIZE; i++) {
        this.addItemAtIndex(makeItem(BLANK, level), i);
    }
    
    // Fill out rest of conveyor
    for(let i = 0; i < itemTypes.length; i++) {
        this.addItemAtIndex(makeItem(itemTypes[i], level), i + ARRAY_MIN_SIZE);
    }
}