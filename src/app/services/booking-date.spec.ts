import { TestBed } from '@angular/core/testing';

import { BookingDate } from './booking-date';

describe('BookingDate', () => {
  let service: BookingDate;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BookingDate);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
