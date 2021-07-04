import { TestBed } from '@angular/core/testing';

import { WildlifeCrimeService } from './wildlife-crime.service';

describe('WildlifeCrimeService', () => {
  let service: WildlifeCrimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WildlifeCrimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
