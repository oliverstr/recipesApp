import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { ShoppingListPageModule } from '../pages/shopping-list/shopping-list.module';
import { RecipesPageModule } from '../pages/recipes/recipes.module';
import { NewRecipePageModule } from '../pages/new-recipe/new-recipe.module';
import { RecipePageModule } from '../pages/recipe/recipe.module';
import { TabsPage } from '../pages/tabs/tabs';
import { shoppingService } from '../services/shooping.service';
import { RecipeService } from '../services/recipes.service';
import { SignInPageModule } from '../pages/sign-in/sign-in.module';
import { SignUpPageModule } from '../pages/sign-up/sign-up.module';
import { HttpClientModule } from '@angular/common/http';
import { ConnectionService } from '../services/connection.service';

@NgModule({
  declarations: [
    MyApp,
    TabsPage
  ],
  imports: [
    BrowserModule,
    ShoppingListPageModule,
    RecipesPageModule,
    RecipePageModule,
    NewRecipePageModule,
    SignInPageModule,
    SignUpPageModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    shoppingService,
    RecipeService,
    ConnectionService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
