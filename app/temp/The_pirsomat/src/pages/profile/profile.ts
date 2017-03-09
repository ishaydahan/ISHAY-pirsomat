import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Facebook, NativeStorage } from 'ionic-native';
import { LoginPage } from '../login/login';
import { Http, Headers } from '@angular/http';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
  user: any;
  userReady: boolean = false;
  points:any;

  constructor(public navCtrl: NavController, public http: Http) {}

  ionViewCanEnter(){
    let env = this;

    NativeStorage.getItem('user')
    .then(function (data){
      env.user = {
        name: data.name,
        userId: data.userId,
        picture: data.picture
      };
      var ans = "userid="+env.user.userId;

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      env.http.post('https://vast-shore-90862.herokuapp.com/api/profile', ans, {headers: headers})
        .subscribe(res => {
          env.points = res.json();
          env.userReady = true;
        });
    }, function(error){
      console.log(error);
    });
  }

  refresh(){
    let env = this;
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    var ans = "userid="+env.user.userId;

    env.http.post('https://vast-shore-90862.herokuapp.com/api/profile', ans, {headers: headers})
      .subscribe(res => {
        env.points = res.json();
        env.userReady = true;
      });
  }

  doFbLogout(){
    var nav = this.navCtrl;
    Facebook.logout()
    .then(function(response) {
      //user logged out so we will remove him from the NativeStorage
      NativeStorage.remove('user');
      nav.push(LoginPage);
    }, function(error){
      console.log(error);
    });
  }
}
