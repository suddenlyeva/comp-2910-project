"use strict";

function ConveyorBelt(itemTypes, speed, level) {

    // Define Constants
    let SPRITE_SIZE_PX = 64;
    let SPRITE_HALF_PX = SPRITE_SIZE_PX/2;
    let ARRAY_MIN_SIZE = 21;

    // Define Properties
    this.items = [];
    this.belt = new PIXI.Container();
    this.speed = speed;
    this.deltaX = 0;
    
    this.lastIndex = itemTypes.length + ARRAY_MIN_SIZE - 1;
    
    // Define Behaviours
    this.update = () => {
        
        // Move belt forwards
        
        this.belt.x += this.speed;
        for (let i in this.items) {
            this.items[i].x += this.speed;
        }

        // Track change in X
        this.deltaX += this.speed;

        // When last item reaches trash can:
        if(this.deltaX >= SPRITE_SIZE_PX) {
            
            // Move belt backwards
            this.belt.x -= SPRITE_SIZE_PX;
            
            // Waste first item if not a blank
            if (this.items[0].type != BLANK) {
				
                this.items[0].waste();
				this.items.shift();
				
				// Check for level completion
				level.isComplete = level.checkForCompletion();
				
            }
            // Otherwise just remove from stage entirely.
            else {	
                level.scene.removeChild(this.items[0]);
				this.items.shift();
            }

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
        item.y = CANVAS_HEIGHT - SPRITE_HALF_PX;

        // Normalize to near bottom right corner
        item.x = CANVAS_WIDTH + this.deltaX - SPRITE_SIZE_PX - SPRITE_HALF_PX;

        // Shift left by index
        item.x -= SPRITE_SIZE_PX * index;

        // Copy in
        this.items[index] = item;
    }
    
    // Returns an index based on an X position
    this.getIndexFromX = (x) => {
        return Math.floor((CANVAS_WIDTH + this.deltaX - x) / SPRITE_SIZE_PX) - 1;
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
        return (0 < x && x < CANVAS_WIDTH - SPRITE_SIZE_PX) && (CANVAS_HEIGHT - SPRITE_SIZE_PX < y && y < CANVAS_HEIGHT);
    }
    
    // Finish Constructor

    // Pad array and construct belt
    for(let i = 0; i < ARRAY_MIN_SIZE; i++) {
        this.addItemAtIndex(makeItem(BLANK, level), i);
        
        let beltTile = new PIXI.Sprite(
			PIXI.loader.resources["images/spritesheet.json"].textures["conveyor-belt.png"]
		);
		
        beltTile.y = CANVAS_HEIGHT - SPRITE_SIZE_PX;
        beltTile.x = CANVAS_WIDTH - SPRITE_SIZE_PX - SPRITE_HALF_PX;
        beltTile.x -= SPRITE_SIZE_PX * i;
        this.belt.addChild(beltTile);
    }
	
	// Trash Pit
	let trashPit = new PIXI.Sprite(
			PIXI.loader.resources["images/spritesheet.json"].textures["trash-pit.png"]
	);
	trashPit.y = CANVAS_HEIGHT - SPRITE_SIZE_PX;
	trashPit.x = CANVAS_WIDTH - trashPit.width;
	
    // Add belt background
    level.scene.addChild(this.belt);
    
    // Add trash pit
    level.scene.addChild(trashPit);
	
    // Fill out rest of conveyor
    for(let i = 0; i < itemTypes.length; i++) {
        this.addItemAtIndex(makeItem(itemTypes[i], level), i + ARRAY_MIN_SIZE);
    }
}