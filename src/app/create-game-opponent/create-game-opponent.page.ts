import { Component, OnInit } from "@angular/core";
import { GameParamsService } from "../game-params.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-create-game-opponent",
  templateUrl: "./create-game-opponent.page.html",
  styleUrls: ["./create-game-opponent.page.scss"]
})
export class CreateGameOpponentPage implements OnInit {
  opponent: string = "public";
  constructor(private gameParams: GameParamsService, private router: Router) {}

  ngOnInit() {}

  selectOpponent() {
    this.gameParams.setOpponentType(this.opponent);
    this.router.navigate(["/select-publication"]);
  }
}
