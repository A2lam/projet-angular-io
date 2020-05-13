import { TestBed } from '@angular/core/testing';
import { BattleService } from './battle.service';
import {Pokemon} from '../pokemon/pokemon';

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
      color: 'd8db2e'
    };
    const pokemon2: Pokemon = {
      name: 'Bulbizarre',
      life: 3,
      speed: 4,
      isAlive: true,
      color: '1aac6c'

    };
    expect(service.attackFirst(pokemon1, pokemon2)).toBe(pokemon1);
  });
});
