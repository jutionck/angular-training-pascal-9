import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosRoutingModule } from './todos-routing.module';
import { TodosComponent } from './todos.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoFormComponent } from './todo-form/todo-form.component';


@NgModule({
  declarations: [
    TodosComponent,
    TodoListComponent,
    TodoFormComponent
  ],
  imports: [
    CommonModule,
    TodosRoutingModule
  ]
})
export class TodosModule { }
