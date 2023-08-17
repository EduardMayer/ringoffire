import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { AddPlayerDialogComponent } from '../add-player-dialog/add-player-dialog.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class GameComponent implements OnInit {
  pickCardAnimation = false;
  currentCard: string | undefined;
  game!: Game;
  showMaxPlayersCard: boolean | undefined;
  allCardsDrawn: boolean = false;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.newGame();
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
    this.currentCard = this.game.stack.pop();
    this.pickCardAnimation = true;
    this.game.currentPlayer++;
    this.game.currentPlayer =
      this.game.currentPlayer % this.game.players.length;
    setTimeout(() => {
      this.game.playedCards.push(this.currentCard!);
      this.pickCardAnimation = false;
    }, 1000);
  }

  openDialog(): void {
    if (this.game.players.length < 6) {
      const dialogRef = this.dialog.open(AddPlayerDialogComponent);
      dialogRef.afterClosed().subscribe((name) => {
        if (name && name.length > 0) {
          this.game.players.push(name);
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
}
