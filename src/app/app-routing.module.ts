import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CalculatorComponent } from './calculator/calculator.component';
import { ByWeightComponent } from './calculator/by-weight/by-weight.component';
import { JobTotalComponent } from './calculator/job-total/job-total.component';
import { RemainingComponent } from './calculator/remaining/remaining.component';
import { LengthComponent } from './calculator/by-weight/length/length.component';

const appRoutes: Routes = [
    {path: '', component: CalculatorComponent, pathMatch: 'full' },
    {path: "weight", component: ByWeightComponent},
    {path: "job", component: JobTotalComponent},
    {path: "remaining", component: RemainingComponent},
    {path: "length", component: LengthComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRouteModule {

}