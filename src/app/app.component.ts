import { Component } from "@angular/core";

import { Platform, AlertController, MenuController } from "@ionic/angular";
import { SplashScreen } from "@ionic-native/splash-screen/ngx";
import { StatusBar } from "@ionic-native/status-bar/ngx";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";
import { UserService } from "./user.service";

@Component({
  selector: "app-root",
  templateUrl: "app.component.html"
})
export class AppComponent {
  user: any;
  user$: any;
  public appPages = [
    {
      title: "Game",
      url: "/home",
      icon: "logo-game-controller-b"
    },
    {
      title: "Feed",
      url: "/list",
      icon: "star"
    },
    {
      title: "Search",
      url: "/list",
      icon: "search"
    },
    {
      title: "Tournament",
      url: "/list",
      icon: "ribbon"
    },
    {
      title: "Community",
      url: "/list",
      icon: "people"
    },
    {
      title: "About the Ninth Age",
      url: "/list",
      icon: "information-circle"
    },
    {
      title: "Settings",
      url: "/list",
      icon: "settings"
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private router: Router,
    private alertController: AlertController,
    private menuController: MenuController,
    private userService: UserService
  ) {
    this.initializeApp();

    this.authService.$isLoggedIn().subscribe(loggedInUser => {
      if (loggedInUser) {
        console.log(loggedInUser);

        this.user$ = userService.getUser(loggedInUser.uid).subscribe(user => {
          this.user = user;
        });
      }
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  logOut() {
    console.log("Logging out");
    this.menuController.close();

    this.authService
      .logOut()
      .then(() => {
        this.router.navigate(["login"]);
      })
      .catch(err => {
        console.error(err);

        this.presentAlert(
          "Error",
          "Something went wrong. Please try again later"
        );
      });
  }

  async presentAlert(title, msg) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ["OK"]
    });
    return await alert.present();
  }
}
