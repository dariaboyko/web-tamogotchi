import { FormControl } from '@angular/forms';

export interface ISignInForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

export interface ISignUpForm {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
}
