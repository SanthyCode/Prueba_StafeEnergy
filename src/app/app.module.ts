import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { PrecioNacComponent } from './components/precio-nac/precio-nac.component';
import { FormsModule } from '@angular/forms';
import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { GeneracionRecursoComponent } from './components/generacion-recurso/generacion-recurso.component';
import { DemandaAgenteComponent } from './components/demanda-agente/demanda-agente.component';
import { NivelEmbalsesComponent } from './components/nivel-embalses/nivel-embalses.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    PrecioNacComponent,
    GeneracionRecursoComponent,
    DemandaAgenteComponent,
    NivelEmbalsesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    
    NgxEchartsModule.forRoot({
      echarts: echarts
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }