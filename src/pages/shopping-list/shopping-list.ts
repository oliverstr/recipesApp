import { Component } from '@angular/core';
import { IonicPage, App, AlertController, LoadingController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { shoppingService } from '../../services/shooping.service';
import { Ingredient } from '../../models/ingredient.model';
import { SignInPage } from '../sign-in/sign-in';
import { Shopping } from '../../models/shopping.model';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage{
  
  shoppingList: Shopping = new Shopping(undefined, []);
  selectedItem: Ingredient = new Ingredient('', 0, '');
  isEditing: number;
  
  constructor(private _shoppingService: shoppingService, private _app: App, private _alertCtrl: AlertController, private _loadingCtrl: LoadingController) {
  }
  
  ionViewWillEnter(): void {
    this.loadItems();
    
  }
  
  ionViewWillLeave(){
    this.save()
  }

  showAlert(title: string, message: string){
    this._alertCtrl.create({
      title: title,
      message: message,
      buttons: ['Ok']
    }).present();
  }

  onSubmit(form: NgForm){
    if(this.isEditing !== undefined){
      // this._shoppingService.editShoppingItem(this.selectedItem).subscribe(...this.resolve());
      // const index = this.shoppingList.ingredients.findIndex((ingredient: Ingredient ) => JSON.stringify(ingredient) === JSON.stringify(this.selectedItem));
      this.shoppingList.ingredients[this.isEditing] = new Ingredient(this.selectedItem.name, this.selectedItem.amount);
    }else{
      // this._shoppingService.addShoppingItem(form.value['ingredientName'], form.value['amount']).subscribe(...this.resolve());
      this.shoppingList.ingredients.push(new Ingredient(form.value['ingredientName'], form.value['amount']));
    }
    this.isEditing = undefined;
    form.reset();
  }


  removeItem(index: number){
    // this._shoppingService.removeShoppingItem(item).subscribe(...this.resolve());
    this.shoppingList.ingredients.splice(index, 1);
  }

  editItem(index: number){
    this.selectedItem = Object.assign({},this.shoppingList.ingredients[index]);
    this.isEditing = index;
  }

  private loadItems(){
    this._shoppingService.getShoppingList().subscribe(
      data => this.shoppingList = data.shoppingList, 
      error => this.showAlert('Error', error.message));
  }

  private save(){
    const loading = this._loadingCtrl.create({
      content: 'Saving...'
    });
    loading.present();
    return new Promise((resolve, reject) => {
      this._shoppingService.saveShopping(this.shoppingList).subscribe(data => {
        loading.dismiss();
        resolve(data);
      }, err => reject(err));
    })
  }

  logOut(){
    this.save()
    .then(data => this._app.getRootNavs()[0].setRoot(SignInPage));
  }

  // private resolve(success?: Function): Function[]{
  //   return [(data) => { 
  //     if(success) success(data);
  //     this.loadItems();
  //    }, (error) => {this.showAlert('Error', error.message)}]
  // }



}
