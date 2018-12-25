import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import firebase from 'firebase';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    private userName: any;
    private userEmail: any;
    private userId : any;
  constructor(public navCtrl: NavController,
    private alertCtrl : AlertController
    ) {
        this.initPage();
  }

  initPage(){
    var user = firebase.auth().currentUser;
    console.log(user);

  if (user) {
      this.userName = user.displayName;
      this.userEmail = user.email;
      this.userId = user.uid;
  } else {
  // No user is signed in.
  }
  }
  logout(){
    const confirm = this.alertCtrl.create({
      title: 'Log out',
      message: 'You really want to log out?',
      buttons: [
        {
          text: 'Disagree',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Agree',
          handler: () => {
            firebase.auth().signOut().then(() => {
              console.log("log out");
              // Sign-out successful.
            }).catch((error) => {
              console.log("log out error");
            });
          }
        }
      ]
    });
    confirm.present();
 
    
  }
}
