import { TestBed, inject } from '@angular/core/testing';

import { SharedMockService } from './shared-mock.service';

describe('SharedMockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SharedMockService]
    });
  });

  it('should be created', inject([SharedMockService], (service: SharedMockService) => {
    expect(service).toBeTruthy();
  }));
});
