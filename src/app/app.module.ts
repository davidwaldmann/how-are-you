import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NgbModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AddNewScoreComponent } from './add-new-score/add-new-score.component';
import { FormsModule } from '@angular/forms';
import { ScoreOverviewComponent } from './score-overview/score-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    AddNewScoreComponent,
    ScoreOverviewComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    AppRoutingModule,
    FormsModule,
    NgbTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
