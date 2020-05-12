import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon/pokemon';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {
  pokemon1: Pokemon = {
    name: 'Pikatchu',
    life: 3,
    speed: 5
  };
  pokemon2: Pokemon = {
    name: 'Bulbizarre',
    life: 3,
    speed: 4
  };
  winnerP: Pokemon;
  message: string;

  constructor() {}

  ngOnInit(): void {}

  attackFirst(p1: Pokemon, p2: Pokemon): boolean {
    const attackFirst: boolean = p1.speed >= p2.speed;
    const attackingFirst: string = (attackFirst) ? p1.name : p2.name;

    this.message = `${attackingFirst} attaque en premier !<br>`;
    return attackFirst;
  }

  attack(p1: Pokemon, p2: Pokemon): void {
    p2.life -= 1;
  }

  fight(p1: Pokemon, p2: Pokemon): void {
    // Determining who's attacking and whose attacked
    let attacking: Pokemon = (this.attackFirst(this.pokemon1, this.pokemon2)) ? p1 : p2;
    let attacked: Pokemon = (attacking === p1) ? p2 : p1;

    // while ((p1.life > 0) && (p2.life > 0)) {
    const fightInterval = setInterval(() => {
      // Attack
      this.message += `${ attacking.name } est en train d'attaquer !<br>`;
      this.attack(attacking, attacked);

      // Changing role
      const tmpP: Pokemon = attacking;
      attacking = attacked;
      attacked = tmpP;

      if ((p1.life === 0) || (p2.life === 0)) {
        clearInterval(fightInterval);
        // Returning the winner
        this.returnWinner();
      }
    }, 2000);
  }

  returnWinner(): void {
    this.winnerP =  (this.pokemon1.life > 0) ? this.pokemon1 : this.pokemon2;
    this.message += `${ this.winnerP?.name } a gagné le combat<br>`;
  }

  startFight(): void {
    this.fight(this.pokemon1, this.pokemon2);
  }
}
