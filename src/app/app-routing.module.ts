import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddNewScoreComponent } from './add-new-score/add-new-score.component';
import { ScoreOverviewComponent } from './score-overview/score-overview.component';

const routes: Routes = [
  { path: '', redirectTo: "entries", pathMatch: "full" },
  { path: 'entries', component: ScoreOverviewComponent },
  { path: 'entries/:score-id', component: AddNewScoreComponent },
  { path: 'entries/add', component: AddNewScoreComponent }
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
