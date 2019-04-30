import { TestBed } from '@angular/core/testing';

import { FileOperationService } from './file-operation.service';
import { RxReaderService } from './rx-reader-service';

describe('FileOperationService', () => {
  let mockRxReaderService;

  beforeEach(() => {
    mockRxReaderService = jasmine.createSpyObj(['readFile']);

    TestBed.configureTestingModule({
      providers: [
        FileOperationService,
        { provide: RxReaderService, useValue: mockRxReaderService }
      ]
    })
  });

  it('should be created', () => {
    const service: FileOperationService = TestBed.get(FileOperationService);
    expect(service).toBeTruthy();
  });
});
