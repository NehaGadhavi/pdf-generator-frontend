import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.scss']
})
export class UserUpdateComponent {
  user: any;

  constructor(
    public dialogRef: MatDialogRef<UserUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: ApiService
  ) {
    this.user = data.user;
  }

  // Update user information
  updateUser(): void {
    this.apiService.updateUser(
      this.user.id,
      this.user.name,
      this.user.email,
      this.user.phone,
      this.user.address
    ).subscribe(() => {
      this.dialogRef.close(true);
    });
  }
}
