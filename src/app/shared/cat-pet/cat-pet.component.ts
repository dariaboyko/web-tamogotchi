import { ChangeDetectionStrategy, Component, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CatDefaultSrc, CatDefaultClosingEyesSrc, CatDefaultClosedEyesSrc } from '@core';

@Component({
  selector: 'app-shared-cat-pet',
  templateUrl: './cat-pet.component.html',
  styleUrls: ['./cat-pet.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedCatPetComponent implements OnInit, OnDestroy {
  public srcString: BehaviorSubject<string> = new BehaviorSubject(CatDefaultSrc);
  private intervalId: any;

  ngOnInit(): void {
    this.startBlinking();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private startBlinking(): void {
    this.intervalId = setInterval(() => {
      this.srcString.next(CatDefaultClosingEyesSrc);
      setTimeout(() => {
        this.srcString.next(CatDefaultClosedEyesSrc);
        setTimeout(() => {
          this.srcString.next(CatDefaultClosingEyesSrc);
          setTimeout(() => {
            this.srcString.next(CatDefaultSrc);
          }, 100);
        }, 100);
      }, 200);
    }, 3000);
  }
}
