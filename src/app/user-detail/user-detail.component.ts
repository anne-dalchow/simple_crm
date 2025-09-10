import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import {
  doc,
  Firestore,
  onSnapshot,
  Unsubscribe,
} from '@angular/fire/firestore';
import {
  MatCard,
  MatCardHeader,
  MatCardContent,
  MatCardTitle,
} from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from '../../models/user.class';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { deleteUser } from '@angular/fire/auth';
import { UserAdressEditDialogComponent } from '../user-adress-edit-dialog/user-adress-edit-dialog.component';
import { UserDeleteDialogComponent } from '../user-delete-dialog/user-delete-dialog.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatCard,
    MatTabsModule,
    MatCardHeader,
    MatCardContent,
    MatCardTitle,
    MatButtonModule,
    MatIcon,
    MatMenuModule,
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss',
})
export class UserDetailComponent implements OnInit, OnDestroy {
  userID?: string | null;
  user?: User;

  private routeSubscription?: Subscription;
  private userSubscription?: Unsubscribe;
  private route = inject(ActivatedRoute);
  private firestore = inject(Firestore);
  readonly dialog = inject(MatDialog);

  ngOnInit(): void {
    this.routeSubscription = this.route.paramMap.subscribe((paramMap) => {
      this.userID = paramMap.get('id');
      this.getUser();
    });
  }

  getUser() {
    if (this.userID) {
      const userDoc = doc(this.firestore, 'users', this.userID);
      this.userSubscription = onSnapshot(userDoc, (docSnapshot) => {
        if (docSnapshot.exists()) {
          this.user = new User({ id: docSnapshot.id, ...docSnapshot.data() });
          console.log('User loaded:', this.user);
        } else {
          console.log('User not found');
        }
      });
    }
  }

  openEditAdressMenu() {
    const dialog = this.dialog.open(UserAdressEditDialogComponent);
    if (this.user) {
      // hiermit wird eine Kopie von unserem Nutzerobjekt erstellt um es zu bearbeiten
      dialog.componentInstance.user = new User(this.user.toJSON());
      dialog.componentInstance.userID = this.userID ?? '';
    }
  }

  deleteUser() {
    this.dialog.open(UserDeleteDialogComponent);
  }

  ngOnDestroy(): void {
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription();
    }
  }
}
