import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { UserUpdateComponent } from '../user-update/user-update.component';
import { MatDialog } from '@angular/material/dialog';
import { PdfService } from '../services/pdf.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  usersList: any[] = [];
  isPDFGenerated: boolean = false;

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog,
    private pdfService: PdfService
  ) {}
  ngOnInit(): void {
    // Load all users at the beginning
    this.loadUsers();
  }

  // Get all users
  loadUsers() {
    this.apiService.getAllUsers().subscribe((users) => {
      this.usersList = users.data.users;
    });
  }

  // To update the data of user, open the popup
  openUpdateDialog(user: any): void {
    const dialogRef = this.dialog.open(UserUpdateComponent, {
      width: '400px',
      data: { user },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Reload users after update
        this.loadUsers();
      }
    });
  }

  // Remove user
  removeUser(id: number) {
    this.apiService.deleteUser(id).subscribe(() => {
      // Reload users after delete
      this.loadUsers();
    });
  }

  // Generate and download the pdf
  generatePDF(): void {
    this.isPDFGenerated = true;
    this.pdfService.generatePDF(this.usersList);
    setTimeout(() => {
      this.isPDFGenerated = false;
    }, 5000);
  }
}
