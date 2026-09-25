import { TestBed } from '@angular/core/testing';

import { IcsGenerator } from './ics-generator';

describe('IcsGenerator', () => {
  let service: IcsGenerator;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IcsGenerator);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
