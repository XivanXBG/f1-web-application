import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WikiPageComponent } from './wiki-page/wiki-page.component';
import { DriversComponent } from './drivers/drivers.component';
import { ContructorsComponent } from './contructors/contructors.component';


const routes: Routes = [
  { path: '', component: WikiPageComponent },
  {
    path: 'drivers',
    component: DriversComponent
  },
  {
    path: "contructors",
    component: ContructorsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WikiRoutingModule { }
