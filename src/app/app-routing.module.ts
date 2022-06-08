import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { PreventPokemonFormLeaveGuard } from './guards/prevent-pokemon-form-leave.guard';
import { CreateUserModelDrivenComponent } from './pages/create-user-model-driven/create-user-model-driven.component';
import { HomeComponent } from './pages/home/home.component';
import { ErrorComponent } from './pages/pokemon/error/error.component';
import { PokemonComponent } from './pages/pokemon/pokemon.component';
import { EvolutionsComponent } from './pages/pokemon/tabs/evolutions/evolutions.component';
import { GeneralComponent } from './pages/pokemon/tabs/general/general.component';
import { StatsComponent } from './pages/pokemon/tabs/stats/stats.component';
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
    canActivate: [AuthGuard],
    path: 'pokemon/:name',
    component: PokemonComponent,
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
