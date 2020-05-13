import { Component, OnInit, Directive, ElementRef, Renderer2 } from '@angular/core';
import { Pokemon } from '../pokemon/pokemon';
import { BattleService } from './battle.service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {
  pokemon1: Pokemon = {
    name: 'Pikatchu',
    life: 3,
    speed: 5,
    isAlive: true,
    color: 'd8db2e'
  };
  pokemon2: Pokemon = {
    name: 'Bulbizarre',
    life: 3,
    speed: 4,
    isAlive: true,
    color: '1aac6c'

  };
  winner: Pokemon;
  messages: Array<string> = [];
  messageDefaite: string;

  constructor(private battleService: BattleService) {}

  ngOnInit(): void {}

  fight(p1: Pokemon, p2: Pokemon, cb: () => void) {
    // Determining who's attacking and whose attacked
    let attacking: Pokemon = this.battleService.attackFirst(p1, p2);
    let attacked: Pokemon = (attacking === p1) ? p2 : p1;
    this.messages.push(`${ attacking.name } attaque en premier !`);

    const fightInterval = setInterval(() => {
      // Attack
      this.messages.push(`${ attacking.name } est en train d'attaquer !`);
      this.battleService.attack(attacked);

      // Changing role
      const tmpP: Pokemon = attacking;
      attacking = attacked;
      attacked = tmpP;

      if ((p1.life === 0) || (p2.life === 0)) {
        clearInterval(fightInterval);
        // Returning the winner
        this.winner = this.battleService.determineWinner(p1, p2);
        cb();
      }
    }, 2000);
  }

  startFight(): void {
    this.fight(this.pokemon1, this.pokemon2, () => {
      const looser = (this.winner === this.pokemon1) ? this.pokemon2 : this.pokemon1;
      looser.isAlive = false;

      this.messageDefaite = `${ looser.name } a perdu le combat (le noob)`;
      this.messages.push(`${ this.winner.name } a gagné le combat`);
    });
  }
}
