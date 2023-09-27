import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { tareaResolver } from './tarea.resolver';

describe('tareaResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => tareaResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
