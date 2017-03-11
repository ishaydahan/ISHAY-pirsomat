import { Component } from '@angular/core';
import { Facebook, NativeStorage } from 'ionic-native';

import { NavController, AlertController  } from 'ionic-angular';
import { Http, Headers } from '@angular/http';

@Component({
  selector: 'page-posts',
  templateUrl: 'posts.html'
})
export class PostsPage {
  output: any;
  gserReady: boolean = false;
  post: boolean = false;
  pointPage = false;

  p: any;
  points:number = 0;

  user: any;
  postid:any;
  ans: any;
  constructor(public navCtrl: NavController, public http: Http, public alertCtrl: AlertController) {

  }

  ionViewCanEnter(){
    let env = this;
    NativeStorage.getItem('user')
    .then(function (data){
      env.user = {
        userId: data.userId
      };
    }, function(error){
      console.log(error);
    });


    let params = new Array<string>();
    Facebook.api("/me/posts?fields=id,comments.summary(true),reactions.summary(true),created_time,message_tags,story_tags,place,picture,privacy,message,shares", params)
    .then(function(user) {
      env.output = user;
      env.gserReady = true;

    })
  }

    doublePost() {
      let alert = this.alertCtrl.create({
        title: 'Oh no!!',
        subTitle: 'You already got points for this post...',
        buttons: ['OK']
      });
      alert.present();
    }

    tooOld() {
      let alert = this.alertCtrl.create({
        title: 'Oh no!!',
        subTitle: 'your post is too old to get reputation',
        buttons: ['OK']
      });
      alert.present();
    }

    confirmation() {
      let alert = this.alertCtrl.create({
        title: 'Yeah :)',
        subTitle: 'Your post sent to authenticity check >> visit our app soon to check your balance and buy things',
        buttons: ['OK']
      });
      alert.present();
    }

  getPoints(){
    let env = this;

    var ans = "userid="+env.user.userId+"&postid="+env.postid+"&points="+env.points;

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    env.http.post('https://vast-shore-90862.herokuapp.com/api/posts', ans, {headers: headers})
      .subscribe(res => {
        if (res.json()==='0'){
          env.doublePost();
        } else{
          env.confirmation();
        }
        console.log(res.json());
      });


  }

  expend(post){
    let env = this;
    this.p = post;
    let points = this.points;

    if (post.id){
      env.postid = post.id;
    }

    if (post.reactions){
      points = points+ post.reactions.summary.total_count*0.5;
      points = Math.ceil(points)
    }

    if (post.comments){
      points = points+ post.comments.summary.total_count*2;
    }

    if (post.shares){
      points = points+ post.shares.count*5;
    }

    if (post.message_tags){
      points = points+ post.message_tags.length*4;
    }

    if (post.story_tags){
      points = points+ post.story_tags.length*4;
    }

    if (post.privacy.description === 'Public'){
      points = points + 10;
    }

    if (post.picture){
      points = points + 10;
    }

    if (post.place){
      points = points + 10;
    }

    this.points = points;

    this.gserReady = false;
    this.post=true;
  }

  return(){
    this.points = 0;
    this.post=false;
    this.gserReady = true;
  }

}
