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
      username: new FormControl('Mitch', Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  onSubmit(): void {
    console.log(this.userForm);
  }
}
