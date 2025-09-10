import { Component, inject } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { User } from '../../models/user.class';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MatProgressBar } from '@angular/material/progress-bar';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [
    MatDialogModule,
    MatButton,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    CommonModule,
    FormsModule,
    MatProgressBar,
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
})
export class DialogAddUserComponent {
  private firestore: Firestore = inject(Firestore);

  user: User = new User();
  birthDate: Date | undefined;
  loading: boolean = false;

  constructor() {}

  async saveUser() {
    this.user.birthDate = this.birthDate ? this.birthDate.getTime() : 0;
    const usersCollection = collection(this.firestore, 'users');
    this.loading = true;
    try {
      const result = await addDoc(usersCollection, this.user.toJSON());
      this.loading = false;
    } catch (error) {
      console.error('Error adding user:', error);
    }
  }
}
