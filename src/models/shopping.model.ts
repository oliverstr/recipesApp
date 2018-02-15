import { User } from "./user.model";
import { Ingredient } from "./ingredient.model";

export class Shopping{
    constructor(public user: User, public ingredients: Ingredient[],public _id?: string) { }
}