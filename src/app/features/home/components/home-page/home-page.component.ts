import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginService } from '@core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {
  public userName: string;

  constructor(private loginService: LoginService) {
    this.userName = this.loginService.getAccountName();
  }

  public logout(): void {
    this.loginService.logout();
  }
}
