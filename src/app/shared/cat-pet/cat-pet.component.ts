import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  OnDestroy,
  Input,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  CatDefaultSrc,
  CatDefaultClosingEyesSrc,
  CatDefaultClosedEyesSrc,
  CatHungrySrc,
  CatTiredSrc,
  CatDirtySrc,
  CatWashingSrc,
  CatSleepingSrc,
  CatEatingSrc,
  CatHappySrc,
  CatBoredSrc,
} from '@core';
import { EPetState } from 'app/core/enums';

@Component({
  selector: 'app-shared-cat-pet',
  templateUrl: './cat-pet.component.html',
  styleUrls: ['./cat-pet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedCatPetComponent implements OnDestroy, OnInit {
  @Input() petState?: BehaviorSubject<EPetState>;

  public maxHeightClass: BehaviorSubject<boolean> = new BehaviorSubject(true);
  public srcString: BehaviorSubject<string> = new BehaviorSubject(
    CatDefaultSrc
  );
  public CatWashingSrc = CatWashingSrc;
  public CatSleepingSrc = CatSleepingSrc;
  public CatEatingSrc = CatEatingSrc;
  public CatHappySrc = CatHappySrc;
  private intervalId: any;
  private timeouts: any[] = [];

  constructor() {
    if (this.petState) {
      this.petState.subscribe(val => {
        this.stopBlinking();
        this.handlePetState(val);
      });
    }
  }

  ngOnInit(): void {
    if (this.petState) {
      this.handlePetState(this.petState.getValue());
      this.petState.subscribe(val => {
        this.stopBlinking();
        this.handlePetState(val);
      });
    }
  }

  ngOnDestroy(): void {
    this.stopBlinking();
  }

  private startBlinking(): void {
    this.intervalId = setInterval(() => {
      const timeout1 = setTimeout(() => {
        this.srcString.next(CatDefaultClosingEyesSrc);
        const timeout2 = setTimeout(() => {
          this.srcString.next(CatDefaultClosedEyesSrc);
          const timeout3 = setTimeout(() => {
            this.srcString.next(CatDefaultClosingEyesSrc);
            const timeout4 = setTimeout(() => {
              this.srcString.next(CatDefaultSrc);
            }, 100);
            this.timeouts.push(timeout4);
          }, 100);
          this.timeouts.push(timeout3);
        }, 100);
        this.timeouts.push(timeout2);
      }, 200);
      this.timeouts.push(timeout1);
    }, 3000);
  }

  private stopBlinking(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    this.timeouts.forEach(timeoutId => clearTimeout(timeoutId));
    this.timeouts = [];
  }

  private handlePetState(petState: EPetState): void {
    switch (petState) {
      case EPetState.Default:
        this.srcString.next(CatDefaultSrc);
        this.startBlinking();
        this.maxHeightClass.next(true);
        break;
      case EPetState.Hungry:
        this.srcString.next(CatHungrySrc);
        this.maxHeightClass.next(false);
        break;
      case EPetState.Tired:
        this.srcString.next(CatTiredSrc);
        this.maxHeightClass.next(false);
        break;
      case EPetState.Dirty:
        this.srcString.next(CatDirtySrc);
        this.maxHeightClass.next(false);
        break;
      case EPetState.Bored:
        this.srcString.next(CatBoredSrc);
        this.maxHeightClass.next(true);
        break;
      case EPetState.Happy:
        this.srcString.next(CatHappySrc);
        this.maxHeightClass.next(false);
        break;
      case EPetState.Eating:
        this.srcString.next(CatEatingSrc);
        this.maxHeightClass.next(false);
        break;
      case EPetState.Sleeping:
        this.srcString.next(CatSleepingSrc);
        this.maxHeightClass.next(false);
        break;
      case EPetState.Playing:
        this.srcString.next(CatHappySrc);
        this.maxHeightClass.next(false);
        break;
      case EPetState.Washing:
        this.srcString.next(CatWashingSrc);
        this.maxHeightClass.next(true);
        break;
      default:
        this.srcString.next(CatDefaultSrc);
        this.startBlinking();
        this.maxHeightClass.next(true);
    }
  }
}
