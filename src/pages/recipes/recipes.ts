import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';
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
  
  constructor(private _navCtrl: NavController, private _recipesService: RecipeService, private _alertCtrl: AlertController) {
  }

  ionViewWillEnter(){
    this._recipesService.getRecipeList().subscribe(
      data => this.recipesList = data,
      err => this.showAlert('Erro!', err.message)
    );
  }

  newRecipe(){
    this._navCtrl.push(NewRecipePage, { mode: 'New' });
  }

  viewRecipe(recipe: Recipe){
    this._navCtrl.push(RecipePage, { recipe: recipe });
  }

  private showAlert(title: string, message: string){
    this._alertCtrl.create({
      title: title,
      message: message,
      buttons: ['Ok']
    }).present();
  }



}
