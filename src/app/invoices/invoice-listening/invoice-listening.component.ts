import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '../models/invoice';
import { Router } from '@angular/router';
import { MatSnackBar, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { remove } from 'lodash';
import { Subscriber } from 'rxjs/Subscriber';
import 'rxjs/Rx';
import { of as observableOf } from 'rxjs/observable/of';
import { merge } from 'rxjs/observable/merge';
import { map } from 'rxjs/operators/map';
import { startWith } from 'rxjs/operators/startWith';
import { switchMap } from 'rxjs/operators/switchMap';
import { catchError } from 'rxjs/operators/catchError';

@Component({
  selector: 'app-invoice-listening',
  templateUrl: './invoice-listening.component.html',
  styleUrls: ['./invoice-listening.component.scss']
})
export class InvoiceListeningComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['item', 'date', 'due', 'qty', 'rate', 'tax', 'action'];
  dataSource = new MatTableDataSource<Invoice>();
  resultsLength = 0;
  isResultLoading = false;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  constructor(private _invoiceService: InvoiceService,
              private _router: Router,
              private _snackBar: MatSnackBar,
              private ref: ChangeDetectorRef ) {     
  }

  ngOnInit() {
   // this.isResultLoading = true;
    this.ref.detectChanges();
  }

  ngAfterViewInit() {
    
      merge(this.paginator.page, this.sort.sortChange)
        .pipe(
          startWith({}),
          switchMap(() => {
            this.isResultLoading = true;
            return this._invoiceService.getInvoices({
                page: this.paginator.pageIndex, 
                perPage: this.paginator.pageSize, 
                sortField: this.sort.active,
                sortDirection: this.sort.direction,
                filter: ''
                })
          }),
          map(data => {
            this.isResultLoading = false;
            this.resultsLength = data.total;
            return data.docs;
          }),
          catchError(() => {
            this.isResultLoading = false;
            this.errorHandler('Failed to fetch invocies', 'Error');
            return observableOf([]);
          })
        )
        .subscribe(data => {
          this.dataSource.data = data;
        });
  }

  filterText(filterValue: string) {
    this.isResultLoading = true;
    filterValue = filterValue.trim();
    this.paginator.pageIndex = 0;
    this._invoiceService.getInvoices({
      page: this.paginator.pageIndex,
      perPage: this.paginator.pageSize,
      sortField: this.sort.active,
      sortDirection: this.sort.direction,
      filter: filterValue
    })
    .subscribe(data => {
      this.dataSource.data = data.docs;
      this.resultsLength = data.total;
      this.isResultLoading = false;
    }, err => this.errorHandler('Filter Invocies Failed', 'Error'));
  }

  saveBtnHandler() {
    this._router.navigate(['dashboard', 'invoices', 'new']);
  }

  deleteBtnHandler(id) {
    this._invoiceService.deleteInvoice(id)
      .subscribe(data => {
        const removedItems = remove(this.dataSource.data, (item) => {
          return item._id === data._id;
        });
        this.dataSource.data = [...this.dataSource.data]; //update datasource
        this._snackBar.open('Invoice deleted', 'Success');
        console.log(data);
      }, err => this.errorHandler(err, 'Deleteing invoice Failed!'));
  }

  editBtnHandler(id) {
    this._router.navigate(['dashboard', 'invoices', id]);
  }

  private errorHandler(error, message) {
    this.isResultLoading = false;
    console.log(error);
    this._snackBar.open(message, 'Error', {
      duration: 2000
    });
  }

}