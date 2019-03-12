import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import {
  AlertController,
  LoadingController,
  MenuController,
  Platform
} from "@ionic/angular";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { GooglePlus } from "@ionic-native/google-plus/ngx";
import { UserService } from "../user.service";
import { Facebook } from "@ionic-native/facebook/ngx";

@Component({
  selector: "app-login",
  templateUrl: "./login.page.html",
  styleUrls: ["./login.page.scss"]
})
export class LoginPage implements OnInit {
  email: string;
  password: string;
  loading: any;

  constructor(
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router,
    private loadingController: LoadingController,
    private menuController: MenuController,
    private platform: Platform,
    private gplus: GooglePlus,
    private userService: UserService,
    private facebook: Facebook
  ) {
    authService.isLoggedIn().then(user => {
      if (user) {
        this.router.navigate(["game-list"]);
      }
    });
    this.menuController.enable(false);
  }

  ngOnInit() {}

  ionViewDidLoad() {
    this.menuController.enable(false);
  }

  login() {
    if (this.email && this.password) {
      this.presentLoading();
      this.authService
        .loginWithEmailAndPassword(this.email, this.password)
        .then(() => {
          this.loading.dismiss();
          this.router.navigate(["/game-list"]);
        })
        .catch(err => {
          console.error(err);
          this.loading.dismiss();
          this.presentAlert("Error", "Invalid Email/Password");
        });
    } else {
      this.presentAlert("Error", "Invalid Email/Password");
    }
  }

  loginWithProvider(provider: string) {
    this.authService.signInWithProvider(provider).then(data => {
      if (data.additionalUserInfo.isNewUser) {
        this.userService.createUserFromCredentials(data);
      }
      this.loading.dismiss();

      this.router.navigateByUrl("game-list");
    });
  }

  facebookLogin(): Promise<any> {
    this.presentLoading();

    if (this.platform.is("cordova")) {
      return this.facebook
        .login(["email"])
        .then(response => {
          this.authService
            .signInWithFacebook(response.authResponse.accessToken)
            .then(userCredentials => {
              if (userCredentials["additionalUserInfo"].isNewUser) {
                this.userService.createUserFromCredentials(userCredentials);
              }
              this.loading.dismiss();
              this.router.navigateByUrl("game-list");
            });
        })
        .catch(error => {
          console.log(error);
          this.loading.dismiss();
          this.presentAlert("Error", "Something went wrong");
        });
    } else {
      this.loginWithProvider("facebook");
    }
  }

  googleLogin() {
    this.presentLoading();

    if (this.platform.is("cordova")) {
      this.nativeGoogleLogin()
        .then(userCredentials => {
          if (userCredentials.additionalUserInfo.isNewUser) {
            this.userService.createUserFromCredentials(userCredentials);
          }

          this.loading.dismiss();
          this.router.navigateByUrl("game-list");
        })
        .catch(err => {
          this.loading.dismiss();
          console.error(err);
          
          this.presentAlert("Error", "Something went wrong");
        });
    } else {
      // When ionic serve is used

      this.loginWithProvider("google");
    }
  }

  async nativeGoogleLogin() {
    try {
      const user = await this.gplus.login({
        webClientId: environment.webClientId,
        offline: true,
        scopes: "profile email"
      });

      return this.authService.signInWithGoogle(user);
    } catch (err) {
      throw err;
    }
  }

  async presentAlert(title, msg) {
    const alert = await this.alertController.create({
      header: title,
      message: msg,
      buttons: ["OK"]
    });
    return await alert.present();
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: "Logging In..."
    });
    await this.loading.present();
  }
}
