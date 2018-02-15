import { Ingredient } from "./ingredient.model";
import { User } from "./user.model";

export class Recipe{
    constructor(
        public title: string, 
        public description: string, 
        public difficulty: string, 
        public ingredients: Ingredient[],
        public user: User,
        public _id?: string

    ){};
}