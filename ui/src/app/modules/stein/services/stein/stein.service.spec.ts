import { TestBed } from '@angular/core/testing';

import { SteinService } from './stein.service';

describe('SteinService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SteinService = TestBed.get(SteinService);
    expect(service).toBeTruthy();
  });
});
