import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InvoiceService } from '../../services/invoice.service';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router, ActivatedRoute } from '@angular/router';
import { Invoice } from '../../models/invoice';

@Component({
  selector: 'app-invoice-form',
  templateUrl: './invoice-form.component.html',
  styleUrls: ['./invoice-form.component.scss']
})
export class InvoiceFormComponent implements OnInit {
  private _invoice: Invoice;
  invoiceForm: FormGroup;

  constructor(private _fb: FormBuilder,
              private _invoiceService: InvoiceService,
              private _snackBar: MatSnackBar,
              private _router: Router,
              private _route: ActivatedRoute) { }

  ngOnInit() {
    this.createForm();
    this.setInvoiceToForm();
  }

  onSubmit() {
    if(this._invoice) {
      this._invoiceService.updateInvoice(this._invoice._id, this.invoiceForm.value)
        .subscribe(data => {
          this._snackBar.open('Invoice updated', 'Success', {
            duration: 2000
          });
          this._router.navigate(['dashboard', 'invoices']);
        }, err =>  this.errorHandler(err, 'Faild to update invoice'));
    } else {
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
  }

  private setInvoiceToForm() {
    this._route.params
      .subscribe(params => {
        let id = params['id']
        if(!id) {
          return ;
        } 
        this._invoiceService.getInvoiceById(id)
          .subscribe(invoice => {
            this._invoice = invoice;
            this.invoiceForm.patchValue(this._invoice); //will atach invoice to FormGruop object 
          }, err => this.errorHandler(err, 'Failde to fetch the invoice'));
      })
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
