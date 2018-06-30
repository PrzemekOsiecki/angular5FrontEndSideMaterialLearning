import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InvoiceListeningComponent } from './invoice-listening/invoice-listening.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/material.module';
import { HttpClientModule } from '@angular/common/http';
import { InvoiceService } from './services/invoice.service';
import { InvoiceFormComponent } from './components/invoice-form/invoice-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [InvoiceListeningComponent, InvoiceFormComponent],
  exports: [InvoiceListeningComponent, InvoiceFormComponent],
  providers: [InvoiceService]
})
export class InvoicesModule { }
