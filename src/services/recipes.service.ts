import { Injectable } from "@angular/core";
import { Recipe } from "../models/recipe.model";
import { Ingredient } from "../models/ingredient.model";

@Injectable()
export class RecipeService{

    private _recipesList: Recipe[] = [];
    private counter: number = 0;

    constructor() {};

    addRecipe(title: string, description: string, difficulty: string, ingredients: Ingredient[]){
        this._recipesList.push(new Recipe(this.counter++, title, description, difficulty, ingredients));
    }

    removeRecipe(recipe: Recipe){
        this._recipesList = this._recipesList.filter(item => item.id != recipe.id);
    }

    editRecipe(id: number, title: string, description: string, difficulty: string, ingredients: Ingredient[]){
        const index = this._recipesList.findIndex(item => item.id == id);
        this._recipesList[index] = new Recipe(id, title, description, difficulty, ingredients);
    }

    get recipeList(): Recipe[]{
        return this._recipesList.slice();
    }



}