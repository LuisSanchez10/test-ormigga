import { TestBed, inject } from '@angular/core/testing';

import { ApigithubService } from './apigithub.service';

describe('ApigithubService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApigithubService]
    });
  });

  it('should be created', inject([ApigithubService], (service: ApigithubService) => {
    expect(service).toBeTruthy();
  }));
});
