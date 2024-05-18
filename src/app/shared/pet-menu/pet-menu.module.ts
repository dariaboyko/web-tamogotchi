import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedPetMenuComponent } from './pet-menu.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedPetProgressBarModule } from '../pet-progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
  declarations: [SharedPetMenuComponent],
  exports: [SharedPetMenuComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    SharedPetProgressBarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
})
export class SharedPetMenuModule {}
