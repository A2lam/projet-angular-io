import { Component, OnInit } from '@angular/core';
import { Pokemon } from '../pokemon/pokemon';
import { Router, ActivatedRoute } from '@angular/router';
import { BattleService } from './battle.service';
import { PokemonService } from '../pokemon/pokemon.service';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {
  dateStart: Date;
  turnDamage: number;
  criticalMultiplier: number;
  nomPok1: string;
  nomPok2: string;
  pokemon1: Pokemon;
  pokemon2: Pokemon;
  winner: Pokemon;
  messages: Array<string> = [];
  messageDefeat: string;
  error: string;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private battleService: BattleService,
    private pokemonService: PokemonService
  ) {
    this.criticalMultiplier = 3;
    this.turnDamage = 0;
  }

  ngOnInit(): void {
    this.nomPok1 = this.route.snapshot.params.nomPok1;
    this.nomPok2 = this.route.snapshot.params.nomPok2;

    this.pokemonService.getPokemon(this.nomPok1).subscribe(
      (pokemon) => this.pokemon1 = pokemon,
      () => this.error = 'Erreur lors de la récupération des pokemons !'
    );

    this.pokemonService.getPokemon(this.nomPok2).subscribe(
      (pokemon) => this.pokemon2 = pokemon,
      () => this.error = 'Erreur lors de la récupération des pokemons !'
    );
  }

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
        this.turnDamage = attacking.attackValue * this.criticalMultiplier;
      } else {
        this.messages.push(`${ attacking.name } est en train d'attaquer ! `);
        this.battleService.attack(attacking, attacked);
        this.turnDamage = attacking.attackValue;
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

      this.messageDefeat = `${ looser.name } a perdu le combat (le noob)`;
      this.messages.push(`${ this.winner.name } a gagné le combat`);
    });
  }
}
