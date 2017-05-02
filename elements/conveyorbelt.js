"use strict";

function makeConveyorBelt(itemTypes, speed) {
    let conveyorBelt = itemTypes;
    
    // We will need to draw/animate the belt but it's in the same position all the time.
    
    // Data that is different for each belt
    conveyorbelt.speed = speed;
    
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
	apple.x = 100;
	apple.y = 100;
	return apple;
}