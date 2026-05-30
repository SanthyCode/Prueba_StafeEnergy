import { Component, OnInit, inject } from '@angular/core';
import { PrecBolsNaciService } from '../../core/services/api/prec-bols-naci.service';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-generacion-recurso',
  templateUrl: './generacion-recurso.component.html',
  styleUrls: ['./generacion-recurso.component.scss']
})
export class GeneracionRecursoComponent implements OnInit {
  private api = inject(PrecBolsNaciService);

  fechaInicio: string = '2025-05-01';
  fechaFin: string = '2025-05-05';
  dcResources: Set<string> = new Set(); // Para filtrar plantas DC
  chartOptions: EChartsOption = {};
  loading = false;

  ngOnInit() {
    this.cargarCatalogoRecursos();
  }

  cargarCatalogoRecursos() {
  this.api.getLists({ MetricId: 'ListadoRecursos' }).subscribe(res => {
    this.dcResources = new Set(
      res.Items
        .filter((r: any) => r.ListEntities[0].Values.Disp === 'DESPACHADO CENTRALMENTE')
        .map((r: any) => r.ListEntities[0].Values.Code.trim().toUpperCase()) // Limpieza
    );
  });
}

  consultar() {
    this.loading = true;
    const body = {
      MetricId: 'Gene',
      StartDate: this.fechaInicio,
      EndDate: this.fechaFin,
      Entity: 'Recurso'
    };

    this.api.getPrecios(body).subscribe({
      next: (res) => {
        if (res && res.Items) {
          this.procesarGeneracion(res);
        } else {
          console.error("Respuesta vacía o error en estructura:", res);
        }
        this.loading = false;
      },
      error: (err) => {
        console.error("ERROR 400 CRÍTICO:", err.error); // Aquí verás el mensaje de XM
        this.loading = false;
      }
    });
  }

  private procesarGeneracion(data: any) {
  const agregados: { [key: string]: number } = {};

  const muestraCatalogo = Array.from(this.dcResources)[0];

  data.Items.forEach((day: any) => {
    day.HourlyEntities.forEach((entity: any) => {

      const idDeApi = (entity.Values.code || "").toString().trim().toUpperCase();

      if (this.dcResources.has(idDeApi)) {
        const totalGenerado = Object.keys(entity.Values)
          .filter(k => k.startsWith('Hour'))
          .reduce((sum, k) => sum + Number(entity.Values[k] || 0), 0);

        agregados[idDeApi] = (agregados[idDeApi] || 0) + totalGenerado;
      }
    });
  });

  const top10 = Object.entries(agregados)
    .sort((a, b) => (b[1] as number) - (a[1] as number))
    .slice(0, 10);

  this.dibujarGrafica(top10);
}


  private dibujarGrafica(datos: [string, number][]) {
    // Asegúrate de que los datos no estén vacíos
    if (datos.length === 0) {
      console.warn("No hay datos para mostrar en la gráfica");
      return;
    }

    this.chartOptions = {
      title: { text: 'Top 10 Plantas DC - Generación Total' },
      tooltip: { trigger: 'axis' }, // Cambia a 'axis' para ver los valores al pasar el mouse
      xAxis: {
        type: 'category',
        data: datos.map(d => d[0]),
        axisLabel: { rotate: 45 } // Si los nombres son largos, esto ayuda
      },
      yAxis: { type: 'value', name: 'MWh' },
      series: [{
        type: 'bar',
        data: datos.map(d => d[1])
      }]
    };
  }
}