import { Component } from '@angular/core';
import { MatDialogContent, MatDialogActions } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-user-delete-dialog',
  standalone: true,
  imports: [MatDialogContent, MatDialogActions, MatDialogModule],
  templateUrl: './user-delete-dialog.component.html',
  styleUrl: './user-delete-dialog.component.scss',
})
export class UserDeleteDialogComponent {}
