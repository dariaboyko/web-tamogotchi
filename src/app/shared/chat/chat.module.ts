import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedPetChatComponent } from './chat.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { SharedPetProgressBarModule } from '../pet-progress-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ChatService } from './chat.service';

@NgModule({
  declarations: [SharedPetChatComponent],
  exports: [SharedPetChatComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    SharedPetProgressBarModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    ReactiveFormsModule,
    FormsModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
  ],
  providers: [ChatService],
})
export class SharedChatModule {}
