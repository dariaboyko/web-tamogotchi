import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ISharedPetMenuComponentProps, LoginService, PetService } from '@core';
import { IPet } from 'app/core/models/pet.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  public userName: string;
  public pet: IPet | undefined;

  public petMenu$: Subject<ISharedPetMenuComponentProps> = new Subject<ISharedPetMenuComponentProps>();

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
    this.pet = {
      id: '93fd03b2-6371-4d0e-8ca4-d39baeccc9ef',
      name: 'Pet',
      level: 1,
      expToLevelUp: 80,
      bore: 0,
      hunger: 60,
      tiredness: 40,
      dirtiness: 30,
      owner: null
    }
    setTimeout(() => this.petMenu$.next({
      name: 'Pet',
      level: 1,
      exp: 20,
      bore: 0,
      hunger: 60,
      tiredness: 40,
      dirtiness: 30
    }), 1000)
  }

  public playPet(): void {

  }

  public feedPet(): void {

  }

  public sleepPet(): void {

  }

  public washPet(): void {

  }
}
