import { TestBed, inject } from '@angular/core/testing';

import { CelebritiesService } from './celebrities.service';

describe('CelebritiesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CelebritiesService]
    });
  });

  it('should ...', inject([CelebritiesService], (service: CelebritiesService) => {
    expect(service).toBeTruthy();
  }));
});
