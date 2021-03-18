import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Modulos para la base de datos
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule} from '@angular/fire/firestore'; 
import { AngularFireAuthModule} from '@angular/fire/auth';


import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Componentes/header/header.component';
import { FooterComponent } from './Componentes/footer/footer.component';
import { NotFoundComponent } from './Componentes/not-found/not-found.component';
import { InformacionComponent } from './Componentes/informacion/informacion.component';
import { RouterModule } from '@angular/router';
import { UsersServicio } from './Servicios/users.service';
import { AhorroComponent } from './Componentes/ahorro/ahorro.component';
import { SegurosComponent } from './Componentes/seguros/seguros.component';
import { InversionesComponent } from './Componentes/inversiones/inversiones.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NotFoundComponent,
    InformacionComponent,
    AhorroComponent,
    SegurosComponent,
    InversionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    //Conectar Cloud Firestone, llaves en Enviroment
    AngularFireModule.initializeApp(environment.datosfirestore, 'EducacionFinanciera'),
    AngularFirestoreModule,
    AngularFireAuthModule,
    //Esas 3 para la Firebase
    //
    FormsModule,

    
  ],
  providers: [
    UsersServicio
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
