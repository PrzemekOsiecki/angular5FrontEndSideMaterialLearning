import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '../models/invoice';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { remove } from 'lodash';

@Component({
  selector: 'app-invoice-listening',
  templateUrl: './invoice-listening.component.html',
  styleUrls: ['./invoice-listening.component.scss']
})
export class InvoiceListeningComponent implements OnInit {

  displayedColumns: string[] = ['item', 'date', 'due', 'qty', 'rate', 'tax', 'action'];
  dataSource: Invoice[] = [];

  constructor(private _invoiceService: InvoiceService,
              private _router: Router,
              private _snackBar: MatSnackBar ) {     
  }

  ngOnInit() {
    this._invoiceService
      .getInvoices()
      .subscribe(data => {
        this.dataSource = data;
        console.log(data);
      }, err => {
        console.log(err);
      });
  }

  saveBtnHandler() {
    this._router.navigate(['dashboard', 'invoices', 'new']);
  }

  deleteBtnHandler(id) {
    this._invoiceService.deleteInvoice(id)
      .subscribe(data => {
        const removedItems = remove(this.dataSource, (item) => {
          return item._id === data._id;
        });
        this.dataSource = [...this.dataSource]; //update datasource
        this._snackBar.open('Invoice deleted', 'Success');
        console.log(data);
      }, err => this.errorHandler(err, 'Deleteing invoice Failed!'));
  }

  editBtnHandler(id) {
    this._router.navigate(['dashboard', 'invoices', id]);
  }

  private errorHandler(error, message) {
    console.log(error);
    this._snackBar.open(message, 'Error', {
      duration: 2000
    });
  }

}