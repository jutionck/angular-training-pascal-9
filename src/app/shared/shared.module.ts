import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ScrollDirective } from './directive/scroll/scroll.directive';

const components = [
  HeaderComponent,
  FooterComponent
]

@NgModule({
  declarations: [ ...components, ScrollDirective ],
  imports: [
    CommonModule
  ],
  exports: [ ...components ]
})
export class SharedModule { }
