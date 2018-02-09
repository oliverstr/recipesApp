import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController } from 'ionic-angular';
import { NewRecipePage } from '../new-recipe/new-recipe';
import { Recipe } from '../../models/recipe.model';
import { RecipeService } from '../../services/recipes.service';
import { RecipePage } from '../recipe/recipe';
@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage{
  
  recipesList: Recipe[];
  
  constructor(private _navCtrl: NavController, private _recipesService: RecipeService) {
  }

  ionViewWillEnter(){
    this.recipesList = this._recipesService.recipeList;
  }

  newRecipe(){
    this._navCtrl.push(NewRecipePage, { mode: 'New' });
  }

  viewRecipe(recipe: Recipe){
    this._navCtrl.push(RecipePage, { recipe: recipe });
  }



}
