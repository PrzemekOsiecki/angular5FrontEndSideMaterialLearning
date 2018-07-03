import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Invoice, InvoicePaginationResponse } from '../models/invoice';

const BASE_URL = "http://localhost:3000/api"

@Injectable()
export class InvoiceService {

  constructor(private _httpClient: HttpClient) { }

  getInvoices({page, perPage}): Observable<InvoicePaginationResponse> {
    return this._httpClient.get<InvoicePaginationResponse>(`${BASE_URL}/invoices/?page=${page}&perPage=${perPage}`);
  }

  createInvoice(_body: Invoice): Observable<Invoice> {
    return this._httpClient.post<Invoice>(`${BASE_URL}/invoices`, _body)
  }

  deleteInvoice(id: string): Observable<Invoice> {
    return this._httpClient.delete<Invoice>(`${BASE_URL}/invoices/${id}`)
  }

  getInvoiceById(id: string): Observable<Invoice> {
    return this._httpClient.get<Invoice>(`${BASE_URL}/invoices/${id}`);
  }

  updateInvoice(id: string, body: Invoice): Observable<Invoice> {
    return this._httpClient.put<Invoice>(`${BASE_URL}/invoices/${id}`, body);
  }
  
}
