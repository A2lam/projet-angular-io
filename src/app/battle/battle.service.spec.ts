import { TestBed } from '@angular/core/testing';
import { BattleService } from './battle.service';
import { Pokemon } from '../pokemon/pokemon';

describe('BattleService', () => {
  let service: BattleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BattleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Should return pokemon1 when pokemen1.speed > pokemon2.speed', () => {
    const pokemon1: Pokemon = {
      name: 'Pikachu',
      life: 3,
      speed: 5,
      isAlive: true,
      attackValue: 45,
      image: null
    };
    const pokemon2: Pokemon = {
      name: 'Bulbizarre',
      life: 3,
      speed: 4,
      isAlive: true,
      attackValue: 50,
      image: null
    };
    expect(service.attackFirst(pokemon1, pokemon2)).toBe(pokemon1);
  });

  it('should have pokemon2.life at 255 when attaked by pokemon1', () => {
    const pokemon1: Pokemon = {
      name: 'Pikachu',
      life: 300,
      speed: 5,
      isAlive: true,
      attackValue: 45,
      image: null
    };
    const pokemon2: Pokemon = {
      name: 'Bulbizarre',
      life: 300,
      speed: 4,
      isAlive: true,
      attackValue: 50,
      image: null
    };
    service.attack(pokemon1, pokemon2);
    expect(pokemon2.life).toBe(255);
  });

  it('should have pokemon2.life at 240 when attaked by pokemon1', () => {
    const pokemon1: Pokemon = {
      name: 'Pikachu',
      life: 300,
      speed: 5,
      isAlive: true,
      attackValue: 20,
      image: null
    };
    const pokemon2: Pokemon = {
      name: 'Bulbizarre',
      life: 300,
      speed: 4,
      isAlive: true,
      attackValue: 10,
      image: null
    };
    service.attackCritique(pokemon1, pokemon2, 3);
    expect(pokemon2.life).toBe(240);
  });

  it('should return pokemon 2 when pikachu at 0 life', () => {
    const pokemon1: Pokemon = {
      name: 'Pikachu',
      life: 0,
      speed: 5,
      isAlive: true,
      attackValue: 20,
      image: null
    };
    const pokemon2: Pokemon = {
      name: 'Bulbizarre',
      life: 300,
      speed: 4,
      isAlive: true,
      attackValue: 10,
      image: null
    };
    expect(service.determineWinner(pokemon1, pokemon2)).toBe(pokemon2);
  });

  it('should return pokemon 2 when both at 0 life', () => {
    const pokemon1: Pokemon = {
      name: 'Pikachu',
      life: 0,
      speed: 5,
      isAlive: true,
      attackValue: 20,
      image: null
    };
    const pokemon2: Pokemon = {
      name: 'Bulbizarre',
      life: 0,
      speed: 4,
      isAlive: true,
      attackValue: 10,
      image: null
    };
    expect(service.determineWinner(pokemon1, pokemon2)).toBe(pokemon2);
  });

});
