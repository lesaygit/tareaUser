import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { estadoTareaGuard } from './estado-tarea.guard';

describe('estadoTareaGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => estadoTareaGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
