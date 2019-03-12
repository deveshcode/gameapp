import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'game-list',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule'
  },
  { path: 'select-opponent', loadChildren: './create-game-opponent/create-game-opponent.module#CreateGameOpponentPageModule', canActivate: [AuthGuard] },
  { path: 'select-publication', loadChildren: './create-game-publication/create-game-publication.module#CreateGamePublicationPageModule', canActivate: [AuthGuard] },
  { path: 'select-game-mode', loadChildren: './create-game-mode/create-game-mode.module#CreateGameModePageModule', canActivate: [AuthGuard] },
  { path: 'select-game-map', loadChildren: './create-game-map/create-game-map.module#CreateGameMapPageModule', canActivate: [AuthGuard] },
  { path: 'select-deployment', loadChildren: './create-game-deployment/create-game-deployment.module#CreateGameDeploymentPageModule', canActivate: [AuthGuard] },
  { path: 'select-objectives', loadChildren: './create-game-objectives/create-game-objectives.module#CreateGameObjectivesPageModule', canActivate: [AuthGuard] },
  { path: 'game-canvas', loadChildren: './game-canvas/game-canvas.module#GameCanvasPageModule', canActivate: [AuthGuard] },
  { path: 'game-list', loadChildren: './game-list/game-list.module#GameListPageModule', canActivate: [AuthGuard]},
  { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
