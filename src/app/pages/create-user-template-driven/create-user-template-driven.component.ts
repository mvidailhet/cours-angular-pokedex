import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-create-user-template-driven',
  templateUrl: './create-user-template-driven.component.html',
  styleUrls: ['./create-user-template-driven.component.scss'],
})
export class CreateUserTemplateDrivenComponent {
  onSubmit(userForm: NgForm): void {
    console.log('userForm :', userForm);
    userForm.reset({
      userData: {
        email: 'nice.email@gmail.com',
      },
    });
  }
}
