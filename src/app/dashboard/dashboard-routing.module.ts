import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { InvoiceListeningComponent } from '../invoices/invoice-listening/invoice-listening.component';
import { ClientListeningComponent } from '../clients/components/client-listening/client-listening.component';
import { InvoiceFormComponent } from '../invoices/components/invoice-form/invoice-form.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'invoices',
        component: InvoiceListeningComponent
      },
      {
        path: 'invoices/new',
        component: InvoiceFormComponent
      },
      {
        path: 'clients',
        component: ClientListeningComponent
      },
      {
        path: 'invoices/:id',
        component: InvoiceFormComponent
      },
      {
        path: '**',
        redirectTo: 'invoices'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
