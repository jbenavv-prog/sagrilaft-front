import { TestBed } from '@angular/core/testing';

import { GeneralStatusService } from './general-status.service';

describe('GeneralStatusService', () => {
  let service: GeneralStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
