import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WikiPageComponent } from './wiki-page/wiki-page.component';
import { DriversComponent } from './drivers/drivers.component';
import { ContructorsComponent } from './contructors/contructors.component';
import { WikiRoutingModule } from './wiki-routing.module';



@NgModule({
  declarations: [
    WikiPageComponent,
    DriversComponent,
    ContructorsComponent,
   
  ],
  imports: [
    CommonModule,
    WikiRoutingModule
  ]
})
export class WikiModule { }
