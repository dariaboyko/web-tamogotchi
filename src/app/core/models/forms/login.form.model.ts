import { FormControl } from '@angular/forms';

export interface ISignInForm {
  username: FormControl<string | null>;
  password: FormControl<string | null>;
}

export interface ISignUpForm {
  username: FormControl<string | null>;
  password: FormControl<string | null>;
  confirmPassword: FormControl<string | null>;
}
