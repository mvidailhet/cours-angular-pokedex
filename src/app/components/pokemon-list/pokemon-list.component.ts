import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  allowNewPokemon = false;
  pokemonAdditionStatus = 'Pas de Pokémon crée';
  pokemonName = '';
  pokemonAdded = false;
  pokemons: string[] = [];
  @ViewChild('nameInput') nameInputElementRef: ElementRef | undefined;

  constructor() {
    const storagePokemons = localStorage.getItem('pokemons');
    if (!storagePokemons) return;
    this.pokemons = JSON.parse(storagePokemons);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.allowNewPokemon = true;
    }, 5000);
  }

  storePokemonList() {
    localStorage.setItem('pokemons', JSON.stringify(this.pokemons));
  }

  onAddPokemon(element: HTMLElement) {
    this.pokemonAdded = true;
    this.pokemons.push(this.pokemonName);
    this.storePokemonList();
    console.log('element :', element);
    console.log('this.nameInputElementRef?.nativeElement :', this.nameInputElementRef?.nativeElement);
  }

  removePokemon(pokemonName: string, pokemonIndex: number) {
    console.log(`${pokemonName} removed`);
    this.pokemons.splice(pokemonIndex, 1);
    this.storePokemonList();
  }
}
