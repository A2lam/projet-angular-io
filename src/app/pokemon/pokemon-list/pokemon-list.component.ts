import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  pokemons: Array<object>;
  pokemon1: Pokemon;
  pokemon2: Pokemon;
  error: string;

  constructor(private router: Router, private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.pokemons = [];
    this.pokemon1 = {
      name: null,
      life: null,
      speed: null,
      isAlive: null,
      attackValue: null,
      image: null
    };
    this.pokemon2 = {
      name: null,
      life: null,
      speed: null,
      isAlive: null,
      attackValue: null,
      image: null
    };
    this.getPokemons();
  }

  getPokemons(): void {
    this.pokemonService.getPokemons().subscribe(
      (pokemons: Array<object>) => {
        pokemons.forEach((pokemon) => {
          this.pokemonService.getPokemon(pokemon.name).subscribe(
            (fetchedPokemon) => this.pokemons.push(fetchedPokemon),
            () => this.error = 'Erreur lors de la récupération'
          );
        });
      },
      () => this.error = 'Erreur lors de la récupération des pokemons'
    );
  }

  selectPokemon1(pokemon: Pokemon): void {
    this.pokemon1 = pokemon;
  }

  selectPokemon2(pokemon: Pokemon): void {
    this.pokemon2 = pokemon;
  }

  startBattle(): Promise<boolean> | void {
    if (null === this.pokemon1.name) {
      this.error = 'Veuillez choisir le Pokemon 1';
      return;
    }

    if (null === this.pokemon2.name) {
      this.error = 'Veuillez choisir le Pokemon 2';
      return;
    }

    return this.router.navigate(['pokemon/battle', this.pokemon1.name, this.pokemon2.name]);
  }
}
