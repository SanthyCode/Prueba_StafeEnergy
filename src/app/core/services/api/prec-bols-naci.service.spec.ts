import { TestBed } from '@angular/core/testing';

import { PrecBolsNaciService } from './prec-bols-naci.service';

describe('PrecBolsNaciService', () => {
  let service: PrecBolsNaciService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrecBolsNaciService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
