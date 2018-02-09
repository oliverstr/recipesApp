import { Component } from '@angular/core';
import { IonicPage, NavParams, NavController, AlertController } from 'ionic-angular';
import { Recipe } from '../../models/recipe.model';
import { shoppingService } from '../../services/shooping.service';
import { RecipeService } from '../../services/recipes.service';
import { NewRecipePage } from '../new-recipe/new-recipe';

@IonicPage()
@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage {

  recipe: Recipe;
  
  constructor(
    private _navParams: NavParams, 
    private _navCtrl: NavController, 
    private _shoppingService: shoppingService, 
    private _recipeService: RecipeService,
    private _alertCtrl: AlertController
  ) {
  }

  ionViewWillLoad() {
    this.recipe = this._navParams.get('recipe');
  }

  shoppingList(){
    this._shoppingService.addShoppingItems(this.recipe.ingredients);
    this._navCtrl.parent.select(0);
  }

  editRecipe(){
    this._navCtrl.push(NewRecipePage, { mode: "Edit", recipe: this.recipe });
  }

  deleteRecipe(){
    this._alertCtrl.create({
      title: 'Delete this recipe?',
      buttons: [
        { text: 'Ok', handler: () => {
          this._recipeService.removeRecipe(this.recipe);
          this._navCtrl.pop();
        }},
        { text: 'Cancel', role: 'cancel' }
      ]
    }).present();
  }

}
