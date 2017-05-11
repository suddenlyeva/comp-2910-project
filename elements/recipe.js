"use strict";

// ItemTypes array of ingdeints, resultType is recipe Output
function Recipe(itemTypes, resultType) {
	
    // Takes an array
    this.recipe = itemTypes;
    this.result = resultType;
	
	
	
	// Returns the Number of Ingredients in Recipe
	this.GetListCount = () => { return this.recipe.length; }
	this.GetList = () => { return this.recipe; }
	this.GetOutput = () => { return this.result; }

}
