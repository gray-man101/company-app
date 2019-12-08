import { TestBed } from '@angular/core/testing';

import { CompanyAuthGuardService } from './company-auth-guard.service';

describe('CompanyAuthGuardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CompanyAuthGuardService = TestBed.get(CompanyAuthGuardService);
    expect(service).toBeTruthy();
  });
});
