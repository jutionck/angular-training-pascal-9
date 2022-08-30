import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { ResumeModule } from './resume/resume.module';
import { SharedModule } from './shared/shared.module';
import { SampleRouteModule } from './sample-route/sample-route.module';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    PagesModule,
    SharedModule,
    ResumeModule,
    SampleRouteModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
