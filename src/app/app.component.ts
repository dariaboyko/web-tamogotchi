import { Component, OnDestroy } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { filter, Subscription } from 'rxjs';
import {
  ApiErrorInterceptor,
  ApiInterceptor,
  LoginService,
  TokenInterceptor,
} from '@core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnDestroy {
  title = 'Admixer.WL.UI';
  private routerSubscription: Subscription;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    this.routerSubscription = this.router.events
      .pipe(
        filter(
          (event): event is NavigationEnd => event instanceof NavigationEnd
        )
      )
      .subscribe((event: NavigationEnd) => {
        const includesLogin = event.url.includes('login');
        if (!this.loginService.getToken() && !includesLogin) {
          this.router.navigate(['/login']);
        }
      });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }
}
