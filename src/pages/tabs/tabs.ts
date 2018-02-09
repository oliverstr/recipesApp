import { Component } from '@angular/core';
import { ShoppingListPage } from '../shopping-list/shopping-list';
import { RecipesPage } from '../recipes/recipes';


@Component({
  selector: 'page-tabs',
  template: `
  <ion-tabs>
    <ion-tab [root]="shoppingList" tabTitle="Shopping List" tabIcon="cart"></ion-tab>
    <ion-tab [root]="recipes" tabTitle="Recipes" tabIcon="book"></ion-tab>
  </ion-tabs>
  `,
})
export class TabsPage {

  shoppingList = ShoppingListPage;
  recipes = RecipesPage;

  constructor() {
  }

}
