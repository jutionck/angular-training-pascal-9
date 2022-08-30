import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RouterModule } from '@angular/router';

const components = [
  HeaderComponent,
  FooterComponent,
  NotFoundComponent
]

@NgModule({
  declarations: [ ...components ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [ ...components ]
})
export class SharedModule { }
