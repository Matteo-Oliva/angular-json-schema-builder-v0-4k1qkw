import { TestBed } from '@angular/core/testing';

import { MockSchemasService } from './mock-schemas.service';

describe('MockSchemasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MockSchemasService = TestBed.get(MockSchemasService);
    expect(service).toBeTruthy();
  });
});
