import { Component, OnInit } from "@angular/core";
import { GameService } from "../game.service";
import { MenuController } from "@ionic/angular";

@Component({
  selector: "app-game-list",
  templateUrl: "./game-list.page.html",
  styleUrls: ["./game-list.page.scss"]
})
export class GameListPage implements OnInit {
  games;
  constructor(
    private gameService: GameService,
    private menuController: MenuController
  ) {
    this.games = gameService.getAllGames();
  }

  ngOnInit() {}

  ionViewDidEnter() {
    this.menuController.enable(true);
  }
}
