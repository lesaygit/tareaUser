import { TestBed } from '@angular/core/testing';

import { TokenJWTInterceptor } from './token-jwt.interceptor';

describe('TokenJWTInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TokenJWTInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TokenJWTInterceptor = TestBed.inject(TokenJWTInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
