import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyPokemonListComponent } from './components/my-pokemon-list/my-pokemon-list.component';
import { HomeComponent } from './pages/home/home.component';
import { MyPokemonComponent } from './pages/my-pokemon/my-pokemon.component';
import { GeneralComponent } from './components/tabs/general/general.component';
import { StatsComponent } from './components/tabs/stats/stats.component';
import { EvolutionsComponent } from './components/tabs/evolutions/evolutions.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { ErrorComponent } from './components/error/error.component';
import { HeaderComponent } from './components/header/header.component';
import { ShortenPipe } from './pipes/shorten.pipe';
import { PokemonTypeFilterPipe } from './pipes/pokemon-type-filter.pipe';
import { CreateUserModelDrivenComponent } from './pages/create-user-model-driven/create-user-model-driven.component';
import { SamePasswordValidatorComponent } from './pages/same-password-validator/same-password-validator.component';
import { CreateUserTemplateDrivenComponent } from './pages/create-user-template-driven/create-user-template-driven.component';
import { ForbiddenNamesDirective } from './directives/forbidden-names.directive';
import { PokedexComponent } from './pages/pokedex/pokedex.component';
import { PokedexListComponent } from './components/pokedex-list/pokedex-list.component';
import { PokedexItemComponent } from './components/pokedex-item/pokedex-item.component';
import { LoaderComponent } from './components/loader/loader.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { MyPokemonItemComponent } from './components/my-pokemon-item/my-pokemon-item.component';
import { PokemonComponent } from './pages/pokemon/pokemon.component';
import { PokemonNavigationComponent } from './components/pokemon-navigation/pokemon-navigation.component';
import { PokemonImageComponent } from './components/pokemon-image/pokemon-image.component';
import { PokemonTypeComponent } from './components/pokemon-type/pokemon-type.component';
import { PokemonDetailsComponent } from './components/pokemon-details/pokemon-details.component';

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    MyPokemonListComponent,
    MyPokemonItemComponent,
    HomeComponent,
    MyPokemonComponent,
    GeneralComponent,
    StatsComponent,
    EvolutionsComponent,
    NotFoundComponent,
    ErrorComponent,
    HeaderComponent,
    ShortenPipe,
    PokemonTypeFilterPipe,
    CreateUserModelDrivenComponent,
    SamePasswordValidatorComponent,
    CreateUserTemplateDrivenComponent,
    ForbiddenNamesDirective,
    PokedexComponent,
    PokedexListComponent,
    PokedexItemComponent,
    LoaderComponent,
    PaginationComponent,
    PokemonComponent,
    PokemonNavigationComponent,
    PokemonImageComponent,
    PokemonTypeComponent,
    PokemonDetailsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [{ provide: LOCALE_ID, useValue: 'fr' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
