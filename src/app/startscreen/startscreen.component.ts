import { Component, inject } from '@angular/core';
import { Firestore, collection, addDoc} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-startscreen',
  templateUrl: './startscreen.component.html',
  styleUrls: ['./startscreen.component.scss'],
})
export class StartscreenComponent {
  firestore: Firestore = inject(Firestore);
  constructor(public dialog: MatDialog, private router: Router) {}

  newGame() {
    let game = new Game();
    const gameCollection = collection(this.firestore, 'games');
    addDoc(gameCollection, game.toJson()).then((gameInfo: any) => {
      this.router.navigateByUrl('/game/' + gameInfo['id']);
      console.log('Kopiere die ID und füg sie an den Link an', gameInfo['id']);
    });
  }
}
