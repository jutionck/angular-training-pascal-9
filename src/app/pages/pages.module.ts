import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ResourceComponent } from './resource/resource.component';
import { NextStepComponent } from './next-step/next-step.component';
import { HighlightCardComponent } from './highlight-card/highlight-card.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

const components = [
  HeaderComponent,
  FooterComponent,
  ResourceComponent,
  NextStepComponent,
  HighlightCardComponent,
  ToolbarComponent,
]

@NgModule({
  declarations: [ ...components ],
  imports: [
    CommonModule
  ],
  exports: [ ...components ]
})
export class PagesModule { }
