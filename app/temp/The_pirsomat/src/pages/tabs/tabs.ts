import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { ProfilePage } from '../profile/profile';
import { PostsPage } from '../posts/posts';
import { StorePage } from '../store/store';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = ProfilePage;
  tab3Root: any = PostsPage;
  tab4Root: any = StorePage;

  constructor() {

  }
}
