import { Component, OnInit } from "@angular/core";
import { GameParamsService } from "../game-params.service";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-create-game-mode",
  templateUrl: "./create-game-mode.page.html",
  styleUrls: ["./create-game-mode.page.scss"]
})
export class CreateGameModePage implements OnInit {
  gameMode: number = 210;
  constructor(
    private gameParams: GameParamsService,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {}

  selectGameMode() {
    if (this.gameMode == -1) {
      this.presentAlertPrompt();
    } else {
      this.gameParams.setGameMode(this.gameMode);
      this.router.navigate(["/select-game-map"]);
    }
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      header: "Enter time",
      inputs: [
        {
          name: "hours",
          type: "number",
          placeholder: "Hours"
        },
        {
          name: "minutes",
          type: "number",
          placeholder: "Minutes"
        }
      ],
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {
            console.log("Confirm Cancel");
          }
        },
        {
          text: "Ok",
          handler: data => {
            if (data.hours && data.minutes && ! isNaN(data.hours) && ! isNaN(data.minutes)) {
              this.gameMode = +data.hours * 60 + +data.minutes;

              this.gameParams.setGameMode(this.gameMode);
              this.router.navigate(["/select-game-map"]);
            } else {
              this.presentAlert("Error", "Invalid values for hours and minutes. Must be numbers")
            }
          }
        }
      ]
    });

    await alert.present();
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
