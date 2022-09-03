import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimeRoutingModule } from './anime-routing.module';
import { AnimeComponent } from './anime.component';


@NgModule({
  declarations: [
    AnimeComponent
  ],
  imports: [
    CommonModule,
    AnimeRoutingModule
  ]
})
export class AnimeModule { }
