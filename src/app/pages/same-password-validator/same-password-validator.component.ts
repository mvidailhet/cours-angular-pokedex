import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-same-password-validator',
  templateUrl: './same-password-validator.component.html',
  styleUrls: ['./same-password-validator.component.scss'],
})
export class SamePasswordValidatorComponent {
  form: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {
    this.form = fb.group(
      {
        password: ['', [Validators.required]],
        confirm_password: ['', [Validators.required]],
      },
      {
        validators: this.confirmedValidator('password', 'confirm_password'),
      },
    );
  }

  get f() {
    return this.form.controls;
  }

  get formErrors() {
    return this.form.errors;
  }

  submit() {
    console.log(this.form);
  }

  confirmedValidator(controlName: string, matchingControlName: string) {
    return (control: AbstractControl): ValidationErrors | null => {
      const passwordControl = control.get(controlName);
      const matchingControl = control.get(matchingControlName);
      if (!matchingControl || !passwordControl) {
        throw new Error('did not find control');
      }
      if (passwordControl.value === matchingControl.value) return null;
      const errors = { confirmedValidator: true };
      return errors;
    };
  }
}
