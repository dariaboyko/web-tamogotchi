import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ISharedPetMenuComponentProps, LoginService, PetService } from '@core';
import { EPetState } from 'app/core/enums';
import { IPet } from 'app/core/models/pet.model';
import { BehaviorSubject, Subject } from 'rxjs';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
  public userName: string;
  public pet: IPet | undefined;
  public petMenu$: Subject<ISharedPetMenuComponentProps> =
    new Subject<ISharedPetMenuComponentProps>();
  public petState$: BehaviorSubject<EPetState> = new BehaviorSubject<EPetState>(
    EPetState.Default
  );

  private petId: string = '93fd03b2-6371-4d0e-8ca4-d39baeccc9ef';
  private foodId: string = 'ccc45d09-d042-42fe-bf7c-3a77e4263a90';
  private gameId: string = 'c2f37a34-384e-4b07-87c8-f513c1d5019b';
  private bathroomId: string = '7eec8616-9505-417a-b322-993236bc1bc3';
  private bedroomId: string = 'd056feb8-b2cb-48c5-8a76-488f54319719';

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
    this.updatePet();
    // this.pet = {
    //   id: '93fd03b2-6371-4d0e-8ca4-d39baeccc9ef',
    //   name: 'Pet',
    //   level: 1,
    //   expToLevelUp: 80,
    //   bore: 0,
    //   hunger: 60,
    //   tiredness: 40,
    //   dirtiness: 30,
    //   owner: null,
    // };
    // setTimeout(
    //   () =>
    //     this.petMenu$.next({
    //       name: 'Pet',
    //       level: 1,
    //       exp: 20,
    //       bore: 0,
    //       hunger: 60,
    //       tiredness: 40,
    //       dirtiness: 30,
    //     }),
    //   1000
    // );
  }

  public playPet(): void {
    this.petService
      .playPet(this.petId, this.gameId)
      .subscribe(resp => this.updatePet(resp));
  }

  public feedPet(): void {
    this.petService
      .feedPet(this.petId, this.foodId)
      .subscribe(resp => this.updatePet(resp));
  }

  public sleepPet(): void {
    this.petService
      .sleepPet(this.petId, this.bedroomId)
      .subscribe(resp => this.updatePet(resp));
  }

  public washPet(): void {
    this.petService
      .washPet(this.petId, this.bathroomId)
      .subscribe(resp => this.updatePet(resp));
  }

  private updatePet(pet?: IPet): void {
    if (pet) {
      if (pet.expToLevelUp === 0) {
        this.lvlUp();
        return;
      }
      this.pet = pet;
      this.setPetState(pet);
      this.petMenu$.next({
        name: pet.name,
        level: pet.level,
        exp: 100 - pet.expToLevelUp,
        bore: pet.bore,
        hunger: pet.hunger,
        tiredness: pet.tiredness,
        dirtiness: pet.dirtiness,
      });
    } else
      this.petService.getPet(this.petId).subscribe(response => {
        if (response.expToLevelUp === 0) {
          this.lvlUp();
          return;
        }
        this.pet = response;
        this.setPetState(response);
        this.petMenu$.next({
          name: response.name,
          level: response.level,
          exp: 100 - response.expToLevelUp,
          bore: response.bore,
          hunger: response.hunger,
          tiredness: response.tiredness,
          dirtiness: response.dirtiness,
        });
      });
  }

  private setPetState(pet: IPet): void {
    this.petState$.next(EPetState.Default);
    if (pet.hunger > 50) this.petState$.next(EPetState.Hungry);
    else if (pet.dirtiness > 50) this.petState$.next(EPetState.Dirty);
    else if (pet.tiredness > 50) this.petState$.next(EPetState.Tired);
  }

  private lvlUp(): void {
    this.petService.lvlUpPet(this.petId).subscribe(response => {
      this.updatePet(response);
    });
  }
}
