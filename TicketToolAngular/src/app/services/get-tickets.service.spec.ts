import { TestBed } from '@angular/core/testing';

import { GetTicketsService } from './get-tickets.service';

describe('GetTicketsService', () => {
  let service: GetTicketsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTicketsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
