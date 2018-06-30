import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InvoiceService } from '../../services/invoice.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {

  invoiceForm: FormGroup;

  constructor(private _fb: FormBuilder,
              private _invoiceService: InvoiceService,
              private _snackBar: MatSnackBar,
              private _router: Router) { }

  ngOnInit() {
    this.createForm();
  }

  onSubmit() {
    this._invoiceService.createInvoice(this.invoiceForm.value)
      .subscribe(data => {
        this._snackBar.open('Invoice created', 'action Success!', {
          duration: 2000
        });
        this.invoiceForm.reset();
        console.log(data);
        this._router.navigate(['dashboard', 'invoices']);
      }, err => {
        this.errorHandler(err, 'Faild to create invoice')
      });
  }

  private createForm() {
    this.invoiceForm = this._fb.group({
      item: ['', Validators.required],
      date: ['', Validators.required],
      due: ['', Validators.required],
      qty: ['', Validators.required],
      tax: '',
      rate: ''
    });
  }

  private errorHandler(error, message) {
    console.log(error);
    this._snackBar.open(message, 'Error', {
      duration: 2000
    });
  }

}
