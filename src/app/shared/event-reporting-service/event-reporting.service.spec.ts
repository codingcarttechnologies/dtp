/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { EventReportingService } from './event-reporting.service';

describe('EventReportingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventReportingService]
    });
  });

  it('should ...', inject([EventReportingService], (service: EventReportingService) => {
    expect(service).toBeTruthy();
  }));
});
