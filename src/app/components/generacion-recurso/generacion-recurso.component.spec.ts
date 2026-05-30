import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneracionRecursoComponent } from './generacion-recurso.component';

describe('GeneracionRecursoComponent', () => {
  let component: GeneracionRecursoComponent;
  let fixture: ComponentFixture<GeneracionRecursoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GeneracionRecursoComponent]
    });
    fixture = TestBed.createComponent(GeneracionRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
