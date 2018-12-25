import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';

import firebase from "firebase";

var config = {
  apiKey: "AIzaSyCUWwhrBJeN7rDTUAZ0G2N8dDftJK47Zbo",
  authDomain: "login-63897.firebaseapp.com",
  databaseURL: "https://login-63897.firebaseio.com",
  projectId: "login-63897",
  storageBucket: "login-63897.appspot.com",
  messagingSenderId: "986984805875"
};


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
    firebase.initializeApp(config);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = LoginPage;
      }
    });
    
  }
}

