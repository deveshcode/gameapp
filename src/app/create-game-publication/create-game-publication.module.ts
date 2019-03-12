import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CreateGamePublicationPage } from './create-game-publication.page';

const routes: Routes = [
  {
    path: '',
    component: CreateGamePublicationPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreateGamePublicationPage]
})
export class CreateGamePublicationPageModule {}
