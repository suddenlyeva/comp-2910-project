"use strict";

function Processor(recipeOrder) //the Recipe this Processor will produce 
{
	//-------------------------------------------------------------------------------
	
	//-------------------------------------------------------------------------------
	
	//-------------------------------------------------------------------------------
	// Object Variables
	//-------------------------------------------------------------------------------
	this.mSprite; 					// Sprite Variable
	this.requiredIngredients = [];	// array of required items
	this.numIngredients;			// Total Number of Ingredients
	this.recipeProgress = []; 		// An array of booleans to check if each seperate ingredients are placed
	this.mPosition;
	
	this.totalProcessTime = 60; 		// total time it takes for an item to process
	this.processTimer = 0; 				// Current process duration	
	this.timerCircle;					// Drawing Circle
	
	// Sprite Variables
	this.contentBlock = [];		// Array of contentBlocks (sprites?)
	this.maxWidth = 300; 	// Max width of 300 pixels
	
	
	this.isCollidable = true;	// This object is collidable
	
	
	// 0 = loading items
	// 1 = processing
	this.processorState = 0; 

	//-------------------------------------------------------------------------------
	// Project handler functions
	//-------------------------------------------------------------------------------
	
	// On create 
	// Variable assignment
	this.OnSetup : function() 
	{
		this.mSprite = spriteManager.getSprite("Processor");  // example
	
		// Sets Position
		this.mPosition = new Position(0,0);
		this.boundingBox = new BoundingBox();	// No spritemanager to handle collision checks between all sprites.
		
		// load all the sprites for the ingredients
		
		
		// Two possible ways to pull list
		this.requiredIngredients = [recipeOrder.getIngredentsList()]; // Pulls list of item array?
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
			contentBlock.push(/*new Sprite(x,y)*/);
		}
		
		
		
		
		
	}
	
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

}

// Position class handler
function Position(x1,y1)
{
	this.x = x1;
	this.y = y1;
	
	this.getX : function() { return x;}
	this.getY : function() { return y;}
	
	this.movePos : function(x1, y1) 
	{ 
		x += x1; 
		y += y1;
	}
	
}