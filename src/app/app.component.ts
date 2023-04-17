import { Component } from '@angular/core';
import { COLOR_CLASSES, ScoreEntry } from './score-entry';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'how-are-you';
  add: boolean = false;
  scores: ScoreEntry[] = [];
  colorClasses: string[] = COLOR_CLASSES;


  add_score(): void {
    this.add = true;
  }

  receive_back_to_start($event: ScoreEntry): void {
    let total = $event.get_total();
    // Check for invalid score
    if (total && total !== -1) {
      this.scores.push($event);
    }
    console.log("Total Score = " + total);
    this.add = false;
  }
}
