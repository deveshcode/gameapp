import { Component, OnInit } from '@angular/core';
import { GameParamsService } from '../game-params.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-game-publication',
  templateUrl: './create-game-publication.page.html',
  styleUrls: ['./create-game-publication.page.scss'],
})
export class CreateGamePublicationPage implements OnInit {
  publication: string="public";
  constructor(private gameParams: GameParamsService, private router: Router) {}
  

  ngOnInit() {
  }

  selectPublication() {
    this.gameParams.setPublicationType(this.publication);
    this.router.navigate(["/select-game-mode"]);
  }
}
