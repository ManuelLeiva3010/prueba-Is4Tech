import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DetailComponent } from './components/dashboard/detail/detail.component';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ClarityModule,
    BrowserAnimationsModule,
    NgxChartsModule,
    FormsModule,
  ],
  providers: [
    DatePipe,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
