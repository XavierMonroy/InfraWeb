import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule} from '@angular/fire/storage';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/login/login.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HttpClientModule } from '@angular/common/http';
import { SlideComponent } from './components/slide/slide.component';
import {MatButtonModule} from '@angular/material/button'; 
import { NzIconModule } from 'ng-zorro-antd/icon';
import {ButtonModule} from 'primeng/button';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ProductosComponent } from './components/productos/productos.component';
import { NavbarUsuarioComponent } from './components/navbar-usuario/navbar-usuario.component';
import { FooterComponent } from './components/footer/footer.component';
import { AgregarProductoComponent } from './components/agregar-producto/agregar-producto.component';
import { MatCardModule} from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ProductosListComponent } from './components/productos-list/productos-list.component';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
 
registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    SlideComponent,
    ProductosComponent,
    NavbarUsuarioComponent,
    FooterComponent,
    AgregarProductoComponent,
    ProductosListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,   
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    NzIconModule,
    ButtonModule,
    NzButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatChipsModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }], 
  bootstrap: [AppComponent]
})
export class AppModule { }
