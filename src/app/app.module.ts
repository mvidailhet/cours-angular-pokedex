import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import localeFr from '@angular/common/locales/fr';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PokemonListComponent } from './components/pokemon-list/pokemon-list.component';
import { PokemonItemComponent } from './components/pokemon-item/pokemon-item.component';
import { HomeComponent } from './pages/home/home.component';
import { PokemonComponent } from './pages/pokemon/pokemon.component';
import { GeneralComponent } from './pages/pokemon/tabs/general/general.component';
import { StatsComponent } from './pages/pokemon/tabs/stats/stats.component';
import { EvolutionsComponent } from './pages/pokemon/tabs/evolutions/evolutions.component';
import { NotFoundComponent } from './pages/pokemon/not-found/not-found.component';
import { ErrorComponent } from './pages/pokemon/error/error.component';
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

registerLocaleData(localeFr);

@NgModule({
  declarations: [
    AppComponent,
    PokemonListComponent,
    PokemonItemComponent,
    HomeComponent,
    PokemonComponent,
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
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  providers: [{ provide: LOCALE_ID, useValue: 'fr' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
