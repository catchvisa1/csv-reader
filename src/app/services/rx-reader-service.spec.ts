import { TestBed } from '@angular/core/testing';

import { RxReaderService } from './rx-reader-service';

describe('RxReaderServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RxReaderService = TestBed.get(RxReaderService);
    expect(service).toBeTruthy();
  });
});
