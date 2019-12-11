import { TestBed } from '@angular/core/testing';

import { SingleImageResolverService } from './single-image-resolver.service';

describe('SingleImageResolverService', () => {
  let service: SingleImageResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SingleImageResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
