import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController } from "@ionic/angular";
import { GameParamsService } from "../game-params.service";
import { GameService } from "../game.service";

@Component({
  selector: "app-create-game-objectives",
  templateUrl: "./create-game-objectives.page.html",
  styleUrls: ["./create-game-objectives.page.scss"]
})
export class CreateGameObjectivesPage implements OnInit {
  opponentType: string;
  publicationType: string;
  gameMode: string;
  gameMap: string;
  deployment: string;
  objectives: string = "random";

  constructor(
    private router: Router,
    private alertController: AlertController,
    private gameParams: GameParamsService,
    private gameService: GameService
  ) {
    this.opponentType = gameParams.getOpponentType();
    this.publicationType = gameParams.getPublicationType();
    this.gameMode = gameParams.getGameMode();
    this.gameMap = gameParams.getGameMap();
    this.deployment = gameParams.getDeployment();
  }

  ngOnInit() {}

  createGame() {
    this.gameService
      .createGame(
        this.opponentType,
        this.publicationType,
        this.gameMode,
        this.gameMap,
        this.deployment,
        this.objectives
      )
      .then(() => {
        this.presentAlert("Success", "Game created successfully");
        this.router.navigate(["/game-list"]);
      })
      .catch(err => {
        console.error(err);
        this.presentAlert(
          "Error",
          "Game could not be created. Please try again later"
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
