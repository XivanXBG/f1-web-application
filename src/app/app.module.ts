import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';

import { FeaturesModule } from './features/features.module';


@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    FeaturesModule,

    
    
  ],
  providers: [],
  bootstrap: [AppComponent, HeaderComponent, FooterComponent]
})
export class AppModule { }
