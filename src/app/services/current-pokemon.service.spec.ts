import { TestBed } from '@angular/core/testing';

import { CurrentPokemonService } from './current-pokemon.service';

describe('CurrentPokemonService', () => {
  let service: CurrentPokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentPokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
