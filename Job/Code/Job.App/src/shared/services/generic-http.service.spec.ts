import { TestBed } from '@angular/core/testing';

import { GenericHttpService } from './generic-http.service';

describe('GenericHttpService', () => {
  let service: GenericHttpService<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenericHttpService<any>);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
