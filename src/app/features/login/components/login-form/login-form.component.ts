import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ISignInForm, ISignUpForm } from '@core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginFormComponent {
  public signInForm: FormGroup<ISignInForm>;
  public signUpForm: FormGroup<ISignUpForm>;
  public showSignInForm: boolean = true;
  public showSignUpForm: boolean = false;
  public showPassword: boolean = false;
  public passwordType: string = 'password';

  constructor(private formBuilder: FormBuilder) {
    this.signInForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]],
    });
    this.signUpForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]],
      confirmPassword: ['', Validators.required],
    });

    this.passwordMatchValidator = this.passwordMatchValidator.bind(this);
    this.signUpForm.get('confirmPassword')?.setValidators(this.passwordMatchValidator);
  }

  public markControlAsUntouched(control: FormControl): void {
    control.markAsUntouched();
  }

  public initSignUpForm(): void {
    this.showSignInForm = false;
    this.showSignUpForm = true;
    this.showPassword = false;
    this.passwordType = this.showPassword ? 'text' : 'password';
  }

  public initSignInForm(): void {
    this.showSignUpForm = false;
    this.showSignInForm = true;
    this.showPassword = false;
    this.passwordType = this.showPassword ? 'text' : 'password';
  }

  signIn() {
    this.signInForm.markAllAsTouched();
    this.signInForm.updateValueAndValidity();
    if (this.signInForm.valid) {
      console.log(this.signInForm);
    } else {
      // Handle form validation errors
    }
  }

  signUp() {
    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.valid) {
      console.log(this.signUpForm);
    } else {
      // Handle form validation errors
    }
  }

  public togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
    this.passwordType = this.showPassword ? 'text' : 'password';
  }

  private passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const passwordControl = this.signUpForm.get('password');
    const confirmPasswordControl = control;

    if (!passwordControl || !confirmPasswordControl) {
      return null;
    }

    if (confirmPasswordControl.value === null || confirmPasswordControl.value === '') {
      return { required: true };
    }

    return passwordControl.value === confirmPasswordControl.value
      ? null
      : { mismatch: true };
  }


}
