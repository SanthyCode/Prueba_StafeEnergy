import { Component, OnInit, inject } from '@angular/core';
import { PrecBolsNaciService } from '../../core/services/api/prec-bols-naci.service';

@Component({
  selector: 'app-nivel-embalses',
  templateUrl: './nivel-embalses.component.html',
  styleUrls: ['./nivel-embalses.component.scss']
})
export class NivelEmbalsesComponent implements OnInit {
  private api = inject(PrecBolsNaciService);
  embalses: any[] = [];

  ngOnInit() {
    this.consultar();
  }

  consultar() {
    const body = {
      MetricId: 'PorcVoluUtilDiar',
      StartDate: '2025-05-01', // Rango de ejemplo
      EndDate: '2025-05-01',
      Entity: 'Embalse'
    };

    this.api.getDailyMetrics(body).subscribe(res => {
      this.procesarEmbalses(res);
    });
  }

  private procesarEmbalses(data: any) {
    if (!data || !data.Items || data.Items.length === 0) {
      console.error("La API respondió pero no hay datos.");
      return;
    }

    const entidades = data.Items;


    this.embalses = entidades.map((e: any) => {
      // Intentamos capturar el valor diario
      const valor = e.DailyEntities[0].Value;
      const nombre = e.DailyEntities[0].Name;
      return {
        nombre: nombre,
        valor: Number(valor)
      };
    });
  }
}