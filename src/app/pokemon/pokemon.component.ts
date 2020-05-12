import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
  @Input() name: string;
  @Input() life: number;
  @Input() speed: number;

  constructor() { }

  ngOnInit(): void {
  }

  attacker() {
    this.life = this.life - 1;
  }
}
