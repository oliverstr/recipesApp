import { Injectable } from "@angular/core";
import { ConnectionService } from "./connection.service";
import { Shopping } from "../models/shopping.model";

@Injectable()
export class shoppingService{

    public ingredientId: number = 0;
    protected ADDRESS = '/shopping';

    constructor(private _connService: ConnectionService) {}

    getShoppingList(){
        return this._connService.getList(this.ADDRESS + '/' + this._connService.loggerUser._id);
    }

    saveShopping(item: Shopping){
        return this._connService.saveItem(this.ADDRESS, item);
    }
}