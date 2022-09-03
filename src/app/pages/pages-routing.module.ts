import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumeComponent } from './resume/resume.component';
import { TodosComponent } from './todos/todos.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'demo/resume',
    component: ResumeComponent
  },
  {
    path: 'demo/todos',
    component: TodosComponent
  },
  {
    path: 'demo/anime',
    loadChildren: () => import('./anime/anime.module').then(m => m.AnimeModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRoutingModule { }
