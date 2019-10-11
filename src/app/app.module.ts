import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClientComponent } from './components/client/client.component';
import { DataApiService } from 'src/app/services/data-api.service'; 

import { HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FilterPipe } from './models/FilterPipe';
import { VisitsComponent } from './components/visits/visits.component';
import { ReportComponent } from './components/report/report.component';
import { GoogleChartsModule } from 'angular-google-charts';

@NgModule({
  declarations: [
    AppComponent,
    ClientComponent,
    NavBarComponent,
    FilterPipe,
    VisitsComponent,
    ReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    GoogleChartsModule
  ],
  providers: [DataApiService],
  exports: [FilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
