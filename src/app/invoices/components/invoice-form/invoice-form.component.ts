import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { InvoiceService } from '../../services/invoice.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {

  invoiceForm: FormGroup;

  constructor(private _fb: FormBuilder,
              private _invoiceService: InvoiceService) { }

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    this._invoiceService.createInvoice(this.invoiceForm.value)
      .subscribe(data => {
        this.invoiceForm.reset();
        console.log(data);
      }, err => {
        console.log(err);
      });
  }

  createForm() {
    this.invoiceForm = this._fb.group({
      item: '',
      date: '',
      due: '',
      qty: '',
      tax: '',
      rate: ''
    });
  }

}
