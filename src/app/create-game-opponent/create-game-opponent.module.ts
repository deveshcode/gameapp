import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateGameOpponentPage } from './create-game-opponent.page';

const routes: Routes = [
  {
    path: '',
    component: CreateGameOpponentPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreateGameOpponentPage]
})
export class CreateGameOpponentPageModule {}
