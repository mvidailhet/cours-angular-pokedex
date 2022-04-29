import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user-model-driven',
  templateUrl: './create-user-model-driven.component.html',
  styleUrls: ['./create-user-model-driven.component.scss'],
})
export class CreateUserModelDrivenComponent {
  userForm: FormGroup;

  constructor() {
    this.userForm = new FormGroup({
      userData: new FormGroup({
        username: new FormControl('Mitch', Validators.required),
        email: new FormControl(null, [Validators.required, Validators.email]),
      }),
      description: new FormControl(null),
    });
  }

  onSubmit(): void {
    console.log('this.userForm :', this.userForm);
  }

  get username(): FormControl {
    return this.userForm.get('userData.username') as FormControl;
  }

  get email(): FormControl {
    return this.userForm.get('userData.email') as FormControl;
  }
}
