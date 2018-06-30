import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '../models/invoice';
import { Router } from '@angular/router';

@Component({
  selector: 'app-invoice-listening',
  templateUrl: './invoice-listening.component.html',
  styleUrls: ['./invoice-listening.component.scss']
})
export class InvoiceListeningComponent implements OnInit {

  displayedColumns: string[] = ['item', 'date', 'due', 'qty', 'rate', 'tax', 'action'];
  dataSource: Invoice[] = [];

  constructor(private _invoiceService: InvoiceService,
              private _router: Router ) {     
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

}