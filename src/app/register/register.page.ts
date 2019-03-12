import { Component, OnInit } from "@angular/core";
import { AuthService } from "../auth.service";
import { UserService } from "../user.service";
import { AlertController, LoadingController } from "@ionic/angular";
import { take } from "rxjs/operators";
import { Router } from '@angular/router';

@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"]
})
export class RegisterPage implements OnInit {
  email: string;
  password: string;
  repassword: string;
  username: string;
  loading: any;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private alertController: AlertController,
    public loadingController: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {}

  register() {
    if (!this.email || !this.password || !this.repassword) {
      this.presentAlert("Error", "Fields cannot be empty!");
    } else if (this.password !== this.repassword) {
      this.presentAlert("Error", "Passwords do not match!");
    } else if (this.password.length < 6) {
      this.presentAlert("Error", "Password too short! Atleast 6 characters");
    } else {
      this.presentLoading();

      this.userService
        .checkUserName(this.username)
        .pipe(take(1))
        .subscribe(user => {
          console.log(user);

          if (user) {
            this.loading.dismiss();
            this.presentAlert(
              "Error",
              "Username already exists. Please enter a different username"
            );
          } else {
            this.authService
              .registerWithEmailAndPassword(this.email, this.password)
              .then(async userCredentials => {
                try {
                  await this.userService.createUserName(this.username);
                  const newCredentials = {
                    username: this.username,
                    ...userCredentials
                  }

                  console.log(newCredentials);
                  

                  await this.userService.createUserFromCredentials(newCredentials);

                  this.loading.dismiss();

                  this.presentAlert("Success", "User Created Successfully");
                  this.router.navigate(['/game-list'])
                } catch (err) {
                  this.loading.dismiss();

                  console.error(err);
                  
                  this.presentAlert(
                    "Error",
                    "Something went wrong. Please try again later"
                  );
                }
              })
              .catch(err => {
                this.loading.dismiss();

                if (err.code === "auth/invalid-email") {
                  this.presentAlert("Error", "Invalid Email");
                } else if (err.code == "auth/email-already-in-use") {
                  this.presentAlert(
                    "Error",
                    "User already exists with that email"
                  );
                } else {
                  this.presentAlert(
                    "Error",
                    "Something went wrong. Please try again later"
                  );
                }
              });
          }
        });
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
      message: "Creating User..."
    });
    await this.loading.present();
  }
}
