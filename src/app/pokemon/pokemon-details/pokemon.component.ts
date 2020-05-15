import { Component, OnInit, Input } from '@angular/core';
import { Pokemon } from '../pokemon';
import {NgForm} from "@angular/forms";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent implements OnInit {
  @Input() pokemon: Pokemon;
  expended : boolean= false;
  updatePokemonForm: FormGroup;

  constructor(private fBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.updatePokemonForm = this.fBuilder.group({
      speed: ['', Validators.required],
      attackValue: ['', Validators.required],
    })
  }

  btnFormCLickedModify(pok : Pokemon): void{
    this.expended = true;
    this.updatePokemonForm.setValue({
      speed: pok.speed,
      attackValue: pok.attackValue
    })
  }

  onSubmit() {
    console.log(parseInt(this.updatePokemonForm.get('speed').value, 10));
    this.pokemon.speed = parseInt(this.updatePokemonForm.get('speed').value, 10);
    this.pokemon.attackValue = parseInt(this.updatePokemonForm.get('attackValue').value, 10);
  }

}
