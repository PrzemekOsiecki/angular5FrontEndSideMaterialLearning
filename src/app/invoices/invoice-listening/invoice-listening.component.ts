import { Component, OnInit, ViewChild } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '../models/invoice';
import { Router } from '@angular/router';
import { MatSnackBar, MatPaginator } from '@angular/material';
import { remove } from 'lodash';
import { Subscriber } from 'rxjs/Subscriber';
import 'rxjs/Rx';

@Component({
  selector: 'app-invoice-listening',
  templateUrl: './invoice-listening.component.html',
  styleUrls: ['./invoice-listening.component.scss']
})
export class InvoiceListeningComponent implements OnInit {

  displayedColumns: string[] = ['item', 'date', 'due', 'qty', 'rate', 'tax', 'action'];
  dataSource: Invoice[] = [];
  resultsLength = 0;
  isResultLoading = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private _invoiceService: InvoiceService,
              private _router: Router,
              private _snackBar: MatSnackBar ) {     
  }

  ngOnInit() {
    this.isResultLoading = true;
    this.paginator
      .page
      .flatMap(data => {
        return this._invoiceService.getInvoices({page: ++data.pageIndex, perPage: data.pageSize})
      })
      .subscribe(data => {
        this.dataSource = data.docs;
        this.resultsLength = data.total;
        this.isResultLoading = false;
      }, err => this.errorHandler(err, 'Failed to fetch invoice'));
   
      this.populateInvoices();
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

  private populateInvoices() {
    this.isResultLoading = true;
    this._invoiceService.getInvoices({page: 1, perPage: 10})
    .subscribe(data => {
      this.dataSource = data.docs;
      this.resultsLength = data.total;
      console.log(data);
    }, err => {
      console.log(err);
    }, () => {
      this.isResultLoading = false;
    });
  }

  private errorHandler(error, message) {
    this.isResultLoading = false;
    console.log(error);
    this._snackBar.open(message, 'Error', {
      duration: 2000
    });
  }

}