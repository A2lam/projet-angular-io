import {Component, OnInit, Input} from '@angular/core';
import { Pokemon } from './pokemon';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
  @Input() pokemon: Pokemon;


  // tslint:disable-next-line:variable-name
  constructor() { }

  ngOnInit(): void {
  }
}

/*@Directive({
  selector: '[appColorDirective]'
})
export class ColorDirective {
  // tslint:disable-next-line:variable-name
  private _renderer: Renderer2;
  constructor(element: ElementRef, _renderer: Renderer2) {
    // element.nativeElement.style.backgroundColor = 'yellow';
    this._renderer.setElementStyle(element.nativeElement, 'backgroundColor', 'yellow');
  }
}*/
