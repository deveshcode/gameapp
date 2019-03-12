import { Component, OnInit } from '@angular/core';
import { GameParamsService } from '../game-params.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-game-deployment',
  templateUrl: './create-game-deployment.page.html',
  styleUrls: ['./create-game-deployment.page.scss'],
})
export class CreateGameDeploymentPage implements OnInit {

  deployment: string = "random";
  constructor(private gameParams: GameParamsService, private router: Router) {}

  ngOnInit() {
  }

  selectDeployment() {
    this.gameParams.setDeployment(this.deployment);
    this.router.navigate(["/select-objectives"]);
  }
}
