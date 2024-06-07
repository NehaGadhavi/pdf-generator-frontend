import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private router: Router,
    private toast: ToastrService
  ) {}

  // Get all users
  getAllUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  // Get information of a user by id
  getUserInformation(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/users/${id}`);
  }

  // Add user
  addUser(
    name: string,
    email: string,
    phone: string,
    address: string
  ): Observable<any> {
    return this.http
      .post(`${this.apiUrl}/users/add`, { name, email, phone, address })
      .pipe(
        tap((res) => {
          if (res) {
            this.toast.success('User added successfully.', '', {
              timeOut: 1000,
            });
          }
        })
      );
  }

  // Update user information
  updateUser(
    id: number,
    name?: string,
    email?: string,
    phone?: string,
    address?: string
  ): Observable<any> {
    return this.http
      .patch(`${this.apiUrl}/users/update/${id}`, {
        name,
        email,
        phone,
        address,
      })
      .pipe(
        tap((res) => {
          if (res) {
            this.toast.success('User details updated successfully', '', {
              timeOut: 1000,
            });
          }
        })
      );
  }

  // Remove user
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/users/delete/${id}`).pipe(
      tap((res) => {
        // @ts-ignore
        if (res.success) {
          this.toast.success('User deleted successfully');
        }
      })
    );
  }
}
