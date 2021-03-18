import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InformacionComponent } from './Componentes/informacion/informacion.component';
import { NotFoundComponent } from './Componentes/not-found/not-found.component';
import { AhorroComponent } from './Componentes/ahorro/ahorro.component';
import { SegurosComponent } from './Componentes/seguros/seguros.component';
import { InversionesComponent } from './Componentes/inversiones/inversiones.component';

const routes: Routes = [
  {path: '' , component: InformacionComponent},
  {path: 'ahorro', component: AhorroComponent},
  {path: 'seguros', component: SegurosComponent},
  {path: 'inversiones', component: InversionesComponent},
  {path: '**', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
