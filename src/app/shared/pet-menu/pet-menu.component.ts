import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
} from '@angular/core';
import { ISharedPetMenuComponentProps } from '@core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-shared-pet-menu',
  templateUrl: './pet-menu.component.html',
  styleUrls: ['./pet-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedPetMenuComponent implements OnDestroy {
  public title!: string;
  public bore!: number;
  public dirtiness!: number;
  public hunger!: number;
  public exp!: number;
  public level!: number;
  public tiredness!: number;
  public showSpinner: boolean = true;
  public redColor: string = '#EB9393';
  public disabledButtons: BehaviorSubject<boolean> = new BehaviorSubject(false);

  private props$: Subject<ISharedPetMenuComponentProps> =
    new Subject<ISharedPetMenuComponentProps>();
  private destroy$: Subject<void> = new Subject<void>();

  @Output() feedPet: EventEmitter<void> = new EventEmitter<void>();
  @Output() playPet: EventEmitter<void> = new EventEmitter<void>();
  @Output() sleepPet: EventEmitter<void> = new EventEmitter<void>();
  @Output() washPet: EventEmitter<void> = new EventEmitter<void>();
  @Input()
  set props(v: ISharedPetMenuComponentProps | null) {
    this.showSpinner = true;
    this.cdr.detectChanges();
    if (!v) return;
    this.props$.next(v);
  }

  constructor(private cdr: ChangeDetectorRef) {
    this.props$.pipe(takeUntil(this.destroy$)).subscribe(response => {
      this.title = response.name;
      this.bore = response.bore;
      this.dirtiness = response.dirtiness;
      this.hunger = response.hunger;
      this.exp = response.exp;
      this.level = response.level;
      this.tiredness = response.tiredness;
      this.showSpinner = false;

      this.cdr.detectChanges();
    });
  }

  public feedPetEvent(): void {
    this.feedPet.emit();
    this.disableButtons();
  }

  public playPetEvent(): void {
    this.playPet.emit();
    this.disableButtons();
  }

  public sleepPetEvent(): void {
    this.sleepPet.emit();
    this.disableButtons();
  }

  public washPetEvent(): void {
    this.washPet.emit();
    this.disableButtons();
  }

  private disableButtons(): void {
    this.disabledButtons.next(true);
    setTimeout(() => this.disabledButtons.next(false), 4000);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
