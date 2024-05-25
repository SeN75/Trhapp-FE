import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { pilgrimGuard } from './pilgrim.guard';

describe('pilgrimGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => pilgrimGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
