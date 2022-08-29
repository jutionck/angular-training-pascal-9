import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';

const components = [
  HomeComponent
]

@NgModule({
  declarations: [ ...components,  ],
  imports: [
    CommonModule
  ],
  exports: [ ...components ],
})
export class PagesModule { }
