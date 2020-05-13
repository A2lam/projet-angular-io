import { Component, OnInit, Directive, ElementRef, Renderer2 } from '@angular/core';
import { Pokemon } from '../pokemon/pokemon';
import { BattleService } from './battle.service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {
  dateStart: Date;
  turnDammage: number;
  criticalMultiplier: number;
  pokemon1: Pokemon = {

    name: 'Pikatchu',
    life: 100,
    speed: 5,
    isAlive: true,
    color: 'd8db2e',
    attackValue: 20

  };
  pokemon2: Pokemon = {

    name: 'Bulbizarre',
    life: 200,
    speed: 4,
    isAlive: true,
    color: '1aac6c',
    attackValue: 17

  };
  winner: Pokemon;
  messages: Array<string> = [];
  messageDefaite: string;

  constructor(private battleService: BattleService) {
    this.criticalMultiplier = 3;
    this.turnDammage = 0;
  }

  ngOnInit(): void {}

  fight(p1: Pokemon, p2: Pokemon, cb: () => void) {
    this.dateStart = new Date();
    // Determining who's attacking and whose attacked
    let attacking: Pokemon = this.battleService.attackFirst(p1, p2);
    let attacked: Pokemon = (attacking === p1) ? p2 : p1;
    this.messages.push(`${ attacking.name } attaque en premier !`);

    const fightInterval = setInterval(() => {
      // Attack
      if (Math.random() >= 0.8) { // COUP CRITIQUE
        this.messages.push(`${ attacking.name } est en train de faire un coup critique ! (Wow) `);
        this.battleService.attackCritique(attacking, attacked, this.criticalMultiplier);
        this.turnDammage = attacking.attackValue * this.criticalMultiplier;
      } else {
        this.messages.push(`${ attacking.name } est en train d'attaquer ! `);
        this.battleService.attack(attacking, attacked);
        this.turnDammage = attacking.attackValue;
      }

      // Changing role
      const tmpP: Pokemon = attacking;
      attacking = attacked;
      attacked = tmpP;

      if ((p1.life <= 0) || (p2.life <= 0)) {
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
