import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { ProfilePage } from '../pages/profile/profile';
import { PostsPage } from '../pages/posts/posts';
import { StorePage } from '../pages/store/store';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

@NgModule({
  declarations: [
    MyApp,
    PostsPage,
    StorePage,
    HomePage,
    TabsPage,
    ProfilePage,
    LoginPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PostsPage,
    StorePage,
    HomePage,
    TabsPage,
    ProfilePage,
    LoginPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
