"use strict";

function Processor(recipeOrder, level) //the Recipe this Processor will produce 
{

	//-------------------------------------------------------------------------------
	// Project handler functions
	//-------------------------------------------------------------------------------
	this.OnTestInit  = () => {
		console.log(recipeOrder.GetListCount());
		// console.log("Hi");
		
	}
	
	//-------------------------------------------------------------------------------
	// Sets Position of the Compressor
	this.SetPosition = (x,y) => {
		this.mPositionX = x;
		this.mPositionY = y;
	}
	
	//-------------------------------------------------------------------------------
	// On create / Init
	// Variable assignment
	this.Spawn = () => {	
	
		// Variable Assignments
		this.requiredIngredients = recipeOrder.GetList();
		this.numIngredients = recipeOrder.GetListCount();
		console.log("Number of Ingredients = " + this.numIngredients);
		

		for(let i = 0; i < this.numIngredients; ++i) // Forcefully initiates them to false
		{

		}

	
		//  --- Sprite related Init  ---
	
		// Sprite Handler should be placed here
		this.mSpriteProcessor = PIXI.Sprite.fromImage('images/RTS_Crate.png');
		
		// Should be defined later
		this.mSpriteProcessor.x = this.mPositionX;
		this.mSpriteProcessor.y = this.mPositionY;
		
		// Rendering Processing Trays
		for(let i = 0; i < this.numIngredients; ++i)
		{
			// Unsafe (no sprite manager to initilize sprite with set position
			
			// Spawns Processor's Tray sprites
			this.mSpriteTray[i] = (PIXI.Sprite.fromImage('images/RTS_Crate2.png'));
			this.mSpriteTray[i].x = (this.mPositionX + (this.spriteSize*2) + (this.spriteSize * (i))); // offsets the pos based off index
			this.mSpriteTray[i].y = (this.mPositionY + this.spriteSize);
			
			level.scene.addChild(this.mSpriteTray[i]);		// Pushes this to the scene, Explicit because apple's render function is called on init

			// Spawns the Ingredients ontop of the tray
			this.requiredIngredients[i] = new makeItem(recipeOrder.GetList()[i], level);	// Pushes new Item on the list
			this.requiredIngredients[i].interactive = false;								// Not Pressable
			this.requiredIngredients[i].alpha = this.alpha;									// Sets the transparancy
			
			this.requiredIngredients[i].x = this.mSpriteTray[i].x + (this.spriteSizeHalf);	// Spawns to the center of the tray
			this.requiredIngredients[i].y = this.mSpriteTray[i].y + (this.spriteSizeHalf);
			this.recipeProgress[i] = false; // Forcefully sets to not completed
			
		}
		
		// Last Tray is the Processor output
		this.mSpriteOutput = PIXI.Sprite.fromImage('images/RTS_Crate.png');
		this.mSpriteOutput.x = (this.mPositionX + (this.spriteSize*2) + (this.spriteSize * (this.numIngredients))); //array starts at 0
		this.mSpriteOutput.y = (this.mPositionY);
		
		// Addes Tray Sprites to stage
		level.scene.addChild(this.mSpriteProcessor);
		level.scene.addChild(this.mSpriteOutput);
		
	
	}
	
	// ~ Both collision can all be in one function with a return boolean in a manager
	// The Worlds see's all items and tells which item is touch what.
	
	
	//-------------------------------------------------------------------------------
	// Collision pass for ingredients Item's center x and y
	this.collidesWithPoint = (x,y) => {
		
		let boundingboxX = this.mPositionX + 64; // top left
		let boundingboxY = this.mPositionY + 32; 	 // top 
		let boundingboxUpperLimitX = boundingboxX + (this.spriteSize * this.numIngredients); //top right
		let boundingboxUpperLimitY = boundingboxY + 32; //bottom
		
		console.log( x > boundingboxX
			&& x < boundingboxUpperLimitX);
			
		
		console.log( y > boundingboxY				// Top Left
		&& y < boundingboxUpperLimitY);					// Top Left 
		
        return ( boundingboxX < x 			// Bottom Left
		&& x < (boundingboxUpperLimitX)	// Bottom Right
		&& y > boundingboxY 					// Top Left
		&& y < boundingboxUpperLimitY);	// Top Right
    }
	
	//-------------------------------------------------------------------------------
	// Passes Ingredient Object to Processor
	this.addItem = (droppedIngredient) => {
		for(let i = 0; i < this.numIngredients; ++i)
		{
			if(droppedIngredient.type == this.requiredIngredients[i].type && !this.recipeProgress[i])
			{
				this.requiredIngredients[i].alpha = 1;
				this.recipeProgress[i] = true;
				
				level.removeChild (droppedIngredient);
				break;
			}
		}
	}
	
	//-------------------------------------------------------------------------------
	// On Update
	this.Update = () => 
	{
		// Does Nothing
	}
	
	/**
	//-------------------------------------------------------------------------------
	// On draw
	this.OnRender : function()
	{
			//Stuffs to do on Draw?
			
			//if in processing state 
				stage.addChild(timerCircle)
			//render clock
			
	}

	
	//-------------------------------------------------------------------------------
	// On Update
	this.Update : function() 
	{
		
		if(!bRecipeCompletion)
		{
			processState = 1;
		}
		switch (processState)
		{
			case 0: // still loading Ingredients on the tray
			{
				
				// Iterates through all the items on the scene and see if one is "dropped" into the processor
				if(itemCheck(collidedObject))
				{
					// Kill dropped object Item
					// grayed out object becomes fully drawn
				}
					
			}break;
			case 1: // Processing Ingredients
			{		
				timerUpdate();
				//do something related to processing
			}break;
		} // Switch
		
	}
	
	//-------------------------------------------------------------------------------
	// Memeber functions
	//-------------------------------------------------------------------------------
	
	//-------------------------------------------------------------------------------
	// External addTo()
	this.addIngredient = (item) => {
		for(let i = 0; i < numIngredients; ++i)
		{
			if(requiredIngredients[i] == item.getName()) //item.getType?
			{
				recipeProgress[i] = true;
			}
		}
	}
	
	//-------------------------------------------------------------------------------
	// Updates the timer
	
	this.timerUpdate : function()
	{
		if(processTimer < totalProcessTime)
		{
			processTimer += deltaTime;
		}
	}
	
	//-------------------------------------------------------------------------------
	// Checks if dragged item is an item on the recipe
	this.itemCheck(droppedObj)
	{
		for(let i = 0; i < numIngredients; ++i)
		{
			
			if(requiredIngredients[i] === droppedObj.getName())
			{
				requiredIngredients[i] = true; // if found flip to true 
				return true;
			}
		}
		return false;
	}
	
	//-------------------------------------------------------------------------------
	// Checks if all the required Recipe Ingredients are added
	this.bRecipeCompletion : function()
	{
		for (let i = 0; i < numIngredients; ++i)
		{
			if(requiredIngredients[i] === false)
				return false;
		}
		return true;
	}
	
	//-------------------------------------------------------------------------------
	return this;
	*/
	
	//-------------------------------------------------------------------------------
	// Object Variables
	//-------------------------------------------------------------------------------
	
	// Sprites
	this.mSpriteProcessor; 					// Sprite Variable
	this.mSpriteTray = [];
	this.mSpriteOutput; 			// This Sprite will not be have a bounding box
	
	this.spriteSize = 32;
	this.spriteSizeHalf = this.spriteSize / 2;
	
	// Position
	this.mPositionX;
	this.mPositionY;
	
	// Ingredients
	this.requiredIngredients = [];		// Array of required items
	this.numIngredients;				// Total Number of Ingredients
	this.recipeProgress = []; 			// An array of booleans to check if each seperate ingredients are placed
	this.mPosition;
	
	// Processing Variables
	this.totalProcessTime = 60; 		// total time it takes for an item to process
	this.processTimer = 0; 				// Current process duration	
	this.timerCircle;					// Drawing Circle
	
	// Object Variables
	this.isCollidable = true;			// This object is collidable
	this.processorState = 0; 
	
	this.alpha = 0.5;
	// 0 = loading items
	// 1 = processing
	
}	// End of Class