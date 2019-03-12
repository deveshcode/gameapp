import { Component, OnInit } from "@angular/core";
import { GameParamsService } from '../game-params.service';
import { Router } from '@angular/router';

@Component({
  selector: "app-create-game-map",
  templateUrl: "./create-game-map.page.html",
  styleUrls: ["./create-game-map.page.scss"]
})
export class CreateGameMapPage implements OnInit {
  map: string = "etc_2018_map_1";
  constructor(private gameParams: GameParamsService, private router: Router) {}

  ngOnInit() {}

  selectMap() {
    this.gameParams.setGameMap(this.map);
    this.router.navigate(["/select-deployment"]);
  }
}
