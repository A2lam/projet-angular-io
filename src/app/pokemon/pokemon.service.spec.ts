import { TestBed, async } from '@angular/core/testing';

import { PokemonService } from './pokemon.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Pokemon } from './pokemon';

describe('PokemonService', () => {
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PokemonService]
    });
  });

  it('should return bulbasaur', async (() => {
    const pokemonService = TestBed.get(PokemonService);
    const http = TestBed.get(HttpTestingController);
    const mockedPokemon = {
      name: 'bulbasaur',
      life: 300,
      speed: 64,
      isAlive: true,
      attackValue: 77,
      image: null
    };
    
    pokemonService.getPokemon('bulbasaur').subscribe((pokemon : Pokemon) => {
      expect(pokemon).toBe(mockedPokemon);
    });
  }))
});
