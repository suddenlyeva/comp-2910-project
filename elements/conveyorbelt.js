"use strict";

function makeConveyorBelt(items, speed) {
	
	// Some temp constant controls
	let SCENE_HEIGHT_PX = 480;
	let SCENE_WIDTH_PX = 640;
	let SPRITE_SIZE_PX = 32;
	
	
	// Create Object from array
    let conveyorBelt = items;
    
	// Position items
	for(let i in items) {
		
		// To bottom of screen
		items[i].y = SCENE_HEIGHT_PX - SPRITE_SIZE_PX;
		
		// To almost right of screen
		items[i].x = SCENE_WIDTH_PX - SPRITE_SIZE_PX * 2;
		
		// Flow left
		items[i].x -= SPRITE_SIZE_PX * i;
	}
	
    // We will need to draw/animate the belt but it's in the same position all the time.
    
    // Data that is different for each belt
    conveyorBelt.speed = speed;
    
    // Behaviours
    conveyorBelt.update = function() {
        // Move belt forwards
        // Check for items removed from array
        // Check for items placed into array
        
        // Check if end of conveyor is over trash
            // if true, drop the last item and waste
            // then, we move all ites one index forwards and shift the belt object back one position (in terms of hitbox)
    }
    
}

function makeTestApple() {
	let apple = new PIXI.Sprite(
		PIXI.loader.resources["images/spritesheet.json"].textures["apple.png"]
	);
	stageScene.addChild(apple);
	return apple;
}