import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { SignupPage } from '../../pages/signup/signup';
import firebase from 'firebase';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  private account : any = {
    email : '',
    password :''

  }
  
  constructor(public navCtrl: NavController, public navParams: NavParams,   private alertCtrl : AlertController
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    firebase.auth().signInWithEmailAndPassword(this.account.email, this.account.password)
    .then((result)=>{
      console.log(result);
    })
    .catch((error)=> {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
      console.log(errorMessage);
    });
  }

  signup(){
    this.navCtrl.push(SignupPage);
  }

  resetemail(){
    let alert = this.alertCtrl.create({
      title: 'Reset Password',
      message: "Please enter your email to reset your password",
      inputs: [
        {
          name: 'email',
          placeholder: 'email'
        },
        
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'confirm',
          handler: data => {
            var auth = firebase.auth();
            var emailAddress = data.email;
        
          auth.sendPasswordResetEmail(emailAddress).then(()=> {
            let alert = this.alertCtrl.create({
              title: 'Password Reset Email',
              subTitle: 'Sent email to your email. Please check',
              buttons: ['confirm']
            });
            alert.present();
          }).catch((error)=> {
          // An error happened.
        });
          }
        }
      ]
    });
    alert.present();



   

  }

}
