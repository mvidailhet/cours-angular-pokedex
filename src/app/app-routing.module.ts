import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { PreventPokemonFormLeaveGuard } from './guards/prevent-pokemon-form-leave.guard';
import { CreateUserModelDrivenComponent } from './pages/create-user-model-driven/create-user-model-driven.component';
import { CreateUserTemplateDrivenComponent } from './pages/create-user-template-driven/create-user-template-driven.component';
import { HomeComponent } from './pages/home/home.component';
import { PokedexComponent } from './pages/pokedex/pokedex.component';
import { ErrorComponent } from './components/error/error.component';
import { MyPokemonComponent } from './pages/my-pokemon/my-pokemon.component';
import { EvolutionsComponent } from './components/tabs/evolutions/evolutions.component';
import { GeneralComponent } from './components/tabs/general/general.component';
import { StatsComponent } from './components/tabs/stats/stats.component';
import { SamePasswordValidatorComponent } from './pages/same-password-validator/same-password-validator.component';

const routes: Routes = [
  {
    path: '',
    canDeactivate: [PreventPokemonFormLeaveGuard],
    component: HomeComponent,
  },
  {
    path: 'create-user-model-driven',
    component: CreateUserModelDrivenComponent,
  },
  {
    path: 'same-password-validator',
    component: SamePasswordValidatorComponent,
  },
  {
    path: 'create-user-template-driven',
    component: CreateUserTemplateDrivenComponent,
  },
  {
    path: 'pokedex/:page',
    component: PokedexComponent,
  },
  {
    canActivate: [AuthGuard],
    path: 'my-pokemon/:name',
    component: MyPokemonComponent,
    children: [
      {
        path: 'general',
        component: GeneralComponent,
      },
      {
        path: 'stats',
        component: StatsComponent,
      },
      {
        path: 'evolutions',
        component: EvolutionsComponent,
      },
      {
        path: '',
        redirectTo: 'general',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'not-found',
    component: ErrorComponent,
    data: {
      message: '4 sans 4 = rien en retour',
    },
  },
  {
    path: '**',
    redirectTo: 'not-found',
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
