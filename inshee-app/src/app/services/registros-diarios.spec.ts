import { TestBed } from '@angular/core/testing';

import { RegistrosDiarios } from './registros-diarios';

describe('RegistrosDiarios', () => {
  let service: RegistrosDiarios;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RegistrosDiarios);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
