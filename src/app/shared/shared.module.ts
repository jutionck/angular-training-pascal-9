import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { ScrollToModule } from '@nicky-lenaers/ngx-scroll-to';
import { ScrollDirective } from './directives/scroll/scroll.directive';
import { BsButtonDirective } from './directives/bs-button/bs-button.directive';
import { ValidationMessageComponent } from './components/validation-message/validation-message.component';

const components = [
  HeaderComponent,
  FooterComponent,
  NotFoundComponent,
  ScrollDirective,
  BsButtonDirective,
  ValidationMessageComponent,
]

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule,
    RouterModule,
    ScrollToModule.forRoot()
  ],
  exports: [...components]
})
export class SharedModule { }
