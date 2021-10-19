import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DetailComponent } from './components/dashboard/detail/detail.component';

const routes: Routes = [

  {
    path:"dashboard" , component: DashboardComponent
  },
  {
    path:"detail/:iso2Code", component: DetailComponent
  },
  {
    path:"", redirectTo:"dashboard", pathMatch: "full"
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
