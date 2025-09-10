import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TooltipPosition } from '@angular/material/tooltip';
import { A11yModule } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import {
  collection,
  doc,
  Firestore,
  onSnapshot,
} from '@angular/fire/firestore';
import { Unsubscribe } from '@angular/fire/auth';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    A11yModule,
    MatCardModule,
  ],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit, OnDestroy {
  user: User = new User();
  birthDate: Date | undefined;

  readonly dialog = inject(MatDialog);
  readonly router = inject(Router);
  position: TooltipPosition = 'above';

  private firestore: Firestore = inject(Firestore);

  allUsers: any[] = [];
  private unsubscribeUsers?: Unsubscribe;

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    const usersCollection = collection(this.firestore, 'users');
    this.unsubscribeUsers = onSnapshot(usersCollection, (snapshot) => {
      this.allUsers = [];
      snapshot.forEach((doc) =>
        this.allUsers.push({ id: doc.id, ...doc.data() })
      );
      console.log(this.allUsers);
    });
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }

  navigateToUser(userId: string) {
    this.router.navigate(['/user', userId]);
  }

  ngOnDestroy() {
    if (this.unsubscribeUsers) {
      this.unsubscribeUsers();
    }
  }
}
