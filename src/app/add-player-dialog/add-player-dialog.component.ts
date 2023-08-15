import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-player-dialog',
  templateUrl: './add-player-dialog.component.html',
  styleUrls: ['./add-player-dialog.component.scss']
})
export class AddPlayerDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<AddPlayerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  name: string = '';

  onNoClick() {
    this.dialogRef.close();
  }

}