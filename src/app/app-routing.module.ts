import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PokemonListComponent } from './pokemon/pokemon-list/pokemon-list.component';
import { BattleComponent } from './battle/battle.component';

const routes: Routes = [
  // Pokemon list route
  { path: '', component: PokemonListComponent },

  // Battle route
  { path: 'pokemon/battle/:nomPok1/:nomPok2', component: BattleComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
