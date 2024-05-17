import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-shared-pet-progress-bar',
  templateUrl: './pet-progress-bar.component.html',
  styleUrls: ['./pet-progress-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedPetProgressBarComponent {
  @Input() color: string = '#93EBA6';
  @Input() progressAmount: number = 0;

  get segments() {
    console.log(this.progressAmount)
    return Array.from({ length: 10 }, (_, i) => (i + 1) * 10);
  }
}
