import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './home/about/about.component';
import { HomeModule } from './home/home.module';
import { PagesComponent } from './pages.component';
import { TodosComponent } from './todos/todos.component';

@NgModule({
  declarations: [
    PagesComponent,
    TodosComponent
  ],
  imports: [
    CommonModule,
    HomeModule,
  ],
  exports: [PagesComponent]
})
export class PagesModule { }
