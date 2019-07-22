import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { ByWeightComponent } from './calculator/by-weight/by-weight.component';
import { LengthComponent } from './calculator/by-weight/length/length.component';
import { JobTotalComponent } from './calculator/job-total/job-total.component';
import { RemainingComponent } from './calculator/remaining/remaining.component';
import { HeaderComponent } from './header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRouteModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    CalculatorComponent,
    ByWeightComponent,
    LengthComponent,
    JobTotalComponent,
    RemainingComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRouteModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
