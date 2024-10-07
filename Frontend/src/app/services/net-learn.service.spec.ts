import { TestBed } from '@angular/core/testing';

import { NetLearnService } from './net-learn.service';

describe('NetLearnService', () => {
  let service: NetLearnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetLearnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
