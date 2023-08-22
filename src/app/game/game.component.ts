import { Component, OnInit, inject } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayerDialogComponent } from '../add-player-dialog/add-player-dialog.component';
import { Firestore, docData, doc, updateDoc} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  game!: Game;
  gameId!: string;
  firestore: Firestore = inject(Firestore);
  showMaxPlayersCard: boolean | undefined;
  allCardsDrawn: boolean = false;
  constructor(private route: ActivatedRoute, public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.newGame();
    
    this.route.params.subscribe((params) => {
      this.gameId = params['id'];
      const itemDoc = doc(this.firestore, 'games', this.gameId);
      
      docData(itemDoc).subscribe((game: any) =>  {
      this.game.currentPlayer = game.currentPlayer;
      this.game.playedCards = game.playedCards; 
      this.game.players = game.players; 
      this.game.stack = game.stack;
      this.game.pickCardAnimation = game.pickCardAnimation;
      this.game.currentCard = game.currentCard;
      });
    });
  }

  newGame() {
    this.game = new Game();
    
  }

  takeCard() {
    if (this.game.stack.length === 0) {
      this.allCardsDrawn = true;
      return;
    }
    if (this.game.players.length >= 2) {
      this.pickCard();
    }
  }

  pickCard() {
    this.game.currentCard = this.game.stack.pop() as string;
    this.game.pickCardAnimation = true;
    this.game.currentPlayer++;
    this.game.currentPlayer = this.game.currentPlayer % this.game.players.length;
    this.saveGame();
    setTimeout(() => {
      this.game.playedCards.push(this.game.currentCard!);
      this.game.pickCardAnimation = false;
      this.saveGame();
    }, 1000);
  }

  openDialog(): void {
    if (this.game.players.length < 6) {
      const dialogRef = this.dialog.open(AddPlayerDialogComponent);
      dialogRef.afterClosed().subscribe((name) => {
        if (name && name.length > 0) {
          this.game.players.push(name);
          this.saveGame();
        }
      });
    } else {
      this.showMaxPlayersCard = true;
      setTimeout(() => {
        this.closeMaxPlayersCard();
      }, 2000);
    }
  }

  closeMaxPlayersCard() {
    this.showMaxPlayersCard = false;
  }

  saveGame(){
    const itemDoc = doc(this.firestore, 'games', this.gameId);
    updateDoc(itemDoc, this.game.toJson());
  }
}
