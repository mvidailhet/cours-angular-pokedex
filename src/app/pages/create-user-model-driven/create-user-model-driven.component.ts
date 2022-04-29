import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-user-model-driven',
  templateUrl: './create-user-model-driven.component.html',
  styleUrls: ['./create-user-model-driven.component.scss'],
})
export class CreateUserModelDrivenComponent {
  userForm: FormGroup;

  constructor() {
    this.userForm = new FormGroup({
      username: new FormControl('Mitch'),
      email: new FormControl(),
    });
  }

  onSubmit(): void {
    console.log(this.userForm);
  }
}
