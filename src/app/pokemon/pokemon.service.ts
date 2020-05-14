import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  readonly apiEndPoint;

  constructor(private http: HttpClient) {
    this.apiEndPoint = environment.apiEndPoint;
  }

  getPokemon(name: string): Observable<Pokemon> {
    return this.http
      .get(`${ this.apiEndPoint }/pokemon/${ name }`)
      .pipe(map(({ name, base_experience, height, weight, sprites }) => {
        return {
          name,
          life: 300,
          speed: base_experience,
          isAlive: true,
          attackValue: height + weight,
          image: sprites.back_default
        };
      }));
  }
}
