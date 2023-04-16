import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ScoreOverviewComponent } from './score-overview/score-overview.component';
import { AppRoutingModule } from './app-routing.module';
import { AddNewScoreComponent } from './add-new-score/add-new-score.component';

@NgModule({
  declarations: [
    AppComponent,
    ScoreOverviewComponent,
    AddNewScoreComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
