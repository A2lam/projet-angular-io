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

  constructor() {}

  ngOnInit(): void {}
}
