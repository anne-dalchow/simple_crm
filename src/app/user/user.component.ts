import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TooltipPosition } from '@angular/material/tooltip';
import { A11yModule } from '@angular/cdk/a11y';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatIconModule, MatButtonModule, MatTooltipModule, A11yModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent {
  readonly dialog = inject(MatDialog);
  position: TooltipPosition = 'above';

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
