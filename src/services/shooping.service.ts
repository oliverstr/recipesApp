import { Injectable } from "@angular/core";
import { Ingredient } from "../models/ingredient.model";
import { ConnectionService } from "./connection.service";

@Injectable()
export class shoppingService{

    private _shoppingItems: Ingredient[] = [];
    public ingredientId: number = 0;
    protected ADDRESS = '/shopping';

    constructor(private _connService: ConnectionService) {}

    addShoppingItem(name: string, amount: number){
        // this._shoppingItems.push(new Ingredient(name, amount, this.ingredientId++));
        return this._connService.addItem(this.ADDRESS, { item: {name, amount} });
    }

    addShoppingItems(items: Ingredient[]){
        // this._shoppingItems.push(...items);
        return this._connService.addItem(this.ADDRESS, { item: items });
    }

    editShoppingItem(item: Ingredient){
        // const index = this._shoppingItems.findIndex(ingredient => ingredient.id == item.id);
        // this._shoppingItems[index] = new Ingredient(item.name, item.amount, item.id);
        return this._connService.updateItem(this.ADDRESS, item, item.id);
    }

    removeShoppingItem(ingredient: Ingredient){
        // this._shoppingItems = this._shoppingItems.filter(item => item.id != ingredient.id);
        return this._connService.removeItem(this.ADDRESS, ingredient.id);
    }

    getShoppingList(){
        return this._connService.getList(this.ADDRESS);
    }
}