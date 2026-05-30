import { Component, OnInit, inject } from '@angular/core';
import { PrecBolsNaciService } from '../../core/services/api/prec-bols-naci.service';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-precio-nac',
  templateUrl: './precio-nac.component.html',
  styleUrls: ['./precio-nac.component.scss']
})
export class PrecioNacComponent implements OnInit {
  private api = inject(PrecBolsNaciService);
  date: Date = new Date();

  fecha: string = '2026-05-01'; // Formato YYYY-MM-DD
  promedio: number = 0;
  chartOptions: EChartsOption = {};
  loading = false;

  ngOnInit() { this.consultar(); }

  consultar() {
  this.loading = true;
  const body = {
    MetricId: 'PrecBolsNaci',
    StartDate: this.fecha,
    EndDate: this.fecha,
    Entity: 'Sistema'
  };

  this.api.getPrecios(body).subscribe({
    next: (res) => {
      // AQUÍ ESTABA EL ERROR: Tu JSON usa 'Items', no 'Result'
      if (res && res.Items && res.Items.length > 0) {
        this.procesar(res); // Pasamos el objeto completo
      } else {
        console.error("La API no devolvió 'Items'", res);
      }
      this.loading = false;
    },
    error: (err) => {
      console.error("Error en la petición:", err);
      this.loading = false;
    }
  });
}

  private procesar(respuesta: any) {
  // 1. Acceso a la ruta específica de los datos según el JSON que enviaste
  const valores = respuesta.Items[0].HourlyEntities[0].Values;
  
  const precios = Object.keys(valores)
    .filter(key => key.startsWith('Hour'))
    .map(key => Number(valores[key]));

  const suma = precios.reduce((a, b) => a + b, 0);
  this.promedio = suma / precios.length;

  const sorted = [...precios].sort((a, b) => a - b);
  const min = sorted[0];
  const q1 = this.calcMediana(sorted.slice(0, 12));
  const mediana = this.calcMediana(sorted);
  const q3 = this.calcMediana(sorted.slice(12));
  const max = sorted[sorted.length - 1];

  this.configurarGrafica([min, q1, mediana, q3, max]);
}

  private calcMediana(arr: number[]) {
    const m = Math.floor(arr.length / 2);
    return arr.length % 2 === 0 ? (arr[m-1] + arr[m]) / 2 : arr[m];
  }

  private configurarGrafica(boxData: number[]) {
    this.chartOptions = {
      tooltip: { trigger: 'item' },
      xAxis: { type: 'category', data: [this.fecha] },
      yAxis: { type: 'value', name: 'COP/kWh' },
      series: [{
        type: 'boxplot',
        data: [boxData],
        itemStyle: { color: '#0056b3' }
      }]
    };
  }
}