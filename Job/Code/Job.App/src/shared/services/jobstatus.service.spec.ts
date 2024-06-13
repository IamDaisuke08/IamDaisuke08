import { TestBed } from '@angular/core/testing';

import { JobstatusService } from './jobstatus.service';

describe('JobstatusService', () => {
  let service: JobstatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JobstatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
