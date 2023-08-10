import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { FeaturesModule } from './features/features.module';
import { AngularFireModule} from "@angular/fire/compat";
import { AngularFireAuthModule} from "@angular/fire/compat/auth"
import { AngularFireStorageModule} from "@angular/fire/compat/storage"
import { AngularFireDatabaseModule} from "@angular/fire/compat/database"
import { AngularFirestoreModule} from "@angular/fire/compat/firestore"
import { environmnet } from 'src/environments/environment';
import { CircuitsModule } from './features/circuits/circuits.module';
import { DatePipe } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    FeaturesModule,
    CircuitsModule,
    AngularFireModule.initializeApp(environmnet.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFirestoreModule
  

  ],
  providers: [DatePipe],
  bootstrap: [AppComponent, HeaderComponent, FooterComponent],
})
export class AppModule { }
