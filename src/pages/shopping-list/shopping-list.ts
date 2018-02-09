import { Component } from '@angular/core';
import { IonicPage, App, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { shoppingService } from '../../services/shooping.service';
import { Ingredient } from '../../models/ingredient.model';
import { SignInPage } from '../sign-in/sign-in';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage{
  
  shoppingList: Ingredient[];
  selectedItem: Ingredient = new Ingredient('', 0, 0);
  isEditing: boolean = false;
  
  constructor(private _shoppingService: shoppingService, private _app: App, private _alertCtrl: AlertController) {
  }
  
  ionViewWillEnter(): void {
    this.loadItems();
  }
  
  showAlert(title: string, message: string){
    this._alertCtrl.create({
      title: title,
      message: message,
      buttons: ['Ok']
    }).present();
  }

  onSubmit(form: NgForm){
    if(this.isEditing){
      this._shoppingService.editShoppingItem(this.selectedItem).subscribe(...this.resolve());
    }else{
      this._shoppingService.addShoppingItem(form.value['ingredientName'], form.value['amount']).subscribe(...this.resolve());
    }
    this.isEditing = false;
    form.reset();
  }

  removeItem(item: Ingredient){
    this._shoppingService.removeShoppingItem(item).subscribe(...this.resolve());
  }

  editItem(item: Ingredient){
    this.selectedItem = {...item} as Ingredient;
    this.isEditing = true;
  }

  private loadItems(){
    this._shoppingService.getShoppingList().subscribe(data => { this.shoppingList = data.shoppingList }, 
      error => this.showAlert('Error', error.message));
  }

  logOut(){
    this._app.getRootNavs()[0].setRoot(SignInPage);
  }

  private resolve(success?: Function): Function[]{
    return [(data) => { 
      if(success) success(data);
      this.loadItems();
     }, (error) => {this.showAlert('Error', error.message)}]
  }



}
