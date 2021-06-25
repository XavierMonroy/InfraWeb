import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SlideComponent } from './components/slide/slide.component';
import { ProductosComponent } from './components/productos/productos.component';
import { FooterComponent } from './components/footer/footer.component';
import { AgregarProductoComponent } from './components/agregar-producto/agregar-producto.component';

const routes: Routes = [
  {path:'',redirectTo:'slide',pathMatch:'full'},
  {path:'slide',component:SlideComponent},
  {path:'registrar',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path: 'productos', component:ProductosComponent},
  {path: 'agregar-producto', component:AgregarProductoComponent},
  {path: 'footer', component:FooterComponent},
  {path:'**',redirectTo:'slide',pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
