import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class GameParamsService {
  opponentType: string;
  publicationType: string;
  map: string;
  mode: string;
  deployment: string;

  constructor() {}

  getOpponentType() {
    return this.opponentType;
  }

  setOpponentType(type) {
    this.opponentType = type;
  }

  getPublicationType() {
    return this.publicationType;
  }

  setPublicationType(type) {
    this.publicationType = type;
  }

  getGameMode() {
    return this.mode;
  }

  setGameMode(mode) {
    this.mode = mode;
  }

  getGameMap() {
    return this.map;
  }

  setGameMap(map) {
    this.map = map;
  }

  getDeployment() {
    return this.deployment;
  }

  setDeployment(deployment) {
    this.deployment = deployment;
  }
}
