import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedCatPetComponent } from './cat-pet.component';
import { NgOptimizedImage } from '@angular/common';

@NgModule({
  declarations: [SharedCatPetComponent],
  exports: [SharedCatPetComponent],
  imports: [CommonModule, NgOptimizedImage],
})
export class SharedCatPetModule {}
