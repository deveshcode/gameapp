import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class GameService {
  constructor(private db: AngularFirestore) {}

  createGame(
    opponentType,
    publicationType,
    gameMode,
    gameMap,
    deployment,
    objectives
  ) {
    const game = {
      opponentType: opponentType,
      publicationType: publicationType,
      gameMode: gameMode,
      gameMap: gameMap,
      deployment: deployment,
      objectives: objectives
    };
    console.log(game);
    return this.db.collection(`games/`).add(game);
  }

  getAllGames() {
    return this.db.collection(`games/`).valueChanges();
  }
}
