import { TestBed } from '@angular/core/testing';

import { ChildcategoryService } from './childcategory.service';

describe('ChildcategoryService', () => {
  let service: ChildcategoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChildcategoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
