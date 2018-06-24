import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { InvoiceListeningComponent } from '../invoices/invoice-listening/invoice-listening.component';
import { ClientListeningComponent } from '../clients/components/client-listening/client-listening.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path : '',
        component: MainContentComponent
      },
      {
        path: 'invoices',
        component: InvoiceListeningComponent
      },
      {
        path: 'clients',
        component: ClientListeningComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
