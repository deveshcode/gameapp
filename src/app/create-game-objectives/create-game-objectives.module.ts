import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateGameObjectivesPage } from './create-game-objectives.page';

const routes: Routes = [
  {
    path: '',
    component: CreateGameObjectivesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreateGameObjectivesPage]
})
export class CreateGameObjectivesPageModule {}
