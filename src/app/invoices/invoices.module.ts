import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceListeningComponent } from './invoice-listening/invoice-listening.component';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule
  ],
  declarations: [InvoiceListeningComponent],
  exports: [InvoiceListeningComponent]
})
export class InvoicesModule { }
