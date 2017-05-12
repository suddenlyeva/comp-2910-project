"use strict";

// ItemTypes array of ingdeints, resultType is recipe Output
function Recipe(itemTypes, resultType, scoreValue) {
	
    // Takes an array
    this.recipe = itemTypes;
    this.result = resultType;
	this.score = scoreValue;
	
	
	
	// Returns the Number of Ingredients in Recipe
	this.GetListCount = () => { return this.recipe.length; }
	this.GetList = () => { return this.recipe; }
	this.GetOutput = () => { return this.result; }
	this.GetScore = () => { return this.GetScore; }

}
