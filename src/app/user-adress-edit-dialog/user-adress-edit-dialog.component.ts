import { Component, inject } from '@angular/core';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { User } from '../../models/user.class';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { collection, doc, Firestore, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-user-adress-edit-dialog',
  standalone: true,
  imports: [
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatDialogClose,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './user-adress-edit-dialog.component.html',
  styleUrl: './user-adress-edit-dialog.component.scss',
})
export class UserAdressEditDialogComponent {
  private firestore: Firestore = inject(Firestore);
  user: User = new User();
  userID: string | undefined;

  saveUser() {
    if (!this.userID) {
      throw new Error('userID is undefined');
    }
    const userDocRef = doc(this.firestore, 'users', this.userID);
    updateDoc(userDocRef, this.user.toJSON());
  }
}
