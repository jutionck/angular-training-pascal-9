import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AnimeComponent } from './anime.component';

const routes: Routes = [
  {
    path: '',
    component: AnimeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimeRoutingModule { }
