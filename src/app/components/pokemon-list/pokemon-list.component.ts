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
  pokemons: string[] = ['pok'];
  @ViewChild('nameInput') nameInputElementRef: ElementRef | undefined;

  ngOnInit(): void {
    setTimeout(() => {
      this.allowNewPokemon = true;
    }, 5000);
  }

  onAddPokemon(element: HTMLElement) {
    this.pokemonAdded = true;
    this.pokemons.push(this.pokemonName);
    console.log('element :', element);
    console.log('this.nameInputElementRef?.nativeElement :', this.nameInputElementRef?.nativeElement);
  }

  removePokemon(pokemonName: string, pokemonIndex: number) {
    console.log(`${pokemonName} removed`);
    this.pokemons.splice(pokemonIndex, 1);
  }
}
