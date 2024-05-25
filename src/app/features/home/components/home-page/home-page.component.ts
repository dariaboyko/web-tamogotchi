import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  ISharedChatComponentProps,
  ISharedPetMenuComponentProps,
  LoginService,
  PetService,
} from '@core';
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
  public chatProps$: Subject<ISharedChatComponentProps> =
    new Subject<ISharedChatComponentProps>();

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
  }

  public playPet(): void {
    this.petState$.next(EPetState.Playing);
    setTimeout(
      () =>
        this.petService
          .playPet(this.petId, this.gameId)
          .subscribe(resp => this.updatePet(resp)),
      4000
    );
  }

  public feedPet(): void {
    this.petState$.next(EPetState.Eating);
    setTimeout(
      () =>
        this.petService
          .feedPet(this.petId, this.foodId)
          .subscribe(resp => this.updatePet(resp)),
      4000
    );
  }

  public sleepPet(): void {
    this.petState$.next(EPetState.Sleeping);
    setTimeout(
      () =>
        this.petService
          .sleepPet(this.petId, this.bedroomId)
          .subscribe(resp => this.updatePet(resp)),
      4000
    );
  }

  public washPet(): void {
    this.petState$.next(EPetState.Washing);
    setTimeout(
      () =>
        this.petService
          .washPet(this.petId, this.bathroomId)
          .subscribe(resp => this.updatePet(resp)),
      4000
    );
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
      this.chatProps$.next({ petName: pet.name });
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
        this.chatProps$.next({ petName: response.name });
      });
  }

  private setPetState(pet: IPet): void {
    this.petState$.next(EPetState.Default);
    if (pet.hunger > 50) this.petState$.next(EPetState.Hungry);
    else if (pet.dirtiness > 50) this.petState$.next(EPetState.Dirty);
    else if (pet.tiredness > 50) this.petState$.next(EPetState.Tired);
    else if (pet.bore > 50) this.petState$.next(EPetState.Bored);
  }

  private lvlUp(): void {
    this.petService.lvlUpPet(this.petId).subscribe(response => {
      this.updatePet(response);
    });
  }
}
