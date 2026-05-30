import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NivelEmbalsesComponent } from './nivel-embalses.component';

describe('NivelEmbalsesComponent', () => {
  let component: NivelEmbalsesComponent;
  let fixture: ComponentFixture<NivelEmbalsesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NivelEmbalsesComponent]
    });
    fixture = TestBed.createComponent(NivelEmbalsesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
