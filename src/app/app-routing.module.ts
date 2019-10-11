import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ClientComponent} from './components/client/client.component';
import {ReportComponent} from './components/report/report.component';


const routes: Routes = [
  {path:'', component: ClientComponent},
  {path:'report', component: ReportComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
