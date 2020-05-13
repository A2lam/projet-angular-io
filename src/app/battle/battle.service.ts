import { Injectable } from '@angular/core';
import { Pokemon } from '../pokemon/pokemon';

@Injectable({
  providedIn: 'root'
})
export class BattleService {

  constructor() { }

  attackFirst(p1: Pokemon, p2: Pokemon): Pokemon {
    return (p1.speed >= p2.speed) ? p1 : p2;
  }

  attack(p1: Pokemon, p2: Pokemon): void {
    p2.life -= p1.attackValue;
  }

  attackCritique(p1: Pokemon, p2: Pokemon, criticalMultiplier: number): void {
      p2.life -= p1.attackValue * criticalMultiplier;

  }

  determineWinner(p1: Pokemon, p2: Pokemon): Pokemon {
    return (p1.life <= 0) ? p2 : p1;
  }
}
