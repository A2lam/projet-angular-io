import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {
  pokemon1Name: string;
  pokemon2Name: string;

  constructor() { }

  ngOnInit(): void {
    this.pokemon1Name = 'Pikatchu';
    this.pokemon2Name = 'Bulbizarre';
  }
}
