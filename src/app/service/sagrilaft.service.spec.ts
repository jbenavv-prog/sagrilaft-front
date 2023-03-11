import { TestBed } from '@angular/core/testing';

import { SagrilaftService } from './sagrilaft.service';

describe('SagrilaftService', () => {
  let service: SagrilaftService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SagrilaftService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
