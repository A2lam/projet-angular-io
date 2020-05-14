import { Component, OnInit } from '@angular/core';
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

  constructor(private pokemonService: PokemonService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this.pokemonService.getPokemons().subscribe(
      (pokemons: any) => this.pokemons = pokemons.results,
      () => this.error = 'Erreur lors de la récupération des pokemons'
    );
  }

  selectPokemon1(pokemon: Pokemon): void {
    this.pokemon1 = pokemon;
  }

  selectPokemon2(pokemon: Pokemon): void {
    this.pokemon2 = pokemon;
  }
}
