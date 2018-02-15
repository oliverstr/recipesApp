import { Injectable } from "@angular/core";
import { Recipe } from "../models/recipe.model";
import { Ingredient } from "../models/ingredient.model";
import { ConnectionService } from "./connection.service";
import { Observable } from "rxjs/Observable";

@Injectable()
export class RecipeService{

    protected ADDRESS = '/recipe';

    constructor(private _connService: ConnectionService) {};

    addRecipe(title: string, description: string, difficulty: string, ingredients: Ingredient[]): Observable<Recipe>{
        return this._connService.addItem(this.ADDRESS, new Recipe(title, description, difficulty, ingredients, this._connService.loggerUser));
    }

    removeRecipe(recipe: Recipe): Observable<any>{
        return this._connService.removeItem(this.ADDRESS, recipe._id);
    }

    editRecipe(id: string, title: string, description: string, difficulty: string, ingredients: Ingredient[]): Observable<any>{
        return this._connService.updateItem(this.ADDRESS, new Recipe(title, description, difficulty, ingredients, this._connService.loggerUser, id), id);
    }

    getRecipeList(): Observable<Recipe[]>{
        return this._connService.getList(this.ADDRESS + '/user/' + this._connService.loggerUser._id);

    }



}