import { TestBed } from '@angular/core/testing';

import { StopwatchServiceService } from './stopwatch-service.service';

describe('StopwatchServiceService', () => {
  let service: StopwatchServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StopwatchServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
