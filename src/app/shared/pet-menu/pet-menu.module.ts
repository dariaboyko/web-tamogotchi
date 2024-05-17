import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedPetMenuComponent } from './pet-menu.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedPetProgressBarModule } from '../pet-progress-bar';

@NgModule({
  declarations: [SharedPetMenuComponent],
  exports: [SharedPetMenuComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    SharedPetProgressBarModule
  ],
})
export class SharedPetMenuModule { }
