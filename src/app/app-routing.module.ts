import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrecioNacComponent } from './components/precio-nac/precio-nac.component';
import { GeneracionRecursoComponent } from './components/generacion-recurso/generacion-recurso.component';
import { DemandaAgenteComponent } from './components/demanda-agente/demanda-agente.component';
import { NivelEmbalsesComponent } from './components/nivel-embalses/nivel-embalses.component';

const routes: Routes = [
  { path: '', redirectTo: 'precio-nac', pathMatch: 'full' },
  { path: 'precio-nac', component: PrecioNacComponent },
  { path: 'generacion', component: GeneracionRecursoComponent },
  { path: 'demanda', component: DemandaAgenteComponent },
  { path: 'embalses', component: NivelEmbalsesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
