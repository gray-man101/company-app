import { TestBed } from '@angular/core/testing';

import { GeneralAuthGuardService } from './general-auth-guard.service';

describe('AuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GeneralAuthGuardService = TestBed.get(GeneralAuthGuardService);
    expect(service).toBeTruthy();
  });
});
