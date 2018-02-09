import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, LoadingController } from 'ionic-angular';
import { ConnectionService } from '../../services/connection.service';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  constructor(
    private _connService: ConnectionService, 
    private _navCtrl: NavController,
    private _loadingCtrl: LoadingController,
    private _alertCtrl: AlertController
  ) {
  }

  signUp(value: Object){
    const loading = this._loadingCtrl.create({
      content: 'Signing you up...'
    });
    loading.present();
    this._connService.signUp({ nome: value['name'], usuario: value['email'], senha: value['password'] }).subscribe(
      (data) => { 
        loading.dismiss();
        this._navCtrl.pop(); 
      },
      err => { 
        loading.dismiss();
        this._alertCtrl.create({
          title: 'Error signing up!',
          message: err.message,
          buttons: ['Ok']
        }).present();
        console.log (err) 
      }
    )
  }

}
