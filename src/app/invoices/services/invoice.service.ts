import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Invoice } from '../models/invoice';

const BASE_URL = "http://localhost:3000/api"

@Injectable()
export class InvoiceService {

  constructor(private _httpClient: HttpClient) { }

  getInvoices(): Observable<Invoice[]> {
    return this._httpClient.get<Invoice[]>(`${BASE_URL}/invoices`);
  }

  createInvoice(_body: Invoice): Observable<Invoice> {
    return this._httpClient.post<Invoice>(`${BASE_URL}/invoices`, _body)
  }
}
