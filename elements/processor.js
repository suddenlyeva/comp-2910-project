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
		
		// !!Testing Enviorment!
		this.numIngredients = recipeOrder.GetListCount();
	
	
		//  --- Sprite related Init  ---
	
		// Sprite Handler should be placed here
		this.mSpriteProcessor = PIXI.Sprite.fromImage('images/RTS_Crate.png');
		
		// Should be defined later
		this.mSpriteProcessor.x = this.mPositionX;
		this.mSpriteProcessor.y = this.mPositionY;

		for(let i = 0; i < this.numIngredients; ++i)
		{
			// Unsafe (no sprite manager to initilize sprite with set position
			this.mSpriteTray[i] = (PIXI.Sprite.fromImage('images/RTS_Crate2.png'));
			this.mSpriteTray[i].x = (this.mPositionX + 64 + (32 * (i))); // offsets the pos based off index
			this.mSpriteTray[i].y = (this.mPositionY + 32);
		}
		
		// Last Tray is the Processor output
		this.mSpriteOutput = PIXI.Sprite.fromImage('images/RTS_Crate.png');
		this.mSpriteOutput.x = (this.mPositionX + 64 + (32 * (this.numIngredients))); //array starts at 0
		this.mSpriteOutput.y = (this.mPositionY);
		
		// Addes Tray Sprites to stage
		level.scene.addChild(this.mSpriteProcessor);
		level.scene.addChild(this.mSpriteOutput);
		
		for(let i = 0; i < this.numIngredients; ++i)
		{
			level.scene.addChild(this.mSpriteTray[i]);
		}
		
		/*
		this.mSprite = spriteManager.getSprite("Processor");  // example
	
		// Sets Position
		this.mPosition = new Position(0,0);
		this.boundingBox = new BoundingBox();	// No spritemanager to handle collision checks between all sprites.
		
		// load all the sprites for the ingredients
		
		
		// Two possible ways to pull list
		for(let i = 0; i < recipeOrder.getIngredientSize(); ++i)
		{
			this.requiredIngredients.push(recipeOrder.getIngredentsList); 
		}
		this.requiredIngredients = recipeOrder.getIngredentsList(); // Pulls list of item array?
		this.requiredIngredients = recipeOrder;
		
		this.numIngredients = requiredIngredients.length;	// Assigns total number of ingredients
		
		this.recipeProgress = new Array(numIngredients);
		
		for(var i = 0; i < requiredIngredients.length; ++i) // Forcefully initiates them to false
		{
			recipeProgress[i] = false;
		}
		
		// Processor Boxes ----
		
		// Depending on the size of the recipe, the content block must be of a set width
		let boxWidth = maxWidth / numIngredients;
		
		// creates # of processor container for each ingredients
		for(let i = 0; i < numIngredients; ++i)
		{
			
			//contentBlock[i] = new Sprite(x,y);
			//contentBlock.push(new Sprite(x,y));
		}
	*/
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
	
	this.collidesWithPoint = (x,y) => {
        return (0 < x && x < SCENE_WIDTH_PX - SPRITE_SIZE_PX) && (SCENE_HEIGHT_PX - SPRITE_SIZE_PX < y && y < SCENE_HEIGHT_PX);
    }
	
	//-------------------------------------------------------------------------------
	// On Update
	this.OnUpdate : function() 
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
	// 0 = loading items
	// 1 = processing
	
}	// End of Class