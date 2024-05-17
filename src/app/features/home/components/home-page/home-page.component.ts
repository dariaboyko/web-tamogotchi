import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LoginService, PetService } from '@core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  public userName: string;

  constructor(
    private loginService: LoginService,
    private petService: PetService
  ) {
    this.userName = this.loginService.getAccountName();
  }

  public logout(): void {
    this.loginService.logout();
  }

  ngOnInit(): void {
    this.petService.getPet('93fd03b2-6371-4d0e-8ca4-d39baeccc9ef').subscribe(()=>{
      {
        "id": "93fd03b2-6371-4d0e-8ca4-d39baeccc9ef",
        "name": "Pet",
        "level": 1,
        "expToLevelUp": 80,
        "bore": 0,
        "hunger": 60,
        "tiredness": 40,
        "dirtiness": 30,
        "owner": null
    }
    });
  }
}
