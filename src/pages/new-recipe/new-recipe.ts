import { Component, OnInit } from '@angular/core';
import { IonicPage, NavParams, ActionSheetController, AlertController, ToastController, NavController } from 'ionic-angular';
import { FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { RecipeService } from '../../services/recipes.service';
import { Ingredient } from '../../models/ingredient.model';
import { shoppingService } from '../../services/shooping.service';
import { Recipe } from '../../models/recipe.model';

@IonicPage()
@Component({
  selector: 'page-new-recipe',
  templateUrl: 'new-recipe.html',
})
export class NewRecipePage implements OnInit{
  
  mode: string = 'New';
  selectOptions = ['Easy', 'Medium', 'Hard'];
  recipeForm: FormGroup;
  editingRecipe: Recipe;

  constructor(
    private _navParams: NavParams, 
    private _actionSheetCtrl: ActionSheetController, 
    private _alertCtrl: AlertController, 
    private _toastCtrl: ToastController,
    private _recipesService: RecipeService,
    private _ingredientService: shoppingService,
    private _navCtrl: NavController,
    private _formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.mode = this._navParams.get('mode');
    this.editingRecipe = this._navParams.get('recipe');
    this.initializeForm();
  }

  private initializeForm(){
    let title = null;
    let description = null;
    let difficulty = 'Medium';
    let ingredients = [];

    if(this.mode == 'Edit'){
      title = this.editingRecipe.title;
      description = this.editingRecipe.description;
      difficulty = this.editingRecipe.difficulty;
      ingredients = this.editingRecipe.ingredients.map((item: Ingredient) => {
        return this._formBuilder.group({
          name: [item.name, [Validators.required]],
          amount: [item.amount, [Validators.required]],
        })
      });
    }

    this.recipeForm = this._formBuilder.group({
      title: [title, [Validators.required]],
      description: [description, [Validators.required]],
      difficulty: [difficulty, [Validators.required]],
      ingredients: this._formBuilder.array(ingredients)
    });

    // This one doesnt use formBuilder but the result is the same
    // this.recipeForm = new FormGroup({
    //   'title': new FormControl(title, Validators.required),
    //   'description': new FormControl(description, Validators.required),
    //   'difficulty': new FormControl(difficulty, Validators.required),
    //   'ingredients': new FormArray(ingredients)
    // });
  }

  private createNewIngredientAlert(){
    return this._alertCtrl.create({
      title: 'Ingredient',
      inputs: [
        { name: 'name', placeholder: 'Name' }
      ],
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        { text: 'Add', handler: data => { 
          if(data.name.trim() == '' || data.name == null){
            this._toastCtrl.create({
              message: 'Please enter a valid ingredient!',
              duration: 1500,
              position: 'bottom'
            }).present();
            return;
           };
          (<FormArray>this.recipeForm.get('ingredients')).push(
            this._formBuilder.group({
              name: [data.name,[Validators.required]],
              amount: [null,[Validators.required]]
            })
          );
           this._toastCtrl.create({
              message: 'Item added!',
              duration: 1500,
              position: 'bottom'
            }).present();
        }}
      ]
    });
  }
  
  manageIngredients(){
    const actionSheet = this._actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        { text: 'Add Ingredient',
        handler: () => { this.createNewIngredientAlert().present() }},
        { text: 'Remove all ingredients',
        role: 'destructive',
        handler: () => { 
          const formArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
          for (let i = formArray.length - 1; i >= 0; i--){
            formArray.removeAt(i);
          };
          this._toastCtrl.create({
            message: 'All items were deleted!',
            duration: 1500,
            position: 'bottom'
          }).present();
        } },
        { text: 'Cancel',
        role: 'cancel' }
      ]
    });
    actionSheet.present();
  }

  removeIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onSubmit(){
    const values = this.recipeForm.value;
    values.ingredients = values.ingredients.map(ingredient => new Ingredient(ingredient.name, ingredient.amount, this._ingredientService.ingredientId++));
    if(this.mode == 'Edit'){
      this._recipesService.editRecipe(this.editingRecipe.id, values.title, values.description, values.difficulty, values.ingredients);
    }else{
      this._recipesService.addRecipe(values.title, values.description, values.difficulty, values.ingredients);
    }
    this._navCtrl.popToRoot();
  }

}
