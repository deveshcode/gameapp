import { TestBed } from '@angular/core/testing';

import { GameParamsService } from './game-params.service';

describe('GameParamsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GameParamsService = TestBed.get(GameParamsService);
    expect(service).toBeTruthy();
  });
});
