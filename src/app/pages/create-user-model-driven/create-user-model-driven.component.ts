import { Component } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-user-model-driven',
  templateUrl: './create-user-model-driven.component.html',
  styleUrls: ['./create-user-model-driven.component.scss'],
})
export class CreateUserModelDrivenComponent {
  userForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      userData: this.formBuilder.group({
        username: ['Mitch', [Validators.required, this.forbiddenNamesValidator]],
        email: [null, [Validators.required, Validators.email], this.forbiddenEmailsAsyncValidator],
      }),
      description: '',
      hobbies: this.formBuilder.array([]),
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

  get hobbies(): FormArray {
    return this.userForm.get('hobbies') as FormArray;
  }

  onAddHobby(): void {
    const control = new FormControl(null, Validators.required);
    this.hobbies.push(control);
  }

  forbiddenNamesValidator(control: FormControl): { [s: string]: boolean } | null {
    const forbiddenNames = ['Mitch', 'Robert'];
    if (forbiddenNames.includes(control.value)) {
      return { nameIsForbidden: true };
    }
    return null;
  }

  forbiddenEmailsAsyncValidator(control: AbstractControl): Promise<{ [s: string]: boolean } | null> {
    const forbiddenEmails = ['michel.vidailhet@gmail.com'];
    return new Promise<{ [s: string]: boolean } | null>((resolve) => {
      setTimeout(() => {
        if (forbiddenEmails.includes(control.value)) {
          resolve({ emailIsForbidden: true });
        } else {
          resolve(null);
        }
      }, 3000);
    });
  }
}
