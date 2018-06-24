import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientListeningComponent } from './components/client-listening/client-listening.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [ClientListeningComponent],
  exports: [ClientListeningComponent]
})
export class ClientsModule { }
