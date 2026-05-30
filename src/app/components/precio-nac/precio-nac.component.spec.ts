import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecioNacComponent } from './precio-nac.component';

describe('PrecioNacComponent', () => {
  let component: PrecioNacComponent;
  let fixture: ComponentFixture<PrecioNacComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrecioNacComponent]
    });
    fixture = TestBed.createComponent(PrecioNacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
