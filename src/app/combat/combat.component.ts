import { Component, OnInit } from '@angular/core';
import {attack, fight, Pokemon} from './pokemon';

@Component({
  selector: 'app-combat',
  templateUrl: './combat.component.html',
  styleUrls: ['./combat.component.scss']
})
export class CombatComponent implements OnInit {
  pokemon1 = new Pokemon('ratata', 100, 100, 10);
  pokemon2 = new Pokemon('mew', 300, 500, 95);
  dialogue: string;

  constructor() { }

  ngOnInit(): void {
  }

  handleClick() {
    fight(this.pokemon1, this.pokemon2, this.dialogue);
  }
}
