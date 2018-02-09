import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { SignUpPage } from '../sign-up/sign-up';
import { NgForm } from '@angular/forms';
import { ConnectionService } from '../../services/connection.service';

@IonicPage()
@Component({
  selector: 'page-sign-in',
  templateUrl: 'sign-in.html',
})
export class SignInPage {

  signUpPage = SignUpPage;

  constructor(
    private _navCtrl: NavController, 
    private _connService: ConnectionService, 
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController) {
  }

  signIn(value: Object){
    const loading = this._loadingCtrl.create({
      content: 'Singing you in...'
    });
    loading.present();
    this._connService.signIn(value['email'], value['password']).subscribe((response) => {
      localStorage.setItem('token',response.headers.get('x-access-token'));
      loading.dismiss();
      this._navCtrl.setRoot(TabsPage);
    }, err => {
      loading.dismiss();
      console.log(err);
      let errorMessage = {
        title: 'Error signing in!',
        message: err.message,
        buttons: ['Ok']
      };
      if(err.status == 401){
        errorMessage.message = 'Invalid Email or Password'
      }
      this._alertCtrl.create(errorMessage).present();
    }
    );
  }
}
