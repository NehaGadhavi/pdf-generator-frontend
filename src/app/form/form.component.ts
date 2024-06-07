import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent {
  userForm?: FormGroup;
  isFormSubmitted: boolean = false;

  constructor(private apiService: ApiService){
    // Form validations
    this.userForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      phone: new FormControl("", [Validators.required,Validators.maxLength(10)]),
      address: new FormControl("", [Validators.required]),
    })
  }

  // On submit the user should be added
  // and form should be reset
  onSubmit(){
    const isFormValid = this.userForm?.valid;
    this.isFormSubmitted = true;
    if (isFormValid) {
      const { name, email, phone, address } = this.userForm?.value;
      this.apiService.addUser(name, email, phone, address).subscribe(() => {
        // Reset the form if the API call is successful
        this.userForm?.reset();
      });
    }
  }
}
