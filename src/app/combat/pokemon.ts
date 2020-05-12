export class Pokemon {
  public nom = 'inconnu';
  public speed = 1;
  public life = 100;
  public attackValue = 5;

  constructor(nom: string = 'inconnu', speed: number = 1, life: number = 100, attackValue: number = 5 ) {
    this.nom = nom;
    this.speed = speed;
    this.life = life;
    this.attackValue = attackValue;
  }

  public parler() {
    return this.nom + ' !';
  }

  public getNom() {
    return this.nom;
  }

}

export function compareSpeed(a: Pokemon, b: Pokemon) {
  if (a.speed > b.speed) {
    return a.nom;
  } else if (a.speed === b.speed) {
    if (getRandomInt(50) < 25) {
      return a.nom;
    } else {
      return b.nom;
    }
  } else {
    return b.nom;
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function attack(a: Pokemon, b: Pokemon) {
  if (getRandomInt(15) === 2) { // COUP CRITIQUE => attaque * 2
    b.life -= a.attackValue * 2;
    console.log('COUP CRITIQUE ! ' + b.nom + ' perd ' + a.attackValue * 2 + ' points de vie !' );
  } else {
    b.life -= a.attackValue;
    console.log(b.nom + ' perd ' + a.attackValue + ' points de vie !' );
  }
  return b.life;
}

export function fight(a: Pokemon, b: Pokemon) {
  let premierTour = true;
  // tslint:disable-next-line:prefer-const
  let premierPokemon;
  // tslint:disable-next-line:prefer-const
  let secondPokemon;

  if (premierTour) {
    console.log('Le combat commence !');
    premierTour = false;
    if (compareSpeed(a, b) === a.nom) {
      // tslint:disable-next-line:no-shadowed-variable
      premierPokemon = a;
      // tslint:disable-next-line:no-shadowed-variable
      secondPokemon = b;
    } else {
      // tslint:disable-next-line:no-shadowed-variable
      premierPokemon = b;
      // tslint:disable-next-line:no-shadowed-variable
      const secondPokemon: Pokemon = a;
    }
  }

  console.log('Nouveau tour !');

  while (premierPokemon.life > 0 && secondPokemon.life > 0) {
    console.log(premierPokemon.nom + ' attaque !');
    attack(premierPokemon, secondPokemon);
    if (secondPokemon.life > 0) {
      console.log(secondPokemon.nom + ' attaque !');
      attack(secondPokemon, premierPokemon);
    }

  }

  if (premierPokemon.life > 0) {
    console.log(premierPokemon.nom + ' a gagné !');
    return premierPokemon.nom;
  } else {
    console.log(secondPokemon.nom + ' a gagné !');
    return secondPokemon.nom;
  }
}

// const pikachu = new Pokemon("Pikachu", 50);
// console.log(pikachu.parler());

// test Combat
// const slowpoke = new Pokemon('slowpoke', 2, 150, 30);
// const mew = new Pokemon('mew', 300, 500, 80);
// fight(mew, slowpoke);
