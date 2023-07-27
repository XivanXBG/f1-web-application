import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import {  HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
   
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    RouterLink,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule
  ]
})
export class CoreModule { }
