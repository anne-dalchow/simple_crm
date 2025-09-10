import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdressEditDialogComponent } from './user-adress-edit-dialog.component';

describe('UserAdressEditDialogComponent', () => {
  let component: UserAdressEditDialogComponent;
  let fixture: ComponentFixture<UserAdressEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAdressEditDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserAdressEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
