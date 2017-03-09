import { Component } from '@angular/core';
import { Facebook, NativeStorage } from 'ionic-native';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  FB_APP_ID: number = 673245436186244;
  tabBarElement: any;
  constructor(public navCtrl: NavController) {
    Facebook.browserInit(this.FB_APP_ID, "v2.8");
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }

  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }

  doFbLogin(){
    let permissions = new Array();
    let nav = this.navCtrl;
    //the permissions your facebook app needs from the user
    permissions = ["public_profile, user_posts"];


    Facebook.login(permissions)
    .then(function(response){
      let userId = response.authResponse.userID;
      let params = new Array();

      //Getting name and gender properties
      Facebook.api("/me?fields=name", params)
      .then(function(user) {
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        //now we have the users info, let's save it in the NativeStorage
        NativeStorage.setItem('user',
        {
          name: user.name,
          userId: response.authResponse.userID,
          picture: user.picture
        })
        .then(function(){
          nav.push(TabsPage);
        }, function (error) {
          console.log(error);
        })
      })
    }, function(error){
      console.log(error);
    });
  }
}
