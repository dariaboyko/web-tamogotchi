import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedPetProgressBarComponent } from './pet-progress-bar.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [SharedPetProgressBarComponent],
  exports: [SharedPetProgressBarComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatTooltipModule
  ],
})
export class SharedPetProgressBarModule { }
