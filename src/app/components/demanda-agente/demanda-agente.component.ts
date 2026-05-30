import { Component, OnInit, inject } from '@angular/core';
import { PrecBolsNaciService } from '../../core/services/api/prec-bols-naci.service';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-demanda-agente',
  templateUrl: './demanda-agente.component.html',
  styleUrls: ['./demanda-agente.component.scss']
})
export class DemandaAgenteComponent implements OnInit {
  private api = inject(PrecBolsNaciService);

  agentes: any[] = [];
  selectedAgentCode: string = '';
  fechaInicio: string = '2025-05-01';
  fechaFin: string = '2025-05-30';
  
  chartOptions: EChartsOption = {};
  loading = false;

  ngOnInit() {
    this.cargarCatalogoAgentes();
  }

  cargarCatalogoAgentes() {
    this.api.getLists({ MetricId: 'ListadoAgentes' }).subscribe(res => {
      this.agentes = res.Items
        .filter((item: any) => {
          const code = item.ListEntities[0].Values.Code || '';
          return code.toString().toUpperCase().endsWith('C');
        })
        .map((item: any) => ({
          codigo: item.ListEntities[0].Values.Code,
          nombre: item.ListEntities[0].Values.Name
        }));
    });
  }

  consultar() {
    if (!this.selectedAgentCode) return;
    this.loading = true;

    const body = {
      MetricId: 'DemaCome',
      StartDate: this.fechaInicio,
      EndDate: this.fechaFin,
      Entity: 'MercadoComercializacion', // ¡ENTIDAD CORRECTA!
      Filter: [this.selectedAgentCode]
    };

    this.api.getPrecios(body).subscribe({
      next: (res) => {
        this.procesarDemanda(res);
        this.loading = false;
      },
      error: (err) => {
        console.error("Error consultando:", err);
        this.loading = false;
      }
    });
  }

  private procesarDemanda(data: any) {
    if (!data || !data.Items || data.Items.length === 0) {
      this.chartOptions = { title: { text: "No hay datos para este agente" } };
      return;
    }

    const seriesData: any[] = [];
    const xAxisData: string[] = [];

    // Ahora que recibes datos, procesamos la curva horaria
    data.Items.forEach((item: any) => {
      // Nota: Verifica si DemaCome usa 'HourlyEntities' o 'Entities'
      const entidades = item.HourlyEntities || item.Entities || [];
      if (entidades.length > 0) {
        const values = entidades[0].Values;
        Object.keys(values).filter(k => k.startsWith('Hour')).forEach(h => {
          xAxisData.push(`${item.Date} ${h}`);
          seriesData.push(Number(values[h]));
        });
      }
    });

    this.dibujarGrafica(xAxisData, seriesData);
  }

  private dibujarGrafica(x: string[], y: number[]) {
    this.chartOptions = {
      title: { text: `Curva de Demanda: ${this.selectedAgentCode}` },
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: x },
      yAxis: { type: 'value', name: 'MWh' },
      series: [{ type: 'line', data: y, smooth: true, areaStyle: {} }]
    };
  }
}