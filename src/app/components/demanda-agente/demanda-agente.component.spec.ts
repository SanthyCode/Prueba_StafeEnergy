import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandaAgenteComponent } from './demanda-agente.component';

describe('DemandaAgenteComponent', () => {
  let component: DemandaAgenteComponent;
  let fixture: ComponentFixture<DemandaAgenteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemandaAgenteComponent]
    });
    fixture = TestBed.createComponent(DemandaAgenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
